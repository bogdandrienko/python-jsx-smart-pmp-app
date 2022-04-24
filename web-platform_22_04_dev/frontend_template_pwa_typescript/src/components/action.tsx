// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constant from "./constant";
import { AxiosConfigConstructor } from "./util";
import * as util from "./util";
import {
  NotificationReadListStore,
  userChangeStore,
  userDetailStore,
} from "./constant";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Captcha {
  // @ts-ignore
  static CheckAccess({}) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: {
            "Action-Type": "captchaCheckStore",
          },
          url: `/api/captcha/`,
          method: "GET",
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
  static UserLoginAction({ username = "", password = "" }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: {
            "Action-Type": "userLoginStore",
            username: username,
            password: password,
          },
          url: `/api/user/login/?username=${username}&password=${password}`,
          method: "GET",
          timeout: 10000,
          constant: constant.userLoginStore,
          authentication: false,
        })
      );
    };
  }
  // @ts-ignore
  static UserLogoutAction({}) {
    // @ts-ignore
    return async function (dispatch) {
      try {
        localStorage.removeItem("userToken");
        // @ts-ignore
        dispatch({ type: constant.captchaCheckStore.reset });
        dispatch({ type: constant.userLoginStore.reset });
        dispatch({ type: constant.userDetailStore.reset });
        dispatch({ type: constant.userChangeStore.reset });
        dispatch({ type: constant.NotificationReadListStore.reset });
      } catch (error) {
        console.log(error);
      }
    };
  }
  // @ts-ignore
  static UserDetailAction({}) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: {
            "Action-Type": "userDetailStore",
          },
          url: `/api/user/detail/`,
          method: "GET",
          timeout: 10000,
          constant: constant.userDetailStore,
          authentication: true,
        })
      );
    };
  }
  // @ts-ignore
  static ChangeAction({ form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: {
            "Action-Type": "userChangeStore",
            ...form,
          },
          url: `/api/user/password/change/`,
          method: "POST",
          timeout: 10000,
          constant: constant.userChangeStore,
          authentication: true,
        })
      );
    };
  }
}

export class Users {
  // @ts-ignore
  static UserReadListAction(constant, page, limit) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.get("/api/user/");
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

export class Notification {
  // @ts-ignore
  static CreateAction(constant, form) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: {
            "Action-Type": "NotificationCreateStore",
            ...form,
          },
          url: `/api/notification/`,
          method: "POST",
          timeout: 10000,
          constant: constant.NotificationCreateStore,
          authentication: true,
        })
      );
    };
  }

  // @ts-ignore
  static ReadListAction({ limit, page }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: {
            "Action-Type": "NotificationReadListStore",
            ...{},
          },
          url: `/api/notification/?limit=${limit}&page=${page}`,
          method: "GET",
          timeout: 10000,
          constant: constant.NotificationReadListStore,
          authentication: true,
        })
      );
    };
  }

  // @ts-ignore
  static ReadAction(constant, id) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.get(`/api/idea/${id}/`);
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
  static DeleteAction(constant, id) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.delete(`/api/idea/${id}/`);
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

export class Idea {
  // @ts-ignore
  static IdeaCreateAction(constant, post) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const formData = new FormData();
        Object.entries(post).map(([key, value]) => {
          // @ts-ignore
          formData.append(key, value);
        });
        const { data } = await axios.post(`/api/idea/`, formData, {
          headers: {
            "content-type": "multipart/form-data",
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
  static IdeaReadListAction({ page, limit }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: {
            "Action-Type": "IdeaReadListStore",
            ...{},
          },
          url: `/api/idea/?limit=${limit}&page=${page}`,
          method: "GET",
          timeout: 10000,
          constant: constant.IdeaReadListStore,
          authentication: true,
        })
      );
    };
  }

  // @ts-ignore
  static IdeaReadAction({ id }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: {
            "Action-Type": "IdeaReadStore",
            ...{},
          },
          url: `/api/idea/${id}/`,
          method: "GET",
          timeout: 10000,
          constant: constant.IdeaReadStore,
          authentication: true,
        })
      );
    };
  }

  // @ts-ignore
  static IdeaDeleteAction(constant, id) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.delete(`/api/idea/${id}/`);
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

export class IdeaComment {
  // @ts-ignore
  static CreateAction({ id, form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: {
            "Action-Type": "IdeaCommentCreateStore",
            ...form,
          },
          url: `/api/idea/${id}/comment/`,
          method: "POST",
          timeout: 10000,
          constant: constant.IdeaCommentCreateStore,
          authentication: true,
        })
      );
    };
  }

  // @ts-ignore
  static ReadListAction({ id, limit, page }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: {
            "Action-Type": "IdeaCommentReadListStore",
            ...{},
          },
          url: `/api/idea/${id}/comment/?limit=${limit}&page=${page}`,
          method: "GET",
          timeout: 10000,
          constant: constant.IdeaCommentReadListStore,
          authentication: true,
        })
      );
    };
  }

  // @ts-ignore
  static async getAllComments({ id: id, limit: limit, page: page }) {
    const response = await axios.get(`/api/idea/${id}/comment/`, {
      params: {
        limit: limit,
        page: page,
      },
    });
    return response.data.response;
  }

  // @ts-ignore
  static ReadAction(constant, id) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.get(`/api/idea/${id}/`);
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
  static DeleteAction(constant, id) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.delete(`/api/idea/${id}/`);
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

export class IdeaRating {
  // @ts-ignore
  static CreateAction({ id, form }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: {
            "Action-Type": "IdeaCommentCreateStore",
            ...form,
          },
          url: `/api/idea/${id}/rating/`,
          method: "POST",
          timeout: 10000,
          constant: constant.IdeaCommentCreateStore,
          authentication: true,
        })
      );
    };
  }

  // @ts-ignore
  static ReadListAction({ id, limit, page }) {
    // @ts-ignore
    return async function (dispatch) {
      dispatch(
        util.ActionConstructor1({
          form: {
            "Action-Type": "IdeaRatingReadListStore",
            ...{},
          },
          url: `/api/idea/${id}/rating/?limit=${limit}&page=${page}`,
          method: "GET",
          timeout: 10000,
          constant: constant.IdeaRatingReadListStore,
          authentication: true,
        })
      );
    };
  }

  // @ts-ignore
  static ReadAction(constant, id) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.get(`/api/idea/${id}/`);
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
  static DeleteAction(constant, id) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.delete(`/api/idea/${id}/`);
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
