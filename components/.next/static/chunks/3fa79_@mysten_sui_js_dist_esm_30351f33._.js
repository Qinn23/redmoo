(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/format.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "formatAddress": ()=>formatAddress,
    "formatDigest": ()=>formatDigest
});
const ELLIPSIS = "\u2026";
function formatAddress(address) {
    if (address.length <= 6) {
        return address;
    }
    const offset = address.startsWith("0x") ? 2 : 0;
    return "0x".concat(address.slice(offset, offset + 4)).concat(ELLIPSIS).concat(address.slice(-4));
}
function formatDigest(digest) {
    return "".concat(digest.slice(0, 10)).concat(ELLIPSIS);
}
;
 //# sourceMappingURL=format.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "SUI_ADDRESS_LENGTH": ()=>SUI_ADDRESS_LENGTH,
    "isValidSuiAddress": ()=>isValidSuiAddress,
    "isValidSuiObjectId": ()=>isValidSuiObjectId,
    "isValidTransactionDigest": ()=>isValidTransactionDigest,
    "normalizeStructTag": ()=>normalizeStructTag,
    "normalizeSuiAddress": ()=>normalizeSuiAddress,
    "normalizeSuiObjectId": ()=>normalizeSuiObjectId,
    "parseStructTag": ()=>parseStructTag
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
;
const TX_DIGEST_LENGTH = 32;
function isValidTransactionDigest(value) {
    try {
        const buffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["fromB58"])(value);
        return buffer.length === TX_DIGEST_LENGTH;
    } catch (e) {
        return false;
    }
}
const SUI_ADDRESS_LENGTH = 32;
function isValidSuiAddress(value) {
    return isHex(value) && getHexByteLength(value) === SUI_ADDRESS_LENGTH;
}
function isValidSuiObjectId(value) {
    return isValidSuiAddress(value);
}
function parseTypeTag(type) {
    if (!type.includes("::")) return type;
    return parseStructTag(type);
}
function parseStructTag(type) {
    const [address, module] = type.split("::");
    const rest = type.slice(address.length + module.length + 4);
    const name = rest.includes("<") ? rest.slice(0, rest.indexOf("<")) : rest;
    const typeParams = rest.includes("<") ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["splitGenericParameters"])(rest.slice(rest.indexOf("<") + 1, rest.lastIndexOf(">"))).map((typeParam)=>parseTypeTag(typeParam.trim())) : [];
    return {
        address: normalizeSuiAddress(address),
        module,
        name,
        typeParams
    };
}
function normalizeStructTag(type) {
    const { address, module, name, typeParams } = typeof type === "string" ? parseStructTag(type) : type;
    const formattedTypeParams = typeParams.length > 0 ? "<".concat(typeParams.map((typeParam)=>typeof typeParam === "string" ? typeParam : normalizeStructTag(typeParam)).join(","), ">") : "";
    return "".concat(address, "::").concat(module, "::").concat(name).concat(formattedTypeParams);
}
function normalizeSuiAddress(value) {
    let forceAdd0x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    let address = value.toLowerCase();
    if (!forceAdd0x && address.startsWith("0x")) {
        address = address.slice(2);
    }
    return "0x".concat(address.padStart(SUI_ADDRESS_LENGTH * 2, "0"));
}
function normalizeSuiObjectId(value) {
    let forceAdd0x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    return normalizeSuiAddress(value, forceAdd0x);
}
function isHex(value) {
    return /^(0x|0X)?[a-fA-F0-9]+$/.test(value) && value.length % 2 === 0;
}
function getHexByteLength(value) {
    return /^(0x|0X)/.test(value) ? (value.length - 2) / 2 : value.length / 2;
}
;
 //# sourceMappingURL=sui-types.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/index.js [client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "MIST_PER_SUI": ()=>MIST_PER_SUI,
    "MOVE_STDLIB_ADDRESS": ()=>MOVE_STDLIB_ADDRESS,
    "SUI_CLOCK_OBJECT_ID": ()=>SUI_CLOCK_OBJECT_ID,
    "SUI_DECIMALS": ()=>SUI_DECIMALS,
    "SUI_FRAMEWORK_ADDRESS": ()=>SUI_FRAMEWORK_ADDRESS,
    "SUI_SYSTEM_ADDRESS": ()=>SUI_SYSTEM_ADDRESS,
    "SUI_SYSTEM_MODULE_NAME": ()=>SUI_SYSTEM_MODULE_NAME,
    "SUI_SYSTEM_STATE_OBJECT_ID": ()=>SUI_SYSTEM_STATE_OBJECT_ID,
    "SUI_TYPE_ARG": ()=>SUI_TYPE_ARG
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$format$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/format.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
;
;
;
;
const SUI_DECIMALS = 9;
const MIST_PER_SUI = BigInt(1e9);
const MOVE_STDLIB_ADDRESS = "0x1";
const SUI_FRAMEWORK_ADDRESS = "0x2";
const SUI_SYSTEM_ADDRESS = "0x3";
const SUI_CLOCK_OBJECT_ID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiObjectId"])("0x6");
const SUI_SYSTEM_MODULE_NAME = "sui_system";
const SUI_TYPE_ARG = "".concat(SUI_FRAMEWORK_ADDRESS, "::sui::SUI");
const SUI_SYSTEM_STATE_OBJECT_ID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiObjectId"])("0x5");
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/index.js [client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$format$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/format.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/index.js [client] (ecmascript) <locals>");
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/rpc/errors.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "RPCValidationError": ()=>RPCValidationError
});
class RPCValidationError extends Error {
    toString() {
        let str = super.toString();
        if (this.cause) {
            str += "\nCause: ".concat(this.cause);
        }
        if (this.result) {
            str += "\nReponse Received: ".concat(JSON.stringify(this.result, null, 2));
        }
        return str;
    }
    constructor(options){
        super("RPC Validation Error: The response returned from RPC server does not match the TypeScript definition. This is likely because the SDK version is not compatible with the RPC server.", {
            cause: options.cause
        });
        this.req = options.req;
        this.result = options.result;
        this.message = this.toString();
    }
}
;
 //# sourceMappingURL=errors.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/rpc/websocket-client.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "DEFAULT_CLIENT_OPTIONS": ()=>DEFAULT_CLIENT_OPTIONS,
    "WebsocketClient": ()=>WebsocketClient,
    "getWebsocketUrl": ()=>getWebsocketUrl
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$open$2d$rpc$2f$client$2d$js$2f$build$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@open-rpc/client-js/build/index.js [client] (ecmascript)");
var __accessCheck = (obj, member, msg)=>{
    if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter)=>{
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value1)=>{
    if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value1);
};
var __privateSet = (obj, member, value1, setter)=>{
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value1) : member.set(obj, value1);
    return value1;
};
var __privateWrapper = (obj, member, setter, getter)=>({
        set _ (value){
            __privateSet(obj, member, value, setter);
        },
        get _ () {
            return __privateGet(obj, member, getter);
        }
    });
var __privateMethod = (obj, member, method)=>{
    __accessCheck(obj, member, "access private method");
    return method;
};
var _client, _subscriptions, _disconnects, _setupClient, setupClient_fn, _reconnect, reconnect_fn;
;
const getWebsocketUrl = (httpUrl, port)=>{
    const url = new URL(httpUrl);
    url.protocol = url.protocol.replace("http", "ws");
    if (port) {
        url.port = port.toString();
    }
    return url.toString();
};
const DEFAULT_CLIENT_OPTIONS = {
    callTimeout: 3e4,
    reconnectTimeout: 3e3,
    maxReconnects: 5
};
class WebsocketClient {
    async request(input) {
        const client = __privateMethod(this, _setupClient, setupClient_fn).call(this);
        const id = await client.request({
            method: input.method,
            params: input.params
        }, this.options.callTimeout);
        const initialId = input.initialId || id;
        __privateGet(this, _subscriptions).set(initialId, {
            ...input,
            // Always set the latest actual subscription ID:
            id,
            initialId
        });
        return async ()=>{
            const client2 = __privateMethod(this, _setupClient, setupClient_fn).call(this);
            const subscription = __privateGet(this, _subscriptions).get(initialId);
            if (!subscription) return false;
            __privateGet(this, _subscriptions).delete(initialId);
            return client2.request({
                method: input.unsubscribe,
                params: [
                    subscription.id
                ]
            }, this.options.callTimeout);
        };
    }
    constructor(endpoint, options = {}){
        __privateAdd(this, _setupClient);
        __privateAdd(this, _reconnect);
        __privateAdd(this, _client, void 0);
        __privateAdd(this, _subscriptions, void 0);
        __privateAdd(this, _disconnects, void 0);
        this.endpoint = endpoint;
        this.options = {
            ...DEFAULT_CLIENT_OPTIONS,
            ...options
        };
        if (this.endpoint.startsWith("http")) {
            this.endpoint = getWebsocketUrl(this.endpoint);
        }
        __privateSet(this, _client, null);
        __privateSet(this, _subscriptions, /* @__PURE__ */ new Map());
        __privateSet(this, _disconnects, 0);
    }
}
_client = new WeakMap();
_subscriptions = new WeakMap();
_disconnects = new WeakMap();
_setupClient = new WeakSet();
setupClient_fn = function() {
    if (__privateGet(this, _client)) {
        return __privateGet(this, _client);
    }
    const transport = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$open$2d$rpc$2f$client$2d$js$2f$build$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WebSocketTransport"](this.endpoint);
    const requestManager = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$open$2d$rpc$2f$client$2d$js$2f$build$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["RequestManager"]([
        transport
    ]);
    __privateSet(this, _client, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$open$2d$rpc$2f$client$2d$js$2f$build$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Client"](requestManager));
    transport.connection.addEventListener("open", ()=>{
        __privateSet(this, _disconnects, 0);
    });
    transport.connection.addEventListener("close", ()=>{
        __privateWrapper(this, _disconnects)._++;
        if (__privateGet(this, _disconnects) <= this.options.maxReconnects) {
            setTimeout(()=>{
                __privateMethod(this, _reconnect, reconnect_fn).call(this);
            }, this.options.reconnectTimeout);
        }
    });
    __privateGet(this, _client).onNotification((data)=>{
        const params = data.params;
        __privateGet(this, _subscriptions).forEach((subscription)=>{
            if (subscription.method === data.method && params.subscription === subscription.id) {
                subscription.onMessage(params.result);
            }
        });
    });
    return __privateGet(this, _client);
};
_reconnect = new WeakSet();
reconnect_fn = function() {
    var __privateGet1;
    (__privateGet1 = __privateGet(this, _client)) === null || __privateGet1 === void 0 ? void 0 : __privateGet1.close();
    __privateSet(this, _client, null);
    __privateGet(this, _subscriptions).forEach((subscription)=>this.request(subscription));
};
;
 //# sourceMappingURL=websocket-client.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/version.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "PACKAGE_VERSION": ()=>PACKAGE_VERSION,
    "TARGETED_RPC_VERSION": ()=>TARGETED_RPC_VERSION
});
const PACKAGE_VERSION = "0.43.3";
const TARGETED_RPC_VERSION = "1.12.0";
;
 //# sourceMappingURL=version.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/http-transport.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "SuiHTTPTransport": ()=>SuiHTTPTransport
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$open$2d$rpc$2f$client$2d$js$2f$build$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@open-rpc/client-js/build/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$rpc$2f$websocket$2d$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/rpc/websocket-client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$version$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/version.js [client] (ecmascript)");
;
;
;
class SuiHTTPTransport {
    async request(input) {
        return await this.rpcClient.request(input);
    }
    async subscribe(input) {
        const unsubscribe = await this.websocketClient.request(input);
        return async ()=>!!await unsubscribe();
    }
    constructor({ url, websocket: { url: websocketUrl, ...websocketOptions } = {}, rpc }){
        var _rpc_url;
        const transport = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$open$2d$rpc$2f$client$2d$js$2f$build$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["HTTPTransport"]((_rpc_url = rpc === null || rpc === void 0 ? void 0 : rpc.url) !== null && _rpc_url !== void 0 ? _rpc_url : url, {
            headers: {
                "Content-Type": "application/json",
                "Client-Sdk-Type": "typescript",
                "Client-Sdk-Version": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$version$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PACKAGE_VERSION"],
                "Client-Target-Api-Version": __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$version$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TARGETED_RPC_VERSION"],
                ...rpc === null || rpc === void 0 ? void 0 : rpc.headers
            }
        });
        this.rpcClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$open$2d$rpc$2f$client$2d$js$2f$build$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Client"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$open$2d$rpc$2f$client$2d$js$2f$build$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["RequestManager"]([
            transport
        ]));
        this.websocketClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$rpc$2f$websocket$2d$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WebsocketClient"](websocketUrl !== null && websocketUrl !== void 0 ? websocketUrl : url, websocketOptions);
    }
}
;
 //# sourceMappingURL=http-transport.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/network.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getFullnodeUrl": ()=>getFullnodeUrl
});
function getFullnodeUrl(network) {
    switch(network){
        case "mainnet":
            return "https://fullnode.mainnet.sui.io:443";
        case "testnet":
            return "https://fullnode.testnet.sui.io:443";
        case "devnet":
            return "https://fullnode.devnet.sui.io:443";
        case "localnet":
            return "http://127.0.0.1:9000";
        default:
            throw new Error("Unknown network: ".concat(network));
    }
}
;
 //# sourceMappingURL=network.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/chain.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

//# sourceMappingURL=chain.js.map
__turbopack_context__.s({});
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/coins.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

//# sourceMappingURL=coins.js.map
__turbopack_context__.s({});
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/common.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

//# sourceMappingURL=common.js.map
__turbopack_context__.s({});
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/changes.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

//# sourceMappingURL=changes.js.map
__turbopack_context__.s({});
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/generated.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

//# sourceMappingURL=generated.js.map
__turbopack_context__.s({});
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/params.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

//# sourceMappingURL=params.js.map
__turbopack_context__.s({});
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/index.js [client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$chain$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/chain.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$coins$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/coins.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/common.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$changes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/changes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$generated$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/generated.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$params$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/params.js [client] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
;
;
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/index.js [client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$chain$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/chain.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$coins$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/coins.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/common.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$changes$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/changes.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$generated$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/generated.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$params$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/params.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/index.js [client] (ecmascript) <locals>");
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/type-tag-serializer.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "TypeTagSerializer": ()=>TypeTagSerializer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
;
;
const VECTOR_REGEX = /^vector<(.+)>$/;
const STRUCT_REGEX = /^([^:]+)::([^:]+)::([^<]+)(<(.+)>)?/;
class TypeTagSerializer {
    static parseFromStr(str) {
        let normalizeAddress = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        if (str === "address") {
            return {
                address: null
            };
        } else if (str === "bool") {
            return {
                bool: null
            };
        } else if (str === "u8") {
            return {
                u8: null
            };
        } else if (str === "u16") {
            return {
                u16: null
            };
        } else if (str === "u32") {
            return {
                u32: null
            };
        } else if (str === "u64") {
            return {
                u64: null
            };
        } else if (str === "u128") {
            return {
                u128: null
            };
        } else if (str === "u256") {
            return {
                u256: null
            };
        } else if (str === "signer") {
            return {
                signer: null
            };
        }
        const vectorMatch = str.match(VECTOR_REGEX);
        if (vectorMatch) {
            return {
                vector: TypeTagSerializer.parseFromStr(vectorMatch[1], normalizeAddress)
            };
        }
        const structMatch = str.match(STRUCT_REGEX);
        if (structMatch) {
            const address = normalizeAddress ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(structMatch[1]) : structMatch[1];
            return {
                struct: {
                    address,
                    module: structMatch[2],
                    name: structMatch[3],
                    typeParams: structMatch[5] === void 0 ? [] : TypeTagSerializer.parseStructTypeArgs(structMatch[5], normalizeAddress)
                }
            };
        }
        throw new Error("Encountered unexpected token when parsing type args for ".concat(str));
    }
    static parseStructTypeArgs(str) {
        let normalizeAddress = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["splitGenericParameters"])(str).map((tok)=>TypeTagSerializer.parseFromStr(tok, normalizeAddress));
    }
    static tagToString(tag) {
        if ("bool" in tag) {
            return "bool";
        }
        if ("u8" in tag) {
            return "u8";
        }
        if ("u16" in tag) {
            return "u16";
        }
        if ("u32" in tag) {
            return "u32";
        }
        if ("u64" in tag) {
            return "u64";
        }
        if ("u128" in tag) {
            return "u128";
        }
        if ("u256" in tag) {
            return "u256";
        }
        if ("address" in tag) {
            return "address";
        }
        if ("signer" in tag) {
            return "signer";
        }
        if ("vector" in tag) {
            return "vector<".concat(TypeTagSerializer.tagToString(tag.vector), ">");
        }
        if ("struct" in tag) {
            const struct = tag.struct;
            const typeParams = struct.typeParams.map(TypeTagSerializer.tagToString).join(", ");
            return "".concat(struct.address, "::").concat(struct.module, "::").concat(struct.name).concat(typeParams ? "<".concat(typeParams, ">") : "");
        }
        throw new Error("Invalid TypeTag");
    }
}
;
 //# sourceMappingURL=type-tag-serializer.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "bcs": ()=>suiBcs,
    "bcsRegistry": ()=>bcsRegistry,
    "isPureArg": ()=>isPureArg
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$type$2d$tag$2d$serializer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/type-tag-serializer.js [client] (ecmascript)");
;
;
;
;
function isPureArg(arg) {
    return arg.Pure !== void 0;
}
const bcsRegistry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["BCS"]({
    ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["getSuiMoveConfig"])(),
    types: {
        enums: {
            "Option<T>": {
                None: null,
                Some: "T"
            }
        }
    }
});
function unsafe_u64(options) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u64({
        name: "unsafe_u64",
        ...options
    }).transform({
        input: (val)=>val,
        output: (val)=>Number(val)
    });
}
function optionEnum(type) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].enum("Option", {
        None: null,
        Some: type
    });
}
function enumKind(type) {
    return type.transform({
        input: (val)=>({
                [val.kind]: val
            }),
        output: (val)=>{
            const key = Object.keys(val)[0];
            return {
                kind: key,
                ...val[key]
            };
        }
    });
}
const Address = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].bytes(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SUI_ADDRESS_LENGTH"]).transform({
    input: (val)=>typeof val === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["fromHEX"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(val)) : val,
    output: (val)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toHEX"])(val)
});
const ObjectDigest = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8()).transform({
    name: "ObjectDigest",
    input: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["fromB58"])(value),
    output: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toB58"])(new Uint8Array(value))
});
const SuiObjectRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("SuiObjectRef", {
    objectId: Address,
    version: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u64(),
    digest: ObjectDigest
});
const SharedObjectRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("SharedObjectRef", {
    objectId: Address,
    initialSharedVersion: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u64(),
    mutable: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].bool()
});
const ObjectArg = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].enum("ObjectArg", {
    ImmOrOwned: SuiObjectRef,
    Shared: SharedObjectRef
});
const CallArg = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].enum("CallArg", {
    Pure: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8()),
    Object: ObjectArg,
    ObjVec: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(ObjectArg)
});
const TypeTag = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].enum("TypeTag", {
    bool: null,
    u8: null,
    u64: null,
    u128: null,
    address: null,
    signer: null,
    vector: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].lazy(()=>TypeTag),
    struct: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].lazy(()=>StructTag),
    u16: null,
    u32: null,
    u256: null
});
const Argument = enumKind(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].enum("Argument", {
    GasCoin: null,
    Input: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("Input", {
        index: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u16()
    }),
    Result: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("Result", {
        index: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u16()
    }),
    NestedResult: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("NestedResult", {
        index: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u16(),
        resultIndex: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u16()
    })
}));
const ProgrammableMoveCall = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("ProgrammableMoveCall", {
    package: Address,
    module: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].string(),
    function: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].string(),
    type_arguments: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(TypeTag),
    arguments: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(Argument)
}).transform({
    input: (data)=>{
        const [pkg, module, fun] = data.target.split("::");
        const type_arguments = data.typeArguments.map((tag)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$type$2d$tag$2d$serializer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TypeTagSerializer"].parseFromStr(tag, true));
        return {
            package: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(pkg),
            module,
            function: fun,
            type_arguments,
            arguments: data.arguments
        };
    },
    output: (data)=>{
        return {
            target: [
                data.package,
                data.module,
                data.function
            ].join("::"),
            arguments: data.arguments,
            typeArguments: data.type_arguments.map(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$type$2d$tag$2d$serializer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TypeTagSerializer"].tagToString)
        };
    }
});
const Transaction = enumKind(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].enum("Transaction", {
    /**
     * A Move Call - any public Move function can be called via
     * this transaction. The results can be used that instant to pass
     * into the next transaction.
     */ MoveCall: ProgrammableMoveCall,
    /**
     * Transfer vector of objects to a receiver.
     */ TransferObjects: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("TransferObjects", {
        objects: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(Argument),
        address: Argument
    }),
    /**
     * Split `amount` from a `coin`.
     */ SplitCoins: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("SplitCoins", {
        coin: Argument,
        amounts: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(Argument)
    }),
    /**
     * Merge Vector of Coins (`sources`) into a `destination`.
     */ MergeCoins: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("MergeCoins", {
        destination: Argument,
        sources: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(Argument)
    }),
    /**
     * Publish a Move module.
     */ Publish: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("Publish", {
        modules: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8())),
        dependencies: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(Address)
    }),
    /**
     * Build a vector of objects using the input arguments.
     * It is impossible to construct a `vector<T: key>` otherwise,
     * so this call serves a utility function.
     */ MakeMoveVec: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("MakeMoveVec", {
        type: optionEnum(TypeTag),
        objects: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(Argument)
    }),
    /**  */ Upgrade: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("Upgrade", {
        modules: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8())),
        dependencies: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(Address),
        packageId: Address,
        ticket: Argument
    })
}));
const ProgrammableTransaction = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("ProgrammableTransaction", {
    inputs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(CallArg),
    transactions: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(Transaction)
});
const TransactionKind = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].enum("TransactionKind", {
    ProgrammableTransaction,
    ChangeEpoch: null,
    Genesis: null,
    ConsensusCommitPrologue: null
});
const TransactionExpiration = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].enum("TransactionExpiration", {
    None: null,
    Epoch: unsafe_u64()
});
const StructTag = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("StructTag", {
    address: Address,
    module: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].string(),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].string(),
    typeParams: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(TypeTag)
});
const GasData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("GasData", {
    payment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(SuiObjectRef),
    owner: Address,
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u64(),
    budget: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u64()
});
const TransactionDataV1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("TransactionDataV1", {
    kind: TransactionKind,
    sender: Address,
    gasData: GasData,
    expiration: TransactionExpiration
});
const TransactionData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].enum("TransactionData", {
    V1: TransactionDataV1
});
const SenderSignedData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("SenderSignedData", {
    data: TransactionData,
    txSignatures: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8()))
});
const CompressedSignature = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].enum("CompressedSignature", {
    ED25519: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].fixedArray(64, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8()),
    Secp256k1: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].fixedArray(64, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8()),
    Secp256r1: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].fixedArray(64, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8())
});
const PublicKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].enum("PublicKey", {
    ED25519: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].fixedArray(32, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8()),
    Secp256k1: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].fixedArray(33, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8()),
    Secp256r1: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].fixedArray(33, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8())
});
const MultiSigPkMap = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("MultiSigPkMap", {
    pubKey: PublicKey,
    weight: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8()
});
const MultiSigPublicKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("MultiSigPublicKey", {
    pk_map: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(MultiSigPkMap),
    threshold: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u16()
});
const MultiSig = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("MultiSig", {
    sigs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(CompressedSignature),
    bitmap: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u16(),
    multisig_pk: MultiSigPublicKey
});
const suiBcs = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"],
    U8: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8(),
    U16: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u16(),
    U32: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u32(),
    U64: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u64(),
    U128: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u128(),
    U256: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u256(),
    ULEB128: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].uleb128(),
    Bool: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].bool(),
    String: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].string(),
    Address,
    Argument,
    CallArg,
    CompressedSignature,
    GasData,
    MultiSig,
    MultiSigPkMap,
    MultiSigPublicKey,
    ObjectArg,
    ObjectDigest,
    ProgrammableMoveCall,
    ProgrammableTransaction,
    PublicKey,
    SenderSignedData,
    SharedObjectRef,
    StructTag,
    SuiObjectRef,
    Transaction,
    TransactionData,
    TransactionDataV1,
    TransactionExpiration,
    TransactionKind,
    TypeTag,
    // preserve backwards compatibility with old bcs export
    ser: bcsRegistry.ser.bind(bcsRegistry),
    de: bcsRegistry.de.bind(bcsRegistry),
    getTypeInterface: bcsRegistry.getTypeInterface.bind(bcsRegistry),
    hasType: bcsRegistry.hasType.bind(bcsRegistry),
    parseTypeName: bcsRegistry.parseTypeName.bind(bcsRegistry),
    registerAddressType: bcsRegistry.registerAddressType.bind(bcsRegistry),
    registerAlias: bcsRegistry.registerAlias.bind(bcsRegistry),
    registerBcsType: bcsRegistry.registerBcsType.bind(bcsRegistry),
    registerEnumType: bcsRegistry.registerEnumType.bind(bcsRegistry),
    registerStructType: bcsRegistry.registerStructType.bind(bcsRegistry),
    registerType: bcsRegistry.registerType.bind(bcsRegistry),
    types: bcsRegistry.types
};
bcsRegistry.registerBcsType("utf8string", ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].string({
        name: "utf8string"
    }));
bcsRegistry.registerBcsType("unsafe_u64", ()=>unsafe_u64());
bcsRegistry.registerBcsType("enumKind", (T)=>enumKind(T));
[
    Address,
    Argument,
    CallArg,
    CompressedSignature,
    GasData,
    MultiSig,
    MultiSigPkMap,
    MultiSigPublicKey,
    ObjectArg,
    ObjectDigest,
    ProgrammableMoveCall,
    ProgrammableTransaction,
    PublicKey,
    SenderSignedData,
    SharedObjectRef,
    StructTag,
    SuiObjectRef,
    Transaction,
    TransactionData,
    TransactionDataV1,
    TransactionExpiration,
    TransactionKind,
    TypeTag
].forEach((type)=>{
    bcsRegistry.registerBcsType(type.name, ()=>type);
});
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$type$2d$tag$2d$serializer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/type-tag-serializer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <locals>");
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/common.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ObjectId": ()=>ObjectId,
    "ObjectOwner": ()=>ObjectOwner,
    "ProtocolConfig": ()=>ProtocolConfig,
    "SequenceNumber": ()=>SequenceNumber,
    "SuiAddress": ()=>SuiAddress,
    "SuiJsonValue": ()=>SuiJsonValue,
    "TransactionDigest": ()=>TransactionDigest,
    "TransactionEffectsDigest": ()=>TransactionEffectsDigest,
    "TransactionEventDigest": ()=>TransactionEventDigest
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
;
const TransactionDigest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])();
const TransactionEffectsDigest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])();
const TransactionEventDigest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])();
const ObjectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])();
const SuiAddress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])();
const SequenceNumber = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])();
const ObjectOwner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        AddressOwner: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        ObjectOwner: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        Shared: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
            initial_shared_version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
        })
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Immutable")
]);
const SuiJsonValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["define"])("SuiJsonValue", ()=>true);
const ProtocolConfigValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        u32: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        u64: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        f64: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
    })
]);
const ProtocolConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    attributes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["record"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])(ProtocolConfigValue)),
    featureFlags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["record"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()),
    maxSupportedProtocolVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    minSupportedProtocolVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    protocolVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
;
 //# sourceMappingURL=common.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/objects.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "CheckpointedObjectId": ()=>CheckpointedObjectId,
    "DisplayFieldsBackwardCompatibleResponse": ()=>DisplayFieldsBackwardCompatibleResponse,
    "DisplayFieldsResponse": ()=>DisplayFieldsResponse,
    "GetOwnedObjectsResponse": ()=>GetOwnedObjectsResponse,
    "MIST_PER_SUI": ()=>MIST_PER_SUI,
    "MovePackageContent": ()=>MovePackageContent,
    "ObjectContentFields": ()=>ObjectContentFields,
    "ObjectDigest": ()=>ObjectDigest,
    "ObjectRead": ()=>ObjectRead,
    "ObjectStatus": ()=>ObjectStatus,
    "ObjectType": ()=>ObjectType,
    "PaginatedObjectsResponse": ()=>PaginatedObjectsResponse,
    "SUI_DECIMALS": ()=>SUI_DECIMALS,
    "SuiGasData": ()=>SuiGasData,
    "SuiMoveObject": ()=>SuiMoveObject,
    "SuiMovePackage": ()=>SuiMovePackage,
    "SuiObjectData": ()=>SuiObjectData,
    "SuiObjectDataOptions": ()=>SuiObjectDataOptions,
    "SuiObjectInfo": ()=>SuiObjectInfo,
    "SuiObjectRef": ()=>SuiObjectRef,
    "SuiObjectResponse": ()=>SuiObjectResponse,
    "SuiObjectResponseError": ()=>SuiObjectResponseError,
    "SuiParsedData": ()=>SuiParsedData,
    "SuiRawData": ()=>SuiRawData,
    "SuiRawMoveObject": ()=>SuiRawMoveObject,
    "SuiRawMovePackage": ()=>SuiRawMovePackage,
    "getMoveObject": ()=>getMoveObject,
    "getMoveObjectType": ()=>getMoveObjectType,
    "getMovePackageContent": ()=>getMovePackageContent,
    "getObjectDeletedResponse": ()=>getObjectDeletedResponse,
    "getObjectDisplay": ()=>getObjectDisplay,
    "getObjectFields": ()=>getObjectFields,
    "getObjectId": ()=>getObjectId,
    "getObjectNotExistsResponse": ()=>getObjectNotExistsResponse,
    "getObjectOwner": ()=>getObjectOwner,
    "getObjectPreviousTransactionDigest": ()=>getObjectPreviousTransactionDigest,
    "getObjectReference": ()=>getObjectReference,
    "getObjectType": ()=>getObjectType,
    "getObjectVersion": ()=>getObjectVersion,
    "getSharedObjectInitialVersion": ()=>getSharedObjectInitialVersion,
    "getSuiObjectData": ()=>getSuiObjectData,
    "hasPublicTransfer": ()=>hasPublicTransfer,
    "isImmutableObject": ()=>isImmutableObject,
    "isSharedObject": ()=>isSharedObject,
    "isSuiObjectResponse": ()=>isSuiObjectResponse
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/common.js [client] (ecmascript)");
;
;
const ObjectType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("package")
]);
const SuiObjectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    /** Base64 string representing the object digest */ digest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    /** Hex code as string representing the object id */ objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    /** Object version */ version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bigint"])()
    ])
});
const SuiGasData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    payment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiObjectRef),
    /** Gas Object's owner */ owner: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    price: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    budget: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const SuiObjectInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["assign"])(SuiObjectRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    owner: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ObjectOwner"],
    previousTransaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
}));
const ObjectContentFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["record"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["any"])());
const MovePackageContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["record"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["unknown"])());
const SuiMoveObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    /** Move type (e.g., "0x2::coin::Coin<0x2::sui::SUI>") */ type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    /** Fields and values stored inside the Move object */ fields: ObjectContentFields,
    hasPublicTransfer: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()
});
const SuiMovePackage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    /** A mapping from module name to disassembled Move bytecode */ disassembled: MovePackageContent
});
const SuiParsedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["assign"])(SuiMoveObject, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        dataType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("moveObject")
    })),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["assign"])(SuiMovePackage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        dataType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("package")
    }))
]);
const SuiRawMoveObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    /** Move type (e.g., "0x2::coin::Coin<0x2::sui::SUI>") */ type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    hasPublicTransfer: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])(),
    version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    bcsBytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const SuiRawMovePackage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    /** A mapping from module name to Move bytecode enocded in base64*/ moduleMap: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["record"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
const SuiRawData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["assign"])(SuiRawMoveObject, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        dataType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("moveObject")
    })),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["assign"])(SuiRawMovePackage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        dataType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("package")
    }))
]);
const SUI_DECIMALS = 9;
const MIST_PER_SUI = BigInt(1e9);
const ObjectDigest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])();
const SuiObjectResponseError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    code: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    object_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    parent_object_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    digest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
const DisplayFieldsResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["record"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()))),
    error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(SuiObjectResponseError))
});
const DisplayFieldsBackwardCompatibleResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    DisplayFieldsResponse,
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["record"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()))
]);
const SuiObjectData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    digest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    /**
   * Type of the object, default to be undefined unless SuiObjectDataOptions.showType is set to true
   */ type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())),
    /**
   * Move object content or package content, default to be undefined unless SuiObjectDataOptions.showContent is set to true
   */ content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(SuiParsedData)),
    /**
   * Move object content or package content in BCS bytes, default to be undefined unless SuiObjectDataOptions.showBcs is set to true
   */ bcs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(SuiRawData)),
    /**
   * The owner of this object. Default to be undefined unless SuiObjectDataOptions.showOwner is set to true
   */ owner: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ObjectOwner"])),
    /**
   * The digest of the transaction that created or last mutated this object.
   * Default to be undefined unless SuiObjectDataOptions.showPreviousTransaction is set to true
   */ previousTransaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())),
    /**
   * The amount of SUI we would rebate if this object gets deleted.
   * This number is re-calculated each time the object is mutated based on
   * the present storage gas price.
   * Default to be undefined unless SuiObjectDataOptions.showStorageRebate is set to true
   */ storageRebate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())),
    /**
   * Display metadata for this object, default to be undefined unless SuiObjectDataOptions.showDisplay is set to true
   * This can also be None if the struct type does not have Display defined
   * See more details in https://forums.sui.io/t/nft-object-display-proposal/4872
   */ display: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(DisplayFieldsBackwardCompatibleResponse))
});
const SuiObjectDataOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    /* Whether to fetch the object type, default to be true */ showType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])())),
    /* Whether to fetch the object content, default to be false */ showContent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])())),
    /* Whether to fetch the object content in BCS bytes, default to be false */ showBcs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])())),
    /* Whether to fetch the object owner, default to be false */ showOwner: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])())),
    /* Whether to fetch the previous transaction digest, default to be false */ showPreviousTransaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])())),
    /* Whether to fetch the storage rebate, default to be false */ showStorageRebate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])())),
    /* Whether to fetch the display metadata, default to be false */ showDisplay: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()))
});
const ObjectStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Exists"),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("notExists"),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Deleted")
]);
const GetOwnedObjectsResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiObjectInfo);
const SuiObjectResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(SuiObjectData)),
    error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(SuiObjectResponseError))
});
function getSuiObjectData(resp) {
    return resp.data;
}
function getObjectDeletedResponse(resp) {
    if (resp.error && "object_id" in resp.error && "version" in resp.error && "digest" in resp.error) {
        const error = resp.error;
        return {
            objectId: error.object_id,
            version: error.version,
            digest: error.digest
        };
    }
    return void 0;
}
function getObjectNotExistsResponse(resp) {
    if (resp.error && "object_id" in resp.error && !("version" in resp.error) && !("digest" in resp.error)) {
        return resp.error.object_id;
    }
    return void 0;
}
function getObjectReference(resp) {
    if ("reference" in resp) {
        return resp.reference;
    }
    const exists = getSuiObjectData(resp);
    if (exists) {
        return {
            objectId: exists.objectId,
            version: exists.version,
            digest: exists.digest
        };
    }
    return getObjectDeletedResponse(resp);
}
function getObjectId(data) {
    var _getObjectReference;
    if ("objectId" in data) {
        return data.objectId;
    }
    var _getObjectReference_objectId;
    return (_getObjectReference_objectId = (_getObjectReference = getObjectReference(data)) === null || _getObjectReference === void 0 ? void 0 : _getObjectReference.objectId) !== null && _getObjectReference_objectId !== void 0 ? _getObjectReference_objectId : getObjectNotExistsResponse(data);
}
function getObjectVersion(data) {
    var _getObjectReference;
    if ("version" in data) {
        return data.version;
    }
    return (_getObjectReference = getObjectReference(data)) === null || _getObjectReference === void 0 ? void 0 : _getObjectReference.version;
}
function isSuiObjectResponse(resp) {
    return resp.data !== void 0;
}
function getObjectType(resp) {
    const data = isSuiObjectResponse(resp) ? resp.data : resp;
    if (!(data === null || data === void 0 ? void 0 : data.type) && "data" in resp) {
        var _data_content;
        if ((data === null || data === void 0 ? void 0 : (_data_content = data.content) === null || _data_content === void 0 ? void 0 : _data_content.dataType) === "package") {
            return "package";
        }
        return getMoveObjectType(resp);
    }
    return data === null || data === void 0 ? void 0 : data.type;
}
function getObjectPreviousTransactionDigest(resp) {
    var _getSuiObjectData;
    return (_getSuiObjectData = getSuiObjectData(resp)) === null || _getSuiObjectData === void 0 ? void 0 : _getSuiObjectData.previousTransaction;
}
function getObjectOwner(resp) {
    var _getSuiObjectData;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(resp, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ObjectOwner"])) {
        return resp;
    }
    return (_getSuiObjectData = getSuiObjectData(resp)) === null || _getSuiObjectData === void 0 ? void 0 : _getSuiObjectData.owner;
}
function getObjectDisplay(resp) {
    var _getSuiObjectData;
    const display = (_getSuiObjectData = getSuiObjectData(resp)) === null || _getSuiObjectData === void 0 ? void 0 : _getSuiObjectData.display;
    if (!display) {
        return {
            data: null,
            error: null
        };
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(display, DisplayFieldsResponse)) {
        return display;
    }
    return {
        data: display,
        error: null
    };
}
function getSharedObjectInitialVersion(resp) {
    const owner = getObjectOwner(resp);
    if (owner && typeof owner === "object" && "Shared" in owner) {
        return owner.Shared.initial_shared_version;
    } else {
        return void 0;
    }
}
function isSharedObject(resp) {
    const owner = getObjectOwner(resp);
    return !!owner && typeof owner === "object" && "Shared" in owner;
}
function isImmutableObject(resp) {
    const owner = getObjectOwner(resp);
    return owner === "Immutable";
}
function getMoveObjectType(resp) {
    var _getMoveObject;
    return (_getMoveObject = getMoveObject(resp)) === null || _getMoveObject === void 0 ? void 0 : _getMoveObject.type;
}
function getObjectFields(resp) {
    var _getMoveObject;
    if ("fields" in resp) {
        return resp.fields;
    }
    return (_getMoveObject = getMoveObject(resp)) === null || _getMoveObject === void 0 ? void 0 : _getMoveObject.fields;
}
function isSuiObjectDataWithContent(data) {
    return data.content !== void 0;
}
function getMoveObject(data) {
    const suiObject = "data" in data ? getSuiObjectData(data) : data;
    if (!suiObject || !isSuiObjectDataWithContent(suiObject) || suiObject.content.dataType !== "moveObject") {
        return void 0;
    }
    return suiObject.content;
}
function hasPublicTransfer(data) {
    var _getMoveObject;
    var _getMoveObject_hasPublicTransfer;
    return (_getMoveObject_hasPublicTransfer = (_getMoveObject = getMoveObject(data)) === null || _getMoveObject === void 0 ? void 0 : _getMoveObject.hasPublicTransfer) !== null && _getMoveObject_hasPublicTransfer !== void 0 ? _getMoveObject_hasPublicTransfer : false;
}
function getMovePackageContent(data) {
    var _suiObject_content;
    if ("disassembled" in data) {
        return data.disassembled;
    }
    const suiObject = getSuiObjectData(data);
    if ((suiObject === null || suiObject === void 0 ? void 0 : (_suiObject_content = suiObject.content) === null || _suiObject_content === void 0 ? void 0 : _suiObject_content.dataType) !== "package") {
        return void 0;
    }
    return suiObject.content.disassembled;
}
const CheckpointedObjectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    atCheckpoint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])())
});
const PaginatedObjectsResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiObjectResponse),
    nextCursor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())),
    hasNextPage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()
});
const ObjectRead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        details: SuiObjectData,
        status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("VersionFound")
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        details: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
        status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("ObjectNotExists")
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        details: SuiObjectRef,
        status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("ObjectDeleted")
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        details: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
        ]),
        status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("VersionNotFound")
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        details: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
            asked_version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
            latest_version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
            object_id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
        }),
        status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("VersionTooHigh")
    })
]);
;
 //# sourceMappingURL=objects.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/option.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getOption": ()=>getOption
});
function getOption(option) {
    if (typeof option === "object" && option !== null && "type" in option && option.type.startsWith("0x1::option::Option<")) {
        return void 0;
    }
    return option;
}
;
 //# sourceMappingURL=option.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/framework/framework.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "COIN_TYPE_ARG_REGEX": ()=>COIN_TYPE_ARG_REGEX,
    "Coin": ()=>Coin,
    "CoinMetadataStruct": ()=>CoinMetadataStruct,
    "Delegation": ()=>Delegation,
    "ID_STRUCT_NAME": ()=>ID_STRUCT_NAME,
    "MOVE_STDLIB_ADDRESS": ()=>MOVE_STDLIB_ADDRESS,
    "OBJECT_MODULE_NAME": ()=>OBJECT_MODULE_NAME,
    "PAY_JOIN_COIN_FUNC_NAME": ()=>PAY_JOIN_COIN_FUNC_NAME,
    "PAY_MODULE_NAME": ()=>PAY_MODULE_NAME,
    "PAY_SPLIT_COIN_VEC_FUNC_NAME": ()=>PAY_SPLIT_COIN_VEC_FUNC_NAME,
    "SUI_CLOCK_OBJECT_ID": ()=>SUI_CLOCK_OBJECT_ID,
    "SUI_FRAMEWORK_ADDRESS": ()=>SUI_FRAMEWORK_ADDRESS,
    "SUI_SYSTEM_ADDRESS": ()=>SUI_SYSTEM_ADDRESS,
    "SUI_TYPE_ARG": ()=>SUI_TYPE_ARG,
    "UID_STRUCT_NAME": ()=>UID_STRUCT_NAME,
    "VALIDATORS_EVENTS_QUERY": ()=>VALIDATORS_EVENTS_QUERY,
    "isObjectDataFull": ()=>isObjectDataFull
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/objects.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$option$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/option.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
;
;
;
;
const SUI_SYSTEM_ADDRESS = "0x3";
const SUI_FRAMEWORK_ADDRESS = "0x2";
const MOVE_STDLIB_ADDRESS = "0x1";
const OBJECT_MODULE_NAME = "object";
const UID_STRUCT_NAME = "UID";
const ID_STRUCT_NAME = "ID";
const SUI_TYPE_ARG = "".concat(SUI_FRAMEWORK_ADDRESS, "::sui::SUI");
const VALIDATORS_EVENTS_QUERY = "0x3::validator_set::ValidatorEpochInfoEventV2";
const SUI_CLOCK_OBJECT_ID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiObjectId"])("0x6");
const PAY_MODULE_NAME = "pay";
const PAY_SPLIT_COIN_VEC_FUNC_NAME = "split_vec";
const PAY_JOIN_COIN_FUNC_NAME = "join";
const COIN_TYPE_ARG_REGEX = /^0x2::coin::Coin<(.+)>$/;
function isObjectDataFull(resp) {
    return !!resp.data || !!resp.type;
}
const CoinMetadataStruct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    decimals: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    symbol: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    iconUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
class Coin {
    static isCoin(data) {
        var _Coin_getType;
        return ((_Coin_getType = Coin.getType(data)) === null || _Coin_getType === void 0 ? void 0 : _Coin_getType.match(COIN_TYPE_ARG_REGEX)) != null;
    }
    static getCoinType(type) {
        var _type_match;
        const [, res] = (_type_match = type.match(COIN_TYPE_ARG_REGEX)) !== null && _type_match !== void 0 ? _type_match : [];
        return res || null;
    }
    static getCoinTypeArg(obj) {
        const type = Coin.getType(obj);
        return type ? Coin.getCoinType(type) : null;
    }
    static isSUI(obj) {
        const arg = Coin.getCoinTypeArg(obj);
        return arg ? Coin.getCoinSymbol(arg) === "SUI" : false;
    }
    static getCoinSymbol(coinTypeArg) {
        return coinTypeArg.substring(coinTypeArg.lastIndexOf(":") + 1);
    }
    static getCoinStructTag(coinTypeArg) {
        return {
            address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiObjectId"])(coinTypeArg.split("::")[0]),
            module: coinTypeArg.split("::")[1],
            name: coinTypeArg.split("::")[2],
            typeParams: []
        };
    }
    static getID(obj) {
        if ("fields" in obj) {
            return obj.fields.id.id;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getObjectId"])(obj);
    }
    static totalBalance(coins) {
        return coins.reduce((partialSum, c)=>partialSum + Coin.getBalanceFromCoinStruct(c), BigInt(0));
    }
    /**
   * Sort coin by balance in an ascending order
   */ static sortByBalance(coins) {
        return [
            ...coins
        ].sort((a, b)=>Coin.getBalanceFromCoinStruct(a) < Coin.getBalanceFromCoinStruct(b) ? -1 : Coin.getBalanceFromCoinStruct(a) > Coin.getBalanceFromCoinStruct(b) ? 1 : 0);
    }
    static getBalanceFromCoinStruct(coin) {
        return BigInt(coin.balance);
    }
    static getBalance(data) {
        var _getObjectFields;
        if (!Coin.isCoin(data)) {
            return void 0;
        }
        const balance = (_getObjectFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getObjectFields"])(data)) === null || _getObjectFields === void 0 ? void 0 : _getObjectFields.balance;
        return BigInt(balance);
    }
    static getType(data) {
        if (isObjectDataFull(data)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getObjectType"])(data);
        }
        return data.type;
    }
}
const _Delegation = class {
    static isDelegationSuiObject(obj) {
        return "type" in obj && obj.type === _Delegation.SUI_OBJECT_TYPE;
    }
    nextRewardUnclaimedEpoch() {
        return this.suiObject.data.fields.next_reward_unclaimed_epoch;
    }
    activeDelegation() {
        return BigInt((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$option$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getOption"])(this.suiObject.data.fields.active_delegation) || 0);
    }
    delegateAmount() {
        return this.suiObject.data.fields.delegate_amount;
    }
    endingEpoch() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$option$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getOption"])(this.suiObject.data.fields.ending_epoch);
    }
    validatorAddress() {
        return this.suiObject.data.fields.validator_address;
    }
    isActive() {
        return this.activeDelegation() > 0 && !this.endingEpoch();
    }
    hasUnclaimedRewards(epoch) {
        return this.nextRewardUnclaimedEpoch() <= epoch && (this.isActive() || (this.endingEpoch() || 0) > epoch);
    }
    constructor(obj){
        this.suiObject = obj;
    }
};
let Delegation = _Delegation;
Delegation.SUI_OBJECT_TYPE = "0x2::delegation::Delegation";
;
 //# sourceMappingURL=framework.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/events.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "EventId": ()=>EventId,
    "PaginatedEvents": ()=>PaginatedEvents,
    "SuiEvent": ()=>SuiEvent,
    "getEventPackage": ()=>getEventPackage,
    "getEventSender": ()=>getEventSender
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
;
const EventId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    txDigest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    eventSeq: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const SuiEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    id: EventId,
    // Move package where this event was emitted.
    packageId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    // Move module where this event was emitted.
    transactionModule: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    // Sender's Sui address.
    sender: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    // Move event type.
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    // Parsed json value of the event
    parsedJson: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["record"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["any"])())),
    // Base 58 encoded bcs bytes of the move event
    bcs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    timestampMs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
const PaginatedEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiEvent),
    nextCursor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])(EventId),
    hasNextPage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()
});
function getEventSender(event) {
    return event.sender;
}
function getEventPackage(event) {
    return event.packageId;
}
;
 //# sourceMappingURL=events.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/transactions.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "AuthorityName": ()=>AuthorityName,
    "AuthorityQuorumSignInfo": ()=>AuthorityQuorumSignInfo,
    "AuthoritySignature": ()=>AuthoritySignature,
    "BalanceChange": ()=>BalanceChange,
    "DevInspectResults": ()=>DevInspectResults,
    "DryRunTransactionBlockResponse": ()=>DryRunTransactionBlockResponse,
    "EpochId": ()=>EpochId,
    "ExecutionStatus": ()=>ExecutionStatus,
    "ExecutionStatusType": ()=>ExecutionStatusType,
    "GasCostSummary": ()=>GasCostSummary,
    "GenericAuthoritySignature": ()=>GenericAuthoritySignature,
    "Genesis": ()=>Genesis,
    "MoveCallSuiTransaction": ()=>MoveCallSuiTransaction,
    "OwnedObjectRef": ()=>OwnedObjectRef,
    "PaginatedTransactionResponse": ()=>PaginatedTransactionResponse,
    "ProgrammableTransaction": ()=>ProgrammableTransaction,
    "SuiArgument": ()=>SuiArgument,
    "SuiCallArg": ()=>SuiCallArg,
    "SuiChangeEpoch": ()=>SuiChangeEpoch,
    "SuiConsensusCommitPrologue": ()=>SuiConsensusCommitPrologue,
    "SuiObjectChange": ()=>SuiObjectChange,
    "SuiObjectChangeCreated": ()=>SuiObjectChangeCreated,
    "SuiObjectChangeDeleted": ()=>SuiObjectChangeDeleted,
    "SuiObjectChangeMutated": ()=>SuiObjectChangeMutated,
    "SuiObjectChangePublished": ()=>SuiObjectChangePublished,
    "SuiObjectChangeTransferred": ()=>SuiObjectChangeTransferred,
    "SuiObjectChangeWrapped": ()=>SuiObjectChangeWrapped,
    "SuiTransaction": ()=>SuiTransaction,
    "SuiTransactionBlock": ()=>SuiTransactionBlock,
    "SuiTransactionBlockData": ()=>SuiTransactionBlockData,
    "SuiTransactionBlockKind": ()=>SuiTransactionBlockKind,
    "SuiTransactionBlockResponse": ()=>SuiTransactionBlockResponse,
    "SuiTransactionBlockResponseOptions": ()=>SuiTransactionBlockResponseOptions,
    "TransactionEffects": ()=>TransactionEffects,
    "TransactionEffectsModifiedAtVersions": ()=>TransactionEffectsModifiedAtVersions,
    "TransactionEvents": ()=>TransactionEvents,
    "getChangeEpochTransaction": ()=>getChangeEpochTransaction,
    "getConsensusCommitPrologueTransaction": ()=>getConsensusCommitPrologueTransaction,
    "getCreatedObjects": ()=>getCreatedObjects,
    "getEvents": ()=>getEvents,
    "getExecutionStatus": ()=>getExecutionStatus,
    "getExecutionStatusError": ()=>getExecutionStatusError,
    "getExecutionStatusGasSummary": ()=>getExecutionStatusGasSummary,
    "getExecutionStatusType": ()=>getExecutionStatusType,
    "getGasData": ()=>getGasData,
    "getNewlyCreatedCoinRefsAfterSplit": ()=>getNewlyCreatedCoinRefsAfterSplit,
    "getObjectChanges": ()=>getObjectChanges,
    "getProgrammableTransaction": ()=>getProgrammableTransaction,
    "getPublishedObjectChanges": ()=>getPublishedObjectChanges,
    "getTimestampFromTransactionResponse": ()=>getTimestampFromTransactionResponse,
    "getTotalGasUsed": ()=>getTotalGasUsed,
    "getTotalGasUsedUpperBound": ()=>getTotalGasUsedUpperBound,
    "getTransaction": ()=>getTransaction,
    "getTransactionDigest": ()=>getTransactionDigest,
    "getTransactionEffects": ()=>getTransactionEffects,
    "getTransactionGasBudget": ()=>getTransactionGasBudget,
    "getTransactionGasObject": ()=>getTransactionGasObject,
    "getTransactionGasPrice": ()=>getTransactionGasPrice,
    "getTransactionKind": ()=>getTransactionKind,
    "getTransactionKindName": ()=>getTransactionKindName,
    "getTransactionSender": ()=>getTransactionSender,
    "getTransactionSignature": ()=>getTransactionSignature
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/common.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$events$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/events.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/objects.js [client] (ecmascript)");
;
;
;
;
const EpochId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])();
const SuiChangeEpoch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    epoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    storage_charge: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    computation_charge: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    storage_rebate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    epoch_start_timestamp_ms: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
const SuiConsensusCommitPrologue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    epoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    round: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    commit_timestamp_ms: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const Genesis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    objects: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
const SuiArgument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("GasCoin"),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        Input: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        Result: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        NestedResult: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
        ])
    })
]);
const MoveCallSuiTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    arguments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiArgument)),
    type_arguments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())),
    package: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    module: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    function: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const SuiTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        MoveCall: MoveCallSuiTransaction
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        TransferObjects: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiArgument),
            SuiArgument
        ])
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        SplitCoins: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
            SuiArgument,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiArgument)
        ])
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        MergeCoins: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
            SuiArgument,
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiArgument)
        ])
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        Publish: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
            // TODO: Remove this after 0.34 is released:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiMovePackage"],
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
            ]),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
        ])
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        Upgrade: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
            // TODO: Remove this after 0.34 is released:
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiMovePackage"],
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
                SuiArgument
            ]),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
                SuiArgument
            ])
        ])
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        MakeMoveVec: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiArgument)
        ])
    })
]);
const SuiCallArg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("pure"),
        valueType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
        value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiJsonValue"]
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("object"),
        objectType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("immOrOwnedObject"),
        objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
        version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
        digest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("object"),
        objectType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("sharedObject"),
        objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
        initialSharedVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
        mutable: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()
    })
]);
const ProgrammableTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    transactions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiTransaction),
    inputs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiCallArg)
});
const SuiTransactionBlockKind = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["assign"])(SuiChangeEpoch, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("ChangeEpoch")
    })),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["assign"])(SuiConsensusCommitPrologue, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("ConsensusCommitPrologue")
    })),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["assign"])(Genesis, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Genesis")
    })),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["assign"])(ProgrammableTransaction, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("ProgrammableTransaction")
    }))
]);
const SuiTransactionBlockData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    // Eventually this will become union(literal('v1'), literal('v2'), ...)
    messageVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("v1"),
    transaction: SuiTransactionBlockKind,
    sender: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    gasData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiGasData"]
});
const AuthoritySignature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])();
const GenericAuthoritySignature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
]);
const AuthorityQuorumSignInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    epoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    signature: GenericAuthoritySignature,
    signers_map: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])())
});
const GasCostSummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    computationCost: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    storageCost: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    storageRebate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    nonRefundableStorageFee: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const ExecutionStatusType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("success"),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("failure")
]);
const ExecutionStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    status: ExecutionStatusType,
    error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
const OwnedObjectRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    owner: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ObjectOwner"],
    reference: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiObjectRef"]
});
const TransactionEffectsModifiedAtVersions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    sequenceNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const TransactionEffects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    // Eventually this will become union(literal('v1'), literal('v2'), ...)
    messageVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("v1"),
    /** The status of the execution */ status: ExecutionStatus,
    /** The epoch when this transaction was executed */ executedEpoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    /** The version that every modified (mutated or deleted) object had before it was modified by this transaction. **/ modifiedAtVersions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(TransactionEffectsModifiedAtVersions)),
    gasUsed: GasCostSummary,
    /** The object references of the shared objects used in this transaction. Empty if no shared objects were used. */ sharedObjects: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiObjectRef"])),
    /** The transaction digest */ transactionDigest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    /** ObjectRef and owner of new objects created */ created: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(OwnedObjectRef)),
    /** ObjectRef and owner of mutated objects, including gas object */ mutated: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(OwnedObjectRef)),
    /**
   * ObjectRef and owner of objects that are unwrapped in this transaction.
   * Unwrapped objects are objects that were wrapped into other objects in the past,
   * and just got extracted out.
   */ unwrapped: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(OwnedObjectRef)),
    /** Object Refs of objects now deleted (the old refs) */ deleted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiObjectRef"])),
    /** Object Refs of objects now deleted (the old refs) */ unwrappedThenDeleted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiObjectRef"])),
    /** Object refs of objects now wrapped in other objects */ wrapped: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiObjectRef"])),
    /**
   * The updated gas object reference. Have a dedicated field for convenient access.
   * It's also included in mutated.
   */ gasObject: OwnedObjectRef,
    /** The events emitted during execution. Note that only successful transactions emit events */ eventsDigest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())),
    /** The set of transaction digests this transaction depends on */ dependencies: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()))
});
const TransactionEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$events$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiEvent"]);
const ReturnValueType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
]);
const MutableReferenceOutputType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
    SuiArgument,
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
]);
const ExecutionResultType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    mutableReferenceOutputs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(MutableReferenceOutputType)),
    returnValues: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(ReturnValueType))
});
const DevInspectResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    effects: TransactionEffects,
    events: TransactionEvents,
    results: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(ExecutionResultType)),
    error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
const AuthorityName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])();
const SuiTransactionBlock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    data: SuiTransactionBlockData,
    txSignatures: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
const SuiObjectChangePublished = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("published"),
    packageId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    digest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
const SuiObjectChangeTransferred = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("transferred"),
    sender: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    recipient: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ObjectOwner"],
    objectType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    digest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const SuiObjectChangeMutated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("mutated"),
    sender: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    owner: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ObjectOwner"],
    objectType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    previousVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    digest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const SuiObjectChangeDeleted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("deleted"),
    sender: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    objectType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const SuiObjectChangeWrapped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("wrapped"),
    sender: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    objectType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const SuiObjectChangeCreated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("created"),
    sender: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    owner: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ObjectOwner"],
    objectType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    digest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const SuiObjectChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    SuiObjectChangePublished,
    SuiObjectChangeTransferred,
    SuiObjectChangeMutated,
    SuiObjectChangeDeleted,
    SuiObjectChangeWrapped,
    SuiObjectChangeCreated
]);
const BalanceChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    owner: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ObjectOwner"],
    coinType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    /* Coin balance change(positive means receive, negative means send) */ amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const SuiTransactionBlockResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    digest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    transaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(SuiTransactionBlock),
    effects: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(TransactionEffects),
    events: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(TransactionEvents),
    timestampMs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    checkpoint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    confirmedLocalExecution: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()),
    objectChanges: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiObjectChange)),
    balanceChanges: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(BalanceChange)),
    /* Errors that occurred in fetching/serializing the transaction. */ errors: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()))
});
const SuiTransactionBlockResponseOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    /* Whether to show transaction input data. Default to be false. */ showInput: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()),
    /* Whether to show transaction effects. Default to be false. */ showEffects: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()),
    /* Whether to show transaction events. Default to be false. */ showEvents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()),
    /* Whether to show object changes. Default to be false. */ showObjectChanges: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()),
    /* Whether to show coin balance changes. Default to be false. */ showBalanceChanges: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])())
});
const PaginatedTransactionResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiTransactionBlockResponse),
    nextCursor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    hasNextPage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()
});
const DryRunTransactionBlockResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    effects: TransactionEffects,
    events: TransactionEvents,
    objectChanges: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiObjectChange),
    balanceChanges: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(BalanceChange),
    // TODO: Remove optional when this is rolled out to all networks:
    input: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(SuiTransactionBlockData)
});
function getTransaction(tx) {
    return tx.transaction;
}
function getTransactionDigest(tx) {
    return tx.digest;
}
function getTransactionSignature(tx) {
    var _tx_transaction;
    return (_tx_transaction = tx.transaction) === null || _tx_transaction === void 0 ? void 0 : _tx_transaction.txSignatures;
}
function getTransactionSender(tx) {
    var _tx_transaction;
    return (_tx_transaction = tx.transaction) === null || _tx_transaction === void 0 ? void 0 : _tx_transaction.data.sender;
}
function getGasData(tx) {
    var _tx_transaction;
    return (_tx_transaction = tx.transaction) === null || _tx_transaction === void 0 ? void 0 : _tx_transaction.data.gasData;
}
function getTransactionGasObject(tx) {
    var _getGasData;
    return (_getGasData = getGasData(tx)) === null || _getGasData === void 0 ? void 0 : _getGasData.payment;
}
function getTransactionGasPrice(tx) {
    var _getGasData;
    return (_getGasData = getGasData(tx)) === null || _getGasData === void 0 ? void 0 : _getGasData.price;
}
function getTransactionGasBudget(tx) {
    var _getGasData;
    return (_getGasData = getGasData(tx)) === null || _getGasData === void 0 ? void 0 : _getGasData.budget;
}
function getChangeEpochTransaction(data) {
    return data.kind === "ChangeEpoch" ? data : void 0;
}
function getConsensusCommitPrologueTransaction(data) {
    return data.kind === "ConsensusCommitPrologue" ? data : void 0;
}
function getTransactionKind(data) {
    var _data_transaction;
    return (_data_transaction = data.transaction) === null || _data_transaction === void 0 ? void 0 : _data_transaction.data.transaction;
}
function getTransactionKindName(data) {
    return data.kind;
}
function getProgrammableTransaction(data) {
    return data.kind === "ProgrammableTransaction" ? data : void 0;
}
function getExecutionStatusType(data) {
    var _getExecutionStatus;
    return (_getExecutionStatus = getExecutionStatus(data)) === null || _getExecutionStatus === void 0 ? void 0 : _getExecutionStatus.status;
}
function getExecutionStatus(data) {
    var _getTransactionEffects;
    return (_getTransactionEffects = getTransactionEffects(data)) === null || _getTransactionEffects === void 0 ? void 0 : _getTransactionEffects.status;
}
function getExecutionStatusError(data) {
    var _getExecutionStatus;
    return (_getExecutionStatus = getExecutionStatus(data)) === null || _getExecutionStatus === void 0 ? void 0 : _getExecutionStatus.error;
}
function getExecutionStatusGasSummary(data) {
    var _getTransactionEffects;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(data, TransactionEffects)) {
        return data.gasUsed;
    }
    return (_getTransactionEffects = getTransactionEffects(data)) === null || _getTransactionEffects === void 0 ? void 0 : _getTransactionEffects.gasUsed;
}
function getTotalGasUsed(data) {
    const gasSummary = getExecutionStatusGasSummary(data);
    return gasSummary ? BigInt(gasSummary.computationCost) + BigInt(gasSummary.storageCost) - BigInt(gasSummary.storageRebate) : void 0;
}
function getTotalGasUsedUpperBound(data) {
    const gasSummary = getExecutionStatusGasSummary(data);
    return gasSummary ? BigInt(gasSummary.computationCost) + BigInt(gasSummary.storageCost) : void 0;
}
function getTransactionEffects(data) {
    return data.effects;
}
function getEvents(data) {
    return data.events;
}
function getCreatedObjects(data) {
    var _getTransactionEffects;
    return (_getTransactionEffects = getTransactionEffects(data)) === null || _getTransactionEffects === void 0 ? void 0 : _getTransactionEffects.created;
}
function getTimestampFromTransactionResponse(data) {
    var _data_timestampMs;
    return (_data_timestampMs = data.timestampMs) !== null && _data_timestampMs !== void 0 ? _data_timestampMs : void 0;
}
function getNewlyCreatedCoinRefsAfterSplit(data) {
    var _getTransactionEffects_created, _getTransactionEffects;
    return (_getTransactionEffects = getTransactionEffects(data)) === null || _getTransactionEffects === void 0 ? void 0 : (_getTransactionEffects_created = _getTransactionEffects.created) === null || _getTransactionEffects_created === void 0 ? void 0 : _getTransactionEffects_created.map((c)=>c.reference);
}
function getObjectChanges(data) {
    return data.objectChanges;
}
function getPublishedObjectChanges(data) {
    var _data_objectChanges;
    var _data_objectChanges_filter;
    return (_data_objectChanges_filter = (_data_objectChanges = data.objectChanges) === null || _data_objectChanges === void 0 ? void 0 : _data_objectChanges.filter((a)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(a, SuiObjectChangePublished))) !== null && _data_objectChanges_filter !== void 0 ? _data_objectChanges_filter : [];
}
;
 //# sourceMappingURL=transactions.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/normalized.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "MoveCallMetric": ()=>MoveCallMetric,
    "MoveCallMetrics": ()=>MoveCallMetrics,
    "SuiMoveAbilitySet": ()=>SuiMoveAbilitySet,
    "SuiMoveFunctionArgType": ()=>SuiMoveFunctionArgType,
    "SuiMoveFunctionArgTypes": ()=>SuiMoveFunctionArgTypes,
    "SuiMoveModuleId": ()=>SuiMoveModuleId,
    "SuiMoveNormalizedField": ()=>SuiMoveNormalizedField,
    "SuiMoveNormalizedFunction": ()=>SuiMoveNormalizedFunction,
    "SuiMoveNormalizedModule": ()=>SuiMoveNormalizedModule,
    "SuiMoveNormalizedModules": ()=>SuiMoveNormalizedModules,
    "SuiMoveNormalizedStruct": ()=>SuiMoveNormalizedStruct,
    "SuiMoveNormalizedStructType": ()=>SuiMoveNormalizedStructType,
    "SuiMoveNormalizedType": ()=>SuiMoveNormalizedType,
    "SuiMoveNormalizedTypeParameterType": ()=>SuiMoveNormalizedTypeParameterType,
    "SuiMoveStructTypeParameter": ()=>SuiMoveStructTypeParameter,
    "SuiMoveVisibility": ()=>SuiMoveVisibility,
    "extractMutableReference": ()=>extractMutableReference,
    "extractReference": ()=>extractReference,
    "extractStructTag": ()=>extractStructTag
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
;
const SuiMoveFunctionArgType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        Object: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
    })
]);
const SuiMoveFunctionArgTypes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiMoveFunctionArgType);
const SuiMoveModuleId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const SuiMoveVisibility = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Private"),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Public"),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Friend")
]);
const SuiMoveAbilitySet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    abilities: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
const SuiMoveStructTypeParameter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    constraints: SuiMoveAbilitySet,
    isPhantom: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()
});
const SuiMoveNormalizedTypeParameterType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    TypeParameter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
});
const MoveCallMetric = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        module: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
        package: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
        function: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
]);
const MoveCallMetrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    rank3Days: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(MoveCallMetric),
    rank7Days: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(MoveCallMetric),
    rank30Days: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(MoveCallMetric)
});
function isSuiMoveNormalizedType(value) {
    if (!value) return false;
    if (typeof value === "string") return true;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(value, SuiMoveNormalizedTypeParameterType)) return true;
    if (isSuiMoveNormalizedStructType(value)) return true;
    if (typeof value !== "object") return false;
    const valueProperties = value;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(valueProperties.Reference, SuiMoveNormalizedType)) return true;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(valueProperties.MutableReference, SuiMoveNormalizedType)) return true;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(valueProperties.Vector, SuiMoveNormalizedType)) return true;
    return false;
}
const SuiMoveNormalizedType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["define"])("SuiMoveNormalizedType", isSuiMoveNormalizedType);
function isSuiMoveNormalizedStructType(value) {
    if (!value || typeof value !== "object") return false;
    const valueProperties = value;
    if (!valueProperties.Struct || typeof valueProperties.Struct !== "object") return false;
    const structProperties = valueProperties.Struct;
    if (typeof structProperties.address !== "string" || typeof structProperties.module !== "string" || typeof structProperties.name !== "string" || !Array.isArray(structProperties.typeArguments) || !structProperties.typeArguments.every((value2)=>isSuiMoveNormalizedType(value2))) {
        return false;
    }
    return true;
}
const SuiMoveNormalizedStructType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["define"])("SuiMoveNormalizedStructType", isSuiMoveNormalizedStructType);
const SuiMoveNormalizedFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    visibility: SuiMoveVisibility,
    isEntry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])(),
    typeParameters: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiMoveAbilitySet),
    parameters: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiMoveNormalizedType),
    return: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiMoveNormalizedType)
});
const SuiMoveNormalizedField = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    type: SuiMoveNormalizedType
});
const SuiMoveNormalizedStruct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    abilities: SuiMoveAbilitySet,
    typeParameters: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiMoveStructTypeParameter),
    fields: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiMoveNormalizedField)
});
const SuiMoveNormalizedModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    fileFormatVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    friends: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiMoveModuleId),
    structs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["record"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(), SuiMoveNormalizedStruct),
    exposedFunctions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["record"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(), SuiMoveNormalizedFunction)
});
const SuiMoveNormalizedModules = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["record"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(), SuiMoveNormalizedModule);
function extractMutableReference(normalizedType) {
    return typeof normalizedType === "object" && "MutableReference" in normalizedType ? normalizedType.MutableReference : void 0;
}
function extractReference(normalizedType) {
    return typeof normalizedType === "object" && "Reference" in normalizedType ? normalizedType.Reference : void 0;
}
function extractStructTag(normalizedType) {
    if (typeof normalizedType === "object" && "Struct" in normalizedType) {
        return normalizedType;
    }
    const ref = extractReference(normalizedType);
    const mutRef = extractMutableReference(normalizedType);
    if (typeof ref === "object" && "Struct" in ref) {
        return ref;
    }
    if (typeof mutRef === "object" && "Struct" in mutRef) {
        return mutRef;
    }
    return void 0;
}
;
 //# sourceMappingURL=normalized.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/validator.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Apy": ()=>Apy,
    "Balance": ()=>Balance,
    "CommitteeInfo": ()=>CommitteeInfo,
    "Contents": ()=>Contents,
    "ContentsFields": ()=>ContentsFields,
    "ContentsFieldsWithdraw": ()=>ContentsFieldsWithdraw,
    "DelegatedStake": ()=>DelegatedStake,
    "DelegationStakingPool": ()=>DelegationStakingPool,
    "DelegationStakingPoolFields": ()=>DelegationStakingPoolFields,
    "StakeObject": ()=>StakeObject,
    "StakeSubsidy": ()=>StakeSubsidy,
    "StakeSubsidyFields": ()=>StakeSubsidyFields,
    "SuiSupplyFields": ()=>SuiSupplyFields,
    "SuiSystemStateSummary": ()=>SuiSystemStateSummary,
    "SuiValidatorSummary": ()=>SuiValidatorSummary,
    "Validators": ()=>Validators,
    "ValidatorsApy": ()=>ValidatorsApy
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
;
const Apy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    apy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const ValidatorsApy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    epoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    apys: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(Apy)
});
const Balance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
});
const StakeObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    stakedSuiId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakeRequestEpoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakeActiveEpoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    principal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Active"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Pending"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Unstaked")
    ]),
    estimatedReward: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
const DelegatedStake = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    validatorAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakingPool: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(StakeObject)
});
const StakeSubsidyFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    balance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
    }),
    distribution_counter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    current_distribution_amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    stake_subsidy_period_length: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    stake_subsidy_decrease_rate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
});
const StakeSubsidy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    fields: StakeSubsidyFields
});
const SuiSupplyFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
});
const ContentsFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    size: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    head: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        vec: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])()
    }),
    tail: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        vec: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])()
    })
});
const ContentsFieldsWithdraw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    size: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
});
const Contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    fields: ContentsFields
});
const DelegationStakingPoolFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    exchangeRates: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
        size: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
    }),
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    pendingStake: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    pendingPoolTokenWithdraw: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    pendingTotalSuiWithdraw: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    poolTokenBalance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    rewardsPool: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
    }),
    activationEpoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        vec: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])()
    }),
    deactivationEpoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        vec: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])()
    }),
    suiBalance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
});
const DelegationStakingPool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    fields: DelegationStakingPoolFields
});
const Validators = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
]));
const CommitteeInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    epoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    /** Array of (validator public key, stake unit) tuple */ validators: Validators
});
const SuiValidatorSummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    suiAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    protocolPubkeyBytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    networkPubkeyBytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    workerPubkeyBytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    proofOfPossessionBytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    operationCapId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    imageUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    projectUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    p2pAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    netAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    primaryAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    workerAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    nextEpochProtocolPubkeyBytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    nextEpochProofOfPossession: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    nextEpochNetworkPubkeyBytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    nextEpochWorkerPubkeyBytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    nextEpochNetAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    nextEpochP2pAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    nextEpochPrimaryAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    nextEpochWorkerAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    votingPower: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    gasPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    commissionRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    nextEpochStake: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    nextEpochGasPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    nextEpochCommissionRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakingPoolId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakingPoolActivationEpoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    stakingPoolDeactivationEpoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    stakingPoolSuiBalance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    rewardsPool: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    poolTokenBalance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    pendingStake: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    pendingPoolTokenWithdraw: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    pendingTotalSuiWithdraw: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    exchangeRatesId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    exchangeRatesSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const SuiSystemStateSummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    epoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    protocolVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    systemStateVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    storageFundTotalObjectStorageRebates: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    storageFundNonRefundableBalance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    referenceGasPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    safeMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])(),
    safeModeStorageRewards: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    safeModeComputationRewards: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    safeModeStorageRebates: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    safeModeNonRefundableStorageFee: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    epochStartTimestampMs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    epochDurationMs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakeSubsidyStartEpoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    maxValidatorCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    minValidatorJoiningStake: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    validatorLowStakeThreshold: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    validatorVeryLowStakeThreshold: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    validatorLowStakeGracePeriod: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakeSubsidyBalance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakeSubsidyDistributionCounter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakeSubsidyCurrentDistributionAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakeSubsidyPeriodLength: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakeSubsidyDecreaseRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    totalStake: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    activeValidators: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(SuiValidatorSummary),
    pendingActiveValidatorsId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    pendingActiveValidatorsSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    pendingRemovals: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    stakingPoolMappingsId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakingPoolMappingsSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    inactivePoolsId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    inactivePoolsSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    validatorCandidatesId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    validatorCandidatesSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    atRiskValidators: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
    ])),
    validatorReportRecords: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
    ]))
});
;
 //# sourceMappingURL=validator.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/coin.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "CoinBalance": ()=>CoinBalance,
    "CoinStruct": ()=>CoinStruct,
    "CoinSupply": ()=>CoinSupply,
    "PaginatedCoins": ()=>PaginatedCoins
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
;
const CoinStruct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    coinType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    // TODO(chris): rename this to objectId
    coinObjectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    digest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    balance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    previousTransaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const PaginatedCoins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(CoinStruct),
    nextCursor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    hasNextPage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()
});
const CoinBalance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    coinType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    coinObjectCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    totalBalance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    lockedBalance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        epochId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()),
        number: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])())
    })
});
const CoinSupply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
;
 //# sourceMappingURL=coin.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/epochs.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "EndOfEpochInfo": ()=>EndOfEpochInfo,
    "EpochInfo": ()=>EpochInfo,
    "EpochPage": ()=>EpochPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$validator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/validator.js [client] (ecmascript)");
;
;
const EndOfEpochInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    lastCheckpointId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    epochEndTimestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    protocolVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    referenceGasPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    totalStake: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    storageFundReinvestment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    storageCharge: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    storageRebate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    storageFundBalance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    stakeSubsidyAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    totalGasFees: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    totalStakeRewardsDistributed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    leftoverStorageFundInflow: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const EpochInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    epoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    validators: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$validator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiValidatorSummary"]),
    epochTotalTransactions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    firstCheckpointId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    epochStartTimestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    endOfEpochInfo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])(EndOfEpochInfo),
    referenceGasPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])())
});
const EpochPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(EpochInfo),
    nextCursor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    hasNextPage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()
});
;
 //# sourceMappingURL=epochs.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/subscriptions.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

//# sourceMappingURL=subscriptions.js.map
__turbopack_context__.s({});
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/name-service.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ResolvedNameServiceNames": ()=>ResolvedNameServiceNames
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
;
const ResolvedNameServiceNames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    hasNextPage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])(),
    nextCursor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
;
 //# sourceMappingURL=name-service.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/dynamic_fields.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "DynamicFieldInfo": ()=>DynamicFieldInfo,
    "DynamicFieldName": ()=>DynamicFieldName,
    "DynamicFieldPage": ()=>DynamicFieldPage,
    "DynamicFieldType": ()=>DynamicFieldType
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
;
const DynamicFieldType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("DynamicField"),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("DynamicObject")
]);
const DynamicFieldName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["any"])()
});
const DynamicFieldInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    name: DynamicFieldName,
    bcsName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    type: DynamicFieldType,
    objectType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    digest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const DynamicFieldPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(DynamicFieldInfo),
    nextCursor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    hasNextPage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()
});
;
 //# sourceMappingURL=dynamic_fields.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/checkpoints.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "CheckPointContentsDigest": ()=>CheckPointContentsDigest,
    "Checkpoint": ()=>Checkpoint,
    "CheckpointCommitment": ()=>CheckpointCommitment,
    "CheckpointDigest": ()=>CheckpointDigest,
    "CheckpointPage": ()=>CheckpointPage,
    "ECMHLiveObjectSetDigest": ()=>ECMHLiveObjectSetDigest,
    "EndOfEpochData": ()=>EndOfEpochData,
    "ExecutionDigests": ()=>ExecutionDigests,
    "GasCostSummary": ()=>GasCostSummary,
    "ValidatorSignature": ()=>ValidatorSignature
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
;
const GasCostSummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    computationCost: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    storageCost: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    storageRebate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    nonRefundableStorageFee: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const CheckPointContentsDigest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])();
const CheckpointDigest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])();
const ECMHLiveObjectSetDigest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    digest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])())
});
const CheckpointCommitment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["any"])();
const ValidatorSignature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])();
const EndOfEpochData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    nextEpochCommittee: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["tuple"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
    ])),
    nextEpochProtocolVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    epochCommitments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(CheckpointCommitment)
});
const ExecutionDigests = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    transaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    effects: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const Checkpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    epoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    sequenceNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    digest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    networkTotalTransactions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    previousDigest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    epochRollingGasCostSummary: GasCostSummary,
    timestampMs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    endOfEpochData: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(EndOfEpochData),
    validatorSignature: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    transactions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    checkpointCommitments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(CheckpointCommitment)
});
const CheckpointPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(Checkpoint),
    nextCursor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    hasNextPage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()
});
;
 //# sourceMappingURL=checkpoints.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/metrics.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "AddressMetrics": ()=>AddressMetrics,
    "AllEpochsAddressMetrics": ()=>AllEpochsAddressMetrics,
    "NetworkMetrics": ()=>NetworkMetrics
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
;
const NetworkMetrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    currentTps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    tps30Days: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    currentCheckpoint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    currentEpoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    totalAddresses: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    totalObjects: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    totalPackages: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
});
const AddressMetrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    checkpoint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    epoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    timestampMs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    cumulativeAddresses: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    cumulativeActiveAddresses: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])(),
    dailyActiveAddresses: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["number"])()
});
const AllEpochsAddressMetrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(AddressMetrics);
;
 //# sourceMappingURL=metrics.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/index.js [client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/common.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/objects.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$events$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/events.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/transactions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$normalized$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/normalized.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$validator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/validator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$coin$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/coin.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$epochs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/epochs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$subscriptions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/subscriptions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$name$2d$service$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/name-service.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$dynamic_fields$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/dynamic_fields.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$checkpoints$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/checkpoints.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$metrics$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/metrics.js [client] (ecmascript)");
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
;
;
;
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/index.js [client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$common$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/common.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/objects.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$events$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/events.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/transactions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$normalized$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/normalized.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$validator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/validator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$coin$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/coin.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$epochs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/epochs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$subscriptions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/subscriptions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$name$2d$service$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/name-service.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$dynamic_fields$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/dynamic_fields.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$checkpoints$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/checkpoints.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$metrics$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/metrics.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/index.js [client] (ecmascript) <locals>");
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/Inputs.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "BuilderCallArg": ()=>BuilderCallArg,
    "Inputs": ()=>Inputs,
    "ObjectCallArg": ()=>ObjectCallArg,
    "PureCallArg": ()=>PureCallArg,
    "getIdFromCallArg": ()=>getIdFromCallArg,
    "getSharedObjectInput": ()=>getSharedObjectInput,
    "isMutableSharedObjectInput": ()=>isMutableSharedObjectInput,
    "isSharedObjectInput": ()=>isSharedObjectInput
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/objects.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
;
;
;
;
;
const ObjectArg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        ImmOrOwned: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiObjectRef"]
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        Shared: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
            objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
            initialSharedVersion: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["integer"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()
            ]),
            mutable: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["boolean"])()
        })
    })
]);
const PureCallArg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    Pure: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["integer"])())
});
const ObjectCallArg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    Object: ObjectArg
});
const BuilderCallArg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    PureCallArg,
    ObjectCallArg
]);
function Pure(data, type) {
    return {
        Pure: Array.from(data instanceof Uint8Array ? data : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["isSerializedBcs"])(data) ? data.toBytes() : // NOTE: We explicitly set this to be growable to infinity, because we have maxSize validation at the builder-level:
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].ser(type, data, {
            maxSize: Infinity
        }).toBytes())
    };
}
const Inputs = {
    Pure,
    ObjectRef (param) {
        let { objectId, digest, version } = param;
        return {
            Object: {
                ImmOrOwned: {
                    digest,
                    version,
                    objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(objectId)
                }
            }
        };
    },
    SharedObjectRef (param) {
        let { objectId, mutable, initialSharedVersion } = param;
        return {
            Object: {
                Shared: {
                    mutable,
                    initialSharedVersion,
                    objectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(objectId)
                }
            }
        };
    }
};
function getIdFromCallArg(arg) {
    if (typeof arg === "string") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(arg);
    }
    if ("ImmOrOwned" in arg.Object) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(arg.Object.ImmOrOwned.objectId);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(arg.Object.Shared.objectId);
}
function getSharedObjectInput(arg) {
    return typeof arg === "object" && "Object" in arg && "Shared" in arg.Object ? arg.Object.Shared : void 0;
}
function isSharedObjectInput(arg) {
    return !!getSharedObjectInput(arg);
}
function isMutableSharedObjectInput(arg) {
    var _getSharedObjectInput;
    var _getSharedObjectInput_mutable;
    return (_getSharedObjectInput_mutable = (_getSharedObjectInput = getSharedObjectInput(arg)) === null || _getSharedObjectInput === void 0 ? void 0 : _getSharedObjectInput.mutable) !== null && _getSharedObjectInput_mutable !== void 0 ? _getSharedObjectInput_mutable : false;
}
;
 //# sourceMappingURL=Inputs.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/pure.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createPure": ()=>createPure
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <locals>");
;
function createPure(makePure) {
    function pure(value, type) {
        return makePure(value, type);
    }
    pure.u8 = (value)=>makePure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].U8.serialize(value));
    pure.u16 = (value)=>makePure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].U16.serialize(value));
    pure.u32 = (value)=>makePure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].U32.serialize(value));
    pure.u64 = (value)=>makePure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].U64.serialize(value));
    pure.u128 = (value)=>makePure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].U128.serialize(value));
    pure.u256 = (value)=>makePure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].U256.serialize(value));
    pure.bool = (value)=>makePure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].Bool.serialize(value));
    pure.string = (value)=>makePure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].String.serialize(value));
    pure.address = (value)=>makePure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].Address.serialize(value));
    return pure;
}
;
 //# sourceMappingURL=pure.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/serializer.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getPureSerializationType": ()=>getPureSerializationType,
    "isTxContext": ()=>isTxContext
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$framework$2f$framework$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/framework/framework.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$normalized$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/normalized.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
;
;
;
const STD_ASCII_MODULE_NAME = "ascii";
const STD_ASCII_STRUCT_NAME = "String";
const STD_UTF8_MODULE_NAME = "string";
const STD_UTF8_STRUCT_NAME = "String";
const STD_OPTION_MODULE_NAME = "option";
const STD_OPTION_STRUCT_NAME = "Option";
const RESOLVED_SUI_ID = {
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$framework$2f$framework$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SUI_FRAMEWORK_ADDRESS"],
    module: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$framework$2f$framework$2e$js__$5b$client$5d$__$28$ecmascript$29$__["OBJECT_MODULE_NAME"],
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$framework$2f$framework$2e$js__$5b$client$5d$__$28$ecmascript$29$__["ID_STRUCT_NAME"]
};
const RESOLVED_ASCII_STR = {
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$framework$2f$framework$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MOVE_STDLIB_ADDRESS"],
    module: STD_ASCII_MODULE_NAME,
    name: STD_ASCII_STRUCT_NAME
};
const RESOLVED_UTF8_STR = {
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$framework$2f$framework$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MOVE_STDLIB_ADDRESS"],
    module: STD_UTF8_MODULE_NAME,
    name: STD_UTF8_STRUCT_NAME
};
const RESOLVED_STD_OPTION = {
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$framework$2f$framework$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MOVE_STDLIB_ADDRESS"],
    module: STD_OPTION_MODULE_NAME,
    name: STD_OPTION_STRUCT_NAME
};
const isSameStruct = (a, b)=>a.address === b.address && a.module === b.module && a.name === b.name;
function isTxContext(param) {
    var _extractStructTag;
    const struct = (_extractStructTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$normalized$2e$js__$5b$client$5d$__$28$ecmascript$29$__["extractStructTag"])(param)) === null || _extractStructTag === void 0 ? void 0 : _extractStructTag.Struct;
    return (struct === null || struct === void 0 ? void 0 : struct.address) === "0x2" && (struct === null || struct === void 0 ? void 0 : struct.module) === "tx_context" && (struct === null || struct === void 0 ? void 0 : struct.name) === "TxContext";
}
function expectType(typeName, argVal) {
    if (typeof argVal === "undefined") {
        return;
    }
    if (typeof argVal !== typeName) {
        throw new Error("Expect ".concat(argVal, " to be ").concat(typeName, ", received ").concat(typeof argVal));
    }
}
const allowedTypes = [
    "Address",
    "Bool",
    "U8",
    "U16",
    "U32",
    "U64",
    "U128",
    "U256"
];
function getPureSerializationType(normalizedType, argVal) {
    if (typeof normalizedType === "string" && allowedTypes.includes(normalizedType)) {
        if (normalizedType in [
            "U8",
            "U16",
            "U32",
            "U64",
            "U128",
            "U256"
        ]) {
            expectType("number", argVal);
        } else if (normalizedType === "Bool") {
            expectType("boolean", argVal);
        } else if (normalizedType === "Address") {
            expectType("string", argVal);
            if (argVal && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidSuiAddress"])(argVal)) {
                throw new Error("Invalid Sui Address");
            }
        }
        return normalizedType.toLowerCase();
    } else if (typeof normalizedType === "string") {
        throw new Error("Unknown pure normalized type ".concat(JSON.stringify(normalizedType, null, 2)));
    }
    if ("Vector" in normalizedType) {
        if ((argVal === void 0 || typeof argVal === "string") && normalizedType.Vector === "U8") {
            return "string";
        }
        if (argVal !== void 0 && !Array.isArray(argVal)) {
            throw new Error("Expect ".concat(argVal, " to be a array, received ").concat(typeof argVal));
        }
        const innerType = getPureSerializationType(normalizedType.Vector, // undefined when argVal is empty
        argVal ? argVal[0] : void 0);
        if (innerType === void 0) {
            return;
        }
        return "vector<".concat(innerType, ">");
    }
    if ("Struct" in normalizedType) {
        if (isSameStruct(normalizedType.Struct, RESOLVED_ASCII_STR)) {
            return "string";
        } else if (isSameStruct(normalizedType.Struct, RESOLVED_UTF8_STR)) {
            return "utf8string";
        } else if (isSameStruct(normalizedType.Struct, RESOLVED_SUI_ID)) {
            return "address";
        } else if (isSameStruct(normalizedType.Struct, RESOLVED_STD_OPTION)) {
            const optionToVec = {
                Vector: normalizedType.Struct.typeArguments[0]
            };
            return getPureSerializationType(optionToVec, argVal);
        }
    }
    return void 0;
}
;
 //# sourceMappingURL=serializer.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/hash.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "hashTypedData": ()=>hashTypedData
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$blake2b$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/blake2b.js [client] (ecmascript)");
;
function hashTypedData(typeTag, data) {
    const typeTagBytes = Array.from("".concat(typeTag, "::")).map((e)=>e.charCodeAt(0));
    const dataWithTag = new Uint8Array(typeTagBytes.length + data.length);
    dataWithTag.set(typeTagBytes);
    dataWithTag.set(data, typeTagBytes.length);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$blake2b$2e$js__$5b$client$5d$__$28$ecmascript$29$__["blake2b"])(dataWithTag, {
        dkLen: 32
    });
}
;
 //# sourceMappingURL=hash.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/utils.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "create": ()=>create
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
;
function create(value, struct) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["create"])(value, struct);
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/Transactions.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "MakeMoveVecTransaction": ()=>MakeMoveVecTransaction,
    "MergeCoinsTransaction": ()=>MergeCoinsTransaction,
    "MoveCallTransaction": ()=>MoveCallTransaction,
    "PublishTransaction": ()=>PublishTransaction,
    "SplitCoinsTransaction": ()=>SplitCoinsTransaction,
    "TransactionArgument": ()=>TransactionArgument,
    "TransactionBlockInput": ()=>TransactionBlockInput,
    "TransactionType": ()=>TransactionType,
    "Transactions": ()=>Transactions,
    "TransferObjectsTransaction": ()=>TransferObjectsTransaction,
    "UpgradePolicy": ()=>UpgradePolicy,
    "UpgradeTransaction": ()=>UpgradeTransaction,
    "getTransactionType": ()=>getTransactionType
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$type$2d$tag$2d$serializer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/type-tag-serializer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/Inputs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/utils.js [client] (ecmascript)");
;
;
;
;
;
;
;
const option = (some)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
            None: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])(true),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])(null)
            ])
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
            Some: some
        })
    ]);
const TransactionBlockInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Input"),
        index: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["integer"])(),
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["any"])()),
        type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("object"))
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Input"),
        index: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["integer"])(),
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["any"])()),
        type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("pure")
    })
]);
const TransactionArgumentTypes = [
    TransactionBlockInput,
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("GasCoin")
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Result"),
        index: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["integer"])()
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("NestedResult"),
        index: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["integer"])(),
        resultIndex: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["integer"])()
    })
];
const TransactionArgument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    ...TransactionArgumentTypes
]);
const MoveCallTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("MoveCall"),
    target: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["define"])("target", (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])().validator),
    typeArguments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    arguments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(TransactionArgument)
});
const TransferObjectsTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("TransferObjects"),
    objects: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(TransactionArgument),
    address: TransactionArgument
});
const SplitCoinsTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("SplitCoins"),
    coin: TransactionArgument,
    amounts: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(TransactionArgument)
});
const MergeCoinsTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("MergeCoins"),
    destination: TransactionArgument,
    sources: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(TransactionArgument)
});
const MakeMoveVecTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("MakeMoveVec"),
    // TODO: ideally we should use `TypeTag` instead of `record()` here,
    // but TypeTag is recursively defined and it's tricky to define a
    // recursive struct in superstruct
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(option((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["record"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["unknown"])()))),
    objects: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(TransactionArgument)
});
const PublishTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Publish"),
    modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["integer"])())),
    dependencies: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
var UpgradePolicy = /* @__PURE__ */ ((UpgradePolicy2)=>{
    UpgradePolicy2[UpgradePolicy2["COMPATIBLE"] = 0] = "COMPATIBLE";
    UpgradePolicy2[UpgradePolicy2["ADDITIVE"] = 128] = "ADDITIVE";
    UpgradePolicy2[UpgradePolicy2["DEP_ONLY"] = 192] = "DEP_ONLY";
    return UpgradePolicy2;
})(UpgradePolicy || {});
const UpgradeTransaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])("Upgrade"),
    modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["integer"])())),
    dependencies: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    packageId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])(),
    ticket: TransactionArgument
});
const TransactionTypes = [
    MoveCallTransaction,
    TransferObjectsTransaction,
    SplitCoinsTransaction,
    MergeCoinsTransaction,
    PublishTransaction,
    UpgradeTransaction,
    MakeMoveVecTransaction
];
const TransactionType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    ...TransactionTypes
]);
function getTransactionType(data) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["assert"])(data, TransactionType);
    return TransactionTypes.find((schema)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(data, schema));
}
const Transactions = {
    MoveCall (input) {
        var _input_arguments, _input_typeArguments;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["create"])({
            kind: "MoveCall",
            target: input.target,
            arguments: (_input_arguments = input.arguments) !== null && _input_arguments !== void 0 ? _input_arguments : [],
            typeArguments: (_input_typeArguments = input.typeArguments) !== null && _input_typeArguments !== void 0 ? _input_typeArguments : []
        }, MoveCallTransaction);
    },
    TransferObjects (objects, address) {
        if (address.kind === "Input" && address.type === "pure" && typeof address.value !== "object") {
            address.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Inputs"].Pure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].Address.serialize(address.value));
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["create"])({
            kind: "TransferObjects",
            objects,
            address
        }, TransferObjectsTransaction);
    },
    SplitCoins (coin, amounts) {
        amounts.forEach((input)=>{
            if (input.kind === "Input" && input.type === "pure" && typeof input.value !== "object") {
                input.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Inputs"].Pure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].U64.serialize(input.value));
            }
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["create"])({
            kind: "SplitCoins",
            coin,
            amounts
        }, SplitCoinsTransaction);
    },
    MergeCoins (destination, sources) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["create"])({
            kind: "MergeCoins",
            destination,
            sources
        }, MergeCoinsTransaction);
    },
    Publish (param) {
        let { modules, dependencies } = param;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["create"])({
            kind: "Publish",
            modules: modules.map((module)=>typeof module === "string" ? Array.from((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["fromB64"])(module)) : module),
            dependencies: dependencies.map((dep)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiObjectId"])(dep))
        }, PublishTransaction);
    },
    Upgrade (param) {
        let { modules, dependencies, packageId, ticket } = param;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["create"])({
            kind: "Upgrade",
            modules: modules.map((module)=>typeof module === "string" ? Array.from((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["fromB64"])(module)) : module),
            dependencies: dependencies.map((dep)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiObjectId"])(dep)),
            packageId,
            ticket
        }, UpgradeTransaction);
    },
    MakeMoveVec (param) {
        let { type, objects } = param;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["create"])({
            kind: "MakeMoveVec",
            type: type ? {
                Some: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$type$2d$tag$2d$serializer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TypeTagSerializer"].parseFromStr(type)
            } : {
                None: null
            },
            objects
        }, MakeMoveVecTransaction);
    }
};
;
 //# sourceMappingURL=Transactions.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/TransactionBlockData.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "SerializedTransactionDataBuilder": ()=>SerializedTransactionDataBuilder,
    "TransactionBlockDataBuilder": ()=>TransactionBlockDataBuilder,
    "TransactionExpiration": ()=>TransactionExpiration
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/objects.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$hash$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/hash.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/Inputs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/Transactions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/utils.js [client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const TransactionExpiration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["nullable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        Epoch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["integer"])()
    }),
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
        None: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["union"])([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])(true),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])(null)
        ])
    })
])));
const StringEncodedBigint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["define"])("StringEncodedBigint", (val)=>{
    if (![
        "string",
        "number",
        "bigint"
    ].includes(typeof val)) return false;
    try {
        BigInt(val);
        return true;
    } catch (e) {
        return false;
    }
});
const GasConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    budget: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(StringEncodedBigint),
    price: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])(StringEncodedBigint),
    payment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiObjectRef"])),
    owner: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])())
});
const SerializedTransactionDataBuilder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["object"])({
    version: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["literal"])(1),
    sender: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["optional"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["string"])()),
    expiration: TransactionExpiration,
    gasConfig: GasConfig,
    inputs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TransactionBlockInput"]),
    transactions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["array"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TransactionType"])
});
function prepareSuiAddress(address) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(address).replace("0x", "");
}
class TransactionBlockDataBuilder {
    static fromKindBytes(bytes) {
        const kind = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].TransactionKind.parse(bytes);
        const programmableTx = "ProgrammableTransaction" in kind ? kind.ProgrammableTransaction : null;
        if (!programmableTx) {
            throw new Error("Unable to deserialize from bytes.");
        }
        const serialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["create"])({
            version: 1,
            gasConfig: {},
            inputs: programmableTx.inputs.map((value, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["create"])({
                    kind: "Input",
                    value,
                    index,
                    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PureCallArg"]) ? "pure" : "object"
                }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TransactionBlockInput"])),
            transactions: programmableTx.transactions
        }, SerializedTransactionDataBuilder);
        return TransactionBlockDataBuilder.restore(serialized);
    }
    static fromBytes(bytes) {
        var _data_kind;
        const rawData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].TransactionData.parse(bytes);
        const data = rawData === null || rawData === void 0 ? void 0 : rawData.V1;
        const programmableTx = "ProgrammableTransaction" in data.kind ? data === null || data === void 0 ? void 0 : (_data_kind = data.kind) === null || _data_kind === void 0 ? void 0 : _data_kind.ProgrammableTransaction : null;
        if (!data || !programmableTx) {
            throw new Error("Unable to deserialize from bytes.");
        }
        const serialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["create"])({
            version: 1,
            sender: data.sender,
            expiration: data.expiration,
            gasConfig: data.gasData,
            inputs: programmableTx.inputs.map((value, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["create"])({
                    kind: "Input",
                    value,
                    index,
                    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PureCallArg"]) ? "pure" : "object"
                }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TransactionBlockInput"])),
            transactions: programmableTx.transactions
        }, SerializedTransactionDataBuilder);
        return TransactionBlockDataBuilder.restore(serialized);
    }
    static restore(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["assert"])(data, SerializedTransactionDataBuilder);
        const transactionData = new TransactionBlockDataBuilder();
        Object.assign(transactionData, data);
        return transactionData;
    }
    /**
   * Generate transaction digest.
   *
   * @param bytes BCS serialized transaction data
   * @returns transaction digest.
   */ static getDigestFromBytes(bytes) {
        const hash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$hash$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hashTypedData"])("TransactionData", bytes);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toB58"])(hash);
    }
    build() {
        let { maxSizeBytes = Infinity, overrides, onlyTransactionKind } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        const inputs = this.inputs.map((input)=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["assert"])(input.value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BuilderCallArg"]);
            return input.value;
        });
        const kind = {
            ProgrammableTransaction: {
                inputs,
                transactions: this.transactions
            }
        };
        if (onlyTransactionKind) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].TransactionKind.serialize(kind, {
                maxSize: maxSizeBytes
            }).toBytes();
        }
        var _overrides_expiration;
        const expiration = (_overrides_expiration = overrides === null || overrides === void 0 ? void 0 : overrides.expiration) !== null && _overrides_expiration !== void 0 ? _overrides_expiration : this.expiration;
        var _overrides_sender;
        const sender = (_overrides_sender = overrides === null || overrides === void 0 ? void 0 : overrides.sender) !== null && _overrides_sender !== void 0 ? _overrides_sender : this.sender;
        const gasConfig = {
            ...this.gasConfig,
            ...overrides === null || overrides === void 0 ? void 0 : overrides.gasConfig
        };
        if (!sender) {
            throw new Error("Missing transaction sender");
        }
        if (!gasConfig.budget) {
            throw new Error("Missing gas budget");
        }
        if (!gasConfig.payment) {
            throw new Error("Missing gas payment");
        }
        if (!gasConfig.price) {
            throw new Error("Missing gas price");
        }
        var _this_gasConfig_owner;
        const transactionData = {
            sender: prepareSuiAddress(sender),
            expiration: expiration ? expiration : {
                None: true
            },
            gasData: {
                payment: gasConfig.payment,
                owner: prepareSuiAddress((_this_gasConfig_owner = this.gasConfig.owner) !== null && _this_gasConfig_owner !== void 0 ? _this_gasConfig_owner : sender),
                price: BigInt(gasConfig.price),
                budget: BigInt(gasConfig.budget)
            },
            kind: {
                ProgrammableTransaction: {
                    inputs,
                    transactions: this.transactions
                }
            }
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].TransactionData.serialize({
            V1: transactionData
        }, {
            maxSize: maxSizeBytes
        }).toBytes();
    }
    getDigest() {
        const bytes = this.build({
            onlyTransactionKind: false
        });
        return TransactionBlockDataBuilder.getDigestFromBytes(bytes);
    }
    snapshot() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["create"])(this, SerializedTransactionDataBuilder);
    }
    constructor(clone){
        this.version = 1;
        this.sender = clone === null || clone === void 0 ? void 0 : clone.sender;
        this.expiration = clone === null || clone === void 0 ? void 0 : clone.expiration;
        var _clone_gasConfig;
        this.gasConfig = (_clone_gasConfig = clone === null || clone === void 0 ? void 0 : clone.gasConfig) !== null && _clone_gasConfig !== void 0 ? _clone_gasConfig : {};
        var _clone_inputs;
        this.inputs = (_clone_inputs = clone === null || clone === void 0 ? void 0 : clone.inputs) !== null && _clone_inputs !== void 0 ? _clone_inputs : [];
        var _clone_transactions;
        this.transactions = (_clone_transactions = clone === null || clone === void 0 ? void 0 : clone.transactions) !== null && _clone_transactions !== void 0 ? _clone_transactions : [];
    }
}
;
 //# sourceMappingURL=TransactionBlockData.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/TransactionBlock.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "TransactionBlock": ()=>TransactionBlock,
    "isTransactionBlock": ()=>isTransactionBlock
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$framework$2f$framework$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/framework/framework.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$normalized$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/normalized.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/types/objects.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/Inputs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$pure$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/pure.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$serializer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/serializer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$TransactionBlockData$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/TransactionBlockData.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/Transactions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/utils.js [client] (ecmascript)");
var __accessCheck = (obj, member, msg)=>{
    if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter)=>{
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value)=>{
    if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter)=>{
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
};
var __privateMethod = (obj, member, method)=>{
    __accessCheck(obj, member, "access private method");
    return method;
};
var _blockData, _input, input_fn, _normalizeTransactionArgument, normalizeTransactionArgument_fn, _getConfig, getConfig_fn, _validate, validate_fn, _prepareGasPayment, prepareGasPayment_fn, _prepareGasPrice, prepareGasPrice_fn, _prepareTransactions, prepareTransactions_fn, _prepare, prepare_fn;
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
;
;
const DefaultOfflineLimits = {
    maxPureArgumentSize: 16 * 1024,
    maxTxGas: 5e10,
    maxGasObjects: 256,
    maxTxSizeBytes: 128 * 1024
};
function createTransactionResult(index) {
    const baseResult = {
        kind: "Result",
        index
    };
    const nestedResults = [];
    const nestedResultFor = (resultIndex)=>{
        var _nestedResults_resultIndex;
        return (_nestedResults_resultIndex = nestedResults[resultIndex]) !== null && _nestedResults_resultIndex !== void 0 ? _nestedResults_resultIndex : nestedResults[resultIndex] = {
            kind: "NestedResult",
            index,
            resultIndex
        };
    };
    return new Proxy(baseResult, {
        set () {
            throw new Error("The transaction result is a proxy, and does not support setting properties directly");
        },
        // TODO: Instead of making this return a concrete argument, we should ideally
        // make it reference-based (so that this gets resolved at build-time), which
        // allows re-ordering transactions.
        get (target, property) {
            if (property in target) {
                return Reflect.get(target, property);
            }
            if (property === Symbol.iterator) {
                return function*() {
                    let i = 0;
                    while(true){
                        yield nestedResultFor(i);
                        i++;
                    }
                };
            }
            if (typeof property === "symbol") return;
            const resultIndex = parseInt(property, 10);
            if (Number.isNaN(resultIndex) || resultIndex < 0) return;
            return nestedResultFor(resultIndex);
        }
    });
}
function expectClient(options) {
    if (!options.client && !options.provider) {
        throw new Error("No provider passed to Transaction#build, but transaction data was not sufficient to build offline.");
    }
    var _options_client;
    return (_options_client = options.client) !== null && _options_client !== void 0 ? _options_client : options.provider;
}
const TRANSACTION_BRAND = Symbol.for("@mysten/transaction");
const LIMITS = {
    // The maximum gas that is allowed.
    maxTxGas: "max_tx_gas",
    // The maximum number of gas objects that can be selected for one transaction.
    maxGasObjects: "max_gas_payment_objects",
    // The maximum size (in bytes) that the transaction can be:
    maxTxSizeBytes: "max_tx_size_bytes",
    // The maximum size (in bytes) that pure arguments can be:
    maxPureArgumentSize: "max_pure_argument_size"
};
const GAS_SAFE_OVERHEAD = 1000n;
const MAX_OBJECTS_PER_FETCH = 50;
const chunk = (arr, size)=>Array.from({
        length: Math.ceil(arr.length / size)
    }, (_, i)=>arr.slice(i * size, i * size + size));
function isTransactionBlock(obj) {
    return !!obj && typeof obj === "object" && obj[TRANSACTION_BRAND] === true;
}
const _TransactionBlock = class {
    /** Returns `true` if the object is an instance of the Transaction builder class.
   * @deprecated Use `isTransactionBlock` from `@mysten/sui.js/transactions` instead.
   */ static is(obj) {
        return !!obj && typeof obj === "object" && obj[TRANSACTION_BRAND] === true;
    }
    /**
   * Converts from a serialize transaction kind (built with `build({ onlyTransactionKind: true })`) to a `Transaction` class.
   * Supports either a byte array, or base64-encoded bytes.
   */ static fromKind(serialized) {
        const tx = new _TransactionBlock();
        __privateSet(tx, _blockData, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$TransactionBlockData$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TransactionBlockDataBuilder"].fromKindBytes(typeof serialized === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["fromB64"])(serialized) : serialized));
        return tx;
    }
    /**
   * Converts from a serialized transaction format to a `Transaction` class.
   * There are two supported serialized formats:
   * - A string returned from `Transaction#serialize`. The serialized format must be compatible, or it will throw an error.
   * - A byte array (or base64-encoded bytes) containing BCS transaction data.
   */ static from(serialized) {
        const tx = new _TransactionBlock();
        if (typeof serialized !== "string" || !serialized.startsWith("{")) {
            __privateSet(tx, _blockData, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$TransactionBlockData$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TransactionBlockDataBuilder"].fromBytes(typeof serialized === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["fromB64"])(serialized) : serialized));
        } else {
            __privateSet(tx, _blockData, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$TransactionBlockData$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TransactionBlockDataBuilder"].restore(JSON.parse(serialized)));
        }
        return tx;
    }
    /**
   * A helper to retrieve the Transaction builder `Transactions`
   * @deprecated Either use the helper methods on the `TransactionBlock` class, or import `Transactions` from `@mysten/sui.js/transactions`.
   */ static get Transactions() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Transactions"];
    }
    /**
   * A helper to retrieve the Transaction builder `Inputs`
   * * @deprecated Either use the helper methods on the `TransactionBlock` class, or import `Inputs` from `@mysten/sui.js/transactions`.
   */ static get Inputs() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Inputs"];
    }
    setSender(sender) {
        __privateGet(this, _blockData).sender = sender;
    }
    /**
   * Sets the sender only if it has not already been set.
   * This is useful for sponsored transaction flows where the sender may not be the same as the signer address.
   */ setSenderIfNotSet(sender) {
        if (!__privateGet(this, _blockData).sender) {
            __privateGet(this, _blockData).sender = sender;
        }
    }
    setExpiration(expiration) {
        __privateGet(this, _blockData).expiration = expiration;
    }
    setGasPrice(price) {
        __privateGet(this, _blockData).gasConfig.price = String(price);
    }
    setGasBudget(budget) {
        __privateGet(this, _blockData).gasConfig.budget = String(budget);
    }
    setGasOwner(owner) {
        __privateGet(this, _blockData).gasConfig.owner = owner;
    }
    setGasPayment(payments) {
        __privateGet(this, _blockData).gasConfig.payment = payments.map((payment)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["mask"])(payment, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiObjectRef"]));
    }
    /** Get a snapshot of the transaction data, in JSON form: */ get blockData() {
        return __privateGet(this, _blockData).snapshot();
    }
    // Used to brand transaction classes so that they can be identified, even between multiple copies
    // of the builder.
    get [TRANSACTION_BRAND]() {
        return true;
    }
    // Temporary workaround for the wallet interface accidentally serializing transaction blocks via postMessage
    get pure() {
        Object.defineProperty(this, "pure", {
            enumerable: false,
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$pure$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createPure"])((value, type)=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["isSerializedBcs"])(value)) {
                    return __privateMethod(this, _input, input_fn).call(this, "pure", {
                        Pure: Array.from(value.toBytes())
                    });
                }
                return __privateMethod(this, _input, input_fn).call(this, "pure", value instanceof Uint8Array ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Inputs"].Pure(value) : type ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Inputs"].Pure(value, type) : value);
            })
        });
        return this.pure;
    }
    /** Returns an argument for the gas coin, to be used in a transaction. */ get gas() {
        return {
            kind: "GasCoin"
        };
    }
    /**
   * Add a new object input to the transaction.
   */ object(value) {
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getIdFromCallArg"])(value);
        const inserted = __privateGet(this, _blockData).inputs.find((i)=>i.type === "object" && id === (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getIdFromCallArg"])(i.value));
        return inserted !== null && inserted !== void 0 ? inserted : __privateMethod(this, _input, input_fn).call(this, "object", typeof value === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(value) : value);
    }
    /**
   * Add a new object input to the transaction using the fully-resolved object reference.
   * If you only have an object ID, use `builder.object(id)` instead.
   */ objectRef() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.object(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Inputs"].ObjectRef(...args));
    }
    /**
   * Add a new shared object input to the transaction using the fully-resolved shared object reference.
   * If you only have an object ID, use `builder.object(id)` instead.
   */ sharedObjectRef() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.object(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Inputs"].SharedObjectRef(...args));
    }
    /** Add a transaction to the transaction block. */ add(transaction) {
        const index = __privateGet(this, _blockData).transactions.push(transaction);
        return createTransactionResult(index - 1);
    }
    // Method shorthands:
    splitCoins(coin, amounts) {
        return this.add(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Transactions"].SplitCoins(typeof coin === "string" ? this.object(coin) : coin, amounts.map((amount)=>typeof amount === "number" || typeof amount === "bigint" || typeof amount === "string" ? this.pure.u64(amount) : __privateMethod(this, _normalizeTransactionArgument, normalizeTransactionArgument_fn).call(this, amount))));
    }
    mergeCoins(destination, sources) {
        return this.add(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Transactions"].MergeCoins(typeof destination === "string" ? this.object(destination) : destination, sources.map((src)=>typeof src === "string" ? this.object(src) : src)));
    }
    publish(param) {
        let { modules, dependencies } = param;
        return this.add(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Transactions"].Publish({
            modules,
            dependencies
        }));
    }
    upgrade(param) {
        let { modules, dependencies, packageId, ticket } = param;
        return this.add(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Transactions"].Upgrade({
            modules,
            dependencies,
            packageId,
            ticket: typeof ticket === "string" ? this.object(ticket) : ticket
        }));
    }
    moveCall(param) {
        let { arguments: args, typeArguments, target } = param;
        return this.add(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Transactions"].MoveCall({
            arguments: args === null || args === void 0 ? void 0 : args.map((arg)=>__privateMethod(this, _normalizeTransactionArgument, normalizeTransactionArgument_fn).call(this, arg)),
            typeArguments,
            target
        }));
    }
    transferObjects(objects, address) {
        return this.add(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Transactions"].TransferObjects(objects.map((obj)=>typeof obj === "string" ? this.object(obj) : obj), typeof address === "string" ? this.pure.address(address) : __privateMethod(this, _normalizeTransactionArgument, normalizeTransactionArgument_fn).call(this, address)));
    }
    makeMoveVec(param) {
        let { type, objects } = param;
        return this.add(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Transactions"].MakeMoveVec({
            type,
            objects: objects.map((obj)=>typeof obj === "string" ? this.object(obj) : obj)
        }));
    }
    /**
   * Serialize the transaction to a string so that it can be sent to a separate context.
   * This is different from `build` in that it does not serialize to BCS bytes, and instead
   * uses a separate format that is unique to the transaction builder. This allows
   * us to serialize partially-complete transactions, that can then be completed and
   * built in a separate context.
   *
   * For example, a dapp can construct a transaction, but not provide gas objects
   * or a gas budget. The transaction then can be sent to the wallet, where this
   * information is automatically filled in (e.g. by querying for coin objects
   * and performing a dry run).
   */ serialize() {
        return JSON.stringify(__privateGet(this, _blockData).snapshot());
    }
    /** Build the transaction to BCS bytes, and sign it with the provided keypair. */ async sign(options) {
        const { signer, ...buildOptions } = options;
        const bytes = await this.build(buildOptions);
        return signer.signTransactionBlock(bytes);
    }
    /** Build the transaction to BCS bytes. */ async build() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        await __privateMethod(this, _prepare, prepare_fn).call(this, options);
        return __privateGet(this, _blockData).build({
            maxSizeBytes: __privateMethod(this, _getConfig, getConfig_fn).call(this, "maxTxSizeBytes", options),
            onlyTransactionKind: options.onlyTransactionKind
        });
    }
    /** Derive transaction digest */ async getDigest() {
        let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        await __privateMethod(this, _prepare, prepare_fn).call(this, options);
        return __privateGet(this, _blockData).getDigest();
    }
    constructor(transaction){
        /**
     * Dynamically create a new input, which is separate from the `input`. This is important
     * for generated clients to be able to define unique inputs that are non-overlapping with the
     * defined inputs.
     *
     * For `Uint8Array` type automatically convert the input into a `Pure` CallArg, since this
     * is the format required for custom serialization.
     *
     */ __privateAdd(this, _input);
        __privateAdd(this, _normalizeTransactionArgument);
        __privateAdd(this, _getConfig);
        __privateAdd(this, _validate);
        // The current default is just picking _all_ coins we can which may not be ideal.
        __privateAdd(this, _prepareGasPayment);
        __privateAdd(this, _prepareGasPrice);
        __privateAdd(this, _prepareTransactions);
        /**
     * Prepare the transaction by valdiating the transaction data and resolving all inputs
     * so that it can be built into bytes.
     */ __privateAdd(this, _prepare);
        __privateAdd(this, _blockData, void 0);
        __privateSet(this, _blockData, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$TransactionBlockData$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TransactionBlockDataBuilder"](transaction ? transaction.blockData : void 0));
    }
};
let TransactionBlock = _TransactionBlock;
_blockData = new WeakMap();
_input = new WeakSet();
input_fn = function(type, value) {
    const index = __privateGet(this, _blockData).inputs.length;
    const input = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["create"])({
        kind: "Input",
        // bigints can't be serialized to JSON, so just string-convert them here:
        value: typeof value === "bigint" ? String(value) : value,
        index,
        type
    }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TransactionBlockInput"]);
    __privateGet(this, _blockData).inputs.push(input);
    return input;
};
_normalizeTransactionArgument = new WeakSet();
normalizeTransactionArgument_fn = function(arg) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["isSerializedBcs"])(arg)) {
        return this.pure(arg);
    }
    return arg;
};
_getConfig = new WeakSet();
getConfig_fn = function(key, param) {
    let { protocolConfig, limits } = param;
    if (limits && typeof limits[key] === "number") {
        return limits[key];
    }
    if (!protocolConfig) {
        return DefaultOfflineLimits[key];
    }
    const attribute = protocolConfig === null || protocolConfig === void 0 ? void 0 : protocolConfig.attributes[LIMITS[key]];
    if (!attribute) {
        throw new Error('Missing expected protocol config: "'.concat(LIMITS[key], '"'));
    }
    const value = "u64" in attribute ? attribute.u64 : "u32" in attribute ? attribute.u32 : attribute.f64;
    if (!value) {
        throw new Error('Unexpected protocol config value found for: "'.concat(LIMITS[key], '"'));
    }
    return Number(value);
};
_validate = new WeakSet();
validate_fn = function(options) {
    const maxPureArgumentSize = __privateMethod(this, _getConfig, getConfig_fn).call(this, "maxPureArgumentSize", options);
    __privateGet(this, _blockData).inputs.forEach((input, index)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(input.value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PureCallArg"])) {
            if (input.value.Pure.length > maxPureArgumentSize) {
                throw new Error("Input at index ".concat(index, " is too large, max pure input size is ").concat(maxPureArgumentSize, " bytes, got ").concat(input.value.Pure.length, " bytes"));
            }
        }
    });
};
_prepareGasPayment = new WeakSet();
prepareGasPayment_fn = async function(options) {
    if (__privateGet(this, _blockData).gasConfig.payment) {
        const maxGasObjects = __privateMethod(this, _getConfig, getConfig_fn).call(this, "maxGasObjects", options);
        if (__privateGet(this, _blockData).gasConfig.payment.length > maxGasObjects) {
            throw new Error("Payment objects exceed maximum amount: ".concat(maxGasObjects));
        }
    }
    if (options.onlyTransactionKind || __privateGet(this, _blockData).gasConfig.payment) {
        return;
    }
    var __privateGet_gasConfig_owner;
    const gasOwner = (__privateGet_gasConfig_owner = __privateGet(this, _blockData).gasConfig.owner) !== null && __privateGet_gasConfig_owner !== void 0 ? __privateGet_gasConfig_owner : __privateGet(this, _blockData).sender;
    const coins = await expectClient(options).getCoins({
        owner: gasOwner,
        coinType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$framework$2f$framework$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SUI_TYPE_ARG"]
    });
    const paymentCoins = coins.data.filter((coin)=>{
        const matchingInput = __privateGet(this, _blockData).inputs.find((input)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(input.value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BuilderCallArg"]) && "Object" in input.value && "ImmOrOwned" in input.value.Object) {
                return coin.coinObjectId === input.value.Object.ImmOrOwned.objectId;
            }
            return false;
        });
        return !matchingInput;
    }).slice(0, __privateMethod(this, _getConfig, getConfig_fn).call(this, "maxGasObjects", options) - 1).map((coin)=>({
            objectId: coin.coinObjectId,
            digest: coin.digest,
            version: coin.version
        }));
    if (!paymentCoins.length) {
        throw new Error("No valid gas coins found for the transaction.");
    }
    this.setGasPayment(paymentCoins);
};
_prepareGasPrice = new WeakSet();
prepareGasPrice_fn = async function(options) {
    if (options.onlyTransactionKind || __privateGet(this, _blockData).gasConfig.price) {
        return;
    }
    this.setGasPrice(await expectClient(options).getReferenceGasPrice());
};
_prepareTransactions = new WeakSet();
prepareTransactions_fn = async function(options) {
    const { inputs, transactions } = __privateGet(this, _blockData);
    const moveModulesToResolve = [];
    const objectsToResolve = [];
    inputs.forEach((input)=>{
        if (input.type === "object" && typeof input.value === "string") {
            objectsToResolve.push({
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(input.value),
                input
            });
            return;
        }
    });
    transactions.forEach((transaction)=>{
        if (transaction.kind === "MoveCall") {
            const needsResolution = transaction.arguments.some((arg)=>arg.kind === "Input" && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(inputs[arg.index].value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BuilderCallArg"]));
            if (needsResolution) {
                moveModulesToResolve.push(transaction);
            }
        }
        if (transaction.kind === "SplitCoins") {
            transaction.amounts.forEach((amount)=>{
                if (amount.kind === "Input") {
                    const input = inputs[amount.index];
                    if (typeof input.value !== "object") {
                        input.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Inputs"].Pure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].U64.serialize(input.value));
                    }
                }
            });
        }
        if (transaction.kind === "TransferObjects") {
            if (transaction.address.kind === "Input") {
                const input = inputs[transaction.address.index];
                if (typeof input.value !== "object") {
                    input.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Inputs"].Pure(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].Address.serialize(input.value));
                }
            }
        }
    });
    if (moveModulesToResolve.length) {
        await Promise.all(moveModulesToResolve.map(async (moveCall)=>{
            const [packageId, moduleName, functionName] = moveCall.target.split("::");
            const normalized = await expectClient(options).getNormalizedMoveFunction({
                package: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiObjectId"])(packageId),
                module: moduleName,
                function: functionName
            });
            const hasTxContext = normalized.parameters.length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$serializer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isTxContext"])(normalized.parameters.at(-1));
            const params = hasTxContext ? normalized.parameters.slice(0, normalized.parameters.length - 1) : normalized.parameters;
            if (params.length !== moveCall.arguments.length) {
                throw new Error("Incorrect number of arguments.");
            }
            params.forEach((param, i)=>{
                const arg = moveCall.arguments[i];
                if (arg.kind !== "Input") return;
                const input = inputs[arg.index];
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superstruct$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["is"])(input.value, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["BuilderCallArg"])) return;
                const inputValue = input.value;
                const serType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$serializer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getPureSerializationType"])(param, inputValue);
                if (serType) {
                    input.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Inputs"].Pure(inputValue, serType);
                    return;
                }
                const structVal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$normalized$2e$js__$5b$client$5d$__$28$ecmascript$29$__["extractStructTag"])(param);
                if (structVal != null || typeof param === "object" && "TypeParameter" in param) {
                    if (typeof inputValue !== "string") {
                        throw new Error("Expect the argument to be an object id string, got ".concat(JSON.stringify(inputValue, null, 2)));
                    }
                    objectsToResolve.push({
                        id: inputValue,
                        input,
                        normalizedType: param
                    });
                    return;
                }
                throw new Error("Unknown call arg type ".concat(JSON.stringify(param, null, 2), " for value ").concat(JSON.stringify(inputValue, null, 2)));
            });
        }));
    }
    if (objectsToResolve.length) {
        const dedupedIds = [
            ...new Set(objectsToResolve.map((param)=>{
                let { id } = param;
                return id;
            }))
        ];
        const objectChunks = chunk(dedupedIds, MAX_OBJECTS_PER_FETCH);
        const objects = (await Promise.all(objectChunks.map((chunk2)=>expectClient(options).multiGetObjects({
                ids: chunk2,
                options: {
                    showOwner: true
                }
            })))).flat();
        let objectsById = new Map(dedupedIds.map((id, index)=>{
            return [
                id,
                objects[index]
            ];
        }));
        const invalidObjects = Array.from(objectsById).filter((param)=>{
            let [_, obj] = param;
            return obj.error;
        }).map((param)=>{
            let [id, _] = param;
            return id;
        });
        if (invalidObjects.length) {
            throw new Error("The following input objects are invalid: ".concat(invalidObjects.join(", ")));
        }
        objectsToResolve.forEach((param)=>{
            let { id, input, normalizedType } = param;
            var _object_data;
            const object = objectsById.get(id);
            const owner = (_object_data = object.data) === null || _object_data === void 0 ? void 0 : _object_data.owner;
            const initialSharedVersion = owner && typeof owner === "object" && "Shared" in owner ? owner.Shared.initial_shared_version : void 0;
            if (initialSharedVersion) {
                const mutable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isMutableSharedObjectInput"])(input.value) || normalizedType != null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$normalized$2e$js__$5b$client$5d$__$28$ecmascript$29$__["extractMutableReference"])(normalizedType) != null;
                input.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Inputs"].SharedObjectRef({
                    objectId: id,
                    initialSharedVersion,
                    mutable
                });
            } else {
                input.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Inputs"].ObjectRef((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$types$2f$objects$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getObjectReference"])(object));
            }
        });
    }
};
_prepare = new WeakSet();
prepare_fn = async function(options) {
    if (!options.onlyTransactionKind && !__privateGet(this, _blockData).sender) {
        throw new Error("Missing transaction sender");
    }
    const client = options.client || options.provider;
    if (!options.protocolConfig && !options.limits && client) {
        options.protocolConfig = await client.getProtocolConfig();
    }
    await Promise.all([
        __privateMethod(this, _prepareGasPrice, prepareGasPrice_fn).call(this, options),
        __privateMethod(this, _prepareTransactions, prepareTransactions_fn).call(this, options)
    ]);
    if (!options.onlyTransactionKind) {
        await __privateMethod(this, _prepareGasPayment, prepareGasPayment_fn).call(this, options);
        if (!__privateGet(this, _blockData).gasConfig.budget) {
            const dryRunResult = await expectClient(options).dryRunTransactionBlock({
                transactionBlock: __privateGet(this, _blockData).build({
                    maxSizeBytes: __privateMethod(this, _getConfig, getConfig_fn).call(this, "maxTxSizeBytes", options),
                    overrides: {
                        gasConfig: {
                            budget: String(__privateMethod(this, _getConfig, getConfig_fn).call(this, "maxTxGas", options)),
                            payment: []
                        }
                    }
                })
            });
            if (dryRunResult.effects.status.status !== "success") {
                throw new Error("Dry run failed, could not automatically determine a budget: ".concat(dryRunResult.effects.status.error), {
                    cause: dryRunResult
                });
            }
            const safeOverhead = GAS_SAFE_OVERHEAD * BigInt(this.blockData.gasConfig.price || 1n);
            const baseComputationCostWithOverhead = BigInt(dryRunResult.effects.gasUsed.computationCost) + safeOverhead;
            const gasBudget = baseComputationCostWithOverhead + BigInt(dryRunResult.effects.gasUsed.storageCost) - BigInt(dryRunResult.effects.gasUsed.storageRebate);
            this.setGasBudget(gasBudget > baseComputationCostWithOverhead ? gasBudget : baseComputationCostWithOverhead);
        }
    }
    __privateMethod(this, _validate, validate_fn).call(this, options);
};
;
 //# sourceMappingURL=TransactionBlock.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/bcs.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ARGUMENT": ()=>ARGUMENT,
    "ARGUMENT_INNER": ()=>ARGUMENT_INNER,
    "CALL_ARG": ()=>CALL_ARG,
    "COMPRESSED_SIGNATURE": ()=>COMPRESSED_SIGNATURE,
    "ENUM_KIND": ()=>ENUM_KIND,
    "MULTISIG": ()=>MULTISIG,
    "MULTISIG_PK_MAP": ()=>MULTISIG_PK_MAP,
    "MULTISIG_PUBLIC_KEY": ()=>MULTISIG_PUBLIC_KEY,
    "OBJECT_ARG": ()=>OBJECT_ARG,
    "OPTION": ()=>OPTION,
    "PROGRAMMABLE_CALL": ()=>PROGRAMMABLE_CALL,
    "PROGRAMMABLE_CALL_INNER": ()=>PROGRAMMABLE_CALL_INNER,
    "PROGRAMMABLE_TX_BLOCK": ()=>PROGRAMMABLE_TX_BLOCK,
    "PUBLIC_KEY": ()=>PUBLIC_KEY,
    "TRANSACTION": ()=>TRANSACTION,
    "TRANSACTION_INNER": ()=>TRANSACTION_INNER,
    "TYPE_TAG": ()=>TYPE_TAG,
    "VECTOR": ()=>VECTOR
});
const ARGUMENT_INNER = "Argument";
const VECTOR = "vector";
const OPTION = "Option";
const CALL_ARG = "CallArg";
const TYPE_TAG = "TypeTag";
const OBJECT_ARG = "ObjectArg";
const PROGRAMMABLE_TX_BLOCK = "ProgrammableTransaction";
const PROGRAMMABLE_CALL_INNER = "ProgrammableMoveCall";
const TRANSACTION_INNER = "Transaction";
const COMPRESSED_SIGNATURE = "CompressedSignature";
const PUBLIC_KEY = "PublicKey";
const MULTISIG_PUBLIC_KEY = "MultiSigPublicKey";
const MULTISIG_PK_MAP = "MultiSigPkMap";
const MULTISIG = "MultiSig";
const ENUM_KIND = "EnumKind";
const TRANSACTION = TRANSACTION_INNER;
const ARGUMENT = ARGUMENT_INNER;
const PROGRAMMABLE_CALL = "ProgrammableMoveCall";
;
 //# sourceMappingURL=bcs.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/index.js [client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$TransactionBlock$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/TransactionBlock.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/Transactions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/Inputs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$serializer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/serializer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$bcs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/bcs.js [client] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
;
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/index.js [client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$TransactionBlock$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/TransactionBlock.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Transactions$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/Transactions.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$Inputs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/Inputs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$serializer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/serializer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$bcs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/bcs.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/index.js [client] (ecmascript) <locals>");
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/client.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "SUI_CLIENT_BRAND": ()=>SUI_CLIENT_BRAND,
    "SuiClient": ()=>SuiClient,
    "isSuiClient": ()=>isSuiClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$TransactionBlock$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/builder/TransactionBlock.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$http$2d$transport$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/http-transport.js [client] (ecmascript)");
;
;
;
;
const SUI_CLIENT_BRAND = Symbol.for("@mysten/SuiClient");
function isSuiClient(client) {
    return typeof client === "object" && client !== null && client[SUI_CLIENT_BRAND] === true;
}
class SuiClient {
    get [SUI_CLIENT_BRAND]() {
        return true;
    }
    async getRpcApiVersion() {
        const resp = await this.transport.request({
            method: "rpc.discover",
            params: []
        });
        return resp.info.version;
    }
    /**
   * Get all Coin<`coin_type`> objects owned by an address.
   */ async getCoins(input) {
        if (!input.owner || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidSuiAddress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(input.owner))) {
            throw new Error("Invalid Sui address");
        }
        return await this.transport.request({
            method: "suix_getCoins",
            params: [
                input.owner,
                input.coinType,
                input.cursor,
                input.limit
            ]
        });
    }
    /**
   * Get all Coin objects owned by an address.
   */ async getAllCoins(input) {
        if (!input.owner || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidSuiAddress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(input.owner))) {
            throw new Error("Invalid Sui address");
        }
        return await this.transport.request({
            method: "suix_getAllCoins",
            params: [
                input.owner,
                input.cursor,
                input.limit
            ]
        });
    }
    /**
   * Get the total coin balance for one coin type, owned by the address owner.
   */ async getBalance(input) {
        if (!input.owner || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidSuiAddress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(input.owner))) {
            throw new Error("Invalid Sui address");
        }
        return await this.transport.request({
            method: "suix_getBalance",
            params: [
                input.owner,
                input.coinType
            ]
        });
    }
    /**
   * Get the total coin balance for all coin types, owned by the address owner.
   */ async getAllBalances(input) {
        if (!input.owner || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidSuiAddress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(input.owner))) {
            throw new Error("Invalid Sui address");
        }
        return await this.transport.request({
            method: "suix_getAllBalances",
            params: [
                input.owner
            ]
        });
    }
    /**
   * Fetch CoinMetadata for a given coin type
   */ async getCoinMetadata(input) {
        return await this.transport.request({
            method: "suix_getCoinMetadata",
            params: [
                input.coinType
            ]
        });
    }
    /**
   *  Fetch total supply for a coin
   */ async getTotalSupply(input) {
        return await this.transport.request({
            method: "suix_getTotalSupply",
            params: [
                input.coinType
            ]
        });
    }
    /**
   * Invoke any RPC method
   * @param method the method to be invoked
   * @param args the arguments to be passed to the RPC request
   */ async call(method, params) {
        return await this.transport.request({
            method,
            params
        });
    }
    /**
   * Get Move function argument types like read, write and full access
   */ async getMoveFunctionArgTypes(input) {
        return await this.transport.request({
            method: "sui_getMoveFunctionArgTypes",
            params: [
                input.package,
                input.module,
                input.function
            ]
        });
    }
    /**
   * Get a map from module name to
   * structured representations of Move modules
   */ async getNormalizedMoveModulesByPackage(input) {
        return await this.transport.request({
            method: "sui_getNormalizedMoveModulesByPackage",
            params: [
                input.package
            ]
        });
    }
    /**
   * Get a structured representation of Move module
   */ async getNormalizedMoveModule(input) {
        return await this.transport.request({
            method: "sui_getNormalizedMoveModule",
            params: [
                input.package,
                input.module
            ]
        });
    }
    /**
   * Get a structured representation of Move function
   */ async getNormalizedMoveFunction(input) {
        return await this.transport.request({
            method: "sui_getNormalizedMoveFunction",
            params: [
                input.package,
                input.module,
                input.function
            ]
        });
    }
    /**
   * Get a structured representation of Move struct
   */ async getNormalizedMoveStruct(input) {
        return await this.transport.request({
            method: "sui_getNormalizedMoveStruct",
            params: [
                input.package,
                input.module,
                input.struct
            ]
        });
    }
    /**
   * Get all objects owned by an address
   */ async getOwnedObjects(input) {
        if (!input.owner || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidSuiAddress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(input.owner))) {
            throw new Error("Invalid Sui address");
        }
        return await this.transport.request({
            method: "suix_getOwnedObjects",
            params: [
                input.owner,
                {
                    filter: input.filter,
                    options: input.options
                },
                input.cursor,
                input.limit
            ]
        });
    }
    /**
   * Get details about an object
   */ async getObject(input) {
        if (!input.id || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidSuiObjectId"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiObjectId"])(input.id))) {
            throw new Error("Invalid Sui Object id");
        }
        return await this.transport.request({
            method: "sui_getObject",
            params: [
                input.id,
                input.options
            ]
        });
    }
    async tryGetPastObject(input) {
        return await this.transport.request({
            method: "sui_tryGetPastObject",
            params: [
                input.id,
                input.version,
                input.options
            ]
        });
    }
    /**
   * Batch get details about a list of objects. If any of the object ids are duplicates the call will fail
   */ async multiGetObjects(input) {
        input.ids.forEach((id)=>{
            if (!id || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidSuiObjectId"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiObjectId"])(id))) {
                throw new Error("Invalid Sui Object id ".concat(id));
            }
        });
        const hasDuplicates = input.ids.length !== new Set(input.ids).size;
        if (hasDuplicates) {
            throw new Error("Duplicate object ids in batch call ".concat(input.ids));
        }
        return await this.transport.request({
            method: "sui_multiGetObjects",
            params: [
                input.ids,
                input.options
            ]
        });
    }
    /**
   * Get transaction blocks for a given query criteria
   */ async queryTransactionBlocks(input) {
        return await this.transport.request({
            method: "suix_queryTransactionBlocks",
            params: [
                {
                    filter: input.filter,
                    options: input.options
                },
                input.cursor,
                input.limit,
                (input.order || "descending") === "descending"
            ]
        });
    }
    async getTransactionBlock(input) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidTransactionDigest"])(input.digest)) {
            throw new Error("Invalid Transaction digest");
        }
        return await this.transport.request({
            method: "sui_getTransactionBlock",
            params: [
                input.digest,
                input.options
            ]
        });
    }
    async multiGetTransactionBlocks(input) {
        input.digests.forEach((d)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidTransactionDigest"])(d)) {
                throw new Error("Invalid Transaction digest ".concat(d));
            }
        });
        const hasDuplicates = input.digests.length !== new Set(input.digests).size;
        if (hasDuplicates) {
            throw new Error("Duplicate digests in batch call ".concat(input.digests));
        }
        return await this.transport.request({
            method: "sui_multiGetTransactionBlocks",
            params: [
                input.digests,
                input.options
            ]
        });
    }
    async executeTransactionBlock(input) {
        return await this.transport.request({
            method: "sui_executeTransactionBlock",
            params: [
                typeof input.transactionBlock === "string" ? input.transactionBlock : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toB64"])(input.transactionBlock),
                Array.isArray(input.signature) ? input.signature : [
                    input.signature
                ],
                input.options,
                input.requestType
            ]
        });
    }
    async signAndExecuteTransactionBlock(param) {
        let { transactionBlock, signer, ...input } = param;
        let transactionBytes;
        if (transactionBlock instanceof Uint8Array) {
            transactionBytes = transactionBlock;
        } else {
            transactionBlock.setSenderIfNotSet(await signer.getPublicKey().toSuiAddress());
            transactionBytes = await transactionBlock.build({
                client: this
            });
        }
        const { signature, bytes } = await signer.signTransactionBlock(transactionBytes);
        return this.executeTransactionBlock({
            transactionBlock: bytes,
            signature,
            ...input
        });
    }
    /**
   * Get total number of transactions
   */ async getTotalTransactionBlocks() {
        const resp = await this.transport.request({
            method: "sui_getTotalTransactionBlocks",
            params: []
        });
        return BigInt(resp);
    }
    /**
   * Getting the reference gas price for the network
   */ async getReferenceGasPrice() {
        const resp = await this.transport.request({
            method: "suix_getReferenceGasPrice",
            params: []
        });
        return BigInt(resp);
    }
    /**
   * Return the delegated stakes for an address
   */ async getStakes(input) {
        if (!input.owner || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidSuiAddress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])(input.owner))) {
            throw new Error("Invalid Sui address");
        }
        return await this.transport.request({
            method: "suix_getStakes",
            params: [
                input.owner
            ]
        });
    }
    /**
   * Return the delegated stakes queried by id.
   */ async getStakesByIds(input) {
        input.stakedSuiIds.forEach((id)=>{
            if (!id || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidSuiObjectId"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiObjectId"])(id))) {
                throw new Error("Invalid Sui Stake id ".concat(id));
            }
        });
        return await this.transport.request({
            method: "suix_getStakesByIds",
            params: [
                input.stakedSuiIds
            ]
        });
    }
    /**
   * Return the latest system state content.
   */ async getLatestSuiSystemState() {
        return await this.transport.request({
            method: "suix_getLatestSuiSystemState",
            params: []
        });
    }
    /**
   * Get events for a given query criteria
   */ async queryEvents(input) {
        return await this.transport.request({
            method: "suix_queryEvents",
            params: [
                input.query,
                input.cursor,
                input.limit,
                (input.order || "descending") === "descending"
            ]
        });
    }
    /**
   * Subscribe to get notifications whenever an event matching the filter occurs
   */ async subscribeEvent(input) {
        return this.transport.subscribe({
            method: "suix_subscribeEvent",
            unsubscribe: "suix_unsubscribeEvent",
            params: [
                input.filter
            ],
            onMessage: input.onMessage
        });
    }
    async subscribeTransaction(input) {
        return this.transport.subscribe({
            method: "suix_subscribeTransaction",
            unsubscribe: "suix_unsubscribeTransaction",
            params: [
                input.filter
            ],
            onMessage: input.onMessage
        });
    }
    /**
   * Runs the transaction block in dev-inspect mode. Which allows for nearly any
   * transaction (or Move call) with any arguments. Detailed results are
   * provided, including both the transaction effects and any return values.
   */ async devInspectTransactionBlock(input) {
        let devInspectTxBytes;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$builder$2f$TransactionBlock$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isTransactionBlock"])(input.transactionBlock)) {
            input.transactionBlock.setSenderIfNotSet(input.sender);
            devInspectTxBytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toB64"])(await input.transactionBlock.build({
                client: this,
                onlyTransactionKind: true
            }));
        } else if (typeof input.transactionBlock === "string") {
            devInspectTxBytes = input.transactionBlock;
        } else if (input.transactionBlock instanceof Uint8Array) {
            devInspectTxBytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toB64"])(input.transactionBlock);
        } else {
            throw new Error("Unknown transaction block format.");
        }
        return await this.transport.request({
            method: "sui_devInspectTransactionBlock",
            params: [
                input.sender,
                devInspectTxBytes,
                input.gasPrice,
                input.epoch
            ]
        });
    }
    /**
   * Dry run a transaction block and return the result.
   */ async dryRunTransactionBlock(input) {
        return await this.transport.request({
            method: "sui_dryRunTransactionBlock",
            params: [
                typeof input.transactionBlock === "string" ? input.transactionBlock : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toB64"])(input.transactionBlock)
            ]
        });
    }
    /**
   * Return the list of dynamic field objects owned by an object
   */ async getDynamicFields(input) {
        if (!input.parentId || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidSuiObjectId"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiObjectId"])(input.parentId))) {
            throw new Error("Invalid Sui Object id");
        }
        return await this.transport.request({
            method: "suix_getDynamicFields",
            params: [
                input.parentId,
                input.cursor,
                input.limit
            ]
        });
    }
    /**
   * Return the dynamic field object information for a specified object
   */ async getDynamicFieldObject(input) {
        return await this.transport.request({
            method: "suix_getDynamicFieldObject",
            params: [
                input.parentId,
                input.name
            ]
        });
    }
    /**
   * Get the sequence number of the latest checkpoint that has been executed
   */ async getLatestCheckpointSequenceNumber() {
        const resp = await this.transport.request({
            method: "sui_getLatestCheckpointSequenceNumber",
            params: []
        });
        return String(resp);
    }
    /**
   * Returns information about a given checkpoint
   */ async getCheckpoint(input) {
        return await this.transport.request({
            method: "sui_getCheckpoint",
            params: [
                input.id
            ]
        });
    }
    /**
   * Returns historical checkpoints paginated
   */ async getCheckpoints(input) {
        return await this.transport.request({
            method: "sui_getCheckpoints",
            params: [
                input.cursor,
                input === null || input === void 0 ? void 0 : input.limit,
                input.descendingOrder
            ]
        });
    }
    /**
   * Return the committee information for the asked epoch
   */ async getCommitteeInfo(input) {
        return await this.transport.request({
            method: "suix_getCommitteeInfo",
            params: [
                input === null || input === void 0 ? void 0 : input.epoch
            ]
        });
    }
    async getNetworkMetrics() {
        return await this.transport.request({
            method: "suix_getNetworkMetrics",
            params: []
        });
    }
    async getAddressMetrics() {
        return await this.transport.request({
            method: "suix_getLatestAddressMetrics",
            params: []
        });
    }
    async getAllEpochAddressMetrics(input) {
        return await this.transport.request({
            method: "suix_getAllEpochAddressMetrics",
            params: [
                input === null || input === void 0 ? void 0 : input.descendingOrder
            ]
        });
    }
    /**
   * Return the committee information for the asked epoch
   */ async getEpochs(input) {
        return await this.transport.request({
            method: "suix_getEpochs",
            params: [
                input === null || input === void 0 ? void 0 : input.cursor,
                input === null || input === void 0 ? void 0 : input.limit,
                input === null || input === void 0 ? void 0 : input.descendingOrder
            ]
        });
    }
    /**
   * Returns list of top move calls by usage
   */ async getMoveCallMetrics() {
        return await this.transport.request({
            method: "suix_getMoveCallMetrics",
            params: []
        });
    }
    /**
   * Return the committee information for the asked epoch
   */ async getCurrentEpoch() {
        return await this.transport.request({
            method: "suix_getCurrentEpoch",
            params: []
        });
    }
    /**
   * Return the Validators APYs
   */ async getValidatorsApy() {
        return await this.transport.request({
            method: "suix_getValidatorsApy",
            params: []
        });
    }
    // TODO: Migrate this to `sui_getChainIdentifier` once it is widely available.
    async getChainIdentifier() {
        const checkpoint = await this.getCheckpoint({
            id: "0"
        });
        const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["fromB58"])(checkpoint.digest);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toHEX"])(bytes.slice(0, 4));
    }
    async resolveNameServiceAddress(input) {
        return await this.transport.request({
            method: "suix_resolveNameServiceAddress",
            params: [
                input.name
            ]
        });
    }
    async resolveNameServiceNames(input) {
        return await this.transport.request({
            method: "suix_resolveNameServiceNames",
            params: [
                input.address,
                input.cursor,
                input.limit
            ]
        });
    }
    async getProtocolConfig(input) {
        return await this.transport.request({
            method: "sui_getProtocolConfig",
            params: [
                input === null || input === void 0 ? void 0 : input.version
            ]
        });
    }
    /**
   * Wait for a transaction block result to be available over the API.
   * This can be used in conjunction with `executeTransactionBlock` to wait for the transaction to
   * be available via the API.
   * This currently polls the `getTransactionBlock` API to check for the transaction.
   */ async waitForTransactionBlock(param) {
        let { signal, timeout = 60 * 1e3, pollInterval = 2 * 1e3, ...input } = param;
        const timeoutSignal = AbortSignal.timeout(timeout);
        const timeoutPromise = new Promise((_, reject)=>{
            timeoutSignal.addEventListener("abort", ()=>reject(timeoutSignal.reason));
        });
        timeoutPromise.catch(()=>{});
        while(!timeoutSignal.aborted){
            signal === null || signal === void 0 ? void 0 : signal.throwIfAborted();
            try {
                return await this.getTransactionBlock(input);
            } catch (e) {
                await Promise.race([
                    new Promise((resolve)=>setTimeout(resolve, pollInterval)),
                    timeoutPromise
                ]);
            }
        }
        timeoutSignal.throwIfAborted();
        throw new Error("Unexpected error while waiting for transaction block.");
    }
    /**
   * Establish a connection to a Sui RPC endpoint
   *
   * @param options configuration options for the API Client
   */ constructor(options){
        var _options_transport;
        this.transport = (_options_transport = options.transport) !== null && _options_transport !== void 0 ? _options_transport : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$http$2d$transport$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SuiHTTPTransport"]({
            url: options.url
        });
    }
}
;
 //# sourceMappingURL=client.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/index.js [client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$rpc$2f$errors$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/rpc/errors.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$http$2d$transport$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/http-transport.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$network$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/network.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/client.js [client] (ecmascript)");
;
;
;
;
;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/index.js [client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$rpc$2f$errors$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/rpc/errors.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$http$2d$transport$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/http-transport.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$network$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/network.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$types$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/types/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$client$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/client/index.js [client] (ecmascript) <locals>");
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/faucet/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "FaucetRateLimitError": ()=>FaucetRateLimitError,
    "getFaucetHost": ()=>getFaucetHost,
    "getFaucetRequestStatus": ()=>getFaucetRequestStatus,
    "requestSuiFromFaucetV0": ()=>requestSuiFromFaucetV0,
    "requestSuiFromFaucetV1": ()=>requestSuiFromFaucetV1
});
class FaucetRateLimitError extends Error {
}
async function faucetRequest(param) {
    let { host, path, body, headers, method } = param;
    const endpoint = new URL(path, host).toString();
    const res = await fetch(endpoint, {
        method,
        body: body ? JSON.stringify(body) : void 0,
        headers: {
            "Content-Type": "application/json",
            ...headers || {}
        }
    });
    if (res.status === 429) {
        throw new FaucetRateLimitError("Too many requests from this client have been sent to the faucet. Please retry later");
    }
    try {
        const parsed = await res.json();
        if (parsed.error) {
            throw new Error("Faucet returns error: ".concat(parsed.error));
        }
        return parsed;
    } catch (e) {
        throw new Error("Encountered error when parsing response from faucet, error: ".concat(e, ", status ").concat(res.status, ", response ").concat(res));
    }
}
async function requestSuiFromFaucetV0(input) {
    return faucetRequest({
        host: input.host,
        path: "/gas",
        body: {
            FixedAmountRequest: {
                recipient: input.recipient
            }
        },
        headers: input.headers,
        method: "POST"
    });
}
async function requestSuiFromFaucetV1(input) {
    return faucetRequest({
        host: input.host,
        path: "/v1/gas",
        body: {
            FixedAmountRequest: {
                recipient: input.recipient
            }
        },
        headers: input.headers,
        method: "POST"
    });
}
async function getFaucetRequestStatus(input) {
    return faucetRequest({
        host: input.host,
        path: "/v1/status/".concat(input.taskId),
        headers: input.headers,
        method: "GET"
    });
}
function getFaucetHost(network) {
    switch(network){
        case "testnet":
            return "https://faucet.testnet.sui.io";
        case "devnet":
            return "https://faucet.devnet.sui.io";
        case "localnet":
            return "http://127.0.0.1:9123";
        default:
            throw new Error("Unknown network: ".concat(network));
    }
}
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/intent.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "AppId": ()=>AppId,
    "IntentScope": ()=>IntentScope,
    "IntentVersion": ()=>IntentVersion,
    "messageWithIntent": ()=>messageWithIntent
});
var AppId = /* @__PURE__ */ ((AppId2)=>{
    AppId2[AppId2["Sui"] = 0] = "Sui";
    return AppId2;
})(AppId || {});
var IntentVersion = /* @__PURE__ */ ((IntentVersion2)=>{
    IntentVersion2[IntentVersion2["V0"] = 0] = "V0";
    return IntentVersion2;
})(IntentVersion || {});
var IntentScope = /* @__PURE__ */ ((IntentScope2)=>{
    IntentScope2[IntentScope2["TransactionData"] = 0] = "TransactionData";
    IntentScope2[IntentScope2["TransactionEffects"] = 1] = "TransactionEffects";
    IntentScope2[IntentScope2["CheckpointSummary"] = 2] = "CheckpointSummary";
    IntentScope2[IntentScope2["PersonalMessage"] = 3] = "PersonalMessage";
    return IntentScope2;
})(IntentScope || {});
function intentWithScope(scope) {
    return [
        scope,
        0 /* V0 */ ,
        0 /* Sui */ 
    ];
}
function messageWithIntent(scope, message) {
    const intent = intentWithScope(scope);
    const intentMessage = new Uint8Array(intent.length + message.length);
    intentMessage.set(intent);
    intentMessage.set(message, intent.length);
    return intentMessage;
}
;
 //# sourceMappingURL=intent.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/signature-scheme.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "SIGNATURE_FLAG_TO_SCHEME": ()=>SIGNATURE_FLAG_TO_SCHEME,
    "SIGNATURE_SCHEME_TO_FLAG": ()=>SIGNATURE_SCHEME_TO_FLAG,
    "SIGNATURE_SCHEME_TO_SIZE": ()=>SIGNATURE_SCHEME_TO_SIZE
});
const SIGNATURE_SCHEME_TO_FLAG = {
    ED25519: 0,
    Secp256k1: 1,
    Secp256r1: 2,
    MultiSig: 3,
    ZkLogin: 5
};
const SIGNATURE_SCHEME_TO_SIZE = {
    ED25519: 32,
    Secp256k1: 33,
    Secp256r1: 33
};
const SIGNATURE_FLAG_TO_SCHEME = {
    0: "ED25519",
    1: "Secp256k1",
    2: "Secp256r1",
    3: "MultiSig",
    5: "ZkLogin"
};
;
 //# sourceMappingURL=signature-scheme.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/zklogin/utils.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "toBigEndianBytes": ()=>toBigEndianBytes
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/utils.js [client] (ecmascript)");
;
function toBigEndianBytes(num, width) {
    const hex = num.toString(16);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hexToBytes"])(hex.padStart(width * 2, "0").slice(-width * 2));
}
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/zklogin/address.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "computeZkLoginAddressFromSeed": ()=>computeZkLoginAddressFromSeed
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$blake2b$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/blake2b.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/utils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2d$scheme$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/signature-scheme.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$zklogin$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/zklogin/utils.js [client] (ecmascript)");
;
;
;
;
;
function computeZkLoginAddressFromSeed(addressSeed, iss) {
    const addressSeedBytesBigEndian = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$zklogin$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["toBigEndianBytes"])(addressSeed, 32);
    const addressParamBytes = new TextEncoder().encode(iss);
    const tmp = new Uint8Array(2 + addressSeedBytesBigEndian.length + addressParamBytes.length);
    tmp.set([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2d$scheme$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SIGNATURE_SCHEME_TO_FLAG"].ZkLogin
    ]);
    tmp.set([
        addressParamBytes.length
    ], 1);
    tmp.set(addressParamBytes, 2);
    tmp.set(addressSeedBytesBigEndian, 2 + addressParamBytes.length);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["bytesToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$blake2b$2e$js__$5b$client$5d$__$28$ecmascript$29$__["blake2b"])(tmp, {
        dkLen: 32
    })).slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SUI_ADDRESS_LENGTH"] * 2));
}
;
 //# sourceMappingURL=address.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/zklogin/jwt-utils.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "extractClaimValue": ()=>extractClaimValue
});
function base64UrlCharTo6Bits(base64UrlChar) {
    if (base64UrlChar.length !== 1) {
        throw new Error("Invalid base64Url character: " + base64UrlChar);
    }
    const base64UrlCharacterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    const index = base64UrlCharacterSet.indexOf(base64UrlChar);
    if (index === -1) {
        throw new Error("Invalid base64Url character: " + base64UrlChar);
    }
    const binaryString = index.toString(2).padStart(6, "0");
    const bits = Array.from(binaryString).map(Number);
    return bits;
}
function base64UrlStringToBitVector(base64UrlString) {
    let bitVector = [];
    for(let i = 0; i < base64UrlString.length; i++){
        const base64UrlChar = base64UrlString.charAt(i);
        const bits = base64UrlCharTo6Bits(base64UrlChar);
        bitVector = bitVector.concat(bits);
    }
    return bitVector;
}
function decodeBase64URL(s, i) {
    if (s.length < 2) {
        throw new Error("Input (s = ".concat(s, ") is not tightly packed because s.length < 2"));
    }
    let bits = base64UrlStringToBitVector(s);
    const firstCharOffset = i % 4;
    if (firstCharOffset === 0) {} else if (firstCharOffset === 1) {
        bits = bits.slice(2);
    } else if (firstCharOffset === 2) {
        bits = bits.slice(4);
    } else {
        throw new Error("Input (s = ".concat(s, ") is not tightly packed because i%4 = 3 (i = ").concat(i, "))"));
    }
    const lastCharOffset = (i + s.length - 1) % 4;
    if (lastCharOffset === 3) {} else if (lastCharOffset === 2) {
        bits = bits.slice(0, bits.length - 2);
    } else if (lastCharOffset === 1) {
        bits = bits.slice(0, bits.length - 4);
    } else {
        throw new Error("Input (s = ".concat(s, ") is not tightly packed because (i + s.length - 1)%4 = 0 (i = ").concat(i, "))"));
    }
    if (bits.length % 8 !== 0) {
        throw new Error("We should never reach here...");
    }
    const bytes = new Uint8Array(Math.floor(bits.length / 8));
    let currentByteIndex = 0;
    for(let i2 = 0; i2 < bits.length; i2 += 8){
        const bitChunk = bits.slice(i2, i2 + 8);
        const byte = parseInt(bitChunk.join(""), 2);
        bytes[currentByteIndex++] = byte;
    }
    return new TextDecoder().decode(bytes);
}
function verifyExtendedClaim(claim) {
    if (!(claim.slice(-1) === "}" || claim.slice(-1) === ",")) {
        throw new Error("Invalid claim");
    }
    const json = JSON.parse("{" + claim.slice(0, -1) + "}");
    if (Object.keys(json).length !== 1) {
        throw new Error("Invalid claim");
    }
    const key = Object.keys(json)[0];
    return [
        key,
        json[key]
    ];
}
function extractClaimValue(claim, claimName) {
    const extendedClaim = decodeBase64URL(claim.value, claim.indexMod4);
    const [name, value] = verifyExtendedClaim(extendedClaim);
    if (name !== claimName) {
        throw new Error("Invalid field name: found ".concat(name, " expected ").concat(claimName));
    }
    return value;
}
;
 //# sourceMappingURL=jwt-utils.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/zklogin/bcs.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "zkLoginSignature": ()=>zkLoginSignature
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
;
const zkLoginSignature = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("ZkLoginSignature", {
    inputs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("ZkLoginSignatureInputs", {
        proofPoints: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("ZkLoginSignatureInputsProofPoints", {
            a: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].string()),
            b: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].string())),
            c: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].string())
        }),
        issBase64Details: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].struct("ZkLoginSignatureInputsClaim", {
            value: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].string(),
            indexMod4: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8()
        }),
        headerBase64: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].string(),
        addressSeed: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].string()
    }),
    maxEpoch: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u64(),
    userSignature: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["bcs"].u8())
});
;
 //# sourceMappingURL=bcs.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/zklogin/signature.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getZkLoginSignature": ()=>getZkLoginSignature,
    "parseZkLoginSignature": ()=>parseZkLoginSignature
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2d$scheme$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/signature-scheme.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$zklogin$2f$bcs$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/zklogin/bcs.js [client] (ecmascript)");
;
;
;
function getZkLoginSignatureBytes(param) {
    let { inputs, maxEpoch, userSignature } = param;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$zklogin$2f$bcs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["zkLoginSignature"].serialize({
        inputs,
        maxEpoch,
        userSignature: typeof userSignature === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["fromB64"])(userSignature) : userSignature
    }, {
        maxSize: 2048
    }).toBytes();
}
function getZkLoginSignature(param) {
    let { inputs, maxEpoch, userSignature } = param;
    const bytes = getZkLoginSignatureBytes({
        inputs,
        maxEpoch,
        userSignature
    });
    const signatureBytes = new Uint8Array(bytes.length + 1);
    signatureBytes.set([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2d$scheme$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SIGNATURE_SCHEME_TO_FLAG"].ZkLogin
    ]);
    signatureBytes.set(bytes, 1);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toB64"])(signatureBytes);
}
function parseZkLoginSignature(signature) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$zklogin$2f$bcs$2e$js__$5b$client$5d$__$28$ecmascript$29$__["zkLoginSignature"].parse(typeof signature === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["fromB64"])(signature) : signature);
}
;
 //# sourceMappingURL=signature.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/signature.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "parseSerializedSignature": ()=>parseSerializedSignature,
    "toSerializedSignature": ()=>toSerializedSignature
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$zklogin$2f$address$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/zklogin/address.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$zklogin$2f$jwt$2d$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/zklogin/jwt-utils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$zklogin$2f$signature$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/zklogin/signature.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2d$scheme$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/signature-scheme.js [client] (ecmascript)");
;
;
;
;
;
;
function toSerializedSignature(param) {
    let { signature, signatureScheme, pubKey, publicKey = pubKey } = param;
    if (!publicKey) {
        throw new Error("`publicKey` is required");
    }
    const pubKeyBytes = publicKey.toBytes();
    const serializedSignature = new Uint8Array(1 + signature.length + pubKeyBytes.length);
    serializedSignature.set([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2d$scheme$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SIGNATURE_SCHEME_TO_FLAG"][signatureScheme]
    ]);
    serializedSignature.set(signature, 1);
    serializedSignature.set(pubKeyBytes, 1 + signature.length);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toB64"])(serializedSignature);
}
function parseSerializedSignature(serializedSignature) {
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["fromB64"])(serializedSignature);
    const signatureScheme = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2d$scheme$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SIGNATURE_FLAG_TO_SCHEME"][bytes[0]];
    if (signatureScheme === "MultiSig") {
        const multisig = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].MultiSig.parse(bytes.slice(1));
        return {
            serializedSignature,
            signatureScheme,
            multisig,
            bytes
        };
    }
    if (signatureScheme === "ZkLogin") {
        const signatureBytes = bytes.slice(1);
        const { inputs, maxEpoch, userSignature } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$zklogin$2f$signature$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parseZkLoginSignature"])(signatureBytes);
        const { issBase64Details, addressSeed } = inputs;
        const iss = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$zklogin$2f$jwt$2d$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["extractClaimValue"])(issBase64Details, "iss");
        const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$zklogin$2f$address$2e$js__$5b$client$5d$__$28$ecmascript$29$__["computeZkLoginAddressFromSeed"])(BigInt(addressSeed), iss);
        return {
            serializedSignature,
            signatureScheme,
            zkLogin: {
                inputs,
                maxEpoch,
                userSignature,
                iss,
                address
            },
            bytes
        };
    }
    if (!(signatureScheme in __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2d$scheme$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SIGNATURE_SCHEME_TO_SIZE"])) {
        throw new Error("Unsupported signature scheme");
    }
    const size = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2d$scheme$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SIGNATURE_SCHEME_TO_SIZE"][signatureScheme];
    const signature = bytes.slice(1, bytes.length - size);
    const publicKey = bytes.slice(1 + signature.length);
    return {
        serializedSignature,
        signatureScheme,
        signature,
        publicKey,
        bytes
    };
}
;
 //# sourceMappingURL=signature.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/keypair.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "BaseSigner": ()=>BaseSigner,
    "Keypair": ()=>Keypair,
    "LEGACY_PRIVATE_KEY_SIZE": ()=>LEGACY_PRIVATE_KEY_SIZE,
    "PRIVATE_KEY_SIZE": ()=>PRIVATE_KEY_SIZE
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$blake2b$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/blake2b.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$intent$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/intent.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/signature.js [client] (ecmascript)");
;
;
;
;
;
const PRIVATE_KEY_SIZE = 32;
const LEGACY_PRIVATE_KEY_SIZE = 64;
class BaseSigner {
    /**
   * Sign messages with a specific intent. By combining the message bytes with the intent before hashing and signing,
   * it ensures that a signed message is tied to a specific purpose and domain separator is provided
   */ async signWithIntent(bytes, intent) {
        const intentMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$intent$2e$js__$5b$client$5d$__$28$ecmascript$29$__["messageWithIntent"])(intent, bytes);
        const digest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$blake2b$2e$js__$5b$client$5d$__$28$ecmascript$29$__["blake2b"])(intentMessage, {
            dkLen: 32
        });
        const signature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2e$js__$5b$client$5d$__$28$ecmascript$29$__["toSerializedSignature"])({
            signature: await this.sign(digest),
            signatureScheme: this.getKeyScheme(),
            pubKey: this.getPublicKey()
        });
        return {
            signature,
            bytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toB64"])(bytes)
        };
    }
    /**
   * Signs provided transaction block by calling `signWithIntent()` with a `TransactionData` provided as intent scope
   */ async signTransactionBlock(bytes) {
        return this.signWithIntent(bytes, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$intent$2e$js__$5b$client$5d$__$28$ecmascript$29$__["IntentScope"].TransactionData);
    }
    /**
   * Signs provided personal message by calling `signWithIntent()` with a `PersonalMessage` provided as intent scope
   */ async signPersonalMessage(bytes) {
        return this.signWithIntent(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].u8()).serialize(bytes).toBytes(), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$intent$2e$js__$5b$client$5d$__$28$ecmascript$29$__["IntentScope"].PersonalMessage);
    }
    /**
   * @deprecated use `signPersonalMessage` instead
   */ async signMessage(bytes) {
        return this.signPersonalMessage(bytes);
    }
    toSuiAddress() {
        return this.getPublicKey().toSuiAddress();
    }
}
class Keypair extends BaseSigner {
}
;
 //# sourceMappingURL=keypair.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/mnemonics.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "isValidBIP32Path": ()=>isValidBIP32Path,
    "isValidHardenedPath": ()=>isValidHardenedPath,
    "mnemonicToSeed": ()=>mnemonicToSeed,
    "mnemonicToSeedHex": ()=>mnemonicToSeedHex
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$scure$2f$bip39$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@scure/bip39/esm/index.js [client] (ecmascript)");
;
;
function isValidHardenedPath(path) {
    if (!new RegExp("^m\\/44'\\/784'\\/[0-9]+'\\/[0-9]+'\\/[0-9]+'+$").test(path)) {
        return false;
    }
    return true;
}
function isValidBIP32Path(path) {
    if (!new RegExp("^m\\/(54|74)'\\/784'\\/[0-9]+'\\/[0-9]+\\/[0-9]+$").test(path)) {
        return false;
    }
    return true;
}
function mnemonicToSeed(mnemonics) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$scure$2f$bip39$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["mnemonicToSeedSync"])(mnemonics, "");
}
function mnemonicToSeedHex(mnemonics) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toHEX"])(mnemonicToSeed(mnemonics));
}
;
 //# sourceMappingURL=mnemonics.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/keypairs/ed25519/ed25519-hd-key.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "derivePath": ()=>derivePath,
    "getMasterKeyFromSeed": ()=>getMasterKeyFromSeed,
    "getPublicKey": ()=>getPublicKey,
    "isValidPath": ()=>isValidPath,
    "pathRegex": ()=>pathRegex,
    "replaceDerive": ()=>replaceDerive
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$hmac$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/hmac.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha512$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/sha512.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tweetnacl$2f$nacl$2d$fast$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tweetnacl/nacl-fast.js [client] (ecmascript)");
;
;
;
;
const ED25519_CURVE = "ed25519 seed";
const HARDENED_OFFSET = 2147483648;
const pathRegex = new RegExp("^m(\\/[0-9]+')+$");
const replaceDerive = (val)=>val.replace("'", "");
const getMasterKeyFromSeed = (seed)=>{
    const h = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$hmac$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hmac"].create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha512$2e$js__$5b$client$5d$__$28$ecmascript$29$__["sha512"], ED25519_CURVE);
    const I = h.update((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["fromHEX"])(seed)).digest();
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    return {
        key: IL,
        chainCode: IR
    };
};
const CKDPriv = (param, index)=>{
    let { key, chainCode } = param;
    const indexBuffer = new ArrayBuffer(4);
    const cv = new DataView(indexBuffer);
    cv.setUint32(0, index);
    const data = new Uint8Array(1 + key.length + indexBuffer.byteLength);
    data.set(new Uint8Array(1).fill(0));
    data.set(key, 1);
    data.set(new Uint8Array(indexBuffer, 0, indexBuffer.byteLength), key.length + 1);
    const I = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$hmac$2e$js__$5b$client$5d$__$28$ecmascript$29$__["hmac"].create(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha512$2e$js__$5b$client$5d$__$28$ecmascript$29$__["sha512"], chainCode).update(data).digest();
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    return {
        key: IL,
        chainCode: IR
    };
};
const getPublicKey = function(privateKey) {
    let withZeroByte = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    const keyPair = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tweetnacl$2f$nacl$2d$fast$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].sign.keyPair.fromSeed(privateKey);
    const signPk = keyPair.secretKey.subarray(32);
    const newArr = new Uint8Array(signPk.length + 1);
    newArr.set([
        0
    ]);
    newArr.set(signPk, 1);
    return withZeroByte ? newArr : signPk;
};
const isValidPath = (path)=>{
    if (!pathRegex.test(path)) {
        return false;
    }
    return !path.split("/").slice(1).map(replaceDerive).some(isNaN);
};
const derivePath = function(path, seed) {
    let offset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : HARDENED_OFFSET;
    if (!isValidPath(path)) {
        throw new Error("Invalid derivation path");
    }
    const { key, chainCode } = getMasterKeyFromSeed(seed);
    const segments = path.split("/").slice(1).map(replaceDerive).map((el)=>parseInt(el, 10));
    return segments.reduce((parentKeys, segment)=>CKDPriv(parentKeys, segment + offset), {
        key,
        chainCode
    });
};
;
 //# sourceMappingURL=ed25519-hd-key.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/publickey.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "PublicKey": ()=>PublicKey,
    "bytesEqual": ()=>bytesEqual
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$blake2b$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/blake2b.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/utils.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/bcs/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/utils/sui-types.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$intent$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/intent.js [client] (ecmascript)");
;
;
;
;
;
;
function bytesEqual(a, b) {
    if (a === b) return true;
    if (a.length !== b.length) {
        return false;
    }
    for(let i = 0; i < a.length; i++){
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
class PublicKey {
    /**
   * Checks if two public keys are equal
   */ equals(publicKey) {
        return bytesEqual(this.toRawBytes(), publicKey.toRawBytes());
    }
    /**
   * Return the base-64 representation of the public key
   */ toBase64() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toB64"])(this.toRawBytes());
    }
    /**
   * @deprecated use toBase64 instead.
   *
   * Return the base-64 representation of the public key
   */ toString() {
        return this.toBase64();
    }
    /**
   * Return the Sui representation of the public key encoded in
   * base-64. A Sui public key is formed by the concatenation
   * of the scheme flag with the raw bytes of the public key
   */ toSuiPublicKey() {
        const bytes = this.toSuiBytes();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toB64"])(bytes);
    }
    verifyWithIntent(bytes, signature, intent) {
        const intentMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$intent$2e$js__$5b$client$5d$__$28$ecmascript$29$__["messageWithIntent"])(intent, bytes);
        const digest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$blake2b$2e$js__$5b$client$5d$__$28$ecmascript$29$__["blake2b"])(intentMessage, {
            dkLen: 32
        });
        return this.verify(digest, signature);
    }
    /**
   * Verifies that the signature is valid for for the provided PersonalMessage
   */ verifyPersonalMessage(message, signature) {
        return this.verifyWithIntent(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].vector(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$bcs$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["bcs"].u8()).serialize(message).toBytes(), signature, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$intent$2e$js__$5b$client$5d$__$28$ecmascript$29$__["IntentScope"].PersonalMessage);
    }
    /**
   * Verifies that the signature is valid for for the provided TransactionBlock
   */ verifyTransactionBlock(transactionBlock, signature) {
        return this.verifyWithIntent(transactionBlock, signature, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$intent$2e$js__$5b$client$5d$__$28$ecmascript$29$__["IntentScope"].TransactionData);
    }
    /**
   * Returns the bytes representation of the public key
   * prefixed with the signature scheme flag
   */ toSuiBytes() {
        const rawBytes = this.toRawBytes();
        const suiBytes = new Uint8Array(rawBytes.length + 1);
        suiBytes.set([
            this.flag()
        ]);
        suiBytes.set(rawBytes, 1);
        return suiBytes;
    }
    /**
   * @deprecated use `toRawBytes` instead.
   */ toBytes() {
        return this.toRawBytes();
    }
    /**
   * Return the Sui address associated with this Ed25519 public key
   */ toSuiAddress() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["normalizeSuiAddress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$client$5d$__$28$ecmascript$29$__["bytesToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$blake2b$2e$js__$5b$client$5d$__$28$ecmascript$29$__["blake2b"])(this.toSuiBytes(), {
            dkLen: 32
        })).slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$utils$2f$sui$2d$types$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SUI_ADDRESS_LENGTH"] * 2));
    }
}
;
 //# sourceMappingURL=publickey.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/keypairs/ed25519/publickey.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "Ed25519PublicKey": ()=>Ed25519PublicKey
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tweetnacl$2f$nacl$2d$fast$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tweetnacl/nacl-fast.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$publickey$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/publickey.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2d$scheme$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/signature-scheme.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/signature.js [client] (ecmascript)");
;
;
;
;
;
const PUBLIC_KEY_SIZE = 32;
class Ed25519PublicKey extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$publickey$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PublicKey"] {
    /**
   * Checks if two Ed25519 public keys are equal
   */ equals(publicKey) {
        return super.equals(publicKey);
    }
    /**
   * Return the byte array representation of the Ed25519 public key
   */ toRawBytes() {
        return this.data;
    }
    /**
   * Return the Sui address associated with this Ed25519 public key
   */ flag() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2d$scheme$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SIGNATURE_SCHEME_TO_FLAG"]["ED25519"];
    }
    /**
   * Verifies that the signature is valid for for the provided message
   */ async verify(message, signature) {
        let bytes;
        if (typeof signature === "string") {
            const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$signature$2e$js__$5b$client$5d$__$28$ecmascript$29$__["parseSerializedSignature"])(signature);
            if (parsed.signatureScheme !== "ED25519") {
                throw new Error("Invalid signature scheme");
            }
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$publickey$2e$js__$5b$client$5d$__$28$ecmascript$29$__["bytesEqual"])(this.toRawBytes(), parsed.publicKey)) {
                throw new Error("Signature does not match public key");
            }
            bytes = parsed.signature;
        } else {
            bytes = signature;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tweetnacl$2f$nacl$2d$fast$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].sign.detached.verify(message, bytes, this.toRawBytes());
    }
    /**
   * Create a new Ed25519PublicKey object
   * @param value ed25519 public key as buffer or base-64 encoded string
   */ constructor(value){
        super();
        if (typeof value === "string") {
            this.data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["fromB64"])(value);
        } else if (value instanceof Uint8Array) {
            this.data = value;
        } else {
            this.data = Uint8Array.from(value);
        }
        if (this.data.length !== PUBLIC_KEY_SIZE) {
            throw new Error("Invalid public key input. Expected ".concat(PUBLIC_KEY_SIZE, " bytes, got ").concat(this.data.length));
        }
    }
}
Ed25519PublicKey.SIZE = PUBLIC_KEY_SIZE;
;
 //# sourceMappingURL=publickey.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/keypairs/ed25519/keypair.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "DEFAULT_ED25519_DERIVATION_PATH": ()=>DEFAULT_ED25519_DERIVATION_PATH,
    "Ed25519Keypair": ()=>Ed25519Keypair
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tweetnacl$2f$nacl$2d$fast$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tweetnacl/nacl-fast.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$keypair$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/keypair.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$mnemonics$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/cryptography/mnemonics.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$keypairs$2f$ed25519$2f$ed25519$2d$hd$2d$key$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/keypairs/ed25519/ed25519-hd-key.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$keypairs$2f$ed25519$2f$publickey$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/keypairs/ed25519/publickey.js [client] (ecmascript)");
;
;
;
;
;
;
const DEFAULT_ED25519_DERIVATION_PATH = "m/44'/784'/0'/0'/0'";
class Ed25519Keypair extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$keypair$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Keypair"] {
    /**
   * Get the key scheme of the keypair ED25519
   */ getKeyScheme() {
        return "ED25519";
    }
    /**
   * Generate a new random Ed25519 keypair
   */ static generate() {
        return new Ed25519Keypair(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tweetnacl$2f$nacl$2d$fast$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].sign.keyPair());
    }
    /**
   * Create a Ed25519 keypair from a raw secret key byte array, also known as seed.
   * This is NOT the private scalar which is result of hashing and bit clamping of
   * the raw secret key.
   *
   * The sui.keystore key is a list of Base64 encoded `flag || privkey`. To import
   * a key from sui.keystore to typescript, decode from base64 and remove the first
   * flag byte after checking it is indeed the Ed25519 scheme flag 0x00 (See more
   * on flag for signature scheme: https://github.com/MystenLabs/sui/blob/818406c5abdf7de1b80915a0519071eec3a5b1c7/crates/sui-types/src/crypto.rs#L1650):
   * ```
   * import { Ed25519Keypair, fromB64 } from '@mysten/sui.js';
   * const raw = fromB64(t[1]);
   * if (raw[0] !== 0 || raw.length !== PRIVATE_KEY_SIZE + 1) {
   *   throw new Error('invalid key');
   * }
   * const imported = Ed25519Keypair.fromSecretKey(raw.slice(1))
   * ```
   * @throws error if the provided secret key is invalid and validation is not skipped.
   *
   * @param secretKey secret key byte array
   * @param options: skip secret key validation
   */ static fromSecretKey(secretKey, options) {
        const secretKeyLength = secretKey.length;
        if (secretKeyLength !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$keypair$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PRIVATE_KEY_SIZE"]) {
            throw new Error("Wrong secretKey size. Expected ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$keypair$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PRIVATE_KEY_SIZE"], " bytes, got ").concat(secretKeyLength, "."));
        }
        const keypair = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tweetnacl$2f$nacl$2d$fast$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].sign.keyPair.fromSeed(secretKey);
        if (!options || !options.skipValidation) {
            const encoder = new TextEncoder();
            const signData = encoder.encode("sui validation");
            const signature = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tweetnacl$2f$nacl$2d$fast$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].sign.detached(signData, keypair.secretKey);
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tweetnacl$2f$nacl$2d$fast$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].sign.detached.verify(signData, signature, keypair.publicKey)) {
                throw new Error("provided secretKey is invalid");
            }
        }
        return new Ed25519Keypair(keypair);
    }
    /**
   * The public key for this Ed25519 keypair
   */ getPublicKey() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$keypairs$2f$ed25519$2f$publickey$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Ed25519PublicKey"](this.keypair.publicKey);
    }
    async sign(data) {
        return this.signData(data);
    }
    /**
   * Return the signature for the provided data using Ed25519.
   */ signData(data) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tweetnacl$2f$nacl$2d$fast$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].sign.detached(data, this.keypair.secretKey);
    }
    /**
   * Derive Ed25519 keypair from mnemonics and path. The mnemonics must be normalized
   * and validated against the english wordlist.
   *
   * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
   * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
   */ static deriveKeypair(mnemonics, path) {
        if (path == null) {
            path = DEFAULT_ED25519_DERIVATION_PATH;
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$mnemonics$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidHardenedPath"])(path)) {
            throw new Error("Invalid derivation path");
        }
        const { key } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$keypairs$2f$ed25519$2f$ed25519$2d$hd$2d$key$2e$js__$5b$client$5d$__$28$ecmascript$29$__["derivePath"])(path, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$mnemonics$2e$js__$5b$client$5d$__$28$ecmascript$29$__["mnemonicToSeedHex"])(mnemonics));
        return Ed25519Keypair.fromSecretKey(key);
    }
    /**
   * Derive Ed25519 keypair from mnemonicSeed and path.
   *
   * If path is none, it will default to m/44'/784'/0'/0'/0', otherwise the path must
   * be compliant to SLIP-0010 in form m/44'/784'/{account_index}'/{change_index}'/{address_index}'.
   */ static deriveKeypairFromSeed(seedHex, path) {
        if (path == null) {
            path = DEFAULT_ED25519_DERIVATION_PATH;
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$mnemonics$2e$js__$5b$client$5d$__$28$ecmascript$29$__["isValidHardenedPath"])(path)) {
            throw new Error("Invalid derivation path");
        }
        const { key } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$keypairs$2f$ed25519$2f$ed25519$2d$hd$2d$key$2e$js__$5b$client$5d$__$28$ecmascript$29$__["derivePath"])(path, seedHex);
        return Ed25519Keypair.fromSecretKey(key);
    }
    /**
   * This returns an exported keypair object, the private key field is the pure 32-byte seed.
   */ export() {
        return {
            schema: "ED25519",
            privateKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$bcs$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["toB64"])(this.keypair.secretKey.slice(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$cryptography$2f$keypair$2e$js__$5b$client$5d$__$28$ecmascript$29$__["PRIVATE_KEY_SIZE"]))
        };
    }
    /**
   * Create a new Ed25519 keypair instance.
   * Generate random keypair if no {@link Ed25519Keypair} is provided.
   *
   * @param keypair Ed25519 keypair
   */ constructor(keypair){
        super();
        if (keypair) {
            this.keypair = keypair;
        } else {
            this.keypair = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tweetnacl$2f$nacl$2d$fast$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].sign.keyPair();
        }
    }
}
;
 //# sourceMappingURL=keypair.js.map
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/keypairs/ed25519/index.js [client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$keypairs$2f$ed25519$2f$keypair$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/keypairs/ed25519/keypair.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$keypairs$2f$ed25519$2f$publickey$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/keypairs/ed25519/publickey.js [client] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/keypairs/ed25519/index.js [client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$keypairs$2f$ed25519$2f$keypair$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/keypairs/ed25519/keypair.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$keypairs$2f$ed25519$2f$publickey$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/keypairs/ed25519/publickey.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mysten$2f$wallet$2d$kit$2f$node_modules$2f40$mysten$2f$sui$2e$js$2f$dist$2f$esm$2f$keypairs$2f$ed25519$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/esm/keypairs/ed25519/index.js [client] (ecmascript) <locals>");
}),
}]);

//# sourceMappingURL=3fa79_%40mysten_sui_js_dist_esm_30351f33._.js.map