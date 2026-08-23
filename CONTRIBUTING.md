# Contributing to Repository Anti-Drift

Repository Anti-Drift is a maintainer-owned methodology. Ideas, bug reports, counterexamples, and methodology proposals are welcome, and you do not need to implement a solution before a proposal can be considered.

## Trivial corrections

You may open a direct pull request for an objectively low-risk correction such as:

- a typo;
- a broken relative link;
- an obvious formatting error;
- a clearly trivial documentation-reference correction.

This path does not include changes to methodology meaning, semantic ownership rules, governance, security boundaries, modes, authorization, finding classes, execution semantics, or `SKILL.md` behavior. If a change could affect any of those areas, open an Issue first.

## Methodology and governance proposals

Discuss every non-trivial methodology or governance change in an Issue before implementation. A useful proposal describes the observed evidence and answers these questions as concisely as the evidence allows:

1. What failure class did you observe?
2. Which details are specific to your repository?
3. What generic invariant remains after removing those details?
4. Would that invariant still hold across different languages, frameworks, runtimes, or tooling?
5. Could multiple repository-appropriate mechanisms satisfy it?
6. Does the proposal duplicate existing methodology or semantic ownership?

The central principle is: **Generalize the failure class, not the implementation technique that happened to fix it.** `SKILL.md` remains the canonical executable methodology.

Please do not open a methodology or governance pull request before the proposal has been discussed and the maintainer has explicitly invited or agreed that you may prepare a pull request for that specific proposal. Agreement to proceed does not promise review priority, acceptance, merge, approval of implementation details, or future governance authority.

## Security-sensitive methodology changes

Changes affecting these areas are security-sensitive and remain maintainer-controlled:

- `SKILL.md` execution semantics or audit, plan, and handoff modes;
- authorization, write capability, or external output;
- network, credential, token, or external data-transmission access;
- generator execution or Git mutation;
- commit, push, pull-request, or repository-visibility authority;
- destructive operations;
- installation or trust boundaries;
- security disclosure behavior.

External contributors may report problems, provide counterexamples, propose designs, and offer evidence or review feedback. Implementation will normally be performed by the maintainer. A contributor may implement a security-sensitive change only when explicitly invited or authorized for that specific change.

## Pull request expectations

For an invited or otherwise permitted implementation pull request:

- keep the change narrowly scoped and do not mix unrelated cleanup;
- do not include private repository information in public examples;
- preserve established document ownership and do not duplicate doctrine;
- update affected explanatory consumers when canonical methodology changes;
- provide evidence proportional to the claim.

For methodology changes, do not claim structural closure from one narrow falsifier, and document known limitations when the evidence does not support broad closure. Trivial corrections need only establish their narrow correctness. A second AI or reviewer, mutation testing, the full internal release process, and large evidence packages are not generic contribution requirements.

## Maintainer review capacity

After a proposal is opened, the maintainer may request more evidence, accept it for later work, implement it directly, invite the contributor to prepare a pull request, or decline it. A proposal creates no obligation for immediate review, implementation, a pull-request invitation, acceptance, or merge.

## Suspected vulnerabilities

Do not include suspected vulnerability details in a public Issue, methodology proposal, or pull request. A private security reporting route will be documented after private vulnerability reporting is enabled and verified. This does not claim that a private reporting route currently exists.

## Sponsorship independence

Contributions and proposals are evaluated on evidence, genericity, safety, and project fit regardless of sponsorship status.

## License

Contributions are subject to the repository's existing [`LICENSE`](./LICENSE) terms.
