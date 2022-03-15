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

export const IdeaListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const [detailView, detailViewSet] = useState(true);
  const [subdivision, subdivisionSet] = useState("");
  const [category, categorySet] = useState("");
  const [author, authorSet] = useState("");
  const [search, searchSet] = useState("");
  const [sort, sortSet] = useState("дате публикации (сначала свежие)");
  const [moderate, moderateSet] = useState("принято");

  const ideaListAuthStore = useSelector((state) => state.ideaListAuthStore); // store.js
  const {
    load: loadIdeaList,
    data: dataIdeaList,
    // error: errorIdeaList,
    // fail: failIdeaList,
  } = ideaListAuthStore;
  const userListAllAuthStore = useSelector(
    (state) => state.userListAllAuthStore
  ); // store.js
  const {
    load: loadUserListAll,
    data: dataUserListAll,
    // error: errorUserListAll,
    // fail: failUserListAll,
  } = userListAllAuthStore;

  const resetState = () => {
    dispatch({ type: constants.IDEA_LIST_RESET_CONSTANT });
    dispatch({ type: constants.IDEA_DETAIL_RESET_CONSTANT });
  };

  useEffect(() => {
    if (!dataIdeaList && !loadIdeaList) {
      const form = {
        "Action-type": "IDEA_LIST",
        subdivision: subdivision,
        category: category,
        author: author,
        search: search,
        sort: sort,
        moderate: moderate,
      };
      dispatch(actions.ideaListAction(form));
    }
  }, [dispatch, dataIdeaList, loadIdeaList]);

  useEffect(() => {
    if (!dataUserListAll && !loadUserListAll) {
      const form = {
        "Action-type": "USER_LIST_ALL",
      };
      dispatch(actions.userListAllAction(form));
    }
  }, [dispatch, dataUserListAll, loadUserListAll]);

  const formHandlerSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    resetState();
  };

  const formHandlerReset = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    subdivisionSet("");
    categorySet("");
    authorSet("");
    searchSet("");
    sortSet("Дате публикации (сначала свежие)");
    dispatch({
      type: constants.IDEA_LIST_RESET_CONSTANT,
    });
  };

  return (
    <div className="m-0 p-0">
      <HeaderComponent
        logic={true}
        redirect={true}
        title={"Список идей"}
        description={
          "страница содержит список идей в банке идей с возможностью поиска и фильтрации"
        }
      />
      <main className="container p-0">
        <div className="container-fluid bg-light m-0 p-0">
          <div className="accordion accordion-flush shadow card m-0 p-0 my-2">
            <div className="accordion-item m-0 p-0">
              <h2 className="accordion-header m-0 p-0" id="headingOne">
                <button
                  className="accordion-button bg-success bg-opacity-10"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                  onClick={(e) =>
                    utils.ChangeAccordionCollapse(["collapseOne"])
                  }
                >
                  <h4 className="lead fw-bold text-success">
                    Фильтрация, поиск и сортировка{" "}
                    <small className="text-muted">
                      (нажмите сюда, для переключения)
                    </small>
                  </h4>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <form className="m-0 p-0" onSubmit={formHandlerSubmit}>
                  <div className="">
                    <label className="lead">
                      Выберите нужные настройки фильтрации и сортировки, затем
                      нажмите кнопку{" "}
                      <p className="fw-bold text-primary m-0 p-0">
                        "фильтровать"
                      </p>
                    </label>
                    <label className="form-control-sm form-switch">
                      Детальное отображение:
                      <input
                        type="checkbox"
                        className="form-check-input m-1"
                        id="flexSwitchCheckDefault"
                        defaultChecked={detailView}
                        onClick={(e) => detailViewSet(!detailView)}
                      />
                    </label>
                  </div>
                  <div className="">
                    <label className="form-control-sm">
                      Подразделение:
                      <select
                        className="form-control form-control-sm"
                        value={subdivision}
                        onChange={(e) => subdivisionSet(e.target.value)}
                      >
                        <option value="">все варианты</option>
                        <option value="автотранспортное предприятие">
                          автотранспортное предприятие
                        </option>
                        <option value="горно-транспортный комплекс">
                          горно-транспортный комплекс
                        </option>
                        <option value="обогатительный комплекс">
                          обогатительный комплекс
                        </option>
                        <option value="управление">
                          управление предприятия
                        </option>
                        <option value="энергоуправление">
                          энергоуправление
                        </option>
                      </select>
                    </label>
                    <label className="form-control-sm">
                      Категория:
                      <select
                        className="form-control form-control-sm"
                        value={category}
                        onChange={(e) => categorySet(e.target.value)}
                      >
                        <option value="">все варианты</option>
                        <option value="индустрия 4.0">индустрия 4.0</option>
                        <option value="инвестиции">инвестиции</option>
                        <option value="инновации">инновации</option>
                        <option value="модернизация">модернизация</option>
                        <option value="экология">экология</option>
                        <option value="спорт/культура">спорт/культура</option>
                        <option value="другое">другое</option>
                      </select>
                    </label>
                    {dataUserListAll && (
                      <label className="form-control-sm">
                        Автор:
                        <select
                          className="form-control form-control-sm"
                          value={author}
                          onChange={(e) => authorSet(e.target.value)}
                        >
                          <option value="">все варианты</option>
                          {dataUserListAll.map((user, index) => (
                            <option key={index} value={user}>
                              {user}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                    <StoreStatusComponent
                      storeStatus={userListAllAuthStore}
                      keyStatus={"userListAllAuthStore"}
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
                  </div>
                  <div className="">
                    <label className="w-75 form-control-sm">
                      Поле поиска по части названия:
                      <input
                        type="text"
                        className="form-control"
                        placeholder="введите часть названия тут..."
                        value={search}
                        onChange={(e) => searchSet(e.target.value)}
                      />
                    </label>
                    <label className="form-control-sm">
                      Сортировка по:
                      <select
                        className="form-control form-control-sm"
                        value={sort}
                        onChange={(e) => sortSet(e.target.value)}
                      >
                        <option value="дате публикации (сначала свежие)">
                          дате публикации (сначала свежие)
                        </option>
                        <option value="дате публикации (сначала старые)">
                          дате публикации (сначала старые)
                        </option>
                        <option value="названию (С начала алфавита)">
                          названию (С начала алфавита)
                        </option>
                        <option value="названию (С конца алфавита)">
                          названию (С конца алфавита)
                        </option>
                        <option value="рейтингу (Популярные в начале)">
                          рейтингу (Популярные в начале)
                        </option>
                        <option value="рейтингу (Популярные в конце)">
                          рейтингу (Популярные в конце)
                        </option>
                      </select>
                    </label>
                  </div>
                  <div className="container">
                    <hr />
                    <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                      <button
                        className="btn btn-sm btn-primary m-1 p-1"
                        type="submit"
                      >
                        фильтровать
                      </button>
                      <button
                        className="btn btn-sm btn-warning m-1 p-1"
                        type="reset"
                        onClick={(e) => formHandlerReset(e)}
                      >
                        сбросить фильтры
                      </button>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <StoreStatusComponent
            storeStatus={ideaListAuthStore}
            keyStatus={"ideaListAuthStore"}
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
          {!dataIdeaList || dataIdeaList.length < 1 ? (
            <div className="my-1">
              <MessageComponent variant={"danger"}>
                Ничего не найдено! Попробуйте изменить условия фильтрации и/или
                очистить строку поиска.
              </MessageComponent>
            </div>
          ) : !detailView ? (
            <ul className="shadow bg-opacity-10 bg-primary shadow">
              {dataIdeaList.map((object, index) => (
                <Link
                  key={index}
                  to={`/idea_detail/${object.id}`}
                  className="text-decoration-none"
                >
                  <li className="border list-group-item-action text-start small">
                    {utils.GetSliceString(object["name_char_field"], 20)}
                    {" | "}
                    {utils.GetCleanDateTime(
                      object["created_datetime_field"],
                      true
                    )}
                    {" | "}
                    {utils.GetSliceString(
                      object["user_model"]["last_name_char_field"],
                      20
                    )}{" "}
                    {utils.GetSliceString(
                      object["user_model"]["first_name_char_field"],
                      20
                    )}
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="row shadow m-0 p-1">
              {dataIdeaList.map((object, index) => (
                <Link
                  key={index}
                  to={`/idea_detail/${object.id}`}
                  className="text-decoration-none text-center m-0 p-1 col-sm-12 col-md-6 col-lg-4"
                >
                  <div className="card list-group-item-action shadow">
                    <div className="card-header bg-opacity-10 bg-primary m-0 p-0">
                      <h6 className="lead fw-bold">
                        {object["name_char_field"]}
                      </h6>
                    </div>
                    <div className="card-body m-0 p-0">
                      <label className="form-control-sm">
                        Подразделение:
                        <select
                          className="form-control form-control-sm"
                          required
                        >
                          <option value="">
                            {object["subdivision_char_field"]}
                          </option>
                        </select>
                      </label>
                      <label className="form-control-sm">
                        Сфера:
                        <select
                          className="form-control form-control-sm"
                          required
                        >
                          <option value="">
                            {object["sphere_char_field"]}
                          </option>
                        </select>
                      </label>
                      <label className="form-control-sm">
                        Категория:
                        <select
                          className="form-control form-control-sm"
                          required
                        >
                          <option value="">
                            {object["category_char_field"]}
                          </option>
                        </select>
                      </label>
                    </div>
                    <div className="card-body m-0 p-0">
                      <img
                        src={utils.GetStaticFile(object["avatar_image_field"])}
                        className="card-img-top img-fluid w-50"
                        alt="изображение отсутствует"
                      />
                    </div>
                    <div className="card-body m-0 p-0">
                      <label className="w-50 form-control-sm">
                        Место внедрения:
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          defaultValue={utils.GetSliceString(
                            object["place_char_field"],
                            50
                          )}
                          readOnly={true}
                          placeholder="введите место внедрения тут..."
                          required
                          minLength="1"
                          maxLength="100"
                        />
                      </label>
                    </div>
                    <div className="card-body m-0 p-0">
                      <label className="w-100 form-control-sm">
                        Описание:
                        <textarea
                          className="form-control form-control-sm"
                          defaultValue={utils.GetSliceString(
                            object["description_text_field"],
                            50
                          )}
                          readOnly={true}
                          required
                          placeholder="введите описание тут..."
                          minLength="1"
                          maxLength="3000"
                          rows="3"
                        />
                      </label>
                    </div>
                    <div className="card-body m-0 p-0">
                      <Link
                        to={`#`}
                        className="text-decoration-none btn btn-sm btn-warning"
                      >
                        Автор: {object["user_model"]["last_name_char_field"]}{" "}
                        {object["user_model"]["first_name_char_field"]}{" "}
                        {object["user_model"]["position_char_field"]}
                      </Link>
                    </div>
                    <div className="card-body m-0 p-0">
                      <label className="text-muted border p-1 m-1">
                        подано:{" "}
                        <p className="m-0 p-0">
                          {utils.GetCleanDateTime(
                            object["created_datetime_field"],
                            true
                          )}
                        </p>
                      </label>
                      <label className="text-muted border p-1 m-1">
                        зарегистрировано:{" "}
                        <p className="m-0 p-0">
                          {utils.GetCleanDateTime(
                            object["register_datetime_field"],
                            true
                          )}
                        </p>
                      </label>
                    </div>
                    <div className="card p-2">
                      <div className="order-md-last">
                        <h6 className="d-flex justify-content-between align-items-center m-0 p-0">
                          <span
                            className={
                              object["total_rating"]["rate"] > 7
                                ? "text-success"
                                : object["total_rating"]["rate"] > 4
                                ? "text-warning"
                                : "text-danger"
                            }
                          >
                            Рейтинг
                          </span>
                          <span
                            className={
                              object["total_rating"]["rate"] > 7
                                ? "badge bg-success rounded-pill"
                                : object["total_rating"]["rate"] > 4
                                ? "badge bg-warning rounded-pill"
                                : "badge bg-danger rounded-pill"
                            }
                          >
                            {utils.GetSliceString(
                              object["total_rating"]["rate"],
                              3,
                              false
                            )}
                            {"\\  "}
                            <small className="text-uppercase">
                              {object["total_rating"]["count"]}
                            </small>
                          </span>
                        </h6>
                        <div>
                          <span>
                            <i
                              style={{
                                color:
                                  object["total_rating"]["rate"] > 7
                                    ? "#00ff00"
                                    : object["total_rating"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                object["total_rating"]["rate"] >= 1
                                  ? "fas fa-star"
                                  : object["total_rating"]["rate"] >= 0.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            />
                          </span>
                          <span>
                            <i
                              style={{
                                color:
                                  object["total_rating"]["rate"] > 7
                                    ? "#00ff00"
                                    : object["total_rating"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                object["total_rating"]["rate"] >= 2
                                  ? "fas fa-star"
                                  : object["total_rating"]["rate"] >= 1.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            />
                          </span>
                          <span>
                            <i
                              style={{
                                color:
                                  object["total_rating"]["rate"] > 7
                                    ? "#00ff00"
                                    : object["total_rating"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                object["total_rating"]["rate"] >= 3
                                  ? "fas fa-star"
                                  : object["total_rating"]["rate"] >= 2.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            />
                          </span>
                          <span>
                            <i
                              style={{
                                color:
                                  object["total_rating"]["rate"] > 7
                                    ? "#00ff00"
                                    : object["total_rating"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                object["total_rating"]["rate"] >= 4
                                  ? "fas fa-star"
                                  : object["total_rating"]["rate"] >= 3.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            />
                          </span>
                          <span>
                            <i
                              style={{
                                color:
                                  object["total_rating"]["rate"] > 7
                                    ? "#00ff00"
                                    : object["total_rating"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                object["total_rating"]["rate"] >= 5
                                  ? "fas fa-star"
                                  : object["total_rating"]["rate"] >= 4.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            />
                          </span>
                          <span>
                            <i
                              style={{
                                color:
                                  object["total_rating"]["rate"] > 7
                                    ? "#00ff00"
                                    : object["total_rating"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                object["total_rating"]["rate"] >= 6
                                  ? "fas fa-star"
                                  : object["total_rating"]["rate"] >= 5.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            />
                          </span>
                          <span>
                            <i
                              style={{
                                color:
                                  object["total_rating"]["rate"] > 7
                                    ? "#00ff00"
                                    : object["total_rating"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                object["total_rating"]["rate"] >= 7
                                  ? "fas fa-star"
                                  : object["total_rating"]["rate"] >= 6.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            />
                          </span>
                          <span>
                            <i
                              style={{
                                color:
                                  object["total_rating"]["rate"] > 7
                                    ? "#00ff00"
                                    : object["total_rating"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                object["total_rating"]["rate"] >= 8
                                  ? "fas fa-star"
                                  : object["total_rating"]["rate"] >= 7.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            />
                          </span>
                          <span>
                            <i
                              style={{
                                color:
                                  object["total_rating"]["rate"] > 7
                                    ? "#00ff00"
                                    : object["total_rating"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                object["total_rating"]["rate"] >= 9
                                  ? "fas fa-star"
                                  : object["total_rating"]["rate"] >= 8.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            />
                          </span>
                          <span>
                            <i
                              style={{
                                color:
                                  object["total_rating"]["rate"] > 7
                                    ? "#00ff00"
                                    : object["total_rating"]["rate"] > 4
                                    ? "#ffaa00"
                                    : "#ff0000",
                              }}
                              className={
                                object["total_rating"]["rate"] >= 10
                                  ? "fas fa-star"
                                  : object["total_rating"]["rate"] >= 9.5
                                  ? "fas fa-star-half-alt"
                                  : "far fa-star"
                              }
                            />
                          </span>
                        </div>
                      </div>
                      <div className="order-md-last">
                        <h6 className="d-flex justify-content-between align-items-center m-0 p-0">
                          <span className="text-secondary">Комментарии</span>
                          <span className="badge bg-secondary rounded-pill">
                            {object["comment_count"]}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div className="card-header m-0 p-0">
                      <Link
                        className="btn btn-sm btn-primary w-100"
                        to={`/idea_detail/${object.id}`}
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};
