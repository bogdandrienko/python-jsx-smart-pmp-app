import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
  userLoginReducer,
  userDetailsReducer,
  userChangeReducer,
  ///////////////////////////////////////////////////////////
  userRecoverPasswordReducer,
  ///////////////////////////////////////////////////////////
  salaryUserReducer,
  ///////////////////////////////////////////////////////////
  adminChangeUserPasswordReducer,
  ///////////////////////////////////////////////////////////
  userListReducer,
  ///////////////////////////////////////////////////////////
  rationalCreateReducer,
  rationalListReducer,
  rationalDetailReducer,
  ///////////////////////////////////////////////////////////
  todos,
} from "./reducers";
import { productListReducer } from "../test/productReducers";
import { notesListReducer, notesDetailsReducer } from "../test/noteReducers";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const reducer = combineReducers({
  userLoginState: userLoginReducer,
  userDetailsStore: userDetailsReducer,
  userChangeStore: userChangeReducer,
  userRecoverPasswordStore: userRecoverPasswordReducer,
  ///////////////////////////////////////////////////////////
  salaryUserStore: salaryUserReducer,
  ///////////////////////////////////////////////////////////
  adminChangeUserPasswordStore: adminChangeUserPasswordReducer,
  ///////////////////////////////////////////////////////////
  userListStore: userListReducer,
  ///////////////////////////////////////////////////////////
  rationalCreateStore: rationalCreateReducer,
  rationalListStore: rationalListReducer,
  rationalDetailStore: rationalDetailReducer,
  ///////////////////////////////////////////////////////////
  productList: productListReducer,
  notesList: notesListReducer,
  notesDetails: notesDetailsReducer,
  todos,
});

const userTokenFromStorage = localStorage.getItem("userToken")
  ? JSON.parse(localStorage.getItem("userToken"))
  : null;

const initialState = {
  userLoginState: { data: userTokenFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
