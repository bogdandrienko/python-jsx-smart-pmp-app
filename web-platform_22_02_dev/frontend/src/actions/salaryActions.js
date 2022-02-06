import axios from "axios";
import {
  USER_SALARY_LOADING_CONSTANT,
  USER_SALARY_DATA_CONSTANT,
  USER_SALARY_ERROR_CONSTANT,
  USER_SALARY_RESET_CONSTANT,
  USER_SALARY_DEFAULT_CONSTANT,
} from "../constants/salaryConstants";

export const salaryUserAction = (dateTime) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_SALARY_LOADING_CONSTANT,
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
      `/api/salary`,
      { Datetime: `${dateTime}` },
      config
    );

    const excel_path = data["excel_path"];

    const headers = [];
    for (let i in data) {
      if (i !== "global_objects" && i !== "excel_path") {
        headers.push([i, data[i]]);
      }
    }

    const tables = [];
    tables.push(["1.Начислено", data["global_objects"]["1.Начислено"]]);
    tables.push(["2.Удержано", data["global_objects"]["2.Удержано"]]);
    tables.push([
      "3.Доходы в натуральной форме",
      data["global_objects"]["3.Доходы в натуральной форме"],
    ]);
    tables.push(["4.Выплачено", data["global_objects"]["4.Выплачено"]]);
    tables.push([
      "5.Налоговые вычеты",
      data["global_objects"]["5.Налоговые вычеты"],
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
