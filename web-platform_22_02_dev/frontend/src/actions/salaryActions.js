import axios from "axios";
import {
  USER_SALARY_LOADING_CONSTANT,
  USER_SALARY_DATA_CONSTANT,
  USER_SALARY_ERROR_CONSTANT,
  USER_SALARY_SUCCESS_CONSTANT,
  USER_SALARY_RESET_CONSTANT,
  USER_SALARY_DEFAULT_CONSTANT,
} from "../constants/salaryConstants";

export const salaryUserAction = (dateTime) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_SALARY_LOADING_CONSTANT,
    });

    const {
      userLogin: { userToken },
    } = getState();

    const { data } = await axios({
      url: "api/salary/",
      method: "POST",
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken.token}`,
      },
      data: {
        "Action-type": "SALARY",
        body: { dateTime: dateTime },
      },
    });
    const response = data["response"];
    console.log("SALARY: ", response);

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
  } catch (error) {
    dispatch({
      type: USER_SALARY_ERROR_CONSTANT,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
