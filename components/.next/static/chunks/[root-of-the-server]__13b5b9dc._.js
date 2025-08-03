(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s({
    "connect": ()=>connect,
    "setHooks": ()=>setHooks,
    "subscribeToUpdate": ()=>subscribeToUpdate
});
function connect(param) {
    let { addMessageListener, sendMessage, onUpdateError = console.error } = param;
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: (param)=>{
            let [chunkPath, callback] = param;
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        var _updateA_modules;
        const deletedModules = new Set((_updateA_modules = updateA.modules) !== null && _updateA_modules !== void 0 ? _updateA_modules : []);
        var _updateB_modules;
        const addedModules = new Set((_updateB_modules = updateB.modules) !== null && _updateB_modules !== void 0 ? _updateB_modules : []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        var _updateA_added, _updateB_added;
        const added = new Set([
            ...(_updateA_added = updateA.added) !== null && _updateA_added !== void 0 ? _updateA_added : [],
            ...(_updateB_added = updateB.added) !== null && _updateB_added !== void 0 ? _updateB_added : []
        ]);
        var _updateA_deleted, _updateB_deleted;
        const deleted = new Set([
            ...(_updateA_deleted = updateA.deleted) !== null && _updateA_deleted !== void 0 ? _updateA_deleted : [],
            ...(_updateB_deleted = updateB.deleted) !== null && _updateB_deleted !== void 0 ? _updateB_deleted : []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        var _updateA_modules1, _updateB_added1;
        const modules = new Set([
            ...(_updateA_modules1 = updateA.modules) !== null && _updateA_modules1 !== void 0 ? _updateA_modules1 : [],
            ...(_updateB_added1 = updateB.added) !== null && _updateB_added1 !== void 0 ? _updateB_added1 : []
        ]);
        var _updateB_deleted1;
        for (const moduleId of (_updateB_deleted1 = updateB.deleted) !== null && _updateB_deleted1 !== void 0 ? _updateB_deleted1 : []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        var _updateB_modules1;
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set((_updateB_modules1 = updateB.modules) !== null && _updateB_modules1 !== void 0 ? _updateB_modules1 : []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error("Invariant: ".concat(message));
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/wallet/useWallet.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "contractUtils": ()=>contractUtils,
    "debugWalletConnection": ()=>debugWalletConnection,
    "default": ()=>__TURBOPACK__default__export__,
    "fixCorruptedWalletData": ()=>fixCorruptedWalletData,
    "forceClearWalletData": ()=>forceClearWalletData,
    "suiClient": ()=>suiClient,
    "useSuiWallet": ()=>useSuiWallet
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wallet$2d$standard$2f$app$2f$lib$2f$esm$2f$wallets$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@wallet-standard/app/lib/esm/wallets.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/sui.js/dist/esm/client/client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$network$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/sui.js/dist/esm/client/network.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$TransactionBlock$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/sui.js/dist/esm/builder/TransactionBlock.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
// Sui devnet configuration
const SUI_DEVNET_RPC = 'https://fullnode.devnet.sui.io:443';
const SUI_DEVNET_FAUCET = 'https://faucet.devnet.sui.io/gas';
const suiClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiClient"]({
    url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$network$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFullnodeUrl"])('devnet')
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
    _s();
    const [wallets, setWallets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentWallet, setCurrentWallet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentAccount, setCurrentAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isConnecting, setIsConnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [balance, setBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('0');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [justConnected, setJustConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [skipConnectionCheck, setSkipConnectionCheck] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initialize wallets
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSuiWallet.useEffect": ()=>{
            const initializeWallets = {
                "useSuiWallet.useEffect.initializeWallets": ()=>{
                    const availableWallets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wallet$2d$standard$2f$app$2f$lib$2f$esm$2f$wallets$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getWallets"])().get();
                    setWallets(availableWallets);
                }
            }["useSuiWallet.useEffect.initializeWallets"];
            initializeWallets();
            // Listen for wallet changes
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wallet$2d$standard$2f$app$2f$lib$2f$esm$2f$wallets$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getWallets"])().on('change', {
                "useSuiWallet.useEffect.unsubscribe": (wallets)=>{
                    setWallets(wallets);
                }
            }["useSuiWallet.useEffect.unsubscribe"]);
            return ({
                "useSuiWallet.useEffect": ()=>unsubscribe()
            })["useSuiWallet.useEffect"];
        }
    }["useSuiWallet.useEffect"], []);
    // Disconnect wallet (defined early to avoid dependency issues)
    const disconnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSuiWallet.useCallback[disconnect]": async ()=>{
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
        }
    }["useSuiWallet.useCallback[disconnect]"], [
        currentWallet
    ]);
    // Check existing connection on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSuiWallet.useEffect": ()=>{
            const checkConnection = {
                "useSuiWallet.useEffect.checkConnection": async ()=>{
                    try {
                        // Don't check connection if we just connected or if disabled
                        if (justConnected || skipConnectionCheck) {
                            console.log('⏭️ Skipping connection check - just connected or disabled');
                            if (justConnected) setJustConnected(false);
                            return;
                        }
                        console.log('🔍 Checking existing connection...');
                        // Add small delay to prevent race conditions during navigation
                        await new Promise({
                            "useSuiWallet.useEffect.checkConnection": (resolve)=>setTimeout(resolve, 100)
                        }["useSuiWallet.useEffect.checkConnection"]);
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
                            const wallet = wallets.find({
                                "useSuiWallet.useEffect.checkConnection.wallet": (w)=>w.name === savedWalletName
                            }["useSuiWallet.useEffect.checkConnection.wallet"]);
                            console.log('🔍 Found wallet:', wallet === null || wallet === void 0 ? void 0 : wallet.name);
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
                }
            }["useSuiWallet.useEffect.checkConnection"];
            if (wallets.length > 0) {
                checkConnection();
            }
        }
    }["useSuiWallet.useEffect"], [
        wallets,
        justConnected,
        skipConnectionCheck,
        disconnect
    ]);
    // Fetch balance for current account
    const fetchBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSuiWallet.useCallback[fetchBalance]": async (address)=>{
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
        }
    }["useSuiWallet.useCallback[fetchBalance]"], [
        disconnect
    ]);
    // Connect to wallet
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSuiWallet.useCallback[connect]": async (wallet)=>{
            console.log('🔗 Attempting to connect wallet:', wallet === null || wallet === void 0 ? void 0 : wallet.name);
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
                    throw new Error("Wallet ".concat(wallet.name, " does not support standard connection"));
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
                        throw new Error("Invalid address received from wallet: ".concat(account.address));
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
                    errorMessage = "Wallet ".concat(wallet.name, " is not properly installed or initialized");
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
        }
    }["useSuiWallet.useCallback[connect]"], [
        isConnecting,
        fetchBalance
    ]);
    // Execute transaction
    const executeTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSuiWallet.useCallback[executeTransaction]": async (transaction)=>{
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
        }
    }["useSuiWallet.useCallback[executeTransaction]"], [
        currentWallet,
        currentAccount,
        isConnected,
        fetchBalance
    ]);
    // Request funds from faucet (devnet only)
    const requestFaucetFunds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSuiWallet.useCallback[requestFaucetFunds]": async ()=>{
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
                setTimeout({
                    "useSuiWallet.useCallback[requestFaucetFunds]": ()=>{
                        fetchBalance(currentAccount.address);
                    }
                }["useSuiWallet.useCallback[requestFaucetFunds]"], 3000);
                return true;
            } catch (error) {
                console.error('Error requesting faucet funds:', error);
                throw error;
            }
        }
    }["useSuiWallet.useCallback[requestFaucetFunds]"], [
        currentAccount,
        fetchBalance
    ]);
    // Get formatted balance in SUI
    const getFormattedBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSuiWallet.useCallback[getFormattedBalance]": ()=>{
            const suiBalance = parseInt(balance) / 1_000_000_000; // Convert MIST to SUI
            return suiBalance.toFixed(2);
        }
    }["useSuiWallet.useCallback[getFormattedBalance]"], [
        balance
    ]);
    // Check if balance is sufficient for transaction
    const hasSufficientBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSuiWallet.useCallback[hasSufficientBalance]": (requiredAmount)=>{
            const currentBalance = parseInt(balance);
            const required = parseInt(requiredAmount);
            return currentBalance >= required;
        }
    }["useSuiWallet.useCallback[hasSufficientBalance]"], [
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
_s(useSuiWallet, "ZGMkWWvENGeCJhGviBx2U5P0LCM=");
const debugWalletConnection = ()=>{
    console.log('🔍 === WALLET DEBUG INFO ===');
    console.log('Available wallets:', (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wallet$2d$standard$2f$app$2f$lib$2f$esm$2f$wallets$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getWallets"])().get());
    console.log('Local storage data:', {
        connected_wallet: localStorage.getItem('connected_wallet'),
        wallet_account: localStorage.getItem('wallet_account'),
        walletConnected: localStorage.getItem('walletConnected'),
        walletAddress: localStorage.getItem('walletAddress')
    });
    const wallets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wallet$2d$standard$2f$app$2f$lib$2f$esm$2f$wallets$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getWallets"])().get();
    wallets.forEach((wallet)=>{
        console.log("Wallet ".concat(wallet.name, ":"), {
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
if ("TURBOPACK compile-time truthy", 1) {
    window.debugWalletConnection = debugWalletConnection;
    window.forceClearWalletData = forceClearWalletData;
    window.fixCorruptedWalletData = fixCorruptedWalletData;
}
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
        return "".concat(address.slice(0, 6), "...").concat(address.slice(-4));
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
        return "".concat(String.fromCharCode(64 + row)).concat(seat);
    },
    // Create purchase transaction
    createPurchaseTransaction: (params)=>{
        const { eventObjectId, walletTrackerObjectId, suiAmount, seatId, seatType, imageUrl, metadataUrl, clockObjectId, packageId } = params;
        const tx = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$TransactionBlock$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TransactionBlock"]();
        // Split SUI from gas coin for payment
        const [coin] = tx.splitCoins(tx.gas, [
            tx.pure(suiAmount)
        ]);
        // Call the purchase_ticket function
        tx.moveCall({
            target: "".concat(packageId, "::ticket_nft::purchase_ticket"),
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/pages/connect-wallet.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ConnectWallet
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$wallet$2f$useWallet$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/wallet/useWallet.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
function Toast(param) {
    let { message, type, onClose } = param;
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            if (!message) return;
            const timer = setTimeout(onClose, 3000);
            return ({
                "Toast.useEffect": ()=>clearTimeout(timer)
            })["Toast.useEffect"];
        }
    }["Toast.useEffect"], [
        message,
        onClose
    ]);
    if (!message) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white font-bold ".concat(type === "error" ? "bg-red-600" : "bg-green-600"),
        children: message
    }, void 0, false, {
        fileName: "[project]/pages/connect-wallet.js",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_s(Toast, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Toast;
function ConnectWallet() {
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { wallets, currentWallet, isConnected, isConnecting, balance, error, connect, requestFaucetFunds, getFormattedBalance } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$wallet$2f$useWallet$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSuiWallet"])();
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedWallet, setSelectedWallet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [localError, setLocalError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        message: "",
        type: "success"
    });
    const [requestingFaucet, setRequestingFaucet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const connectBtnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConnectWallet.useEffect": ()=>{
            // If already connected, redirect to profile
            if (isConnected) {
                router.replace('/profile');
            }
        }
    }["ConnectWallet.useEffect"], [
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
        var _e_preventDefault;
        e === null || e === void 0 ? void 0 : (_e_preventDefault = e.preventDefault) === null || _e_preventDefault === void 0 ? void 0 : _e_preventDefault.call(e);
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
                    message: "Connected to ".concat(selectedWallet.name),
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
            const errorMsg = "Failed to connect: " + ((err === null || err === void 0 ? void 0 : err.message) || err);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConnectWallet.useEffect": ()=>{
            if (!showModal) return;
            const onKeyDown = {
                "ConnectWallet.useEffect.onKeyDown": (e)=>{
                    if (e.key === "Escape") setShowModal(false);
                }
            }["ConnectWallet.useEffect.onKeyDown"];
            window.addEventListener("keydown", onKeyDown);
            return ({
                "ConnectWallet.useEffect": ()=>window.removeEventListener("keydown", onKeyDown)
            })["ConnectWallet.useEffect"];
        }
    }["ConnectWallet.useEffect"], [
        showModal
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-b647ad7f1d82c4dd" + " " + "flex items-center justify-center h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toast, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-b647ad7f1d82c4dd" + " " + "bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "jsx-b647ad7f1d82c4dd" + " " + "text-3xl font-bold text-[#A31D1D] mb-4 font-chonburi",
                        children: "Connect Your Wallet"
                    }, void 0, false, {
                        fileName: "[project]/pages/connect-wallet.js",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "jsx-b647ad7f1d82c4dd" + " " + "text-gray-700 font-domine mb-4",
                        children: "Click below to connect your Sui wallet."
                    }, void 0, false, {
                        fileName: "[project]/pages/connect-wallet.js",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-b647ad7f1d82c4dd" + " " + "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleOpenModal,
                                className: "jsx-b647ad7f1d82c4dd" + " " + "bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] transition-all duration-200 font-medium font-domine hover:scale-110 transform hover:shadow-lg",
                                children: "Connect Wallet"
                            }, void 0, false, {
                                fileName: "[project]/pages/connect-wallet.js",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-b647ad7f1d82c4dd" + " " + "bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-b647ad7f1d82c4dd" + " " + "flex items-center mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-b647ad7f1d82c4dd" + " " + "w-2 h-2 bg-blue-500 rounded-full mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/connect-wallet.js",
                                                lineNumber: 133,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    (error || localError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-b647ad7f1d82c4dd" + " " + "text-red-600 mb-2 text-center",
                        children: error || localError
                    }, void 0, false, {
                        fileName: "[project]/pages/connect-wallet.js",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this),
                    showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-b647ad7f1d82c4dd" + " " + "fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            tabIndex: -1,
                            "aria-modal": "true",
                            role: "dialog",
                            className: "jsx-b647ad7f1d82c4dd" + " " + "bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl relative focus:outline-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowModal(false),
                                    "aria-label": "Close",
                                    className: "jsx-b647ad7f1d82c4dd" + " " + "absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/pages/connect-wallet.js",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-b647ad7f1d82c4dd" + " " + "text-xl font-bold mb-4",
                                    children: "Select Wallet"
                                }, void 0, false, {
                                    fileName: "[project]/pages/connect-wallet.js",
                                    lineNumber: 163,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-b647ad7f1d82c4dd" + " " + "mb-4 flex flex-col items-center",
                                    children: [
                                        wallets.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-b647ad7f1d82c4dd" + " " + "text-gray-500 mb-2 text-center",
                                            children: [
                                                "No Sui wallets detected.",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                    className: "jsx-b647ad7f1d82c4dd"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/connect-wallet.js",
                                                    lineNumber: 167,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                                        wallets.map((wallet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleSelectWallet(wallet),
                                                tabIndex: 0,
                                                "aria-pressed": (selectedWallet === null || selectedWallet === void 0 ? void 0 : selectedWallet.name) === wallet.name,
                                                className: "jsx-b647ad7f1d82c4dd" + " " + "flex items-center px-4 py-2 mb-2 rounded border w-full justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#D84040] ".concat((selectedWallet === null || selectedWallet === void 0 ? void 0 : selectedWallet.name) === wallet.name ? "border-[#D84040] bg-[#F8F2DE]" : "border-gray-200"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: wallet.icon,
                                                        alt: wallet.name,
                                                        className: "jsx-b647ad7f1d82c4dd" + " " + "w-6 h-6 mr-2 rounded-full"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/connect-wallet.js",
                                                        lineNumber: 183,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleConnect,
                                    disabled: !selectedWallet || isConnecting,
                                    ref: connectBtnRef,
                                    "aria-busy": isConnecting,
                                    className: "jsx-b647ad7f1d82c4dd" + " " + "bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] transition-all duration-200 font-medium font-domine hover:scale-110 transform hover:shadow-lg w-full flex items-center justify-center",
                                    children: [
                                        isConnecting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            className: "jsx-b647ad7f1d82c4dd" + " " + "animate-spin h-5 w-5 mr-2 text-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                                (error || localError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "b647ad7f1d82c4dd",
                children: "@media (max-width:600px){.max-w-lg.jsx-b647ad7f1d82c4dd,.max-w-md.jsx-b647ad7f1d82c4dd{max-width:98vw!important}.p-8.jsx-b647ad7f1d82c4dd{padding:1.5rem!important}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/connect-wallet.js",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_s1(ConnectWallet, "vYJVPxvWvngFhvuxlZcSnXj8NBs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$wallet$2f$useWallet$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSuiWallet"]
    ];
});
_c1 = ConnectWallet;
var _c, _c1;
__turbopack_context__.k.register(_c, "Toast");
__turbopack_context__.k.register(_c1, "ConnectWallet");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/connect-wallet.js [client] (ecmascript)\" } [client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/connect-wallet";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/connect-wallet.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/connect-wallet\" }": ((__turbopack_context__) => {
"use strict";

var { m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/connect-wallet.js [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__13b5b9dc._.js.map