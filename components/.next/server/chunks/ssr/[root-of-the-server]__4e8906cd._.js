module.exports = {

"[externals]/@mysten/wallet-standard [external] (@mysten/wallet-standard, esm_import)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@mysten/wallet-standard");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@mysten/sui.js/client [external] (@mysten/sui.js/client, esm_import)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@mysten/sui.js/client");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@mysten/sui.js/transactions [external] (@mysten/sui.js/transactions, esm_import)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@mysten/sui.js/transactions");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/wallet/useWallet.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "contractUtils": ()=>contractUtils,
    "debugWalletConnection": ()=>debugWalletConnection,
    "default": ()=>__TURBOPACK__default__export__,
    "fixCorruptedWalletData": ()=>fixCorruptedWalletData,
    "forceClearWalletData": ()=>forceClearWalletData,
    "suiClient": ()=>suiClient,
    "useSuiWallet": ()=>useSuiWallet
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$wallet$2d$standard__$5b$external$5d$__$2840$mysten$2f$wallet$2d$standard$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@mysten/wallet-standard [external] (@mysten/wallet-standard, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$sui$2e$js$2f$client__$5b$external$5d$__$2840$mysten$2f$sui$2e$js$2f$client$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@mysten/sui.js/client [external] (@mysten/sui.js/client, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$sui$2e$js$2f$transactions__$5b$external$5d$__$2840$mysten$2f$sui$2e$js$2f$transactions$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@mysten/sui.js/transactions [external] (@mysten/sui.js/transactions, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$wallet$2d$standard__$5b$external$5d$__$2840$mysten$2f$wallet$2d$standard$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$sui$2e$js$2f$client__$5b$external$5d$__$2840$mysten$2f$sui$2e$js$2f$client$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$sui$2e$js$2f$transactions__$5b$external$5d$__$2840$mysten$2f$sui$2e$js$2f$transactions$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$wallet$2d$standard__$5b$external$5d$__$2840$mysten$2f$wallet$2d$standard$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$sui$2e$js$2f$client__$5b$external$5d$__$2840$mysten$2f$sui$2e$js$2f$client$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$sui$2e$js$2f$transactions__$5b$external$5d$__$2840$mysten$2f$sui$2e$js$2f$transactions$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
// Sui devnet configuration
const SUI_DEVNET_RPC = 'https://fullnode.devnet.sui.io:443';
const SUI_DEVNET_FAUCET = 'https://faucet.devnet.sui.io/gas';
const suiClient = new __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$sui$2e$js$2f$client__$5b$external$5d$__$2840$mysten$2f$sui$2e$js$2f$client$2c$__esm_import$29$__["SuiClient"]({
    url: (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$sui$2e$js$2f$client__$5b$external$5d$__$2840$mysten$2f$sui$2e$js$2f$client$2c$__esm_import$29$__["getFullnodeUrl"])('devnet')
});
// Utility function to validate Sui address format
function isValidSuiAddress(address) {
    console.log('🔍 Validating address:', address);
    if (!address || typeof address !== 'string') {
        console.log('❌ Address validation failed: not a string or empty');
        return false;
    }
    // Remove '0x' prefix if present
    const cleanAddress = address.startsWith('0x') ? address.slice(2) : address;
    console.log('🧹 Clean address:', cleanAddress, 'Length:', cleanAddress.length);
    // Sui addresses should be 64 characters of hex (32 bytes)
    if (cleanAddress.length !== 64) {
        console.log('❌ Address validation failed: wrong length', cleanAddress.length, 'expected 64');
        return false;
    }
    // Check if it's valid hex
    const isValidHex = /^[0-9a-fA-F]+$/.test(cleanAddress);
    console.log('🔢 Hex validation:', isValidHex);
    if (!isValidHex) {
        console.log('❌ Address validation failed: invalid hex characters');
        return false;
    }
    console.log('✅ Address validation passed');
    return true;
}
function useSuiWallet() {
    const [wallets, setWallets] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [currentWallet, setCurrentWallet] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [currentAccount, setCurrentAccount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [isConnecting, setIsConnecting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [balance, setBalance] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('0');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [justConnected, setJustConnected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [skipConnectionCheck, setSkipConnectionCheck] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Initialize wallets
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const initializeWallets = ()=>{
            const availableWallets = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$wallet$2d$standard__$5b$external$5d$__$2840$mysten$2f$wallet$2d$standard$2c$__esm_import$29$__["getWallets"])().get();
            setWallets(availableWallets);
        };
        initializeWallets();
        // Listen for wallet changes
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$wallet$2d$standard__$5b$external$5d$__$2840$mysten$2f$wallet$2d$standard$2c$__esm_import$29$__["getWallets"])().on('change', (wallets)=>{
            setWallets(wallets);
        });
        return ()=>unsubscribe();
    }, []);
    // Disconnect wallet (defined early to avoid dependency issues)
    const disconnect = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async ()=>{
        try {
            if (currentWallet && currentWallet.features['standard:disconnect']) {
                await currentWallet.features['standard:disconnect'].disconnect();
            }
        } catch (error) {
            console.error('Error disconnecting wallet:', error);
        } finally{
            setCurrentWallet(null);
            setCurrentAccount(null);
            setIsConnected(false);
            setBalance('0');
            setError(null);
            setJustConnected(false);
            setSkipConnectionCheck(false);
            // Clear localStorage
            localStorage.removeItem('connected_wallet');
            localStorage.removeItem('wallet_account');
            localStorage.removeItem('walletConnected');
            localStorage.removeItem('walletAddress');
            // Dispatch storage event
            window.dispatchEvent(new Event('storage'));
        }
    }, [
        currentWallet
    ]);
    // Check existing connection on mount
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const checkConnection = async ()=>{
            try {
                // Don't check connection if we just connected or if disabled
                if (justConnected || skipConnectionCheck) {
                    console.log('⏭️ Skipping connection check - just connected or disabled');
                    if (justConnected) setJustConnected(false);
                    return;
                }
                console.log('🔍 Checking existing connection...');
                // Add small delay to prevent race conditions during navigation
                await new Promise((resolve)=>setTimeout(resolve, 100));
                // TEMPORARY: Clear any potentially corrupted data on startup
                const allStorageData = {
                    connected_wallet: localStorage.getItem('connected_wallet'),
                    wallet_account: localStorage.getItem('wallet_account'),
                    walletConnected: localStorage.getItem('walletConnected'),
                    walletAddress: localStorage.getItem('walletAddress')
                };
                console.log('📋 All localStorage data on startup:', allStorageData);
                const savedWalletName = localStorage.getItem('connected_wallet');
                const savedAccount = localStorage.getItem('wallet_account');
                console.log('📋 Saved wallet name:', savedWalletName);
                console.log('📋 Saved account (raw):', savedAccount);
                if (savedWalletName && savedAccount) {
                    const wallet = wallets.find((w)=>w.name === savedWalletName);
                    console.log('🔍 Found wallet:', wallet?.name);
                    // Check for corrupted account data (empty object)
                    if (savedAccount === '{}') {
                        console.warn('🧹 Found corrupted account data (empty object), clearing...');
                        disconnect();
                        return;
                    }
                    if (wallet) {
                        const accountData = JSON.parse(savedAccount);
                        console.log('📋 Parsed account data:', accountData);
                        console.log('📋 Account data keys:', Object.keys(accountData));
                        // Validate address format before proceeding
                        console.log('🔍 About to validate saved address:', accountData.address);
                        if (!accountData.address) {
                            console.warn('❌ No address found in localStorage, clearing connection');
                            disconnect();
                            return;
                        }
                        if (!isValidSuiAddress(accountData.address)) {
                            console.warn('❌ Invalid Sui address format found in localStorage, clearing connection');
                            disconnect();
                            return;
                        }
                        // Reconstruct the account object with proper format
                        const restoredAccount = {
                            address: accountData.address,
                            publicKey: accountData.publicKey ? new Uint8Array(accountData.publicKey) : null,
                            chains: accountData.chains || [],
                            features: accountData.features || []
                        };
                        console.log('✅ Address validation passed, restoring connection');
                        console.log('🔄 Restored account:', restoredAccount);
                        setCurrentWallet(wallet);
                        setCurrentAccount(restoredAccount);
                        setIsConnected(true);
                        await fetchBalance(accountData.address);
                    }
                } else {
                    console.log('ℹ️ No saved connection found');
                }
            } catch (error) {
                console.error('❌ Error checking existing connection:', error);
                disconnect();
            }
        };
        if (wallets.length > 0) {
            checkConnection();
        }
    }, [
        wallets,
        justConnected,
        skipConnectionCheck,
        disconnect
    ]);
    // Fetch balance for current account
    const fetchBalance = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async (address)=>{
        try {
            // Validate address before making the API call
            if (!address || !isValidSuiAddress(address)) {
                console.warn('Invalid address provided to fetchBalance:', address);
                setBalance('0');
                return;
            }
            const balanceData = await suiClient.getBalance({
                owner: address,
                coinType: '0x2::sui::SUI'
            });
            setBalance(balanceData.totalBalance);
        } catch (error) {
            console.error('Error fetching balance:', error);
            setBalance('0');
            // If it's an invalid address error, clear the connection
            if (error.message && error.message.includes('Invalid Sui address')) {
                console.warn('Invalid Sui address detected, disconnecting wallet');
                disconnect();
            }
        }
    }, [
        disconnect
    ]);
    // Connect to wallet
    const connect = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async (wallet)=>{
        console.log('🔗 Attempting to connect wallet:', wallet?.name);
        if (!wallet) {
            console.error('❌ No wallet provided to connect function');
            setError('No wallet provided');
            return false;
        }
        if (isConnecting) {
            console.log('⏳ Already connecting, skipping...');
            return false;
        }
        setIsConnecting(true);
        setError(null);
        setSkipConnectionCheck(true); // Disable connection checking during connection
        try {
            console.log('📋 Wallet features available:', Object.keys(wallet.features || {}));
            // Check if wallet has the required connection feature
            if (!wallet.features || !wallet.features['standard:connect']) {
                throw new Error(`Wallet ${wallet.name} does not support standard connection`);
            }
            console.log('🚀 Calling wallet connect...');
            const result = await wallet.features['standard:connect'].connect();
            console.log('📥 Connection result:', result);
            if (result.accounts && result.accounts.length > 0) {
                const account = result.accounts[0];
                console.log('✅ Account received:', {
                    address: account.address,
                    publicKey: account.publicKey
                });
                console.log('🔍 Full account object:', account);
                console.log('🔍 Account object keys:', Object.keys(account));
                console.log('🔍 JSON.stringify test:', JSON.stringify(account));
                // Validate the account address
                if (!account.address || !isValidSuiAddress(account.address)) {
                    throw new Error(`Invalid address received from wallet: ${account.address}`);
                }
                setCurrentWallet(wallet);
                setCurrentAccount(account);
                setIsConnected(true);
                // Create a serializable account object with only the essential properties
                const serializableAccount = {
                    address: account.address,
                    publicKey: account.publicKey ? Array.from(account.publicKey) : null,
                    chains: account.chains || [],
                    features: account.features || []
                };
                console.log('📦 Serializable account:', serializableAccount);
                // Save to localStorage
                localStorage.setItem('connected_wallet', wallet.name);
                localStorage.setItem('wallet_account', JSON.stringify(serializableAccount));
                localStorage.setItem('walletConnected', 'true');
                localStorage.setItem('walletAddress', account.address);
                console.log('💾 Wallet data saved to localStorage');
                // Verify data was saved correctly
                const verification = {
                    connected_wallet: localStorage.getItem('connected_wallet'),
                    wallet_account: localStorage.getItem('wallet_account'),
                    walletConnected: localStorage.getItem('walletConnected'),
                    walletAddress: localStorage.getItem('walletAddress')
                };
                console.log('📋 Saved data verification:', verification);
                // Fetch balance
                console.log('💰 Fetching balance...');
                await fetchBalance(account.address);
                // Dispatch storage event for other components
                window.dispatchEvent(new Event('storage'));
                console.log('🎉 Wallet connected successfully!');
                setJustConnected(true);
                setSkipConnectionCheck(false); // Re-enable connection checking
                return true;
            } else {
                console.error('❌ No accounts in connection result:', result);
                throw new Error('No accounts returned from wallet');
            }
        } catch (error) {
            console.error('❌ Wallet connection failed:', error);
            // More specific error messages
            let errorMessage = 'Failed to connect wallet';
            if (error.message.includes('User rejected')) {
                errorMessage = 'Connection was cancelled by user';
            } else if (error.message.includes('not found') || error.message.includes('undefined')) {
                errorMessage = `Wallet ${wallet.name} is not properly installed or initialized`;
            } else if (error.message.includes('Invalid address')) {
                errorMessage = 'Wallet returned an invalid address format';
            } else if (error.message) {
                errorMessage = error.message;
            }
            setError(errorMessage);
            return false;
        } finally{
            setIsConnecting(false);
            setSkipConnectionCheck(false); // Re-enable connection checking even on failure
            console.log('🔓 Connection attempt finished');
        }
    }, [
        isConnecting,
        fetchBalance
    ]);
    // Execute transaction
    const executeTransaction = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async (transaction)=>{
        if (!currentWallet || !currentAccount || !isConnected) {
            throw new Error('Wallet not connected');
        }
        try {
            const result = await currentWallet.features['sui:signAndExecuteTransaction'].signAndExecuteTransaction({
                transaction,
                account: currentAccount,
                chain: 'sui:devnet'
            });
            // Refresh balance after transaction
            if (currentAccount) {
                await fetchBalance(currentAccount.address);
            }
            return result;
        } catch (error) {
            console.error('Error executing transaction:', error);
            throw error;
        }
    }, [
        currentWallet,
        currentAccount,
        isConnected,
        fetchBalance
    ]);
    // Request funds from faucet (devnet only)
    const requestFaucetFunds = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async ()=>{
        if (!currentAccount) {
            throw new Error('No account connected');
        }
        try {
            const response = await fetch(SUI_DEVNET_FAUCET, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    FixedAmountRequest: {
                        recipient: currentAccount.address
                    }
                })
            });
            if (!response.ok) {
                throw new Error('Failed to request faucet funds');
            }
            // Wait a bit for the transaction to be processed
            setTimeout(()=>{
                fetchBalance(currentAccount.address);
            }, 3000);
            return true;
        } catch (error) {
            console.error('Error requesting faucet funds:', error);
            throw error;
        }
    }, [
        currentAccount,
        fetchBalance
    ]);
    // Get formatted balance in SUI
    const getFormattedBalance = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        const suiBalance = parseInt(balance) / 1_000_000_000; // Convert MIST to SUI
        return suiBalance.toFixed(2);
    }, [
        balance
    ]);
    // Check if balance is sufficient for transaction
    const hasSufficientBalance = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((requiredAmount)=>{
        const currentBalance = parseInt(balance);
        const required = parseInt(requiredAmount);
        return currentBalance >= required;
    }, [
        balance
    ]);
    return {
        // State
        wallets,
        currentWallet,
        currentAccount,
        isConnected,
        isConnecting,
        balance,
        error,
        // Actions
        connect,
        disconnect,
        executeTransaction,
        requestFaucetFunds,
        fetchBalance,
        // Utilities
        getFormattedBalance,
        hasSufficientBalance,
        // Client
        suiClient
    };
}
const debugWalletConnection = ()=>{
    console.log('🔍 === WALLET DEBUG INFO ===');
    console.log('Available wallets:', (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$wallet$2d$standard__$5b$external$5d$__$2840$mysten$2f$wallet$2d$standard$2c$__esm_import$29$__["getWallets"])().get());
    console.log('Local storage data:', {
        connected_wallet: localStorage.getItem('connected_wallet'),
        wallet_account: localStorage.getItem('wallet_account'),
        walletConnected: localStorage.getItem('walletConnected'),
        walletAddress: localStorage.getItem('walletAddress')
    });
    const wallets = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$wallet$2d$standard__$5b$external$5d$__$2840$mysten$2f$wallet$2d$standard$2c$__esm_import$29$__["getWallets"])().get();
    wallets.forEach((wallet)=>{
        console.log(`Wallet ${wallet.name}:`, {
            features: Object.keys(wallet.features || {}),
            hasStandardConnect: !!(wallet.features && wallet.features['standard:connect']),
            version: wallet.version
        });
    });
    console.log('🔍 === END DEBUG INFO ===');
};
const forceClearWalletData = ()=>{
    console.log('🧹 Force clearing all wallet data...');
    localStorage.removeItem('connected_wallet');
    localStorage.removeItem('wallet_account');
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
    // Also clear any other potential wallet-related keys
    const keysToRemove = [];
    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        if (key && (key.includes('wallet') || key.includes('Wallet') || key.includes('sui') || key.includes('Sui'))) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach((key)=>{
        console.log('🧹 Removing key:', key);
        localStorage.removeItem(key);
    });
    window.dispatchEvent(new Event('storage'));
    console.log('✅ All wallet data cleared');
    window.location.reload();
};
const fixCorruptedWalletData = ()=>{
    console.log('🔧 Checking for corrupted wallet data...');
    const savedAccount = localStorage.getItem('wallet_account');
    if (savedAccount === '{}') {
        console.log('🧹 Found corrupted account data, clearing...');
        forceClearWalletData();
    } else {
        console.log('✅ No corrupted data found');
    }
};
// Make debug functions available globally for manual testing
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const contractUtils = {
    // Convert SUI to MIST
    suiToMist: (suiAmount)=>{
        return Math.floor(parseFloat(suiAmount) * 1_000_000_000);
    },
    // Convert MIST to SUI
    mistToSui: (mistAmount)=>{
        return parseInt(mistAmount) / 1_000_000_000;
    },
    // Format address for display
    formatAddress: (address)=>{
        if (!address || !isValidSuiAddress(address)) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    },
    // Clear wallet data from localStorage
    clearWalletData: ()=>{
        localStorage.removeItem('connected_wallet');
        localStorage.removeItem('wallet_account');
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletAddress');
        window.dispatchEvent(new Event('storage'));
    },
    // Generate seat ID string
    generateSeatId: (row, seat)=>{
        return `${String.fromCharCode(64 + row)}${seat}`;
    },
    // Create purchase transaction
    createPurchaseTransaction: (params)=>{
        const { eventObjectId, walletTrackerObjectId, suiAmount, seatId, seatType, imageUrl, metadataUrl, clockObjectId, packageId } = params;
        const tx = new __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$sui$2e$js$2f$transactions__$5b$external$5d$__$2840$mysten$2f$sui$2e$js$2f$transactions$2c$__esm_import$29$__["TransactionBlock"]();
        // Split SUI from gas coin for payment
        const [coin] = tx.splitCoins(tx.gas, [
            tx.pure(suiAmount)
        ]);
        // Call the purchase_ticket function
        tx.moveCall({
            target: `${packageId}::ticket_nft::purchase_ticket`,
            arguments: [
                tx.object(eventObjectId),
                tx.object(walletTrackerObjectId),
                coin,
                tx.pure(seatId),
                tx.pure(seatType),
                tx.pure(imageUrl),
                tx.pure(metadataUrl),
                tx.object(clockObjectId)
            ]
        });
        return tx;
    }
};
const __TURBOPACK__default__export__ = useSuiWallet;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/connect-wallet.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": ()=>ConnectWallet
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$wallet$2f$useWallet$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/wallet/useWallet.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$wallet$2f$useWallet$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$wallet$2f$useWallet$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
function Toast({ message, type, onClose }) {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!message) return;
        const timer = setTimeout(onClose, 3000);
        return ()=>clearTimeout(timer);
    }, [
        message,
        onClose
    ]);
    if (!message) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white font-bold ${type === "error" ? "bg-red-600" : "bg-green-600"}`,
        children: message
    }, void 0, false, {
        fileName: "[project]/pages/connect-wallet.js",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
function ConnectWallet() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { wallets, currentWallet, isConnected, isConnecting, balance, error, connect, requestFaucetFunds, getFormattedBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$wallet$2f$useWallet$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useSuiWallet"])();
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [selectedWallet, setSelectedWallet] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [localError, setLocalError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        message: "",
        type: "success"
    });
    const [requestingFaucet, setRequestingFaucet] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const connectBtnRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // If already connected, redirect to profile
        if (isConnected) {
            router.replace('/profile');
        }
    }, [
        isConnected,
        router
    ]);
    const handleOpenModal = ()=>{
        setShowModal(true);
        setSelectedWallet(null);
        setLocalError("");
    };
    const handleSelectWallet = (wallet)=>{
        setSelectedWallet(wallet);
        setLocalError("");
    };
    const handleConnect = async (e)=>{
        e?.preventDefault?.();
        setLocalError("");
        if (!selectedWallet) {
            setLocalError("Please select a wallet.");
            return;
        }
        console.log('🖱️ Connect button clicked, selected wallet:', selectedWallet.name);
        try {
            const success = await connect(selectedWallet);
            console.log('📊 Connection result:', success);
            if (success) {
                setShowModal(false);
                setToast({
                    message: `Connected to ${selectedWallet.name}`,
                    type: "success"
                });
                setTimeout(()=>router.replace("/profile"), 500);
            } else {
                // If connection failed but no error was thrown
                const errorMsg = error || "Connection failed - please try again";
                setLocalError(errorMsg);
                setToast({
                    message: errorMsg,
                    type: "error"
                });
                console.log('❌ Connection failed silently:', errorMsg);
            }
        } catch (err) {
            console.error('💥 Connection error caught:', err);
            const errorMsg = "Failed to connect: " + (err?.message || err);
            setLocalError(errorMsg);
            setToast({
                message: "Failed to connect",
                type: "error"
            });
        }
    };
    const handleRequestFaucet = async ()=>{
        if (!isConnected) return;
        setRequestingFaucet(true);
        try {
            await requestFaucetFunds();
            setToast({
                message: "Faucet request sent! Funds will appear shortly.",
                type: "success"
            });
        } catch (err) {
            setToast({
                message: "Failed to request faucet funds",
                type: "error"
            });
        } finally{
            setRequestingFaucet(false);
        }
    };
    // Accessibility: close modal on Escape
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!showModal) return;
        const onKeyDown = (e)=>{
            if (e.key === "Escape") setShowModal(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        showModal
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "jsx-b647ad7f1d82c4dd" + " " + "flex items-center justify-center h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Toast, {
                message: toast.message,
                type: toast.type,
                onClose: ()=>setToast({
                        message: "",
                        type: "success"
                    })
            }, void 0, false, {
                fileName: "[project]/pages/connect-wallet.js",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-b647ad7f1d82c4dd" + " " + "bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "jsx-b647ad7f1d82c4dd" + " " + "text-3xl font-bold text-[#A31D1D] mb-4 font-chonburi",
                        children: "Connect Your Wallet"
                    }, void 0, false, {
                        fileName: "[project]/pages/connect-wallet.js",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "jsx-b647ad7f1d82c4dd" + " " + "text-gray-700 font-domine mb-4",
                        children: "Click below to connect your Sui wallet."
                    }, void 0, false, {
                        fileName: "[project]/pages/connect-wallet.js",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-b647ad7f1d82c4dd" + " " + "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleOpenModal,
                                className: "jsx-b647ad7f1d82c4dd" + " " + "bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] transition-all duration-200 font-medium font-domine hover:scale-110 transform hover:shadow-lg",
                                children: "Connect Wallet"
                            }, void 0, false, {
                                fileName: "[project]/pages/connect-wallet.js",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-b647ad7f1d82c4dd" + " " + "bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-b647ad7f1d82c4dd" + " " + "flex items-center mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-b647ad7f1d82c4dd" + " " + "w-2 h-2 bg-blue-500 rounded-full mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/connect-wallet.js",
                                                lineNumber: 133,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "jsx-b647ad7f1d82c4dd" + " " + "font-semibold text-blue-800",
                                                children: "Devnet Mode"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/connect-wallet.js",
                                                lineNumber: 134,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/connect-wallet.js",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-b647ad7f1d82c4dd" + " " + "text-blue-700",
                                        children: "This dApp operates on Sui Devnet. You can get free test SUI from the faucet after connecting your wallet."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/connect-wallet.js",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/connect-wallet.js",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/connect-wallet.js",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    (error || localError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-b647ad7f1d82c4dd" + " " + "text-red-600 mb-2 text-center",
                        children: error || localError
                    }, void 0, false, {
                        fileName: "[project]/pages/connect-wallet.js",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this),
                    showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-b647ad7f1d82c4dd" + " " + "fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            tabIndex: -1,
                            "aria-modal": "true",
                            role: "dialog",
                            className: "jsx-b647ad7f1d82c4dd" + " " + "bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl relative focus:outline-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowModal(false),
                                    "aria-label": "Close",
                                    className: "jsx-b647ad7f1d82c4dd" + " " + "absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/pages/connect-wallet.js",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "jsx-b647ad7f1d82c4dd" + " " + "text-xl font-bold mb-4",
                                    children: "Select Wallet"
                                }, void 0, false, {
                                    fileName: "[project]/pages/connect-wallet.js",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-b647ad7f1d82c4dd" + " " + "mb-4 flex flex-col items-center",
                                    children: [
                                        wallets.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-b647ad7f1d82c4dd" + " " + "text-gray-500 mb-2 text-center",
                                            children: [
                                                "No Sui wallets detected.",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {
                                                    className: "jsx-b647ad7f1d82c4dd"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/connect-wallet.js",
                                                    lineNumber: 167,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                    href: "https://suiet.app/",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "jsx-b647ad7f1d82c4dd" + " " + "text-[#D84040] underline",
                                                    children: "Install Suiet"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/connect-wallet.js",
                                                    lineNumber: 168,
                                                    columnNumber: 21
                                                }, this),
                                                " or ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                    href: "https://wallet.sui.io/",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "jsx-b647ad7f1d82c4dd" + " " + "text-[#D84040] underline",
                                                    children: "Sui Wallet"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/connect-wallet.js",
                                                    lineNumber: 168,
                                                    columnNumber: 150
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/connect-wallet.js",
                                            lineNumber: 166,
                                            columnNumber: 19
                                        }, this),
                                        wallets.map((wallet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleSelectWallet(wallet),
                                                tabIndex: 0,
                                                "aria-pressed": selectedWallet?.name === wallet.name,
                                                className: "jsx-b647ad7f1d82c4dd" + " " + `flex items-center px-4 py-2 mb-2 rounded border w-full justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#D84040] ${selectedWallet?.name === wallet.name ? "border-[#D84040] bg-[#F8F2DE]" : "border-gray-200"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                        src: wallet.icon,
                                                        alt: wallet.name,
                                                        className: "jsx-b647ad7f1d82c4dd" + " " + "w-6 h-6 mr-2 rounded-full"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/connect-wallet.js",
                                                        lineNumber: 183,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-b647ad7f1d82c4dd" + " " + "font-domine",
                                                        children: wallet.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/connect-wallet.js",
                                                        lineNumber: 188,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, wallet.name, true, {
                                                fileName: "[project]/pages/connect-wallet.js",
                                                lineNumber: 172,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/connect-wallet.js",
                                    lineNumber: 164,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: handleConnect,
                                    disabled: !selectedWallet || isConnecting,
                                    ref: connectBtnRef,
                                    "aria-busy": isConnecting,
                                    className: "jsx-b647ad7f1d82c4dd" + " " + "bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] transition-all duration-200 font-medium font-domine hover:scale-110 transform hover:shadow-lg w-full flex items-center justify-center",
                                    children: [
                                        isConnecting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            className: "jsx-b647ad7f1d82c4dd" + " " + "animate-spin h-5 w-5 mr-2 text-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("circle", {
                                                    cx: "12",
                                                    cy: "12",
                                                    r: "10",
                                                    stroke: "currentColor",
                                                    strokeWidth: "4",
                                                    className: "jsx-b647ad7f1d82c4dd" + " " + "opacity-25"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/connect-wallet.js",
                                                    lineNumber: 200,
                                                    columnNumber: 140
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                    fill: "currentColor",
                                                    d: "M4 12a8 8 0 018-8v8z",
                                                    className: "jsx-b647ad7f1d82c4dd" + " " + "opacity-75"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/connect-wallet.js",
                                                    lineNumber: 200,
                                                    columnNumber: 241
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/connect-wallet.js",
                                            lineNumber: 200,
                                            columnNumber: 19
                                        }, this),
                                        "Connect"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/connect-wallet.js",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, this),
                                (error || localError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-b647ad7f1d82c4dd" + " " + "text-red-600 mt-2 text-center",
                                    children: error || localError
                                }, void 0, false, {
                                    fileName: "[project]/pages/connect-wallet.js",
                                    lineNumber: 205,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/connect-wallet.js",
                            lineNumber: 150,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/connect-wallet.js",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/connect-wallet.js",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "b647ad7f1d82c4dd",
                children: "@media (width<=600px){.max-w-lg.jsx-b647ad7f1d82c4dd,.max-w-md.jsx-b647ad7f1d82c4dd{max-width:98vw!important}.p-8.jsx-b647ad7f1d82c4dd{padding:1.5rem!important}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/connect-wallet.js",
        lineNumber: 115,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__4e8906cd._.js.map