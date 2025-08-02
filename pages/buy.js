import { useState } from "react";

const sampleEvents = [
  { id: 1, name: "Taylor Swift - The Eras Tour", date: "2025-09-15", venue: "MetLife Stadium", price: "$150" },
  { id: 2, name: "Ed Sheeran Live in Concert", date: "2025-11-20", venue: "Madison Square Garden", price: "$120" },
  { id: 3, name: "NBA Finals Game 7", date: "2025-10-15", venue: "Chase Center", price: "$200" },
  { id: 4, name: "Comic Con 2024", date: "2025-07-25", venue: "Convention Center", price: "$80" },
];

export default function Buy() {
  const [search, setSearch] = useState("");
  const filteredEvents = sampleEvents.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.venue.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-[#A31D1D] mb-4 font-chonburi">Buy Tickets</h1>
        <p className="text-[#A31D1D] font-domine mb-6 text-base">Here are second-hand tickets resold by other users.</p>
        <input
          className="border px-4 py-2 rounded w-full mb-6 font-domine"
          placeholder="Search for events to buy..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="grid gap-4">
          {filteredEvents.length === 0 && <div className="text-gray-500">No events found.</div>}
          {filteredEvents.map(event => (
            <div key={event.id} className="flex flex-col md:flex-row items-center justify-between bg-[#F8F2DE] rounded p-4 shadow">
              <div className="flex-1 text-left">
                <div className="font-bold text-lg font-domine text-[#A31D1D]">{event.name}</div>
                <div className="text-gray-700 font-domine">{event.date} &bull; {event.venue}</div>
                <div className="text-[#D84040] font-bold font-domine">{event.price}</div>
              </div>
              <button className="mt-4 md:mt-0 md:ml-6 bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] font-domine font-medium transition-all">Buy</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}