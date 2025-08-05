
#[allow(duplicate_alias, unused_use)]
module ticketing {

use sui::coin::{Coin, split, merge};
use sui::transfer;
use sui::tx_context::TxContext;
use sui::object::{UID, new};
use sui::signer;
use std::option::{Option, none, some};

/// Constants
const MAX_TICKETS_PER_USER: u8 = 4;
const MAX_RESELL_TIMES: u8 = 5;
const BOOKING_FEE_PERCENT: u64 = 4;
const RESELL_FEE_PERCENT: u64 = 10; 
const MAX_RESELL_PRICE_PERCENT: u64 = 110;
const ORGANIZER_ADDRESS: address = 0xa03b1fe2af2d9b489c491915ab07bd3691ecb9ebe15eff683573e268cbc10a77; // replace with real organizer

/// Ticket struct
public struct Ticket has key, store {
    id: UID,
    event_id: u64,
    owner: address,
    original_price: u64,
    resale_count: u8,
}

/// User data to track ticket count and ban status
public struct UserData has key, store {
    id: UID,
    owner: address,
    ticket_count: u8,
    banned: bool,
}

/// Organizer data to hold collected fees
public struct OrganizerData has key, store {
    id: UID,
    collected_fees: u64,
}

/// Mint ticket — only organizer can mint
public entry fun mint_ticket(
    organizer: &signer,
    event_id: u64,
    price: u64,
    ctx: &mut TxContext,
): Ticket {
    let organizer_addr = signer::address_of(organizer);
    assert!(organizer_addr == ORGANIZER_ADDRESS, 1);

    let ticket = Ticket {
        id: new(ctx),
        event_id,
        owner: organizer_addr,
        original_price: price,
        resale_count: 0,
    };
    ticket
}

/// Buy ticket from organizer, buyer pays price + booking fee, passes coin for total amount
public entry fun buy_ticket(
    buyer: &signer,
    ticket: Ticket,
    payment_coin: Coin,
    ctx: &mut TxContext,
) acquires UserData {
    // Check buyer banned
    assert!(!is_banned(buyer), 2);

    let buyer_addr = signer::address_of(buyer);

    // Check buyer ticket count limit
    let user_data = get_or_create_user_data(buyer, ctx);
    assert!(user_data.ticket_count < MAX_TICKETS_PER_USER, 3);

    let booking_fee = (ticket.original_price * BOOKING_FEE_PERCENT) / 100;
    let total_cost = ticket.original_price + booking_fee;

    // Check payment coin amount sufficient
    assert!(coin_value(&payment_coin) >= total_cost, 4);

    // Split payment coin into price and fee coins
    let (price_coin, fee_coin) = split(payment_coin, ticket.original_price);

    // Transfer price to organizer
    transfer::transfer(price_coin, ORGANIZER_ADDRESS);

    // Transfer booking fee to organizer (or fee pool)
    transfer::transfer(fee_coin, ORGANIZER_ADDRESS);

    // Transfer ticket ownership to buyer
    let new_ticket = Ticket {
        owner: buyer_addr,
        ..ticket
    };

    // Update ticket count
    user_data.ticket_count = user_data.ticket_count + 1;

    new_ticket
}

/// Resell ticket — seller owns ticket, buyer pays resale price, 10% fee goes to organizer
public entry fun resell_ticket(
    seller: &signer,
    buyer_addr: address,
    ticket: Ticket,
    resale_price: u64,
    payment_coin: Coin,
    ctx: &mut TxContext,
) acquires UserData {
    let seller_addr = signer::address_of(seller);

    // Verify ownership
    assert!(ticket.owner == seller_addr, 5);

    // Verify seller not banned
    assert!(!is_banned(seller), 6);

    // Verify resale price limit
    assert!(resale_price <= (ticket.original_price * MAX_RESELL_PRICE_PERCENT) / 100, 7);

    // Verify buyer ticket count limit
    let buyer_data = get_or_create_user_data_by_address(buyer_addr, ctx);
    assert!(buyer_data.ticket_count < MAX_TICKETS_PER_USER, 8);

    // Check payment coin value
    assert!(coin_value(&payment_coin) >= resale_price, 9);

    // Calculate fees
    let fee = (resale_price * RESELL_FEE_PERCENT) / 100;
    let seller_amount = resale_price - fee;

    // Split payment coin into seller and fee coins
    let (seller_coin, fee_coin) = split(payment_coin, seller_amount);

    // Pay seller
    transfer::transfer(seller_coin, seller_addr);

    // Pay organizer fees
    transfer::transfer(fee_coin, ORGANIZER_ADDRESS);

    // Transfer ticket ownership to buyer
    let new_ticket = Ticket {
        owner: buyer_addr,
        resale_count: ticket.resale_count + 1,
        ..ticket
    };

    // Update ticket counts
    decrement_ticket_count(seller_addr, ctx);
    increment_ticket_count(buyer_addr, ctx);

    // Ban seller if resale count exceeded
    if (new_ticket.resale_count > MAX_RESELL_TIMES) {
        ban_user(seller_addr, ctx);
    }

    new_ticket
}

/// === User Data management ===

fun get_or_create_user_data(user: &signer, ctx: &mut TxContext): &mut UserData {
    let addr = signer::address_of(user);
    if (!exists<UserData>(addr)) {
        move_to(user, UserData {
            id: new(ctx),
            owner: addr,
            ticket_count: 0,
            banned: false,
        });
    }
    borrow_global_mut<UserData>(addr)
}

fun get_or_create_user_data_by_address(addr: address, ctx: &mut TxContext): &mut UserData {
    if (!exists<UserData>(addr)) {
        // Cannot move_to since no signer, so create a dummy? 
        // For simplicity assume data exists or front-end enforces new users
        abort 999;
    }
    borrow_global_mut<UserData>(addr)
}

fun increment_ticket_count(addr: address, ctx: &mut TxContext) {
    let user_data = borrow_global_mut<UserData>(addr);
    user_data.ticket_count = user_data.ticket_count + 1;
}

fun decrement_ticket_count(addr: address, ctx: &mut TxContext) {
    let user_data = borrow_global_mut<UserData>(addr);
    if (user_data.ticket_count > 0) {
        user_data.ticket_count = user_data.ticket_count - 1;
    }
}

fun is_banned(user: &signer): bool acquires UserData {
    let addr = signer::address_of(user);
    if (!exists<UserData>(addr)) {
        return false;
    }
    let data = borrow_global<UserData>(addr);
    data.banned
}

fun ban_user(addr: address, ctx: &mut TxContext) acquires UserData {
    let user_data = borrow_global_mut<UserData>(addr);
    user_data.banned = true;
}

/// Helper to get coin value (simplified for Coin<SUI>)
fun coin_value(coin: &Coin): u64 {
    coin.value()
}

} // module

