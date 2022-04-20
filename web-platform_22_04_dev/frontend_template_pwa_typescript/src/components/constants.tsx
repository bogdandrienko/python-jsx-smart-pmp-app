import * as utils from "./utils";
import counterReducer from "./counter/counterSlice";

export const reducers = {};

// @ts-ignore
function connectReducer(name = "", reducer) {
  // @ts-ignore
  reducers[name] = reducer;
}

export const DEBUG_CONSTANT = process.env.NODE_ENV === "production";

export const PostCreateStore = utils.StoreReducerConstructorUtility(
  "PostCreateStore",
  connectReducer
);
export const PostReadListStore = utils.StoreReducerConstructorUtility(
  "PostReadListStore",
  connectReducer
);
export const PostReadStore = utils.StoreReducerConstructorUtility(
  "PostReadStore",
  connectReducer
);
export const PostDeleteStore = utils.StoreReducerConstructorUtility(
  "PostDeleteStore",
  connectReducer
);

connectReducer("counter", counterReducer);
