import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppWallet } from "../contexts/WalletContext";

function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);
  if (!message) return null;
  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white font-bold ${type === "error" ? "bg-red-600" : "bg-green-600"}`}>{message}</div>
  );
}

export default function ConnectWallet() {
  const router = useRouter();
  const {
    walletContents: wallets = [],
    currentAccount,
    connected: isConnected,
    select,
    connectWallet,
    error,
    requestFaucetFunds
  } = useAppWallet();

  const [showModal, setShowModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [localError, setLocalError] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [requestingFaucet, setRequestingFaucet] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const connectBtnRef = useRef();

  useEffect(() => {
    // If already connected, redirect to profile
    if (isConnected) {
      router.replace('/profile');
    }
  }, [isConnected, router]);

  const handleOpenModal = () => {
    setShowModal(true);
    setSelectedWallet(null);
    setLocalError("");
  };

  const handleSelectWallet = (wallet) => {
    setSelectedWallet(wallet);
    setLocalError("");
  };

  const handleConnect = async (e) => {
    e?.preventDefault?.();
    setLocalError("");
    
    if (!selectedWallet) {
      setLocalError("Please select a wallet.");
      return;
    }

    console.log('🖱️ Connect button clicked, selected wallet:', selectedWallet.name);

    try {
      setIsConnecting(true);
      await select(selectedWallet.name);
      await connectWallet();
      console.log('📊 Connection successful');
      
      setShowModal(false);
      setToast({ message: `Connected to ${selectedWallet.name}`, type: "success" });
      setTimeout(() => router.replace("/profile"), 500);
    } catch (err) {
      console.error('💥 Connection error caught:', err);
      const errorMsg = "Failed to connect: " + (err?.message || err);
      setLocalError(errorMsg);
      setToast({ message: "Failed to connect", type: "error" });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRequestFaucet = async () => {
    if (!isConnected) return;
    
    setRequestingFaucet(true);
    try {
      await requestFaucetFunds();
      setToast({ message: "Faucet request sent! Funds will appear shortly.", type: "success" });
    } catch (err) {
      setToast({ message: "Failed to request faucet funds", type: "error" });
    } finally {
      setRequestingFaucet(false);
    }
  };

  // Accessibility: close modal on Escape
  useEffect(() => {
    if (!showModal) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showModal]);

  return (
    <div className="flex items-center justify-center h-full">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-lg">
        <h1 className="text-3xl font-bold text-[#A31D1D] mb-4 font-chonburi">Connect Your Wallet</h1>
        <p className="text-gray-700 font-domine mb-4">
          Click below to connect your Sui wallet.
        </p>
        <div className="space-y-4">
          <button
            className="bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] transition-all duration-200 font-medium font-domine hover:scale-110 transform hover:shadow-lg"
            onClick={handleOpenModal}
          >
            Connect Wallet
          </button>
          
          {/* Devnet Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-semibold text-blue-800">Devnet Mode</span>
            </div>
            <p className="text-blue-700">
              This dApp operates on Sui Devnet. You can get free test SUI from the faucet after connecting your wallet.
            </p>
          </div>
        </div>
        
        {(error || localError) && (
          <div className="text-red-600 mb-2 text-center">
            {error || localError}
          </div>
        )}
        {/* Modal for wallet selection */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div
              className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl relative focus:outline-none"
              tabIndex={-1}
              aria-modal="true"
              role="dialog"
            >
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">Select Wallet</h2>
              <div className="mb-4 flex flex-col items-center">
                {wallets.length === 0 && (
                  <div className="text-gray-500 mb-2 text-center">
                    No Sui wallets detected. If you've already installed the wallet:<br />
                    1. Make sure to refresh the page<br />
                    2. Check if the extension is enabled<br />
                    3. Click the extension icon to ensure it's set up<br /><br />
                    Or install a wallet:<br />
                    <a href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil" target="_blank" rel="noopener noreferrer" className="text-[#D84040] underline">Sui Wallet Extension</a>
                  </div>
                )}
                {wallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    className={`flex items-center px-4 py-2 mb-2 rounded border w-full justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#D84040] ${
                      selectedWallet?.name === wallet.name
                        ? "border-[#D84040] bg-[#F8F2DE]"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleSelectWallet(wallet)}
                    tabIndex={0}
                    aria-pressed={selectedWallet?.name === wallet.name}
                  >
                    <img
                      src={wallet.icon}
                      alt={wallet.name}
                      className="w-6 h-6 mr-2 rounded-full"
                    />
                    <span className="font-domine">{wallet.name}</span>
                  </button>
                ))}
              </div>
              <button
                className="bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] transition-all duration-200 font-medium font-domine hover:scale-110 transform hover:shadow-lg w-full flex items-center justify-center"
                onClick={handleConnect}
                disabled={!selectedWallet || isConnecting}
                ref={connectBtnRef}
                aria-busy={isConnecting}
              >
                {isConnecting && (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                )}
                Connect
              </button>
              {(error || localError) && (
                <div className="text-red-600 mt-2 text-center">
                  {error || localError}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @media (max-width: 600px) {
          .max-w-lg, .max-w-md { max-width: 98vw !important; }
          .p-8 { padding: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
}