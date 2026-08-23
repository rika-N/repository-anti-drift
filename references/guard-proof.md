# Guard Proof Guidance

This reference explains evidence, falsification, and closure for audits of architecture, parity, generated-artifact, static, or similar guards. [`../SKILL.md`](../SKILL.md) remains authoritative for executable audit behavior and safety.

## Green is not proof

A guard that passes on the current repository has shown only that the current state is accepted. It has not shown that a relevant forbidden state is rejected.

## Start from the full denominator

Assess coverage from the full relevant population, not only remembered offenders. Depending on the invariant, the denominator may be all consumers, call sites, imports, owners, generated artifacts, schemas, endpoints, or exposed behaviors.

Compare the discovered denominator with the exact permitted or expected population where repository authority supports that comparison. A mechanically discovered population is generally stronger evidence than a hand-maintained list. When discovery cannot establish exhaustiveness, report the limit rather than claiming completeness.

## Separate capability claims from syntax examples

An expanding syntax blacklist can indicate that a semantic capability boundary remains open. Alternate spellings are useful counterexamples, but do not establish that every expression of the semantic operation is covered.

The audit examines whether existing structural, schema, type, API, visibility, constructor, codec, or guard boundaries reduce the relevant capability and what escape surfaces remain. This is evidence classification, not selection of a guard technique.

## Responsiveness evidence

Repository Anti-Drift may inspect controlled-falsification evidence that already exists or was produced outside the auditor. It never asks for, authorizes, introduces, or reverts a target mutation.

A complete observed sequence is:

```text
baseline state                    GREEN
one controlled representative falsifier
target guard                      RED
only the controlled change reverted
post-revert state                 GREEN
```

This demonstrates responsiveness to that falsifier only. It does not prove that all equivalent syntax, all future consumers, the entire structural boundary, or the complete failure class is covered.

Potentially informative external evidence includes a duplicate semantic owner, bypass of a canonical owner, unauthorized dependency edge, stale generated artifact, changed exact-identity set, or alternate expression of the same prohibited semantic operation. These are examples of evidence to evaluate, not instructions from the auditor.

If ordinary checks also become red, record that fact rather than claiming unique detection by the target guard.

## Failure-class and structural closure

State the prohibited failure class, affected denominator, and scope of the closure claim. Evidence must be proportionate to that scope and should not rely solely on challenges selected after the correction was known.

Where warranted, fix-independent challenge can come from predeclared falsifier families, historical regressions, frozen pre-correction adversarial cases, property-based or generative checks, fuzzing, mutation tooling, static analysis, or independent review. No human reviewer, second AI, model, tool, or technique is a generic requirement.

No finite example set proves mathematical completeness. Report:

- what was challenged;
- why it represents the claimed failure class;
- what structural or repository-authorized mechanism supports coverage;
- what denominator was measured;
- what bypass or compatibility surfaces remain;
- whether evidence establishes responsiveness, partial coverage, or closure.

## Common-mode and silent-green risk

Proof can remain green for the wrong reason when the guard and production independently repeat the same mistake or derive from the same faulty representation.

For implementation-owned semantics, audit whether production and verification use the same canonical owner without duplicating encoding logic. For independently authoritative external contracts, audit whether an independent oracle is preserved where deriving expectations from production would hide non-conformance.

Generated artifacts, characterization tables, fixtures, baselines, and live state are evidence; none becomes semantic authority merely because a guard consumes it.

## Safety and limitations

Only inspect evidence that is available within the audit's read-only boundary. If evidence would require target mutation and does not already exist, report the missing evidence as a closure condition or limitation. Do not create a falsifier, choose a mechanism, or direct another actor to do so.

Existing externally produced evidence is weaker when the working tree was unknown, the change was not isolated, the revert was not exact, results were not recorded, or destructive recovery may have affected unrelated work. Report those limitations.

## Presentation

For each responsiveness claim, record only observed facts:

```text
baseline: <observed result>
falsifier: <externally produced change or counterexample>
violated invariant: <what it represents>
target guard: <observed result>
other relevant checks: <observed results>
reversion evidence: <what shows only the controlled change was reverted>
post-revert: <observed result>
limit: <what this sequence does not prove>
```

For a closure claim, also report failure class, claimed scope, denominator, fix-independent evidence where warranted, structural coverage argument, compatibility risks, and known limits. Omit inapplicable fields; never claim evidence that was not observed.
