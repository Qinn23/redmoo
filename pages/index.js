import { useState, useEffect } from "react";
import Image from "next/image";
import { Chonburi, Domine } from "next/font/google";
import { useWalletInfo } from "../wallet/useWallet.js";
import { useWalletKit } from '@mysten/wallet-kit';
import WalletConnectModal from "../components/WalletConnectModal.js";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEvents, setShowEvents] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { address, isConnected, signAndExecuteTransactionBlock } = useWalletInfo();
  const { disconnect } = useWalletKit();

  // Update login state when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      setIsLoggedIn(true);
    } else if (!isConnected) {
      setIsLoggedIn(false);
    }
  }, [isConnected, address]);

  // Sample events data
  const sampleEvents = [
    {
      id: 1,
      name: "Taylor Swift - The Eras Tour",
      date: "2025-09-15",
      venue: "MetLife Stadium",
      price: "$150",
      image: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2181107453-20241209114519432.jpg?q=w_3000,c_fill" 
    },
    {
      id: 2,
      name: "Ed Sheeran Live in Concert",
      date: "2025-11-20",
      venue: "Madison Square Garden",
      price: "$120",
      image: "https://www.billboard.com/wp-content/uploads/2023/09/ed-sheeran-wiltern-2023-billboard-1548.jpg?v=2" 
    },
    {
      id: 3,
      name: "NBA Finals Game 7",
      date: "2025-10-15",
      venue: "Chase Center",
      price: "$200",
      image: "https://i.ytimg.com/vi/pX___DCt-6g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAz22YiPPDDDQc0ADmQ6r-oNyz5iQ" 
    },
    {
      id: 4,
      name: "Infinite 15th Anniversary Concert",
      date: "2025-08-25",
      venue: "Mega Star Arena KL",
      price: "$80",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhsyC2agb1zZw6MVnRCLoS4iN6wlNWcfE0WUXFgW-U8IUttGujWsixC4Tw2YRJ9OyV4JxWMnmiBcmf5IfkCnsVqCTps7jkj2KxH0zgk6bDXPOhBj0-ztrQMmXPg8TDAkRTlWvGwXggsaSiDgXpfykA1smOhBOhRa6UeVMO9xKj9gFd13pHIoE5os2xxYfn0/w640-h250/Infinite%20KL2025%20-%20Banner.jpg" 
    }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowEvents(e.target.value.length > 0);
  };

  const handleConnectWallet = () => {
    setShowWalletModal(true);
  };

  const handleWalletConnect = (account) => {
    setIsLoggedIn(true);
    setShowWalletModal(false);
  };

  const handleCloseModal = () => {
    setShowWalletModal(false);
  };

  return (
    <div className={`${chonburi.variable} ${domine.variable} min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF]`}>
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-[#D84040] animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#D84040] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl font-chonburi">R</span>
              </div>
              <span className="text-2xl font-bold text-[#D84040] font-chonburi">RedMoo</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-[#D84040] font-medium transition-all duration-200 font-domine hover:scale-110 transform">
                Home
              </button>
              <button className="text-gray-700 hover:text-[#D84040] font-medium transition-all duration-200 font-domine hover:scale-110 transform">
                Buy
              </button>
              <button className="text-gray-700 hover:text-[#D84040] font-medium transition-all duration-200 font-domine hover:scale-110 transform">
                Sell
              </button>
              {isLoggedIn && (
                <button className="text-gray-700 hover:text-[#D84040] font-medium transition-all duration-200 font-domine hover:scale-110 transform">
                  My Tickets
                </button>
              )}
              {!isLoggedIn ? (
                <button 
                  onClick={handleConnectWallet}
                  className="bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] transition-all duration-200 font-medium font-domine hover:scale-110 transform hover:shadow-lg"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 font-domine">
                    {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
                  </span>
                  <button 
                    onClick={() => {
                      disconnect();
                    }}
                    className="text-gray-700 hover:text-[#D84040] font-medium transition-all duration-200 font-domine hover:scale-110 transform"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Wallet Connection Modal */}
      <WalletConnectModal 
        isOpen={showWalletModal}
        onClose={handleCloseModal}
        onConnect={handleWalletConnect}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        <div className="max-w-4xl mx-auto"> {/* Changed from max-w-2xl to max-w-4xl */}
          <input
            type="text"
            placeholder="Search for your favourite event."
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
                      onClick={() => window.location.href = `/event/${event.id}`}
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-[#D84040] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm font-chonburi">R</span>
                </div>
                <span className="text-xl font-bold font-chonburi">RedMoo</span>
              </div>
              <p className="text-gray-300 mb-4 font-domine">
                Your trusted platform for secure ticket reselling with blockchain technology.
              </p>
              <p className="text-sm text-gray-400 font-domine">
                © 2025 RedMoo. All rights reserved.
              </p>
            </div>

            {/* Partners */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-domine">Our Partners</h3>
              <ul className="space-y-2 text-gray-300 font-domine">
                <li>Event Organizers</li>
                <li>Blockchain Partners</li>
                <li>Payment Processors</li>
                <li>Security Providers</li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-domine">About Us</h3>
              <ul className="space-y-2 text-gray-300 font-domine">
                <li>Our Mission</li>
                <li>Team</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 font-domine">Contact Us</h3>
              <ul className="space-y-2 text-gray-300 font-domine">
                <li>Support</li>
                <li>Sales</li>
                <li>Partnerships</li>
                <li>Legal</li>
              </ul>
            </div>
          </div>
        </div>
             </footer>

       <style jsx>{`
         @keyframes fadeIn {
           from {
             opacity: 0;
           }
           to {
             opacity: 1;
           }
         }

         @keyframes fadeInUp {
           from {
             opacity: 0;
             transform: translateY(30px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }

         .animate-fade-in {
           animation: fadeIn 0.8s ease-out;
         }

         .animate-fade-in-up {
           animation: fadeInUp 0.8s ease-out forwards;
           opacity: 0;
         }
       `}</style>
     </div>
   );
 }
