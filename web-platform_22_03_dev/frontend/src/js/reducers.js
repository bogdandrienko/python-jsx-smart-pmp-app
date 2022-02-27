import {
  USER_LOGIN_LOAD_CONSTANT,
  USER_LOGIN_DATA_CONSTANT,
  USER_LOGIN_ERROR_CONSTANT,
  USER_LOGIN_FAIL_CONSTANT,
  USER_LOGIN_RESET_CONSTANT,
  USER_DETAILS_LOAD_CONSTANT,
  USER_DETAILS_DATA_CONSTANT,
  USER_DETAILS_ERROR_CONSTANT,
  USER_DETAILS_FAIL_CONSTANT,
  USER_DETAILS_RESET_CONSTANT,
  USER_CHANGE_LOAD_CONSTANT,
  USER_CHANGE_DATA_CONSTANT,
  USER_CHANGE_ERROR_CONSTANT,
  USER_CHANGE_FAIL_CONSTANT,
  USER_CHANGE_RESET_CONSTANT,
  USER_RECOVER_PASSWORD_LOAD_CONSTANT,
  USER_RECOVER_PASSWORD_DATA_CONSTANT,
  USER_RECOVER_PASSWORD_ERROR_CONSTANT,
  USER_RECOVER_PASSWORD_FAIL_CONSTANT,
  USER_RECOVER_PASSWORD_RESET_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ADMIN_CHANGE_USER_PASSWORD_LOAD_CONSTANT,
  ADMIN_CHANGE_USER_PASSWORD_DATA_CONSTANT,
  ADMIN_CHANGE_USER_PASSWORD_ERROR_CONSTANT,
  ADMIN_CHANGE_USER_PASSWORD_FAIL_CONSTANT,
  ADMIN_CHANGE_USER_PASSWORD_RESET_CONSTANT,
  ADMIN_CREATE_OR_CHANGE_USERS_LOAD_CONSTANT,
  ADMIN_CREATE_OR_CHANGE_USERS_DATA_CONSTANT,
  ADMIN_CREATE_OR_CHANGE_USERS_ERROR_CONSTANT,
  ADMIN_CREATE_OR_CHANGE_USERS_FAIL_CONSTANT,
  ADMIN_CREATE_OR_CHANGE_USERS_RESET_CONSTANT,
  ADMIN_EXPORT_USERS_LOAD_CONSTANT,
  ADMIN_EXPORT_USERS_DATA_CONSTANT,
  ADMIN_EXPORT_USERS_ERROR_CONSTANT,
  ADMIN_EXPORT_USERS_FAIL_CONSTANT,
  ADMIN_EXPORT_USERS_RESET_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_SALARY_DATA_CONSTANT,
  USER_SALARY_ERROR_CONSTANT,
  USER_SALARY_FAIL_CONSTANT,
  USER_SALARY_LOAD_CONSTANT,
  USER_SALARY_RESET_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  RATIONAL_CREATE_LOAD_CONSTANT,
  RATIONAL_CREATE_DATA_CONSTANT,
  RATIONAL_CREATE_ERROR_CONSTANT,
  RATIONAL_CREATE_FAIL_CONSTANT,
  RATIONAL_CREATE_RESET_CONSTANT,
  RATIONAL_DETAIL_LOAD_CONSTANT,
  RATIONAL_DETAIL_DATA_CONSTANT,
  RATIONAL_DETAIL_ERROR_CONSTANT,
  RATIONAL_DETAIL_FAIL_CONSTANT,
  RATIONAL_DETAIL_RESET_CONSTANT,
  RATIONAL_LIST_LOAD_CONSTANT,
  RATIONAL_LIST_DATA_CONSTANT,
  RATIONAL_LIST_ERROR_CONSTANT,
  RATIONAL_LIST_FAIL_CONSTANT,
  RATIONAL_LIST_RESET_CONSTANT,
} from "./constants";

export const userLoginReducer = (state = {}, action = null) => {
  switch (action.type) {
    case USER_LOGIN_LOAD_CONSTANT:
      return { load: true };

    case USER_LOGIN_DATA_CONSTANT:
      return { load: false, data: action.payload };

    case USER_LOGIN_ERROR_CONSTANT:
      return { load: false, error: action.payload };

    case USER_LOGIN_FAIL_CONSTANT:
      return { load: false, fail: action.payload };

    case USER_LOGIN_RESET_CONSTANT:
      return {};

    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action = null) => {
  switch (action.type) {
    case USER_DETAILS_LOAD_CONSTANT:
      return { load: true };

    case USER_DETAILS_DATA_CONSTANT:
      return { load: false, data: action.payload };

    case USER_DETAILS_ERROR_CONSTANT:
      return { load: false, error: action.payload };

    case USER_DETAILS_FAIL_CONSTANT:
      return { load: false, fail: action.payload };

    case USER_DETAILS_RESET_CONSTANT:
      return {};

    default:
      return state;
  }
};

export const userChangeReducer = (state = {}, action = null) => {
  switch (action.type) {
    case USER_CHANGE_LOAD_CONSTANT:
      return { load: true };

    case USER_CHANGE_DATA_CONSTANT:
      return { load: false, data: action.payload };

    case USER_CHANGE_ERROR_CONSTANT:
      return { load: false, error: action.payload };

    case USER_CHANGE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };

    case USER_CHANGE_RESET_CONSTANT:
      return {};

    default:
      return state;
  }
};

export const userRecoverPasswordReducer = (state = {}, action = null) => {
  switch (action.type) {
    case USER_RECOVER_PASSWORD_LOAD_CONSTANT:
      return { load: true };

    case USER_RECOVER_PASSWORD_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };

    case USER_RECOVER_PASSWORD_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };

    case USER_RECOVER_PASSWORD_FAIL_CONSTANT:
      return { load: false, fail: action.payload };

    case USER_RECOVER_PASSWORD_RESET_CONSTANT:
      return {};

    default:
      return state;
  }
};

export const adminChangeUserPasswordReducer = (state = {}, action = null) => {
  switch (action.type) {
    case ADMIN_CHANGE_USER_PASSWORD_LOAD_CONSTANT:
      return { load: true };

    case ADMIN_CHANGE_USER_PASSWORD_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };

    case ADMIN_CHANGE_USER_PASSWORD_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };

    case ADMIN_CHANGE_USER_PASSWORD_FAIL_CONSTANT:
      return { load: false, fail: action.payload };

    case ADMIN_CHANGE_USER_PASSWORD_RESET_CONSTANT:
      return {};

    default:
      return state;
  }
};

export const adminCreateOrChangeUsersReducer = (state = {}, action = null) => {
  switch (action.type) {
    case ADMIN_CREATE_OR_CHANGE_USERS_LOAD_CONSTANT:
      return { load: true };

    case ADMIN_CREATE_OR_CHANGE_USERS_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };

    case ADMIN_CREATE_OR_CHANGE_USERS_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };

    case ADMIN_CREATE_OR_CHANGE_USERS_FAIL_CONSTANT:
      return { load: false, fail: action.payload };

    case ADMIN_CREATE_OR_CHANGE_USERS_RESET_CONSTANT:
      return {};

    default:
      return state;
  }
};

export const adminExportUsersReducer = (state = {}, action = null) => {
  switch (action.type) {
    case ADMIN_EXPORT_USERS_LOAD_CONSTANT:
      return { load: true };

    case ADMIN_EXPORT_USERS_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };

    case ADMIN_EXPORT_USERS_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };

    case ADMIN_EXPORT_USERS_FAIL_CONSTANT:
      return { load: false, fail: action.payload };

    case ADMIN_EXPORT_USERS_RESET_CONSTANT:
      return {};

    default:
      return state;
  }
};

export const salaryUserReducer = (state = {}, action = null) => {
  switch (action.type) {
    case USER_SALARY_LOAD_CONSTANT:
      return { load: true };

    case USER_SALARY_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };

    case USER_SALARY_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };

    case USER_SALARY_FAIL_CONSTANT:
      return {
        load: false,
        fail: action.payload,
      };

    case USER_SALARY_RESET_CONSTANT:
      return {};

    default:
      return state;
  }
};

export const rationalCreateReducer = (state = {}, action = null) => {
  switch (action.type) {
    case RATIONAL_CREATE_LOAD_CONSTANT:
      return { load: true };

    case RATIONAL_CREATE_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };

    case RATIONAL_CREATE_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };

    case RATIONAL_CREATE_FAIL_CONSTANT:
      return { load: false, fail: action.payload };

    case RATIONAL_CREATE_RESET_CONSTANT:
      return {};

    default:
      return state;
  }
};

export const rationalListReducer = (state = {}, action = null) => {
  switch (action.type) {
    case RATIONAL_LIST_LOAD_CONSTANT:
      return { load: true };

    case RATIONAL_LIST_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };

    case RATIONAL_LIST_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };

    case RATIONAL_LIST_FAIL_CONSTANT:
      return { load: false, fail: action.payload };

    case RATIONAL_LIST_RESET_CONSTANT:
      return {};

    default:
      return state;
  }
};

export const rationalDetailReducer = (state = {}, action = null) => {
  switch (action.type) {
    case RATIONAL_DETAIL_LOAD_CONSTANT:
      return { load: true };

    case RATIONAL_DETAIL_DATA_CONSTANT:
      return {
        load: false,
        data: action.payload,
      };

    case RATIONAL_DETAIL_ERROR_CONSTANT:
      return {
        load: false,
        error: action.payload,
      };

    case RATIONAL_DETAIL_FAIL_CONSTANT:
      return { load: false, fail: action.payload };

    case RATIONAL_DETAIL_RESET_CONSTANT:
      return {};

    default:
      return state;
  }
};
