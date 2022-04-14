// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constants from "./constants";
import * as utils from "./utils";

// TODO default settings ///////////////////////////////////////////////////////////////////////////////////////////////

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

// TODO main ///////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ratingsListAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RATINGS_LIST.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/ratings_list/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.RATINGS_LIST.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.RATINGS_LIST.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RATINGS_LIST.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

// TODO profile ////////////////////////////////////////////////////////////////////////////////////////////////////////

export const userLoginAction = (form) => async (dispatch) => {
  try {
    dispatch({
      type: constants.USER_LOGIN.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/any/user/",
      method: "POST",
      timeout: 30000,
      form: form,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.USER_LOGIN.data,
        payload: response,
      });

      localStorage.setItem("userToken", JSON.stringify(response));
      dispatch({ type: constants.USER_DETAILS.reset });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_LOGIN.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_LOGIN.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("userToken");
  dispatch({ type: constants.USER_LOGIN.reset });
  dispatch({ type: constants.USER_DETAILS.reset });
  dispatch({ type: constants.USER_CHANGE.reset });
  dispatch({ type: constants.USER_RECOVER_PASSWORD.reset });
  dispatch({ type: constants.USER_SALARY.reset });
  dispatch({ type: constants.USER_VACATION.reset });
};

export const userDetailsAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_DETAILS.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/user/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.USER_DETAILS.data,
        payload: response,
      });
      dispatch({ type: constants.USER_CHANGE.reset });
      dispatch({ type: constants.USER_RECOVER_PASSWORD.reset });
      dispatch({ type: constants.USER_SALARY.reset });
      dispatch({ type: constants.USER_VACATION.reset });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_DETAILS.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_DETAILS.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const userChangeAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_CHANGE.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/user/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.USER_CHANGE.data,
        payload: response,
      });
      dispatch({ type: constants.USER_DETAILS.reset });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_CHANGE.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_CHANGE.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const userRecoverPasswordAction = (form) => async (dispatch) => {
  try {
    dispatch({
      type: constants.USER_RECOVER_PASSWORD.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/any/user/",
      method: "POST",
      timeout: 30000,
      form: form,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.USER_RECOVER_PASSWORD.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_RECOVER_PASSWORD.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_RECOVER_PASSWORD.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const UserListAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_LIST_ALL.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/user/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.USER_LIST_ALL.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_LIST_ALL.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_LIST_ALL.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const notificationCreateAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.NOTIFICATION_CREATE.load,
      });
      const { config } = utils.ActionsAxiosUtility({
        url: "/api/auth/user/",
        method: "POST",
        timeout: 30000,
        form: form,
        getState: getState,
      });
      const { data } = await axios(config);
      if (data.response) {
        const response = data.response;
        dispatch({
          type: constants.NOTIFICATION_CREATE.data,
          payload: response,
        });
      } else {
        const response = data.error;
        dispatch({
          type: constants.NOTIFICATION_CREATE.error,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.NOTIFICATION_CREATE.fail,
        payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
      });
    }
  };

export const notificationDeleteAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.NOTIFICATION_DELETE.load,
      });
      const { config } = utils.ActionsAxiosUtility({
        url: "/api/auth/user/",
        method: "POST",
        timeout: 30000,
        form: form,
        getState: getState,
      });
      const { data } = await axios(config);
      if (data.response) {
        const response = data.response;
        dispatch({
          type: constants.NOTIFICATION_DELETE.data,
          payload: response,
        });
      } else {
        const response = data.error;
        dispatch({
          type: constants.NOTIFICATION_DELETE.error,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.NOTIFICATION_DELETE.fail,
        payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
      });
    }
  };

export const notificationListAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.NOTIFICATION_LIST.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/user/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.NOTIFICATION_LIST.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.NOTIFICATION_LIST.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.NOTIFICATION_LIST.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

// TODO progress ///////////////////////////////////////////////////////////////////////////////////////////////////////

export const ideaCreateAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_CREATE.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_CREATE.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_CREATE.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_CREATE.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const ideaListAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_LIST.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_LIST.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_LIST.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_LIST.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const ideaDetailAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_DETAIL.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_DETAIL.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_DETAIL.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_DETAIL.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const ideaChangeAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_CHANGE.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_CHANGE.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_CHANGE.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_CHANGE.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const ideaModerateAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_MODERATE.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_MODERATE.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_MODERATE.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_MODERATE.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const ideaCommentCreateAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_COMMENT_CREATE.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_COMMENT_CREATE.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_COMMENT_CREATE.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_COMMENT_CREATE.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const ideaCommentDeleteAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_COMMENT_DELETE.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_COMMENT_DELETE.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_COMMENT_DELETE.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_COMMENT_DELETE.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const ideaRatingCreateAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_RATING_CREATE.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_RATING_CREATE.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_RATING_CREATE.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_RATING_CREATE.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

// TODO buhgalteria ////////////////////////////////////////////////////////////////////////////////////////////////////

export const salaryUserAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_SALARY.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/salary/",
      method: "POST",
      timeout: 50000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
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
      const excelPath = response["excel_path"];
      dispatch({
        type: constants.USER_SALARY.data,
        payload: { excelPath: excelPath, headers: headers, tables: tables },
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_SALARY.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_SALARY.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

// TODO sup ////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const vacationUserAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_VACATION.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/vacation/",
      method: "POST",
      timeout: 50000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.USER_VACATION.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_VACATION.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_VACATION.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

// TODO moderator //////////////////////////////////////////////////////////////////////////////////////////////////////

export const terminalRebootAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.TERMINAL_REBOOT.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/admin/terminal_reboot/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.TERMINAL_REBOOT.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.TERMINAL_REBOOT.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.TERMINAL_REBOOT.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const adminCheckUserAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.ADMIN_CHECK_USER.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/admin/check_user/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.ADMIN_CHECK_USER.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.ADMIN_CHECK_USER.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.ADMIN_CHECK_USER.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const adminChangeUserPasswordAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.ADMIN_CHANGE_USER_PASSWORD.load,
      });
      const { config } = utils.ActionsAxiosUtility({
        url: "/api/auth/admin/change_user_password/",
        method: "POST",
        timeout: 30000,
        form: form,
        getState: getState,
      });
      const { data } = await axios(config);
      if (data.response) {
        const response = data.response;
        dispatch({
          type: constants.ADMIN_CHANGE_USER_PASSWORD.data,
          payload: response,
        });
      } else {
        const response = data.error;
        dispatch({
          type: constants.ADMIN_CHANGE_USER_PASSWORD.error,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.ADMIN_CHANGE_USER_PASSWORD.fail,
        payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
      });
    }
  };

export const adminChangeUserActivityAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.ADMIN_CHANGE_USER_ACTIVITY.load,
      });
      const { config } = utils.ActionsAxiosUtility({
        url: "/api/auth/admin/change_user_activity/",
        method: "POST",
        timeout: 30000,
        form: form,
        getState: getState,
      });
      const { data } = await axios(config);
      if (data.response) {
        const response = data.response;
        dispatch({
          type: constants.ADMIN_CHANGE_USER_ACTIVITY.data,
          payload: response,
        });
      } else {
        const response = data.error;
        dispatch({
          type: constants.ADMIN_CHANGE_USER_ACTIVITY.error,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.ADMIN_CHANGE_USER_ACTIVITY.fail,
        payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
      });
    }
  };

export const adminCreateOrChangeUsersAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.ADMIN_CREATE_OR_CHANGE_USERS.load,
      });
      const { config } = utils.ActionsAxiosUtility({
        url: "/api/auth/admin/create_or_change_users/",
        method: "POST",
        timeout: 500000,
        form: form,
        getState: getState,
      });
      const { data } = await axios(config);
      if (data.response) {
        const response = data.response;
        dispatch({
          type: constants.ADMIN_CREATE_OR_CHANGE_USERS.data,
          payload: response,
        });
      } else {
        const response = data.error;
        dispatch({
          type: constants.ADMIN_CREATE_OR_CHANGE_USERS.error,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.ADMIN_CREATE_OR_CHANGE_USERS.fail,
        payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
      });
    }
  };

export const adminExportUsersAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.ADMIN_EXPORT_USERS.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/admin/export_users/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.ADMIN_EXPORT_USERS.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.ADMIN_EXPORT_USERS.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.ADMIN_EXPORT_USERS.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

// TODO develop ////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rationalCreateAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RATIONAL_CREATE.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/rational/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.RATIONAL_CREATE.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.RATIONAL_CREATE.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RATIONAL_CREATE.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};

export const rationalListAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RATIONAL_LIST.load,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/rational/",
      method: "POST",
      timeout: 30000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.RATIONAL_LIST.data,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.RATIONAL_LIST.error,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RATIONAL_LIST.fail,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
