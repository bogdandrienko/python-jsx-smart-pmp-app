import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "../test/productReducers";
import { notesListReducer, notesDetailsReducer } from "../test/noteReducers";
import { salaryUserReducer } from "../reducers/salaryReducers";

import {
  userListReducer,
  userChangeReducer,



  userLoginReducer,
  userDetailsReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "../reducers/userReducers";

const reducer = combineReducers({
  userList: userListReducer,
  userChange: userChangeReducer,

  salaryUser: salaryUserReducer,



  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,

  userUpdateProfile: userUpdateProfileReducer,
  productList: productListReducer,
  notesList: notesListReducer,
  notesDetails: notesDetailsReducer,
  userRegister: userRegisterReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
