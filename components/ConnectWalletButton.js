import { ConnectButton, useCurrentAccount, useCurrentWallet, useDisconnectWallet } from '@mysten/dapp-kit';

export default function ConnectWalletButton() {
  const currentAccount = useCurrentAccount();
  const wallet = useCurrentWallet();
  const { disconnect } = useDisconnectWallet();
  
  const connected = !!currentAccount;
  const address = currentAccount?.address;
  
  const handleDetailsClick = () => {
    if (currentAccount) {
      console.log('Wallet Details:', {
        name: wallet?.name || 'Unknown',
        address: currentAccount.address,
        publicKey: currentAccount.publicKey,
        chains: wallet?.chains || [],
        features: wallet?.features || [],
        status: connected ? 'connected' : 'disconnected'
      });
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <ConnectButton 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      />
      
      {connected && (
        <div className="flex flex-col gap-2 p-4 border rounded">
          <p className="font-medium">Connected to: {wallet?.name || 'Unknown Wallet'}</p>
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
