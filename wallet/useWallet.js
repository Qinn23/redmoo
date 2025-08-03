import { useState, useEffect, useCallback } from 'react';
import { getWallets } from '@mysten/wallet-standard';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

// Sui devnet configuration
const SUI_DEVNET_RPC = 'https://fullnode.devnet.sui.io:443';
const SUI_DEVNET_FAUCET = 'https://faucet.devnet.sui.io/gas';

// Initialize Sui client for devnet
export const suiClient = new SuiClient({
  url: getFullnodeUrl('devnet'),
});

// Utility function to validate Sui address format
function isValidSuiAddress(address) {
  console.log('🔍 Validating address:', address);
  
  if (!address || typeof address !== 'string') {
    console.log('❌ Address validation failed: not a string or empty');
    return false;
  }
  
  // Remove '0x' prefix if present
  const cleanAddress = address.startsWith('0x') ? address.slice(2) : address;
  console.log('🧹 Clean address:', cleanAddress, 'Length:', cleanAddress.length);
  
  // Sui addresses should be 64 characters of hex (32 bytes)
  if (cleanAddress.length !== 64) {
    console.log('❌ Address validation failed: wrong length', cleanAddress.length, 'expected 64');
    return false;
  }
  
  // Check if it's valid hex
  const isValidHex = /^[0-9a-fA-F]+$/.test(cleanAddress);
  console.log('🔢 Hex validation:', isValidHex);
  
  if (!isValidHex) {
    console.log('❌ Address validation failed: invalid hex characters');
    return false;
  }
  
  console.log('✅ Address validation passed');
  return true;
}

// Custom hook for Sui wallet management
export function useSuiWallet() {
  const [wallets, setWallets] = useState([]);
  const [currentWallet, setCurrentWallet] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState('0');
  const [error, setError] = useState(null);
  const [justConnected, setJustConnected] = useState(false);
  const [skipConnectionCheck, setSkipConnectionCheck] = useState(false);

  // Initialize wallets
  useEffect(() => {
    const initializeWallets = () => {
      const availableWallets = getWallets().get();
      setWallets(availableWallets);
    };

    initializeWallets();

    // Listen for wallet changes
    const unsubscribe = getWallets().on('change', (wallets) => {
      setWallets(wallets);
    });

    return () => unsubscribe();
  }, []);

  // Disconnect wallet (defined early to avoid dependency issues)
  const disconnect = useCallback(async () => {
    try {
      if (currentWallet && currentWallet.features['standard:disconnect']) {
        await currentWallet.features['standard:disconnect'].disconnect();
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    } finally {
      setCurrentWallet(null);
      setCurrentAccount(null);
      setIsConnected(false);
      setBalance('0');
      setError(null);
      setJustConnected(false);
      setSkipConnectionCheck(false);

      // Clear localStorage
      localStorage.removeItem('connected_wallet');
      localStorage.removeItem('wallet_account');
      localStorage.removeItem('walletConnected');
      localStorage.removeItem('walletAddress');

      // Dispatch storage event
      window.dispatchEvent(new Event('storage'));
    }
  }, [currentWallet]);

  // Check existing connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Don't check connection if we just connected or if disabled
        if (justConnected || skipConnectionCheck) {
          console.log('⏭️ Skipping connection check - just connected or disabled');
          if (justConnected) setJustConnected(false);
          return;
        }

        console.log('🔍 Checking existing connection...');
        
        // Add small delay to prevent race conditions during navigation
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // TEMPORARY: Clear any potentially corrupted data on startup
        const allStorageData = {
          connected_wallet: localStorage.getItem('connected_wallet'),
          wallet_account: localStorage.getItem('wallet_account'),
          walletConnected: localStorage.getItem('walletConnected'),
          walletAddress: localStorage.getItem('walletAddress')
        };
        console.log('📋 All localStorage data on startup:', allStorageData);
        
        const savedWalletName = localStorage.getItem('connected_wallet');
        const savedAccount = localStorage.getItem('wallet_account');
        
        console.log('📋 Saved wallet name:', savedWalletName);
        console.log('📋 Saved account (raw):', savedAccount);
        
        if (savedWalletName && savedAccount) {
          const wallet = wallets.find(w => w.name === savedWalletName);
          console.log('🔍 Found wallet:', wallet?.name);
          
          // Check for corrupted account data (empty object)
          if (savedAccount === '{}') {
            console.warn('🧹 Found corrupted account data (empty object), clearing...');
            disconnect();
            return;
          }
          
          if (wallet) {
            const accountData = JSON.parse(savedAccount);
            console.log('📋 Parsed account data:', accountData);
            console.log('📋 Account data keys:', Object.keys(accountData));
            
            // Validate address format before proceeding
            console.log('🔍 About to validate saved address:', accountData.address);
            if (!accountData.address) {
              console.warn('❌ No address found in localStorage, clearing connection');
              disconnect();
              return;
            }
            
            if (!isValidSuiAddress(accountData.address)) {
              console.warn('❌ Invalid Sui address format found in localStorage, clearing connection');
              disconnect();
              return;
            }
            
            // Reconstruct the account object with proper format
            const restoredAccount = {
              address: accountData.address,
              publicKey: accountData.publicKey ? new Uint8Array(accountData.publicKey) : null,
              chains: accountData.chains || [],
              features: accountData.features || []
            };
            
            console.log('✅ Address validation passed, restoring connection');
            console.log('🔄 Restored account:', restoredAccount);
            setCurrentWallet(wallet);
            setCurrentAccount(restoredAccount);
            setIsConnected(true);
            await fetchBalance(accountData.address);
          }
        } else {
          console.log('ℹ️ No saved connection found');
        }
      } catch (error) {
        console.error('❌ Error checking existing connection:', error);
        disconnect();
      }
    };

    if (wallets.length > 0) {
      checkConnection();
    }
  }, [wallets, justConnected, skipConnectionCheck, disconnect]);

  // Fetch balance for current account
  const fetchBalance = useCallback(async (address) => {
    try {
      // Validate address before making the API call
      if (!address || !isValidSuiAddress(address)) {
        console.warn('Invalid address provided to fetchBalance:', address);
        setBalance('0');
        return;
      }

      const balanceData = await suiClient.getBalance({
        owner: address,
        coinType: '0x2::sui::SUI'
      });
      setBalance(balanceData.totalBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance('0');
      
      // If it's an invalid address error, clear the connection
      if (error.message && error.message.includes('Invalid Sui address')) {
        console.warn('Invalid Sui address detected, disconnecting wallet');
        disconnect();
      }
    }
  }, [disconnect]);

  // Connect to wallet
  const connect = useCallback(async (wallet) => {
    console.log('🔗 Attempting to connect wallet:', wallet?.name);
    
    if (!wallet) {
      console.error('❌ No wallet provided to connect function');
      setError('No wallet provided');
      return false;
    }
    
    if (isConnecting) {
      console.log('⏳ Already connecting, skipping...');
      return false;
    }

    setIsConnecting(true);
    setError(null);
    setSkipConnectionCheck(true); // Disable connection checking during connection

    try {
      console.log('📋 Wallet features available:', Object.keys(wallet.features || {}));
      
      // Check if wallet has the required connection feature
      if (!wallet.features || !wallet.features['standard:connect']) {
        throw new Error(`Wallet ${wallet.name} does not support standard connection`);
      }

      console.log('🚀 Calling wallet connect...');
      const result = await wallet.features['standard:connect'].connect();
      console.log('📥 Connection result:', result);
      
      if (result.accounts && result.accounts.length > 0) {
        const account = result.accounts[0];
        console.log('✅ Account received:', {
          address: account.address,
          publicKey: account.publicKey
        });
        console.log('🔍 Full account object:', account);
        console.log('🔍 Account object keys:', Object.keys(account));
        console.log('🔍 JSON.stringify test:', JSON.stringify(account));

        // Validate the account address
        if (!account.address || !isValidSuiAddress(account.address)) {
          throw new Error(`Invalid address received from wallet: ${account.address}`);
        }

        setCurrentWallet(wallet);
        setCurrentAccount(account);
        setIsConnected(true);

        // Create a serializable account object with only the essential properties
        const serializableAccount = {
          address: account.address,
          publicKey: account.publicKey ? Array.from(account.publicKey) : null,
          chains: account.chains || [],
          features: account.features || []
        };
        
        console.log('📦 Serializable account:', serializableAccount);

        // Save to localStorage
        localStorage.setItem('connected_wallet', wallet.name);
        localStorage.setItem('wallet_account', JSON.stringify(serializableAccount));
        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('walletAddress', account.address);

        console.log('💾 Wallet data saved to localStorage');
        // Verify data was saved correctly
        const verification = {
          connected_wallet: localStorage.getItem('connected_wallet'),
          wallet_account: localStorage.getItem('wallet_account'),
          walletConnected: localStorage.getItem('walletConnected'),
          walletAddress: localStorage.getItem('walletAddress')
        };
        console.log('📋 Saved data verification:', verification);

        // Fetch balance
        console.log('💰 Fetching balance...');
        await fetchBalance(account.address);

        // Dispatch storage event for other components
        window.dispatchEvent(new Event('storage'));

        console.log('🎉 Wallet connected successfully!');
        setJustConnected(true);
        setSkipConnectionCheck(false); // Re-enable connection checking
        return true;
      } else {
        console.error('❌ No accounts in connection result:', result);
        throw new Error('No accounts returned from wallet');
      }
    } catch (error) {
      console.error('❌ Wallet connection failed:', error);
      
      // More specific error messages
      let errorMessage = 'Failed to connect wallet';
      if (error.message.includes('User rejected')) {
        errorMessage = 'Connection was cancelled by user';
      } else if (error.message.includes('not found') || error.message.includes('undefined')) {
        errorMessage = `Wallet ${wallet.name} is not properly installed or initialized`;
      } else if (error.message.includes('Invalid address')) {
        errorMessage = 'Wallet returned an invalid address format';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return false;
    } finally {
      setIsConnecting(false);
      setSkipConnectionCheck(false); // Re-enable connection checking even on failure
      console.log('🔓 Connection attempt finished');
    }
  }, [isConnecting, fetchBalance]);

  // Execute transaction
  const executeTransaction = useCallback(async (transaction) => {
    if (!currentWallet || !currentAccount || !isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await currentWallet.features['sui:signAndExecuteTransaction'].signAndExecuteTransaction({
        transaction,
        account: currentAccount,
        chain: 'sui:devnet',
      });

      // Refresh balance after transaction
      if (currentAccount) {
        await fetchBalance(currentAccount.address);
      }

      return result;
    } catch (error) {
      console.error('Error executing transaction:', error);
      throw error;
    }
  }, [currentWallet, currentAccount, isConnected, fetchBalance]);

  // Request funds from faucet (devnet only)
  const requestFaucetFunds = useCallback(async () => {
    if (!currentAccount) {
      throw new Error('No account connected');
    }

    try {
      const response = await fetch(SUI_DEVNET_FAUCET, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FixedAmountRequest: {
            recipient: currentAccount.address
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to request faucet funds');
      }

      // Wait a bit for the transaction to be processed
      setTimeout(() => {
        fetchBalance(currentAccount.address);
      }, 3000);

      return true;
    } catch (error) {
      console.error('Error requesting faucet funds:', error);
      throw error;
    }
  }, [currentAccount, fetchBalance]);

  // Get formatted balance in SUI
  const getFormattedBalance = useCallback(() => {
    const suiBalance = parseInt(balance) / 1_000_000_000; // Convert MIST to SUI
    return suiBalance.toFixed(2);
  }, [balance]);

  // Check if balance is sufficient for transaction
  const hasSufficientBalance = useCallback((requiredAmount) => {
    const currentBalance = parseInt(balance);
    const required = parseInt(requiredAmount);
    return currentBalance >= required;
  }, [balance]);

  return {
    // State
    wallets,
    currentWallet,
    currentAccount,
    isConnected,
    isConnecting,
    balance,
    error,

    // Actions
    connect,
    disconnect,
    executeTransaction,
    requestFaucetFunds,
    fetchBalance,

    // Utilities
    getFormattedBalance,
    hasSufficientBalance,
    
    // Client
    suiClient,
  };
}

// Debug helper function - can be called manually in browser console
export const debugWalletConnection = () => {
  console.log('🔍 === WALLET DEBUG INFO ===');
  console.log('Available wallets:', getWallets().get());
  console.log('Local storage data:', {
    connected_wallet: localStorage.getItem('connected_wallet'),
    wallet_account: localStorage.getItem('wallet_account'),
    walletConnected: localStorage.getItem('walletConnected'),
    walletAddress: localStorage.getItem('walletAddress')
  });
  
  const wallets = getWallets().get();
  wallets.forEach(wallet => {
    console.log(`Wallet ${wallet.name}:`, {
      features: Object.keys(wallet.features || {}),
      hasStandardConnect: !!(wallet.features && wallet.features['standard:connect']),
      version: wallet.version
    });
  });
  console.log('🔍 === END DEBUG INFO ===');
};

// Force clear all wallet data - can be called manually
export const forceClearWalletData = () => {
  console.log('🧹 Force clearing all wallet data...');
  localStorage.removeItem('connected_wallet');
  localStorage.removeItem('wallet_account');
  localStorage.removeItem('walletConnected');
  localStorage.removeItem('walletAddress');
  
  // Also clear any other potential wallet-related keys
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.includes('wallet') || key.includes('Wallet') || key.includes('sui') || key.includes('Sui'))) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => {
    console.log('🧹 Removing key:', key);
    localStorage.removeItem(key);
  });
  
  window.dispatchEvent(new Event('storage'));
  console.log('✅ All wallet data cleared');
  window.location.reload();
};

// Fix corrupted wallet data (specifically empty account objects)
export const fixCorruptedWalletData = () => {
  console.log('🔧 Checking for corrupted wallet data...');
  const savedAccount = localStorage.getItem('wallet_account');
  
  if (savedAccount === '{}') {
    console.log('🧹 Found corrupted account data, clearing...');
    forceClearWalletData();
  } else {
    console.log('✅ No corrupted data found');
  }
};

// Make debug functions available globally for manual testing
if (typeof window !== 'undefined') {
  window.debugWalletConnection = debugWalletConnection;
  window.forceClearWalletData = forceClearWalletData;
  window.fixCorruptedWalletData = fixCorruptedWalletData;
}

// Utility functions for smart contract interactions
export const contractUtils = {
  // Convert SUI to MIST
  suiToMist: (suiAmount) => {
    return Math.floor(parseFloat(suiAmount) * 1_000_000_000);
  },

  // Convert MIST to SUI
  mistToSui: (mistAmount) => {
    return parseInt(mistAmount) / 1_000_000_000;
  },

  // Format address for display
  formatAddress: (address) => {
    if (!address || !isValidSuiAddress(address)) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  },

  // Clear wallet data from localStorage
  clearWalletData: () => {
    localStorage.removeItem('connected_wallet');
    localStorage.removeItem('wallet_account');
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    window.dispatchEvent(new Event('storage'));
  },

  // Generate seat ID string
  generateSeatId: (row, seat) => {
    return `${String.fromCharCode(64 + row)}${seat}`;
  },

  // Create purchase transaction
  createPurchaseTransaction: (params) => {
    const {
      eventObjectId,
      walletTrackerObjectId,
      suiAmount,
      seatId,
      seatType,
      imageUrl,
      metadataUrl,
      clockObjectId,
      packageId
    } = params;

    const tx = new TransactionBlock();

    // Split SUI from gas coin for payment
    const [coin] = tx.splitCoins(tx.gas, [tx.pure(suiAmount)]);

    // Call the purchase_ticket function
    tx.moveCall({
      target: `${packageId}::ticket_nft::purchase_ticket`,
      arguments: [
        tx.object(eventObjectId),
        tx.object(walletTrackerObjectId),
        coin,
        tx.pure(seatId),
        tx.pure(seatType),
        tx.pure(imageUrl),
        tx.pure(metadataUrl),
        tx.object(clockObjectId),
      ],
    });

    return tx;
  }
};

export default useSuiWallet; 