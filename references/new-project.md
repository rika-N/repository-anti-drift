# New Project Audit Guidance

Use this reference when auditing a new repository or one with little historical architecture. [`../SKILL.md`](../SKILL.md) remains the canonical executable audit methodology.

The audit asks whether emerging ownership and enforcement are proportionate to real semantics without assuming the project needs a large governance framework.

## Ownership questions

For each important semantic fact, ask:

- Where is the fact authoritative?
- What repository or external evidence establishes that authority?
- Which downstream artifacts are derived, generated, or independently maintained?
- Where could duplicate semantic ownership emerge?
- Do production and audit/verification derive from the same owner where applicable?
- Does an external standard, schema, protocol, or compatibility contract independently own an expected representation?

Examples of facts worth tracing include schema identity, route identity, business rules, supported versions, serialized keys, generated documentation, and public compatibility behavior.

## Dependency questions

For each apparent difference, trace current authority and dependency upstream before classifying it as drift. Ask whether the difference is intentional, externally constrained, legitimately derived, stale, duplicated, locally causal, or unresolved.

Where useful, identify which graph-local roles are actually present:

```text
ROOT → DOMAIN → STATE → DERIVED → FLOW → LEAF
```

Do not require every role, invent missing layers, or assume `ROOT` is defective. Ask which node is both causal for the violated invariant and authoritative for the semantic fact. Repository and external authority override generic ordering.

## Anti-stale questions

- Is a second stored claim necessary?
- Can current evidence show direct derivation or generation from the owner?
- If independent representations are legitimate, what evidence checks their required relationship?
- Are handwritten registries, tables, allow-lists, or compatibility layers justified by present requirements?
- Could verification itself become another semantic or encoding owner?
- Are semantic constraints preserved across helpers, APIs, adapters, and transport boundaries where decisions continue?

These are audit questions, not instructions to choose a mechanism.

## Enforcement and proof questions

- What repository-native enforcement already exists?
- What denominator does it cover?
- Are there silent-green or common-mode risks?
- Does available falsification evidence show only responsiveness to one example, or broader closure?
- Are closure claims proportionate to the evidence?
- What relevant surfaces remain unmeasured?

No particular architecture, generator, guard, framework, reviewer, or work sequence is required by this reference.

## Closure criteria

Where applicable, a finding can close only when authority is established, independently maintained semantics no longer violate the invariant, required compatibility is preserved, enforcement evidence matches its claimed denominator, and a fresh audit confirms the resulting state.

Corrective work occurs outside Repository Anti-Drift under authority external to the auditor.
