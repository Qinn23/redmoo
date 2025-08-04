import { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@mysten/dapp-kit';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

// Initialize Sui client for devnet
export const suiClient = new SuiClient({
  url: getFullnodeUrl('devnet'),
});

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const wallet = useWallet();
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (wallet.connected && wallet.currentAccount) {
      setConnected(true);
      setAddress(wallet.currentAccount.address);
      localStorage.setItem('walletConnected', 'true');
    } else {
      setConnected(false);
      setAddress(null);
      localStorage.removeItem('walletConnected');
    }
  }, [wallet.connected, wallet.currentAccount]);

  const connectWallet = async () => {
    try {
      if (!wallet.chain) {
        throw new Error('No wallet available');
      }
      await wallet.select();
      return wallet;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      localStorage.removeItem('walletConnected');
      throw error;
    }
  };

  const disconnectWallet = async () => {
    try {
      if (wallet.connected) {
        await wallet.disconnect();
        localStorage.removeItem('walletConnected');
      }
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return (
    <WalletContext.Provider value={{
      ...wallet,
      connected,
      address,
      connectWallet,
      disconnectWallet,
      // Sui client for transactions
      suiClient,
      // Helper for creating transactions
      createTx: () => new TransactionBlock(),
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
