// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as util from "./util";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// export const DEBUG_CONSTANT = process.env.NODE_ENV === "production";
export const DEBUG_CONSTANT = true;

export const news = [
  {
    Title: "Личный профиль:",
    Status: "disable",
    Link: "#",
    Description:
      "расширение профиля: дополнительная информация: образование, хобби, интересы, изображение, статистика, " +
      "достижения и участие",
    Helps: "",
    Danger: "",
  },
  {
    Title: "Рационализаторские предложения:",
    Status: "disable",
    Link: "#",
    Description:
      "шаблон и подача рац. предложений, модерация и общий список с рейтингами и комментариями",
    Helps: "",
    Danger: "",
  },
  {
    Title: "Банк идей:",
    Status: "active",
    Link: "/idea_create",
    Description:
      "подача и редактирование, шаблон, модерация, комментирование, рейтинги, лучшие идеи и списки лидеров...",
    Helps: "",
    Danger: "",
  },
  {
    Title: "Инструкции: видео и текстовые",
    Status: "active",
    Link: "/video_study",
    Description: "лента с информацией по веб-платформе",
    Helps: "материал будет своевременно обновляться",
    Danger: "",
  },
  {
    Title: "Отпуска:",
    Status: "active",
    Link: "/vacation",
    Description: "выгрузка Ваших данных по отпуску за выбранный период",
    Helps: "",
    Danger: "",
  },
  {
    Title: "Расчётный лист:",
    Status: "active",
    Link: "/salary",
    Description: "выгрузка Вашего расчётного листа за выбранный период",
    Helps: "",
    Danger: "'контрактникам' выгрузка недоступна!",
  },
];

export const reducers = {};

// @ts-ignore
function connectReducer(name = "", reducer) {
  // @ts-ignore
  reducers[name] = reducer;
}

export const captchaCheckStore = util.StoreReducerConstructorUtility(
  "captchaCheckStore",
  connectReducer
);

export const userLoginStore = util.StoreReducerConstructorUtility(
  "userLoginStore",
  connectReducer
);

export const userDetailStore = util.StoreReducerConstructorUtility(
  "userDetailStore",
  connectReducer
);

export const userChangeStore = util.StoreReducerConstructorUtility(
  "userChangeStore",
  connectReducer
);

export const userRecoverPasswordStore = util.StoreReducerConstructorUtility(
  "userRecoverPasswordStore",
  connectReducer
);

export const UsersReadListStore = util.StoreReducerConstructorUtility(
  "UsersReadListStore",
  connectReducer
);

export const NotificationCreateStore = util.StoreReducerConstructorUtility(
  "NotificationCreateStore",
  connectReducer
);

export const NotificationReadListStore = util.StoreReducerConstructorUtility(
  "NotificationReadListStore",
  connectReducer
);

export const NotificationDeleteStore = util.StoreReducerConstructorUtility(
  "NotificationDeleteStore",
  connectReducer
);

export const ratingsListStore = util.StoreReducerConstructorUtility(
  "ratingsListStore",
  connectReducer
);

export const IdeaCreateStore = util.StoreReducerConstructorUtility(
  "IdeaCreateStore",
  connectReducer
);
export const IdeaReadListStore = util.StoreReducerConstructorUtility(
  "IdeaReadListStore",
  connectReducer
);
export const IdeaReadStore = util.StoreReducerConstructorUtility(
  "IdeaReadStore",
  connectReducer
);
export const IdeaDeleteStore = util.StoreReducerConstructorUtility(
  "IdeaDeleteStore",
  connectReducer
);

export const IdeaCommentCreateStore = util.StoreReducerConstructorUtility(
  "IdeaCommentCreateStore",
  connectReducer
);

export const IdeaCommentReadListStore = util.StoreReducerConstructorUtility(
  "IdeaCommentReadListStore",
  connectReducer
);

export const IdeaRatingCreateStore = util.StoreReducerConstructorUtility(
  "IdeaRatingCreateStore",
  connectReducer
);

export const IdeaRatingReadListStore = util.StoreReducerConstructorUtility(
  "IdeaRatingReadListStore",
  connectReducer
);

export const PostCreateStore = util.StoreReducerConstructorUtility(
  "PostCreateStore",
  connectReducer
);
export const PostReadListStore = util.StoreReducerConstructorUtility(
  "PostReadListStore",
  connectReducer
);
export const PostReadStore = util.StoreReducerConstructorUtility(
  "PostReadStore",
  connectReducer
);
export const PostDeleteStore = util.StoreReducerConstructorUtility(
  "PostDeleteStore",
  connectReducer
);

export class HttpMethods {
  // @ts-ignore
  static GET() {
    return "GET";
  }
  static POST() {
    // config.headers = {
    //   "Content-Type": "application/json", | "application/json",
    // };
    return "POST";
  }
  static PUT() {
    return "PUT";
  }
  static DELETE() {
    return "DELETE";
  }
}

// export function GetHttpMethod(key) {
//   switch (key) {
//     case key=true:
//       return { load: true };
//     case data:
//       return {
//         load: false,
//         // @ts-ignore
//         data: action.payload,
//       };
//     case error:
//       return {
//         load: false,
//         // @ts-ignore
//         error: action.payload,
//       };
//     case fail:
//       // @ts-ignore
//       return { load: false, fail: action.payload };
//     case reset:
//       return {};
//     default:
//       return state;
//   }
// }
