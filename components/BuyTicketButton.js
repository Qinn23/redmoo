import { useState } from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { ConnectButton, useWallet } from '@suiet/wallet-kit';

export function BuyTicketButton({ eventId, seatId, seatType, price, packageId, moduleId }) {
    const wallet = useWallet();
    const connected = wallet.connected;
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const handlePurchase = async () => {
        if (!connected) {
            // We'll use ConnectButton instead of manually connecting
            return;
        }

        try {
            setIsProcessing(true);
            setError('');

            // Create transaction block
            const txb = new TransactionBlock();
            
            // Example for a ticket purchase transaction
            txb.moveCall({
                target: `${packageId}::${moduleId}::buy_ticket`,
                arguments: [
                    txb.pure(eventId),
                    txb.pure(seatId),
                    txb.pure(seatType), // 1 for VIP, 2 for Normal
                    txb.pure(price)
                ],
            });

            // Sign and execute the transaction using Suiet wallet-kit
            const result = await wallet.signAndExecuteTransaction({
                transaction: txb
            });
            
            console.log('Purchase successful:', result);
            
            // Show success message or redirect
            alert('Ticket purchased successfully!');
            
        } catch (error) {
            console.error('Purchase failed:', error);
            setError(error.message || String(error));
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
            {!connected ? (
                <ConnectButton
                    className="w-full py-4 rounded-full font-bold bg-[#D84040] hover:bg-[#A31D1D] text-white"
                    connectText="Connect Wallet to Buy"
                />
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
                    {isProcessing ? 'Processing...' : 'Buy Ticket'}
                </button>
            )}
        </div>
    );
}
