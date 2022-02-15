import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
  USER_LOGIN_LOAD_CONSTANT,
  USER_LOGIN_DATA_CONSTANT,
  USER_LOGIN_ERROR_CONSTANT,
  USER_LOGIN_FAIL_CONSTANT,
  USER_LOGOUT_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_DETAILS_LOAD_CONSTANT,
  USER_DETAILS_DATA_CONSTANT,
  USER_DETAILS_ERROR_CONSTANT,
  USER_DETAILS_FAIL_CONSTANT,
  USER_DETAILS_RESET_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_CHANGE_LOAD_CONSTANT,
  USER_CHANGE_DATA_CONSTANT,
  USER_CHANGE_ERROR_CONSTANT,
  USER_CHANGE_FAIL_CONSTANT,
  USER_CHANGE_RESET_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_RECOVER_PASSWORD_LOADING_CONSTANT,
  USER_RECOVER_PASSWORD_DATA_CONSTANT,
  USER_RECOVER_PASSWORD_ERROR_CONSTANT,
  USER_RECOVER_PASSWORD_FAIL_CONSTANT,
  USER_RECOVER_PASSWORD_RESET_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_SALARY_DATA_CONSTANT,
  USER_SALARY_ERROR_CONSTANT,
  USER_SALARY_FAIL_CONSTANT,
  USER_SALARY_LOAD_CONSTANT,
  USER_SALARY_RESET_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_LIST_LOADING_CONSTANT,
  USER_LIST_DATA_CONSTANT,
  USER_LIST_ERROR_CONSTANT,
  USER_LIST_RESET_CONSTANT,
  USER_LIST_DEFAULT_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  RATIONAL_LIST_LOADING_CONSTANT,
  RATIONAL_LIST_DATA_CONSTANT,
  RATIONAL_LIST_ERROR_CONSTANT,
  RATIONAL_LIST_FAIL_CONSTANT,
  RATIONAL_LIST_RESET_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
} from "./constants";

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_LOAD_CONSTANT,
    });
    const { data } = await axios({
      url: "api/user/login/",
      method: "POST",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        "Action-type": "LOGIN",
        body: { username: email, password: password },
      },
    });

    console.log("userLoginAction data: ", data);

    if (data["response"]) {
      const response = data["response"];

      console.log("userLoginAction response: ", response);

      dispatch({
        type: USER_LOGIN_DATA_CONSTANT,
        payload: response,
      });
      localStorage.setItem("userToken", JSON.stringify(response));
    } else {
      const response = data["error"];

      console.log("userLoginAction error: ", response);

      dispatch({
        type: USER_LOGIN_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL_CONSTANT,
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
  dispatch({ type: USER_LOGOUT_CONSTANT });
  dispatch({ type: USER_DETAILS_RESET_CONSTANT });
  dispatch({ type: USER_SALARY_RESET_CONSTANT });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const userDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_LOAD_CONSTANT,
    });

    const {
      userLoginState: { data: userLogin },
    } = getState();
    const { data } = await axios({
      url: "api/user/profile/",
      method: "POST",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: {
        "Action-type": "PROFILE",
        body: {},
      },
    });

    dispatch({ type: USER_CHANGE_RESET_CONSTANT });
    dispatch({ type: USER_RECOVER_PASSWORD_RESET_CONSTANT });
    dispatch({ type: USER_LIST_RESET_CONSTANT });
    dispatch({ type: USER_SALARY_RESET_CONSTANT });

    if (data["response"]) {
      const response = data["response"];

      // console.log("userDetailsAction response: ", response);

      dispatch({
        type: USER_DETAILS_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];

      console.log("userDetailsAction error: ", response);

      dispatch({
        type: USER_DETAILS_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    console.log(error.response)
    if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
      dispatch(userLogoutAction());
      console.log("logout")
    }
    dispatch({
      type: USER_DETAILS_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userChangeProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_CHANGE_LOAD_CONSTANT,
    });

    const {
      userLoginState: { data: userLogin },
    } = getState();
    const { data } = await axios({
      url: "api/user/change_profile/",
      method: "POST",
      timeout: 3000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: {
        "Action-type": "CHANGE",
        body: user,
      },
    });

    if (data["response"]) {
      const response = data["response"];

      console.log("userChangeProfileAction response: ", response);

      dispatch({
        type: USER_CHANGE_DATA_CONSTANT,
        payload: response,
      });
      dispatch({ type: USER_DETAILS_RESET_CONSTANT });
    } else {
      const response = data["error"];

      console.log("userChangeProfileAction error: ", response);

      dispatch({
        type: USER_CHANGE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_CHANGE_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userRecoverPasswordAction = (attrs) => async (dispatch) => {
  try {
    dispatch({
      type: USER_RECOVER_PASSWORD_LOADING_CONSTANT,
    });

    const { data } = await axios({
      url: "api/user/recover_password/",
      method: "POST",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        "Action-type": attrs.actionType,
        body: {
          username: attrs.username,
          secretAnswer: attrs.secretAnswer,
          recoverPassword: attrs.recoverPassword,
          password: attrs.password,
          password2: attrs.password2,
        },
      },
    });

    if (data["response"]) {
      const response = data["response"];

      console.log("userRecoverPasswordAction response: ", response);

      dispatch({
        type: USER_RECOVER_PASSWORD_DATA_CONSTANT,
        payload: {
          username: response["username"],
          secretQuestion: response["secret_question_char_field"],
          email: response["email_field"],
          success: response["success"],
        },
      });
    } else {
      const response = data["error"];

      console.log("userRecoverPasswordAction error: ", response);

      dispatch({
        type: USER_RECOVER_PASSWORD_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_RECOVER_PASSWORD_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userListAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_LOADING_CONSTANT,
    });

    const {
      userLoginState: { data: userLogin },
    } = getState();
    const { data } = await axios({
      url: "api/user/all/",
      method: "POST",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: {
        "Action-type": "ALL",
        body: {},
      },
    });
    const response = data["response"];
    console.log("ALL: ", response);

    dispatch({
      type: USER_LIST_DATA_CONSTANT,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_ERROR_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const salaryUserAction = (dateTime) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_SALARY_LOAD_CONSTANT,
    });

    const {
      userLoginState: { data: userLogin },
    } = getState();
    const { data } = await axios({
      url: "api/salary/",
      method: "POST",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: {
        "Action-type": "SALARY",
        body: { dateTime: dateTime },
      },
    });

    if (data["response"]) {
      const response = data["response"];

      console.log("salaryUserAction response: ", response);

      const excel_path = response["excel_path"];

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

      dispatch({
        type: USER_SALARY_DATA_CONSTANT,
        payload: { excel_path: excel_path, headers: headers, tables: tables },
      });
    } else {
      const response = data["error"];

      console.log("salaryUserAction error: ", response);

      dispatch({
        type: USER_SALARY_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_SALARY_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const rationalListAction = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RATIONAL_LIST_LOADING_CONSTANT,
    });

    const {
      userLoginState: { data: userLogin },
    } = getState();
    const { data } = await axios({
      url: "api/rational/",
      method: "POST",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userLogin.token}`,
      },
      data: {
        "Action-type": "RATIONAL_LIST",
        body: { category: category },
      },
    });

    if (data["response"]) {
      const response = data["response"];

      console.log("bankIdeaListAction response: ", response);

      dispatch({
        type: RATIONAL_LIST_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data["error"];

      console.log("bankIdeaListAction error: ", response);

      dispatch({
        type: RATIONAL_LIST_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: RATIONAL_LIST_FAIL_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};