// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constants from "./constants";
import * as utils from "./utils";
import * as actions from "./actions";

// TODO constructors ///////////////////////////////////////////////////////////////////////////////////////////////////

export function ActionConstructorUtility(form, url, method, timeout, constant) {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: constant.load,
      });
      let config = {};
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        formData.append(key, value);
      });
      if (getState) {
        const {
          userLoginStore: { data: userLogin },
        } = getState();
        if (userLogin !== null) {
          config = {
            url: url,
            method: method,
            timeout: timeout,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userLogin.token}`,
            },
            data: formData,
          };
        }
      } else {
        config = {
          url: url,
          method: method,
          timeout: timeout,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        };
      }
      const { data } = await axios(config);
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
        payload: utils.ActionsFailUtility({ dispatch: dispatch, error: error }),
      });
    }
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
    if (constants.DEBUG_CONSTANT) {
      console.log("ReducerConstructorUtility: ", error);
    }
  }
}

export function ConstantConstructorUtility(name = "") {
  return {
    load: name + "_LOAD_CONSTANT",
    data: name + "_DATA_CONSTANT",
    error: name + "_ERROR_CONSTANT",
    fail: name + "_FAIL_CONSTANT",
    reset: name + "_RESET_CONSTANT",
  };
}

export const AxiosConfigConstructorUtility = ({
  url = "",
  method = "GET",
  timeout = 10000,
  form,
  getState = null,
}) => {
  try {
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    if (getState) {
      const {
        userLoginStore: { data: userLogin },
      } = getState();
      if (userLogin !== null) {
        const config = {
          url: url,
          method: method,
          timeout: timeout,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userLogin.token}`,
          },
          data: formData,
        };
        return { config };
      }
    }
    const config = {
      url: url,
      method: method,
      timeout: timeout,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
    return { config };
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(
        `ActionsFormDataUtilityError: ${url} ${form["Action-type"]}`,
        error
      );
    }
  }
};

// TODO page ///////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CheckAccess = (userDetailsStore, slug) => {
  try {
    const {
      // load: loadUserDetails,
      data: dataUserDetails,
      // error: errorUserDetails,
      // fail: failUserDetails,
    } = userDetailsStore;
    if (slug === "all" || slug.includes("all")) {
      return true;
    }
    if (dataUserDetails && dataUserDetails["group_model"]) {
      if (dataUserDetails["group_model"].includes("superuser")) {
        return true;
      }
      if (typeof slug === "string") {
        return dataUserDetails["group_model"].includes(slug);
      } else {
        for (let object of slug) {
          if (dataUserDetails["group_model"].includes(object)) {
            return true;
          }
        }
      }
    }
    return false;
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return false;
  }
};

export const CheckPageAccess = (userDetailsStore, path) => {
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;
  if (dataUserDetails && dataUserDetails["group_model"]) {
    if (dataUserDetails["group_model"].includes("superuser")) {
      return true;
    }
  }
  for (let module of constants.modules) {
    for (let section of module.Sections) {
      for (let link of section.Links) {
        if (
          !link.Link.ExternalLink &&
          link.Link.split("/")[1] === path.split("/")[1]
        ) {
          if (typeof link.Access === "string") {
            if (link.Access === "all") {
              return true;
            }
            if (dataUserDetails && dataUserDetails["group_model"]) {
              if (
                dataUserDetails["group_model"].includes("superuser") ||
                dataUserDetails["group_model"].includes(link.Access)
              ) {
                return true;
              }
            }
          } else {
            if (link.Access.includes("all")) {
              return true;
            }
            if (dataUserDetails && dataUserDetails["group_model"]) {
              for (let object of link.Access) {
                if (dataUserDetails["group_model"].includes(object)) {
                  return true;
                }
              }
            }
          }
        }
      }
    }
  }
};

export const GetInfoPage = (path) => {
  for (let module of constants.modules) {
    for (let section of module.Sections) {
      for (let link of section.Links) {
        if (
          !link.Link.ExternalLink &&
          link.Link.split("/")[1] === path.split("/")[1]
        ) {
          return {
            title: link.Title,
            description: link.Description,
            logic: link.Logic,
            redirect: link.Redirect,
          };
        }
      }
    }
  }
  return {
    title: "Страница",
    description: "страница веб платформы",
    logic: true,
    redirect: true,
  };
};

// TODO base utils /////////////////////////////////////////////////////////////////////////////////////////////////////

export const ActionsFailUtility = ({ dispatch, error }) => {
  try {
    if (constants.DEBUG_CONSTANT) {
      console.log("fail: ", error);
    }
    if (error) {
      let status = error.response.status
        ? error.response.status
        : error.response.message
        ? error.response.message
        : error.response.data.detail;
      if (status && `${status}___________`.slice(0, 7) === "timeout") {
        status = "timeout";
      }
      switch (status) {
        case 401:
          dispatch(actions.userLogoutAction());
          return "Ваши данные для входа не получены! Попробуйте выйти из системы и снова войти.";
        case 413:
          return "Ваш файл слишком большой! Измените его размер и перезагрузите страницу перед отправкой.";
        case 500:
          dispatch(actions.userLogoutAction());
          return "Ваши данные для входа не получены! Попробуйте выйти из системы и снова войти.";
        case "timeout":
          return "Превышено время ожидания! Попробуйте повторить действие или ожидайте исправления.";
        default:
          return "Неизвестная ошибка! Обратитесь к администратору.";
      }
    }
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log("ActionsFailUtilityError: ", error);
    }
  }
};

export const Sleep = (time = 1000) => {
  try {
    return new Promise((resolve) => setTimeout(resolve, time));
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};

// TODO custom /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const GetSliceString = (string = "", length = 30, withDots = true) => {
  try {
    if (string == null) {
      return "";
    }
    if (`${string}`.length >= length) {
      if (withDots) {
        return `${string}`.slice(0, length) + "...";
      } else {
        return `${string}`.slice(0, length);
      }
    } else {
      return string;
    }
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return "";
  }
};

export const GetStaticFile = (path = "") => {
  try {
    if (path === "null" || path === "/media/null" || path == null) {
      return "";
    }
    return `/static${path}`;
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return "";
  }
};

export const GetCleanDateTime = (dateTime, withTime = true) => {
  try {
    const date = dateTime.split("T")[0];
    const time = dateTime.split("T")[1].slice(0, 5);
    if (withTime) {
      return `${date} ${time}`;
    } else {
      return `${date}`;
    }
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return "";
  }
};

export const ChangePasswordVisibility = (objects = [""]) => {
  try {
    objects.forEach(function (object, index, array) {
      const obj = document.getElementById(object);
      const type =
        obj.getAttribute("type") === "password" ? "text" : "password";
      obj.setAttribute("type", type);
    });
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};

export const ChangeObjectsByIdVisibility = (objects = [""]) => {
  try {
    objects.forEach(function (object, index, array) {
      const obj = document.getElementById(object);
      const classname = obj.getAttribute("class") === "d-none" ? "" : "d-none";
      obj.setAttribute("class", classname);
    });
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};

export const ChangeAccordionCollapse = (objects = [""]) => {
  try {
    objects.forEach(function (object, index, array) {
      const obj = document.getElementById(object);
      const classname =
        obj.getAttribute("class") === "accordion-collapse collapse m-0 p-0"
          ? "accordion-collapse m-0 p-0"
          : "accordion-collapse collapse m-0 p-0";
      obj.setAttribute("class", classname);
    });
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};

export const GetRegexType = ({
  numbers = false,
  latin = false,
  cyrillic = false,
  onlyLowerLetters = false,
  lowerSpace = false,
  space = false,
  punctuationMarks = false,
  email = false,
}) => {
  try {
    let regex = "";
    if (numbers) {
      regex = regex + "0-9";
    }
    if (latin) {
      if (onlyLowerLetters) {
        regex = regex + "a-z";
      } else {
        regex = regex + "A-Za-z";
      }
    }
    if (cyrillic) {
      if (onlyLowerLetters) {
        regex = regex + "а-яё";
      } else {
        regex = regex + "А-ЯЁа-яё";
      }
    }
    if (lowerSpace) {
      regex = regex + "_";
    }
    if (space) {
      regex = regex + " ";
    }
    if (punctuationMarks) {
      regex = regex + "-:;.,!?_";
    }
    if (email) {
      regex = regex + "@.";
    }
    return new RegExp(`[^${regex}]`, "g");
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return new RegExp(`[^_]`, "g");
  }
};

export const GetCurrentDate = (withTime = true, yearAppend = 0) => {
  try {
    const today = new Date();
    let year = today.getFullYear() + yearAppend;
    let month = today.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = today.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    let time = today.getTime();
    if (withTime) {
      return `${year}-${month}-${day}T${time}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};

export const GetCurrentYear = (yearAppend = 0) => {
  try {
    const today = new Date();
    let year = today.getFullYear() + yearAppend;
    return `${year}`;
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};

export const GetCurrentMonth = (withZero = false, yearMonth = 0) => {
  try {
    const today = new Date();
    let month = today.getMonth() + 1 + yearMonth;
    if (month > 12) {
      month = month - 12;
    }
    if (month < 0) {
      month = month + 12;
    }
    if (withZero) {
      if (month < 10) {
        month = `0${month}`;
      }
      return `${month}`;
    } else {
      return `${month}`;
    }
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};

export const GetCurrentDay = (withZero = false) => {
  try {
    const today = new Date();
    let day = today.getDate();
    if (withZero) {
      if (day < 10) {
        day = `0${day}`;
      }
      return `${day}`;
    } else {
      return `${day}`;
    }
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};
