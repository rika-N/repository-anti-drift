# Repository Anti-Drift

**Keep AI-assisted repositories from accumulating multiple sources of truth.**

> **A checker asks whether multiple representations still match.
> Repository Anti-Drift first asks whether all of those representations
> need to exist independently.**

Repository Anti-Drift is a **repository governance Skill**: it helps a coding agent find facts maintained independently in several places, decide what should own each fact, remove unnecessary copies, and make unavoidable duplication fail deterministically when it drifts.

## Input / Output

| | |
|---|---|
| **Input** | A repository, plus optional `mode` and `scope` |
| **Output** | A drift audit: canonical owners, duplicated truth, derive/generate opportunities, existing enforcement, enforcement gaps, compatibility risks |

```text
Use repository-anti-drift        # read-only audit, the default
```

## Who is this for

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
| `mode=audit` | **Default. Read-only.** Inventory and findings only. |
| `mode=plan` | Read-only audit plus a remediation plan. |
| `mode=apply` | Explicitly permits approved repository edits within scope. |

```text
Use repository-anti-drift
Use repository-anti-drift mode=plan
Use repository-anti-drift mode=apply scope=src/billing
```

If the mode is omitted, misspelled, ambiguous, or invalid, fail safe to `mode=audit`.

Even `mode=apply` does **not** automatically authorize commit, push, pull request creation, dependency installation or upgrades, destructive Git operations, or unrelated refactors.

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

```text
canonical definition
      ├─ runtime reads it
      ├─ tests derive expectations from it where appropriate
      └─ docs are generated from it
```

This does **not** mean every similar-looking artifact must be merged. Intentional role separation is valid.

## Derive vs generate

**Derive** means calculate or read a value directly from its canonical owner at runtime or test time, instead of maintaining a handwritten duplicate:

```ts
const emergencyIds =
  WARNING_DEFINITIONS
    .filter((warning) => warning.level === "emergency")
    .map((warning) => warning.id);
```

**Generate** means automatically produce another artifact from the canonical owner:

```text
WARNING_DEFINITIONS
        ↓
generator
        ↓
docs/generated/warnings.md
```

If a generated artifact is tracked, use a `--check` or equivalent mode so stale output turns verification RED.

## Enforcement

Repository Anti-Drift is not a replacement for specialized tools. Enforcement may already belong in the type system or compiler, schema validation, a generator or codegen check, a static analyzer, dependency or architecture boundary tools, exact-identity tests, mutation testing, or CI. Anti-Drift sits **above** these mechanisms as the governance layer that decides what should be canonical and which existing mechanism should enforce unavoidable relationships.

Two defaults for how relationships are enforced and discovered:

- **Assert exact identities, not counts** — `expect(actualIds).toEqual(EXPECTED_IDS)` rather than `expect(items.length).toBeGreaterThan(35)`. A stable count does not prove a stable set.
- **Converge locally before remote CI** — targeted checks, generator and stale checks, then architecture and parity guards. Remote CI should not be the first place architectural drift is discovered.

## Prove important guards

Do not claim a new or changed important guard is effective merely because the repository is green. When safe and explicitly in `mode=apply`, prove a representative forbidden state:

```text
GREEN → controlled forbidden mutation → RED
      → revert only that mutation → GREEN
```

Never perform a forbidden mutation in `mode=audit` or `mode=plan`, and never use destructive cleanup such as `git reset --hard` or `git clean -fd` to recover from a proof mutation. See [`references/guard-proof.md`](./references/guard-proof.md).

## Supported environments

The Skill is language- and artifact-agnostic:

- TypeScript / JavaScript / React / Node
- Python, Java / Kotlin, Go / Rust
- SQL, OpenAPI, YAML / JSON, Markdown, Terraform / IaC
- structured business artifacts such as CSVs, spreadsheets, and presentations, when source facts and derived artifacts are accessible to the coding agent

## Quick start

```bash
npx skills add <owner>/repository-anti-drift
```

Then, from the repository you want to inspect, run `Use repository-anti-drift` for a read-only audit, `mode=plan` for a remediation plan, and `mode=apply scope=<approved-scope>` only after reviewing the findings. See [`INSTALL.md`](./INSTALL.md) for installation and first-invocation detail.

`SKILL.md` is the agent-facing execution contract; the `references/` directory contains the detailed governance guidance.

## License

Repository Anti-Drift is licensed under the **Apache License 2.0**. See [`LICENSE`](./LICENSE).

The project name and branding must not be used to imply official project status, maintainer approval, affiliation, or Anthropic/OpenAI endorsement when that is not factually true and separately authorized.

See [`BRANDING.md`](./BRANDING.md) for project name and branding guidance.
