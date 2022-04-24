"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.captchaCheckStore = exports.userChangeStore = exports.userDetailStore = exports.userLoginStore = exports.NotificationReadListStore = exports.NotificationCreateStore = exports.IdeaRatingReadListStore = exports.IdeaRatingCreateStore = exports.IdeaCommentReadListStore = exports.IdeaCommentCreateStore = exports.UserReadListStore = exports.IdeaDeleteStore = exports.IdeaReadStore = exports.IdeaReadListStore = exports.IdeaCreateStore = exports.PostDeleteStore = exports.PostReadStore = exports.PostReadListStore = exports.PostCreateStore = exports.reducers = exports.news = exports.DEBUG_CONSTANT = void 0;
var counterSlice_1 = require("./test/counter/counterSlice");
var util = require("./util");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
// export const DEBUG_CONSTANT = process.env.NODE_ENV === "production";
exports.DEBUG_CONSTANT = true;
exports.news = [
    {
        Title: "Личный профиль:",
        Status: "disable",
        Link: "#",
        Description: "расширение профиля: дополнительная информация: образование, хобби, интересы, изображение, статистика, " +
            "достижения и участие",
        Helps: "",
        Danger: "",
    },
    {
        Title: "Рационализаторские предложения:",
        Status: "disable",
        Link: "#",
        Description: "шаблон и подача рац. предложений, модерация и общий список с рейтингами и комментариями",
        Helps: "",
        Danger: "",
    },
    {
        Title: "Банк идей:",
        Status: "active",
        Link: "/idea_create",
        Description: "подача и редактирование, шаблон, модерация, комментирование, рейтинги, лучшие идеи и списки лидеров...",
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
exports.reducers = {};
// @ts-ignore
function connectReducer(name, reducer) {
    if (name === void 0) { name = ""; }
    // @ts-ignore
    exports.reducers[name] = reducer;
}
exports.PostCreateStore = util.StoreReducerConstructorUtility("PostCreateStore", connectReducer);
exports.PostReadListStore = util.StoreReducerConstructorUtility("PostReadListStore", connectReducer);
exports.PostReadStore = util.StoreReducerConstructorUtility("PostReadStore", connectReducer);
exports.PostDeleteStore = util.StoreReducerConstructorUtility("PostDeleteStore", connectReducer);
exports.IdeaCreateStore = util.StoreReducerConstructorUtility("IdeaCreateStore", connectReducer);
exports.IdeaReadListStore = util.StoreReducerConstructorUtility("IdeaReadListStore", connectReducer);
exports.IdeaReadStore = util.StoreReducerConstructorUtility("IdeaReadStore", connectReducer);
exports.IdeaDeleteStore = util.StoreReducerConstructorUtility("IdeaDeleteStore", connectReducer);
exports.UserReadListStore = util.StoreReducerConstructorUtility("UserReadListStore", connectReducer);
exports.IdeaCommentCreateStore = util.StoreReducerConstructorUtility("IdeaCommentCreateStore", connectReducer);
exports.IdeaCommentReadListStore = util.StoreReducerConstructorUtility("IdeaCommentReadListStore", connectReducer);
exports.IdeaRatingCreateStore = util.StoreReducerConstructorUtility("IdeaRatingCreateStore", connectReducer);
exports.IdeaRatingReadListStore = util.StoreReducerConstructorUtility("IdeaRatingReadListStore", connectReducer);
exports.NotificationCreateStore = util.StoreReducerConstructorUtility("NotificationCreateStore", connectReducer);
exports.NotificationReadListStore = util.StoreReducerConstructorUtility("NotificationReadListStore", connectReducer);
exports.userLoginStore = util.StoreReducerConstructorUtility("userLoginStore", connectReducer);
exports.userDetailStore = util.StoreReducerConstructorUtility("userDetailStore", connectReducer);
exports.userChangeStore = util.StoreReducerConstructorUtility("userChangeStore", connectReducer);
exports.captchaCheckStore = util.StoreReducerConstructorUtility("captchaCheckStore", connectReducer);
connectReducer("counter", counterSlice_1.default);
