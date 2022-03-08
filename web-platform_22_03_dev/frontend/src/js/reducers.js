import * as constants from "./constants";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

export const vacancyListReducer = (state = {}, action = null) => {
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

export const vacancyDetailReducer = (state = {}, action = null) => {
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

export const vacancyCreateReducer = (state = {}, action = null) => {
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
