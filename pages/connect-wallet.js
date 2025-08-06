import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ConnectButton, useWallet } from '@suiet/wallet-kit';

export default function ConnectWallet() {
  const router = useRouter();
  const wallet = useWallet();

  // If already connected, redirect to profile
  useEffect(() => {
    if (wallet.connected) {
      console.log("Connected to wallet:", wallet.account?.address);
      // Redirect to profile page after successful connection
      setTimeout(() => router.replace("/profile"), 1000);
    }
  }, [wallet.connected, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-center mb-6">Connect Wallet</h1>
        
        <div className="flex justify-center mb-6">
          <ConnectButton 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          />
        </div>
        
        <p className="text-gray-500">
          Connect your Sui wallet to continue
        </p>
      </div>
    </div>
  );
}