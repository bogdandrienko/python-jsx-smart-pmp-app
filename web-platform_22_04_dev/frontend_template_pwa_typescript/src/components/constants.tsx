import * as utils from "./utils";
import counterReducer from "./counter/counterSlice";

export const reducers = {};

// @ts-ignore
function connectReducer(name = "", reducer) {
  // @ts-ignore
  reducers[name] = reducer;
}

export const DEBUG_CONSTANT = process.env.NODE_ENV === "production";

export const PostGetListStore = utils.StoreReducerConstructorUtility(
  "PostGetListStore",
  connectReducer
);
export const PostGetOneStore = utils.StoreReducerConstructorUtility(
  "PostGetOneStore",
  connectReducer
);
export const PostCreateStore = utils.StoreReducerConstructorUtility(
  "PostCreateStore",
  connectReducer
);

connectReducer("counter", counterReducer);
