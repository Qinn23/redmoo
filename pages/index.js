import { useState } from "react";
import { useRouter } from "next/router";
import { Chonburi, Domine } from "next/font/google";

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

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showEvents, setShowEvents] = useState(false);

  // Sample events data
  const sampleEvents = [
    {
      id: 1,
      name: "Taylor Swift - The Eras Tour",
      date: "2024-12-15",
      venue: "MetLife Stadium",
      price: "$150",
      image: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2181107453-20241209114519432.jpg?q=w_3000,c_fill" 
    },
    {
      id: 2,
      name: "Ed Sheeran Live in Concert",
      date: "2024-11-20",
      venue: "Madison Square Garden",
      price: "$120",
      image: "https://www.billboard.com/wp-content/uploads/2023/09/ed-sheeran-wiltern-2023-billboard-1548.jpg?v=2" 
    },
    {
      id: 3,
      name: "NBA Finals Game 7",
      date: "2024-06-15",
      venue: "Chase Center",
      price: "$200",
      image: "https://i.ytimg.com/vi/pX___DCt-6g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAz22YiPPDDDQc0ADmQ6r-oNyz5iQ" 
    },
    {
      id: 4,
      name: "Comic Con 2024",
      date: "2024-07-25",
      venue: "Convention Center",
      price: "$80",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhsyC2agb1zZw6MVnRCLoS4iN6wlNWcfE0WUXFgW-U8IUttGujWsixC4Tw2YRJ9OyV4JxWMnmiBcmf5IfkCnsVqCTps7jkj2KxH0zgk6bDXPOhBj0-ztrQMmXPg8TDAkRTlWvGwXggsaSiDgXpfykA1smOhBOhRa6UeVMO9xKj9gFd13pHIoE5os2xxYfn0/w640-h250/Infinite%20KL2025%20-%20Banner.jpg" 
    }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowEvents(e.target.value.length > 0);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold text-[#A31D1D] mb-6 font-chonburi">
          Buy your ticket<span className="text-[#D84040]"> Now</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto font-domine">
          Buy and sell verified tickets here. No scams, No PDFs, just you and your wallet.
        </p>
      </div>

      {/* Search Bar - Moved below subtitle */}
      <div className="text-center mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        <div className="max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search for your favourite event..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-6 py-4 rounded-full bg-white text-[#D84040] font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040] focus:ring-opacity-50 placeholder-[#A31D1D] shadow-lg border-2 border-[#D84040]"
          />
        </div>
      </div>

      {/* Events Display Section - Moved below search bar */}
      {showEvents && (
        <div className="mb-16 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-3xl font-bold text-center text-[#A31D1D] mb-8 font-chonburi">
            Available Events
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleEvents.map((event, index) => (
              <div 
                key={event.id} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up flex flex-col h-full transform hover:-translate-y-1"
                style={{animationDelay: `${0.3 + index * 0.1}s`}}
              >
                <div className="mb-4 text-center flex-shrink-0">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-32 object-cover rounded-lg shadow-sm"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-domine line-clamp-2">{event.name}</h3>
                  <div className="space-y-1 mb-4">
                    <p className="text-gray-600 text-sm font-domine flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#D84040]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.venue}
                    </p>
                    <p className="text-gray-600 text-sm font-domine flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#D84040]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <span className="text-[#D84040] font-bold text-lg font-domine">{event.price}</span>
                  <button 
                    onClick={() => router.push(`/event/${event.id}`)}
                    className="bg-[#D84040] text-white px-4 py-2 rounded-full hover:bg-[#A31D1D] transition-colors font-medium text-sm font-domine"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md text-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="w-16 h-16 bg-[#ECDCBF] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#D84040]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 font-domine">Secure Transactions</h3>
          <p className="text-gray-600 font-domine">All transactions are secured with blockchain technology and zkLogin authentication.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="w-16 h-16 bg-[#ECDCBF] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#D84040]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 font-domine">Fair Pricing</h3>
          <p className="text-gray-600 font-domine">Tickets can only be sold at original prices. No price gouging allowed.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="w-16 h-16 bg-[#ECDCBF] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#D84040]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 font-domine">Gift Tickets</h3>
          <p className="text-gray-600 font-domine">Send tickets as gifts to friends and family with just a few clicks.</p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-16 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
        <h2 className="text-3xl font-bold text-center text-[#A31D1D] mb-8 font-chonburi">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#D84040] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg font-domine">1</div>
            <h3 className="font-semibold text-gray-800 mb-2 font-domine">Sign Up</h3>
            <p className="text-gray-600 text-sm font-domine">Create your account with zkLogin for seamless authentication</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#D84040] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg font-domine">2</div>
            <h3 className="font-semibold text-gray-800 mb-2 font-domine">Browse Tickets</h3>
            <p className="text-gray-600 text-sm font-domine">Find the tickets you want from our secure marketplace</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#D84040] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg font-domine">3</div>
            <h3 className="font-semibold text-gray-800 mb-2 font-domine">Purchase</h3>
            <p className="text-gray-600 text-sm font-domine">Buy tickets with your Sui wallet, up to 4 tickets per wallet</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#D84040] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg font-domine">4</div>
            <h3 className="font-semibold text-gray-800 mb-2 font-domine">Enjoy</h3>
            <p className="text-gray-600 text-sm font-domine">Receive your NFT ticket and enjoy your event!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
