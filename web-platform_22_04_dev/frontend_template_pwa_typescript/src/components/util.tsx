// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as action from "./action";
import * as constant from "./constant";
import * as router from "./router";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO constructors ///////////////////////////////////////////////////////////////////////////////////////////////////

export function ActionConstructorUtility(
  // @ts-ignore
  form,
  // @ts-ignore
  url,
  // @ts-ignore
  method,
  // @ts-ignore
  timeout,
  // @ts-ignore
  constant,
  auth = true
) {
  // @ts-ignore
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: constant.load,
      });
      let config = {};
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        // @ts-ignore
        formData.append(key, value);
      });
      if (auth) {
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
        payload: ActionsFailUtility({ dispatch: dispatch, error: error }),
      });
    }
  };
}

export function ActionConstructor1({
  // @ts-ignore
  form,
  // @ts-ignore
  url,
  // @ts-ignore
  method,
  // @ts-ignore
  timeout,
  // @ts-ignore
  constant,
  // @ts-ignore
  authentication,
}) {
  // @ts-ignore
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: constant.load,
      });
      const formData = new FormData();
      Object.entries(form).map(([key, value]) => {
        // @ts-ignore
        formData.append(key, value);
      });

      const config = {
        url: url,
        method: method,
        timeout: timeout,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };

      if (authentication) {
        try {
          const {
            userLoginStore: { data: userLogin },
          } = getState();
          config.headers = {
            ...config.headers,
            // @ts-ignore
            Authorization: `Bearer ${userLogin.token}`,
          };
        } catch (error) {}
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
        payload: ActionsFailUtility({ dispatch: dispatch, error: error }),
      });
    }
  };
}

// @ts-ignore
export function ReducerConstructorUtility({ load, data, error, fail, reset }) {
  try {
    return function (state = {}, action = null) {
      // @ts-ignore
      switch (action.type) {
        case load:
          return { load: true };
        case data:
          return {
            load: false,
            // @ts-ignore
            data: action.payload,
          };
        case error:
          return {
            load: false,
            // @ts-ignore
            error: action.payload,
          };
        case fail:
          // @ts-ignore
          return { load: false, fail: action.payload };
        case reset:
          return {};
        default:
          return state;
      }
    };
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
      console.log("ReducerConstructorUtility: ", error);
    }
  }
}

export const AxiosConfigConstructor = ({
  url = "",
  method = "GET",
  timeout = 10000,
  // @ts-ignore
  form,
  getState = null,
}) => {
  try {
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      // @ts-ignore
      formData.append(key, value);
    });
    if (getState) {
      const {
        userLoginStore: { data: userLogin },
        // @ts-ignore
      } = getState();
      if (userLogin.token) {
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
    } else {
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
    }
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
      console.log(
        `ActionsFormDataUtilityError: ${url} ${form["Action-type"]}`,
        error
      );
    }
  }
};

// @ts-ignore
export const ActionsFailUtility = ({ dispatch, error }) => {
  try {
    if (constant.DEBUG_CONSTANT) {
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
          dispatch(action.User.UserLogoutAction({}));
          return "Ваши данные для входа не получены! Попробуйте выйти из системы и снова войти.";
        case 413:
          return "Ваш файл слишком большой! Измените его размер и перезагрузите страницу перед отправкой.";
        case 500:
          dispatch(action.User.UserLogoutAction({}));
          return "Ваши данные для входа не получены! Попробуйте выйти из системы и снова войти.";
        case "timeout":
          return "Превышено время ожидания! Попробуйте повторить действие или ожидайте исправления.";
        default:
          return "Неизвестная ошибка! Обратитесь к администратору.";
      }
    }
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
      console.log("ActionsFailUtilityError: ", error);
    }
  }
};

export function ConstantConstructorUtility(name = "") {
  return {
    load: name + "_LOAD_CONSTANT",
    data: name + "_DATA_CONSTANT",
    error: name + "_ERROR_CONSTANT",
    fail: name + "_FAIL_CONSTANT",
    reset: name + "_RESET_CONSTANT",
  };
}

// @ts-ignore
export function StoreReducerConstructorUtility(name = "", callback) {
  const store = ConstantConstructorUtility(name);
  callback(name, ReducerConstructorUtility(store));
  return store;
}

// TODO custom /////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
export const getPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

// @ts-ignore
export const getPagesArray = (totalPages) => {
  let result = [];
  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1);
  }
  return result;
};

export const GetSliceString = (string = "", length = 30, withDots = true) => {
  try {
    if (string == null || string === "null") {
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
    if (constant.DEBUG_CONSTANT) {
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
    if (constant.DEBUG_CONSTANT) {
      console.log(error);
    }
    return "";
  }
};

// @ts-ignore
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
    if (constant.DEBUG_CONSTANT) {
      console.log(error);
    }
    return "";
  }
};

export const ChangeAccordionCollapse = (objects = [""]) => {
  try {
    objects.forEach(function (object, index, array) {
      const obj = document.getElementById(object);
      const classname =
        // @ts-ignore
        obj.getAttribute("class") === "accordion-collapse collapse m-0 p-0"
          ? "accordion-collapse m-0 p-0"
          : "accordion-collapse collapse m-0 p-0";
      // @ts-ignore
      obj.setAttribute("class", classname);
    });
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};

export const ChangePasswordVisibility = (objects = [""]) => {
  try {
    objects.forEach(function (object, index, array) {
      const obj = document.getElementById(object);
      const type =
        // @ts-ignore
        obj.getAttribute("type") === "password" ? "text" : "password";
      // @ts-ignore
      obj.setAttribute("type", type);
    });
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
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
    if (constant.DEBUG_CONSTANT) {
      console.log(error);
    }
    return new RegExp(`[^_]`, "g");
  }
};

// @ts-ignore
export const Delay = (callbackAfterDelay, time = 1000) => {
  try {
    new Promise((resolve) => setTimeout(resolve, time)).then(() => {
      callbackAfterDelay();
    });
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};

export const Sleep = (time = 1000) => {
  try {
    return new Promise((resolve) => setTimeout(resolve, time));
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
      console.log(error);
    }
    return null;
  }
};

export const GetPagesArray = (totalCount = 0, limit = 1) => {
  try {
    const page = Math.ceil(totalCount / limit);
    let result = [];
    if (totalCount) {
      for (let i = 0; i < page; i++) {
        result.push(i + 1);
      }
    }
    return result;
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
      console.log(error);
    }
    return [];
  }
};

export const GetRoutes = (privateRoute = true) => {
  try {
    // @ts-ignore
    let routes = [];
    // @ts-ignore
    router.modules.map((module) =>
      // @ts-ignore
      module.Sections.map((section) =>
        // @ts-ignore
        section.Links.map((link) => {
          if (privateRoute) {
            // @ts-ignore
            if (link.private === true) {
              routes.push({ path: link.path, element: link.element });
            } else {
              // @ts-ignore
              if (link.private === "all") {
                routes.push({ path: link.path, element: link.element });
              }
            }
          } else {
            // @ts-ignore
            if (link.private === false) {
              routes.push({ path: link.path, element: link.element });
            } else {
              // @ts-ignore
              if (link.private === "all") {
                routes.push({ path: link.path, element: link.element });
              }
            }
          }
        })
      )
    );
    // @ts-ignore
    return routes;
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
      console.log(error);
    }
    return [];
  }
};

// @ts-ignore
export const GetInfoPage = (path) => {
  for (let module of router.modules) {
    for (let section of module.Sections) {
      for (let link of section.Links) {
        if (link.Link.split("/").includes(":id")) {
          if (
            link.Link.split("/")
              .slice(0, -1)
              .every((v, i) => v === path.split("/").slice(0, -1)[i])
          ) {
            return {
              title: link.Title,
              description: link.Description,
              access: link.Access,
            };
          }
        } else {
          if (link.Link === path) {
            return {
              title: link.Title,
              description: link.Description,
              access: link.Access,
            };
          }
        }
      }
    }
  }
  return {
    title: "Страница",
    description: "страница веб платформы",
    access: ["null"],
  };
};

// @ts-ignore
export const CheckAccess = (userDetailStore, slug) => {
  try {
    if (slug === "all" || slug.includes("all")) {
      return true;
    }
    if (userDetailStore.data && userDetailStore.data["group_model"]) {
      if (userDetailStore.data["group_model"].includes("superuser")) {
        return true;
      }
      if (typeof slug === "string") {
        return userDetailStore.data["group_model"].includes(slug);
      } else {
        for (let object of slug) {
          if (userDetailStore.data["group_model"].includes(object)) {
            return true;
          }
        }
      }
    }
    return false;
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
      console.log(error);
    }
    return false;
  }
};

// @ts-ignore
export const CheckPageAccess = (userGroups, pageAccess) => {
  for (let access of pageAccess) {
    if (access === "all" || userGroups.includes(access)) {
      return true;
    }
  }
  return false;
};
