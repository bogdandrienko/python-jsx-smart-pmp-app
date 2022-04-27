// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as action from "../../components/action";
import * as component from "../../components/ui/component";
import * as constant from "../../components/constant";
import * as hook from "../../components/hook";
import * as util from "../../components/util";

import * as base from "../../components/ui/base";
import * as modal from "../../components/ui/modal";
import * as paginator from "../../components/ui/paginator";
import * as message from "../../components/ui/message";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IdeaPublicPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const IdeaReadStore = hook.useSelectorCustom1(constant.IdeaReadStore);
  const IdeaCommentReadListStore = hook.useSelectorCustom1(
    constant.IdeaCommentReadListStore
  );
  const IdeaCommentCreateStore = hook.useSelectorCustom1(
    constant.IdeaCommentCreateStore
  );
  const IdeaRatingReadListStore = hook.useSelectorCustom1(
    constant.IdeaRatingReadListStore
  );
  const IdeaRatingCreateStore = hook.useSelectorCustom1(
    constant.IdeaRatingCreateStore
  );

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const id = useParams().id;

  const [paginationComment, setPaginationComment, resetPaginationComment] =
    hook.useStateCustom1({ page: 1, limit: 5 });

  // Notification Modal
  const [isModalNotificationVisible, setIsModalNotificationVisible] =
    useState(false);
  const [modalNotificationForm, setModalNotificationForm] = useState({});

  // Low Rating Modal
  const [isModalLowRatingVisible, setIsModalLowRatingVisible] = useState(false);
  const [modalLowRatingForm, setModalLowRatingForm] = useState({});

  const [comment, SetComment, resetComment] = hook.useStateCustom1({
    comment: "",
  });

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!IdeaReadStore.data) {
      dispatch(action.Idea.Read({ idea_id: id }));
    }
  }, [IdeaReadStore.data]);

  useEffect(() => {
    if (!IdeaCommentReadListStore.data) {
      dispatch(
        action.IdeaComment.ReadList({ idea_id: id, ...paginationComment })
      );
    }
  }, [IdeaCommentReadListStore.data]);

  useEffect(() => {
    if (!IdeaRatingReadListStore.data) {
      dispatch(
        action.IdeaRating.ReadList({
          idea_id: id,
          form: { limit: 100, page: 1 },
        })
      );
    }
  }, [IdeaRatingReadListStore.data]);

  useEffect(() => {
    resetState();
  }, []);

  useEffect(() => {
    resetState();
  }, [id]);

  useEffect(() => {
    if (IdeaCommentCreateStore.data || IdeaRatingCreateStore.data) {
      resetState();
    }
  }, [IdeaCommentCreateStore.data, IdeaRatingCreateStore.data]);

  useEffect(() => {
    dispatch({ type: constant.IdeaCommentReadListStore.reset });
  }, [paginationComment.page]);

  useEffect(() => {
    setPaginationComment({ ...paginationComment, page: 1 });
    dispatch({ type: constant.IdeaCommentReadListStore.reset });
  }, [paginationComment.limit]);

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  const resetState = () => {
    resetComment();
    resetPaginationComment();
    dispatch({ type: constant.IdeaReadStore.reset });
    dispatch({ type: constant.IdeaRatingReadListStore.reset });
    dispatch({ type: constant.IdeaCommentCreateStore.reset });
    dispatch({ type: constant.IdeaCommentReadListStore.reset });
    dispatch({ type: constant.IdeaCommentDeleteStore.reset });
  };

  const CreateComment = () => {
    dispatch(
      action.IdeaComment.Create({
        idea_id: id,
        form: {
          comment: comment.comment,
        },
      })
    );
  };

  // @ts-ignore
  const CreateNotification = (form) => {
    dispatch(
      action.Notification.Create({
        form: {
          ...form,
          description: `${form.description}, причина: ${form.answer}`,
        },
      })
    );
  };

  // @ts-ignore
  const CreateRating = ({ value = 0 }) => {
    if (value < 4) {
      setModalLowRatingForm({
        question: "Введите причину низкой оценки?",
        answer: "Мне не понравилась идея!",
        value: value,
      });
      setIsModalLowRatingVisible(true);
    } else {
      dispatch(
        action.IdeaRating.Create({
          idea_id: id,
          form: {
            value: value,
          },
        })
      );
    }
  };

  // @ts-ignore
  const CreateLowLevelRating = (form) => {
    dispatch(
      action.IdeaRating.Create({
        idea_id: id,
        form: {
          value: `${form.value}`,
        },
      })
    );
    dispatch(
      action.IdeaComment.Create({
        idea_id: id,
        form: {
          comment: `${form.answer}`,
        },
      })
    );
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <modal.ModalPrompt2
        isModalVisible={isModalNotificationVisible}
        setIsModalVisible={setIsModalNotificationVisible}
        callback={CreateNotification}
        // @ts-ignore
        form={modalNotificationForm}
      />
      <modal.ModalPrompt2
        isModalVisible={isModalLowRatingVisible}
        setIsModalVisible={setIsModalLowRatingVisible}
        callback={CreateLowLevelRating}
        // @ts-ignore
        form={modalLowRatingForm}
      />
      <component.StoreComponent1
        stateConstant={constant.NotificationCreateStore}
        consoleLog={constant.DEBUG_CONSTANT}
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
        <Link
          to={"/idea/public/list"}
          className="btn btn-sm btn-primary m-1 p-2"
        >
          {"<="} назад к списку
        </Link>
        {IdeaReadStore.data && (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger m-1 p-2"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setModalNotificationForm({
                ...modalNotificationForm,
                question: "Введите причину жалобы на идею?",
                answer: "Идея неуместна!",
                name: "жалоба на идею в банке идей",
                place: "банк идей",
                description: `название идеи: ${IdeaReadStore.data["name_char_field"]}`,
              });
              setIsModalNotificationVisible(true);
            }}
          >
            <i className="fa-solid fa-skull-crossbones m-0 p-1" />
            жалоба на идею
          </button>
        )}
      </div>
      <component.StoreComponent1
        stateConstant={constant.IdeaReadStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showLoad={true}
        loadText={""}
        showData={false}
        dataText={""}
        showError={true}
        errorText={""}
        showFail={true}
        failText={""}
      />
      {IdeaReadStore.data && !IdeaReadStore.load && (
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
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
                      ? util.GetStaticFile(IdeaReadStore.data["image_field"])
                      : util.GetStaticFile(
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
                    minLength={1}
                    maxLength={300}
                  />
                </label>
              </div>
              <div className="m-0 p-0">
                <label className="form-control-sm text-center w-100 m-0 p-1">
                  Описание:
                  <textarea
                    className="form-control form-control-sm text-center m-0 p-1"
                    defaultValue={IdeaReadStore.data["description_text_field"]}
                    readOnly={true}
                    required
                    placeholder="введите описание тут..."
                    minLength={1}
                    maxLength={3000}
                    rows={3}
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
                    {util.GetCleanDateTime(
                      IdeaReadStore.data["created_datetime_field"],
                      true
                    )}
                  </p>
                </label>
                <label className="text-muted border m-1 p-2">
                  зарегистрировано:{" "}
                  <p className="m-0 p-0">
                    {util.GetCleanDateTime(
                      IdeaReadStore.data["register_datetime_field"],
                      true
                    )}
                  </p>
                </label>
              </div>
            </div>
            <div className="card-footer m-0 p-1">
              <component.StoreComponent1
                stateConstant={constant.IdeaRatingCreateStore}
                consoleLog={constant.DEBUG_CONSTANT}
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
                  <div className="m-0 p-0">
                    <small>Рейтинг / голоса</small>
                  </div>
                  <Container className="m-0 p-0">
                    <Nav className="me-auto dropdown m-0 p-0">
                      <NavDropdown
                        title={
                          util.GetSliceString(
                            IdeaReadStore.data["ratings"]["total_rate"],
                            3,
                            false
                          ) +
                          " /  " +
                          IdeaReadStore.data["ratings"]["count"]
                        }
                        className={
                          IdeaReadStore.data["ratings"]["total_rate"] > 7
                            ? IdeaReadStore.data["ratings"]["count"] > 0
                              ? "btn btn-sm bg-success bg-opacity-50 badge rounded-pill"
                              : "btn btn-sm bg-success bg-opacity-50 badge rounded-pill disabled"
                            : IdeaReadStore.data["ratings"]["total_rate"] > 4
                            ? IdeaReadStore.data["ratings"]["count"] > 0
                              ? "btn btn-sm bg-warning bg-opacity-50 badge rounded-pill"
                              : "btn btn-sm bg-warning bg-opacity-50 badge rounded-pill disabled"
                            : IdeaReadStore.data["ratings"]["count"] > 0
                            ? "btn btn-sm bg-danger bg-opacity-50 badge rounded-pill"
                            : "btn btn-sm bg-danger bg-opacity-50 badge rounded-pill disabled"
                        }
                      >
                        <ul className="m-0 p-0">
                          <component.StoreComponent1
                            stateConstant={constant.IdeaRatingReadListStore}
                            consoleLog={constant.DEBUG_CONSTANT}
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
                            IdeaRatingReadListStore.data.list.map(
                              // @ts-ignore
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
                {IdeaRatingReadListStore.data && (
                  <span className="m-0 p-1">
                    <div className="m-0 p-0">
                      Нажмите на одну из 10 звезд для оценки идеи:
                    </div>
                    <i
                      style={{
                        color:
                          IdeaRatingReadListStore.data["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaRatingReadListStore.data["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaRatingReadListStore.data["self_rate"] >= 1
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaRatingReadListStore.data["self_rate"] >= 0.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={() => CreateRating({ value: 1 })}
                    />
                    <i
                      style={{
                        color:
                          IdeaRatingReadListStore.data["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaRatingReadListStore.data["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaRatingReadListStore.data["self_rate"] >= 2
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaRatingReadListStore.data["self_rate"] >= 1.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={() => CreateRating({ value: 2 })}
                    />
                    <i
                      style={{
                        color:
                          IdeaRatingReadListStore.data["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaRatingReadListStore.data["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaRatingReadListStore.data["self_rate"] >= 3
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaRatingReadListStore.data["self_rate"] >= 2.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={() => CreateRating({ value: 3 })}
                    />
                    <i
                      style={{
                        color:
                          IdeaRatingReadListStore.data["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaRatingReadListStore.data["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaRatingReadListStore.data["self_rate"] >= 4
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaRatingReadListStore.data["self_rate"] >= 3.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={() => CreateRating({ value: 4 })}
                    />
                    <i
                      style={{
                        color:
                          IdeaRatingReadListStore.data["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaRatingReadListStore.data["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaRatingReadListStore.data["self_rate"] >= 5
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaRatingReadListStore.data["self_rate"] >= 4.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={() => CreateRating({ value: 5 })}
                    />
                    <i
                      style={{
                        color:
                          IdeaRatingReadListStore.data["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaRatingReadListStore.data["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaRatingReadListStore.data["self_rate"] >= 6
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaRatingReadListStore.data["self_rate"] >= 5.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={() => CreateRating({ value: 6 })}
                    />
                    <i
                      style={{
                        color:
                          IdeaRatingReadListStore.data["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaRatingReadListStore.data["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaRatingReadListStore.data["self_rate"] >= 7
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaRatingReadListStore.data["self_rate"] >= 6.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={() => CreateRating({ value: 7 })}
                    />
                    <i
                      style={{
                        color:
                          IdeaRatingReadListStore.data["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaRatingReadListStore.data["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaRatingReadListStore.data["self_rate"] >= 8
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaRatingReadListStore.data["self_rate"] >= 7.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={() => CreateRating({ value: 8 })}
                    />
                    <i
                      style={{
                        color:
                          IdeaRatingReadListStore.data["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaRatingReadListStore.data["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaRatingReadListStore.data["self_rate"] >= 9
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaRatingReadListStore.data["self_rate"] >= 8.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={() => CreateRating({ value: 9 })}
                    />
                    <i
                      style={{
                        color:
                          IdeaRatingReadListStore.data["self_rate"] > 7
                            ? "#00ff00"
                            : IdeaRatingReadListStore.data["self_rate"] > 4
                            ? "#ffaa00"
                            : "#ff0000",
                      }}
                      className={
                        IdeaRatingReadListStore.data["self_rate"] >= 10
                          ? "btn fas fa-star m-0 p-0"
                          : IdeaRatingReadListStore.data["self_rate"] >= 9.5
                          ? "btn fas fa-star-half-alt m-0 p-0"
                          : "btn far fa-star m-0 p-0"
                      }
                      onClick={() => CreateRating({ value: 10 })}
                    />
                    <div className="m-0 p-0">Ваша оценка</div>
                  </span>
                )}
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
              <component.StoreComponent1
                stateConstant={constant.IdeaCommentCreateStore}
                consoleLog={constant.DEBUG_CONSTANT}
                showLoad={true}
                loadText={""}
                showData={false}
                dataText={""}
                showError={true}
                errorText={""}
                showFail={true}
                failText={""}
              />
              <div className="card m-0 p-2">
                <div className="order-md-last m-0 p-0">
                  <div className="m-0 p-0 my-2">
                    <form
                      className="card"
                      onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        CreateComment();
                      }}
                    >
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control form-control-sm text-center m-0 p-1"
                          value={comment.comment}
                          required
                          placeholder="введите комментарий тут..."
                          minLength={1}
                          maxLength={300}
                          onChange={(e) =>
                            SetComment({
                              ...comment,
                              comment: e.target.value.replace(
                                util.GetRegexType({
                                  numbers: true,
                                  cyrillic: true,
                                  space: true,
                                  punctuationMarks: true,
                                }),
                                ""
                              ),
                            })
                          }
                        />
                        <button
                          type="submit"
                          className="btn btn-secondary"
                          style={{ zIndex: 0 }}
                        >
                          <i className="fa-solid fa-circle-check m-0 p-1" />
                          отправить
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card m-0 p-2">
                    <div className="order-md-last m-0 p-0">
                      {!IdeaCommentReadListStore.load &&
                      IdeaCommentReadListStore.data ? (
                        IdeaCommentReadListStore.data.list.length > 0 ? (
                          <ul className="list-group m-0 p-0">
                            <label className="form-control-sm text-center m-0 p-1">
                              Количество комментариев на странице:
                              <select
                                className="form-control form-control-sm text-center m-0 p-1"
                                value={paginationComment.limit}
                                onChange={(event) =>
                                  setPaginationComment({
                                    ...paginationComment,
                                    // @ts-ignore
                                    limit: event.target.value,
                                  })
                                }
                              >
                                <option disabled defaultValue={""} value="">
                                  количество на странице
                                </option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="30">30</option>
                                <option value="-1">все</option>
                              </select>
                            </label>
                            {!IdeaCommentReadListStore.load &&
                              IdeaCommentReadListStore.data && (
                                <paginator.Pagination1
                                  totalObjects={
                                    IdeaCommentReadListStore.data[
                                      "x-total-count"
                                    ]
                                  }
                                  limit={paginationComment.limit}
                                  page={paginationComment.page}
                                  // @ts-ignore
                                  changePage={(page) =>
                                    setPaginationComment({
                                      ...paginationComment,
                                      page: page,
                                    })
                                  }
                                />
                              )}
                            {!IdeaCommentReadListStore.load &&
                              IdeaCommentReadListStore.data &&
                              IdeaCommentReadListStore.data.list.map(
                                // @ts-ignore
                                (object, index) => (
                                  <li
                                    className="list-group-item m-0 p-1"
                                    key={index}
                                  >
                                    <div className="d-flex justify-content-between m-0 p-0">
                                      <h6 className="btn btn-sm btn-outline-warning m-0 p-2">
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
                                        {util.GetCleanDateTime(
                                          object["created_datetime_field"],
                                          true
                                        )}
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-outline-danger m-1 p-0"
                                          onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            setModalNotificationForm({
                                              ...modalNotificationForm,
                                              question:
                                                "Введите причину жалобы на комментарий?",
                                              answer: "Нецензурная лексика!",
                                              name: "жалоба на комментарий в банке идей",
                                              place: "банк идей",
                                              description: `название идеи: ${
                                                IdeaReadStore.data[
                                                  "name_char_field"
                                                ]
                                              } (${
                                                IdeaReadStore.data[
                                                  "user_model"
                                                ]["last_name_char_field"]
                                              } ${
                                                IdeaReadStore.data[
                                                  "user_model"
                                                ]["first_name_char_field"]
                                              }), комментарий: ${util.GetCleanDateTime(
                                                object[
                                                  "created_datetime_field"
                                                ],
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
                                            });
                                            setIsModalNotificationVisible(true);
                                          }}
                                          // onClick={(event) =>
                                          //   ShowNotificationModal(event, {
                                          //     question:
                                          //       "Введите причину жалобы на комментарий?",
                                          //     answer: "Не цензурная лексика!",
                                          //     name: "жалоба на комментарий в банке идей",
                                          //     place: "банк идей",
                                          //     description: `название идеи: ${
                                          //       IdeaReadStore.data[
                                          //         "name_char_field"
                                          //       ]
                                          //     } (${
                                          //       IdeaReadStore.data[
                                          //         "user_model"
                                          //       ]["last_name_char_field"]
                                          //     } ${
                                          //       IdeaReadStore.data[
                                          //         "user_model"
                                          //       ]["first_name_char_field"]
                                          //     }), комментарий: ${util.GetCleanDateTime(
                                          //       object[
                                          //         "created_datetime_field"
                                          //       ],
                                          //       true
                                          //     )} (${
                                          //       object["user_model"][
                                          //         "last_name_char_field"
                                          //       ]
                                          //     } ${
                                          //       object["user_model"][
                                          //         "first_name_char_field"
                                          //       ]
                                          //     })`,
                                          //   })
                                          // }
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
                            {!IdeaCommentReadListStore.load &&
                              IdeaCommentReadListStore.data && (
                                <paginator.Pagination1
                                  totalObjects={
                                    IdeaCommentReadListStore.data[
                                      "x-total-count"
                                    ]
                                  }
                                  limit={paginationComment.limit}
                                  page={paginationComment.page}
                                  // @ts-ignore
                                  changePage={(page) =>
                                    setPaginationComment({
                                      ...paginationComment,
                                      page: page,
                                    })
                                  }
                                />
                              )}
                          </ul>
                        ) : (
                          <message.Message.Secondary>
                            Комментарии не найдены!
                          </message.Message.Secondary>
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
      )}
    </base.Base1>
  );
};
