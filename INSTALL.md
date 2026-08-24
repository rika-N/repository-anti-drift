# Install `repository-anti-drift`

Repository Anti-Drift has one canonical methodology with mutually exclusive audit and authoring profiles. [`SKILL.md`](./SKILL.md) is the sole canonical executable methodology; this file documents installation and invocation only.

## Recommended: install with the skills CLI

```bash
npx skills add rika-N/repository-anti-drift
```

Follow the CLI prompts to select the supported agent environment and installation scope.

### Requirements for this installation method

- Node.js and `npx` available;
- network access to the repository and package registry used by the CLI;
- permission to write to the selected Skill installation directory.

Review the repository and Skill contents before installing into a trusted agent environment.

## Manual installation

Copy or clone this repository into the Skill directory used by your compatible coding agent. Preserve this layout:

```text
repository-anti-drift/
├── SKILL.md
├── README.md
├── INSTALL.md
├── CONTRIBUTING.md
└── references/
```

Consult your agent's documentation for its Skill discovery path and trust model. Repository Anti-Drift does not require a particular vendor, global installation, GitHub App, external SaaS, or second reviewer.

## Invocation

Choose zero or one profile selector:

```text
Repository Anti-Drift
Repository Anti-Drift anti-drift=audit
Repository Anti-Drift anti-drift=authoring
```

The omitted selector defaults to an independent read-only audit. `anti-drift=audit` selects that profile explicitly. `anti-drift=authoring` applies the same canonical Anti-Drift invariants as constraints during the current already-authorized coding task. The profiles cannot be combined in one invocation or task.

Unsupported, empty, repeated, conflicting, combined, fuzzy, typo, or otherwise ambiguous selectors return generic `INVALID_INVOCATION` before Anti-Drift profile work or report processing. There is no silent fallback or inferred combination. `SKILL.md` owns the exact selector grammar and normalization contract.

### Authoring authority boundary

The authoring profile grants no write authority, implementation or file scope, dependency authority, Git authority, pull-request or merge authority, publication authority, or visibility authority. Those remain governed by the coding task's explicit user requirements and other higher-priority instructions. Repository Anti-Drift does not become a separate implementing actor and authoring produces no audit closure claim.

## Audit-only inputs

The following inputs belong only to an omitted-selector audit or explicit `anti-drift=audit` invocation:

- `scope=<path>` bounds automatic discovery; omission uses the repository root.
- `canonical=<path>` supplies a candidate canonical owner for validation.
- `compare=<path>` supplies a comparison target.
- `report=<path>` requests one optional external Markdown audit report.

`canonical=` and `compare=` may repeat. Supplied repository paths must exist, remain readable and within the repository security boundary, and cannot escape through traversal or symlinks. They are read-only evidence, not permission to change anything.

Supplying any of these audit-only inputs with `anti-drift=authoring` returns `INVALID_INVOCATION`. The inputs are not ignored and do not silently activate audit behavior.

## Audit report output

With no `report=`, Repository Anti-Drift returns the audit through the normal response and creates no persistent output.

For an external report:

```text
Use repository-anti-drift report=/tmp/repository-audit.md
```

The destination must be an exact external file path whose parent already exists and whose destination does not exist. It must resolve outside the target repository. Repository Anti-Drift does not overwrite, create a directory, choose another filename, add a suffix, or create cache/history state.

The report contains audit facts, evidence, risks, limitations, and closure conditions only. The path does not authorize target edits or Git operations. See [`references/audit-report.md`](./references/audit-report.md) for presentation guidance and `SKILL.md` for authoritative validation rules.

## After corrective work

Corrective work may use `anti-drift=authoring` as constraints but remains governed by authority outside Repository Anti-Drift. A success report or green checks from that work are evidence, not closure. Run a fresh, separate `anti-drift=audit` of the resulting repository state before declaring a finding closed or converged.

## Guard evidence

The auditor may inspect existing characterization, structural, CI, counterexample, and externally produced falsification evidence. One observed `GREEN → RED → GREEN` falsifier demonstrates responsiveness only to that falsifier. Closure evidence must be proportionate to the claimed scope. See [`references/guard-proof.md`](./references/guard-proof.md).

## Portability

The Skill is repository- and vendor-neutral. An audit needs read access to the target and permission for any explicit external report destination. Authoring uses only the access already authorized for its coding task. Repository-specific instructions, security policies, and external contracts remain authoritative.

## Existing-project compatibility

Observed behavior is evidence and a preservation baseline, not automatic semantic authority. When repository intent, ownership, work in progress, or compatibility cannot be resolved, the audit reports `DO NOT GUESS` and `COMPATIBILITY_RISK` rather than selecting a correction.
