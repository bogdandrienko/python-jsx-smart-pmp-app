import {
  USER_SALARY_LOADING_CONSTANT,
  USER_SALARY_DATA_CONSTANT,
  USER_SALARY_ERROR_CONSTANT,
  USER_SALARY_RESET_CONSTANT,
  USER_SALARY_DEFAULT_CONSTANT,
} from "../constants/salaryConstants";

export const salaryUserReducer = (state = {}, action = null) => {
  switch (action.type) {
    case USER_SALARY_LOADING_CONSTANT:
      return { salaryUserLoadingReducer: true };

    case USER_SALARY_DATA_CONSTANT:
      return {
        salaryUserLoadingReducer: false,
        salaryUserDataReducer: action.payload,
      };

    case USER_SALARY_ERROR_CONSTANT:
      return {
        salaryUserLoadingReducer: false,
        salaryUserErrorReducer: action.payload,
      };

    case USER_SALARY_RESET_CONSTANT:
      return { salaryUserDataReducer: {} };

    case USER_SALARY_DEFAULT_CONSTANT:
      return { salaryUserDataReducer: {} };

    default:
      return state;
  }
};
