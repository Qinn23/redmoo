import { ConnectButton, useWallet } from '@suiet/wallet-kit';

export default function ConnectWalletButton() {
  const wallet = useWallet();
  
  const connected = wallet.connected;
  const address = wallet.account?.address;
  
  const handleDetailsClick = () => {
    if (wallet.connected) {
      console.log('Wallet Details:', {
        name: wallet.name || 'Unknown',
        address: wallet.account?.address,
        publicKey: wallet.account?.publicKey,
        status: connected ? 'connected' : 'disconnected'
      });
    }
  };

  const handleDisconnect = async () => {
    try {
      await wallet.disconnect();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ConnectButton 
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
      />
      
      {connected && (
        <div className="flex flex-col gap-2 p-4 border rounded">
          <p className="font-medium">Connected to: {wallet.name || 'Unknown Wallet'}</p>
          <p className="text-sm break-all">Address: {address}</p>
          <button
            onClick={handleDetailsClick}
            className="px-4 py-2 mt-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            View Details
          </button>
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 mt-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
