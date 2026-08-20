# Guard Proof Guidance

Use this reference whenever adding, changing, or claiming coverage from an architecture, parity, generated-artifact, static, or similar anti-drift guard.

## Green is not proof

A guard that passes on the current repository has only shown that the current repository is accepted.

It has not shown that the intended forbidden state is rejected.

## Start from the full denominator

Start guard design from the full denominator, not from known offenders. For an API, capability, import, call, or ownership boundary, first determine the full relevant set of consumers, call sites, or import sites, then compare it with the authorized exact set where practical.

```text
all relevant consumers
        ↓
authorized exact set
        ↓
unknown future consumer automatically enters the denominator
```

Prefer this over a hand-maintained `KNOWN_OFFENDERS` or `KNOWN_MODULES` list that checks only remembered cases. Do not hard-code consumer filenames when repository structure can mechanically discover the denominator. When repository discovery cannot prove exhaustiveness, state that limit rather than claiming mathematical completeness.

## Reduce capability before cataloging syntax

An open-ended syntax blacklist that keeps growing is evidence that the capability boundary may be too weak. Equivalent-syntax examples may demonstrate risk, but they must not become the normative blacklist.

```text
forbidden semantic operation
        ↓
first try to remove the capability
```

Do not replace that design question with an endless census of forbidden spellings. If capability reduction is practical, prefer a structural, schema, type, API, visibility, constructor, or codec boundary that makes the semantic operation unavailable.

Capability reduction does not eliminate guards. Unsafe casts, serialization boundaries, reflection, public boundaries, legacy compatibility paths, alternate languages or runtimes, generated artifacts, and other repository-specific escape surfaces may remain.

```text
capability reduction
        ↓
structural / schema / type / API constraint
        ↓
guard remaining escape surface
        ↓
mutation proof
```

## Guard responsiveness

When safe and explicitly authorized in `mode=apply`, prove:

```text
1. baseline                → GREEN
2. one controlled mutation
3. target guard            → RED
4. revert only mutation
5. target guard            → GREEN
```

The mutation should represent the real architecture mistake the guard is intended to prevent. This sequence proves that the guard responds to this falsifier; it does not by itself prove structural or failure-class closure.

Examples:
- add a duplicate semantic owner;
- bypass the canonical registry;
- introduce an unauthorized dependency edge;
- alter a generated artifact without its source;
- create a stale exact-identity set;
- reintroduce a forbidden local constant.

Realistic representative mutations also include:

1. **Duplicate encoding ownership:** replace use of the canonical encoder in a test or fixture with manual encoded-identity construction. The ownership enforcement should become RED.
2. **Unauthorized future consumer:** introduce a new normal consumer of a restricted API or capability. A denominator-based guard should automatically include it and become RED.
3. **Syntax-equivalent semantic misuse:** express the same forbidden semantic operation through an ordinary alternate syntax. Prefer compile-time or structural RED because the capability is absent; otherwise require guard RED.

If a guard catches only one spelling of a misuse, do not claim that the semantic invariant is closed.

## Failure-class and structural closure

For a load-bearing boundary, first state the failure class and the scope of any closure claim. Evidence must be proportionate to that scope. It must not consist solely of falsifiers selected after seeing the completed fix, because those can merely confirm the paths the fix was designed to catch.

Use repository-appropriate sources of fix-independent challenge. Depending on the invariant, these may include predeclared mutation families, historical regressions, frozen pre-fix adversarial cases, property-based or generative testing, fuzzing, mutation tooling, static analysis, or independent review. Human review, an independent reviewer, or another AI/model are optional sources, never requirements. A single approved agent can use predeclared, historical, frozen, generative, tool-derived, or static evidence without adding a reviewer.

No finite example set proves mathematical completeness. Report what was challenged, why it represents the claimed failure class, what structural argument or repository mechanism supports coverage, and what escape surfaces remain. If the evidence establishes responsiveness but not closure, say so explicitly.

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

For each responsiveness proof, report:

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

For a closure claim, additionally report the failure class, claimed scope, fix-independent evidence sources, structural coverage argument, and known limits.
