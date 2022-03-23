/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as constants from "./constants";
import * as actions from "./actions";
import { userLogoutAction } from "./actions";
/////////////////////////////////////////////////////////////////////////////////////////////////////////TODO base utils
export const CheckAccess = (userDetailsStore, slug) => {
  try {
    const {
      // load: loadUserDetails,
      data: dataUserDetails,
      // error: errorUserDetails,
      // fail: failUserDetails,
    } = userDetailsStore;
    if (slug === "all") {
      return true;
    }
    if (dataUserDetails) {
      if (dataUserDetails["group_model"]) {
        if (typeof slug === "string") {
          return dataUserDetails["group_model"].includes(slug);
        } else {
          let access = false;
          slug.forEach(function (object, index, array) {
            if (dataUserDetails["group_model"].includes(object)) {
              access = true;
            }
          });
          return access;
        }
      }
      return false;
    }
    return false;
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log(error);
    }
    return false;
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const CheckPageAccess = (userDetailsStore, location) => {
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;
  let access = false;
  constants.modules.forEach(function (module, index, array) {
    module.Sections.forEach(function (section, index, array) {
      section.Links.forEach(function (link, index, array) {
        if (link.Link.split("/")[1] === location.pathname.split("/")[1]) {
          if (typeof link.Access === "string") {
            if (link.Access === "all") {
              access = true;
            }
            if (dataUserDetails && dataUserDetails["group_model"]) {
              if (dataUserDetails["group_model"].includes(link.Access)) {
                access = true;
              }
            }
          } else {
            if (dataUserDetails && dataUserDetails["group_model"]) {
              link.Access.forEach(function (object, index, array) {
                if (dataUserDetails["group_model"].includes(object)) {
                  access = true;
                }
              });
            }
          }
        }
      });
    });
  });
  return access;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ActionsFormDataUtility = ({ form, getState = null }) => {
  try {
    const formData = new FormData();
    Object.entries(form).map(([key, value]) => {
      formData.append(key, value);
    });
    if (getState) {
      const {
        userLoginStore: { data: userLogin },
      } = getState();
      return { formData: formData, userLogin: userLogin };
    }
    return { formData: formData };
  } catch (error) {
    if (constants.DEBUG_CONSTANT) {
      console.log("ActionsFormDataUtilityError: ", error);
    }
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ActionsFailUtility = ({ dispatch, error }) => {
  try {
    if (constants.DEBUG_CONSTANT) {
      console.log("fail: ", error);
    }
    if (error) {
      let status = error.message
        ? error.message
        : error.response.data.detail
        ? error.response.data.detail
        : error.response.status;
      if (constants.DEBUG_CONSTANT) {
        console.log("status: ", status);
      }
      if (status.slice(0, 7) === "timeout") {
        status = "timeout";
      }
      switch (status) {
        case 401 || "Authentication credentials were not provided.":
          dispatch(actions.userLogoutAction());
          return "Ваши данные для входа не получены! Попробуйте выйти из системы и снова войти.";
        case 413 || "Request Entity Too Large":
          return "Ваш файл слишком большой! Измените его размер и перезагрузите страницу перед отправкой.";
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GetInfoPage = (location) => {
  let title = "Домашняя страница";
  let description = "основная страница веб платформы";
  let logic = true;
  let redirect = false;
  constants.modules.forEach(function (module, index, array) {
    module.Sections.forEach(function (section, index, array) {
      section.Links.forEach(function (link, index, array) {
        if (link.Link.split("/")[1] === location.pathname.split("/")[1]) {
          title = link.Title;
          description = link.Description;
          logic = link.Logic;
          redirect = link.Redirect;
        }
      });
    });
  });
  return {
    title: title,
    description: description,
    logic: logic,
    redirect: redirect,
  };
};
///////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom utils
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  //  /[^А-Яа-я_]/gi - только кириллица и "_"
  // /[^A-Za-z0-9_]/gi - только латиница, цифры и "_"
  // /[^A-Za-z]/gi - только латиница
  // /[^0-9]/gi - только цифры
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
      regex = regex + "_-:;.,!?";
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
