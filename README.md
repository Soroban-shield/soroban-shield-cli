# soroban-shield-cli

> CLI tool to scaffold, audit-check, and deploy Soroban Shield contracts to Stellar testnet and mainnet.

[![Stellar Wave](https://img.shields.io/badge/Stellar%20Wave-Wave%205-blue?style=flat-square)](https://www.drips.network/wave/stellar)
[![npm](https://img.shields.io/badge/npm-soroban--shield--cli-red?style=flat-square)](https://www.npmjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green?style=flat-square)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-green?style=flat-square)](.github/workflows/ci.yml)

---

## Overview

`soroban-shield-cli` is the developer experience layer for the Soroban Shield library. It removes the boilerplate from starting a new Soroban project, validates contracts against known security anti-patterns, and wraps the `soroban-cli` deployment flow in a guided, opinionated interface.

---

## File Structure

```
soroban-shield-cli/
│
├── package.json
├── tsconfig.json
├── README.md                          # This file
├── CONTRIBUTING.md
├── LICENSE
├── CODEOWNERS
├── .gitignore
├── .eslintrc.json
├── .prettierrc
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                     # Lint, typecheck, test on every PR
│   │   └── publish.yml               # Publish to npm on tag push
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── stellar_wave_task.md
│
├── src/
│   ├── index.ts                       # CLI entry point — registers all commands
│   │
│   ├── commands/
│   │   ├── init.ts                    # `shield init` — scaffold new project
│   │   ├── audit.ts                   # `shield audit` — static analysis
│   │   ├── deploy.ts                  # `shield deploy` — testnet/mainnet deploy
│   │   ├── list.ts                    # `shield list` — list available modules
│   │   └── upgrade.ts                 # `shield upgrade` — submit WASM upgrade
│   │
│   ├── templates/
│   │   ├── project/                   # Base project scaffold files
│   │   │   ├── Cargo.toml.hbs         # Handlebars template
│   │   │   ├── lib.rs.hbs
│   │   │   └── .github/
│   │   ├── modules/                   # Per-module code snippets
│   │   │   ├── ownable.rs.hbs
│   │   │   ├── access_control.rs.hbs
│   │   │   ├── pausable.rs.hbs
│   │   │   ├── reentrancy_guard.rs.hbs
│   │   │   ├── rate_limiter.rs.hbs
│   │   │   ├── multi_sig.rs.hbs
│   │   │   └── upgradeable.rs.hbs
│   │   └── ci/                        # GitHub Actions workflow templates
│   │       └── ci.yml.hbs
│   │
│   ├── utils/
│   │   ├── soroban.ts                 # Wrappers around soroban-cli subprocess calls
│   │   ├── fs.ts                      # File system helpers
│   │   ├── logger.ts                  # Consistent CLI output (colors, spinners)
│   │   ├── network.ts                 # Testnet / mainnet RPC config
│   │   └── template.ts                # Handlebars rendering helpers
│   │
│   └── validators/
│       ├── patterns.ts                # Known anti-pattern definitions
│       ├── audit_rules.ts             # Audit rule engine
│       └── report.ts                  # Audit report formatter
│
├── tests/
│   ├── commands/
│   │   ├── init.test.ts
│   │   ├── audit.test.ts
│   │   └── deploy.test.ts
│   └── utils/
│       ├── template.test.ts
│       └── validators.test.ts
│
└── docs/
    ├── commands.md                    # Full command reference
    └── audit-rules.md                 # All audit rules and what they catch
```

---

## Installation

```bash
npm install -g soroban-shield-cli
```

Or use without installing:

```bash
npx soroban-shield-cli <command>
```

---

## Commands

### `shield init`

Scaffold a new Soroban project with selected Shield modules pre-wired.

```bash
shield init my-contract
```

You will be prompted to select modules:

```
? Select modules to include:
  ◉ Ownable
  ◉ AccessControl
  ◯ Pausable
  ◯ ReentrancyGuard
  ◯ RateLimiter
  ◯ MultiSig
  ◯ Upgradeable
```

The generated project includes:
- `Cargo.toml` with correct Shield dependency
- `src/lib.rs` with selected modules imported and wired
- `.github/workflows/ci.yml` with build + test + clippy
- `README.md` with deployment instructions

### `shield audit`

Run static analysis against your contract source for known Soroban security anti-patterns.

```bash
shield audit ./src
```

Example output:

```
✅  No raw storage writes outside accessor functions
⚠️  [MEDIUM] Ownable: ownership transfer not using 2-step pattern (src/lib.rs:42)
❌  [HIGH] Missing reentrancy guard on cross-contract call (src/lib.rs:88)

2 issues found. See docs/audit-rules.md for remediation guidance.
```

### `shield deploy`

Deploy a compiled WASM contract to Stellar testnet or mainnet.

```bash
# Deploy to testnet
shield deploy --network testnet --wasm target/wasm32-unknown-unknown/release/my_contract.wasm

# Deploy to mainnet
shield deploy --network mainnet --wasm target/wasm32-unknown-unknown/release/my_contract.wasm
```

### `shield list`

List all available Shield modules with descriptions.

```bash
shield list
```

### `shield upgrade`

Submit a WASM upgrade to a deployed Upgradeable contract.

```bash
shield upgrade --contract <CONTRACT_ID> --wasm <PATH> --network testnet
```

---

## Stellar Wave — Open Issues

Issues labeled `Stellar Wave` are open for community contributors.

Browse: [github.com/soroban-shield/soroban-shield-cli/issues](https://github.com/soroban-shield/soroban-shield-cli/issues?q=label%3A%22Stellar+Wave%22)

**Points:** Trivial = 100 pts | Medium = 150 pts | High = 200 pts

---

## License

MIT — see [LICENSE](LICENSE)
