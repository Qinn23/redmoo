import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Chonburi, Domine } from "next/font/google";

// Function to add cache-busting parameter to image URLs
const addCacheBuster = (url) => {
  const separator = url.includes('?') ? '&' : '?';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  return `${url}${separator}v=${timestamp}&r=${random}`;
};

// Function to get banner image based on event ID
const getEventBannerImage = (eventId) => {
  const homePageImages = {
    1: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2181107453-20241209114519432.jpg?q=w_3000,c_fill",
    2: "https://www.billboard.com/wp-content/uploads/2023/09/ed-sheeran-wiltern-2023-billboard-1548.jpg?v=2",
    3: "https://i.ytimg.com/vi/pX___DCt-6g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAz22YiPPDDDQc0ADmQ6r-oNyz5iQ",
    4: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhsyC2agb1zZw6MVnRCLoS4iN6wlNWcfE0WUXFgW-U8IUttGujWsixC4Tw2YRJ9OyV4JxWMnmiBcmf5IfkCnsVqCTps7jkj2KxH0zgk6bDXPOhBj0-ztrQMmXPg8TDAkRTlWvGwXggsaSiDgXpfykA1smOhBOhRa6UeVMO9xKj9gFd13pHIoE5os2xxYfn0/w640-h250/Infinite%20KL2025%20-%20Banner.jpg"
  };
  
  return addCacheBuster(homePageImages[eventId] || homePageImages[1]);
};

const chonburi = Chonburi({
  variable: "--font-chonburi",
  subsets: ["latin"],
  weight: "400",
});

const domine = Domine({
  variable: "--font-domine",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Sample events data (same as event detail page)
const sampleEvents = [
  {
    id: 1,
    name: "Taylor Swift - The Eras Tour",
    date: "2024-12-15",
    time: "8:00 PM",
    closingTime: "11:30 PM",
    venue: "MetLife Stadium",
    address: "1 MetLife Stadium Dr, East Rutherford, NJ 07073",
    price: "$150",
    image: "🎤",
    description: "Experience the magic of Taylor Swift's The Eras Tour live in concert. This spectacular show features hits from all of Taylor's albums, stunning visuals, and unforgettable performances.",
    category: "Concert",
    availableTickets: 45,
    totalTickets: 100,
    language: "English",
    ageRating: "All Ages",
    genres: ["Pop", "Country", "Alternative"],
    importantNotices: "Please arrive 30 minutes before the show. No cameras or recording devices allowed. Bags must be clear and no larger than 12x12 inches. Food and beverages available for purchase inside the venue.",
    termsAndConditions: "Tickets are non-refundable and non-transferable. The venue reserves the right to refuse entry. All attendees must comply with venue policies and security measures. In case of event cancellation, refunds will be processed within 30 days.",
    seatingImage: "https://www.usatoday.com/gcdn/authoring/images/smg/2024/06/08/USAT/73857881007-AFP_2153868989.jpeg?crop=2999,1687,x0,y0&width=2999&height=1687&format=pjpg&auto=webp&v=2"
  },
  {
    id: 2,
    name: "Ed Sheeran Live in Concert",
    date: "2024-11-20",
    time: "7:30 PM",
    closingTime: "10:45 PM",
    venue: "Madison Square Garden",
    address: "4 Pennsylvania Plaza, New York, NY 10001",
    price: "$120",
    image: "🎸",
    description: "Join Ed Sheeran for an intimate evening of acoustic and electric performances featuring his greatest hits and latest releases.",
    category: "Concert",
    availableTickets: 23,
    totalTickets: 80,
    language: "English",
    ageRating: "All Ages",
    genres: ["Pop", "Folk", "Acoustic"],
    importantNotices: "Doors open at 6:30 PM. No professional cameras allowed. Small personal cameras are permitted. Please check the venue's bag policy before arrival.",
    termsAndConditions: "Tickets are non-refundable. The artist reserves the right to modify the setlist. All sales are final. No outside food or beverages.",
    seatingImage: "https://www.billboard.com/wp-content/uploads/2023/09/ed-sheeran-wiltern-2023-billboard-1548.jpg?v=2"
  },
  {
    id: 3,
    name: "NBA Finals Game 7",
    date: "2024-06-15",
    time: "8:30 PM",
    closingTime: "11:00 PM",
    venue: "Chase Center",
    address: "1 Warriors Way, San Francisco, CA 94158",
    price: "$200",
    image: "🏀",
    description: "Witness the ultimate showdown in basketball as the NBA Finals reach their thrilling conclusion in Game 7.",
    category: "Sports",
    availableTickets: 12,
    totalTickets: 50,
    language: "English",
    ageRating: "All Ages",
    genres: ["Basketball", "Sports"],
    importantNotices: "Gates open 90 minutes before tip-off. No large bags or backpacks. Clear bag policy in effect. Arrive early for security screening.",
    termsAndConditions: "Tickets are non-refundable. Game time subject to change. No re-entry allowed. Follow all arena policies and security procedures.",
    seatingImage: "https://www.usatoday.com/gcdn/authoring/authoring-images/2025/06/21/USAT/84302193007-shaigilgeousalexandershootsnbafinalsgame-6.jpg?crop=5439,3060,x0,y210&width=660&height=371&format=pjpg&auto=webp&v=2"
  },
  {
    id: 4,
    name: "Comic Con 2024",
    date: "2024-07-25",
    time: "10:00 AM",
    closingTime: "7:00 PM",
    venue: "Convention Center",
    address: "123 Convention Blvd, San Diego, CA 92101",
    price: "$80",
    image: "🎭",
    description: "The biggest comic book and pop culture convention featuring celebrity panels, exclusive merchandise, and cosplay competitions.",
    category: "Convention",
    availableTickets: 156,
    totalTickets: 500,
    language: "English",
    ageRating: "All Ages",
    genres: ["Comics", "Pop Culture", "Gaming"],
    importantNotices: "Cosplay weapons must be peace-bonded. No real weapons allowed. Photography is permitted but respect others' privacy. Food and drinks available for purchase.",
    termsAndConditions: "Tickets are non-refundable. The convention reserves the right to modify the schedule. All attendees must follow convention rules and policies.",
    seatingImage: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhsyC2agb1zZw6MVnRCLoS4iN6wlNWcfE0WUXFgW-U8IUttGujWsixC4Tw2YRJ9OyV4JxWMnmiBcmf5IfkCnsVqCTps7jkj2KxH0zgk6bDXPOhBj0-ztrQMmXPg8TDAkRTlWvGwXggsaSiDgXpfykA1smOhBOhRa6UeVMO9xKj9gFd13pHIoE5os2xxYfn0/w640-h250/Infinite%20KL2025%20-%20Banner.jpg"
  }
];

export default function SeatSelection() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState({
    vip: [],
    normal: []
  });

  useEffect(() => {
    if (id) {
      const foundEvent = sampleEvents.find(e => e.id === parseInt(id));
      setEvent(foundEvent);
    }
  }, [id]);

  // Generate seats based on total tickets with realistic layout
  // This hook must be called before any conditional returns
  const seatsByRow = useMemo(() => {
    if (!event) return {};
    
    // Limit total seats to prevent UI freezing (max 200 seats for demo)
    const maxDisplaySeats = 200;
    const actualTotalSeats = event.totalTickets;
    const totalSeats = Math.min(actualTotalSeats, maxDisplaySeats);
    
    // Scale available seats proportionally
    const availableSeats = Math.floor((event.availableTickets / actualTotalSeats) * totalSeats);
    const soldSeats = totalSeats - availableSeats;
    
    // Create rows (approximately 10-15 seats per row)
    const seatsPerRow = Math.min(15, Math.max(8, Math.floor(Math.sqrt(totalSeats))));
    const totalRows = Math.ceil(totalSeats / seatsPerRow);
    
    // VIP section: front 30% of rows
    const vipRows = Math.max(1, Math.floor(totalRows * 0.3));
    const normalRows = totalRows - vipRows;
    
    const seats = [];
    let seatIndex = 0;
    
    // Generate all seats
    for (let row = 1; row <= totalRows; row++) {
      const isVip = row <= vipRows;
      const seatsInThisRow = Math.min(seatsPerRow, totalSeats - seatIndex);
      
      for (let seat = 1; seat <= seatsInThisRow; seat++) {
        seats.push({
          id: `${row}-${seat}`,
          row: row,
          seat: seat,
          number: `${String.fromCharCode(64 + row)}${seat}`,
          type: isVip ? 'vip' : 'normal',
          price: isVip 
            ? Math.floor(parseFloat(event.price.replace('$', '')) * 1.5)
            : parseFloat(event.price.replace('$', '')),
          status: 'available' // Will be updated below
        });
        seatIndex++;
      }
    }
    
    // Use a more efficient approach to mark seats as sold
    // This ensures the same seats are always sold for the same event
    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    // Create array of all possible indices and shuffle them deterministically
    const allIndices = Array.from({ length: totalSeats }, (_, i) => i);
    
    // Shuffle using seeded random (Fisher-Yates algorithm)
    for (let i = allIndices.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(event.id * 1000 + i) * (i + 1));
      [allIndices[i], allIndices[j]] = [allIndices[j], allIndices[i]];
    }
    
    // Take first 'soldSeats' indices as sold seats
    const soldIndices = allIndices.slice(0, soldSeats);
    
    // Mark specific seats as sold
    soldIndices.forEach(index => {
      if (seats[index]) {
        seats[index].status = 'sold';
      }
    });
    
    // Group seats by row for easier rendering
    const groupedSeats = {};
    seats.forEach(seat => {
      if (!groupedSeats[seat.row]) {
        groupedSeats[seat.row] = [];
      }
      groupedSeats[seat.row].push(seat);
    });
    
    return groupedSeats;
  }, [event]);

  // Early return must be after all hooks
  if (!event) {
    return (
      <div className={`${chonburi.variable} ${domine.variable} min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-[#A31D1D] font-chonburi mb-2">Event Not Found</h1>
          <p className="text-gray-600 font-domine mb-4">The event you're looking for doesn't exist.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-[#D84040] text-white px-6 py-3 rounded-full hover:bg-[#A31D1D] transition-colors font-medium font-domine"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const toggleSeat = (seat) => {
    if (seat.status === 'sold') return; // Can't select sold seats
    
    const category = seat.type;
    const isSelected = selectedSeats[category].includes(seat.id);
    
    if (isSelected) {
      // Always allow deselection
      setSelectedSeats(prev => ({
        ...prev,
        [category]: prev[category].filter(id => id !== seat.id)
      }));
    } else {
      // Check total selected seats limit (4 tickets per wallet)
      const totalSelected = selectedSeats.vip.length + selectedSeats.normal.length;
      const TICKET_LIMIT = 4;
      
      if (totalSelected >= TICKET_LIMIT) {
        // Show alert when limit is reached
        alert(`You can only purchase a maximum of ${TICKET_LIMIT} tickets per wallet address.`);
        return; // Don't change selection
      }
      
      // Add seat to selection
      setSelectedSeats(prev => ({
        ...prev,
        [category]: [...prev[category], seat.id]
      }));
    }
  };

  const getAllSeats = () => {
    const allSeats = [];
    Object.values(seatsByRow).forEach(row => {
      allSeats.push(...row);
    });
    return allSeats;
  };

  const calculateTotal = () => {
    let total = 0;
    const allSeats = getAllSeats();
    
    // Calculate VIP total
    selectedSeats.vip.forEach(seatId => {
      const seat = allSeats.find(s => s.id === seatId);
      if (seat) total += seat.price;
    });
    
    // Calculate Normal total
    selectedSeats.normal.forEach(seatId => {
      const seat = allSeats.find(s => s.id === seatId);
      if (seat) total += seat.price;
    });
    
    return total;
  };

  const getTotalSelectedSeats = () => {
    return selectedSeats.vip.length + selectedSeats.normal.length;
  };

  const proceedToCheckout = () => {
    if (getTotalSelectedSeats() === 0) {
      alert('Please select at least one seat');
      return;
    }
    
    // For now, just show an alert with the selection
    const total = calculateTotal();
    const totalSeats = getTotalSelectedSeats();
    alert(`Proceeding to checkout:\nSeats selected: ${totalSeats}\nTotal: $${total.toFixed(2)}`);
  };

  return (
    <div className={`${chonburi.variable} ${domine.variable}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Back Button */}
        <button 
          onClick={() => router.push(`/event/${event.id}`)}
          className="flex items-center text-[#D84040] hover:text-[#A31D1D] font-medium font-domine mb-4 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Event Details
        </button>

        {/* Event Header */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <h1 className="text-3xl font-bold text-[#A31D1D] font-chonburi mb-2">{event.name}</h1>
          <div className="text-gray-600 font-domine">
            <p>{event.date} • {event.time} • {event.venue}</p>
            <p className="text-sm mt-1">
              {event.availableTickets} available out of {event.totalTickets} total seats
              {event.totalTickets > 200 && (
                <span className="block text-xs text-orange-600 mt-1">
                  * Showing representative sample of {Math.min(event.totalTickets, 200)} seats for performance
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Seat Selection Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-2xl font-bold text-[#A31D1D] font-chonburi mb-4">Select Your Seats</h2>
              
              {/* Event Banner/Stage */}
              <div className="mb-6">
                <div className="relative h-32 overflow-hidden rounded-lg mb-2">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform scale-105"
                    style={{
                      backgroundImage: `url('${getEventBannerImage(event.id)}')`,
                      animation: 'zoomInOut 8s ease-in-out infinite'
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h2 className="text-2xl font-bold font-chonburi mb-1">{event.name}</h2>
                      <p className="text-sm font-domine opacity-90">🎭 STAGE 🎭</p>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center font-domine mb-4">
                  All seats face this direction
                </div>
              </div>

              {/* Cinema-style Seating Layout */}
              <div className="space-y-2 mb-8">
                {Object.keys(seatsByRow).sort((a, b) => Number(a) - Number(b)).map(rowNumber => {
                  const row = seatsByRow[rowNumber];
                  const isVipRow = row[0]?.type === 'vip';
                  
                  return (
                    <div key={rowNumber} className="flex items-center justify-center gap-1">
                      {/* Row Label */}
                      <div className="w-8 text-center text-sm font-medium text-gray-600 font-domine">
                        {String.fromCharCode(64 + Number(rowNumber))}
                      </div>
                      
                      {/* Seats in Row */}
                      <div className="flex gap-1">
                        {row.map((seat, index) => {
                          const isSelected = selectedSeats[seat.type]?.includes(seat.id);
                          const isSold = seat.status === 'sold';
                          
                          return (
                            <button
                              key={seat.id}
                              onClick={() => toggleSeat(seat)}
                              disabled={isSold}
                              className={`w-8 h-8 rounded-t-lg text-xs font-medium font-domine transition-all relative ${
                                isSold
                                  ? 'bg-red-500 text-white cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-green-500 text-white shadow-lg transform scale-110'
                                  : isVipRow
                                  ? 'bg-yellow-200 text-[#D84040] border border-yellow-400 hover:bg-yellow-300'
                                  : 'bg-gray-200 text-[#D84040] border border-gray-400 hover:bg-gray-300'
                              }`}
                              title={`${seat.number} - ${seat.type.toUpperCase()} - $${seat.price} ${isSold ? '(SOLD)' : ''}`}
                            >
                              {seat.seat}
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* Row Label (Right) */}
                      <div className="w-8 text-center text-sm font-medium text-gray-600 font-domine">
                        {String.fromCharCode(64 + Number(rowNumber))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pricing Info */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded-t-lg"></div>
                    <span className="font-semibold text-[#D84040] font-domine">VIP Section</span>
                  </div>
                  <p className="text-sm text-gray-600 font-domine">
                    Premium location • Enhanced amenities • ${Math.floor(parseFloat(event.price.replace('$', '')) * 1.5)}/seat
                  </p>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-gray-200 border border-gray-400 rounded-t-lg"></div>
                    <span className="font-semibold text-[#D84040] font-domine">Standard Section</span>
                  </div>
                  <p className="text-sm text-gray-600 font-domine">
                    Great views • Standard amenities • ${event.price}/seat
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 border border-gray-400 rounded-t-lg"></div>
                  <span className="text-sm text-gray-600 font-domine">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-t-lg"></div>
                  <span className="text-sm text-gray-600 font-domine">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-t-lg"></div>
                  <span className="text-sm text-gray-600 font-domine">Sold</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded-t-lg"></div>
                  <span className="text-sm text-gray-600 font-domine">VIP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6 h-fit">
            <h2 className="text-2xl font-bold text-[#A31D1D] font-chonburi mb-4">Order Summary</h2>
            
            {/* Ticket Limit Indicator */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-blue-800 font-domine">Ticket Limit</span>
                <span className="text-sm font-bold text-blue-800 font-domine">
                  {getTotalSelectedSeats()}/4 selected
                </span>
              </div>
              <p className="text-xs text-blue-600 font-domine mt-1">
                Maximum 4 tickets per wallet address
              </p>
              {getTotalSelectedSeats() >= 4 && (
                <p className="text-xs text-red-600 font-domine mt-1 font-semibold">
                  ⚠️ Limit reached! Deselect seats to choose different ones.
                </p>
              )}
            </div>
            
            <div className="space-y-4 mb-6">
              {selectedSeats.vip.length > 0 && (
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold font-domine">VIP Seats ({selectedSeats.vip.length})</span>
                    <span className="text-lg font-bold text-[#D84040] font-domine">
                      ${(() => {
                        const allSeats = getAllSeats();
                        let total = 0;
                        selectedSeats.vip.forEach(seatId => {
                          const seat = allSeats.find(s => s.id === seatId);
                          if (seat) total += seat.price;
                        });
                        return total.toFixed(2);
                      })()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-domine">
                    ${Math.floor(parseFloat(event.price.replace('$', '')) * 1.5)} × {selectedSeats.vip.length}
                  </p>
                </div>
              )}

              {selectedSeats.normal.length > 0 && (
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold font-domine">Normal Seats ({selectedSeats.normal.length})</span>
                    <span className="text-lg font-bold text-[#D84040] font-domine">
                      ${(() => {
                        const allSeats = getAllSeats();
                        let total = 0;
                        selectedSeats.normal.forEach(seatId => {
                          const seat = allSeats.find(s => s.id === seatId);
                          if (seat) total += seat.price;
                        });
                        return total.toFixed(2);
                      })()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-domine">
                    ${parseFloat(event.price.replace('$', ''))} × {selectedSeats.normal.length}
                  </p>
                </div>
              )}

              {getTotalSelectedSeats() === 0 && (
                <div className="text-center text-gray-500 font-domine py-8">
                  <p>No seats selected</p>
                  <p className="text-sm">Click on seats to select them</p>
                </div>
              )}
            </div>

            {getTotalSelectedSeats() > 0 && (
              <>
                <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold font-domine">Booking Fee (4%)</span>
                    <span className="text-lg font-bold text-[#D84040] font-domine">
                      ${(calculateTotal() * 0.04).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="bg-[#D84040] rounded-lg p-4 text-white mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold font-domine">Total Price</span>
                    <span className="text-2xl font-bold font-domine">
                      ${(calculateTotal() * 1.04).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm opacity-90 font-domine">
                    {getTotalSelectedSeats()} seat{getTotalSelectedSeats() > 1 ? 's' : ''} selected
                  </p>
                </div>
              </>
            )}

            <button 
              onClick={proceedToCheckout}
              disabled={getTotalSelectedSeats() === 0}
              className={`w-full py-4 rounded-full font-bold text-lg font-domine transition-colors ${
                getTotalSelectedSeats() > 0
                  ? 'bg-[#D84040] text-white hover:bg-[#A31D1D]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {getTotalSelectedSeats() > 0 ? 'Proceed to Checkout' : 'Select Seats to Continue'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes zoomInOut {
          0%, 100% {
            transform: scale(1.05);
          }
          50% {
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}