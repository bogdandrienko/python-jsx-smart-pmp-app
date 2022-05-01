// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import { Dispatch } from "redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as slice from "./slice";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export class user {
  static logout() {
    return async function (dispatch: Dispatch<any>) {
      try {
        localStorage.removeItem("userToken");
        dispatch({ type: slice.user.userLoginStore.constant.reset });
        dispatch({ type: slice.user.userDetailStore.constant.reset });

        dispatch({ type: slice.captcha.captchaCheckStore.constant.reset });

        dispatch({
          type: slice.notification.notificationReadListStore.constant.reset,
        });

        dispatch({
          type: slice.user.userPasswordUpdateStore.constant.reset,
        });
        dispatch({
          type: slice.user.userRecoverPasswordSendEmailStore.constant.reset,
        });
        dispatch({
          type: slice.user.userRecoverPasswordChangePasswordStore.constant
            .reset,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
}
