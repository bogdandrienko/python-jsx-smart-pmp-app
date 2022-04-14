// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as utils from "./utils";
import * as constants from "./constants";

// TODO combineReducers ////////////////////////////////////////////////////////////////////////////////////////////////

const globalReducer = combineReducers({
  // TODO main /////////////////////////////////////////////////////////////////////////////////////////////////////////

  ratingsListStore: utils.ReducersUtility(constants.RATINGS_LIST),

  // TODO profile //////////////////////////////////////////////////////////////////////////////////////////////////////

  userLoginStore: utils.ReducersUtility(constants.USER_LOGIN),
  userDetailsStore: utils.ReducersUtility(constants.USER_DETAILS),
  userChangeStore: utils.ReducersUtility(constants.USER_CHANGE),
  userRecoverPasswordStore: utils.ReducersUtility(
    constants.USER_RECOVER_PASSWORD
  ),
  UserListStore: utils.ReducersUtility(constants.USER_LIST_ALL),

  notificationCreateStore: utils.ReducersUtility(constants.NOTIFICATION_CREATE),
  notificationDeleteStore: utils.ReducersUtility(constants.NOTIFICATION_DELETE),
  notificationListStore: utils.ReducersUtility(constants.NOTIFICATION_LIST),

  // TODO progress /////////////////////////////////////////////////////////////////////////////////////////////////////

  ideaCreateStore: utils.ReducersUtility(constants.IDEA_CREATE),
  ideaListStore: utils.ReducersUtility(constants.IDEA_LIST),
  ideaDetailStore: utils.ReducersUtility(constants.IDEA_DETAIL),
  ideaChangeStore: utils.ReducersUtility(constants.IDEA_CHANGE),
  ideaModerateStore: utils.ReducersUtility(constants.IDEA_MODERATE),
  ideaCommentCreateStore: utils.ReducersUtility(constants.IDEA_COMMENT_CREATE),
  ideaCommentDeleteStore: utils.ReducersUtility(constants.IDEA_COMMENT_DELETE),
  ideaRatingCreateStore: utils.ReducersUtility(constants.IDEA_RATING_CREATE),

  // TODO buhgalteria //////////////////////////////////////////////////////////////////////////////////////////////////

  salaryUserStore: utils.ReducersUtility(constants.USER_SALARY),

  // TODO sup //////////////////////////////////////////////////////////////////////////////////////////////////////////

  vacationUserStore: utils.ReducersUtility(constants.USER_VACATION),

  // TODO moderator ////////////////////////////////////////////////////////////////////////////////////////////////////

  terminalRebootStore: utils.ReducersUtility(constants.TERMINAL_REBOOT),

  adminCheckUserStore: utils.ReducersUtility(constants.ADMIN_CHECK_USER),
  adminChangeUserPasswordStore: utils.ReducersUtility(
    constants.ADMIN_CHANGE_USER_PASSWORD
  ),
  adminChangeUserActivityStore: utils.ReducersUtility(
    constants.ADMIN_CHANGE_USER_ACTIVITY
  ),
  adminCreateOrChangeUsersStore: utils.ReducersUtility(
    constants.ADMIN_CREATE_OR_CHANGE_USERS
  ),
  adminExportUsersStore: utils.ReducersUtility(constants.ADMIN_EXPORT_USERS),

  // TODO develop //////////////////////////////////////////////////////////////////////////////////////////////////////

  rationalCreateStore: utils.ReducersUtility(constants.RATIONAL_CREATE),
  rationalListStore: utils.ReducersUtility(constants.RATIONAL_LIST),
});

// TODO localStorage ///////////////////////////////////////////////////////////////////////////////////////////////////

const userTokenFromStorage = localStorage.getItem("userToken")
  ? JSON.parse(localStorage.getItem("userToken"))
  : null;

// TODO initial state //////////////////////////////////////////////////////////////////////////////////////////////////

const initialState = {
  userLoginStore: { data: userTokenFromStorage },
};

// TODO middleware /////////////////////////////////////////////////////////////////////////////////////////////////////

const middleware = [thunk];

// TODO store //////////////////////////////////////////////////////////////////////////////////////////////////////////

const store = createStore(
  globalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
