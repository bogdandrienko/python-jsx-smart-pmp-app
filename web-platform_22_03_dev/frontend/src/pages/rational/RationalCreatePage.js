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

  const [subdivision, setSubdivision] = useState("");
  const [sphere, setSphere] = useState("");
  const [category, setCategory] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [additionalWord, setAdditionalWord] = useState(null);
  const [additionalPdf, setAdditionalPdf] = useState(null);
  const [additionalExcel, setAdditionalExcel] = useState(null);
  const [user1, setUser1] = useState("");
  const [user1Perc, setUser1Perc] = useState("");
  const [user2, setUser2] = useState("");
  const [user2Perc, setUser2Perc] = useState("");
  const [user3, setUser3] = useState("");
  const [user3Perc, setUser3Perc] = useState("");
  const [user4, setUser4] = useState("");
  const [user4Perc, setUser4Perc] = useState("");
  const [user5, setUser5] = useState("");
  const [user5Perc, setUser5Perc] = useState("");

  const userListAllStore = useSelector((state) => state.userListAllStore); // store.js
  const {
    // load: loadUserListAll,
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
    if (!dataUserListAll) {
      const form = {
        "Action-type": "USER_LIST_ALL",
      };
      dispatch(actions.userListAllAuthAction(form));
    }
  }, [dispatch, dataUserListAll]);

  useEffect(() => {
    if (dataRationalCreate) {
      utils.Sleep(3000).then(() => {
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
      shortDescription: shortDescription,
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
                      onChange={(e) => setSubdivision(e.target.value)}
                    >
                      <option value="">Не указано</option>
                      <option value="Управление">Управление</option>
                      <option value="Обогатительный комплекс">
                        Обогатительный комплекс
                      </option>
                      <option value="Горно-транспортный комплекс">
                        Горно-транспортный комплекс
                      </option>
                      <option value="Автотранспортное предприятие">
                        Автотранспортное предприятие
                      </option>
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
                      onChange={(e) => setSphere(e.target.value)}
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
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Не указано</option>
                      <option value="Инновации">Инновации</option>
                      <option value="Модернизация">Модернизация</option>
                      <option value="Улучшение">Улучшение</option>
                      <option value="Индустрия 4.0">Индустрия 4.0</option>
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
                      onChange={(e) => setAvatar(e.target.files[0])}
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
                      maxLength="100"
                      className="form-control form-control-sm"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                    <p className="p-0 m-0">
                      <small className="text-muted">
                        длина: не более 100 символов
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
                      maxLength="100"
                      className="form-control form-control-sm"
                      onChange={(e) => setPlace(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                    <p className="p-0 m-0">
                      <small className="text-muted">
                        длина: не более 100 символов
                      </small>
                    </p>
                  </label>
                </div>
                <div className="p-0 m-0">
                  <label className="w-75 form-control-sm">
                    Краткое описание:
                    <textarea
                      id="short_description_char_field"
                      name="short_description_char_field"
                      required
                      placeholder="Краткое описание"
                      value={shortDescription}
                      minLength="1"
                      maxLength="200"
                      rows="2"
                      className="form-control form-control-sm"
                      onChange={(e) => setShortDescription(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                    <p className="p-0 m-0">
                      <small className="text-muted">
                        длина: не более 200 символов
                      </small>
                    </p>
                  </label>
                  <label className="w-75 form-control-sm">
                    Полное описание:
                    <textarea
                      id="full_description_text_field"
                      name="full_description_text_field"
                      required
                      placeholder="Полное описание"
                      value={description}
                      minLength="1"
                      maxLength="5000"
                      rows="3"
                      className="form-control form-control-sm"
                      onChange={(e) => setDescription(e.target.value)}
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
                      onChange={(e) => setAdditionalWord(e.target.files[0])}
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
                      onChange={(e) => setAdditionalPdf(e.target.files[0])}
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
                      onChange={(e) => setAdditionalExcel(e.target.files[0])}
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
                        Фамилия Имя Отчество Табельный Должность Вклад в проект
                        %
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
                              onChange={(e) => setUser1(e.target.value)}
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
                              onChange={(e) => setUser1Perc(e.target.value)}
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
                              onChange={(e) => setUser2(e.target.value)}
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
                              onChange={(e) => setUser2Perc(e.target.value)}
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
                              onChange={(e) => setUser3(e.target.value)}
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
                              onChange={(e) => setUser3Perc(e.target.value)}
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
                              onChange={(e) => setUser4(e.target.value)}
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
                              onChange={(e) => setUser4Perc(e.target.value)}
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
                              onChange={(e) => setUser5(e.target.value)}
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
                              onChange={(e) => setUser5Perc(e.target.value)}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
                <div className="p-0 m-0">
                  <small className="text-muted">
                    * общая сумма вклада всех участников не должна не превышать
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
