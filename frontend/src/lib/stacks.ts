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


export const TEST_REPUTATION_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const FAVICON_BRANDING_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const MANIFEST_PWA_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const OG_TWITTER_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const ROBOTS_SITEMAP_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const CANONICAL_URLS_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const MOBILE_MENU_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const KEYBOARD_NAV_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const FOCUS_MANAGEMENT_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const SCREEN_READER_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const HIGH_CONTRAST_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const CODE_ORGANIZE_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const CONSTANTS_CONFIG_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const BARREL_EXPORTS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TYPE_GUARDS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const UTILITY_HELPERS_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const LAZY_COMPONENTS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const MEMOIZATION_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const PERFORMANCE_UTILS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const IMAGE_OPTIMIZE_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const BUNDLE_CONFIG_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const NAV_IMPROVEMENTS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const FOOTER_LINKS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const LAYOUT_SYSTEM_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const GRID_COMPONENTS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const CARD_VARIANTS_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const BADGE_TAGS_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TOOLTIP_POPOVER_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const TABLE_COMPONENT_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const PAGINATION_CONFIG = { refreshMs: 30000, retries: 3 } as const;


export const EMPTY_STATES_CONFIG = { refreshMs: 30000, retries: 3 } as const;

export const PROVIDER_ANALYTICS_S9 = { pageSize: 20 } as const;

export const PROVIDER_ANALYTICS_S19 = { pageSize: 20 } as const;

export const PROVIDER_ANALYTICS_S29 = { pageSize: 20 } as const;

export const PROVIDER_ANALYTICS_S39 = { pageSize: 20 } as const;

export const PROVIDER_ANALYTICS_S49 = { pageSize: 20 } as const;

export const COMMITMENT_DASHBOARD_S9 = { pageSize: 20 } as const;

export const COMMITMENT_DASHBOARD_S19 = { pageSize: 20 } as const;

export const COMMITMENT_DASHBOARD_S29 = { pageSize: 20 } as const;

export const COMMITMENT_DASHBOARD_S39 = { pageSize: 20 } as const;

export const COMMITMENT_DASHBOARD_S49 = { pageSize: 20 } as const;

export const STAKE_ANALYTICS_S9 = { pageSize: 20 } as const;

export const STAKE_ANALYTICS_S19 = { pageSize: 20 } as const;

export const STAKE_ANALYTICS_S29 = { pageSize: 20 } as const;

export const STAKE_ANALYTICS_S39 = { pageSize: 20 } as const;

export const STAKE_ANALYTICS_S49 = { pageSize: 20 } as const;

export const WITHDRAWAL_MANAGER_S9 = { pageSize: 20 } as const;

export const WITHDRAWAL_MANAGER_S19 = { pageSize: 20 } as const;

export const WITHDRAWAL_MANAGER_S29 = { pageSize: 20 } as const;

export const WITHDRAWAL_MANAGER_S39 = { pageSize: 20 } as const;

export const WITHDRAWAL_MANAGER_S49 = { pageSize: 20 } as const;

export const VERIFICATION_HUB_S9 = { pageSize: 20 } as const;

export const VERIFICATION_HUB_S19 = { pageSize: 20 } as const;

export const VERIFICATION_HUB_S29 = { pageSize: 20 } as const;

export const VERIFICATION_HUB_S39 = { pageSize: 20 } as const;

export const VERIFICATION_HUB_S49 = { pageSize: 20 } as const;

export const CHALLENGE_SYSTEM_S9 = { pageSize: 20 } as const;

export const CHALLENGE_SYSTEM_S19 = { pageSize: 20 } as const;

export const CHALLENGE_SYSTEM_S29 = { pageSize: 20 } as const;

export const CHALLENGE_SYSTEM_S39 = { pageSize: 20 } as const;

export const CHALLENGE_SYSTEM_S49 = { pageSize: 20 } as const;

export const NOTIFICATION_SYSTEM_S9 = { pageSize: 20 } as const;

export const NOTIFICATION_SYSTEM_S19 = { pageSize: 20 } as const;

export const NOTIFICATION_SYSTEM_S29 = { pageSize: 20 } as const;

export const NOTIFICATION_SYSTEM_S39 = { pageSize: 20 } as const;

export const NOTIFICATION_SYSTEM_S49 = { pageSize: 20 } as const;

export const SETTINGS_PAGE_S9 = { pageSize: 20 } as const;

export const SETTINGS_PAGE_S19 = { pageSize: 20 } as const;

export const SETTINGS_PAGE_S29 = { pageSize: 20 } as const;

export const SETTINGS_PAGE_S39 = { pageSize: 20 } as const;

export const SETTINGS_PAGE_S49 = { pageSize: 20 } as const;

export const HELP_DOCS_S9 = { pageSize: 20 } as const;

export const HELP_DOCS_S19 = { pageSize: 20 } as const;

export const HELP_DOCS_S29 = { pageSize: 20 } as const;

export const HELP_DOCS_S39 = { pageSize: 20 } as const;

export const HELP_DOCS_S49 = { pageSize: 20 } as const;

export const STORAGE_METRICS_K9 = { endpoint: '/api/storage_metrics/9', timeout: 30000, retries: 3 } as const;

export const STORAGE_METRICS_K19 = { endpoint: '/api/storage_metrics/19', timeout: 30000, retries: 3 } as const;

export const STORAGE_METRICS_K29 = { endpoint: '/api/storage_metrics/29', timeout: 30000, retries: 3 } as const;

export const STORAGE_METRICS_K39 = { endpoint: '/api/storage_metrics/39', timeout: 30000, retries: 3 } as const;

export const STORAGE_METRICS_K49 = { endpoint: '/api/storage_metrics/49', timeout: 30000, retries: 3 } as const;

export const STORAGE_METRICS_K59 = { endpoint: '/api/storage_metrics/59', timeout: 30000, retries: 3 } as const;

export const STORAGE_METRICS_K69 = { endpoint: '/api/storage_metrics/69', timeout: 30000, retries: 3 } as const;

export const STORAGE_METRICS_K79 = { endpoint: '/api/storage_metrics/79', timeout: 30000, retries: 3 } as const;

export const PROOF_VIEWER_K9 = { endpoint: '/api/proof_viewer/9', timeout: 30000, retries: 3 } as const;

export const PROOF_VIEWER_K19 = { endpoint: '/api/proof_viewer/19', timeout: 30000, retries: 3 } as const;

export const PROOF_VIEWER_K29 = { endpoint: '/api/proof_viewer/29', timeout: 30000, retries: 3 } as const;

export const PROOF_VIEWER_K39 = { endpoint: '/api/proof_viewer/39', timeout: 30000, retries: 3 } as const;

export const PROOF_VIEWER_K49 = { endpoint: '/api/proof_viewer/49', timeout: 30000, retries: 3 } as const;

export const PROOF_VIEWER_K59 = { endpoint: '/api/proof_viewer/59', timeout: 30000, retries: 3 } as const;

export const PROOF_VIEWER_K69 = { endpoint: '/api/proof_viewer/69', timeout: 30000, retries: 3 } as const;

export const PROOF_VIEWER_K79 = { endpoint: '/api/proof_viewer/79', timeout: 30000, retries: 3 } as const;

export const DISPUTE_TIMELINE_K9 = { endpoint: '/api/dispute_timeline/9', timeout: 30000, retries: 3 } as const;

export const DISPUTE_TIMELINE_K19 = { endpoint: '/api/dispute_timeline/19', timeout: 30000, retries: 3 } as const;

export const DISPUTE_TIMELINE_K29 = { endpoint: '/api/dispute_timeline/29', timeout: 30000, retries: 3 } as const;

export const DISPUTE_TIMELINE_K39 = { endpoint: '/api/dispute_timeline/39', timeout: 30000, retries: 3 } as const;

export const DISPUTE_TIMELINE_K49 = { endpoint: '/api/dispute_timeline/49', timeout: 30000, retries: 3 } as const;

export const DISPUTE_TIMELINE_K59 = { endpoint: '/api/dispute_timeline/59', timeout: 30000, retries: 3 } as const;

export const DISPUTE_TIMELINE_K69 = { endpoint: '/api/dispute_timeline/69', timeout: 30000, retries: 3 } as const;

export const DISPUTE_TIMELINE_K79 = { endpoint: '/api/dispute_timeline/79', timeout: 30000, retries: 3 } as const;

export const VALIDATOR_LEADERBOARD_K9 = { endpoint: '/api/validator_leaderboard/9', timeout: 30000, retries: 3 } as const;

export const VALIDATOR_LEADERBOARD_K19 = { endpoint: '/api/validator_leaderboard/19', timeout: 30000, retries: 3 } as const;

export const VALIDATOR_LEADERBOARD_K29 = { endpoint: '/api/validator_leaderboard/29', timeout: 30000, retries: 3 } as const;

export const VALIDATOR_LEADERBOARD_K39 = { endpoint: '/api/validator_leaderboard/39', timeout: 30000, retries: 3 } as const;

export const VALIDATOR_LEADERBOARD_K49 = { endpoint: '/api/validator_leaderboard/49', timeout: 30000, retries: 3 } as const;

export const VALIDATOR_LEADERBOARD_K59 = { endpoint: '/api/validator_leaderboard/59', timeout: 30000, retries: 3 } as const;

export const VALIDATOR_LEADERBOARD_K69 = { endpoint: '/api/validator_leaderboard/69', timeout: 30000, retries: 3 } as const;

export const VALIDATOR_LEADERBOARD_K79 = { endpoint: '/api/validator_leaderboard/79', timeout: 30000, retries: 3 } as const;

export const CHUNK_BROWSER_K9 = { endpoint: '/api/chunk_browser/9', timeout: 30000, retries: 3 } as const;

export const CHUNK_BROWSER_K19 = { endpoint: '/api/chunk_browser/19', timeout: 30000, retries: 3 } as const;

export const CHUNK_BROWSER_K29 = { endpoint: '/api/chunk_browser/29', timeout: 30000, retries: 3 } as const;

export const CHUNK_BROWSER_K39 = { endpoint: '/api/chunk_browser/39', timeout: 30000, retries: 3 } as const;

export const CHUNK_BROWSER_K49 = { endpoint: '/api/chunk_browser/49', timeout: 30000, retries: 3 } as const;

export const CHUNK_BROWSER_K59 = { endpoint: '/api/chunk_browser/59', timeout: 30000, retries: 3 } as const;

export const CHUNK_BROWSER_K69 = { endpoint: '/api/chunk_browser/69', timeout: 30000, retries: 3 } as const;

export const CHUNK_BROWSER_K79 = { endpoint: '/api/chunk_browser/79', timeout: 30000, retries: 3 } as const;

export const NETWORK_GRAPH_K9 = { endpoint: '/api/network_graph/9', timeout: 30000, retries: 3 } as const;

export const NETWORK_GRAPH_K19 = { endpoint: '/api/network_graph/19', timeout: 30000, retries: 3 } as const;

export const NETWORK_GRAPH_K29 = { endpoint: '/api/network_graph/29', timeout: 30000, retries: 3 } as const;

export const NETWORK_GRAPH_K39 = { endpoint: '/api/network_graph/39', timeout: 30000, retries: 3 } as const;

export const NETWORK_GRAPH_K49 = { endpoint: '/api/network_graph/49', timeout: 30000, retries: 3 } as const;

export const NETWORK_GRAPH_K59 = { endpoint: '/api/network_graph/59', timeout: 30000, retries: 3 } as const;

export const NETWORK_GRAPH_K69 = { endpoint: '/api/network_graph/69', timeout: 30000, retries: 3 } as const;

export const NETWORK_GRAPH_K79 = { endpoint: '/api/network_graph/79', timeout: 30000, retries: 3 } as const;

export const UPTIME_TRACKER_K9 = { endpoint: '/api/uptime_tracker/9', timeout: 30000, retries: 3 } as const;

export const UPTIME_TRACKER_K19 = { endpoint: '/api/uptime_tracker/19', timeout: 30000, retries: 3 } as const;

export const UPTIME_TRACKER_K29 = { endpoint: '/api/uptime_tracker/29', timeout: 30000, retries: 3 } as const;

export const UPTIME_TRACKER_K39 = { endpoint: '/api/uptime_tracker/39', timeout: 30000, retries: 3 } as const;

export const UPTIME_TRACKER_K49 = { endpoint: '/api/uptime_tracker/49', timeout: 30000, retries: 3 } as const;

export const UPTIME_TRACKER_K59 = { endpoint: '/api/uptime_tracker/59', timeout: 30000, retries: 3 } as const;

export const UPTIME_TRACKER_K69 = { endpoint: '/api/uptime_tracker/69', timeout: 30000, retries: 3 } as const;

export const UPTIME_TRACKER_K79 = { endpoint: '/api/uptime_tracker/79', timeout: 30000, retries: 3 } as const;

export const PENALTY_HISTORY_K9 = { endpoint: '/api/penalty_history/9', timeout: 30000, retries: 3 } as const;

export const PENALTY_HISTORY_K19 = { endpoint: '/api/penalty_history/19', timeout: 30000, retries: 3 } as const;

export const PENALTY_HISTORY_K29 = { endpoint: '/api/penalty_history/29', timeout: 30000, retries: 3 } as const;

export const PENALTY_HISTORY_K39 = { endpoint: '/api/penalty_history/39', timeout: 30000, retries: 3 } as const;

export const PENALTY_HISTORY_K49 = { endpoint: '/api/penalty_history/49', timeout: 30000, retries: 3 } as const;

export const PENALTY_HISTORY_K59 = { endpoint: '/api/penalty_history/59', timeout: 30000, retries: 3 } as const;

export const PENALTY_HISTORY_K69 = { endpoint: '/api/penalty_history/69', timeout: 30000, retries: 3 } as const;

export const PENALTY_HISTORY_K79 = { endpoint: '/api/penalty_history/79', timeout: 30000, retries: 3 } as const;
