import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ConnectButton, useCurrentWallet } from '@mysten/dapp-kit';
import { Chonburi, Domine } from "next/font/google";
import QRCode from 'react-qr-code';

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

// NFT Ticket Card Component
function TicketCard({ ticket, onViewDetails }) {
  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="relative h-36 bg-gradient-to-r from-[#D84040] to-[#A31D1D]">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute inset-0 flex items-center justify-center px-4 pt-10">
          <div className="text-center text-white">
            <h3 className="text-xl font-bold font-chonburi mb-1 drop-shadow-lg">{ticket.eventName}</h3>
            <p className="text-sm opacity-95 font-domine drop-shadow">🎫 NFT TICKET 🎫</p>
          </div>
        </div>
        <div className={`absolute top-1 right-1 rounded-lg px-3 py-1.5 shadow-lg ${
          ticket.seatType === 1 
            ? 'bg-yellow-400 border border-yellow-600' 
            : 'bg-blue-500 border border-blue-700'
        }`}>
          <span className={`text-xs font-bold font-domine ${
            ticket.seatType === 1 
              ? 'text-yellow-900' 
              : 'text-white'
          }`}>
            {ticket.seatType === 1 ? 'VIP' : 'STANDARD'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 font-domine">Venue</p>
            <p className="font-semibold text-[#A31D1D] font-domine h-16 flex items-start">{ticket.venue}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-domine">Seat</p>
            <p className="font-semibold text-[#A31D1D] font-domine">{ticket.seatId}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 font-domine">Event Date</p>
            <p className="font-semibold text-[#A31D1D] font-domine">{formatDate(ticket.eventDate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-domine">Price Paid</p>
            <p className="font-semibold text-[#A31D1D] font-domine">{contractUtils.mistToSui(ticket.pricePaid).toFixed(2)} SUI</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-domine">Purchased</p>
            <p className="text-sm font-medium text-gray-700 font-domine">{formatDate(ticket.purchaseDate)}</p>
          </div>
          <div className="ml-6">
            <button 
              onClick={() => onViewDetails(ticket)}
              className="bg-gradient-to-r from-[#D84040] to-[#A31D1D] text-white px-6 py-2.5 rounded-lg text-sm font-domine hover:from-[#A31D1D] hover:to-[#8B1919] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap"
            >
              Check-In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton component
function TicketSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 animate-pulse">
      <div className="h-32 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="h-3 bg-gray-300 rounded mb-1"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
          <div>
            <div className="h-3 bg-gray-300 rounded mb-1"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate unique QR code data for ticket
function generateTicketQRData(ticket) {
  // Create a unique identifier combining ticket info with random elements
  const randomId = Math.random().toString(36).substring(2, 15);
  const timestamp = Date.now();
  
  const qrData = {
    ticketId: ticket.id,
    eventName: ticket.eventName,
    venue: ticket.venue,
    seat: ticket.seatId,
    eventDate: ticket.eventDate,
    randomId: randomId,
    generatedAt: timestamp,
    verification: `REDMOO-${randomId.toUpperCase()}-${timestamp.toString(36).toUpperCase()}`
  };
  
  return JSON.stringify(qrData);
}

// Ticket Details Modal Component
function TicketDetailsModal({ ticket, isOpen, onClose }) {
  if (!isOpen || !ticket) return null;

  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const qrCodeData = generateTicketQRData(ticket);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#D84040] to-[#A31D1D] p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold font-chonburi">{ticket.eventName}</h2>
              <p className="text-sm opacity-90 font-domine mt-1">🎫 NFT TICKET DETAILS</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* QR Code Section */}
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-[#A31D1D] font-domine mb-4">Your Ticket QR Code</h3>
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
              <QRCode
                value={qrCodeData}
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 200 200`}
              />
            </div>
            <p className="text-sm text-gray-600 font-domine mt-2">
              Present this QR code at the venue for entry
            </p>
          </div>

          {/* Ticket Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 font-domine">Event</p>
                <p className="font-bold text-[#A31D1D] font-domine text-lg">{ticket.eventName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-domine">Venue</p>
                <p className="font-semibold text-[#A31D1D] font-domine">{ticket.venue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-domine">Seat</p>
                <p className="font-semibold text-[#A31D1D] font-domine">{ticket.seatId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-domine">Ticket Type</p>
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  ticket.seatType === 1 
                    ? 'bg-yellow-400 text-yellow-900 border border-yellow-600' 
                    : 'bg-blue-500 text-white border border-blue-700'
                }`}>
                  {ticket.seatType === 1 ? 'VIP' : 'STANDARD'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 font-domine">Event Date</p>
                <p className="font-semibold text-[#A31D1D] font-domine">{formatDate(ticket.eventDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-domine">Event Time</p>
                <p className="font-semibold text-[#A31D1D] font-domine">{formatTime(ticket.eventDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-domine">Price Paid</p>
                <p className="font-semibold text-[#A31D1D] font-domine">{contractUtils.mistToSui(ticket.pricePaid).toFixed(2)} SUI</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-domine">Purchase Date</p>
                <p className="font-semibold text-[#A31D1D] font-domine">{formatDate(ticket.purchaseDate)}</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-[#F8F2DE] rounded-lg p-4 border border-[#D84040]">
            <h4 className="font-bold text-[#A31D1D] font-domine mb-2">Important Information</h4>
            <ul className="text-sm text-[#A31D1D] font-domine space-y-1">
              <li>• Please arrive at least 30 minutes before the event</li>
              <li>• Present this QR code at the entrance for verification</li>
              <li>• This is a blockchain NFT ticket - transferable and tradeable</li>
              <li>• Keep your QR code secure and don't share it publicly</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#D84040] text-white rounded hover:bg-[#A31D1D] transition-colors font-domine"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const sectionContent = (active, handleLogout, handleSwitchAccount, walletInfo, tickets, loadingTickets, showPurchaseSuccess, clearDemoPurchases, onViewDetails) => {
  if (active === "mytickets") {
    return (
      <div className="space-y-6">
        {/* Purchase Success Banner */}
        {showPurchaseSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="font-semibold text-green-800 font-domine">🎉 Purchase Successful!</span>
            </div>
            <p className="text-green-700 text-sm font-domine mt-1">
              Your demo NFT tickets have been added to your collection. In production, these would be real blockchain NFTs!
            </p>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#A31D1D] font-chonburi">My NFT Tickets</h2>
          <div className="text-sm text-gray-600 font-domine">
            {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} owned
          </div>
        </div>

        {loadingTickets ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <TicketSkeleton key={i} />
            ))}
          </div>
        ) : tickets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, index) => (
              <TicketCard key={`${ticket.id}-${index}`} ticket={ticket} onViewDetails={onViewDetails} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-bold text-[#A31D1D] font-chonburi mb-2">No Tickets Yet</h3>
            <p className="text-gray-600 font-domine mb-6">
              Purchase tickets from events to see your NFT tickets here.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-[#D84040] text-white px-6 py-3 rounded-full hover:bg-[#A31D1D] transition-colors font-medium font-domine"
            >
              Browse Events
            </button>
          </div>
        )}
      </div>
    );
  }
  
  if (active === "info") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#A31D1D] font-chonburi">Wallet Information</h2>
        
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Wallet Address</label>
            <div className="bg-white rounded-lg p-3 border border-gray-200 font-mono text-sm break-all">
              {walletInfo.address || 'Not connected'}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Balance</label>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <span className="text-lg font-bold text-[#D84040] font-domine">
                  {(parseInt(walletBalance) / 1000000000).toFixed(2)} SUI
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 font-domine mb-2">Network</label>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className="font-domine">Sui Devnet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (active === "settings") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#A31D1D] font-chonburi">Settings</h2>
        
        <div className="space-y-4">
          <button
            className="w-full bg-[#F8F2DE] text-[#A31D1D] px-6 py-4 rounded-lg font-domine font-medium hover:bg-[#ECDCBF] transition-all text-left border border-[#A31D1D]"
            onClick={handleSwitchAccount}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Switch Account</div>
                <div className="text-sm opacity-75">Connect a different wallet</div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button
            className="w-full bg-red-50 text-red-700 px-6 py-4 rounded-lg font-domine font-medium hover:bg-red-100 transition-all text-left border border-red-200"
            onClick={handleLogout}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Disconnect Wallet</div>
                <div className="text-sm opacity-75">Sign out and return to homepage</div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
          </button>

          <button
            className="w-full bg-blue-50 text-blue-700 px-6 py-4 rounded-lg font-domine font-medium hover:bg-blue-100 transition-all text-left border border-blue-200"
            onClick={clearDemoPurchases}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Clear Demo Purchases</div>
                <div className="text-sm opacity-75">Reset all demo ticket purchases for testing</div>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    );
  }
  
  return null;
};

export default function Profile() {

  const router = useRouter();
  const [active, setActive] = useState("mytickets");
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  const [walletLoading, setWalletLoading] = useState(true);
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);

  const { wallet: currentWallet } = useCurrentWallet();
  const isConnected = !!currentWallet;
  const currentAccount = currentWallet?.account;
  const [walletBalance, setWalletBalance] = useState('0');

  // Fetch balance when wallet is connected
  useEffect(() => {
    if (currentWallet?.getBalance) {
      currentWallet.getBalance().then(balance => {
        setWalletBalance(balance.toString());
      }).catch(console.error);
    }
  }, [currentWallet]);

  // Give wallet state time to initialize before checking connection
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('🔄 Wallet loading completed. Connection status:', isConnected);
      setWalletLoading(false);
    }, 1000); // Give 1 second for wallet state to load

    return () => clearTimeout(timer);
  }, [isConnected]);

  // Check if user came from a successful purchase
  useEffect(() => {
    if (router.query.purchase === 'success') {
      setShowPurchaseSuccess(true);
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowPurchaseSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [router.query]);

  if (!walletLoading && !isConnected) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className={`${chonburi.variable} font-chonburi text-2xl mb-4 text-[#D84040]`}>
              Connect Your Wallet
            </h1>
            <p className={`${domine.variable} font-domine text-gray-600 mb-6`}>
              Please connect your Sui wallet to view your profile and tickets
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Continue with authenticated view
  useEffect(() => {
    if (!walletLoading && !isConnected) {
      console.log('🔄 Wallet not connected, redirecting to connect page...');
      router.replace('/connect-wallet');
    }
  }, [isConnected, router, walletLoading]);

  // Fetch NFT tickets
  useEffect(() => {
    const fetchTickets = async () => {
      if (!currentAccount || !currentAccount.address) {
        console.log('⚠️ No current account or address available');
        setLoadingTickets(false);
        return;
      }
      
      setLoadingTickets(true);
      try {
        console.log('🎫 Fetching tickets for address:', currentAccount.address);
        
        // Validate that we have a proper address
        if (!currentAccount.address.startsWith('0x')) {
          throw new Error('Invalid wallet address format');
        }
        
        // Validate that suiClient is available
        if (!suiClient) {
          throw new Error('Sui client not available');
        }
        
        // Since the smart contract isn't deployed yet, we'll skip the actual query
        // and use mock data for demonstration purposes
        
        // TODO: Uncomment this when smart contract is deployed
        /*
        const ownedObjects = await suiClient.getOwnedObjects({
          owner: currentAccount.address,
          filter: {
            StructType: `${PACKAGE_ID}::ticket_nft::TicketNFT`
          },
          options: {
            showContent: true,
            showType: true,
          }
        });
        */

        // Read actual purchases from localStorage
        const purchasedTickets = [];
        const userBalance = parseInt(walletBalance || '0');
        
        console.log('💰 User balance:', userBalance, 'MIST');
        
        try {
          // Get user's actual purchases from localStorage
          const demoPurchases = JSON.parse(localStorage.getItem('demo_purchases') || '[]');
          console.log('📦 Raw purchases from localStorage:', demoPurchases);
          
          // Filter purchases for current wallet address
          const userPurchases = demoPurchases.filter(purchase => 
            purchase.walletAddress === currentAccount.address
          );
          
          console.log('👤 Purchases for current wallet:', userPurchases);
          
          // Convert purchases to ticket format
          userPurchases.forEach(purchase => {
            purchase.seats.forEach((seat, index) => {
              purchasedTickets.push({
                id: `${purchase.id}-seat-${index}`,
                eventName: purchase.eventName,
                venue: purchase.venue,
                seatId: seat.seatId,
                seatType: seat.seatType, // 1 = VIP, 2 = Standard
                eventDate: purchase.eventDate,
                pricePaid: (seat.price * 1000000000).toString(), // Convert SUI to MIST
                purchaseDate: purchase.purchaseDate,
                purchaseId: purchase.id
              });
            });
          });
          
          // If no actual purchases exist, show some demo tickets for testing
          if (purchasedTickets.length === 0 && userBalance >= 0) {
            console.log('🎪 No purchases found, showing demo tickets for testing');
            purchasedTickets.push({
              id: "demo-ticket-fallback",
              eventName: "Welcome to RedMoo!",
              venue: "Demo Venue",
              seatId: "DEMO",
              seatType: 2, // Standard
              eventDate: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days from now
              pricePaid: "0", // Free demo ticket
              purchaseDate: Date.now(),
              isDemoFallback: true
            });
          }
          
        } catch (error) {
          console.error('❌ Error reading purchases from localStorage:', error);
          // Fallback to empty array
        }

        console.log('🎫 Final tickets to display:', purchasedTickets.length, purchasedTickets);
        setTickets(purchasedTickets);
      } catch (error) {
        console.error("❌ Error fetching tickets:", error);
        console.error("Error details:", {
          message: error.message,
          currentAccount: currentAccount,
          balance: walletBalance,
          isConnected: isConnected
        });
        // Set empty tickets array on error
        setTickets([]);
      } finally {
        setLoadingTickets(false);
      }
    };

    if (isConnected && currentAccount && suiClient) {
      fetchTickets();
    }
  }, [currentAccount, isConnected, walletBalance]);

  const handleLogout = async () => {
    await disconnect();
    router.push("/");
  };

  const handleSwitchAccount = () => {
    router.push("/connect-wallet");
  };

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleCloseModal = () => {
    setShowTicketModal(false);
    setSelectedTicket(null);
  };



  // Debug function to clear demo purchases
  const clearDemoPurchases = () => {
    localStorage.removeItem('demo_purchases');
    console.log('🗑️ Cleared all demo purchases');
    
    // Trigger storage event for other tabs/pages to refresh
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'demo_purchases',
      oldValue: localStorage.getItem('demo_purchases'),
      newValue: null,
      url: window.location.href,
      storageArea: localStorage
    }));
    
    alert('Demo purchases cleared! Seat availability has been reset.');
    window.location.reload();
  };

  const walletInfo = {
    address: currentAccount?.address,
    formattedBalance: getFormattedBalance(),
  };

  // Show loading screen while wallet state is initializing
  if (walletLoading) {
    return (
      <div className={`${chonburi.variable} ${domine.variable} min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <h1 className="text-2xl font-bold text-[#A31D1D] font-chonburi mb-2">Loading Profile...</h1>
          <p className="text-gray-600 font-domine">Please wait while we load your wallet information.</p>
          <div className="mt-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#D84040]"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show connecting screen if wallet state loaded but not connected
  if (!isConnected) {
    return (
      <div className={`${chonburi.variable} ${domine.variable} min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔗</div>
          <h1 className="text-2xl font-bold text-[#A31D1D] font-chonburi mb-2">Connecting...</h1>
          <p className="text-gray-600 font-domine">Redirecting to wallet connection page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${chonburi.variable} ${domine.variable} min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px] border border-[#F8F2DE]">
          {/* Left column: navigation */}
          <div className="bg-gradient-to-b from-[#F8F2DE] to-white p-8 lg:p-12 flex flex-row lg:flex-col gap-4 lg:w-72 border-b lg:border-b-0 lg:border-r border-[#F8F2DE]">
            <button
              className={`text-left px-4 py-3 rounded-lg font-domine font-medium transition-all ${
                active === "mytickets" ? "bg-[#D84040] text-white shadow" : "text-[#A31D1D] hover:bg-[#F8F2DE]"
              }`}
              onClick={() => setActive("mytickets")}
            >
              <div className="flex items-center">
                <span className="mr-2">🎫</span>
                My Tickets
              </div>
            </button>
            <button
              className={`text-left px-4 py-3 rounded-lg font-domine font-medium transition-all ${
                active === "info" ? "bg-[#D84040] text-white shadow" : "text-[#A31D1D] hover:bg-[#F8F2DE]"
              }`}
              onClick={() => setActive("info")}
            >
              <div className="flex items-center">
                <span className="mr-2">💼</span>
                Wallet Info
              </div>
            </button>
            <button
              className={`text-left px-4 py-3 rounded-lg font-domine font-medium transition-all ${
                active === "settings" ? "bg-[#D84040] text-white shadow" : "text-[#A31D1D] hover:bg-[#F8F2DE]"
              }`}
              onClick={() => setActive("settings")}
            >
              <div className="flex items-center">
                <span className="mr-2">⚙️</span>
                Settings
              </div>
            </button>
          </div>

          {/* Right column: content */}
          <div className="flex-1 p-8 lg:p-16 bg-white">
            {sectionContent(
              active,
              handleLogout,
              handleSwitchAccount,
              walletInfo,
              tickets,
              loadingTickets,
              showPurchaseSuccess,
              clearDemoPurchases,
              handleViewDetails
            )}
          </div>
        </div>
      </div>
      
      {/* Ticket Details Modal */}
      <TicketDetailsModal 
        ticket={selectedTicket}
        isOpen={showTicketModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}