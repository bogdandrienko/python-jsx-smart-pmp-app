import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
/////////////////////////////////////////////////////////////////////////////
import * as reducers from "./reducers";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const globalReducer = combineReducers({
  /////////////////////////////////////////////////////////////////////////////
  userLoginAnyStore: reducers.userLoginReducer,
  userDetailsAuthStore: reducers.userDetailsReducer,
  userChangeAuthStore: reducers.userChangeReducer,
  userRecoverPasswordAnyStore: reducers.userRecoverPasswordReducer,
  userListAllAuthStore: reducers.userListAllReducer,
  notificationCreateAnyStore: reducers.notificationCreateReducer,
  /////////////////////////////////////////////////////////////////////////////
  adminChangeUserPasswordAuthStore: reducers.adminChangeUserPasswordReducer,
  adminCreateOrChangeUsersAuthStore: reducers.adminCreateOrChangeUsersReducer,
  adminExportUsersAuthStore: reducers.adminExportUsersReducer,
  /////////////////////////////////////////////////////////////////////////////
  salaryUserAuthStore: reducers.salaryUserReducer,
  /////////////////////////////////////////////////////////////////////////////
  rationalCreateAuthStore: reducers.rationalCreateReducer,
  rationalListAuthStore: reducers.rationalListReducer,
  rationalDetailAuthStore: reducers.rationalDetailReducer,
  /////////////////////////////////////////////////////////////////////////////
  ideaCreateAuthStore: reducers.ideaCreateReducer,
  ideaListAuthStore: reducers.ideaListReducer,
  ideaDetailAuthStore: reducers.ideaDetailReducer,
  ideaChangeAuthStore: reducers.ideaChangeReducer,
  ideaModerateAuthStore: reducers.ideaModerateReducer,
  ideaCommentCreateAuthStore: reducers.ideaCommentCreateReducer,
  ideaCommentListAuthStore: reducers.ideaCommentListReducer,
  ideaRatingCreateAuthStore: reducers.ideaRatingCreateReducer,
  /////////////////////////////////////////////////////////////////////////////
  vacancyListAuthStore: reducers.vacancyCreateReducer,
  vacancyDetailAnyStore: reducers.vacancyListReducer,
  vacancyCreateAnyStore: reducers.vacancyDetailReducer,
  vacancyChangeAuthStore: reducers.vacancyChangeReducer,
  vacancyDeleteAuthStore: reducers.vacancyDeleteReducer,
  /////////////////////////////////////////////////////////////////////////////
  resumeListAuthStore: reducers.resumeListReducer,
  resumeDetailAuthStore: reducers.resumeDetailReducer,
  resumeCreateAnyStore: reducers.resumeCreateReducer,
  resumeDeleteAuthStore: reducers.resumeDeleteReducer,
  /////////////////////////////////////////////////////////////////////////////
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const userTokenFromStorage = localStorage.getItem("userToken")
  ? JSON.parse(localStorage.getItem("userToken"))
  : null;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const initialState = {
  userLoginAnyStore: { data: userTokenFromStorage },
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const middleware = [thunk];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const store = createStore(
  globalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
