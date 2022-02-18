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
export const RATIONAL_LIST_LOADING_CONSTANT = "RATIONAL_LIST_LOADING_CONSTANT";
export const RATIONAL_LIST_DATA_CONSTANT = "RATIONAL_LIST_DATA_CONSTANT";
export const RATIONAL_LIST_ERROR_CONSTANT = "RATIONAL_LIST_ERROR_CONSTANT";
export const RATIONAL_LIST_FAIL_CONSTANT = "RATIONAL_LIST_FAIL_CONSTANT";
export const RATIONAL_LIST_RESET_CONSTANT = "RATIONAL_LIST_RESET_CONSTANT";
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
    Header: "Профиль",
    Image: "/static/modules/1_module_profile/module_profile.png",
    Sections: [
      {
        Header: "Основной функционал",
        Image: "/static/modules/1_module_profile/section_main/section_main.png",
        Links: [
          {
            Type: "active",
            Link: "/login",
            Header: "Домашняя страница",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Уведомления",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Достижения",
          },
        ],
      },
      {
        Header: "Личный профиль",
        Image:
          "/static/modules/1_module_profile/section_self_profile/section_self_profile.png",
        Links: [
          {
            Type: "disable",
            Link: "#",
            Header: "Профиль",
          },
          {
            Type: "active",
            Link: "/change_profile",
            Header: "Изменить профиль",
          },
          {
            Type: "active",
            Link: "/change_password",
            Header: "Изменить пароль",
          },
          {
            Type: "active",
            Link: "/recover_password",
            Header: "Восстановить пароль",
          },
          {
            Type: "active",
            Link: "/login",
            Header: "Войти",
          },
          {
            Type: "active",
            Link: "/logout",
            Header: "Выйти",
          },
        ],
      },
    ],
  },
  {
    Header: "Новости",
    Image: "/static/modules/2_module_news/module_news.png",
    Sections: [
      {
        Header: "Обучение",
        Image: "/static/modules/2_module_news/section_study/section_study.png",
        Links: [
          {
            Type: "active",
            Link: "/video_study",
            Header: "Видео-инструкции",
          },
          {
            Type: "active",
            Link: "/text_study",
            Header: "Текстовые инструкции",
          },
        ],
      },
      {
        Header: "Новости",
        Image: "/static/img/modules.png",
        Links: [
          {
            Type: "active",
            Link: "/news",
            Header: "Новости платформы",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Поиск",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Предложить",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Зал славы",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Алтын Канат",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Лучшие работники Комбината",
          },
        ],
      },
    ],
  },
  {
    Header: "Развитие",
    Image: "/static/modules/3_module_progress/module_progress.png",
    Sections: [
      {
        Header: "Банк идей",
        Image:
          "/static/modules/3_module_progress/1_section_idea/section_idea.png",
        Links: [
          {
            Type: "disable",
            Link: "#",
            Header: "Подать идею",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Список идей",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Рейтинги среди идей",
          },
        ],
      },
      {
        Header: "Рационализаторство",
        Image:
          "/static/modules/3_module_progress/2_section_rational/sectional_rational.png",
        Links: [
          {
            Type: "disable",
            Link: "#",
            Header: "Подать рац. предложение",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Список рац. предложений",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Рейтинги среди рац. предложений",
          },
        ],
      },
      {
        Header: "Проектная деятельность",
        Image:
          "/static/modules/3_module_progress/3_section_project/section_project.png",
        Links: [
          {
            Type: "disable",
            Link: "#",
            Header: "Подать проект",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Список проектов",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Рейтинги среди проектов",
          },
        ],
      },
    ],
  },
  {
    Header: "Бухгалтерия",
    Image: "/static/modules/4_module_buhgalteria/module_buhgalteria.png",
    Sections: [
      {
        Header: "Сектор расчёта заработной платы",
        Image:
          "/static/modules/4_module_buhgalteria/1_section_zarplata/section_zarplata.png",
        Links: [
          {
            Type: "active",
            Link: "/salary",
            Header: "Выгрузка расчётного листа",
          },
        ],
      },
    ],
  },
  {
    Header: "СУП",
    Image: "/static/modules/5_module_human_resourse/module_hr.png",
    Sections: [
      {
        Header: "Отдел кадров",
        Image:
          "/static/modules/5_module_human_resourse/1_section_hr/component_vacansies.png",
        Links: [
          {
            Type: "disable",
            Link: "#",
            Header: "Вакансии",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Выгрузка отпусков",
          },
        ],
      },
      {
        Header: "Отдел развития и оценки персонала",
        Image:
          "/static/modules/5_module_human_resourse/1_section_hr/section_hr.png",
        Links: [
          {
            Type: "disable",
            Link: "#",
            Header: "КЛО",
          },
        ],
      },
    ],
  },
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
