// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { reducers } from "./slice";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO localStorage ///////////////////////////////////////////////////////////////////////////////////////////////////

const userTokenFromStorage = localStorage.getItem("userToken")
  ? // @ts-ignore
    JSON.parse(localStorage.getItem("userToken"))
  : null;

// TODO initial state //////////////////////////////////////////////////////////////////////////////////////////////////

const initialState = {
  userLoginStore: { data: userTokenFromStorage },
};

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: initialState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
