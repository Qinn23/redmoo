import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWallet } from "../contexts/WalletContext";
import { getEnhancedTicketInfo, loadContractConfig } from "../utils/contract-interactions";
import { SuiClient } from '@mysten/sui.js/client';

const sampleResaleEvents = [
  { id: 3, name: "NBA Finals Game 7", date: "2024-06-15", venue: "Chase Center", price: "$200", seller: "0x123...abcd", seat: "Section A, Row 5, Seat 10" },
  { id: 4, name: "Comic Con 2024", date: "2024-07-25", venue: "Convention Center", price: "$80", seller: "0x456...efgh", seat: "VIP Pass" },
];

export default function BuyResale() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { isConnected } = useWallet();
  const [showWalletMessage, setShowWalletMessage] = useState(false);
  const [resaleTickets, setResaleTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResaleTickets();
  }, []);

  const loadResaleTickets = async () => {
    try {
      setLoading(true);
      
      // Load contract configuration
      await loadContractConfig();
      
      // Initialize Sui client
      const suiClient = new SuiClient({ 
        url: process.env.NEXT_PUBLIC_SUI_NETWORK || 'https://fullnode.devnet.sui.io:443' 
      });

      // In a real implementation, you would:
      // 1. Query all Ticket objects that have for_sale = true
      // 2. Get their details and associated event information
      // For now, we'll use sample data since we need to implement ticket querying
      
      // This is a placeholder - in reality you'd query the blockchain for tickets with for_sale = true
      const mockResaleTickets = [
        {
          id: 'ticket_1',
          ticketObjectId: '0x1234567890abcdef',
          eventName: 'Taylor Swift Concert',
          eventDate: '2024-12-15',
          venue: 'Madison Square Garden',
          seat: 'Section A, Row 3, Seat 15',
          seatType: 1, // VIP
          originalPrice: 150,
          resalePrice: 165, // 110% of original
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
          originalPrice: 75,
          resalePrice: 82, // 109% of original
          seller: '0x5678...efgh',
          forSale: true
        }
      ];

      setResaleTickets(mockResaleTickets);
      
    } catch (error) {
      console.error('Error loading resale tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = search
    ? resaleTickets.filter(ticket =>
        ticket.eventName.toLowerCase().includes(search.toLowerCase()) ||
        ticket.venue.toLowerCase().includes(search.toLowerCase())
      )
    : resaleTickets;

  const handleBuyClick = (ticket) => {
    if (!isConnected) {
      setShowWalletMessage(true);
      setTimeout(() => setShowWalletMessage(false), 3000);
    } else {
      router.push(`/detailsOfResalepage/${ticket.ticketObjectId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-[#A31D1D] mb-4 font-chonburi">Loading Resale Tickets...</h1>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-[#A31D1D] mb-4 font-chonburi">Loading Resale Tickets...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-[#A31D1D] mb-4 font-chonburi">Buy Resale Tickets</h1>
        <p className="text-[#A31D1D] font-domine mb-6 text-base">
          Here are resale tickets being resold by other users.
        </p>
        {showWalletMessage && (
          <div className="mb-6 p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-lg">
            <p className="text-[#DC2626] font-domine text-sm">
              Please connect your wallet first before purchasing tickets.
            </p>
          </div>
        )}
        <div className="flex justify-center mb-6">
          <input
            className="border px-4 py-2 rounded font-domine w-full max-w-7xl"
            style={{ minWidth: '600px' }}
            placeholder="Search for resale tickets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
                <div className="grid gap-4">
          {filteredTickets.length === 0 && search && <div className="text-gray-500">No resale tickets found.</div>}
          {filteredTickets.length === 0 && !search && <div className="text-gray-500">No tickets available for resale.</div>}
          {filteredTickets.map(ticket => (
            <div key={ticket.id} className="flex flex-col md:flex-row items-center justify-between bg-[#F8F2DE] rounded p-4 shadow">
              <div className="flex-1 text-left">
                <div className="font-bold text-lg font-domine text-[#A31D1D]">{ticket.eventName}</div>
                <div className="text-gray-700 font-domine">{ticket.eventDate} &bull; {ticket.venue}</div>
                <div className="text-gray-600 font-domine">Seller: {ticket.seller || 'N/A'}</div>
                <div className="text-gray-600 font-domine">Seat: {ticket.seat || 'N/A'}</div>
                <div className="text-gray-600 font-domine">
                  Type: {ticket.seatType === 1 ? 'VIP' : 'Normal'} &bull; 
                  Original: ${(ticket.originalPrice / 1_000_000_000).toFixed(2)}
                </div>
                <div className="text-[#D84040] font-bold font-domine">
                  Resale Price: ${(ticket.resalePrice / 1_000_000_000).toFixed(2)}
                </div>
              </div>
              <button 
                onClick={() => handleBuyClick(ticket)}
                className="mt-4 md:mt-0 md:ml-6 bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] font-domine font-medium transition-all"
              >
                Buy Ticket
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}