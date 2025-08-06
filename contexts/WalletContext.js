import { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

// Initialize Sui client for devnet
export const suiClient = new SuiClient({
  url: getFullnodeUrl('devnet'),
});

const WalletContext = createContext(null);

export function CustomWalletProvider({ children }) {
  const walletKit = useWallet();
  
  const [address, setAddress] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const connected = walletKit.connected;

  useEffect(() => {
    if (walletKit.account?.address) {
      setAddress(walletKit.account.address);
      console.log('Wallet connected:', {
        address: walletKit.account.address,
        publicKey: walletKit.account.publicKey
      });
      localStorage.setItem('walletConnected', 'true');
    } else {
      setAddress(null);
      localStorage.setItem('walletConnected', 'false');
    }
  }, [walletKit.connected, walletKit.account]);

  useEffect(() => {
    if (walletKit.account?.address) {
      setAddress(walletKit.account.address);
      localStorage.setItem('walletConnected', 'true');
    } else {
      setAddress(null);
      localStorage.setItem('walletConnected', 'false');
    }
  }, [walletKit.account]);

  // Suiet wallet-kit handles connection, these are wrapper functions
  // for compatibility with existing code
  const connectWallet = async () => {
    try {
      setConnecting(true);
      await walletKit.connect();
      return true;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      localStorage.setItem('walletConnected', 'false');
      throw error;
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      await walletKit.disconnect();
      localStorage.setItem('walletConnected', 'false');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  // Execute transaction wrapper function
  const signAndExecuteTransaction = async (transaction) => {
    if (!walletKit.connected) {
      throw new Error('Wallet not connected');
    }
    try {
      return await walletKit.signAndExecuteTransaction(transaction);
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  };

  // Auto-connect if previously connected
  useEffect(() => {
    const wasConnected = localStorage.getItem('walletConnected') === 'true';
    if (wasConnected && !connected) {
      walletKit.connect().catch(console.error);
    }
  }, [connected]);

  return (
    <WalletContext.Provider value={{
      walletContents: [],
      currentAccount: walletKit.account,
      connected,
      connecting,
      address,
      connectWallet,
      disconnectWallet,
      signAndExecuteTransaction,
      wallet: walletKit,
      // Sui client for transactions
      suiClient,
      // Helper for creating transactions
      createTx: () => new TransactionBlock(),
    }}>
      {children}
    </WalletContext.Provider>
  );
}

// Helper hook to use wallet context
export function useCustomWallet() {
  const context = useContext(WalletContext);
  if (context === null) {
    throw new Error('useCustomWallet must be used within a CustomWalletProvider');
  }
  return context;
}

export default WalletContext;
