# VerifyChain

A decentralized optimistic storage verification network built on the Stacks blockchain.

## Overview

VerifyChain is a protocol that enables efficient verification of data storage without checking all data through an optimistic verification model. By combining probabilistic data checking with economic incentives and fraud proofs, VerifyChain creates a trust-minimized system that ensures data availability and integrity while minimizing computational overhead.

## Problem & Solution

### The Problem

Decentralized storage networks face a significant challenge: verifying that data storage providers are actually storing the data they claim to be storing. Traditional solutions require either:

1. Full data verification (computationally expensive and impractical)
2. Trusted third parties (introduces centralization)
3. Complex cryptographic proofs (high computational overhead)

### Our Solution

VerifyChain introduces an optimistic verification mechanism with the following key innovations:

1. **Challenge-Response Protocol**: Storage provers are randomly challenged to prove they possess specific data chunks
2. **Economic Incentives**: Staking mechanism ensures honest behavior through slashing for failed verifications
3. **Fraud Proofs**: Any node can challenge a storage claim and earn rewards for detecting fraud
4. **Bitcoin-Secured Dispute Resolution**: Using Stacks' unique connection to Bitcoin for final settlement of disputes
5. **Optimistic Verification**: Assume data is correctly stored until proven otherwise, dramatically reducing verification overhead

## Core Features

### For Data Owners
- Upload data with verification requirements
- Set storage duration and verification frequency parameters
- Pay storage fees with STX tokens
- Monitor storage proofs and attestations

### For Storage Providers
- Stake STX tokens as a security bond
- Register storage capacity and pricing
- Respond to random verification challenges
- Earn rewards for honest storage provision

### For Verifiers
- Stake STX tokens to participate in verification
- Issue random challenges to storage providers
- Validate proofs submitted by storage providers
- Earn fees for performing verification services

### For Challengers
- Detect and prove fraudulent storage claims
- Submit fraud proofs to the network
- Earn rewards from slashed stakes of dishonest providers

## Technical Architecture

### Smart Contracts (Clarity)
1. **Registry Contract**: Manages registration of storage providers and their stakes
2. **Challenge Contract**: Orchestrates the challenge-response verification process
3. **Fraud Proof Contract**: Handles dispute resolution and slashing
4. **Governance Contract**: Controls system parameters and protocol upgrades

### Verification Mechanism
1. **Random Sampling**: Challenges target random data segments rather than the entire dataset
2. **Merkle Proofs**: Efficient verification of data chunks against committed Merkle roots
3. **Timelock Commitments**: Providers commit to storing data for specific time periods
4. **Challenge Frequency Control**: Dynamic adjustment of challenge frequency based on provider reputation

### Bitcoin Integration via Stacks
1. **Settlement Finality**: Leverages Bitcoin's security for final settlement of disputes
2. **Proof Anchoring**: Critical verification proofs are anchored to Bitcoin for maximum security
3. **Cross-Chain Verification**: Enables verification of Bitcoin-stored data through Stacks contracts

## Project Structure

```
verifychain-stacks/
├── frontend/              # Next.js web application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utility functions
│   └── package.json
├── verifychain-stacks/    # Clarity smart contracts
│   ├── contracts/
│   │   └── registry.clar  # Main registry contract
│   ├── tests/
│   └── Clarinet.toml
└── README.md
```

## Getting Started

### Prerequisites
- Clarinet (Stacks smart contract development framework)
- Node.js 18+ and npm
- Git

### Smart Contract Setup
```bash
git clone https://github.com/iyanusha/verifychain-stacks.git
cd verifychain-stacks/verifychain-stacks
clarinet test
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## How to Contribute

We welcome contributions to VerifyChain! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Stacks Foundation for their support and guidance
- The broader blockchain community for inspiration
- All contributors who help build and improve VerifyChain
