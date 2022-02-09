const modules = [
  {
    Header: "Профиль",
    Image: "/static/modules/1_module_profile/module_profile.png",
    Sections: [
      {
        Header: "Основной функционал",
        Image:
          "/static/modules/1_module_profile/section_main/section_main.png",
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
        Header: "Новости Предприятия",
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
        Header: "Отдел охраны труда",
        Image:
          "/static/modules/5_module_human_resourse/1_section_hr/section_hr.png",
        Links: [
          {
            Type: "disable",
            Link: "#",
            Header: "Термометрия",
          },
          {
            Type: "disable",
            Link: "#",
            Header: "Алкометрия",
          },
        ],
      },
    ],
  },
];

export default modules;
