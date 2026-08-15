# Existing Project Guidance

Use this reference for mature repositories with existing behavior, tests, generators, CI, agent instructions, or other governance.

## Default: behavior preserving

Anti-drift remediation is structural by default.

Unless the user explicitly requests semantic change, preserve:
- production behavior;
- public APIs;
- persisted formats;
- generated artifact meaning;
- installed Skills and agent configuration.

## Authority order

```text
existing behavior + explicit user requirements
        ↓
repository-specific Constitution / AGENTS.md / CLAUDE.md / scoped rules
        ↓
repository-native types / schemas / generators / tests / guards / CI
        ↓
Repository Anti-Drift generic guidance
```

## Mandatory read-only inventory

Before applying changes, inspect:
- working tree;
- instruction surfaces;
- package/task runner;
- relevant build/test/type/lint commands;
- generators and check modes;
- existing architecture/parity/static guards;
- hooks and CI;
- candidate owners;
- readers and writers;
- duplicate or generated representations.

Do not infer responsibility from filenames.

## Finding classes

### `ALREADY_ENFORCED`
The invariant already has a credible canonical owner and deterministic enforcement.

Action: prefer reuse. Do not add a redundant guard.

### `POLICY_ONLY`
The repository states a rule but does not mechanically enforce it.

Action: identify the smallest repository-native enforcement option.

### `CURRENT_DRIFT`
Two or more independent representations already disagree, or stale derived material exists.

Action: identify root cause, restore ownership, and prevent recurrence.

### `COMPATIBILITY_RISK`
Ownership, behavior, dependency, or safe consolidation cannot be established with confidence.

Action:

```text
DO NOT GUESS
    ↓
report evidence and safe options
    ↓
remain read-only on that surface
```

## Working-tree safety

Never destroy user work.

Do not use:
- `git reset --hard`;
- `git clean -fd`;
- broad checkout/revert operations that can erase unrelated changes.

For controlled mutation proof, revert only the mutation introduced by the proof.

## Legacy drift

Do not require all historical drift to be repaired before the governance model becomes useful.

Prefer:

```text
prevent new drift
        ↓
identify highest-risk live drift
        ↓
repair separate root causes in bounded work
```

Avoid turning governance installation into an unbounded cleanup project.

## Existing mechanisms first

Before creating a new helper, registry, scanner, or guard, prove that the repository's existing mechanisms cannot express the invariant adequately.

A smaller repository with fewer ownership surfaces is generally better than a larger repository with more anti-drift machinery.
