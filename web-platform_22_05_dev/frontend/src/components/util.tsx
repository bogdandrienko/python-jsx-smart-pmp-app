// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import axios from "axios";

import { FormEvent, MouseEvent } from "react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useLocation, useNavigate } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as action from "./action";
import * as constant from "./constant";
import * as router from "./router";
import * as hook from "./hook";

import * as slice from "./slice";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// TODO constructors ///////////////////////////////////////////////////////////////////////////////////////////////////

export function ConstructorSlice1(
  constantName: string,
  connectReducerCallback: any,
  actionStore: any
) {
  const constantLocal = ConstantConstructor1(constantName);
  const reducerLocal = ConstructorReducer1(constantLocal);
  // @ts-ignore
  connectReducerCallback(constantName, reducerLocal);
  return {
    name: constantName,
    constant: constantLocal,
    reducer: reducerLocal,
    action: actionStore,
  };
}

export function ConstantConstructor1(name: string) {
  return {
    load: name + "_LOAD_CONSTANT",
    data: name + "_DATA_CONSTANT",
    error: name + "_ERROR_CONSTANT",
    fail: name + "_FAIL_CONSTANT",
    reset: name + "_RESET_CONSTANT",
  };
}

export function ConstructorReducer1(
  constantStore = { load: {}, data: {}, error: {}, fail: {}, reset: {} }
) {
  return function (state = {}, action = null) {
    // @ts-ignore
    switch (action.type) {
      case constantStore.load:
        return { load: true };
      case constantStore.data:
        return {
          load: false,
          // @ts-ignore
          data: action.payload,
        };
      case constantStore.error:
        return {
          load: false,
          // @ts-ignore
          error: action.payload,
        };
      case constantStore.fail:
        // @ts-ignore
        return { load: false, fail: action.payload };
      case constantStore.reset:
        return {};
      default:
        return state;
    }
  };
}

export function ConstructorAction1(
  form: object,
  url: string,
  method: string,
  timeout: number,
  constantStore = { load: {}, data: {}, error: {}, fail: {}, reset: {} },
  authentication: boolean
) {
  return async function (dispatch: Dispatch<any>, getState: any) {
    try {
      dispatch({
        type: constantStore.load,
      });

      // add "Action-Type" to { url | formData }
      form = {
        ...form,
        // @ts-ignore
        "Action-Type": constantStore.data.split("_")[0],
      };

      // add {form} to "request.GET" GET | DELETE
      if (method === "GET" || method === "DELETE") {
        url = url + `?`;
        // eslint-disable-next-line array-callback-return
        Object.entries(form).map(([key, value]) => {
          url = url + `${key}=${value}&`;
        });
        url = url.slice(0, -1);
      }

      const formData = new FormData();
      // add {form} to "request.data" POST | PUT
      if (method === "POST" || method === "PUT") {
        // eslint-disable-next-line array-callback-return
        Object.entries(form).map(([key, value]) => {
          // @ts-ignore
          formData.append(key, value);
        });
      }

      // add Authorization to headers
      let config = {};
      if (authentication) {
        try {
          const {
            userLoginStore: { data: userLogin },
          } = getState();
          config = {
            url: url,
            method: method,
            timeout: timeout,
            timeoutErrorMessage: "timeout error",
            headers: {
              // @ts-ignore
              Authorization: `Bearer ${userLogin.token}`,
            },
            data: formData,
          };
        } catch (error) {
          dispatch({
            type: constantStore.fail,
            payload: ConstructorActionFail1(dispatch, error),
          });
        }
      } else {
        config = {
          url: url,
          method: method,
          timeout: timeout,
          timeoutErrorMessage: "timeout error",
          headers: {},
          data: formData,
        };
      }

      // @ts-ignore
      const { data } = await axios(config);
      if (data.response) {
        const response = data.response;
        dispatch({
          type: constantStore.data,
          payload: response,
        });
      } else {
        const response = data.error;
        dispatch({
          type: constantStore.error,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: constantStore.fail,
        payload: ConstructorActionFail1(dispatch, error),
      });
    }
  };
}

// @ts-ignore
export function ConstructorActionFail1(dispatch: Dispatch<any>, error: any) {
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
          dispatch(action.user.logout());
          return "Ваши данные для входа не получены! Попробуйте выйти из системы и снова войти.";
        case 413:
          return "Ваш файл слишком большой! Измените его размер и перезагрузите страницу перед отправкой.";
        case 500:
          dispatch(action.user.logout());
          return "Ваши данные для входа не получены! Попробуйте выйти из системы и снова войти.";
        case "timeout":
          return "Превышено время ожидания! Попробуйте повторить действие или ожидайте исправления.";
        default:
          return "Неизвестная ошибка! Обратитесь к администратору.";
      }
    }
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
      console.log("ConstructorActionFail1: ", error);
    }
    return "Неизвестная ошибка! Обратитесь к администратору.";
  }
}

// TODO custom /////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    if (
      access === "all" ||
      userGroups.includes("superuser") ||
      userGroups.includes(access)
    ) {
      return true;
    }
  }
  return false;
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

export const PageLogic = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const userLoginStore = hook.useSelectorCustom2(slice.user.userLoginStore);
  const userDetailStore = hook.useSelectorCustom2(slice.user.userDetailStore);

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // TODO variable /////////////////////////////////////////////////////////////////////////////////////////////////////

  const { access } = GetInfoPage(location.pathname);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (userLoginStore.data) {
      localStorage.setItem("userToken", JSON.stringify(userLoginStore.data));
      dispatch(slice.user.userDetailStore.action({ form: {} }));
      // dispatch(
      //   slice.notification.notificationReadListStore.action({
      //     form: {
      //       limit: 1,
      //       page: 1,
      //     },
      //   })
      // );
    }
  }, [userLoginStore.data]);

  useEffect(() => {
    if (userDetailStore.data && userDetailStore.data["user_model"]) {
      if (
        !CheckPageAccess(userDetailStore.data["group_model"], access) &&
        location.pathname !== "/"
      ) {
        navigate("/");
      }
      if (userDetailStore.data["user_model"]["is_active_account"] === false) {
        dispatch(action.user.logout());
      }
      if (
        (!userDetailStore.data["user_model"]["secret_question"] ||
          !userDetailStore.data["user_model"]["secret_answer"]) &&
        location.pathname !== "/password/change" &&
        location.pathname !== "/"
      ) {
        navigate("/password/change");
      }
    }
  }, [userDetailStore.data]);

  // useEffect(() => {
  //   if (userLoginStore.data && userDetailStore.data) {
  // @ts-ignore
  // function updateNotification() {
  //   dispatch(
  //     slice.notification.notificationReadListStore.action({
  //       form: {
  //         limit: 1,
  //         page: 1,
  //       },
  //     })
  //   );
  // }

  // const timeDelay = 10000;
  // const timeMultiply = 1;
  // for (let i = 1; i <= 10; i++) {
  //   util.Delay(() => updateNotification(), timeDelay * i * timeMultiply);
  // }

  // util.Delay(() => updateNotification(), 10000);
  // util.Delay(() => updateNotification(), 30000);
  // util.Delay(() => updateNotification(), 50000);
  // util.Delay(() => updateNotification(), 100000);
  // util.Delay(() => updateNotification(), 500000);
  // util.Delay(() => updateNotification(), 1000000);

  //   let timerId;
  //   clearTimeout(timerId);
  //   timerId = setTimeout(
  //     function tick() {
  //       dispatch(
  //         action.Notification.GetList({ form: { limit: 1, page: 1 } })
  //       );
  //       timerId = setTimeout(tick, constant.DEBUG_CONSTANT ? 10000 : 30000);
  //     },
  //     constant.DEBUG_CONSTANT ? 10000 : 30000
  //   );
  //   }
  // }, [userDetailStore.data]);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return <div className="d-none">.</div>;
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

export const GetCurrentDate = (withTime = true, yearAppend = 0) => {
  try {
    const today = new Date();
    let year = today.getFullYear() + yearAppend;
    let month = today.getMonth() + 1;
    if (month < 10) {
      // @ts-ignore
      month = `0${month}`;
    }
    let day = today.getDate();
    if (day < 10) {
      // @ts-ignore
      day = `0${day}`;
    }
    let time = today.getTime();
    if (withTime) {
      return `${year}-${month}-${day}T${time}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
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
    if (constant.DEBUG_CONSTANT) {
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
        // @ts-ignore
        month = `0${month}`;
      }
      return `${month}`;
    } else {
      return `${month}`;
    }
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
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
        // @ts-ignore
        day = `0${day}`;
      }
      return `${day}`;
    } else {
      return `${day}`;
    }
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
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

export class RegularExpression {
  static haveSmallChar() {
    return /^(?=.*[a-z])/;
  }
  static haveBigChar() {
    return /^(?=.*[A-Z])/;
  }
  static haveInteger() {
    return /^(?=.*\d)/; // /^(?=.*[0-9])/;
  }
  static haveSpecificChar() {
    return /^(?=.*[!@#$%^&*])/;
  }
  static lengthMinAndMax() {
    return /^(?=.{8,})/;
  }
  static haveSmallAndBigChars() {
    return /^(?=.*[a-z])(?=.*[A-Z])/;
  }
  static StrongPassword() {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  }
  static VeryStrongPassword() {
    return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})", "g");
  }
  static GetRegexType({
    numbers = false,
    latin = false,
    cyrillic = false,
    onlyLowerLetters = false,
    lowerSpace = false,
    space = false,
    punctuationMarks = false,
    email = false,
  }) {
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
  }
}

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

export const GetRoutes = (privateRoute = true) => {
  try {
    // @ts-ignore
    let routes = [];
    // @ts-ignore
    router.modules.map((module) =>
      // @ts-ignore
      module.Sections.map((section) =>
        // @ts-ignore
        // eslint-disable-next-line array-callback-return
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

export const EventForm1 = (
  event: FormEvent<any>,
  preventDefault = true,
  stropPropagation = true,
  callBack: any
) => {
  try {
    if (preventDefault) {
      event.preventDefault();
    }
    if (stropPropagation) {
      event.stopPropagation();
    }
    callBack();
    return true;
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
      console.log(error);
    }
    return "";
  }
};

export const EventMouse1 = (
  event: MouseEvent<any>,
  preventDefault = true,
  stropPropagation = true,
  callBack: any
) => {
  try {
    if (preventDefault) {
      event.preventDefault();
    }
    if (stropPropagation) {
      event.stopPropagation();
    }
    callBack();
    return true;
  } catch (error) {
    if (constant.DEBUG_CONSTANT) {
      console.log("EventMouse1: ", error);
    }
    return undefined;
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
