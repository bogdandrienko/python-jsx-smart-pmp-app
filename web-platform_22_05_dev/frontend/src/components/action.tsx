// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import axios from "axios";
import { Dispatch } from "redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constant from "./constant";
import * as util from "./util";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export class User {
  static Login(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/user/login/`,
          constant.HttpMethods.GET(),
          20000,
          constant.userLoginStore,
          false
        )
      );
    };
  }
  static Logout() {
    return async function (dispatch: Dispatch<any>) {
      try {
        localStorage.removeItem("userToken");
        dispatch({ type: constant.userLoginStore.reset });

        dispatch({ type: constant.captchaCheckStore.reset });
        dispatch({ type: constant.userDetailStore.reset });
        dispatch({ type: constant.userPasswordUpdateStore.reset });
        dispatch({ type: constant.NotificationReadListStore.reset });

        dispatch({ type: constant.userRecoverPasswordStore.reset });
        dispatch({ type: constant.userRecoverPasswordSendEmailStore.reset });
        dispatch({
          type: constant.userRecoverPasswordChangePasswordStore.reset,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
  static Read() {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          {},
          `/api/user/detail/`,
          constant.HttpMethods.GET(),
          20000,
          constant.userDetailStore,
          true
        )
      );
    };
  }
  static ReadList() {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          {},
          `/api/user/`,
          constant.HttpMethods.GET(),
          20000,
          constant.userReadListStore,
          true
        )
      );
    };
  }
  static ReadTopList(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/user/rating/`,
          constant.HttpMethods.GET(),
          20000,
          constant.ratingsListStore,
          true
        )
      );
    };
  }
  static Update(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/user/password/change/`,
          constant.HttpMethods.POST(),
          20000,
          constant.userPasswordUpdateStore,
          true
        )
      );
    };
  }
  static Recover(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/user/recover/`,
          constant.HttpMethods.POST(),
          20000,
          constant.userRecoverPasswordStore,
          false
        )
      );
    };
  }
  static RecoverSendEmail(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/user/recover/email/`,
          constant.HttpMethods.POST(),
          20000,
          constant.userRecoverPasswordSendEmailStore,
          false
        )
      );
    };
  }
  static RecoverChangePassword(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/user/recover/password/`,
          constant.HttpMethods.POST(),
          20000,
          constant.userRecoverPasswordChangePasswordStore,
          false
        )
      );
    };
  }
}

export class Admin {
  static ExportUsers() {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          {},
          `/api/admin/export/users/`,
          constant.HttpMethods.GET(),
          20000,
          constant.adminExportUsersStore,
          true
        )
      );
    };
  }
  static RebootTerminal(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/admin/terminal/reboot/`,
          constant.HttpMethods.POST(),
          20000,
          constant.terminalRebootStore,
          true
        )
      );
    };
  }
  static CreateUsers(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/admin/create/users/`,
          constant.HttpMethods.POST(),
          10000000,
          constant.adminCreateUsersStore,
          true
        )
      );
    };
  }
  static CheckUser(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/admin/recover_password/`,
          constant.HttpMethods.GET(),
          20000,
          constant.adminCheckUserStore,
          true
        )
      );
    };
  }
  static ChangeUserPassword(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/admin/recover_password/`,
          constant.HttpMethods.POST(),
          20000,
          constant.adminChangePasswordUserStore,
          true
        )
      );
    };
  }
}

export class Notification {
  static Create(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/notification/`,
          constant.HttpMethods.POST(),
          20000,
          constant.NotificationCreateStore,
          true
        )
      );
    };
  }
  static ReadList(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/notification/`,
          constant.HttpMethods.GET(),
          20000,
          constant.NotificationReadListStore,
          true
        )
      );
    };
  }
  static Delete(notification_id: number) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          {},
          `/api/notification/${notification_id}/`,
          constant.HttpMethods.DELETE(),
          20000,
          constant.NotificationDeleteStore,
          true
        )
      );
    };
  }
}

// TODO clear //////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Captcha {
  // @ts-ignore
  static Check() {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          {},
          `/api/captcha/`,
          constant.HttpMethods.GET(),
          20000,
          constant.captchaCheckStore,
          false
        )
      );
    };
  }
}

// paste here

export class Salary {
  static Read(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/salary/`,
          constant.HttpMethods.GET(),
          30000,
          constant.SalaryReadStore,
          true
        )
      );
    };
  }
}

export class Vacation {
  static Read(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/vacation/`,
          constant.HttpMethods.GET(),
          30000,
          constant.VacationReadStore,
          true
        )
      );
    };
  }
}

export class Idea {
  static Create(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/idea/`,
          constant.HttpMethods.POST(),
          20000,
          constant.IdeaCreateStore,
          true
        )
      );
    };
  }
  static Read(idea_id: number) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          {},
          `/api/idea/${idea_id}/`,
          constant.HttpMethods.GET(),
          20000,
          constant.IdeaReadStore,
          true
        )
      );
    };
  }
  static ReadList(form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/idea/`,
          constant.HttpMethods.GET(),
          20000,
          constant.IdeaReadListStore,
          true
        )
      );
    };
  }
  static Update(idea_id: number, form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/idea/${idea_id}/`,
          constant.HttpMethods.PUT(),
          20000,
          constant.IdeaUpdateStore,
          true
        )
      );
    };
  }
}

export class IdeaComment {
  static Create(idea_id: number, form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/idea/${idea_id}/comment/`,
          constant.HttpMethods.POST(),
          20000,
          constant.IdeaCommentCreateStore,
          true
        )
      );
    };
  }
  static ReadList(idea_id: number, form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/idea/${idea_id}/comment/`,
          constant.HttpMethods.GET(),
          20000,
          constant.IdeaCommentReadListStore,
          true
        )
      );
    };
  }
  static Delete(comment_id: number) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          {},
          `/api/idea/comment/${comment_id}/`,
          constant.HttpMethods.DELETE(),
          20000,
          constant.IdeaCommentDeleteStore,
          true
        )
      );
    };
  }
}

export class IdeaRating {
  static Create(idea_id: number, form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/idea/${idea_id}/rating/`,
          constant.HttpMethods.POST(),
          20000,
          constant.IdeaRatingCreateStore,
          true
        )
      );
    };
  }
  static RedList(idea_id: number, form: object) {
    return async function (dispatch: Dispatch<any>) {
      dispatch(
        util.ActionConstructor1(
          form,
          `/api/idea/${idea_id}/rating/`,
          constant.HttpMethods.GET(),
          20000,
          constant.IdeaRatingReadListStore,
          true
        )
      );
    };
  }
}

// TODO dirty //////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Post {
  // @ts-ignore
  static PostCreateAction(constant, post) {
    return async function (dispatch: Dispatch<any>) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.post(`/api/post/`, post);
        if (data.response) {
          const response = data.response;
          dispatch({
            type: constant.data,
            payload: response,
          });
        } else {
          const response = data.error;
          dispatch({
            type: constant.error,
            payload: response,
          });
        }
      } catch (error) {
        dispatch({
          type: constant.fail,
          payload: error,
        });
      }
    };
  }

  // @ts-ignore
  static PostGetListAction(constant, page, limit) {
    return async function (dispatch: Dispatch<any>) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.get("/api/post/", {
          params: {
            page: page,
            limit: limit,
          },
        });
        if (data.response) {
          const response = data.response;
          dispatch({
            type: constant.data,
            payload: response,
          });
        } else {
          const response = data.error;
          dispatch({
            type: constant.error,
            payload: response,
          });
        }
      } catch (error) {
        dispatch({
          type: constant.fail,
          payload: error,
        });
      }
    };
  }

  // @ts-ignore
  static PostReadAction(constant, id) {
    return async function (dispatch: Dispatch<any>) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.get(`/api/post/${id}/`);
        if (data.response) {
          const response = data.response;
          dispatch({
            type: constant.data,
            payload: response,
          });
        } else {
          const response = data.error;
          dispatch({
            type: constant.error,
            payload: response,
          });
        }
      } catch (error) {
        dispatch({
          type: constant.fail,
          payload: error,
        });
      }
    };
  }

  // @ts-ignore
  static PostDeleteAction(constant, id) {
    return async function (dispatch: Dispatch<any>) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.delete(`/api/post/${id}/`);
        if (data.response) {
          const response = data.response;
          dispatch({
            type: constant.data,
            payload: response,
          });
        } else {
          const response = data.error;
          dispatch({
            type: constant.error,
            payload: response,
          });
        }
      } catch (error) {
        dispatch({
          type: constant.fail,
          payload: error,
        });
      }
    };
  }
}

export class Services {
  static async getAll(limit = 10, page = 1) {
    const response = await axios.get("/api/any/post/", {
      params: {
        page: page,
        limit: limit,
      },
    });
    // const response = await axios.get("/api/post/", {
    //   params: {
    //     page: page,
    //     limit: limit,
    //   },
    // });
    console.log("getAll: ", response.data);
    return response;
  }
  static async getAllComments(id = 1, limit = 10, page = 1) {
    const response = await axios.get(`/api/idea/${id}/comment/`, {
      params: {
        limit: limit,
        page: page,
      },
    });
    return response.data.response;
  }
  // @ts-ignore
  static async getById(id) {
    // const response = await axios.get(`/api/any/post/${id}/`);
    const response = await axios.get(`/api/post/${id}/`);
    console.log("getById: ", response.data);
    return response;
  }
  // @ts-ignore
  static async getCommentById(id) {
    const response = await axios.get(`/api/any/post/${id}/comments/`);
    console.log("getCommentById: ", response.data);
    return response;
  }
  // @ts-ignore
  static async createPost(post) {
    const response = await axios.post(`/api/post/`, post);
    console.log("createPost: ", response.data);
    return response;
  }
  // @ts-ignore
  static async removePost(id) {
    const response = await axios.delete(`/api/post/${id}/`);
    console.log("createPost: ", response.data);
    return response;
  }
}
