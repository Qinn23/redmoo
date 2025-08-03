// Smart Contract Configuration
// Update these values after deploying your contract

export const CONTRACT_CONFIG = {
  // Replace with your deployed package ID
  PACKAGE_ID: "YOUR_DEPLOYED_PACKAGE_ID_HERE",
  
  // Replace with your deployed object IDs from deployment
  ORGANIZER_CAP_ID: "YOUR_ORGANIZER_CAP_ID_HERE",
  WALLET_TRACKER_ID: "YOUR_WALLET_TRACKER_ID_HERE",
  
  // Network configuration
  NETWORK: "devnet",
  RPC_URL: "https://fullnode.devnet.sui.io:443",
  
  // Gas configuration
  DEFAULT_GAS_BUDGET: 20000000, // 0.02 SUI
  
  // Events configuration (you'll create these)
  EVENTS: {
    // Add your created event IDs here after creating events
    // "EVENT_NAME": "EVENT_OBJECT_ID"
  }
};

// Helper functions
export const getContractAddress = () => CONTRACT_CONFIG.PACKAGE_ID;
export const getOrganizerCapId = () => CONTRACT_CONFIG.ORGANIZER_CAP_ID;
export const getWalletTrackerId = () => CONTRACT_CONFIG.WALLET_TRACKER_ID;