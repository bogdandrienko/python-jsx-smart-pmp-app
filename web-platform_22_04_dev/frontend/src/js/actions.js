// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constants from "./constants";
import * as utils from "./utils";

// TODO profile ////////////////////////////////////////////////////////////////////////////////////////////////////////

export const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("userToken");
  dispatch({ type: constants.USER_LOGIN.reset });
  dispatch({ type: constants.USER_DETAIL.reset });
  dispatch({ type: constants.USER_CHANGE.reset });
  dispatch({ type: constants.USER_RECOVER_PASSWORD.reset });
  dispatch({ type: constants.USER_SALARY.reset });
  dispatch({ type: constants.USER_VACATION.reset });
};

// TODO buhgalteria ////////////////////////////////////////////////////////////////////////////////////////////////////

export const salaryUserAction = (form) => async (dispatch, getState) => {
  try {
    dispatch({
      type: constants.USER_SALARY.load,
    });
    const { config } = utils.AxiosConfigConstructorUtility({
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
