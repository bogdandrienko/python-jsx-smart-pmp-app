export const CheckAccess = (dataUserDetails, slug = "") => {
  if (dataUserDetails) {
    if (dataUserDetails["group_model"]) {
      return dataUserDetails["group_model"].includes(slug);
    }
    return false;
  }
  return false;
};

export const GetStaticFile = (path = "") => {
  return `/static${path}`;
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
    return "-";
  }
};

export const Sleep = (time = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
