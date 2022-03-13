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
    dispatch(actions.ideaCreateAuthAction(form));
  };

  const formHandlerReset = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    subdivisionSet("");
    sphereSet("");
    categorySet("");
    avatarSet("");
    nameSet("");
    placeSet("");
    descriptionSet("");
  };

  return (
    <div className="m-0 p-0">
      <HeaderComponent
        logic={true}
        redirect={true}
        title={"Отправка новой идеи"}
        description={
          "страница содержит форму с полями для заполнения и подачи идеи в банк идей"
        }
      />
      <main className="container p-0">
        <div>
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
        </div>
        <div className="container-fluid card shadow bg-light m-0 p-0">
          {!dataIdeaCreate && (
            <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
              <form className="m-0 p-0" onSubmit={formHandlerSubmit}>
                <div className="card-header">
                  <h6 className="lead fw-bold">Идея</h6>
                  <h6 className="lead">в общий банк идей предприятия</h6>
                </div>
                <div className="card-body">
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
                  <label className="w-75 form-control-sm">
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
                <div className="">
                  <label className="w-50 form-control-sm">
                    Место внедрения:
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={place}
                      placeholder="введите место внедрения тут..."
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
                <div className="">
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
                <div className="container">
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
              </form>
            </ul>
          )}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default BankIdeaListPage;
