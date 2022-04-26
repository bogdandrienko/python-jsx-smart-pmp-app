// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constant from "./constant";
import * as util from "./util";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Captcha {
  // @ts-ignore
  static Check() {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: {},
          url: `/api/captcha/`,
          method: constant.HttpMethods.GET(),
          timeout: 10000,
          constant: constant.captchaCheckStore,
          authentication: false,
        })
      );
    };
  }
}

export class User {
  // @ts-ignore
  static Login({ form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: form,
          url: `/api/user/login/`,
          method: constant.HttpMethods.GET(),
          timeout: 10000,
          constant: constant.userLoginStore,
          authentication: false,
        })
      );
    };
  }
  // @ts-ignore
  static Logout() {
    // @ts-ignore
    return async function (dispatch) {
      try {
        localStorage.removeItem("userToken");
        dispatch({ type: constant.userLoginStore.reset });

        dispatch({ type: constant.captchaCheckStore.reset });
        dispatch({ type: constant.userDetailStore.reset });
        dispatch({ type: constant.userChangeStore.reset });
        dispatch({ type: constant.NotificationReadListStore.reset });
      } catch (error) {
        console.log(error);
      }
    };
  }
  // @ts-ignore
  static Read() {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: {},
          url: `/api/user/detail/`,
          method: constant.HttpMethods.GET(),
          timeout: 10000,
          constant: constant.userDetailStore,
          authentication: true,
        })
      );
    };
  }
  // @ts-ignore
  static ReadList() {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: {},
          url: `/api/user/`,
          method: constant.HttpMethods.GET(),
          timeout: 10000,
          constant: constant.UsersReadListStore,
          authentication: true,
        })
      );
    };
  }
  // @ts-ignore
  static Update({ form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: form,
          url: `/api/user/password/change/`,
          method: constant.HttpMethods.POST(),
          timeout: 10000,
          constant: constant.userChangeStore,
          authentication: true,
        })
      );
    };
  }
}

export class Notification {
  // @ts-ignore
  static Create({ form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: form,
          url: `/api/notification/`,
          method: constant.HttpMethods.POST(),
          timeout: 10000,
          constant: constant.NotificationCreateStore,
          authentication: true,
        })
      );
    };
  }
  // @ts-ignore
  static ReadList({ form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: form,
          url: `/api/notification/`,
          method: constant.HttpMethods.GET(),
          timeout: 10000,
          constant: constant.NotificationReadListStore,
          authentication: true,
        })
      );
    };
  }
  // @ts-ignore
  static Delete({ notification_id }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: form,
          url: `/api/notification/${notification_id}/`,
          method: constant.HttpMethods.DELETE(),
          timeout: 10000,
          constant: constant.NotificationDeleteStore,
          authentication: true,
        })
      );
    };
  }
}

export class Salary {
  // @ts-ignore
  static Read({ form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: form,
          url: `/api/salary/`,
          method: constant.HttpMethods.GET(),
          timeout: 10000,
          constant: constant.SalaryReadStore,
          authentication: true,
        })
      );
    };
  }
}

export class Vacation {
  // @ts-ignore
  static Read({ form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: form,
          url: `/api/vacation/`,
          method: constant.HttpMethods.GET(),
          timeout: 10000,
          constant: constant.VacationReadStore,
          authentication: true,
        })
      );
    };
  }
}

export class Idea {
  // @ts-ignore
  static Create({ form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: form,
          url: `/api/idea/`,
          method: constant.HttpMethods.POST(),
          timeout: 10000,
          constant: constant.IdeaCreateStore,
          authentication: true,
        })
      );
    };
  }
  // @ts-ignore
  static Read({ idea_id }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: form,
          url: `/api/idea/${idea_id}/`,
          method: constant.HttpMethods.GET(),
          timeout: 10000,
          constant: constant.IdeaReadStore,
          authentication: true,
        })
      );
    };
  }
  // @ts-ignore
  static ReadList({ form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: form,
          url: `/api/idea/`,
          method: constant.HttpMethods.GET(),
          timeout: 10000,
          constant: constant.IdeaReadListStore,
          authentication: true,
        })
      );
    };
  }
  // @ts-ignore
  static Update({ idea_id, form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: form,
          url: `/api/idea/${idea_id}/`,
          method: constant.HttpMethods.PUT(),
          timeout: 10000,
          constant: constant.IdeaUpdateStore,
          authentication: true,
        })
      );
    };
  }
}

export class IdeaComment {
  // @ts-ignore
  static Create({ idea_id, form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: form,
          url: `/api/idea/${idea_id}/comment/`,
          method: constant.HttpMethods.POST(),
          timeout: 10000,
          constant: constant.IdeaCommentCreateStore,
          authentication: true,
        })
      );
    };
  }
  // @ts-ignore
  static ReadList({ idea_id, form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: form,
          url: `/api/idea/${idea_id}/comment/`,
          method: constant.HttpMethods.GET(),
          timeout: 10000,
          constant: constant.IdeaCommentReadListStore,
          authentication: true,
        })
      );
    };
  }
  // @ts-ignore
  static Delete({ comment_id }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: form,
          url: `/api/idea/comment/${comment_id}/`,
          method: constant.HttpMethods.DELETE(),
          timeout: 10000,
          constant: constant.IdeaCommentDeleteStore,
          authentication: true,
        })
      );
    };
  }
}

export class IdeaRating {
  // @ts-ignore
  static Create({ idea_id, form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          // @ts-ignore
          form: form,
          url: `/api/idea/${idea_id}/rating/`,
          method: constant.HttpMethods.POST(),
          timeout: 10000,
          constant: constant.IdeaRatingCreateStore,
          authentication: true,
        })
      );
    };
  }
  // @ts-ignore
  static ReadList({ idea_id, form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: form,
          url: `/api/idea/${idea_id}/rating/`,
          method: constant.HttpMethods.GET(),
          timeout: 10000,
          constant: constant.IdeaRatingReadListStore,
          authentication: true,
        })
      );
    };
  }
}

export class Post {
  // @ts-ignore
  static PostCreateAction(constant, post) {
    // @ts-ignore
    return async function (dispatch, getState) {
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
  static PostReadListAction(constant, page, limit) {
    // @ts-ignore
    return async function (dispatch, getState) {
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
    // @ts-ignore
    return async function (dispatch, getState) {
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
    // @ts-ignore
    return async function (dispatch, getState) {
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
