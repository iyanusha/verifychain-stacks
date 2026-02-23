# VerifyChain

A decentralized optimistic storage verification network built on the Stacks blockchain. VerifyChain enables efficient verification of off-chain data storage through probabilistic checking, economic incentives, and fraud proofs — all secured by Bitcoin.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Smart Contract](#smart-contract)
  - [Provider Management](#provider-management)
  - [Stake Management](#stake-management)
  - [Commitments](#commitments)
  - [Verification & Reputation](#verification--reputation)
  - [Admin Controls](#admin-controls)
  - [Error Codes](#error-codes)
- [Frontend](#frontend)
  - [Pages](#pages)
  - [Core Components](#core-components)
  - [Key Hooks](#key-hooks)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Smart Contract Development](#smart-contract-development)
  - [Frontend Development](#frontend-development)
  - [Environment Variables](#environment-variables)
- [Testing](#testing)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Traditional storage verification requires checking every piece of stored data, which is expensive and slow. VerifyChain uses an **optimistic verification model**: storage providers stake STX as a security bond, and the protocol uses random spot-checks to verify data integrity. If a provider is caught cheating, their stake is slashed.

### Key Features

- **Optimistic Verification** — Assumes data is stored correctly unless challenged, reducing verification overhead by ~90%.
- **Economic Security** — Providers lock STX as collateral. Dishonest behavior results in stake slashing.
- **Challenge Protocol** — Anyone can challenge a provider to prove they still hold specific data chunks.
- **Merkle Proof Verification** — Commitments include Merkle roots for efficient data integrity proofs.
- **Reputation Tracking** — On-chain success/failure counts for each provider.
- **Withdrawal Delay** — 24-hour (144 block) cooldown on stake withdrawals to prevent slash-and-run attacks.
- **Bitcoin Settlement** — All state transitions are secured by Bitcoin through Stacks.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     Next.js 16 Frontend                       │
│              (App Router + React 19 + Tailwind v4)           │
│                                                               │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌──────────────┐ │
│  │ Provider   │ │Commitment │ │  Stake    │ │  Challenge   │ │
│  │ Dashboard  │ │ Manager   │ │ Analytics │ │   Portal     │ │
│  └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └──────┬───────┘ │
│        └──────────────┼─────────────┼───────────────┘         │
│                       │      @stacks/connect v7               │
└───────────────────────┼───────────────────────────────────────┘
                        │
              ┌─────────▼─────────┐
              │ Stacks Blockchain  │
              │                    │
              │  ┌──────────────┐  │
              │  │ registry.clar│  │
              │  │              │  │
              │  │ • Providers  │  │
              │  │ • Stakes     │  │
              │  │ • Commitments│  │
              │  │ • Reputation │  │
              │  │ • Slashing   │  │
              │  └──────────────┘  │
              │                    │
              │  Secured by BTC    │
              └────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Smart Contract** | Clarity | 3.0 (Epoch 3.0) |
| **Contract Testing** | Clarinet (Deno-based) | 0.31.0+ |
| **Frontend Framework** | Next.js (App Router) | 16 |
| **UI Library** | React | 19 |
| **Language** | TypeScript | 5.4.5 |
| **Styling** | Tailwind CSS | 4.0 |
| **Wallet** | @stacks/connect | 7.8.0 |
| **Network** | @stacks/network | 6.17.0 |
| **Transactions** | @stacks/transactions | 6.17.0 |

---

## Smart Contract

The `registry.clar` contract is the core of VerifyChain. It manages providers, stakes, storage commitments, reputation, and slashing — all in a single Clarity contract.

### Provider Management

| Function | Type | Description |
|----------|------|-------------|
| `register-provider` | Public | Register as a storage provider with capacity (MB) and initial stake (min 1 STX). |
| `deactivate-provider` | Public | Deactivate your provider account (requires no locked stake). |
| `get-provider` | Read | Look up provider details by ID. |
| `get-provider-by-principal` | Read | Look up provider by wallet address. |

#### Provider Data

Each registered provider has:
- **Owner** — The principal (wallet address) that controls the provider.
- **Storage Capacity** — Declared storage capacity in megabytes.
- **Active Status** — Whether the provider is currently active.
- **Registration Block** — The block height at which they registered.

---

### Stake Management

| Function | Type | Description |
|----------|------|-------------|
| `add-stake` | Public | Add additional STX stake to your provider. |
| `request-withdrawal` | Public | Request a stake withdrawal (starts 24-hour cooldown). |
| `execute-withdrawal` | Public | Execute a pending withdrawal after the cooldown period. |
| `slash-provider-stake` | Public | Slash a provider's stake for dishonest behavior (owner only). |
| `get-provider-stakes` | Read | Query stake breakdown: total, locked, available, pending. |

#### Stake Breakdown

| Field | Description |
|-------|-------------|
| `total-staked` | Total STX staked by the provider. |
| `locked-stake` | STX locked in active commitments. |
| `available-stake` | STX available for new commitments or withdrawal. |
| `pending-withdrawals` | STX requested for withdrawal (in cooldown). |
| `last-withdrawal-request` | Block height of the last withdrawal request. |

#### Economic Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `BASE-STAKE-RATE` | `u1000` | 0.001 STX per MB per block. |
| `MIN-STAKE-AMOUNT` | `u1000000` | Minimum 1 STX to register. |
| `WITHDRAWAL-DELAY` | `u144` | 24-hour withdrawal cooldown (~144 Stacks blocks). |

---

### Commitments

| Function | Type | Description |
|----------|------|-------------|
| `create-commitment` | Public | Create a storage commitment with a Merkle root, chunk count, size, and duration. |
| `complete-commitment` | Public | Complete a commitment after its duration expires (unlocks stake). |
| `get-commitment` | Read | Query commitment details by ID. |
| `get-stake-required` | Read | Calculate required stake for a given size and duration. |

#### Commitment Data

Each commitment records:
- **Provider ID** — Which provider is storing the data.
- **Data Root** — Merkle root hash (32 bytes) for integrity verification.
- **Chunk Count** — Number of data chunks.
- **Storage Size** — Size in megabytes.
- **Duration** — How many blocks the data will be stored.
- **Stake Required** — STX locked for this commitment.
- **Start/End Block** — Block range for the commitment.
- **Data Owner** — The principal who created the commitment.
- **Active** — Whether the commitment is currently active.

---

### Verification & Reputation

| Function | Type | Description |
|----------|------|-------------|
| `record-successful-verification` | Public | Increment a provider's verification success count (owner only). |
| `get-provider-reputation` | Read | Query success/failure counts and total commitments. |

#### Reputation Data

| Field | Description |
|-------|-------------|
| `verification-success-count` | Number of passed verifications. |
| `verification-failure-count` | Number of failed verifications. |
| `total-commitments` | Total commitments created by this provider. |
| `last-activity-block` | Block height of last activity. |

---

### Admin Controls

| Function | Description |
|----------|-------------|
| `pause-contract` | Pause all registration and commitment operations (owner only). |
| `unpause-contract` | Resume operations (owner only). |
| `get-contract-status` | Returns next provider/commitment IDs, pause status, and current timestamp. |

---

### Error Codes

| Code | Constant | Meaning |
|------|----------|---------|
| `u100` | `ERR-NOT-AUTHORIZED` | Caller is not authorized for this action. |
| `u101` | `ERR-ALREADY-REGISTERED` | Provider address is already registered. |
| `u102` | `ERR-INSUFFICIENT-STAKE` | Stake amount is below the minimum. |
| `u103` | `ERR-PROVIDER-NOT-FOUND` | Provider ID does not exist. |
| `u104` | `ERR-INVALID-PARAMETERS` | Invalid function parameters. |
| `u105` | `ERR-STAKE-LOCKED` | Cannot withdraw — stake is locked in active commitments. |
| `u106` | `ERR-COMMITMENT-NOT-FOUND` | Commitment ID does not exist. |
| `u107` | `ERR-INSUFFICIENT-BALANCE` | Insufficient STX balance for the operation. |
| `u108` | `ERR-CONTRACT-PAUSED` | Contract is currently paused. |
| `u109` | `ERR-INVALID-CONTRACT` | Invalid contract reference. |

---

## Frontend

### Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, provider registration form. |
| `/dashboard` | Storage verification metrics and overview. |
| `/providers` | Provider registry, search, and leaderboard. |
| `/commitments` | Active and completed commitment browser. |
| `/stake` | Stake analytics, balance breakdown, and management. |
| `/withdrawals` | Withdrawal requests and execution. |
| `/about` | Project information. |

### Core Components

| Component | Description |
|-----------|-------------|
| `Navbar` | Navigation bar with wallet connect/disconnect and address display. |
| `Hero` | Landing hero with platform stats: Total Staked, Storage Providers, Uptime. |
| `Features` | Six-card grid: Optimistic Verification, Economic Security, Challenge Protocol, Bitcoin Settlement, Reputation System, Fraud Proofs. |
| `RegisterProvider` | Form to register as a provider with storage capacity and initial stake. |
| `Footer` | Links to resources, community, and documentation. |

### Key Hooks

| Hook | Purpose |
|------|---------|
| `useWallet` | Stacks wallet connection and session management. |
| `useProviderDashboard` | Provider data fetching and management. |
| `useCommitmentDashboard` | Commitment listing and status tracking. |
| `useStakeAnalytics` | Stake balance, breakdown, and history. |
| `useWithdrawalManager` | Withdrawal request and execution state. |
| `useVerificationHub` | Verification success/failure monitoring. |
| `useChallengeSystem` | Challenge submission and dispute tracking. |

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** 9+
- **Clarinet** — [Install Guide](https://docs.hiro.so/clarinet/getting-started)
- **Stacks Wallet** — [Leather Wallet](https://leather.io/)

### Smart Contract Development

```bash
git clone https://github.com/iyanusha/verifychain-stacks.git
cd verifychain-stacks/verifychain-stacks

# Check contract syntax
clarinet check

# Run contract tests
clarinet test

# Interactive Clarity REPL
clarinet console
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

### Environment Variables

Create a `.env.local` file in `frontend/`:

```env
# Network: defaults to testnet
NEXT_PUBLIC_NETWORK=testnet

# Contract deployer address
NEXT_PUBLIC_CONTRACT_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
```

---

## Testing

Contract tests use **Clarinet** with Deno.

```bash
cd verifychain-stacks
clarinet test
```

### Test Coverage

| Test | What It Verifies |
|------|-----------------|
| Provider registration | Valid stake and capacity are accepted. |
| Duplicate prevention | Same address cannot register twice (ERR-ALREADY-REGISTERED). |
| Stake addition | Additional STX can be added to existing provider. |
| Pause authorization | Only the contract owner can pause. |
| Paused registration | Registration is rejected when contract is paused. |
| Contract status | Status returns correct provider/commitment IDs and pause state. |
| Provider deactivation | Provider can deactivate when no stake is locked. |

---

## How It Works

### 1. Provider Registration

A storage provider registers by declaring their storage capacity and locking a minimum of 1 STX as a security bond.

### 2. Storage Commitments

A data owner creates a commitment with a provider, specifying the data's Merkle root, chunk count, size, and duration. The required stake is calculated and locked from the provider's available balance.

### 3. Optimistic Verification

The protocol assumes stored data is correct. Random spot-checks verify data integrity by requesting Merkle proofs for specific chunks.

### 4. Challenges & Slashing

If a provider fails a challenge or is found to be dishonest, their stake is slashed. The slashing amount is deducted from available stake first, then locked stake.

### 5. Withdrawal

Providers can request withdrawal of their available (unlocked) stake. A 24-hour (144 block) cooldown prevents slash-and-run attacks. After the cooldown, the withdrawal can be executed.

### 6. Reputation

Every successful verification increments the provider's success count. Failures increment the failure count. This on-chain reputation helps data owners choose reliable providers.

---

## Project Structure

```
verifychain-stacks/
├── verifychain-stacks/             # Clarity smart contracts
│   ├── contracts/
│   │   └── registry.clar           # Core registry contract
│   ├── tests/
│   │   └── registry_test.ts        # Contract test suite
│   ├── settings/
│   │   └── Devnet.toml             # Clarinet devnet config
│   └── Clarinet.toml               # Project configuration
├── frontend/                       # Next.js 16 web application
│   ├── src/
│   │   ├── app/                    # App Router pages
│   │   │   ├── page.tsx            # Landing page
│   │   │   ├── layout.tsx          # Root layout
│   │   │   ├── globals.css         # Global Tailwind styles
│   │   │   ├── dashboard/          # Verification dashboard
│   │   │   ├── providers/          # Provider registry
│   │   │   ├── commitments/        # Commitment browser
│   │   │   ├── stake/              # Stake management
│   │   │   └── withdrawals/        # Withdrawal tracking
│   │   ├── components/             # React components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── RegisterProvider.tsx
│   │   │   └── Footer.tsx
│   │   ├── hooks/                  # Custom React hooks
│   │   │   └── useWallet.ts
│   │   ├── lib/                    # Utilities and config
│   │   │   └── stacks.ts          # Network & contract config
│   │   └── types/                  # TypeScript definitions
│   ├── tailwind.config.ts
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── package.json
└── README.md
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes with clear, descriptive messages.
4. Push to your fork and open a Pull Request.

Please ensure:
- All contract tests pass (`clarinet test`).
- Frontend builds without errors (`cd frontend && npm run build`).
- No TypeScript errors.

---

## License

MIT
