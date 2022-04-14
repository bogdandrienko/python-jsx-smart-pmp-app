// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as utils from "./utils";

// TODO debug //////////////////////////////////////////////////////////////////////////////////////////////////////////

export const DEBUG_CONSTANT = true;

// TODO modules ////////////////////////////////////////////////////////////////////////////////////////////////////////

export const modules = [
  {
    Header: "Общее",
    Access: ["all"],
    Image: "/static/img/modules/2_module_main/module_main.png",
    ShowInModules: true,
    Sections: [
      {
        Header: "Новости",
        Access: ["user"],
        Image: "/static/img/modules/2_module_main/section_news.png",
        Links: [
          {
            Header: "Домашняя страница",
            Access: ["user"],
            Active: true,
            Link: "/",
            ExternalLink: false,
            ShowLink: true,
            Title: 'Веб-платформа АО "Костанайские Минералы"',
            Description: "платформа для всех работников предприятия!",
            Logic: true,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-earth-asia m-0 p-1",
          },
          {
            Header: "Новости платформы",
            Access: ["user"],
            Active: true,
            Link: "/news",
            ExternalLink: false,
            ShowLink: true,
            Title: "Новости платформы",
            Description: "страница новостей веб-платформы",
            Logic: true,
            Redirect: true,
            Style: "text-secondary",
            LinkIcon: "fa-solid fa-newspaper m-0 p-1",
          },
        ],
      },
      {
        Header: "Обучение",
        Access: ["all"],
        Image: "/static/img/modules/2_module_main/section_study.png",
        Links: [
          {
            Header: "Видео инструкции",
            Access: ["all"],
            Active: true,
            Link: "/video_study",
            ExternalLink: false,
            ShowLink: true,
            Title: "Видео инструкции",
            Description:
              "страница с видео инструкциями по функционалу веб-платформы",
            Logic: true,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-brands fa-sistrix m-0 p-1",
          },
          {
            Header: "Текстовые инструкции",
            Access: ["all"],
            Active: true,
            Link: "/text_study",
            ExternalLink: false,
            ShowLink: true,
            Title: "Текстовые инструкции",
            Description:
              "страница с текстовыми инструкциями по функционалу веб-платформы",
            Logic: true,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-brands fa-sistrix m-0 p-1",
          },
        ],
      },
      {
        Header: "Лучшие пользователи",
        Access: ["user"],
        Image: "/static/img/modules/2_module_main/section_ratings.png",
        Links: [
          {
            Header: "Зал славы",
            Access: ["user"],
            Active: true,
            Link: "/idea_author_list",
            ExternalLink: false,
            ShowLink: true,
            Title: "Зал славы",
            Description: "страница с лучшими и самыми активными участниками",
            Logic: true,
            Redirect: true,
            Style: "custom-color-warning-1",
            LinkIcon: "fa-solid fa-list-ol m-0 p-1",
          },
        ],
      },
    ],
  },
  {
    Header: "Профиль",
    Access: ["user"],
    Image: "/static/img/modules/1_module_profile/module_profile.png",
    ShowInModules: true,
    Sections: [
      {
        Header: "Личный профиль",
        Access: ["user"],
        Image: "/static/img/modules/1_module_profile/section_self_profile.png",
        Links: [
          {
            Header: "Уведомления",
            Access: ["user"],
            Active: true,
            Link: "/notification_list",
            ExternalLink: false,
            ShowLink: true,
            Title: "Уведомления",
            Description:
              "страница с уведомлениями лично для Вас или для Ваших групп доступа",
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-bell m-0 p-1",
          },
          {
            Header: "Изменение профиля",
            Access: ["user"],
            Active: true,
            Link: "/change_profile",
            ExternalLink: false,
            ShowLink: true,
            Title: "Изменение профиля",
            Description: "страница редактирования Вашего личного профиля",
            Logic: true,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-id-card m-0 p-1",
          },
          {
            Header: "Изменение пароля",
            Access: ["user"],
            Active: true,
            Link: "/change_password",
            ExternalLink: false,
            ShowLink: true,
            Title: "Изменение пароля",
            Description: "страница редактирования пароля от Вашего аккаунта",
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-key m-0 p-1",
          },
          {
            Header: "Восстановление доступа",
            Access: ["user"],
            Active: true,
            Link: "/recover_password",
            ExternalLink: false,
            ShowLink: true,
            Title: "Восстановление доступа",
            Description: "страница восстановления доступа к Вашему аккаунту",
            Logic: true,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-universal-access m-0 p-1",
          },
          {
            Header: "Войти",
            Access: ["all"],
            Active: true,
            Link: "/login",
            ExternalLink: false,
            ShowLink: true,
            Title: "Вход в систему",
            Description: "страница для входа в систему",
            Logic: true,
            Redirect: false,
            Style: "text-primary",
            LinkIcon: "fa-solid fa-arrow-right-to-bracket m-0 p-1",
          },
          {
            Header: "Выйти",
            Access: ["user"],
            Active: true,
            Link: "/logout",
            ExternalLink: false,
            ShowLink: true,
            Title: "",
            Description: "",
            Logic: true,
            Redirect: false,
            Style: "text-danger",
            LinkIcon: "fa-solid fa-door-open m-0 p-1",
          },
        ],
      },
    ],
  },
  {
    Header: "Развитие",
    Access: ["user"],
    Image: "/static/img/modules/3_module_progress/module_progress.png",
    ShowInModules: true,
    Sections: [
      {
        Header: "Рационализаторство",
        Access: ["user"],
        Image: "/static/img/modules/3_module_progress/sectional_rational.png",
        Links: [
          {
            Header: "Пример (шаблон) рационализаторского предложения",
            Access: ["user"],
            Active: true,
            Link: "/rational_template",
            ExternalLink: false,
            ShowLink: true,
            Title: "Пример (шаблон) рационализаторского предложения",
            Description:
              "страница с примером (шаблоном) рационализаторского предложения",
            Logic: true,
            Redirect: true,
            Style: "text-secondary",
            LinkIcon: "fa-solid fa-circle-info m-0 p-1",
          },
          {
            Header: "Подать новое рационализаторское предложение",
            Access: [
              "moderator_rational",
              "moderator_rational_atp",
              "moderator_rational_gtk",
              "moderator_rational_ok",
              "moderator_rational_upravlenie",
              "moderator_rational_energoupravlenie",
            ],
            Active: true,
            Link: "/rational_create",
            ExternalLink: false,
            ShowLink: true,
            Title: "Подача рационализаторского предложения",
            Description:
              "страница с формой для заполнения и подачи рационализаторского предложения",
            Logic: true,
            Redirect: true,
            Style: "text-success",
            LinkIcon: "fa-solid fa-circle-plus m-0 p-1",
          },
          {
            Header: "Модерация рационализаторских предложений [модератор]",
            Access: [
              "moderator_rational",
              "moderator_rational_atp",
              "moderator_rational_gtk",
              "moderator_rational_ok",
              "moderator_rational_upravlenie",
              "moderator_rational_energoupravlenie",
            ],
            Active: true,
            Link: "/rational_moderate_list",
            ExternalLink: false,
            ShowLink: true,
            Title: "Модерация рационализаторских предложений [модератор]",
            Description: "страница модерации рационализаторских предложений",
            Logic: true,
            Redirect: true,
            Style: "text-danger",
            LinkIcon: "fa-solid fa-screwdriver-wrench m-0 p-1",
          },
        ],
      },
      {
        Header: "Банк идей",
        Access: ["user"],
        Image: "/static/img/modules/3_module_progress/section_idea.png",
        Links: [
          {
            Header: "Пример (шаблон) идеи",
            Access: ["user"],
            Active: true,
            Link: "/idea_template",
            ExternalLink: false,
            ShowLink: true,
            Title: "Пример (шаблон) идеи",
            Description: "страница с примером (шаблоном) идеи в банке идеи",
            Logic: true,
            Redirect: true,
            Style: "text-secondary",
            LinkIcon: "fa-solid fa-circle-info m-0 p-1",
          },
          {
            Header: "Подача новой идеи",
            Access: ["user"],
            Active: true,
            Link: "/idea_create",
            ExternalLink: false,
            ShowLink: true,
            Title: "Подача новой идеи",
            Description:
              "страница с формой для заполнения и подачи идеи в банк идей",
            Logic: true,
            Redirect: true,
            Style: "text-success",
            LinkIcon: "fa-solid fa-circle-plus m-0 p-1",
          },
          {
            Header: "Мои идеи на доработку",
            Access: ["user"],
            Active: true,
            Link: "/idea_self_list",
            ExternalLink: false,
            ShowLink: true,
            Title: "Мои идеи на доработку",
            Description: "страница со списком Ваших идей для доработки",
            Logic: true,
            Redirect: true,
            Style: "text-danger",
            LinkIcon: "fa-solid fa-screwdriver-wrench m-0 p-1",
          },
          {
            Header: "Редактирование своей идеи [скрыто]",
            Access: ["user"],
            Active: true,
            Link: "/idea_change/0",
            ExternalLink: false,
            ShowLink: false,
            Title: "Редактирование своей идеи",
            Description: "страница с идеей на доработку",
            Logic: true,
            Redirect: true,
            Style: "text-muted",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "Список идей",
            Access: ["user"],
            Active: true,
            Link: "/idea_list",
            ExternalLink: false,
            ShowLink: true,
            Title: "Список идей",
            Description:
              "список идей в банке идей с возможностью поиска и фильтрации",
            Logic: true,
            Redirect: true,
            Style: "text-primary",
            LinkIcon: "fa-solid fa-list m-0 p-1",
          },
          {
            Header: "Подробности идеи [скрыто]",
            Access: ["user"],
            Active: true,
            Link: "/idea_detail/0",
            ExternalLink: false,
            ShowLink: false,
            Title: "Подробности идеи",
            Description:
              "страница с подробной информацией об идеи в банке идей",
            Logic: true,
            Redirect: true,
            Style: "text-muted",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "Лучшие идеи",
            Access: ["user"],
            Active: true,
            Link: "/idea_rating",
            ExternalLink: false,
            ShowLink: true,
            Title: "Лучшие идеи",
            Description: "страница с лучшими идеями в банке идей",
            Logic: true,
            Redirect: true,
            Style: "custom-color-warning-1",
            LinkIcon: "fa-solid fa-list-ol m-0 p-1",
          },
          {
            Header: "Модерация идей [модератор]",
            Access: ["moderator_idea"],
            Active: true,
            Link: "/idea_moderate_list",
            ExternalLink: false,
            ShowLink: true,
            Title: "Модерация идей",
            Description: "страница со списком идей и возможностью модерации",
            Logic: true,
            Redirect: true,
            Style: "text-danger",
            LinkIcon: "fa-solid fa-screwdriver-wrench m-0 p-1",
          },
          {
            Header: "Модерация идеи [модератор] [скрыто]",
            Access: ["moderator_idea"],
            Active: true,
            Link: "/idea_moderate_change/0",
            ExternalLink: false,
            ShowLink: false,
            Title: "Модерация идеи",
            Description: "модерация идеи в банке идей",
            Logic: true,
            Redirect: true,
            Style: "text-muted",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
        ],
      },
    ],
  },
  {
    Header: "Бухгалтерия",
    Access: ["user"],
    Image: "/static/img/modules/4_module_buhgalteria/module_buhgalteria.png",
    ShowInModules: true,
    Sections: [
      {
        Header: "Сектор расчёта заработной платы",
        Access: ["user"],
        Image: "/static/img/modules/4_module_buhgalteria/section_zarplata.png",
        Links: [
          {
            Header: "Выгрузка расчётного листа",
            Access: ["user"],
            Active: true,
            Link: "/salary",
            ExternalLink: false,
            ShowLink: true,
            Title: "Выгрузка расчётного листа",
            Description:
              "страница выгрузки расчётного листа за выбранный период",
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-calculator m-0 p-1",
          },
        ],
      },
    ],
  },
  {
    Header: "СУП",
    Access: ["user"],
    Image: "/static/img/modules/5_module_sup/module_sup.png",
    ShowInModules: true,
    Sections: [
      {
        Header: "Отдел кадров",
        Access: ["user"],
        Image: "/static/img/modules/5_module_sup/section_hr.png",
        Links: [
          {
            Header: "Выгрузка данных по отпуску",
            Access: ["user"],
            Active: true,
            Link: "/vacation",
            ExternalLink: false,
            ShowLink: true,
            Title: "Выгрузка данных по отпуску",
            Description:
              "страница выгрузки данных по отпуску за выбранный период",
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-rectangle-list m-0 p-1",
          },
        ],
      },
    ],
  },
  {
    Header: "Модератор",
    Access: ["superuser", "moderator_oit", "moderator_otiz"],
    Image: "/static/img/modules/earth.png",
    ShowInModules: false,
    Sections: [
      {
        Header: "Основной функционал",
        Access: ["superuser"],
        Image: "/static/img/modules/earth.png",
        Links: [
          {
            Header: "Панель Администрирования",
            Access: ["superuser"],
            Active: true,
            Link: "/admin/",
            ExternalLink: true,
            ShowLink: true,
            Title: "",
            Description: "",
            Logic: false,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "Api Django rest_framework",
            Access: ["superuser"],
            Active: true,
            Link: "/api/auth/routes/",
            ExternalLink: true,
            ShowLink: true,
            Title: "",
            Description: "",
            Logic: false,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "127.0.0.1:3000",
            Access: ["superuser"],
            Active: true,
            Link: "http://127.0.0.1:3000/",
            ExternalLink: true,
            ShowLink: true,
            Title: "",
            Description: "",
            Logic: false,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "127.0.0.1:8000",
            Access: ["superuser"],
            Active: true,
            Link: "http://127.0.0.1:8000/",
            ExternalLink: true,
            ShowLink: true,
            Title: "",
            Description: "",
            Logic: false,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "127.0.0.1:8000/test/",
            Access: ["superuser"],
            Active: true,
            Link: "http://127.0.0.1:8000/test/",
            ExternalLink: true,
            ShowLink: true,
            Title: "",
            Description: "",
            Logic: false,
            Redirect: false,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
        ],
      },
      {
        Header: "Аккаунты",
        Access: ["moderator_oit", "superuser"],
        Image: "/static/img/modules/earth.png",
        Links: [
          {
            Header: "Действия над аккаунтом пользователя",
            Access: ["moderator_oit"],
            Active: true,
            Link: "/admin_actions_user",
            ExternalLink: false,
            ShowLink: true,
            Title: "Действия над аккаунтом пользователя",
            Description:
              "страница действий модератора над аккаунтом пользователя",
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "Создать или изменить пользователей",
            Access: ["superuser"],
            Active: true,
            Link: "/admin_create_or_change_users",
            ExternalLink: false,
            ShowLink: true,
            Title: "Создать или изменить пользователей",
            Description:
              "страница с формой и настройками для создания или изменения пользователей",
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
          {
            Header: "Выгрузить список пользователей",
            Access: ["superuser"],
            Active: true,
            Link: "/admin_export_users",
            ExternalLink: false,
            ShowLink: true,
            Title: "Выгрузить список пользователей",
            Description: "страница выгрузки всех пользователей системы",
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
        ],
      },
      {
        Header: "Терминалы скуд",
        Access: ["moderator_otiz", "superuser"],
        Image: "/static/img/modules/earth.png",
        Links: [
          {
            Header: "Перезагрузка терминалов",
            Access: ["moderator_otiz", "superuser"],
            Active: true,
            Link: "/terminal",
            ExternalLink: false,
            ShowLink: true,
            Title: "Перезагрузка терминалов",
            Description: "страница с настройками для перезагрузки терминалов",
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
        ],
      },
    ],
  },
  {
    Header: "Разработка",
    Access: ["superuser"],
    Image: "/static/img/modules/earth.png",
    ShowInModules: false,
    Sections: [
      {
        Header: "web version",
        Access: ["superuser"],
        Image: "/static/img/modules/earth.png",
        Links: [
          {
            Header: "03.04.22 12:00",
            Access: ["superuser"],
            Active: false,
            Link: "#",
            ExternalLink: false,
            ShowLink: true,
            Title: "",
            Description: "",
            Logic: false,
            Redirect: false,
            Style: "text-secondary",
            LinkIcon: "fa-solid fa-circle-info m-0 p-1",
          },
          {
            Header: "Test",
            Access: ["superuser"],
            Active: true,
            Link: "/test",
            ExternalLink: false,
            ShowLink: true,
            Title: "Test",
            Description: "test",
            Logic: true,
            Redirect: true,
            Style: "text-dark",
            LinkIcon: "fa-solid fa-toolbox m-0 p-1",
          },
        ],
      },
    ],
  },
];

// TODO main ///////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RATINGS_LIST = utils.ConstantsUtility("RATINGS_LIST");

// TODO profile ////////////////////////////////////////////////////////////////////////////////////////////////////////

export const USER_LOGIN = utils.ConstantsUtility("USER_LOGIN");
export const USER_DETAILS = utils.ConstantsUtility("USER_DETAILS");
export const USER_CHANGE = utils.ConstantsUtility("USER_CHANGE");
export const USER_RECOVER_PASSWORD = utils.ConstantsUtility(
  "USER_RECOVER_PASSWORD"
);

export const USER_LIST_ALL = utils.ConstantsUtility("USER_LIST_ALL");

export const NOTIFICATION_CREATE = utils.ConstantsUtility(
  "NOTIFICATION_CREATE"
);
export const NOTIFICATION_DELETE = utils.ConstantsUtility(
  "NOTIFICATION_DELETE"
);
export const NOTIFICATION_LIST = utils.ConstantsUtility("NOTIFICATION_LIST");

// TODO progress ///////////////////////////////////////////////////////////////////////////////////////////////////////

export const IDEA_CREATE = utils.ConstantsUtility("IDEA_CREATE");
export const IDEA_LIST = utils.ConstantsUtility("IDEA_LIST");
export const IDEA_DETAIL = utils.ConstantsUtility("IDEA_DETAIL");
export const IDEA_CHANGE = utils.ConstantsUtility("IDEA_CHANGE");
export const IDEA_MODERATE = utils.ConstantsUtility("IDEA_MODERATE");
export const IDEA_COMMENT_CREATE = utils.ConstantsUtility(
  "IDEA_COMMENT_CREATE"
);
export const IDEA_COMMENT_DELETE = utils.ConstantsUtility(
  "IDEA_COMMENT_DELETE"
);
export const IDEA_RATING_CREATE = utils.ConstantsUtility("IDEA_RATING_CREATE");

// TODO buhgalteria ////////////////////////////////////////////////////////////////////////////////////////////////////

export const USER_SALARY = utils.ConstantsUtility("USER_SALARY");

// TODO sup ////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const USER_VACATION = utils.ConstantsUtility("USER_VACATION");

// TODO moderator //////////////////////////////////////////////////////////////////////////////////////////////////////

export const TERMINAL_REBOOT = utils.ConstantsUtility("TERMINAL_REBOOT");

export const ADMIN_CHECK_USER = utils.ConstantsUtility("ADMIN_CHECK_USER");
export const ADMIN_CHANGE_USER_PASSWORD = utils.ConstantsUtility(
  "ADMIN_CHANGE_USER_PASSWORD"
);
export const ADMIN_CHANGE_USER_ACTIVITY = utils.ConstantsUtility(
  "ADMIN_CHANGE_USER_ACTIVITY"
);
export const ADMIN_CREATE_OR_CHANGE_USERS = utils.ConstantsUtility(
  "ADMIN_CREATE_OR_CHANGE_USERS"
);
export const ADMIN_EXPORT_USERS = utils.ConstantsUtility("ADMIN_EXPORT_USERS");

// TODO develop ////////////////////////////////////////////////////////////////////////////////////////////////////////

export const RATIONAL_CREATE = utils.ConstantsUtility("RATIONAL_CREATE");
export const RATIONAL_LIST = utils.ConstantsUtility("RATIONAL_LIST");
