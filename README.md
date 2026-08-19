# Repository Anti-Drift

**Keep AI-assisted repositories from accumulating multiple sources of truth.**

> **A checker asks whether multiple representations still match.**<br>
> Repository Anti-Drift first asks whether all of those representations need to exist independently.

Repository Anti-Drift is a **repository governance Skill**: it helps a coding agent find semantic facts maintained independently in several places, decide what should own each semantic fact, remove unnecessary copies, and make unavoidable duplication fail deterministically when the copies drift apart.

## Input / Output

| | |
|---|---|
| **Input** | A repository, plus optional `mode`, `scope`, `canonical`, `compare`, and `report` |
| **Output** | A concise response by default; optionally, one explicitly requested full Markdown report |

```text
Use repository-anti-drift        # read-only audit, the default
```

A **canonical semantic owner** is the place that should define a semantic fact.

## Who is this for

Repository Anti-Drift is especially useful for **long-running AI-assisted or vibe-coded projects where the implementation has evolved through many conversations with coding agents, but the specifications, documentation, tests, or generated artifacts have fallen behind.**

**A common warning sign: the code works, but the specification is stale — and nobody is sure which representation describes the current system.**

Updating the stale specification may restore agreement, but if the underlying ownership problem remains, the same drift can recur. Repository Anti-Drift asks why that specification can become stale independently in the first place, then whether the duplicated truth should be removed, derived, generated, or mechanically verified from a canonical semantic owner.

You want this if:

- the repository is green, but nobody is sure which copy is the real source of truth;
- the same rule appears across code, tests, docs, config, registries, generated files, or CI;
- long-running AI-assisted development keeps adding helpers, constants, registries, allow-lists, or compatibility layers;
- stale docs, tests, or generated artifacts keep recurring;
- no single spec owns every truth in the system;
- you want to **remove drift surfaces**, not only detect disagreement after drift occurs.

## Conventional drift checker vs Repository Anti-Drift

Use a **conventional spec-to-code drift checker instead of Repository Anti-Drift** when:

```text
SPEC is already the canonical semantic owner
+
the job is to verify code still conforms
```

Repository Anti-Drift addresses the governance question that comes before conformity checking:

```text
What should own this truth?
        ↓
Do the other copies need to exist?
        ↓
Can they be derived?
        ↓
Can they be generated?
        ↓
If duplication must remain, what should enforce it?
```

Specialized checkers are therefore complementary lower-level mechanisms rather than competitors.

## What it does

Repository Anti-Drift follows a semantic fact through **audit → ownership → remediation → enforcement**.

### What an audit actually reports

Repository Anti-Drift follows the ownership chain from important semantic facts to the places where drift can still occur.

```text
important semantic fact
      ↓
candidate canonical semantic owner
      ↓
independent copies
      ↓
existing enforcement
      ↓
missing enforcement
```

For example, suppose a repository contains:

```ts
export const FRUITS = [
  { id: "apple", color: "red" },
  { id: "banana", color: "yellow" },
  { id: "grape", color: "purple" },
] as const;

export const RED_FRUIT_IDS = ["apple"];
```

An audit might report:

```text
Important semantic fact
  apple.color = red

        ↓

Candidate canonical semantic owner
  FRUITS

        ↓

Independent copy
  RED_FRUIT_IDS = ["apple"]

        ↓

Existing enforcement
  none found for this relationship

        ↓

Missing enforcement
  FRUITS can change while RED_FRUIT_IDS remains stale,
  and the repository can still stay GREEN
```

This is the structure of the audit result:

- **Important semantic facts** are the semantic facts that matter to repository behavior or meaning.
- **Candidate canonical semantic owners** are the locations or symbols that repository evidence most strongly supports as possible owners of those semantic facts. A candidate is not treated as authoritative until repository-specific evidence confirms it.
- **Independent copies** are other places where the same semantic fact is stored or re-encoded separately. These are potential drift surfaces.
- **Existing enforcement** is whatever already prevents or detects divergence, such as types, schemas, generator `--check` modes, exact-identity tests, guards, architecture checks, or CI.
- **Missing enforcement** identifies relationships where the same semantic fact can still diverge without anything failing — the repository can remain GREEN even though drift has occurred.

### One semantic fact, one canonical semantic owner

Once repository evidence confirms the owner, the design goal is:

> **One semantic fact, one canonical semantic owner.**

In the example above, if repository authority confirms `FRUITS` as the canonical semantic owner, semantic facts such as:

```text
apple.color = red
```

should come from `FRUITS`, rather than being independently re-encoded elsewhere.

A useful mental model is:

```text
                 canonical semantic owner
                          │
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
      derive            derive            derive
        ↓                 ↓                 ↓
   production           audit             guard
```

Production behavior, audit logic, and guards should not independently re-encode the same semantic fact. Here, `derive` means obtaining the relevant semantic truth from the canonical semantic owner; a guard may instead verify a derived or generated representation, or prevent a second independent semantic owner from being introduced.

This does **not** mean every similar-looking artifact must be merged. Intentional role separation is valid.

### From audit finding to anti-drift design

The audit found that the same semantic fact is stored twice. Repository Anti-Drift then prefers the strongest available simplification:

```text
DO NOT STORE A SECOND INDEPENDENT COPY
        ↓
DERIVE
        ↓
GENERATE
        ↓
MECHANICALLY VERIFY
only unavoidable duplication
```

This does **not** mean “do not store data.” It means:

> **If a semantic fact can be obtained from its canonical semantic owner, do not store another independently maintained copy of that semantic fact.**

The goal is **not to add more governance machinery**. The goal is to make fewer things capable of drifting.

Remove unsafe capability before guarding its misuse. If a consumer should never perform a semantic operation, first ask whether a narrower API, type, schema, visibility boundary, constructor, or owner-provided operation can make that operation unavailable. Guards remain useful for unavoidable boundaries and escape hatches.

### Derive

If the second copy does not need to exist independently, derive it from the canonical semantic owner.

Instead of maintaining:

```ts
export const RED_FRUIT_IDS = ["apple"];
```

derive it:

```ts
const redFruitIds =
  FRUITS
    .filter((fruit) => fruit.color === "red")
    .map((fruit) => fruit.id);
```

Now the same semantic fact is no longer maintained in two places; `redFruitIds` is derived from `FRUITS`.

### Generate

Sometimes another representation must exist as a separate file or artifact — for example documentation, JSON, configuration, code, or a table.

In that case, **generate** it from the canonical semantic owner rather than maintaining it independently.

```ts
const generatedList =
  FRUITS
    .map((fruit) => `${fruit.id}: ${fruit.color}`)
    .join("\n");
```

Generated result:

```text
apple: red
banana: yellow
grape: purple
```

So the distinction is:

```text
DERIVE
read or calculate from the canonical semantic owner when needed

GENERATE
use the canonical semantic owner to automatically produce another representation
```

### Guard generated files and other stored artifacts

A **generated artifact** is a generated representation stored as a file or other persistent output — for example generated documentation, JSON, code, configuration, or a table.

Once stored, even a generated artifact can become stale or be edited independently.

A guard can regenerate the expected representation and compare it with the stored artifact:

```text
canonical semantic owner
      ↓
   generate
      ↓
expected output ── compare ── stored artifact
                         ↓
                    match = GREEN
                    drift = RED
```

If a generated artifact is tracked, prefer a `--check` or equivalent read-only mode so stale output fails deterministically.

Verification artifacts are consumers, not automatic semantic authorities. Tests, fixtures, guards, characterization data, baselines, generated artifacts, and documentation can themselves become duplicate semantic or encoding owners when they independently reconstruct meaning that is canonical elsewhere.

### When duplication cannot be removed

Sometimes two representations must remain separate and neither can safely be generated from the other. In that case, use a **parity guard** to check that the semantic facts that must agree still match.

```text
representation A ──┐
                   ├── parity guard ── GREEN / RED
representation B ──┘
```

A green repository does not prove that the guard itself works. The guard may simply never have seen a failing case.

When safe and explicitly authorized in `mode=apply`, test an important guard by temporarily introducing one small violation that the guard is supposed to reject:

```text
GREEN
  ↓
introduce one controlled violation
  ↓
RED — the guard catches it
  ↓
revert only that violation
  ↓
GREEN
```

This is a **mutation proof**: it demonstrates that the guard fails when the prohibited drift actually occurs.

Never perform this mutation in `mode=audit` or `mode=plan`. Never use destructive cleanup such as `git reset --hard` or `git clean -fd` to recover from a proof mutation; revert only the controlled change you introduced.

See [`references/guard-proof.md`](./references/guard-proof.md) for the detailed procedure.

## Existing projects come first

Repository Anti-Drift must not become a new source of drift.

For an existing repository, the default authority order is:

```text
existing behavior + explicit user requirements
        ↓
repository-specific Constitution / AGENTS.md / CLAUDE.md / scoped rules
        ↓
existing types / schemas / generators / tests / guards / CI
        ↓
Repository Anti-Drift generic guidance
```

Before consolidating or removing something, inspect its readers, writers, runtime/build/test/CI responsibilities, migration role, and any agent/tool dependencies. Do not assume two similar artifacts are duplicates.

When ownership, compatibility, or migration intent is uncertain:

```text
Is ownership or intent uncertain?
        ↓
DO NOT GUESS
        ↓
COMPATIBILITY_RISK
        ↓
report the evidence and safe options
        ↓
do not alter that surface
```

`DO NOT GUESS` means Repository Anti-Drift must not infer a canonical semantic owner, migration intent, compatibility rule, or final architecture when repository evidence is insufficient or conflicting.

In that case, report `COMPATIBILITY_RISK`, show the evidence and safest available options, and leave the affected surface unchanged until repository authority or the user resolves the ambiguity.

Audit findings use these classes:

- `ALREADY_ENFORCED`
- `POLICY_ONLY`
- `CURRENT_DRIFT`
- `COMPATIBILITY_RISK`

## Safe by default

Repository Anti-Drift has three prompt-level modes:

| Mode | Behavior |
|---|---|
| `mode=audit` | **Default.** Target repository is read-only; return findings in the response and optionally write one explicitly requested external report. |
| `mode=plan` | Target repository remains read-only; add a remediation plan and optionally write one explicitly requested external report. |
| `mode=apply` | Explicitly permits approved repository edits within scope. |

```text
Use repository-anti-drift
Use repository-anti-drift mode=plan
Use repository-anti-drift mode=apply scope=src/billing
```

If the mode is omitted, misspelled, ambiguous, or invalid, fail safe to `mode=audit`.

Even `mode=apply` does **not** automatically authorize commit, push, pull request creation, dependency installation or upgrades, destructive Git operations, or unrelated refactors.

### Optional audit targeting

Use `canonical=` to identify a proposed canonical semantic owner for validation and `compare=` to identify a comparison target. Both may be repeated.

```text
Use repository-anti-drift
Use repository-anti-drift mode=audit canonical=<path>
Use repository-anti-drift mode=audit canonical=<path> compare=<path>
Use repository-anti-drift mode=audit scope=<path> canonical=<path>
```

With neither option, the audit discovers candidate canonical semantic owners and related representations within `scope`, or the repository root when scope is omitted. With only `canonical=`, it validates the supplied proposed canonical semantic owner against repository authority and automatically discovers comparison targets within scope. Supplying both requests a targeted comparison. Supplying only `compare=` searches within scope for candidate canonical semantic owners without silently promoting one.

`scope=` bounds automatic discovery. Explicit canonical or comparison paths outside scope may be read as requested context when they remain inside the repository and its security boundary, but they do not expand discovery or edit authorization. In `mode=apply`, an approved scope remains the maximum edit boundary, and explicit paths outside it are read-only context.

A targeted comparison does not evaluate unsearched surfaces and must not claim that they are drift-free. See `SKILL.md` for the complete execution and reporting contract.

### Output stays explicit

By default, Repository Anti-Drift returns the audit through the normal agent or shell response and writes nothing. It does not create a report file, hidden Repository Anti-Drift directory, report history, cache, or automatic destination under `/tmp`, your home directory, or the audited repository.

To request one full Markdown report, supply a non-repeatable `report=<path>` prompt input:

```text
Use repository-anti-drift mode=audit report=/tmp/graphView-audit.md
Use repository-anti-drift mode=audit scope=src/graph report=~/Documents/graphView-audit.md
```

In `mode=audit` and `mode=plan`, the resolved report path must be outside the audited repository. `report=` authorizes only that output file: it does not authorize repository edits, expand discovery, change Git state, or permit overwriting an existing file. If the requested path is unsafe, unavailable, or already exists, no substitute destination is invented and the report remains available in the response when practical.

Detailed Markdown reports may use compact Mermaid diagrams when they clarify semantic relationships; see [`references/audit-report.md`](./references/audit-report.md) for presentation guidance.

## Enforcement

Repository Anti-Drift is not a replacement for specialized tools. Enforcement may already belong in the type system or compiler, schema validation, a generator or codegen check, a static analyzer, dependency or architecture boundary tools, exact-identity tests, mutation testing, or CI. Anti-Drift sits **above** these mechanisms as the governance layer that decides which source should be the canonical semantic owner and which existing mechanism should enforce unavoidable relationships.

Two defaults for how relationships are enforced and discovered:

- **Assert exact identities, not counts** — `expect(actualIds).toEqual(EXPECTED_IDS)` rather than `expect(items.length).toBeGreaterThan(35)`. A stable count does not prove a stable set.
- **Converge locally before remote CI** — targeted checks, generator and stale checks, then architecture and parity guards. Remote CI should not be the first place architectural drift is discovered.

## Requirements

- **one compatible coding agent**
- access to the repository

**Multi-agent setup is not required.** Use the coding agent already approved for your repository and security environment. Repository Anti-Drift does not require ChatGPT, Claude, Codex, a second AI reviewer, a GitHub App, or a new external SaaS by default.

## Supported environments

The Skill is language- and artifact-agnostic:

- TypeScript / JavaScript / React / Node
- Python, Java / Kotlin, Go / Rust
- SQL, OpenAPI, YAML / JSON, Markdown, Terraform / IaC
- structured business artifacts such as CSVs, spreadsheets, and presentations, when the underlying semantic facts and derived artifacts are accessible to the coding agent

## Quick start

After the repository is public:

```bash
npx skills add rika-N/repository-anti-drift
```

Then, from the repository you want to inspect, run `Use repository-anti-drift` for a read-only audit. Add `canonical=<path>` to validate a proposed canonical semantic owner, and add `compare=<path>` for a targeted comparison; omit `compare=` to auto-discover comparison targets within scope. Add `report=<path>` only when you want one full Markdown report at an explicit destination. Use `mode=plan` for a remediation plan and `mode=apply scope=<approved-scope>` only after reviewing the findings. See [`INSTALL.md`](./INSTALL.md) for installation and first-invocation detail.

`SKILL.md` is the agent-facing execution contract; the `references/` directory contains the detailed governance guidance.

## License

Repository Anti-Drift is licensed under the **Apache License 2.0**. See [`LICENSE`](./LICENSE).

The project name and branding must not be used to imply official project status, maintainer approval, affiliation, or Anthropic/OpenAI endorsement when that is not factually true and separately authorized.

See [`BRANDING.md`](./BRANDING.md) for project name and branding guidance.
