import { useWalletKit } from '@mysten/wallet-kit';

export default function WalletConnectModal({ isOpen, onClose, onConnect }) {
  const { connect, wallets } = useWalletKit();

  const handleWalletSelect = async (wallet) => {
    try {
      await connect(wallet);
      onConnect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 font-domine">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleWalletSelect(wallet)}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#D84040] hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {wallet.icon && (
                  <img src={wallet.icon} alt={wallet.name} className="w-8 h-8" />
                )}
                <span className="font-medium text-gray-800 font-domine">{wallet.name}</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-domine">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
} 