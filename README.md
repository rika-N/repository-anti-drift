# Repository Anti-Drift

**Keep AI-assisted repositories from accumulating multiple sources of truth.**

> A checker asks whether several representations still match. Repository Anti-Drift first asks what currently causes or authorizes their differences and whether those representations have legitimate independent authority.

Repository Anti-Drift is a **read-only repository governance auditor**. It identifies drift and contradictions, traces current authority and dependencies, investigates root cause and semantic ownership, evaluates guard and closure evidence, and reports the conditions required for findings to close.

It never changes a target repository, chooses how corrective work is performed, or grants authority to perform it. [`SKILL.md`](./SKILL.md) is the sole canonical executable audit methodology.

## Input and output

| | |
|---|---|
| **Input** | A repository, plus optional audit inputs such as `scope`, `canonical`, `compare`, and `report` |
| **Output** | Audit facts, evidence, root causes, ownership findings, risks, limitations, and closure conditions |

```text
Use repository-anti-drift
```

The omitted mode means AUDIT. An explicit `mode=audit`, compared ASCII-case-insensitively after trimming surrounding ASCII whitespace, also means AUDIT. Any other explicit mode value returns generic `INVALID_MODE` before inspection or report processing and has zero side effects.

## Quick Start

Install the Skill:

```bash
npx skills add rika-N/repository-anti-drift
```

Then audit a repository:

```text
Use repository-anti-drift
Use repository-anti-drift mode=audit scope=src/billing
```

Review the findings, evidence, root cause, semantic owner or candidate owners, affected surfaces, guard coverage, compatibility risk, limitations, and closure conditions. Corrective work happens separately under authority external to Repository Anti-Drift. Run a fresh audit afterward to determine whether a finding actually closed.

See [`INSTALL.md`](./INSTALL.md) for installation and invocation details.

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

Repository Anti-Drift is always read-only with respect to the target. It does not create, edit, delete, or rename target files; install dependencies; run write-mode generators; change Git state; create pull requests; change visibility; perform destructive Git operations; or grant permission for those operations.

Invalid explicit modes fail closed before target inspection and report processing. There is no write capability.

### Optional audit targeting

`scope=` bounds automatic discovery. `canonical=` supplies a candidate owner for validation, and `compare=` supplies a requested comparison target. Paths remain read-only evidence and do not authorize changes.

### Output stays explicit

By default, the audit returns through the normal response and writes nothing. `report=<path>` may request one full Markdown audit report at an exact external path.

The parent directory must already exist, the destination must not exist, and the path must be outside the target repository. Repository Anti-Drift does not overwrite, create directories, invent a substitute path, or create cache/history state. The report contains audit facts and closure conditions only.

## Enforcement

Repository Anti-Drift is not a replacement for specialized tools. Enforcement may already exist in a compiler, type system, schema validator, generator check, static analyzer, architecture tool, exact-identity test, or CI.

The auditor reports current ownership and enforcement, gaps, coverage, evidence, and closure requirements. Repository authority determines which mechanisms are legitimate.

## Requirements

- one compatible coding agent;
- read access to the repository and relevant authority;
- permission for any requested external report destination;
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
