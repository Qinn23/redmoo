
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

/// Constants
const MAX_TICKETS_PER_USER: u8 = 4;
const MAX_RESELL_TIMES: u8 = 5;
const BOOKING_FEE_PERCENT: u64 = 4;
const RESELL_FEE_PERCENT: u64 = 10; 
const MAX_RESELL_PRICE_PERCENT: u64 = 110;

/// Error codes
const E_NOT_ORGANIZER: u64 = 1;
const E_USER_BANNED: u64 = 2;
const E_TICKET_LIMIT_EXCEEDED: u64 = 3;
const E_INSUFFICIENT_PAYMENT: u64 = 4;
const E_NOT_OWNER: u64 = 5;
const E_PRICE_TOO_HIGH: u64 = 6;

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
    };
    
    // Transfer ticket to buyer
    transfer::transfer(ticket, buyer);
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

/// Get ticket info (view function)
public fun get_ticket_info(ticket: &Ticket): (u64, vector<u8>, u8, u64, u8) {
    (
        ticket.event_id,
        ticket.seat_id,
        ticket.seat_type,
        ticket.original_price,
        ticket.resale_count
    )
}

/// Withdraw treasury balance (organizer only)
public entry fun withdraw_treasury(
    treasury: &mut Treasury,
    amount: u64,
    ctx: &mut TxContext
) {
    assert!(tx_context::sender(ctx) == treasury.organizer, E_NOT_ORGANIZER);
    
    let withdrawn_balance = balance::split(&mut treasury.balance, amount);
    let withdrawn_coin = coin::from_balance(withdrawn_balance, ctx);
    transfer::public_transfer(withdrawn_coin, treasury.organizer);
}

}

