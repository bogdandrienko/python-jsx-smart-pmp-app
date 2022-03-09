import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as constants from "./constants";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const userLoginAction = (form) => async (dispatch) => {
  try {
    // LOAD dispatch
    // console.log("userLoginAction load: ", data);
    dispatch({
      type: constants.USER_LOGIN_LOAD_CONSTANT,
    });

    // FormData class
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });

    // Axios request
    const { data } = await axios({
      url: "/api/user/login/",
      method: "POST",
      timeout: 5000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    if (data["response"]) {
      const response = data["response"];

      // DATA dispatch
      // console.log("userLoginAction response: ", response);
      dispatch({
        type: constants.USER_LOGIN_DATA_CONSTANT,
        payload: response,
      });
      localStorage.setItem("userToken", JSON.stringify(response));
      dispatch({ type: constants.USER_DETAILS_RESET_CONSTANT });
    } else {
      const response = data["error"];

      // ERROR dispatch
      // console.log("userLoginAction error: ", response);
      dispatch({
        type: constants.USER_LOGIN_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    // FAIL dispatch
    // console.log("userLoginAction fail: ", error.response);
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

export const userDetailsAction = (form) => async (dispatch, getState) => {
  try {
    // LOAD dispatch
    // console.log("userDetailsAction load: ", data);
    dispatch({
      type: constants.USER_DETAILS_LOAD_CONSTANT,
    });

    // State
    const {
      userLoginStore: { data: userLogin },
    } = getState();

    // FormData class
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });

    // Axios request
    const { data } = await axios({
      url: "/api/user/detail/",
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

      // DATA dispatch
      // console.log("userDetailsAction response: ", response);
      dispatch({
        type: constants.USER_DETAILS_DATA_CONSTANT,
        payload: response,
      });
      dispatch({ type: constants.USER_CHANGE_RESET_CONSTANT });
      dispatch({ type: constants.USER_RECOVER_PASSWORD_RESET_CONSTANT });
      dispatch({ type: constants.USER_SALARY_RESET_CONSTANT });
    } else {
      const response = data["error"];

      // ERROR dispatch
      // console.log("userDetailsAction error: ", response);
      dispatch({
        type: constants.USER_DETAILS_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    // FAIL dispatch
    // console.log("userDetailsAction fail: ", error.response);
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

export const userChangeProfileAction = (form) => async (dispatch, getState) => {
  try {
    // LOAD dispatch
    // console.log("userChangeProfileAction load: ", data);
    dispatch({
      type: constants.USER_CHANGE_LOAD_CONSTANT,
    });

    // State
    const {
      userLoginStore: { data: userLogin },
    } = getState();

    // FormData class
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });

    // Axios request
    const { data } = await axios({
      url: "/api/user/change/",
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

      // DATA dispatch
      // console.log("userChangeProfileAction response: ", response);
      dispatch({
        type: constants.USER_CHANGE_DATA_CONSTANT,
        payload: response,
      });
      dispatch({ type: constants.USER_DETAILS_RESET_CONSTANT });
    } else {
      const response = data["error"];

      // ERROR dispatch
      // console.log("userChangeProfileAction error: ", response);
      dispatch({
        type: constants.USER_CHANGE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    // FAIL dispatch
    // console.log("userChangeProfileAction fail: ", error.response);
    dispatch({
      type: constants.USER_CHANGE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userRecoverPasswordAction = (form) => async (dispatch) => {
  try {
    // LOAD dispatch
    // console.log("userRecoverPasswordAction load: ", data);
    dispatch({
      type: constants.USER_RECOVER_PASSWORD_LOAD_CONSTANT,
    });

    // FormData class
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });

    // Axios request
    const { data } = await axios({
      url: "/api/user/recover/",
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    if (data["response"]) {
      const response = data["response"];

      // DATA dispatch
      // console.log("userRecoverPasswordAction response: ", response);
      dispatch({
        type: constants.USER_RECOVER_PASSWORD_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];

      // ERROR dispatch
      // console.log("userRecoverPasswordAction error: ", response);
      dispatch({
        type: constants.USER_RECOVER_PASSWORD_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    // FAIL dispatch
    // console.log("userRecoverPasswordAction fail: ", error.response);
    dispatch({
      type: constants.USER_RECOVER_PASSWORD_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminChangeUserPasswordAction =
  (form) => async (dispatch, getState) => {
    try {
      // LOAD dispatch
      // console.log("adminChangeUserPasswordAction load: ", data);
      dispatch({
        type: constants.ADMIN_CHANGE_USER_PASSWORD_LOAD_CONSTANT,
      });

      // State
      const {
        userLoginStore: { data: userLogin },
      } = getState();

      // FormData class
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        formData.append(key, value);
      });

      // Axios request
      const { data } = await axios({
        url: "/api/admin/change_user_password/",
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

        // DATA dispatch
        // console.log("adminChangeUserPasswordAction response: ", response);
        dispatch({
          type: constants.ADMIN_CHANGE_USER_PASSWORD_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data["error"];

        // ERROR dispatch
        // console.log("adminChangeUserPasswordAction error: ", response);
        dispatch({
          type: constants.ADMIN_CHANGE_USER_PASSWORD_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      // FAIL dispatch
      // console.log("adminChangeUserPasswordAction fail: ", error.response);
      dispatch({
        type: constants.ADMIN_CHANGE_USER_PASSWORD_FAIL_CONSTANT,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminCreateOrChangeUsersAction =
  (form) => async (dispatch, getState) => {
    try {
      // LOAD dispatch
      // console.log("adminCreateOrChangeUsersAction load: ", data);
      dispatch({
        type: constants.ADMIN_CREATE_OR_CHANGE_USERS_LOAD_CONSTANT,
      });

      // State
      const {
        userLoginStore: { data: userLogin },
      } = getState();

      // FormData class
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        formData.append(key, value);
      });

      // Axios request
      const { data } = await axios({
        url: "/api/admin/create_or_change_users/",
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

        // DATA dispatch
        // console.log("adminCreateOrChangeUsersAction response: ", response);
        dispatch({
          type: constants.ADMIN_CREATE_OR_CHANGE_USERS_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data["error"];

        // ERROR dispatch
        // console.log("adminCreateOrChangeUsersAction error: ", response);
        dispatch({
          type: constants.ADMIN_CREATE_OR_CHANGE_USERS_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      // FAIL dispatch
      // console.log("adminCreateOrChangeUsersAction fail: ", error.response);
      dispatch({
        type: constants.ADMIN_CREATE_OR_CHANGE_USERS_FAIL_CONSTANT,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminExportUsersAction = (form) => async (dispatch, getState) => {
  try {
    // LOAD dispatch
    // console.log("adminExportUsersAction load: ", data);
    dispatch({
      type: constants.ADMIN_EXPORT_USERS_LOAD_CONSTANT,
    });

    // State
    const {
      userLoginStore: { data: userLogin },
    } = getState();

    // FormData class
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });

    // Axios request
    const { data } = await axios({
      url: "/api/admin/export_users/",
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

      // DATA dispatch
      // console.log("adminExportUsersAction response: ", response);
      dispatch({
        type: constants.ADMIN_EXPORT_USERS_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];

      // ERROR dispatch
      // console.log("adminExportUsersAction error: ", response);
      dispatch({
        type: constants.ADMIN_EXPORT_USERS_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    // FAIL dispatch
    // console.log("adminExportUsersAction fail: ", error.response);
    dispatch({
      type: constants.ADMIN_EXPORT_USERS_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const salaryUserAction = (form) => async (dispatch, getState) => {
  try {
    // LOAD dispatch
    // console.log("salaryUserAction load: ", data);
    dispatch({
      type: constants.USER_SALARY_LOAD_CONSTANT,
    });

    // State
    const {
      userLoginStore: { data: userLogin },
    } = getState();

    // FormData class
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });

    // Axios request
    const { data } = await axios({
      url: "/api/salary/",
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

      // DATA dispatch
      // console.log("salaryUserAction response: ", response);
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

      // ERROR dispatch
      // console.log("salaryUserAction error: ", response);
      dispatch({
        type: constants.USER_SALARY_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    // FAIL dispatch
    // console.log("salaryUserAction fail: ", error.response);
    dispatch({
      type: constants.USER_SALARY_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const rationalCreateAction = (form) => async (dispatch, getState) => {
  try {
    // LOAD dispatch
    // console.log("rationalCreateAction load: ", data);
    dispatch({
      type: constants.RATIONAL_CREATE_LOAD_CONSTANT,
    });

    // State
    const {
      userLoginStore: { data: userLogin },
    } = getState();

    // FormData class
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });

    // Axios request
    const { data } = await axios({
      url: "/api/rational/",
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

      // DATA dispatch
      // console.log("rationalCreateAction response: ", response);
      dispatch({
        type: constants.RATIONAL_CREATE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];

      // ERROR dispatch
      // console.log("rationalCreateAction error: ", response);
      dispatch({
        type: constants.RATIONAL_CREATE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    // FAIL dispatch
    // console.log("rationalCreateAction fail: ", error.response);
    dispatch({
      type: constants.RATIONAL_CREATE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const rationalListAction = (form) => async (dispatch, getState) => {
  try {
    // LOAD dispatch
    // console.log("rationalListAction load: ", data);
    dispatch({
      type: constants.RATIONAL_LIST_LOAD_CONSTANT,
    });

    // State
    const {
      userLoginStore: { data: userLogin },
    } = getState();

    // FormData class
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });

    // Axios request
    const { data } = await axios({
      url: "/api/rational/",
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

      // DATA dispatch
      // console.log("rationalListAction response: ", response);
      dispatch({
        type: constants.RATIONAL_LIST_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];

      // ERROR dispatch
      // console.log("rationalListAction error: ", response);
      dispatch({
        type: constants.RATIONAL_LIST_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    // FAIL dispatch
    // console.log("rationalListAction fail: ", error.response);
    dispatch({
      type: constants.RATIONAL_LIST_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const rationalDetailAction = (form) => async (dispatch, getState) => {
  try {
    // LOAD dispatch
    // console.log("rationalDetailAction load: ", data);
    dispatch({
      type: constants.RATIONAL_DETAIL_LOAD_CONSTANT,
    });

    // State
    const {
      userLoginStore: { data: userLogin },
    } = getState();

    // FormData class
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });

    // Axios request
    const { data } = await axios({
      url: "/api/rational/",
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

      // DATA dispatch
      // console.log("rationalDetailAction response: ", response);
      dispatch({
        type: constants.RATIONAL_DETAIL_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];

      // ERROR dispatch
      // console.log("rationalDetailAction error: ", response);
      dispatch({
        type: constants.RATIONAL_DETAIL_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    // FAIL dispatch
    // console.log("rationalDetailAction fail: ", error.response);
    dispatch({
      type: constants.RATIONAL_DETAIL_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userListAllAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_LIST_ALL_LOAD_CONSTANT,
    });
    const {
      userLoginStore: { data: userLogin },
    } = getState();
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    const { data } = await axios({
      url: "/api/user/list_all/",
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

export const vacancyListAction = (form) => async (dispatch) => {
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

export const vacancyDetailAction = (form) => async (dispatch) => {
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

export const vacancyCreateAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.VACANCY_CREATE_LOAD_CONSTANT,
    });
    const {
      userLoginStore: { data: userLogin },
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

export const vacancyChangeAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.VACANCY_CHANGE_LOAD_CONSTANT,
    });
    const {
      userLoginStore: { data: userLogin },
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

export const vacancyDeleteAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.VACANCY_DELETE_LOAD_CONSTANT,
    });
    const {
      userLoginStore: { data: userLogin },
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

export const resumeListAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RESUME_LIST_LOAD_CONSTANT,
    });
    const {
      userLoginStore: { data: userLogin },
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

export const resumeDetailAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RESUME_DETAIL_LOAD_CONSTANT,
    });
    const {
      userLoginStore: { data: userLogin },
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

export const resumeCreateAction = (form) => async (dispatch) => {
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

export const resumeDeleteAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RESUME_DELETE_LOAD_CONSTANT,
    });
    const {
      userLoginStore: { data: userLogin },
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
