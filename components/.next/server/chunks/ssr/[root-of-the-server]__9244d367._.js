module.exports = {

"[project]/pages/sell.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Sell
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const sampleEvents = [
    {
        id: 1,
        name: "Taylor Swift - The Eras Tour",
        date: "2025-09-15",
        venue: "MetLife Stadium",
        price: "$150"
    },
    {
        id: 2,
        name: "Ed Sheeran Live in Concert",
        date: "2025-11-20",
        venue: "Madison Square Garden",
        price: "$120"
    },
    {
        id: 3,
        name: "NBA Finals Game 7",
        date: "2025-10-15",
        venue: "Chase Center",
        price: "$200"
    },
    {
        id: 4,
        name: "Comic Con 2024",
        date: "2025-07-25",
        venue: "Convention Center",
        price: "$80"
    }
];
function Sell() {
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const filteredEvents = sampleEvents.filter((e)=>e.name.toLowerCase().includes(search.toLowerCase()) || e.venue.toLowerCase().includes(search.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold text-[#A31D1D] mb-4 font-chonburi",
                    children: "Sell Tickets"
                }, void 0, false, {
                    fileName: "[project]/pages/sell.js",
                    lineNumber: 19,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                    className: "border px-4 py-2 rounded w-full mb-6 font-domine",
                    placeholder: "Search for events to sell...",
                    value: search,
                    onChange: (e)=>setSearch(e.target.value)
                }, void 0, false, {
                    fileName: "[project]/pages/sell.js",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "grid gap-4",
                    children: [
                        filteredEvents.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "text-gray-500",
                            children: "No events found."
                        }, void 0, false, {
                            fileName: "[project]/pages/sell.js",
                            lineNumber: 27,
                            columnNumber: 43
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
                                                fileName: "[project]/pages/sell.js",
                                                lineNumber: 31,
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
                                                fileName: "[project]/pages/sell.js",
                                                lineNumber: 32,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "text-[#D84040] font-bold font-domine",
                                                children: event.price
                                            }, void 0, false, {
                                                fileName: "[project]/pages/sell.js",
                                                lineNumber: 33,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/sell.js",
                                        lineNumber: 30,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "mt-4 md:mt-0 md:ml-6 bg-[#D84040] text-white px-6 py-2 rounded-full hover:bg-[#A31D1D] font-domine font-medium transition-all",
                                        children: "Sell"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/sell.js",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, event.id, true, {
                                fileName: "[project]/pages/sell.js",
                                lineNumber: 29,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/sell.js",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/sell.js",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/sell.js",
        lineNumber: 17,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__9244d367._.js.map