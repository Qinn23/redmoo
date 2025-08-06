import { useState } from 'react';
import { useAppWallet } from '../contexts/WalletContext';
import { purchaseTicket, getEventDetails } from '../utils/sui-contract';

export function BuyTicketButton({ eventId, seatId, seatType, price }) {
    const { connected, connectWallet, wallet, walletContents } = useAppWallet();
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const handlePurchase = async () => {
        if (!connected) {
            await connectWallet();
            return;
        }

        try {
            setIsProcessing(true);
            setError('');

            const purchaseData = {
                eventId,
                seatId,
                seatType, // 1 for VIP, 2 for Normal
                price
            };

            const tx = await purchaseTicket(wallet, purchaseData);
            console.log('Purchase successful:', tx);
            
            // Show success message or redirect
            alert('Ticket purchased successfully!');
            
        } catch (error) {
            console.error('Purchase failed:', error);
            setError(error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div>
            {error && (
                <div className="text-red-600 mb-4">
                    {error}
                </div>
            )}
            {walletContents && walletContents.length === 0 ? (
                <div className="mb-4">
                    <div className="text-yellow-700 mb-2">
                        No Sui wallet detected. If you've already installed the wallet:<br />
                        1. Make sure to refresh the page<br />
                        2. Check if the extension is enabled<br />
                        3. Click the extension icon to ensure it's set up<br /><br />
                        Or install a wallet: 
                        <a
                            href="https://chromewebstore.google.com/detail/khpkpbbcccdmmclmpigdgddabeilkdpd?utm_source=item-share-cb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#D84040] underline hover:text-[#A31D1D]"
                        >
                            Suiet Wallet Extension
                        </a>
                    </div>
                </div>
            ) : (
                <button
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className={`w-full py-4 rounded-full font-bold 
                        ${isProcessing 
                            ? 'bg-gray-400' 
                            : 'bg-[#D84040] hover:bg-[#A31D1D]'
                        } text-white`}
                >
                    {!connected 
                        ? 'Connect Wallet' 
                        : isProcessing 
                            ? 'Processing...' 
                            : 'Buy Ticket'
                    }
                </button>
            )}
        </div>
    );
}
