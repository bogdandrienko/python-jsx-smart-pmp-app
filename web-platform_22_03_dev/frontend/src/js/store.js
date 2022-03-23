///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as reducers from "./reducers";
import { adminChangeUserActivityReducer } from "./reducers";
////////////////////////////////////////////////////////////////////////////////////////////////////TODO combineReducers
const globalReducer = combineReducers({
  userLoginStore: reducers.userLoginReducer,
  userDetailsStore: reducers.userDetailsReducer,
  userChangeStore: reducers.userChangeReducer,
  userRecoverPasswordStore: reducers.userRecoverPasswordReducer,
  userListAllStore: reducers.userListAllReducer,
  notificationCreateStore: reducers.notificationCreateReducer,
  notificationDeleteStore: reducers.notificationDeleteReducer,
  notificationListStore: reducers.notificationListReducer,
  /////////////////////////////////////////////////////////////////////////////
  adminChangeUserPasswordStore: reducers.adminChangeUserPasswordReducer,
  adminCreateOrChangeUsersStore: reducers.adminCreateOrChangeUsersReducer,
  adminExportUsersStore: reducers.adminExportUsersReducer,
  adminChangeUserActivityStore: reducers.adminChangeUserActivityReducer,
  /////////////////////////////////////////////////////////////////////////////
  salaryUserStore: reducers.salaryUserReducer,
  /////////////////////////////////////////////////////////////////////////////
  rationalCreateStore: reducers.rationalCreateReducer,
  rationalListStore: reducers.rationalListReducer,
  rationalDetailStore: reducers.rationalDetailReducer,
  /////////////////////////////////////////////////////////////////////////////
  ideaCreateStore: reducers.ideaCreateReducer,
  ideaListStore: reducers.ideaListReducer,
  ideaDetailStore: reducers.ideaDetailReducer,
  ideaChangeStore: reducers.ideaChangeReducer,
  ideaModerateStore: reducers.ideaModerateReducer,
  ideaCommentCreateStore: reducers.ideaCommentCreateReducer,
  ideaCommentDeleteStore: reducers.ideaCommentDeleteReducer,
  ideaCommentListStore: reducers.ideaCommentListReducer,
  ideaRatingCreateStore: reducers.ideaRatingCreateReducer,
  ideaAuthorListStore: reducers.ideaAuthorListReducer,
  /////////////////////////////////////////////////////////////////////////////
  vacancyListStore: reducers.vacancyCreateReducer,
  vacancyDetailStore: reducers.vacancyListReducer,
  vacancyCreateStore: reducers.vacancyDetailReducer,
  vacancyChangeStore: reducers.vacancyChangeReducer,
  vacancyDeleteStore: reducers.vacancyDeleteReducer,
  /////////////////////////////////////////////////////////////////////////////
  resumeListStore: reducers.resumeListReducer,
  resumeDetailStore: reducers.resumeDetailReducer,
  resumeCreateStore: reducers.resumeCreateReducer,
  resumeDeleteStore: reducers.resumeDeleteReducer,
});
///////////////////////////////////////////////////////////////////////////////////////////////////////TODO localStorage
const userTokenFromStorage = localStorage.getItem("userToken")
  ? JSON.parse(localStorage.getItem("userToken"))
  : null;
//////////////////////////////////////////////////////////////////////////////////////////////////////TODO initial state
const initialState = {
  userLoginStore: { data: userTokenFromStorage },
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////TODO middleware
const middleware = [thunk];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////TODO store
const store = createStore(
  globalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
