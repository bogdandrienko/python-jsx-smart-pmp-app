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

export const IdeaChangePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const [subdivision, subdivisionSet] = useState("");
  const [sphere, sphereSet] = useState("");
  const [category, categorySet] = useState("");
  const [avatar, avatarSet] = useState(null);
  const [clearImage, clearImageSet] = useState(false);
  const [name, nameSet] = useState("");
  const [place, placeSet] = useState("");
  const [description, descriptionSet] = useState("");
  const [moderate, moderateSet] = useState("на модерации");
  const [moderateComment, moderateCommentSet] = useState(
    "автор внёс изменения"
  );

  const ideaDetailAuthStore = useSelector((state) => state.ideaDetailAuthStore); // store.js
  const {
    load: loadIdeaDetail,
    data: dataIdeaDetail,
    // error: errorIdeaDetail,
    // fail: failIdeaDetail,
  } = ideaDetailAuthStore;
  const ideaChangeAuthStore = useSelector((state) => state.ideaChangeAuthStore); // store.js
  const {
    // load: loadIdeaChange,
    data: dataIdeaChange,
    // error: errorIdeaChange,
    // fail: failIdeaChange,
  } = ideaChangeAuthStore;

  const resetState = () => {
    clearImageSet(false);
    dispatch({ type: constants.IDEA_LIST_RESET_CONSTANT });
    dispatch({ type: constants.IDEA_DETAIL_RESET_CONSTANT });
    dispatch({
      type: constants.IDEA_MODERATE_RESET_CONSTANT,
    });
    dispatch({
      type: constants.IDEA_CHANGE_RESET_CONSTANT,
    });
  };

  useEffect(() => {
    if (
      dataIdeaDetail &&
      !loadIdeaDetail &&
      (dataIdeaDetail.id !== undefined || dataIdeaDetail.id !== id)
    ) {
      resetState();
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!dataIdeaDetail && !loadIdeaDetail) {
      const form = {
        "Action-type": "IDEA_DETAIL",
        id: id,
      };
      dispatch(actions.ideaDetailAction(form));
    }
  }, [dispatch, id, dataIdeaDetail]);

  useEffect(() => {
    if (dataIdeaDetail) {
      subdivisionSet(dataIdeaDetail["subdivision_char_field"]);
      sphereSet(dataIdeaDetail["sphere_char_field"]);
      categorySet(dataIdeaDetail["category_char_field"]);
      avatarSet(null);
      nameSet(dataIdeaDetail["name_char_field"]);
      placeSet(dataIdeaDetail["place_char_field"]);
      descriptionSet(dataIdeaDetail["description_text_field"]);
    }
  }, [dispatch, id, dataIdeaDetail]);

  const handlerChangeSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "IDEA_CHANGE",
      id: id,
      subdivision: subdivision,
      sphere: sphere,
      category: category,
      avatar: avatar,
      clearImage: clearImage,
      name: name,
      place: place,
      description: description,
      moderate: moderate,
      moderateComment: moderateComment,
    };
    dispatch(actions.ideaChangeAction(form));
  };

  useEffect(() => {
    if (dataIdeaChange) {
      utils.Sleep(3000).then(() => {
        resetState();
        navigate("/idea_self_list");
      });
    }
  }, [dataIdeaChange]);

  const handlerReset = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    resetState();
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="m-0 p-0">
      <HeaderComponent
        logic={true}
        redirect={true}
        title={"Модерация идеи"}
        description={"страница содержит функционал модерации идеи в банке идей"}
      />
      <main className="container p-0">
        <div className="btn-group m-0 p-1 text-start w-100">
          <Link
            to={"/idea_self_list"}
            className="btn btn-sm btn-primary m-1 p-2"
          >
            {"<="} назад к списку
          </Link>
        </div>
        <StoreStatusComponent
          storeStatus={ideaDetailAuthStore}
          keyStatus={"ideaDetailAuthStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={false}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        <StoreStatusComponent
          storeStatus={ideaChangeAuthStore}
          keyStatus={"ideaChangeAuthStore"}
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
        <div className="container-fluid card shadow bg-light m-0 p-0">
          {!dataIdeaChange && dataIdeaDetail && (
            <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
              <form className="m-0 p-0" onSubmit={handlerChangeSubmit}>
                <div className="card-header">
                  <h6 className="lead fw-bold">
                    {dataIdeaDetail["name_char_field"]}{" "}
                    <h6 className="lead text-danger">
                      статус:{" "}
                      {utils.GetSliceString(
                        dataIdeaDetail["status_moderate_char_field"],
                        20
                      )}{" "}
                      {" : "}
                      {utils.GetSliceString(
                        dataIdeaDetail["comment_moderate_char_field"],
                        30
                      )}{" "}
                    </h6>
                  </h6>
                </div>
                <div className="card-body m-0 p-0">
                  <Link
                    to={`#`}
                    className="text-decoration-none btn btn-sm btn-warning"
                  >
                    Автор:{" "}
                    {dataIdeaDetail["user_model"]["last_name_char_field"]}{" "}
                    {dataIdeaDetail["user_model"]["first_name_char_field"]}{" "}
                    {dataIdeaDetail["user_model"]["position_char_field"]}
                  </Link>
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
                <div className="card-body">
                  {dataIdeaDetail && (
                    <img
                      src={utils.GetStaticFile(
                        dataIdeaDetail["avatar_image_field"]
                      )}
                      className="card-img-top img-fluid w-25"
                      alt="изображение отсутствует"
                    />
                  )}
                  <label className="form-control-sm form-switch m-1">
                    Удалить текущее изображение:
                    <input
                      type="checkbox"
                      className="form-check-input m-1"
                      id="flexSwitchCheckDefault"
                      defaultChecked={clearImage}
                      onClick={(e) => clearImageSet(!clearImage)}
                    />
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
                <div className="card-body m-0 p-0">
                  <label className="text-muted border p-1 m-1">
                    подано:{" "}
                    <p className="m-0 p-0">
                      {utils.GetCleanDateTime(
                        dataIdeaDetail["created_datetime_field"],
                        true
                      )}
                    </p>
                  </label>
                  <label className="text-muted border p-1 m-1">
                    зарегистрировано:{" "}
                    <p className="m-0 p-0">
                      {utils.GetCleanDateTime(
                        dataIdeaDetail["register_datetime_field"],
                        true
                      )}
                    </p>
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
                      onClick={(e) => handlerReset(e)}
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
