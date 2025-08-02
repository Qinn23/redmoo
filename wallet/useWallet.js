import { useState, useEffect } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';

export function useWalletInfo() {
  const { currentAccount, signAndExecuteTransactionBlock } = useWalletKit();
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (currentAccount) {
      setAddress(currentAccount.address);
      setIsConnected(true);
    } else {
      setAddress(null);
      setIsConnected(false);
    }
  }, [currentAccount]);

  return {
    address,
    isConnected,
    signAndExecuteTransactionBlock
  };
} 