// Deployed contract configuration - Updated with new deployment
export const CONTRACT_CONFIG = {
  packageId: '0x5b60aa952dd76bd3d8608bbbd57c0995a1455a991e17c2465d5ae679c12d9f9b',
  treasuryId: '0x0d25c4ef6deec4fc541d37679b1ee5d7d04cdb508aca50f5ed4677cae28ad8f4',
  // treasury refers to the account that receives all payments and fees collected from ticket purchases.
  
  // Organizer settings
  organizerAddress: '0xe8b34b4ec5b0a05a7754f474d4c06e22c880f18b1d3617807dd8f09efc85fb2b', // Same as treasury for now
  
  // Contract objects
  objects: {
    organizerCap: '0xdb51e1e52f38b202a2529ddbfdda582ebf1f415ee8ab5082939030d9e39d81cb', 
    walletTracker: '0x9c2b1207c6ad2da966f8dae6bdd8c83effa725840ecc288f9c6e8eca26eedd7f',
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
