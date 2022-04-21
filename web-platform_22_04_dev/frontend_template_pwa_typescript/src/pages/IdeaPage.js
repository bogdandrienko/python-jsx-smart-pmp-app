import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BaseComponent1 } from "../components/ui/base";
import * as constants from "../components/constants";
import * as actions from "../components/actions";
import * as utils from "../components/utils";
import * as components from "../components/components";

export const IdeaPage = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  const [comment, commentSet] = useState("");

  const {
    load: loadIdeaReadStore,
    data: dataIdeaReadStore,
    error: errorIdeaReadStore,
    fail: failIdeaReadStore,
  } = useSelector((state) => state.IdeaReadStore);

  const {
    load: loadIdeaCommentReadListStore,
    data: dataIdeaCommentReadListStore,
    error: errorIdeaCommentReadListStore,
    fail: failIdeaCommentReadListStore,
  } = useSelector((state) => state.IdeaCommentReadListStore);

  const {
    load: loadIdeaRatingReadListStore,
    data: dataIdeaRatingReadListStore,
    error: errorIdeaRatingReadListStore,
    fail: failIdeaRatingReadListStore,
  } = useSelector((state) => state.IdeaRatingReadListStore);

  useEffect(() => {
    dispatch(actions.Idea.IdeaReadAction(constants.IdeaReadStore, id));
    dispatch(
      actions.IdeaComment.ReadListAction(
        constants.IdeaCommentReadListStore,
        id,
        1,
        5
      )
    );
    dispatch(
      actions.IdeaRating.ReadListAction(
        constants.IdeaRatingReadListStore,
        id,
        1,
        5
      )
    );
  }, [id]);

  const deletePost = async (event) => {
    event.stopPropagation();
    dispatch(actions.Idea.IdeaDeleteAction(constants.IdeaDeleteStore, id));
    navigate("/ideas");
    dispatch({ type: constants.IdeaReadListStore.reset });
  };
  const handlerCommentCreateSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    dispatch(
      actions.IdeaComment.CreateAction(constants.IdeaCommentCreateStore, id, {
        comment: comment,
      })
    );
  };
  const handlerRatingCreateSubmit = async (value) => {
    if (value < 4) {
      let prompt = window.prompt(
        "Введите причину низкой оценки?",
        "Мне не понравилась идея!"
      );
      if (prompt) {
        dispatch(
          actions.IdeaRating.CreateAction(constants.IdeaRatingCreateStore, id, {
            value: value,
          })
        );
        dispatch(
          actions.IdeaComment.CreateAction(
            constants.IdeaCommentCreateStore,
            id,
            {
              comment: prompt,
            }
          )
        );
      }
    } else {
      dispatch(
        actions.IdeaRating.CreateAction(constants.IdeaRatingCreateStore, id, {
          value: value,
        })
      );
    }
  };
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
          30000
        )
      );
    }
  };

  return (
    <BaseComponent1>
      {errorIdeaReadStore && <h4>We have some error {errorIdeaReadStore}</h4>}
      {failIdeaReadStore && <h4>We have some fail {failIdeaReadStore}</h4>}
      <div className="post_detail">
        {loadIdeaReadStore ? (
          <div>Loading...</div>
        ) : (
          dataIdeaReadStore && (
            <div className="m-0 p-0">
              <div className="card shadow custom-background-transparent-low text-center p-0">
                <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                  <h6 className="lead fw-bold m-0 p-0">
                    {dataIdeaReadStore["name_char_field"]}
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
                          {dataIdeaReadStore["subdivision_char_field"]}
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
                          {dataIdeaReadStore["sphere_char_field"]}
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
                          {dataIdeaReadStore["category_char_field"]}
                        </option>
                      </select>
                    </label>
                  </div>
                  <div className="m-0 p-0">
                    <img
                      src={
                        dataIdeaReadStore["image_field"]
                          ? utils.GetStaticFile(
                              dataIdeaReadStore["image_field"]
                            )
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
                        defaultValue={dataIdeaReadStore["place_char_field"]}
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
                        defaultValue={
                          dataIdeaReadStore["description_text_field"]
                        }
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
                      {dataIdeaReadStore["user_model"]["last_name_char_field"]}{" "}
                      {dataIdeaReadStore["user_model"]["first_name_char_field"]}{" "}
                      {dataIdeaReadStore["user_model"]["position_char_field"]}
                    </Link>
                  </div>
                  <div className="d-flex justify-content-between m-1 p-0">
                    <label className="text-muted border m-0 p-2">
                      подано:{" "}
                      <p className="m-0">
                        {utils.GetCleanDateTime(
                          dataIdeaReadStore["created_datetime_field"],
                          true
                        )}
                      </p>
                    </label>
                    <label className="text-muted border m-1 p-2">
                      зарегистрировано:{" "}
                      <p className="m-0 p-0">
                        {utils.GetCleanDateTime(
                          dataIdeaReadStore["register_datetime_field"],
                          true
                        )}
                      </p>
                    </label>
                  </div>
                </div>
                <div className="card-footer m-0 p-1">
                  {/*<components.StoreStatusComponent*/}
                  {/*  storeStatus={ideaRatingCreateStore}*/}
                  {/*  keyStatus={"ideaRatingCreateStore"}*/}
                  {/*  consoleLog={constants.DEBUG_CONSTANT}*/}
                  {/*  showLoad={true}*/}
                  {/*  loadText={""}*/}
                  {/*  showData={false}*/}
                  {/*  dataText={""}*/}
                  {/*  showError={true}*/}
                  {/*  errorText={""}*/}
                  {/*  showFail={true}*/}
                  {/*  failText={""}*/}
                  {/*/>*/}
                  <div className="d-flex justify-content-between m-0 p-1">
                    <span
                      className={
                        dataIdeaRatingReadListStore["rate"] > 7
                          ? "text-success m-0 p-1"
                          : dataIdeaRatingReadListStore["rate"] > 4
                          ? "custom-color-warning-1 m-0 p-1"
                          : "text-danger m-0 p-1"
                      }
                    >
                      Рейтинг
                    </span>
                    {dataIdeaRatingReadListStore &&
                    dataIdeaRatingReadListStore.list.length > 0 ? (
                      <Navbar className="text-center m-0 p-0">
                        <Container className="m-0 p-0">
                          <Nav className="me-auto dropdown m-0 p-0">
                            <NavDropdown
                              title={
                                utils.GetSliceString(
                                  dataIdeaRatingReadListStore["rate"],
                                  3,
                                  false
                                ) +
                                " /  " +
                                dataIdeaRatingReadListStore["x-total-count"]
                              }
                              className={
                                dataIdeaRatingReadListStore["rate"] > 7
                                  ? "btn btn-sm bg-success bg-opacity-50 badge rounded-pill"
                                  : dataIdeaRatingReadListStore["rate"] > 4
                                  ? "btn btn-sm bg-warning bg-opacity-50 badge rounded-pill"
                                  : "btn btn-sm bg-danger bg-opacity-50 badge rounded-pill"
                              }
                            >
                              <ul className="m-0 p-0">
                                {dataIdeaRatingReadListStore["list"].map(
                                  (rate, index) => (
                                    <li
                                      key={index}
                                      className={
                                        rate["rating_integer_field"] > 7
                                          ? "list-group-item bg-success bg-opacity-10"
                                          : rate["rating_integer_field"] > 4
                                          ? "list-group-item bg-warning bg-opacity-10"
                                          : "list-group-item bg-danger bg-opacity-10"
                                      }
                                    >
                                      <small className="">
                                        {`${rate["user_model"]["last_name_char_field"]} 
                                    ${rate["user_model"]["first_name_char_field"]} : 
                                    ${rate["rating_integer_field"]}`}
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
                            dataIdeaRatingReadListStore["rate"] > 7
                              ? "#00ff00"
                              : dataIdeaRatingReadListStore["rate"] > 4
                              ? "#ffaa00"
                              : "#ff0000",
                        }}
                        className={
                          dataIdeaRatingReadListStore["rate"] >= 1
                            ? "btn fas fa-star m-0 p-0"
                            : dataIdeaRatingReadListStore["rate"] >= 0.5
                            ? "btn fas fa-star-half-alt m-0 p-0"
                            : "btn far fa-star m-0 p-0"
                        }
                        onClick={(e) => handlerRatingCreateSubmit(1)}
                      />
                      <i
                        style={{
                          color:
                            dataIdeaRatingReadListStore["rate"] > 7
                              ? "#00ff00"
                              : dataIdeaRatingReadListStore["rate"] > 4
                              ? "#ffaa00"
                              : "#ff0000",
                        }}
                        className={
                          dataIdeaRatingReadListStore["rate"] >= 2
                            ? "btn fas fa-star m-0 p-0"
                            : dataIdeaRatingReadListStore["rate"] >= 1.5
                            ? "btn fas fa-star-half-alt m-0 p-0"
                            : "btn far fa-star m-0 p-0"
                        }
                        onClick={(e) => handlerRatingCreateSubmit(2)}
                      />
                      <i
                        style={{
                          color:
                            dataIdeaRatingReadListStore["rate"] > 7
                              ? "#00ff00"
                              : dataIdeaRatingReadListStore["rate"] > 4
                              ? "#ffaa00"
                              : "#ff0000",
                        }}
                        className={
                          dataIdeaRatingReadListStore["rate"] >= 3
                            ? "btn fas fa-star m-0 p-0"
                            : dataIdeaRatingReadListStore["rate"] >= 2.5
                            ? "btn fas fa-star-half-alt m-0 p-0"
                            : "btn far fa-star m-0 p-0"
                        }
                        onClick={(e) => handlerRatingCreateSubmit(3)}
                      />
                      <i
                        style={{
                          color:
                            dataIdeaRatingReadListStore["rate"] > 7
                              ? "#00ff00"
                              : dataIdeaRatingReadListStore["rate"] > 4
                              ? "#ffaa00"
                              : "#ff0000",
                        }}
                        className={
                          dataIdeaRatingReadListStore["rate"] >= 4
                            ? "btn fas fa-star m-0 p-0"
                            : dataIdeaRatingReadListStore["rate"] >= 3.5
                            ? "btn fas fa-star-half-alt m-0 p-0"
                            : "btn far fa-star m-0 p-0"
                        }
                        onClick={(e) => handlerRatingCreateSubmit(4)}
                      />
                      <i
                        style={{
                          color:
                            dataIdeaRatingReadListStore["rate"] > 7
                              ? "#00ff00"
                              : dataIdeaRatingReadListStore["rate"] > 4
                              ? "#ffaa00"
                              : "#ff0000",
                        }}
                        className={
                          dataIdeaRatingReadListStore["rate"] >= 5
                            ? "btn fas fa-star m-0 p-0"
                            : dataIdeaRatingReadListStore["rate"] >= 4.5
                            ? "btn fas fa-star-half-alt m-0 p-0"
                            : "btn far fa-star m-0 p-0"
                        }
                        onClick={(e) => handlerRatingCreateSubmit(5)}
                      />
                      <i
                        style={{
                          color:
                            dataIdeaRatingReadListStore["rate"] > 7
                              ? "#00ff00"
                              : dataIdeaRatingReadListStore["rate"] > 4
                              ? "#ffaa00"
                              : "#ff0000",
                        }}
                        className={
                          dataIdeaRatingReadListStore["rate"] >= 6
                            ? "btn fas fa-star m-0 p-0"
                            : dataIdeaRatingReadListStore["rate"] >= 5.5
                            ? "btn fas fa-star-half-alt m-0 p-0"
                            : "btn far fa-star m-0 p-0"
                        }
                        onClick={(e) => handlerRatingCreateSubmit(6)}
                      />
                      <i
                        style={{
                          color:
                            dataIdeaRatingReadListStore["rate"] > 7
                              ? "#00ff00"
                              : dataIdeaRatingReadListStore["rate"] > 4
                              ? "#ffaa00"
                              : "#ff0000",
                        }}
                        className={
                          dataIdeaRatingReadListStore["rate"] >= 7
                            ? "btn fas fa-star m-0 p-0"
                            : dataIdeaRatingReadListStore["rate"] >= 6.5
                            ? "btn fas fa-star-half-alt m-0 p-0"
                            : "btn far fa-star m-0 p-0"
                        }
                        onClick={(e) => handlerRatingCreateSubmit(7)}
                      />
                      <i
                        style={{
                          color:
                            dataIdeaRatingReadListStore["rate"] > 7
                              ? "#00ff00"
                              : dataIdeaRatingReadListStore["rate"] > 4
                              ? "#ffaa00"
                              : "#ff0000",
                        }}
                        className={
                          dataIdeaRatingReadListStore["rate"] >= 8
                            ? "btn fas fa-star m-0 p-0"
                            : dataIdeaRatingReadListStore["rate"] >= 7.5
                            ? "btn fas fa-star-half-alt m-0 p-0"
                            : "btn far fa-star m-0 p-0"
                        }
                        onClick={(e) => handlerRatingCreateSubmit(8)}
                      />
                      <i
                        style={{
                          color:
                            dataIdeaRatingReadListStore["rate"] > 7
                              ? "#00ff00"
                              : dataIdeaRatingReadListStore["rate"] > 4
                              ? "#ffaa00"
                              : "#ff0000",
                        }}
                        className={
                          dataIdeaRatingReadListStore["rate"] >= 9
                            ? "btn fas fa-star m-0 p-0"
                            : dataIdeaRatingReadListStore["rate"] >= 8.5
                            ? "btn fas fa-star-half-alt m-0 p-0"
                            : "btn far fa-star m-0 p-0"
                        }
                        onClick={(e) => handlerRatingCreateSubmit(9)}
                      />
                      <i
                        style={{
                          color:
                            dataIdeaRatingReadListStore["rate"] > 7
                              ? "#00ff00"
                              : dataIdeaRatingReadListStore["rate"] > 4
                              ? "#ffaa00"
                              : "#ff0000",
                        }}
                        className={
                          dataIdeaRatingReadListStore["rate"] >= 10
                            ? "btn fas fa-star m-0 p-0"
                            : dataIdeaRatingReadListStore["rate"] >= 9.5
                            ? "btn fas fa-star-half-alt m-0 p-0"
                            : "btn far fa-star m-0 p-0"
                        }
                        onClick={(e) => handlerRatingCreateSubmit(10)}
                      />
                    </span>
                  </div>
                  <div className="d-flex justify-content-between m-0 p-1">
                    <span className="text-secondary m-0 p-1">Комментарии</span>
                    <i className="fa-solid fa-comment m-0 p-1">
                      {" "}
                      {dataIdeaReadStore["comments"]["count"]}
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
                      {/*<components.StoreStatusComponent*/}
                      {/*  storeStatus={ideaCommentCreateStore}*/}
                      {/*  keyStatus={"ideaCommentCreateStore"}*/}
                      {/*  consoleLog={constants.DEBUG_CONSTANT}*/}
                      {/*  showLoad={true}*/}
                      {/*  loadText={""}*/}
                      {/*  showData={false}*/}
                      {/*  dataText={""}*/}
                      {/*  showError={true}*/}
                      {/*  errorText={""}*/}
                      {/*  showFail={true}*/}
                      {/*  failText={""}*/}
                      {/*/>*/}
                      {!dataIdeaCommentReadListStore ||
                      (dataIdeaCommentReadListStore.list &&
                        dataIdeaCommentReadListStore.list.length) < 1 ? (
                        <div className="my-1">
                          <components.MessageComponent variant={"warning"}>
                            Комментарии не найдены!
                          </components.MessageComponent>
                        </div>
                      ) : (
                        <ul className="list-group m-0 p-0">
                          {dataIdeaCommentReadListStore.list.map(
                            (object, index) => (
                              <li className="list-group-item m-0 p-1">
                                <div className="d-flex justify-content-between m-0 p-0">
                                  <h6 className="btn btn-outline-warning m-0 p-2">
                                    {
                                      object["user_model"][
                                        "last_name_char_field"
                                      ]
                                    }{" "}
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
                                            dataIdeaReadStore["name_char_field"]
                                          } (${
                                            dataIdeaReadStore["user_model"][
                                              "last_name_char_field"
                                            ]
                                          } ${
                                            dataIdeaReadStore["user_model"][
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
          )
        )}
      </div>
      <PostDelete
        visible={visible}
        setVisible={setVisible}
        action={deletePost}
      />
    </BaseComponent1>
  );
};

export const PostDelete = ({ visible, setVisible, action }) => {
  const rootClasses = ["custom_modal_1"];
  if (visible) {
    rootClasses.push("custom_modal_1_active");
  }
  return (
    <div>
      <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
        <div
          className={"custom_modal_content_1"}
          onClick={(e) => e.stopPropagation()}
        >
          <h5>Delete post?</h5>
          <button
            onClick={(event) => action(event)}
            className="custom_button_1"
          >
            delete
          </button>
          <button
            onClick={(event) => setVisible(false)}
            className="custom_button_1"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};
