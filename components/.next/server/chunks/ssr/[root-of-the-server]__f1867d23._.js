module.exports = {

"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}}),
"[externals]/react-dom [external] (react-dom, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[next]/internal/font/google/chonburi_1efb88a8.module.css [ssr] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "chonburi_1efb88a8-module___32efG__className",
  "variable": "chonburi_1efb88a8-module___32efG__variable",
});
}),
"[next]/internal/font/google/chonburi_1efb88a8.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_1efb88a8$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/chonburi_1efb88a8.module.css [ssr] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_1efb88a8$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Chonburi', 'Chonburi Fallback'",
        fontWeight: 400,
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_1efb88a8$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_1efb88a8$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/domine_ac069135.module.css [ssr] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "domine_ac069135-module__zDK6jW__className",
  "variable": "domine_ac069135-module__zDK6jW__variable",
});
}),
"[next]/internal/font/google/domine_ac069135.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_ac069135$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/domine_ac069135.module.css [ssr] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_ac069135$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Domine', 'Domine Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_ac069135$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_ac069135$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/wallet/useWallet.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useWalletInfo": ()=>useWalletInfo
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
(()=>{
    const e = new Error("Cannot find module '@mysten/wallet-kit'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
function useWalletInfo() {
    const { currentAccount, signAndExecuteTransactionBlock } = useWalletKit();
    const [address, setAddress] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (currentAccount) {
            setAddress(currentAccount.address);
            setIsConnected(true);
        } else {
            setAddress(null);
            setIsConnected(false);
        }
    }, [
        currentAccount
    ]);
    return {
        address,
        isConnected,
        signAndExecuteTransactionBlock
    };
}
}),
"[externals]/@mysten/sui.js/client [external] (@mysten/sui.js/client, esm_import)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@mysten/sui.js/client");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/services/blockchainService.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "BlockchainService": ()=>BlockchainService
});
(()=>{
    const e = new Error("Cannot find module '@mysten/sui.js'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
// Contract configuration
const CONTRACT_CONFIG = {
    PACKAGE_ID: '0x...',
    MODULE_NAME: 'ticket_nft',
    EVENT_TYPE: 'Event',
    TICKET_TYPE: 'Ticket'
};
class BlockchainService {
    constructor(client, wallet){
        this.client = client;
        this.wallet = wallet;
    }
    // Create a new event
    async createEvent(eventData) {
        try {
            const tx = new TransactionBlock();
            // Convert event data to bytes
            const nameBytes = this.stringToBytes(eventData.name);
            const dateBytes = this.stringToBytes(eventData.date);
            const venueBytes = this.stringToBytes(eventData.venue);
            const descriptionBytes = this.stringToBytes(eventData.description);
            const imageUrlBytes = this.stringToBytes(eventData.imageUrl);
            // Price in MIST (1 SUI = 1,000,000,000 MIST)
            const priceInMist = eventData.price * 1_000_000_000;
            tx.moveCall({
                target: `${CONTRACT_CONFIG.PACKAGE_ID}::${CONTRACT_CONFIG.MODULE_NAME}::create_event`,
                arguments: [
                    tx.pure(nameBytes),
                    tx.pure(dateBytes),
                    tx.pure(venueBytes),
                    tx.pure(priceInMist),
                    tx.pure(eventData.totalTickets),
                    tx.pure(descriptionBytes),
                    tx.pure(imageUrlBytes)
                ]
            });
            const result = await this.wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
                options: {
                    showEffects: true,
                    showEvents: true
                }
            });
            return {
                success: true,
                digest: result.digest,
                events: result.events
            };
        } catch (error) {
            console.error('Error creating event:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    // Purchase a ticket
    async purchaseTicket(eventId, paymentAmount) {
        try {
            const tx = new TransactionBlock();
            // Split the payment coin
            const [payment] = tx.splitCoins(tx.gas, [
                paymentAmount
            ]);
            tx.moveCall({
                target: `${CONTRACT_CONFIG.PACKAGE_ID}::${CONTRACT_CONFIG.MODULE_NAME}::purchase_ticket`,
                arguments: [
                    tx.object(eventId),
                    payment
                ]
            });
            const result = await this.wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
                options: {
                    showEffects: true,
                    showEvents: true
                }
            });
            return {
                success: true,
                digest: result.digest,
                events: result.events
            };
        } catch (error) {
            console.error('Error purchasing ticket:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    // Transfer a ticket
    async transferTicket(ticketId, recipientAddress) {
        try {
            const tx = new TransactionBlock();
            tx.moveCall({
                target: `${CONTRACT_CONFIG.PACKAGE_ID}::${CONTRACT_CONFIG.MODULE_NAME}::transfer_ticket`,
                arguments: [
                    tx.object(ticketId),
                    tx.pure(recipientAddress)
                ]
            });
            const result = await this.wallet.signAndExecuteTransactionBlock({
                transactionBlock: tx,
                options: {
                    showEffects: true,
                    showEvents: true
                }
            });
            return {
                success: true,
                digest: result.digest
            };
        } catch (error) {
            console.error('Error transferring ticket:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    // Get user's tickets
    async getUserTickets(userAddress) {
        try {
            const objects = await this.client.getOwnedObjects({
                owner: userAddress,
                filter: {
                    Package: CONTRACT_CONFIG.PACKAGE_ID
                }
            });
            const tickets = [];
            for (const obj of objects.data){
                if (obj.data?.type?.includes('Ticket')) {
                    const ticketData = await this.client.getObject({
                        id: obj.data.objectId,
                        options: {
                            showContent: true
                        }
                    });
                    if (ticketData.data) {
                        tickets.push({
                            id: obj.data.objectId,
                            ...ticketData.data.content.fields
                        });
                    }
                }
            }
            return {
                success: true,
                tickets
            };
        } catch (error) {
            console.error('Error getting user tickets:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    // Get event details
    async getEventDetails(eventId) {
        try {
            const eventData = await this.client.getObject({
                id: eventId,
                options: {
                    showContent: true
                }
            });
            if (eventData.data) {
                return {
                    success: true,
                    event: eventData.data.content.fields
                };
            } else {
                return {
                    success: false,
                    error: 'Event not found'
                };
            }
        } catch (error) {
            console.error('Error getting event details:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    // Get all events
    async getAllEvents() {
        try {
            const objects = await this.client.getObjects({
                filter: {
                    Package: CONTRACT_CONFIG.PACKAGE_ID
                }
            });
            const events = [];
            for (const obj of objects.data){
                if (obj.data?.type?.includes('Event')) {
                    events.push({
                        id: obj.data.objectId,
                        ...obj.data.content.fields
                    });
                }
            }
            return {
                success: true,
                events
            };
        } catch (error) {
            console.error('Error getting all events:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    // Helper function to convert string to bytes
    stringToBytes(str) {
        return Array.from(new TextEncoder().encode(str));
    }
    // Helper function to convert SUI to MIST
    suiToMist(suiAmount) {
        return Math.floor(suiAmount * 1_000_000_000);
    }
    // Helper function to convert MIST to SUI
    mistToSui(mistAmount) {
        return mistAmount / 1_000_000_000;
    }
}
}),
"[project]/hooks/useBlockchain.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "useBlockchain": ()=>useBlockchain
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$suiet$2f$wallet$2d$kit__$5b$external$5d$__$2840$suiet$2f$wallet$2d$kit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@suiet/wallet-kit [external] (@suiet/wallet-kit, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$sui$2e$js$2f$client__$5b$external$5d$__$2840$mysten$2f$sui$2e$js$2f$client$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@mysten/sui.js/client [external] (@mysten/sui.js/client, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$blockchainService$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/blockchainService.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$suiet$2f$wallet$2d$kit__$5b$external$5d$__$2840$suiet$2f$wallet$2d$kit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$sui$2e$js$2f$client__$5b$external$5d$__$2840$mysten$2f$sui$2e$js$2f$client$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$suiet$2f$wallet$2d$kit__$5b$external$5d$__$2840$suiet$2f$wallet$2d$kit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$sui$2e$js$2f$client__$5b$external$5d$__$2840$mysten$2f$sui$2e$js$2f$client$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function useBlockchain() {
    const { connected, account, signAndExecuteTransactionBlock, wallet } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$suiet$2f$wallet$2d$kit__$5b$external$5d$__$2840$suiet$2f$wallet$2d$kit$2c$__esm_import$29$__["useWallet"])();
    const [client, setClient] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [blockchainService, setBlockchainService] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // Initialize Sui client
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const suiClient = new __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$sui$2e$js$2f$client__$5b$external$5d$__$2840$mysten$2f$sui$2e$js$2f$client$2c$__esm_import$29$__["SuiClient"]({
            url: 'https://fullnode.mainnet.sui.io' // or 'https://fullnode.testnet.sui.io' for testnet
        });
        setClient(suiClient);
    }, []);
    // Initialize blockchain service when wallet is connected
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (connected && client && wallet) {
            const service = new __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$blockchainService$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["BlockchainService"](client, wallet);
            setBlockchainService(service);
        } else {
            setBlockchainService(null);
        }
    }, [
        connected,
        client,
        wallet
    ]);
    // Create a new event
    const createEvent = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async (eventData)=>{
        if (!blockchainService) {
            setError('Wallet not connected');
            return {
                success: false,
                error: 'Wallet not connected'
            };
        }
        setLoading(true);
        setError(null);
        try {
            const result = await blockchainService.createEvent(eventData);
            setLoading(false);
            return result;
        } catch (err) {
            setLoading(false);
            setError(err.message);
            return {
                success: false,
                error: err.message
            };
        }
    }, [
        blockchainService
    ]);
    // Purchase a ticket
    const purchaseTicket = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async (eventId, paymentAmount)=>{
        if (!blockchainService) {
            setError('Wallet not connected');
            return {
                success: false,
                error: 'Wallet not connected'
            };
        }
        setLoading(true);
        setError(null);
        try {
            const result = await blockchainService.purchaseTicket(eventId, paymentAmount);
            setLoading(false);
            return result;
        } catch (err) {
            setLoading(false);
            setError(err.message);
            return {
                success: false,
                error: err.message
            };
        }
    }, [
        blockchainService
    ]);
    // Transfer a ticket
    const transferTicket = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async (ticketId, recipientAddress)=>{
        if (!blockchainService) {
            setError('Wallet not connected');
            return {
                success: false,
                error: 'Wallet not connected'
            };
        }
        setLoading(true);
        setError(null);
        try {
            const result = await blockchainService.transferTicket(ticketId, recipientAddress);
            setLoading(false);
            return result;
        } catch (err) {
            setLoading(false);
            setError(err.message);
            return {
                success: false,
                error: err.message
            };
        }
    }, [
        blockchainService
    ]);
    // Get user's tickets
    const getUserTickets = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async ()=>{
        if (!blockchainService || !account) {
            return {
                success: false,
                error: 'Wallet not connected'
            };
        }
        try {
            const result = await blockchainService.getUserTickets(account.address);
            return result;
        } catch (err) {
            setError(err.message);
            return {
                success: false,
                error: err.message
            };
        }
    }, [
        blockchainService,
        account
    ]);
    // Get event details
    const getEventDetails = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async (eventId)=>{
        if (!blockchainService) {
            return {
                success: false,
                error: 'Wallet not connected'
            };
        }
        try {
            const result = await blockchainService.getEventDetails(eventId);
            return result;
        } catch (err) {
            setError(err.message);
            return {
                success: false,
                error: err.message
            };
        }
    }, [
        blockchainService
    ]);
    // Get all events
    const getAllEvents = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async ()=>{
        if (!blockchainService) {
            return {
                success: false,
                error: 'Wallet not connected'
            };
        }
        try {
            const result = await blockchainService.getAllEvents();
            return result;
        } catch (err) {
            setError(err.message);
            return {
                success: false,
                error: err.message
            };
        }
    }, [
        blockchainService
    ]);
    // Clear error
    const clearError = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        setError(null);
    }, []);
    return {
        // State
        connected,
        account,
        loading,
        error,
        // Blockchain functions
        createEvent,
        purchaseTicket,
        transferTicket,
        getUserTickets,
        getEventDetails,
        getAllEvents,
        // Utility functions
        clearError
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/WalletConnectModal.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": ()=>WalletConnectModal
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$suiet$2f$wallet$2d$kit__$5b$external$5d$__$2840$suiet$2f$wallet$2d$kit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@suiet/wallet-kit [external] (@suiet/wallet-kit, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$suiet$2f$wallet$2d$kit__$5b$external$5d$__$2840$suiet$2f$wallet$2d$kit$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$suiet$2f$wallet$2d$kit__$5b$external$5d$__$2840$suiet$2f$wallet$2d$kit$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function WalletConnectModal({ isOpen, onClose, onConnect }) {
    const { wallets, select, connecting } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$suiet$2f$wallet$2d$kit__$5b$external$5d$__$2840$suiet$2f$wallet$2d$kit$2c$__esm_import$29$__["useWallet"])();
    const handleWalletSelect = async (wallet)=>{
        try {
            await select(wallet.name);
            onConnect();
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg p-6 max-w-md w-full mx-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-gray-800 font-domine",
                            children: "Connect Wallet"
                        }, void 0, false, {
                            fileName: "[project]/components/WalletConnectModal.js",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-gray-500 hover:text-gray-700",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M6 18L18 6M6 6l12 12"
                                }, void 0, false, {
                                    fileName: "[project]/components/WalletConnectModal.js",
                                    lineNumber: 27,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/WalletConnectModal.js",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/WalletConnectModal.js",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/WalletConnectModal.js",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: wallets.map((wallet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleWalletSelect(wallet),
                            disabled: connecting,
                            className: "w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#D84040] hover:bg-gray-50 transition-colors disabled:opacity-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-3",
                                    children: [
                                        wallet.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: wallet.icon,
                                            alt: wallet.name,
                                            className: "w-8 h-8"
                                        }, void 0, false, {
                                            fileName: "[project]/components/WalletConnectModal.js",
                                            lineNumber: 42,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-800 font-domine",
                                            children: wallet.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/WalletConnectModal.js",
                                            lineNumber: 44,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/WalletConnectModal.js",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 text-gray-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M9 5l7 7-7 7"
                                    }, void 0, false, {
                                        fileName: "[project]/components/WalletConnectModal.js",
                                        lineNumber: 47,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/WalletConnectModal.js",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, wallet.name, true, {
                            fileName: "[project]/components/WalletConnectModal.js",
                            lineNumber: 34,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/WalletConnectModal.js",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mt-6 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-600 font-domine",
                        children: "By connecting your wallet, you agree to our Terms of Service and Privacy Policy."
                    }, void 0, false, {
                        fileName: "[project]/components/WalletConnectModal.js",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/WalletConnectModal.js",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/WalletConnectModal.js",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/WalletConnectModal.js",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/index.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": ()=>Home
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_1efb88a8$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/chonburi_1efb88a8.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_ac069135$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/domine_ac069135.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$wallet$2f$useWallet$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/wallet/useWallet.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBlockchain$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useBlockchain.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletConnectModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WalletConnectModal.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBlockchain$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletConnectModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBlockchain$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletConnectModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
function Home() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [showEvents, setShowEvents] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [showWalletModal, setShowWalletModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const { address, isConnected, signAndExecuteTransactionBlock } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$wallet$2f$useWallet$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useWalletInfo"])();
    const { connected, account, loading, error, purchaseTicket, getUserTickets, clearError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useBlockchain$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useBlockchain"])();
    // Update login state when wallet connects
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (connected && account) {
            setIsLoggedIn(true);
        } else if (!connected) {
            setIsLoggedIn(false);
        }
    }, [
        connected,
        account
    ]);
    // Sample events data
    const sampleEvents = [
        {
            id: 1,
            name: "Taylor Swift - The Eras Tour",
            date: "2024-12-15",
            venue: "MetLife Stadium",
            price: "$150",
            image: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2181107453-20241209114519432.jpg?q=w_3000,c_fill"
        },
        {
            id: 2,
            name: "Ed Sheeran Live in Concert",
            date: "2024-11-20",
            venue: "Madison Square Garden",
            price: "$120",
            image: "https://www.billboard.com/wp-content/uploads/2023/09/ed-sheeran-wiltern-2023-billboard-1548.jpg?v=2"
        },
        {
            id: 3,
            name: "NBA Finals Game 7",
            date: "2024-06-15",
            venue: "Chase Center",
            price: "$200",
            image: "https://i.ytimg.com/vi/pX___DCt-6g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAz22YiPPDDDQc0ADmQ6r-oNyz5iQ"
        },
        {
            id: 4,
            name: "Comic Con 2024",
            date: "2024-07-25",
            venue: "Convention Center",
            price: "$80",
            image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhsyC2agb1zZw6MVnRCLoS4iN6wlNWcfE0WUXFgW-U8IUttGujWsixC4Tw2YRJ9OyV4JxWMnmiBcmf5IfkCnsVqCTps7jkj2KxH0zgk6bDXPOhBj0-ztrQMmXPg8TDAkRTlWvGwXggsaSiDgXpfykA1smOhBOhRa6UeVMO9xKj9gFd13pHIoE5os2xxYfn0/w640-h250/Infinite%20KL2025%20-%20Banner.jpg"
        }
    ];
    const handleSearch = (e)=>{
        setSearchQuery(e.target.value);
        setShowEvents(e.target.value.length > 0);
    };
    const handleConnectWallet = ()=>{
        setShowWalletModal(true);
    };
    const handleWalletConnect = (account)=>{
        setIsLoggedIn(true);
        setShowWalletModal(false);
    };
    const handleCloseModal = ()=>{
        setShowWalletModal(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "jsx-84351487d9fcac90" + " " + `${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_1efb88a8$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].variable} ${__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_ac069135$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].variable} min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF]`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: "jsx-84351487d9fcac90" + " " + "bg-white shadow-lg border-b-2 border-[#D84040] animate-fade-in",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-84351487d9fcac90" + " " + "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-84351487d9fcac90" + " " + "flex justify-between items-center h-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-84351487d9fcac90" + " " + "flex items-center space-x-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-84351487d9fcac90" + " " + "w-10 h-10 bg-[#D84040] rounded-full flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "jsx-84351487d9fcac90" + " " + "text-white font-bold text-xl font-chonburi",
                                            children: "R"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-2xl font-bold text-[#D84040] font-chonburi",
                                        children: "RedMoo"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 113,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                                className: "jsx-84351487d9fcac90" + " " + "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-gray-700 hover:text-[#D84040] font-medium transition-all duration-200 font-domine hover:scale-110 transform",
                                        children: "Home"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-gray-700 hover:text-[#D84040] font-medium transition-all duration-200 font-domine hover:scale-110 transform",
                                        children: "Buy"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-gray-700 hover:text-[#D84040] font-medium transition-all duration-200 font-domine hover:scale-110 transform",
                                        children: "Sell"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 124,
                                        columnNumber: 15
                                    }, this),
                                    isLoggedIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-gray-700 hover:text-[#D84040] font-medium transition-all duration-200 font-domine hover:scale-110 transform",
                                        children: "My Tickets"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 128,
                                        columnNumber: 17
                                    }, this),
                                    !isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: handleConnectWallet,
                                        className: "jsx-84351487d9fcac90" + " " + "bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] transition-all duration-200 font-medium font-domine hover:scale-110 transform hover:shadow-lg",
                                        children: "Connect Wallet"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 133,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-84351487d9fcac90" + " " + "flex items-center space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "jsx-84351487d9fcac90" + " " + "text-sm text-gray-600 font-domine",
                                                children: account ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}` : 'Connected'
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 141,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                // Disconnect functionality will be handled by the wallet provider
                                                },
                                                className: "jsx-84351487d9fcac90" + " " + "text-gray-700 hover:text-[#D84040] font-medium transition-all duration-200 font-domine hover:scale-110 transform",
                                                children: "Disconnect"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 144,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 140,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 106,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WalletConnectModal$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: showWalletModal,
                onClose: handleCloseModal,
                onConnect: handleWalletConnect
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-84351487d9fcac90" + " " + "fixed top-20 right-4 z-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-84351487d9fcac90" + " " + "bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg shadow-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-84351487d9fcac90" + " " + "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                className: "jsx-84351487d9fcac90" + " " + "h-4 w-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                                    className: "jsx-84351487d9fcac90"
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 172,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 171,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "jsx-84351487d9fcac90" + " " + "text-sm font-domine",
                                children: "Connected to Sui"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 174,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 170,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 169,
                    columnNumber: 19
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 168,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-84351487d9fcac90" + " " + "fixed top-20 right-4 z-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-84351487d9fcac90" + " " + "bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-84351487d9fcac90" + " " + "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "jsx-84351487d9fcac90" + " " + "text-sm font-domine",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 185,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: clearError,
                                className: "jsx-84351487d9fcac90" + " " + "ml-2 text-red-500 hover:text-red-700",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 186,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 184,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 183,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 182,
                columnNumber: 9
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-84351487d9fcac90" + " " + "fixed top-20 right-4 z-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-84351487d9fcac90" + " " + "bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded-lg shadow-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-84351487d9fcac90" + " " + "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-84351487d9fcac90" + " " + "animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 202,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "jsx-84351487d9fcac90" + " " + "text-sm font-domine",
                                children: "Processing..."
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 203,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 201,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 200,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 199,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "jsx-84351487d9fcac90" + " " + "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-84351487d9fcac90" + " " + "text-center mb-8 animate-fade-in-up",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                className: "jsx-84351487d9fcac90" + " " + "text-5xl md:text-6xl font-bold text-[#A31D1D] mb-6 font-chonburi",
                                children: [
                                    "Buy your ticket",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-[#D84040]",
                                        children: " Now"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 214,
                                        columnNumber: 28
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "jsx-84351487d9fcac90" + " " + "text-xl text-gray-600 mb-8 max-w-3xl mx-auto font-domine",
                                children: "Buy and sell verified tickets here. No scams, No PDFs, just you and your wallet."
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            animationDelay: '0.1s'
                        },
                        className: "jsx-84351487d9fcac90" + " " + "text-center mb-8 animate-fade-in-up",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-84351487d9fcac90" + " " + "max-w-4xl mx-auto",
                            children: [
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search for your favourite event.",
                                    value: searchQuery,
                                    onChange: handleSearch,
                                    className: "jsx-84351487d9fcac90" + " " + "w-full px-6 py-4 rounded-full bg-white text-[#D84040] font-domine focus:outline-none focus:ring-2 focus:ring-[#D84040] focus:ring-opacity-50 placeholder-[#A31D1D] shadow-lg border-2 border-[#D84040]"
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 224,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/index.js",
                            lineNumber: 223,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    showEvents && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            animationDelay: '0.2s'
                        },
                        className: "jsx-84351487d9fcac90" + " " + "mb-16 animate-fade-in-up",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "jsx-84351487d9fcac90" + " " + "text-3xl font-bold text-center text-[#A31D1D] mb-8 font-chonburi",
                                children: "Available Events"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 238,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-84351487d9fcac90" + " " + "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
                                children: sampleEvents.map((event, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        style: {
                                            animationDelay: `${0.3 + index * 0.1}s`
                                        },
                                        className: "jsx-84351487d9fcac90" + " " + "bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up flex flex-col h-full transform hover:-translate-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-84351487d9fcac90" + " " + "mb-4 text-center flex-shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: event.image,
                                                    alt: event.name,
                                                    className: "jsx-84351487d9fcac90" + " " + "w-full h-32 object-cover rounded-lg shadow-sm"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.js",
                                                    lineNumber: 249,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 248,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-84351487d9fcac90" + " " + "flex-grow",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-84351487d9fcac90" + " " + "text-lg font-semibold text-gray-800 mb-2 font-domine line-clamp-2",
                                                        children: event.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.js",
                                                        lineNumber: 256,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "jsx-84351487d9fcac90" + " " + "space-y-1 mb-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "jsx-84351487d9fcac90" + " " + "text-gray-600 text-sm font-domine flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        viewBox: "0 0 24 24",
                                                                        className: "jsx-84351487d9fcac90" + " " + "w-4 h-4 mr-2 text-[#D84040]",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                                                strokeLinecap: "round",
                                                                                strokeLinejoin: "round",
                                                                                strokeWidth: 2,
                                                                                d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                                                                                className: "jsx-84351487d9fcac90"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/index.js",
                                                                                lineNumber: 260,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                                                strokeLinecap: "round",
                                                                                strokeLinejoin: "round",
                                                                                strokeWidth: 2,
                                                                                d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                                                                                className: "jsx-84351487d9fcac90"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/index.js",
                                                                                lineNumber: 261,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/index.js",
                                                                        lineNumber: 259,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    event.venue
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/index.js",
                                                                lineNumber: 258,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "jsx-84351487d9fcac90" + " " + "text-gray-600 text-sm font-domine flex items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        viewBox: "0 0 24 24",
                                                                        className: "jsx-84351487d9fcac90" + " " + "w-4 h-4 mr-2 text-[#D84040]",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                                                                            className: "jsx-84351487d9fcac90"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/index.js",
                                                                            lineNumber: 267,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/index.js",
                                                                        lineNumber: 266,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    event.date
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/index.js",
                                                                lineNumber: 265,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/index.js",
                                                        lineNumber: 257,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 255,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-84351487d9fcac90" + " " + "flex justify-between items-center mt-auto pt-4 border-t border-gray-100",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-84351487d9fcac90" + " " + "text-[#D84040] font-bold text-lg font-domine",
                                                        children: event.price
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.js",
                                                        lineNumber: 274,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>router.push(`/event/${event.id}`),
                                                        className: "jsx-84351487d9fcac90" + " " + "bg-[#D84040] text-white px-4 py-2 rounded-full hover:bg-[#A31D1D] transition-colors font-medium text-sm font-domine",
                                                        children: "View Details"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/index.js",
                                                        lineNumber: 275,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 273,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, event.id, true, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 243,
                                        columnNumber: 34
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 241,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 237,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-84351487d9fcac90" + " " + "grid md:grid-cols-3 gap-8 mb-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    animationDelay: '0.2s'
                                },
                                className: "jsx-84351487d9fcac90" + " " + "bg-white p-6 rounded-lg shadow-md text-center animate-fade-in-up",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-84351487d9fcac90" + " " + "w-16 h-16 bg-[#ECDCBF] rounded-full flex items-center justify-center mx-auto mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            className: "jsx-84351487d9fcac90" + " " + "w-8 h-8 text-[#D84040]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                                                className: "jsx-84351487d9fcac90"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 293,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 292,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-xl font-semibold text-gray-800 mb-2 font-domine",
                                        children: "Secure Transactions"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 296,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-gray-600 font-domine",
                                        children: "All transactions are secured with blockchain technology and zkLogin authentication."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 297,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    animationDelay: '0.3s'
                                },
                                className: "jsx-84351487d9fcac90" + " " + "bg-white p-6 rounded-lg shadow-md text-center animate-fade-in-up",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-84351487d9fcac90" + " " + "w-16 h-16 bg-[#ECDCBF] rounded-full flex items-center justify-center mx-auto mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            className: "jsx-84351487d9fcac90" + " " + "w-8 h-8 text-[#D84040]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
                                                className: "jsx-84351487d9fcac90"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 303,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 302,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 301,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-xl font-semibold text-gray-800 mb-2 font-domine",
                                        children: "Fair Pricing"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 306,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-gray-600 font-domine",
                                        children: "Tickets can only be sold at original prices. No price gouging allowed."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 307,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    animationDelay: '0.4s'
                                },
                                className: "jsx-84351487d9fcac90" + " " + "bg-white p-6 rounded-lg shadow-md text-center animate-fade-in-up",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-84351487d9fcac90" + " " + "w-16 h-16 bg-[#ECDCBF] rounded-full flex items-center justify-center mx-auto mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            className: "jsx-84351487d9fcac90" + " " + "w-8 h-8 text-[#D84040]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                                                className: "jsx-84351487d9fcac90"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 312,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 311,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-xl font-semibold text-gray-800 mb-2 font-domine",
                                        children: "Gift Tickets"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 316,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-gray-600 font-domine",
                                        children: "Send tickets as gifts to friends and family with just a few clicks."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            animationDelay: '0.5s'
                        },
                        className: "jsx-84351487d9fcac90" + " " + "bg-white rounded-lg shadow-md p-8 mb-16 animate-fade-in-up",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "jsx-84351487d9fcac90" + " " + "text-3xl font-bold text-center text-[#A31D1D] mb-8 font-chonburi",
                                children: "How It Works"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 323,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-84351487d9fcac90" + " " + "grid md:grid-cols-4 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-84351487d9fcac90" + " " + "w-12 h-12 bg-[#D84040] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg font-domine",
                                                children: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 326,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                className: "jsx-84351487d9fcac90" + " " + "font-semibold text-gray-800 mb-2 font-domine",
                                                children: "Sign Up"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 327,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "jsx-84351487d9fcac90" + " " + "text-gray-600 text-sm font-domine",
                                                children: "Create your account with zkLogin for seamless authentication"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 328,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 325,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-84351487d9fcac90" + " " + "w-12 h-12 bg-[#D84040] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg font-domine",
                                                children: "2"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 331,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                className: "jsx-84351487d9fcac90" + " " + "font-semibold text-gray-800 mb-2 font-domine",
                                                children: "Browse Tickets"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 332,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "jsx-84351487d9fcac90" + " " + "text-gray-600 text-sm font-domine",
                                                children: "Find the tickets you want from our secure marketplace"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 333,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 330,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-84351487d9fcac90" + " " + "w-12 h-12 bg-[#D84040] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg font-domine",
                                                children: "3"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 336,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                className: "jsx-84351487d9fcac90" + " " + "font-semibold text-gray-800 mb-2 font-domine",
                                                children: "Purchase"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 337,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "jsx-84351487d9fcac90" + " " + "text-gray-600 text-sm font-domine",
                                                children: "Buy tickets with your Sui wallet, up to 4 tickets per wallet"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 338,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 335,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-84351487d9fcac90" + " " + "w-12 h-12 bg-[#D84040] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg font-domine",
                                                children: "4"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 341,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                className: "jsx-84351487d9fcac90" + " " + "font-semibold text-gray-800 mb-2 font-domine",
                                                children: "Enjoy"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 342,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "jsx-84351487d9fcac90" + " " + "text-gray-600 text-sm font-domine",
                                                children: "Receive your NFT ticket and enjoy your event!"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 343,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 340,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 324,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                style: {
                    animationDelay: '0.8s'
                },
                className: "jsx-84351487d9fcac90" + " " + "bg-gray-800 text-white mt-16 animate-fade-in-up",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-84351487d9fcac90" + " " + "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-84351487d9fcac90" + " " + "grid md:grid-cols-4 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-84351487d9fcac90",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-84351487d9fcac90" + " " + "flex items-center space-x-3 mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-84351487d9fcac90" + " " + "w-8 h-8 bg-[#D84040] rounded-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "jsx-84351487d9fcac90" + " " + "text-white font-bold text-sm font-chonburi",
                                                    children: "R"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/index.js",
                                                    lineNumber: 357,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 356,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "jsx-84351487d9fcac90" + " " + "text-xl font-bold font-chonburi",
                                                children: "RedMoo"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 359,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 355,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-gray-300 mb-4 font-domine",
                                        children: "Your trusted platform for secure ticket reselling with blockchain technology."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 361,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-sm text-gray-400 font-domine",
                                        children: "© 2025 RedMoo. All rights reserved."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 364,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 354,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-84351487d9fcac90",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-lg font-semibold mb-4 font-domine",
                                        children: "Our Partners"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 371,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                        className: "jsx-84351487d9fcac90" + " " + "space-y-2 text-gray-300 font-domine",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-84351487d9fcac90",
                                                children: "Event Organizers"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 373,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-84351487d9fcac90",
                                                children: "Blockchain Partners"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 374,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-84351487d9fcac90",
                                                children: "Payment Processors"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 375,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-84351487d9fcac90",
                                                children: "Security Providers"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 376,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 372,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 370,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-84351487d9fcac90",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-lg font-semibold mb-4 font-domine",
                                        children: "About Us"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 382,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                        className: "jsx-84351487d9fcac90" + " " + "space-y-2 text-gray-300 font-domine",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-84351487d9fcac90",
                                                children: "Our Mission"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 384,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-84351487d9fcac90",
                                                children: "Team"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 385,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-84351487d9fcac90",
                                                children: "Careers"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 386,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-84351487d9fcac90",
                                                children: "Press"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 387,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 383,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 381,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-84351487d9fcac90",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "jsx-84351487d9fcac90" + " " + "text-lg font-semibold mb-4 font-domine",
                                        children: "Contact Us"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 393,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                        className: "jsx-84351487d9fcac90" + " " + "space-y-2 text-gray-300 font-domine",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-84351487d9fcac90",
                                                children: "Support"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 395,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-84351487d9fcac90",
                                                children: "Sales"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 396,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-84351487d9fcac90",
                                                children: "Partnerships"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 397,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                className: "jsx-84351487d9fcac90",
                                                children: "Legal"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 398,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 394,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 392,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 352,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/index.js",
                    lineNumber: 351,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 350,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "84351487d9fcac90",
                children: "@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeInUp{0%{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}.animate-fade-in.jsx-84351487d9fcac90{animation:.8s ease-out fadeIn}.animate-fade-in-up.jsx-84351487d9fcac90{opacity:0;animation:.8s ease-out forwards fadeInUp}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__f1867d23._.js.map