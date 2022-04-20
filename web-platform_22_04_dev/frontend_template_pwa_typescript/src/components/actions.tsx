import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constants from "./constants";

// TODO profile ////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
export const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("userToken");
  // @ts-ignore
  dispatch({ type: constants.PostGetListStore.reset });
  dispatch({ type: constants.PostGetOneStore.reset });
};

// @ts-ignore
export function GetPostListAction(constant, page, limit) {
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
export function GetPostAction(constant, id) {
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
export function PostCreateAction(constant, post) {
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
