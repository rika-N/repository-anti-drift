# Repository Anti-Drift

**Keep AI-assisted repositories from accumulating multiple sources of truth.**

> **A checker asks whether multiple representations still match.**<br>
> Repository Anti-Drift first asks whether all of those representations need to exist independently.

Repository Anti-Drift is a **repository governance Skill**: it finds semantic facts maintained independently in several places, determines what should own each semantic fact, designs how unnecessary copies should be removed, and identifies how unavoidable duplication can fail deterministically when the copies drift apart.

## Input / Output

| | |
|---|---|
| **Input** | A repository, plus optional `mode`, `scope`, `canonical`, `compare`, and `report` |
| **Output** | Audit findings, a remediation plan, or one implementation prompt; `report=<path>` optionally requests a full audit report |

```text
Use repository-anti-drift        # read-only audit, the default
```

A **canonical semantic owner** is the place that should define a semantic fact.

## Quick Start

After Repository Anti-Drift is published on GitHub, install the Skill:

```bash
npx skills add rika-N/repository-anti-drift
```

Then invoke the mode that answers your current question:

```text
mode=audit     What is drifting?                         # default
mode=plan      How should it be fixed?
mode=handoff   Give my coding agent an implementation prompt.
```

**Repository Anti-Drift does not directly modify your target repository.** It audits, plans, and generates an implementation prompt; you choose and authorize the external coding agent that makes changes.

You can use audit and plan before choosing who will perform an implementation.

Generating a handoff prompt does not mean implementation happened. After external implementation, a fresh Repository Anti-Drift audit is required before a finding may be considered closed or converged.

See [`INSTALL.md`](./INSTALL.md) for invocation guidance and [`SKILL.md`](./SKILL.md) for the canonical execution and authorization contract.

## Is Repository Anti-Drift right for your repository?

Use Repository Anti-Drift when the hard question is not merely whether two files match, but which artifact should own a semantic fact and how other necessary representations should stay aligned.

| If your repository has… | Repository Anti-Drift investigates… |
|---|---|
| The same rule repeated in code, tests, docs, or configuration | Whether the repository has multiple semantic owners |
| Generated docs, configuration, or manifests that become stale | Whether they should be derived, generated, and checked mechanically |
| Tests or fixtures that repeat production-owned semantics | Whether verification has become another semantic owner |
| Strong domain constraints that disappear through APIs or helpers | Whether those constraints survive while semantic decisions continue |
| Guards that keep accumulating syntax-specific exceptions | Whether consumers retain an unsafe capability that should be narrowed |
| Two independent representations that genuinely must coexist | What deterministic relationship or parity enforcement is needed |
| One already-authoritative specification and only code conformance needs checking | Whether a conventional drift checker is sufficient instead |

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

## Common signs of repository drift

These are symptoms, not new finding classes:

| What you notice | What may be happening |
|---|---|
| “We fixed this, but it came back somewhere else.” | Duplicate semantic ownership or missing enforcement |
| “The code changed, but the docs, test, or configuration did not.” | An independently maintained representation became stale |
| “Which of these two places is authoritative?” | Semantic ownership is unresolved |
| “We keep adding another guard pattern.” | The capability boundary may be too broad |
| “This value is constrained here, but becomes a primitive later.” | A semantic constraint was lost across a boundary |
| “Everything is green, but these representations disagree.” | The relationship lacks trustworthy mechanical enforcement |

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

## Generic rule map

This table is an orientation, not a second specification. [`SKILL.md`](./SKILL.md) is the canonical executable methodology; the linked references provide focused detail.

| Rule | What it prevents | When it matters |
|---|---|---|
| One semantic fact, one canonical semantic owner | Conflicting definitions of the same meaning | Whenever a fact appears in multiple artifacts |
| Prefer removing, deriving, or generating repeated meaning | Independently stale copies | When another representation need not be maintained by hand |
| Treat verification as a consumer unless an independent contract owns the expectation | Tests duplicating implementation semantics—or losing an independent oracle | When expected values encode semantic meaning |
| Preserve semantic constraints while semantic decisions continue | Strong domain meaning becoming an unchecked primitive | Across APIs, helpers, adapters, and other boundaries |
| Reduce unsafe capability before expanding syntax guards | Endless lists of equivalent forbidden spellings | When a consumer should not be able to perform an operation |
| Mechanically enforce unavoidable independent representations | Silent disagreement that remains green | When legitimate representations must coexist |
| Match falsification strength to the claim | Treating one responsive example as structural closure | When claiming that a guard covers a failure class |
| Do not guess unresolved repository intent | Safe cleanup accidentally changing behavior or authority | When ownership, compatibility, or migration intent is unclear |
| Generalize failure classes, not repository-specific fixes | One repository’s technique becoming universal doctrine | When turning an observed lesson into reusable guidance |

See the [constitution](./references/constitution.md) for durable principles and [guard proof guidance](./references/guard-proof.md) for falsification and closure detail.

## How Anti-Drift chooses a remedy

```text
same semantic fact represented more than once?
        ↓ yes
can the duplicate meaning disappear? ── yes → remove it
        ↓ no
can it be derived when needed? ───────── yes → derive it
        ↓ no
can a required artifact be produced? ─── yes → generate and check it
        ↓ no
legitimate independent representations
        ↓
mechanically enforce the required relationship
        ↓
use falsification evidence proportionate to the claim
```

This is a preference hierarchy, not an exhaustive algorithm. Repository evidence may justify keeping independent representations or skipping an inapplicable step; not every repository needs every mechanism.

## What it does

Repository Anti-Drift follows a semantic fact through **audit → ownership → remediation design → implementation handoff → fresh reinspection**.

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

For implementation-owned encoding, verification should use the canonical constructor, codec, or encoder rather than reimplementing the same encoding. An external, public, or independently governed compatibility contract is different: when that contract owns the expected representation, an independent oracle may be necessary to detect drift in the production encoder. See [`SKILL.md`](./SKILL.md) for the executable distinction.

### When duplication cannot be removed

Sometimes two representations must remain separate and neither can safely be generated from the other. In that case, use a **parity guard** to check that the semantic facts that must agree still match.

```text
representation A ──┐
                   ├── parity guard ── GREEN / RED
representation B ──┘
```

A green repository does not prove that the guard itself works. The guard may simply never have seen a failing case.

When appropriate and explicitly authorized, the external implementation agent can test an important guard by temporarily introducing one small violation that the guard is supposed to reject:

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

This cycle demonstrates **guard responsiveness** to that falsifier. It does not by itself prove that the broader failure class is structurally closed. A closure claim needs evidence proportionate to its scope and must not depend on any particular reviewer, AI model, or testing framework.

Repository Anti-Drift determines what proof is needed and later inspects the resulting state and evidence; it does not perform the mutation. The authorized implementation agent must never use destructive cleanup such as `git reset --hard` or `git clean -fd` to recover from a proof mutation and must revert only its own controlled change.

See [`references/guard-proof.md`](./references/guard-proof.md) for the detailed responsiveness, falsification, and closure procedure.

## Existing projects come first

Repository Anti-Drift must not become a new source of drift.

Observed current behavior is evidence and a characterization or preservation baseline; it is not automatically canonical semantic truth. It may reflect intended behavior, but it may also reflect a bug, legacy compatibility, migration state, stale implementation, or accident.

Preserve observed behavior while intent is unresolved. Confirm semantic authority from explicit requirements and repository evidence; if intent remains unclear, report `COMPATIBILITY_RISK` rather than guessing. `SKILL.md` owns the executable authority and compatibility rules.

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

Repository Anti-Drift has three normal prompt-level modes. This table is a public orientation; [`SKILL.md`](./SKILL.md) owns the exact behavior.

| Mode | Behavior |
|---|---|
| `mode=audit` | **Default.** Target repository is read-only; return findings in the response and optionally write one explicitly requested external report. |
| `mode=plan` | Keep the target read-only and design remediation, recurrence prevention, and verification. |
| `mode=handoff` | Keep the target read-only and return one implementation prompt for the coding agent chosen by the user. |

```text
Use repository-anti-drift
Use repository-anti-drift mode=plan
Use repository-anti-drift mode=handoff scope=src/billing
```

If the mode is omitted, or an unrelated mode is misspelled, ambiguous, or invalid, fail safe to `mode=audit`. The deprecated former `mode=apply` has a separate migration response; see [`INSTALL.md`](./INSTALL.md).

A remediation recommendation is not authorization. Handoff does not itself authorize or execute dependency changes, commit, push, pull request creation, repository-visibility changes, or destructive Git. The implementation prompt carries their authorization status according to `SKILL.md`.

Repository Anti-Drift may inspect generators and run safe check-only commands. Only the authorized external implementation agent may run a write-mode generator, and only when repository authority, scope, and output boundaries support it.

If repository intent remains unresolved, handoff preserves the `COMPATIBILITY_RISK` and tells the implementation agent not to guess rather than turning uncertainty into an architecture decision.

### Optional audit targeting

Use `canonical=` to identify a proposed canonical semantic owner for validation and `compare=` to identify a comparison target. Both may be repeated.

```text
Use repository-anti-drift
Use repository-anti-drift mode=audit canonical=<path>
Use repository-anti-drift mode=audit canonical=<path> compare=<path>
Use repository-anti-drift mode=audit scope=<path> canonical=<path>
```

With neither option, the audit discovers candidate canonical semantic owners and related representations within `scope`, or the repository root when scope is omitted. With only `canonical=`, it validates the supplied proposed canonical semantic owner against repository authority and automatically discovers comparison targets within scope. Supplying both requests a targeted comparison. Supplying only `compare=` searches within scope for candidate canonical semantic owners without silently promoting one.

`scope=` bounds automatic discovery. Explicit canonical or comparison paths outside scope may be read as requested context when they remain inside the repository and its security boundary, but they do not expand discovery or implementation authorization. In handoff, the implementation prompt separately states its authorized implementation scope.

A targeted comparison does not evaluate unsearched surfaces and must not claim that they are drift-free. See `SKILL.md` for the complete execution and reporting contract.

### Output stays explicit

By default, Repository Anti-Drift returns findings, a plan, or an implementation prompt through the normal response and writes nothing. It does not create a report file, hidden Repository Anti-Drift directory, report history, cache, or automatic destination under `/tmp`, your home directory, or the audited repository.

To request one full Markdown report, supply a non-repeatable `report=<path>` prompt input:

```text
Use repository-anti-drift mode=audit report=/tmp/graphView-audit.md
Use repository-anti-drift mode=audit scope=src/graph report=~/Documents/graphView-audit.md
```

The resolved report path must be outside the audited repository. `report=` authorizes only that audit-report file: it does not store an implementation prompt, authorize repository edits, expand discovery, change Git state, or permit overwriting an existing file. If the requested path is unsafe, unavailable, or already exists, no substitute destination is invented and the audit report remains available in the response when practical.

Detailed Markdown reports may use compact Mermaid diagrams when they clarify semantic relationships; see [`references/audit-report.md`](./references/audit-report.md) for presentation guidance.

## Enforcement

Repository Anti-Drift is not a replacement for specialized tools. Enforcement may already belong in the type system or compiler, schema validation, a generator or codegen check, a static analyzer, dependency or architecture boundary tools, exact-identity tests, mutation testing, or CI. Anti-Drift sits **above** these mechanisms as the governance layer that decides which source should be the canonical semantic owner and which existing mechanism should enforce unavoidable relationships.

Two scoped defaults for how relationships are enforced and discovered:

- **When membership is the invariant, assert exact membership rather than a count proxy.** When quantity itself is the contract—a quorum, capacity, or threshold, for example—a numeric assertion is appropriate.
- **Use the cheapest trustworthy verification environment that actually exercises the invariant.** Prefer local execution when it is available and semantically representative; remote or specialized verification may be the first meaningful environment when it alone reproduces the required conditions.

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

`SKILL.md` is the agent-facing execution contract; the `references/` directory contains the detailed governance guidance.

## License

Repository Anti-Drift is licensed under the **Apache License 2.0**. See [`LICENSE`](./LICENSE).

The project name and branding must not be used to imply official project status, maintainer approval, affiliation, or Anthropic/OpenAI endorsement when that is not factually true and separately authorized.

See [`BRANDING.md`](./BRANDING.md) for project name and branding guidance.
