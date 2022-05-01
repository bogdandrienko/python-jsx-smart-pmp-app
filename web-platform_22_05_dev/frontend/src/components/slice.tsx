// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import { Dispatch } from "redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constant from "./constant";
import * as util from "./util";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reducers = {};

export function connectReducer(name: string, reducer: object) {
  // @ts-ignore
  reducers[name] = reducer;
}

// TODO main ///////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rating = {
  ratingsListStore: util.ConstructorSlice1(
    "ratingsListStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/user/rating/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("ratingsListStore"),
            true
          )
        );
      };
    }
  ),
};

// TODO profile ////////////////////////////////////////////////////////////////////////////////////////////////////////

export const captcha = {
  captchaCheckStore: util.ConstructorSlice1(
    "captchaCheckStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/captcha/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("captchaCheckStore"),
            false
          )
        );
      };
    }
  ),
};

export const user = {
  userLoginStore: util.ConstructorSlice1(
    "userLoginStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/user/login/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("userLoginStore"),
            false
          )
        );
      };
    }
  ),
  userDetailStore: util.ConstructorSlice1(
    "userDetailStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/user/detail/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("userDetailStore"),
            true
          )
        );
      };
    }
  ),
  userReadListStore: util.ConstructorSlice1(
    "userReadListStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/user/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("userReadListStore"),
            true
          )
        );
      };
    }
  ),
  userPasswordUpdateStore: util.ConstructorSlice1(
    "userPasswordUpdateStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/user/password/change/`,
            constant.HttpMethods.PUT(),
            20000,
            util.ConstantConstructor1("userPasswordUpdateStore"),
            true
          )
        );
      };
    }
  ),
  userRecoverPasswordStore: util.ConstructorSlice1(
    "userRecoverPasswordStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/user/recover/`,
            constant.HttpMethods.POST(),
            20000,
            util.ConstantConstructor1("userRecoverPasswordStore"),
            false
          )
        );
      };
    }
  ),
  userRecoverPasswordSendEmailStore: util.ConstructorSlice1(
    "userRecoverPasswordSendEmailStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/user/recover/email/`,
            constant.HttpMethods.POST(),
            20000,
            util.ConstantConstructor1("userRecoverPasswordSendEmailStore"),
            false
          )
        );
      };
    }
  ),
  userRecoverPasswordChangePasswordStore: util.ConstructorSlice1(
    "userRecoverPasswordChangePasswordStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/user/recover/password/`,
            constant.HttpMethods.POST(),
            20000,
            util.ConstantConstructor1("userRecoverPasswordChangePasswordStore"),
            false
          )
        );
      };
    }
  ),
};

export const notification = {
  notificationCreateStore: util.ConstructorSlice1(
    "notificationCreateStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/notification/`,
            constant.HttpMethods.POST(),
            20000,
            util.ConstantConstructor1("notificationCreateStore"),
            true
          )
        );
      };
    }
  ),
  notificationReadListStore: util.ConstructorSlice1(
    "notificationReadListStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/notification/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("notificationReadListStore"),
            true
          )
        );
      };
    }
  ),
  notificationUpdateStore: util.ConstructorSlice1(
    "notificationUpdateStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/notification/${args.notification_id}/`,
            constant.HttpMethods.PUT(),
            20000,
            util.ConstantConstructor1("notificationUpdateStore"),
            true
          )
        );
      };
    }
  ),
};

// TODO progress ///////////////////////////////////////////////////////////////////////////////////////////////////////

export const idea = {
  ideaCreateStore: util.ConstructorSlice1(
    "ideaCreateStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/idea/`,
            constant.HttpMethods.POST(),
            20000,
            util.ConstantConstructor1("ideaCreateStore"),
            true
          )
        );
      };
    }
  ),
  ideaReadStore: util.ConstructorSlice1(
    "ideaReadStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/idea/${args.idea_id}/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("ideaReadStore"),
            true
          )
        );
      };
    }
  ),
  ideaReadListStore: util.ConstructorSlice1(
    "ideaReadListStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/idea/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("ideaReadListStore"),
            true
          )
        );
      };
    }
  ),
  ideaUpdateStore: util.ConstructorSlice1(
    "ideaUpdateStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/idea/${args.idea_id}/`,
            constant.HttpMethods.PUT(),
            20000,
            util.ConstantConstructor1("ideaUpdateStore"),
            true
          )
        );
      };
    }
  ),
  userReadListStore: util.ConstructorSlice1(
    "userReadListStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/user/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("userReadListStore"),
            true
          )
        );
      };
    }
  ),
};

export const ideaComment = {
  ideaCommentCreateStore: util.ConstructorSlice1(
    "ideaCommentCreateStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/idea/${args.idea_id}/comment/`,
            constant.HttpMethods.POST(),
            20000,
            util.ConstantConstructor1("ideaCommentCreateStore"),
            true
          )
        );
      };
    }
  ),
  ideaCommentReadListStore: util.ConstructorSlice1(
    "ideaCommentReadListStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/idea/${args.idea_id}/comment/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("ideaCommentReadListStore"),
            true
          )
        );
      };
    }
  ),
  ideaCommentDeleteStore: util.ConstructorSlice1(
    "ideaCommentDeleteStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/idea/comment/${args.comment_id}/`,
            constant.HttpMethods.DELETE(),
            20000,
            util.ConstantConstructor1("ideaCommentDeleteStore"),
            true
          )
        );
      };
    }
  ),
};

export const ideaRating = {
  ideaRatingReadListStore: util.ConstructorSlice1(
    "ideaRatingReadListStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/idea/${args.idea_id}/rating/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("ideaRatingReadListStore"),
            true
          )
        );
      };
    }
  ),
  ideaRatingUpdateStore: util.ConstructorSlice1(
    "ideaRatingUpdateStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/idea/${args.idea_id}/rating/`,
            constant.HttpMethods.PUT(),
            20000,
            util.ConstantConstructor1("ideaRatingUpdateStore"),
            true
          )
        );
      };
    }
  ),
};

// TODO buh ////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const salary = {
  salaryReadStore: util.ConstructorSlice1(
    "salaryReadStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/salary/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("salaryReadStore"),
            true
          )
        );
      };
    }
  ),
};

// TODO sup ////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const vacation = {
  vacationReadStore: util.ConstructorSlice1(
    "vacationReadStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/vacation/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("vacationReadStore"),
            true
          )
        );
      };
    }
  ),
};

// TODO moderator //////////////////////////////////////////////////////////////////////////////////////////////////////

export const moderator = {
  adminExportUsersStore: util.ConstructorSlice1(
    "adminExportUsersStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/admin/export/users/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("adminExportUsersStore"),
            true
          )
        );
      };
    }
  ),
  terminalRebootStore: util.ConstructorSlice1(
    "terminalRebootStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/admin/terminal/reboot/`,
            constant.HttpMethods.POST(),
            20000,
            util.ConstantConstructor1("terminalRebootStore"),
            true
          )
        );
      };
    }
  ),
  adminCreateUsersStore: util.ConstructorSlice1(
    "adminCreateUsersStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/admin/create/users/`,
            constant.HttpMethods.POST(),
            20000,
            util.ConstantConstructor1("adminCreateUsersStore"),
            true
          )
        );
      };
    }
  ),
  adminCheckUserStore: util.ConstructorSlice1(
    "adminCheckUserStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/admin/recover_password/`,
            constant.HttpMethods.GET(),
            20000,
            util.ConstantConstructor1("adminCheckUserStore"),
            true
          )
        );
      };
    }
  ),
  adminChangePasswordUserStore: util.ConstructorSlice1(
    "adminChangePasswordUserStore",
    connectReducer,
    function ({ ...args }) {
      return async function (dispatch: Dispatch<any>) {
        dispatch(
          util.ConstructorAction1(
            { ...args.form },
            `/api/admin/recover_password/`,
            constant.HttpMethods.POST(),
            20000,
            util.ConstantConstructor1("adminChangePasswordUserStore"),
            true
          )
        );
      };
    }
  ),
};

// TODO develop ////////////////////////////////////////////////////////////////////////////////////////////////////////

export const captchaExampleStore = util.ConstantConstructor1(
  "captchaExampleStore"
);

export const captchaExampleReducer =
  util.ConstructorReducer1(captchaExampleStore);

// @ts-ignore
connectReducer("captchaExampleStore", captchaExampleReducer);

export function CaptchaAction(id: number, form: object) {
  return async function (dispatch: Dispatch<any>) {
    dispatch(
      util.ConstructorAction1(
        { ...form },
        `/api/captcha/${id}/`,
        constant.HttpMethods.GET(),
        20000,
        captchaExampleStore,
        false
      )
    );
  };
}
