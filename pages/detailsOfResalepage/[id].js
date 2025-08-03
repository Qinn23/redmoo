import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const sampleResaleEvents = [
  { id: 3, name: "NBA Finals Game 7", date: "2024-06-15", venue: "Chase Center", price: "$200", seller: "0x123...abcd", seat: "A12" },
  { id: 4, name: "Comic Con 2024", date: "2024-07-25", venue: "Convention Center", price: "$80", seller: "0x456...efgh", seat: "B7" },
];

export default function DetailsOfResalePage() {
  const router = useRouter();
  const { id } = router.query;
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (id) {
      const found = sampleResaleEvents.find(e => String(e.id) === String(id));
      setTicket(found);
    }
  }, [id]);

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
            <div className="font-bold text-lg font-domine text-[#A31D1D]">{ticket.name}</div>
            <div className="text-gray-700 font-domine">{ticket.date} &bull; {ticket.venue}</div>
            <div className="text-[#D84040] font-bold font-domine text-xl mt-2">{ticket.price}</div>
          </div>
          <div className="border-t border-gray-200 my-2"></div>
          {/* Owner Details */}
          <div className="text-left">
            <div className="font-semibold text-base text-[#A31D1D] font-domine mb-1">Seller Information</div>
            <div className="text-gray-600 font-domine">Wallet Address: <span className="font-mono">{ticket.seller}</span></div>
            <div className="text-gray-600 font-domine">Seat: <span className="font-mono">{ticket.seat}</span></div>
          </div>
        </div>
        <button
          className="bg-[#D84040] text-white px-8 py-3 rounded-full hover:bg-[#A31D1D] font-domine font-medium transition-all shadow-lg mt-8 w-full text-lg"
          onClick={() => alert('Purchase confirmed!')}
        >
          Confirm Buy
        </button>
      </div>
    </div>
  );
}