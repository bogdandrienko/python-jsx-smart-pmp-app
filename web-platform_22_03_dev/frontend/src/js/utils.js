import * as constants from "./constants";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////
export const CheckPageAccess = (userDetailsAuthStore, location) => {
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsAuthStore;
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
///////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////
export const ChangeAccordionCollapse = (objects = [""]) => {
  try {
    objects.forEach(function (object, index, array) {
      const obj = document.getElementById(object);
      const classname =
        obj.getAttribute("class") === "accordion-collapse collapse"
          ? "accordion-collapse"
          : "accordion-collapse collapse";
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
