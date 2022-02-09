import axios from "axios";
import {
  USER_LOGIN_LOAD_CONSTANT,
  USER_LOGIN_DATA_CONSTANT,
  USER_LOGIN_ERROR_CONSTANT,
  USER_LOGIN_FAIL_CONSTANT,
  USER_LOGOUT_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_DETAILS_LOAD_CONSTANT,
  USER_DETAILS_DATA_CONSTANT,
  USER_DETAILS_FAIL_CONSTANT,
  USER_DETAILS_RESET_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_CHANGE_LOAD_CONSTANT,
  USER_CHANGE_DATA_CONSTANT,
  USER_CHANGE_ERROR_CONSTANT,
  USER_CHANGE_FAIL_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_RECOVER_PASSWORD_LOADING_CONSTANT,
  USER_RECOVER_PASSWORD_DATA_CONSTANT,
  USER_RECOVER_PASSWORD_ERROR_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_LIST_LOADING_CONSTANT,
  USER_LIST_DATA_CONSTANT,
  USER_LIST_ERROR_CONSTANT,
  USER_DETAILS_ERROR_CONSTANT,
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
} from "../constants/userConstants";

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

    if (data["response"]) {
      const response = data["response"];

      console.log("userDetailsAction response: ", response);

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
      timeout: 5000,
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
      type: USER_RECOVER_PASSWORD_ERROR_CONSTANT,
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
