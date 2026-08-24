---
name: repository-anti-drift
description: Repository anti-drift governance for AI-assisted software development. Use the audit profile for read-only assessment of architecture/design drift, duplicate semantic ownership or sources of truth, stale docs/tests/generated artifacts, deterministic architecture guards, guard responsiveness, or failure-class closure. Use the authoring profile to apply the same canonical invariants as constraints during an explicitly authorized coding task.
---

# Repository Anti-Drift

Make repository integrity survive agent forgetfulness.

Repository Anti-Drift has one canonical methodology: the shared Anti-Drift invariants in this file. Two mutually exclusive profiles project that methodology into different operational roles:

```text
                    Canonical shared invariants
                              |
                   +----------+----------+
                   |                     |
             audit profile        authoring profile
                   |                     |
          read-only evaluation    coding-time constraints
          findings / evidence     no independent authority
          closure adjudication    no closure claim
```

The audit profile performs read-only evaluation and reports implementation-neutral closure conditions. The authoring profile constrains an already-authorized coding task; Repository Anti-Drift does not become a separate implementing actor.

## Invocation and profile contract

The sole optional selector is `anti-drift=<profile>`. It may occur zero or one time in an invocation.

- If the selector is omitted, run `AUDIT`.
- If a selector value is explicit, trim only surrounding ASCII whitespace and compare only ASCII-case-insensitively.
- A normalized value equal to `audit` runs `AUDIT`.
- A normalized value equal to `authoring` runs `AUTHORING`.
- Thus ASCII case variants such as `AUDIT`, `Audit`, and `Authoring`, with or without surrounding ASCII whitespace, resolve to their corresponding profiles.
- Do not use Unicode normalization, fuzzy matching, synonyms, typo correction, comma splitting, or prose inference.
- Ordinary prose does not supply a selector value unless it is presented as the invocation's explicit `anti-drift=` value.

Any other explicit value, an empty explicit value, a combined value such as `audit,authoring`, or any repeated selector follows one generic `INVALID_INVOCATION` path. Repeated identical and repeated conflicting selectors are both invalid; there is no precedence or multi-profile invocation.

```text
INVALID_INVOCATION
Supported selector:
anti-drift=audit
anti-drift=authoring
```

On `INVALID_INVOCATION`, terminate before Anti-Drift profile work. Do not silently fall back to audit, infer authoring, or inspect the repository under Anti-Drift. Cause zero Anti-Drift side effects and do not give special responses for particular unsupported values.

`scope=`, `canonical=`, and `compare=` are the only audit-only prompt inputs, not shell flags. Any other explicit Anti-Drift key/value input follows `INVALID_INVOCATION` without special handling. If `AUTHORING` is selected and any audit-only input is supplied, follow `INVALID_INVOCATION`. Under `AUDIT`, `canonical=` and `compare=` may repeat. This audit-input cardinality does not change the selector's zero-or-one cardinality.

Audit and authoring are mutually exclusive for one invocation and task. A coding task using authoring is not simultaneously an independent audit. A fresh independent audit is a separate invocation and task. There is no combined profile or alias for one.

## Common authority and security boundary

Profile selection never creates implementation authority. Explicit user requirements, confirmed repository authority, and other higher-priority governing instructions determine the permitted task and actions. The authoring profile does not expand that authority; the audit profile remains read-only as defined below.

Repository Anti-Drift requires one compatible coding agent, not a multi-agent stack.

- Work with the coding agent already approved for the repository.
- Do not require ChatGPT, Claude, Codex, or another specific vendor by default.
- Do not require a second AI service, model, or reviewer.
- Do not require a GitHub App, external SaaS, new scanner, or expanded data sharing by default.
- Respect the repository's existing security, trust, credential, and data-sharing boundaries.
- Do not disturb existing user work in progress without authority.
- A second independent agent is optional assurance only when the user explicitly chooses it.

The maintainer's own development workflow is not a requirement for users of this Skill.

## Canonical shared Anti-Drift invariants

This section is the single normative owner of the shared methodology. The stable `AD-*` identifiers name durable meanings, not section order. Both profiles apply these definitions; profile sections may reference them but must not redefine them.

### AD-01 — Canonical semantic ownership

One semantic fact should have one canonical semantic owner. Other representations should derive from it, be generated from it, or be mechanically checked against it unless legitimate independent authority requires separation.

### AD-02 — Trace apparent drift upstream

Before judging a downstream inconsistency, trace the current dependency and authority chain upstream to establish what presently causes or authorizes the difference.

Current canonical authority and dependency evidence come before optional historical explanation. Git history is unnecessary when current evidence resolves authority safely.

Possible explanations include intentional repository-specific semantics, independently authoritative external or compatibility constraints, legitimate derivation, stale propagation, duplicate semantic ownership, a true local defect, or unresolved authority. A downstream difference is not a local defect merely because it is visible there.

### AD-03 — Authority precedence

Applicable explicit user, confirmed repository-specific, and independently authoritative external requirements override Repository Anti-Drift generic guidance.

Use this default precedence when rules conflict:

```text
explicit user requirements and confirmed repository-specific authority
        ↓
repository-specific constitution / AGENTS.md / CLAUDE.md / scoped rules
        ↓
repository-native types / schemas / generators / tests / guards / CI
        ↓
Repository Anti-Drift generic guidance
```

An independently authoritative external standard, schema, protocol, or compatibility contract may outrank an internal repository node for the semantic fact it governs. Confirmed repository-specific and external authority override generic taxonomy guidance.

### AD-04 — Observed behavior is evidence

Observed working behavior is evidence and a characterization or preservation baseline, not automatic semantic authority.

It may reflect intended behavior, a bug, compatibility, migration state, stale propagation, or accident. For an existing project, preserve observed working behavior, repository-specific governance, and installed Skills while authority is unresolved; do not silently promote observed behavior to canonical meaning.

### AD-05 — Causal and authoritative leverage

Prefer the highest-leverage relevant node that is both causal for the violated invariant and authoritative for the semantic fact.

“Highest” alone is insufficient. This principle identifies leverage; it does not itself select a correction location, file, or technique.

### AD-06 — Dependency-graph analysis roles

`ROOT → DOMAIN → STATE → DERIVED → FLOW → LEAF` are optional, graph-local analytical roles rather than required repository architecture.

```text
ROOT → DOMAIN → STATE → DERIVED → FLOW → LEAF
```

- `ROOT` — highest relevant upstream source or authority for the graph being analyzed.
- `DOMAIN` — domain semantics, business rules, policy, or meaning ownership.
- `STATE` — relevant authoritative persisted or runtime state.
- `DERIVED` — computed, generated, selected, transformed, or projected representation.
- `FLOW` — routing, propagation, wiring, ordering, control, or transport.
- `LEAF` — final consumer or exposed behavior, such as UI, report, endpoint, or another terminal output.

These are analysis roles, not required repository layers. Not every graph contains all roles; do not invent missing roles. Several graphs may overlap, and labels are local rather than one repository-wide hierarchy. Documentation may be `ROOT` or `DOMAIN`. Generated artifacts may have independent compatibility authority. Live `STATE` is evidence, not automatically semantic authority. `ROOT` is not automatically causal or defective; `FLOW` or `LEAF` may itself be causal. Role order does not prescribe an implementation location. Apply AD-03 and AD-05 rather than inferring causality from graph order.

### AD-07 — Independent compatibility authority

An externally, publicly, or compatibility-authoritative contract may remain an independent oracle and must not be collapsed merely for internal uniformity.

Before consolidating apparent duplication, identify readers, writers, runtime/build/test/CI/documentation responsibilities, external constraints, and dependencies from other Skills or tools.

### AD-08 — Semantic constraint continuity

Preserve semantic constraints across helpers, APIs, adapters, DTOs, serialization, transport, and other boundaries while semantic decisions continue.

Controlled widening at a display, diagnostic, transport, serialization, or external boundary is acceptable only when downstream code does not infer domain meaning from the weakened representation. If semantic processing resumes, re-establish the constraint through repository-authorized validation, reconstruction, or an equivalent mechanism.

### AD-09 — Verification ownership

Tests, fixtures, guards, snapshots, documentation, generated artifacts, and other verification surfaces are consumers or evidence unless independently authoritative, and must not silently become duplicate semantic owners.

Verification must not independently reconstruct implementation-owned delimiters, field order, keys, signatures, identity labels, precedence encoding, or other opaque encoding. Production and verification should derive from the same semantic owner where applicable. Preserve an independently authoritative external oracle where independence is the point and deriving expectations from production would hide non-conformance.

### AD-10 — DO NOT GUESS

Do not make an unresolved semantic choice without sufficient authority.

If authority, ownership, dependency, compatibility, or behavior remains unresolved, preserve the uncertainty and state the evidence needed to resolve it. Audit reports `COMPATIBILITY_RISK` and implementation-neutral closure conditions; authoring stops the unresolved choice or seeks authority rather than guessing.

### AD-11 — Remove unsafe capability before guarding misuse

When authority, compatibility, and local design permit, prefer removing an unsafe semantic capability over guarding particular spellings or usages.

Alternate spellings are useful counterexamples but do not establish coverage of the semantic operation. This is not a universal implementation prescription: repository authority, compatibility, the relevant denominator, and available structural boundaries determine whether capability removal is legitimate.

### AD-12 — Full-denominator reasoning

Claims and enforcement boundaries must identify the full relevant denominator where practical, rather than infer a whole-surface conclusion from convenient examples.

The denominator may include all consumers, call sites, imports, owners, generated artifacts, schemas, endpoints, or exposed behaviors. A remembered offender list or convenient subset does not justify a whole-surface claim. Audit measures and reports the denominator and its limits; authoring must not knowingly design against a subset while claiming broader coverage.

### AD-13 — Responsiveness is not closure

One controlled representative `GREEN → RED → GREEN` falsifier demonstrates responsiveness to that falsifier, not structural, universal, or failure-class closure.

A green guard shows only that the inspected state is accepted. If other checks also become red during a controlled falsifier, do not claim unique detection by the target guard.

### AD-14 — Evidence proportional to claim

Evidence strength must be proportionate to the strength and denominator of the semantic, guard, or closure claim.

Define the claimed failure class, consider important bypass surfaces, use a representative environment, and seek evidence independent of the claimed correction where practical. No finite example set proves mathematical completeness, and no second AI, model, reviewer, language, framework, or test mechanism is generically required.

Counts, floors, and thresholds do not prove membership or identity. When identity is the invariant, exact-identity evidence is stronger. Generated artifacts, characterization tables, fixtures, baselines, and live state are evidence; they do not become semantic authority merely because a guard consumes them.

### AD-15 — Anti-stale ordering

Subject to repository authority, prefer not storing duplicate meaning, then direct derivation, then generation, then mechanical verification of unavoidable duplication.

This is an ordering of anti-stale strength where applicable:

1. the derived claim is not stored;
2. it is derived directly from its canonical owner;
3. it is generated from its canonical owner;
4. unavoidable duplication is mechanically verified.

Manual synchronization is not permanent closure. This ordering evaluates invariant states; it does not mandate a repository mechanism or implementation technique.

### AD-16 — Similar appearance is not duplicate ownership

Similar appearance or syntax does not establish duplicate semantic ownership, and intentional role separation remains valid.

Do not consolidate files, rules, schemas, tests, documentation, generated artifacts, compatibility layers, or other representations merely because they look similar. Establish semantic identity, authority, ownership, readers, writers, responsibilities, and compatibility first.

### AD-17 — Policy versus deterministic evidence

Instructions and policy can define expectations, while deterministic repository-native mechanisms provide stronger enforcement evidence where enforcement is required.

Such mechanisms include type constraints, schemas, check-only generators, static or architecture guards, exact-identity checks, tests, and CI. Repository authority determines which mechanism legitimately governs the invariant.

### AD-18 — Generalize failure classes

Generalize the failure class and invariant, not the repository-specific technique that happened to fix one instance.

Generic doctrine should remain valid when language, framework, verification topology, syntax, and repository-native mechanisms change.

### AD-19 — Reject false convergence

Snapshots, allow-lists, thresholds, exceptions, compatibility layers, or manual synchronization do not establish convergence merely because current checks are green.

Determine whether they preserve or mechanically enforce the underlying invariant, or instead mask its violation. Apply AD-03 and AD-07 so legitimate compatibility is not removed in pursuit of superficial uniformity.

## Audit profile

`anti-drift=audit` applies AD-01 through AD-19 through read-only repository inspection. It collects evidence, determines current authority and root cause, classifies findings, measures relevant denominators and coverage, evaluates existing guard/falsification/closure evidence, and reports limitations and implementation-neutral closure conditions in the response.

### Read-only audit boundary

The audit profile never directly mutates the target repository and never grants permission to mutate it.

It may:

- read and search files within the applicable security boundary;
- inspect Git status and history;
- run commands known to be read-only or check-only;
- inspect existing test, characterization, guard, CI, structural-check, counterexample, and externally produced falsification evidence;
- return audit facts and closure conditions in the response.

It must not:

- create, edit, delete, rename, or format target files;
- choose target files authorized for mutation;
- run target generators in write mode;
- install or update target dependencies;
- introduce, request, authorize, or revert controlled proof mutations;
- stage, commit, push, merge, rebase, reset, clean, stash, or check out target changes;
- create a target pull request or change target repository visibility;
- perform destructive Git operations;
- grant permission for any of those operations.

If a useful command might change the target and has no safe check-only form, do not run it; report `NOT RUN`.

The audit reports facts and conditions that must become true for closure. Work that changes a repository is performed separately under authority outside the audit profile. The audit provides no transport, implementation prompt, remediation plan, file list, sequencing, technique selection, or authorization for that work.

### Audit inputs and discovery

#### Paths and scope

`scope=` defines the automatic discovery boundary. If omitted, use the repository root. `canonical=` identifies a user-supplied candidate canonical owner for validation. `compare=` identifies a user-supplied comparison target.

Resolve supplied paths relative to the repository root. Each must exist, be readable, remain inside the repository and its security boundary, and not escape through `..` or symlink traversal. Do not interpret paths as globs. If a path is missing, inaccessible, ambiguous, or outside the boundary, report invalid input and do not infer a substitute.

Explicit canonical and comparison paths outside `scope` may be read as requested comparison context if they pass these rules. They do not expand automatic discovery.

#### Input selection

When both `canonical=` and `compare=` are omitted, systematically search within scope for candidate semantic owners, related representations, readers and writers, documentation, configuration, schemas, generators, generated artifacts, tests, guards, and CI enforcement. Do not rely on string matching or filenames alone.

When `canonical=` is supplied without `compare=`, label it `USER_SPECIFIED_CANONICAL`, validate it against repository authority, and auto-discover relevant comparisons within scope as `AUTO_DISCOVERED`.

When both are supplied, validate the supplied owner, perform the targeted semantic comparison, label targets `USER_SPECIFIED`, and report:

```text
Coverage: TARGETED
Limit: Unsearched surfaces were not evaluated and are not claimed drift-free.
```

When only `compare=` is supplied, label it `USER_SPECIFIED`, search within scope for candidate owners, report `CANONICAL_NOT_YET_CONFIRMED`, and list candidates with their authority and ownership evidence.

`USER_SPECIFIED_CANONICAL` records provenance only; it does not certify authority. Repeated owners and targets do not imply a Cartesian product. Group paths only where evidence establishes shared semantic facts; report ambiguity under AD-10 instead of inventing relationships.

### Audit analysis and context classification

Apply AD-02 to establish the current upstream cause or authority before classifying a downstream difference. Use this evidence priority, adjusted under AD-03 when repository or external authority requires:

1. current canonical authority;
2. current dependency structure;
3. repository rationale and evidence;
4. tests, guards, and compatibility contracts;
5. Git history when needed.

Classify the cause, where evidence permits, as intentional repository-specific semantics, independently authoritative compatibility, legitimate derivation, stale propagation, duplicate semantic ownership, a true local defect, or unresolved.

Distinguish whether the audited repository is new or established and whether the relevant context is project structure, an existing governance system, guard behavior, or guard coverage. This context classification is not an invocation profile.

For established repositories, distinguish:

- `ALREADY_ENFORCED`;
- `POLICY_ONLY`;
- `CURRENT_DRIFT`;
- `COMPATIBILITY_RISK`.

Do not require historical drift to be resolved before accurately reporting current governance. Do not infer final intent from an uncommitted deletion, rename, relocation, apparent replacement, or similar work in progress. Show committed and uncommitted evidence, preserve the work, and classify dependent interpretation as provisional `COMPATIBILITY_RISK` unless authority confirms it.

### Mandatory read-only inventory

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

### Audit responsibilities

Where applicable, report:

- `FINDING` — the drift, inconsistency, governance gap, or closure claim assessed;
- `EVIDENCE` — direct observations, commands, and relevant repository or external authority;
- `ROOT_CAUSE` — the present causal/authority explanation, or unresolved candidates;
- `SEMANTIC_OWNER` — the canonical owner or unresolved candidate owners;
- `VIOLATED_INVARIANT` — the applicable `AD-*` invariant not satisfied;
- `AFFECTED_SURFACES` / `DENOMINATOR` — relevant consumers, copies, boundaries, and claimed coverage population;
- `GUARD_COVERAGE` — current enforcement and demonstrated limits;
- `COMPATIBILITY_RISK` — behavior, interface, data, generated-artifact, external-contract, or work-in-progress risk;
- `UNRESOLVED_INTENT` — what cannot safely be inferred under AD-10;
- `CLOSURE_CONDITIONS` — implementation-neutral conditions that must become true;
- `LIMITATIONS` — unsearched, unmeasured, unavailable, or inconclusive evidence.

These are audit facts and constraints, not decisions about how to make them true. Do not select a change, technique, file set, work sequence, or commit structure.

### Guards, falsification, and proof

Evaluate available repository-native deterministic evidence under AD-12 through AD-14 and AD-17. Assess whether the claimed failure class is defined, what denominator was measured, whether important bypass or compatibility surfaces remain, and whether the representative environment exercises the invariant.

Repository Anti-Drift never introduces, requests, authorizes, or reverts a falsification mutation and never chooses a specific guard mechanism. It only evaluates evidence already available within the read-only boundary and reports missing proof as a closure condition or limitation.

Potentially informative external evidence includes a duplicate semantic owner, bypass of a canonical owner, unauthorized dependency edge, stale generated artifact, changed exact-identity set, or alternate expression of the same prohibited semantic operation. These are examples of evidence to evaluate, not instructions from the audit.

Existing externally produced evidence is weaker when the working tree was unknown, the change was not isolated, the revert was not exact, results were not recorded, or destructive recovery may have affected unrelated work. Report those limitations.

### Fresh audit and closure

Green tests or other success evidence from work performed outside the audit profile are evidence, not Repository Anti-Drift closure.

After corrective work, including work performed with the authoring profile, a fresh `anti-drift=audit` invocation and task must inspect the resulting state before declaring a finding `CLOSED` or `CONVERGED`. Fresh means a new independent inspection; it does not require another model, vendor, reviewer, or clone.

Reassess, where applicable, the original root cause, semantic ownership, remaining independent copies, connected constraints, recurrence prevention, verification artifacts, guard boundaries, applicable falsifiers, compatibility constraints, affected denominator, and claimed closure scope. Apply AD-13 and AD-14. Do not create a permanent closure registry.

### Audit response

Return the audit result only through the normal response. Do not create an audit file or directory, choose a filesystem destination, or create cache, history, hidden, or other persistent state.

The audit result contains audit facts, evidence, interpretations, compatibility risks, limitations, and closure conditions only. It contains no selected repository change, mutation scope, work sequence, commit prescription, authority grant, implementation handoff, or instructions to another agent.

An audit result is a derived observation at audit time, not a canonical specification, semantic owner, repository authority, or future source of truth. Every future audit must inspect the repository again.

#### Response structure

Record the target, `AUDIT` profile, inputs, search boundary, provenance labels, coverage, findings by class, Git-visible non-mutation evidence, and limitations.

Keep direct observations separate from interpretations. For each material finding, use the applicable fields from **Audit responsibilities**. For systematic discovery, claim only systematic search within scope, not mathematical completeness. For targeted comparison, state that unsearched surfaces were not evaluated.

`references/audit-report.md` may guide presentation. This `SKILL.md` remains authoritative for profile selection, execution, safety, invariant, finding, provenance, coverage, and closure semantics.

### Audit stop conditions

Stop expanding the audit and report the evidence when:

- an existing canonical structure already satisfies the applicable `AD-*` invariants;
- an existing guard already protects the claimed denominator;
- apparent duplication is intentional role separation or independently authoritative;
- semantic equivalence cannot be established;
- current authority or work-in-progress intent is unresolved;
- a closure claim lacks evidence proportionate to its scope;
- further inspection would cross the repository security boundary or require mutation.

Stopping does not convert uncertainty into a finding or closure. Preserve AD-10, `COMPATIBILITY_RISK`, and the relevant limitation.

## Authoring profile

`anti-drift=authoring` applies AD-01 through AD-19 as coding-time design and verification constraints while the already-authorized coding agent reasons about, designs, writes, and verifies the current coding task. The agent may use ordinary repository inspection and tools available under that task's existing authority.

The profile itself grants no authority. It does not:

- authorize any file mutation or choose authorized files;
- expand implementation scope;
- authorize installing or changing dependencies;
- authorize staging, committing, pushing, pull-request creation, merging, or publication;
- authorize repository visibility, settings, security-boundary, or data-sharing changes.

Implementation authority and scope come only from the user's explicit request and other higher-priority governing instructions. An independently authorized coding task may write within its explicit scope; the audit profile's target non-mutation rule is not imposed on that task merely because authoring constraints are selected.

The authoring profile does not generate a remediation plan as an Anti-Drift product artifact, generate an implementation handoff or prompt, emit an audit report, classify the resulting repository as `CLOSED` or `CONVERGED`, or claim independent audit closure. Implementation-time tests and checks are evidence only. A fresh independent `anti-drift=audit` invocation and task remains required for a Repository Anti-Drift closure claim.
