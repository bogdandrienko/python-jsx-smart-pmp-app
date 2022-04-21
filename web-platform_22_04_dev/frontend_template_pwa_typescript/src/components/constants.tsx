import * as utils from "./utils";
import counterReducer from "./counter/counterSlice";

export const reducers = {};

// @ts-ignore
function connectReducer(name = "", reducer) {
  // @ts-ignore
  reducers[name] = reducer;
}

// export const DEBUG_CONSTANT = process.env.NODE_ENV === "production";
export const DEBUG_CONSTANT = true;

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

export const IdeaCreateStore = utils.StoreReducerConstructorUtility(
  "IdeaCreateStore",
  connectReducer
);
export const IdeaReadListStore = utils.StoreReducerConstructorUtility(
  "IdeaReadListStore",
  connectReducer
);
export const IdeaReadStore = utils.StoreReducerConstructorUtility(
  "IdeaReadStore",
  connectReducer
);
export const IdeaDeleteStore = utils.StoreReducerConstructorUtility(
  "IdeaDeleteStore",
  connectReducer
);

export const UserReadListStore = utils.StoreReducerConstructorUtility(
  "UserReadListStore",
  connectReducer
);

export const IdeaCommentCreateStore = utils.StoreReducerConstructorUtility(
  "IdeaCommentCreateStore",
  connectReducer
);

export const IdeaCommentReadListStore = utils.StoreReducerConstructorUtility(
  "IdeaCommentReadListStore",
  connectReducer
);

export const IdeaRatingCreateStore = utils.StoreReducerConstructorUtility(
  "IdeaRatingCreateStore",
  connectReducer
);

export const IdeaRatingReadListStore = utils.StoreReducerConstructorUtility(
  "IdeaRatingReadListStore",
  connectReducer
);

connectReducer("counter", counterReducer);
