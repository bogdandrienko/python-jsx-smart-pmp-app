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
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import StoreStatusComponent from "../../components/StoreStatusComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const BankIdeaListPage = () => {
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

  const userListAllStore = useSelector((state) => state.userListAllStore); // store.js
  const {
    load: loadUserListAll,
    data: dataUserListAll,
    // error: errorUserListAll,
    // fail: failUserListAll,
  } = userListAllStore;
  const rationalCreateStore = useSelector((state) => state.rationalCreateStore); // store.js
  const {
    // load: loadRationalCreate,
    data: dataRationalCreate,
    // error: errorRationalCreate,
    // fail: failRationalCreate,
  } = rationalCreateStore;

  useEffect(() => {
    if (!dataUserListAll && !loadUserListAll) {
      const form = {
        "Action-type": "USER_LIST_ALL",
      };
      dispatch(actions.userListAllAuthAction(form));
    }
  }, [dispatch, dataUserListAll, loadUserListAll]);

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
    dispatch(actions.rationalCreateAuthAction(form));
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Подача рац. предложения"}
        second={
          "страница содержит форму с полями для заполнения и подачи рац. предложения."
        }
      />
      <main className="container p-0">
        <div className="m-0 p-0">
          {StoreStatusComponent(
            userListAllStore,
            "userListAllStore",
            false,
            "",
            constants.DEBUG_CONSTANT
          )}
          {StoreStatusComponent(
            rationalCreateStore,
            "rationalCreateStore",
            true,
            "",
            constants.DEBUG_CONSTANT
          )}
        </div>
        {!dataRationalCreate && (
          <div className="container-fluid">
            <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center p-0 m-0">
              <form autoComplete="on" className="" onSubmit={formHandlerSubmit}>
                <div className="p-0 m-0">
                  <h6 className="lead fw-bold">ЗАЯВЛЕНИЕ</h6>
                  <h6 className="lead">на рационализаторское предложение</h6>
                </div>
                <br />
                <div className="p-0 m-0">
                  <label className="form-control-sm">
                    Наименование структурного подразделения:
                    <select
                      id="subdivision"
                      name="subdivision"
                      required
                      className="form-control form-control-sm"
                      value={subdivision}
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
                <div className="p-0 m-0">
                  <label className="form-control-sm">
                    Сфера рац. предложения:
                    <select
                      id="sphere"
                      name="sphere"
                      required
                      className="form-control form-control-sm"
                      value={sphere}
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
                      id="category"
                      name="category"
                      required
                      className="form-control form-control-sm"
                      value={category}
                      onChange={(e) => categorySet(e.target.value)}
                    >
                      <option value="">Не указано</option>
                      <option value="Индустрия 4.0">Индустрия 4.0</option>
                      <option value="Инвестиционное">Инвестиционное</option>
                      <option value="Инновационное">Инновационное</option>
                      <option value="Модернизационное">Модернизационное</option>
                    </select>
                    <small className="text-danger">* обязательно</small>
                  </label>
                  <label className="form-control-sm">
                    Аватарка-заставка для идеи:
                    <input
                      type="file"
                      id="avatar_image_field"
                      name="avatar_image_field"
                      accept=".jpg, .png"
                      className="form-control form-control-sm"
                      onChange={(e) => avatarSet(e.target.files[0])}
                    />
                    <small className="text-muted">* не обязательно</small>
                  </label>
                </div>
                <div className="p-0 m-0">
                  <label className="w-50 form-control-sm">
                    Название рац. предложения:
                    <input
                      type="text"
                      id="name_char_field"
                      name="name_char_field"
                      required
                      placeholder="Название"
                      value={name}
                      minLength="1"
                      maxLength="250"
                      className="form-control form-control-sm"
                      onChange={(e) => nameSet(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                    <p className="p-0 m-0">
                      <small className="text-muted">
                        длина: не более 250 символов
                      </small>
                    </p>
                  </label>
                </div>
                <div className="p-0 m-0">
                  <label className="w-50 form-control-sm">
                    Предполагаемое место внедрения:
                    <input
                      type="text"
                      id="name_char_field"
                      name="name_char_field"
                      required
                      placeholder="Цех / участок / отдел / лаборатория и т.п."
                      value={place}
                      minLength="1"
                      maxLength="500"
                      className="form-control form-control-sm"
                      onChange={(e) => placeSet(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                    <p className="p-0 m-0">
                      <small className="text-muted">
                        длина: не более 500 символов
                      </small>
                    </p>
                  </label>
                </div>
                <div className="p-0 m-0">
                  <label className="w-75 form-control-sm">
                    Описание:
                    <textarea
                      required
                      placeholder="Полное описание"
                      value={description}
                      minLength="1"
                      maxLength="5000"
                      rows="3"
                      className="form-control form-control-sm"
                      onChange={(e) => descriptionSet(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                    <p className="p-0 m-0">
                      <small className="text-muted">
                        длина: не более 5000 символов
                      </small>
                    </p>
                  </label>
                </div>
                <div className="p-0 m-0">
                  <label className="form-control-sm">
                    Word файл-приложение:
                    <input
                      type="file"
                      id="addiction_file_field"
                      name="addiction_file_field"
                      accept=".docx, .doc"
                      className="form-control form-control-sm"
                      onChange={(e) => additionalWordSet(e.target.files[0])}
                    />
                    <small className="text-muted">* не обязательно</small>
                  </label>
                  <label className="form-control-sm">
                    Pdf файл-приложение:
                    <input
                      type="file"
                      id="addiction_file_field"
                      name="addiction_file_field"
                      accept=".pdf"
                      className="form-control form-control-sm"
                      onChange={(e) => additionalPdfSet(e.target.files[0])}
                    />
                    <small className="text-muted">* не обязательно</small>
                  </label>
                  <label className="form-control-sm">
                    Excel файл-приложение:
                    <input
                      type="file"
                      id="addiction_file_field"
                      name="addiction_file_field"
                      accept=".xlsx, .xls"
                      className="form-control form-control-sm"
                      onChange={(e) => additionalExcelSet(e.target.files[0])}
                    />
                    <small className="text-muted">* не обязательно</small>
                  </label>
                </div>
                <br />
                <div className="p-0 m-0">
                  <p className="text-danger">
                    Я(мы) утверждаю(ем), что являюсь(ся) автором(и) данного
                    предложения. Мне(нам) также известно, что в случае признания
                    предложения коммерческой тайной подразделения, я(мы) обязан
                    не разглашать его сущность.
                  </p>
                </div>
                <div className="p-0 m-0">
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
                <div className="p-0 m-0">
                  <label className="form-control-sm">
                    {dataUserListAll && (
                      <div>
                        <div className="p-0 m-0">
                          <label className="form-control-sm">
                            участник №1:
                            <select
                              id="subdivision"
                              name="subdivision"
                              required
                              className="form-control form-control-sm"
                              value={user1}
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
                              placeholder="пример: 70%"
                              minLength="0"
                              maxLength="10"
                              className="form-control form-control-sm"
                              value={user1Perc}
                              required
                              onChange={(e) => user1PercSet(e.target.value)}
                            />
                          </label>
                        </div>
                        <div className="p-0 m-0">
                          <label className="form-control-sm">
                            участник №2:
                            <select
                              id="subdivision"
                              name="subdivision"
                              className="form-control form-control-sm"
                              value={user2}
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
                              placeholder="пример: 70%"
                              minLength="0"
                              maxLength="200"
                              className="form-control form-control-sm"
                              value={user2Perc}
                              onChange={(e) => user2PercSet(e.target.value)}
                            />
                          </label>
                        </div>
                        <div className="p-0 m-0">
                          <label className="form-control-sm">
                            участник №3:
                            <select
                              id="subdivision"
                              name="subdivision"
                              className="form-control form-control-sm"
                              value={user3}
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
                              placeholder="пример: 70%"
                              minLength="0"
                              maxLength="200"
                              className="form-control form-control-sm"
                              value={user3Perc}
                              onChange={(e) => user3PercSet(e.target.value)}
                            />
                          </label>
                        </div>
                        <div className="p-0 m-0">
                          <label className="form-control-sm">
                            участник №4:
                            <select
                              id="subdivision"
                              name="subdivision"
                              className="form-control form-control-sm"
                              value={user4}
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
                              placeholder="пример: 70%"
                              minLength="0"
                              maxLength="200"
                              className="form-control form-control-sm"
                              value={user4Perc}
                              onChange={(e) => user4PercSet(e.target.value)}
                            />
                          </label>
                        </div>
                        <div className="p-0 m-0">
                          <label className="form-control-sm">
                            участник №5:
                            <select
                              id="subdivision"
                              name="subdivision"
                              className="form-control form-control-sm"
                              value={user5}
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
                              placeholder="пример: 70%"
                              minLength="0"
                              maxLength="200"
                              className="form-control form-control-sm"
                              value={user5Perc}
                              onChange={(e) => user5PercSet(e.target.value)}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
                <div className="p-0 m-0">
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
                        className="btn btn-sm btn-outline-primary"
                        type="submit"
                      >
                        Отправить
                      </button>
                    </li>
                    <li className="m-1">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        type="reset"
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

export default BankIdeaListPage;
