import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BaseComponent1 } from "../components/ui/base";
import * as constants from "../components/constants";
import * as actions from "../components/actions";
import * as utils from "../components/utils";
import * as components from "../components/components";
import * as hooks from "../components/hooks";

export const IdeaPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;

  const [visible, setVisible] = useState(false);
  const [comment, commentSet] = useState("");

  const IdeaReadStore = hooks.useSelectorCustom1(constants.IdeaReadStore);
  const IdeaCommentReadListStore = hooks.useSelectorCustom1(
    constants.IdeaCommentReadListStore
  );
  const IdeaCommentCreateStore = hooks.useSelectorCustom1(
    constants.IdeaCommentCreateStore
  );
  const IdeaRatingReadListStore = hooks.useSelectorCustom1(
    constants.IdeaRatingReadListStore
  );
  const IdeaRatingCreateStore = hooks.useSelectorCustom1(
    constants.IdeaRatingCreateStore
  );

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

  useEffect(() => {
    if (!IdeaReadStore.data) {
      dispatch(actions.Idea.IdeaReadAction(constants.IdeaReadStore, id));
    }
  }, [IdeaReadStore.data]);

  useEffect(() => {
    if (!IdeaCommentReadListStore.data) {
      dispatch(
        actions.IdeaComment.ReadListAction(
          constants.IdeaCommentReadListStore,
          id,
          1,
          5
        )
      );
    }
  }, [IdeaCommentReadListStore.data]);

  useEffect(() => {
    if (!IdeaRatingReadListStore.data) {
      dispatch(
        actions.IdeaRating.ReadListAction(
          constants.IdeaRatingReadListStore,
          id,
          1,
          5
        )
      );
    }
  }, [IdeaRatingReadListStore.data]);

  useEffect(() => {
    if (IdeaCommentCreateStore.data) {
      dispatch({ type: constants.IdeaReadStore.reset });
      dispatch({ type: constants.IdeaCommentReadListStore.reset });
      dispatch({ type: constants.IdeaRatingReadListStore.reset });
    }
  }, [IdeaCommentCreateStore.data]);

  useEffect(() => {
    if (IdeaRatingCreateStore.data) {
      dispatch({ type: constants.IdeaReadStore.reset });
      dispatch({ type: constants.IdeaCommentReadListStore.reset });
      dispatch({ type: constants.IdeaRatingReadListStore.reset });
    }
  }, [IdeaRatingCreateStore.data]);

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
    commentSet("");
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
      <div className="btn-group text-start w-100 m-0 p-0">
        <Link to={"/idea/list"} className="btn btn-sm btn-primary m-1 p-2">
          {"<="} назад к списку
        </Link>
        {IdeaReadStore.data && (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger m-1 p-2"
            onClick={(e) =>
              handlerNotificationSubmit({
                name: "жалоба на идею в банке идей",
                place: "банк идей",
                description: `название идеи: ${IdeaReadStore.data["name_char_field"]}`,
              })
            }
          >
            <i className="fa-solid fa-skull-crossbones m-0 p-1" />
            жалоба на идею
          </button>
        )}
      </div>
      <components.StoreComponent
        storeStatus={constants.IdeaReadStore}
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
      <div className="m-0 p-0">
        {IdeaReadStore.data && !IdeaReadStore.load && (
          <div className="m-0 p-0">
            <div className="card shadow custom-background-transparent-low text-center p-0">
              <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
                <h6 className="lead fw-bold m-0 p-0">
                  {IdeaReadStore.data["name_char_field"]}
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
                        {IdeaReadStore.data["subdivision_char_field"]}
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
                        {IdeaReadStore.data["sphere_char_field"]}
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
                        {IdeaReadStore.data["category_char_field"]}
                      </option>
                    </select>
                  </label>
                </div>
                <div className="m-0 p-0">
                  <img
                    src={
                      IdeaReadStore.data["image_field"]
                        ? utils.GetStaticFile(IdeaReadStore.data["image_field"])
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
                      defaultValue={IdeaReadStore.data["place_char_field"]}
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
                        IdeaReadStore.data["description_text_field"]
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
                    {IdeaReadStore.data["user_model"]["last_name_char_field"]}{" "}
                    {IdeaReadStore.data["user_model"]["first_name_char_field"]}{" "}
                    {IdeaReadStore.data["user_model"]["position_char_field"]}
                  </Link>
                </div>
                <div className="d-flex justify-content-between m-1 p-0">
                  <label className="text-muted border m-0 p-2">
                    подано:{" "}
                    <p className="m-0">
                      {utils.GetCleanDateTime(
                        IdeaReadStore.data["created_datetime_field"],
                        true
                      )}
                    </p>
                  </label>
                  <label className="text-muted border m-1 p-2">
                    зарегистрировано:{" "}
                    <p className="m-0 p-0">
                      {utils.GetCleanDateTime(
                        IdeaReadStore.data["register_datetime_field"],
                        true
                      )}
                    </p>
                  </label>
                </div>
              </div>
              <components.StoreComponent
                storeStatus={constants.IdeaRatingCreateStore}
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
              <div className="card-footer m-0 p-1">
                <div className="d-flex justify-content-between m-0 p-1">
                  <span
                    className={
                      IdeaReadStore.data["ratings"]["total_rate"] > 7
                        ? "text-success m-0 p-1"
                        : IdeaReadStore.data["ratings"]["total_rate"] > 4
                        ? "custom-color-warning-1 m-0 p-1"
                        : "text-danger m-0 p-1"
                    }
                  >
                    Рейтинг
                  </span>
                  <Navbar className="text-center m-0 p-0">
                    <Container className="m-0 p-0">
                      <Nav className="me-auto dropdown m-0 p-0">
                        <NavDropdown
                          title={
                            utils.GetSliceString(
                              IdeaReadStore.data["ratings"]["total_rate"],
                              3,
                              false
                            ) +
                            " /  " +
                            IdeaReadStore.data["ratings"]["count"]
                          }
                          className={
                            IdeaReadStore.data["ratings"]["total_rate"] > 7
                              ? "btn btn-sm bg-success bg-opacity-50 badge rounded-pill"
                              : IdeaReadStore.data["ratings"]["total_rate"] > 4
                              ? "btn btn-sm bg-warning bg-opacity-50 badge rounded-pill"
                              : "btn btn-sm bg-danger bg-opacity-50 badge rounded-pill"
                          }
                        >
                          <ul className="m-0 p-0">
                            <components.StoreComponent
                              storeStatus={constants.IdeaRatingReadListStore}
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
                            {IdeaRatingReadListStore.data &&
                              IdeaRatingReadListStore.data.list.length > 0 &&
                              IdeaRatingReadListStore.data["list"].map(
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
                  <span className="m-0 p-1">
                    <div className="m-0 p-0">
                      Нажмите на одну из 10 звезд для оценки идеи:
                    </div>
                    <i
                      style={{
                        color:
                          IdeaReadStore.data["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaReadStore.data["ratings"]["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaReadStore.data["ratings"]["self_rate"] >= 1
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaReadStore.data["ratings"]["self_rate"] >= 0.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingCreateSubmit(1)}
                    />
                    <i
                      style={{
                        color:
                          IdeaReadStore.data["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaReadStore.data["ratings"]["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaReadStore.data["ratings"]["self_rate"] >= 2
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaReadStore.data["ratings"]["self_rate"] >= 1.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingCreateSubmit(2)}
                    />
                    <i
                      style={{
                        color:
                          IdeaReadStore.data["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaReadStore.data["ratings"]["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaReadStore.data["ratings"]["self_rate"] >= 3
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaReadStore.data["ratings"]["self_rate"] >= 2.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingCreateSubmit(3)}
                    />
                    <i
                      style={{
                        color:
                          IdeaReadStore.data["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaReadStore.data["ratings"]["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaReadStore.data["ratings"]["self_rate"] >= 4
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaReadStore.data["ratings"]["self_rate"] >= 3.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingCreateSubmit(4)}
                    />
                    <i
                      style={{
                        color:
                          IdeaReadStore.data["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaReadStore.data["ratings"]["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaReadStore.data["ratings"]["self_rate"] >= 5
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaReadStore.data["ratings"]["self_rate"] >= 4.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingCreateSubmit(5)}
                    />
                    <i
                      style={{
                        color:
                          IdeaReadStore.data["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaReadStore.data["ratings"]["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaReadStore.data["ratings"]["self_rate"] >= 6
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaReadStore.data["ratings"]["self_rate"] >= 5.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingCreateSubmit(6)}
                    />
                    <i
                      style={{
                        color:
                          IdeaReadStore.data["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaReadStore.data["ratings"]["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaReadStore.data["ratings"]["self_rate"] >= 7
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaReadStore.data["ratings"]["self_rate"] >= 6.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingCreateSubmit(7)}
                    />
                    <i
                      style={{
                        color:
                          IdeaReadStore.data["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaReadStore.data["ratings"]["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaReadStore.data["ratings"]["self_rate"] >= 8
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaReadStore.data["ratings"]["self_rate"] >= 7.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingCreateSubmit(8)}
                    />
                    <i
                      style={{
                        color:
                          IdeaReadStore.data["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaReadStore.data["ratings"]["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaReadStore.data["ratings"]["self_rate"] >= 9
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaReadStore.data["ratings"]["self_rate"] >= 8.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingCreateSubmit(9)}
                    />
                    <i
                      style={{
                        color:
                          IdeaReadStore.data["ratings"]["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaReadStore.data["ratings"]["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaReadStore.data["ratings"]["self_rate"] >= 10
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaReadStore.data["ratings"]["self_rate"] >= 9.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={(e) => handlerRatingCreateSubmit(10)}
                    />
                    <div className="m-0 p-0">Ваша оценка</div>
                  </span>
                </div>
                <div className="d-flex justify-content-between m-0 p-1">
                  <span className="text-secondary m-0 p-1">Комментарии</span>
                  <i className="fa-solid fa-comment m-0 p-1">
                    {" "}
                    {IdeaReadStore.data["comments"]["count"]}
                  </i>
                </div>
              </div>
              <div className="card-footer m-0 p-0">
                <div className="card m-0 p-2">
                  <div className="order-md-last m-0 p-0">
                    <div className="m-0 p-0 my-2">
                      <components.StoreComponent
                        storeStatus={constants.IdeaCommentCreateStore}
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
                    <components.StoreComponent
                      storeStatus={constants.IdeaCommentReadListStore}
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
                    {!IdeaCommentReadListStore.data ||
                    (IdeaCommentReadListStore.data.list &&
                      IdeaCommentReadListStore.data.list.length) < 1 ? (
                      <div className="my-1">
                        <components.MessageComponent variant={"warning"}>
                          Комментарии не найдены!
                        </components.MessageComponent>
                      </div>
                    ) : (
                      <ul className="list-group m-0 p-0">
                        {IdeaCommentReadListStore.data.list.map(
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
                                          IdeaReadStore["name_char_field"]
                                        } (${
                                          IdeaReadStore.data["user_model"][
                                            "last_name_char_field"
                                          ]
                                        } ${
                                          IdeaReadStore.data["user_model"][
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
