import { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import '@suiet/wallet-kit/style.css';

// Initialize Sui client for devnet
export const suiClient = new SuiClient({
  url: getFullnodeUrl('devnet'),
});

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const wallet = useWallet();
  const { connected, account: currentAccount, configuredWallets: wallets, connecting, wallet: selectedWallet } = wallet;
  const [address, setAddress] = useState(null);
  const [availableWallets, setAvailableWallets] = useState([]);

  useEffect(() => {
    if (currentAccount?.address) {
      setAddress(currentAccount.address);
      console.log('Wallet connected:', {
        address: currentAccount.address,
        publicKey: currentAccount.publicKey,
        wallet: selectedWallet
      });
      localStorage.setItem('walletConnected', 'true');
    } else {
      setAddress(null);
      localStorage.removeItem('walletConnected');
    }
  }, [currentAccount, selectedWallet]);

  useEffect(() => {
    // Debug: log all detected wallets and their properties
    if (wallets) {
      console.log('All detected wallets:', wallets.map(w => ({
        name: w.name,
        icon: w.icon,
        version: w.version,
        installed: w.installed,
        adapter: w.adapter,
        accounts: w.accounts
      })));
    } else {
      console.log('No wallets detected (wallets is undefined or null)');
    }

    // Filter to only show installed wallets
    const installedWallets = wallets?.filter(w => w.installed) || [];
    setAvailableWallets(installedWallets);

    if (installedWallets.length > 0) {
      console.log('Installed wallets:', installedWallets.map(w => ({
        name: w.name,
        icon: w.icon,
        version: w.version,
        installed: w.installed
      })));
    } else {
      console.log('No installed wallets found.');
    }
  }, [wallets]);

  const connectWallet = async () => {
    try {
      await wallet.connect();
      return wallet;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      localStorage.removeItem('walletConnected');
      throw error;
    }
  };

  const disconnectWallet = async () => {
    try {
      await wallet.disconnect();
      localStorage.removeItem('walletConnected');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  // Auto-connect if previously connected
  useEffect(() => {
    const wasConnected = localStorage.getItem('walletConnected') === 'true';
    if (wasConnected && !connected) {
      connectWallet().catch(console.error);
    }
  }, [connected]);

  return (
    <WalletContext.Provider value={{
      walletContents: availableWallets,
      currentAccount,
      connected,
      connecting,
      selectedWallet,
      address,
      connectWallet,
      disconnectWallet,
      wallet,
      // Sui client for transactions
      suiClient,
      // Helper for creating transactions
      createTx: () => new TransactionBlock(),
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useAppWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useAppWallet must be used within a WalletProvider');
  }
  return context;
};
