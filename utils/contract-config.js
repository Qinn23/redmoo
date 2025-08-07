// Deployed contract configuration - Updated with new deployment
export const CONTRACT_CONFIG = {
  packageId: '0x76e775bb629545b0cecc8168ce8aa444c8816c3fc6744d2f3fe3b73d26c48e57',
  treasuryId: '0xa1df6abeb52c78001f2dddfc69d390f29215e6bfc1e6e37d3a0f16086009e410',
  // treasury refers to the account that receives all payments and fees collected from ticket purchases.
  
  // Organizer settings
  organizerAddress: '0xe8b34b4ec5b0a05a7754f474d4c06e22c880f18b1d3617807dd8f09efc85fb2b', // Same as treasury for now
  
  // Contract objects
  objects: {
    treasury: '0xa1df6abeb52c78001f2dddfc69d390f29215e6bfc1e6e37d3a0f16086009e410',
    organizerCap: '0xf1025acc19a3e05055ad4567da842b783ac87dd384fda4cc6180dde489ea6440', 
    walletTracker: '0xc6610bd8595f4d6bb33d77be0923a9423b26fc3c94533540f5c0047f959b444a',
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
