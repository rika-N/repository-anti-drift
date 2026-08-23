---
name: repository-anti-drift
description: Read-only audit of repository anti-drift governance for AI-assisted software development. Use to assess architecture/design drift, duplicate semantic ownership or sources of truth, stale docs/tests/generated artifacts, deterministic architecture guards, guard responsiveness, or failure-class closure. Do not use for ordinary feature or bug work unless anti-drift governance is explicitly part of the task.
---

# Repository Anti-Drift

Make repository integrity survive agent forgetfulness.

Repository Anti-Drift has exactly one capability: **AUDIT**. It reports audit facts and implementation-neutral closure conditions. It does not design or perform repository changes.

## Agent and security-boundary contract

Repository Anti-Drift requires one compatible coding agent, not a multi-agent stack.

- Work with the coding agent already approved for the repository.
- Do not require ChatGPT, Claude, Codex, or another specific vendor by default.
- Do not require a second AI service, model, or reviewer.
- Do not require a GitHub App, external SaaS, or new scanner by default.
- Respect the repository's existing security boundary and data-sharing policy.
- A second independent agent is optional assurance only when the user explicitly chooses it.

The maintainer's own development workflow is not a requirement for users of this Skill.

## Compatibility preservation and authority

Repository Anti-Drift must not become a source of drift itself.

For an existing project, preserve observed working behavior, repository-specific governance, and installed Skills unless explicit, confirmed authority requires otherwise. Preservation is a safety baseline, not a declaration that observed behavior is semantically authoritative.

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

An independently authoritative external standard, schema, protocol, or compatibility contract may outrank an internal repository node for the semantic fact it governs. Repository-specific authority and confirmed external authority override generic taxonomy guidance.

Observed current behavior is evidence and a characterization or preservation baseline. It may reflect intended behavior, a bug, compatibility, migration state, stale propagation, or accident. Do not silently promote it to canonical semantic authority.

Similar-looking files, rules, schemas, tests, documentation, generated artifacts, or compatibility layers must not be consolidated without authority and ownership evidence. Before classifying apparent duplication, identify readers, writers, runtime/build/test/CI/documentation responsibilities, external constraints, and dependencies from other Skills or tools. Distinguish duplicate semantic ownership from intentional role separation.

If authority, ownership, dependency, compatibility, or behavior is unresolved:

```text
DO NOT GUESS
    ↓
REPORT COMPATIBILITY_RISK
    ↓
STATE THE UNRESOLVED EVIDENCE
    ↓
STATE ONLY CONDITIONS REQUIRED FOR CLOSURE
```

Do not choose a likely interpretation or a way to change the unresolved surface.

## Invocation contract

The sole supported capability is `audit`.

- If no explicit mode value is supplied, run AUDIT.
- If a mode value is explicit, trim only surrounding ASCII whitespace and compare only ASCII-case-insensitively.
- A normalized value equal to `audit` runs AUDIT. Thus `audit`, `AUDIT`, `Audit`, and ` audit ` resolve to AUDIT.
- Do not use Unicode normalization, fuzzy matching, synonyms, typo correction, or prose inference.
- Ordinary prose does not supply a mode value unless it is presented as the invocation's explicit mode value.

Any other explicit value follows one generic `INVALID_MODE` path:

```text
INVALID_MODE
Supported capability: audit
```

On `INVALID_MODE`, terminate before target inspection and before processing or writing `report=`. Perform no repository operation, create no file or directory, create no cache or history, emit no report, and cause zero side effects. Do not identify, enumerate, canonicalize, or give special responses to any particular invalid value. There are no compatibility branches and no write mode.

Treat `scope=`, `canonical=`, `compare=`, and `report=` as prompt-level audit inputs, not shell flags. `canonical=` and `compare=` may repeat. `report=` may not repeat.

## Read-only audit boundary

Repository Anti-Drift is a read-only auditor. It never directly mutates the target repository and never grants permission to mutate it.

It may:

- read and search files within the applicable security boundary;
- inspect Git status and history;
- run commands known to be read-only or check-only;
- inspect existing test, characterization, guard, CI, structural-check, counterexample, and externally produced falsification evidence;
- return audit facts and closure conditions in the response;
- write one explicitly requested external audit report after validating the report-output contract.

It must not:

- create, edit, delete, rename, or format target files;
- choose target files authorized for mutation;
- run target generators in write mode;
- install or update target dependencies;
- introduce or revert controlled proof mutations;
- stage, commit, push, merge, rebase, reset, clean, stash, or check out target changes;
- create a target pull request or change target repository visibility;
- perform destructive Git operations;
- grant permission for any of those operations.

If a useful command might change the target and has no safe check-only form, do not run it; report `NOT RUN`. The external audit-report exception does not weaken the target's read-only boundary.

Repository Anti-Drift reports facts and conditions that must become true for closure. Work that changes a repository is performed separately under authority outside the auditor. The auditor provides no transport, prompt, file list, sequencing, technique selection, or authorization for that work.

## Audit inputs and discovery

### Paths and scope

`scope=` defines the automatic discovery boundary. If omitted, use the repository root. `canonical=` identifies a user-supplied candidate canonical owner for validation. `compare=` identifies a user-supplied comparison target.

Resolve supplied paths relative to the repository root. Each must exist, be readable, remain inside the repository and its security boundary, and not escape through `..` or symlink traversal. Do not interpret paths as globs. If a path is missing, inaccessible, ambiguous, or outside the boundary, report invalid input and do not infer a substitute.

Explicit canonical and comparison paths outside `scope` may be read as requested comparison context if they pass these rules. They do not expand automatic discovery.

### Input selection

When both `canonical=` and `compare=` are omitted, systematically search within scope for candidate semantic owners, related representations, readers and writers, documentation, configuration, schemas, generators, generated artifacts, tests, guards, and CI enforcement. Do not rely on string matching or filenames alone.

When `canonical=` is supplied without `compare=`, label it `USER_SPECIFIED_CANONICAL`, validate it against repository authority, and auto-discover relevant comparisons within scope as `AUTO_DISCOVERED`.

When both are supplied, validate the supplied owner, perform the targeted semantic comparison, label targets `USER_SPECIFIED`, and report:

```text
Coverage: TARGETED
Limit: Unsearched surfaces were not evaluated and are not claimed drift-free.
```

When only `compare=` is supplied, label it `USER_SPECIFIED`, search within scope for candidate owners, report `CANONICAL_NOT_YET_CONFIRMED`, and list candidates with their authority and ownership evidence.

`USER_SPECIFIED_CANONICAL` records provenance only; it does not certify authority. Repeated owners and targets do not imply a Cartesian product. Group paths only where evidence establishes shared semantic facts; report ambiguity instead of inventing relationships.

## Canonical audit analysis

### Trace apparent drift upstream

When drift, inconsistency, or contradiction is observed, do not immediately classify the downstream difference as the defect. Trace the **current relevant dependency and authority chain upstream** and establish what presently causes or authorizes the difference.

Classify the cause, where evidence permits, as one of:

- intentional repository-specific semantics;
- an independently authoritative external or compatibility constraint;
- legitimate derivation from upstream authority;
- stale propagation;
- duplicate semantic ownership;
- a true local defect;
- unresolved from available evidence.

Do not classify a downstream difference as a local defect until its current upstream cause or authority is established or explicitly reported unresolved.

Use this evidence priority, adjusted when repository authority requires:

1. current canonical authority;
2. current dependency structure;
3. repository rationale and evidence;
4. tests, guards, and compatibility contracts;
5. Git history when needed.

Git history is not mandatory when current evidence is sufficient. The primary question is, “What currently causes or authorizes this difference?” rather than merely, “Why was this originally written?” Preserve `DO NOT GUESS` and `COMPATIBILITY_RISK` when authority cannot be resolved safely.

### Dependency-graph root-cause leverage

As an optional analysis taxonomy, classify nodes in the relevant graph by these graph-local roles:

- `ROOT` — highest relevant upstream source or authority for the graph being analyzed.
- `DOMAIN` — domain semantics, business rules, policy, or meaning ownership.
- `STATE` — relevant authoritative persisted or runtime state.
- `DERIVED` — computed, generated, selected, transformed, or projected representation.
- `FLOW` — routing, propagation, wiring, ordering, control, or transport.
- `LEAF` — final consumer or exposed behavior, such as UI, report, endpoint, or another terminal output.

These are analysis roles, not required repository layers. Not every graph contains all roles; missing roles must not be invented. A repository may contain several overlapping graphs, and the labels are local to each graph rather than one global hierarchy. Documentation may be `ROOT` or `DOMAIN`. Generated artifacts may have independent compatibility authority. Live `STATE` is evidence, not automatically semantic authority.

Prefer the highest-leverage relevant node that is both:

1. causal for the violated invariant; and
2. authoritative for the semantic fact involved.

“Highest” alone is insufficient. `ROOT` is not automatically the defect, and a finding must not move upstream merely because an upstream node exists. `FLOW` may itself be causal; `LEAF` may itself be causal. An independently authoritative external standard, schema, protocol, or contract may outrank an internal graph node. Repository-specific authority overrides this taxonomy.

This taxonomy identifies causal and authoritative leverage. It does not select where or how repository changes should be made.

### Semantic ownership and connected constraints

One semantic fact should have one canonical semantic owner. Other representations should derive from it, be generated from it, or be mechanically checked against it unless independently authoritative compatibility evidence requires separation.

Audit and production should derive from the same semantic owner where applicable. Verification must not independently reconstruct implementation-owned delimiters, field order, keys, signatures, identity labels, precedence encoding, or other opaque encoding. An independent public or externally governed contract may instead require a separate oracle; distinguish that oracle from duplicate implementation-owned semantics.

Semantic constraints must remain connected across helpers, APIs, adapters, DTOs, serialization, transport, and other boundaries wherever semantic decisions continue. Controlled widening at a display, diagnostic, transport, serialization, or external boundary is acceptable only when downstream code does not infer domain meaning from the weakened representation. If semantic processing resumes, evidence must show validation, reconstruction, or another repository-authorized re-establishment of the constraint.

Prefer this anti-stale ordering as audit criteria, subject to repository authority:

1. the derived claim is not stored;
2. it is derived directly;
3. it is generated from its canonical owner;
4. unavoidable duplication is mechanically verified;
5. manual synchronization is not treated as permanent closure.

This ordering describes stronger invariant states. It does not prescribe a change technique.

### Existing project and context classification

Distinguish whether the audited repository is new or established and whether the relevant context is project structure, an existing governance system, guard behavior, or guard coverage. This context classification is not an invocation capability.

For established repositories, distinguish:

- `ALREADY_ENFORCED`;
- `POLICY_ONLY`;
- `CURRENT_DRIFT`;
- `COMPATIBILITY_RISK`.

Do not require historical drift to be resolved before accurately reporting current governance. Do not infer final intent from an uncommitted deletion, rename, relocation, apparent replacement, or similar work in progress. Show committed and uncommitted evidence, preserve the work, and classify dependent interpretation as provisional `COMPATIBILITY_RISK` unless authority confirms it.

## Mandatory read-only inventory

Every audit begins with a read-only inventory unless fresh evidence for the same task already establishes it. Determine, as applicable:

- repository instruction and authority surfaces;
- package/task runner and safe verification commands;
- typecheck, lint, and test mechanisms;
- generators and check-only modes;
- architecture, static, parity, and generated-artifact guards;
- hooks and CI gates;
- candidate canonical owners and their readers and writers;
- derived or independently maintained representations;
- current user changes in the working tree.

Mechanically record Git-visible state before inspection and compare it after inspection, including untracked paths. When proportionate, also compare staged and unstaged diffs and read-only hashes for relevant untracked files. Do not create a baseline, cache, inventory, or temporary state file inside the target.

Report exactly what was compared. If evidence differs, do not claim non-mutation; report the difference and whether concurrent activity prevents attribution. Git-visible comparison does not prove ignored files, OS temporary files, external filesystem state, or service state remained unchanged; report unmeasured surfaces as limitations.

## Audit responsibilities

Where applicable, report:

- `FINDING` — the drift, inconsistency, governance gap, or closure claim assessed;
- `EVIDENCE` — direct observations, commands, and relevant repository or external authority;
- `ROOT_CAUSE` — the present causal/authority explanation, or unresolved candidates;
- `SEMANTIC_OWNER` — the canonical owner or unresolved candidate owners;
- `VIOLATED_INVARIANT` — what semantic or governance condition is not satisfied;
- `AFFECTED_SURFACES` / `DENOMINATOR` — relevant consumers, copies, boundaries, and claimed coverage population;
- `GUARD_COVERAGE` — current enforcement and demonstrated limits;
- `COMPATIBILITY_RISK` — behavior, interface, data, generated-artifact, external-contract, or work-in-progress risk;
- `UNRESOLVED_INTENT` — what cannot safely be inferred, with `DO NOT GUESS`;
- `CLOSURE_CONDITIONS` — implementation-neutral conditions that must become true;
- `LIMITATIONS` — unsearched, unmeasured, unavailable, or inconclusive evidence.

These are audit facts and constraints, not decisions about how to make them true. Do not select a change, technique, file set, work sequence, or commit structure.

## Guards, falsification, and proof

Instructions and policies are not proof. Evaluate existing repository-native deterministic evidence such as compiler or type constraints, linters, schema validators, generator check modes, architecture/parity/static guards, exact-identity checks, characterization results, CI outcomes, structural checks, and counterexamples.

A guard being green does not establish responsiveness. Evidence of one controlled falsifier transitioning `GREEN → RED → GREEN`, produced outside the auditor, demonstrates responsiveness to that falsifier. It does not by itself prove structural closure or failure-class closure.

Any closure evidence must be proportionate to the strength and denominator of the claim. Assess whether the claimed failure class is defined, whether evidence is independent of the claimed correction where practical, whether important bypass surfaces remain, and whether the representative environment exercises the invariant. No second AI, model, reviewer, specific language, framework, or test mechanism is generically required.

Repository Anti-Drift never introduces, requests, authorizes, or reverts a falsification mutation and never chooses a specific guard mechanism. It only evaluates available evidence and reports missing proof as a closure condition or limitation.

Counts, floors, and thresholds do not prove membership or identity. When identity is the invariant, exact identity evidence is stronger. A characterization artifact can pin approved or current behavior for regression detection without becoming semantic authority. Generated verification artifacts and baselines are derived or reference evidence, not automatic semantic owners.

## Fresh audit and closure

Green tests or other success evidence from work performed outside Repository Anti-Drift are evidence, not Repository Anti-Drift closure.

After corrective work performed outside the auditor, a fresh Repository Anti-Drift audit must inspect the resulting state before declaring the finding `CLOSED` or `CONVERGED`. Fresh means a new inspection; it does not require another model, vendor, reviewer, or clone.

Reassess, where applicable, the original root cause, semantic ownership, remaining independent copies, connected constraints, recurrence prevention, verification artifacts, guard boundaries, applicable falsifiers, compatibility constraints, affected denominator, and claimed closure scope. Do not create a permanent closure registry.

## Audit report output

`report=<path>` requests one full Markdown audit report at the exact supplied external destination. It is the only permitted filesystem output.

If `report=` is omitted, return the audit only through the normal response. Do not create a report file or directory, choose a default destination, or create cache, history, hidden, or persistent state.

Before writing:

1. resolve the exact destination, including supported `~` expansion and deterministic resolution of relative paths against the invocation working directory;
2. require a concrete file path, not a glob;
3. reject ambiguity, traversal, or symlink behavior that unexpectedly changes the destination;
4. require the parent directory to exist;
5. require the destination not to exist;
6. require the destination to be outside the target repository;
7. respect the environment's filesystem permissions and security boundary.

Do not create directories, overwrite or truncate an existing destination, choose another path, add a suffix, or silently substitute a filename. If validation fails, write nothing and report the failure and resolved destination when known. A report path grants permission only for that one audit report; it grants no target-repository or Git operation.

The report contains audit facts, evidence, interpretations, compatibility risks, limitations, and closure conditions only. It contains no selected repository change, mutation scope, work sequence, commit prescription, authority grant, or instructions to another agent.

An audit report is a derived observation at audit time, not a canonical specification, semantic owner, repository authority, or future source of truth. Every future audit must inspect the repository again.

### Response and report structure

Record the target, AUDIT capability, inputs, search boundary, provenance labels, coverage, findings by class, Git-visible non-mutation evidence, limitations, and the external report path only when successfully written.

Keep direct observations separate from interpretations. For each material finding, use the applicable fields from **Audit responsibilities**. For systematic discovery, claim only systematic search within scope, not mathematical completeness. For targeted comparison, state that unsearched surfaces were not evaluated.

`references/audit-report.md` may guide presentation. This `SKILL.md` remains authoritative for capability, execution, safety, finding, provenance, coverage, and closure semantics.

## Audit stop conditions

Stop expanding the audit and report the evidence when:

- an existing canonical structure already satisfies the invariant;
- an existing guard already protects the claimed denominator;
- apparent duplication is intentional role separation or independently authoritative;
- semantic equivalence cannot be established;
- current authority or work-in-progress intent is unresolved;
- a closure claim lacks evidence proportionate to its scope;
- further inspection would cross the repository security boundary or require mutation.

Stopping does not convert uncertainty into a finding or closure. Preserve `DO NOT GUESS`, `COMPATIBILITY_RISK`, and the relevant limitation.
