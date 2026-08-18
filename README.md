# Repository Anti-Drift

**Keep AI-assisted repositories from accumulating multiple sources of truth.**

> **A checker asks whether multiple representations still match.
> Repository Anti-Drift first asks whether all of those representations
> need to exist independently.**

Repository Anti-Drift is a **repository governance Skill**: it helps a coding agent find facts maintained independently in several places, decide what should own each fact, remove unnecessary copies, and make unavoidable duplication fail deterministically when it drifts.

## Input / Output

| | |
|---|---|
| **Input** | A repository, plus optional `mode`, `scope`, `canonical`, `compare`, and `report` |
| **Output** | A concise response by default; optionally, one explicitly requested full Markdown report |

```text
Use repository-anti-drift        # read-only audit, the default
```

## Who is this for

Repository Anti-Drift is especially useful for **long-running AI-assisted or vibe-coded projects where the implementation has evolved through many conversations with coding agents, but the specifications, documentation, tests, or generated artifacts have fallen behind.**

**A common warning sign: the code works, but the specification is stale — and nobody is sure which representation describes the current system.**

Updating the stale specification may restore agreement, but if the underlying ownership problem remains, the same drift can recur. Repository Anti-Drift asks why that specification can go stale independently at all, then whether the duplicated truth should be removed, derived, generated, or mechanically verified from a canonical owner.

You want this if:

- the repository is green, but nobody is sure which copy is the real source of truth;
- the same rule appears across code, tests, docs, config, registries, generated files, or CI;
- long-running AI-assisted development keeps adding helpers, constants, registries, allow-lists, or compatibility layers;
- stale docs, tests, or generated artifacts keep recurring;
- no single spec owns every truth in the system;
- you want to **remove drift surfaces**, not only detect disagreement after drift occurs.

A narrower checker is enough when the canonical owner is already clear and you only need to verify one relationship, such as spec ↔ code.

## Requirements

- **one compatible coding agent**
- access to the repository

**Multi-agent setup is not required.** Use the coding agent already approved for your repository and security environment. Repository Anti-Drift does not require ChatGPT, Claude, Codex, a second AI reviewer, a GitHub App, or a new external SaaS by default.

## What it does

The core rule is:

```text
DO NOT STORE
    ↓
DERIVE
    ↓
GENERATE
    ↓
MECHANICALLY VERIFY
only unavoidable duplication
```

The goal is **not to add more governance machinery**. The goal is to make fewer things capable of drifting.

A first audit inventories code, tests, docs, config, schemas, registries, generated artifacts, and CI, then reports:

```text
important semantic facts
        ↓
candidate canonical owners
        ↓
independent copies
        ↓
existing enforcement
        ↓
missing enforcement
```

Semantic facts include IDs and status identities, permissions and roles, business rules, schema constraints, warning or error identities, supported versions, routes, pricing or plan limits, configuration values, and KPI or roadmap facts copied into reports.

## Narrow checker vs governance layer

A spec-to-code drift checker is the right tool when:

```text
SPEC is already the canonical owner
+
the job is to verify code still conforms
```

Repository Anti-Drift addresses the earlier governance question:

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

Use `canonical=` to identify an owner for validation and `compare=` to identify a comparison target. Both may be repeated.

```text
Use repository-anti-drift
Use repository-anti-drift mode=audit canonical=<path>
Use repository-anti-drift mode=audit canonical=<path> compare=<path>
Use repository-anti-drift mode=audit scope=<path> canonical=<path>
```

With neither option, the audit discovers candidate owners and related representations within `scope`, or the repository root when scope is omitted. With only `canonical=`, it validates the supplied owner against repository authority and automatically discovers comparison targets within scope. Supplying both requests a targeted comparison. Supplying only `compare=` searches within scope for candidate owners without silently promoting one.

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

When ownership or compatibility is uncertain:

```text
DO NOT GUESS
    ↓
COMPATIBILITY_RISK
    ↓
report the safe options
    ↓
do not alter that surface
```

Audit findings use these classes:

- `ALREADY_ENFORCED`
- `POLICY_ONLY`
- `CURRENT_DRIFT`
- `COMPATIBILITY_RISK`

## One semantic fact, one canonical owner

A canonical owner is the place that should define a fact.

For example:

```ts
export const FRUITS = [
  { id: "apple", color: "red" },
  { id: "banana", color: "yellow" },
  { id: "grape", color: "purple" },
] as const;
```

Here, `FRUITS` is the canonical owner of facts such as:

```text
apple.color = red
```

The goal is not to copy that fact into several places and keep them synchronized by hand.

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

Production behavior, audit logic, and guards should not independently re-encode the same semantic fact. Here, `derive` means obtaining the relevant truth from the canonical semantic owner; a guard may instead verify a derived or generated representation, or prevent a second independent owner from being introduced.

This does **not** mean every similar-looking artifact must be merged. Intentional role separation is valid.

## Derive vs generate

### Derive

**Derive** means calculate or read the information you need directly from the canonical owner instead of maintaining another handwritten copy.

For example, derive the list of red fruits from `FRUITS`:

```ts
const redFruitIds =
  FRUITS
    .filter((fruit) => fruit.color === "red") // keep only red fruits
    .map((fruit) => fruit.id);                // return only their IDs
```

Result:

```ts
["apple"]
```

`["apple"]` does not need to be stored separately. It is derived from `FRUITS`.

### Generate

**Generate** means automatically produce another representation or artifact from the canonical owner.

For example:

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

The generated output could be documentation, JSON, configuration, code, a table, or another artifact. Markdown is only one possible output format.

The distinction is:

```text
DERIVE
read or calculate from the canonical owner when needed

GENERATE
use the canonical owner to automatically produce another representation
```

### Guard stored generated artifacts

If a generated artifact is stored in the repository, it can still become stale or be edited independently.

A guard should regenerate the expected representation and compare it with the stored artifact:

```text
canonical owner
      ↓
   generate
      ↓
expected output ── compare ── stored artifact
                         ↓
                   match = GREEN
                   drift = RED
```

If a generated artifact is tracked, prefer a `--check` or equivalent read-only mode so stale output fails deterministically.

Some repositories must keep independent representations that cannot be generated from one another. In those cases, a parity guard may be the right protection.

When an important guard is added or changed, do not assume it works merely because the repository is green. When safe and explicitly in `mode=apply`, prove a representative forbidden state:

```text
GREEN
  ↓
controlled forbidden mutation
  ↓
RED
  ↓
revert only that mutation
  ↓
GREEN
```

Never perform a forbidden mutation in `mode=audit` or `mode=plan`, and never use destructive cleanup such as `git reset --hard` or `git clean -fd` to recover from a proof mutation.

See [`references/guard-proof.md`](./references/guard-proof.md) for the detailed procedure.

## Enforcement

Repository Anti-Drift is not a replacement for specialized tools. Enforcement may already belong in the type system or compiler, schema validation, a generator or codegen check, a static analyzer, dependency or architecture boundary tools, exact-identity tests, mutation testing, or CI. Anti-Drift sits **above** these mechanisms as the governance layer that decides what should be canonical and which existing mechanism should enforce unavoidable relationships.

Two defaults for how relationships are enforced and discovered:

- **Assert exact identities, not counts** — `expect(actualIds).toEqual(EXPECTED_IDS)` rather than `expect(items.length).toBeGreaterThan(35)`. A stable count does not prove a stable set.
- **Converge locally before remote CI** — targeted checks, generator and stale checks, then architecture and parity guards. Remote CI should not be the first place architectural drift is discovered.

## Supported environments

The Skill is language- and artifact-agnostic:

- TypeScript / JavaScript / React / Node
- Python, Java / Kotlin, Go / Rust
- SQL, OpenAPI, YAML / JSON, Markdown, Terraform / IaC
- structured business artifacts such as CSVs, spreadsheets, and presentations, when source facts and derived artifacts are accessible to the coding agent

## Quick start

After the repository is public:

```bash
npx skills add rika-N/repository-anti-drift
```

Then, from the repository you want to inspect, run `Use repository-anti-drift` for a read-only audit. Add `canonical=<path>` to validate a proposed owner, and add `compare=<path>` for a targeted comparison; omit `compare=` to auto-discover comparison targets within scope. Add `report=<path>` only when you want one full Markdown report at an explicit destination. Use `mode=plan` for a remediation plan and `mode=apply scope=<approved-scope>` only after reviewing the findings. See [`INSTALL.md`](./INSTALL.md) for installation and first-invocation detail.

`SKILL.md` is the agent-facing execution contract; the `references/` directory contains the detailed governance guidance.

## License

Repository Anti-Drift is licensed under the **Apache License 2.0**. See [`LICENSE`](./LICENSE).

The project name and branding must not be used to imply official project status, maintainer approval, affiliation, or Anthropic/OpenAI endorsement when that is not factually true and separately authorized.

See [`BRANDING.md`](./BRANDING.md) for project name and branding guidance.
