// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constants from "./constants";

// TODO profile ////////////////////////////////////////////////////////////////////////////////////////////////////////

export const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("userToken");
  dispatch({ type: constants.USER_LOGIN.reset });
  dispatch({ type: constants.USER_DETAIL.reset });
  dispatch({ type: constants.USER_CHANGE.reset });
  dispatch({ type: constants.USER_RECOVER.reset });
  dispatch({ type: constants.NOTIFICATION_LIST.reset });
  dispatch({ type: constants.USER_SALARY.reset });
  dispatch({ type: constants.USER_VACATION.reset });
};
