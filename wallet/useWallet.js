import { useState, useEffect } from 'react';
import { useWallet } from '@suiet/wallet-kit';

/**
 * Custom hook to provide wallet information and functionality
 */
export function useWalletInfo() {
  const wallet = useWallet();
  
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (wallet.connected && wallet.account) {
      setAddress(wallet.account.address);
      setIsConnected(true);
      localStorage.setItem('walletConnected', 'true');
    } else {
      setAddress(null);
      setIsConnected(false);
      localStorage.setItem('walletConnected', 'false');
    }
  }, [wallet.connected, wallet.account]);

  // Helper function to execute transactions
  const signAndExecuteTransaction = async (txb) => {
    if (!wallet.connected) {
      throw new Error('Wallet not connected');
    }
    
    try {
      return await wallet.signAndExecuteTransaction({
        transaction: txb,
      });
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  };

  // Helper function to sign messages
  const signMessage = async (message) => {
    if (!wallet.connected) {
      throw new Error('Wallet not connected');
    }
    
    try {
      const textEncoder = new TextEncoder();
      return await wallet.signPersonalMessage({
        message: typeof message === 'string' ? textEncoder.encode(message) : message,
      });
    } catch (error) {
      console.error('Message signing failed:', error);
      throw error;
    }
  };

  return {
    address,
    isConnected,
    connecting: wallet.connecting,
    wallet,
    account: wallet.account,
    signAndExecuteTransaction,
    signMessage,
    connect: wallet.connect,
    disconnect: wallet.disconnect
  };
}
