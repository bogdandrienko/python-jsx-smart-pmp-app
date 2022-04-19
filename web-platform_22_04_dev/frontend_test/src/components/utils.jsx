// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import axios from "axios";

// TODO constructors ///////////////////////////////////////////////////////////////////////////////////////////////////

export function ConstantConstructorUtility(name = "") {
  return {
    load: name + "_LOAD_CONSTANT",
    data: name + "_DATA_CONSTANT",
    error: name + "_ERROR_CONSTANT",
    fail: name + "_FAIL_CONSTANT",
    reset: name + "_RESET_CONSTANT",
  };
}

export function ReducerConstructorUtility({ load, data, error, fail, reset }) {
  try {
    return function (state = {}, action = null) {
      switch (action.type) {
        case load:
          return { load: true };
        case data:
          return {
            load: false,
            data: action.payload,
          };
        case error:
          return {
            load: false,
            error: action.payload,
          };
        case fail:
          return { load: false, fail: action.payload };
        case reset:
          return {};
        default:
          return state;
      }
    };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.log("ReducerConstructorUtility: ", error);
    }
  }
}

export function ActionConstructorUtility(constant) {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: constant.load,
      });
      const { data } = await axios.get("/api/post/", {
        params: {
          page: 1,
          limit: 10,
        },
      });
      if (data.response) {
        const response = data.response;
        dispatch({
          type: constant.data,
          payload: response,
        });
      } else {
        const response = data.error;
        dispatch({
          type: constant.error,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constant.fail,
        payload: error,
      });
    }
  };
}

// TODO custom /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages) => {
  let result = [];
  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1);
  }
  return result;
};
