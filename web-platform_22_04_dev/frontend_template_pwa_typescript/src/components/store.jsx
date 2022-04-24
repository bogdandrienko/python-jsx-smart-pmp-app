"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var redux_thunk_1 = require("redux-thunk");
var constant_1 = require("./constant");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO localStorage ///////////////////////////////////////////////////////////////////////////////////////////////////
var userTokenFromStorage = localStorage.getItem("userToken")
    ? // @ts-ignore
        JSON.parse(localStorage.getItem("userToken"))
    : null;
// TODO initial state //////////////////////////////////////////////////////////////////////////////////////////////////
var initialState = {
    userLoginStore: { data: userTokenFromStorage },
};
exports.store = (0, toolkit_1.configureStore)({
    reducer: constant_1.reducers,
    devTools: process.env.NODE_ENV !== "production",
    middleware: function (getDefaultMiddleware) { return getDefaultMiddleware().concat(redux_thunk_1.default); },
    preloadedState: initialState,
});
