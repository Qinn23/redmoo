/**
 * Smart Contract Interaction Utilities
 * 
 * This module provides utilities for interacting with the deployed
 * Ticket NFT smart contract on Sui blockchain.
 */

import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SuiClient } from '@mysten/sui.js/client';

// Contract configuration (this would be loaded from deployment config)
let CONTRACT_CONFIG = null;

// Initialize contract configuration
export function initializeContract(config) {
  CONTRACT_CONFIG = config;
}

// Load contract configuration from deployed contract
export async function loadContractConfig() {
  try {
    console.log('🔄 Loading contract config from /contract-config.json...');
    const response = await fetch('/contract-config.json');
    const config = await response.json();
    CONTRACT_CONFIG = config;
    console.log('🔧 Loaded contract config:', {
      packageId: config.packageId,
      treasury: config.objects?.treasury,
      walletTracker: config.objects?.walletTracker
    });
    console.log('🚨 PACKAGE ID CHECK:', {
      loaded: config.packageId,
      expected: '0xe8c72bb82abf408049d1d0dbc664bfb96175cab514990c9b44a5334d8ad542c8',
      matches: config.packageId === '0xe8c72bb82abf408049d1d0dbc664bfb96175cab514990c9b44a5334d8ad542c8'
    });
    return config;
  } catch (error) {
    console.error('Failed to load contract configuration:', error);
    return null;
  }
}

/**
 * Convert MIST (smallest SUI unit) to SUI
 * 1 SUI = 10^9 MIST
 * @param {string|number} mistAmount Amount in MIST
 * @return {number} Amount in SUI
 */
export function mistToSui(mistAmount) {
  const amount = typeof mistAmount === 'string' ? BigInt(mistAmount) : mistAmount;
  return Number(amount) / 1_000_000_000;
}

/**
 * Convert SUI to MIST (smallest SUI unit)
 * 1 SUI = 10^9 MIST
 * @param {number} suiAmount Amount in SUI
 * @return {bigint} Amount in MIST
 */
export function suiToMist(suiAmount) {
  return BigInt(Math.floor(suiAmount * 1_000_000_000));
}

// Get current contract configuration
export function getContractConfig() {
  return CONTRACT_CONFIG;
}

/**
 * Create a transaction to purchase a ticket
 */
export function createPurchaseTicketTransaction(params) {
  const {
    eventObjectId,
    seatId,
    seatType, // 1 for VIP, 2 for Normal
    priceInMist,
    imageUrl,
    metadataUrl,
    packageId,
    moduleId = 'ticketing',
    clockObjectId = '0x6' // Sui Clock object
  } = params;
  
  if (!packageId) {
    throw new Error('Package ID is required');
  }

  const txb = new TransactionBlock();

  if (!CONTRACT_CONFIG) {
    throw new Error('Contract not initialized. Call loadContractConfig() first.');
  }

  const tx = new TransactionBlock();

  // Split coins for payment
  const [coin] = tx.splitCoins(tx.gas, [tx.pure(priceInMist)]);

  // Call the purchase_ticket function
  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::ticketing::purchase_ticket`,
    arguments: [
      tx.object(eventObjectId),
      tx.object(CONTRACT_CONFIG.objects.walletTracker),
      coin,
      tx.pure(seatId),
      tx.pure(seatType),
      tx.pure(imageUrl),
      tx.pure(metadataUrl),
      tx.object(clockObjectId),
    ],
  });

  return tx;
}

/**
 * Get next event ID starting from 1
 */
function getNextEventId() {
  // Get existing events from localStorage
  const existingEvents = JSON.parse(localStorage.getItem('dynamic_events') || '{}');
  const existingIds = Object.keys(existingEvents).map(id => parseInt(id));
  
  // Find the highest existing ID and add 1, or start from 1 if none exist
  if (existingIds.length === 0) {
    return 1;
  }
  
  return Math.max(...existingIds) + 1;
}

/**
 * Create a transaction to create a new event (organizer only)
 */
export function createEventTransaction(params) {
  const {
    name,
    description,
    venue,
    address,
    eventDate, // timestamp in milliseconds
    time,
    closingTime,
    vipPriceInMist,
    normalPriceInMist,
    totalVipSeats,
    totalNormalSeats,
    category,
    language,
    ageRating,
    genres,
    imageUrl,
    seatingImageUrl,
    importantNotices,
    termsAndConditions
  } = params;

  if (!CONTRACT_CONFIG) {
    throw new Error('Contract not initialized. Call loadContractConfig() first.');
  }

  const tx = new TransactionBlock();

  // Use simple counter starting from 1 instead of timestamp
  const eventId = getNextEventId();

  // Helper function to convert string to vector<u8> or empty array
  const stringToVector = (str) => {
    if (!str || str.trim() === '') {
      return []; // Empty vector<u8> for blank strings
    }
    return Array.from(new TextEncoder().encode(str));
  };

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

  // Debug logging for argument validation
  console.log('🔍 Event creation parameters:', {
    eventId,
    name: name?.length || 0,
    description: description?.length || 0,
    venue: venue?.length || 0,
    address: address?.length || 0,
    eventDate,
    time: time?.length || 0,
    closingTime: closingTime?.length || 0,
    vipPriceInMist: typeof vipPriceInMist,
    normalPriceInMist: typeof normalPriceInMist,
    totalVipSeats,
    totalNormalSeats,
    category: category?.length || 0,
    language: language?.length || 0,
    ageRating: ageRating?.length || 0,
    genres: genres?.length || 0,
    imageUrl: imageUrl?.length || 0,
    seatingImageUrl: seatingImageUrl?.length || 0,
    importantNotices: importantNotices?.length || 0,
    termsAndConditions: termsAndConditions?.length || 0
  });

  const arguments_array = [
    tx.pure(BigInt(eventId), "u64"), // 1. event_id: u64 - now starts from 1
    tx.pure(stringToVector(name), "vector<u8>"), // 2. name: vector<u8>
    tx.pure(stringToVector(description), "vector<u8>"), // 3. description: vector<u8>
    tx.pure(stringToVector(venue), "vector<u8>"), // 4. venue: vector<u8>
    tx.pure(stringToVector(address), "vector<u8>"), // 5. address: vector<u8>
    tx.pure(BigInt(ensureNumber(eventDate)), "u64"), // 6. event_date: u64
    tx.pure(stringToVector(time), "vector<u8>"), // 7. time: vector<u8>
    tx.pure(stringToVector(closingTime), "vector<u8>"), // 8. closing_time: vector<u8>
    tx.pure(BigInt(ensureNumber(vipPriceInMist)), "u64"), // 9. vip_price: u64
    tx.pure(BigInt(ensureNumber(normalPriceInMist)), "u64"), // 10. normal_price: u64
    tx.pure(BigInt(ensureNumber(totalVipSeats)), "u64"), // 11. total_vip_seats: u64
    tx.pure(BigInt(ensureNumber(totalNormalSeats)), "u64"), // 12. total_normal_seats: u64
    tx.pure(stringToVector(category), "vector<u8>"), // 13. category: vector<u8>
    tx.pure(stringToVector(language), "vector<u8>"), // 14. language: vector<u8>
    tx.pure(stringToVector(ageRating), "vector<u8>"), // 15. age_rating: vector<u8>
    tx.pure(stringToVector(genres), "vector<u8>"), // 16. genres: vector<u8>
    tx.pure(stringToVector(imageUrl), "vector<u8>"), // 17. image_url: vector<u8>
    tx.pure(stringToVector(seatingImageUrl), "vector<u8>"), // 18. seating_image_url: vector<u8>
    tx.pure(stringToVector(importantNotices), "vector<u8>"), // 19. important_notices: vector<u8>
    tx.pure(stringToVector(termsAndConditions), "vector<u8>"), // 20. terms_and_conditions: vector<u8>
  ];

  console.log(`✅ Prepared ${arguments_array.length} arguments for create_event (expected: 20)`);
  
  // Log each argument for detailed debugging
  arguments_array.forEach((arg, index) => {
    console.log(`Arg ${index + 1}:`, arg);
  });

  console.log('🎯 Final moveCall target:', `${CONTRACT_CONFIG.packageId}::ticketing::create_event`);
  console.log('🔧 CONTRACT_CONFIG.packageId:', CONTRACT_CONFIG.packageId);

  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::ticketing::create_event`,
    arguments: arguments_array,
  });

  console.log('🚀 Creating event transaction with:', {
    target: `${CONTRACT_CONFIG.packageId}::ticketing::create_event`,
    packageId: CONTRACT_CONFIG.packageId,
    argumentCount: 20,
    eventId, 
    name,
    vipPriceInMist,
    normalPriceInMist
  });

  return tx;
}

/**
 * Create a transaction to withdraw funds from an event (organizer only)
 */
export function createWithdrawFundsTransaction(eventObjectId, amountInMist) {
  if (!CONTRACT_CONFIG) {
    throw new Error('Contract not initialized. Call loadContractConfig() first.');
  }

  const tx = new TransactionBlock();

  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::ticketing::withdraw_funds`,
    arguments: [
      tx.object(CONTRACT_CONFIG.objects.organizerCap),
      tx.object(eventObjectId),
      tx.pure(amountInMist),
    ],
  });

  return tx;
}

/**
 * Create a transaction to remove/delete an event (organizer only)
 */
export function createRemoveEventTransaction(eventObjectId) {
  if (!CONTRACT_CONFIG) {
    throw new Error('Contract not initialized. Call loadContractConfig() first.');
  }

  const tx = new TransactionBlock();

  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::ticketing::remove_event`,
    arguments: [
      tx.object(eventObjectId), // The event to remove
    ],
  });

  return tx;
}

/**
 * Create a transaction to toggle event status (organizer only)
 */
export function createToggleEventStatusTransaction(eventObjectId) {
  if (!CONTRACT_CONFIG) {
    throw new Error('Contract not initialized. Call loadContractConfig() first.');
  }

  const tx = new TransactionBlock();

  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::ticketing::toggle_event_status`,
    arguments: [
      tx.object(CONTRACT_CONFIG.objects.organizerCap),
      tx.object(eventObjectId),
    ],
  });

  return tx;
}

/**
 * Query event information
 */
export async function getEventInfo(suiClient, eventObjectId) {
  try {
    const eventObject = await suiClient.getObject({
      id: eventObjectId,
      options: {
        showContent: true,
        showType: true,
      },
    });

    if (eventObject.data && eventObject.data.content) {
      const fields = eventObject.data.content.fields;
      return {
        id: eventObjectId,
        name: fields.name,
        description: fields.description,
        venue: fields.venue,
        eventDate: parseInt(fields.event_date),
        vipPrice: parseInt(fields.vip_price),
        normalPrice: parseInt(fields.normal_price),
        maxTicketsPerWallet: parseInt(fields.max_tickets_per_wallet),
        organizer: fields.organizer,
        totalVipSeats: parseInt(fields.total_vip_seats),
        totalNormalSeats: parseInt(fields.total_normal_seats),
        soldVipSeats: parseInt(fields.sold_vip_seats),
        soldNormalSeats: parseInt(fields.sold_normal_seats),
        isActive: fields.is_active,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching event info:', error);
    return null;
  }
}

/**
 * Query ticket information
 */
export async function getTicketInfo(suiClient, ticketObjectId) {
  try {
    const ticketObject = await suiClient.getObject({
      id: ticketObjectId,
      options: {
        showContent: true,
        showType: true,
      },
    });

    if (ticketObject.data && ticketObject.data.content) {
      const fields = ticketObject.data.content.fields;
      return {
        id: ticketObjectId,
        eventId: fields.event_id,
        eventName: fields.event_name,
        venue: fields.venue,
        eventDate: parseInt(fields.event_date),
        seatId: fields.seat_id,
        seatType: parseInt(fields.seat_type),
        pricePaid: parseInt(fields.price_paid),
        purchaseDate: parseInt(fields.purchase_date),
        holder: fields.holder,
        imageUrl: fields.image_url,
        metadataUrl: fields.metadata_url,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching ticket info:', error);
    return null;
  }
}

/**
 * Get all tickets owned by a specific address
 */
export async function getUserTickets(suiClient, ownerAddress) {
  if (!CONTRACT_CONFIG) {
    throw new Error('Contract not initialized. Call loadContractConfig() first.');
  }

  try {
    const ownedObjects = await suiClient.getOwnedObjects({
      owner: ownerAddress,
      filter: {
        StructType: `${CONTRACT_CONFIG.packageId}::ticketing::TicketNFT`,
      },
      options: {
        showContent: true,
        showType: true,
      },
    });

    const tickets = [];
    for (const obj of ownedObjects.data) {
      if (obj.data && obj.data.content) {
        const fields = obj.data.content.fields;
        tickets.push({
          id: obj.data.objectId,
          eventId: fields.event_id,
          eventName: fields.event_name,
          venue: fields.venue,
          eventDate: parseInt(fields.event_date),
          seatId: fields.seat_id,
          seatType: parseInt(fields.seat_type),
          pricePaid: parseInt(fields.price_paid),
          purchaseDate: parseInt(fields.purchase_date),
          holder: fields.holder,
          imageUrl: fields.image_url,
          metadataUrl: fields.metadata_url,
        });
      }
    }

    return tickets;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    return [];
  }
}

/**
 * Check if a seat is available for a specific event
 */
export async function isSeatAvailable(suiClient, eventObjectId, seatId) {
  try {
    const eventObject = await suiClient.getObject({
      id: eventObjectId,
      options: {
        showContent: true,
      },
    });

    if (eventObject.data && eventObject.data.content) {
      // This would require a view function in the smart contract
      // For now, we'll return true (seat available) as a placeholder
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking seat availability:', error);
    return false;
  }
}

/**
 * Get the number of tickets a wallet has purchased for a specific event
 */
export async function getWalletTicketCount(suiClient, walletAddress, eventId) {
  if (!CONTRACT_CONFIG) {
    throw new Error('Contract not initialized. Call loadContractConfig() first.');
  }

  try {
    // This would require calling a view function on the smart contract
    // For now, we'll return 0 as a placeholder
    return 0;
  } catch (error) {
    console.error('Error fetching wallet ticket count:', error);
    return 0;
  }
}

/**
 * Utility functions for price conversion
 */
export const PriceUtils = {
  // Convert SUI to MIST (1 SUI = 1,000,000,000 MIST)
  suiToMist: (suiAmount) => {
    return Math.floor(parseFloat(suiAmount) * 1_000_000_000);
  },

  // Convert MIST to SUI
  mistToSui: (mistAmount) => {
    return parseInt(mistAmount) / 1_000_000_000;
  },

  // Format SUI amount for display
  formatSui: (mistAmount, decimals = 4) => {
    const sui = parseInt(mistAmount) / 1_000_000_000;
    return sui.toFixed(decimals);
  },
};

/**
 * Event listeners for smart contract events
 */
export class ContractEventListener {
  constructor(suiClient) {
    this.suiClient = suiClient;
    this.subscribers = new Map();
  }

  // Subscribe to ticket purchase events
  onTicketPurchased(callback) {
    const eventType = 'TicketPurchased';
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType).push(callback);
  }

  // Subscribe to event creation events
  onEventCreated(callback) {
    const eventType = 'EventCreated';
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType).push(callback);
  }

  // Subscribe to withdrawal events
  onEventWithdrawn(callback) {
    const eventType = 'EventWithdrawn';
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType).push(callback);
  }

  // Start listening for events (this would require WebSocket connection)
  startListening() {
    // Implementation would depend on Sui's event subscription API
    console.log('Event listening started');
  }

  // Stop listening for events
  stopListening() {
    console.log('Event listening stopped');
  }
}

/**
 * Create a transaction to list a ticket for resale
 */
export function createSellTicketTransaction(params) {
  const {
    ticketObjectId,
    resalePrice
  } = params;

  if (!CONTRACT_CONFIG) {
    throw new Error('Contract not initialized. Call loadContractConfig() first.');
  }

  const tx = new TransactionBlock();

  // Call the sell_ticket function
  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::ticketing::sell_ticket`,
    arguments: [
      tx.object(ticketObjectId),
      tx.pure(resalePrice)
    ]
  });

  return tx;
}

/**
 * Create a transaction to purchase a resale ticket
 */
export function createPurchaseResaleTicketTransaction(params) {
  const {
    ticketObjectId,
    resalePrice
  } = params;

  if (!CONTRACT_CONFIG) {
    throw new Error('Contract not initialized. Call loadContractConfig() first.');
  }

  const tx = new TransactionBlock();

  // Split coins for payment
  const [coin] = tx.splitCoins(tx.gas, [tx.pure(resalePrice)]);

  // Call the purchase_resale_ticket function
  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::ticketing::purchase_resale_ticket`,
    arguments: [
      tx.object(ticketObjectId),
      tx.object(CONTRACT_CONFIG.objects.treasury),
      coin
    ]
  });

  // Note: The ticket ownership transfer is handled differently in the current implementation
  // The ticket state is updated but ownership isn't transferred automatically
  // In production, you'd want to implement a proper escrow system

  return tx;
}

/**
 * Create a transaction to cancel ticket sale
 */
export function createCancelTicketSaleTransaction(params) {
  const {
    ticketObjectId
  } = params;

  if (!CONTRACT_CONFIG) {
    throw new Error('Contract not initialized. Call loadContractConfig() first.');
  }

  const tx = new TransactionBlock();

  // Call the cancel_ticket_sale function
  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::ticketing::cancel_ticket_sale`,
    arguments: [
      tx.object(ticketObjectId)
    ]
  });

  return tx;
}

/**
 * Get enhanced ticket info including resale status
 */
export async function getEnhancedTicketInfo(suiClient, ticketObjectId) {
  if (!CONTRACT_CONFIG) {
    throw new Error('Contract not initialized. Call loadContractConfig() first.');
  }

  try {
    const result = await suiClient.devInspectTransactionBlock({
      transactionBlock: (() => {
        const tx = new TransactionBlock();
        tx.moveCall({
          target: `${CONTRACT_CONFIG.packageId}::ticketing::get_ticket_info`,
          arguments: [tx.object(ticketObjectId)]
        });
        return tx;
      })(),
      sender: '0x0000000000000000000000000000000000000000000000000000000000000000'
    });

    if (result.results && result.results[0] && result.results[0].returnValues) {
      const returnValues = result.results[0].returnValues;
      return {
        eventId: returnValues[0],
        seatId: returnValues[1],
        seatType: returnValues[2],
        originalPrice: returnValues[3],
        resaleCount: returnValues[4],
        forSale: returnValues[5],
        resalePrice: returnValues[6]
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting enhanced ticket info:', error);
    return null;
  }
}

export default {
  initializeContract,
  loadContractConfig,
  getContractConfig,
  createPurchaseTicketTransaction,
  createEventTransaction,
  createWithdrawFundsTransaction,
  createToggleEventStatusTransaction,
  getEventInfo,
  getTicketInfo,
  getUserTickets,
  isSeatAvailable,
  getWalletTicketCount,
  createSellTicketTransaction,
  createPurchaseResaleTicketTransaction,
  createCancelTicketSaleTransaction,
  getEnhancedTicketInfo,
  PriceUtils,
  ContractEventListener,
};