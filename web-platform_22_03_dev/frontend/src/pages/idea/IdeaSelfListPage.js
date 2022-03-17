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
    if (!dataIdeaList && dataDetailsStore) {
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
    if (dataIdeaList) {
      let needReload = false;
      dataIdeaList.forEach(function (object, index, array) {
        if (object["status_moderate_char_field"] !== "на доработку") {
          needReload = true;
        }
      });
      if (needReload) {
        dispatch({ type: constants.IDEA_LIST_RESET_CONSTANT });
      }
    }
  }, [dispatch, dataIdeaList, loadIdeaList]);

  useEffect(() => {
    if (dataIdeaList && dataIdeaList[""]) {
    }
  }, [dispatch, dataIdeaList]);

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
          "список идей в банке идей с возможностью поиска и фильтрации"
        }
      />
      <main className="container">
        <div className="text-center display-6">
          <button
            type="button"
            className="btn btn-sm btn-success"
            onClick={(e) => formHandlerReset(e)}
          >
            <h4 className="lead fw-bold">Обновить</h4>
          </button>
        </div>
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
          ) : !detailView ? (
            <div className="bg-opacity-10 bg-primary shadow my-1">
              {dataIdeaList.map((object, index) => (
                <Link
                  key={index}
                  to={`/idea_change/${object.id}`}
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
            </div>
          ) : (
            <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 justify-content-center shadow m-0 p-0 ">
              {dataIdeaList.map((object, index) => (
                <Link
                  key={index}
                  to={`/idea_change/${object.id}`}
                  className="text-decoration-none text-dark m-0 p-1 col-sm-12 col-md-6 col-lg-4"
                >
                  <div className="card shadow text-center p-0">
                    <div className="card-header bg-warning bg-opacity-10">
                      <h6 className="lead fw-bold">
                        {object["name_char_field"]}
                      </h6>
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
                    </div>
                    <div className="card-body">
                      <div>
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
                      <div>
                        <img
                          src={
                            object["avatar_image_field"]
                              ? utils.GetStaticFile(
                                  object["avatar_image_field"]
                                )
                              : utils.GetStaticFile(
                                  "/media/default/idea/default_idea.jpg"
                                )
                          }
                          className="card-img-top img-fluid w-50"
                          alt="изображение отсутствует"
                        />
                      </div>
                      <div>
                        <label className="form-control-sm w-50">
                          Место изменения:
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            defaultValue={utils.GetSliceString(
                              object["place_char_field"],
                              50
                            )}
                            readOnly={true}
                            placeholder="введите место изменения тут..."
                            required
                            minLength="1"
                            maxLength="100"
                          />
                        </label>
                      </div>
                      <div>
                        <label className="form-control-sm w-100">
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
                      <div>
                        <Link
                          to={`#`}
                          className="text-decoration-none btn btn-sm btn-warning"
                        >
                          Автор: {object["user_model"]["last_name_char_field"]}{" "}
                          {object["user_model"]["first_name_char_field"]}{" "}
                          {object["user_model"]["position_char_field"]}
                        </Link>
                      </div>
                      <div>
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
                    </div>
                    <div className="card-footer">
                      <div className="d-flex justify-content-between p-1">
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
                          {" \\  "}
                          <small className="text-uppercase">
                            {object["total_rating"]["count"]}
                          </small>
                        </span>
                      </div>
                      <div className="d-flex justify-content-between p-1">
                        <span className="text-secondary">Комментарии</span>
                        <span className="badge bg-secondary rounded-pill">
                          {object["comment_count"]}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Link
                        className="btn btn-sm btn-primary w-100"
                        to={`/idea_change/${object.id}`}
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};
