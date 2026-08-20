# Repository Anti-Drift Constitution

This reference defines the default governance policy used by Repository Anti-Drift. Repository-specific rules outrank this generic policy.

## 1. One semantic fact, one canonical owner

Every important semantic fact should have one canonical owner.

A canonical owner is not determined by a filename such as `registry`, `constants`, or `spec`. Determine ownership from responsibility, readers, writers, runtime/build behavior, and repository-specific policy.

## 2. Preferred anti-stale hierarchy

Use the strongest applicable option:

1. **Do not store** a derived fact.
2. **Derive** it directly from the owner.
3. **Generate** the required artifact from the owner.
4. **Mechanically verify** unavoidable duplication.
5. Never use manual synchronization as the permanent solution.

## 3. Share semantics, not merely similar-looking code

Two artifacts that look similar may have intentionally different roles. Do not consolidate based on visual similarity alone.

Before consolidation, inspect:
- semantic responsibility;
- readers and writers;
- runtime/build/test/CI behavior;
- public interfaces;
- migration or compatibility role;
- agent/tool dependencies.

## 4. Instructions guide; machines enforce

Instruction files can state policy, but important invariants should be enforced by deterministic repository mechanisms whenever practical.

Prefer existing:
- compiler/type system;
- schemas;
- generators;
- static analysis;
- architecture/parity guards;
- exact-identity tests;
- CI gates.

Do not introduce a new framework merely because one exists.

## 5. No new architectural surface without justification

Before adding a registry, helper, adapter, mapping, allow-list, compatibility layer, ledger, duplicate schema, or new source of truth, answer:

1. Does an owner already exist?
2. Can the required behavior be derived?
3. Can an existing shared abstraction be safely extended?
4. Would the new surface duplicate a semantic fact?
5. Why is a new surface simpler, safer, or better aligned with repository authority than reusing an existing mechanism?

If unresolved, do not add the new surface.

## 6. Exact identities when membership is the invariant

When membership or identity is the semantic invariant, prefer exact identity assertions over counts, floors, or thresholds that merely proxy for membership.

When quantity is itself the semantic invariant, use the appropriate numeric contract.

## 7. Match guard evidence to the claim

For a new or materially changed important guard, a representative forbidden mutation performed by an authorized external implementation agent can demonstrate that the guard responds to that falsifier:

```text
GREEN → controlled forbidden mutation → RED
      → revert only that mutation → GREEN
```

Repository Anti-Drift defines and assesses proof requirements but never performs the mutation or its revert against the target repository.

One responsive mutation does not by itself prove that the prohibited failure class is structurally closed. Evidence for a closure claim must be proportionate to its scope and must not rely solely on falsifiers selected after seeing the completed fix.

## 8. Use a trustworthy verification environment

Use the cheapest trustworthy verification environment that actually exercises the invariant.

Prefer local checks when they are available and semantically representative. Use remote or specialized environments when the invariant depends on conditions that local execution does not reproduce.

## 9. Preserve the existing security boundary

Repository Anti-Drift requires one compatible coding agent.

Repository Anti-Drift governs, diagnoses, plans, and hands off implementation; it does not directly modify the target repository. A proposed remediation does not itself grant authority to perform it.

Do not require:
- a second AI service;
- a specific AI vendor;
- a GitHub App;
- a new external SaaS;
- a new scanner,

unless the user explicitly chooses it, it is justified by the repository, and the existing security boundary permits it.

## 10. Do not weaken governance for convenience

Do not weaken a valid guard, exact-identity contract, generator check, or repository constitution merely to make a beneficiary change pass.

If an invariant appears wrong, demonstrate the contradiction and propose the invariant change separately.

## 11. No false convergence

The following are not root-cause fixes by themselves:

- snapshot refresh;
- allow-list expansion;
- lower threshold/floor;
- disabled or skipped check;
- broad exception;
- `--no-verify`;
- manually synchronized duplicate docs;
- another compatibility layer.

An authorized external implementation agent may use them only when justified for diagnosis or a temporary controlled proof and must revert its temporary changes before implementation completion.

## 12. Generalize failure classes, not fixes

Before promoting a repository-derived lesson into generic doctrine, identify the failure class and verify that the invariant remains valid when the language, framework, verification topology, reviewer, syntax, and implementation mechanism change.

If the lesson prescribes one technique even though different repository-appropriate mechanisms could address the failure class, keep that technique scoped as a repository-local rule, implementation option, recommendation, or example.

## 13. Preserve semantic constraints through semantic processing

Preserve required semantic constraints across every boundary where semantic decisions continue.

Controlled widening is acceptable at an explicit serialization, transport, display, diagnostic, or external boundary. If semantic processing resumes, validate, reconstruct, or otherwise re-establish the required constraint using repository-appropriate mechanisms.

## 14. Fresh reinspection before closure

External implementation evidence is not Repository Anti-Drift closure. Declaring a remediated finding closed or converged requires a fresh inspection of the resulting repository state appropriate to the claimed remediation.
