import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "../test/productReducers";
import { notesListReducer, notesDetailsReducer } from "../test/noteReducers";
import { salaryUserReducer } from "../reducers/salaryReducers";

import {
  userLoginReducer,
  userDetailsReducer,
  userChangeReducer,

  ///////////////////////////////////////////////////////////
  userRecoverPasswordReducer,
  userListReducer,
} from "../reducers/userReducers";

const reducer = combineReducers({
  userLoginState: userLoginReducer,
  userDetailsStore: userDetailsReducer,
  userChangeStore: userChangeReducer,

  ///////////////////////////////////////////////////////////
  userRecoverPassword: userRecoverPasswordReducer,
  userList: userListReducer,

  salaryUser: salaryUserReducer,

  productList: productListReducer,
  notesList: notesListReducer,
  notesDetails: notesDetailsReducer,
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
