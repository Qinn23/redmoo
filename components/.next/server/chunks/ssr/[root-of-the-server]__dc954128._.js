module.exports = {

"[project]/pages/buy.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Buy
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
;
;
;
const sampleEvents = [
    {
        id: 1,
        name: "Taylor Swift - The Eras Tour",
        date: "2024-12-15",
        venue: "MetLife Stadium",
        price: "$150"
    },
    {
        id: 2,
        name: "Ed Sheeran Live in Concert",
        date: "2024-11-20",
        venue: "Madison Square Garden",
        price: "$120"
    },
    {
        id: 3,
        name: "NBA Finals Game 7",
        date: "2024-06-15",
        venue: "Chase Center",
        price: "$200"
    },
    {
        id: 4,
        name: "Comic Con 2024",
        date: "2024-07-25",
        venue: "Convention Center",
        price: "$80"
    }
];
function Buy() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [walletConnected, setWalletConnected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [showWalletMessage, setShowWalletMessage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // REMOVED: const [ticketType, setTicketType] = useState("resale");
    // Track wallet connection status
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setWalletConnected("undefined" !== 'undefined' && localStorage.getItem('walletConnected') === 'true');
        const onStorage = ()=>setWalletConnected(localStorage.getItem('walletConnected') === 'true');
        window.addEventListener('storage', onStorage);
        const interval = setInterval(()=>{
            setWalletConnected(localStorage.getItem('walletConnected') === 'true');
        }, 500);
        return ()=>{
            window.removeEventListener('storage', onStorage);
            clearInterval(interval);
        };
    }, []);
    // Only show events if search is not empty
    const filteredEvents = search ? sampleEvents.filter((e)=>e.name.toLowerCase().includes(search.toLowerCase()) || e.venue.toLowerCase().includes(search.toLowerCase())) : [];
    const handleBuyClick = (event)=>{
        if (!walletConnected) {
            setShowWalletMessage(true);
            // Hide message after 3 seconds
            setTimeout(()=>setShowWalletMessage(false), 3000);
        } else {
            // Navigate to event detail page
            router.push(`/event/${event.id}`);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-[#A31D1D] mb-4 font-chonburi",
                    children: "Buy Tickets"
                }, void 0, false, {
                    fileName: "[project]/pages/buy.js",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: "text-[#A31D1D] font-domine mb-6 text-base",
                    children: "Here are tickets available for purchase."
                }, void 0, false, {
                    fileName: "[project]/pages/buy.js",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                showWalletMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mb-6 p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-[#DC2626] font-domine text-sm",
                        children: "Please connect your wallet first before purchasing tickets."
                    }, void 0, false, {
                        fileName: "[project]/pages/buy.js",
                        lineNumber: 61,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/buy.js",
                    lineNumber: 60,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex justify-center mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        className: "border px-4 py-2 rounded font-domine w-full max-w-7xl",
                        style: {
                            minWidth: '600px'
                        },
                        placeholder: "Search for events to buy...",
                        value: search,
                        onChange: (e)=>setSearch(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/pages/buy.js",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/buy.js",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "grid gap-4",
                    children: [
                        filteredEvents.length === 0 && search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "text-gray-500",
                            children: "No events found."
                        }, void 0, false, {
                            fileName: "[project]/pages/buy.js",
                            lineNumber: 76,
                            columnNumber: 53
                        }, this),
                        filteredEvents.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row items-center justify-between bg-[#F8F2DE] rounded p-4 shadow",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex-1 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "font-bold text-lg font-domine text-[#A31D1D]",
                                                children: event.name
                                            }, void 0, false, {
                                                fileName: "[project]/pages/buy.js",
                                                lineNumber: 80,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "text-gray-700 font-domine",
                                                children: [
                                                    event.date,
                                                    " • ",
                                                    event.venue
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/buy.js",
                                                lineNumber: 81,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "text-[#D84040] font-bold font-domine",
                                                children: event.price
                                            }, void 0, false, {
                                                fileName: "[project]/pages/buy.js",
                                                lineNumber: 82,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/buy.js",
                                        lineNumber: 79,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: ()=>router.push(`/resell/${event.id}`),
                                        className: "mt-4 md:mt-0 md:ml-6 bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] font-domine font-medium transition-all",
                                        children: "View Details"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/buy.js",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, event.id, true, {
                                fileName: "[project]/pages/buy.js",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/buy.js",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/buy.js",
            lineNumber: 53,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/buy.js",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__dc954128._.js.map