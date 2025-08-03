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
"[next]/internal/font/google/chonburi_e3ef587b.module.css [client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "chonburi_e3ef587b-module__XVV82q__className",
  "variable": "chonburi_e3ef587b-module__XVV82q__variable",
});
}),
"[next]/internal/font/google/chonburi_e3ef587b.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_e3ef587b$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/chonburi_e3ef587b.module.css [client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_e3ef587b$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Chonburi', 'Chonburi Fallback'",
        fontWeight: 400,
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_e3ef587b$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_e3ef587b$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[next]/internal/font/google/domine_7c9ac7c3.module.css [client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "className": "domine_7c9ac7c3-module__cEgCVW__className",
  "variable": "domine_7c9ac7c3-module__cEgCVW__variable",
});
}),
"[next]/internal/font/google/domine_7c9ac7c3.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_7c9ac7c3$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[next]/internal/font/google/domine_7c9ac7c3.module.css [client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_7c9ac7c3$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Domine', 'Domine Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_7c9ac7c3$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_7c9ac7c3$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}),
"[project]/pages/profile.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Profile
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$wallet$2f$useWallet$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/wallet/useWallet.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_e3ef587b$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/chonburi_e3ef587b.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_7c9ac7c3$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[next]/internal/font/google/domine_7c9ac7c3.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
// NFT Ticket Card Component
function TicketCard(param) {
    let { ticket } = param;
    const formatDate = (timestamp)=>{
        return new Date(parseInt(timestamp)).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const formatTime = (timestamp)=>{
        return new Date(parseInt(timestamp)).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-48 bg-gradient-to-r from-[#D84040] to-[#A31D1D]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black bg-opacity-20"
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center text-white",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold font-chonburi mb-1",
                                    children: ticket.eventName
                                }, void 0, false, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm opacity-90 font-domine",
                                    children: "🎫 NFT TICKET 🎫"
                                }, void 0, false, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-4 right-4 rounded-full px-3 py-1 ".concat(ticket.seatType === 1 ? 'bg-yellow-400 border-2 border-yellow-600' : 'bg-blue-500 border-2 border-blue-700'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-semibold font-domine ".concat(ticket.seatType === 1 ? 'text-yellow-900' : 'text-white'),
                            children: ticket.seatType === 1 ? 'VIP' : 'STANDARD'
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/profile.js",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 font-domine",
                                        children: "Venue"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-[#A31D1D] font-domine",
                                        children: ticket.venue
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 font-domine",
                                        children: "Seat"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-[#A31D1D] font-domine",
                                        children: ticket.seatId
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 68,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 font-domine",
                                        children: "Event Date"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-[#A31D1D] font-domine",
                                        children: formatDate(ticket.eventDate)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 font-domine",
                                        children: "Price Paid"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold text-[#A31D1D] font-domine",
                                        children: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f$wallet$2f$useWallet$2e$js__$5b$client$5d$__$28$ecmascript$29$__["contractUtils"].mistToSui(ticket.pricePaid).toFixed(2),
                                            " SUI"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 79,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center pt-4 border-t border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 font-domine",
                                        children: "Purchased"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-gray-700 font-domine",
                                        children: formatDate(ticket.purchaseDate)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-[#D84040] text-white px-3 py-1 rounded text-sm font-domine hover:bg-[#A31D1D] transition-colors",
                                    children: "View Details"
                                }, void 0, false, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/profile.js",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/profile.js",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = TicketCard;
// Loading skeleton component
function TicketSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 animate-pulse",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-48 bg-gray-300"
            }, void 0, false, {
                fileName: "[project]/pages/profile.js",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 bg-gray-300 rounded mb-2"
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-4 bg-gray-300 rounded w-3/4 mb-4"
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-3 bg-gray-300 rounded mb-1"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-4 bg-gray-300 rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-3 bg-gray-300 rounded mb-1"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-4 bg-gray-300 rounded"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/profile.js",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/profile.js",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_c1 = TicketSkeleton;
const sectionContent = (active, handleLogout, handleSwitchAccount, walletInfo, tickets, loadingTickets, requestFaucet, requestingFaucet, showPurchaseSuccess, clearDemoPurchases)=>{
    if (active === "mytickets") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                showPurchaseSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-green-50 border border-green-200 rounded-lg p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-2 h-2 bg-green-500 rounded-full mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-green-800 font-domine",
                                    children: "🎉 Purchase Successful!"
                                }, void 0, false, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 131,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 129,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-green-700 text-sm font-domine mt-1",
                            children: "Your demo NFT tickets have been added to your collection. In production, these would be real blockchain NFTs!"
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 133,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/profile.js",
                    lineNumber: 128,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-bold text-[#A31D1D] font-chonburi",
                            children: "My NFT Tickets"
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 140,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-gray-600 font-domine",
                            children: [
                                tickets.length,
                                " ticket",
                                tickets.length !== 1 ? 's' : '',
                                " owned"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 141,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/profile.js",
                    lineNumber: 139,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                loadingTickets ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: Array(6).fill(0).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TicketSkeleton, {}, i, false, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 149,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/pages/profile.js",
                    lineNumber: 147,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : tickets.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
                    children: tickets.map((ticket, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TicketCard, {
                            ticket: ticket
                        }, "".concat(ticket.id, "-").concat(index), false, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 155,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/pages/profile.js",
                    lineNumber: 153,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-6xl mb-4",
                            children: "🎫"
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 160,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold text-[#A31D1D] font-chonburi mb-2",
                            children: "No Tickets Yet"
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 161,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 font-domine mb-6",
                            children: "Purchase tickets from events to see your NFT tickets here."
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 162,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>window.location.href = '/',
                            className: "bg-[#D84040] text-white px-6 py-3 rounded-full hover:bg-[#A31D1D] transition-colors font-medium font-domine",
                            children: "Browse Events"
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 165,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/profile.js",
                    lineNumber: 159,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/pages/profile.js",
            lineNumber: 125,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (active === "info") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-[#A31D1D] font-chonburi",
                    children: "Wallet Information"
                }, void 0, false, {
                    fileName: "[project]/pages/profile.js",
                    lineNumber: 180,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-50 rounded-lg p-6 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-sm font-semibold text-gray-700 font-domine mb-2",
                                    children: "Wallet Address"
                                }, void 0, false, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-lg p-3 border border-gray-200 font-mono text-sm break-all",
                                    children: walletInfo.address || 'Not connected'
                                }, void 0, false, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 183,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 font-domine mb-2",
                                            children: "Balance"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white rounded-lg p-3 border border-gray-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-bold text-[#D84040] font-domine",
                                                children: [
                                                    walletInfo.formattedBalance || '0.00',
                                                    " SUI"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/profile.js",
                                                lineNumber: 194,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 193,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-semibold text-gray-700 font-domine mb-2",
                                            children: "Network"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 201,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white rounded-lg p-3 border border-gray-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 bg-blue-500 rounded-full mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/profile.js",
                                                        lineNumber: 204,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-domine",
                                                        children: "Sui Devnet"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/profile.js",
                                                        lineNumber: 205,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/profile.js",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 200,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 190,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-4 border-t border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: requestFaucet,
                                    disabled: requestingFaucet,
                                    className: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-domine flex items-center disabled:opacity-50",
                                    children: [
                                        requestingFaucet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "animate-spin h-4 w-4 mr-2 text-white",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                    className: "opacity-25",
                                                    cx: "12",
                                                    cy: "12",
                                                    r: "10",
                                                    stroke: "currentColor",
                                                    strokeWidth: "4"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/profile.js",
                                                    lineNumber: 219,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    className: "opacity-75",
                                                    fill: "currentColor",
                                                    d: "M4 12a8 8 0 018-8v8z"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/profile.js",
                                                    lineNumber: 220,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 218,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        requestingFaucet ? 'Requesting...' : 'Request Test SUI (Faucet)'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 212,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gray-500 mt-2 font-domine",
                                    children: "Get free test SUI for development and testing purposes"
                                }, void 0, false, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 211,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/profile.js",
                    lineNumber: 182,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/pages/profile.js",
            lineNumber: 179,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (active === "settings") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-[#A31D1D] font-chonburi",
                    children: "Settings"
                }, void 0, false, {
                    fileName: "[project]/pages/profile.js",
                    lineNumber: 237,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-full bg-[#F8F2DE] text-[#A31D1D] px-6 py-4 rounded-lg font-domine font-medium hover:bg-[#ECDCBF] transition-all text-left border border-[#A31D1D]",
                            onClick: handleSwitchAccount,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: "Switch Account"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/profile.js",
                                                lineNumber: 246,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm opacity-75",
                                                children: "Connect a different wallet"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/profile.js",
                                                lineNumber: 247,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 245,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M9 5l7 7-7 7"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 250,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 249,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 244,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 240,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-full bg-red-50 text-red-700 px-6 py-4 rounded-lg font-domine font-medium hover:bg-red-100 transition-all text-left border border-red-200",
                            onClick: handleLogout,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: "Disconnect Wallet"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/profile.js",
                                                lineNumber: 261,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm opacity-75",
                                                children: "Sign out and return to homepage"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/profile.js",
                                                lineNumber: 262,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 260,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 265,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 264,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 259,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 255,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-full bg-blue-50 text-blue-700 px-6 py-4 rounded-lg font-domine font-medium hover:bg-blue-100 transition-all text-left border border-blue-200",
                            onClick: clearDemoPurchases,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: "Clear Demo Purchases"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/profile.js",
                                                lineNumber: 276,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm opacity-75",
                                                children: "Reset all demo ticket purchases for testing"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/profile.js",
                                                lineNumber: 277,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 275,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 280,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/profile.js",
                                        lineNumber: 279,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 274,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 270,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#F8F2DE] rounded-lg p-6 border border-[#D84040]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-[#A31D1D] font-domine mb-4",
                                    children: "Frequently Asked Questions"
                                }, void 0, false, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 286,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 text-sm text-[#A31D1D] font-domine",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold mb-1",
                                                    children: "How do I view my NFT tickets?"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/profile.js",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: 'Your purchased tickets will appear in the "My Tickets" section as NFTs stored in your connected wallet.'
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/profile.js",
                                                    lineNumber: 290,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 288,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold mb-1",
                                                    children: "Are tickets transferable?"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/profile.js",
                                                    lineNumber: 293,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: "Yes! Since tickets are NFTs, you can transfer them to other wallets or sell them on compatible NFT marketplaces."
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/profile.js",
                                                    lineNumber: 294,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 292,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold mb-1",
                                                    children: "Need help?"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/profile.js",
                                                    lineNumber: 297,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        "Contact our support team at ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "mailto:support@redmoo.com",
                                                            className: "text-[#D84040] underline",
                                                            children: "support@redmoo.com"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/profile.js",
                                                            lineNumber: 298,
                                                            columnNumber: 50
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/profile.js",
                                                    lineNumber: 298,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 296,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 287,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 285,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/profile.js",
                    lineNumber: 239,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/pages/profile.js",
            lineNumber: 236,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return null;
};
function Profile() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("mytickets");
    const [tickets, setTickets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingTickets, setLoadingTickets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [requestingFaucet, setRequestingFaucet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [walletLoading, setWalletLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showPurchaseSuccess, setShowPurchaseSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { isConnected, currentAccount, balance, getFormattedBalance, disconnect, suiClient, requestFaucetFunds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$wallet$2f$useWallet$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSuiWallet"])();
    // Give wallet state time to initialize before checking connection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Profile.useEffect": ()=>{
            const timer = setTimeout({
                "Profile.useEffect.timer": ()=>{
                    console.log('🔄 Wallet loading completed. Connection status:', isConnected);
                    setWalletLoading(false);
                }
            }["Profile.useEffect.timer"], 1000); // Give 1 second for wallet state to load
            return ({
                "Profile.useEffect": ()=>clearTimeout(timer)
            })["Profile.useEffect"];
        }
    }["Profile.useEffect"], [
        isConnected
    ]);
    // Check if user came from a successful purchase
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Profile.useEffect": ()=>{
            if (router.query.purchase === 'success') {
                setShowPurchaseSuccess(true);
                // Hide success message after 5 seconds
                const timer = setTimeout({
                    "Profile.useEffect.timer": ()=>{
                        setShowPurchaseSuccess(false);
                    }
                }["Profile.useEffect.timer"], 5000);
                return ({
                    "Profile.useEffect": ()=>clearTimeout(timer)
                })["Profile.useEffect"];
            }
        }
    }["Profile.useEffect"], [
        router.query
    ]);
    // Redirect if not connected (but only after wallet has had time to load)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Profile.useEffect": ()=>{
            if (!walletLoading && !isConnected) {
                console.log('🔄 Wallet not connected, redirecting to connect page...');
                router.replace('/connect-wallet');
            }
        }
    }["Profile.useEffect"], [
        isConnected,
        router,
        walletLoading
    ]);
    // Fetch NFT tickets
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Profile.useEffect": ()=>{
            const fetchTickets = {
                "Profile.useEffect.fetchTickets": async ()=>{
                    if (!currentAccount || !currentAccount.address) {
                        console.log('⚠️ No current account or address available');
                        setLoadingTickets(false);
                        return;
                    }
                    setLoadingTickets(true);
                    try {
                        console.log('🎫 Fetching tickets for address:', currentAccount.address);
                        // Validate that we have a proper address
                        if (!currentAccount.address.startsWith('0x')) {
                            throw new Error('Invalid wallet address format');
                        }
                        // Validate that suiClient is available
                        if (!suiClient) {
                            throw new Error('Sui client not available');
                        }
                        // Since the smart contract isn't deployed yet, we'll skip the actual query
                        // and use mock data for demonstration purposes
                        // TODO: Uncomment this when smart contract is deployed
                        /*
        const ownedObjects = await suiClient.getOwnedObjects({
          owner: currentAccount.address,
          filter: {
            StructType: `${PACKAGE_ID}::ticket_nft::TicketNFT`
          },
          options: {
            showContent: true,
            showType: true,
          }
        });
        */ // Read actual purchases from localStorage
                        const purchasedTickets = [];
                        const userBalance = parseInt(balance || '0');
                        console.log('💰 User balance:', userBalance, 'MIST');
                        try {
                            // Get user's actual purchases from localStorage
                            const demoPurchases = JSON.parse(localStorage.getItem('demo_purchases') || '[]');
                            console.log('📦 Raw purchases from localStorage:', demoPurchases);
                            // Filter purchases for current wallet address
                            const userPurchases = demoPurchases.filter({
                                "Profile.useEffect.fetchTickets.userPurchases": (purchase)=>purchase.walletAddress === currentAccount.address
                            }["Profile.useEffect.fetchTickets.userPurchases"]);
                            console.log('👤 Purchases for current wallet:', userPurchases);
                            // Convert purchases to ticket format
                            userPurchases.forEach({
                                "Profile.useEffect.fetchTickets": (purchase)=>{
                                    purchase.seats.forEach({
                                        "Profile.useEffect.fetchTickets": (seat, index)=>{
                                            purchasedTickets.push({
                                                id: "".concat(purchase.id, "-seat-").concat(index),
                                                eventName: purchase.eventName,
                                                venue: purchase.venue,
                                                seatId: seat.seatId,
                                                seatType: seat.seatType,
                                                eventDate: purchase.eventDate,
                                                pricePaid: (seat.price * 1000000000).toString(),
                                                purchaseDate: purchase.purchaseDate,
                                                purchaseId: purchase.id
                                            });
                                        }
                                    }["Profile.useEffect.fetchTickets"]);
                                }
                            }["Profile.useEffect.fetchTickets"]);
                            // If no actual purchases exist, show some demo tickets for testing
                            if (purchasedTickets.length === 0 && userBalance >= 0) {
                                console.log('🎪 No purchases found, showing demo tickets for testing');
                                purchasedTickets.push({
                                    id: "demo-ticket-fallback",
                                    eventName: "Welcome to RedMoo!",
                                    venue: "Demo Venue",
                                    seatId: "DEMO",
                                    seatType: 2,
                                    eventDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
                                    pricePaid: "0",
                                    purchaseDate: Date.now(),
                                    isDemoFallback: true
                                });
                            }
                        } catch (error) {
                            console.error('❌ Error reading purchases from localStorage:', error);
                        // Fallback to empty array
                        }
                        console.log('🎫 Final tickets to display:', purchasedTickets.length, purchasedTickets);
                        setTickets(purchasedTickets);
                    } catch (error) {
                        console.error("❌ Error fetching tickets:", error);
                        console.error("Error details:", {
                            message: error.message,
                            currentAccount: currentAccount,
                            balance: balance,
                            isConnected: isConnected
                        });
                        // Set empty tickets array on error
                        setTickets([]);
                    } finally{
                        setLoadingTickets(false);
                    }
                }
            }["Profile.useEffect.fetchTickets"];
            if (isConnected && currentAccount && suiClient) {
                fetchTickets();
            }
        }
    }["Profile.useEffect"], [
        currentAccount,
        isConnected,
        balance,
        suiClient
    ]);
    const handleLogout = async ()=>{
        await disconnect();
        router.push("/");
    };
    const handleSwitchAccount = ()=>{
        router.push("/connect-wallet");
    };
    const handleRequestFaucet = async ()=>{
        setRequestingFaucet(true);
        try {
            await requestFaucetFunds();
        } catch (error) {
            console.error("Failed to request faucet funds:", error);
        } finally{
            setRequestingFaucet(false);
        }
    };
    // Debug function to clear demo purchases
    const clearDemoPurchases = ()=>{
        localStorage.removeItem('demo_purchases');
        console.log('🗑️ Cleared all demo purchases');
        // Trigger storage event for other tabs/pages to refresh
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'demo_purchases',
            oldValue: localStorage.getItem('demo_purchases'),
            newValue: null,
            url: window.location.href,
            storageArea: localStorage
        }));
        alert('Demo purchases cleared! Seat availability has been reset.');
        window.location.reload();
    };
    const walletInfo = {
        address: currentAccount === null || currentAccount === void 0 ? void 0 : currentAccount.address,
        formattedBalance: getFormattedBalance()
    };
    // Show loading screen while wallet state is initializing
    if (walletLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "".concat(__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_e3ef587b$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].variable, " ").concat(__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_7c9ac7c3$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].variable, " min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] flex items-center justify-center"),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-6xl mb-4",
                        children: "⏳"
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 525,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-[#A31D1D] font-chonburi mb-2",
                        children: "Loading Profile..."
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 526,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 font-domine",
                        children: "Please wait while we load your wallet information."
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 527,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#D84040]"
                        }, void 0, false, {
                            fileName: "[project]/pages/profile.js",
                            lineNumber: 529,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 528,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/profile.js",
                lineNumber: 524,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/profile.js",
            lineNumber: 523,
            columnNumber: 7
        }, this);
    }
    // Show connecting screen if wallet state loaded but not connected
    if (!isConnected) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "".concat(__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_e3ef587b$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].variable, " ").concat(__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_7c9ac7c3$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].variable, " min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] flex items-center justify-center"),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-6xl mb-4",
                        children: "🔗"
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 541,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-[#A31D1D] font-chonburi mb-2",
                        children: "Connecting..."
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 542,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 font-domine",
                        children: "Redirecting to wallet connection page..."
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 543,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/profile.js",
                lineNumber: 540,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/profile.js",
            lineNumber: 539,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "".concat(__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$chonburi_e3ef587b$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].variable, " ").concat(__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$domine_7c9ac7c3$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].variable, " min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] py-8"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px] border border-[#F8F2DE]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-b from-[#F8F2DE] to-white p-8 lg:p-12 flex flex-row lg:flex-col gap-4 lg:w-72 border-b lg:border-b-0 lg:border-r border-[#F8F2DE]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-left px-4 py-3 rounded-lg font-domine font-medium transition-all ".concat(active === "mytickets" ? "bg-[#D84040] text-white shadow" : "text-[#A31D1D] hover:bg-[#F8F2DE]"),
                                onClick: ()=>setActive("mytickets"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mr-2",
                                            children: "🎫"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 562,
                                            columnNumber: 17
                                        }, this),
                                        "My Tickets"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 561,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 555,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-left px-4 py-3 rounded-lg font-domine font-medium transition-all ".concat(active === "info" ? "bg-[#D84040] text-white shadow" : "text-[#A31D1D] hover:bg-[#F8F2DE]"),
                                onClick: ()=>setActive("info"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mr-2",
                                            children: "💼"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 573,
                                            columnNumber: 17
                                        }, this),
                                        "Wallet Info"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 572,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 566,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-left px-4 py-3 rounded-lg font-domine font-medium transition-all ".concat(active === "settings" ? "bg-[#D84040] text-white shadow" : "text-[#A31D1D] hover:bg-[#F8F2DE]"),
                                onClick: ()=>setActive("settings"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mr-2",
                                            children: "⚙️"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/profile.js",
                                            lineNumber: 584,
                                            columnNumber: 17
                                        }, this),
                                        "Settings"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/profile.js",
                                    lineNumber: 583,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/profile.js",
                                lineNumber: 577,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 554,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 p-8 lg:p-16 bg-white",
                        children: sectionContent(active, handleLogout, handleSwitchAccount, walletInfo, tickets, loadingTickets, handleRequestFaucet, requestingFaucet, showPurchaseSuccess, clearDemoPurchases)
                    }, void 0, false, {
                        fileName: "[project]/pages/profile.js",
                        lineNumber: 591,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/profile.js",
                lineNumber: 552,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/profile.js",
            lineNumber: 551,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/profile.js",
        lineNumber: 550,
        columnNumber: 5
    }, this);
}
_s(Profile, "vxzJ4JhBYyL7tu3slM2CUtBCxmc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$wallet$2f$useWallet$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSuiWallet"]
    ];
});
_c2 = Profile;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "TicketCard");
__turbopack_context__.k.register(_c1, "TicketSkeleton");
__turbopack_context__.k.register(_c2, "Profile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/profile.js [client] (ecmascript)\" } [client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/profile";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/profile.js [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/profile\" }": ((__turbopack_context__) => {
"use strict";

var { m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/profile.js [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__8af0f586._.js.map