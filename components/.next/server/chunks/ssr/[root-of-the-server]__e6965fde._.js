module.exports = {

"[externals]/@mysten/wallet-standard [external] (@mysten/wallet-standard, esm_import)": ((__turbopack_context__) => {
"use strict";

var { a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@mysten/wallet-standard");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
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
var __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$wallet$2d$standard__$5b$external$5d$__$2840$mysten$2f$wallet$2d$standard$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@mysten/wallet-standard [external] (@mysten/wallet-standard, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$wallet$2d$standard__$5b$external$5d$__$2840$mysten$2f$wallet$2d$standard$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$wallet$2d$standard__$5b$external$5d$__$2840$mysten$2f$wallet$2d$standard$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
    const [wallets, setWallets] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [showModal, setShowModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [selectedWallet, setSelectedWallet] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [connected, setConnected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [connecting, setConnecting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        message: "",
        type: "success"
    });
    const connectBtnRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])();
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setWallets((0, __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$wallet$2d$standard__$5b$external$5d$__$2840$mysten$2f$wallet$2d$standard$2c$__esm_import$29$__["getWallets"])().get());
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$mysten$2f$wallet$2d$standard__$5b$external$5d$__$2840$mysten$2f$wallet$2d$standard$2c$__esm_import$29$__["getWallets"])().on("change", (wallets)=>{
            setWallets(wallets);
        });
        return ()=>unsubscribe();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // If already connected, redirect to profile
        if ("undefined" !== 'undefined' && localStorage.getItem('walletConnected') === 'true') //TURBOPACK unreachable
        ;
    }, [
        router
    ]);
    const handleOpenModal = ()=>{
        setShowModal(true);
        setSelectedWallet(null);
        setError("");
    };
    const handleSelectWallet = (wallet)=>{
        setSelectedWallet(wallet);
        setError("");
    };
    const handleConnect = async (e)=>{
        e?.preventDefault?.();
        setError("");
        if (!selectedWallet) {
            setError("Please select a wallet.");
            return;
        }
        setConnecting(true);
        try {
            const result = await selectedWallet.features["standard:connect"].connect();
            setAccounts(result.accounts);
            setShowModal(false);
            setToast({
                message: `Connected to ${selectedWallet.name}`,
                type: "success"
            });
            // Save connection state for layout/profile
            localStorage.setItem('walletConnected', 'true');
            if (result.accounts && result.accounts[0]?.address) {
                localStorage.setItem('walletAddress', result.accounts[0].address);
            }
            window.dispatchEvent(new Event('storage'));
            setTimeout(()=>router.replace("/profile"), 500);
        } catch (err) {
            setError("Failed to connect: " + (err?.message || err));
            setToast({
                message: "Failed to connect",
                type: "error"
            });
        } finally{
            setConnecting(false);
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
                lineNumber: 95,
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
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "jsx-b647ad7f1d82c4dd" + " " + "text-gray-700 font-domine mb-4",
                        children: "Click below to connect your Sui wallet."
                    }, void 0, false, {
                        fileName: "[project]/pages/connect-wallet.js",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: handleOpenModal,
                        className: "jsx-b647ad7f1d82c4dd" + " " + "bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] transition-all duration-200 font-medium font-domine hover:scale-110 transform hover:shadow-lg mb-4",
                        children: "Connect Wallet"
                    }, void 0, false, {
                        fileName: "[project]/pages/connect-wallet.js",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-b647ad7f1d82c4dd" + " " + "text-red-600 mb-2",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/pages/connect-wallet.js",
                        lineNumber: 107,
                        columnNumber: 19
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
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "jsx-b647ad7f1d82c4dd" + " " + "text-xl font-bold mb-4",
                                    children: "Select Wallet"
                                }, void 0, false, {
                                    fileName: "[project]/pages/connect-wallet.js",
                                    lineNumber: 124,
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
                                                    lineNumber: 128,
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
                                                    lineNumber: 129,
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
                                                    lineNumber: 129,
                                                    columnNumber: 150
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/connect-wallet.js",
                                            lineNumber: 127,
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
                                                        lineNumber: 144,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-b647ad7f1d82c4dd" + " " + "font-domine",
                                                        children: wallet.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/connect-wallet.js",
                                                        lineNumber: 149,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, wallet.name, true, {
                                                fileName: "[project]/pages/connect-wallet.js",
                                                lineNumber: 133,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/connect-wallet.js",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: handleConnect,
                                    disabled: !selectedWallet || connecting,
                                    ref: connectBtnRef,
                                    "aria-busy": connecting,
                                    className: "jsx-b647ad7f1d82c4dd" + " " + "bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] transition-all duration-200 font-medium font-domine hover:scale-110 transform hover:shadow-lg w-full flex items-center justify-center",
                                    children: [
                                        connecting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
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
                                                    lineNumber: 161,
                                                    columnNumber: 140
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                    fill: "currentColor",
                                                    d: "M4 12a8 8 0 018-8v8z",
                                                    className: "jsx-b647ad7f1d82c4dd" + " " + "opacity-75"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/connect-wallet.js",
                                                    lineNumber: 161,
                                                    columnNumber: 241
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/connect-wallet.js",
                                            lineNumber: 161,
                                            columnNumber: 19
                                        }, this),
                                        "Connect"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/connect-wallet.js",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-b647ad7f1d82c4dd" + " " + "text-red-600 mt-2",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/pages/connect-wallet.js",
                                    lineNumber: 165,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/connect-wallet.js",
                            lineNumber: 111,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/connect-wallet.js",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/connect-wallet.js",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "b647ad7f1d82c4dd",
                children: "@media (width<=600px){.max-w-lg.jsx-b647ad7f1d82c4dd,.max-w-md.jsx-b647ad7f1d82c4dd{max-width:98vw!important}.p-8.jsx-b647ad7f1d82c4dd{padding:1.5rem!important}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/connect-wallet.js",
        lineNumber: 94,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__e6965fde._.js.map