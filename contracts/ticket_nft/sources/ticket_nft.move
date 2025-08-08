
module ticket_nft::ticketing {

use sui::coin::Coin;
use sui::object::UID;
use sui::transfer;
use sui::tx_context::TxContext;
use sui::balance::Balance;
use sui::sui::SUI;
use sui::coin;
use sui::balance;
use sui::object;
use sui::tx_context;
use sui::table;
use sui::event;

/// Constants
const MAX_TICKETS_PER_USER: u8 = 4;
const MAX_RESELL_TIMES: u8 = 5;
const BOOKING_FEE_PERCENT: u64 = 4;
const RESELL_FEE_PERCENT: u64 = 10; 
const MAX_RESELL_PRICE_PERCENT: u64 = 110;
const SUI_TO_MIST: u64 = 1_000_000_000; // 1 SUI = 1,000,000,000 MIST

/// Error codes
const E_NOT_ORGANIZER: u64 = 1;
const E_USER_BANNED: u64 = 2;
const E_TICKET_LIMIT_EXCEEDED: u64 = 3;
const E_INSUFFICIENT_PAYMENT: u64 = 4;
const E_NOT_OWNER: u64 = 5;
const E_PRICE_TOO_HIGH: u64 = 6;
const E_RESALE_LIMIT_EXCEEDED: u64 = 7;
const E_TICKET_NOT_FOR_SALE: u64 = 8;

/// Ticket NFT struct
public struct Ticket has key, store {
    id: UID,
    event_id: u64,
    seat_id: vector<u8>,
    seat_type: u8, // 1 for VIP, 2 for Normal
    original_price: u64,
    resale_count: u8,
    image_url: vector<u8>,
    metadata_url: vector<u8>,
    for_sale: bool,
    resale_price: u64,
}

/// Event data struct
public struct EventData has key, store {
    id: UID,
    event_id: u64,
    name: vector<u8>,
    description: vector<u8>,
    venue: vector<u8>,
    address: vector<u8>,
    event_date: u64,
    time: vector<u8>,
    closing_time: vector<u8>,
    vip_price: u64,
    normal_price: u64,
    total_vip_seats: u64,
    total_normal_seats: u64,
    category: vector<u8>,
    language: vector<u8>,
    age_rating: vector<u8>,
    genres: vector<u8>,
    image_url: vector<u8>,
    seating_image_url: vector<u8>,
    important_notices: vector<u8>,
    terms_and_conditions: vector<u8>,
    organizer: address,
}

/// Wallet tracker struct to track user wallets and ticket ownership
public struct WalletTracker has key {
    id: UID,
    user_tickets: table::Table<address, vector<u64>>, // user address -> list of ticket IDs
    ticket_owners: table::Table<u64, address>, // ticket ID -> owner address
    user_purchase_counts: table::Table<address, u64>, // user address -> total tickets purchased
}

/// User data to track ticket count and ban status  
public struct UserData has key, store {
    id: UID,
    owner: address,
    ticket_count: u8,
    banned: bool,
}

/// Treasury for collecting fees
public struct Treasury has key {
    id: UID,
    balance: Balance<SUI>,
    organizer: address,
}

/// Withdrawal event for tracking organizer withdrawals
public struct WithdrawalEvent has copy, drop {
    organizer: address,
    amount: u64,
    timestamp: u64,
    remaining_balance: u64,
}

/// Initialize the module - creates treasury and wallet tracker
fun init(ctx: &mut TxContext) {
    let treasury = Treasury {
        id: object::new(ctx),
        balance: balance::zero(),
        organizer: tx_context::sender(ctx),
    };
    transfer::share_object(treasury);
    
    // Create wallet tracker
    let wallet_tracker = WalletTracker {
        id: object::new(ctx),
        user_tickets: table::new(ctx),
        ticket_owners: table::new(ctx),
        user_purchase_counts: table::new(ctx),
    };
    transfer::share_object(wallet_tracker);
}

/// Helper function: Convert SUI amount to MIST
/// Note: Pass whole SUI amounts (e.g., 15 for 15 SUI, 25 for 25 SUI)
/// For fractional amounts, frontend should handle conversion
public fun sui_to_mist(sui_amount: u64): u64 {
    sui_amount * SUI_TO_MIST
}

/// Helper function: Convert MIST amount to SUI (for display purposes)
public fun mist_to_sui(mist_amount: u64): u64 {
    mist_amount / SUI_TO_MIST
}

/// Create a new event
public entry fun create_event(
    event_id: u64,
    name: vector<u8>,
    description: vector<u8>,
    venue: vector<u8>,
    address: vector<u8>,
    event_date: u64,
    time: vector<u8>,
    closing_time: vector<u8>,
    vip_price: u64,
    normal_price: u64,
    total_vip_seats: u64,
    total_normal_seats: u64,
    category: vector<u8>,
    language: vector<u8>,
    age_rating: vector<u8>,
    genres: vector<u8>,
    image_url: vector<u8>,
    seating_image_url: vector<u8>,
    important_notices: vector<u8>,
    terms_and_conditions: vector<u8>,
    ctx: &mut TxContext
) {
    let event_data = EventData {
        id: object::new(ctx),
        event_id,
        name,
        description,
        venue,
        address,
        event_date,
        time,
        closing_time,
        vip_price,
        normal_price,
        total_vip_seats,
        total_normal_seats,
        category,
        language,
        age_rating,
        genres,
        image_url,
        seating_image_url,
        important_notices,
        terms_and_conditions,
        organizer: tx_context::sender(ctx),
    };
    transfer::share_object(event_data);
}

/// Purchase ticket function - main entry point for users
public entry fun purchase_ticket(
    event_data: &EventData,
    treasury: &mut Treasury,
    seat_id: vector<u8>,
    seat_type: u8, // 1 for VIP, 2 for Normal
    image_url: vector<u8>,
    metadata_url: vector<u8>,
    payment: Coin<SUI>,
    ctx: &mut TxContext
) {
    let buyer = tx_context::sender(ctx);
    
    // Get ticket price based on seat type
    let ticket_price = if (seat_type == 1) {
        event_data.vip_price
    } else {
        event_data.normal_price
    };
    
    // Calculate total cost with booking fee
    let booking_fee = (ticket_price * BOOKING_FEE_PERCENT) / 100;
    let total_cost = ticket_price + booking_fee;
    
    // Check payment amount
    assert!(coin::value(&payment) >= total_cost, E_INSUFFICIENT_PAYMENT);
    
    // Check user ticket limit (simplified - in full implementation, track per user)
    // For now, we'll create the ticket and let frontend handle limits
    
    // Add payment to treasury
    let payment_balance = coin::into_balance(payment);
    balance::join(&mut treasury.balance, payment_balance);
    
    // Create ticket NFT
    let ticket = Ticket {
        id: object::new(ctx),
        event_id: event_data.event_id,
        seat_id,
        seat_type,
        original_price: ticket_price,
        resale_count: 0,
        image_url,
        metadata_url,
        for_sale: false,
        resale_price: 0,
    };
    
    // Transfer ticket to buyer
    transfer::transfer(ticket, buyer);
}

/// List ticket for resale
public entry fun sell_ticket(
    ticket: Ticket,
    resale_price: u64,
    ctx: &mut TxContext
) {
    let seller = tx_context::sender(ctx);
    
    // Check that the ticket is not already for sale
    assert!(!ticket.for_sale, E_TICKET_NOT_FOR_SALE);
    
    // Check resale price limit (110% of original price)
    let max_resale_price = (ticket.original_price * 110) / 100;
    assert!(resale_price <= max_resale_price, E_RESALE_LIMIT_EXCEEDED);
    
    // Destructure and reconstruct with updated sale status
    let Ticket {
        id: ticket_id,
        event_id,
        seat_id,
        seat_type,
        original_price,
        resale_count,
        image_url,
        metadata_url,
        for_sale: _,
        resale_price: _,
    } = ticket;
    
    // Delete the old ticket ID
    object::delete(ticket_id);
    
    // Create new ticket with resale info
    let resale_ticket = Ticket {
        id: object::new(ctx),
        event_id,
        seat_id,
        seat_type,
        original_price,
        resale_count,
        image_url,
        metadata_url,
        for_sale: true,
        resale_price,
    };
    
    // Transfer ticket back to seller with updated resale status
    transfer::transfer(resale_ticket, seller);
}

/// List ticket for resale (accepts SUI amount, converts to MIST internally)
public entry fun sell_ticket_sui(
    ticket: Ticket,
    resale_price_sui: u64, // Amount in SUI (e.g., 15 for 15 SUI)
    ctx: &mut TxContext
) {
    // Convert SUI to MIST
    let resale_price_mist = sui_to_mist(resale_price_sui);
    
    // Call the main sell_ticket function with MIST amount
    sell_ticket(ticket, resale_price_mist, ctx);
}

/// Purchase resale ticket
public entry fun purchase_resale_ticket(
    ticket: Ticket,
    treasury: &mut Treasury,
    seller: address,
    payment: Coin<SUI>,
    ctx: &mut TxContext
) {
    let buyer = tx_context::sender(ctx);
    
    // Check that ticket is for sale
    assert!(ticket.for_sale, E_TICKET_NOT_FOR_SALE);
    
    // Check payment amount
    assert!(coin::value(&payment) >= ticket.resale_price, E_INSUFFICIENT_PAYMENT);
    
    // Calculate fees (10% to organizer, 90% to seller)
    let organizer_fee = (ticket.resale_price * 10) / 100;
    
    // Split payment for organizer fee
    let mut payment_coin = payment;
    let organizer_fee_coin = coin::split(&mut payment_coin, organizer_fee, ctx);
    
    // Add organizer fee to treasury
    let organizer_fee_balance = coin::into_balance(organizer_fee_coin);
    balance::join(&mut treasury.balance, organizer_fee_balance);
    
    // Transfer remaining payment (90%) directly to seller
    let seller_payment_coin = payment_coin;
    transfer::public_transfer(seller_payment_coin, seller);
    
    // Destructure and reconstruct ticket to transfer ownership
    let Ticket {
        id: ticket_id,
        event_id,
        seat_id,
        seat_type,
        original_price,
        resale_count,
        image_url,
        metadata_url,
        for_sale: _,
        resale_price: _,
    } = ticket;
    
    // Delete the old ticket ID to avoid conflicts
    object::delete(ticket_id);
    
    // Create new ticket for buyer with updated state
    let new_ticket = Ticket {
        id: object::new(ctx),
        event_id,
        seat_id,
        seat_type,
        original_price,
        resale_count: resale_count + 1,
        image_url,
        metadata_url,
        for_sale: false,
        resale_price: 0,
    };
    
    // Transfer new ticket to buyer
    transfer::transfer(new_ticket, buyer);
}

/// Get event data (view function)
public fun get_event_info(event_data: &EventData): (u64, u64, u64, u64, u64, u64, address) {
    (
        event_data.event_id,
        event_data.event_date,
        event_data.vip_price,
        event_data.normal_price,
        event_data.total_vip_seats,
        event_data.total_normal_seats,
        event_data.organizer
    )
}

/// Delete event (organizer only)
public entry fun delete_event(
    event_data: EventData,
    ctx: &mut TxContext
) {
    // Check that only the organizer can delete the event
    assert!(tx_context::sender(ctx) == event_data.organizer, E_NOT_ORGANIZER);
    
    // Destructure the event to delete it
    let EventData {
        id,
        event_id: _,
        name: _,
        description: _,
        venue: _,
        address: _,
        event_date: _,
        time: _,
        closing_time: _,
        vip_price: _,
        normal_price: _,
        total_vip_seats: _,
        total_normal_seats: _,
        category: _,
        language: _,
        age_rating: _,
        genres: _,
        image_url: _,
        seating_image_url: _,
        important_notices: _,
        terms_and_conditions: _,
        organizer: _,
    } = event_data;
    
    // Delete the event object
    object::delete(id);
}

/// Get ticket info (view function)
public fun get_ticket_info(ticket: &Ticket): (u64, vector<u8>, u8, u64, u8, bool, u64) {
    (
        ticket.event_id,
        ticket.seat_id,
        ticket.seat_type,
        ticket.original_price,
        ticket.resale_count,
        ticket.for_sale,
        ticket.resale_price
    )
}

/// Remove an event (organizer only)
public entry fun remove_event(
    event_data: EventData,
    ctx: &mut TxContext
) {
    // Only the event organizer can remove the event
    assert!(tx_context::sender(ctx) == event_data.organizer, E_NOT_ORGANIZER);
    
    // Delete the event object
    let EventData {
        id,
        event_id: _,
        name: _,
        description: _,
        venue: _,
        address: _,
        event_date: _,
        time: _,
        closing_time: _,
        vip_price: _,
        normal_price: _,
        total_vip_seats: _,
        total_normal_seats: _,
        category: _,
        language: _,
        age_rating: _,
        genres: _,
        image_url: _,
        seating_image_url: _,
        important_notices: _,
        terms_and_conditions: _,
        organizer: _,
    } = event_data;
    
    object::delete(id);
}

/// Withdraw treasury balance (organizer only)
public entry fun withdraw_treasury(
    treasury: &mut Treasury,
    amount: u64,
    ctx: &mut TxContext
) {
    assert!(tx_context::sender(ctx) == treasury.organizer, E_NOT_ORGANIZER);
    
    let withdrawn_balance = balance::split(&mut treasury.balance, amount);
    let remaining_balance = balance::value(&treasury.balance);
    
    // Emit withdrawal event for frontend tracking
    event::emit(WithdrawalEvent {
        organizer: treasury.organizer,
        amount: amount,
        timestamp: tx_context::epoch_timestamp_ms(ctx),
        remaining_balance: remaining_balance,
    });
    
    let withdrawn_coin = coin::from_balance(withdrawn_balance, ctx);
    transfer::public_transfer(withdrawn_coin, treasury.organizer);
}

}

