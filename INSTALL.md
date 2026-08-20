# Install `repository-anti-drift`

`repository-anti-drift` is an Agent Skill built around `SKILL.md`.

## Recommended: install with the skills CLI

After the Skill is published on GitHub:

```bash
npx skills add <owner>/repository-anti-drift
```

Run the command from the project where you want to use the Skill.

The `skills` CLI is the preferred installation method because it handles agent-specific installation details and avoids this repository hard-coding directory conventions that may change over time.

### Requirements for this installation method

- Node.js/npm with `npx` available
- **one** supported AI coding agent
- a project/repository where the Skill will be used

**Multi-agent setup is not required.** Use the coding agent already approved for your repository and security environment.

The Skill does not require ChatGPT, Claude, Codex, a second AI reviewer, a GitHub App, or a new external SaaS by default.

The Skill itself has no React, Python, Java, or other language-specific runtime dependency.

## Manual installation

If you prefer to install manually, copy the entire `repository-anti-drift/` directory into the Skill location currently documented by your coding agent.

Keep these files together:

```text
repository-anti-drift/
├── SKILL.md
├── INSTALL.md
├── README.md
└── references/
```

Agent-specific Skill locations can change over time, so check the current documentation for your agent rather than relying on an old path copied from another README.

## Recommended first invocation

You do not need to paste a long safety prompt.

The Skill itself defaults to read-only audit mode.

```text
Use repository-anti-drift
```

is equivalent to:

```text
Use repository-anti-drift mode=audit
```

Available modes:

```text
mode=audit     # default; read-only findings
mode=plan      # read-only remediation design
mode=handoff   # read-only generation of one implementation prompt
```

Explicit mode values are matched after trimming surrounding ASCII whitespace and without ASCII case sensitivity. `SKILL.md` owns the exact mode-resolution semantics.

Repository Anti-Drift does not directly modify the target repository in any of these modes. In handoff, the user chooses and authorizes an external coding agent to perform implementation and verification.

Optional audit inputs:

```text
Use repository-anti-drift mode=audit scope=src/billing
Use repository-anti-drift mode=audit canonical=src/graph/categories.ts
Use repository-anti-drift mode=audit canonical=src/graph/categories.ts compare=docs/category.md
Use repository-anti-drift mode=audit canonical=src/a.ts canonical=src/b.ts
Use repository-anti-drift mode=audit compare=docs/a.md compare=tests/a.test.ts
Use repository-anti-drift mode=audit report=/tmp/graphView-audit.md
Use repository-anti-drift mode=audit scope=src/graph report=~/Documents/graphView-audit.md
```

`scope=` controls automatic discovery. `canonical=` supplies an owner for validation, and `compare=` supplies a comparison target. `canonical=` and `compare=` may be repeated. When `compare=` is omitted, relevant comparison targets are automatically discovered within scope, or within the repository root when scope is omitted.

Explicit canonical or comparison paths may be read outside `scope` when they remain readable and inside the repository and its security boundary. They do not expand automatic discovery or implementation authorization. In `mode=handoff`, `scope=` remains a discovery boundary; the generated implementation prompt separately states the authorized implementation scope.

See `SKILL.md` for exact path validation, the four input combinations, canonical-authority checks, and reporting semantics.

`report=` is a non-repeatable prompt input for one full Markdown audit report at the exact requested path. Without it, the audit returns through the normal response and creates no report file, report directory, hidden Repository Anti-Drift state, history, or cache.

The resolved report destination must be outside the audited repository. `report=` remains specific to one full audit report; it does not save an implementation prompt, expand scope or discovery, change Git state, authorize repository edits, or allow an existing file to be overwritten silently. If the destination is unsafe, unavailable, or already exists, the agent reports the limitation instead of inventing another location. `SKILL.md` defines the complete validation and authorization rules.

See `references/audit-report.md` for optional full-report presentation guidance.

If no mode is supplied, the Skill uses `mode=audit`. An unrelated misspelled, ambiguous, or invalid mode also falls back safely to audit and reports the ambiguity.

## Generate an implementation prompt

After reviewing findings or a plan, request handoff when you want an implementation prompt for your chosen coding agent:

```text
Use repository-anti-drift mode=handoff
```

Handoff generates exactly one implementation prompt by default and does not execute it. A recommendation is not authorization: the prompt distinguishes the implementation scope from operations that have not been authorized.

Dependency installation or update, commit, push, pull-request creation, repository-visibility changes, and destructive Git carry explicit authorization status according to `SKILL.md`. Handoff neither executes these operations nor silently authorizes them.

Repository Anti-Drift may inspect generators and use safe check-only behavior. An implementation prompt requests a write-mode generator only when repository authority, authorized scope, and known output boundaries support it; generator execution is never a universal requirement.

If authority, work-in-progress intent, behavior, or compatibility remains unresolved, the handoff preserves `COMPATIBILITY_RISK` and tells the implementation agent `DO NOT GUESS` on that surface.

After external implementation, run a fresh Repository Anti-Drift audit. A generated prompt or an implementation agent's success report does not close or converge a finding; closure requires fresh inspection of the resulting repository state.

### Legacy `mode=apply`

`mode=apply` is a recognized deprecated former mode, not an alias and not an ordinary invalid-mode fallback. It performs no target mutation, audit, or handoff. Repository Anti-Drift responds that nothing was modified and requires a new explicit `mode=handoff` invocation.

For important new guards, responsiveness to one falsifier can be demonstrated with:

```text
GREEN → controlled forbidden mutation → RED
      → revert only that mutation → GREEN
```

Where appropriate and explicitly authorized, the external implementation agent performs and reverts this controlled falsification. Repository Anti-Drift determines the proof requirement and may later inspect the evidence and resulting repository state. This cycle does not by itself prove structural closure; closure evidence must be proportionate to the claimed failure class. See `references/guard-proof.md` for the detailed methodology.

## Portability

The Skill is intentionally language- and framework-agnostic.

It can be applied to repositories containing, for example:

- React / React Native / Next.js / TypeScript;
- Python / Django / FastAPI;
- Java / Kotlin;
- Go / Rust;
- SQL and database schemas;
- Terraform / IaC;
- YAML / JSON / OpenAPI;
- Markdown documentation;
- generated artifacts;
- business artifacts such as spreadsheets or presentations when those artifacts and their source facts are accessible to the agent.

Repository-specific persistent instructions, commands, generators, hooks, and CI mechanisms are discovered during the audit rather than hard-coded into the Skill.


## Existing-project compatibility

Repository Anti-Drift must preserve existing repository behavior and project-specific governance by default.

The generic Skill does not outrank repository-specific instructions or existing deterministic protections.

If a recommendation conflicts with existing repository rules, Skills, hooks, generators, tests, guards, CI, public interfaces, or pre-existing user changes, report `COMPATIBILITY_RISK`. A handoff prompt must preserve the uncertainty and tell the implementation agent not to modify that surface automatically.

Handoff does not authorize replacing unrelated Skills or agent configuration. Repository Anti-Drift itself does not modify them.

For governance-only remediation, preserve observable production behavior unless a semantic change is separately and explicitly requested.
