// Deployed contract configuration - Updated with new deployment
export const CONTRACT_CONFIG = {
  packageId: '0xe8c72bb82abf408049d1d0dbc664bfb96175cab514990c9b44a5334d8ad542c8',
  treasuryId: '0x2a0007601db0f2ba0e2b3c6f50b606ac0f9949e6e5941e9aa701e1187bd2b713',
  // treasury refers to the account that receives all payments and fees collected from ticket purchases.
  
  // Organizer settings
  organizerAddress: '0xe8b34b4ec5b0a05a7754f474d4c06e22c880f18b1d3617807dd8f09efc85fb2b', // Updated to match actual organizer wallet
  
  // Contract objects
  objects: {
    treasury: '0x2a0007601db0f2ba0e2b3c6f50b606ac0f9949e6e5941e9aa701e1187bd2b713',
    organizerCap: '0x43885c7c4bf56f141e57e7d4d8f34dbb74a80917c0b77845ae5bb79aaa076c7a', 
    walletTracker: '0x3c3dfe138538057e4745089f5968d068de1a9fee05dcfbe0a69043febabc48ad',
  },
  
  // Event object IDs (created by organizer) - Reset to empty
  eventObjectIds: {},
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
