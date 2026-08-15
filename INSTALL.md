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
mode=audit   # default; read-only
mode=plan    # read-only audit + remediation plan
mode=apply   # explicitly permits approved file edits
```

Optional scope:

```text
Use repository-anti-drift mode=audit scope=src/billing
Use repository-anti-drift mode=plan scope=docs
Use repository-anti-drift mode=apply scope=src/permissions
```

If no mode is supplied, or the mode is ambiguous, the Skill must stay read-only.

## After reviewing the audit

If you approve the proposal:

```text
Use repository-anti-drift mode=apply
```

Add `scope=...` when you want to constrain the edit surface.

`mode=apply` does not automatically authorize commit, push, dependency upgrades, destructive Git operations, or unrelated refactors.

For important new guards, proof remains:

```text
GREEN → controlled forbidden mutation → RED
      → revert only that mutation → GREEN
```

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

If a recommendation conflicts with existing repository rules, Skills, hooks, generators, tests, guards, CI, public interfaces, or pre-existing user changes, report `COMPATIBILITY_RISK` and do not modify that surface automatically.

`mode=apply` permits approved edits, but does not authorize replacing unrelated Skills or agent configuration.

For governance-only remediation, preserve observable production behavior unless a semantic change is separately and explicitly requested.
