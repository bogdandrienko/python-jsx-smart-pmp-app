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

export class HttpMethods {
  static GET() {
    return "GET";
  }
  static READ() {
    return "GET";
  }
  static POST() {
    return "POST";
  }
  static CREATE() {
    return "POST";
  }
  static PUT() {
    return "PUT";
  }
  static UPDATE() {
    return "PUT";
  }
  static DELETE() {
    return "DELETE";
  }
}

export const reducers = {};

function connectReducer(name: string, reducer: object) {
  // @ts-ignore
  reducers[name] = reducer;
}

export const userLoginStore = util.StoreReducerConstructorUtility(
  "userLoginStore",
  connectReducer
);

export const userDetailStore = util.StoreReducerConstructorUtility(
  "userDetailStore",
  connectReducer
);

export const userPasswordUpdateStore = util.StoreReducerConstructorUtility(
  "userPasswordUpdateStore",
  connectReducer
);

export const userRecoverPasswordStore = util.StoreReducerConstructorUtility(
  "userRecoverPasswordStore",
  connectReducer
);

export const userRecoverPasswordSendEmailStore =
  util.StoreReducerConstructorUtility(
    "userRecoverPasswordSendEmailStore",
    connectReducer
  );

export const userRecoverPasswordChangePasswordStore =
  util.StoreReducerConstructorUtility(
    "userRecoverPasswordChangePasswordStore",
    connectReducer
  );

export const userReadListStore = util.StoreReducerConstructorUtility(
  "userReadListStore",
  connectReducer
);

export const adminCreateUsersStore = util.StoreReducerConstructorUtility(
  "adminCreateUsersStore",
  connectReducer
);

export const adminExportUsersStore = util.StoreReducerConstructorUtility(
  "adminExportUsersStore",
  connectReducer
);

export const adminCheckUserStore = util.StoreReducerConstructorUtility(
  "adminCheckUserStore",
  connectReducer
);

export const adminChangePasswordUserStore = util.StoreReducerConstructorUtility(
  "adminChangePasswordUserStore",
  connectReducer
);

export const terminalRebootStore = util.StoreReducerConstructorUtility(
  "terminalRebootStore",
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

export const SalaryReadStore = util.StoreReducerConstructorUtility(
  "SalaryReadStore",
  connectReducer
);

export const VacationReadStore = util.StoreReducerConstructorUtility(
  "VacationReadStore",
  connectReducer
);

export const ratingsListStore = util.StoreReducerConstructorUtility(
  "ratingsListStore",
  connectReducer
);

// TODO clear //////////////////////////////////////////////////////////////////////////////////////////////////////////

export const captchaCheckStore = util.StoreReducerConstructorUtility(
  "captchaCheckStore",
  connectReducer
);

// paste here

export const IdeaCreateStore = util.StoreReducerConstructorUtility(
  "IdeaCreateStore",
  connectReducer
);

export const IdeaReadStore = util.StoreReducerConstructorUtility(
  "IdeaReadStore",
  connectReducer
);

export const IdeaReadListStore = util.StoreReducerConstructorUtility(
  "IdeaReadListStore",
  connectReducer
);

export const IdeaUpdateStore = util.StoreReducerConstructorUtility(
  "IdeaUpdateStore",
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

export const IdeaCommentDeleteStore = util.StoreReducerConstructorUtility(
  "IdeaCommentDeleteStore",
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

// TODO dirty //////////////////////////////////////////////////////////////////////////////////////////////////////////

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
