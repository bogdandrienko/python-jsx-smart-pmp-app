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

export const IdeaCreatePage = () => {
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

  const ideaCreateAuthStore = useSelector((state) => state.ideaCreateAuthStore); // store.js
  const {
    load: loadIdeaCreate,
    data: dataIdeaCreate,
    // error: errorIdeaCreate,
    // fail: failIdeaCreate,
  } = ideaCreateAuthStore;

  const resetState = () => {
    dispatch({
      type: constants.IDEA_CREATE_RESET_CONSTANT,
    });
    dispatch({
      type: constants.IDEA_LIST_RESET_CONSTANT,
    });
    dispatch({
      type: constants.IDEA_DETAIL_RESET_CONSTANT,
    });
  };

  useEffect(() => {
    if (dataIdeaCreate && !loadIdeaCreate) {
      utils.Sleep(3000).then(() => {
        resetState();
        formHandlerReset();
      });
    }
  }, [dataIdeaCreate, loadIdeaCreate]);

  const formHandlerSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "IDEA_CREATE",
      subdivision: subdivision,
      sphere: sphere,
      category: category,
      avatar: avatar,
      name: name,
      place: place,
      description: description,
    };
    dispatch(actions.ideaCreateAction(form));
  };

  const formHandlerReset = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    subdivisionSet("");
    sphereSet("");
    categorySet("");
    avatarSet(null);
    nameSet("");
    placeSet("");
    descriptionSet("");
  };

  return (
    <div>
      <HeaderComponent
        logic={true}
        redirect={true}
        title={"Отправка новой идеи"}
        description={"форма для заполнения и подачи идеи в банк идей"}
      />
      <main className="container">
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center">
          <form className="" onSubmit={formHandlerSubmit}>
            <div className="card shadow text-center">
              <div className="card-header bg-success bg-opacity-10">
                <h6 className="lead fw-bold">Идея</h6>
                <h6 className="lead">в общий банк идей предприятия</h6>
              </div>
              <div className="card-body">
                <div>
                  <label className="form-control-sm">
                    Подразделение:
                    <select
                      className="form-control form-control-sm"
                      value={subdivision}
                      required
                      onChange={(e) => subdivisionSet(e.target.value)}
                    >
                      <option value="">не указано</option>
                      <option value="автотранспортное предприятие">
                        автотранспортное предприятие
                      </option>
                      <option value="горно-транспортный комплекс">
                        горно-транспортный комплекс
                      </option>
                      <option value="обогатительный комплекс">
                        обогатительный комплекс
                      </option>
                      <option value="управление">управление предприятия</option>
                      <option value="энергоуправление">энергоуправление</option>
                    </select>
                    <small className="text-danger">* обязательно</small>
                  </label>
                  <label className="form-control-sm">
                    Сфера:
                    <select
                      className="form-control form-control-sm"
                      value={sphere}
                      required
                      onChange={(e) => sphereSet(e.target.value)}
                    >
                      <option value="">не указано</option>
                      <option value="технологическая">технологическая</option>
                      <option value="не технологическая">
                        не технологическая
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
                      <option value="">не указано</option>
                      <option value="индустрия 4.0">индустрия 4.0</option>
                      <option value="инвестиции">инвестиции</option>
                      <option value="инновации">инновации</option>
                      <option value="модернизация">модернизация</option>
                      <option value="экология">экология</option>
                      <option value="спорт/культура">спорт/культура</option>
                      <option value="другое">другое</option>
                    </select>
                    <small className="text-danger">* обязательно</small>
                  </label>
                </div>
                <div>
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
                <div>
                  <label className="form-control-sm w-75">
                    Название:
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={name}
                      placeholder="введите название тут..."
                      required
                      minLength="1"
                      maxLength="200"
                      onChange={(e) => nameSet(e.target.value)}
                    />
                    <small className="text-danger">
                      * обязательно
                      <small className="text-muted">
                        {" "}
                        * длина: не более 200 символов
                      </small>
                    </small>
                  </label>
                </div>
                <div>
                  <label className="w-50 form-control-sm">
                    Место изменения:
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={place}
                      placeholder="введите место изменения тут..."
                      required
                      minLength="1"
                      maxLength="100"
                      onChange={(e) => placeSet(e.target.value)}
                    />
                    <small className="text-danger">
                      * обязательно
                      <small className="text-muted">
                        {" "}
                        * длина: не более 100 символов
                      </small>
                    </small>
                  </label>
                </div>
                <div>
                  <label className="w-100 form-control-sm">
                    Описание:
                    <textarea
                      className="form-control form-control-sm"
                      value={description}
                      required
                      placeholder="введите описание тут..."
                      minLength="1"
                      maxLength="3000"
                      rows="3"
                      onChange={(e) => descriptionSet(e.target.value)}
                    />
                    <small className="text-danger">
                      * обязательно
                      <small className="text-muted">
                        {" "}
                        * длина: не более 3000 символов
                      </small>
                    </small>
                  </label>
                </div>
              </div>
              <div className="card-footer">
                <StoreStatusComponent
                  storeStatus={ideaCreateAuthStore}
                  keyStatus={"ideaCreateAuthStore"}
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
                <hr />
                <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                  <button
                    className="btn btn-sm btn-primary m-1 p-1"
                    type="submit"
                  >
                    отправить данные
                  </button>
                  <button
                    className="btn btn-sm btn-warning m-1 p-1"
                    type="reset"
                    onClick={(e) => formHandlerReset(e)}
                  >
                    сбросить данные
                  </button>
                </ul>
              </div>
            </div>
          </form>
        </ul>
      </main>
      <FooterComponent />
    </div>
  );
};
