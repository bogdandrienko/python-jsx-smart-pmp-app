import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Spinner,
  Alert,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import ReactPlayer from "react-player";
import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../base/HeaderComponent";
import FooterComponent from "../base/FooterComponent";
import StoreStatusComponent from "../base/StoreStatusComponent";
import MessageComponent from "../base/MessageComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const TextStudyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  return (
    <div>
      <HeaderComponent
        logic={true}
        redirect={false}
        title={"Текстовые инструкции"}
        description={
          "страница с текстовыми инструкциями по функционалу веб-платформы"
        }
      />
      <main className="container text-center">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="accordion_heading_1">
              <button
                className="accordion-button "
                type="button"
                data-bs-toggle=""
                data-bs-target="#accordion_collapse_1"
                aria-expanded="false"
                aria-controls="accordion_collapse_1"
              >
                <p className="lead text-danger">
                  Первый вход в систему:
                  <div>
                    <a
                      className="btn btn-sm btn-outline-primary m-1"
                      href="/static/study/first_login.pdf"
                    >
                      Скачать инструкцию в pdf-формате
                    </a>
                  </div>
                </p>
              </button>
            </h2>
            <div
              id="accordion_collapse_1"
              className="accordion-collapse "
              aria-labelledby="accordion_collapse_1"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <ol className="card">
                  <li className="m-1 text-start">
                    Обновите Ваш браузер до последней доступной версии!
                    <p className="text-center">
                      Компьютер:
                      <img
                        src="static/study/input_0_0.png"
                        className="w-75 img-fluid img-thumbnail"
                        alt="id"
                      />
                    </p>
                    <p className="text-center">
                      Мобильный вид:
                      <img
                        src="static/study/input_0_1.jpg"
                        className="w-25 img-fluid img-thumbnail"
                        alt="id"
                      />
                    </p>
                    <p className="text-center text-success">
                      Рекомендуемые типы браузеров: 1) Google Chrome 2) Firefox
                    </p>
                    <p>
                      <small className="text-muted">
                        Функционал и работоспособность системы может отличаться
                        в зависимости от типа и версии браузера.
                      </small>
                    </p>
                    <hr />
                  </li>
                  <li className="m-1 text-start">
                    Перейдите по ссылке:{" "}
                    <small className="text-decoration-underline text-success">
                      <a href="http://web.km.kz:88/">http://web.km.kz:88/</a>
                    </small>
                    <p className="text-center text-success">
                      Либо отсканируйте QR код
                      <img
                        src="static/study/qr_link.png"
                        className="w-25"
                        alt="id"
                      />
                    </p>
                    <hr />
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
                        src="static/study/input_1.png"
                        className="w-100"
                        alt="id"
                      />
                    </p>
                    <hr />
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
                        src="static/study/input_2.png"
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
                  <li className="m-1 text-start">
                    После успешного первого входа Вас перенаправит на страницу
                    обязательного заполнения дополнительных данных.
                    <p>
                      <small className="text-danger">
                        Пароль должен состоять только из латинских букв и цифр!
                      </small>
                      <p>
                        <small className="text-danger">
                          Внимание, первый пароль является временным, его
                          необходимо заменить!
                        </small>
                      </p>
                    </p>
                    <p className="text-center">
                      <img
                        src="static/study/input_3.png"
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
                    <hr />
                  </li>
                  <li className="m-1 text-start">
                    Для быстрого доступа к сайту можно сделать закладку и
                    перенести её для быстрого доступа.
                    <p className="text-center">
                      Компьютеры:
                      <img
                        src="static/study/input_4_1.png"
                        className="w-75"
                        alt="id"
                      />
                    </p>
                    <p className="text-center">
                      Мобильный вид:
                      <img
                        src="static/study/input_4_2.png"
                        className="w-50"
                        alt="id"
                      />
                    </p>
                    <p>
                      <small className="text-muted">
                        Закладку потом можно перенести на рабочий стол /
                        главный. экран
                      </small>
                    </p>
                  </li>
                  <li className="m-1 text-start">
                    После успешного действия Вас снова перенаправит на страницу
                    входа, где уже нужно использовать новый пароль.
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

          <div className="accordion-item">
            <h2 className="accordion-header" id="accordion_heading_2">
              <button
                className="accordion-button"
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
                      className="btn btn-sm btn-outline-primary m-1"
                      href="/static/study/salary.pdf"
                    >
                      Скачать инструкцию в pdf-формате
                    </a>
                  </div>
                </p>
              </button>
            </h2>
            <div
              id="accordion_collapse_2"
              className="accordion-collapse"
              aria-labelledby="accordion_collapse_2"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <ol className="card">
                  <li className="m-1 text-start">
                    Войдите в систему, а затем нажмите на кнопку "Выгрузка
                    расчётного листа" в пунктe "Бухгалтерия / Сектор расчёта
                    заработной платы" на верхней панели.
                    <p className="text-center">
                      <img
                        src="static/study/salary_1.png"
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
                        src="static/study/salary_2.png"
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
                        src="static/study/salary_3.png"
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
                    При успешном получении данных они отобразятся в таблицах
                    ниже.
                    <p>
                      <small className="text-success">
                        Также можно скачать расчётный лист в привычном
                        excel-формате, для распечатки!
                      </small>
                    </p>
                    <p className="text-center">
                      <img
                        src="static/study/salary_4.png"
                        className="w-100"
                        alt="id"
                      />
                    </p>
                    <p>
                      <small className="text-muted">
                        Данные в excel-формате. Внимание, изменение ячеек
                        запрещено!
                      </small>
                    </p>
                    <p className="text-center">
                      <img
                        src="static/study/salary_5.png"
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
