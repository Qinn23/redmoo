
#[allow(duplicate_alias, unused_use)]
module ticket_nft::ticket_nft {
    use std::string::{Self, String};
    use std::vector;
    use sui::object::{Self, ID, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::event;
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::table::{Self, Table};
    use sui::clock::{Self, Clock};

    // Error codes
    const EInsufficientPayment: u64 = 1;
    const EEventNotActive: u64 = 2;
    const ESeatAlreadySold: u64 = 3;
    const ENotAuthorized: u64 = 4;
    const EInvalidSeatType: u64 = 5;

    // Seat types
    const SEAT_TYPE_VIP: u8 = 1;
    const SEAT_TYPE_NORMAL: u8 = 2;

    /// The main event organizer capability
    public struct OrganizerCap has key, store {
        id: UID,
        organizer: address,
    }

    /// Event structure representing a ticketed event
    public struct Event has key, store {
        id: UID,
        name: String,
        description: String,
        venue: String,
        event_date: u64, // Timestamp
        vip_price: u64,  // Price in MIST (1 SUI = 1,000,000,000 MIST)
        normal_price: u64,
        max_tickets_per_wallet: u64,
        organizer: address,
        total_vip_seats: u64,
        total_normal_seats: u64,
        sold_vip_seats: u64,
        sold_normal_seats: u64,
        is_active: bool,
        sold_seats: Table<String, bool>, // seat_id -> sold status
        balance: Balance<SUI>,
    }

    /// Ticket NFT structure
    public struct TicketNFT has key, store {
        id: UID,
        event_id: ID,
        event_name: String,
        venue: String,
        event_date: u64,
        seat_id: String,
        seat_type: u8, // 1 = VIP, 2 = Normal
        price_paid: u64,
        purchase_date: u64,
        holder: address,
        image_url: String,
        metadata_url: String,
    }

    /// Wallet ticket limit tracking
    public struct WalletTicketCount has key {
        id: UID,
        ticket_counts: Table<address, Table<ID, u64>>, // wallet -> (event_id -> count)
    }

    // Events
    public struct EventCreated has copy, drop {
        event_id: ID,
        name: String,
        organizer: address,
    }

    public struct TicketPurchased has copy, drop {
        ticket_id: ID,
        event_id: ID,
        buyer: address,
        seat_id: String,
        price_paid: u64,
    }

    public struct EventWithdrawn has copy, drop {
        event_id: ID,
        organizer: address,
        amount: u64,
    }

    /// Initialize the module - creates the organizer capability and wallet tracker
    fun init(ctx: &mut TxContext) {
        let organizer_cap = OrganizerCap {
            id: object::new(ctx),
            organizer: tx_context::sender(ctx),
        };

        let wallet_tracker = WalletTicketCount {
            id: object::new(ctx),
            ticket_counts: table::new(ctx),
        };

        transfer::share_object(wallet_tracker);
        transfer::transfer(organizer_cap, tx_context::sender(ctx));
    }

    /// Create a new event (only organizer can call this)
    public entry fun create_event(
        _cap: &OrganizerCap,
        name: vector<u8>,
        description: vector<u8>,
        venue: vector<u8>,
        event_date: u64,
        vip_price: u64,
        normal_price: u64,
        max_tickets_per_wallet: u64,
        total_vip_seats: u64,
        total_normal_seats: u64,
        ctx: &mut TxContext
    ) {
        let event_id = object::new(ctx);
        let event_id_copy = object::uid_to_inner(&event_id);

        let event = Event {
            id: event_id,
            name: string::utf8(name),
            description: string::utf8(description),
            venue: string::utf8(venue),
            event_date,
            vip_price,
            normal_price,
            max_tickets_per_wallet,
            organizer: tx_context::sender(ctx),
            total_vip_seats,
            total_normal_seats,
            sold_vip_seats: 0,
            sold_normal_seats: 0,
            is_active: true,
            sold_seats: table::new(ctx),
            balance: balance::zero(),
        };

        event::emit(EventCreated {
            event_id: event_id_copy,
            name: string::utf8(name),
            organizer: tx_context::sender(ctx),
        });

        transfer::share_object(event);
    }

    /// Purchase a ticket for an event
    public entry fun purchase_ticket(
        event: &mut Event,
        wallet_tracker: &mut WalletTicketCount,
        payment: Coin<SUI>,
        seat_id: vector<u8>,
        seat_type: u8,
        image_url: vector<u8>,
        metadata_url: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // Verify event is active
        assert!(event.is_active, EEventNotActive);

        // Verify seat type is valid
        assert!(seat_type == SEAT_TYPE_VIP || seat_type == SEAT_TYPE_NORMAL, EInvalidSeatType);

        let seat_id_string = string::utf8(seat_id);
        
        // Check if seat is already sold
        assert!(!table::contains(&event.sold_seats, seat_id_string), ESeatAlreadySold);

        // Determine required price based on seat type
        let required_price = if (seat_type == SEAT_TYPE_VIP) {
            event.vip_price
        } else {
            event.normal_price
        };

        // Verify payment amount
        let payment_amount = coin::value(&payment);
        assert!(payment_amount >= required_price, EInsufficientPayment);

        let buyer = tx_context::sender(ctx);
        let event_id = object::uid_to_inner(&event.id);

        // Check wallet ticket limit
        if (!table::contains(&wallet_tracker.ticket_counts, buyer)) {
            table::add(&mut wallet_tracker.ticket_counts, buyer, table::new(ctx));
        };

        let buyer_events = table::borrow_mut(&mut wallet_tracker.ticket_counts, buyer);
        
        let current_count = if (table::contains(buyer_events, event_id)) {
            *table::borrow(buyer_events, event_id)
        } else {
            0
        };

        assert!(current_count < event.max_tickets_per_wallet, ENotAuthorized);

        // Update ticket count
        if (table::contains(buyer_events, event_id)) {
            let count_ref = table::borrow_mut(buyer_events, event_id);
            *count_ref = *count_ref + 1;
        } else {
            table::add(buyer_events, event_id, 1);
        };

        // Mark seat as sold
        table::add(&mut event.sold_seats, seat_id_string, true);

        // Update sold seat counts
        if (seat_type == SEAT_TYPE_VIP) {
            event.sold_vip_seats = event.sold_vip_seats + 1;
        } else {
            event.sold_normal_seats = event.sold_normal_seats + 1;
        };

        // Add payment to event balance
        let payment_balance = coin::into_balance(payment);
        balance::join(&mut event.balance, payment_balance);

        // Create ticket NFT
        let ticket_id = object::new(ctx);
        let ticket_id_copy = object::uid_to_inner(&ticket_id);
        let current_time = clock::timestamp_ms(clock);

        let ticket = TicketNFT {
            id: ticket_id,
            event_id,
            event_name: event.name,
            venue: event.venue,
            event_date: event.event_date,
            seat_id: seat_id_string,
            seat_type,
            price_paid: required_price,
            purchase_date: current_time,
            holder: buyer,
            image_url: string::utf8(image_url),
            metadata_url: string::utf8(metadata_url),
        };

        event::emit(TicketPurchased {
            ticket_id: ticket_id_copy,
            event_id,
            buyer,
            seat_id: seat_id_string,
            price_paid: required_price,
        });

        transfer::transfer(ticket, buyer);
    }

    /// Withdraw funds from an event (only organizer)
    public entry fun withdraw_funds(
        cap: &OrganizerCap,
        event: &mut Event,
        amount: u64,
        ctx: &mut TxContext
    ) {
        assert!(event.organizer == cap.organizer, ENotAuthorized);
        
        let withdrawn = coin::take(&mut event.balance, amount, ctx);
        let event_id = object::uid_to_inner(&event.id);

        event::emit(EventWithdrawn {
            event_id,
            organizer: cap.organizer,
            amount,
        });

        transfer::public_transfer(withdrawn, cap.organizer);
    }

    /// Toggle event active status (only organizer)
    public entry fun toggle_event_status(
        cap: &OrganizerCap,
        event: &mut Event,
    ) {
        assert!(event.organizer == cap.organizer, ENotAuthorized);
        event.is_active = !event.is_active;
    }

    // View functions
    public fun get_event_info(event: &Event): (String, String, String, u64, u64, u64, bool) {
        (
            event.name,
            event.description, 
            event.venue,
            event.event_date,
            event.vip_price,
            event.normal_price,
            event.is_active
        )
    }

    public fun get_ticket_info(ticket: &TicketNFT): (ID, String, String, String, u8, u64, u64) {
        (
            ticket.event_id,
            ticket.event_name,
            ticket.venue,
            ticket.seat_id,
            ticket.seat_type,
            ticket.price_paid,
            ticket.purchase_date
        )
    }

    public fun get_seat_availability(event: &Event, seat_id: String): bool {
        !table::contains(&event.sold_seats, seat_id)
    }

    public fun get_wallet_ticket_count(
        wallet_tracker: &WalletTicketCount, 
        wallet: address, 
        event_id: ID
    ): u64 {
        if (!table::contains(&wallet_tracker.ticket_counts, wallet)) {
            return 0
        };

        let buyer_events = table::borrow(&wallet_tracker.ticket_counts, wallet);
        if (!table::contains(buyer_events, event_id)) {
            return 0
        };

        *table::borrow(buyer_events, event_id)
    }
}