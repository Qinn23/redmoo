import { SuiClient } from '@mysten/sui.js/client';

// Initialize Sui Client
const client = new SuiClient({ network: 'devnet' });

// Contract details from deployment
const CONTRACT_ADDRESS = '0x672e410f0439903559fa15397fb6bc81d63d1a0bd860a21b064be41862e9bb53';
const WALLET_TRACKER_ID = '0x51093fce63cfb60d284157d9126e6286ab5ac013db114333a52b0190f8003b19';

export async function createEvent(wallet, eventData) {
    try {
        const tx = await client.executeMoveCall({
            target: `${CONTRACT_ADDRESS}::ticket_nft::create_event`,
            arguments: [
                eventData.name,
                eventData.description,
                eventData.venue,
                eventData.eventDate,
                eventData.vipPrice,
                eventData.normalPrice,
                eventData.maxTicketsPerWallet,
                eventData.totalVipSeats,
                eventData.totalNormalSeats,
            ],
            typeArguments: [],
            signer: wallet,
        });
        return tx;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
}

export async function purchaseTicket(wallet, { eventId, seatId, seatType, price }) {
    try {
        // Get available coins for payment
        const coins = await client.getCoins({
            owner: wallet.address,
            coinType: '0x2::sui::SUI'
        });

        if (!coins.length) {
            throw new Error('No SUI coins available for payment');
        }

        const tx = await client.executeMoveCall({
            target: `${CONTRACT_ADDRESS}::ticket_nft::purchase_ticket`,
            arguments: [
                eventId,
                WALLET_TRACKER_ID,
                coins[0].coinObjectId,
                seatId,
                seatType,
                'https://your-image-url.com', // Replace with actual image URL
                'https://your-metadata-url.com', // Replace with actual metadata URL
                'CLOCK_OBJECT_ID' // Replace with actual clock object ID
            ],
            typeArguments: [],
            signer: wallet,
        });
        return tx;
    } catch (error) {
        console.error('Error purchasing ticket:', error);
        throw error;
    }
}

export async function getEventDetails(eventId) {
    try {
        const eventObject = await client.getObject({
            id: eventId,
            options: { showContent: true }
        });
        return eventObject;
    } catch (error) {
        console.error('Error fetching event details:', error);
        throw error;
    }
}

export async function getUserTickets(walletAddress) {
    try {
        const ownedObjects = await client.getOwnedObjects({
            owner: walletAddress,
            filter: { StructType: `${CONTRACT_ADDRESS}::ticket_nft::TicketNFT` },
            options: { showContent: true }
        });
        return ownedObjects.data;
    } catch (error) {
        console.error('Error fetching user tickets:', error);
        throw error;
    }
}
