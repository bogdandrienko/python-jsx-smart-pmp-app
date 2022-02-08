import {
  USER_LIST_LOADING_CONSTANT,
  USER_LIST_DATA_CONSTANT,
  USER_LIST_ERROR_CONSTANT,
  USER_LIST_RESET_CONSTANT,
  USER_LIST_DEFAULT_CONSTANT,

  USER_CHANGE_LOADING_CONSTANT,
  USER_CHANGE_DATA_CONSTANT,
  USER_CHANGE_ERROR_CONSTANT,
  USER_CHANGE_RESET_CONSTANT,
  USER_CHANGE_DEFAULT_CONSTANT,
  
  USER_RECOVER_PASSWORD_LOADING_CONSTANT,
  USER_RECOVER_PASSWORD_DATA_CONSTANT,
  USER_RECOVER_PASSWORD_ERROR_CONSTANT,
  USER_RECOVER_PASSWORD_RESET_CONSTANT,
  USER_RECOVER_PASSWORD_DEFAULT_CONSTANT,

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_CHANGE_REQUEST,
  USER_CHANGE_SUCCESS,
  USER_CHANGE_FAIL,
} from "../constants/userConstants";







// export const userLoginReducer = (state = {}, action = {}) => {
//   switch (action.type) {
//     case USER_LOGIN_LOADING_CONSTANT:
//       return { userLoginLoadingReducer: true };

//     case USER_LOGIN_DATA_CONSTANT:
//       return {
//         userLoginLoadingReducer: false,
//         userLoginDataReducer: action.payload,
//       };

//     case USER_LOGIN_ERROR_CONSTANT:
//       return {
//         userLoginLoadingReducer: false,
//         userLoginErrorReducer: action.payload,
//       };

//     case USER_LOGIN_RESET_CONSTANT:
//       return { userLoginDataReducer: {} };

//     case USER_LOGIN_DEFAULT_CONSTANT:
//       return { userLoginDataReducer: {} };

//     case USER_LOGOUT_CONSTANT:
//       return { };

//     default:
//       return state;
//   }
// };

// export const userProfileReducer = (state = { userProfileDataReducer: {} }, action) => {
//   switch (action.type) {
//     case USER_PROFILE_LOADING_CONSTANT:
//       return { ...state, userProfileLoadingReducer: true };

//     case USER_PROFILE_DATA_CONSTANT:
//       return { userProfileLoadingReducer: false, userProfileDataReducer: action.payload };

//     case USER_PROFILE_ERROR_CONSTANT:
//       return { userProfileLoadingReducer: false, userProfileErrorReducer: action.payload };

//     case USER_PROFILE_RESET_CONSTANT:
//       return { userProfileDataReducer: {} };

//     case USER_PROFILE_DEFAULT_CONSTANT:
//       return { userProfileDataReducer: {} };

//     default:
//       return state;
//   }
// };

// export const userListReducer = (state = { users: [] }, action = null) => {
//   switch (action.type) {
//     case USER_LIST_LOADING_CONSTANT:
//       return { usersListLoadingReducer: true };

//     case USER_LIST_DATA_CONSTANT:
//       return {
//         usersListLoadingReducer: false,
//         usersListDataReducer: action.payload,
//       };

//     case USER_LIST_ERROR_CONSTANT:
//       return {
//         usersListLoadingReducer: false,
//         usersListErrorReducer: action.payload,
//       };

//     case USER_LIST_RESET_CONSTANT:
//       return { usersListDataReducer: [] };

//     case USER_LIST_DEFAULT_CONSTANT:
//       return { usersListDataReducer: [] };

//     default:
//       return state;
//   }
// };



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
      return { usersListDataReducer: [] };

    case USER_LIST_DEFAULT_CONSTANT:
      return { usersListDataReducer: [] };

    default:
      return state;
  }
};

export const userChangeReducer = (state = {}, action = null) => {
  switch (action.type) {
    case USER_CHANGE_LOADING_CONSTANT:
      return { userChangeLoadingReducer: true };

    case USER_CHANGE_DATA_CONSTANT:
      return {
        userChangeLoadingReducer: false,
        userChangeDataReducer: action.payload,
      };

    case USER_CHANGE_ERROR_CONSTANT:
      return {
        userChangeLoadingReducer: false,
        userChangeErrorReducer: action.payload,
      };

    case USER_CHANGE_RESET_CONSTANT:
      return { userChangeDataReducer: [] };

    case USER_CHANGE_DEFAULT_CONSTANT:
      return { userChangeDataReducer: [] };

    default:
      return state;
  }
};

export const userRecoverPasswordReducer = (state = {}, action = null) => {
  switch (action.type) {
    case USER_RECOVER_PASSWORD_LOADING_CONSTANT:
      return { userRecoverPasswordLoadingReducer: true };

    case USER_RECOVER_PASSWORD_DATA_CONSTANT:
      return {
        userRecoverPasswordLoadingReducer: false,
        userRecoverPasswordDataReducer: action.payload,
      };

    case USER_RECOVER_PASSWORD_ERROR_CONSTANT:
      return {
        userRecoverPasswordLoadingReducer: false,
        userRecoverPasswordErrorReducer: action.payload,
      };

    case USER_RECOVER_PASSWORD_RESET_CONSTANT:
      return { userRecoverPasswordDataReducer: [] };

    case USER_RECOVER_PASSWORD_DEFAULT_CONSTANT:
      return { userRecoverPasswordDataReducer: [] };

    default:
      return state;
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const userLoginReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case USER_DETAILS_RESET:
      return { user: {} };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };

    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };

    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_RESET:
      return { user: {} };

    default:
      return state;
  }
};
