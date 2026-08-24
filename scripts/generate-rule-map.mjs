import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SECTION_HEADING = "## Canonical shared Anti-Drift invariants";
const BEGIN_MARKER = "<!-- BEGIN GENERATED ANTI-DRIFT RULE MAP -->";
const END_MARKER = "<!-- END GENERATED ANTI-DRIFT RULE MAP -->";
const MINIMUM_RULE_COUNT = 19;

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const skillPath = path.join(repositoryRoot, "SKILL.md");
const readmePath = path.join(repositoryRoot, "README.md");

function fail(message) {
  throw new Error(message);
}

function indicesOf(lines, expected) {
  return lines.flatMap((line, index) => (line === expected ? [index] : []));
}

function parseRules(skill) {
  const lines = skill.split(/\r?\n/);
  const sectionIndices = indicesOf(lines, SECTION_HEADING);
  if (sectionIndices.length !== 1) {
    fail(`expected exactly one canonical invariant section; found ${sectionIndices.length}`);
  }

  const sectionStart = sectionIndices[0] + 1;
  const nextSectionOffset = lines
    .slice(sectionStart)
    .findIndex((line) => /^## /.test(line));
  if (nextSectionOffset === -1) {
    fail("canonical invariant section has no following level-two heading");
  }

  const sectionLines = lines.slice(sectionStart, sectionStart + nextSectionOffset);
  const rules = [];

  for (const line of sectionLines) {
    const match = line.match(/^### (AD-(\d{2})) — (.*)$/);
    if (match) {
      const title = match[3].trim();
      if (!title) {
        fail(`${match[1]} has an empty title`);
      }
      rules.push({ id: match[1], number: Number(match[2]), title });
      continue;
    }

    if (/^#{1,6}[ \t]+AD(?:\b|_)/i.test(line)) {
      fail(`malformed canonical AD heading: ${line}`);
    }
  }

  if (rules.length < MINIMUM_RULE_COUNT) {
    fail(`expected at least ${MINIMUM_RULE_COUNT} canonical invariants; found ${rules.length}`);
  }

  const seen = new Set();
  for (const [index, rule] of rules.entries()) {
    if (seen.has(rule.id)) {
      fail(`duplicate canonical invariant ID: ${rule.id}`);
    }
    seen.add(rule.id);

    const expectedNumber = index + 1;
    if (rule.number !== expectedNumber) {
      const expectedId = `AD-${String(expectedNumber).padStart(2, "0")}`;
      fail(`expected ${expectedId}; found ${rule.id}`);
    }
  }

  return rules;
}

function renderTable(rules) {
  const rows = rules.map(({ id, title }) => `| \`${id}\` | ${title.replaceAll("|", "\\|")} |`);
  return ["| ID | Rule |", "| --- | --- |", ...rows].join("\n");
}

function markerRange(readme) {
  const beginMatches = [...readme.matchAll(new RegExp(BEGIN_MARKER, "g"))];
  const endMatches = [...readme.matchAll(new RegExp(END_MARKER, "g"))];
  if (beginMatches.length !== 1 || endMatches.length !== 1) {
    fail(`expected exactly one generated marker pair; found ${beginMatches.length} begin and ${endMatches.length} end markers`);
  }

  const contentStart = beginMatches[0].index + BEGIN_MARKER.length;
  const contentEnd = endMatches[0].index;
  if (contentStart > contentEnd) {
    fail("generated block markers are reversed");
  }

  return { contentStart, contentEnd };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length > 1 || (args.length === 1 && args[0] !== "--check")) {
    fail("usage: node scripts/generate-rule-map.mjs [--check]");
  }

  const checkOnly = args[0] === "--check";
  const [skill, readme] = await Promise.all([
    readFile(skillPath, "utf8"),
    readFile(readmePath, "utf8"),
  ]);
  const table = renderTable(parseRules(skill));
  const expectedContent = `\n\n${table}\n\n`;
  const { contentStart, contentEnd } = markerRange(readme);
  const currentContent = readme.slice(contentStart, contentEnd);

  if (checkOnly) {
    if (currentContent !== expectedContent) {
      fail("README Rule map is stale; run node scripts/generate-rule-map.mjs");
    }
    return;
  }

  if (currentContent === expectedContent) {
    return;
  }

  const updated = readme.slice(0, contentStart) + expectedContent + readme.slice(contentEnd);
  await writeFile(readmePath, updated, "utf8");
}

main().catch((error) => {
  console.error(`Rule map generation failed: ${error.message}`);
  process.exitCode = 1;
});
