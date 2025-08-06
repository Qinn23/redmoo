import { useState } from 'react';
import { useAppWallet } from '../contexts/WalletContext';
import { purchaseTicket, getEventDetails } from '../utils/sui-contract';

export function BuyTicketButton({ eventId, seatId, seatType, price }) {
        const { connected, connectWallet } = useAppWallet();
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
        </div>
    );
}
