/**
 * Real Smart Contract Interactions
 * This file contains functions to interact with the deployed NFT ticket contract
 * These functions will process REAL payments and deduct money from wallets
 */

import { TransactionBlock } from '@mysten/sui.js/transactions';
import { CONTRACT_CONFIG } from './contract-config.js';

/**
 * Purchase a ticket using the smart contract (REAL PAYMENT)
 * This will actually deduct SUI from the user's wallet
 */
export async function purchaseTicketOnChain(params) {
  const {
    suiClient,
    walletAddress,
    executeTransaction,
    eventObjectId,
    seatId,
    seatType, // 1 for VIP, 2 for Normal  
    priceInSui,
    eventName,
    venue
  } = params;

  try {
    console.log('🔗 Starting real blockchain ticket purchase...');
    console.log('💰 Price:', priceInSui, 'SUI');
    console.log('🎫 Seat:', seatId, 'Type:', seatType === 1 ? 'VIP' : 'STANDARD');

    // Convert SUI to MIST (1 SUI = 1,000,000,000 MIST)
    const priceInMist = Math.floor(priceInSui * 1_000_000_000);

    // Create transaction block
    const txb = new TransactionBlock();

    // Get coins to pay for the ticket
    const [coin] = txb.splitCoins(txb.gas, [txb.pure(priceInMist)]);

    // Call the smart contract purchase_ticket function
    txb.moveCall({
      target: `${CONTRACT_CONFIG.PACKAGE_ID}::ticket_nft::purchase_ticket`,
      arguments: [
        txb.object(eventObjectId), // Event object
        txb.object(CONTRACT_CONFIG.WALLET_TRACKER_ID), // Wallet tracker
        coin, // Payment coin
        txb.pure(Array.from(new TextEncoder().encode(seatId))), // seat_id as bytes
        txb.pure(seatType), // seat_type (1=VIP, 2=Normal)
        txb.pure(Array.from(new TextEncoder().encode(''))), // image_url (empty for now)
        txb.pure(Array.from(new TextEncoder().encode(''))), // metadata_url (empty for now)
        txb.object('0x6'), // Sui Clock object
      ],
    });

    // Set gas budget
    txb.setGasBudget(CONTRACT_CONFIG.DEFAULT_GAS_BUDGET);

    console.log('📝 Executing transaction...');
    
    // Execute the transaction
    const result = await executeTransaction(txb);
    
    console.log('✅ Transaction successful!');
    console.log('📄 Transaction digest:', result.digest);
    
    // Parse the transaction effects to get the created NFT
    const createdObjects = result.effects?.created || [];
    const nftObject = createdObjects.find(obj => 
      obj.owner?.AddressOwner === walletAddress
    );

    return {
      success: true,
      transactionDigest: result.digest,
      nftObjectId: nftObject?.reference?.objectId || null,
      message: `Successfully purchased ${seatType === 1 ? 'VIP' : 'Standard'} ticket for ${seatId}!`,
      realPayment: true,
      amountPaid: priceInSui
    };

  } catch (error) {
    console.error('❌ Smart contract purchase failed:', error);
    
    // Check for specific error types
    let errorMessage = 'Transaction failed. ';
    
    if (error.message?.includes('EInsufficientPayment')) {
      errorMessage += 'Insufficient payment amount.';
    } else if (error.message?.includes('ESeatAlreadySold')) {
      errorMessage += 'This seat has already been sold.';
    } else if (error.message?.includes('EEventNotActive')) {
      errorMessage += 'This event is not currently active.';
    } else if (error.message?.includes('Insufficient gas')) {
      errorMessage += 'Insufficient gas. Please add more SUI to your wallet.';
    } else {
      errorMessage += error.message || 'Unknown error occurred.';
    }

    return {
      success: false,
      error: errorMessage,
      realPayment: false
    };
  }
}

/**
 * Create an event (only for organizer)
 */
export async function createEventOnChain(params) {
  const {
    suiClient,
    executeTransaction,
    eventName,
    description,
    venue,
    eventDate,
    vipPriceSui,
    normalPriceSui,
    maxTicketsPerWallet,
    totalVipSeats,
    totalNormalSeats
  } = params;

  try {
    const txb = new TransactionBlock();

    // Convert prices to MIST
    const vipPriceInMist = Math.floor(vipPriceSui * 1_000_000_000);
    const normalPriceInMist = Math.floor(normalPriceSui * 1_000_000_000);

    txb.moveCall({
      target: `${CONTRACT_CONFIG.PACKAGE_ID}::ticket_nft::create_event`,
      arguments: [
        txb.object(CONTRACT_CONFIG.ORGANIZER_CAP_ID),
        txb.pure(Array.from(new TextEncoder().encode(eventName))),
        txb.pure(Array.from(new TextEncoder().encode(description))),
        txb.pure(Array.from(new TextEncoder().encode(venue))),
        txb.pure(eventDate),
        txb.pure(vipPriceInMist),
        txb.pure(normalPriceInMist),
        txb.pure(maxTicketsPerWallet),
        txb.pure(totalVipSeats),
        txb.pure(totalNormalSeats),
      ],
    });

    txb.setGasBudget(CONTRACT_CONFIG.DEFAULT_GAS_BUDGET);

    const result = await executeTransaction(txb);
    
    // Find the created event object
    const createdObjects = result.effects?.created || [];
    const eventObject = createdObjects.find(obj => 
      obj.owner?.Shared === true // Events are shared objects
    );

    return {
      success: true,
      transactionDigest: result.digest,
      eventObjectId: eventObject?.reference?.objectId || null,
      message: `Event "${eventName}" created successfully!`
    };

  } catch (error) {
    console.error('❌ Event creation failed:', error);
    return {
      success: false,
      error: error.message || 'Failed to create event'
    };
  }
}

/**
 * Get user's NFT tickets from the blockchain
 */
export async function getUserTicketsFromChain(suiClient, walletAddress) {
  try {
    console.log('🔍 Fetching real NFT tickets from blockchain...');

    // Get all objects owned by the user
    const ownedObjects = await suiClient.getOwnedObjects({
      owner: walletAddress,
      filter: {
        StructType: `${CONTRACT_CONFIG.PACKAGE_ID}::ticket_nft::TicketNFT`
      },
      options: {
        showContent: true,
        showType: true,
      }
    });

    console.log('📦 Found', ownedObjects.data.length, 'NFT tickets');

    // Parse the ticket data
    const tickets = ownedObjects.data.map(obj => {
      const content = obj.data?.content;
      if (!content?.fields) return null;

      const fields = content.fields;
      
      return {
        id: obj.data.objectId,
        eventName: fields.event_name,
        venue: fields.venue,
        seatId: fields.seat_id,
        seatType: parseInt(fields.seat_type),
        eventDate: fields.event_date,
        pricePaid: fields.price_paid,
        purchaseDate: fields.purchase_date,
        isRealNFT: true, // Mark as real blockchain NFT
        objectId: obj.data.objectId
      };
    }).filter(ticket => ticket !== null);

    console.log('✅ Processed', tickets.length, 'valid tickets');

    return tickets;

  } catch (error) {
    console.error('❌ Failed to fetch real NFT tickets:', error);
    return [];
  }
}

/**
 * Check if smart contract is deployed and configured
 */
export function isContractDeployed() {
  return CONTRACT_CONFIG && 
         CONTRACT_CONFIG.PACKAGE_ID !== "YOUR_DEPLOYED_PACKAGE_ID_HERE" &&
         CONTRACT_CONFIG.ORGANIZER_CAP_ID !== "YOUR_ORGANIZER_CAP_ID_HERE";
}

/**
 * Get contract deployment status
 */
export function getContractStatus() {
  if (!CONTRACT_CONFIG) {
    return {
      deployed: false,
      message: "Contract configuration not loaded"
    };
  }

  if (!isContractDeployed()) {
    return {
      deployed: false,
      message: "Contract not deployed yet. Please deploy and update contract-config.js"
    };
  }

  return {
    deployed: true,
    message: "Contract is deployed and ready",
    packageId: CONTRACT_CONFIG.PACKAGE_ID
  };
}