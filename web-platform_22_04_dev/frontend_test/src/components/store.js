import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import * as utils from "./utils";
import * as constants from "./constants";

export const store = configureStore({
  reducer: {
    POST: utils.ReducerConstructorUtility(
      utils.ConstantConstructorUtility("POST")
    ),
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
