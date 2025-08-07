// Deployed contract configuration
export const CONTRACT_CONFIG = {
  packageId: '0xdbaf6b095a5681ec8641547cf0fc4f12518f93c4cb1f2f4dfad63f9759c24a92',
  treasuryId: '0xad49f57bf16f101542b2e20c799f70af8ad46c92d0495e044469659095094d62',
  // treasury refers to the account that receives all payments and fees collected from ticket purchases.
  
  // Organizer settings
  organizerAddress: '0xe8b34b4ec5b0a05a7754f474d4c06e22c880f18b1d3617807dd8f09efc85fb2b', // Same as treasury for now
  
  // Contract objects
  objects: {
    organizerCap: '0x73a4b18916cf9e9c71a4a94f14a9008616f9b15c0c954d9a936c8f5be44eb6e0', 
    //walletTracker: '0x' + 'wallet_tracker_object_id', // TODO: Update with actual wallet tracker object ID
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
