// Deployed contract configuration
export const CONTRACT_CONFIG = {
  packageId: '0x4ad912fc48a98c3af7b92768cc29373a93e5b4efee9ac4fc33189092eef12411',
  treasuryId: '0x62e98019c58fc2f0ae5d44f164cb44d274f427350c102d7f22d0ab77e518aff4',
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
