# Existing Project Audit Guidance

Use this reference when auditing a mature repository with established behavior, tests, generators, CI, agent instructions, compatibility commitments, or other governance. [`../SKILL.md`](../SKILL.md) governs executable audit behavior.

## Preserve behavior while authority is unresolved

Observed behavior is evidence and a characterization or preservation baseline, not automatic semantic authority. It may represent intended behavior, a defect, legacy compatibility, migration state, stale propagation, or accident.

An audit does not alter production behavior, public APIs, persisted formats, generated artifact meaning, installed Skills, agent configuration, or work in progress. When intent is unresolved, report `COMPATIBILITY_RISK` and `DO NOT GUESS`.

## Inspect authority in context

Use the authority precedence defined by `SKILL.md`: explicit requirements and confirmed repository authority precede repository governance and native mechanisms, which precede generic guidance. An independently authoritative external standard, schema, protocol, or contract may govern the relevant semantic fact.

For each relevant artifact, inspect:

- readers and writers;
- runtime, build, test, CI, documentation, migration, and agent-tooling roles;
- candidate semantic owners and derivation paths;
- public, persisted, generated, or external compatibility contracts;
- current guard and enforcement coverage;
- work-in-progress changes and unresolved transitions.

Do not infer responsibility from filenames or visual similarity.

## Trace apparent differences before classification

For an apparent downstream inconsistency:

```text
observe the difference
        ↓
trace the current authority and dependency chain upstream
        ↓
establish what presently causes or authorizes it
        ↓
classify the finding, or report authority unresolved
```

Current authority and dependency evidence comes before optional historical explanation. Use Git history only when current evidence is insufficient and history can resolve the question.

The optional `ROOT → DOMAIN → STATE → DERIVED → FLOW → LEAF` roles may help describe a particular dependency graph. Do not invent missing roles, force one repository-wide hierarchy, or assume the highest node is defective. `FLOW` or `LEAF` may be causal; external authority may outrank an internal node.

## Mandatory read-only inventory

Capture, as applicable:

- Git-visible working-tree state, including untracked paths;
- instruction and authority surfaces;
- package/task runner and safe check commands;
- generators and check-only behavior;
- tests, types, lint, architecture/parity/static guards, hooks, and CI;
- candidate owners, readers, writers, derived artifacts, and independent representations;
- affected denominator and unsearched surfaces.

Compare Git-visible state before and after inspection and report exactly what was measured. Do not create a target-repository inventory, baseline, cache, or temporary state file.

## Finding classification

### `ALREADY_ENFORCED`

Evidence supports a credible owner and deterministic enforcement for the claimed denominator. State what is enforced and the proof limits.

### `POLICY_ONLY`

A rule is documented or instructed, but available evidence does not show deterministic enforcement. State the policy, affected denominator, and missing closure evidence.

### `CURRENT_DRIFT`

Repository evidence establishes a present contradiction, stale propagation, duplicate semantic ownership, or violated invariant after its current cause and authority have been investigated.

### `COMPATIBILITY_RISK`

Ownership, intent, dependency, external authority, work in progress, or safe interpretation cannot be established. Show the conflicting evidence, state `DO NOT GUESS`, and identify only conditions needed to resolve the uncertainty.

## Working-tree safety

Never disturb user work. An uncommitted deletion, rename, relocation, apparent replacement, or similar transition does not by itself establish intended final architecture. Compare committed and uncommitted evidence and report provisional conclusions.

The auditor does not run write-capable generators, install dependencies, introduce falsifiers, change Git state, or authorize another actor to do so.

## Legacy drift and denominator

Do not treat every historical imperfection as one unbounded finding. Report current live drift, affected surfaces, risk, and denominators accurately. Distinguish a recurrence class from unrelated historical differences.

A small known-offender list is not evidence of complete coverage when future consumers enter a broader denominator. Report whether discovery is systematic within scope, targeted, or limited.

## Closure conditions

For each material finding, state what must become true:

- semantic ownership is established or explicitly resolved;
- duplicate ownership or stale propagation no longer violates the invariant;
- required compatibility remains intact;
- semantic constraints remain connected where decisions continue;
- guard evidence covers the claimed denominator;
- unresolved intent is resolved by appropriate authority;
- a fresh audit confirms the resulting state.

These conditions do not select architecture, files, techniques, ordering, or repository operations. Corrective work occurs separately under external authority.
