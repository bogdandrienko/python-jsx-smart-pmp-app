// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React from "react";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const TextStudyPage = () => {
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <components.HeaderComponent />
      <main>
        <components.AccordionComponent
          key_target={"accordion1"}
          isCollapse={true}
          title={"Первый вход в систему:"}
          text_style="text-primary"
          header_style="bg-primary bg-opacity-10 custom-background-transparent-low"
          body_style="bg-light bg-opacity-10 custom-background-transparent-low"
        >
          {
            <ol className="nav m-0 p-1">
              <li className="text-start m-0 p-1">
                <div className="m-0 p-1">
                  <a
                    className="btn btn-sm btn-outline-primary m-0 p-2"
                    href="/static/study/first_login.pdf"
                  >
                    Скачать инструкцию в pdf-формате
                  </a>
                </div>
              </li>
              <li className="text-start m-0 p-1">
                Обновите Ваш браузер до последней доступной версии!
                <p className="text-center m-0 p-1">
                  Компьютер:
                  <img
                    src="/static/study/input_0_0.png"
                    className="w-75 img-fluid img-thumbnail"
                    alt="id"
                  />
                </p>
                <p className="text-center m-0 p-1">
                  Мобильный вид:
                  <img
                    src="/static/study/input_0_1.jpg"
                    className="w-25 img-fluid img-thumbnail"
                    alt="id"
                  />
                </p>
                <p className="text-center text-success">
                  Рекомендуемые типы браузеров: 1) Google Chrome 2) Firefox
                </p>
                <p>
                  <small className="text-muted">
                    Стабильность и работоспособность системы может отличаться в
                    зависимости от типа и версии браузера.
                  </small>
                </p>
                <hr />
              </li>
              <li className="text-start m-0 p-1">
                Перейдите по ссылке:{" "}
                <small className="text-decoration-underline text-success">
                  <a href="https://web.km.kz">https://web.km.kz</a>
                </small>
                <p className="text-center text-success">
                  Либо отсканируйте QR код
                  <img
                    src="/static/study/qr_link.png"
                    className="w-25"
                    alt="id"
                  />
                </p>
                <hr />
              </li>
              <li className="text-start m-0 p-1">
                Нажмите на кнопку "Войти", на верхней панели.
                <p>
                  <small className="text-muted">
                    Также переход на страницу с новостями или выгрузки
                    расчётного листа автоматически перенаправит Вас на страницу
                    входа.
                  </small>
                </p>
                <p className="text-center m-0 p-1">
                  <img
                    src="/static/study/input_1.png"
                    className="w-100"
                    alt="id"
                  />
                </p>
                <hr />
              </li>
              <li className="text-start m-0 p-1">
                После предыдущего действия Вас перенаправит на страницу входа,
                на которой нужно ввести Ваш ИИН, пароль и поставить отметку, что
                Вы не робот.
                <p>
                  <small className="text-danger">
                    Первый временный пароль будет предоставлен при распечатке
                    Вашего расчётного листа.
                  </small>
                </p>
                <p className="text-center m-0 p-1">
                  <img
                    src="/static/study/input_2.png"
                    className="w-100"
                    alt="id"
                  />
                </p>
                <p>
                  <small className="text-muted">
                    Система уведомит Вас в случае успешного или не успешного
                    ввода.
                  </small>
                </p>
                <hr />
              </li>
              <li className="text-start m-0 p-1">
                После успешного первого входа Вас перенаправит на страницу
                обязательного заполнения дополнительных данных.
                <p>
                  <small className="text-danger">
                    Пароль должен состоять только из латинских букв и цифр!
                  </small>
                  <small className="text-danger">
                    Внимание, первый пароль является временным, его необходимо
                    заменить!
                  </small>
                </p>
                <p className="text-center m-0 p-1">
                  <img
                    src="/static/study/input_3.png"
                    className="w-100"
                    alt="id"
                  />
                </p>
                <p>
                  <small className="text-muted">
                    Данные необходимы для восстановления доступа к аккаунту в
                    случае утери пароля.
                  </small>
                </p>
                <hr />
              </li>
              <li className="text-start m-0 p-1">
                Для быстрого доступа к сайту можно сделать закладку и перенести
                её для быстрого доступа.
                <p className="text-center m-0 p-1">
                  Компьютеры:
                  <img
                    src="/static/study/input_4_1.png"
                    className="w-75"
                    alt="id"
                  />
                </p>
                <p className="text-center m-0 p-1">
                  Мобильный вид:
                  <img
                    src="/static/study/input_4_2.png"
                    className="w-50"
                    alt="id"
                  />
                </p>
                <p>
                  <small className="text-muted">
                    Закладку потом можно перенести на рабочий стол / главный.
                    экран
                  </small>
                </p>
              </li>
              <li className="text-start m-0 p-1">
                После успешного действия Вас снова перенаправит на страницу
                входа, где уже нужно использовать новый пароль.
                <p>
                  <small className="text-success">
                    Успешного пользования Платформой!
                  </small>
                </p>
              </li>
            </ol>
          }
        </components.AccordionComponent>
        <components.AccordionComponent
          key_target={"accordion2"}
          isCollapse={true}
          title={"Выгрузка расчётного листа:"}
          text_style="text-warning"
          header_style="bg-warning bg-opacity-10 custom-background-transparent-low"
          body_style="bg-light bg-opacity-10 custom-background-transparent-low"
        >
          {
            <ol className="nav m-0 p-1">
              <li className="text-start m-0 p-1">
                <div>
                  <a
                    className="btn btn-sm btn-outline-primary m-0 p-1"
                    href="/static/study/salary.pdf"
                  >
                    Скачать инструкцию в pdf-формате
                  </a>
                </div>
              </li>
              <li className="text-start m-0 p-1">
                Войдите в систему, а затем нажмите на кнопку "Выгрузка
                расчётного листа" в пунктe "Бухгалтерия / Сектор расчёта
                заработной платы" на верхней панели.
                <p className="text-center m-0 p-1">
                  <img
                    src="/static/study/salary_1.png"
                    className="w-100"
                    alt="id"
                  />
                </p>
                <p>
                  <small className="text-muted">
                    Аналогичный переход также доступен через соответствующую
                    кнопку на главной странице, в "Модулях".
                  </small>
                </p>
                <hr />
              </li>
              <li className="text-start m-0 p-1">
                На этой странице необходимо выбрать период: месяц и год
                выгрузки, а затем нажать "получить".
                <p>
                  <small className="text-danger">
                    Внимание, данные будут доступны только после окончательного
                    перерасчёта периода.
                  </small>
                </p>
                <p className="text-center m-0 p-1">
                  <img
                    src="/static/study/salary_2.png"
                    className="w-100"
                    alt="id"
                  />
                </p>
                <p>
                  <small className="text-muted">
                    Выгрузка расчётного листа ранее 2021 года недоступна.
                  </small>
                </p>
                <hr />
              </li>
              <li className="text-start m-0 p-1">
                После нажатия кнопки, происходит формирование расчётного листа.
                <p>
                  <small className="text-muted">
                    Формирование может занимать продолжительное время (до 30
                    секунд)!
                  </small>
                </p>
                <p className="text-center m-0 p-1">
                  <img
                    src="/static/study/salary_3.png"
                    className="w-100"
                    alt="id"
                  />
                </p>
                <p>
                  <small className="text-danger">
                    В случае получения ошибки, можете попробовать повторить
                    несколько раз нажатие, либо ожидайте исправления неподалок /
                    выберите другой расчётный период.
                  </small>
                </p>
                <hr />
              </li>
              <li className="text-start m-0 p-1">
                При успешном получении данных они отобразятся в таблицах ниже.
                <p>
                  <small className="text-success">
                    Также можно скачать расчётный лист в привычном
                    excel-формате, для распечатки!
                  </small>
                </p>
                <p className="text-center m-0 p-1">
                  <img
                    src="/static/study/salary_4.png"
                    className="w-100"
                    alt="id"
                  />
                </p>
                <p>
                  <small className="text-muted">
                    Данные в excel-формате. Внимание, изменение ячеек запрещено!
                  </small>
                </p>
                <p className="text-center m-0 p-1">
                  <img
                    src="/static/study/salary_5.png"
                    className="w-50"
                    alt="id"
                  />
                </p>
                <p>
                  <small className="text-danger">
                    В случае каких либо неполадок, можете обратиться к
                    администратору системы. Данные указаны в самом низу
                    страницы.
                  </small>
                </p>
              </li>
            </ol>
          }
        </components.AccordionComponent>
      </main>
      <components.FooterComponent />
    </div>
  );
};
