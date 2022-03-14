import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as constants from "./constants";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const userLoginAnyAction = (form) => async (dispatch) => {
  try {
    dispatch({
      type: constants.USER_LOGIN_LOAD_CONSTANT,
    });
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/any/user/login/",
      method: "POST",
      timeout: 5000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.USER_LOGIN_DATA_CONSTANT,
        payload: response,
      });
      localStorage.setItem("userToken", JSON.stringify(response));
      dispatch({ type: constants.USER_DETAILS_RESET_CONSTANT });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.USER_LOGIN_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_LOGIN_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userLogoutAction = () => (dispatch) => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userToken");
  dispatch({ type: constants.USER_LOGIN_RESET_CONSTANT });
  dispatch({ type: constants.USER_DETAILS_RESET_CONSTANT });
  dispatch({ type: constants.USER_CHANGE_RESET_CONSTANT });
  dispatch({ type: constants.USER_RECOVER_PASSWORD_RESET_CONSTANT });
  dispatch({ type: constants.USER_SALARY_RESET_CONSTANT });
};

export const userDetailsAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_DETAILS_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/user/detail/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.USER_DETAILS_DATA_CONSTANT,
        payload: response,
      });
      dispatch({ type: constants.USER_CHANGE_RESET_CONSTANT });
      dispatch({ type: constants.USER_RECOVER_PASSWORD_RESET_CONSTANT });
      dispatch({ type: constants.USER_SALARY_RESET_CONSTANT });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.USER_DETAILS_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.statusText &&
      error.response.statusText === "Unauthorized"
    ) {
      dispatch(userLogoutAction());
      console.log("logout");
    }
    dispatch({
      type: constants.USER_DETAILS_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userChangeAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_CHANGE_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/user/change/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.USER_CHANGE_DATA_CONSTANT,
        payload: response,
      });
      dispatch({ type: constants.USER_DETAILS_RESET_CONSTANT });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.USER_CHANGE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_CHANGE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userRecoverPasswordAnyAction = (form) => async (dispatch) => {
  try {
    dispatch({
      type: constants.USER_RECOVER_PASSWORD_LOAD_CONSTANT,
    });
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/any/user/recover/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.USER_RECOVER_PASSWORD_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.USER_RECOVER_PASSWORD_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_RECOVER_PASSWORD_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const userListAllAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_LIST_ALL_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/user/list_all/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.USER_LIST_ALL_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.USER_LIST_ALL_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_LIST_ALL_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const notificationAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.NOTIFICATION_CREATE_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/user/notification/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.NOTIFICATION_CREATE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.NOTIFICATION_CREATE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.NOTIFICATION_CREATE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const adminChangeUserPasswordAuthAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.ADMIN_CHANGE_USER_PASSWORD_LOAD_CONSTANT,
      });
      const {
        userLoginAnyStore: { data: userLogin },
      } = getState();
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        formData.append(key, value);
      });
      const { data } = await axios({
        url: "/api/auth/admin/change_user_password/",
        method: "POST",
        timeout: 10000,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userLogin.token}`,
        },
        data: formData,
      });
      if (data["response"]) {
        const response = data["response"];
        dispatch({
          type: constants.ADMIN_CHANGE_USER_PASSWORD_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data["error"];
        dispatch({
          type: constants.ADMIN_CHANGE_USER_PASSWORD_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.ADMIN_CHANGE_USER_PASSWORD_FAIL_CONSTANT,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminCreateOrChangeUsersAuthAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.ADMIN_CREATE_OR_CHANGE_USERS_LOAD_CONSTANT,
      });
      const {
        userLoginAnyStore: { data: userLogin },
      } = getState();
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        formData.append(key, value);
      });
      const { data } = await axios({
        url: "/api/auth/admin/create_or_change_users/",
        method: "POST",
        timeout: 100000,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userLogin.token}`,
        },
        data: formData,
      });
      if (data["response"]) {
        const response = data["response"];
        dispatch({
          type: constants.ADMIN_CREATE_OR_CHANGE_USERS_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data["error"];
        dispatch({
          type: constants.ADMIN_CREATE_OR_CHANGE_USERS_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.ADMIN_CREATE_OR_CHANGE_USERS_FAIL_CONSTANT,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminExportUsersAuthAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.ADMIN_EXPORT_USERS_LOAD_CONSTANT,
      });
      const {
        userLoginAnyStore: { data: userLogin },
      } = getState();
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        formData.append(key, value);
      });
      const { data } = await axios({
        url: "/api/auth/admin/export_users/",
        method: "POST",
        timeout: 10000,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userLogin.token}`,
        },
        data: formData,
      });
      if (data["response"]) {
        const response = data["response"];
        dispatch({
          type: constants.ADMIN_EXPORT_USERS_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data["error"];
        dispatch({
          type: constants.ADMIN_EXPORT_USERS_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.ADMIN_EXPORT_USERS_FAIL_CONSTANT,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const salaryUserAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_SALARY_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/salary/",
      method: "POST",
      timeout: 30000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      const headers = [];
      for (let i in response) {
        if (i !== "global_objects" && i !== "excel_path") {
          headers.push([i, response[i]]);
        }
      }
      const tables = [];
      tables.push(["1.Начислено", response["global_objects"]["1.Начислено"]]);
      tables.push(["2.Удержано", response["global_objects"]["2.Удержано"]]);
      tables.push([
        "3.Доходы в натуральной форме",
        response["global_objects"]["3.Доходы в натуральной форме"],
      ]);
      tables.push(["4.Выплачено", response["global_objects"]["4.Выплачено"]]);
      tables.push([
        "5.Налоговые вычеты",
        response["global_objects"]["5.Налоговые вычеты"],
      ]);
      const excel_path = response["excel_path"];
      dispatch({
        type: constants.USER_SALARY_DATA_CONSTANT,
        payload: { excel_path: excel_path, headers: headers, tables: tables },
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.USER_SALARY_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_SALARY_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const rationalCreateAuthAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.RATIONAL_CREATE_LOAD_CONSTANT,
      });
      const {
        userLoginAnyStore: { data: userLogin },
      } = getState();
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        formData.append(key, value);
      });
      const { data } = await axios({
        url: "/api/auth/rational/",
        method: "POST",
        timeout: 10000,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userLogin.token}`,
        },
        data: formData,
      });
      if (data["response"]) {
        const response = data["response"];
        dispatch({
          type: constants.RATIONAL_CREATE_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data["error"];
        dispatch({
          type: constants.RATIONAL_CREATE_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.RATIONAL_CREATE_FAIL_CONSTANT,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const rationalListAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RATIONAL_LIST_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/rational/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.RATIONAL_LIST_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.RATIONAL_LIST_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RATIONAL_LIST_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const rationalDetailAuthAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.RATIONAL_DETAIL_LOAD_CONSTANT,
      });
      const {
        userLoginAnyStore: { data: userLogin },
      } = getState();
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        formData.append(key, value);
      });
      const { data } = await axios({
        url: "/api/auth/rational/",
        method: "POST",
        timeout: 10000,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userLogin.token}`,
        },
        data: formData,
      });
      if (data["response"]) {
        const response = data["response"];
        dispatch({
          type: constants.RATIONAL_DETAIL_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data["error"];
        dispatch({
          type: constants.RATIONAL_DETAIL_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.RATIONAL_DETAIL_FAIL_CONSTANT,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ideaCreateAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_CREATE_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.IDEA_CREATE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.IDEA_CREATE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_CREATE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const ideaListAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_LIST_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.IDEA_LIST_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.IDEA_LIST_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_LIST_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const ideaDetailAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_DETAIL_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.IDEA_DETAIL_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.IDEA_DETAIL_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_DETAIL_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const ideaChangeAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_CHANGE_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.IDEA_CHANGE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.IDEA_CHANGE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_CHANGE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const ideaModerateAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_MODERATE_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.IDEA_MODERATE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.IDEA_MODERATE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_MODERATE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const ideaCommentCreateAuthAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.IDEA_COMMENT_CREATE_LOAD_CONSTANT,
      });
      const {
        userLoginAnyStore: { data: userLogin },
      } = getState();
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        formData.append(key, value);
      });
      const { data } = await axios({
        url: "/api/auth/idea/",
        method: "POST",
        timeout: 10000,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userLogin.token}`,
        },
        data: formData,
      });
      if (data["response"]) {
        const response = data["response"];
        dispatch({
          type: constants.IDEA_COMMENT_CREATE_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data["error"];
        dispatch({
          type: constants.IDEA_COMMENT_CREATE_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.IDEA_COMMENT_CREATE_FAIL_CONSTANT,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
export const ideaCommentListAuthAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.IDEA_COMMENT_LIST_LOAD_CONSTANT,
      });
      const {
        userLoginAnyStore: { data: userLogin },
      } = getState();
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        formData.append(key, value);
      });
      const { data } = await axios({
        url: "/api/auth/idea/",
        method: "POST",
        timeout: 10000,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userLogin.token}`,
        },
        data: formData,
      });
      if (data["response"]) {
        const response = data["response"];
        dispatch({
          type: constants.IDEA_COMMENT_LIST_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data["error"];
        dispatch({
          type: constants.IDEA_COMMENT_LIST_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.IDEA_COMMENT_LIST_FAIL_CONSTANT,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
export const ideaRatingCreateAuthAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.IDEA_RATING_CREATE_LOAD_CONSTANT,
      });
      const {
        userLoginAnyStore: { data: userLogin },
      } = getState();
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        formData.append(key, value);
      });
      const { data } = await axios({
        url: "/api/auth/idea/",
        method: "POST",
        timeout: 10000,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userLogin.token}`,
        },
        data: formData,
      });
      if (data["response"]) {
        const response = data["response"];
        dispatch({
          type: constants.IDEA_RATING_CREATE_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data["error"];
        dispatch({
          type: constants.IDEA_RATING_CREATE_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.IDEA_RATING_CREATE_FAIL_CONSTANT,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const vacancyCreateAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.VACANCY_CREATE_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/vacancy/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.VACANCY_CREATE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.VACANCY_CREATE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.VACANCY_CREATE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const vacancyListAnyAction = (form) => async (dispatch) => {
  try {
    dispatch({
      type: constants.VACANCY_LIST_LOAD_CONSTANT,
    });
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/any/vacancy/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.VACANCY_LIST_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.VACANCY_LIST_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.VACANCY_LIST_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const vacancyDetailAnyAction = (form) => async (dispatch) => {
  try {
    dispatch({
      type: constants.VACANCY_DETAIL_LOAD_CONSTANT,
    });
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/any/vacancy/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.VACANCY_DETAIL_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.VACANCY_DETAIL_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.VACANCY_DETAIL_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const vacancyDeleteAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.VACANCY_DELETE_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/vacancy/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.VACANCY_DELETE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.VACANCY_DELETE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.VACANCY_DELETE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const vacancyChangeAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.VACANCY_CHANGE_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/vacancy/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.VACANCY_CHANGE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.VACANCY_CHANGE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.VACANCY_CHANGE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const resumeCreateAnyAction = (form) => async (dispatch) => {
  try {
    dispatch({
      type: constants.RESUME_CREATE_LOAD_CONSTANT,
    });
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/any/resume/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.RESUME_CREATE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.RESUME_CREATE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RESUME_CREATE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resumeListAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RESUME_LIST_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/resume/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.RESUME_LIST_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.RESUME_LIST_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RESUME_LIST_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resumeDetailAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RESUME_DETAIL_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/resume/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.RESUME_DETAIL_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.RESUME_DETAIL_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RESUME_DETAIL_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resumeDeleteAuthAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RESUME_DELETE_LOAD_CONSTANT,
    });
    const {
      userLoginAnyStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/resume/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.RESUME_DELETE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.RESUME_DELETE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RESUME_DELETE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rebootAction = (form) => async (dispatch) => {
  try {
    dispatch({
      type: constants.RESUME_DELETE_LOAD_CONSTANT,
    });
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/auth/resume/",
      method: "PUT",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    if (data["response"]) {
      const response = data["response"];
      dispatch({
        type: constants.RESUME_DELETE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];
      dispatch({
        type: constants.RESUME_DELETE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RESUME_DELETE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
