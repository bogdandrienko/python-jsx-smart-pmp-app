import {
  USER_LOGIN_LOAD_CONSTANT,
  USER_LOGIN_DATA_CONSTANT,
  USER_LOGIN_ERROR_CONSTANT,
  USER_LOGIN_FAIL_CONSTANT,
  USER_LOGOUT_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_DETAILS_LOAD_CONSTANT,
  USER_DETAILS_DATA_CONSTANT,
  USER_DETAILS_ERROR_CONSTANT,
  USER_DETAILS_FAIL_CONSTANT,
  USER_DETAILS_RESET_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_CHANGE_LOAD_CONSTANT,
  USER_CHANGE_DATA_CONSTANT,
  USER_CHANGE_ERROR_CONSTANT,
  USER_CHANGE_FAIL_CONSTANT,
  USER_CHANGE_RESET_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_RECOVER_PASSWORD_LOADING_CONSTANT,
  USER_RECOVER_PASSWORD_DATA_CONSTANT,
  USER_RECOVER_PASSWORD_ERROR_CONSTANT,
  USER_RECOVER_PASSWORD_FAIL_CONSTANT,
  USER_RECOVER_PASSWORD_RESET_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_LIST_LOADING_CONSTANT,
  USER_LIST_DATA_CONSTANT,
  USER_LIST_ERROR_CONSTANT,
  USER_LIST_RESET_CONSTANT,
  USER_LIST_DEFAULT_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_SALARY_DATA_CONSTANT,
  USER_SALARY_ERROR_CONSTANT,
  USER_SALARY_FAIL_CONSTANT,
  USER_SALARY_LOAD_CONSTANT,
  USER_SALARY_RESET_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
} from "./constants";

export const userLoginReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case USER_LOGIN_LOAD_CONSTANT:
      return { load: true };

    case USER_LOGIN_DATA_CONSTANT:
      return { load: false, data: action.payload };

    case USER_LOGIN_ERROR_CONSTANT:
      return { load: false, error: action.payload };

    case USER_LOGIN_FAIL_CONSTANT:
      return { load: false, fail: action.payload };

    case USER_LOGOUT_CONSTANT:
      return {};

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { data: {} }, action = {}) => {
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
    case USER_RECOVER_PASSWORD_LOADING_CONSTANT:
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

export const userListReducer = (state = { users: [] }, action = null) => {
  switch (action.type) {
    case USER_LIST_LOADING_CONSTANT:
      return { usersListLoadingReducer: true };

    case USER_LIST_DATA_CONSTANT:
      return {
        usersListLoadingReducer: false,
        usersListDataReducer: action.payload,
      };

    case USER_LIST_ERROR_CONSTANT:
      return {
        usersListLoadingReducer: false,
        usersListErrorReducer: action.payload,
      };

    case USER_LIST_RESET_CONSTANT:
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