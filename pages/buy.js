import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const sampleEvents = [
  { id: 1, name: "Taylor Swift - The Eras Tour", date: "2024-12-15", venue: "MetLife Stadium", price: "$150" },
  { id: 2, name: "Ed Sheeran Live in Concert", date: "2024-11-20", venue: "Madison Square Garden", price: "$120" },
  { id: 3, name: "NBA Finals Game 7", date: "2024-06-15", venue: "Chase Center", price: "$200" },
  { id: 4, name: "Comic Con 2024", date: "2024-07-25", venue: "Convention Center", price: "$80" },
];

export default function Buy() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [showWalletMessage, setShowWalletMessage] = useState(false);
  // REMOVED: const [ticketType, setTicketType] = useState("resale");

  // Track wallet connection status
  useEffect(() => {
    setWalletConnected(typeof window !== 'undefined' && localStorage.getItem('walletConnected') === 'true');
    const onStorage = () => setWalletConnected(localStorage.getItem('walletConnected') === 'true');
    window.addEventListener('storage', onStorage);
    const interval = setInterval(() => {
      setWalletConnected(localStorage.getItem('walletConnected') === 'true');
    }, 500);
    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  // Only show events if search is not empty
  const filteredEvents = search
    ? sampleEvents.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.venue.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleBuyClick = (event) => {
    if (!walletConnected) {
      setShowWalletMessage(true);
      // Hide message after 3 seconds
      setTimeout(() => setShowWalletMessage(false), 3000);
    } else {
      // Navigate to event detail page
      router.push(`/event/${event.id}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-[#A31D1D] mb-4 font-chonburi">Buy Tickets</h1>
        <p className="text-[#A31D1D] font-domine mb-6 text-base">
          Here are tickets available for purchase.
        </p>
        {/* Wallet Connection Message */}
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
            placeholder="Search for events to buy..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="grid gap-4">
          {filteredEvents.length === 0 && search && <div className="text-gray-500">No events found.</div>}
          {filteredEvents.map(event => (
            <div key={event.id} className="flex flex-col md:flex-row items-center justify-between bg-[#F8F2DE] rounded p-4 shadow">
              <div className="flex-1 text-left">
                <div className="font-bold text-lg font-domine text-[#A31D1D]">{event.name}</div>
                <div className="text-gray-700 font-domine">{event.date} &bull; {event.venue}</div>
                <div className="text-[#D84040] font-bold font-domine">{event.price}</div>
              </div>
              <button 
                onClick={() => router.push(`/resell/${event.id}`)}
                className="mt-4 md:mt-0 md:ml-6 bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] font-domine font-medium transition-all"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}