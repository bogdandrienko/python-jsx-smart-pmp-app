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
    Header: "Разработка",
    Access: "superuser",
    Image: "/static/img/modules.png",
    ShowInModules: false,
    Sections: [
      {
        Header: "Аккаунты",
        Access: "superuser",
        Image: "/static/img/modules.png",
        Links: [
          {
            Header: "Список пользователей",
            Access: "superuser",
            Active: true,
            Link: "/users_list",
            ExternalLink: false,
          },
          {
            Header: "Todo",
            Access: "superuser",
            Active: true,
            Link: "/todo",
            ExternalLink: false,
          },
          {
            Header: "Смена пароля пользователя",
            Access: "superuser",
            Active: true,
            Link: "/admin_change_user_password",
            ExternalLink: false,
          },
        ],
      },
      {
        Header: "Шаблоны",
        Access: "superuser",
        Image: "/static/img/modules.png",
        Links: [
          {
            Header: "Формы",
            Access: "superuser",
            Active: true,
            Link: "/examples_forms",
            ExternalLink: false,
          },
          {
            Header: "Шаблон",
            Access: "superuser",
            Active: true,
            Link: "/example",
            ExternalLink: false,
          },
        ],
      },
      {
        Header: "Экстра",
        Access: "superuser",
        Image: "/static/img/modules.png",
        Links: [
          {
            Header: "Геолокация, устройства: список",
            Access: "superuser",
            Active: true,
            Link: "/geo",
            ExternalLink: false,
          },
          {
            Header: "Машинное зрение: запуск анализа",
            Access: "superuser",
            Active: true,
            Link: "/analyse",
            ExternalLink: false,
          },
          {
            Header: "React",
            Access: "superuser",
            Active: true,
            Link: "#",
            ExternalLink: false,
          },
          {
            Header: "Test",
            Access: "superuser",
            Active: true,
            Link: "/test",
            ExternalLink: false,
          },
          {
            Header: "Shop",
            Access: "superuser",
            Active: true,
            Link: "/shop",
            ExternalLink: false,
          },
          {
            Header: "Gologram",
            Access: "superuser",
            Active: true,
            Link: "/gologram",
            ExternalLink: false,
          },
        ],
      },
      {
        Header: "Чат",
        Access: "superuser",
        Image: "/static/img/modules.png",
        Links: [
          {
            Header: "Общий",
            Access: "superuser",
            Active: true,
            Link: "/chat",
            ExternalLink: false,
          },
          {
            Header: "Личный",
            Access: "superuser",
            Active: true,
            Link: "/chat_react",
            ExternalLink: false,
          },
          {
            Header: "Заметки",
            Access: "superuser",
            Active: true,
            Link: "/notes",
            ExternalLink: false,
          },
        ],
      },
      {
        Header: "ОТиЗ",
        Access: "superuser",
        Image: "/static/img/modules.png",
        Links: [
          {
            Header: "Выгрузка данных",
            Access: "superuser",
            Active: true,
            Link: "/passages_select",
            ExternalLink: false,
          },
          {
            Header: "Обновление данных",
            Access: "superuser",
            Active: true,
            Link: "/passages_update",
            ExternalLink: false,
          },
          {
            Header: "Добавление данных",
            Access: "superuser",
            Active: true,
            Link: "/passages_insert",
            ExternalLink: false,
          },
          {
            Header: "Удаление данных",
            Access: "superuser",
            Active: true,
            Link: "/passages_delete",
            ExternalLink: false,
          },
        ],
      },
    ],
  },
  {
    Header: "Модератор",
    Access: "moderator",
    Image: "/static/img/modules.png",
    ShowInModules: false,
    Sections: [
      {
        Header: "Основной функционал",
        Access: "moderator",
        Image: "/static/img/modules.png",
        Links: [
          {
            Header: "Панель Администрирования",
            Access: "moderator",
            Active: true,
            Link: "/admin/",
            ExternalLink: true,
          },
          {
            Header: "localhost:3000 react app",
            Access: "moderator",
            Active: true,
            Link: "http://localhost:3000/",
            ExternalLink: true,
          },
          {
            Header: "Домашняя Django",
            Access: "moderator",
            Active: true,
            Link: "/django/",
            ExternalLink: true,
          },
          {
            Header: "Api Django rest_framework",
            Access: "moderator",
            Active: true,
            Link: "/api/routes/",
            ExternalLink: true,
          },
          {
            Header: "Логи Системы",
            Access: "moderator",
            Active: true,
            Link: "/django/logging/",
            ExternalLink: true,
          },
          {
            Header: "Создание действий, групп или модулей",
            Access: "moderator",
            Active: false,
            Link: "/create_modules",
            ExternalLink: false,
          },
        ],
      },
      {
        Header: "Аккаунты",
        Access: "moderator",
        Image: "/static/img/modules.png",
        Links: [
          {
            Header: "Создать/изменить пользователей",
            Access: "moderator",
            Active: false,
            Link: "/account_create_or_change_accounts",
            ExternalLink: false,
          },
          {
            Header: "Сгенерировать пароли для аккаунтов",
            Access: "moderator",
            Active: false,
            Link: "/account_generate_passwords",
            ExternalLink: false,
          },
          {
            Header: "Выгрузить список пользователей",
            Access: "moderator",
            Active: false,
            Link: "/account_export_accounts",
            ExternalLink: false,
          },
          {
            Header: "Обновить пользователей из 1С",
            Access: "moderator",
            Active: false,
            Link: "/account_update_accounts_1c",
            ExternalLink: false,
          },
          {
            Header: "Изменить группы пользователей",
            Access: "moderator",
            Active: false,
            Link: "/account_change_groups",
            ExternalLink: false,
          },
        ],
      },
    ],
  },
  {
    Header: "Профиль",
    Access: "user",
    Image: "/static/modules/1_module_profile/module_profile.png",
    ShowInModules: true,
    Sections: [
      {
        Header: "Основной функционал",
        Access: "user",
        Image: "/static/modules/1_module_profile/section_main/section_main.png",
        Links: [
          {
            Header: "Домашняя страница",
            Access: "user",
            Active: true,
            Link: "/login",
            ExternalLink: false,
          },
          {
            Header: "Уведомления",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
          {
            Header: "Достижения",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
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
            Header: "Профиль",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
          {
            Header: "Изменить профиль",
            Access: "user",
            Active: true,
            Link: "/change_profile",
            ExternalLink: false,
          },
          {
            Header: "Изменить пароль",
            Access: "user",
            Active: true,
            Link: "/change_password",
            ExternalLink: false,
          },
          {
            Header: "Восстановить пароль",
            Access: "user",
            Active: true,
            Link: "/recover_password",
            ExternalLink: false,
          },
          {
            Header: "Войти",
            Access: "user",
            Active: true,
            Link: "/login",
            ExternalLink: false,
          },
          {
            Header: "Выйти",
            Access: "user",
            Active: true,
            Link: "/logout",
            ExternalLink: false,
          },
        ],
      },
    ],
  },
  {
    Header: "Новости",
    Access: "user",
    Image: "/static/modules/2_module_news/module_news.png",
    ShowInModules: true,
    Sections: [
      {
        Header: "Обучение",
        Access: "user",
        Image: "/static/modules/2_module_news/section_study/section_study.png",
        Links: [
          {
            Header: "Видео-инструкции",
            Access: "user",
            Active: true,
            Link: "/video_study",
            ExternalLink: false,
          },
          {
            Header: "Текстовые инструкции",
            Access: "user",
            Active: true,
            Link: "/text_study",
            ExternalLink: false,
          },
        ],
      },
      {
        Header: "Новости",
        Access: "user",
        Image: "/static/img/modules.png",
        Links: [
          {
            Header: "Новости платформы",
            Access: "user",
            Active: false,
            Link: "/news",
            ExternalLink: false,
          },
          {
            Header: "Поиск",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
          {
            Header: "Предложить",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
          {
            Header: "Зал славы",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
          {
            Header: "Алтын Канат",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
          {
            Header: "Лучшие работники Комбината",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
        ],
      },
    ],
  },
  {
    Header: "Развитие",
    Access: "user",
    Image: "/static/modules/3_module_progress/module_progress.png",
    ShowInModules: true,
    Sections: [
      {
        Header: "Рационализаторство",
        Access: "user",
        Image:
          "/static/modules/3_module_progress/2_section_rational/sectional_rational.png",
        Links: [
          {
            Header: "Подать",
            Access: "user",
            Active: true,
            Link: "/rational_create",
            ExternalLink: false,
          },
          {
            Header: "Список",
            Access: "user",
            Active: true,
            Link: "/rational_list",
            ExternalLink: false,
          },
          {
            Header: "Подробности",
            Access: "user",
            Active: true,
            Link: "/rational_detail",
            ExternalLink: false,
          },
          {
            Header: "Премодерация",
            Access: "moderator_oupibp",
            Active: true,
            Link: "/rational_premoderate",
            ExternalLink: false,
          },
          {
            Header: "Постмодерация",
            Access: "moderator_oupibp",
            Active: true,
            Link: "/rational_postmoderate",
            ExternalLink: false,
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
            Header: "Подать идею",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
          {
            Header: "Список идей",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
          {
            Header: "Рейтинги среди идей",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
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
            Header: "Подать проект",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
          {
            Header: "Список проектов",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
          {
            Header: "Рейтинги среди проектов",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
        ],
      },
    ],
  },
  {
    Header: "Бухгалтерия",
    Access: "user",
    Image: "/static/modules/4_module_buhgalteria/module_buhgalteria.png",
    ShowInModules: true,
    Sections: [
      {
        Header: "Сектор расчёта заработной платы",
        Access: "user",
        Image:
          "/static/modules/4_module_buhgalteria/1_section_zarplata/section_zarplata.png",
        Links: [
          {
            Header: "Выгрузка расчётного листа",
            Access: "user",
            Active: true,
            Link: "/salary",
            ExternalLink: false,
          },
        ],
      },
    ],
  },
  {
    Header: "СУП",
    Access: "user",
    Image: "/static/modules/5_module_human_resourse/module_hr.png",
    ShowInModules: true,
    Sections: [
      {
        Header: "Отдел кадров",
        Access: "user",
        Image:
          "/static/modules/5_module_human_resourse/1_section_hr/component_vacansies.png",
        Links: [
          {
            Header: "Вакансии",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
          {
            Header: "Выгрузка отпусков",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
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
            Header: "КЛО",
            Access: "user",
            Active: false,
            Link: "#",
            ExternalLink: false,
          },
        ],
      },
    ],
  },
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
