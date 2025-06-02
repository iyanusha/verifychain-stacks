import { StacksTestnet, StacksMainnet } from "@stacks/network";

const isMainnet = process.env.NEXT_PUBLIC_NETWORK === "mainnet";

export const network = isMainnet
  ? new StacksMainnet()
  : new StacksTestnet();

export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";

export const CONTRACT_NAME = "registry";

export const EXPLORER_URL = isMainnet
  ? "https://explorer.stacks.co"
  : "https://explorer.stacks.co/?chain=testnet";
