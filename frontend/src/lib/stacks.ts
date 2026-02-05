import { StacksTestnet, StacksMainnet } from "@stacks/network";

const isMainnet = process.env.NEXT_PUBLIC_NETWORK === "mainnet";

export const network = isMainnet
  ? new StacksMainnet()
  : new StacksTestnet();

export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";

export const CONTRACT_NAME = "registry";

export const CLARITY_VERSION = 4;

export const EXPLORER_URL = isMainnet
  ? "https://explorer.hiro.so"
  : "https://explorer.hiro.so/?chain=testnet";

export const TYPESCRIPT_TYPES_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const ERROR_HANDLING_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const LOADING_STATES_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const FORM_VALIDATION_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const ACCESSIBILITY_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const RESPONSIVE_DESIGN_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const SEO_META_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const ENV_VALIDATION_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const PROVIDER_HOOKS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const WALLET_IMPROVEMENTS_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const PROVIDER_DASHBOARD_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const COMMITMENT_UI_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const STAKE_MANAGEMENT_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const WITHDRAWAL_UI_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const DASHBOARD_PAGE_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const DARK_MODE_VARS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const DARK_MODE_TOGGLE_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const DARK_MODE_APPLY_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const STATE_MANAGEMENT_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const API_ROUTES_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const REPUTATION_DISPLAY_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const PROVIDER_SEARCH_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const STAKE_DISPLAY_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const VERIFICATION_UI_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const CHALLENGE_FORM_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const TEST_REGISTRY_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TEST_PROVIDER_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TEST_COMMITMENT_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TEST_STAKE_CONFIG = { refreshMs: 30000, retries: 3 } as const;
