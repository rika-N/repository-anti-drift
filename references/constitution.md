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

## 5. No new architectural surface without proof

Before adding a registry, helper, adapter, mapping, allow-list, compatibility layer, ledger, duplicate schema, or new source of truth, answer:

1. Does an owner already exist?
2. Can the required behavior be derived?
3. Can an existing shared abstraction be safely extended?
4. Would the new surface duplicate a semantic fact?
5. What existing architecture is unable to express the requirement?

If unresolved, do not add the new surface.

## 6. Exact identities over counts

When exact identities are knowable, prefer exact identity assertions over counts, floors, or thresholds.

Counts may be useful operational metrics, but they are weak semantic contracts.

## 7. Prove important guards

For a new or materially changed important guard, use a representative forbidden mutation when safe:

```text
GREEN → controlled forbidden mutation → RED
      → revert only that mutation → GREEN
```

Never perform mutation proof in read-only modes.

## 8. Local convergence before remote CI

Use targeted local checks to discover problems before remote CI.

Remote CI should confirm a locally converged state, not act as the first drift detector.

## 9. Preserve the existing security boundary

Repository Anti-Drift requires one compatible coding agent.

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

Use them only when justified for diagnosis or a temporary controlled proof and revert temporary changes before completion.
