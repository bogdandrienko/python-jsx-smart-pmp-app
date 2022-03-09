import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as reducers from "./reducers";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const globalReducer = combineReducers({
  userLoginStore: reducers.userLoginAnyReducer,
  userDetailsStore: reducers.userDetailsAuthReducer,
  userChangeStore: reducers.userChangeAuthReducer,
  userRecoverPasswordStore: reducers.userRecoverPasswordAnyReducer,
  ///////////////////////////////////////////////////////////
  adminChangeUserPasswordStore: reducers.adminChangeUserPasswordAuthReducer,
  adminCreateOrChangeUsersStore: reducers.adminCreateOrChangeUsersAuthReducer,
  adminExportUsersStore: reducers.adminExportUsersAuthReducer,
  ///////////////////////////////////////////////////////////
  salaryUserStore: reducers.salaryUserAuthReducer,
  ///////////////////////////////////////////////////////////
  rationalCreateStore: reducers.rationalCreateAuthReducer,
  rationalListStore: reducers.rationalListAuthReducer,
  rationalDetailStore: reducers.rationalDetailAuthReducer,
  ///////////////////////////////////////////////////////////
  userListAllStore: reducers.userListAllAuthReducer,
  ///////////////////////////////////////////////////////////
  vacancyListStore: reducers.vacancyCreateAuthReducer,
  vacancyDetailStore: reducers.vacancyListAnyReducer,
  vacancyCreateStore: reducers.vacancyDetailAnyReducer,
  vacancyChangeStore: reducers.vacancyChangeAuthReducer,
  vacancyDeleteStore: reducers.vacancyDeleteAuthReducer,
  ///////////////////////////////////////////////////////////
  resumeListStore: reducers.resumeListAuthReducer,
  resumeDetailStore: reducers.resumeDetailAuthReducer,
  resumeCreateStore: reducers.resumeCreateAnyReducer,
  resumeDeleteStore: reducers.resumeDeleteAuthReducer,
  ///////////////////////////////////////////////////////////
});

const userTokenFromStorage = localStorage.getItem("userToken")
  ? JSON.parse(localStorage.getItem("userToken"))
  : null;

const initialState = {
  userLoginStore: { data: userTokenFromStorage },
};

const middleware = [thunk];

const store = createStore(
  globalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
