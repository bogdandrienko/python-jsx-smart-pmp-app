import * as constants from "./constants";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CheckAccess = (userDetailsStore, slug = "") => {
  try {
    const {
      // load: loadUserDetails,
      data: dataUserDetails,
      // error: errorUserDetails,
      // fail: failUserDetails,
    } = userDetailsStore;
    if (dataUserDetails) {
      if (dataUserDetails["group_model"]) {
        return dataUserDetails["group_model"].includes(slug);
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

export const GetSliceString = (string = "", length = 30) => {
  try {
    if (string.length >= length) {
      return string.slice(0, length) + "...";
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
