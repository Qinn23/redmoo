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
    const response = await fetch('/contract-config.json');
    const config = await response.json();
    CONTRACT_CONFIG = config;
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

  // Generate a simple event ID based on timestamp
  const eventId = Date.now();

  tx.moveCall({
    target: `${CONTRACT_CONFIG.packageId}::ticketing::create_event`,
    arguments: [
      tx.pure(eventId), // event_id: u64
      tx.pure(Array.from(new TextEncoder().encode(name || ''))), // name: vector<u8>
      tx.pure(Array.from(new TextEncoder().encode(description || ''))), // description: vector<u8>
      tx.pure(Array.from(new TextEncoder().encode(venue || ''))), // venue: vector<u8>
      tx.pure(Array.from(new TextEncoder().encode(address || ''))), // address: vector<u8>
      tx.pure(eventDate), // event_date: u64
      tx.pure(Array.from(new TextEncoder().encode(time || ''))), // time: vector<u8>
      tx.pure(Array.from(new TextEncoder().encode(closingTime || ''))), // closing_time: vector<u8>
      tx.pure(vipPriceInMist.toString()), // vip_price: u64
      tx.pure(normalPriceInMist.toString()), // normal_price: u64
      tx.pure(totalVipSeats), // total_vip_seats: u64
      tx.pure(totalNormalSeats), // total_normal_seats: u64
      tx.pure(Array.from(new TextEncoder().encode(category || ''))), // category: vector<u8>
      tx.pure(Array.from(new TextEncoder().encode(language || ''))), // language: vector<u8>
      tx.pure(Array.from(new TextEncoder().encode(ageRating || ''))), // age_rating: vector<u8>
      tx.pure(Array.from(new TextEncoder().encode(genres || ''))), // genres: vector<u8>
      tx.pure(Array.from(new TextEncoder().encode(imageUrl || ''))), // image_url: vector<u8>
      tx.pure(Array.from(new TextEncoder().encode(seatingImageUrl || ''))), // seating_image_url: vector<u8>
      tx.pure(Array.from(new TextEncoder().encode(importantNotices || ''))), // important_notices: vector<u8>
      tx.pure(Array.from(new TextEncoder().encode(termsAndConditions || ''))), // terms_and_conditions: vector<u8>
    ],
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
  PriceUtils,
  ContractEventListener,
};