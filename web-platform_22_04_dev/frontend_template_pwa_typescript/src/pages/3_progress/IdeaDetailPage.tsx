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
import * as select from "../../components/ui/select";
import * as paginator from "../../components/ui/paginator";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IdeaDetailPage = () => {
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

  const [modalNotificationForm, setModalNotificationForm] = useState({});
  const [isModalNotificationVisible, setIsModalNotificationVisible] =
    useState(false);

  const [modalLowRatingForm, setModalLowRatingForm] = useState({});
  const [isModalLowRatingVisible, setIsModalLowRatingVisible] = useState(false);

  const [comment, commentSet] = useState("");

  const [paginationComment, setPaginationComment, resetPaginationComment] =
    hook.useStateCustom1({ page: 1, limit: 10 });

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!IdeaReadStore.data) {
      dispatch(action.Idea.IdeaReadAction({ id: id }));
    }
  }, [IdeaReadStore.data]);

  useEffect(() => {
    if (!IdeaCommentReadListStore.data) {
      dispatch(
        action.IdeaComment.ReadListAction({ id: id, ...paginationComment })
      );
    }
  }, [IdeaCommentReadListStore.data]);

  useEffect(() => {
    if (!IdeaRatingReadListStore.data) {
      dispatch(
        action.IdeaRating.ReadListAction({ id: id, limit: 100, page: 1 })
      );
    }
  }, [IdeaRatingReadListStore.data]);

  useEffect(() => {
    resetPaginationComment();
    dispatch({ type: constant.IdeaReadStore.reset });
    dispatch({ type: constant.IdeaCommentReadListStore.reset });
    dispatch({ type: constant.IdeaRatingReadListStore.reset });
  }, [id]);

  useEffect(() => {
    dispatch({ type: constant.IdeaCommentReadListStore.reset });
  }, [paginationComment.page]);

  useEffect(() => {
    setPaginationComment({ ...paginationComment, page: 1 });
    dispatch({ type: constant.IdeaCommentReadListStore.reset });
  }, [paginationComment.limit]);

  useEffect(() => {
    if (IdeaCommentCreateStore.data || IdeaRatingCreateStore.data) {
      dispatch({ type: constant.IdeaReadStore.reset });
      dispatch({ type: constant.IdeaCommentReadListStore.reset });
      dispatch({ type: constant.IdeaRatingReadListStore.reset });
    }
  }, [IdeaCommentCreateStore.data, IdeaRatingCreateStore.data]);

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  // @ts-ignore
  const handlerCommentCreateSubmit = async (event) => {
    try {
      event.preventDefault();
    } catch (error) {}
    dispatch(
      action.IdeaComment.CreateAction({
        id: id,
        form: {
          comment: comment,
        },
      })
    );
    commentSet("");
  };

  // @ts-ignore
  const ShowNotificationModal = async (event, form) => {
    event.preventDefault();
    setModalNotificationForm(form);
    setIsModalNotificationVisible(true);
  };

  // @ts-ignore
  const CreateNotification = (form) => {
    if (form) {
      dispatch(
        action.Notification.CreateAction({
          form: {
            ...form,
            description: `${form.description}, причина:${form.answer}`,
          },
        })
      );
      setIsModalLowRatingVisible(false);
    } else {
      setIsModalLowRatingVisible(false);
    }
  };

  // @ts-ignore
  const handlerRatingCreateSubmit = async (value) => {
    if (value < 4) {
      ShowLowRatingModal({
        question: "Введите причину низкой оценки?",
        answer: "Мне не понравилась идея!",
        value: value,
      });
    } else {
      dispatch(
        action.IdeaRating.CreateAction({
          id: id,
          form: {
            value: value,
          },
        })
      );
    }
  };

  // @ts-ignore
  const ShowLowRatingModal = (form) => {
    setModalLowRatingForm(form);
    setIsModalLowRatingVisible(true);
  };

  // @ts-ignore
  const CreateLowLevelRating = (form) => {
    if (form) {
      dispatch(
        action.IdeaRating.CreateAction({
          id: id,
          form: {
            value: `${form.value}`,
          },
        })
      );
      dispatch(
        action.IdeaComment.CreateAction({
          id: id,
          form: {
            comment: `${form.answer}`,
          },
        })
      );
      setIsModalLowRatingVisible(false);
    } else {
      setIsModalLowRatingVisible(false);
    }
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
        showData={true}
        dataText={""}
        showError={true}
        errorText={""}
        showFail={true}
        failText={""}
      />
      <div className="btn-group text-start w-100 m-0 p-0">
        <Link to={"/idea/list"} className="btn btn-sm btn-primary m-1 p-2">
          {"<="} назад к списку
        </Link>
        {IdeaReadStore.data && (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger m-1 p-2"
            onClick={(event) =>
              ShowNotificationModal(event, {
                question: "Введите причину жалобы на идею?",
                answer: "Идея неуместна!",
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
                      defaultValue={
                        IdeaReadStore.data["description_text_field"]
                      }
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
                              IdeaRatingReadListStore.data.list.length > 0 &&
                              IdeaRatingReadListStore.data["list"].map(
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
                        onClick={() => handlerRatingCreateSubmit(1)}
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
                        onClick={() => handlerRatingCreateSubmit(2)}
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
                        onClick={() => handlerRatingCreateSubmit(3)}
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
                        onClick={() => handlerRatingCreateSubmit(4)}
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
                        onClick={() => handlerRatingCreateSubmit(5)}
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
                        onClick={() => handlerRatingCreateSubmit(6)}
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
                        onClick={() => handlerRatingCreateSubmit(7)}
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
                        onClick={() => handlerRatingCreateSubmit(8)}
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
                        onClick={() => handlerRatingCreateSubmit(9)}
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
                        onClick={() => handlerRatingCreateSubmit(10)}
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
                <div className="card m-0 p-2">
                  <div className="order-md-last m-0 p-0">
                    <div className="m-0 p-0 my-2">
                      <component.StoreComponent1
                        stateConstant={constant.IdeaCommentCreateStore}
                        consoleLog={constant.DEBUG_CONSTANT}
                        showLoad={true}
                        loadText={""}
                        showData={true}
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
                            minLength={1}
                            maxLength={300}
                            onChange={(e) =>
                              commentSet(
                                e.target.value.replace(
                                  util.GetRegexType({
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
                    {!IdeaCommentReadListStore.load &&
                      IdeaCommentReadListStore.data && (
                        <select.Select1
                          value={paginationComment.limit}
                          // @ts-ignore
                          onChange={(event) =>
                            setPaginationComment({
                              ...paginationComment,
                              limit: event.target.value,
                            })
                          }
                          options={[
                            {
                              value: "10",
                              name: "по 10 комментариев на странице",
                            },
                            {
                              value: "20",
                              name: "по 20 комментариев на странице",
                            },
                            {
                              value: "30",
                              name: "по 30 комментариев на странице",
                            },
                            {
                              value: "100",
                              name: "по 100 комментариев на странице",
                            },
                          ]}
                          useDefaultSelect={false}
                          defaultSelect={{
                            value: `${paginationComment.limit}`,
                            name: "количество комментариев",
                          }}
                        />
                      )}
                    {IdeaCommentReadListStore.data &&
                    IdeaCommentReadListStore.data.list.length < 1 ? (
                      <div className="my-1">
                        <component.MessageComponent variant={"warning"}>
                          Комментарии не найдены!
                        </component.MessageComponent>
                      </div>
                    ) : (
                      <ul className="list-group m-0 p-0">
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
                        <component.StoreComponent1
                          stateConstant={constant.IdeaCommentReadListStore}
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
                        {!IdeaCommentReadListStore.load &&
                          IdeaCommentReadListStore.data && (
                            <paginator.Pagination1
                              totalObjects={
                                IdeaCommentReadListStore.data["x-total-count"]
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
                                      onClick={(event) =>
                                        ShowNotificationModal(event, {
                                          question:
                                            "Введите причину жалобы на комментарий?",
                                          answer: "Не цензурная лексика!",
                                          name: "жалоба на комментарий в банке идей",
                                          place: "банк идей",
                                          description: `название идеи: ${
                                            IdeaReadStore.data[
                                              "name_char_field"
                                            ]
                                          } (${
                                            IdeaReadStore.data["user_model"][
                                              "last_name_char_field"
                                            ]
                                          } ${
                                            IdeaReadStore.data["user_model"][
                                              "first_name_char_field"
                                            ]
                                          }), комментарий: ${util.GetCleanDateTime(
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
                        {!IdeaCommentReadListStore.load &&
                          IdeaCommentReadListStore.data && (
                            <paginator.Pagination1
                              totalObjects={
                                IdeaCommentReadListStore.data["x-total-count"]
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </base.Base1>
  );
};
