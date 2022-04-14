// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as utils from "./utils";
import * as constants from "./constants";

// TODO default settings ///////////////////////////////////////////////////////////////////////////////////////////////

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

// TODO combineReducers ////////////////////////////////////////////////////////////////////////////////////////////////

const globalReducer = combineReducers({
  // TODO main /////////////////////////////////////////////////////////////////////////////////////////////////////////

  ratingsListStore: utils.ReducerConstructorUtility(constants.RATINGS_LIST),

  // TODO profile //////////////////////////////////////////////////////////////////////////////////////////////////////

  userLoginStore: utils.ReducerConstructorUtility(constants.USER_LOGIN),
  userDetailsStore: utils.ReducerConstructorUtility(constants.USER_DETAILS),
  userChangeStore: utils.ReducerConstructorUtility(constants.USER_CHANGE),
  userRecoverPasswordStore: utils.ReducerConstructorUtility(
    constants.USER_RECOVER_PASSWORD
  ),
  UserListStore: utils.ReducerConstructorUtility(constants.USER_LIST_ALL),

  notificationCreateStore: utils.ReducerConstructorUtility(
    constants.NOTIFICATION_CREATE
  ),
  notificationDeleteStore: utils.ReducerConstructorUtility(
    constants.NOTIFICATION_DELETE
  ),
  notificationListStore: utils.ReducerConstructorUtility(
    constants.NOTIFICATION_LIST
  ),

  // TODO progress /////////////////////////////////////////////////////////////////////////////////////////////////////

  ideaCreateStore: utils.ReducerConstructorUtility(constants.IDEA_CREATE),
  ideaListStore: utils.ReducerConstructorUtility(constants.IDEA_LIST),
  ideaDetailStore: utils.ReducerConstructorUtility(constants.IDEA_DETAIL),
  ideaChangeStore: utils.ReducerConstructorUtility(constants.IDEA_CHANGE),
  ideaModerateStore: utils.ReducerConstructorUtility(constants.IDEA_MODERATE),
  ideaCommentCreateStore: utils.ReducerConstructorUtility(
    constants.IDEA_COMMENT_CREATE
  ),
  ideaCommentDeleteStore: utils.ReducerConstructorUtility(
    constants.IDEA_COMMENT_DELETE
  ),
  ideaRatingCreateStore: utils.ReducerConstructorUtility(
    constants.IDEA_RATING_CREATE
  ),

  // TODO buhgalteria //////////////////////////////////////////////////////////////////////////////////////////////////

  salaryUserStore: utils.ReducerConstructorUtility(constants.USER_SALARY),

  // TODO sup //////////////////////////////////////////////////////////////////////////////////////////////////////////

  vacationUserStore: utils.ReducerConstructorUtility(constants.USER_VACATION),

  // TODO moderator ////////////////////////////////////////////////////////////////////////////////////////////////////

  terminalRebootStore: utils.ReducerConstructorUtility(
    constants.TERMINAL_REBOOT
  ),

  adminCheckUserStore: utils.ReducerConstructorUtility(
    constants.ADMIN_CHECK_USER
  ),
  adminChangeUserPasswordStore: utils.ReducerConstructorUtility(
    constants.ADMIN_CHANGE_USER_PASSWORD
  ),
  adminChangeUserActivityStore: utils.ReducerConstructorUtility(
    constants.ADMIN_CHANGE_USER_ACTIVITY
  ),
  adminCreateOrChangeUsersStore: utils.ReducerConstructorUtility(
    constants.ADMIN_CREATE_OR_CHANGE_USERS
  ),
  adminExportUsersStore: utils.ReducerConstructorUtility(
    constants.ADMIN_EXPORT_USERS
  ),

  // TODO develop //////////////////////////////////////////////////////////////////////////////////////////////////////

  rationalCreateStore: utils.ReducerConstructorUtility(
    constants.RATIONAL_CREATE
  ),
  rationalListStore: utils.ReducerConstructorUtility(constants.RATIONAL_LIST),
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
