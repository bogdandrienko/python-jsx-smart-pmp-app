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

export const RationalCreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const [subdivision, subdivisionSet] = useState("");
  const [sphere, sphereSet] = useState("");
  const [category, categorySet] = useState("");
  const [avatar, avatarSet] = useState(null);
  const [name, nameSet] = useState("");
  const [place, placeSet] = useState("");
  const [description, descriptionSet] = useState("");
  const [additionalWord, additionalWordSet] = useState(null);
  const [additionalPdf, additionalPdfSet] = useState(null);
  const [additionalExcel, additionalExcelSet] = useState(null);
  const [user1, user1Set] = useState("");
  const [user1Perc, user1PercSet] = useState("");
  const [user2, user2Set] = useState("");
  const [user2Perc, user2PercSet] = useState("");
  const [user3, user3Set] = useState("");
  const [user3Perc, user3PercSet] = useState("");
  const [user4, user4Set] = useState("");
  const [user4Perc, user4PercSet] = useState("");
  const [user5, user5Set] = useState("");
  const [user5Perc, user5PercSet] = useState("");

  const userListAllAuthStore = useSelector(
    (state) => state.userListAllAuthStore
  ); // store.js
  const {
    load: loadUserListAll,
    data: dataUserListAll,
    error: errorUserListAll,
    fail: failUserListAll,
  } = userListAllAuthStore;
  const rationalCreateAuthStore = useSelector(
    (state) => state.rationalCreateAuthStore
  ); // store.js
  const {
    // load: loadRationalCreate,
    data: dataRationalCreate,
    // error: errorRationalCreate,
    // fail: failRationalCreate,
  } = rationalCreateAuthStore;

  useEffect(() => {
    if (
      !dataUserListAll &&
      !loadUserListAll &&
      !errorUserListAll &&
      !failUserListAll
    ) {
      const form = {
        "Action-type": "USER_LIST_ALL",
      };
      dispatch(actions.userListAllAction(form));
    }
  }, [
    dispatch,
    dataUserListAll,
    loadUserListAll,
    errorUserListAll,
    failUserListAll,
  ]);

  useEffect(() => {
    if (dataRationalCreate) {
      utils.Sleep(5000).then(() => {
        dispatch({
          type: constants.RATIONAL_CREATE_RESET_CONSTANT,
        });
      });
    }
  }, [dataRationalCreate]);

  const formHandlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "RATIONAL_CREATE",
      subdivision: subdivision,
      sphere: sphere,
      category: category,
      avatar: avatar,
      name: name,
      place: place,
      description: description,
      additionalWord: additionalWord,
      additionalPdf: additionalPdf,
      additionalExcel: additionalExcel,
      user1: user1 + " " + user1Perc,
      user2: user2 + " " + user2Perc,
      user3: user3 + " " + user3Perc,
      user4: user4 + " " + user4Perc,
      user5: user5 + " " + user5Perc,
    };
    dispatch(actions.rationalCreateAction(form));
  };

  return (
    <div>
      <HeaderComponent
        logic={true}
        redirect={true}
        title={"Подача рационализаторского предложения"}
        description={
          "страница содержит форму с полями для заполнения и подачи рационализаторского предложения"
        }
      />
      <main className="container  ">
        <div className="">
          <StoreStatusComponent
            storeStatus={userListAllAuthStore}
            key={"userListAllAuthStore"}
            consoleLog={constants.DEBUG_CONSTANT}
            showLoad={false}
            loadText={""}
            showData={false}
            dataText={""}
            showError={true}
            errorText={""}
            showFail={true}
            failText={""}
          />
          <StoreStatusComponent
            storeStatus={rationalCreateAuthStore}
            key={"rationalCreateAuthStore"}
            consoleLog={constants.DEBUG_CONSTANT}
            showLoad={true}
            loadText={""}
            showData={true}
            dataText={""}
            showError={true}
            errorText={""}
            showFail={true}
            failText={""}
          />
        </div>
        {!dataRationalCreate && (
          <div className="container-fluid">
            <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center  ">
              <form autoComplete="on" className="" onSubmit={formHandlerSubmit}>
                <div className="">
                  <h6 className="lead fw-bold">ЗАЯВЛЕНИЕ</h6>
                  <h6 className="lead">на рационализаторское предложение</h6>
                </div>
                <br />
                <div className="">
                  <label className="form-control-sm">
                    Подразделение:
                    <select
                      className="form-control form-control-sm"
                      value={subdivision}
                      required
                      onChange={(e) => subdivisionSet(e.target.value)}
                    >
                      <option value="">Не указано</option>
                      <option value="Автотранспортное предприятие">
                        Автотранспортное предприятие
                      </option>
                      <option value="Горно-транспортный комплекс">
                        Горно-транспортный комплекс
                      </option>
                      <option value="Обогатительный комплекс">
                        Обогатительный комплекс
                      </option>
                      <option value="Управление">Управление предприятия</option>
                      <option value="Энергоуправление">Энергоуправление</option>
                    </select>
                    <small className="text-danger">* обязательно</small>
                  </label>
                  <label className="form-control-sm">
                    Зарегистрировано за №{" "}
                    <strong className="btn btn-light">XXX</strong> от
                    <small className="text-warning"> текущей </small>даты
                    <p>
                      <small className="text-success">
                        * номер будет создан автоматически
                      </small>
                    </p>
                  </label>
                </div>
                <div className="">
                  <label className="form-control-sm">
                    Сфера:
                    <select
                      className="form-control form-control-sm"
                      value={sphere}
                      required
                      onChange={(e) => sphereSet(e.target.value)}
                    >
                      <option value="">Не указано</option>
                      <option value="Технологическая">Технологическая</option>
                      <option value="Не технологическая">
                        Не технологическая
                      </option>
                    </select>
                    <small className="text-danger">* обязательно</small>
                  </label>
                  <label className="form-control-sm">
                    Категория:
                    <select
                      className="form-control form-control-sm"
                      value={category}
                      required
                      onChange={(e) => categorySet(e.target.value)}
                    >
                      <option value="">Не указано</option>
                      <option value="Индустрия 4.0">Индустрия 4.0</option>
                      <option value="Инвестиции">Инвестиции</option>
                      <option value="Инновации">Инновации</option>
                      <option value="Модернизация">Модернизация</option>
                      <option value="Экология">Экология</option>
                    </select>
                    <small className="text-danger">* обязательно</small>
                  </label>
                  <label className="form-control-sm">
                    Аватарка-заставка:
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      accept=".jpg, .png"
                      onChange={(e) => avatarSet(e.target.files[0])}
                    />
                    <small className="text-muted">* не обязательно</small>
                  </label>
                </div>
                <div className="">
                  <label className="w-50 form-control-sm">
                    Название:
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={name}
                      placeholder="введите название тут..."
                      required
                      minLength="1"
                      maxLength="250"
                      onChange={(e) => nameSet(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                    <p className="">
                      <small className="text-muted">
                        длина: не более 250 символов
                      </small>
                    </p>
                  </label>
                </div>
                <div className="">
                  <label className="w-50 form-control-sm">
                    Место внедрения:
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={place}
                      required
                      placeholder="Цех / участок / отдел / лаборатория и т.п."
                      minLength="1"
                      maxLength="500"
                      onChange={(e) => placeSet(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                    <p className="">
                      <small className="text-muted">
                        длина: не более 500 символов
                      </small>
                    </p>
                  </label>
                </div>
                <div className="">
                  <label className="w-75 form-control-sm">
                    Описание:
                    <textarea
                      className="form-control form-control-sm"
                      value={description}
                      required
                      placeholder="Полное описание"
                      minLength="1"
                      maxLength="5000"
                      rows="3"
                      onChange={(e) => descriptionSet(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                    <p className="">
                      <small className="text-muted">
                        длина: не более 5000 символов
                      </small>
                    </p>
                  </label>
                </div>
                <div className="">
                  <label className="form-control-sm">
                    Word файл-приложение:
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      accept=".docx, .doc"
                      onChange={(e) => additionalWordSet(e.target.files[0])}
                    />
                    <small className="text-muted">* не обязательно</small>
                  </label>
                  <label className="form-control-sm">
                    Pdf файл-приложение:
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      accept=".pdf"
                      onChange={(e) => additionalPdfSet(e.target.files[0])}
                    />
                    <small className="text-muted">* не обязательно</small>
                  </label>
                  <label className="form-control-sm">
                    Excel файл-приложение:
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      accept=".xlsx, .xls"
                      onChange={(e) => additionalExcelSet(e.target.files[0])}
                    />
                    <small className="text-muted">* не обязательно</small>
                  </label>
                </div>
                <br />
                <div className="">
                  <p className="text-danger">
                    Я(мы) утверждаю(ем), что являюсь(ся) автором(и) данного
                    предложения. Мне(нам) также известно, что в случае признания
                    предложения коммерческой тайной подразделения, я(мы) обязан
                    не разглашать его сущность.
                  </p>
                </div>
                <div className="">
                  <label className="form-control-sm">
                    Участники:
                    <p>
                      <small className="fw-bold">
                        (Фамилия Имя Отчество) (Табельный номер) (Вклад в рац.
                        предложение) %
                      </small>
                    </p>
                  </label>
                </div>
                <div className="">
                  <label className="form-control-sm">
                    {dataUserListAll && (
                      <div>
                        <div className="">
                          <label className="form-control-sm">
                            участник №1:
                            <select
                              className="form-control form-control-sm"
                              value={user1}
                              required
                              onChange={(e) => user1Set(e.target.value)}
                            >
                              <option value="">Не выбрано</option>
                              {dataUserListAll.map((user, index) => (
                                <option key={index} value={user}>
                                  {user}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="form-control-sm">
                            % Вклада 1 участника
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={user1Perc}
                              required
                              placeholder="пример: 70%"
                              minLength="0"
                              maxLength="4"
                              onChange={(e) => user1PercSet(e.target.value)}
                            />
                          </label>
                        </div>
                        <div className="">
                          <label className="form-control-sm">
                            участник №2:
                            <select
                              className="form-control form-control-sm"
                              value={user2}
                              required
                              onChange={(e) => user2Set(e.target.value)}
                            >
                              <option value="">Не выбрано</option>
                              {dataUserListAll.map((user, index) => (
                                <option key={index} value={user}>
                                  {user}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="form-control-sm">
                            % Вклада 2 участника
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={user2Perc}
                              required
                              placeholder="пример: 70%"
                              minLength="0"
                              maxLength="4"
                              onChange={(e) => user2PercSet(e.target.value)}
                            />
                          </label>
                        </div>
                        <div className="">
                          <label className="form-control-sm">
                            участник №3:
                            <select
                              className="form-control form-control-sm"
                              value={user3}
                              required
                              onChange={(e) => user3Set(e.target.value)}
                            >
                              <option value="">Не выбрано</option>
                              {dataUserListAll.map((user, index) => (
                                <option key={index} value={user}>
                                  {user}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="form-control-sm">
                            % Вклада 3 участника
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={user3Perc}
                              required
                              placeholder="пример: 70%"
                              minLength="0"
                              maxLength="4"
                              onChange={(e) => user3PercSet(e.target.value)}
                            />
                          </label>
                        </div>
                        <div className="">
                          <label className="form-control-sm">
                            участник №4:
                            <select
                              className="form-control form-control-sm"
                              value={user4}
                              required
                              onChange={(e) => user4Set(e.target.value)}
                            >
                              <option value="">Не выбрано</option>
                              {dataUserListAll.map((user, index) => (
                                <option key={index} value={user}>
                                  {user}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="form-control-sm">
                            % Вклада 4 участника
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={user4Perc}
                              required
                              placeholder="пример: 70%"
                              minLength="0"
                              maxLength="4"
                              onChange={(e) => user4PercSet(e.target.value)}
                            />
                          </label>
                        </div>
                        <div className="">
                          <label className="form-control-sm">
                            участник №5:
                            <select
                              className="form-control form-control-sm"
                              value={user5}
                              required
                              onChange={(e) => user5Set(e.target.value)}
                            >
                              <option value="">Не выбрано</option>
                              {dataUserListAll.map((user, index) => (
                                <option key={index} value={user}>
                                  {user}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="form-control-sm">
                            % Вклада 5 участника
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={user5Perc}
                              required
                              placeholder="пример: 70%"
                              minLength="0"
                              maxLength="4"
                              onChange={(e) => user5PercSet(e.target.value)}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
                <div className="">
                  <small className="text-muted">
                    * общая сумма вклада всех участников не должна превышать
                    100%
                  </small>
                </div>
                <br />
                <div className="container-fluid text-center">
                  <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                    <li className="m-1">
                      <button
                        type="submit"
                        className="btn btn-sm btn-outline-primary"
                      >
                        Отправить
                      </button>
                    </li>
                    <li className="m-1">
                      <button
                        type="reset"
                        className="btn btn-sm btn-outline-warning"
                        onClick={(e) => {
                          subdivisionSet("");
                          sphereSet("");
                          categorySet("");
                          avatarSet("");
                          nameSet("");
                          placeSet("");
                          descriptionSet("");
                          additionalWordSet("");
                          additionalPdfSet("");
                          additionalExcelSet("");
                          user1Set("");
                          user1PercSet("");
                          user2Set("");
                          user2PercSet("");
                          user3Set("");
                          user3PercSet("");
                          user4Set("");
                          user4PercSet("");
                          user5Set("");
                          user5PercSet("");
                        }}
                      >
                        Сбросить все данные
                      </button>
                    </li>
                  </ul>
                </div>
              </form>
            </ul>
          </div>
        )}
      </main>
      <FooterComponent />
    </div>
  );
};
