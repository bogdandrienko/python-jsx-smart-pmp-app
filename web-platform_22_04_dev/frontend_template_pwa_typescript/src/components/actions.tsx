import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constants from "./constants";

// TODO profile ////////////////////////////////////////////////////////////////////////////////////////////////////////

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
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
  static IdeaReadListAction(constant, page, limit) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.get("/api/idea/", {
          params: {
            page: page,
            limit: limit,
          },
        });
        if (data.response) {
          const response = data.response;
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
  static IdeaReadAction(constant, id) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.get(`/api/idea/${id}/`);
        if (data.response) {
          const response = data.response;
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
  static CreateAction(constant, id, form) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const formData = new FormData();
        Object.entries(form).map(([key, value]) => {
          // @ts-ignore
          formData.append(key, value);
        });
        const { data } = await axios.post(
          `/api/idea/${id}/comment/`,
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        if (data.response) {
          const response = data.response;
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
  static ReadListAction(constant, id, page, limit) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.get(`/api/idea/${id}/comment/`, {
          params: {
            page: page,
            limit: limit,
          },
        });
        if (data.response) {
          const response = data.response;
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 3000);
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
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
  static CreateAction(constant, id, form) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const formData = new FormData();
        Object.entries(form).map(([key, value]) => {
          // @ts-ignore
          formData.append(key, value);
        });
        const { data } = await axios.post(`/api/idea/${id}/rating/`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        if (data.response) {
          const response = data.response;
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
  static ReadListAction(constant, id, page, limit) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.get(`/api/idea/${id}/rating/`, {
          params: {
            page: page,
            limit: limit,
          },
        });
        if (data.response) {
          const response = data.response;
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 3000);
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
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const formData = new FormData();
        Object.entries(form).map(([key, value]) => {
          // @ts-ignore
          formData.append(key, value);
        });
        const { data } = await axios.post(`/api/notification/`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        if (data.response) {
          const response = data.response;
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
  static ReadListAction(constant, page, limit) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.get(`/api/notification/`, {
          params: {
            page: page,
            limit: limit,
          },
        });
        if (data.response) {
          const response = data.response;
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 3000);
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
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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

export class User {
  // @ts-ignore
  static UserLoginAction(constant) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const { data } = await axios.get(
          "/api/user/login/?username=000000000000&password=31284bogdan"
        );
        if (data.response) {
          const response = data.response;
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
  static UserDetailAction(constant) {
    // @ts-ignore
    return async function (dispatch, getState) {
      try {
        dispatch({
          type: constant.load,
        });
        const {
          userLoginStore: { data: userLogin },
        } = getState();
        const { data } = await axios.get(`/api/user/detail/`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userLogin.token}`,
          },
        });
        if (data.response) {
          const response = data.response;
          setTimeout(() => {
            dispatch({
              type: constant.data,
              payload: response,
            });
          }, 1000);
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
// @ts-ignore
export const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("userToken");
  // @ts-ignore
  dispatch({ type: constants.PostReadListStore.reset });
  dispatch({ type: constants.PostReadStore.reset });
};

export class Services {
  static async getAll(limit = 10, page = 1) {
    // const response = await axios.get("/api/any/post/", {
    //   params: {
    //     page: page,
    //     limit: limit,
    //   },
    // });
    const response = await axios.get("/api/post/", {
      params: {
        page: page,
        limit: limit,
      },
    });
    console.log("getAll: ", response.data);
    return response;
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
