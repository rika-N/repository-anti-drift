# Repository Anti-Drift

**Keep AI-assisted repositories from accumulating multiple sources of truth.**

> A checker asks whether several representations still match. Repository Anti-Drift first asks what currently causes or authorizes their differences and whether those representations have legitimate independent authority.

Repository Anti-Drift has **one canonical methodology** and two mutually exclusive usage profiles. The following Quick Start shows when and how to use each profile. [`SKILL.md`](./SKILL.md) remains the sole canonical executable methodology and formal owner of the Anti-Drift rules.

## Quick Start

Run a read-only audit:

```text
anti-drift
```

With no `use=` selector, Repository Anti-Drift defaults to audit.

### Audit

Use audit when you want Repository Anti-Drift to inspect the repository and report semantic drift, duplicated ownership, authority conflicts, stale representations, or weak enforcement. Audit is read-only. It does not change the repository.

```text
anti-drift use=audit
```

### Authoring

Use authoring when a coding task is already authorized and you want the same Anti-Drift rules to guide design, implementation, and verification while that task is being carried out.

```text
anti-drift use=authoring
```

Authoring is **not** a write mode and does not make Repository Anti-Drift a separate implementing actor. It only supplies Anti-Drift constraints to a coding task that already has permission to make changes. It does not create new permission to edit files, install dependencies, commit, push, open or merge pull requests, or change repository settings.

After the coding task is finished, run a fresh, separate audit against the resulting repository state. Authoring helps keep the work aligned with Anti-Drift rules while changes are being made, but it does not certify the final repository state. A fresh audit is required for that assessment (called Anti-Drift closure in the formal methodology).

Select exactly one profile. Audit and authoring cannot be combined.

Invalid or ambiguous input—including the former `anti-drift=` selector—is rejected rather than guessed (`INVALID_INVOCATION`).

[`SKILL.md`](./SKILL.md) defines the complete invocation grammar.

### After an audit

Repository Anti-Drift reports findings but does not apply fixes.

Give the audit result to your already-authorized coding agent and ask it to address the findings. The coding agent remains responsible for any edits, tests, commits, or other implementation work.

After the changes are complete, run a fresh audit against the resulting repository state.

Audit also supports optional targeting with `scope=`, `canonical=`, and `compare=`; see [Audit options](#audit-options) below.

Install the Skill:

```bash
npx skills add rika-N/repository-anti-drift
```

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
| Guards that remain green despite known violations | Which kinds of drift they catch and what their evidence proves |
| Two independent representations that must coexist | Whether independent authority or compatibility justifies both |
| A downstream difference with unclear intent | What current authority or dependency causes it |

Repository Anti-Drift is especially useful for long-running AI-assisted projects where code still works but specifications, documentation, tests, generated artifacts, and production behavior have evolved unevenly.

Common warning signs include:

- nobody knows which copy is authoritative;
- the same rule appears across code, tests, docs, config, registries, generated files, or CI;
- stale artifacts recur after local corrections;
- semantic constraints weaken across helpers, APIs, or adapters;
- the repository is green while relevant representations disagree;
- guard coverage is inferred from remembered examples rather than the full relevant surface;
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

## Reduce search-path variation to improve audit reproducibility

LLMs can take different search paths across runs, even when the repository has not changed. As a result, an important relationship found in one audit may be missed in another.

Repository Anti-Drift reduces this variation by running five required semantic passes in a fixed order before combining the results.

1. **L1 — Semantic ownership**

   Who owns this meaning?

2. **L2 — Authority conflicts**

   Do two authorities disagree?

3. **L3 — Derivation / propagation**

   Does the meaning stay intact as it moves?

4. **L4 — Generated / stored representations**

   Can a copied or generated representation become stale?

5. **L5 — Enforcement / false convergence**

   Would the repository notice if the meaning drifted?

A systematic audit runs all five passes in this order. They are not five selectable modes, and a pass does not need to produce a finding. [`SKILL.md`](./SKILL.md) defines the exact execution requirements.

### A small fruit example

Suppose a repository stores both a fruit catalog and a separate list of red fruit IDs:

```ts
export const FRUITS = [
  { id: "apple", color: "red" },
  { id: "banana", color: "yellow" },
  { id: "grape", color: "purple" },
] as const;

```

The five passes ask who owns the meaning, whether another authority requires the separate list, whether the relationship survives propagation, whether the stored list can become stale, and whether any guard would notice. The repeated value is not automatically a defect: the audit first checks how each representation is used and what authority supports it.

### Derive, generate, or check

If repository evidence confirms that `FRUITS` owns the meaning and no independent authority requires a second copy, the red IDs can be derived:

```ts
const redFruitIds = FRUITS
  .filter((fruit) => fruit.color === "red")
  .map((fruit) => fruit.id);
```

When a separate artifact must exist, it may instead be generated from the confirmed owner. Because a stored generated artifact can still become stale, a read-only check can compare the expected output with the stored file. If two representations have legitimate independent authority, neither should be collapsed into the other; a compatibility or parity check may be the right relationship.

## Find the real source before changing anything

A difference is not always a bug, and the place where it appears is not always the place that causes it.

Repository Anti-Drift asks:

- **What is causing this difference?**
- **What is supposed to define the meaning?**

A difference may result from:

- stale information;
- duplicated logic or data;
- an intentional repository-specific rule;
- an external compatibility requirement;
- work that is still being migrated;
- an actual defect.

Existing behavior matters, but it is not automatically correct. Before calling something drift, the audit checks what depends on the behavior and what repository or external authority supports it. If the evidence is insufficient, the audit reports the uncertainty instead of guessing.

[Read the detailed rationale](./references/constitution.md). For more about evaluating established behavior, see the [existing-project guidance](./references/existing-project.md).

## A green check is not enough

A passing test or guard tells us that the repository passes that check right now.

It does not automatically prove that the check would catch every important form of future drift.

Repository Anti-Drift therefore asks:

**What kind of change would make this check fail?**

One intuitive test is:

1. repository is GREEN;
2. introduce one controlled semantic mistake;
3. the relevant guard turns RED;
4. remove the mistake;
5. the guard returns to GREEN.

This demonstrates that the guard responds to that particular controlled mistake. It does not prove that every possible variation is covered. Stronger claims require broader evidence.

[Read the guard and falsification guidance](./references/guard-proof.md).

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

## Safe by default

The profiles do not expand the permissions of the task or coding agent using them. See [Audit](#audit) and [Authoring](#authoring) for the read-only audit boundary and authoring authority boundary.

## Audit options

Most audits need no extra options; omit them for systematic discovery from the repository root.

| Option | When useful |
| --- | --- |
| `scope=` | Limit automatic discovery to one repository subtree. |
| `canonical=` | Validate a suspected semantic owner rather than trusting it automatically. |
| `compare=` | Examine selected representations and their semantic relationship; a difference is not automatically drift. |

Exact option semantics remain owned by [`SKILL.md`](./SKILL.md). Paths remain read-only evidence and do not authorize changes.

```text
anti-drift scope=packages/billing
anti-drift canonical=schemas/order.json
anti-drift \
  compare=docs/order-format.md \
  compare=src/order-parser.ts
anti-drift \
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
