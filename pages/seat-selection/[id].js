import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { Chonburi, Domine } from "next/font/google";
import { useWallet, useAccountBalance } from '@suiet/wallet-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SuiClient } from '@mysten/sui.js/client';
import { suiToMist } from '../../utils/contract-interactions';
import { TX_CONFIG, TICKET_PRICES } from '../../utils/contract-config';

// Function to add cache-busting parameter to image URLs
const addCacheBuster = (url) => {
  const separator = url.includes('?') ? '&' : '?';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  return `${url}${separator}v=${timestamp}&r=${random}`;
};

// Function removed - now using dynamic events with their own images

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
                <p className="text-sm text-gray-600 font-domine">
                  {details.isRealPurchase ? 'Real blockchain NFT transaction' : 'Simulated transaction'}
                </p>
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
                  {details.isRealPurchase ? 'Total paid:' : 'Demo amount:'} {details.total} SUI
                </p>
                <p className="text-sm text-gray-600 font-domine">
                  {details.isRealPurchase ? 'Real SUI payment processed' : 'Not charged (simulation)'}
                </p>
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
  
  // Use the proper useAccountBalance hook from @suiet/wallet-kit
  const { balance: walletBalance, loading: balanceLoading, error: balanceError } = useAccountBalance();

  // Derived wallet state
  const isConnected = connected;
  const walletAddress = account?.address;

  // Transaction state
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [availableTickets, setAvailableTickets] = useState(0);
  const [contractConfig, setContractConfig] = useState(null);

  // Utility functions for wallet
  const getFormattedBalance = useCallback(() => {
    if (!walletBalance || balanceLoading) return '0.00';
    return (Number(walletBalance) / 1e9).toFixed(2);
  }, [walletBalance, balanceLoading]);

  const getShortAddress = useCallback((address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, []);

  const hasSufficientBalance = useCallback((amount) => {
    if (!walletBalance || balanceLoading) return false;
    return Number(walletBalance) >= Number(amount) * 1e9; // Convert SUI to MIST
  }, [walletBalance, balanceLoading]);
  
  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState(null);

  // Load contract configuration dynamically
  useEffect(() => {
    const loadContractConfig = async () => {
      try {
        const response = await fetch('/contract-config.json');
        const config = await response.json();
        setContractConfig(config);
        console.log('✅ Contract config loaded:', config);
      } catch (error) {
        console.error('❌ Failed to load contract config:', error);
      }
    };
    
    loadContractConfig();
  }, []);

  useEffect(() => {
    if (id) {
      // Load dynamic events from localStorage
      try {
        const dynamicEvents = JSON.parse(localStorage.getItem('dynamic_events') || '{}');
        const dynamicEvent = dynamicEvents[parseInt(id)];
        
        if (dynamicEvent) {
          // Convert dynamic event to the format expected by the UI
          const foundEvent = {
            id: parseInt(id),
            name: dynamicEvent.name,
            description: dynamicEvent.description,
            venue: dynamicEvent.venue,
            address: dynamicEvent.address,
            date: new Date(dynamicEvent.eventDate).toISOString().split('T')[0], // YYYY-MM-DD format
            time: dynamicEvent.time,
            closingTime: dynamicEvent.closingTime,
            price: `$${dynamicEvent.normalPrice}`, // Format as string for compatibility
            category: dynamicEvent.category,
            language: dynamicEvent.language,
            ageRating: dynamicEvent.ageRating,
            genres: Array.isArray(dynamicEvent.genres) ? dynamicEvent.genres : [dynamicEvent.genres],
            // Calculate available tickets based on contract values
            availableTickets: dynamicEvent.totalVipSeats + dynamicEvent.totalNormalSeats,
            totalTickets: dynamicEvent.totalVipSeats + dynamicEvent.totalNormalSeats,
            importantNotices: dynamicEvent.importantNotices,
            termsAndConditions: dynamicEvent.termsAndConditions,
            // Use provided image or fallback to a default placeholder
            seatingImage: dynamicEvent.seatingImageUrl || dynamicEvent.imageUrl || '/placeholder-event.jpg',
            // Add contract-specific data
            contractData: {
              objectId: dynamicEvent.objectId,
              vipPrice: dynamicEvent.vipPrice,
              normalPrice: dynamicEvent.normalPrice,
              totalVipSeats: dynamicEvent.totalVipSeats,
              totalNormalSeats: dynamicEvent.totalNormalSeats
            }
          };
          
          console.log('✅ Loaded dynamic event:', foundEvent);
          
          // Update contract config runtime to include this event
          if (contractConfig && !contractConfig.eventObjectIds[parseInt(id)]) {
            contractConfig.eventObjectIds[parseInt(id)] = dynamicEvent.objectId;
          }
          
          setEvent(foundEvent);
          console.log(`🎫 Event loaded: ${foundEvent.name} (ID: ${id})`);
        } else {
          console.log(`❌ Event not found for ID: ${id}`);
        }
      } catch (error) {
        console.error('❌ Error loading dynamic event:', error);
      }
    }
  }, [id, contractConfig]);

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

  // Function to clear purchases for testing (for development only)
  const clearPurchasesForEvent = useCallback(() => {
    if (window.confirm('Clear all purchases for this event? This is for testing only.')) {
      const demoPurchases = JSON.parse(localStorage.getItem('demo_purchases') || '[]');
      const filteredPurchases = demoPurchases.filter(purchase => 
        purchase.eventId !== parseInt(id) && purchase.eventName !== event?.name
      );
      localStorage.setItem('demo_purchases', JSON.stringify(filteredPurchases));
      setSeatRefreshKey(prev => prev + 1);
      
      if (event) {
        const available = event.availableTickets;
        setAvailableTickets(available);
      }
      console.log('🗑️ Cleared purchases for this event');
    }
  }, [id, event]);

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
    
    // Don't pre-mark seats as sold unless they're actually purchased
    // All seats start as available, only mark as sold based on actual purchases
    
    // Get exact VIP and Normal seat counts from event data
    console.log('🔍 DEBUG: Event contractData:', event.contractData);
    console.log('🔍 DEBUG: Raw event data:', event);
    
    const vipSeatsCount = event.contractData?.totalVipSeats || Math.floor(totalSeats * 0.3);
    const normalSeatsCount = event.contractData?.totalNormalSeats || (totalSeats - vipSeatsCount);
    
    console.log('🎫 Seat generation info:', {
      totalSeats,
      vipSeatsCount,
      normalSeatsCount,
      hasContractData: !!event.contractData,
      contractVipSeats: event.contractData?.totalVipSeats,
      contractNormalSeats: event.contractData?.totalNormalSeats,
      vipPrice: event.contractData?.vipPrice,
      normalPrice: event.contractData?.normalPrice
    });
    
    // FLEXIBLE SEATING SYSTEM: 8 seats per row, VIP in front, Normal in back
    const SEATS_PER_ROW = 8;
    
    const seats = [];
    let vipSeatsCreated = 0;
    let normalSeatsCreated = 0;
    
    console.log(`🏟️ Creating seating layout: ${vipSeatsCount} VIP + ${normalSeatsCount} Normal (${SEATS_PER_ROW} seats per row)`);
    
    // === STEP 1: CREATE ALL VIP SEATS FIRST (FRONT ROWS) ===
    let currentRow = 1;
    let seatsInCurrentRow = 0;
    
    console.log(`🟨 === VIP SECTION (${vipSeatsCount} seats) ===`);
    for (let i = 0; i < vipSeatsCount; i++) {
      // Move to next row if current row is full
      if (seatsInCurrentRow >= SEATS_PER_ROW) {
        currentRow++;
        seatsInCurrentRow = 0;
      }
      
      const seatInRow = seatsInCurrentRow + 1;
      const seatNumber = `${String.fromCharCode(64 + currentRow)}${seatInRow}`;
      
      seats.push({
        id: `${currentRow}-${seatInRow}`,
        row: currentRow,
        seat: seatInRow,
        number: seatNumber,
        type: 'vip',
        price: event.contractData?.vipPrice || Math.floor(parseFloat(event.price.replace('$', '')) * 1.5),
        status: 'available'
      });
      
      vipSeatsCreated++;
      seatsInCurrentRow++;
      console.log(`🟨 VIP ${vipSeatsCreated}/${vipSeatsCount}: ${seatNumber} (Row ${currentRow}, Seat ${seatInRow})`);
    }
    
    // === STEP 2: START NORMAL SECTION (BACK ROWS) ===
    // If VIP section didn't fill the last row completely, move to next row for clean separation
    if (seatsInCurrentRow > 0) {
      currentRow++;
      seatsInCurrentRow = 0;
    }
    
    console.log(`🔘 === NORMAL SECTION (${normalSeatsCount} seats) starting from Row ${currentRow} ===`);
    for (let i = 0; i < normalSeatsCount; i++) {
      // Move to next row if current row is full
      if (seatsInCurrentRow >= SEATS_PER_ROW) {
        currentRow++;
        seatsInCurrentRow = 0;
      }
      
      const seatInRow = seatsInCurrentRow + 1;
      const seatNumber = `${String.fromCharCode(64 + currentRow)}${seatInRow}`;
      
      seats.push({
        id: `${currentRow}-${seatInRow}`,
        row: currentRow,
        seat: seatInRow,
        number: seatNumber,
        type: 'normal',
        price: event.contractData?.normalPrice || parseFloat(event.price.replace('$', '')),
        status: 'available'
      });
      
      normalSeatsCreated++;
      seatsInCurrentRow++;
      console.log(`🔘 Normal ${normalSeatsCreated}/${normalSeatsCount}: ${seatNumber} (Row ${currentRow}, Seat ${seatInRow})`);
    }
    
    const totalRowsUsed = currentRow;
    console.log(`📊 Layout Summary: ${totalRowsUsed} rows total, ${vipSeatsCreated} VIP seats, ${normalSeatsCreated} Normal seats`);
    
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
    
    // Final verification: Count actual VIP and Normal seats created
    const actualVipSeats = seats.filter(seat => seat.type === 'vip').length;
    const actualNormalSeats = seats.filter(seat => seat.type === 'normal').length;
    
    console.log('✅ FINAL SEAT VERIFICATION:', {
      expectedVipSeats: vipSeatsCount,
      actualVipSeats: actualVipSeats,
      expectedNormalSeats: normalSeatsCount,
      actualNormalSeats: actualNormalSeats,
      totalExpected: vipSeatsCount + normalSeatsCount,
      totalActual: seats.length,
      allSeats: seats.map(s => ({ number: s.number, type: s.type, price: s.price }))
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
    
    console.log('📊 CALCULATE TOTAL DEBUG:', {
      allSeatsCount: allSeats.length,
      selectedVIP: selectedSeats.vip,
      selectedNormal: selectedSeats.normal
    });
    
    // Calculate VIP total
    selectedSeats.vip.forEach(seatId => {
      const seat = allSeats.find(s => s.id === seatId);
      console.log(`💺 VIP Seat ${seatId}:`, seat);
      if (seat) total += seat.price;
    });
    
    // Calculate Normal total
    selectedSeats.normal.forEach(seatId => {
      const seat = allSeats.find(s => s.id === seatId);
      console.log(`💺 Normal Seat ${seatId}:`, seat);
      if (seat) total += seat.price;
    });
    
    console.log(`💰 Final Total: ${total}`);
    return total;
  };

  const getTotalSelectedSeats = () => {
    return selectedSeats.vip.length + selectedSeats.normal.length;
  };


  const proceedToCheckout = async () => {
    // Helper function to ensure number is valid integer or return 0
    const ensureNumber = (num) => {
      if (typeof num === 'bigint') {
        return Number(num); // Convert BigInt to Number
      }
      const parsed = parseFloat(num);
      return isNaN(parsed) || parsed < 0 ? 0 : Math.floor(parsed);
    };

    // Helper function to convert SUI to MIST as integer
    const suiToMistInteger = (suiAmount) => {
      return Math.floor(parseFloat(suiAmount) * 1_000_000_000);
    };

    // Helper function to convert string to vector<u8> or empty array
    const stringToVector = (str) => {
      if (!str || str.trim() === '') {
        return []; // Empty vector<u8> for blank strings
      }
      return Array.from(new TextEncoder().encode(str));
    };

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

    if (!contractConfig) {
      setTransactionStatus('⚠️ Contract configuration not loaded yet');
      setTimeout(() => setTransactionStatus(null), 3000);
      return;
    }

    const total = calculateTotal() * 1.04; // Include booking fee

    // Check if user has sufficient balance
    if (!hasSufficientBalance(total)) {
      setTransactionStatus(`💳 Insufficient balance. You need ${total.toFixed(2)} SUI but only have ${getFormattedBalance()} SUI`);
      setTimeout(() => setTransactionStatus(null), 5000);
      return;
    }

    setIsProcessing(true);
    setTransactionStatus('Preparing transaction...');

    try {
      // Get selected seats data
      const allSeats = getAllSeats();
      const selectedSeatsList = [
        ...selectedSeats.vip.map(id => allSeats.find(s => s.id === id)).filter(Boolean),
        ...selectedSeats.normal.map(id => allSeats.find(s => s.id === id)).filter(Boolean)
      ];

      if (selectedSeatsList.length === 0) {
        throw new Error('No valid seats selected');
      }

      setTransactionStatus('Creating real contract transaction...');

      // Build transaction to call the real smart contract
      const tx = new TransactionBlock();
      tx.setGasBudget(TX_CONFIG.gaseBudget);

      // Get user's SUI coins for payment (not gas coins)
      const suiClient = new SuiClient({
        url: 'https://fullnode.devnet.sui.io:443'
      });
      
      // Get user's coins for payment
      const coins = await suiClient.getCoins({
        owner: walletAddress,
        coinType: '0x2::sui::SUI',
      });
      
      if (coins.data.length === 0) {
        throw new Error('No SUI coins found in wallet');
      }
      
      // Calculate total amount needed in MIST as integer
      const totalAmountMist = suiToMistInteger(total);
      const gasNeeded = TX_CONFIG.gaseBudget; // Gas needed in MIST
      const totalNeededWithGas = totalAmountMist + gasNeeded;
      
      // Debug: Log all coin objects and their balances
      console.log('🔍 All SUI coins:', coins.data.map(coin => ({
        id: coin.coinObjectId,
        balance: coin.balance,
        balanceInSUI: (Number(coin.balance) / 1e9).toFixed(4)
      })));
      
      // Check if we have enough total balance (including gas)
      const totalWalletBalance = coins.data.reduce((sum, coin) => sum + Number(coin.balance), 0);
      if (totalWalletBalance < totalNeededWithGas) {
        throw new Error(`Insufficient total balance. Have: ${(totalWalletBalance / 1e9).toFixed(4)} SUI, Need: ${(totalNeededWithGas / 1e9).toFixed(4)} SUI (including ${(gasNeeded / 1e9).toFixed(4)} SUI gas)`);
      }
      
      // Sort coins by balance (descending) to use largest coins first
      const sortedCoins = coins.data.sort((a, b) => Number(b.balance) - Number(a.balance));
      
      // Strategy: Auto gas selection with pre-splitting to ensure separate coins
      let paymentCoins = [];
      
      // Validate coin objects first
      console.log('🔍 Validating coin objects:', sortedCoins.map(coin => ({
        id: coin.coinObjectId,
        hasId: !!coin.coinObjectId,
        balance: coin.balance,
        typeofId: typeof coin.coinObjectId
      })));
      
      // Check if all coins have valid IDs
      const invalidCoins = sortedCoins.filter(coin => !coin.coinObjectId || typeof coin.coinObjectId !== 'string');
      if (invalidCoins.length > 0) {
        console.error('❌ Invalid coin objects found:', invalidCoins);
        throw new Error(`Invalid coin objects detected. Please refresh and try again.`);
      }
      
      // Step 1: Ensure we have at least 2 coins (one for gas, one for payment)
      if (sortedCoins.length === 1) {
        console.log('📌 Only one coin found, splitting to create separate gas and payment coins');
        
        const singleCoin = sortedCoins[0];
        if (Number(singleCoin.balance) < totalNeededWithGas) {
          throw new Error(`Single coin insufficient. Have: ${(Number(singleCoin.balance) / 1e9).toFixed(4)} SUI, Need: ${(totalNeededWithGas / 1e9).toFixed(4)} SUI`);
        }
        
        // Split the single coin: create a gas portion and keep the rest for payment
        const mainCoin = tx.object(singleCoin.coinObjectId);
        const [gasCoinPortion] = tx.splitCoins(mainCoin, [tx.pure(gasNeeded.toString())]);
        
        // Now we have 2 coins: gasCoinPortion (for gas) and mainCoin (remainder for payment)
        console.log(`✅ Split single coin into gas portion (${(gasNeeded / 1e9).toFixed(4)} SUI) and payment portion (${((Number(singleCoin.balance) - gasNeeded) / 1e9).toFixed(4)} SUI)`);
        
        // Use remainder for payment
        paymentCoins = [{ ...singleCoin, coinObjectId: mainCoin, balance: (Number(singleCoin.balance) - gasNeeded).toString() }];
        
        // Let Sui auto-select gas from available coins (including our split portion)
        console.log('⚠️ Using auto gas selection - Sui will automatically choose from available coins including split portion');
      } else {
        console.log(`📌 Multiple coins found (${sortedCoins.length}), using auto gas selection`);
        
        // Step 2: For multiple coins, use auto gas selection
        // Reserve the smallest coins for gas, use larger ones for payment
        let gasReserveAmount = gasNeeded;
        let coinsForGas = [];
        let remainingCoins = [...sortedCoins];
        
        // Sort by balance ascending to use smallest coins for gas
        const sortedBySmallest = sortedCoins.sort((a, b) => Number(a.balance) - Number(b.balance));
        
        for (let i = 0; i < sortedBySmallest.length && gasReserveAmount > 0; i++) {
          const coin = sortedBySmallest[i];
          coinsForGas.push(coin);
          gasReserveAmount -= Number(coin.balance);
          
          // Remove from remaining coins
          remainingCoins = remainingCoins.filter(c => c.coinObjectId !== coin.coinObjectId);
          
          console.log(`➕ Reserved coin for gas: ${coin.coinObjectId}, balance: ${(Number(coin.balance) / 1e9).toFixed(4)} SUI`);
          
          if (gasReserveAmount <= 0) break;
        }
        
        if (gasReserveAmount > 0) {
          throw new Error(`Insufficient coins for gas reservation. Still need: ${(gasReserveAmount / 1e9).toFixed(4)} SUI`);
        }
        
        // Use remaining coins for payment
        paymentCoins = remainingCoins;
        
        console.log(`📌 Reserved ${coinsForGas.length} coins for gas, ${paymentCoins.length} coins for payment`);
        console.log('⚠️ Using auto gas selection - Sui will automatically choose from reserved gas coins');
      }
      
      // Step 3: Validate payment coins have enough balance
      const totalPaymentBalance = paymentCoins.reduce((sum, coin) => sum + Number(coin.balance || 0), 0);
      if (totalPaymentBalance < totalAmountMist) {
        throw new Error(`Insufficient payment balance. Have: ${(totalPaymentBalance / 1e9).toFixed(4)} SUI, Need: ${(totalAmountMist / 1e9).toFixed(4)} SUI`);
      }
      
      // Find payment coin from the available payment coins
      let paymentCoin;
      
      // Check if we have enough payment balance
      const availablePaymentBalance = paymentCoins.reduce((sum, coin) => sum + Number(coin.balance || 0), 0);
      if (availablePaymentBalance < totalAmountMist) {
        throw new Error(`Insufficient payment balance. Have: ${(availablePaymentBalance / 1e9).toFixed(4)} SUI, Need: ${(totalAmountMist / 1e9).toFixed(4)} SUI`);
      }
      
      // Try to find a single payment coin with enough balance
      const coinWithEnoughBalance = paymentCoins.find(coin => Number(coin.balance || 0) >= totalAmountMist);
      
      if (coinWithEnoughBalance) {
        console.log('✅ Found payment coin with sufficient balance:', {
          balance: coinWithEnoughBalance.balance,
          balanceInSUI: (Number(coinWithEnoughBalance.balance || 0) / 1e9).toFixed(4),
          required: totalAmountMist,
          requiredInSUI: (totalAmountMist / 1e9).toFixed(4)
        });
        
        // Handle both transaction object references and regular coin IDs
        if (typeof coinWithEnoughBalance.coinObjectId === 'string') {
          paymentCoin = tx.object(coinWithEnoughBalance.coinObjectId);
        } else {
          paymentCoin = coinWithEnoughBalance.coinObjectId; // Already a transaction object
        }
      } else {
        // Need to merge payment coins
        console.log('⚠️ No single payment coin has enough balance, merging payment coins...');
        
        // Start with the first payment coin
        const primaryCoin = paymentCoins[0];
        if (typeof primaryCoin.coinObjectId === 'string') {
          paymentCoin = tx.object(primaryCoin.coinObjectId);
        } else {
          paymentCoin = primaryCoin.coinObjectId; // Already a transaction object
        }
        
        // Merge other payment coins into the primary one
        const coinsToMerge = [];
        for (let i = 1; i < paymentCoins.length; i++) {
          const coin = paymentCoins[i];
          if (typeof coin.coinObjectId === 'string') {
            coinsToMerge.push(tx.object(coin.coinObjectId));
            console.log(`➕ Adding payment coin ${i}: ${coin.coinObjectId}, balance: ${(Number(coin.balance) / 1e9).toFixed(4)} SUI`);
          }
        }
        
        // Merge the payment coins
        if (coinsToMerge.length > 0) {
          tx.mergeCoins(paymentCoin, coinsToMerge);
          console.log(`🔄 Merged ${coinsToMerge.length} payment coins into primary payment coin`);
        }
      }
      
      // Call the smart contract purchase_ticket function for each seat
      for (const seat of selectedSeatsList) {
        // Calculate the exact payment amount the contract expects (convert to integers)
        const contractSeatPrice = seat.type === 'vip' ? 
          Math.floor(parseFloat(event.price.replace('$', '')) * 1.5) : 
          Math.floor(parseFloat(event.price.replace('$', '')));
        const contractBookingFee = Math.floor(contractSeatPrice * 0.04);
        const contractTotalCost = contractSeatPrice + contractBookingFee;
        const contractTotalCostMist = suiToMistInteger(contractTotalCost);

        // Split the payment coin to get exact amount the contract expects
        const [seatPaymentCoin] = tx.splitCoins(paymentCoin, [tx.pure(BigInt(contractTotalCostMist), "u64")]);

        // Create event data for this specific seat purchase with proper 20 arguments
        const eventDataCreated = tx.moveCall({
          target: `${contractConfig.packageId}::${contractConfig.module}::create_event`,
          arguments: [
            tx.pure(BigInt(Math.floor(Date.now() + Math.random() * 1000)), "u64"), // 1. event_id: u64
            tx.pure(stringToVector(event.name), "vector<u8>"), // 2. name: vector<u8>
            tx.pure(stringToVector(event.description || ''), "vector<u8>"), // 3. description: vector<u8>
            tx.pure(stringToVector(event.venue), "vector<u8>"), // 4. venue: vector<u8>
            tx.pure(stringToVector(event.address || ''), "vector<u8>"), // 5. address: vector<u8>
            tx.pure(BigInt(ensureNumber(Date.parse(event.date))), "u64"), // 6. event_date: u64
            tx.pure(stringToVector(event.time || ''), "vector<u8>"), // 7. time: vector<u8>
            tx.pure(stringToVector(event.closingTime || ''), "vector<u8>"), // 8. closing_time: vector<u8>
            tx.pure(BigInt(ensureNumber(parseFloat(event.price.replace('$', '')) * 1.5 * 1e9)), "u64"), // 9. vip_price: u64 (in MIST)
            tx.pure(BigInt(ensureNumber(parseFloat(event.price.replace('$', '')) * 1e9)), "u64"), // 10. normal_price: u64 (in MIST)
            tx.pure(BigInt(ensureNumber(20)), "u64"), // 11. total_vip_seats: u64
            tx.pure(BigInt(ensureNumber(80)), "u64"), // 12. total_normal_seats: u64
            tx.pure(stringToVector(event.category || ''), "vector<u8>"), // 13. category: vector<u8>
            tx.pure(stringToVector(event.language || 'English'), "vector<u8>"), // 14. language: vector<u8>
            tx.pure(stringToVector(event.ageRating || 'All Ages'), "vector<u8>"), // 15. age_rating: vector<u8>
            tx.pure(stringToVector(Array.isArray(event.genres) ? event.genres.join(', ') : (event.genres || '')), "vector<u8>"), // 16. genres: vector<u8>
            tx.pure(stringToVector(''), "vector<u8>"), // 17. image_url: vector<u8>
            tx.pure(stringToVector(''), "vector<u8>"), // 18. seating_image_url: vector<u8>
            tx.pure(stringToVector(event.importantNotices || ''), "vector<u8>"), // 19. important_notices: vector<u8>
            tx.pure(stringToVector(event.termsAndConditions || ''), "vector<u8>"), // 20. terms_and_conditions: vector<u8>
          ],
        });

        // Generate metadata URLs (simplified for demo)
        const imageUrl = `https://api.placeholder.com/600x400/D84040/FFFFFF?text=${encodeURIComponent(event.name + ' - ' + seat.number)}`;
        const metadataUrl = `data:application/json;base64,${btoa(JSON.stringify({
          name: `${event.name} - Seat ${seat.number}`,
          description: `Ticket for ${event.name} at ${event.venue}`,
          image: imageUrl,
          attributes: [
            { trait_type: "Event", value: event.name },
            { trait_type: "Venue", value: event.venue },
            { trait_type: "Date", value: event.date },
            { trait_type: "Seat", value: seat.number },
            { trait_type: "Type", value: seat.type.toUpperCase() },
            { trait_type: "Price", value: `${seat.price} SUI` }
          ]
        }))}`;

        // Now purchase the ticket using the created event data
        tx.moveCall({
          target: `${contractConfig.packageId}::ticketing::purchase_ticket`,
          arguments: [
            eventDataCreated, // event_data object reference
            tx.object(contractConfig.treasuryId), // treasury
            tx.pure(Array.from(new TextEncoder().encode(seat.number))), // seat_id as bytes
            tx.pure(seat.type === 'vip' ? 1 : 2), // seat_type (1 for VIP, 2 for Normal)
            tx.pure(Array.from(new TextEncoder().encode(imageUrl))), // image_url as bytes
            tx.pure(Array.from(new TextEncoder().encode(metadataUrl))), // metadata_url as bytes
            seatPaymentCoin, // payment coin (actual SUI from user's wallet)
          ],
        });
      }

      setTransactionStatus('Please confirm the transaction in your wallet...');
      
      // Execute the real contract transaction
      const resData = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
          showEffects: true,
          showEvents: true,
          showObjectChanges: true,
        },
      });

      console.log('✅ Real contract transaction successful:', resData);
      
      // DEBUG: Check transaction effects and gas usage
      console.log('🔍 TRANSACTION ANALYSIS:', {
        transactionDigest: resData.digest,
        fullResponse: resData,
        effects: resData.effects,
        gasUsed: resData.effects?.gasUsed,
        status: resData.effects?.status,
        balanceChanges: resData.balanceChanges,
        objectChanges: resData.objectChanges
      });
      
      // Save purchase to local storage for UI tracking (with real transaction data)
      const ticketData = {
        eventId: event.id,
        eventName: event.name,
        eventDate: event.date,
        venue: event.venue,
        seats: selectedSeatsList.map(seat => ({
          seatId: seat.number,
          type: seat.type,
          price: seat.price
        })),
        totalPrice: total,
        pricePaid: totalAmountMist, // Store in MIST for consistency
        purchaseDate: Date.now(),
        transactionHash: resData.digest,
        walletAddress: walletAddress,
        isRealPurchase: true, // Flag to indicate this is a real blockchain purchase
        contractObjects: resData.objectChanges?.filter(change => change.type === 'created') || []
      };

      // Save to localStorage for demo
      const existingPurchases = JSON.parse(localStorage.getItem('demo_purchases') || '[]');
      existingPurchases.push(ticketData);
      localStorage.setItem('demo_purchases', JSON.stringify(existingPurchases));

      setTransactionStatus('Real NFT ticket purchase completed! 🎉');

      // Show success modal
      const details = {
        ticketCount: selectedSeatsList.length,
        seats: selectedSeatsList.map(s => s.number).join(', '),
        total: total.toFixed(2),
        eventName: event.name,
        transactionHash: resData.digest,
        isRealPurchase: true
      };
      
      setPurchaseDetails(details);
      setShowSuccessModal(true);
      
      // Clear selections
      setSelectedSeats({ vip: [], normal: [] });
      
      // Update available tickets
      const newAvailable = calculateAvailableTickets() - selectedSeatsList.length;
      setAvailableTickets(Math.max(0, newAvailable));

    } catch (error) {
      console.error('❌ Real contract transaction error:', error);
      
      if (error.message?.includes('No valid SUI to pay the gas') || 
          error.message?.includes('Insufficient gas') || 
          error.message?.includes('InsufficientGas')) {
        setTransactionStatus('❌ Gas payment failed. Trying to merge coins for gas...');
        console.log('💡 Tip: Your SUI might be fragmented across multiple coin objects');
      } else if (error.message?.includes('User rejected') || error.message?.includes('rejected')) {
        setTransactionStatus('❌ Transaction cancelled by user.');
      } else if (error.message?.includes('Insufficient funds') || 
                 error.message?.includes('InsufficientCoinBalance') ||
                 error.message?.includes('Insufficient total balance')) {
        setTransactionStatus(`❌ Insufficient SUI balance for purchase. ${error.message}`);
      } else {
        setTransactionStatus(`❌ Contract transaction failed: ${error.message || 'Unknown error'}`);
      }
      
      setTimeout(() => setTransactionStatus(null), 8000);
    } finally {
      setIsProcessing(false);
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
            {/* Development only - clear purchases button */}
            {process.env.NODE_ENV === 'development' && (
              <button 
                onClick={clearPurchasesForEvent}
                className="text-xs bg-red-500 text-white px-2 py-1 rounded mt-2 hover:bg-red-600"
              >
                🗑️ Clear Purchases (Dev Only)
              </button>
            )}
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
                      backgroundImage: `url('${event.imageUrl || '/placeholder-event.jpg'}')`,
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
                          const isVipSeat = seat.type === 'vip'; // Check individual seat type
                          
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
                                  : isVipSeat
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
                    Premium location • Enhanced amenities • ${event.contractData?.vipPrice || Math.floor(parseFloat(event.price.replace('$', '')) * 1.5)}/seat
                  </p>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-gray-200 border border-gray-400 rounded-t-lg"></div>
                    <span className="font-semibold text-[#D84040] font-domine">Standard Section</span>
                  </div>
                  <p className="text-sm text-gray-600 font-domine">
                    Great views • Standard amenities • ${event.contractData?.normalPrice || event.price}/seat
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
                    Address: {getShortAddress(walletAddress)}
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
                    ${event.contractData?.vipPrice || Math.floor(parseFloat(event.price.replace('$', '')) * 1.5)} × {selectedSeats.vip.length}
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
                    ${event.contractData?.normalPrice || parseFloat(event.price.replace('$', ''))} × {selectedSeats.normal.length}
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
                ? 'Processing Real Purchase...'
                : !isConnected
                ? 'Connect Wallet to Continue'
                : getTotalSelectedSeats() === 0
                ? 'Select Seats to Continue'
                : 'Purchase NFT Tickets'
              }
            </button>
            
            {getTotalSelectedSeats() > 0 && isConnected && (
              <p className="text-xs text-gray-500 text-center mt-2 font-domine">
                Real blockchain: This will create actual NFT tickets and charge real SUI
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