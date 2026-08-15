---
name: repository-anti-drift
description: Audit or install repository anti-drift governance for AI-assisted software development. Use when asked to apply a repository constitution, prevent architecture/design drift, eliminate duplicate semantic ownership or sources of truth, prevent stale docs/tests/generated artifacts, design deterministic architecture guards, or prove guards with representative forbidden mutations. Do not use for ordinary feature or bug work unless anti-drift governance is explicitly part of the task.
---

# Repository Anti-Drift

Make repository integrity survive agent forgetfulness.

This skill governs *how to install or audit anti-drift architecture*. It is not a license to perform broad refactors.


## Agent and security-boundary contract

Repository Anti-Drift requires **one compatible coding agent**, not a multi-agent stack.

- Work with the coding agent already approved for the repository.
- Do not require ChatGPT, Claude, Codex, or any other specific vendor by default.
- Do not require a second AI service for review.
- Do not require a GitHub App, new external SaaS, or new scanner by default; use one only when the user explicitly chooses it, the repository justifies it, and the existing security boundary permits it.
- Respect the repository's existing security boundary and data-sharing policy.
- A second independent agent may be used as optional assurance only when the user explicitly chooses it.

The maintainer's own development workflow is not a requirement for users of this Skill.



## Compatibility preservation contract

Repository Anti-Drift must not become a source of drift itself.

For an existing project, **preserve the project's working behavior, repository-specific governance, and installed Skills unless the user explicitly asks to change them**.

### Authority order

When rules conflict, use this default precedence:

```text
existing project behavior and explicit user requirements
        ↓
repository-specific constitution / AGENTS.md / CLAUDE.md / scoped rules
        ↓
repository-native types / schemas / generators / tests / guards / CI
        ↓
Repository Anti-Drift generic guidance
```

Repository Anti-Drift is a governance aid, not an automatic replacement for repository-specific governance.

If a generic Anti-Drift recommendation conflicts with an existing repository-specific rule or protection:
- do not overwrite the existing mechanism automatically;
- report `COMPATIBILITY_RISK`;
- explain the conflict and the smallest safe options;
- remain read-only unless the user explicitly authorizes the resolution.

### Existing project protections

Before proposing removal, consolidation, or replacement of an existing artifact:

1. identify its readers and writers;
2. determine whether it has runtime, build, test, CI, documentation, migration, or agent-tooling responsibilities;
3. determine whether another Skill or tool depends on it;
4. distinguish semantic duplication from intentional role separation;
5. preserve public interfaces and observable behavior unless a behavior change is explicitly requested.

Do not assume that two similar files or rules are duplicates.

Do not delete or replace an existing helper, registry, generator, guard, hook, instruction file, Skill, compatibility layer, or CI step merely because a cleaner architecture is imaginable.

### Other Skills and agent configuration

By default, do not modify:
- other installed Skills;
- global agent Skill directories;
- unrelated `CLAUDE.md`, `AGENTS.md`, or scoped rule files;
- hooks or plugin configuration;
- agent marketplace/cache state.

Only modify another Skill or global agent configuration when the user explicitly places it in scope.

Repository-local Skill files may be audited in `mode=audit` / `mode=plan`, but remain read-only unless explicitly included in `mode=apply` scope.

### Behavior-preserving default

For existing repositories, anti-drift remediation is **behavior-preserving by default**.

If the task is governance/canonicalization rather than a requested feature or bug fix:
- production behavior should remain unchanged;
- public API behavior should remain unchanged;
- persisted data formats should remain unchanged;
- generated artifact semantics should remain unchanged.

If anti-drift remediation would require a semantic behavior change, separate that change from the structural remediation and report it for explicit approval.

### Baseline before apply

Before `mode=apply` changes in an existing repository:

1. inspect working-tree status;
2. preserve all pre-existing user changes;
3. identify the smallest relevant baseline checks;
4. run safe baseline checks when practical;
5. record any pre-existing failures as `BASELINE_RED`;
6. do not claim the anti-drift change caused or fixed a pre-existing failure without evidence.

After the change, rerun the same relevant checks.

If a baseline cannot be established safely, report the limitation and avoid high-risk structural changes.

### Safe stop rule

If ownership, dependency, compatibility, or behavior preservation is uncertain:

```text
DO NOT GUESS
    ↓
REPORT COMPATIBILITY_RISK
    ↓
PROPOSE SAFE OPTIONS
    ↓
DO NOT MODIFY THAT SURFACE
```

This stop rule applies even in `mode=apply`.

## Safety-first invocation contract

**Fail-safe default: if no mode is specified, use `mode=audit`.**

The user must not have to remember a sentence such as `Do not change files yet.` to remain safe.

Treat the following as Skill invocation parameters written in the prompt. They are **not shell flags** and do not require a separate parser.

### `mode=audit` — default

Read-only repository audit.

Allowed:
- read files;
- search the repository;
- inspect Git status/history;
- run commands that are known to be read-only/check-only;
- report findings.

Forbidden:
- edit, create, delete, rename, or format repository files;
- run generators in write mode;
- install/update dependencies;
- introduce forbidden mutations;
- change Git state;
- commit, push, merge, rebase, reset, clean, stash, or checkout files.

If a useful command might modify the working tree and there is no safe check-only form, do not run it. Report it as `NOT RUN`.

### `mode=plan`

Everything in `mode=audit`, plus a concrete minimal remediation plan.

`mode=plan` is still read-only. Do not edit files.

### `mode=apply`

File changes are allowed **only because the user explicitly selected `mode=apply`**.

Before changing anything:
1. inspect and record the current working-tree state;
2. identify pre-existing user changes;
3. define the approved scope;
4. preserve all pre-existing user changes.

In `mode=apply`:
- make only the minimum approved changes;
- prefer remove duplicate > derive > generate > guard unavoidable duplication;
- do not commit or push unless separately and explicitly requested;
- do not install/update dependencies unless separately and explicitly requested;
- do not use destructive Git commands to restore the tree;
- never use `git reset --hard`, `git clean -fd`, or an equivalent broad destructive operation as part of normal proof/revert.

If the requested mode is missing, misspelled, ambiguous, or conflicts with another instruction, choose the safer mode and report the ambiguity.

### Optional `scope=...`

Limit the audit or changes to a repository area.

Examples:

```text
Use repository-anti-drift mode=audit
Use repository-anti-drift mode=audit scope=src/billing
Use repository-anti-drift mode=plan scope=docs
Use repository-anti-drift mode=apply scope=src/permissions
```

If `scope` is omitted, use the repository as the audit scope.
For `mode=apply`, do not expand beyond the approved scope merely because adjacent cleanup looks useful.

### Authorization boundary

`mode=audit` and `mode=plan` never authorize file changes.

`mode=apply` authorizes repository edits within the approved scope, but **does not** by itself authorize:
- commits;
- pushes;
- pull requests;
- package installation or upgrades;
- destructive Git operations;
- unrelated refactors.

Those require separate explicit user intent.

## Core invariants

1. **One semantic fact, one owner.**
2. **Derived truth must share fate with its canonical source.**
3. **Share semantics, not merely similar-looking code.**
4. **Instructions guide; machines enforce.**
5. **No new architectural surface without proof.**
6. **Exact identities over counts when identities are knowable.**
7. **Prove important guards with a representative forbidden mutation.**
8. **Converge locally before remote CI.**

Read `references/constitution.md` when deciding architecture or enforcement policy.

## Choose the operating mode

### New project
Read `references/new-project.md`.

Use this mode when the repository is new or still has little historical architecture. Establish the constitution and enforcement baseline before normal feature development expands.

### Existing project
Read `references/existing-project.md`.

Use this mode for mature repositories. Do not require all historical drift to be repaired before the constitution can be installed. Separate:
- `ALREADY_ENFORCED`
- `POLICY_ONLY`
- `CURRENT_DRIFT`
- `COMPATIBILITY_RISK`

Prevent new drift first; repair legacy drift as separate root-cause work.

### Guard design or guard validation
Read `references/guard-proof.md`.

Use this whenever adding, changing, or claiming coverage from an architecture/static/parity/generated-artifact guard.

## Mandatory Phase 0: read-only inventory

Phase 0 is mandatory in every mode.

In `mode=audit` and `mode=plan`, the task ends without repository writes.

In `mode=apply`, do not write until Phase 0 is complete and the requested scope is understood.

Unless the repository was already audited in the current task with fresh evidence, inspect before changing architecture.

At minimum determine:

- repository instruction surfaces;
- package/task runner and local verification commands;
- typecheck/lint/test mechanisms;
- generators and check-only modes;
- existing architecture/static/parity guards;
- pre-commit/pre-push hooks and CI gates;
- candidate canonical owners for the semantics involved;
- readers and writers of those owners;
- generated or manually duplicated representations;
- existing user changes in the working tree.

Do not infer behavior from filenames alone. Read implementations or run read-only inspection commands.

Do not create a permanent hand-maintained inventory merely to satisfy this step.

## Before adding a structure

Before adding a registry, helper, adapter, mapping, allow-list, compatibility layer, ledger, duplicate schema, or new source of truth, answer:

1. Does an owner already exist?
2. Can the required behavior be derived from it?
3. Can an existing shared abstraction be safely extended?
4. Would the proposal create a second representation of the same semantic fact?
5. If a new surface is truly necessary, what existing architecture is unable to represent the requirement?

If these questions are unresolved, do not add the new surface.

## Preferred anti-stale hierarchy

Use the strongest applicable option:

1. Do not store the derived claim.
2. Derive it directly.
3. Generate it from the canonical source.
4. Mechanically verify unavoidable duplication.
5. Never use manual synchronization as the permanent solution.

Apply this to documentation, tests, fixtures, snapshots, registries, generated artifacts, comments that assert machine-readable facts, and compatibility maps.

## Enforcement

Treat instruction files as policy, not proof.

For important invariants, prefer repository-native deterministic enforcement:
- type system/compiler;
- linter/static analysis;
- schema validator;
- generator check mode;
- architecture/parity/AST guard;
- exact-identity or characterization test.

Prefer reusing existing enforcement over introducing a new framework.

A unified local anti-drift entrypoint is useful when it can orchestrate existing checks without becoming a giant all-knowing guard. It should be deterministic, read-only, locally runnable, and reasonably lightweight.

## Tests and identities

Tests must not silently become a second semantic owner.

When an exact identity set is knowable, prefer exact identity assertions over counts, floors, or thresholds. A stable count does not prove a stable set.

Use a characterization test when intentionally pinning current behavior; label it as a contract rather than pretending it is derived truth.

## Guard proof

Never claim an important guard is effective merely because the repository is green.

For a representative forbidden state, establish:

1. current state -> GREEN;
2. introduce one controlled forbidden mutation;
3. target guard -> RED;
4. revert **only the controlled mutation you introduced**;
5. target guard -> GREEN again.

Forbidden mutation is never performed in `mode=audit` or `mode=plan`.

Before mutation proof in `mode=apply`:
- identify pre-existing working-tree changes;
- do not overwrite or revert them;
- avoid mutation proof if the target cannot be isolated safely;
- report `NOT RUN` rather than using a broad reset/clean operation.

Prefer a mutation where ordinary compilation/tests remain green and the target guard alone detects the architectural violation, when feasible.

See `references/guard-proof.md`.

## No constitutional weakening for convenience

Do not weaken a constitution rule, guard, parity contract, exact-identity assertion, or generator check merely to make the feature/fix that benefits from the weakening pass.

If an invariant appears wrong:
1. stop that implementation path;
2. demonstrate the contradiction with repository evidence;
3. characterize current behavior;
4. propose the invariant change separately;
5. keep the beneficiary feature/fix logically separate.

## False convergence is prohibited

Do not present the following alone as a root-cause solution:

- snapshot update;
- allow-list expansion;
- lower floor or threshold;
- disabled/skipped test;
- commented-out guard;
- `--no-verify`;
- broad exception;
- manually synchronized docs or registries;
- another compatibility layer.

Temporary use for diagnosis or a controlled forbidden mutation is allowed only if reverted before completion.

## Verification sequence

Use repository-native commands and keep expensive work late:

1. targeted type/static checks;
2. targeted characterization/tests;
3. relevant generators;
4. fixed-point check when generation exists;
5. check-only/stale verification;
6. relevant architecture/parity guards;
7. representative forbidden mutation proof for new/changed important guards;
8. broader local convergence;
9. remote CI only after local convergence when the workflow permits.

Do not turn remote CI into the first drift-discovery mechanism.

## Reporting

Report material findings as:

- **FACT** — directly observed repository fact.
- **INTERPRETATION** — what the fact supports.
- **CHANGE** — what was changed.
- **PROOF** — green/red/revert evidence.
- **LIMIT** — what the mechanism does not cover.
- **NEXT** — the next minimal action.

Keep measured facts separate from inference.

## Stop conditions

Stop adding architecture and report instead when:

- an existing canonical structure already satisfies the need;
- an existing guard already protects the invariant;
- the proposed registry would duplicate an owner;
- the proposed ledger would create manual synchronization debt;
- deleting duplication is stronger than adding parity machinery;
- generation removes the need for a parity guard;
- semantic equivalence cannot be established;
- the proposed guard cannot be made RED by a representative forbidden mutation;
- the abstraction only makes the current task locally easier without establishing shared semantic ownership.
