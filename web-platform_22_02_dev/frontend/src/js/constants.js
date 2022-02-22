export const USER_LOGIN_LOAD_CONSTANT = "USER_LOGIN_LOAD_CONSTANT";
export const USER_LOGIN_DATA_CONSTANT = "USER_LOGIN_DATA_CONSTANT";
export const USER_LOGIN_ERROR_CONSTANT = "USER_LOGIN_ERROR_CONSTANT";
export const USER_LOGIN_FAIL_CONSTANT = "USER_LOGIN_FAIL_CONSTANT";
export const USER_LOGOUT_CONSTANT = "USER_LOGOUT_CONSTANT";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const USER_DETAILS_LOAD_CONSTANT = "USER_DETAILS_LOAD_CONSTANT";
export const USER_DETAILS_DATA_CONSTANT = "USER_DETAILS_DATA_CONSTANT";
export const USER_DETAILS_ERROR_CONSTANT = "USER_DETAILS_ERROR_CONSTANT";
export const USER_DETAILS_FAIL_CONSTANT = "USER_DETAILS_FAIL_CONSTANT";
export const USER_DETAILS_RESET_CONSTANT = "USER_DETAILS_RESET_CONSTANT";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const USER_CHANGE_LOAD_CONSTANT = "USER_CHANGE_LOAD_CONSTANT";
export const USER_CHANGE_DATA_CONSTANT = "USER_CHANGE_DATA_CONSTANT";
export const USER_CHANGE_ERROR_CONSTANT = "USER_CHANGE_ERROR_CONSTANT";
export const USER_CHANGE_FAIL_CONSTANT = "USER_CHANGE_FAIL_CONSTANT";
export const USER_CHANGE_RESET_CONSTANT = "USER_CHANGE_RESET_CONSTANT";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const USER_RECOVER_PASSWORD_LOADING_CONSTANT =
  "USER_RECOVER_PASSWORD_LOADING_CONSTANT";
export const USER_RECOVER_PASSWORD_DATA_CONSTANT =
  "USER_RECOVER_PASSWORD_DATA_CONSTANT";
export const USER_RECOVER_PASSWORD_ERROR_CONSTANT =
  "USER_RECOVER_PASSWORD_ERROR_CONSTANT";
export const USER_RECOVER_PASSWORD_FAIL_CONSTANT =
  "USER_RECOVER_PASSWORD_FAIL_CONSTANT";
export const USER_RECOVER_PASSWORD_RESET_CONSTANT =
  "USER_RECOVER_PASSWORD_RESET_CONSTANT";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const USER_SALARY_LOAD_CONSTANT = "USER_SALARY_LOAD_CONSTANT";
export const USER_SALARY_DATA_CONSTANT = "USER_SALARY_DATA_CONSTANT";
export const USER_SALARY_ERROR_CONSTANT = "USER_SALARY_ERROR_CONSTANT";
export const USER_SALARY_FAIL_CONSTANT = "USER_SALARY_FAIL_CONSTANT";
export const USER_SALARY_RESET_CONSTANT = "USER_SALARY_RESET_CONSTANT";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const USER_LIST_LOADING_CONSTANT = "USER_LIST_LOADING_CONSTANT";
export const USER_LIST_DATA_CONSTANT = "USER_LIST_DATA_CONSTANT";
export const USER_LIST_ERROR_CONSTANT = "USER_LIST_ERROR_CONSTANT";
export const USER_LIST_RESET_CONSTANT = "USER_LIST_RESET_CONSTANT";
export const USER_LIST_DEFAULT_CONSTANT = "USER_LIST_DEFAULT_CONSTANT";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const RATIONAL_CREATE_LOADING_CONSTANT =
  "RATIONAL_CREATE_LOADING_CONSTANT";
export const RATIONAL_CREATE_DATA_CONSTANT = "RATIONAL_CREATE_DATA_CONSTANT";
export const RATIONAL_CREATE_ERROR_CONSTANT = "RATIONAL_CREATE_ERROR_CONSTANT";
export const RATIONAL_CREATE_FAIL_CONSTANT = "RATIONAL_CREATE_FAIL_CONSTANT";
export const RATIONAL_CREATE_RESET_CONSTANT = "RATIONAL_CREATE_RESET_CONSTANT";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const RATIONAL_LIST_LOADING_CONSTANT = "RATIONAL_LIST_LOADING_CONSTANT";
export const RATIONAL_LIST_DATA_CONSTANT = "RATIONAL_LIST_DATA_CONSTANT";
export const RATIONAL_LIST_ERROR_CONSTANT = "RATIONAL_LIST_ERROR_CONSTANT";
export const RATIONAL_LIST_FAIL_CONSTANT = "RATIONAL_LIST_FAIL_CONSTANT";
export const RATIONAL_LIST_RESET_CONSTANT = "RATIONAL_LIST_RESET_CONSTANT";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const RATIONAL_DETAIL_LOADING_CONSTANT =
  "RATIONAL_DETAIL_LOADING_CONSTANT";
export const RATIONAL_DETAIL_DATA_CONSTANT = "RATIONAL_DETAIL_DATA_CONSTANT";
export const RATIONAL_DETAIL_ERROR_CONSTANT = "RATIONAL_DETAIL_ERROR_CONSTANT";
export const RATIONAL_DETAIL_FAIL_CONSTANT = "RATIONAL_DETAIL_FAIL_CONSTANT";
export const RATIONAL_DETAIL_RESET_CONSTANT = "RATIONAL_DETAIL_RESET_CONSTANT";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ADMIN_CHANGE_USER_PASSWORD_LOAD_CONSTANT =
  "ADMIN_CHANGE_USER_PASSWORD_LOAD_CONSTANT";
export const ADMIN_CHANGE_USER_PASSWORD_DATA_CONSTANT =
  "ADMIN_CHANGE_USER_PASSWORD_DATA_CONSTANT";
export const ADMIN_CHANGE_USER_PASSWORD_ERROR_CONSTANT =
  "ADMIN_CHANGE_USER_PASSWORD_ERROR_CONSTANT";
export const ADMIN_CHANGE_USER_PASSWORD_FAIL_CONSTANT =
  "ADMIN_CHANGE_USER_PASSWORD_FAIL_CONSTANT";
export const ADMIN_CHANGE_USER_PASSWORD_RESET_CONSTANT =
  "ADMIN_CHANGE_USER_PASSWORD_RESET_CONSTANT";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GET_TODO_LIST = "GET_TODO_LIST";
export const DELETE_TODO = "DELETE_TODO";
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const news = [
  {
    Title: "Личный профиль:",
    Status: "disable",
    Link: "#",
    Description:
      "расширение личного профиля: дополнительные данные, статистика, достижения...",
    Helps: "",
    Danger: "",
  },
  {
    Title: "Отпуска:",
    Status: "disable",
    Link: "#",
    Description: "выдача данных по отпускам для работника за выбранный период",
    Helps: "",
    Danger: "",
  },
  {
    Title: "Рационализаторские предложения:",
    Status: "disable",
    Link: "#",
    Description:
      "весь функционал для рац. предложений: подача, пред/пост модерация, комментирование, рейтинги, списки лидеров...",
    Helps: "",
    Danger: "",
  },
  {
    Title: "Информация:",
    Status: "active",
    Link: "/news",
    Description: "страница с информацией по веб-платформе",
    Helps: "материал будет своевременно обновляться",
    Danger: "",
  },
  {
    Title: "Видео-инструкции:",
    Status: "active",
    Link: "/video_study",
    Description: "страница с инструкциями в формате видео с ссылками на ютюб",
    Helps: "материал будет своевременно обновляться",
    Danger: "",
  },
  {
    Title: "Текстовые инструкции:",
    Status: "active",
    Link: "/text_study",
    Description: "страница с информацией по веб-платформе",
    Helps: "материал будет своевременно обновляться",
    Danger: "",
  },
  {
    Title: "Расчётный лист:",
    Status: "active",
    Link: "/news",
    Description: "возможность выгрузки расчётного листа для основных",
    Helps: "",
    Danger: "контрактники пока не включены",
  },
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const modules = [
  {
    Header: "Модератор",
    Access: "moderator",
    Image: "/static/modules/1_module_profile/module_profile.png",
    Sections: [
      {
        Header: "Основной функционал",
        Access: "moderator",
        Image: "/static/modules/1_module_profile/section_main/section_main.png",
        Links: [
          {
            Type: "active",
            Link: "/admin/",
            ExternalLink: true,
            Header: "Панель Администрирования",
            Access: "moderator",
          },
          {
            Type: "active",
            Link: "/home",
            ExternalLink: true,
            Header: "Npm react app",
            Access: "moderator",
          },
          {
            Type: "active",
            Link: "/django/",
            Header: "Домашняя Django",
            Access: "moderator",
          },
          {
            Type: "active",
            Link: "/api/routes/",
            ExternalLink: true,
            Header: "Api Django rest_framework",
            Access: "moderator",
          },
        ],
      },
      {
        Header: "Личный профиль",
        Access: "moderator",
        Image:
          "/static/modules/1_module_profile/section_self_profile/section_self_profile.png",
        Links: [
          {
            Type: "disable",
            Link: "#",
            Header: "Профиль",
            Access: "moderator",
          },
          {
            Type: "active",
            Link: "/change_profile",
            Header: "Изменить профиль",
            Access: "moderator",
          },
          {
            Type: "active",
            Link: "/change_password",
            Header: "Изменить пароль",
            Access: "moderator",
          },
          {
            Type: "active",
            Link: "/recover_password",
            Header: "Восстановить пароль",
            Access: "moderator",
          },
          {
            Type: "active",
            Link: "/login",
            Header: "Войти",
            Access: "moderator",
          },
          {
            Type: "active",
            Link: "/logout",
            Header: "Выйти",
            Access: "moderator",
          },
        ],
      },
    ],
  },
  {
    Header: "Профиль",
    Access: "user",
    Image: "/static/modules/1_module_profile/module_profile.png",
    Sections: [
      {
        Header: "Основной функционал",
        Access: "user",
        Image: "/static/modules/1_module_profile/section_main/section_main.png",
        Links: [
          {
            Type: "active",
            Link: "/login",
            Header: "Домашняя страница",
            Access: "user",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Уведомления",
            Access: "user",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Достижения",
            Access: "user",
          },
        ],
      },
      {
        Header: "Личный профиль",
        Access: "user",
        Image:
          "/static/modules/1_module_profile/section_self_profile/section_self_profile.png",
        Links: [
          {
            Type: "disable",
            Link: "#",
            Header: "Профиль",
            Access: "user",
          },
          {
            Type: "active",
            Link: "/change_profile",
            Header: "Изменить профиль",
            Access: "user",
          },
          {
            Type: "active",
            Link: "/change_password",
            Header: "Изменить пароль",
            Access: "user",
          },
          {
            Type: "active",
            Link: "/recover_password",
            Header: "Восстановить пароль",
            Access: "user",
          },
          {
            Type: "active",
            Link: "/login",
            Header: "Войти",
            Access: "user",
          },
          {
            Type: "active",
            Link: "/logout",
            Header: "Выйти",
            Access: "user",
          },
        ],
      },
    ],
  },
  {
    Header: "Новости",
    Access: "user",
    Image: "/static/modules/2_module_news/module_news.png",
    Sections: [
      {
        Header: "Обучение",
        Access: "user",
        Image: "/static/modules/2_module_news/section_study/section_study.png",
        Links: [
          {
            Type: "active",
            Link: "/video_study",
            Header: "Видео-инструкции",
            Access: "user",
          },
          {
            Type: "active",
            Link: "/text_study",
            Header: "Текстовые инструкции",
            Access: "user",
          },
        ],
      },
      {
        Header: "Новости",
        Access: "user",
        Image: "/static/img/modules.png",
        Links: [
          {
            Type: "active",
            Link: "/news",
            Header: "Новости платформы",
            Access: "user",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Поиск",
            Access: "user",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Предложить",
            Access: "user",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Зал славы",
            Access: "user",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Алтын Канат",
            Access: "user",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Лучшие работники Комбината",
            Access: "user",
          },
        ],
      },
    ],
  },
  {
    Header: "Развитие",
    Access: "user",
    Image: "/static/modules/3_module_progress/module_progress.png",
    Sections: [
      {
        Header: "Рационализаторство",
        Access: "user",
        Image:
          "/static/modules/3_module_progress/2_section_rational/sectional_rational.png",
        Links: [
          {
            Type: "active",
            Link: "/rational_create",
            Header: "Подать",
            Access: "user",
          },
          {
            Type: "active",
            Link: "/rational_list",
            Header: "Список",
            Access: "user",
          },
          {
            Type: "active",
            Link: "/rational_detail",
            Header: "Подробности",
            Access: "user",
          },
          {
            Type: "active",
            Link: "/rational_premoderate",
            Header: "Премодерация",
            Access: "rational_premoderate",
          },
          {
            Type: "active",
            Link: "/rational_postmoderate",
            Header: "Постмодерация",
            Access: "rational_postmoderate",
          },
        ],
      },
      {
        Header: "Банк идей",
        Access: "user",
        Image:
          "/static/modules/3_module_progress/1_section_idea/section_idea.png",
        Links: [
          {
            Type: "disable",
            Link: "#",
            Header: "Подать идею",
            Access: "user",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Список идей",
            Access: "user",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Рейтинги среди идей",
            Access: "user",
          },
        ],
      },
      {
        Header: "Проектная деятельность",
        Access: "user",
        Image:
          "/static/modules/3_module_progress/3_section_project/section_project.png",
        Links: [
          {
            Type: "disable",
            Link: "#",
            Header: "Подать проект",
            Access: "user",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Список проектов",
            Access: "user",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Рейтинги среди проектов",
            Access: "user",
          },
        ],
      },
    ],
  },
  {
    Header: "Бухгалтерия",
    Access: "user",
    Image: "/static/modules/4_module_buhgalteria/module_buhgalteria.png",
    Sections: [
      {
        Header: "Сектор расчёта заработной платы",
        Access: "user",
        Image:
          "/static/modules/4_module_buhgalteria/1_section_zarplata/section_zarplata.png",
        Links: [
          {
            Type: "active",
            Link: "/salary",
            Header: "Выгрузка расчётного листа",
            Access: "user",
          },
        ],
      },
    ],
  },
  {
    Header: "СУП",
    Access: "user",
    Image: "/static/modules/5_module_human_resourse/module_hr.png",
    Sections: [
      {
        Header: "Отдел кадров",
        Access: "user",
        Image:
          "/static/modules/5_module_human_resourse/1_section_hr/component_vacansies.png",
        Links: [
          {
            Type: "disable",
            Link: "#",
            Header: "Вакансии",
            Access: "user",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Выгрузка отпусков",
            Access: "user",
          },
        ],
      },
      {
        Header: "Отдел развития и оценки персонала",
        Access: "user",
        Image:
          "/static/modules/5_module_human_resourse/1_section_hr/section_hr.png",
        Links: [
          {
            Type: "disable",
            Link: "#",
            Header: "КЛО",
            Access: "user",
          },
        ],
      },
    ],
  },
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
