import axios from "axios";
import {
  USER_LIST_LOADING_CONSTANT,
  USER_LIST_DATA_CONSTANT,
  USER_LIST_ERROR_CONSTANT,
  USER_LIST_RESET_CONSTANT,
  USER_LIST_DEFAULT_CONSTANT,
  USER_CHANGE_LOADING_CONSTANT,
  USER_CHANGE_DATA_CONSTANT,
  USER_CHANGE_ERROR_CONSTANT,
  USER_CHANGE_RESET_CONSTANT,
  USER_CHANGE_DEFAULT_CONSTANT,
  USER_RECOVER_PASSWORD_LOADING_CONSTANT,
  USER_RECOVER_PASSWORD_DATA_CONSTANT,
  USER_RECOVER_PASSWORD_ERROR_CONSTANT,
  USER_RECOVER_PASSWORD_RESET_CONSTANT,
  USER_RECOVER_PASSWORD_DEFAULT_CONSTANT,

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_CHANGE_REQUEST,
  USER_CHANGE_SUCCESS,
  USER_CHANGE_FAIL,
} from "../constants/userConstants";

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
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
    const response = data["response"];
    console.log("LOGIN: ", response);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: response,
    });

    localStorage.setItem("userInfo", JSON.stringify(response));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userLogoutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET });
};

export const userDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios({
      url: "api/user/profile/",
      method: "POST",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: {
        "Action-type": "PROFILE",
        body: {},
      },
    });
    const response = data["response"];
    console.log("PROFILE: ", response);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
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
      type: USER_CHANGE_LOADING_CONSTANT,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios({
      url: "api/user/change_profile/",
      method: "POST",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: {
        "Action-type": "CHANGE",
        body: user,
      },
    });
    const response = data["response"];
    console.log("CHANGE: ", response);

    dispatch({
      type: USER_CHANGE_DATA_CONSTANT,
      payload: response,
    });
    dispatch({ type: USER_DETAILS_RESET });
  } catch (error) {
    dispatch({
      type: USER_CHANGE_ERROR_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userRecoverPasswordAction =
  (attrs) => async (dispatch) => {
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
      try{
        const response = data["response"];
        console.log("CHANGE: ", response);
        dispatch({
          type: USER_RECOVER_PASSWORD_DATA_CONSTANT,
          payload: {
            username: response["username"],
            secretQuestion: response["secret_question_char_field"],
            email: response["email_field"],
            success: response["success"],
          },
        });
      } catch (error) {
        dispatch({
          type: USER_RECOVER_PASSWORD_ERROR_CONSTANT,
          payload: data["error"],
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
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios({
      url: "api/user/all/",
      method: "POST",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// export const userLoginAction = (email, password) => async (dispatch) => {
//   try {
//     dispatch({
//       type: USER_LOGIN_LOADING_CONSTANT,
//     });

//     const { data } = await axios({
//       url: "api/user/login/",
//       method: "POST",
//       timeout: 5000,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: {
//         "Action-type": "LOGIN",
//         body: { username: email, password: password },
//       },
//     });
//     const response = data["response"];
//     console.log("LOGIN: ", response);

//     dispatch({
//       type: USER_LOGIN_DATA_CONSTANT,
//       payload: response,
//     });

//     dispatch({ type: USER_PROFILE_RESET_CONSTANT });

//     localStorage.setItem("userInfo", JSON.stringify(response));
//   } catch (error) {
//     dispatch({
//       type: USER_LOGIN_ERROR_CONSTANT,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

// export const userLogoutAction = () => (dispatch) => {
//   localStorage.removeItem("userInfo");
//   localStorage.removeItem("userInfo");
//   dispatch({ type: USER_LOGOUT_CONSTANT });
//   dispatch({ type: USER_PROFILE_RESET_CONSTANT });
// };

// export const userProfileAction = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_PROFILE_LOADING_CONSTANT,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();
//     const { data } = await axios({
//       url: "/api/user/profile/",
//       method: "POST",
//       timeout: 5000,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo["access_token"]}`,
//       },
//       data: {
//         "Action-type": "PROFILE",
//         body: {},
//       },
//     });
//     const response = data["response"];
//     console.log("PROFILE: ", response);

//     dispatch({
//       type: USER_PROFILE_DATA_CONSTANT,
//       payload: response,
//     });
//   } catch (error) {
//     dispatch({
//       type: USER_PROFILE_ERROR_CONSTANT,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

// export const userListAction = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_LIST_LOADING_CONSTANT,
//     });

//     const {
//       userTokenDataStore: { userTokenDataStore },
//     } = getState();
//     const { data } = await axios({
//       url: "/api/user/all/",
//       method: "POST",
//       timeout: 5000,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userTokenDataStore["access_token"]}`,
//       },
//       data: {
//         "Action-type": "USERS",
//         body: {},
//       },
//     });
//     const response = data["response"];
//     // console.log("USERS: ", response);

//     dispatch({
//       type: USER_LIST_DATA_CONSTANT,
//       payload: response,
//     });
//   } catch (error) {
//     dispatch({
//       type: USER_LIST_ERROR_CONSTANT,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const userRegisterAction =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register/",
        { name: name, email: email, password: password },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const oldChangeUserProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_CHANGE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/users/change_profile/`,
      user,
      config
    );

    dispatch({
      type: USER_CHANGE_SUCCESS,
      payload: data,
    });

    // dispatch({
    //   type: USER_LOGIN_SUCCESS,
    //   payload: data,
    // });
    //
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_CHANGE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUserProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/users/profile/update/`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios({
      url: "api/user/all/",
      method: "POST",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: {
        "Action-type": "ALL",
        body: {},
      },
    });
    const response = data["response"];
    console.log("PROFILE: ", response);

    // const config = {
    //   headers: {
    //     "Content-type": "application/json",
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };

    // const { data } = await axios.get(`/api/users/all/`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/delete/${id}/`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUserAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/users/update/${user._id}/`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
