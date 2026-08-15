# Guard Proof Guidance

Use this reference whenever adding, changing, or claiming coverage from an architecture, parity, generated-artifact, static, or similar anti-drift guard.

## Green is not proof

A guard that passes on the current repository has only shown that the current repository is accepted.

It has not shown that the intended forbidden state is rejected.

## Representative forbidden mutation

When safe and explicitly authorized in `mode=apply`, prove:

```text
1. baseline                → GREEN
2. one controlled mutation
3. target guard            → RED
4. revert only mutation
5. target guard            → GREEN
```

The mutation should represent the real architecture mistake the guard is intended to prevent.

Examples:
- add a duplicate semantic owner;
- bypass the canonical registry;
- introduce an unauthorized dependency edge;
- alter a generated artifact without its source;
- create a stale exact-identity set;
- reintroduce a forbidden local constant.

## Prefer isolating the guard

When feasible, choose a mutation where ordinary compilation/tests remain green while the target guard turns red. This demonstrates that the guard detects an architectural violation not already caught elsewhere.

If another existing mechanism also turns red, record that fact rather than overstating the new guard's unique coverage.

## Safety rules

Never run a forbidden mutation in:
- `mode=audit`;
- `mode=plan`.

Before mutation in `mode=apply`:
- inspect the working tree;
- identify pre-existing user changes;
- ensure the mutation can be isolated;
- know exactly how to revert only your own change.

Do not use:
- `git reset --hard`;
- `git clean -fd`;
- broad restoration commands that can destroy unrelated work.

If isolation is unsafe, report `NOT RUN`.

## Mutation quality

A useful mutation is:
- small;
- representative;
- deterministic;
- easy to revert;
- targeted at the guard's claimed invariant.

Avoid theatrical mutations that no realistic developer or agent could introduce.

## Reporting

For each proof, report:

```text
baseline: GREEN
mutation: <what changed>
expected forbidden invariant: <what should be rejected>
target guard: RED
other relevant checks: <results>
revert: only controlled mutation
post-revert: GREEN
```

Do not claim mutation proof if any of those steps were not actually observed.
