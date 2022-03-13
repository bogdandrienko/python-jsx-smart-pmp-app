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

const Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const [comment, commentSet] = useState("");

  const ideaDetailAuthStore = useSelector((state) => state.ideaDetailAuthStore); // store.js
  const {
    load: loadIdeaDetail,
    data: dataIdeaDetail,
    // error: errorIdeaDetail,
    // fail: failIdeaDetail,
  } = ideaDetailAuthStore;
  const ideaCommentListAuthStore = useSelector(
    (state) => state.ideaCommentListAuthStore
  ); // store.js
  const {
    load: loadIdeaCommentList,
    data: dataIdeaCommentList,
    // error: errorIdeaCommentList,
    // fail: failIdeaCommentList,
  } = ideaCommentListAuthStore;
  const ideaCommentCreateAuthStore = useSelector(
    (state) => state.ideaCommentCreateAuthStore
  ); // store.js
  const {
    // load: loadIdeaCommentCreate,
    data: dataIdeaCommentCreate,
    // error: errorIdeaCommentCreate,
    // fail: failIdeaCommentCreate,
  } = ideaCommentCreateAuthStore;
  const ideaRatingCreateAuthStore = useSelector(
    (state) => state.ideaRatingCreateAuthStore
  ); // store.js
  const {
    // load: loadIdeaRatingCreate,
    data: dataIdeaRatingCreate,
    // error: errorIdeaRatingCreate,
    // fail: failIdeaRatingCreate,
  } = ideaRatingCreateAuthStore;
  const notificationCreateAnyStore = useSelector(
    (state) => state.notificationCreateAnyStore
  ); // store.js
  const ideaModerateAuthStore = useSelector(
    (state) => state.ideaModerateAuthStore
  ); // store.js
  const {
    // load: loadIdeaModerate,
    data: dataIdeaModerate,
    // error: errorIdeaModerate,
    // fail: failIdeaModerate,
  } = ideaModerateAuthStore;
  const userDetailsAuthStore = useSelector(
    (state) => state.userDetailsAuthStore
  ); // store.js
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsAuthStore;

  const resetState = () => {
    dispatch({ type: constants.IDEA_LIST_RESET_CONSTANT });
    dispatch({ type: constants.IDEA_DETAIL_RESET_CONSTANT });
    dispatch({
      type: constants.IDEA_COMMENT_LIST_RESET_CONSTANT,
    });
    dispatch({
      type: constants.IDEA_COMMENT_CREATE_RESET_CONSTANT,
    });
    dispatch({
      type: constants.IDEA_RATING_CREATE_RESET_CONSTANT,
    });
    dispatch({
      type: constants.IDEA_MODERATE_RESET_CONSTANT,
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
      dispatch(actions.ideaDetailAuthAction(form));
    }
  }, [dispatch, id, dataIdeaDetail]);

  useEffect(() => {
    if (!dataIdeaCommentList && !loadIdeaCommentList) {
      const form = {
        "Action-type": "IDEA_COMMENT_LIST",
        id: id,
      };
      dispatch(actions.ideaCommentListAuthAction(form));
    }
  }, [dispatch, id, dataIdeaCommentList, loadIdeaCommentList]);

  const formHandlerCommentCreateSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "IDEA_COMMENT_CREATE",
      id: id,
      comment: comment,
    };
    dispatch(actions.ideaCommentCreateAuthAction(form));
  };

  useEffect(() => {
    if (dataIdeaCommentCreate) {
      utils.Sleep(100).then(() => {
        commentSet("");
        resetState();
      });
    }
  }, [dataIdeaCommentCreate]);

  const formHandlerRatingSubmit = async (value) => {
    const form = {
      "Action-type": "IDEA_RATING_CREATE",
      id: id,
      rating: value,
    };
    dispatch(actions.ideaRatingCreateAuthAction(form));
  };

  useEffect(() => {
    if (dataIdeaRatingCreate) {
      utils.Sleep(200).then(() => {
        resetState();
      });
    }
  }, [dataIdeaRatingCreate]);

  const formHandlerNotificationSubmit = async ({
    name,
    place,
    description,
  }) => {
    const form = {
      "Action-type": "NOTIFICATION_CREATE",
      name: name,
      place: place,
      description: description,
    };
    dispatch(actions.notificationAuthAction(form));
  };

  const formHandlerHideSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "IDEA_MODERATE",
      id: id,
      moderate: "Скрыто",
      moderateComment: "Скрыто автором",
    };
    dispatch(actions.ideaModerateAuthAction(form));
  };

  useEffect(() => {
    if (dataIdeaModerate) {
      utils.Sleep(200).then(() => {
        navigate("/idea_list");
        resetState();
      });
    }
  }, [dataIdeaModerate]);

  return (
    <div className="m-0 p-0">
      <HeaderComponent
        logic={true}
        redirect={true}
        title={"Подробности идеи"}
        description={
          "страница содержит подробную информацию об идеи в банке идей"
        }
      />
      <main className="container p-0">
        <div>
          <StoreStatusComponent
            storeStatus={notificationCreateAnyStore}
            keyStatus={"notificationCreateAnyStore"}
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
        <div className="btn-group m-0 p-1 text-start w-100">
          <Link to={"/idea_list"} className="btn btn-sm btn-primary m-1 p-2">
            {"<="} назад к списку
          </Link>
          <StoreStatusComponent
            storeStatus={userDetailsAuthStore}
            keyStatus={"userDetailsAuthStore"}
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
          {dataUserDetails &&
            dataUserDetails["user_model"]["id"] &&
            dataIdeaDetail &&
            dataIdeaDetail["user_model"]["id"] &&
            dataUserDetails["user_model"]["id"] ===
              dataIdeaDetail["user_model"]["id"] && (
              <button
                type="button"
                className="btn btn-sm btn-warning m-1 p-2"
                onClick={formHandlerHideSubmit}
              >
                скрыть (Вы автор)
              </button>
            )}
          <button
            type="button"
            className="btn btn-sm btn-danger m-1 p-2"
            onClick={(e) =>
              formHandlerNotificationSubmit({
                name: "жалоба на идею в банке идей",
                place: `id идеи: ${id}`,
                description: "",
              })
            }
          >
            пожаловаться
          </button>
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
        {dataIdeaDetail && (
          <div className="card shadow">
            <div className="card-header bg-opacity-10 bg-primary m-0 p-0">
              <h6 className="lead fw-bold">
                {dataIdeaDetail["name_char_field"]}
              </h6>
            </div>
            <div className="card-body m-0 p-0">
              <label className="form-control-sm">
                Подразделение:
                <select className="form-control form-control-sm" required>
                  <option value="">
                    {dataIdeaDetail["subdivision_char_field"]}
                  </option>
                </select>
              </label>
              <label className="form-control-sm">
                Сфера:
                <select className="form-control form-control-sm" required>
                  <option value="">
                    {dataIdeaDetail["sphere_char_field"]}
                  </option>
                </select>
              </label>
              <label className="form-control-sm">
                Категория:
                <select className="form-control form-control-sm" required>
                  <option value="">
                    {dataIdeaDetail["category_char_field"]}
                  </option>
                </select>
              </label>
            </div>
            <div className="card-body m-0 p-0">
              <img
                src={utils.GetStaticFile(dataIdeaDetail["avatar_image_field"])}
                className="card-img-top img-fluid w-75"
                alt="id"
              />
            </div>
            <div className="card-body m-0 p-0">
              <label className="w-50 form-control-sm">
                Место внедрения:
                <input
                  type="text"
                  className="form-control form-control-sm"
                  defaultValue={dataIdeaDetail["place_char_field"]}
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
                  defaultValue={dataIdeaDetail["description_text_field"]}
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
                Автор: {dataIdeaDetail["user_model"]["last_name_char_field"]}{" "}
                {dataIdeaDetail["user_model"]["first_name_char_field"]}{" "}
                {dataIdeaDetail["user_model"]["position_char_field"]}
              </Link>
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
            <StoreStatusComponent
              storeStatus={ideaRatingCreateAuthStore}
              keyStatus={"ideaRatingCreateAuthStore"}
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
            <div className="card p-2">
              <div className="order-md-last">
                <div className="order-md-last">
                  <h6 className="d-flex justify-content-between align-items-center m-0 p-0">
                    <span
                      className={
                        dataIdeaDetail["total_rating"]["rate"] > 7
                          ? "text-success"
                          : dataIdeaDetail["total_rating"]["rate"] > 4
                          ? "text-warning"
                          : "text-danger"
                      }
                    >
                      Рейтинг
                    </span>
                    <span
                      className={
                        dataIdeaDetail["total_rating"]["rate"] > 7
                          ? "badge bg-success rounded-pill"
                          : dataIdeaDetail["total_rating"]["rate"] > 4
                          ? "badge bg-warning rounded-pill"
                          : "badge bg-danger rounded-pill"
                      }
                    >
                      {utils.GetSliceString(
                        dataIdeaDetail["total_rating"]["rate"],
                        3,
                        false
                      )}{" "}
                      {"\\  "}
                      <small className="text-uppercase">
                        {dataIdeaDetail["total_rating"]["count"]}
                      </small>
                    </span>
                  </h6>
                </div>
                <div>Нажмите на одну из 10 звезд для оценки идеи:</div>
                <div>
                  <span>
                    <i
                      style={{
                        color:
                          dataIdeaDetail["total_rating"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["total_rating"]["rate"] > 4
                            ? "#ffff00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["total_rating"]["rate"] >= 1
                          ? "fas fa-star btn m-0 p-0"
                          : dataIdeaDetail["total_rating"]["rate"] >= 0.5
                          ? "fas fa-star-half-alt btn m-0 p-0"
                          : "far fa-star btn m-0 p-0"
                      }
                      onClick={(e) => formHandlerRatingSubmit(1)}
                    />
                  </span>
                  <span>
                    <i
                      style={{
                        color:
                          dataIdeaDetail["total_rating"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["total_rating"]["rate"] > 4
                            ? "#ffff00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["total_rating"]["rate"] >= 2
                          ? "fas fa-star btn m-0 p-0"
                          : dataIdeaDetail["total_rating"]["rate"] >= 1.5
                          ? "fas fa-star-half-alt btn m-0 p-0"
                          : "far fa-star btn m-0 p-0"
                      }
                      onClick={(e) => formHandlerRatingSubmit(2)}
                    />
                  </span>
                  <span>
                    <i
                      style={{
                        color:
                          dataIdeaDetail["total_rating"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["total_rating"]["rate"] > 4
                            ? "#ffff00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["total_rating"]["rate"] >= 3
                          ? "fas fa-star btn m-0 p-0"
                          : dataIdeaDetail["total_rating"]["rate"] >= 2.5
                          ? "fas fa-star-half-alt btn m-0 p-0"
                          : "far fa-star btn m-0 p-0"
                      }
                      onClick={(e) => formHandlerRatingSubmit(3)}
                    />
                  </span>
                  <span>
                    <i
                      style={{
                        color:
                          dataIdeaDetail["total_rating"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["total_rating"]["rate"] > 4
                            ? "#ffff00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["total_rating"]["rate"] >= 4
                          ? "fas fa-star btn m-0 p-0"
                          : dataIdeaDetail["total_rating"]["rate"] >= 3.5
                          ? "fas fa-star-half-alt btn m-0 p-0"
                          : "far fa-star btn m-0 p-0"
                      }
                      onClick={(e) => formHandlerRatingSubmit(4)}
                    />
                  </span>
                  <span>
                    <i
                      style={{
                        color:
                          dataIdeaDetail["total_rating"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["total_rating"]["rate"] > 4
                            ? "#ffff00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["total_rating"]["rate"] >= 5
                          ? "fas fa-star btn m-0 p-0"
                          : dataIdeaDetail["total_rating"]["rate"] >= 4.5
                          ? "fas fa-star-half-alt btn m-0 p-0"
                          : "far fa-star btn m-0 p-0"
                      }
                      onClick={(e) => formHandlerRatingSubmit(5)}
                    />
                  </span>
                  <span>
                    <i
                      style={{
                        color:
                          dataIdeaDetail["total_rating"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["total_rating"]["rate"] > 4
                            ? "#ffff00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["total_rating"]["rate"] >= 6
                          ? "fas fa-star btn m-0 p-0"
                          : dataIdeaDetail["total_rating"]["rate"] >= 5.5
                          ? "fas fa-star-half-alt btn m-0 p-0"
                          : "far fa-star btn m-0 p-0"
                      }
                      onClick={(e) => formHandlerRatingSubmit(6)}
                    />
                  </span>
                  <span>
                    <i
                      style={{
                        color:
                          dataIdeaDetail["total_rating"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["total_rating"]["rate"] > 4
                            ? "#ffff00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["total_rating"]["rate"] >= 7
                          ? "fas fa-star btn m-0 p-0"
                          : dataIdeaDetail["total_rating"]["rate"] >= 6.5
                          ? "fas fa-star-half-alt btn m-0 p-0"
                          : "far fa-star btn m-0 p-0"
                      }
                      onClick={(e) => formHandlerRatingSubmit(7)}
                    />
                  </span>
                  <span>
                    <i
                      style={{
                        color:
                          dataIdeaDetail["total_rating"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["total_rating"]["rate"] > 4
                            ? "#ffff00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["total_rating"]["rate"] >= 8
                          ? "fas fa-star btn m-0 p-0"
                          : dataIdeaDetail["total_rating"]["rate"] >= 7.5
                          ? "fas fa-star-half-alt btn m-0 p-0"
                          : "far fa-star btn m-0 p-0"
                      }
                      onClick={(e) => formHandlerRatingSubmit(8)}
                    />
                  </span>
                  <span>
                    <i
                      style={{
                        color:
                          dataIdeaDetail["total_rating"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["total_rating"]["rate"] > 4
                            ? "#ffff00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["total_rating"]["rate"] >= 9
                          ? "fas fa-star btn m-0 p-0"
                          : dataIdeaDetail["total_rating"]["rate"] >= 8.5
                          ? "fas fa-star-half-alt btn m-0 p-0"
                          : "far fa-star btn m-0 p-0"
                      }
                      onClick={(e) => formHandlerRatingSubmit(9)}
                    />
                  </span>
                  <span>
                    <i
                      style={{
                        color:
                          dataIdeaDetail["total_rating"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["total_rating"]["rate"] > 4
                            ? "#ffff00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["total_rating"]["rate"] >= 10
                          ? "fas fa-star btn m-0 p-0"
                          : dataIdeaDetail["total_rating"]["rate"] >= 9.5
                          ? "fas fa-star-half-alt btn m-0 p-0"
                          : "far fa-star btn m-0 p-0"
                      }
                      onClick={(e) => formHandlerRatingSubmit(10)}
                    />
                  </span>
                </div>
                <h6 className="d-flex justify-content-between align-items-center m-0 p-0">
                  <span className="text-primary">Комментарии</span>
                  <span className="badge bg-primary rounded-pill">
                    {dataIdeaDetail["comment_count"]}
                  </span>
                </h6>
                <StoreStatusComponent
                  storeStatus={ideaCommentCreateAuthStore}
                  keyStatus={"ideaCommentCreateAuthStore"}
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
                <div className="m-0 p-0 my-2">
                  <form
                    className="card"
                    onSubmit={formHandlerCommentCreateSubmit}
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={comment}
                        required
                        placeholder="введите комментарий тут..."
                        minLength="1"
                        maxLength="200"
                        onChange={(e) => commentSet(e.target.value)}
                      />
                      <button type="submit" className="btn btn-secondary">
                        отправить
                      </button>
                    </div>
                  </form>
                </div>
                <StoreStatusComponent
                  storeStatus={ideaCommentListAuthStore}
                  keyStatus={"ideaCommentListAuthStore"}
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
                {!dataIdeaCommentList ||
                (dataIdeaCommentList && dataIdeaCommentList.length) < 1 ? (
                  <div className="my-1">
                    <MessageComponent variant={"warning"}>
                      Комментарии не найдены!
                    </MessageComponent>
                  </div>
                ) : (
                  <ul className="list-group">
                    {dataIdeaCommentList.map((object, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between lh-sm"
                      >
                        <div>
                          <h6 className="my-0">
                            {object["user_model"]["last_name_char_field"]}{" "}
                            {object["user_model"]["first_name_char_field"]}
                          </h6>
                          <small className="text-muted">
                            {object["comment_text_field"]}
                          </small>
                        </div>
                        <span className="text-muted">
                          {utils.GetCleanDateTime(
                            object["datetime_field"],
                            true
                          )}
                          <button
                            type="button"
                            className="btn btn-sm btn-danger m-0 p-0"
                            onClick={(e) =>
                              formHandlerNotificationSubmit({
                                name: "жалоба на комментарий в банке идей",
                                place: `id идеи: ${id}, id комментария: ${object["id"]}`,
                                description: "",
                              })
                            }
                          >
                            пожаловаться
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <FooterComponent />
    </div>
  );
};

export default Page;