# Repository Anti-Drift

**Keep AI-assisted repositories from accumulating multiple sources of truth.**

> A checker asks whether several representations still match. Repository Anti-Drift first asks what currently causes or authorizes their differences and whether those representations have legitimate independent authority.

Repository Anti-Drift has **one canonical methodology** and two mutually exclusive usage profiles:

- `anti-drift=audit` independently audits repository governance read-only.
- `anti-drift=authoring` applies the same canonical Anti-Drift invariants as coding-time constraints in an already-authorized coding task.

The profiles are two projections of one invariant set, not independently maintained methodologies. [`SKILL.md`](./SKILL.md) is the sole canonical executable methodology and owns the exact selector, profile, invariant, authority, safety, and closure semantics.

Authoring is not a write mode and does not make Repository Anti-Drift a separate implementing actor. It grants no implementation authority, file scope, dependency authority, Git or pull-request authority, merge/publication authority, or visibility authority. Those remain governed by the user's request and other higher-priority instructions. Authoring produces no audit closure claim; a fresh, separate audit remains required for Repository Anti-Drift closure.

## Input and output

| Area | Input / output |
| --- | --- |
| **Profiles** | Independent read-only audit, or shared invariants applied as authoring constraints |
| **Audit input/output** | A repository and optional audit inputs; audit facts, evidence, risks, limitations, and closure conditions |
| **Authoring context** | The current coding task and only the authority that task already has |

```text
Repository Anti-Drift
```

An omitted selector defaults to audit. Explicitly select exactly one profile with `anti-drift=audit` or `anti-drift=authoring`. Profiles cannot be combined. Unsupported or ambiguous selector input returns `INVALID_INVOCATION`; `SKILL.md` owns the complete fail-closed grammar.

## Quick Start

Install the Skill:

```bash
npx skills add rika-N/repository-anti-drift
```

Then choose one profile for the task:

```text
Repository Anti-Drift
Repository Anti-Drift anti-drift=audit
Repository Anti-Drift anti-drift=authoring
```

The first two forms run an independent read-only audit. Authoring applies the same canonical invariants during an already-authorized coding task and grants no implementation authority. Audit and authoring are mutually exclusive for one invocation and task.

An implementation task may use authoring as coding-time constraints. Separately, run a fresh `anti-drift=audit` against the resulting repository state to assess closure. Authoring does not automatically invoke that audit, and implementation-time success evidence is not Repository Anti-Drift closure.

See [`INSTALL.md`](./INSTALL.md) for installation and invocation details.

### Updating

Update an installed copy by skill name:

```bash
npx skills update repository-anti-drift
```

## Who is this for?

Use it when the hard question is not merely whether two files match, but what owns a semantic fact and why another representation differs.

| If your repository has… | The audit investigates… |
|---|---|
| The same rule repeated in code, tests, docs, or configuration | Whether the repository has multiple semantic owners |
| Generated docs, configuration, or manifests that become stale | Whether authority and derivation are still connected |
| Tests or fixtures that repeat production-owned semantics | Whether verification has become another owner |
| Strong domain constraints that disappear through APIs or helpers | Where the constraint is lost while semantic decisions continue |
| Guards that remain green despite known violations | What denominator they cover and what their evidence proves |
| Two independent representations that must coexist | Whether independent authority or compatibility justifies both |
| A downstream difference with unclear intent | What current authority or dependency causes it |

Repository Anti-Drift is especially useful for long-running AI-assisted projects where code still works but specifications, documentation, tests, generated artifacts, and production behavior have evolved unevenly.

Common warning signs include:

- nobody knows which copy is authoritative;
- the same rule appears across code, tests, docs, config, registries, generated files, or CI;
- stale artifacts recur after local corrections;
- semantic constraints weaken across helpers, APIs, or adapters;
- the repository is green while relevant representations disagree;
- guard coverage is inferred from remembered examples rather than the full denominator;
- the maintainer wants to remove drift surfaces, not merely compare copies after they diverge.

## Conventional checker vs Repository Anti-Drift

A conventional consistency or spec-to-code checker is a good fit when authority is already settled:

```text
SPEC is already confirmed as the canonical semantic owner
        +
verify that code still conforms
```

Repository Anti-Drift asks the earlier governance questions:

```text
What currently owns or authorizes this semantic fact?
        ↓
Do other representations need independent authority?
        ↓
Can unnecessary copies disappear or derive?
        ↓
Can required artifacts be generated?
        ↓
If independent representations remain, what enforcement exists?
```

This is explanatory orientation, not an executable decision algorithm. Specialized consistency and spec-to-code checkers remain complementary tools.

## What an audit looks for

An audit may trace a semantic fact through a chain like this:

```text
important semantic fact
      ↓
candidate canonical semantic owner
      ↓
independent representation
      ↓
existing enforcement
      ↓
missing enforcement / silent-green risk
```

A candidate owner is not trusted automatically, and an apparent duplicate may be intentional or independently authoritative. Repository and external authority decide what owns the meaning. Existing types, schemas, generators, checks, tests, or CI may already make the required relationship safe.

### A small FRUITS story

Suppose a repository contains:

```ts
export const FRUITS = [
  { id: "apple", color: "red" },
  { id: "banana", color: "yellow" },
  { id: "grape", color: "purple" },
] as const;

export const RED_FRUIT_IDS = ["apple"];
```

An audit might observe:

```text
important semantic fact
  apple.color = red

candidate canonical semantic owner
  FRUITS

possible independent representation
  RED_FRUIT_IDS = ["apple"]

existing enforcement
  possibly none

risk
  FRUITS could change while RED_FRUIT_IDS stays stale
  and the repository remains GREEN
```

This does not prove that `FRUITS` is authoritative or that `RED_FRUIT_IDS` is defective. The audit still establishes semantic equivalence, readers, writers, compatibility, and repository authority before classifying the relationship.

## From a finding to better ownership

If repository evidence confirms one canonical semantic owner, a useful mental model is:

```text
              confirmed canonical semantic owner
                         │
       ┌─────────────────┼─────────────────┐
       ↓                 ↓                 ↓
    derive/use       inspect/derive    derive/verify
       ↓                 ↓                 ↓
  production            audit              guard
```

Derivation need not mean importing one literal symbol. Audits and guards may inspect or verify derived or generated representations. Independent external or compatibility authority may remain separate, similar syntax does not establish shared semantic ownership, and intentional role separation is valid.

As intuition—not a second normative rule definition—the anti-stale preference is:

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

[`SKILL.md`](./SKILL.md) owns the exact invariant and authority semantics.

### Derive when independent authority is unnecessary

If repository evidence confirms `FRUITS` as the canonical semantic owner and the second representation does not require independent authority, calculate it instead of maintaining another copy:

```ts
const redFruitIds =
  FRUITS
    .filter((fruit) => fruit.color === "red")
    .map((fruit) => fruit.id);
```

Here `redFruitIds` obtains the relevant meaning from `FRUITS`. Derivation is not automatically the right design when compatibility or another authority requires independence.

### Generate when an artifact must exist

Sometimes documentation, JSON, configuration, code, or another representation must exist as a separate artifact. Where repository authority permits, generate it from the confirmed owner:

```text
canonical semantic owner
        ↓
     generate
        ↓
stored representation
```

A tracked generated artifact can still become stale or be edited independently. A read-only `--check` or equivalent can compare expected generated output with the stored artifact:

```text
canonical semantic owner
        ↓
expected generated output
        ↓ compare
stored artifact
        ↓
match = GREEN
stale = RED
```

Generation is not mandatory. If two independently authoritative representations must remain separate and cannot derive from one another, a parity or compatibility check may be appropriate. [Guard proof guidance](./references/guard-proof.md) explains how to evaluate such evidence without treating one responsive example as broad closure.

## Two root-cause principles

### Trace apparent drift upstream

When a downstream difference appears to be drift, trace the **current authority and dependency chain** before calling it defective. Establish what currently causes or authorizes the difference. Current authority and dependency evidence comes before optional Git history.

The difference may be intentional repository-specific semantics, an external compatibility constraint, legitimate derivation, stale propagation, duplicate ownership, a local defect, or unresolved. If authority cannot be resolved safely, the audit reports `DO NOT GUESS` and `COMPATIBILITY_RISK`.

### Find causal and authoritative leverage

The audit may use these optional graph-local analytical roles:

```text
ROOT → DOMAIN → STATE → DERIVED → FLOW → LEAF
```

They are not a required repository architecture. The useful node is the highest-leverage relevant node that is both causal for the violated invariant and authoritative for the semantic fact. `ROOT` is not automatically defective; `FLOW` or `LEAF` may be causal. Confirmed repository or external authority overrides generic ordering.

The [constitution](./references/constitution.md) explains the rationale. `SKILL.md` owns the executable rules and exact role meanings.

## Rule map

Navigation only. Exact invariant definitions are owned by [`SKILL.md`](./SKILL.md).

<details open>
<summary>Rule map</summary>

<!-- BEGIN GENERATED ANTI-DRIFT RULE MAP -->

| ID | Rule | What it means |
| --- | --- | --- |
| `AD-01` | Canonical semantic ownership | One semantic fact should have one canonical semantic owner. Other representations should derive from it, be generated from it, or be mechanically checked against it unless legitimate independent authority requires separation. |
| `AD-02` | Trace apparent drift upstream | Before judging a downstream inconsistency, trace the current dependency and authority chain upstream to establish what presently causes or authorizes the difference. |
| `AD-03` | Authority precedence | Applicable explicit user, confirmed repository-specific, and independently authoritative external requirements override Repository Anti-Drift generic guidance. |
| `AD-04` | Observed behavior is evidence | Observed working behavior is evidence and a characterization or preservation baseline, not automatic semantic authority. |
| `AD-05` | Causal and authoritative leverage | Prefer the highest-leverage relevant node that is both causal for the violated invariant and authoritative for the semantic fact. |
| `AD-06` | Dependency-graph analysis roles | `ROOT → DOMAIN → STATE → DERIVED → FLOW → LEAF` are optional, graph-local analytical roles rather than required repository architecture. |
| `AD-07` | Independent compatibility authority | An externally, publicly, or compatibility-authoritative contract may remain an independent oracle and must not be collapsed merely for internal uniformity. |
| `AD-08` | Semantic constraint continuity | Preserve semantic constraints across helpers, APIs, adapters, DTOs, serialization, transport, and other boundaries while semantic decisions continue. |
| `AD-09` | Verification ownership | Tests, fixtures, guards, snapshots, documentation, generated artifacts, and other verification surfaces are consumers or evidence unless independently authoritative, and must not silently become duplicate semantic owners. |
| `AD-10` | DO NOT GUESS | Do not make an unresolved semantic choice without sufficient authority. |
| `AD-11` | Remove unsafe capability before guarding misuse | When authority, compatibility, and local design permit, prefer removing an unsafe semantic capability over guarding particular spellings or usages. |
| `AD-12` | Full-denominator reasoning | Claims and enforcement boundaries must identify the full relevant denominator where practical, rather than infer a whole-surface conclusion from convenient examples. |
| `AD-13` | Responsiveness is not closure | One controlled representative `GREEN → RED → GREEN` falsifier demonstrates responsiveness to that falsifier, not structural, universal, or failure-class closure. |
| `AD-14` | Evidence proportional to claim | Evidence strength must be proportionate to the strength and denominator of the semantic, guard, or closure claim. |
| `AD-15` | Anti-stale ordering | Subject to repository authority, prefer not storing duplicate meaning, then direct derivation, then generation, then mechanical verification of unavoidable duplication. |
| `AD-16` | Similar appearance is not duplicate ownership | Similar appearance or syntax does not establish duplicate semantic ownership, and intentional role separation remains valid. |
| `AD-17` | Policy versus deterministic evidence | Instructions and policy can define expectations, while deterministic repository-native mechanisms provide stronger enforcement evidence where enforcement is required. |
| `AD-18` | Generalize failure classes | Generalize the failure class and invariant, not the repository-specific technique that happened to fix one instance. |
| `AD-19` | Reject false convergence | Snapshots, allow-lists, thresholds, exceptions, compatibility layers, or manual synchronization do not establish convergence merely because current checks are green. |

<!-- END GENERATED ANTI-DRIFT RULE MAP -->

</details>

## Existing projects come first

Observed behavior is evidence and a characterization or preservation baseline, not automatic semantic authority. It may represent intended behavior, a defect, compatibility, migration state, stale propagation, or accident.

Before treating artifacts as duplicates, the audit inspects their readers, writers, runtime/build/test/CI responsibilities, external constraints, and dependencies. Unresolved ownership, work-in-progress intent, or compatibility is reported rather than guessed.

Repository-specific authority outranks generic guidance. An independently authoritative standard, schema, protocol, or compatibility contract may also govern a semantic fact. See [existing-project guidance](./references/existing-project.md).

## Guard and closure evidence

A green guard proves only that the inspected state is accepted. Existing evidence of one controlled falsifier moving `GREEN → RED → GREEN` demonstrates responsiveness to that falsifier; it does not by itself prove structural or failure-class closure.

The audit may inspect characterization, falsification, structural, CI, counterexample, and guard evidence produced outside the auditor. Evidence must be proportionate to the claimed scope and denominator. No second AI, reviewer, model, language, framework, or test mechanism is generically required.

See [guard proof guidance](./references/guard-proof.md).

## Safe by default

The audit profile is always read-only with respect to the target. It does not create, edit, delete, or rename target files; install dependencies; run write-mode generators; change Git state; create pull requests; change visibility; perform destructive Git operations; or grant permission for those operations.

The authoring profile grants no capability or authority. A coding agent may modify only what its independently authorized task permits. Invalid invocations fail closed before Anti-Drift profile work.

## Audit options

Most audits need no extra options; omit them for systematic discovery from the repository root.

| Option | When useful |
| --- | --- |
| `scope=` | Limit automatic discovery to one repository subtree. |
| `canonical=` | Validate a suspected semantic owner rather than trusting it automatically. |
| `compare=` | Examine selected representations and their semantic relationship; a difference is not automatically drift. |

Exact option semantics remain owned by [`SKILL.md`](./SKILL.md). Paths remain read-only evidence and do not authorize changes.

```text
Repository Anti-Drift scope=packages/billing
Repository Anti-Drift canonical=schemas/order.json
Repository Anti-Drift \
  compare=docs/order-format.md \
  compare=src/order-parser.ts
Repository Anti-Drift \
  canonical=schemas/order.json \
  compare=docs/order-format.md \
  compare=src/order-parser.ts
```

The supplied `canonical=` value is a candidate to validate, not an unquestioned authority. The audit still checks repository-specific and independently authoritative evidence. A difference found through `compare=` is not automatically drift; the audit traces its current cause and authority before classifying it.

Using `canonical=` with `compare=` is a useful advanced pattern: propose a suspected authority candidate while selecting the suspected drift surfaces whose semantic relationships should be evaluated.

<details>
<summary>How targeted canonical comparisons work</summary>

The audit validates the candidate authority while comparing the selected surfaces. Coverage is targeted, so unsearched surfaces are not claimed drift-free. The audit does not invent relationships among repeated inputs, presume that the candidate is authoritative, or classify a difference as defective merely because it is visible.

</details>

### Response-only output

Repository Anti-Drift returns its audit result in the response. It does not create audit files or persistent audit history.

## Enforcement

Repository Anti-Drift is not a replacement for specialized tools. Enforcement may already exist in a compiler, type system, schema validator, generator check, static analyzer, architecture tool, exact-identity test, or CI.

The auditor reports current ownership and enforcement, gaps, coverage, evidence, and closure requirements. Repository authority determines which mechanisms are legitimate.

## Requirements

- one compatible coding agent;
- access required by the selected profile and independently authorized task;
- no particular AI vendor or second reviewer.

## Supported environments

Repository Anti-Drift is methodology-first and vendor-neutral. Repository-specific instructions, security boundaries, tools, and authoritative contracts take precedence over generic guidance.

## Contributing

Ideas, bug reports, counterexamples, and methodology proposals are welcome. Trivial corrections may use a direct pull request; methodology and governance changes should be discussed first, and security-sensitive work remains maintainer-controlled unless specifically invited. See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Support / Sponsorship

Sponsorship does not buy roadmap priority, review priority, governance authority, or acceptance. See [`CONTRIBUTING.md`](./CONTRIBUTING.md#sponsorship-independence).

## License

Apache License 2.0. See [`LICENSE`](./LICENSE) and [`NOTICE`](./NOTICE).

Brand use, endorsement, and affiliation rules are documented in [`BRANDING.md`](./BRANDING.md).
