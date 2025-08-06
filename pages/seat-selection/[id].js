import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { Chonburi, Domine } from "next/font/google";
import { useWallet } from '@suiet/wallet-kit';

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

// Success Modal Component
function PurchaseSuccessModal({ isOpen, onClose, details }) {
  if (!isOpen || !details) return null;

  const handleRedirect = () => {
    onClose();
    // Redirect to profile after 1 second
    setTimeout(() => {
      window.location.href = '/profile?purchase=success';
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl transform">
        {/* Header with celebration */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center">
          <div className="text-4xl mb-2">🎉</div>
          <h2 className="text-2xl font-bold font-chonburi">Purchase Successful!</h2>
          <p className="text-sm opacity-90 font-domine mt-1">NFT tickets acquired</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800 font-domine">
                  {details.ticketCount} NFT ticket{details.ticketCount > 1 ? 's' : ''} purchased
                </p>
                <p className="text-sm text-gray-600 font-domine">Simulated transaction</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800 font-domine">
                  Seat{details.ticketCount > 1 ? 's' : ''}: {details.seats}
                </p>
                <p className="text-sm text-gray-600 font-domine">{details.eventName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800 font-domine">
                  Demo amount: {details.total} SUI
                </p>
                <p className="text-sm text-gray-600 font-domine">Not charged (simulation)</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-domine"
            >
              Stay Here
            </button>
            <button
              onClick={handleRedirect}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-[#D84040] to-[#A31D1D] text-white rounded-lg hover:from-[#A31D1D] hover:to-[#8B1919] transition-all duration-300 font-domine"
            >
              View My Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SeatSelection() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState({
    vip: [],
    normal: []
  });

  // Wallet integration with Suiet wallet-kit
  const wallet = useWallet();
  const { connected, account } = wallet;
  const { balance } = wallet;
  
  // Derived wallet state
  const isConnected = connected;
  const walletAddress = account?.address;

  // Transaction state
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [availableTickets, setAvailableTickets] = useState(0);
  
  // Utility functions for wallet
  const getFormattedBalance = useCallback(() => {
    if (!balance) return '0 SUI';
    return `${(Number(balance) / 1000000000).toFixed(4)} SUI`;
  }, [balance]);
  
  const hasSufficientBalance = useCallback((amount) => {
    if (!balance) return false;
    return Number(balance) >= Number(amount) * 1000000000; // Convert SUI to MIST
  }, [balance]);
  
  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState(null);
  
  // Demo contract addresses (these would be deployed addresses in production)
  // TODO: Replace these with actual deployed contract addresses when smart contract is live
  const DEMO_PACKAGE_ID = "0x1"; // Replace with actual deployed package ID
  const DEMO_EVENT_OBJECT_ID = "0x2"; // Replace with actual event object ID
  const DEMO_WALLET_TRACKER_ID = "0x3"; // Replace with actual wallet tracker ID
  const DEMO_CLOCK_OBJECT_ID = "0x6"; // Sui clock object

  /*
   * DEPLOYMENT CHECKLIST:
   * 1. Deploy the smart contract to Sui devnet/mainnet
   * 2. Replace demo object IDs above with actual deployed addresses
   * 3. Uncomment the real transaction code in proceedToCheckout()
   * 4. Remove the demo simulation logic
   * 5. Update the demo mode notices in the UI
   */

  useEffect(() => {
    if (id) {
      const foundEvent = sampleEvents.find(e => e.id === parseInt(id));
      setEvent(foundEvent);
    }
  }, [id]);

  // Function to calculate available tickets based on purchases
  const calculateAvailableTickets = useCallback(() => {
    if (!event) return 0;
    
    try {
      const demoPurchases = JSON.parse(localStorage.getItem('demo_purchases') || '[]');
      const eventPurchases = demoPurchases.filter(purchase => 
        purchase.eventId === parseInt(id) || purchase.eventName === event.name
      );
      
      // Count total purchased tickets for this event
      let totalPurchased = 0;
      eventPurchases.forEach(purchase => {
        totalPurchased += purchase.seats.length;
      });
      
      const available = Math.max(0, event.availableTickets - totalPurchased);
      
      console.log(`🎫 Seat Selection - Event "${event.name}" ticket calculation:`, {
        originalAvailable: event.availableTickets,
        totalPurchased: totalPurchased,
        currentAvailable: available
      });
      
      return available;
    } catch (error) {
      console.error('Error calculating available tickets:', error);
      return event.availableTickets; // Fallback to original count
    }
  }, [event, id]);

  // Update available tickets when event changes or purchases are made
  useEffect(() => {
    if (event) {
      const available = calculateAvailableTickets();
      setAvailableTickets(available);
    }
  }, [event, calculateAvailableTickets]);

  // State for triggering seat refresh when purchases are cleared
  const [seatRefreshKey, setSeatRefreshKey] = useState(0);

  // Listen for storage changes to refresh seats when purchases are cleared
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'demo_purchases' || e.type === 'storage') {
        console.log('🔄 Purchases changed, refreshing seats and ticket count...');
        setSeatRefreshKey(prev => prev + 1);
        // Also update available tickets count
        if (event) {
          const available = calculateAvailableTickets();
          setAvailableTickets(available);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [event, calculateAvailableTickets]);

  // Generate seats based on total tickets with realistic layout
  // This hook must be called before any conditional returns
  const seatsByRow = useMemo(() => {
    if (!event) return {};
    
    // Limit total seats to prevent UI freezing (max 200 seats for demo)
    const maxDisplaySeats = 200;
    const actualTotalSeats = event.totalTickets;
    const totalSeats = Math.min(actualTotalSeats, maxDisplaySeats);
    
    // Scale available seats proportionally  
    const dynamicAvailableTickets = availableTickets > 0 ? availableTickets : event.availableTickets;
    const availableSeats = Math.floor((dynamicAvailableTickets / actualTotalSeats) * totalSeats);
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
    
    // Check for purchased seats from demo purchases and mark them as sold
    try {
      const demoPurchases = JSON.parse(localStorage.getItem('demo_purchases') || '[]');
      const eventPurchases = demoPurchases.filter(purchase => 
        purchase.eventId === parseInt(id) || purchase.eventName === event.name
      );
      
      console.log('🎫 Found purchases for this event:', eventPurchases.length);
      
      // Mark purchased seats as sold
      eventPurchases.forEach(purchase => {
        purchase.seats.forEach(purchasedSeat => {
          // Find the seat by its seat number (e.g., "A1", "B5")
          const seatToMark = seats.find(seat => seat.number === purchasedSeat.seatId);
          if (seatToMark) {
            seatToMark.status = 'sold';
            console.log(`🔒 Marked seat ${purchasedSeat.seatId} as sold`);
          }
        });
      });
    } catch (error) {
      console.error('❌ Error checking purchased seats:', error);
    }
    
    // Group seats by row for easier rendering
    const groupedSeats = {};
    seats.forEach(seat => {
      if (!groupedSeats[seat.row]) {
        groupedSeats[seat.row] = [];
      }
      groupedSeats[seat.row].push(seat);
    });
    
    return groupedSeats;
  }, [event, id, seatRefreshKey, availableTickets]);

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
      // Show visual feedback when limit is reached
      setTransactionStatus(`⚠️ Maximum ${TICKET_LIMIT} tickets per wallet address`);
      setTimeout(() => setTransactionStatus(null), 3000);
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

  const proceedToCheckout = async () => {
    if (getTotalSelectedSeats() === 0) {
      setTransactionStatus('⚠️ Please select at least one seat');
      setTimeout(() => setTransactionStatus(null), 3000);
      return;
    }

    if (!isConnected) {
      setTransactionStatus('⚠️ Please connect your wallet first');
      setTimeout(() => {
        setTransactionStatus(null);
        router.push('/connect-wallet');
      }, 2000);
      return;
    }

    const total = calculateTotal() * 1.04; // Include booking fee
    const totalInMist = contractUtils.suiToMist(total.toString());

    // Check if user has sufficient balance
    if (!hasSufficientBalance(totalInMist)) {
      setTransactionStatus(`💳 Insufficient balance. You need ${total.toFixed(2)} SUI but only have ${getFormattedBalance()} SUI`);
      setTimeout(() => setTransactionStatus(null), 5000);
      return;
    }

    setIsProcessing(true);
    setTransactionStatus('Preparing demo transaction...');

    try {
      console.log('🎫 Starting demo ticket purchase...');
      console.log('ℹ️ DEMO MODE: This is a simulated purchase. No real blockchain transaction will occur.');
      console.log('💡 Your wallet balance will NOT be affected during this demo.');
      
      // DEMO MODE: Since smart contract isn't deployed, simulate the purchase
      const allSeats = getAllSeats();
      const selectedSeatsList = [
        ...selectedSeats.vip.map(id => allSeats.find(s => s.id === id)).filter(Boolean),
        ...selectedSeats.normal.map(id => allSeats.find(s => s.id === id)).filter(Boolean)
      ];

      console.log('🎯 Selected seats for purchase:', selectedSeatsList);
      console.log('💰 Total amount (demo):', total.toFixed(2), 'SUI');

      // Simulate transaction delay
      setTransactionStatus('Creating NFT tickets...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      setTransactionStatus('Minting on blockchain...');
      await new Promise(resolve => setTimeout(resolve, 1500));

      setTransactionStatus('Finalizing purchase...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: When smart contract is deployed, replace this demo with real transaction
      /*
      // Real transaction code for when contract is deployed:
      const purchasePromises = [];

      for (const seat of selectedSeatsList) {
        const seatPrice = contractUtils.suiToMist((seat.price * 1.04).toString());
        
        const transaction = contractUtils.createPurchaseTransaction({
          eventObjectId: ACTUAL_EVENT_OBJECT_ID,
          walletTrackerObjectId: ACTUAL_WALLET_TRACKER_ID,
          suiAmount: seatPrice,
          seatId: seat.number,
          seatType: seat.type === 'vip' ? 1 : 2,
          imageUrl: generateTicketImageUrl(event, seat),
          metadataUrl: generateTicketMetadataUrl(event, seat),
          clockObjectId: '0x6', // Sui clock object
          packageId: DEPLOYED_PACKAGE_ID
        });

        purchasePromises.push(
          executeTransaction(transaction).then(result => ({
            seat,
            result,
            success: true
          }))
        );
      }

      const results = await Promise.all(purchasePromises);
      const successfulPurchases = results.filter(r => r.success);
      */

      setTransactionStatus('Purchase completed! 🎉');
      
      // Show success modal for demo
      const ticketCount = selectedSeatsList.length;
      const details = {
        ticketCount: ticketCount,
        seats: selectedSeatsList.map(s => s.number).join(', '),
        total: total.toFixed(2),
        eventName: event.name
      };
      
      setPurchaseDetails(details);
      setShowSuccessModal(true);
      
      // Clear processing status
      setTransactionStatus(null);
      
      console.log('✅ Purchase completed successfully!');
      console.log('📊 Summary:', {
        tickets: ticketCount,
        seats: selectedSeatsList.map(s => s.number),
        totalAmount: total.toFixed(2) + ' SUI (demo)',
        event: event.name
      });
      
      // Save purchase to localStorage for demo tracking
      const purchaseData = {
        id: `purchase-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        eventId: event.id,
        eventName: event.name,
        venue: event.venue,
        eventDate: new Date(event.date).getTime(),
        seats: selectedSeatsList.map(seat => ({
          seatId: seat.number,
          seatType: seat.type === 'vip' ? 1 : 2, // 1 = VIP, 2 = Standard
          price: seat.price
        })),
        totalAmount: total,
        purchaseDate: Date.now(),
        walletAddress: currentAccount?.address,
        transactionStatus: 'completed_demo'
      };

      // Get existing purchases and add new one
      const existingPurchases = JSON.parse(localStorage.getItem('demo_purchases') || '[]');
      existingPurchases.push(purchaseData);
      localStorage.setItem('demo_purchases', JSON.stringify(existingPurchases));
      
      console.log('💾 Purchase saved to localStorage:', purchaseData);
      
      // Trigger storage event to refresh seat availability in other tabs/pages
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'demo_purchases',
        oldValue: JSON.stringify(existingPurchases.slice(0, -1)),
        newValue: JSON.stringify(existingPurchases),
        url: window.location.href,
        storageArea: localStorage
      }));
      
      // Clear selections and redirect to profile
      setSelectedSeats({ vip: [], normal: [] });
      
      console.log('🔄 Preparing to redirect to profile page...');
      console.log('💡 Wallet connection status:', isConnected);
      console.log('👤 Current account:', currentAccount?.address);
      
      // Note: Removed automatic redirect - user will choose via modal buttons

    } catch (error) {
      console.error('❌ Demo transaction error:', error);
      setTransactionStatus('❌ Demo purchase failed. Smart contract not yet deployed.');
      
      setTimeout(() => setTransactionStatus(null), 5000);
    } finally {
      setIsProcessing(false);
      setTimeout(() => setTransactionStatus(null), 3000);
    }
  };

  // Helper functions for NFT metadata
  const generateTicketImageUrl = (event, seat) => {
    // In production, this would generate actual ticket images
    return `https://api.placeholder.com/600x400/D84040/FFFFFF?text=${encodeURIComponent(event.name + ' - ' + seat.number)}`;
  };

  const generateTicketMetadataUrl = (event, seat) => {
    // In production, this would point to actual metadata JSON
    const metadata = {
      name: `${event.name} - Seat ${seat.number}`,
      description: `Ticket for ${event.name} at ${event.venue}`,
      image: generateTicketImageUrl(event, seat),
      attributes: [
        { trait_type: "Event", value: event.name },
        { trait_type: "Venue", value: event.venue },
        { trait_type: "Date", value: event.date },
        { trait_type: "Seat", value: seat.number },
        { trait_type: "Type", value: seat.type.toUpperCase() },
        { trait_type: "Price", value: `${seat.price} SUI` }
      ]
    };
    
    // In production, upload this to IPFS or similar
    return `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;
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
              {availableTickets} available out of {event.totalTickets} total seats
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
            
            {/* Wallet Status */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold font-domine">Wallet Status</span>
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
              {isConnected ? (
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 font-domine">
                    Address: {contractUtils.formatAddress(currentAccount?.address)}
                  </p>
                  <p className="text-sm text-gray-600 font-domine">
                    Balance: {getFormattedBalance()} SUI
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-red-600 font-domine">Not connected</p>
                  <button 
                    onClick={() => router.push('/connect-wallet')}
                    className="text-sm bg-[#D84040] text-white px-3 py-1 rounded font-domine hover:bg-[#A31D1D]"
                  >
                    Connect Wallet
                  </button>
                </div>
              )}
              
              {/* Transaction Status */}
              {transactionStatus && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                  <div className="flex items-center">
                    {isProcessing && (
                      <svg className="animate-spin h-4 w-4 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                    )}
                    <span className="text-sm text-blue-800 font-domine">{transactionStatus}</span>
                  </div>
                </div>
              )}
            </div>
            
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
              disabled={getTotalSelectedSeats() === 0 || !isConnected || isProcessing}
              className={`w-full py-4 rounded-full font-bold text-lg font-domine transition-colors flex items-center justify-center ${
                getTotalSelectedSeats() > 0 && isConnected && !isProcessing
                  ? 'bg-[#D84040] text-white hover:bg-[#A31D1D]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isProcessing && (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              )}
              {isProcessing
                ? 'Processing Demo...'
                : !isConnected
                ? 'Connect Wallet to Continue'
                : getTotalSelectedSeats() === 0
                ? 'Select Seats to Continue'
                : 'Purchase'
              }
            </button>
            
            {getTotalSelectedSeats() > 0 && isConnected && (
              <p className="text-xs text-gray-500 text-center mt-2 font-domine">
                🔧 Demo mode: This will simulate a purchase without real blockchain transactions
              </p>
            )}
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
      
      {/* Success Modal */}
      <PurchaseSuccessModal 
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        details={purchaseDetails}
      />
    </div>
  );
}