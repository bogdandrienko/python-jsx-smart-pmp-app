import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as reducers from "./reducers";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const globalReducer = combineReducers({
  /////////////////////////////////////////////////////////////////////////////
  userLoginAnyStore: reducers.userLoginAnyReducer,
  userDetailsAuthStore: reducers.userDetailsAuthReducer,
  userChangeAuthStore: reducers.userChangeAuthReducer,
  userRecoverPasswordAnyStore: reducers.userRecoverPasswordAnyReducer,
  userListAllAuthStore: reducers.userListAllAuthReducer,
  notificationCreateAnyStore: reducers.notificationCreateReducer,
  /////////////////////////////////////////////////////////////////////////////
  adminChangeUserPasswordAuthStore: reducers.adminChangeUserPasswordAuthReducer,
  adminCreateOrChangeUsersAuthStore:
    reducers.adminCreateOrChangeUsersAuthReducer,
  adminExportUsersAuthStore: reducers.adminExportUsersAuthReducer,
  /////////////////////////////////////////////////////////////////////////////
  salaryUserAuthStore: reducers.salaryUserAuthReducer,
  /////////////////////////////////////////////////////////////////////////////
  rationalCreateAuthStore: reducers.rationalCreateAuthReducer,
  rationalListAuthStore: reducers.rationalListAuthReducer,
  rationalDetailAuthStore: reducers.rationalDetailAuthReducer,
  /////////////////////////////////////////////////////////////////////////////
  ideaCreateAuthStore: reducers.ideaCreateAuthReducer,
  ideaListAuthStore: reducers.ideaListAuthReducer,
  ideaDetailAuthStore: reducers.ideaDetailAuthReducer,
  ideaChangeAuthStore: reducers.ideaChangeAuthReducer,
  ideaModerateAuthStore: reducers.ideaModerateAuthReducer,
  ideaCommentCreateAuthStore: reducers.ideaCommentCreateAuthReducer,
  ideaCommentListAuthStore: reducers.ideaCommentListAuthReducer,
  ideaRatingCreateAuthStore: reducers.ideaRatingCreateAuthReducer,
  /////////////////////////////////////////////////////////////////////////////
  vacancyListAuthStore: reducers.vacancyCreateAuthReducer,
  vacancyDetailAnyStore: reducers.vacancyListAnyReducer,
  vacancyCreateAnyStore: reducers.vacancyDetailAnyReducer,
  vacancyChangeAuthStore: reducers.vacancyChangeAuthReducer,
  vacancyDeleteAuthStore: reducers.vacancyDeleteAuthReducer,
  /////////////////////////////////////////////////////////////////////////////
  resumeListAuthStore: reducers.resumeListAuthReducer,
  resumeDetailAuthStore: reducers.resumeDetailAuthReducer,
  resumeCreateAnyStore: reducers.resumeCreateAnyReducer,
  resumeDeleteAuthStore: reducers.resumeDeleteAuthReducer,
  /////////////////////////////////////////////////////////////////////////////
});

const userTokenFromStorage = localStorage.getItem("userToken")
  ? JSON.parse(localStorage.getItem("userToken"))
  : null;

const initialState = {
  userLoginAnyStore: { data: userTokenFromStorage },
};

const middleware = [thunk];

const store = createStore(
  globalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
