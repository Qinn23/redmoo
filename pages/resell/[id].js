import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Mock data for resell tickets
const mockResellTickets = [
  { id: 1, seller: "0x123...abcd", price: "$160", seat: "A12" },
  { id: 2, seller: "0x456...efgh", price: "$155", seat: "B7" },
];

const sampleEvents = [
  { id: 1, name: "Taylor Swift - The Eras Tour", date: "2024-12-15", venue: "MetLife Stadium", price: "$150" },
  { id: 2, name: "Ed Sheeran Live in Concert", date: "2024-11-20", venue: "Madison Square Garden", price: "$120" },
  { id: 3, name: "NBA Finals Game 7", date: "2024-06-15", venue: "Chase Center", price: "$200" },
  { id: 4, name: "Comic Con 2024", date: "2024-07-25", venue: "Convention Center", price: "$80" },
];

export default function ResellPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (id) {
      const foundEvent = sampleEvents.find(e => e.id === parseInt(id));
      setEvent(foundEvent);
      // In real app, fetch tickets for this event from backend
      setTickets(mockResellTickets);
    }
  }, [id]);

  if (!event) return <div className="p-8 text-center">Loading event...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#A31D1D] mb-2 font-chonburi">{event.name}</h1>
      <div className="text-gray-700 mb-4 font-domine">{event.date} &bull; {event.venue}</div>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-[#A31D1D] font-chonburi">Available Second-Hand Tickets</h2>
        {tickets.length === 0 ? (
          <div className="text-gray-500 font-domine">No tickets available for resale at the moment.</div>
        ) : (
          <div className="space-y-4">
            {tickets.map(ticket => (
              <div key={ticket.id} className="flex items-center justify-between bg-[#F8F2DE] rounded p-4 shadow">
                <div>
                  <div className="font-domine font-medium">Seller: {ticket.seller}</div>
                  <div className="font-domine">Seat: {ticket.seat}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-[#D84040] font-bold font-domine text-lg">{ticket.price}</div>
                  <button className="bg-[#D84040] text-white px-4 py-2 rounded-full hover:bg-[#A31D1D] font-domine font-medium transition-all">Buy</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}