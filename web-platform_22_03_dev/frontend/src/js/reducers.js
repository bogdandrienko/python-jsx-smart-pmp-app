///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React from "react";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as constants from "./constants";
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const userLoginReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.USER_LOGIN_LOAD_CONSTANT:
      return { load: true };
    case constants.USER_LOGIN_DATA_CONSTANT:
      return { load: false, data: action.payload };
    case constants.USER_LOGIN_ERROR_CONSTANT:
      return { load: false, error: action.payload };
    case constants.USER_LOGIN_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.USER_LOGIN_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const userDetailsReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.USER_DETAILS_LOAD_CONSTANT:
      return { load: true };
    case constants.USER_DETAILS_DATA_CONSTANT:
      return { load: false, data: action.payload };
    case constants.USER_DETAILS_ERROR_CONSTANT:
      return { load: false, error: action.payload };
    case constants.USER_DETAILS_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.USER_DETAILS_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const userChangeReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.USER_CHANGE_LOAD_CONSTANT:
      return { load: true };
    case constants.USER_CHANGE_DATA_CONSTANT:
      return { load: false, data: action.payload };
    case constants.USER_CHANGE_ERROR_CONSTANT:
      return { load: false, error: action.payload };
    case constants.USER_CHANGE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.USER_CHANGE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const userRecoverPasswordReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.USER_RECOVER_PASSWORD_LOAD_CONSTANT:
      return { load: true };
    case constants.USER_RECOVER_PASSWORD_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.USER_RECOVER_PASSWORD_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.USER_RECOVER_PASSWORD_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.USER_RECOVER_PASSWORD_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const userListAllReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.USER_LIST_ALL_LOAD_CONSTANT:
      return { load: true };
    case constants.USER_LIST_ALL_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.USER_LIST_ALL_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.USER_LIST_ALL_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.USER_LIST_ALL_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const notificationCreateReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.NOTIFICATION_CREATE_LOAD_CONSTANT:
      return { load: true };
    case constants.NOTIFICATION_CREATE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.NOTIFICATION_CREATE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.NOTIFICATION_CREATE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.NOTIFICATION_CREATE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const notificationListReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.NOTIFICATION_LIST_LOAD_CONSTANT:
      return { load: true };
    case constants.NOTIFICATION_LIST_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.NOTIFICATION_LIST_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.NOTIFICATION_LIST_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.NOTIFICATION_LIST_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const adminChangeUserPasswordReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.ADMIN_CHANGE_USER_PASSWORD_LOAD_CONSTANT:
      return { load: true };
    case constants.ADMIN_CHANGE_USER_PASSWORD_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.ADMIN_CHANGE_USER_PASSWORD_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.ADMIN_CHANGE_USER_PASSWORD_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.ADMIN_CHANGE_USER_PASSWORD_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const adminCreateOrChangeUsersReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.ADMIN_CREATE_OR_CHANGE_USERS_LOAD_CONSTANT:
      return { load: true };
    case constants.ADMIN_CREATE_OR_CHANGE_USERS_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.ADMIN_CREATE_OR_CHANGE_USERS_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.ADMIN_CREATE_OR_CHANGE_USERS_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.ADMIN_CREATE_OR_CHANGE_USERS_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const adminExportUsersReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.ADMIN_EXPORT_USERS_LOAD_CONSTANT:
      return { load: true };
    case constants.ADMIN_EXPORT_USERS_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.ADMIN_EXPORT_USERS_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.ADMIN_EXPORT_USERS_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.ADMIN_EXPORT_USERS_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const salaryUserReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.USER_SALARY_LOAD_CONSTANT:
      return { load: true };
    case constants.USER_SALARY_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.USER_SALARY_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.USER_SALARY_FAIL_CONSTANT:
      return {
        load: false,
        fail: action.payload,
      };
    case constants.USER_SALARY_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const rationalCreateReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.RATIONAL_CREATE_LOAD_CONSTANT:
      return { load: true };
    case constants.RATIONAL_CREATE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.RATIONAL_CREATE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.RATIONAL_CREATE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.RATIONAL_CREATE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const rationalListReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.RATIONAL_LIST_LOAD_CONSTANT:
      return { load: true };
    case constants.RATIONAL_LIST_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.RATIONAL_LIST_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.RATIONAL_LIST_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.RATIONAL_LIST_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const rationalDetailReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.RATIONAL_DETAIL_LOAD_CONSTANT:
      return { load: true };
    case constants.RATIONAL_DETAIL_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.RATIONAL_DETAIL_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.RATIONAL_DETAIL_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.RATIONAL_DETAIL_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const ideaCreateReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.IDEA_CREATE_LOAD_CONSTANT:
      return { load: true };
    case constants.IDEA_CREATE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.IDEA_CREATE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.IDEA_CREATE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.IDEA_CREATE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const ideaListReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.IDEA_LIST_LOAD_CONSTANT:
      return { load: true };
    case constants.IDEA_LIST_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.IDEA_LIST_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.IDEA_LIST_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.IDEA_LIST_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const ideaDetailReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.IDEA_DETAIL_LOAD_CONSTANT:
      return { load: true };
    case constants.IDEA_DETAIL_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.IDEA_DETAIL_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.IDEA_DETAIL_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.IDEA_DETAIL_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const ideaChangeReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.IDEA_CHANGE_LOAD_CONSTANT:
      return { load: true };
    case constants.IDEA_CHANGE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.IDEA_CHANGE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.IDEA_CHANGE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.IDEA_CHANGE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const ideaModerateReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.IDEA_MODERATE_LOAD_CONSTANT:
      return { load: true };
    case constants.IDEA_MODERATE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.IDEA_MODERATE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.IDEA_MODERATE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.IDEA_MODERATE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const ideaCommentCreateReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.IDEA_COMMENT_CREATE_LOAD_CONSTANT:
      return { load: true };
    case constants.IDEA_COMMENT_CREATE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.IDEA_COMMENT_CREATE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.IDEA_COMMENT_CREATE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.IDEA_COMMENT_CREATE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const ideaCommentDeleteReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.IDEA_COMMENT_DELETE_LOAD_CONSTANT:
      return { load: true };
    case constants.IDEA_COMMENT_DELETE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.IDEA_COMMENT_DELETE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.IDEA_COMMENT_DELETE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.IDEA_COMMENT_DELETE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const ideaCommentListReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.IDEA_COMMENT_LIST_LOAD_CONSTANT:
      return { load: true };
    case constants.IDEA_COMMENT_LIST_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.IDEA_COMMENT_LIST_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.IDEA_COMMENT_LIST_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.IDEA_COMMENT_LIST_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const ideaRatingCreateReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.IDEA_RATING_CREATE_LOAD_CONSTANT:
      return { load: true };
    case constants.IDEA_RATING_CREATE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.IDEA_RATING_CREATE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.IDEA_RATING_CREATE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.IDEA_RATING_CREATE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const ideaAuthorListReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.IDEA_AUTHOR_LIST_LOAD_CONSTANT:
      return { load: true };
    case constants.IDEA_AUTHOR_LIST_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.IDEA_AUTHOR_LIST_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.IDEA_AUTHOR_LIST_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.IDEA_AUTHOR_LIST_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const vacancyCreateReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.VACANCY_LIST_LOAD_CONSTANT:
      return { load: true };
    case constants.VACANCY_LIST_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.VACANCY_LIST_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.VACANCY_LIST_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.VACANCY_LIST_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const vacancyListReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.VACANCY_DETAIL_LOAD_CONSTANT:
      return { load: true };
    case constants.VACANCY_DETAIL_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.VACANCY_DETAIL_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.VACANCY_DETAIL_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.VACANCY_DETAIL_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const vacancyDetailReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.VACANCY_CREATE_LOAD_CONSTANT:
      return { load: true };
    case constants.VACANCY_CREATE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.VACANCY_CREATE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.VACANCY_CREATE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.VACANCY_CREATE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const vacancyDeleteReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.VACANCY_DELETE_LOAD_CONSTANT:
      return { load: true };
    case constants.VACANCY_DELETE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.VACANCY_DELETE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.VACANCY_DELETE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.VACANCY_DELETE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const vacancyChangeReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.VACANCY_CHANGE_LOAD_CONSTANT:
      return { load: true };
    case constants.VACANCY_CHANGE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.VACANCY_CHANGE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.VACANCY_CHANGE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.VACANCY_CHANGE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const resumeCreateReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.RESUME_CREATE_LOAD_CONSTANT:
      return { load: true };
    case constants.RESUME_CREATE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.RESUME_CREATE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.RESUME_CREATE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.RESUME_CREATE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const resumeListReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.RESUME_LIST_LOAD_CONSTANT:
      return { load: true };
    case constants.RESUME_LIST_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.RESUME_LIST_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.RESUME_LIST_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.RESUME_LIST_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const resumeDetailReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.RESUME_DETAIL_LOAD_CONSTANT:
      return { load: true };
    case constants.RESUME_DETAIL_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.RESUME_DETAIL_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.RESUME_DETAIL_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.RESUME_DETAIL_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const resumeDeleteReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.RESUME_DELETE_LOAD_CONSTANT:
      return { load: true };
    case constants.RESUME_DELETE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.RESUME_DELETE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.RESUME_DELETE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.RESUME_DELETE_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
export const terminalRebootReducer = (state = {}, action = null) => {
  switch (action.type) {
    case constants.TERMINAL_REBOOT_LOAD_CONSTANT:
      return { load: true };
    case constants.TERMINAL_REBOOT_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };
    case constants.TERMINAL_REBOOT_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };
    case constants.TERMINAL_REBOOT_FAIL_CONSTANT:
      return { load: false, fail: action.payload };
    case constants.TERMINAL_REBOOT_RESET_CONSTANT:
      return {};
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////TODO default export const reducer
