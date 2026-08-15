# New Project Guidance

Use this reference when the repository is new or has little historical architecture.

The goal is not to pre-build a large governance framework. Establish only the smallest ownership and enforcement rules justified by real semantics.

## Start with ownership

For each important fact, decide where it belongs before duplicating it.

Examples:
- schema identity → schema definition;
- route identity → route registry/router;
- business rule → domain owner;
- supported version → toolchain/config owner;
- generated documentation → producer input, not generated output.

## Prefer fewer representations

Default order:

```text
do not store
    ↓
derive
    ↓
generate
    ↓
verify unavoidable duplication
```

Do not create:
- a second registry for convenience;
- a mirrored constant set without need;
- a handwritten docs table that could be generated;
- an allow-list before a real exception exists;
- a compatibility layer for a compatibility problem that does not exist.

## Add enforcement at natural boundaries

Use mechanisms already native to the stack:
- compiler/type system;
- schema validation;
- generator checks;
- architecture rules;
- tests;
- CI.

Avoid introducing multiple new governance frameworks at project birth.

## Keep the Skill vendor-neutral

Repository Anti-Drift should work with one compatible coding agent.

Do not design project governance that depends on a particular AI vendor or a second AI reviewer unless the project explicitly chooses that dependency.

## Grow governance from observed failure modes

When a real drift class appears:
1. characterize it;
2. identify the semantic owner;
3. eliminate unnecessary copies;
4. add the narrowest durable enforcement;
5. prove the enforcement if it is load-bearing.

Governance should grow from evidence, not speculative completeness.
