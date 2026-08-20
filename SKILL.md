---
name: repository-anti-drift
description: Audit or install repository anti-drift governance for AI-assisted software development. Use when asked to apply a repository constitution, prevent architecture/design drift, eliminate duplicate semantic ownership or sources of truth, prevent stale docs/tests/generated artifacts, design deterministic architecture guards, validate guard responsiveness, or assess failure-class closure. Do not use for ordinary feature or bug work unless anti-drift governance is explicitly part of the task.
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

For an existing project, **preserve the project's observed working behavior, repository-specific governance, and installed Skills unless the user explicitly asks to change them**. Preservation is a safety default, not a declaration that observed behavior is semantically authoritative.

### Authority order

When rules conflict, use this default precedence:

```text
explicit user requirements and confirmed repository-specific authority
        ↓
repository-specific constitution / AGENTS.md / CLAUDE.md / scoped rules
        ↓
repository-native types / schemas / generators / tests / guards / CI
        ↓
Repository Anti-Drift generic guidance
```

Repository Anti-Drift is a governance aid, not an automatic replacement for repository-specific governance.

Observed current behavior is evidence and a characterization or preservation baseline. It may reflect intended behavior, but it may also reflect a bug, legacy compatibility, migration state, stale implementation, or accident. Do not silently promote it to canonical semantic authority. When intent is unresolved, preserve the observed behavior and report the uncertainty.

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

Repository-local Skill files may be inspected in any mode, but Repository Anti-Drift never modifies them or any other target-repository file. An implementation prompt may include them only when they are inside the user's explicitly authorized implementation scope.

### Behavior-preserving default

For existing repositories, anti-drift remediation is **behavior-preserving by default**.

If the task is governance/canonicalization rather than a requested feature or bug fix:
- production behavior should remain unchanged;
- public API behavior should remain unchanged;
- persisted data formats should remain unchanged;
- generated artifact semantics should remain unchanged.

If anti-drift remediation would require a semantic behavior change, separate that change from the structural remediation and report it for explicit approval.

### Baseline requirements for implementation handoff

Before requesting changes in an existing repository, an implementation prompt should require the external implementation agent to:

1. inspect working-tree status;
2. preserve all pre-existing user changes;
3. identify the smallest relevant baseline checks;
4. run safe baseline checks when practical;
5. record any pre-existing failures as `BASELINE_RED`;
6. not claim the implementation caused or fixed a pre-existing failure without evidence;
7. rerun the same relevant checks after the change.

If a baseline cannot be established safely, preserve that limitation in the handoff and do not request high-risk structural changes.

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

This stop rule applies in every mode and must be preserved in an implementation prompt.

## Safety-first invocation contract

**Fail-safe default: if no mode is specified, use `mode=audit`.**

The valid normal modes are `mode=audit`, `mode=plan`, and `mode=handoff`. Repository Anti-Drift treats the target repository as read-only in all three.

The user must not have to remember a sentence such as `Do not change files yet.` to remain safe.

Treat the following as Skill invocation parameters written in the prompt. They are **not shell flags** and do not require a separate parser. The optional `scope=`, `canonical=`, `compare=`, and `report=` parameters are also prompt-level inputs. `canonical=` and `compare=` may be repeated. `report=` is not repeatable; one audit produces at most one explicitly requested report file.

Once an explicitly supplied `mode` value has been identified, trim its surrounding ASCII whitespace, compare it ASCII-case-insensitively, and canonicalize recognized values to `audit`, `plan`, `handoff`, or `apply`. Do not use Unicode normalization, fuzzy matching, typo correction, synonyms, or natural-language inference. An unknown value remains unknown. Ordinary prose such as `apply the findings` does not supply a mode value; when no explicit `mode` parameter is present, use the default audit mode.

### `mode=audit` — default

Read-only repository audit.

Allowed:
- read files;
- search the repository;
- inspect Git status/history;
- run commands that are known to be read-only/check-only;
- report findings through the normal response;
- write one explicitly requested `report=<path>` outside the audited repository after validating it under the report-output contract below.

Forbidden:
- edit, create, delete, rename, or format tracked or untracked files in the audited repository;
- run generators in write mode;
- install/update dependencies;
- introduce forbidden mutations;
- change Git state;
- commit, push, merge, rebase, reset, clean, stash, or checkout files.

If a useful command might modify the working tree and there is no safe check-only form, do not run it. Report it as `NOT RUN`.

An audit may establish that the inspected state has no actionable Anti-Drift findings within its claimed coverage. It does not remediate findings.

### `mode=plan`

Everything in `mode=audit`, plus a concrete minimal remediation design that addresses root cause, recurrence prevention, and verification.

`mode=plan` is still read-only with respect to the audited repository. Do not edit its files, index, or Git state.

Like `mode=audit`, `mode=plan` may write one explicitly requested report outside the audited repository under the report-output contract below. This exception does not weaken read-only treatment of the repository, its index, or its Git state.

A plan is remediation design, not implementation, and does not close its findings.

### `mode=handoff`

Perform audit and planning as necessary, then return exactly one implementation prompt for a user-chosen external coding agent. The implementation prompt is returned in the response by default.

Repository Anti-Drift does not directly modify the target repository in this or any other normal mode. It must not:
- edit, create, delete, rename, or format target files;
- run write-mode generators against the target;
- modify tests or guards;
- introduce or revert controlled proof mutations;
- install or update dependencies;
- stage, commit, push, or create a pull request;
- change repository visibility.

These are capability boundaries, not operations unlocked by confirmation. The user separately chooses and authorizes an external implementation agent.

#### Recommendation and authorization

A recommendation, remediation idea, example, or inferred convenience never grants authorization.

The implementation prompt must carry a concise authorization envelope that distinguishes recommended, requested, authorized, and unauthorized operations where necessary. It may request target edits, new files, deletion or rename, write-mode generator execution, test or guard changes, or controlled falsification only when the operation is inside the explicitly authorized implementation scope. Repository-specific governance still outranks generic guidance.

For dependency installation or update, commit, push, pull-request creation, repository-visibility changes, and destructive Git, state the authorization status explicitly. If the user has not separately authorized an operation, communicate `UNAUTHORIZED` wherever omission could reasonably be interpreted as permission. Never require commit, push, or pull-request creation. Broad destructive recovery such as `git reset --hard` or `git clean -fd` must remain prohibited in the implementation prompt.

#### Implementation prompt contract

Where applicable, the one implementation prompt must identify:
- the target repository and explicit implementation scope;
- identifiable findings and finding classes;
- observed evidence and canonical or candidate semantic-owner evidence;
- repository-specific authority;
- current-behavior preservation boundaries;
- allowed and forbidden edit surfaces;
- `COMPATIBILITY_RISK` stop conditions;
- root-cause remediation, duplicate-owner prevention, and recurrence prevention;
- the structural or capability-reducing remediation preference;
- a representative verification environment;
- closure limits;
- authorization status for dependencies, commit, push, pull requests, repository visibility, and destructive Git;
- the requirement for a fresh Repository Anti-Drift audit before Anti-Drift closure.

Include characterization, guards, falsification, known fix-independent falsifiers, specialized or remote verification, and generator, deletion, or rename instructions only when applicable. A write-mode generator may be requested only when repository authority supports it, its output boundaries are known, and it is inside the authorized implementation scope.

The prompt must not require a second AI, model, or reviewer; a particular testing framework; TypeScript, AST tooling, or static typing; a generator; irrelevant mutation testing; commit, push, or pull-request creation; or a permanent handoff registry or ledger.

#### `COMPATIBILITY_RISK` in handoff

When authority, work-in-progress intent, rename or relocation intent, behavioral intent, external ownership, or a compatibility contract is unresolved, preserve the uncertainty and relevant evidence. State what cannot be inferred, state `DO NOT GUESS`, and instruct the implementation agent to stop on that surface. Independently safe work may continue only when it is separable and cannot prejudge the unresolved decision. Never instruct the agent to choose the most likely architecture.

#### Legacy `mode=apply`

Canonicalized `apply` is a recognized deprecated former mode. This includes explicitly supplied values such as `mode=apply`, `mode=APPLY`, `mode=Apply`, and values with surrounding ASCII whitespace. It performs no target mutation and must not silently run audit, plan, or handoff. Return a concise migration message stating that nothing was modified and require a new explicit `mode=handoff` request. It is not an alias for handoff.

If no mode is supplied, or an unrelated mode value is misspelled, ambiguous, or invalid, choose the safer `mode=audit` and report any ambiguity. The legacy `mode=apply` behavior above is the intentional exception to that fallback.

### Optional `scope=...`, `canonical=...`, and `compare=...`

`scope=` defines the automatic discovery boundary. If it is omitted, use the repository root as the automatic discovery boundary.

`canonical=` identifies a user-specified canonical owner for validation. `compare=` identifies a user-specified comparison target. Both may be repeated.

Examples:

```text
Use repository-anti-drift
Use repository-anti-drift mode=audit canonical=src/graph/categories.ts
Use repository-anti-drift mode=audit canonical=src/graph/categories.ts compare=docs/category.md
Use repository-anti-drift mode=audit scope=src/graph canonical=src/graph/categories.ts
```

Resolve supplied paths relative to the repository root. A supplied path must exist, be readable, and remain inside the repository and its security boundary. Do not interpret supplied paths as globs, and do not escape the repository through `..` or symlink traversal.

If a supplied path is missing, inaccessible, ambiguous, or outside the allowed boundary, report the invalid input and do not infer a replacement.

Explicit `canonical=` and `compare=` paths outside `scope` may be read as user-requested comparison context when they satisfy those path rules. They do not expand automatic discovery into surrounding repository surfaces.

In `mode=handoff`, `scope=` remains the automatic discovery boundary; it is not implementation authorization. The implementation prompt must separately state an explicit authorized implementation scope. Explicit canonical or comparison paths are read-only evidence and never grant or expand edit authorization.

### Input selection and discovery

Use the supplied `canonical=` and `compare=` inputs as follows:

#### `canonical` omitted and `compare` omitted

Systematically search within the automatic discovery boundary for:

- candidate canonical owners;
- related representations of the same semantic facts;
- readers and writers;
- tests, documentation, configuration, and schemas;
- generators and generated artifacts;
- architecture, static, and parity guards;
- CI and other enforcement.

Do not rely on simple string matching alone. Look for independently maintained representations of the same semantic facts.

Describe candidate canonical owners as discovered or inferred from repository evidence. Do not label them `USER_SPECIFIED_CANONICAL`.

#### `canonical` specified and `compare` omitted

Label each supplied canonical path `USER_SPECIFIED_CANONICAL`. Validate it against repository-specific authority and existing mechanisms, then systematically auto-discover relevant comparison targets within the automatic discovery boundary. Report those targets as `AUTO_DISCOVERED`.

#### `canonical` specified and `compare` specified

Validate the supplied canonical owners, then perform the requested targeted semantic comparison. Report the comparison targets as `USER_SPECIFIED` and report:

```text
Coverage:
  TARGETED

Limit:
  Unsearched surfaces were not evaluated and are not claimed drift-free.
```

Do not auto-discover additional comparison targets.

#### `canonical` omitted and `compare` specified

Treat the comparison targets as `USER_SPECIFIED`. Search systematically within the automatic discovery boundary for relevant candidate canonical owners. Report:

```text
Canonical owner:
  CANONICAL_NOT_YET_CONFIRMED
```

List the strongest candidate owners and the authority and ownership evidence for each. Do not silently promote a candidate to canonical merely because it looks plausible.

### Canonical provenance and authority

`USER_SPECIFIED_CANONICAL` records only that the user supplied the path. It does not certify that repository evidence agrees that the path is authoritative.

Always inspect repository-specific authority and existing mechanisms before relying on a supplied canonical owner. If they conflict:

- report `COMPATIBILITY_RISK`;
- show the conflicting evidence;
- do not silently resolve the conflict;
- do not rewrite related surfaces based on that owner;
- in handoff, direct the external implementation agent not to modify the conflicted surface until the conflict is explicitly resolved.

When canonical owners or comparison targets are repeated, do not assume a Cartesian product. Determine which paths actually share relevant semantic facts and report those relationship groups. If the mapping is ambiguous, report the ambiguity rather than inventing one.

### Optional `report=...`

`report=` requests one full Markdown audit report at the exact supplied destination. It is a prompt-level input, not a shell flag, and does not require a CLI parser.

Examples:

```text
Use repository-anti-drift mode=audit
Use repository-anti-drift mode=audit report=/tmp/graphView-audit.md
Use repository-anti-drift mode=audit scope=src/graph report=~/Documents/graphView-audit.md
```

If `report=` is omitted:

- return the audit result through the normal agent or shell response;
- do not create a Markdown report file or report directory;
- do not choose `/tmp`, the user's home directory, or the audited repository as an automatic destination;
- do not create `.repository-anti-drift`, `~/.repository-anti-drift`, a report history, a cache, or equivalent persistent state.

`report=<path>` grants permission to write only that requested report file. It does not authorize repository edits, change the automatic discovery boundary, expand `canonical=` or `compare=` discovery, authorize changes to owners or targets, change Git state, or authorize unrelated files or directories.

Before writing a report:

1. resolve the effective destination;
2. expand `~` when the environment supports it;
3. resolve a relative path deterministically against the invocation/current working directory and report the resolved destination;
4. require a concrete file path, not a glob;
5. reject ambiguous paths and traversal or symlink behavior that changes the destination unexpectedly;
6. respect the environment's existing security boundary and filesystem permissions;
7. require the parent directory to exist; do not create a report directory implicitly;
8. verify that the destination does not already exist.

Never overwrite or truncate an existing destination based on `report=` alone, and do not silently choose another filename. Report that it exists. A follow-up may explicitly approve replacement of that exact file; do not add a force or overwrite option for this purpose.

In every normal mode, the effective report destination must be outside the audited repository. If it resolves inside the repository, do not write it; report that the request conflicts with the no-direct-mutation boundary, and do not substitute another destination.

If an external destination cannot be written, do not fall back into the repository. Report the limitation and provide the full report through the normal response when practical.

`report=` remains specific to an audit report and must not be overloaded to mean an implementation prompt.

In `mode=handoff`, the implementation prompt is returned only in the response unless the user explicitly requests that it be saved to an exact external path. Apply the same safe-output principles: the parent directory must already exist, the destination must not exist, and no directory, alternate name, suffix, fallback path, in-repository destination, or silent overwrite may be invented. Replacing that exact existing external file requires separate explicit authorization. Do not add a `handoff=<path>` parameter.

One invocation may create at most one external output artifact. A handoff invocation must not create both an audit report and a saved implementation prompt.

### Authorization boundary

No Repository Anti-Drift mode authorizes Repository Anti-Drift to change the target repository, including its tracked files, untracked files, index, dependencies, Git state, remote state, pull requests, or visibility. Its only permitted filesystem outputs are one explicitly requested and safely validated external audit report, or in handoff one explicitly requested and safely validated external implementation prompt.

Authorization carried by a handoff prompt governs only the user-chosen external implementation agent. It does not expand Repository Anti-Drift's capabilities.

## Core invariants

1. **One semantic fact, one owner.**
2. **Derived truth must share fate with its canonical source.**
3. **Share semantics, not merely similar-looking code.**
4. **Instructions guide; machines enforce.**
5. **No new architectural surface without evidence-based justification.**
6. **Use exact identities when membership is the invariant.**
7. **Match guard evidence to the scope of the claim.**
8. **Use the cheapest trustworthy environment that exercises the invariant.**
9. **Preserve semantic constraints while semantic decisions continue.**
10. **Generalize failure classes, not repository-specific fixes.**

Read `references/constitution.md` when deciding architecture or enforcement policy.

### Genericity gate

Before promoting a lesson from one repository into generic Repository Anti-Drift doctrine:

1. identify the generic failure class demonstrated by the repository observation;
2. test whether the proposed invariant still holds when the repository, language, framework, runtime, CI or verification topology, reviewer, syntax, and implementation mechanism change;
3. confirm that more than one repository-appropriate mechanism can satisfy the invariant where multiple mechanisms are possible.

If the lesson does not pass this gate, keep it scoped as a repository-local rule, implementation option, recommendation, or example. Do not create a registry or ledger to record this assessment.

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

Phase 0 is mandatory in every normal mode. Every mode ends without target-repository writes by Repository Anti-Drift.

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

In every normal mode, mechanically record the repository's Git-visible state before the inspection and compare it with the state after the inspection. At minimum use read-only Git status that includes untracked paths. When practical and proportionate, also compare staged and unstaged diffs and read-only content hashes for relevant untracked files so an unchanged status label is not mistaken for unchanged content.

Do not create a baseline, cache, or temporary state file inside the audited repository. Report exactly what was compared. If the before/after evidence differs, do not claim non-mutation; report the difference and whether concurrent user activity prevents attribution.

Git-visible comparison does not by itself prove that ignored files, operating-system temporary files, external filesystem or service state, or any other unmeasured surface remained unchanged. If those surfaces were not measured, report that limitation.

Apply the input-selection rules above to decide which owners and comparison targets are discovered. Repository-specific authority, relevant existing mechanisms, and uncommitted work must still be inspected for every configuration.

Do not infer behavior from filenames alone. Read implementations or run read-only inspection commands.

Do not create a permanent hand-maintained inventory merely to satisfy this step.

### Unresolved uncommitted intent

If a finding materially depends on an unresolved uncommitted deletion, rename, relocation, untracked apparent replacement, or comparable work-in-progress transition, do not infer the intended final architecture from the working tree alone.

Unless repository-specific authority or an explicit user instruction confirms the intended final state:

- classify the WIP-dependent relationship as `COMPATIBILITY_RISK`;
- state that the interpretation is provisional;
- show the relevant committed and uncommitted evidence;
- preserve the existing WIP;
- do not rewrite paths, owners, or architecture based on guessed intent.

An independently established current divergence may still be `CURRENT_DRIFT` when that conclusion does not depend on guessing the unresolved WIP's intended final state.

## Before adding a structure

Before adding a registry, helper, adapter, mapping, allow-list, compatibility layer, ledger, duplicate schema, or new source of truth, answer:

1. Does an owner already exist?
2. Can the required behavior be derived from it?
3. Can an existing shared abstraction be safely extended?
4. Would the proposal create a second representation of the same semantic fact?
5. What evidence shows that a new surface is simpler, safer, or better aligned with repository authority than reusing or extending an existing mechanism?

If these questions are unresolved, do not add the new surface.

Use an evidence-based assessment, not a requirement to prove that every existing mechanism is incapable. A justified new surface must still avoid speculative governance and duplicate semantic ownership.

### Remove unsafe capability before guarding its misuse

If a semantic operation should never be performed by a consumer, before adding a guard ask whether that operation can be made unavailable or unrepresentable through a narrower API, type or schema constraints, visibility boundaries, canonical constructors or codecs, owner-provided read or operation APIs, or other repository-native structural boundaries.

Prefer making invalid semantics unrepresentable over searching for every possible syntax that expresses the invalid operation:

```text
canonical semantic owner
        ↓
legitimate construction / read / operation API
        ↓
consumers
```

Types, schemas, APIs, visibility, constructors, and codecs are enforcement surfaces derived from repository-specific semantic ownership. This is not an absolute "type first" rule: some languages cannot express the invariant strongly, and serialization, public APIs, reflection, legacy seams, generated artifacts, or alternate runtimes may leave escape surfaces that still require guards.

### Preserve constraints across semantic boundaries

A strong semantic representation at its owner is insufficient if a helper, API, adapter, DTO, or other intermediate representation weakens the constraint while downstream code continues making semantic decisions.

During audit and remediation, trace required constraints across every boundary where semantic processing continues. Preserve them with repository-appropriate mechanisms. Controlled widening is allowed at an explicit serialization, transport, display, diagnostic, or external boundary where downstream code does not infer domain semantics from the weakened representation. If semantic processing resumes later, require explicit validation, reconstruction, or another repository-appropriate re-establishment of the constraint.

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

Semantic authority defines current meaning. A verification artifact observes, pins, compares, or derives from that meaning; it does not silently become current semantic authority merely because a test or guard depends on it.

Tests, fixtures, guards, characterization tables or data, baselines, generated verification artifacts, docs, scripts, and audit helpers can become duplicate semantic or encoding owners. Characterization may pin approved or current behavior for regression detection, but that does not automatically make its table the canonical semantic owner. A baseline is a regression or reference artifact, not automatic semantic authority. A generated artifact is a derived representation, not automatic semantic authority.

When encoding semantics are implementation-owned, do not hand-reconstruct opaque or encoded identities outside their canonical semantic owner or canonical constructor, codec, or encoder. Production and verification consumers must not independently reimplement delimiters, prefixes or suffixes, field order, serialized keys, signatures, labels used as identity, precedence encoding, or positional identity.

```text
semantic components
        ↓
canonical constructor / codec / encoder
        ↓
derived encoded identity
```

A test or fixture may store semantic components, then mechanically obtain the encoded value through the canonical mechanism. Do not create a separate handwritten codec catalog.

An external, public, or independently governed compatibility contract may instead be the semantic authority for an expected representation. In that case, verification may need an independent contract oracle and must not be forced through the production encoder when that would create common-mode silent-green behavior. Distinguish an authoritative independent oracle from duplicate implementation-owned encoding.

Before adding a test, guard, fixture, expected-value table, characterization dataset, baseline, or generated verification artifact:

1. identify the canonical semantic owner of every semantic fact it uses;
2. determine whether each expected representation is owned by the implementation or by an independent authoritative contract;
3. for implementation-owned opaque identities, identify and use the canonical constructor, codec, or encoder;
4. preserve an independent expected representation when it is an authoritative contract oracle;
5. if another independent representation must remain, explain why derivation or generation is inappropriate and mechanically enforce the required relationship.

Keep this check proportional. Do not create a registry or ledger merely to record it.

When membership or identity is the semantic invariant, prefer exact identity assertions over counts, floors, or thresholds that merely proxy for membership. A stable count does not prove a stable set. When quantity itself is authoritative, use the appropriate numeric contract.

Use a characterization test when intentionally pinning current behavior; label it as a contract rather than pretending it is derived truth.

## Guard proof

Never claim an important guard is effective merely because the repository is green.

When applicable, an implementation prompt may require the external implementation agent to establish guard responsiveness to a representative forbidden state:

1. current state -> GREEN;
2. introduce one controlled forbidden mutation;
3. target guard -> RED;
4. revert **only the controlled mutation you introduced**;
5. target guard -> GREEN again.

This proves responsiveness to that falsifier. It does not by itself prove structural or failure-class closure.

For a load-bearing boundary, any closure claim requires evidence proportionate to the claimed scope and must not rely solely on falsifiers selected after seeing the completed fix. Establish the claimed failure class and use repository-appropriate, fix-independent evidence where practical. `references/guard-proof.md` defines the detailed procedure and possible evidence sources; no specific reviewer, AI model, or testing mechanism is mandatory.

Repository Anti-Drift never performs the forbidden mutation or its revert. Before requesting mutation proof, the handoff must require the external implementation agent to:
- identify pre-existing working-tree changes;
- not overwrite or revert them;
- avoid mutation proof if the target cannot be isolated safely;
- report `NOT RUN` rather than use a broad reset/clean operation.

Prefer a mutation where ordinary compilation/tests remain green and the target guard alone detects the architectural violation, when feasible.

See `references/guard-proof.md`.

## Fresh audit and Anti-Drift closure

```text
handoff generated
≠ implementation completed
≠ Anti-Drift closure
```

An external implementation agent reporting success, including green tests, is implementation evidence rather than Anti-Drift closure. Repository Anti-Drift may declare a remediated finding `CLOSED` or `CONVERGED` only after a fresh inspection of the resulting repository state appropriate to the original finding and claimed remediation.

Fresh means a new inspection. It does not generically require a different model, vendor, reviewer, or repository clone. Re-evaluate, as applicable, the original root cause, semantic ownership, remaining independent copies, recurrence prevention, verification artifacts, capability or guard boundaries, applicable falsifiers, compatibility constraints, and claimed closure scope.

Descriptive lifecycle language may say `finding open`, `remediation planned`, `handoff generated`, `implementation externally reported`, and `awaiting fresh audit`. Do not create a permanent closure-state registry or treat those descriptions as new normative finding classes.

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

An implementation prompt may permit temporary use for diagnosis or a controlled forbidden mutation only when applicable, authorized, safely isolated, and reverted by the external implementation agent before implementation completion.

## Verification workflow

Verification must be trustworthy, proportionate to risk, ordered according to real dependencies, and sufficient for the claimed convergence. Do not require a repository to possess every mechanism below.

Where applicable, a useful verification design for an implementation prompt is:

1. targeted type/static checks;
2. targeted characterization/tests;
3. relevant generators when authorized and repository-appropriate;
4. fixed-point check when generation exists;
5. check-only/stale verification;
6. relevant architecture/parity guards;
7. responsiveness or closure evidence appropriate to claims about new or changed important guards;
8. broader verification in the cheapest representative environment;
9. remote or specialized verification for invariants that require it.

Repository Anti-Drift itself may inspect generator definitions and generated artifacts and run safe check-only commands, but it never runs a write-mode generator against the target. The external implementation agent may execute the designed workflow only within its authorization envelope.

Prefer local execution when it is available and semantically representative. Use remote or specialized environments when they are the first or only trustworthy way to exercise an OS/runtime matrix, cloud integration, remote-only secret, distributed environment, hardware-specific behavior, deployment behavior, or remote infrastructure. These are examples, not required categories, and local-first is not mandatory when it would not exercise the invariant.

## Reporting

### Default response

Always return a concise completion summary through the normal agent or shell response. Do not dump a large report unless detail is useful or the requested report could not be written.

Use a structure similar to:

```text
Repository Anti-Drift — audit complete

Target: graphView
Mode: audit

Findings:
  3 CURRENT_DRIFT
  2 POLICY_ONLY
  2 COMPATIBILITY_RISK

Repository changes:
  NONE — mechanically checked for the Git-visible state described below.

Full report:
  /tmp/graphView-audit.md
```

Show `Full report:` only after `report=` was successfully written. If `report=` was omitted, do not imply that a report file exists. If writing failed, state that explicitly and include the resolved destination when known. The response may include the highest-risk findings after the summary.

### Audit configuration and findings

Begin an audit report with an `Audit configuration` block that records how its inputs and coverage were determined. Use the applicable form, for example:

```text
Audit configuration

Canonical owners:
  USER_SPECIFIED_CANONICAL
  - src/graph/categories.ts

Comparison targets:
  AUTO_DISCOVERED

Search boundary:
  src/graph

Coverage:
  SYSTEMATIC_SEARCH_WITHIN_SCOPE
```

For a targeted comparison, report:

```text
Comparison targets:
  USER_SPECIFIED
  - docs/category.md

Coverage:
  TARGETED

Limit:
  Unsearched surfaces were not evaluated and are not claimed drift-free.
```

When `compare=` is supplied without `canonical=`, report:

```text
Canonical owner:
  CANONICAL_NOT_YET_CONFIRMED

Candidate owners:
  - <path>: <authority / ownership evidence>
```

Use these labels consistently:

- `USER_SPECIFIED_CANONICAL`;
- `USER_SPECIFIED`;
- `AUTO_DISCOVERED`;
- `CANONICAL_NOT_YET_CONFIRMED`;
- `TARGETED`;
- `SYSTEMATIC_SEARCH_WITHIN_SCOPE`.

These are provenance and coverage labels, not new finding classes. For systematic discovery, say that the relevant repository surfaces within scope were systematically searched; do not claim mathematical completeness or imply that every possible semantic relationship was provably found.

Report material findings as:

- **FACT** — directly observed repository fact.
- **INTERPRETATION** — what the fact supports.
- **CHANGE** — what was changed.
- **PROOF** — green/red/revert evidence.
- **LIMIT** — what the mechanism does not cover.
- **NEXT** — the next minimal action.

Keep measured facts separate from inference.

### Optional full Markdown report

When `report=` is successfully validated, write the full report to that destination using the presentation guidance in `references/audit-report.md`. `SKILL.md` remains authoritative for execution, safety, finding classes, provenance, and coverage semantics; the reference controls presentation only.

An audit report is a derived observation of repository state at audit time. It is not automatically a canonical specification, semantic owner, repository authority, or source of truth for a future audit. Every future audit must inspect the repository again rather than trusting an old report as current truth.

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
