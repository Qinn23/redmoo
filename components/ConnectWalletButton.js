import { ConnectButton } from '@suiet/wallet-kit';
import { useWallet } from '@suiet/wallet-kit';
import { useAppWallet } from '../contexts/WalletContext';

export default function ConnectWalletButton() {
  const suietWallet = useWallet();
  const { connectWallet, disconnectWallet, connected, address } = useAppWallet();
  
  const handleDetailsClick = () => {
    if (suietWallet.account) {
      console.log('Wallet Details:', {
        name: suietWallet.name,
        address: suietWallet.account.address,
        publicKey: suietWallet.account.publicKey,
        chains: suietWallet.chains,
        features: suietWallet.features,
        status: suietWallet.status
      });
    }
  };

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ConnectButton 
        onConnectSuccess={handleConnect}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      />
      
      {connected && (
        <div className="flex flex-col gap-2 p-4 border rounded">
          <p className="font-medium">Connected to: {suietWallet.name || 'Unknown Wallet'}</p>
          <p className="text-sm break-all">Address: {address || suietWallet.account?.address}</p>
          <button
            onClick={handleDetailsClick}
            className="px-4 py-2 mt-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            View Details
          </button>
          <button
            onClick={disconnectWallet}
            className="px-4 py-2 mt-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
