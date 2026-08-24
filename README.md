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

## Is Repository Anti-Drift right for your repository?

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

Repository Anti-Drift is especially useful for long-running AI-assisted projects where specifications, documentation, tests, generated artifacts, and production behavior have evolved unevenly.

Common warning signs include:

- nobody knows which copy is authoritative;
- the same rule appears across code, tests, docs, config, registries, generated files, or CI;
- stale artifacts recur after local corrections;
- semantic constraints weaken across helpers, APIs, or adapters;
- the repository is green while relevant representations disagree;
- guard coverage is inferred from remembered examples rather than the full denominator.

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

<details>
<summary>Rule map</summary>

<!-- BEGIN GENERATED ANTI-DRIFT RULE MAP -->

| ID | Rule |
| --- | --- |
| `AD-01` | Canonical semantic ownership |
| `AD-02` | Trace apparent drift upstream |
| `AD-03` | Authority precedence |
| `AD-04` | Observed behavior is evidence |
| `AD-05` | Causal and authoritative leverage |
| `AD-06` | Dependency-graph analysis roles |
| `AD-07` | Independent compatibility authority |
| `AD-08` | Semantic constraint continuity |
| `AD-09` | Verification ownership |
| `AD-10` | DO NOT GUESS |
| `AD-11` | Remove unsafe capability before guarding misuse |
| `AD-12` | Full-denominator reasoning |
| `AD-13` | Responsiveness is not closure |
| `AD-14` | Evidence proportional to claim |
| `AD-15` | Anti-stale ordering |
| `AD-16` | Similar appearance is not duplicate ownership |
| `AD-17` | Policy versus deterministic evidence |
| `AD-18` | Generalize failure classes |
| `AD-19` | Reject false convergence |

<!-- END GENERATED ANTI-DRIFT RULE MAP -->

</details>

## One semantic fact, one canonical semantic owner

A canonical semantic owner is the artifact or authority that defines a semantic fact. Similar-looking artifacts are not automatically duplicates: tests, documentation, schemas, generated outputs, public contracts, compatibility layers, and runtime state can have distinct roles.

Where one owner is established, related representations should ordinarily derive from it, be generated from it, or be mechanically checked against it. Audit and production should derive from the same semantic owner where applicable. Independently authoritative external contracts may require a separate oracle.

The audit reports:

- the finding and direct evidence;
- the present root cause or unresolved candidates;
- the canonical semantic owner or candidate owners;
- the violated invariant;
- affected surfaces and denominator;
- current guard coverage and proof limits;
- compatibility risks and unresolved intent;
- conditions that must become true for closure;
- limitations on search, measurement, or inference.

Those facts say **what is wrong, why, who owns the meaning, and what must become true**. They do not select a repository change, technique, file set, work sequence, or commit structure.

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
