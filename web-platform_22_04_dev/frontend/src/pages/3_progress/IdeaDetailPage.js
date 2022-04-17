// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";

import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const IdeaDetailPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const id = useParams().id;
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [firstRefresh, firstRefreshSet] = useState(true);
  //////////////////////////////////////////////////////////
  const [comment, commentSet] = useState("");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const ideaDetailStore = useSelector((state) => state.ideaDetailStore);
  const {
    // load: loadIdeaDetail,
    data: dataIdeaDetail,
    // error: errorIdeaDetail,
    // fail: failIdeaDetail,
  } = ideaDetailStore;
  //////////////////////////////////////////////////////////
  const ideaCommentCreateStore = useSelector(
    (state) => state.ideaCommentCreateStore
  );
  const {
    // load: loadIdeaCommentCreate,
    data: dataIdeaCommentCreate,
    // error: errorIdeaCommentCreate,
    // fail: failIdeaCommentCreate,
  } = ideaCommentCreateStore;
  //////////////////////////////////////////////////////////
  const ideaRatingCreateStore = useSelector(
    (state) => state.ideaRatingCreateStore
  );
  const {
    // load: loadIdeaRatingCreate,
    data: dataIdeaRatingCreate,
    // error: errorIdeaRatingCreate,
    // fail: failIdeaRatingCreate,
  } = ideaRatingCreateStore;
  //////////////////////////////////////////////////////////
  const notificationCreateStore = useSelector(
    (state) => state.notificationCreateStore
  );
  // TODO reset state //////////////////////////////////////////////////////////////////////////////////////////////////
  const resetState = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    dispatch({ type: constants.IDEA_DETAIL.reset });

    dispatch({
      type: constants.IDEA_COMMENT_CREATE.reset,
    });
    dispatch({
      type: constants.IDEA_RATING_CREATE.reset,
    });
    dispatch({
      type: constants.IDEA_MODERATE.reset,
    });
  };
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!dataIdeaDetail) {
      const form = {
        "Action-type": "IDEA_DETAIL",
        id: id,
      };
      dispatch(
        utils.ActionConstructorUtility(
          form,
          "/api/auth/idea/",
          "POST",
          30000,
          constants.IDEA_DETAIL
        )
      );
    } else {
      if (firstRefresh) {
        firstRefreshSet(false);
        resetState();
      }
    }
  }, [dataIdeaDetail, firstRefresh]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataIdeaCommentCreate) {
      utils.Sleep(10).then(() => {
        resetState();
        commentSet("");
      });
    }
  }, [dataIdeaCommentCreate]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataIdeaRatingCreate) {
      utils.Sleep(10).then(() => {
        resetState();
      });
    }
  }, [dataIdeaRatingCreate]);
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerCommentCreateSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "IDEA_COMMENT_CREATE",
      id: id,
      comment: comment,
    };
    dispatch(
      utils.ActionConstructorUtility(
        form,
        "/api/auth/idea/",
        "POST",
        30000,
        constants.IDEA_COMMENT_CREATE
      )
    );
  };
  //////////////////////////////////////////////////////////
  const handlerRatingSubmit = async (value) => {
    const form = {
      "Action-type": "IDEA_RATING_CREATE",
      id: id,
      rating: value,
    };
    if (value < 4) {
      let prompt = window.prompt(
        "Введите причину низкой оценки?",
        "Мне не понравилась идея!"
      );
      if (prompt) {
        dispatch(
          utils.ActionConstructorUtility(
            form,
            "/api/auth/idea/",
            "POST",
            30000,
            constants.IDEA_RATING_CREATE
          )
        );
        const form2 = {
          "Action-type": "IDEA_COMMENT_CREATE",
          id: id,
          comment: prompt,
        };
        dispatch(
          utils.ActionConstructorUtility(
            form2,
            "/api/auth/idea/",
            "POST",
            30000,
            constants.IDEA_COMMENT_CREATE
          )
        );
      }
    } else {
      dispatch(
        utils.ActionConstructorUtility(
          form,
          "/api/auth/idea/",
          "POST",
          30000,
          constants.IDEA_RATING_CREATE
        )
      );
    }
  };
  //////////////////////////////////////////////////////////
  const handlerNotificationSubmit = async ({ name, place, description }) => {
    let prompt = window.prompt("Причина жалобы?", "Нарушение норм приличия!");
    if (prompt) {
      const form = {
        "Action-type": "NOTIFICATION_CREATE",
        name: name,
        place: place,
        description: description + `, причина: ${prompt}`,
      };
      dispatch(
        utils.ActionConstructorUtility(
          form,
          "/api/auth/user/notification/",
          "POST",
          30000,
          constants.NOTIFICATION_CREATE
        )
      );
    }
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={notificationCreateStore}
          keyStatus={"notificationCreateStore"}
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
        <div className="btn-group text-start w-100 m-0 p-0">
          <Link to={"/idea_list"} className="btn btn-sm btn-primary m-1 p-2">
            {"<="} назад к списку
          </Link>
          {dataIdeaDetail && (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger m-1 p-2"
              onClick={(e) =>
                handlerNotificationSubmit({
                  name: "жалоба на идею в банке идей",
                  place: "банк идей",
                  description: `название идеи: ${dataIdeaDetail["name_char_field"]}`,
                })
              }
            >
              <i className="fa-solid fa-skull-crossbones m-0 p-1" />
              жалоба на идею
            </button>
          )}
        </div>
        <components.StoreStatusComponent
          storeStatus={ideaDetailStore}
          keyStatus={"ideaDetailStore"}
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
          <div className="m-0 p-0">
            <div className="card shadow custom-background-transparent-low text-center p-0">
              <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                <h6 className="lead fw-bold m-0 p-0">
                  {dataIdeaDetail["name_char_field"]}
                </h6>
              </div>
              <div className="card-body m-0 p-0">
                <div className="m-0 p-0">
                  <label className="form-control-sm text-center m-0 p-1">
                    Подразделение:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      required
                    >
                      <option className="m-0 p-0" value="">
                        {dataIdeaDetail["subdivision_char_field"]}
                      </option>
                    </select>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Сфера:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      required
                    >
                      <option className="m-0 p-0" value="">
                        {dataIdeaDetail["sphere_char_field"]}
                      </option>
                    </select>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Категория:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      required
                    >
                      <option className="m-0 p-0" value="">
                        {dataIdeaDetail["category_char_field"]}
                      </option>
                    </select>
                  </label>
                </div>
                <div className="m-0 p-0">
                  <img
                    src={
                      dataIdeaDetail["image_field"]
                        ? utils.GetStaticFile(dataIdeaDetail["image_field"])
                        : utils.GetStaticFile(
                            "/media/default/idea/default_idea.jpg"
                          )
                    }
                    className="img-fluid img-thumbnail w-75 m-1 p-0"
                    alt="изображение отсутствует"
                  />
                </div>
                <div className="m-0 p-0">
                  <label className="form-control-sm text-center w-50 m-0 p-1">
                    Место изменения:
                    <input
                      type="text"
                      className="form-control form-control-sm text-center m-0 p-1"
                      defaultValue={dataIdeaDetail["place_char_field"]}
                      readOnly={true}
                      placeholder="введите место изменения тут..."
                      required
                      minLength="1"
                      maxLength="300"
                    />
                  </label>
                </div>
                <div className="m-0 p-0">
                  <label className="form-control-sm text-center w-100 m-0 p-1">
                    Описание:
                    <textarea
                      className="form-control form-control-sm text-center m-0 p-1"
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
                <div className="m-0 p-0">
                  <Link to={`#`} className="btn btn-sm btn-warning m-0 p-2">
                    Автор:{" "}
                    {dataIdeaDetail["user_model"]["last_name_char_field"]}{" "}
                    {dataIdeaDetail["user_model"]["first_name_char_field"]}{" "}
                    {dataIdeaDetail["user_model"]["position_char_field"]}
                  </Link>
                </div>
                <div className="d-flex justify-content-between m-1 p-0">
                  <label className="text-muted border m-0 p-2">
                    подано:{" "}
                    <p className="m-0">
                      {utils.GetCleanDateTime(
                        dataIdeaDetail["created_datetime_field"],
                        true
                      )}
                    </p>
                  </label>
                  <label className="text-muted border m-1 p-2">
                    зарегистрировано:{" "}
                    <p className="m-0 p-0">
                      {utils.GetCleanDateTime(
                        dataIdeaDetail["register_datetime_field"],
                        true
                      )}
                    </p>
                  </label>
                </div>
              </div>
              <div className="card-footer m-0 p-1">
                <components.StoreStatusComponent
                  storeStatus={ideaRatingCreateStore}
                  keyStatus={"ideaRatingCreateStore"}
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
                <div className="d-flex justify-content-between m-0 p-1">
                  <span
                    className={
                      dataIdeaDetail["ratings"]["rate"] > 7
                        ? "text-success m-0 p-1"
                        : dataIdeaDetail["ratings"]["rate"] > 4
                        ? "custom-color-warning-1 m-0 p-1"
                        : "text-danger m-0 p-1"
                    }
                  >
                    Рейтинг
                  </span>
                  {dataIdeaDetail["ratings"] &&
                  dataIdeaDetail["ratings"]["ratings"].length > 0 ? (
                    <Navbar className="text-center m-0 p-0">
                      <Container className="m-0 p-0">
                        <Nav className="me-auto dropdown m-0 p-0">
                          <NavDropdown
                            title={
                              utils.GetSliceString(
                                dataIdeaDetail["ratings"]["rate"],
                                3,
                                false
                              ) +
                              " /  " +
                              dataIdeaDetail["ratings"]["count"]
                            }
                            className={
                              dataIdeaDetail["ratings"]["rate"] > 7
                                ? "btn btn-sm bg-success bg-opacity-50 badge rounded-pill"
                                : dataIdeaDetail["ratings"]["rate"] > 4
                                ? "btn btn-sm bg-warning bg-opacity-50 badge rounded-pill"
                                : "btn btn-sm bg-danger bg-opacity-50 badge rounded-pill"
                            }
                          >
                            <ul className="m-0 p-0">
                              {dataIdeaDetail["ratings"]["ratings"].map(
                                (object, index) => (
                                  <li
                                    key={index}
                                    className={
                                      object["rating_integer_field"] > 7
                                        ? "list-group-item bg-success bg-opacity-10"
                                        : object["rating_integer_field"] > 4
                                        ? "list-group-item bg-warning bg-opacity-10"
                                        : "list-group-item bg-danger bg-opacity-10"
                                    }
                                  >
                                    <small className="">
                                      {`${object["user_model"]["last_name_char_field"]} 
                                    ${object["user_model"]["first_name_char_field"]} : 
                                    ${object["rating_integer_field"]}`}
                                    </small>
                                  </li>
                                )
                              )}
                            </ul>
                          </NavDropdown>
                        </Nav>
                      </Container>
                    </Navbar>
                  ) : (
                    <div className="m-0 p-1">
                      <span className="btn btn-sm bg-danger bg-opacity-50 badge rounded-pill m-0 p-2">
                        {"0  / 0"}
                      </span>
                    </div>
                  )}
                  <span className="m-0 p-1">
                    <div className="m-0 p-0">
                      Нажмите на одну из 10 звезд для оценки идеи:
                    </div>
                    <i
                      style={{
                        color:
                          dataIdeaDetail["ratings"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["ratings"]["rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["ratings"]["rate"] >= 1
                          ? "btn fas fa-star m-0 p-0"
                          : dataIdeaDetail["ratings"]["rate"] >= 0.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingSubmit(1)}
                    />
                    <i
                      style={{
                        color:
                          dataIdeaDetail["ratings"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["ratings"]["rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["ratings"]["rate"] >= 2
                          ? "btn fas fa-star m-0 p-0"
                          : dataIdeaDetail["ratings"]["rate"] >= 1.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingSubmit(2)}
                    />
                    <i
                      style={{
                        color:
                          dataIdeaDetail["ratings"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["ratings"]["rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["ratings"]["rate"] >= 3
                          ? "btn fas fa-star m-0 p-0"
                          : dataIdeaDetail["ratings"]["rate"] >= 2.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingSubmit(3)}
                    />
                    <i
                      style={{
                        color:
                          dataIdeaDetail["ratings"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["ratings"]["rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["ratings"]["rate"] >= 4
                          ? "btn fas fa-star m-0 p-0"
                          : dataIdeaDetail["ratings"]["rate"] >= 3.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingSubmit(4)}
                    />
                    <i
                      style={{
                        color:
                          dataIdeaDetail["ratings"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["ratings"]["rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["ratings"]["rate"] >= 5
                          ? "btn fas fa-star m-0 p-0"
                          : dataIdeaDetail["ratings"]["rate"] >= 4.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingSubmit(5)}
                    />
                    <i
                      style={{
                        color:
                          dataIdeaDetail["ratings"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["ratings"]["rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["ratings"]["rate"] >= 6
                          ? "btn fas fa-star m-0 p-0"
                          : dataIdeaDetail["ratings"]["rate"] >= 5.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingSubmit(6)}
                    />
                    <i
                      style={{
                        color:
                          dataIdeaDetail["ratings"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["ratings"]["rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["ratings"]["rate"] >= 7
                          ? "btn fas fa-star m-0 p-0"
                          : dataIdeaDetail["ratings"]["rate"] >= 6.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingSubmit(7)}
                    />
                    <i
                      style={{
                        color:
                          dataIdeaDetail["ratings"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["ratings"]["rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["ratings"]["rate"] >= 8
                          ? "btn fas fa-star m-0 p-0"
                          : dataIdeaDetail["ratings"]["rate"] >= 7.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingSubmit(8)}
                    />
                    <i
                      style={{
                        color:
                          dataIdeaDetail["ratings"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["ratings"]["rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["ratings"]["rate"] >= 9
                          ? "btn fas fa-star m-0 p-0"
                          : dataIdeaDetail["ratings"]["rate"] >= 8.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingSubmit(9)}
                    />
                    <i
                      style={{
                        color:
                          dataIdeaDetail["ratings"]["rate"] > 7
                            ? "#00ff00"
                            : dataIdeaDetail["ratings"]["rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        dataIdeaDetail["ratings"]["rate"] >= 10
                          ? "btn fas fa-star m-0 p-0"
                          : dataIdeaDetail["ratings"]["rate"] >= 9.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingSubmit(10)}
                    />
                  </span>
                </div>
                <div className="d-flex justify-content-between m-0 p-1">
                  <span className="text-secondary m-0 p-1">Комментарии</span>
                  <i className="fa-solid fa-comment m-0 p-1">
                    {" "}
                    {dataIdeaDetail["comments"]["count"]}
                  </i>
                </div>
              </div>
              <div className="card-footer m-0 p-0">
                <div className="card m-0 p-2">
                  <div className="order-md-last m-0 p-0">
                    <div className="m-0 p-0 my-2">
                      <form
                        className="card"
                        onSubmit={handlerCommentCreateSubmit}
                      >
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={comment}
                            required
                            placeholder="введите комментарий тут..."
                            minLength="1"
                            maxLength="300"
                            onChange={(e) =>
                              commentSet(
                                e.target.value.replace(
                                  utils.GetRegexType({
                                    numbers: true,
                                    cyrillic: true,
                                    space: true,
                                    punctuationMarks: true,
                                  }),
                                  ""
                                )
                              )
                            }
                          />
                          <button type="submit" className="btn btn-secondary">
                            <i className="fa-solid fa-circle-check m-0 p-1" />
                            отправить
                          </button>
                        </div>
                      </form>
                    </div>
                    <components.StoreStatusComponent
                      storeStatus={ideaCommentCreateStore}
                      keyStatus={"ideaCommentCreateStore"}
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
                    {!dataIdeaDetail["comments"] ||
                    (dataIdeaDetail["comments"]["comments"] &&
                      dataIdeaDetail["comments"]["comments"].length) < 1 ? (
                      <div className="my-1">
                        <components.MessageComponent variant={"warning"}>
                          Комментарии не найдены!
                        </components.MessageComponent>
                      </div>
                    ) : (
                      <ul className="list-group m-0 p-0">
                        {dataIdeaDetail["comments"]["comments"].map(
                          (object, index) => (
                            <li className="list-group-item m-0 p-1">
                              <div className="d-flex justify-content-between m-0 p-0">
                                <h6 className="btn btn-outline-warning m-0 p-2">
                                  {object["user_model"]["last_name_char_field"]}{" "}
                                  {
                                    object["user_model"][
                                      "first_name_char_field"
                                    ]
                                  }
                                </h6>
                                <span className="text-muted m-0 p-0">
                                  {utils.GetCleanDateTime(
                                    object["created_datetime_field"],
                                    true
                                  )}
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger m-1 p-1"
                                    onClick={(e) =>
                                      handlerNotificationSubmit({
                                        name: "жалоба на комментарий в банке идей",
                                        place: "банк идей",
                                        description: `название идеи: ${
                                          dataIdeaDetail["name_char_field"]
                                        } (${
                                          dataIdeaDetail["user_model"][
                                            "last_name_char_field"
                                          ]
                                        } ${
                                          dataIdeaDetail["user_model"][
                                            "first_name_char_field"
                                          ]
                                        }), комментарий: ${utils.GetCleanDateTime(
                                          object["created_datetime_field"],
                                          true
                                        )} (${
                                          object["user_model"][
                                            "last_name_char_field"
                                          ]
                                        } ${
                                          object["user_model"][
                                            "first_name_char_field"
                                          ]
                                        })`,
                                      })
                                    }
                                  >
                                    <i className="fa-solid fa-skull-crossbones m-0 p-1" />
                                    жалоба на комментарий
                                  </button>
                                </span>
                              </div>
                              <div className="d-flex justify-content-center m-0 p-1">
                                <small className="text-muted m-0 p-1">
                                  {object["comment_text_field"]}
                                </small>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <components.FooterComponent />
    </div>
  );
};
