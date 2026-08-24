# Repository Anti-Drift Constitution

This constitution explains durable rationale. [`../SKILL.md`](../SKILL.md) is the sole canonical executable Anti-Drift methodology and governs exact invariant, profile, invocation, authority, evidence, safety, reporting, and closure semantics.

One canonical invariant set has two mutually exclusive projections: the audit profile evaluates repository state independently and read-only, while the authoring profile applies the same invariants as constraints during already-authorized coding work. These projections do not create two methodologies. The sections below explain the rationale behind representative invariants rather than redefining their normative `AD-*` meanings.

## 1. One semantic fact, one canonical owner

One semantic fact should have one canonical semantic owner. Other representations should derive from it, be generated from it, or be mechanically checked against it unless legitimate independent authority requires separation.

Similarity is not proof of duplicate ownership. Public contracts, external schemas, documentation, tests, generated artifacts, compatibility layers, and runtime state can have distinct responsibilities.

## 2. Trace apparent drift upstream

A downstream difference is not automatically a local defect. Conceptually trace the current dependency and authority chain upstream and ask what presently causes or authorizes the difference before classifying it.

Current canonical authority and dependency evidence matter more than reconstructing the original author's motivation. Repository rationale, tests, guards, compatibility contracts, and Git history can add evidence; history is conditional and is unnecessary when current evidence resolves authority safely.

Possible explanations include intentional repository-specific semantics, independent external or compatibility authority, legitimate derivation, stale propagation, duplicate semantic ownership, and a true local defect. When the available evidence does not resolve current authority, preserve uncertainty and `DO NOT GUESS`; report `COMPATIBILITY_RISK` where a wrong interpretation could harm behavior or compatibility.

This section elaborates the upstream-tracing rule. `SKILL.md` defines its executable evidence order and classification behavior.

## 3. Analyze graph-local leverage

The optional analytical roles are:

```text
ROOT → DOMAIN → STATE → DERIVED → FLOW → LEAF
```

Conceptually:

- `ROOT` is the highest relevant upstream source or authority in the graph under analysis.
- `DOMAIN` represents domain meaning, policy, or business rules.
- `STATE` represents relevant persisted or runtime state.
- `DERIVED` represents computed, generated, selected, transformed, or projected material.
- `FLOW` represents routing, propagation, wiring, ordering, control, or transport.
- `LEAF` represents a terminal consumer or exposed behavior.

These are graph-local analytical roles, not mandatory repository layers. A graph may omit roles, and several graphs may overlap. `ROOT` is not automatically causal or defective. `FLOW` can be the cause of a violation, as can `LEAF`. Generated artifacts may carry independent compatibility authority. Live state is evidence, not automatic semantic authority. An external standard, schema, protocol, or contract may outrank an internal node, and repository-specific authority overrides generic guidance.

The taxonomy helps explain causal and authoritative leverage. It does not prescribe a correction location or technique. `SKILL.md` owns the executable causal-plus-authoritative test and exact safeguards.

## 4. Prefer fewer independently maintained representations

The strongest stable condition ordinarily avoids storing a second semantic claim. When another representation is necessary, direct derivation is stronger than independent maintenance, generation is stronger than manual synchronization, and unavoidable duplication needs trustworthy mechanical evidence.

This is an evaluation hierarchy, not a command to choose a particular repository mechanism.

## 5. Share semantics, not merely similar-looking code

Shared syntax without shared semantic ownership does not prevent drift. Conversely, similar code may intentionally serve separate authorities. Audit readers, writers, dependencies, contracts, and decision boundaries before inferring ownership.

Audit and production should derive from the same semantic owner where applicable. Verification should not independently reconstruct implementation-owned opaque identities. An independently governed external contract may require a separate oracle to avoid common-mode silent green behavior.

## 6. Preserve constraints while semantic processing continues

A strong owner is insufficient when a helper, API, adapter, DTO, or other boundary weakens the constraint and downstream code continues making semantic decisions.

Controlled widening can be legitimate at serialization, transport, display, diagnostics, or an external boundary. If semantic processing resumes, the constraint must be re-established through repository-authorized validation or reconstruction.

## 7. Instructions guide; machines provide evidence

Instruction files describe policy. Deterministic mechanisms such as type constraints, schemas, check-only generators, static or architecture guards, exact-identity checks, tests, and CI can provide enforcement evidence.

The auditor reports the mechanisms present, their denominator, demonstrated behavior, and gaps. Repository authority—not generic preference—determines which mechanism legitimately governs an invariant.

## 8. Match guard evidence to the claim

A guard being green proves only that the inspected state is accepted. Existing evidence of one representative controlled falsifier producing:

```text
GREEN → RED → GREEN
```

demonstrates responsiveness to that falsifier only. It does not establish structural or failure-class closure. Closure evidence must be proportionate to the asserted denominator and should include fix-independent challenge where warranted. [`guard-proof.md`](./guard-proof.md) explains these distinctions without changing `SKILL.md` execution rules.

## 9. Preserve existing authority and compatibility

Observed behavior is evidence and a preservation baseline, not automatic semantic authority. It may reflect intent, a defect, migration, compatibility, stale propagation, or accident.

Confirmed repository-specific governance outranks generic guidance. Independently authoritative external contracts may also govern relevant facts. Similar artifacts must not be consolidated without authority evidence. When intent remains unresolved, preserve `DO NOT GUESS` and `COMPATIBILITY_RISK`.

## 10. Preserve the security boundary

The audit profile evaluates repository state independently and read-only. It reports what is wrong, why, who owns the relevant meaning, and what must become true for closure. It neither changes the target nor grants authority to change it.

The authoring profile applies the same invariants during coding work that is already authorized independently of Repository Anti-Drift. It does not grant authority, choose or broaden implementation scope, or turn Repository Anti-Drift into a separate implementing actor.

Corrective work remains governed by authority outside Repository Anti-Drift. Do not require a particular AI vendor, second AI service, reviewer, GitHub App, external SaaS, or scanner unless the repository explicitly chooses it and its security boundary permits it.

## 11. No false convergence

Snapshot refreshes, allow-list expansion, lower thresholds, disabled checks, broad exceptions, manual synchronization, and extra compatibility layers do not alone establish root-cause closure.

The audit evaluates the resulting ownership, dependency, guard, compatibility, and denominator evidence. It does not select among possible corrections.

## 12. Generalize failure classes, not fixes

Generic doctrine should remain valid when language, framework, verification topology, syntax, and repository-native mechanisms change. A repository-specific technique is not automatically a universal principle.

## 13. Fresh audit before closure

Success evidence from corrective work, including work constrained by the authoring profile, is evidence, not Repository Anti-Drift closure. Authoring generates no audit closure claim. A fresh, separate audit inspection of the resulting repository state must reassess the original finding and the scope of the closure claim.
