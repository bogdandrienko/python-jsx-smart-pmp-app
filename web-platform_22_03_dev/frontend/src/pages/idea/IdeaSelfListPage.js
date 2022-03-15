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

export const IdeaSelfListPage = () => {
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
  const [moderate, moderateSet] = useState("на доработку");

  const ideaListAuthStore = useSelector((state) => state.ideaListAuthStore); // store.js
  const {
    load: loadIdeaList,
    data: dataIdeaList,
    // error: errorIdeaList,
    // fail: failIdeaList,
  } = ideaListAuthStore;
  const userDetailsAuthStore = useSelector(
    (state) => state.userDetailsAuthStore
  ); // store.js
  const {
    load: loadDetailsStore,
    data: dataDetailsStore,
    // error: errorDetailsStore,
    // fail: failDetailsStore,
  } = userDetailsAuthStore;

  const resetState = () => {
    dispatch({ type: constants.IDEA_LIST_RESET_CONSTANT });
    dispatch({ type: constants.IDEA_DETAIL_RESET_CONSTANT });
  };

  useEffect(() => {
    if (!dataIdeaList && !loadIdeaList && dataDetailsStore) {
      const form = {
        "Action-type": "IDEA_LIST",
        subdivision: subdivision,
        category: category,
        author: `${dataDetailsStore["user_model"]["last_name_char_field"]} ${dataDetailsStore["user_model"]["first_name_char_field"]} ${dataDetailsStore["user_model"]["personnel_number_slug_field"]} `,
        search: search,
        sort: sort,
        moderate: moderate,
      };
      dispatch(actions.ideaListAction(form));
    }
  }, [dispatch, dataIdeaList, loadIdeaList]);

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
    sortSet("дате публикации (сначала свежие)");
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
                Ничего не найдено!
              </MessageComponent>
            </div>
          ) : (
            <div className="row shadow m-0 p-1">
              {dataIdeaList.map((object, index) => (
                <Link
                  key={index}
                  to={`/idea_change/${object.id}`}
                  className="text-decoration-none text-center m-0 p-1 col-sm-12 col-md-6 col-lg-4"
                >
                  <div className="card list-group-item-action shadow">
                    <div className="card-header bg-opacity-10 bg-primary m-0 p-0">
                      <h6 className="lead fw-bold">
                        {object["name_char_field"]}
                        <p className="text-danger small m-0 p-0">
                          {" [ "}
                          {utils.GetSliceString(
                            object["status_moderate_char_field"],
                            30
                          )}
                          {" : "}
                          {utils.GetSliceString(
                            object["comment_moderate_char_field"],
                            30
                          )}
                          {" ]"}
                        </p>
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
                        to={`/idea_change/${object.id}`}
                      >
                        Редактировать
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
