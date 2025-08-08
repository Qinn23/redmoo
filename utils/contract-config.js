// Deployed contract configuration - Updated with new deployment
export const CONTRACT_CONFIG = {
  packageId: '0xa6c1c0f15ba21d3732ffab62f2615fab9d86d6de136cf0635ad447509ee5b981',
  treasuryId: '0x064e42bfc59e342dbb701aabf57d54716d7452a60ead47a96f271b91e7126542',
  // treasury refers to the account that receives all payments and fees collected from ticket purchases.
  
  // Organizer settings
  organizerAddress: '0xe8b34b4ec5b0a05a7754f474d4c06e22c880f18b1d3617807dd8f09efc85fb2b', // Updated to match actual organizer wallet
  
  // Contract objects
  objects: {
    organizerCap: '0x737fd46e5dbb81a6f9e908ed6bfefbc6baf047f64a12fe5dccbaf35ea106e87d', // UpgradeCap object ID
    walletTracker: '0x776249bf2fa663af5f18fb8f027bdb91472830ff7f4fd0791db8ae94f651da40',
  },
  
  // Event object IDs (created by organizer) - TODO: Update with actual event object IDs
  eventObjectIds: {
    1: '0x' + 'event_1_object_id', // Taylor Swift event object ID
    2: '0x' + 'event_2_object_id', // Ed Sheeran event object ID  
    3: '0x' + 'event_3_object_id', // Jay Chou event object ID
    4: '0x' + 'event_4_object_id', // BIGBANG event object ID
  },
  network: 'devnet',
  module: 'ticketing'
};

// Transaction configurations
export const TX_CONFIG = {
  gaseBudget: 100000000, // 0.1 SUI (increased from 0.01 SUI)
  maxGasPrice: 1000, // 1000 MIST per gas unit
};

// Event pricing (in MIST - 1 SUI = 1,000,000,000 MIST)
export const TICKET_PRICES = {
  1: 25000000000n, // $25 equivalent in MIST (25 * 1e9)
  2: 20000000000n, // $20 equivalent in MIST
  3: 30000000000n, // $30 equivalent in MIST  
  4: 15000000000n, // $15 equivalent in MIST
};
