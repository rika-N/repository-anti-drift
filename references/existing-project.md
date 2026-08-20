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

Observed behavior is a characterization and preservation baseline, not automatic semantic authority. Preserve it while intent is unresolved, but do not silently promote behavior that may be a bug, legacy compatibility, migration state, stale implementation, or accident into canonical truth.

## Authority order

```text
explicit user requirements + confirmed repository-specific authority
        ↓
repository-specific Constitution / AGENTS.md / CLAUDE.md / scoped rules
        ↓
repository-native types / schemas / generators / tests / guards / CI
        ↓
Repository Anti-Drift generic guidance
```

Use observed behavior as evidence when determining intended semantics. Treat it as authoritative only when explicit authority or repository evidence confirms that role. If intent remains unresolved, preserve behavior and report `COMPATIBILITY_RISK` rather than guessing.

## Mandatory read-only inventory before handoff

Before generating an implementation handoff, Repository Anti-Drift inspects:
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

`SKILL.md` defines the handoff mode and authorization contract. This reference only supplies existing-project safety requirements for that handoff.

## Finding classes

### `ALREADY_ENFORCED`
The invariant already has a credible canonical owner and deterministic enforcement.

Handoff direction: prefer reuse. Do not request a redundant guard.

### `POLICY_ONLY`
The repository states a rule but does not mechanically enforce it.

Handoff direction: identify the smallest repository-native enforcement option.

### `CURRENT_DRIFT`
Two or more independent representations already disagree, or stale derived material exists.

Handoff direction: request root-cause remediation that restores ownership and prevents recurrence.

### `COMPATIBILITY_RISK`
Ownership, behavior, dependency, or safe consolidation cannot be established with confidence.

Handoff behavior:

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

When an implementation handoff conditionally requests controlled mutation proof, require the external implementation agent to revert only the mutation it introduced. Repository Anti-Drift does not perform the mutation or revert.

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

Before creating a new helper, registry, scanner, or guard, assess the repository's existing mechanisms and record why reuse or extension is insufficient. Justify a new enforcement surface with evidence that it is simpler, safer, or better aligned with repository authority.

A smaller repository with fewer ownership surfaces is generally better than a larger repository with more anti-drift machinery.
