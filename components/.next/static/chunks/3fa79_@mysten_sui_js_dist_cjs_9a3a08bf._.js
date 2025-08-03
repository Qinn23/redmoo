(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/format.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var format_exports = {};
__export(format_exports, {
    formatAddress: ()=>formatAddress,
    formatDigest: ()=>formatDigest
});
module.exports = __toCommonJS(format_exports);
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
} //# sourceMappingURL=format.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/sui-types.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var sui_types_exports = {};
__export(sui_types_exports, {
    SUI_ADDRESS_LENGTH: ()=>SUI_ADDRESS_LENGTH,
    isValidSuiAddress: ()=>isValidSuiAddress,
    isValidSuiObjectId: ()=>isValidSuiObjectId,
    isValidTransactionDigest: ()=>isValidTransactionDigest,
    normalizeStructTag: ()=>normalizeStructTag,
    normalizeSuiAddress: ()=>normalizeSuiAddress,
    normalizeSuiObjectId: ()=>normalizeSuiObjectId,
    parseStructTag: ()=>parseStructTag
});
module.exports = __toCommonJS(sui_types_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
const TX_DIGEST_LENGTH = 32;
function isValidTransactionDigest(value) {
    try {
        const buffer = (0, import_bcs.fromB58)(value);
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
    const [address, module2] = type.split("::");
    const rest = type.slice(address.length + module2.length + 4);
    const name = rest.includes("<") ? rest.slice(0, rest.indexOf("<")) : rest;
    const typeParams = rest.includes("<") ? (0, import_bcs.splitGenericParameters)(rest.slice(rest.indexOf("<") + 1, rest.lastIndexOf(">"))).map((typeParam)=>parseTypeTag(typeParam.trim())) : [];
    return {
        address: normalizeSuiAddress(address),
        module: module2,
        name,
        typeParams
    };
}
function normalizeStructTag(type) {
    const { address, module: module2, name, typeParams } = typeof type === "string" ? parseStructTag(type) : type;
    const formattedTypeParams = typeParams.length > 0 ? "<".concat(typeParams.map((typeParam)=>typeof typeParam === "string" ? typeParam : normalizeStructTag(typeParam)).join(","), ">") : "";
    return "".concat(address, "::").concat(module2, "::").concat(name).concat(formattedTypeParams);
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
} //# sourceMappingURL=sui-types.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var utils_exports = {};
__export(utils_exports, {
    MIST_PER_SUI: ()=>MIST_PER_SUI,
    MOVE_STDLIB_ADDRESS: ()=>MOVE_STDLIB_ADDRESS,
    SUI_ADDRESS_LENGTH: ()=>import_sui_types.SUI_ADDRESS_LENGTH,
    SUI_CLOCK_OBJECT_ID: ()=>SUI_CLOCK_OBJECT_ID,
    SUI_DECIMALS: ()=>SUI_DECIMALS,
    SUI_FRAMEWORK_ADDRESS: ()=>SUI_FRAMEWORK_ADDRESS,
    SUI_SYSTEM_ADDRESS: ()=>SUI_SYSTEM_ADDRESS,
    SUI_SYSTEM_MODULE_NAME: ()=>SUI_SYSTEM_MODULE_NAME,
    SUI_SYSTEM_STATE_OBJECT_ID: ()=>SUI_SYSTEM_STATE_OBJECT_ID,
    SUI_TYPE_ARG: ()=>SUI_TYPE_ARG,
    assert: ()=>import_superstruct.assert,
    formatAddress: ()=>import_format.formatAddress,
    formatDigest: ()=>import_format.formatDigest,
    fromB64: ()=>import_bcs.fromB64,
    fromHEX: ()=>import_bcs.fromHEX,
    is: ()=>import_superstruct.is,
    isValidSuiAddress: ()=>import_sui_types.isValidSuiAddress,
    isValidSuiObjectId: ()=>import_sui_types.isValidSuiObjectId,
    isValidTransactionDigest: ()=>import_sui_types.isValidTransactionDigest,
    normalizeStructTag: ()=>import_sui_types.normalizeStructTag,
    normalizeSuiAddress: ()=>import_sui_types.normalizeSuiAddress,
    normalizeSuiObjectId: ()=>import_sui_types.normalizeSuiObjectId,
    parseStructTag: ()=>import_sui_types.parseStructTag,
    toB64: ()=>import_bcs.toB64,
    toHEX: ()=>import_bcs.toHEX
});
module.exports = __toCommonJS(utils_exports);
var import_format = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/format.js [client] (ecmascript)");
var import_sui_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/sui-types.js [client] (ecmascript)");
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
const SUI_DECIMALS = 9;
const MIST_PER_SUI = BigInt(1e9);
const MOVE_STDLIB_ADDRESS = "0x1";
const SUI_FRAMEWORK_ADDRESS = "0x2";
const SUI_SYSTEM_ADDRESS = "0x3";
const SUI_CLOCK_OBJECT_ID = (0, import_sui_types.normalizeSuiObjectId)("0x6");
const SUI_SYSTEM_MODULE_NAME = "sui_system";
const SUI_TYPE_ARG = "".concat(SUI_FRAMEWORK_ADDRESS, "::sui::SUI");
const SUI_SYSTEM_STATE_OBJECT_ID = (0, import_sui_types.normalizeSuiObjectId)("0x5"); //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/rpc/errors.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var errors_exports = {};
__export(errors_exports, {
    RPCValidationError: ()=>RPCValidationError
});
module.exports = __toCommonJS(errors_exports);
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
} //# sourceMappingURL=errors.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/rpc/websocket-client.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
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
var websocket_client_exports = {};
__export(websocket_client_exports, {
    DEFAULT_CLIENT_OPTIONS: ()=>DEFAULT_CLIENT_OPTIONS,
    WebsocketClient: ()=>WebsocketClient,
    getWebsocketUrl: ()=>getWebsocketUrl
});
module.exports = __toCommonJS(websocket_client_exports);
var import_client_js = __turbopack_context__.r("[project]/node_modules/@open-rpc/client-js/build/index.js [client] (ecmascript)");
var _client, _subscriptions, _disconnects, _setupClient, setupClient_fn, _reconnect, reconnect_fn;
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
    const transport = new import_client_js.WebSocketTransport(this.endpoint);
    const requestManager = new import_client_js.RequestManager([
        transport
    ]);
    __privateSet(this, _client, new import_client_js.Client(requestManager));
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
}; //# sourceMappingURL=websocket-client.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/version.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var version_exports = {};
__export(version_exports, {
    PACKAGE_VERSION: ()=>PACKAGE_VERSION,
    TARGETED_RPC_VERSION: ()=>TARGETED_RPC_VERSION
});
module.exports = __toCommonJS(version_exports);
const PACKAGE_VERSION = "0.43.3";
const TARGETED_RPC_VERSION = "1.12.0"; //# sourceMappingURL=version.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/http-transport.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var http_transport_exports = {};
__export(http_transport_exports, {
    SuiHTTPTransport: ()=>SuiHTTPTransport
});
module.exports = __toCommonJS(http_transport_exports);
var import_client_js = __turbopack_context__.r("[project]/node_modules/@open-rpc/client-js/build/index.js [client] (ecmascript)");
var import_websocket_client = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/rpc/websocket-client.js [client] (ecmascript)");
var import_version = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/version.js [client] (ecmascript)");
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
        const transport = new import_client_js.HTTPTransport((_rpc_url = rpc === null || rpc === void 0 ? void 0 : rpc.url) !== null && _rpc_url !== void 0 ? _rpc_url : url, {
            headers: {
                "Content-Type": "application/json",
                "Client-Sdk-Type": "typescript",
                "Client-Sdk-Version": import_version.PACKAGE_VERSION,
                "Client-Target-Api-Version": import_version.TARGETED_RPC_VERSION,
                ...rpc === null || rpc === void 0 ? void 0 : rpc.headers
            }
        });
        this.rpcClient = new import_client_js.Client(new import_client_js.RequestManager([
            transport
        ]));
        this.websocketClient = new import_websocket_client.WebsocketClient(websocketUrl !== null && websocketUrl !== void 0 ? websocketUrl : url, websocketOptions);
    }
} //# sourceMappingURL=http-transport.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/network.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var network_exports = {};
__export(network_exports, {
    getFullnodeUrl: ()=>getFullnodeUrl
});
module.exports = __toCommonJS(network_exports);
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
} //# sourceMappingURL=network.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/chain.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var chain_exports = {};
module.exports = __toCommonJS(chain_exports); //# sourceMappingURL=chain.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/coins.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var coins_exports = {};
module.exports = __toCommonJS(coins_exports); //# sourceMappingURL=coins.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/common.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var common_exports = {};
module.exports = __toCommonJS(common_exports); //# sourceMappingURL=common.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/changes.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var changes_exports = {};
module.exports = __toCommonJS(changes_exports); //# sourceMappingURL=changes.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/generated.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var generated_exports = {};
module.exports = __toCommonJS(generated_exports); //# sourceMappingURL=generated.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/params.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var params_exports = {};
module.exports = __toCommonJS(params_exports); //# sourceMappingURL=params.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __reExport = (target, mod, secondTarget)=>(__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var types_exports = {};
module.exports = __toCommonJS(types_exports);
__reExport(types_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/chain.js [client] (ecmascript)"), module.exports);
__reExport(types_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/coins.js [client] (ecmascript)"), module.exports);
__reExport(types_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/common.js [client] (ecmascript)"), module.exports);
__reExport(types_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/changes.js [client] (ecmascript)"), module.exports);
__reExport(types_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/generated.js [client] (ecmascript)"), module.exports);
__reExport(types_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/params.js [client] (ecmascript)"), module.exports); //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/bcs/type-tag-serializer.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var type_tag_serializer_exports = {};
__export(type_tag_serializer_exports, {
    TypeTagSerializer: ()=>TypeTagSerializer
});
module.exports = __toCommonJS(type_tag_serializer_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_sui_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/sui-types.js [client] (ecmascript)");
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
            const address = normalizeAddress ? (0, import_sui_types.normalizeSuiAddress)(structMatch[1]) : structMatch[1];
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
        return (0, import_bcs.splitGenericParameters)(str).map((tok)=>TypeTagSerializer.parseFromStr(tok, normalizeAddress));
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
} //# sourceMappingURL=type-tag-serializer.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/bcs/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var bcs_exports = {};
__export(bcs_exports, {
    TypeTagSerializer: ()=>import_type_tag_serializer2.TypeTagSerializer,
    bcs: ()=>suiBcs,
    bcsRegistry: ()=>bcsRegistry,
    isPureArg: ()=>isPureArg
});
module.exports = __toCommonJS(bcs_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_sui_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/sui-types.js [client] (ecmascript)");
var import_type_tag_serializer = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/bcs/type-tag-serializer.js [client] (ecmascript)");
var import_type_tag_serializer2 = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/bcs/type-tag-serializer.js [client] (ecmascript)");
function isPureArg(arg) {
    return arg.Pure !== void 0;
}
const bcsRegistry = new import_bcs.BCS({
    ...(0, import_bcs.getSuiMoveConfig)(),
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
    return import_bcs.bcs.u64({
        name: "unsafe_u64",
        ...options
    }).transform({
        input: (val)=>val,
        output: (val)=>Number(val)
    });
}
function optionEnum(type) {
    return import_bcs.bcs.enum("Option", {
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
const Address = import_bcs.bcs.bytes(import_sui_types.SUI_ADDRESS_LENGTH).transform({
    input: (val)=>typeof val === "string" ? (0, import_bcs.fromHEX)((0, import_sui_types.normalizeSuiAddress)(val)) : val,
    output: (val)=>(0, import_bcs.toHEX)(val)
});
const ObjectDigest = import_bcs.bcs.vector(import_bcs.bcs.u8()).transform({
    name: "ObjectDigest",
    input: (value)=>(0, import_bcs.fromB58)(value),
    output: (value)=>(0, import_bcs.toB58)(new Uint8Array(value))
});
const SuiObjectRef = import_bcs.bcs.struct("SuiObjectRef", {
    objectId: Address,
    version: import_bcs.bcs.u64(),
    digest: ObjectDigest
});
const SharedObjectRef = import_bcs.bcs.struct("SharedObjectRef", {
    objectId: Address,
    initialSharedVersion: import_bcs.bcs.u64(),
    mutable: import_bcs.bcs.bool()
});
const ObjectArg = import_bcs.bcs.enum("ObjectArg", {
    ImmOrOwned: SuiObjectRef,
    Shared: SharedObjectRef
});
const CallArg = import_bcs.bcs.enum("CallArg", {
    Pure: import_bcs.bcs.vector(import_bcs.bcs.u8()),
    Object: ObjectArg,
    ObjVec: import_bcs.bcs.vector(ObjectArg)
});
const TypeTag = import_bcs.bcs.enum("TypeTag", {
    bool: null,
    u8: null,
    u64: null,
    u128: null,
    address: null,
    signer: null,
    vector: import_bcs.bcs.lazy(()=>TypeTag),
    struct: import_bcs.bcs.lazy(()=>StructTag),
    u16: null,
    u32: null,
    u256: null
});
const Argument = enumKind(import_bcs.bcs.enum("Argument", {
    GasCoin: null,
    Input: import_bcs.bcs.struct("Input", {
        index: import_bcs.bcs.u16()
    }),
    Result: import_bcs.bcs.struct("Result", {
        index: import_bcs.bcs.u16()
    }),
    NestedResult: import_bcs.bcs.struct("NestedResult", {
        index: import_bcs.bcs.u16(),
        resultIndex: import_bcs.bcs.u16()
    })
}));
const ProgrammableMoveCall = import_bcs.bcs.struct("ProgrammableMoveCall", {
    package: Address,
    module: import_bcs.bcs.string(),
    function: import_bcs.bcs.string(),
    type_arguments: import_bcs.bcs.vector(TypeTag),
    arguments: import_bcs.bcs.vector(Argument)
}).transform({
    input: (data)=>{
        const [pkg, module2, fun] = data.target.split("::");
        const type_arguments = data.typeArguments.map((tag)=>import_type_tag_serializer.TypeTagSerializer.parseFromStr(tag, true));
        return {
            package: (0, import_sui_types.normalizeSuiAddress)(pkg),
            module: module2,
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
            typeArguments: data.type_arguments.map(import_type_tag_serializer.TypeTagSerializer.tagToString)
        };
    }
});
const Transaction = enumKind(import_bcs.bcs.enum("Transaction", {
    /**
     * A Move Call - any public Move function can be called via
     * this transaction. The results can be used that instant to pass
     * into the next transaction.
     */ MoveCall: ProgrammableMoveCall,
    /**
     * Transfer vector of objects to a receiver.
     */ TransferObjects: import_bcs.bcs.struct("TransferObjects", {
        objects: import_bcs.bcs.vector(Argument),
        address: Argument
    }),
    /**
     * Split `amount` from a `coin`.
     */ SplitCoins: import_bcs.bcs.struct("SplitCoins", {
        coin: Argument,
        amounts: import_bcs.bcs.vector(Argument)
    }),
    /**
     * Merge Vector of Coins (`sources`) into a `destination`.
     */ MergeCoins: import_bcs.bcs.struct("MergeCoins", {
        destination: Argument,
        sources: import_bcs.bcs.vector(Argument)
    }),
    /**
     * Publish a Move module.
     */ Publish: import_bcs.bcs.struct("Publish", {
        modules: import_bcs.bcs.vector(import_bcs.bcs.vector(import_bcs.bcs.u8())),
        dependencies: import_bcs.bcs.vector(Address)
    }),
    /**
     * Build a vector of objects using the input arguments.
     * It is impossible to construct a `vector<T: key>` otherwise,
     * so this call serves a utility function.
     */ MakeMoveVec: import_bcs.bcs.struct("MakeMoveVec", {
        type: optionEnum(TypeTag),
        objects: import_bcs.bcs.vector(Argument)
    }),
    /**  */ Upgrade: import_bcs.bcs.struct("Upgrade", {
        modules: import_bcs.bcs.vector(import_bcs.bcs.vector(import_bcs.bcs.u8())),
        dependencies: import_bcs.bcs.vector(Address),
        packageId: Address,
        ticket: Argument
    })
}));
const ProgrammableTransaction = import_bcs.bcs.struct("ProgrammableTransaction", {
    inputs: import_bcs.bcs.vector(CallArg),
    transactions: import_bcs.bcs.vector(Transaction)
});
const TransactionKind = import_bcs.bcs.enum("TransactionKind", {
    ProgrammableTransaction,
    ChangeEpoch: null,
    Genesis: null,
    ConsensusCommitPrologue: null
});
const TransactionExpiration = import_bcs.bcs.enum("TransactionExpiration", {
    None: null,
    Epoch: unsafe_u64()
});
const StructTag = import_bcs.bcs.struct("StructTag", {
    address: Address,
    module: import_bcs.bcs.string(),
    name: import_bcs.bcs.string(),
    typeParams: import_bcs.bcs.vector(TypeTag)
});
const GasData = import_bcs.bcs.struct("GasData", {
    payment: import_bcs.bcs.vector(SuiObjectRef),
    owner: Address,
    price: import_bcs.bcs.u64(),
    budget: import_bcs.bcs.u64()
});
const TransactionDataV1 = import_bcs.bcs.struct("TransactionDataV1", {
    kind: TransactionKind,
    sender: Address,
    gasData: GasData,
    expiration: TransactionExpiration
});
const TransactionData = import_bcs.bcs.enum("TransactionData", {
    V1: TransactionDataV1
});
const SenderSignedData = import_bcs.bcs.struct("SenderSignedData", {
    data: TransactionData,
    txSignatures: import_bcs.bcs.vector(import_bcs.bcs.vector(import_bcs.bcs.u8()))
});
const CompressedSignature = import_bcs.bcs.enum("CompressedSignature", {
    ED25519: import_bcs.bcs.fixedArray(64, import_bcs.bcs.u8()),
    Secp256k1: import_bcs.bcs.fixedArray(64, import_bcs.bcs.u8()),
    Secp256r1: import_bcs.bcs.fixedArray(64, import_bcs.bcs.u8())
});
const PublicKey = import_bcs.bcs.enum("PublicKey", {
    ED25519: import_bcs.bcs.fixedArray(32, import_bcs.bcs.u8()),
    Secp256k1: import_bcs.bcs.fixedArray(33, import_bcs.bcs.u8()),
    Secp256r1: import_bcs.bcs.fixedArray(33, import_bcs.bcs.u8())
});
const MultiSigPkMap = import_bcs.bcs.struct("MultiSigPkMap", {
    pubKey: PublicKey,
    weight: import_bcs.bcs.u8()
});
const MultiSigPublicKey = import_bcs.bcs.struct("MultiSigPublicKey", {
    pk_map: import_bcs.bcs.vector(MultiSigPkMap),
    threshold: import_bcs.bcs.u16()
});
const MultiSig = import_bcs.bcs.struct("MultiSig", {
    sigs: import_bcs.bcs.vector(CompressedSignature),
    bitmap: import_bcs.bcs.u16(),
    multisig_pk: MultiSigPublicKey
});
const suiBcs = {
    ...import_bcs.bcs,
    U8: import_bcs.bcs.u8(),
    U16: import_bcs.bcs.u16(),
    U32: import_bcs.bcs.u32(),
    U64: import_bcs.bcs.u64(),
    U128: import_bcs.bcs.u128(),
    U256: import_bcs.bcs.u256(),
    ULEB128: import_bcs.bcs.uleb128(),
    Bool: import_bcs.bcs.bool(),
    String: import_bcs.bcs.string(),
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
bcsRegistry.registerBcsType("utf8string", ()=>import_bcs.bcs.string({
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
}); //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/common.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var common_exports = {};
__export(common_exports, {
    ObjectId: ()=>ObjectId,
    ObjectOwner: ()=>ObjectOwner,
    ProtocolConfig: ()=>ProtocolConfig,
    SequenceNumber: ()=>SequenceNumber,
    SuiAddress: ()=>SuiAddress,
    SuiJsonValue: ()=>SuiJsonValue,
    TransactionDigest: ()=>TransactionDigest,
    TransactionEffectsDigest: ()=>TransactionEffectsDigest,
    TransactionEventDigest: ()=>TransactionEventDigest
});
module.exports = __toCommonJS(common_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
const TransactionDigest = (0, import_superstruct.string)();
const TransactionEffectsDigest = (0, import_superstruct.string)();
const TransactionEventDigest = (0, import_superstruct.string)();
const ObjectId = (0, import_superstruct.string)();
const SuiAddress = (0, import_superstruct.string)();
const SequenceNumber = (0, import_superstruct.string)();
const ObjectOwner = (0, import_superstruct.union)([
    (0, import_superstruct.object)({
        AddressOwner: (0, import_superstruct.string)()
    }),
    (0, import_superstruct.object)({
        ObjectOwner: (0, import_superstruct.string)()
    }),
    (0, import_superstruct.object)({
        Shared: (0, import_superstruct.object)({
            initial_shared_version: (0, import_superstruct.nullable)((0, import_superstruct.string)())
        })
    }),
    (0, import_superstruct.literal)("Immutable")
]);
const SuiJsonValue = (0, import_superstruct.define)("SuiJsonValue", ()=>true);
const ProtocolConfigValue = (0, import_superstruct.union)([
    (0, import_superstruct.object)({
        u32: (0, import_superstruct.string)()
    }),
    (0, import_superstruct.object)({
        u64: (0, import_superstruct.string)()
    }),
    (0, import_superstruct.object)({
        f64: (0, import_superstruct.string)()
    })
]);
const ProtocolConfig = (0, import_superstruct.object)({
    attributes: (0, import_superstruct.record)((0, import_superstruct.string)(), (0, import_superstruct.nullable)(ProtocolConfigValue)),
    featureFlags: (0, import_superstruct.record)((0, import_superstruct.string)(), (0, import_superstruct.boolean)()),
    maxSupportedProtocolVersion: (0, import_superstruct.string)(),
    minSupportedProtocolVersion: (0, import_superstruct.string)(),
    protocolVersion: (0, import_superstruct.string)()
}); //# sourceMappingURL=common.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/objects.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var objects_exports = {};
__export(objects_exports, {
    CheckpointedObjectId: ()=>CheckpointedObjectId,
    DisplayFieldsBackwardCompatibleResponse: ()=>DisplayFieldsBackwardCompatibleResponse,
    DisplayFieldsResponse: ()=>DisplayFieldsResponse,
    GetOwnedObjectsResponse: ()=>GetOwnedObjectsResponse,
    MIST_PER_SUI: ()=>MIST_PER_SUI,
    MovePackageContent: ()=>MovePackageContent,
    ObjectContentFields: ()=>ObjectContentFields,
    ObjectDigest: ()=>ObjectDigest,
    ObjectRead: ()=>ObjectRead,
    ObjectStatus: ()=>ObjectStatus,
    ObjectType: ()=>ObjectType,
    PaginatedObjectsResponse: ()=>PaginatedObjectsResponse,
    SUI_DECIMALS: ()=>SUI_DECIMALS,
    SuiGasData: ()=>SuiGasData,
    SuiMoveObject: ()=>SuiMoveObject,
    SuiMovePackage: ()=>SuiMovePackage,
    SuiObjectData: ()=>SuiObjectData,
    SuiObjectDataOptions: ()=>SuiObjectDataOptions,
    SuiObjectInfo: ()=>SuiObjectInfo,
    SuiObjectRef: ()=>SuiObjectRef,
    SuiObjectResponse: ()=>SuiObjectResponse,
    SuiObjectResponseError: ()=>SuiObjectResponseError,
    SuiParsedData: ()=>SuiParsedData,
    SuiRawData: ()=>SuiRawData,
    SuiRawMoveObject: ()=>SuiRawMoveObject,
    SuiRawMovePackage: ()=>SuiRawMovePackage,
    getMoveObject: ()=>getMoveObject,
    getMoveObjectType: ()=>getMoveObjectType,
    getMovePackageContent: ()=>getMovePackageContent,
    getObjectDeletedResponse: ()=>getObjectDeletedResponse,
    getObjectDisplay: ()=>getObjectDisplay,
    getObjectFields: ()=>getObjectFields,
    getObjectId: ()=>getObjectId,
    getObjectNotExistsResponse: ()=>getObjectNotExistsResponse,
    getObjectOwner: ()=>getObjectOwner,
    getObjectPreviousTransactionDigest: ()=>getObjectPreviousTransactionDigest,
    getObjectReference: ()=>getObjectReference,
    getObjectType: ()=>getObjectType,
    getObjectVersion: ()=>getObjectVersion,
    getSharedObjectInitialVersion: ()=>getSharedObjectInitialVersion,
    getSuiObjectData: ()=>getSuiObjectData,
    hasPublicTransfer: ()=>hasPublicTransfer,
    isImmutableObject: ()=>isImmutableObject,
    isSharedObject: ()=>isSharedObject,
    isSuiObjectResponse: ()=>isSuiObjectResponse
});
module.exports = __toCommonJS(objects_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var import_common = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/common.js [client] (ecmascript)");
const ObjectType = (0, import_superstruct.union)([
    (0, import_superstruct.string)(),
    (0, import_superstruct.literal)("package")
]);
const SuiObjectRef = (0, import_superstruct.object)({
    /** Base64 string representing the object digest */ digest: (0, import_superstruct.string)(),
    /** Hex code as string representing the object id */ objectId: (0, import_superstruct.string)(),
    /** Object version */ version: (0, import_superstruct.union)([
        (0, import_superstruct.number)(),
        (0, import_superstruct.string)(),
        (0, import_superstruct.bigint)()
    ])
});
const SuiGasData = (0, import_superstruct.object)({
    payment: (0, import_superstruct.array)(SuiObjectRef),
    /** Gas Object's owner */ owner: (0, import_superstruct.string)(),
    price: (0, import_superstruct.string)(),
    budget: (0, import_superstruct.string)()
});
const SuiObjectInfo = (0, import_superstruct.assign)(SuiObjectRef, (0, import_superstruct.object)({
    type: (0, import_superstruct.string)(),
    owner: import_common.ObjectOwner,
    previousTransaction: (0, import_superstruct.string)()
}));
const ObjectContentFields = (0, import_superstruct.record)((0, import_superstruct.string)(), (0, import_superstruct.any)());
const MovePackageContent = (0, import_superstruct.record)((0, import_superstruct.string)(), (0, import_superstruct.unknown)());
const SuiMoveObject = (0, import_superstruct.object)({
    /** Move type (e.g., "0x2::coin::Coin<0x2::sui::SUI>") */ type: (0, import_superstruct.string)(),
    /** Fields and values stored inside the Move object */ fields: ObjectContentFields,
    hasPublicTransfer: (0, import_superstruct.boolean)()
});
const SuiMovePackage = (0, import_superstruct.object)({
    /** A mapping from module name to disassembled Move bytecode */ disassembled: MovePackageContent
});
const SuiParsedData = (0, import_superstruct.union)([
    (0, import_superstruct.assign)(SuiMoveObject, (0, import_superstruct.object)({
        dataType: (0, import_superstruct.literal)("moveObject")
    })),
    (0, import_superstruct.assign)(SuiMovePackage, (0, import_superstruct.object)({
        dataType: (0, import_superstruct.literal)("package")
    }))
]);
const SuiRawMoveObject = (0, import_superstruct.object)({
    /** Move type (e.g., "0x2::coin::Coin<0x2::sui::SUI>") */ type: (0, import_superstruct.string)(),
    hasPublicTransfer: (0, import_superstruct.boolean)(),
    version: (0, import_superstruct.string)(),
    bcsBytes: (0, import_superstruct.string)()
});
const SuiRawMovePackage = (0, import_superstruct.object)({
    id: (0, import_superstruct.string)(),
    /** A mapping from module name to Move bytecode enocded in base64*/ moduleMap: (0, import_superstruct.record)((0, import_superstruct.string)(), (0, import_superstruct.string)())
});
const SuiRawData = (0, import_superstruct.union)([
    (0, import_superstruct.assign)(SuiRawMoveObject, (0, import_superstruct.object)({
        dataType: (0, import_superstruct.literal)("moveObject")
    })),
    (0, import_superstruct.assign)(SuiRawMovePackage, (0, import_superstruct.object)({
        dataType: (0, import_superstruct.literal)("package")
    }))
]);
const SUI_DECIMALS = 9;
const MIST_PER_SUI = BigInt(1e9);
const ObjectDigest = (0, import_superstruct.string)();
const SuiObjectResponseError = (0, import_superstruct.object)({
    code: (0, import_superstruct.string)(),
    error: (0, import_superstruct.optional)((0, import_superstruct.string)()),
    object_id: (0, import_superstruct.optional)((0, import_superstruct.string)()),
    parent_object_id: (0, import_superstruct.optional)((0, import_superstruct.string)()),
    version: (0, import_superstruct.optional)((0, import_superstruct.string)()),
    digest: (0, import_superstruct.optional)((0, import_superstruct.string)())
});
const DisplayFieldsResponse = (0, import_superstruct.object)({
    data: (0, import_superstruct.nullable)((0, import_superstruct.optional)((0, import_superstruct.record)((0, import_superstruct.string)(), (0, import_superstruct.string)()))),
    error: (0, import_superstruct.nullable)((0, import_superstruct.optional)(SuiObjectResponseError))
});
const DisplayFieldsBackwardCompatibleResponse = (0, import_superstruct.union)([
    DisplayFieldsResponse,
    (0, import_superstruct.optional)((0, import_superstruct.record)((0, import_superstruct.string)(), (0, import_superstruct.string)()))
]);
const SuiObjectData = (0, import_superstruct.object)({
    objectId: (0, import_superstruct.string)(),
    version: (0, import_superstruct.string)(),
    digest: (0, import_superstruct.string)(),
    /**
   * Type of the object, default to be undefined unless SuiObjectDataOptions.showType is set to true
   */ type: (0, import_superstruct.nullable)((0, import_superstruct.optional)((0, import_superstruct.string)())),
    /**
   * Move object content or package content, default to be undefined unless SuiObjectDataOptions.showContent is set to true
   */ content: (0, import_superstruct.nullable)((0, import_superstruct.optional)(SuiParsedData)),
    /**
   * Move object content or package content in BCS bytes, default to be undefined unless SuiObjectDataOptions.showBcs is set to true
   */ bcs: (0, import_superstruct.nullable)((0, import_superstruct.optional)(SuiRawData)),
    /**
   * The owner of this object. Default to be undefined unless SuiObjectDataOptions.showOwner is set to true
   */ owner: (0, import_superstruct.nullable)((0, import_superstruct.optional)(import_common.ObjectOwner)),
    /**
   * The digest of the transaction that created or last mutated this object.
   * Default to be undefined unless SuiObjectDataOptions.showPreviousTransaction is set to true
   */ previousTransaction: (0, import_superstruct.nullable)((0, import_superstruct.optional)((0, import_superstruct.string)())),
    /**
   * The amount of SUI we would rebate if this object gets deleted.
   * This number is re-calculated each time the object is mutated based on
   * the present storage gas price.
   * Default to be undefined unless SuiObjectDataOptions.showStorageRebate is set to true
   */ storageRebate: (0, import_superstruct.nullable)((0, import_superstruct.optional)((0, import_superstruct.string)())),
    /**
   * Display metadata for this object, default to be undefined unless SuiObjectDataOptions.showDisplay is set to true
   * This can also be None if the struct type does not have Display defined
   * See more details in https://forums.sui.io/t/nft-object-display-proposal/4872
   */ display: (0, import_superstruct.nullable)((0, import_superstruct.optional)(DisplayFieldsBackwardCompatibleResponse))
});
const SuiObjectDataOptions = (0, import_superstruct.object)({
    /* Whether to fetch the object type, default to be true */ showType: (0, import_superstruct.nullable)((0, import_superstruct.optional)((0, import_superstruct.boolean)())),
    /* Whether to fetch the object content, default to be false */ showContent: (0, import_superstruct.nullable)((0, import_superstruct.optional)((0, import_superstruct.boolean)())),
    /* Whether to fetch the object content in BCS bytes, default to be false */ showBcs: (0, import_superstruct.nullable)((0, import_superstruct.optional)((0, import_superstruct.boolean)())),
    /* Whether to fetch the object owner, default to be false */ showOwner: (0, import_superstruct.nullable)((0, import_superstruct.optional)((0, import_superstruct.boolean)())),
    /* Whether to fetch the previous transaction digest, default to be false */ showPreviousTransaction: (0, import_superstruct.nullable)((0, import_superstruct.optional)((0, import_superstruct.boolean)())),
    /* Whether to fetch the storage rebate, default to be false */ showStorageRebate: (0, import_superstruct.nullable)((0, import_superstruct.optional)((0, import_superstruct.boolean)())),
    /* Whether to fetch the display metadata, default to be false */ showDisplay: (0, import_superstruct.nullable)((0, import_superstruct.optional)((0, import_superstruct.boolean)()))
});
const ObjectStatus = (0, import_superstruct.union)([
    (0, import_superstruct.literal)("Exists"),
    (0, import_superstruct.literal)("notExists"),
    (0, import_superstruct.literal)("Deleted")
]);
const GetOwnedObjectsResponse = (0, import_superstruct.array)(SuiObjectInfo);
const SuiObjectResponse = (0, import_superstruct.object)({
    data: (0, import_superstruct.nullable)((0, import_superstruct.optional)(SuiObjectData)),
    error: (0, import_superstruct.nullable)((0, import_superstruct.optional)(SuiObjectResponseError))
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
    if ((0, import_superstruct.is)(resp, import_common.ObjectOwner)) {
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
    if ((0, import_superstruct.is)(display, DisplayFieldsResponse)) {
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
const CheckpointedObjectId = (0, import_superstruct.object)({
    objectId: (0, import_superstruct.string)(),
    atCheckpoint: (0, import_superstruct.optional)((0, import_superstruct.number)())
});
const PaginatedObjectsResponse = (0, import_superstruct.object)({
    data: (0, import_superstruct.array)(SuiObjectResponse),
    nextCursor: (0, import_superstruct.optional)((0, import_superstruct.nullable)((0, import_superstruct.string)())),
    hasNextPage: (0, import_superstruct.boolean)()
});
const ObjectRead = (0, import_superstruct.union)([
    (0, import_superstruct.object)({
        details: SuiObjectData,
        status: (0, import_superstruct.literal)("VersionFound")
    }),
    (0, import_superstruct.object)({
        details: (0, import_superstruct.string)(),
        status: (0, import_superstruct.literal)("ObjectNotExists")
    }),
    (0, import_superstruct.object)({
        details: SuiObjectRef,
        status: (0, import_superstruct.literal)("ObjectDeleted")
    }),
    (0, import_superstruct.object)({
        details: (0, import_superstruct.tuple)([
            (0, import_superstruct.string)(),
            (0, import_superstruct.number)()
        ]),
        status: (0, import_superstruct.literal)("VersionNotFound")
    }),
    (0, import_superstruct.object)({
        details: (0, import_superstruct.object)({
            asked_version: (0, import_superstruct.number)(),
            latest_version: (0, import_superstruct.number)(),
            object_id: (0, import_superstruct.string)()
        }),
        status: (0, import_superstruct.literal)("VersionTooHigh")
    })
]); //# sourceMappingURL=objects.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/option.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var option_exports = {};
__export(option_exports, {
    getOption: ()=>getOption
});
module.exports = __toCommonJS(option_exports);
function getOption(option) {
    if (typeof option === "object" && option !== null && "type" in option && option.type.startsWith("0x1::option::Option<")) {
        return void 0;
    }
    return option;
} //# sourceMappingURL=option.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/framework/framework.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var framework_exports = {};
__export(framework_exports, {
    COIN_TYPE_ARG_REGEX: ()=>COIN_TYPE_ARG_REGEX,
    Coin: ()=>Coin,
    CoinMetadataStruct: ()=>CoinMetadataStruct,
    Delegation: ()=>Delegation,
    ID_STRUCT_NAME: ()=>ID_STRUCT_NAME,
    MOVE_STDLIB_ADDRESS: ()=>MOVE_STDLIB_ADDRESS,
    OBJECT_MODULE_NAME: ()=>OBJECT_MODULE_NAME,
    PAY_JOIN_COIN_FUNC_NAME: ()=>PAY_JOIN_COIN_FUNC_NAME,
    PAY_MODULE_NAME: ()=>PAY_MODULE_NAME,
    PAY_SPLIT_COIN_VEC_FUNC_NAME: ()=>PAY_SPLIT_COIN_VEC_FUNC_NAME,
    SUI_CLOCK_OBJECT_ID: ()=>SUI_CLOCK_OBJECT_ID,
    SUI_FRAMEWORK_ADDRESS: ()=>SUI_FRAMEWORK_ADDRESS,
    SUI_SYSTEM_ADDRESS: ()=>SUI_SYSTEM_ADDRESS,
    SUI_TYPE_ARG: ()=>SUI_TYPE_ARG,
    UID_STRUCT_NAME: ()=>UID_STRUCT_NAME,
    VALIDATORS_EVENTS_QUERY: ()=>VALIDATORS_EVENTS_QUERY,
    isObjectDataFull: ()=>isObjectDataFull
});
module.exports = __toCommonJS(framework_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var import_objects = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/objects.js [client] (ecmascript)");
var import_option = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/option.js [client] (ecmascript)");
var import_sui_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/sui-types.js [client] (ecmascript)");
const SUI_SYSTEM_ADDRESS = "0x3";
const SUI_FRAMEWORK_ADDRESS = "0x2";
const MOVE_STDLIB_ADDRESS = "0x1";
const OBJECT_MODULE_NAME = "object";
const UID_STRUCT_NAME = "UID";
const ID_STRUCT_NAME = "ID";
const SUI_TYPE_ARG = "".concat(SUI_FRAMEWORK_ADDRESS, "::sui::SUI");
const VALIDATORS_EVENTS_QUERY = "0x3::validator_set::ValidatorEpochInfoEventV2";
const SUI_CLOCK_OBJECT_ID = (0, import_sui_types.normalizeSuiObjectId)("0x6");
const PAY_MODULE_NAME = "pay";
const PAY_SPLIT_COIN_VEC_FUNC_NAME = "split_vec";
const PAY_JOIN_COIN_FUNC_NAME = "join";
const COIN_TYPE_ARG_REGEX = /^0x2::coin::Coin<(.+)>$/;
function isObjectDataFull(resp) {
    return !!resp.data || !!resp.type;
}
const CoinMetadataStruct = (0, import_superstruct.object)({
    decimals: (0, import_superstruct.number)(),
    name: (0, import_superstruct.string)(),
    symbol: (0, import_superstruct.string)(),
    description: (0, import_superstruct.string)(),
    iconUrl: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    id: (0, import_superstruct.nullable)((0, import_superstruct.string)())
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
            address: (0, import_sui_types.normalizeSuiObjectId)(coinTypeArg.split("::")[0]),
            module: coinTypeArg.split("::")[1],
            name: coinTypeArg.split("::")[2],
            typeParams: []
        };
    }
    static getID(obj) {
        if ("fields" in obj) {
            return obj.fields.id.id;
        }
        return (0, import_objects.getObjectId)(obj);
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
        var _this;
        if (!Coin.isCoin(data)) {
            return void 0;
        }
        const balance = (_this = (0, import_objects.getObjectFields)(data)) === null || _this === void 0 ? void 0 : _this.balance;
        return BigInt(balance);
    }
    static getType(data) {
        if (isObjectDataFull(data)) {
            return (0, import_objects.getObjectType)(data);
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
        return BigInt((0, import_option.getOption)(this.suiObject.data.fields.active_delegation) || 0);
    }
    delegateAmount() {
        return this.suiObject.data.fields.delegate_amount;
    }
    endingEpoch() {
        return (0, import_option.getOption)(this.suiObject.data.fields.ending_epoch);
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
Delegation.SUI_OBJECT_TYPE = "0x2::delegation::Delegation"; //# sourceMappingURL=framework.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/events.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var events_exports = {};
__export(events_exports, {
    EventId: ()=>EventId,
    PaginatedEvents: ()=>PaginatedEvents,
    SuiEvent: ()=>SuiEvent,
    getEventPackage: ()=>getEventPackage,
    getEventSender: ()=>getEventSender
});
module.exports = __toCommonJS(events_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
const EventId = (0, import_superstruct.object)({
    txDigest: (0, import_superstruct.string)(),
    eventSeq: (0, import_superstruct.string)()
});
const SuiEvent = (0, import_superstruct.object)({
    id: EventId,
    // Move package where this event was emitted.
    packageId: (0, import_superstruct.string)(),
    // Move module where this event was emitted.
    transactionModule: (0, import_superstruct.string)(),
    // Sender's Sui address.
    sender: (0, import_superstruct.string)(),
    // Move event type.
    type: (0, import_superstruct.string)(),
    // Parsed json value of the event
    parsedJson: (0, import_superstruct.optional)((0, import_superstruct.record)((0, import_superstruct.string)(), (0, import_superstruct.any)())),
    // Base 58 encoded bcs bytes of the move event
    bcs: (0, import_superstruct.optional)((0, import_superstruct.string)()),
    timestampMs: (0, import_superstruct.optional)((0, import_superstruct.string)())
});
const PaginatedEvents = (0, import_superstruct.object)({
    data: (0, import_superstruct.array)(SuiEvent),
    nextCursor: (0, import_superstruct.nullable)(EventId),
    hasNextPage: (0, import_superstruct.boolean)()
});
function getEventSender(event) {
    return event.sender;
}
function getEventPackage(event) {
    return event.packageId;
} //# sourceMappingURL=events.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/transactions.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var transactions_exports = {};
__export(transactions_exports, {
    AuthorityName: ()=>AuthorityName,
    AuthorityQuorumSignInfo: ()=>AuthorityQuorumSignInfo,
    AuthoritySignature: ()=>AuthoritySignature,
    BalanceChange: ()=>BalanceChange,
    DevInspectResults: ()=>DevInspectResults,
    DryRunTransactionBlockResponse: ()=>DryRunTransactionBlockResponse,
    EpochId: ()=>EpochId,
    ExecutionStatus: ()=>ExecutionStatus,
    ExecutionStatusType: ()=>ExecutionStatusType,
    GasCostSummary: ()=>GasCostSummary,
    GenericAuthoritySignature: ()=>GenericAuthoritySignature,
    Genesis: ()=>Genesis,
    MoveCallSuiTransaction: ()=>MoveCallSuiTransaction,
    OwnedObjectRef: ()=>OwnedObjectRef,
    PaginatedTransactionResponse: ()=>PaginatedTransactionResponse,
    ProgrammableTransaction: ()=>ProgrammableTransaction,
    SuiArgument: ()=>SuiArgument,
    SuiCallArg: ()=>SuiCallArg,
    SuiChangeEpoch: ()=>SuiChangeEpoch,
    SuiConsensusCommitPrologue: ()=>SuiConsensusCommitPrologue,
    SuiObjectChange: ()=>SuiObjectChange,
    SuiObjectChangeCreated: ()=>SuiObjectChangeCreated,
    SuiObjectChangeDeleted: ()=>SuiObjectChangeDeleted,
    SuiObjectChangeMutated: ()=>SuiObjectChangeMutated,
    SuiObjectChangePublished: ()=>SuiObjectChangePublished,
    SuiObjectChangeTransferred: ()=>SuiObjectChangeTransferred,
    SuiObjectChangeWrapped: ()=>SuiObjectChangeWrapped,
    SuiTransaction: ()=>SuiTransaction,
    SuiTransactionBlock: ()=>SuiTransactionBlock,
    SuiTransactionBlockData: ()=>SuiTransactionBlockData,
    SuiTransactionBlockKind: ()=>SuiTransactionBlockKind,
    SuiTransactionBlockResponse: ()=>SuiTransactionBlockResponse,
    SuiTransactionBlockResponseOptions: ()=>SuiTransactionBlockResponseOptions,
    TransactionEffects: ()=>TransactionEffects,
    TransactionEffectsModifiedAtVersions: ()=>TransactionEffectsModifiedAtVersions,
    TransactionEvents: ()=>TransactionEvents,
    getChangeEpochTransaction: ()=>getChangeEpochTransaction,
    getConsensusCommitPrologueTransaction: ()=>getConsensusCommitPrologueTransaction,
    getCreatedObjects: ()=>getCreatedObjects,
    getEvents: ()=>getEvents,
    getExecutionStatus: ()=>getExecutionStatus,
    getExecutionStatusError: ()=>getExecutionStatusError,
    getExecutionStatusGasSummary: ()=>getExecutionStatusGasSummary,
    getExecutionStatusType: ()=>getExecutionStatusType,
    getGasData: ()=>getGasData,
    getNewlyCreatedCoinRefsAfterSplit: ()=>getNewlyCreatedCoinRefsAfterSplit,
    getObjectChanges: ()=>getObjectChanges,
    getProgrammableTransaction: ()=>getProgrammableTransaction,
    getPublishedObjectChanges: ()=>getPublishedObjectChanges,
    getTimestampFromTransactionResponse: ()=>getTimestampFromTransactionResponse,
    getTotalGasUsed: ()=>getTotalGasUsed,
    getTotalGasUsedUpperBound: ()=>getTotalGasUsedUpperBound,
    getTransaction: ()=>getTransaction,
    getTransactionDigest: ()=>getTransactionDigest,
    getTransactionEffects: ()=>getTransactionEffects,
    getTransactionGasBudget: ()=>getTransactionGasBudget,
    getTransactionGasObject: ()=>getTransactionGasObject,
    getTransactionGasPrice: ()=>getTransactionGasPrice,
    getTransactionKind: ()=>getTransactionKind,
    getTransactionKindName: ()=>getTransactionKindName,
    getTransactionSender: ()=>getTransactionSender,
    getTransactionSignature: ()=>getTransactionSignature
});
module.exports = __toCommonJS(transactions_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var import_common = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/common.js [client] (ecmascript)");
var import_events = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/events.js [client] (ecmascript)");
var import_objects = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/objects.js [client] (ecmascript)");
const EpochId = (0, import_superstruct.string)();
const SuiChangeEpoch = (0, import_superstruct.object)({
    epoch: (0, import_superstruct.string)(),
    storage_charge: (0, import_superstruct.string)(),
    computation_charge: (0, import_superstruct.string)(),
    storage_rebate: (0, import_superstruct.string)(),
    epoch_start_timestamp_ms: (0, import_superstruct.optional)((0, import_superstruct.string)())
});
const SuiConsensusCommitPrologue = (0, import_superstruct.object)({
    epoch: (0, import_superstruct.string)(),
    round: (0, import_superstruct.string)(),
    commit_timestamp_ms: (0, import_superstruct.string)()
});
const Genesis = (0, import_superstruct.object)({
    objects: (0, import_superstruct.array)((0, import_superstruct.string)())
});
const SuiArgument = (0, import_superstruct.union)([
    (0, import_superstruct.literal)("GasCoin"),
    (0, import_superstruct.object)({
        Input: (0, import_superstruct.number)()
    }),
    (0, import_superstruct.object)({
        Result: (0, import_superstruct.number)()
    }),
    (0, import_superstruct.object)({
        NestedResult: (0, import_superstruct.tuple)([
            (0, import_superstruct.number)(),
            (0, import_superstruct.number)()
        ])
    })
]);
const MoveCallSuiTransaction = (0, import_superstruct.object)({
    arguments: (0, import_superstruct.optional)((0, import_superstruct.array)(SuiArgument)),
    type_arguments: (0, import_superstruct.optional)((0, import_superstruct.array)((0, import_superstruct.string)())),
    package: (0, import_superstruct.string)(),
    module: (0, import_superstruct.string)(),
    function: (0, import_superstruct.string)()
});
const SuiTransaction = (0, import_superstruct.union)([
    (0, import_superstruct.object)({
        MoveCall: MoveCallSuiTransaction
    }),
    (0, import_superstruct.object)({
        TransferObjects: (0, import_superstruct.tuple)([
            (0, import_superstruct.array)(SuiArgument),
            SuiArgument
        ])
    }),
    (0, import_superstruct.object)({
        SplitCoins: (0, import_superstruct.tuple)([
            SuiArgument,
            (0, import_superstruct.array)(SuiArgument)
        ])
    }),
    (0, import_superstruct.object)({
        MergeCoins: (0, import_superstruct.tuple)([
            SuiArgument,
            (0, import_superstruct.array)(SuiArgument)
        ])
    }),
    (0, import_superstruct.object)({
        Publish: (0, import_superstruct.union)([
            // TODO: Remove this after 0.34 is released:
            (0, import_superstruct.tuple)([
                import_objects.SuiMovePackage,
                (0, import_superstruct.array)((0, import_superstruct.string)())
            ]),
            (0, import_superstruct.array)((0, import_superstruct.string)())
        ])
    }),
    (0, import_superstruct.object)({
        Upgrade: (0, import_superstruct.union)([
            // TODO: Remove this after 0.34 is released:
            (0, import_superstruct.tuple)([
                import_objects.SuiMovePackage,
                (0, import_superstruct.array)((0, import_superstruct.string)()),
                (0, import_superstruct.string)(),
                SuiArgument
            ]),
            (0, import_superstruct.tuple)([
                (0, import_superstruct.array)((0, import_superstruct.string)()),
                (0, import_superstruct.string)(),
                SuiArgument
            ])
        ])
    }),
    (0, import_superstruct.object)({
        MakeMoveVec: (0, import_superstruct.tuple)([
            (0, import_superstruct.nullable)((0, import_superstruct.string)()),
            (0, import_superstruct.array)(SuiArgument)
        ])
    })
]);
const SuiCallArg = (0, import_superstruct.union)([
    (0, import_superstruct.object)({
        type: (0, import_superstruct.literal)("pure"),
        valueType: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
        value: import_common.SuiJsonValue
    }),
    (0, import_superstruct.object)({
        type: (0, import_superstruct.literal)("object"),
        objectType: (0, import_superstruct.literal)("immOrOwnedObject"),
        objectId: (0, import_superstruct.string)(),
        version: (0, import_superstruct.string)(),
        digest: (0, import_superstruct.string)()
    }),
    (0, import_superstruct.object)({
        type: (0, import_superstruct.literal)("object"),
        objectType: (0, import_superstruct.literal)("sharedObject"),
        objectId: (0, import_superstruct.string)(),
        initialSharedVersion: (0, import_superstruct.string)(),
        mutable: (0, import_superstruct.boolean)()
    })
]);
const ProgrammableTransaction = (0, import_superstruct.object)({
    transactions: (0, import_superstruct.array)(SuiTransaction),
    inputs: (0, import_superstruct.array)(SuiCallArg)
});
const SuiTransactionBlockKind = (0, import_superstruct.union)([
    (0, import_superstruct.assign)(SuiChangeEpoch, (0, import_superstruct.object)({
        kind: (0, import_superstruct.literal)("ChangeEpoch")
    })),
    (0, import_superstruct.assign)(SuiConsensusCommitPrologue, (0, import_superstruct.object)({
        kind: (0, import_superstruct.literal)("ConsensusCommitPrologue")
    })),
    (0, import_superstruct.assign)(Genesis, (0, import_superstruct.object)({
        kind: (0, import_superstruct.literal)("Genesis")
    })),
    (0, import_superstruct.assign)(ProgrammableTransaction, (0, import_superstruct.object)({
        kind: (0, import_superstruct.literal)("ProgrammableTransaction")
    }))
]);
const SuiTransactionBlockData = (0, import_superstruct.object)({
    // Eventually this will become union(literal('v1'), literal('v2'), ...)
    messageVersion: (0, import_superstruct.literal)("v1"),
    transaction: SuiTransactionBlockKind,
    sender: (0, import_superstruct.string)(),
    gasData: import_objects.SuiGasData
});
const AuthoritySignature = (0, import_superstruct.string)();
const GenericAuthoritySignature = (0, import_superstruct.union)([
    (0, import_superstruct.string)(),
    (0, import_superstruct.array)((0, import_superstruct.string)())
]);
const AuthorityQuorumSignInfo = (0, import_superstruct.object)({
    epoch: (0, import_superstruct.string)(),
    signature: GenericAuthoritySignature,
    signers_map: (0, import_superstruct.array)((0, import_superstruct.number)())
});
const GasCostSummary = (0, import_superstruct.object)({
    computationCost: (0, import_superstruct.string)(),
    storageCost: (0, import_superstruct.string)(),
    storageRebate: (0, import_superstruct.string)(),
    nonRefundableStorageFee: (0, import_superstruct.string)()
});
const ExecutionStatusType = (0, import_superstruct.union)([
    (0, import_superstruct.literal)("success"),
    (0, import_superstruct.literal)("failure")
]);
const ExecutionStatus = (0, import_superstruct.object)({
    status: ExecutionStatusType,
    error: (0, import_superstruct.optional)((0, import_superstruct.string)())
});
const OwnedObjectRef = (0, import_superstruct.object)({
    owner: import_common.ObjectOwner,
    reference: import_objects.SuiObjectRef
});
const TransactionEffectsModifiedAtVersions = (0, import_superstruct.object)({
    objectId: (0, import_superstruct.string)(),
    sequenceNumber: (0, import_superstruct.string)()
});
const TransactionEffects = (0, import_superstruct.object)({
    // Eventually this will become union(literal('v1'), literal('v2'), ...)
    messageVersion: (0, import_superstruct.literal)("v1"),
    /** The status of the execution */ status: ExecutionStatus,
    /** The epoch when this transaction was executed */ executedEpoch: (0, import_superstruct.string)(),
    /** The version that every modified (mutated or deleted) object had before it was modified by this transaction. **/ modifiedAtVersions: (0, import_superstruct.optional)((0, import_superstruct.array)(TransactionEffectsModifiedAtVersions)),
    gasUsed: GasCostSummary,
    /** The object references of the shared objects used in this transaction. Empty if no shared objects were used. */ sharedObjects: (0, import_superstruct.optional)((0, import_superstruct.array)(import_objects.SuiObjectRef)),
    /** The transaction digest */ transactionDigest: (0, import_superstruct.string)(),
    /** ObjectRef and owner of new objects created */ created: (0, import_superstruct.optional)((0, import_superstruct.array)(OwnedObjectRef)),
    /** ObjectRef and owner of mutated objects, including gas object */ mutated: (0, import_superstruct.optional)((0, import_superstruct.array)(OwnedObjectRef)),
    /**
   * ObjectRef and owner of objects that are unwrapped in this transaction.
   * Unwrapped objects are objects that were wrapped into other objects in the past,
   * and just got extracted out.
   */ unwrapped: (0, import_superstruct.optional)((0, import_superstruct.array)(OwnedObjectRef)),
    /** Object Refs of objects now deleted (the old refs) */ deleted: (0, import_superstruct.optional)((0, import_superstruct.array)(import_objects.SuiObjectRef)),
    /** Object Refs of objects now deleted (the old refs) */ unwrappedThenDeleted: (0, import_superstruct.optional)((0, import_superstruct.array)(import_objects.SuiObjectRef)),
    /** Object refs of objects now wrapped in other objects */ wrapped: (0, import_superstruct.optional)((0, import_superstruct.array)(import_objects.SuiObjectRef)),
    /**
   * The updated gas object reference. Have a dedicated field for convenient access.
   * It's also included in mutated.
   */ gasObject: OwnedObjectRef,
    /** The events emitted during execution. Note that only successful transactions emit events */ eventsDigest: (0, import_superstruct.nullable)((0, import_superstruct.optional)((0, import_superstruct.string)())),
    /** The set of transaction digests this transaction depends on */ dependencies: (0, import_superstruct.optional)((0, import_superstruct.array)((0, import_superstruct.string)()))
});
const TransactionEvents = (0, import_superstruct.array)(import_events.SuiEvent);
const ReturnValueType = (0, import_superstruct.tuple)([
    (0, import_superstruct.array)((0, import_superstruct.number)()),
    (0, import_superstruct.string)()
]);
const MutableReferenceOutputType = (0, import_superstruct.tuple)([
    SuiArgument,
    (0, import_superstruct.array)((0, import_superstruct.number)()),
    (0, import_superstruct.string)()
]);
const ExecutionResultType = (0, import_superstruct.object)({
    mutableReferenceOutputs: (0, import_superstruct.optional)((0, import_superstruct.array)(MutableReferenceOutputType)),
    returnValues: (0, import_superstruct.optional)((0, import_superstruct.array)(ReturnValueType))
});
const DevInspectResults = (0, import_superstruct.object)({
    effects: TransactionEffects,
    events: TransactionEvents,
    results: (0, import_superstruct.optional)((0, import_superstruct.array)(ExecutionResultType)),
    error: (0, import_superstruct.optional)((0, import_superstruct.string)())
});
const AuthorityName = (0, import_superstruct.string)();
const SuiTransactionBlock = (0, import_superstruct.object)({
    data: SuiTransactionBlockData,
    txSignatures: (0, import_superstruct.array)((0, import_superstruct.string)())
});
const SuiObjectChangePublished = (0, import_superstruct.object)({
    type: (0, import_superstruct.literal)("published"),
    packageId: (0, import_superstruct.string)(),
    version: (0, import_superstruct.string)(),
    digest: (0, import_superstruct.string)(),
    modules: (0, import_superstruct.array)((0, import_superstruct.string)())
});
const SuiObjectChangeTransferred = (0, import_superstruct.object)({
    type: (0, import_superstruct.literal)("transferred"),
    sender: (0, import_superstruct.string)(),
    recipient: import_common.ObjectOwner,
    objectType: (0, import_superstruct.string)(),
    objectId: (0, import_superstruct.string)(),
    version: (0, import_superstruct.string)(),
    digest: (0, import_superstruct.string)()
});
const SuiObjectChangeMutated = (0, import_superstruct.object)({
    type: (0, import_superstruct.literal)("mutated"),
    sender: (0, import_superstruct.string)(),
    owner: import_common.ObjectOwner,
    objectType: (0, import_superstruct.string)(),
    objectId: (0, import_superstruct.string)(),
    version: (0, import_superstruct.string)(),
    previousVersion: (0, import_superstruct.string)(),
    digest: (0, import_superstruct.string)()
});
const SuiObjectChangeDeleted = (0, import_superstruct.object)({
    type: (0, import_superstruct.literal)("deleted"),
    sender: (0, import_superstruct.string)(),
    objectType: (0, import_superstruct.string)(),
    objectId: (0, import_superstruct.string)(),
    version: (0, import_superstruct.string)()
});
const SuiObjectChangeWrapped = (0, import_superstruct.object)({
    type: (0, import_superstruct.literal)("wrapped"),
    sender: (0, import_superstruct.string)(),
    objectType: (0, import_superstruct.string)(),
    objectId: (0, import_superstruct.string)(),
    version: (0, import_superstruct.string)()
});
const SuiObjectChangeCreated = (0, import_superstruct.object)({
    type: (0, import_superstruct.literal)("created"),
    sender: (0, import_superstruct.string)(),
    owner: import_common.ObjectOwner,
    objectType: (0, import_superstruct.string)(),
    objectId: (0, import_superstruct.string)(),
    version: (0, import_superstruct.string)(),
    digest: (0, import_superstruct.string)()
});
const SuiObjectChange = (0, import_superstruct.union)([
    SuiObjectChangePublished,
    SuiObjectChangeTransferred,
    SuiObjectChangeMutated,
    SuiObjectChangeDeleted,
    SuiObjectChangeWrapped,
    SuiObjectChangeCreated
]);
const BalanceChange = (0, import_superstruct.object)({
    owner: import_common.ObjectOwner,
    coinType: (0, import_superstruct.string)(),
    /* Coin balance change(positive means receive, negative means send) */ amount: (0, import_superstruct.string)()
});
const SuiTransactionBlockResponse = (0, import_superstruct.object)({
    digest: (0, import_superstruct.string)(),
    transaction: (0, import_superstruct.optional)(SuiTransactionBlock),
    effects: (0, import_superstruct.optional)(TransactionEffects),
    events: (0, import_superstruct.optional)(TransactionEvents),
    timestampMs: (0, import_superstruct.optional)((0, import_superstruct.string)()),
    checkpoint: (0, import_superstruct.optional)((0, import_superstruct.string)()),
    confirmedLocalExecution: (0, import_superstruct.optional)((0, import_superstruct.boolean)()),
    objectChanges: (0, import_superstruct.optional)((0, import_superstruct.array)(SuiObjectChange)),
    balanceChanges: (0, import_superstruct.optional)((0, import_superstruct.array)(BalanceChange)),
    /* Errors that occurred in fetching/serializing the transaction. */ errors: (0, import_superstruct.optional)((0, import_superstruct.array)((0, import_superstruct.string)()))
});
const SuiTransactionBlockResponseOptions = (0, import_superstruct.object)({
    /* Whether to show transaction input data. Default to be false. */ showInput: (0, import_superstruct.optional)((0, import_superstruct.boolean)()),
    /* Whether to show transaction effects. Default to be false. */ showEffects: (0, import_superstruct.optional)((0, import_superstruct.boolean)()),
    /* Whether to show transaction events. Default to be false. */ showEvents: (0, import_superstruct.optional)((0, import_superstruct.boolean)()),
    /* Whether to show object changes. Default to be false. */ showObjectChanges: (0, import_superstruct.optional)((0, import_superstruct.boolean)()),
    /* Whether to show coin balance changes. Default to be false. */ showBalanceChanges: (0, import_superstruct.optional)((0, import_superstruct.boolean)())
});
const PaginatedTransactionResponse = (0, import_superstruct.object)({
    data: (0, import_superstruct.array)(SuiTransactionBlockResponse),
    nextCursor: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    hasNextPage: (0, import_superstruct.boolean)()
});
const DryRunTransactionBlockResponse = (0, import_superstruct.object)({
    effects: TransactionEffects,
    events: TransactionEvents,
    objectChanges: (0, import_superstruct.array)(SuiObjectChange),
    balanceChanges: (0, import_superstruct.array)(BalanceChange),
    // TODO: Remove optional when this is rolled out to all networks:
    input: (0, import_superstruct.optional)(SuiTransactionBlockData)
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
    if ((0, import_superstruct.is)(data, TransactionEffects)) {
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
    return (_data_objectChanges_filter = (_data_objectChanges = data.objectChanges) === null || _data_objectChanges === void 0 ? void 0 : _data_objectChanges.filter((a)=>(0, import_superstruct.is)(a, SuiObjectChangePublished))) !== null && _data_objectChanges_filter !== void 0 ? _data_objectChanges_filter : [];
} //# sourceMappingURL=transactions.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/normalized.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var normalized_exports = {};
__export(normalized_exports, {
    MoveCallMetric: ()=>MoveCallMetric,
    MoveCallMetrics: ()=>MoveCallMetrics,
    SuiMoveAbilitySet: ()=>SuiMoveAbilitySet,
    SuiMoveFunctionArgType: ()=>SuiMoveFunctionArgType,
    SuiMoveFunctionArgTypes: ()=>SuiMoveFunctionArgTypes,
    SuiMoveModuleId: ()=>SuiMoveModuleId,
    SuiMoveNormalizedField: ()=>SuiMoveNormalizedField,
    SuiMoveNormalizedFunction: ()=>SuiMoveNormalizedFunction,
    SuiMoveNormalizedModule: ()=>SuiMoveNormalizedModule,
    SuiMoveNormalizedModules: ()=>SuiMoveNormalizedModules,
    SuiMoveNormalizedStruct: ()=>SuiMoveNormalizedStruct,
    SuiMoveNormalizedStructType: ()=>SuiMoveNormalizedStructType,
    SuiMoveNormalizedType: ()=>SuiMoveNormalizedType,
    SuiMoveNormalizedTypeParameterType: ()=>SuiMoveNormalizedTypeParameterType,
    SuiMoveStructTypeParameter: ()=>SuiMoveStructTypeParameter,
    SuiMoveVisibility: ()=>SuiMoveVisibility,
    extractMutableReference: ()=>extractMutableReference,
    extractReference: ()=>extractReference,
    extractStructTag: ()=>extractStructTag
});
module.exports = __toCommonJS(normalized_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
const SuiMoveFunctionArgType = (0, import_superstruct.union)([
    (0, import_superstruct.string)(),
    (0, import_superstruct.object)({
        Object: (0, import_superstruct.string)()
    })
]);
const SuiMoveFunctionArgTypes = (0, import_superstruct.array)(SuiMoveFunctionArgType);
const SuiMoveModuleId = (0, import_superstruct.object)({
    address: (0, import_superstruct.string)(),
    name: (0, import_superstruct.string)()
});
const SuiMoveVisibility = (0, import_superstruct.union)([
    (0, import_superstruct.literal)("Private"),
    (0, import_superstruct.literal)("Public"),
    (0, import_superstruct.literal)("Friend")
]);
const SuiMoveAbilitySet = (0, import_superstruct.object)({
    abilities: (0, import_superstruct.array)((0, import_superstruct.string)())
});
const SuiMoveStructTypeParameter = (0, import_superstruct.object)({
    constraints: SuiMoveAbilitySet,
    isPhantom: (0, import_superstruct.boolean)()
});
const SuiMoveNormalizedTypeParameterType = (0, import_superstruct.object)({
    TypeParameter: (0, import_superstruct.number)()
});
const MoveCallMetric = (0, import_superstruct.tuple)([
    (0, import_superstruct.object)({
        module: (0, import_superstruct.string)(),
        package: (0, import_superstruct.string)(),
        function: (0, import_superstruct.string)()
    }),
    (0, import_superstruct.string)()
]);
const MoveCallMetrics = (0, import_superstruct.object)({
    rank3Days: (0, import_superstruct.array)(MoveCallMetric),
    rank7Days: (0, import_superstruct.array)(MoveCallMetric),
    rank30Days: (0, import_superstruct.array)(MoveCallMetric)
});
function isSuiMoveNormalizedType(value) {
    if (!value) return false;
    if (typeof value === "string") return true;
    if ((0, import_superstruct.is)(value, SuiMoveNormalizedTypeParameterType)) return true;
    if (isSuiMoveNormalizedStructType(value)) return true;
    if (typeof value !== "object") return false;
    const valueProperties = value;
    if ((0, import_superstruct.is)(valueProperties.Reference, SuiMoveNormalizedType)) return true;
    if ((0, import_superstruct.is)(valueProperties.MutableReference, SuiMoveNormalizedType)) return true;
    if ((0, import_superstruct.is)(valueProperties.Vector, SuiMoveNormalizedType)) return true;
    return false;
}
const SuiMoveNormalizedType = (0, import_superstruct.define)("SuiMoveNormalizedType", isSuiMoveNormalizedType);
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
const SuiMoveNormalizedStructType = (0, import_superstruct.define)("SuiMoveNormalizedStructType", isSuiMoveNormalizedStructType);
const SuiMoveNormalizedFunction = (0, import_superstruct.object)({
    visibility: SuiMoveVisibility,
    isEntry: (0, import_superstruct.boolean)(),
    typeParameters: (0, import_superstruct.array)(SuiMoveAbilitySet),
    parameters: (0, import_superstruct.array)(SuiMoveNormalizedType),
    return: (0, import_superstruct.array)(SuiMoveNormalizedType)
});
const SuiMoveNormalizedField = (0, import_superstruct.object)({
    name: (0, import_superstruct.string)(),
    type: SuiMoveNormalizedType
});
const SuiMoveNormalizedStruct = (0, import_superstruct.object)({
    abilities: SuiMoveAbilitySet,
    typeParameters: (0, import_superstruct.array)(SuiMoveStructTypeParameter),
    fields: (0, import_superstruct.array)(SuiMoveNormalizedField)
});
const SuiMoveNormalizedModule = (0, import_superstruct.object)({
    fileFormatVersion: (0, import_superstruct.number)(),
    address: (0, import_superstruct.string)(),
    name: (0, import_superstruct.string)(),
    friends: (0, import_superstruct.array)(SuiMoveModuleId),
    structs: (0, import_superstruct.record)((0, import_superstruct.string)(), SuiMoveNormalizedStruct),
    exposedFunctions: (0, import_superstruct.record)((0, import_superstruct.string)(), SuiMoveNormalizedFunction)
});
const SuiMoveNormalizedModules = (0, import_superstruct.record)((0, import_superstruct.string)(), SuiMoveNormalizedModule);
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
} //# sourceMappingURL=normalized.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/validator.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var validator_exports = {};
__export(validator_exports, {
    Apy: ()=>Apy,
    Balance: ()=>Balance,
    CommitteeInfo: ()=>CommitteeInfo,
    Contents: ()=>Contents,
    ContentsFields: ()=>ContentsFields,
    ContentsFieldsWithdraw: ()=>ContentsFieldsWithdraw,
    DelegatedStake: ()=>DelegatedStake,
    DelegationStakingPool: ()=>DelegationStakingPool,
    DelegationStakingPoolFields: ()=>DelegationStakingPoolFields,
    StakeObject: ()=>StakeObject,
    StakeSubsidy: ()=>StakeSubsidy,
    StakeSubsidyFields: ()=>StakeSubsidyFields,
    SuiSupplyFields: ()=>SuiSupplyFields,
    SuiSystemStateSummary: ()=>SuiSystemStateSummary,
    SuiValidatorSummary: ()=>SuiValidatorSummary,
    Validators: ()=>Validators,
    ValidatorsApy: ()=>ValidatorsApy
});
module.exports = __toCommonJS(validator_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
const Apy = (0, import_superstruct.object)({
    apy: (0, import_superstruct.number)(),
    address: (0, import_superstruct.string)()
});
const ValidatorsApy = (0, import_superstruct.object)({
    epoch: (0, import_superstruct.string)(),
    apys: (0, import_superstruct.array)(Apy)
});
const Balance = (0, import_superstruct.object)({
    value: (0, import_superstruct.number)()
});
const StakeObject = (0, import_superstruct.object)({
    stakedSuiId: (0, import_superstruct.string)(),
    stakeRequestEpoch: (0, import_superstruct.string)(),
    stakeActiveEpoch: (0, import_superstruct.string)(),
    principal: (0, import_superstruct.string)(),
    status: (0, import_superstruct.union)([
        (0, import_superstruct.literal)("Active"),
        (0, import_superstruct.literal)("Pending"),
        (0, import_superstruct.literal)("Unstaked")
    ]),
    estimatedReward: (0, import_superstruct.optional)((0, import_superstruct.string)())
});
const DelegatedStake = (0, import_superstruct.object)({
    validatorAddress: (0, import_superstruct.string)(),
    stakingPool: (0, import_superstruct.string)(),
    stakes: (0, import_superstruct.array)(StakeObject)
});
const StakeSubsidyFields = (0, import_superstruct.object)({
    balance: (0, import_superstruct.object)({
        value: (0, import_superstruct.number)()
    }),
    distribution_counter: (0, import_superstruct.number)(),
    current_distribution_amount: (0, import_superstruct.number)(),
    stake_subsidy_period_length: (0, import_superstruct.number)(),
    stake_subsidy_decrease_rate: (0, import_superstruct.number)()
});
const StakeSubsidy = (0, import_superstruct.object)({
    type: (0, import_superstruct.string)(),
    fields: StakeSubsidyFields
});
const SuiSupplyFields = (0, import_superstruct.object)({
    value: (0, import_superstruct.number)()
});
const ContentsFields = (0, import_superstruct.object)({
    id: (0, import_superstruct.string)(),
    size: (0, import_superstruct.number)(),
    head: (0, import_superstruct.object)({
        vec: (0, import_superstruct.array)()
    }),
    tail: (0, import_superstruct.object)({
        vec: (0, import_superstruct.array)()
    })
});
const ContentsFieldsWithdraw = (0, import_superstruct.object)({
    id: (0, import_superstruct.string)(),
    size: (0, import_superstruct.number)()
});
const Contents = (0, import_superstruct.object)({
    type: (0, import_superstruct.string)(),
    fields: ContentsFields
});
const DelegationStakingPoolFields = (0, import_superstruct.object)({
    exchangeRates: (0, import_superstruct.object)({
        id: (0, import_superstruct.string)(),
        size: (0, import_superstruct.number)()
    }),
    id: (0, import_superstruct.string)(),
    pendingStake: (0, import_superstruct.number)(),
    pendingPoolTokenWithdraw: (0, import_superstruct.number)(),
    pendingTotalSuiWithdraw: (0, import_superstruct.number)(),
    poolTokenBalance: (0, import_superstruct.number)(),
    rewardsPool: (0, import_superstruct.object)({
        value: (0, import_superstruct.number)()
    }),
    activationEpoch: (0, import_superstruct.object)({
        vec: (0, import_superstruct.array)()
    }),
    deactivationEpoch: (0, import_superstruct.object)({
        vec: (0, import_superstruct.array)()
    }),
    suiBalance: (0, import_superstruct.number)()
});
const DelegationStakingPool = (0, import_superstruct.object)({
    type: (0, import_superstruct.string)(),
    fields: DelegationStakingPoolFields
});
const Validators = (0, import_superstruct.array)((0, import_superstruct.tuple)([
    (0, import_superstruct.string)(),
    (0, import_superstruct.string)()
]));
const CommitteeInfo = (0, import_superstruct.object)({
    epoch: (0, import_superstruct.string)(),
    /** Array of (validator public key, stake unit) tuple */ validators: Validators
});
const SuiValidatorSummary = (0, import_superstruct.object)({
    suiAddress: (0, import_superstruct.string)(),
    protocolPubkeyBytes: (0, import_superstruct.string)(),
    networkPubkeyBytes: (0, import_superstruct.string)(),
    workerPubkeyBytes: (0, import_superstruct.string)(),
    proofOfPossessionBytes: (0, import_superstruct.string)(),
    operationCapId: (0, import_superstruct.string)(),
    name: (0, import_superstruct.string)(),
    description: (0, import_superstruct.string)(),
    imageUrl: (0, import_superstruct.string)(),
    projectUrl: (0, import_superstruct.string)(),
    p2pAddress: (0, import_superstruct.string)(),
    netAddress: (0, import_superstruct.string)(),
    primaryAddress: (0, import_superstruct.string)(),
    workerAddress: (0, import_superstruct.string)(),
    nextEpochProtocolPubkeyBytes: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    nextEpochProofOfPossession: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    nextEpochNetworkPubkeyBytes: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    nextEpochWorkerPubkeyBytes: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    nextEpochNetAddress: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    nextEpochP2pAddress: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    nextEpochPrimaryAddress: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    nextEpochWorkerAddress: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    votingPower: (0, import_superstruct.string)(),
    gasPrice: (0, import_superstruct.string)(),
    commissionRate: (0, import_superstruct.string)(),
    nextEpochStake: (0, import_superstruct.string)(),
    nextEpochGasPrice: (0, import_superstruct.string)(),
    nextEpochCommissionRate: (0, import_superstruct.string)(),
    stakingPoolId: (0, import_superstruct.string)(),
    stakingPoolActivationEpoch: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    stakingPoolDeactivationEpoch: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    stakingPoolSuiBalance: (0, import_superstruct.string)(),
    rewardsPool: (0, import_superstruct.string)(),
    poolTokenBalance: (0, import_superstruct.string)(),
    pendingStake: (0, import_superstruct.string)(),
    pendingPoolTokenWithdraw: (0, import_superstruct.string)(),
    pendingTotalSuiWithdraw: (0, import_superstruct.string)(),
    exchangeRatesId: (0, import_superstruct.string)(),
    exchangeRatesSize: (0, import_superstruct.string)()
});
const SuiSystemStateSummary = (0, import_superstruct.object)({
    epoch: (0, import_superstruct.string)(),
    protocolVersion: (0, import_superstruct.string)(),
    systemStateVersion: (0, import_superstruct.string)(),
    storageFundTotalObjectStorageRebates: (0, import_superstruct.string)(),
    storageFundNonRefundableBalance: (0, import_superstruct.string)(),
    referenceGasPrice: (0, import_superstruct.string)(),
    safeMode: (0, import_superstruct.boolean)(),
    safeModeStorageRewards: (0, import_superstruct.string)(),
    safeModeComputationRewards: (0, import_superstruct.string)(),
    safeModeStorageRebates: (0, import_superstruct.string)(),
    safeModeNonRefundableStorageFee: (0, import_superstruct.string)(),
    epochStartTimestampMs: (0, import_superstruct.string)(),
    epochDurationMs: (0, import_superstruct.string)(),
    stakeSubsidyStartEpoch: (0, import_superstruct.string)(),
    maxValidatorCount: (0, import_superstruct.string)(),
    minValidatorJoiningStake: (0, import_superstruct.string)(),
    validatorLowStakeThreshold: (0, import_superstruct.string)(),
    validatorVeryLowStakeThreshold: (0, import_superstruct.string)(),
    validatorLowStakeGracePeriod: (0, import_superstruct.string)(),
    stakeSubsidyBalance: (0, import_superstruct.string)(),
    stakeSubsidyDistributionCounter: (0, import_superstruct.string)(),
    stakeSubsidyCurrentDistributionAmount: (0, import_superstruct.string)(),
    stakeSubsidyPeriodLength: (0, import_superstruct.string)(),
    stakeSubsidyDecreaseRate: (0, import_superstruct.number)(),
    totalStake: (0, import_superstruct.string)(),
    activeValidators: (0, import_superstruct.array)(SuiValidatorSummary),
    pendingActiveValidatorsId: (0, import_superstruct.string)(),
    pendingActiveValidatorsSize: (0, import_superstruct.string)(),
    pendingRemovals: (0, import_superstruct.array)((0, import_superstruct.string)()),
    stakingPoolMappingsId: (0, import_superstruct.string)(),
    stakingPoolMappingsSize: (0, import_superstruct.string)(),
    inactivePoolsId: (0, import_superstruct.string)(),
    inactivePoolsSize: (0, import_superstruct.string)(),
    validatorCandidatesId: (0, import_superstruct.string)(),
    validatorCandidatesSize: (0, import_superstruct.string)(),
    atRiskValidators: (0, import_superstruct.array)((0, import_superstruct.tuple)([
        (0, import_superstruct.string)(),
        (0, import_superstruct.string)()
    ])),
    validatorReportRecords: (0, import_superstruct.array)((0, import_superstruct.tuple)([
        (0, import_superstruct.string)(),
        (0, import_superstruct.array)((0, import_superstruct.string)())
    ]))
}); //# sourceMappingURL=validator.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/coin.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var coin_exports = {};
__export(coin_exports, {
    CoinBalance: ()=>CoinBalance,
    CoinStruct: ()=>CoinStruct,
    CoinSupply: ()=>CoinSupply,
    PaginatedCoins: ()=>PaginatedCoins
});
module.exports = __toCommonJS(coin_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
const CoinStruct = (0, import_superstruct.object)({
    coinType: (0, import_superstruct.string)(),
    // TODO(chris): rename this to objectId
    coinObjectId: (0, import_superstruct.string)(),
    version: (0, import_superstruct.string)(),
    digest: (0, import_superstruct.string)(),
    balance: (0, import_superstruct.string)(),
    previousTransaction: (0, import_superstruct.string)()
});
const PaginatedCoins = (0, import_superstruct.object)({
    data: (0, import_superstruct.array)(CoinStruct),
    nextCursor: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    hasNextPage: (0, import_superstruct.boolean)()
});
const CoinBalance = (0, import_superstruct.object)({
    coinType: (0, import_superstruct.string)(),
    coinObjectCount: (0, import_superstruct.number)(),
    totalBalance: (0, import_superstruct.string)(),
    lockedBalance: (0, import_superstruct.object)({
        epochId: (0, import_superstruct.optional)((0, import_superstruct.number)()),
        number: (0, import_superstruct.optional)((0, import_superstruct.number)())
    })
});
const CoinSupply = (0, import_superstruct.object)({
    value: (0, import_superstruct.string)()
}); //# sourceMappingURL=coin.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/epochs.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var epochs_exports = {};
__export(epochs_exports, {
    EndOfEpochInfo: ()=>EndOfEpochInfo,
    EpochInfo: ()=>EpochInfo,
    EpochPage: ()=>EpochPage
});
module.exports = __toCommonJS(epochs_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var import_validator = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/validator.js [client] (ecmascript)");
const EndOfEpochInfo = (0, import_superstruct.object)({
    lastCheckpointId: (0, import_superstruct.string)(),
    epochEndTimestamp: (0, import_superstruct.string)(),
    protocolVersion: (0, import_superstruct.string)(),
    referenceGasPrice: (0, import_superstruct.string)(),
    totalStake: (0, import_superstruct.string)(),
    storageFundReinvestment: (0, import_superstruct.string)(),
    storageCharge: (0, import_superstruct.string)(),
    storageRebate: (0, import_superstruct.string)(),
    storageFundBalance: (0, import_superstruct.string)(),
    stakeSubsidyAmount: (0, import_superstruct.string)(),
    totalGasFees: (0, import_superstruct.string)(),
    totalStakeRewardsDistributed: (0, import_superstruct.string)(),
    leftoverStorageFundInflow: (0, import_superstruct.string)()
});
const EpochInfo = (0, import_superstruct.object)({
    epoch: (0, import_superstruct.string)(),
    validators: (0, import_superstruct.array)(import_validator.SuiValidatorSummary),
    epochTotalTransactions: (0, import_superstruct.string)(),
    firstCheckpointId: (0, import_superstruct.string)(),
    epochStartTimestamp: (0, import_superstruct.string)(),
    endOfEpochInfo: (0, import_superstruct.nullable)(EndOfEpochInfo),
    referenceGasPrice: (0, import_superstruct.nullable)((0, import_superstruct.number)())
});
const EpochPage = (0, import_superstruct.object)({
    data: (0, import_superstruct.array)(EpochInfo),
    nextCursor: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    hasNextPage: (0, import_superstruct.boolean)()
}); //# sourceMappingURL=epochs.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/subscriptions.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var subscriptions_exports = {};
module.exports = __toCommonJS(subscriptions_exports); //# sourceMappingURL=subscriptions.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/name-service.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var name_service_exports = {};
__export(name_service_exports, {
    ResolvedNameServiceNames: ()=>ResolvedNameServiceNames
});
module.exports = __toCommonJS(name_service_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
const ResolvedNameServiceNames = (0, import_superstruct.object)({
    data: (0, import_superstruct.array)((0, import_superstruct.string)()),
    hasNextPage: (0, import_superstruct.boolean)(),
    nextCursor: (0, import_superstruct.nullable)((0, import_superstruct.string)())
}); //# sourceMappingURL=name-service.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/dynamic_fields.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var dynamic_fields_exports = {};
__export(dynamic_fields_exports, {
    DynamicFieldInfo: ()=>DynamicFieldInfo,
    DynamicFieldName: ()=>DynamicFieldName,
    DynamicFieldPage: ()=>DynamicFieldPage,
    DynamicFieldType: ()=>DynamicFieldType
});
module.exports = __toCommonJS(dynamic_fields_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
const DynamicFieldType = (0, import_superstruct.union)([
    (0, import_superstruct.literal)("DynamicField"),
    (0, import_superstruct.literal)("DynamicObject")
]);
const DynamicFieldName = (0, import_superstruct.object)({
    type: (0, import_superstruct.string)(),
    value: (0, import_superstruct.any)()
});
const DynamicFieldInfo = (0, import_superstruct.object)({
    name: DynamicFieldName,
    bcsName: (0, import_superstruct.string)(),
    type: DynamicFieldType,
    objectType: (0, import_superstruct.string)(),
    objectId: (0, import_superstruct.string)(),
    version: (0, import_superstruct.number)(),
    digest: (0, import_superstruct.string)()
});
const DynamicFieldPage = (0, import_superstruct.object)({
    data: (0, import_superstruct.array)(DynamicFieldInfo),
    nextCursor: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    hasNextPage: (0, import_superstruct.boolean)()
}); //# sourceMappingURL=dynamic_fields.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/checkpoints.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var checkpoints_exports = {};
__export(checkpoints_exports, {
    CheckPointContentsDigest: ()=>CheckPointContentsDigest,
    Checkpoint: ()=>Checkpoint,
    CheckpointCommitment: ()=>CheckpointCommitment,
    CheckpointDigest: ()=>CheckpointDigest,
    CheckpointPage: ()=>CheckpointPage,
    ECMHLiveObjectSetDigest: ()=>ECMHLiveObjectSetDigest,
    EndOfEpochData: ()=>EndOfEpochData,
    ExecutionDigests: ()=>ExecutionDigests,
    GasCostSummary: ()=>GasCostSummary,
    ValidatorSignature: ()=>ValidatorSignature
});
module.exports = __toCommonJS(checkpoints_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
const GasCostSummary = (0, import_superstruct.object)({
    computationCost: (0, import_superstruct.string)(),
    storageCost: (0, import_superstruct.string)(),
    storageRebate: (0, import_superstruct.string)(),
    nonRefundableStorageFee: (0, import_superstruct.string)()
});
const CheckPointContentsDigest = (0, import_superstruct.string)();
const CheckpointDigest = (0, import_superstruct.string)();
const ECMHLiveObjectSetDigest = (0, import_superstruct.object)({
    digest: (0, import_superstruct.array)((0, import_superstruct.number)())
});
const CheckpointCommitment = (0, import_superstruct.any)();
const ValidatorSignature = (0, import_superstruct.string)();
const EndOfEpochData = (0, import_superstruct.object)({
    nextEpochCommittee: (0, import_superstruct.array)((0, import_superstruct.tuple)([
        (0, import_superstruct.string)(),
        (0, import_superstruct.string)()
    ])),
    nextEpochProtocolVersion: (0, import_superstruct.string)(),
    epochCommitments: (0, import_superstruct.array)(CheckpointCommitment)
});
const ExecutionDigests = (0, import_superstruct.object)({
    transaction: (0, import_superstruct.string)(),
    effects: (0, import_superstruct.string)()
});
const Checkpoint = (0, import_superstruct.object)({
    epoch: (0, import_superstruct.string)(),
    sequenceNumber: (0, import_superstruct.string)(),
    digest: (0, import_superstruct.string)(),
    networkTotalTransactions: (0, import_superstruct.string)(),
    previousDigest: (0, import_superstruct.optional)((0, import_superstruct.string)()),
    epochRollingGasCostSummary: GasCostSummary,
    timestampMs: (0, import_superstruct.string)(),
    endOfEpochData: (0, import_superstruct.optional)(EndOfEpochData),
    validatorSignature: (0, import_superstruct.string)(),
    transactions: (0, import_superstruct.array)((0, import_superstruct.string)()),
    checkpointCommitments: (0, import_superstruct.array)(CheckpointCommitment)
});
const CheckpointPage = (0, import_superstruct.object)({
    data: (0, import_superstruct.array)(Checkpoint),
    nextCursor: (0, import_superstruct.nullable)((0, import_superstruct.string)()),
    hasNextPage: (0, import_superstruct.boolean)()
}); //# sourceMappingURL=checkpoints.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/metrics.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var metrics_exports = {};
__export(metrics_exports, {
    AddressMetrics: ()=>AddressMetrics,
    AllEpochsAddressMetrics: ()=>AllEpochsAddressMetrics,
    NetworkMetrics: ()=>NetworkMetrics
});
module.exports = __toCommonJS(metrics_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
const NetworkMetrics = (0, import_superstruct.object)({
    currentTps: (0, import_superstruct.number)(),
    tps30Days: (0, import_superstruct.number)(),
    currentCheckpoint: (0, import_superstruct.string)(),
    currentEpoch: (0, import_superstruct.string)(),
    totalAddresses: (0, import_superstruct.string)(),
    totalObjects: (0, import_superstruct.string)(),
    totalPackages: (0, import_superstruct.string)()
});
const AddressMetrics = (0, import_superstruct.object)({
    checkpoint: (0, import_superstruct.number)(),
    epoch: (0, import_superstruct.number)(),
    timestampMs: (0, import_superstruct.number)(),
    cumulativeAddresses: (0, import_superstruct.number)(),
    cumulativeActiveAddresses: (0, import_superstruct.number)(),
    dailyActiveAddresses: (0, import_superstruct.number)()
});
const AllEpochsAddressMetrics = (0, import_superstruct.array)(AddressMetrics); //# sourceMappingURL=metrics.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var types_exports = {};
__export(types_exports, {
    AddressMetrics: ()=>import_metrics.AddressMetrics,
    AllEpochsAddressMetrics: ()=>import_metrics.AllEpochsAddressMetrics,
    Apy: ()=>import_validator.Apy,
    AuthorityName: ()=>import_transactions.AuthorityName,
    AuthoritySignature: ()=>import_transactions.AuthoritySignature,
    Balance: ()=>import_validator.Balance,
    BalanceChange: ()=>import_transactions.BalanceChange,
    CheckPointContentsDigest: ()=>import_checkpoints.CheckPointContentsDigest,
    Checkpoint: ()=>import_checkpoints.Checkpoint,
    CheckpointCommitment: ()=>import_checkpoints.CheckpointCommitment,
    CheckpointDigest: ()=>import_checkpoints.CheckpointDigest,
    CheckpointPage: ()=>import_checkpoints.CheckpointPage,
    CheckpointedObjectId: ()=>import_objects.CheckpointedObjectId,
    CoinBalance: ()=>import_coin.CoinBalance,
    CoinStruct: ()=>import_coin.CoinStruct,
    CoinSupply: ()=>import_coin.CoinSupply,
    CommitteeInfo: ()=>import_validator.CommitteeInfo,
    Contents: ()=>import_validator2.Contents,
    ContentsFields: ()=>import_validator2.ContentsFields,
    ContentsFieldsWithdraw: ()=>import_validator2.ContentsFieldsWithdraw,
    DelegatedStake: ()=>import_validator.DelegatedStake,
    DelegationStakingPool: ()=>import_validator2.DelegationStakingPool,
    DelegationStakingPoolFields: ()=>import_validator2.DelegationStakingPoolFields,
    DevInspectResults: ()=>import_transactions.DevInspectResults,
    DisplayFieldsBackwardCompatibleResponse: ()=>import_objects.DisplayFieldsBackwardCompatibleResponse,
    DisplayFieldsResponse: ()=>import_objects.DisplayFieldsResponse,
    DryRunTransactionBlockResponse: ()=>import_transactions.DryRunTransactionBlockResponse,
    DynamicFieldInfo: ()=>import_dynamic_fields.DynamicFieldInfo,
    DynamicFieldName: ()=>import_dynamic_fields.DynamicFieldName,
    DynamicFieldPage: ()=>import_dynamic_fields.DynamicFieldPage,
    DynamicFieldType: ()=>import_dynamic_fields.DynamicFieldType,
    EndOfEpochData: ()=>import_checkpoints.EndOfEpochData,
    EndOfEpochInfo: ()=>import_epochs.EndOfEpochInfo,
    EpochId: ()=>import_transactions.EpochId,
    EpochInfo: ()=>import_epochs.EpochInfo,
    EpochPage: ()=>import_epochs.EpochPage,
    EventId: ()=>import_events.EventId,
    ExecutionStatus: ()=>import_transactions.ExecutionStatus,
    ExecutionStatusType: ()=>import_transactions.ExecutionStatusType,
    GasCostSummary: ()=>import_checkpoints.GasCostSummary,
    Genesis: ()=>import_transactions.Genesis,
    GetOwnedObjectsResponse: ()=>import_objects.GetOwnedObjectsResponse,
    MoveCallMetric: ()=>import_normalized.MoveCallMetric,
    MoveCallMetrics: ()=>import_normalized.MoveCallMetrics,
    MoveCallSuiTransaction: ()=>import_transactions.MoveCallSuiTransaction,
    MovePackageContent: ()=>import_objects.MovePackageContent,
    NetworkMetrics: ()=>import_metrics.NetworkMetrics,
    ObjectContentFields: ()=>import_objects.ObjectContentFields,
    ObjectDigest: ()=>import_objects.ObjectDigest,
    ObjectId: ()=>import_common.ObjectId,
    ObjectOwner: ()=>import_common.ObjectOwner,
    ObjectRead: ()=>import_objects.ObjectRead,
    ObjectStatus: ()=>import_objects.ObjectStatus,
    ObjectType: ()=>import_objects.ObjectType,
    OwnedObjectRef: ()=>import_transactions.OwnedObjectRef,
    PaginatedCoins: ()=>import_coin.PaginatedCoins,
    PaginatedEvents: ()=>import_events.PaginatedEvents,
    PaginatedObjectsResponse: ()=>import_objects.PaginatedObjectsResponse,
    PaginatedTransactionResponse: ()=>import_transactions.PaginatedTransactionResponse,
    ProgrammableTransaction: ()=>import_transactions.ProgrammableTransaction,
    ProtocolConfig: ()=>import_common.ProtocolConfig,
    ResolvedNameServiceNames: ()=>import_name_service.ResolvedNameServiceNames,
    SequenceNumber: ()=>import_common.SequenceNumber,
    StakeObject: ()=>import_validator.StakeObject,
    StakeSubsidy: ()=>import_validator2.StakeSubsidy,
    StakeSubsidyFields: ()=>import_validator2.StakeSubsidyFields,
    SuiAddress: ()=>import_common.SuiAddress,
    SuiArgument: ()=>import_transactions.SuiArgument,
    SuiCallArg: ()=>import_transactions.SuiCallArg,
    SuiChangeEpoch: ()=>import_transactions.SuiChangeEpoch,
    SuiConsensusCommitPrologue: ()=>import_transactions.SuiConsensusCommitPrologue,
    SuiEvent: ()=>import_events.SuiEvent,
    SuiGasData: ()=>import_objects.SuiGasData,
    SuiJsonValue: ()=>import_common.SuiJsonValue,
    SuiMoveAbilitySet: ()=>import_normalized.SuiMoveAbilitySet,
    SuiMoveFunctionArgType: ()=>import_normalized.SuiMoveFunctionArgType,
    SuiMoveFunctionArgTypes: ()=>import_normalized.SuiMoveFunctionArgTypes,
    SuiMoveModuleId: ()=>import_normalized.SuiMoveModuleId,
    SuiMoveNormalizedField: ()=>import_normalized.SuiMoveNormalizedField,
    SuiMoveNormalizedFunction: ()=>import_normalized.SuiMoveNormalizedFunction,
    SuiMoveNormalizedModule: ()=>import_normalized.SuiMoveNormalizedModule,
    SuiMoveNormalizedModules: ()=>import_normalized.SuiMoveNormalizedModules,
    SuiMoveNormalizedStruct: ()=>import_normalized.SuiMoveNormalizedStruct,
    SuiMoveNormalizedStructType: ()=>import_normalized.SuiMoveNormalizedStructType,
    SuiMoveNormalizedType: ()=>import_normalized.SuiMoveNormalizedType,
    SuiMoveNormalizedTypeParameterType: ()=>import_normalized.SuiMoveNormalizedTypeParameterType,
    SuiMoveObject: ()=>import_objects.SuiMoveObject,
    SuiMovePackage: ()=>import_objects.SuiMovePackage,
    SuiMoveStructTypeParameter: ()=>import_normalized.SuiMoveStructTypeParameter,
    SuiMoveVisibility: ()=>import_normalized.SuiMoveVisibility,
    SuiObjectChange: ()=>import_transactions.SuiObjectChange,
    SuiObjectChangeCreated: ()=>import_transactions.SuiObjectChangeCreated,
    SuiObjectChangeDeleted: ()=>import_transactions.SuiObjectChangeDeleted,
    SuiObjectChangeMutated: ()=>import_transactions.SuiObjectChangeMutated,
    SuiObjectChangePublished: ()=>import_transactions.SuiObjectChangePublished,
    SuiObjectChangeTransferred: ()=>import_transactions.SuiObjectChangeTransferred,
    SuiObjectChangeWrapped: ()=>import_transactions.SuiObjectChangeWrapped,
    SuiObjectData: ()=>import_objects.SuiObjectData,
    SuiObjectDataOptions: ()=>import_objects.SuiObjectDataOptions,
    SuiObjectInfo: ()=>import_objects.SuiObjectInfo,
    SuiObjectRef: ()=>import_objects.SuiObjectRef,
    SuiObjectResponse: ()=>import_objects.SuiObjectResponse,
    SuiObjectResponseError: ()=>import_objects.SuiObjectResponseError,
    SuiParsedData: ()=>import_objects.SuiParsedData,
    SuiRawData: ()=>import_objects.SuiRawData,
    SuiRawMoveObject: ()=>import_objects.SuiRawMoveObject,
    SuiRawMovePackage: ()=>import_objects.SuiRawMovePackage,
    SuiSupplyFields: ()=>import_validator2.SuiSupplyFields,
    SuiSystemStateSummary: ()=>import_validator.SuiSystemStateSummary,
    SuiTransaction: ()=>import_transactions.SuiTransaction,
    SuiTransactionBlock: ()=>import_transactions.SuiTransactionBlock,
    SuiTransactionBlockData: ()=>import_transactions.SuiTransactionBlockData,
    SuiTransactionBlockResponse: ()=>import_transactions.SuiTransactionBlockResponse,
    SuiTransactionBlockResponseOptions: ()=>import_transactions.SuiTransactionBlockResponseOptions,
    SuiValidatorSummary: ()=>import_validator.SuiValidatorSummary,
    TransactionDigest: ()=>import_common.TransactionDigest,
    TransactionEffects: ()=>import_transactions.TransactionEffects,
    TransactionEffectsDigest: ()=>import_common.TransactionEffectsDigest,
    TransactionEffectsModifiedAtVersions: ()=>import_transactions.TransactionEffectsModifiedAtVersions,
    TransactionEventDigest: ()=>import_common.TransactionEventDigest,
    TransactionEvents: ()=>import_transactions.TransactionEvents,
    ValidatorSignature: ()=>import_checkpoints.ValidatorSignature,
    Validators: ()=>import_validator.Validators,
    ValidatorsApy: ()=>import_validator.ValidatorsApy,
    extractMutableReference: ()=>import_normalized.extractMutableReference,
    extractReference: ()=>import_normalized.extractReference,
    extractStructTag: ()=>import_normalized.extractStructTag,
    getChangeEpochTransaction: ()=>import_transactions.getChangeEpochTransaction,
    getConsensusCommitPrologueTransaction: ()=>import_transactions.getConsensusCommitPrologueTransaction,
    getCreatedObjects: ()=>import_transactions.getCreatedObjects,
    getEventPackage: ()=>import_events.getEventPackage,
    getEventSender: ()=>import_events.getEventSender,
    getEvents: ()=>import_transactions.getEvents,
    getExecutionStatus: ()=>import_transactions.getExecutionStatus,
    getExecutionStatusError: ()=>import_transactions.getExecutionStatusError,
    getExecutionStatusGasSummary: ()=>import_transactions.getExecutionStatusGasSummary,
    getExecutionStatusType: ()=>import_transactions.getExecutionStatusType,
    getGasData: ()=>import_transactions.getGasData,
    getMoveObject: ()=>import_objects.getMoveObject,
    getMoveObjectType: ()=>import_objects.getMoveObjectType,
    getMovePackageContent: ()=>import_objects.getMovePackageContent,
    getNewlyCreatedCoinRefsAfterSplit: ()=>import_transactions.getNewlyCreatedCoinRefsAfterSplit,
    getObjectChanges: ()=>import_transactions.getObjectChanges,
    getObjectDeletedResponse: ()=>import_objects.getObjectDeletedResponse,
    getObjectDisplay: ()=>import_objects.getObjectDisplay,
    getObjectFields: ()=>import_objects.getObjectFields,
    getObjectId: ()=>import_objects.getObjectId,
    getObjectNotExistsResponse: ()=>import_objects.getObjectNotExistsResponse,
    getObjectOwner: ()=>import_objects.getObjectOwner,
    getObjectPreviousTransactionDigest: ()=>import_objects.getObjectPreviousTransactionDigest,
    getObjectReference: ()=>import_objects.getObjectReference,
    getObjectType: ()=>import_objects.getObjectType,
    getObjectVersion: ()=>import_objects.getObjectVersion,
    getProgrammableTransaction: ()=>import_transactions.getProgrammableTransaction,
    getPublishedObjectChanges: ()=>import_transactions.getPublishedObjectChanges,
    getSharedObjectInitialVersion: ()=>import_objects.getSharedObjectInitialVersion,
    getSuiObjectData: ()=>import_objects.getSuiObjectData,
    getTimestampFromTransactionResponse: ()=>import_transactions.getTimestampFromTransactionResponse,
    getTotalGasUsed: ()=>import_transactions.getTotalGasUsed,
    getTotalGasUsedUpperBound: ()=>import_transactions.getTotalGasUsedUpperBound,
    getTransaction: ()=>import_transactions.getTransaction,
    getTransactionDigest: ()=>import_transactions.getTransactionDigest,
    getTransactionEffects: ()=>import_transactions.getTransactionEffects,
    getTransactionGasBudget: ()=>import_transactions.getTransactionGasBudget,
    getTransactionGasObject: ()=>import_transactions.getTransactionGasObject,
    getTransactionGasPrice: ()=>import_transactions.getTransactionGasPrice,
    getTransactionKind: ()=>import_transactions.getTransactionKind,
    getTransactionKindName: ()=>import_transactions.getTransactionKindName,
    getTransactionSender: ()=>import_transactions.getTransactionSender,
    getTransactionSignature: ()=>import_transactions.getTransactionSignature,
    hasPublicTransfer: ()=>import_objects.hasPublicTransfer,
    isImmutableObject: ()=>import_objects.isImmutableObject,
    isSharedObject: ()=>import_objects.isSharedObject,
    isSuiObjectResponse: ()=>import_objects.isSuiObjectResponse
});
module.exports = __toCommonJS(types_exports);
var import_common = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/common.js [client] (ecmascript)");
var import_objects = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/objects.js [client] (ecmascript)");
var import_events = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/events.js [client] (ecmascript)");
var import_transactions = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/transactions.js [client] (ecmascript)");
var import_normalized = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/normalized.js [client] (ecmascript)");
var import_validator = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/validator.js [client] (ecmascript)");
var import_coin = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/coin.js [client] (ecmascript)");
var import_epochs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/epochs.js [client] (ecmascript)");
var import_subscriptions = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/subscriptions.js [client] (ecmascript)");
var import_name_service = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/name-service.js [client] (ecmascript)");
var import_dynamic_fields = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/dynamic_fields.js [client] (ecmascript)");
var import_checkpoints = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/checkpoints.js [client] (ecmascript)");
var import_metrics = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/metrics.js [client] (ecmascript)");
var import_validator2 = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/validator.js [client] (ecmascript)"); //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/Inputs.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var Inputs_exports = {};
__export(Inputs_exports, {
    BuilderCallArg: ()=>BuilderCallArg,
    Inputs: ()=>Inputs,
    ObjectCallArg: ()=>ObjectCallArg,
    PureCallArg: ()=>PureCallArg,
    getIdFromCallArg: ()=>getIdFromCallArg,
    getSharedObjectInput: ()=>getSharedObjectInput,
    isMutableSharedObjectInput: ()=>isMutableSharedObjectInput,
    isSharedObjectInput: ()=>isSharedObjectInput
});
module.exports = __toCommonJS(Inputs_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var import_bcs2 = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/bcs/index.js [client] (ecmascript)");
var import_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/index.js [client] (ecmascript)");
var import_sui_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/sui-types.js [client] (ecmascript)");
const ObjectArg = (0, import_superstruct.union)([
    (0, import_superstruct.object)({
        ImmOrOwned: import_types.SuiObjectRef
    }),
    (0, import_superstruct.object)({
        Shared: (0, import_superstruct.object)({
            objectId: (0, import_superstruct.string)(),
            initialSharedVersion: (0, import_superstruct.union)([
                (0, import_superstruct.integer)(),
                (0, import_superstruct.string)()
            ]),
            mutable: (0, import_superstruct.boolean)()
        })
    })
]);
const PureCallArg = (0, import_superstruct.object)({
    Pure: (0, import_superstruct.array)((0, import_superstruct.integer)())
});
const ObjectCallArg = (0, import_superstruct.object)({
    Object: ObjectArg
});
const BuilderCallArg = (0, import_superstruct.union)([
    PureCallArg,
    ObjectCallArg
]);
function Pure(data, type) {
    return {
        Pure: Array.from(data instanceof Uint8Array ? data : (0, import_bcs.isSerializedBcs)(data) ? data.toBytes() : // NOTE: We explicitly set this to be growable to infinity, because we have maxSize validation at the builder-level:
        import_bcs2.bcs.ser(type, data, {
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
                    objectId: (0, import_sui_types.normalizeSuiAddress)(objectId)
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
                    objectId: (0, import_sui_types.normalizeSuiAddress)(objectId)
                }
            }
        };
    }
};
function getIdFromCallArg(arg) {
    if (typeof arg === "string") {
        return (0, import_sui_types.normalizeSuiAddress)(arg);
    }
    if ("ImmOrOwned" in arg.Object) {
        return (0, import_sui_types.normalizeSuiAddress)(arg.Object.ImmOrOwned.objectId);
    }
    return (0, import_sui_types.normalizeSuiAddress)(arg.Object.Shared.objectId);
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
} //# sourceMappingURL=Inputs.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/pure.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var pure_exports = {};
__export(pure_exports, {
    createPure: ()=>createPure
});
module.exports = __toCommonJS(pure_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/bcs/index.js [client] (ecmascript)");
function createPure(makePure) {
    function pure(value, type) {
        return makePure(value, type);
    }
    pure.u8 = (value)=>makePure(import_bcs.bcs.U8.serialize(value));
    pure.u16 = (value)=>makePure(import_bcs.bcs.U16.serialize(value));
    pure.u32 = (value)=>makePure(import_bcs.bcs.U32.serialize(value));
    pure.u64 = (value)=>makePure(import_bcs.bcs.U64.serialize(value));
    pure.u128 = (value)=>makePure(import_bcs.bcs.U128.serialize(value));
    pure.u256 = (value)=>makePure(import_bcs.bcs.U256.serialize(value));
    pure.bool = (value)=>makePure(import_bcs.bcs.Bool.serialize(value));
    pure.string = (value)=>makePure(import_bcs.bcs.String.serialize(value));
    pure.address = (value)=>makePure(import_bcs.bcs.Address.serialize(value));
    return pure;
} //# sourceMappingURL=pure.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/serializer.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var serializer_exports = {};
__export(serializer_exports, {
    getPureSerializationType: ()=>getPureSerializationType,
    isTxContext: ()=>isTxContext
});
module.exports = __toCommonJS(serializer_exports);
var import_framework = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/framework/framework.js [client] (ecmascript)");
var import_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/index.js [client] (ecmascript)");
var import_sui_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/sui-types.js [client] (ecmascript)");
const STD_ASCII_MODULE_NAME = "ascii";
const STD_ASCII_STRUCT_NAME = "String";
const STD_UTF8_MODULE_NAME = "string";
const STD_UTF8_STRUCT_NAME = "String";
const STD_OPTION_MODULE_NAME = "option";
const STD_OPTION_STRUCT_NAME = "Option";
const RESOLVED_SUI_ID = {
    address: import_framework.SUI_FRAMEWORK_ADDRESS,
    module: import_framework.OBJECT_MODULE_NAME,
    name: import_framework.ID_STRUCT_NAME
};
const RESOLVED_ASCII_STR = {
    address: import_framework.MOVE_STDLIB_ADDRESS,
    module: STD_ASCII_MODULE_NAME,
    name: STD_ASCII_STRUCT_NAME
};
const RESOLVED_UTF8_STR = {
    address: import_framework.MOVE_STDLIB_ADDRESS,
    module: STD_UTF8_MODULE_NAME,
    name: STD_UTF8_STRUCT_NAME
};
const RESOLVED_STD_OPTION = {
    address: import_framework.MOVE_STDLIB_ADDRESS,
    module: STD_OPTION_MODULE_NAME,
    name: STD_OPTION_STRUCT_NAME
};
const isSameStruct = (a, b)=>a.address === b.address && a.module === b.module && a.name === b.name;
function isTxContext(param) {
    var _this;
    const struct = (_this = (0, import_types.extractStructTag)(param)) === null || _this === void 0 ? void 0 : _this.Struct;
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
            if (argVal && !(0, import_sui_types.isValidSuiAddress)(argVal)) {
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
} //# sourceMappingURL=serializer.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/hash.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var hash_exports = {};
__export(hash_exports, {
    hashTypedData: ()=>hashTypedData
});
module.exports = __toCommonJS(hash_exports);
var import_blake2b = __turbopack_context__.r("[project]/node_modules/@noble/hashes/blake2b.js [client] (ecmascript)");
function hashTypedData(typeTag, data) {
    const typeTagBytes = Array.from("".concat(typeTag, "::")).map((e)=>e.charCodeAt(0));
    const dataWithTag = new Uint8Array(typeTagBytes.length + data.length);
    dataWithTag.set(typeTagBytes);
    dataWithTag.set(data, typeTagBytes.length);
    return (0, import_blake2b.blake2b)(dataWithTag, {
        dkLen: 32
    });
} //# sourceMappingURL=hash.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/utils.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var utils_exports = {};
__export(utils_exports, {
    create: ()=>create
});
module.exports = __toCommonJS(utils_exports);
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
function create(value, struct) {
    return (0, import_superstruct.create)(value, struct);
} //# sourceMappingURL=utils.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/Transactions.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var Transactions_exports = {};
__export(Transactions_exports, {
    MakeMoveVecTransaction: ()=>MakeMoveVecTransaction,
    MergeCoinsTransaction: ()=>MergeCoinsTransaction,
    MoveCallTransaction: ()=>MoveCallTransaction,
    PublishTransaction: ()=>PublishTransaction,
    SplitCoinsTransaction: ()=>SplitCoinsTransaction,
    TransactionArgument: ()=>TransactionArgument,
    TransactionBlockInput: ()=>TransactionBlockInput,
    TransactionType: ()=>TransactionType,
    Transactions: ()=>Transactions,
    TransferObjectsTransaction: ()=>TransferObjectsTransaction,
    UpgradePolicy: ()=>UpgradePolicy,
    UpgradeTransaction: ()=>UpgradeTransaction,
    getTransactionType: ()=>getTransactionType
});
module.exports = __toCommonJS(Transactions_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var import_bcs2 = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/bcs/index.js [client] (ecmascript)");
var import_type_tag_serializer = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/bcs/type-tag-serializer.js [client] (ecmascript)");
var import_sui_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/sui-types.js [client] (ecmascript)");
var import_Inputs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/Inputs.js [client] (ecmascript)");
var import_utils = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/utils.js [client] (ecmascript)");
const option = (some)=>(0, import_superstruct.union)([
        (0, import_superstruct.object)({
            None: (0, import_superstruct.union)([
                (0, import_superstruct.literal)(true),
                (0, import_superstruct.literal)(null)
            ])
        }),
        (0, import_superstruct.object)({
            Some: some
        })
    ]);
const TransactionBlockInput = (0, import_superstruct.union)([
    (0, import_superstruct.object)({
        kind: (0, import_superstruct.literal)("Input"),
        index: (0, import_superstruct.integer)(),
        value: (0, import_superstruct.optional)((0, import_superstruct.any)()),
        type: (0, import_superstruct.optional)((0, import_superstruct.literal)("object"))
    }),
    (0, import_superstruct.object)({
        kind: (0, import_superstruct.literal)("Input"),
        index: (0, import_superstruct.integer)(),
        value: (0, import_superstruct.optional)((0, import_superstruct.any)()),
        type: (0, import_superstruct.literal)("pure")
    })
]);
const TransactionArgumentTypes = [
    TransactionBlockInput,
    (0, import_superstruct.object)({
        kind: (0, import_superstruct.literal)("GasCoin")
    }),
    (0, import_superstruct.object)({
        kind: (0, import_superstruct.literal)("Result"),
        index: (0, import_superstruct.integer)()
    }),
    (0, import_superstruct.object)({
        kind: (0, import_superstruct.literal)("NestedResult"),
        index: (0, import_superstruct.integer)(),
        resultIndex: (0, import_superstruct.integer)()
    })
];
const TransactionArgument = (0, import_superstruct.union)([
    ...TransactionArgumentTypes
]);
const MoveCallTransaction = (0, import_superstruct.object)({
    kind: (0, import_superstruct.literal)("MoveCall"),
    target: (0, import_superstruct.define)("target", (0, import_superstruct.string)().validator),
    typeArguments: (0, import_superstruct.array)((0, import_superstruct.string)()),
    arguments: (0, import_superstruct.array)(TransactionArgument)
});
const TransferObjectsTransaction = (0, import_superstruct.object)({
    kind: (0, import_superstruct.literal)("TransferObjects"),
    objects: (0, import_superstruct.array)(TransactionArgument),
    address: TransactionArgument
});
const SplitCoinsTransaction = (0, import_superstruct.object)({
    kind: (0, import_superstruct.literal)("SplitCoins"),
    coin: TransactionArgument,
    amounts: (0, import_superstruct.array)(TransactionArgument)
});
const MergeCoinsTransaction = (0, import_superstruct.object)({
    kind: (0, import_superstruct.literal)("MergeCoins"),
    destination: TransactionArgument,
    sources: (0, import_superstruct.array)(TransactionArgument)
});
const MakeMoveVecTransaction = (0, import_superstruct.object)({
    kind: (0, import_superstruct.literal)("MakeMoveVec"),
    // TODO: ideally we should use `TypeTag` instead of `record()` here,
    // but TypeTag is recursively defined and it's tricky to define a
    // recursive struct in superstruct
    type: (0, import_superstruct.optional)(option((0, import_superstruct.record)((0, import_superstruct.string)(), (0, import_superstruct.unknown)()))),
    objects: (0, import_superstruct.array)(TransactionArgument)
});
const PublishTransaction = (0, import_superstruct.object)({
    kind: (0, import_superstruct.literal)("Publish"),
    modules: (0, import_superstruct.array)((0, import_superstruct.array)((0, import_superstruct.integer)())),
    dependencies: (0, import_superstruct.array)((0, import_superstruct.string)())
});
var UpgradePolicy = /* @__PURE__ */ ((UpgradePolicy2)=>{
    UpgradePolicy2[UpgradePolicy2["COMPATIBLE"] = 0] = "COMPATIBLE";
    UpgradePolicy2[UpgradePolicy2["ADDITIVE"] = 128] = "ADDITIVE";
    UpgradePolicy2[UpgradePolicy2["DEP_ONLY"] = 192] = "DEP_ONLY";
    return UpgradePolicy2;
})(UpgradePolicy || {});
const UpgradeTransaction = (0, import_superstruct.object)({
    kind: (0, import_superstruct.literal)("Upgrade"),
    modules: (0, import_superstruct.array)((0, import_superstruct.array)((0, import_superstruct.integer)())),
    dependencies: (0, import_superstruct.array)((0, import_superstruct.string)()),
    packageId: (0, import_superstruct.string)(),
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
const TransactionType = (0, import_superstruct.union)([
    ...TransactionTypes
]);
function getTransactionType(data) {
    (0, import_superstruct.assert)(data, TransactionType);
    return TransactionTypes.find((schema)=>(0, import_superstruct.is)(data, schema));
}
const Transactions = {
    MoveCall (input) {
        var _input_arguments, _input_typeArguments;
        return (0, import_utils.create)({
            kind: "MoveCall",
            target: input.target,
            arguments: (_input_arguments = input.arguments) !== null && _input_arguments !== void 0 ? _input_arguments : [],
            typeArguments: (_input_typeArguments = input.typeArguments) !== null && _input_typeArguments !== void 0 ? _input_typeArguments : []
        }, MoveCallTransaction);
    },
    TransferObjects (objects, address) {
        if (address.kind === "Input" && address.type === "pure" && typeof address.value !== "object") {
            address.value = import_Inputs.Inputs.Pure(import_bcs2.bcs.Address.serialize(address.value));
        }
        return (0, import_utils.create)({
            kind: "TransferObjects",
            objects,
            address
        }, TransferObjectsTransaction);
    },
    SplitCoins (coin, amounts) {
        amounts.forEach((input)=>{
            if (input.kind === "Input" && input.type === "pure" && typeof input.value !== "object") {
                input.value = import_Inputs.Inputs.Pure(import_bcs2.bcs.U64.serialize(input.value));
            }
        });
        return (0, import_utils.create)({
            kind: "SplitCoins",
            coin,
            amounts
        }, SplitCoinsTransaction);
    },
    MergeCoins (destination, sources) {
        return (0, import_utils.create)({
            kind: "MergeCoins",
            destination,
            sources
        }, MergeCoinsTransaction);
    },
    Publish (param) {
        let { modules, dependencies } = param;
        return (0, import_utils.create)({
            kind: "Publish",
            modules: modules.map((module2)=>typeof module2 === "string" ? Array.from((0, import_bcs.fromB64)(module2)) : module2),
            dependencies: dependencies.map((dep)=>(0, import_sui_types.normalizeSuiObjectId)(dep))
        }, PublishTransaction);
    },
    Upgrade (param) {
        let { modules, dependencies, packageId, ticket } = param;
        return (0, import_utils.create)({
            kind: "Upgrade",
            modules: modules.map((module2)=>typeof module2 === "string" ? Array.from((0, import_bcs.fromB64)(module2)) : module2),
            dependencies: dependencies.map((dep)=>(0, import_sui_types.normalizeSuiObjectId)(dep)),
            packageId,
            ticket
        }, UpgradeTransaction);
    },
    MakeMoveVec (param) {
        let { type, objects } = param;
        return (0, import_utils.create)({
            kind: "MakeMoveVec",
            type: type ? {
                Some: import_type_tag_serializer.TypeTagSerializer.parseFromStr(type)
            } : {
                None: null
            },
            objects
        }, MakeMoveVecTransaction);
    }
}; //# sourceMappingURL=Transactions.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/TransactionBlockData.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var TransactionBlockData_exports = {};
__export(TransactionBlockData_exports, {
    SerializedTransactionDataBuilder: ()=>SerializedTransactionDataBuilder,
    TransactionBlockDataBuilder: ()=>TransactionBlockDataBuilder,
    TransactionExpiration: ()=>TransactionExpiration
});
module.exports = __toCommonJS(TransactionBlockData_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var import_bcs2 = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/bcs/index.js [client] (ecmascript)");
var import_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/index.js [client] (ecmascript)");
var import_sui_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/sui-types.js [client] (ecmascript)");
var import_hash = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/hash.js [client] (ecmascript)");
var import_Inputs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/Inputs.js [client] (ecmascript)");
var import_Transactions = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/Transactions.js [client] (ecmascript)");
var import_utils = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/utils.js [client] (ecmascript)");
const TransactionExpiration = (0, import_superstruct.optional)((0, import_superstruct.nullable)((0, import_superstruct.union)([
    (0, import_superstruct.object)({
        Epoch: (0, import_superstruct.integer)()
    }),
    (0, import_superstruct.object)({
        None: (0, import_superstruct.union)([
            (0, import_superstruct.literal)(true),
            (0, import_superstruct.literal)(null)
        ])
    })
])));
const StringEncodedBigint = (0, import_superstruct.define)("StringEncodedBigint", (val)=>{
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
const GasConfig = (0, import_superstruct.object)({
    budget: (0, import_superstruct.optional)(StringEncodedBigint),
    price: (0, import_superstruct.optional)(StringEncodedBigint),
    payment: (0, import_superstruct.optional)((0, import_superstruct.array)(import_types.SuiObjectRef)),
    owner: (0, import_superstruct.optional)((0, import_superstruct.string)())
});
const SerializedTransactionDataBuilder = (0, import_superstruct.object)({
    version: (0, import_superstruct.literal)(1),
    sender: (0, import_superstruct.optional)((0, import_superstruct.string)()),
    expiration: TransactionExpiration,
    gasConfig: GasConfig,
    inputs: (0, import_superstruct.array)(import_Transactions.TransactionBlockInput),
    transactions: (0, import_superstruct.array)(import_Transactions.TransactionType)
});
function prepareSuiAddress(address) {
    return (0, import_sui_types.normalizeSuiAddress)(address).replace("0x", "");
}
class TransactionBlockDataBuilder {
    static fromKindBytes(bytes) {
        const kind = import_bcs2.bcs.TransactionKind.parse(bytes);
        const programmableTx = "ProgrammableTransaction" in kind ? kind.ProgrammableTransaction : null;
        if (!programmableTx) {
            throw new Error("Unable to deserialize from bytes.");
        }
        const serialized = (0, import_utils.create)({
            version: 1,
            gasConfig: {},
            inputs: programmableTx.inputs.map((value, index)=>(0, import_utils.create)({
                    kind: "Input",
                    value,
                    index,
                    type: (0, import_superstruct.is)(value, import_Inputs.PureCallArg) ? "pure" : "object"
                }, import_Transactions.TransactionBlockInput)),
            transactions: programmableTx.transactions
        }, SerializedTransactionDataBuilder);
        return TransactionBlockDataBuilder.restore(serialized);
    }
    static fromBytes(bytes) {
        var _data_kind;
        const rawData = import_bcs2.bcs.TransactionData.parse(bytes);
        const data = rawData === null || rawData === void 0 ? void 0 : rawData.V1;
        const programmableTx = "ProgrammableTransaction" in data.kind ? data === null || data === void 0 ? void 0 : (_data_kind = data.kind) === null || _data_kind === void 0 ? void 0 : _data_kind.ProgrammableTransaction : null;
        if (!data || !programmableTx) {
            throw new Error("Unable to deserialize from bytes.");
        }
        const serialized = (0, import_utils.create)({
            version: 1,
            sender: data.sender,
            expiration: data.expiration,
            gasConfig: data.gasData,
            inputs: programmableTx.inputs.map((value, index)=>(0, import_utils.create)({
                    kind: "Input",
                    value,
                    index,
                    type: (0, import_superstruct.is)(value, import_Inputs.PureCallArg) ? "pure" : "object"
                }, import_Transactions.TransactionBlockInput)),
            transactions: programmableTx.transactions
        }, SerializedTransactionDataBuilder);
        return TransactionBlockDataBuilder.restore(serialized);
    }
    static restore(data) {
        (0, import_superstruct.assert)(data, SerializedTransactionDataBuilder);
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
        const hash = (0, import_hash.hashTypedData)("TransactionData", bytes);
        return (0, import_bcs.toB58)(hash);
    }
    build() {
        let { maxSizeBytes = Infinity, overrides, onlyTransactionKind } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        const inputs = this.inputs.map((input)=>{
            (0, import_superstruct.assert)(input.value, import_Inputs.BuilderCallArg);
            return input.value;
        });
        const kind = {
            ProgrammableTransaction: {
                inputs,
                transactions: this.transactions
            }
        };
        if (onlyTransactionKind) {
            return import_bcs2.bcs.TransactionKind.serialize(kind, {
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
        return import_bcs2.bcs.TransactionData.serialize({
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
        return (0, import_utils.create)(this, SerializedTransactionDataBuilder);
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
} //# sourceMappingURL=TransactionBlockData.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/TransactionBlock.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
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
var TransactionBlock_exports = {};
__export(TransactionBlock_exports, {
    TransactionBlock: ()=>TransactionBlock,
    isTransactionBlock: ()=>isTransactionBlock
});
module.exports = __toCommonJS(TransactionBlock_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_superstruct = __turbopack_context__.r("[project]/node_modules/superstruct/dist/index.mjs [client] (ecmascript)");
var import_bcs2 = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/bcs/index.js [client] (ecmascript)");
var import_framework = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/framework/framework.js [client] (ecmascript)");
var import_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/types/index.js [client] (ecmascript)");
var import_sui_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/sui-types.js [client] (ecmascript)");
var import_Inputs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/Inputs.js [client] (ecmascript)");
var import_pure = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/pure.js [client] (ecmascript)");
var import_serializer = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/serializer.js [client] (ecmascript)");
var import_TransactionBlockData = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/TransactionBlockData.js [client] (ecmascript)");
var import_Transactions = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/Transactions.js [client] (ecmascript)");
var import_utils = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/utils.js [client] (ecmascript)");
var _blockData, _input, input_fn, _normalizeTransactionArgument, normalizeTransactionArgument_fn, _getConfig, getConfig_fn, _validate, validate_fn, _prepareGasPayment, prepareGasPayment_fn, _prepareGasPrice, prepareGasPrice_fn, _prepareTransactions, prepareTransactions_fn, _prepare, prepare_fn;
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
        __privateSet(tx, _blockData, import_TransactionBlockData.TransactionBlockDataBuilder.fromKindBytes(typeof serialized === "string" ? (0, import_bcs.fromB64)(serialized) : serialized));
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
            __privateSet(tx, _blockData, import_TransactionBlockData.TransactionBlockDataBuilder.fromBytes(typeof serialized === "string" ? (0, import_bcs.fromB64)(serialized) : serialized));
        } else {
            __privateSet(tx, _blockData, import_TransactionBlockData.TransactionBlockDataBuilder.restore(JSON.parse(serialized)));
        }
        return tx;
    }
    /**
   * A helper to retrieve the Transaction builder `Transactions`
   * @deprecated Either use the helper methods on the `TransactionBlock` class, or import `Transactions` from `@mysten/sui.js/transactions`.
   */ static get Transactions() {
        return import_Transactions.Transactions;
    }
    /**
   * A helper to retrieve the Transaction builder `Inputs`
   * * @deprecated Either use the helper methods on the `TransactionBlock` class, or import `Inputs` from `@mysten/sui.js/transactions`.
   */ static get Inputs() {
        return import_Inputs.Inputs;
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
        __privateGet(this, _blockData).gasConfig.payment = payments.map((payment)=>(0, import_superstruct.mask)(payment, import_types.SuiObjectRef));
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
            value: (0, import_pure.createPure)((value, type)=>{
                if ((0, import_bcs.isSerializedBcs)(value)) {
                    return __privateMethod(this, _input, input_fn).call(this, "pure", {
                        Pure: Array.from(value.toBytes())
                    });
                }
                return __privateMethod(this, _input, input_fn).call(this, "pure", value instanceof Uint8Array ? import_Inputs.Inputs.Pure(value) : type ? import_Inputs.Inputs.Pure(value, type) : value);
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
        const id = (0, import_Inputs.getIdFromCallArg)(value);
        const inserted = __privateGet(this, _blockData).inputs.find((i)=>i.type === "object" && id === (0, import_Inputs.getIdFromCallArg)(i.value));
        return inserted !== null && inserted !== void 0 ? inserted : __privateMethod(this, _input, input_fn).call(this, "object", typeof value === "string" ? (0, import_sui_types.normalizeSuiAddress)(value) : value);
    }
    /**
   * Add a new object input to the transaction using the fully-resolved object reference.
   * If you only have an object ID, use `builder.object(id)` instead.
   */ objectRef() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.object(import_Inputs.Inputs.ObjectRef(...args));
    }
    /**
   * Add a new shared object input to the transaction using the fully-resolved shared object reference.
   * If you only have an object ID, use `builder.object(id)` instead.
   */ sharedObjectRef() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return this.object(import_Inputs.Inputs.SharedObjectRef(...args));
    }
    /** Add a transaction to the transaction block. */ add(transaction) {
        const index = __privateGet(this, _blockData).transactions.push(transaction);
        return createTransactionResult(index - 1);
    }
    // Method shorthands:
    splitCoins(coin, amounts) {
        return this.add(import_Transactions.Transactions.SplitCoins(typeof coin === "string" ? this.object(coin) : coin, amounts.map((amount)=>typeof amount === "number" || typeof amount === "bigint" || typeof amount === "string" ? this.pure.u64(amount) : __privateMethod(this, _normalizeTransactionArgument, normalizeTransactionArgument_fn).call(this, amount))));
    }
    mergeCoins(destination, sources) {
        return this.add(import_Transactions.Transactions.MergeCoins(typeof destination === "string" ? this.object(destination) : destination, sources.map((src)=>typeof src === "string" ? this.object(src) : src)));
    }
    publish(param) {
        let { modules, dependencies } = param;
        return this.add(import_Transactions.Transactions.Publish({
            modules,
            dependencies
        }));
    }
    upgrade(param) {
        let { modules, dependencies, packageId, ticket } = param;
        return this.add(import_Transactions.Transactions.Upgrade({
            modules,
            dependencies,
            packageId,
            ticket: typeof ticket === "string" ? this.object(ticket) : ticket
        }));
    }
    moveCall(param) {
        let { arguments: args, typeArguments, target } = param;
        return this.add(import_Transactions.Transactions.MoveCall({
            arguments: args === null || args === void 0 ? void 0 : args.map((arg)=>__privateMethod(this, _normalizeTransactionArgument, normalizeTransactionArgument_fn).call(this, arg)),
            typeArguments,
            target
        }));
    }
    transferObjects(objects, address) {
        return this.add(import_Transactions.Transactions.TransferObjects(objects.map((obj)=>typeof obj === "string" ? this.object(obj) : obj), typeof address === "string" ? this.pure.address(address) : __privateMethod(this, _normalizeTransactionArgument, normalizeTransactionArgument_fn).call(this, address)));
    }
    makeMoveVec(param) {
        let { type, objects } = param;
        return this.add(import_Transactions.Transactions.MakeMoveVec({
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
        __privateSet(this, _blockData, new import_TransactionBlockData.TransactionBlockDataBuilder(transaction ? transaction.blockData : void 0));
    }
};
let TransactionBlock = _TransactionBlock;
_blockData = new WeakMap();
_input = new WeakSet();
input_fn = function(type, value) {
    const index = __privateGet(this, _blockData).inputs.length;
    const input = (0, import_utils.create)({
        kind: "Input",
        // bigints can't be serialized to JSON, so just string-convert them here:
        value: typeof value === "bigint" ? String(value) : value,
        index,
        type
    }, import_Transactions.TransactionBlockInput);
    __privateGet(this, _blockData).inputs.push(input);
    return input;
};
_normalizeTransactionArgument = new WeakSet();
normalizeTransactionArgument_fn = function(arg) {
    if ((0, import_bcs.isSerializedBcs)(arg)) {
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
        if ((0, import_superstruct.is)(input.value, import_Inputs.PureCallArg)) {
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
        coinType: import_framework.SUI_TYPE_ARG
    });
    const paymentCoins = coins.data.filter((coin)=>{
        const matchingInput = __privateGet(this, _blockData).inputs.find((input)=>{
            if ((0, import_superstruct.is)(input.value, import_Inputs.BuilderCallArg) && "Object" in input.value && "ImmOrOwned" in input.value.Object) {
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
                id: (0, import_sui_types.normalizeSuiAddress)(input.value),
                input
            });
            return;
        }
    });
    transactions.forEach((transaction)=>{
        if (transaction.kind === "MoveCall") {
            const needsResolution = transaction.arguments.some((arg)=>arg.kind === "Input" && !(0, import_superstruct.is)(inputs[arg.index].value, import_Inputs.BuilderCallArg));
            if (needsResolution) {
                moveModulesToResolve.push(transaction);
            }
        }
        if (transaction.kind === "SplitCoins") {
            transaction.amounts.forEach((amount)=>{
                if (amount.kind === "Input") {
                    const input = inputs[amount.index];
                    if (typeof input.value !== "object") {
                        input.value = import_Inputs.Inputs.Pure(import_bcs2.bcs.U64.serialize(input.value));
                    }
                }
            });
        }
        if (transaction.kind === "TransferObjects") {
            if (transaction.address.kind === "Input") {
                const input = inputs[transaction.address.index];
                if (typeof input.value !== "object") {
                    input.value = import_Inputs.Inputs.Pure(import_bcs2.bcs.Address.serialize(input.value));
                }
            }
        }
    });
    if (moveModulesToResolve.length) {
        await Promise.all(moveModulesToResolve.map(async (moveCall)=>{
            const [packageId, moduleName, functionName] = moveCall.target.split("::");
            const normalized = await expectClient(options).getNormalizedMoveFunction({
                package: (0, import_sui_types.normalizeSuiObjectId)(packageId),
                module: moduleName,
                function: functionName
            });
            const hasTxContext = normalized.parameters.length > 0 && (0, import_serializer.isTxContext)(normalized.parameters.at(-1));
            const params = hasTxContext ? normalized.parameters.slice(0, normalized.parameters.length - 1) : normalized.parameters;
            if (params.length !== moveCall.arguments.length) {
                throw new Error("Incorrect number of arguments.");
            }
            params.forEach((param, i)=>{
                const arg = moveCall.arguments[i];
                if (arg.kind !== "Input") return;
                const input = inputs[arg.index];
                if ((0, import_superstruct.is)(input.value, import_Inputs.BuilderCallArg)) return;
                const inputValue = input.value;
                const serType = (0, import_serializer.getPureSerializationType)(param, inputValue);
                if (serType) {
                    input.value = import_Inputs.Inputs.Pure(inputValue, serType);
                    return;
                }
                const structVal = (0, import_types.extractStructTag)(param);
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
                const mutable = (0, import_Inputs.isMutableSharedObjectInput)(input.value) || normalizedType != null && (0, import_types.extractMutableReference)(normalizedType) != null;
                input.value = import_Inputs.Inputs.SharedObjectRef({
                    objectId: id,
                    initialSharedVersion,
                    mutable
                });
            } else {
                input.value = import_Inputs.Inputs.ObjectRef((0, import_types.getObjectReference)(object));
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
}; //# sourceMappingURL=TransactionBlock.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/bcs.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var bcs_exports = {};
__export(bcs_exports, {
    ARGUMENT: ()=>ARGUMENT,
    ARGUMENT_INNER: ()=>ARGUMENT_INNER,
    CALL_ARG: ()=>CALL_ARG,
    COMPRESSED_SIGNATURE: ()=>COMPRESSED_SIGNATURE,
    ENUM_KIND: ()=>ENUM_KIND,
    MULTISIG: ()=>MULTISIG,
    MULTISIG_PK_MAP: ()=>MULTISIG_PK_MAP,
    MULTISIG_PUBLIC_KEY: ()=>MULTISIG_PUBLIC_KEY,
    OBJECT_ARG: ()=>OBJECT_ARG,
    OPTION: ()=>OPTION,
    PROGRAMMABLE_CALL: ()=>PROGRAMMABLE_CALL,
    PROGRAMMABLE_CALL_INNER: ()=>PROGRAMMABLE_CALL_INNER,
    PROGRAMMABLE_TX_BLOCK: ()=>PROGRAMMABLE_TX_BLOCK,
    PUBLIC_KEY: ()=>PUBLIC_KEY,
    TRANSACTION: ()=>TRANSACTION,
    TRANSACTION_INNER: ()=>TRANSACTION_INNER,
    TYPE_TAG: ()=>TYPE_TAG,
    VECTOR: ()=>VECTOR
});
module.exports = __toCommonJS(bcs_exports);
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
const PROGRAMMABLE_CALL = "ProgrammableMoveCall"; //# sourceMappingURL=bcs.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __reExport = (target, mod, secondTarget)=>(__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var builder_exports = {};
module.exports = __toCommonJS(builder_exports);
__reExport(builder_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/TransactionBlock.js [client] (ecmascript)"), module.exports);
__reExport(builder_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/Transactions.js [client] (ecmascript)"), module.exports);
__reExport(builder_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/Inputs.js [client] (ecmascript)"), module.exports);
__reExport(builder_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/serializer.js [client] (ecmascript)"), module.exports);
__reExport(builder_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/bcs.js [client] (ecmascript)"), module.exports); //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/client.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var client_exports = {};
__export(client_exports, {
    SUI_CLIENT_BRAND: ()=>SUI_CLIENT_BRAND,
    SuiClient: ()=>SuiClient,
    isSuiClient: ()=>isSuiClient
});
module.exports = __toCommonJS(client_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_builder = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/builder/index.js [client] (ecmascript)");
var import_sui_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/sui-types.js [client] (ecmascript)");
var import_http_transport = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/http-transport.js [client] (ecmascript)");
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
        if (!input.owner || !(0, import_sui_types.isValidSuiAddress)((0, import_sui_types.normalizeSuiAddress)(input.owner))) {
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
        if (!input.owner || !(0, import_sui_types.isValidSuiAddress)((0, import_sui_types.normalizeSuiAddress)(input.owner))) {
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
        if (!input.owner || !(0, import_sui_types.isValidSuiAddress)((0, import_sui_types.normalizeSuiAddress)(input.owner))) {
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
        if (!input.owner || !(0, import_sui_types.isValidSuiAddress)((0, import_sui_types.normalizeSuiAddress)(input.owner))) {
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
        if (!input.owner || !(0, import_sui_types.isValidSuiAddress)((0, import_sui_types.normalizeSuiAddress)(input.owner))) {
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
        if (!input.id || !(0, import_sui_types.isValidSuiObjectId)((0, import_sui_types.normalizeSuiObjectId)(input.id))) {
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
            if (!id || !(0, import_sui_types.isValidSuiObjectId)((0, import_sui_types.normalizeSuiObjectId)(id))) {
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
        if (!(0, import_sui_types.isValidTransactionDigest)(input.digest)) {
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
            if (!(0, import_sui_types.isValidTransactionDigest)(d)) {
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
                typeof input.transactionBlock === "string" ? input.transactionBlock : (0, import_bcs.toB64)(input.transactionBlock),
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
        if (!input.owner || !(0, import_sui_types.isValidSuiAddress)((0, import_sui_types.normalizeSuiAddress)(input.owner))) {
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
            if (!id || !(0, import_sui_types.isValidSuiObjectId)((0, import_sui_types.normalizeSuiObjectId)(id))) {
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
        if ((0, import_builder.isTransactionBlock)(input.transactionBlock)) {
            input.transactionBlock.setSenderIfNotSet(input.sender);
            devInspectTxBytes = (0, import_bcs.toB64)(await input.transactionBlock.build({
                client: this,
                onlyTransactionKind: true
            }));
        } else if (typeof input.transactionBlock === "string") {
            devInspectTxBytes = input.transactionBlock;
        } else if (input.transactionBlock instanceof Uint8Array) {
            devInspectTxBytes = (0, import_bcs.toB64)(input.transactionBlock);
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
                typeof input.transactionBlock === "string" ? input.transactionBlock : (0, import_bcs.toB64)(input.transactionBlock)
            ]
        });
    }
    /**
   * Return the list of dynamic field objects owned by an object
   */ async getDynamicFields(input) {
        if (!input.parentId || !(0, import_sui_types.isValidSuiObjectId)((0, import_sui_types.normalizeSuiObjectId)(input.parentId))) {
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
        const bytes = (0, import_bcs.fromB58)(checkpoint.digest);
        return (0, import_bcs.toHEX)(bytes.slice(0, 4));
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
        this.transport = (_options_transport = options.transport) !== null && _options_transport !== void 0 ? _options_transport : new import_http_transport.SuiHTTPTransport({
            url: options.url
        });
    }
} //# sourceMappingURL=client.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __reExport = (target, mod, secondTarget)=>(__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var client_exports = {};
__export(client_exports, {
    RPCValidationError: ()=>import_errors.RPCValidationError
});
module.exports = __toCommonJS(client_exports);
var import_errors = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/rpc/errors.js [client] (ecmascript)");
__reExport(client_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/http-transport.js [client] (ecmascript)"), module.exports);
__reExport(client_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/network.js [client] (ecmascript)"), module.exports);
__reExport(client_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/types/index.js [client] (ecmascript)"), module.exports);
__reExport(client_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/client/client.js [client] (ecmascript)"), module.exports); //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/faucet/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var faucet_exports = {};
__export(faucet_exports, {
    FaucetRateLimitError: ()=>FaucetRateLimitError,
    getFaucetHost: ()=>getFaucetHost,
    getFaucetRequestStatus: ()=>getFaucetRequestStatus,
    requestSuiFromFaucetV0: ()=>requestSuiFromFaucetV0,
    requestSuiFromFaucetV1: ()=>requestSuiFromFaucetV1
});
module.exports = __toCommonJS(faucet_exports);
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
} //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/intent.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var intent_exports = {};
__export(intent_exports, {
    AppId: ()=>AppId,
    IntentScope: ()=>IntentScope,
    IntentVersion: ()=>IntentVersion,
    messageWithIntent: ()=>messageWithIntent
});
module.exports = __toCommonJS(intent_exports);
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
} //# sourceMappingURL=intent.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/signature-scheme.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var signature_scheme_exports = {};
__export(signature_scheme_exports, {
    SIGNATURE_FLAG_TO_SCHEME: ()=>SIGNATURE_FLAG_TO_SCHEME,
    SIGNATURE_SCHEME_TO_FLAG: ()=>SIGNATURE_SCHEME_TO_FLAG,
    SIGNATURE_SCHEME_TO_SIZE: ()=>SIGNATURE_SCHEME_TO_SIZE
});
module.exports = __toCommonJS(signature_scheme_exports);
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
}; //# sourceMappingURL=signature-scheme.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/zklogin/utils.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var utils_exports = {};
__export(utils_exports, {
    toBigEndianBytes: ()=>toBigEndianBytes
});
module.exports = __toCommonJS(utils_exports);
var import_utils = __turbopack_context__.r("[project]/node_modules/@noble/hashes/utils.js [client] (ecmascript)");
function toBigEndianBytes(num, width) {
    const hex = num.toString(16);
    return (0, import_utils.hexToBytes)(hex.padStart(width * 2, "0").slice(-width * 2));
} //# sourceMappingURL=utils.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/zklogin/address.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var address_exports = {};
__export(address_exports, {
    computeZkLoginAddressFromSeed: ()=>computeZkLoginAddressFromSeed
});
module.exports = __toCommonJS(address_exports);
var import_blake2b = __turbopack_context__.r("[project]/node_modules/@noble/hashes/blake2b.js [client] (ecmascript)");
var import_utils = __turbopack_context__.r("[project]/node_modules/@noble/hashes/utils.js [client] (ecmascript)");
var import_signature_scheme = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/signature-scheme.js [client] (ecmascript)");
var import_utils2 = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/index.js [client] (ecmascript)");
var import_utils3 = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/zklogin/utils.js [client] (ecmascript)");
function computeZkLoginAddressFromSeed(addressSeed, iss) {
    const addressSeedBytesBigEndian = (0, import_utils3.toBigEndianBytes)(addressSeed, 32);
    const addressParamBytes = new TextEncoder().encode(iss);
    const tmp = new Uint8Array(2 + addressSeedBytesBigEndian.length + addressParamBytes.length);
    tmp.set([
        import_signature_scheme.SIGNATURE_SCHEME_TO_FLAG.ZkLogin
    ]);
    tmp.set([
        addressParamBytes.length
    ], 1);
    tmp.set(addressParamBytes, 2);
    tmp.set(addressSeedBytesBigEndian, 2 + addressParamBytes.length);
    return (0, import_utils2.normalizeSuiAddress)((0, import_utils.bytesToHex)((0, import_blake2b.blake2b)(tmp, {
        dkLen: 32
    })).slice(0, import_utils2.SUI_ADDRESS_LENGTH * 2));
} //# sourceMappingURL=address.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/zklogin/jwt-utils.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var jwt_utils_exports = {};
__export(jwt_utils_exports, {
    extractClaimValue: ()=>extractClaimValue
});
module.exports = __toCommonJS(jwt_utils_exports);
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
} //# sourceMappingURL=jwt-utils.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/zklogin/bcs.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var bcs_exports = {};
__export(bcs_exports, {
    zkLoginSignature: ()=>zkLoginSignature
});
module.exports = __toCommonJS(bcs_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
const zkLoginSignature = import_bcs.bcs.struct("ZkLoginSignature", {
    inputs: import_bcs.bcs.struct("ZkLoginSignatureInputs", {
        proofPoints: import_bcs.bcs.struct("ZkLoginSignatureInputsProofPoints", {
            a: import_bcs.bcs.vector(import_bcs.bcs.string()),
            b: import_bcs.bcs.vector(import_bcs.bcs.vector(import_bcs.bcs.string())),
            c: import_bcs.bcs.vector(import_bcs.bcs.string())
        }),
        issBase64Details: import_bcs.bcs.struct("ZkLoginSignatureInputsClaim", {
            value: import_bcs.bcs.string(),
            indexMod4: import_bcs.bcs.u8()
        }),
        headerBase64: import_bcs.bcs.string(),
        addressSeed: import_bcs.bcs.string()
    }),
    maxEpoch: import_bcs.bcs.u64(),
    userSignature: import_bcs.bcs.vector(import_bcs.bcs.u8())
}); //# sourceMappingURL=bcs.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/zklogin/signature.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var signature_exports = {};
__export(signature_exports, {
    getZkLoginSignature: ()=>getZkLoginSignature,
    parseZkLoginSignature: ()=>parseZkLoginSignature
});
module.exports = __toCommonJS(signature_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_signature_scheme = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/signature-scheme.js [client] (ecmascript)");
var import_bcs2 = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/zklogin/bcs.js [client] (ecmascript)");
function getZkLoginSignatureBytes(param) {
    let { inputs, maxEpoch, userSignature } = param;
    return import_bcs2.zkLoginSignature.serialize({
        inputs,
        maxEpoch,
        userSignature: typeof userSignature === "string" ? (0, import_bcs.fromB64)(userSignature) : userSignature
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
        import_signature_scheme.SIGNATURE_SCHEME_TO_FLAG.ZkLogin
    ]);
    signatureBytes.set(bytes, 1);
    return (0, import_bcs.toB64)(signatureBytes);
}
function parseZkLoginSignature(signature) {
    return import_bcs2.zkLoginSignature.parse(typeof signature === "string" ? (0, import_bcs.fromB64)(signature) : signature);
} //# sourceMappingURL=signature.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/signature.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var signature_exports = {};
__export(signature_exports, {
    parseSerializedSignature: ()=>parseSerializedSignature,
    toSerializedSignature: ()=>toSerializedSignature
});
module.exports = __toCommonJS(signature_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_bcs2 = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/bcs/index.js [client] (ecmascript)");
var import_address = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/zklogin/address.js [client] (ecmascript)");
var import_jwt_utils = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/zklogin/jwt-utils.js [client] (ecmascript)");
var import_signature = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/zklogin/signature.js [client] (ecmascript)");
var import_signature_scheme = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/signature-scheme.js [client] (ecmascript)");
function toSerializedSignature(param) {
    let { signature, signatureScheme, pubKey, publicKey = pubKey } = param;
    if (!publicKey) {
        throw new Error("`publicKey` is required");
    }
    const pubKeyBytes = publicKey.toBytes();
    const serializedSignature = new Uint8Array(1 + signature.length + pubKeyBytes.length);
    serializedSignature.set([
        import_signature_scheme.SIGNATURE_SCHEME_TO_FLAG[signatureScheme]
    ]);
    serializedSignature.set(signature, 1);
    serializedSignature.set(pubKeyBytes, 1 + signature.length);
    return (0, import_bcs.toB64)(serializedSignature);
}
function parseSerializedSignature(serializedSignature) {
    const bytes = (0, import_bcs.fromB64)(serializedSignature);
    const signatureScheme = import_signature_scheme.SIGNATURE_FLAG_TO_SCHEME[bytes[0]];
    if (signatureScheme === "MultiSig") {
        const multisig = import_bcs2.bcs.MultiSig.parse(bytes.slice(1));
        return {
            serializedSignature,
            signatureScheme,
            multisig,
            bytes
        };
    }
    if (signatureScheme === "ZkLogin") {
        const signatureBytes = bytes.slice(1);
        const { inputs, maxEpoch, userSignature } = (0, import_signature.parseZkLoginSignature)(signatureBytes);
        const { issBase64Details, addressSeed } = inputs;
        const iss = (0, import_jwt_utils.extractClaimValue)(issBase64Details, "iss");
        const address = (0, import_address.computeZkLoginAddressFromSeed)(BigInt(addressSeed), iss);
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
    if (!(signatureScheme in import_signature_scheme.SIGNATURE_SCHEME_TO_SIZE)) {
        throw new Error("Unsupported signature scheme");
    }
    const size = import_signature_scheme.SIGNATURE_SCHEME_TO_SIZE[signatureScheme];
    const signature = bytes.slice(1, bytes.length - size);
    const publicKey = bytes.slice(1 + signature.length);
    return {
        serializedSignature,
        signatureScheme,
        signature,
        publicKey,
        bytes
    };
} //# sourceMappingURL=signature.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/keypair.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var keypair_exports = {};
__export(keypair_exports, {
    BaseSigner: ()=>BaseSigner,
    Keypair: ()=>Keypair,
    LEGACY_PRIVATE_KEY_SIZE: ()=>LEGACY_PRIVATE_KEY_SIZE,
    PRIVATE_KEY_SIZE: ()=>PRIVATE_KEY_SIZE
});
module.exports = __toCommonJS(keypair_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_blake2b = __turbopack_context__.r("[project]/node_modules/@noble/hashes/blake2b.js [client] (ecmascript)");
var import_bcs2 = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/bcs/index.js [client] (ecmascript)");
var import_intent = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/intent.js [client] (ecmascript)");
var import_signature = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/signature.js [client] (ecmascript)");
const PRIVATE_KEY_SIZE = 32;
const LEGACY_PRIVATE_KEY_SIZE = 64;
class BaseSigner {
    /**
   * Sign messages with a specific intent. By combining the message bytes with the intent before hashing and signing,
   * it ensures that a signed message is tied to a specific purpose and domain separator is provided
   */ async signWithIntent(bytes, intent) {
        const intentMessage = (0, import_intent.messageWithIntent)(intent, bytes);
        const digest = (0, import_blake2b.blake2b)(intentMessage, {
            dkLen: 32
        });
        const signature = (0, import_signature.toSerializedSignature)({
            signature: await this.sign(digest),
            signatureScheme: this.getKeyScheme(),
            pubKey: this.getPublicKey()
        });
        return {
            signature,
            bytes: (0, import_bcs.toB64)(bytes)
        };
    }
    /**
   * Signs provided transaction block by calling `signWithIntent()` with a `TransactionData` provided as intent scope
   */ async signTransactionBlock(bytes) {
        return this.signWithIntent(bytes, import_intent.IntentScope.TransactionData);
    }
    /**
   * Signs provided personal message by calling `signWithIntent()` with a `PersonalMessage` provided as intent scope
   */ async signPersonalMessage(bytes) {
        return this.signWithIntent(import_bcs2.bcs.vector(import_bcs2.bcs.u8()).serialize(bytes).toBytes(), import_intent.IntentScope.PersonalMessage);
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
} //# sourceMappingURL=keypair.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/mnemonics.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var mnemonics_exports = {};
__export(mnemonics_exports, {
    isValidBIP32Path: ()=>isValidBIP32Path,
    isValidHardenedPath: ()=>isValidHardenedPath,
    mnemonicToSeed: ()=>mnemonicToSeed,
    mnemonicToSeedHex: ()=>mnemonicToSeedHex
});
module.exports = __toCommonJS(mnemonics_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_bip39 = __turbopack_context__.r("[project]/node_modules/@scure/bip39/index.js [client] (ecmascript)");
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
    return (0, import_bip39.mnemonicToSeedSync)(mnemonics, "");
}
function mnemonicToSeedHex(mnemonics) {
    return (0, import_bcs.toHEX)(mnemonicToSeed(mnemonics));
} //# sourceMappingURL=mnemonics.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/keypairs/ed25519/ed25519-hd-key.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toESM = (mod, isNodeMode, target)=>(target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod));
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var ed25519_hd_key_exports = {};
__export(ed25519_hd_key_exports, {
    derivePath: ()=>derivePath,
    getMasterKeyFromSeed: ()=>getMasterKeyFromSeed,
    getPublicKey: ()=>getPublicKey,
    isValidPath: ()=>isValidPath,
    pathRegex: ()=>pathRegex,
    replaceDerive: ()=>replaceDerive
});
module.exports = __toCommonJS(ed25519_hd_key_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_hmac = __turbopack_context__.r("[project]/node_modules/@noble/hashes/hmac.js [client] (ecmascript)");
var import_sha512 = __turbopack_context__.r("[project]/node_modules/@noble/hashes/sha512.js [client] (ecmascript)");
var import_tweetnacl = __toESM(__turbopack_context__.r("[project]/node_modules/tweetnacl/nacl-fast.js [client] (ecmascript)"));
const ED25519_CURVE = "ed25519 seed";
const HARDENED_OFFSET = 2147483648;
const pathRegex = new RegExp("^m(\\/[0-9]+')+$");
const replaceDerive = (val)=>val.replace("'", "");
const getMasterKeyFromSeed = (seed)=>{
    const h = import_hmac.hmac.create(import_sha512.sha512, ED25519_CURVE);
    const I = h.update((0, import_bcs.fromHEX)(seed)).digest();
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
    const I = import_hmac.hmac.create(import_sha512.sha512, chainCode).update(data).digest();
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    return {
        key: IL,
        chainCode: IR
    };
};
const getPublicKey = function(privateKey) {
    let withZeroByte = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    const keyPair = import_tweetnacl.default.sign.keyPair.fromSeed(privateKey);
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
}; //# sourceMappingURL=ed25519-hd-key.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/publickey.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var publickey_exports = {};
__export(publickey_exports, {
    PublicKey: ()=>PublicKey,
    bytesEqual: ()=>bytesEqual
});
module.exports = __toCommonJS(publickey_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_blake2b = __turbopack_context__.r("[project]/node_modules/@noble/hashes/blake2b.js [client] (ecmascript)");
var import_utils = __turbopack_context__.r("[project]/node_modules/@noble/hashes/utils.js [client] (ecmascript)");
var import_bcs2 = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/bcs/index.js [client] (ecmascript)");
var import_sui_types = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/utils/sui-types.js [client] (ecmascript)");
var import_intent = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/intent.js [client] (ecmascript)");
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
        return (0, import_bcs.toB64)(this.toRawBytes());
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
        return (0, import_bcs.toB64)(bytes);
    }
    verifyWithIntent(bytes, signature, intent) {
        const intentMessage = (0, import_intent.messageWithIntent)(intent, bytes);
        const digest = (0, import_blake2b.blake2b)(intentMessage, {
            dkLen: 32
        });
        return this.verify(digest, signature);
    }
    /**
   * Verifies that the signature is valid for for the provided PersonalMessage
   */ verifyPersonalMessage(message, signature) {
        return this.verifyWithIntent(import_bcs2.bcs.vector(import_bcs2.bcs.u8()).serialize(message).toBytes(), signature, import_intent.IntentScope.PersonalMessage);
    }
    /**
   * Verifies that the signature is valid for for the provided TransactionBlock
   */ verifyTransactionBlock(transactionBlock, signature) {
        return this.verifyWithIntent(transactionBlock, signature, import_intent.IntentScope.TransactionData);
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
        return (0, import_sui_types.normalizeSuiAddress)((0, import_utils.bytesToHex)((0, import_blake2b.blake2b)(this.toSuiBytes(), {
            dkLen: 32
        })).slice(0, import_sui_types.SUI_ADDRESS_LENGTH * 2));
    }
} //# sourceMappingURL=publickey.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/keypairs/ed25519/publickey.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toESM = (mod, isNodeMode, target)=>(target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod));
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var publickey_exports = {};
__export(publickey_exports, {
    Ed25519PublicKey: ()=>Ed25519PublicKey
});
module.exports = __toCommonJS(publickey_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_tweetnacl = __toESM(__turbopack_context__.r("[project]/node_modules/tweetnacl/nacl-fast.js [client] (ecmascript)"));
var import_publickey = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/publickey.js [client] (ecmascript)");
var import_signature_scheme = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/signature-scheme.js [client] (ecmascript)");
var import_signature = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/signature.js [client] (ecmascript)");
const PUBLIC_KEY_SIZE = 32;
class Ed25519PublicKey extends import_publickey.PublicKey {
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
        return import_signature_scheme.SIGNATURE_SCHEME_TO_FLAG["ED25519"];
    }
    /**
   * Verifies that the signature is valid for for the provided message
   */ async verify(message, signature) {
        let bytes;
        if (typeof signature === "string") {
            const parsed = (0, import_signature.parseSerializedSignature)(signature);
            if (parsed.signatureScheme !== "ED25519") {
                throw new Error("Invalid signature scheme");
            }
            if (!(0, import_publickey.bytesEqual)(this.toRawBytes(), parsed.publicKey)) {
                throw new Error("Signature does not match public key");
            }
            bytes = parsed.signature;
        } else {
            bytes = signature;
        }
        return import_tweetnacl.default.sign.detached.verify(message, bytes, this.toRawBytes());
    }
    /**
   * Create a new Ed25519PublicKey object
   * @param value ed25519 public key as buffer or base-64 encoded string
   */ constructor(value){
        super();
        if (typeof value === "string") {
            this.data = (0, import_bcs.fromB64)(value);
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
Ed25519PublicKey.SIZE = PUBLIC_KEY_SIZE; //# sourceMappingURL=publickey.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/keypairs/ed25519/keypair.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toESM = (mod, isNodeMode, target)=>(target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod));
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var keypair_exports = {};
__export(keypair_exports, {
    DEFAULT_ED25519_DERIVATION_PATH: ()=>DEFAULT_ED25519_DERIVATION_PATH,
    Ed25519Keypair: ()=>Ed25519Keypair
});
module.exports = __toCommonJS(keypair_exports);
var import_bcs = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/bcs/dist/index.js [client] (ecmascript)");
var import_tweetnacl = __toESM(__turbopack_context__.r("[project]/node_modules/tweetnacl/nacl-fast.js [client] (ecmascript)"));
var import_keypair = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/keypair.js [client] (ecmascript)");
var import_mnemonics = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/cryptography/mnemonics.js [client] (ecmascript)");
var import_ed25519_hd_key = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/keypairs/ed25519/ed25519-hd-key.js [client] (ecmascript)");
var import_publickey = __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/keypairs/ed25519/publickey.js [client] (ecmascript)");
const DEFAULT_ED25519_DERIVATION_PATH = "m/44'/784'/0'/0'/0'";
class Ed25519Keypair extends import_keypair.Keypair {
    /**
   * Get the key scheme of the keypair ED25519
   */ getKeyScheme() {
        return "ED25519";
    }
    /**
   * Generate a new random Ed25519 keypair
   */ static generate() {
        return new Ed25519Keypair(import_tweetnacl.default.sign.keyPair());
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
        if (secretKeyLength !== import_keypair.PRIVATE_KEY_SIZE) {
            throw new Error("Wrong secretKey size. Expected ".concat(import_keypair.PRIVATE_KEY_SIZE, " bytes, got ").concat(secretKeyLength, "."));
        }
        const keypair = import_tweetnacl.default.sign.keyPair.fromSeed(secretKey);
        if (!options || !options.skipValidation) {
            const encoder = new TextEncoder();
            const signData = encoder.encode("sui validation");
            const signature = import_tweetnacl.default.sign.detached(signData, keypair.secretKey);
            if (!import_tweetnacl.default.sign.detached.verify(signData, signature, keypair.publicKey)) {
                throw new Error("provided secretKey is invalid");
            }
        }
        return new Ed25519Keypair(keypair);
    }
    /**
   * The public key for this Ed25519 keypair
   */ getPublicKey() {
        return new import_publickey.Ed25519PublicKey(this.keypair.publicKey);
    }
    async sign(data) {
        return this.signData(data);
    }
    /**
   * Return the signature for the provided data using Ed25519.
   */ signData(data) {
        return import_tweetnacl.default.sign.detached(data, this.keypair.secretKey);
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
        if (!(0, import_mnemonics.isValidHardenedPath)(path)) {
            throw new Error("Invalid derivation path");
        }
        const { key } = (0, import_ed25519_hd_key.derivePath)(path, (0, import_mnemonics.mnemonicToSeedHex)(mnemonics));
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
        if (!(0, import_mnemonics.isValidHardenedPath)(path)) {
            throw new Error("Invalid derivation path");
        }
        const { key } = (0, import_ed25519_hd_key.derivePath)(path, seedHex);
        return Ed25519Keypair.fromSecretKey(key);
    }
    /**
   * This returns an exported keypair object, the private key field is the pure 32-byte seed.
   */ export() {
        return {
            schema: "ED25519",
            privateKey: (0, import_bcs.toB64)(this.keypair.secretKey.slice(0, import_keypair.PRIVATE_KEY_SIZE))
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
            this.keypair = import_tweetnacl.default.sign.keyPair();
        }
    }
} //# sourceMappingURL=keypair.js.map
}}),
"[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/keypairs/ed25519/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __reExport = (target, mod, secondTarget)=>(__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
var ed25519_exports = {};
module.exports = __toCommonJS(ed25519_exports);
__reExport(ed25519_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/keypairs/ed25519/keypair.js [client] (ecmascript)"), module.exports);
__reExport(ed25519_exports, __turbopack_context__.r("[project]/node_modules/@mysten/wallet-kit/node_modules/@mysten/sui.js/dist/cjs/keypairs/ed25519/publickey.js [client] (ecmascript)"), module.exports); //# sourceMappingURL=index.js.map
}}),
}]);

//# sourceMappingURL=3fa79_%40mysten_sui_js_dist_cjs_9a3a08bf._.js.map