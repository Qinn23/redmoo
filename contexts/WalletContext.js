import { createContext, useContext, useState, useEffect } from 'react';
import { useWallets, useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

// Initialize Sui client for devnet
export const suiClient = new SuiClient({
  url: getFullnodeUrl('devnet'),
});

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const wallets = useWallets();
  const currentAccount = useCurrentAccount();
  const signAndExecuteTransaction = useSignAndExecuteTransaction();
  
  const [address, setAddress] = useState(null);
  const [availableWallets, setAvailableWallets] = useState([]);
  const [connecting, setConnecting] = useState(false);
  const connected = !!currentAccount;

  useEffect(() => {
    if (currentAccount?.address) {
      setAddress(currentAccount.address);
      console.log('Wallet connected:', {
        address: currentAccount.address,
        publicKey: currentAccount.publicKey
      });
      localStorage.setItem('walletConnected', 'true');
    } else {
      setAddress(null);
      localStorage.removeItem('walletConnected');
    }
  }, [currentAccount]);

  useEffect(() => {
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
    }
  }, [wallets]);

  // Note: With the new dapp-kit, connection is handled directly by ConnectButton/ConnectModal
  // These functions are kept for compatibility with existing code
  const connectWallet = async () => {
    try {
      setConnecting(true);
      console.log('Wallet connection handled by ConnectButton component');
      return true;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      localStorage.removeItem('walletConnected');
      throw error;
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      console.log('Wallet disconnection handled by ConnectButton component');
      localStorage.removeItem('walletConnected');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };
  
  // No longer needed with new ConnectButton/ConnectModal
  const select = async (walletName) => {
    console.log(`Selection of wallet ${walletName} is handled by ConnectButton/ConnectModal component`);
    return true;
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
      address,
      connectWallet,
      disconnectWallet,
      select,
      signAndExecuteTransaction,
      // Sui client for transactions
      suiClient,
      // Helper for creating transactions
      createTx: () => new TransactionBlock(),
    }}>
      {children}
    </WalletContext.Provider>
  );
}

// - useCurrentAccount() - to get the current connected account
// - useCurrentWallet() - to get info about the current wallet
// - useSignAndExecuteTransaction() - for sending transactions
// - useWallets() - to get a list of available wallets
