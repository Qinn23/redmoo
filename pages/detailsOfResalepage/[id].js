import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useWallet } from "../../contexts/WalletContext";
import { createPurchaseResaleTicketTransaction, loadContractConfig } from "../../utils/contract-interactions";

const sampleResaleEvents = [
  { 
    id: 'ticket_1',
    ticketObjectId: '0x1234567890abcdef',
    eventName: 'Taylor Swift Concert',
    eventDate: '2024-12-15',
    venue: 'Madison Square Garden',
    seat: 'Section A, Row 3, Seat 15',
    seatType: 1, // VIP
    originalPrice: 150000000000, // 150 SUI in MIST
    resalePrice: 165000000000, // 165 SUI in MIST
    seller: '0x1234...abcd',
    forSale: true
  },
  { 
    id: 'ticket_2', 
    ticketObjectId: '0xabcdef1234567890',
    eventName: 'NFL Championship',
    eventDate: '2024-11-28',
    venue: 'MetLife Stadium',
    seat: 'Section 200, Row 10, Seat 5',
    seatType: 2, // Normal
    originalPrice: 75000000000, // 75 SUI in MIST
    resalePrice: 82000000000, // 82 SUI in MIST
    seller: '0x5678...efgh',
    forSale: true
  }
];

export default function DetailsOfResalePage() {
  const router = useRouter();
  const { id } = router.query;
  const [ticket, setTicket] = useState(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const { isConnected, wallet } = useWallet();

  useEffect(() => {
    if (id) {
      const found = sampleResaleEvents.find(ticket => ticket.ticketObjectId === id);
      setTicket(found);
    }
  }, [id]);

  const handlePurchase = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!ticket) return;

    try {
      setIsPurchasing(true);

      // Load contract configuration
      await loadContractConfig();

      // Create purchase resale ticket transaction
      const purchaseTx = createPurchaseResaleTicketTransaction({
        ticketObjectId: ticket.ticketObjectId,
        resalePrice: ticket.resalePrice
      });

      // Execute transaction
      const result = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: purchaseTx,
        options: {
          showInput: true,
          showEffects: true,
          showEvents: true,
          showObjectChanges: true,
          showBalanceChanges: true,
        },
      });

      console.log('Purchase transaction result:', result);

      if (result.digest) {
        alert('Ticket purchased successfully! Ownership has been transferred to your wallet.');
        router.push('/profile');
      }

    } catch (error) {
      console.error('Error purchasing resale ticket:', error);
      alert('Failed to purchase ticket. Please try again.');
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!ticket) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-full min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl min-h-[500px] flex flex-col justify-between">
        <h1 className="text-3xl font-bold text-[#A31D1D] mb-6 font-chonburi">Resale Ticket Details</h1>
        <div className="flex flex-col gap-6 flex-1">
          {/* Event Details */}
          <div className="text-left">
            <div className="font-bold text-lg font-domine text-[#A31D1D]">{ticket.eventName}</div>
            <div className="text-gray-700 font-domine">{ticket.eventDate} &bull; {ticket.venue}</div>
            <div className="text-gray-600 font-domine">
              Type: {ticket.seatType === 1 ? 'VIP' : 'Normal'} &bull; 
              Original: ${(ticket.originalPrice / 1_000_000_000).toFixed(2)} SUI
            </div>
            <div className="text-[#D84040] font-bold font-domine text-xl mt-2">
              ${(ticket.resalePrice / 1_000_000_000).toFixed(2)} SUI
            </div>
          </div>
          <div className="border-t border-gray-200 my-2"></div>
          {/* Owner Details */}
          <div className="text-left">
            <div className="font-semibold text-base text-[#A31D1D] font-domine mb-1">Seller Information</div>
            <div className="text-gray-600 font-domine">Wallet Address: <span className="font-mono">{ticket.seller}</span></div>
            <div className="text-gray-600 font-domine">Seat: <span className="font-mono">{ticket.seat}</span></div>
          </div>
        </div>
        
        {!isConnected ? (
          <div className="text-center py-4">
            <p className="text-red-600 font-domine mb-4">Please connect your wallet to purchase this ticket</p>
            <button
              className="bg-gray-400 text-white px-8 py-3 rounded-full font-domine font-medium cursor-not-allowed w-full text-lg"
              disabled
            >
              Connect Wallet Required
            </button>
          </div>
        ) : (
          <button
            className="bg-[#D84040] text-white px-8 py-3 rounded-full hover:bg-[#A31D1D] font-domine font-medium transition-all shadow-lg mt-8 w-full text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handlePurchase}
            disabled={isPurchasing}
          >
            {isPurchasing ? 'Purchasing...' : 'Confirm Purchase'}
          </button>
        )}
      </div>
    </div>
  );
}