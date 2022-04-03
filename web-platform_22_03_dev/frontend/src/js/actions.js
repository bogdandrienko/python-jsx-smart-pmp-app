// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import axios from "axios";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as constants from "./constants";
import * as utils from "./utils";
// TODO custom settings ////////////////////////////////////////////////////////////////////////////////////////////////
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
// TODO base action ////////////////////////////////////////////////////////////////////////////////////////////////////
export const userLoginAction = (form) => async (dispatch) => {
  try {
    dispatch({
      type: constants.USER_LOGIN_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/any/user/",
      method: "POST",
      timeout: 10000,
      form: form,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.USER_LOGIN_DATA_CONSTANT,
        payload: response,
      });
      localStorage.setItem("userToken", JSON.stringify(response));
      dispatch({ type: constants.USER_DETAILS_RESET_CONSTANT });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_LOGIN_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_LOGIN_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userToken");
  dispatch({ type: constants.USER_LOGIN_RESET_CONSTANT });
  dispatch({ type: constants.USER_DETAILS_RESET_CONSTANT });
  dispatch({ type: constants.USER_CHANGE_RESET_CONSTANT });
  dispatch({ type: constants.USER_RECOVER_PASSWORD_RESET_CONSTANT });
  dispatch({ type: constants.USER_SALARY_RESET_CONSTANT });
  dispatch({ type: constants.USER_VACATION_RESET_CONSTANT });
};
export const userDetailsAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_DETAILS_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/user/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.USER_DETAILS_DATA_CONSTANT,
        payload: response,
      });
      dispatch({ type: constants.USER_CHANGE_RESET_CONSTANT });
      dispatch({ type: constants.USER_RECOVER_PASSWORD_RESET_CONSTANT });
      dispatch({ type: constants.USER_SALARY_RESET_CONSTANT });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_DETAILS_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_DETAILS_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const userChangeAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_CHANGE_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/user/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.USER_CHANGE_DATA_CONSTANT,
        payload: response,
      });
      dispatch({ type: constants.USER_DETAILS_RESET_CONSTANT });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_CHANGE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_CHANGE_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const userRecoverPasswordAction = (form) => async (dispatch) => {
  try {
    dispatch({
      type: constants.USER_RECOVER_PASSWORD_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/any/user/",
      method: "POST",
      timeout: 10000,
      form: form,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.USER_RECOVER_PASSWORD_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_RECOVER_PASSWORD_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_RECOVER_PASSWORD_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const UserListAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_LIST_ALL_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/user/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.USER_LIST_ALL_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_LIST_ALL_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_LIST_ALL_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const notificationCreateAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.NOTIFICATION_CREATE_LOAD_CONSTANT,
      });
      const { config } = utils.ActionsAxiosUtility({
        url: "/api/auth/user/",
        method: "POST",
        timeout: 10000,
        form: form,
        getState: getState,
      });
      const { data } = await axios(config);
      if (data.response) {
        const response = data.response;
        dispatch({
          type: constants.NOTIFICATION_CREATE_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data.error;
        dispatch({
          type: constants.NOTIFICATION_CREATE_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.NOTIFICATION_CREATE_FAIL_CONSTANT,
        payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
      });
    }
  };
export const notificationDeleteAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.NOTIFICATION_DELETE_LOAD_CONSTANT,
      });
      const { config } = utils.ActionsAxiosUtility({
        url: "/api/auth/user/",
        method: "POST",
        timeout: 10000,
        form: form,
        getState: getState,
      });
      const { data } = await axios(config);
      if (data.response) {
        const response = data.response;
        dispatch({
          type: constants.NOTIFICATION_DELETE_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data.error;
        dispatch({
          type: constants.NOTIFICATION_DELETE_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.NOTIFICATION_DELETE_FAIL_CONSTANT,
        payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
      });
    }
  };
export const notificationListAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.NOTIFICATION_LIST_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/user/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.NOTIFICATION_LIST_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.NOTIFICATION_LIST_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.NOTIFICATION_LIST_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////TODO admin action
export const adminChangeUserPasswordAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.ADMIN_CHANGE_USER_PASSWORD_LOAD_CONSTANT,
      });
      const { config } = utils.ActionsAxiosUtility({
        url: "/api/auth/admin/",
        method: "POST",
        timeout: 10000,
        form: form,
        getState: getState,
      });
      const { data } = await axios(config);
      if (data.response) {
        const response = data.response;
        dispatch({
          type: constants.ADMIN_CHANGE_USER_PASSWORD_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data.error;
        dispatch({
          type: constants.ADMIN_CHANGE_USER_PASSWORD_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.ADMIN_CHANGE_USER_PASSWORD_FAIL_CONSTANT,
        payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
      });
    }
  };
export const adminCreateOrChangeUsersAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.ADMIN_CREATE_OR_CHANGE_USERS_LOAD_CONSTANT,
      });
      const { config } = utils.ActionsAxiosUtility({
        url: "/api/auth/admin/",
        method: "POST",
        timeout: 500000,
        form: form,
        getState: getState,
      });
      const { data } = await axios(config);
      if (data.response) {
        const response = data.response;
        dispatch({
          type: constants.ADMIN_CREATE_OR_CHANGE_USERS_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data.error;
        dispatch({
          type: constants.ADMIN_CREATE_OR_CHANGE_USERS_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.ADMIN_CREATE_OR_CHANGE_USERS_FAIL_CONSTANT,
        payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
      });
    }
  };
export const adminExportUsersAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.ADMIN_EXPORT_USERS_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/admin/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.ADMIN_EXPORT_USERS_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.ADMIN_EXPORT_USERS_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.ADMIN_EXPORT_USERS_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const adminChangeUserActivityAction =
  (form) => async (dispatch, getState) => {
    try {
      dispatch({
        type: constants.ADMIN_CHANGE_USER_ACTIVITY_LOAD_CONSTANT,
      });
      const { config } = utils.ActionsAxiosUtility({
        url: "/api/auth/admin/",
        method: "POST",
        timeout: 10000,
        form: form,
        getState: getState,
      });
      const { data } = await axios(config);
      if (data.response) {
        const response = data.response;
        dispatch({
          type: constants.ADMIN_CHANGE_USER_ACTIVITY_DATA_CONSTANT,
          payload: response,
        });
      } else {
        const response = data.error;
        dispatch({
          type: constants.ADMIN_CHANGE_USER_ACTIVITY_ERROR_CONSTANT,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constants.ADMIN_CHANGE_USER_ACTIVITY_FAIL_CONSTANT,
        payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
      });
    }
  };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const terminalRebootAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.TERMINAL_REBOOT_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/admin/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.TERMINAL_REBOOT_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.TERMINAL_REBOOT_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.TERMINAL_REBOOT_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom action
export const salaryUserAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_SALARY_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/salary/",
      method: "POST",
      timeout: 20000,
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
        type: constants.USER_SALARY_DATA_CONSTANT,
        payload: { excelPath: excelPath, headers: headers, tables: tables },
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_SALARY_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_SALARY_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const vacationUserAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_VACATION_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/vacation/",
      method: "POST",
      timeout: 15000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.USER_VACATION_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.USER_VACATION_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.USER_VACATION_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ideaCreateAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_CREATE_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_CREATE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_CREATE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_CREATE_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const ideaListAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_LIST_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_LIST_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_LIST_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_LIST_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const ideaDetailAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_DETAIL_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_DETAIL_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_DETAIL_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_DETAIL_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const ideaChangeAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_CHANGE_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_CHANGE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_CHANGE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_CHANGE_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const ideaModerateAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_MODERATE_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_MODERATE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_MODERATE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_MODERATE_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const ideaCommentCreateAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_COMMENT_CREATE_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_COMMENT_CREATE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_COMMENT_CREATE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_COMMENT_CREATE_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const ideaCommentDeleteAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_COMMENT_DELETE_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_COMMENT_DELETE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_COMMENT_DELETE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_COMMENT_DELETE_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const ideaRatingCreateAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_RATING_CREATE_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_RATING_CREATE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_RATING_CREATE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_RATING_CREATE_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const ideaAuthorListAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.IDEA_AUTHOR_LIST_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/idea/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.IDEA_AUTHOR_LIST_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.IDEA_AUTHOR_LIST_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.IDEA_AUTHOR_LIST_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////TODO test action
export const rationalCreateAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RATIONAL_CREATE_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/rational/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.RATIONAL_CREATE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.RATIONAL_CREATE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RATIONAL_CREATE_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const rationalListAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RATIONAL_LIST_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/rational/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.RATIONAL_LIST_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.RATIONAL_LIST_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RATIONAL_LIST_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const rationalDetailAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RATIONAL_DETAIL_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/rational/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.RATIONAL_DETAIL_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.RATIONAL_DETAIL_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RATIONAL_DETAIL_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const vacancyCreateAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.VACANCY_CREATE_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/rational/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.VACANCY_CREATE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.VACANCY_CREATE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.VACANCY_CREATE_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const vacancyListAction = (form) => async (dispatch) => {
  try {
    dispatch({
      type: constants.VACANCY_LIST_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/any/vacancy/",
      method: "POST",
      timeout: 10000,
      form: form,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.VACANCY_LIST_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.VACANCY_LIST_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.VACANCY_LIST_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const vacancyDetailAction = (form) => async (dispatch) => {
  try {
    dispatch({
      type: constants.VACANCY_DETAIL_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/any/vacancy/",
      method: "POST",
      timeout: 10000,
      form: form,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.VACANCY_DETAIL_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.VACANCY_DETAIL_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.VACANCY_DETAIL_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const vacancyDeleteAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.VACANCY_DELETE_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/vacancy/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.VACANCY_DELETE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.VACANCY_DELETE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.VACANCY_DELETE_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const vacancyChangeAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.VACANCY_CHANGE_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/vacancy/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.VACANCY_CHANGE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.VACANCY_CHANGE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.VACANCY_CHANGE_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const resumeCreateAction = (form) => async (dispatch) => {
  try {
    dispatch({
      type: constants.RESUME_CREATE_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/any/resume/",
      method: "POST",
      timeout: 10000,
      form: form,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.RESUME_CREATE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.RESUME_CREATE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RESUME_CREATE_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const resumeListAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RESUME_LIST_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/resume/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.RESUME_LIST_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.RESUME_LIST_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RESUME_LIST_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const resumeDetailAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RESUME_DETAIL_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/resume/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.RESUME_DETAIL_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.RESUME_DETAIL_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RESUME_DETAIL_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
export const resumeDeleteAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.RESUME_DELETE_LOAD_CONSTANT,
    });
    const { config } = utils.ActionsAxiosUtility({
      url: "/api/auth/resume/",
      method: "POST",
      timeout: 10000,
      form: form,
      getState: getState,
    });
    const { data } = await axios(config);
    if (data.response) {
      const response = data.response;
      dispatch({
        type: constants.RESUME_DELETE_DATA_CONSTANT,
        payload: response,
      });
    } else {
      const response = data.error;
      dispatch({
        type: constants.RESUME_DELETE_ERROR_CONSTANT,
        payload: response,
      });
    }
  } catch (error) {
    dispatch({
      type: constants.RESUME_DELETE_FAIL_CONSTANT,
      payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
    });
  }
};
