import { createContext, useContext, useState, useEffect } from 'react';
import { ConnectButton, useWallet as useDappKit } from '@mysten/dapp-kit';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState(null);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    // Check if wallet was previously connected
    const wasConnected = localStorage.getItem('walletConnected') === 'true';
    if (wasConnected) {
      connectWallet();
    }
  }, []);

  const connectWallet = async () => {
    try {
      const walletAdapter = new SuiWalletAdapter();
      await walletAdapter.connect();
      
      setWallet(walletAdapter);
      setConnected(true);
      setAddress(walletAdapter.address);
      
      localStorage.setItem('walletConnected', 'true');
      
      return walletAdapter;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      localStorage.removeItem('walletConnected');
      throw error;
    }
  };

  const disconnectWallet = async () => {
    if (wallet) {
      try {
        await wallet.disconnect();
        setWallet(null);
        setConnected(false);
        setAddress(null);
        localStorage.removeItem('walletConnected');
      } catch (error) {
        console.error('Failed to disconnect wallet:', error);
      }
    }
  };

  return (
    <WalletContext.Provider value={{
      wallet,
      connected,
      address,
      connectWallet,
      disconnectWallet
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
