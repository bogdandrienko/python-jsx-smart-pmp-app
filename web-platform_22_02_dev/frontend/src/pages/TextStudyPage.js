import React from "react";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const TextStudyPage = () => {
  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Текстовые инструкции"}
        second={
          "страница с текстовыми инструкциями по функционалу веб-платформы."
        }
        logic={false}
      />
      <main className="container text-center">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="accordion_heading_1">
              <button
                class="accordion-button "
                type="button"
                data-bs-toggle=""
                data-bs-target="#accordion_collapse_1"
                aria-expanded="false"
                aria-controls="accordion_collapse_1"
              >
                <p className="lead text-danger">Первый вход в систему:
              <div>
                <a
                  className="btn btn-lg btn-outline-primary m-1"
                  href="/static/first_login.pdf"
                >
                  Скачать инструкцию в pdf-формате
                </a>
              </div></p>
              </button>
            </h2>
            <div
              id="accordion_collapse_1"
              class="accordion-collapse "
              aria-labelledby="accordion_collapse_1"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <ol className="card">
                  <li className="m-1 text-start">
                    Перейдите по ссылке:{" "}
                    <small className="text-decoration-underline text-success">
                      <a href="http://web.km.kz:88/">
                        http://web.km.kz:88/
                      </a>
                    </small>
                    <p className="text-center text-success">
                      Либо отсканируйте QR код
                      <img src="static/qr_link.png" className="w-25" alt="id" />
                    </p>
                    <hr/>
                  </li>
                  <li className="m-1 text-start">
                    Нажмите на кнопку "Войти", на верхней панели.
                    <p>
                      <small className="text-muted">
                        Также переход на страницу с новостями или выгрузки
                        расчётного листа автоматически перенаправит Вас на
                        страницу входа.
                      </small>
                    </p>
                    <p className="text-center">
                      <img
                        src="static/input_1.png"
                        className="w-100"
                        alt="id"
                      />
                    </p>
                    <hr/>
                  </li>
                  <li className="m-1 text-start">
                    После предыдущего действия Вас перенаправит на страницу
                    входа, на которой нужно ввести Ваш ИИН, пароль и поставить
                    отметку, что Вы не робот.
                    <p>
                      <small className="text-danger">
                        Первый временный пароль будет предоставлен при
                        распечатке Вашего расчётного листа.
                      </small>
                    </p>
                    <p className="text-center">
                      <img
                        src="static/input_2.png"
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
                    <hr/>
                  </li>
                  <li className="m-1 text-start">
                    После успешного первого входа Вас перенаправит на страницу
                    обязательного заполнения дополнительных данных.
                    <p>
                      <small className="text-danger">
                        Внимание, первый пароль является временным, его необходимо заменить!
                      </small>
                    </p>
                    <p className="text-center">
                      <img
                        src="static/input_3.png"
                        className="w-100"
                        alt="id"
                      />
                    </p>
                    <p>
                      <small className="text-muted">
                        Данные необходимы для восстановления доступа к аккаунту
                        в случае утери пароля.
                      </small>
                    </p>
                    <hr/>
                  </li>
                  <li className="m-1 text-start">
                    После успешного действия Вас снова перенаправит на страницу входа, где уже нужно использовать новый пароль.
                    <p>
                      <small className="text-success">
                        Успешного пользования Платформой!
                      </small>
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header" id="accordion_heading_2">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#accordion_collapse_2"
                aria-expanded="false"
                aria-controls="accordion_collapse_2"
              >
                <p className="lead text-danger">
                  Выгрузка расчётного листа:
                  <div>
                    <a
                      className="btn btn-lg btn-outline-primary m-1"
                      href="/static/salary.pdf"
                    >
                      Скачать инструкцию в pdf-формате
                    </a>
                  </div>
                </p>
              </button>
            </h2>
            <div
              id="accordion_collapse_2"
              class="accordion-collapse"
              aria-labelledby="accordion_collapse_2"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <ol className="card">
                  <li className="m-1 text-start">
                    Войдите в систему, а затем нажмите на кнопку "Выгрузка
                    расчётного листа" в пунктe "Бухгалтерия / Сектор расчёта
                    заработной платы" на верхней панели.
                    <p className="text-center">
                      <img
                        src="static/salary_1.png"
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
                  <li className="m-1 text-start">
                    На этой странице необходимо выбрать период: месяц и год
                    выгрузки, а затем нажать "получить".
                    <p>
                      <small className="text-danger">
                        Внимание, данные будут доступны только после
                        окончательного перерасчёта периода.
                      </small>
                    </p>
                    <p className="text-center">
                      <img
                        src="static/salary_2.png"
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
                  <li className="m-1 text-start">
                    После нажатия кнопки, происходит формирование расчётного
                    листа.
                    <p>
                      <small className="text-muted">
                        Формирование может занимать продолжительное время (до 30
                        секунд)!
                      </small>
                    </p>
                    <p className="text-center">
                      <img
                        src="static/salary_3.png"
                        className="w-100"
                        alt="id"
                      />
                    </p>
                    <p>
                      <small className="text-danger">
                        В случае получения ошибки, можете попробовать повторить
                        несколько раз нажатие, либо ожидайте исправления
                        неподалок / выберите другой расчётный период.
                      </small>
                    </p>
                    <hr />
                  </li>
                  <li className="m-1 text-start">
                    При успешном получении данных они отобразятся в таблицах ниже.
                    <p>
                      <small className="text-success">
                        Также можно скачать расчётный лист в привычном excel-формате, для распечатки!
                      </small>
                    </p>
                    <p className="text-center">
                      <img
                        src="static/salary_4.png"
                        className="w-100"
                        alt="id"
                      />
                    </p>
                    <p>
                      <small className="text-muted">
                        Данные в excel-формате. Внимание, изменение ячеек запрещено!
                      </small>
                    </p>
                    <p className="text-center">
                      <img
                        src="static/salary_5.png"
                        className="w-50"
                        alt="id"
                      />
                    </p>
                    <p>
                      <small className="text-danger">
                        В случае каких либо неполадок, можете обратиться к администратору системы. Данные указаны в самом низу страницы.
                      </small>
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default TextStudyPage;
