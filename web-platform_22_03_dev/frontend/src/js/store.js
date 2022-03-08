import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as reducers from "./reducers";
import { vacancyDeleteReducer, vacancyRespondReducer } from "./reducers";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const globalReducer = combineReducers({
  userLoginStore: reducers.userLoginReducer,
  userDetailsStore: reducers.userDetailsReducer,
  userChangeStore: reducers.userChangeReducer,
  userRecoverPasswordStore: reducers.userRecoverPasswordReducer,
  ///////////////////////////////////////////////////////////
  adminChangeUserPasswordStore: reducers.adminChangeUserPasswordReducer,
  adminCreateOrChangeUsersStore: reducers.adminCreateOrChangeUsersReducer,
  adminExportUsersStore: reducers.adminExportUsersReducer,
  ///////////////////////////////////////////////////////////
  salaryUserStore: reducers.salaryUserReducer,
  ///////////////////////////////////////////////////////////
  rationalCreateStore: reducers.rationalCreateReducer,
  rationalListStore: reducers.rationalListReducer,
  rationalDetailStore: reducers.rationalDetailReducer,
  ///////////////////////////////////////////////////////////
  userListAllStore: reducers.userListAllReducer,
  ///////////////////////////////////////////////////////////
  vacancyListStore: reducers.vacancyListReducer,
  vacancyDetailStore: reducers.vacancyDetailReducer,
  vacancyRespondStore: reducers.vacancyRespondReducer,
  vacancyCreateStore: reducers.vacancyCreateReducer,
  vacancyChangeStore: reducers.vacancyChangeReducer,
  vacancyDeleteStore: reducers.vacancyDeleteReducer,
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
