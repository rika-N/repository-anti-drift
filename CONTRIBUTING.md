# Contributing to Repository Anti-Drift

Repository Anti-Drift is a maintainer-owned methodology. Ideas, bug reports, counterexamples, and methodology proposals are welcome, and contributors do not need to implement a solution before a proposal can be considered.

## Trivial corrections

Small spelling, grammar, formatting, or broken-link corrections may be submitted directly when they do not alter methodology meaning.

This path excludes changes to semantic ownership rules, finding classes, audit execution semantics, read-only or authorization boundaries, output behavior, installation trust, security behavior, or `SKILL.md`. Open an Issue first if a change could affect those areas.

## Methodology and governance proposals

Discuss every non-trivial methodology or governance change in an Issue before implementation. A useful proposal concisely describes:

- the observed failure class or contradiction;
- repository or external authority supporting the change;
- affected denominator and known limits;
- compatibility and security implications;
- evidence that the proposal generalizes beyond one repository-specific technique.

The central principle is: **Generalize the failure class, not the implementation technique that happened to fix it.** `SKILL.md` remains the canonical executable methodology.

Do not open a methodology or governance pull request before discussion and a maintainer invitation or agreement for that specific proposal. Agreement to proceed does not promise review priority, acceptance, merge, approval of details, or future governance authority.

## Security-sensitive methodology changes

Security-sensitive surfaces include changes affecting:

- audit execution or invocation semantics;
- authorization and read-only boundaries;
- external output, network, credential, or secret behavior;
- generator execution or Git/repository operations;
- installation, distribution, or trust boundaries;
- vulnerability disclosure behavior.

External contributors may report problems, provide counterexamples, propose designs, and offer evidence or review feedback. Security-sensitive changes are normally performed by the maintainer. A contributor may implement one only when explicitly invited or authorized for that specific change.

## Pull request expectations

For an invited or otherwise permitted implementation pull request:

- keep the diff limited to the agreed scope;
- preserve unrelated user work and repository protections;
- explain authority, evidence, compatibility risk, and limitations;
- run relevant checks and distinguish pre-existing failures;
- do not stage unrelated files or change repository settings;
- do not claim broad closure from narrow evidence.

For methodology changes, document known limitations when evidence does not support broad closure. Trivial corrections need only establish their narrow correctness. A second AI or reviewer, mutation testing, the full internal release process, and large evidence packages are not generic contribution requirements.

## Maintainer review capacity

After a proposal is opened, the maintainer may request more evidence, accept it for later work, implement it directly, invite a pull request, or decline it. A proposal creates no obligation for immediate review, implementation, invitation, acceptance, or merge.

## Suspected vulnerabilities

Do not disclose an exploitable vulnerability in a public Issue. Follow the repository's security contact or private reporting mechanism when available.

## Sponsorship independence

Sponsorship does not buy roadmap priority, review priority, governance authority, acceptance, or merge. Technical decisions remain evidence- and maintainer-governed.

## License

Contributions are accepted under the repository's Apache License 2.0 terms. See [`LICENSE`](./LICENSE) and [`NOTICE`](./NOTICE).
