"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/supabaseClient */ \"(pages-dir-node)/./src/lib/supabaseClient.ts\");\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"MyApp.useEffect\": ()=>{\n            ({\n                \"MyApp.useEffect\": async ()=>{\n                    const { data: { session } } = await _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.getSession();\n                    if (!session) await _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.signInAnonymously();\n                }\n            })[\"MyApp.useEffect\"]();\n        }\n    }[\"MyApp.useEffect\"], []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"/Users/gio/Documents/adgo/pages/_app.tsx\",\n        lineNumber: 11,\n        columnNumber: 10\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBa0M7QUFDYztBQUVqQyxTQUFTRSxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3BESixnREFBU0E7MkJBQUM7WUFDUjttQ0FBQztvQkFDQyxNQUFNLEVBQUVLLE1BQU0sRUFBRUMsT0FBTyxFQUFFLEVBQUUsR0FBRyxNQUFNTCx5REFBUUEsQ0FBQ00sSUFBSSxDQUFDQyxVQUFVO29CQUM1RCxJQUFJLENBQUNGLFNBQVMsTUFBTUwseURBQVFBLENBQUNNLElBQUksQ0FBQ0UsaUJBQWlCO2dCQUNyRDs7UUFDRjswQkFBRyxFQUFFO0lBQ0wscUJBQU8sOERBQUNOO1FBQVcsR0FBR0MsU0FBUzs7Ozs7O0FBQ2pDIiwic291cmNlcyI6WyIvVXNlcnMvZ2lvL0RvY3VtZW50cy9hZGdvL3BhZ2VzL19hcHAudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiQC9saWIvc3VwYWJhc2VDbGllbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHsgZGF0YTogeyBzZXNzaW9uIH0gfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0U2Vzc2lvbigpO1xuICAgICAgaWYgKCFzZXNzaW9uKSBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25JbkFub255bW91c2x5KCk7XG4gICAgfSkoKTtcbiAgfSwgW10pO1xuICByZXR1cm4gPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPjtcbn0iXSwibmFtZXMiOlsidXNlRWZmZWN0Iiwic3VwYWJhc2UiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImRhdGEiLCJzZXNzaW9uIiwiYXV0aCIsImdldFNlc3Npb24iLCJzaWduSW5Bbm9ueW1vdXNseSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./src/lib/supabaseClient.ts":
/*!***********************************!*\
  !*** ./src/lib/supabaseClient.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst rawUrl = (\"https://ykqsavtoqrhrimvwjubz.supabase.co\" ?? 0).trim();\nconst rawKey = (\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrcXNhdnRvcXJocmltdndqdWJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjMyMTAsImV4cCI6MjA3MTY5OTIxMH0._CtaS4TH3v4ic0miHeVzaaZOT6n6Mk2gGaEUq4l0dN4\" ?? 0).trim();\nif (!rawUrl || !rawKey) {\n    throw new Error(\"Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. \" + \"Check .env.local at project root and restart dev.\");\n}\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(rawUrl, rawKey, {\n    auth: {\n        persistSession: true,\n        autoRefreshToken: true\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NyYy9saWIvc3VwYWJhc2VDbGllbnQudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXFEO0FBRXJELE1BQU1DLFNBQVMsQ0FBQ0MsMENBQW9DLElBQUksQ0FBQyxFQUFHRyxJQUFJO0FBQ2hFLE1BQU1DLFNBQVMsQ0FBQ0osa05BQXlDLElBQUksQ0FBQyxFQUFHRyxJQUFJO0FBRXJFLElBQUksQ0FBQ0osVUFBVSxDQUFDSyxRQUFRO0lBQ3RCLE1BQU0sSUFBSUUsTUFDUix3RUFDRTtBQUVOO0FBRU8sTUFBTUMsV0FBV1QsbUVBQVlBLENBQUNDLFFBQVFLLFFBQVE7SUFDbkRJLE1BQU07UUFBRUMsZ0JBQWdCO1FBQU1DLGtCQUFrQjtJQUFLO0FBQ3ZELEdBQUciLCJzb3VyY2VzIjpbIi9Vc2Vycy9naW8vRG9jdW1lbnRzL2FkZ28vc3JjL2xpYi9zdXBhYmFzZUNsaWVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI7XG5cbmNvbnN0IHJhd1VybCA9IChwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwgPz8gXCJcIikudHJpbSgpO1xuY29uc3QgcmF3S2V5ID0gKHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZID8/IFwiXCIpLnRyaW0oKTtcblxuaWYgKCFyYXdVcmwgfHwgIXJhd0tleSkge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgXCJNaXNzaW5nIE5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCBvciBORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWS4gXCIgK1xuICAgICAgXCJDaGVjayAuZW52LmxvY2FsIGF0IHByb2plY3Qgcm9vdCBhbmQgcmVzdGFydCBkZXYuXCJcbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KHJhd1VybCwgcmF3S2V5LCB7XG4gIGF1dGg6IHsgcGVyc2lzdFNlc3Npb246IHRydWUsIGF1dG9SZWZyZXNoVG9rZW46IHRydWUgfSxcbn0pOyJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJyYXdVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwidHJpbSIsInJhd0tleSIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIiwiRXJyb3IiLCJzdXBhYmFzZSIsImF1dGgiLCJwZXJzaXN0U2Vzc2lvbiIsImF1dG9SZWZyZXNoVG9rZW4iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./src/lib/supabaseClient.ts\n");

/***/ }),

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();