// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { FormEvent, MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constant from "../../components/constant";
import * as hook from "../../components/hook";
import * as util from "../../components/util";
import * as slice from "../../components/slice";

import * as component from "../../components/ui/component";
import * as base from "../../components/ui/base";
import * as modal from "../../components/ui/modal";
import * as paginator from "../../components/ui/paginator";
import * as message from "../../components/ui/message";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export function IdeaModeratePage(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const ideaReadStore = hook.useSelectorCustom2(slice.idea.ideaReadStore);
  const ideaUpdateStore = hook.useSelectorCustom2(slice.idea.ideaUpdateStore);
  const ideaCommentReadListStore = hook.useSelectorCustom2(
    slice.ideaComment.ideaCommentReadListStore
  );
  const ideaCommentDeleteStore = hook.useSelectorCustom2(
    slice.ideaComment.ideaCommentDeleteStore
  );
  const userDetailStore = hook.useSelectorCustom2(slice.user.userDetailStore);

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;

  const [ideaUpdateObject, setIdeaUpdateObject, resetIdeaUpdateObject] =
    hook.useStateCustom1({
      subdivision: "",
      sphere: "",
      category: "",
      avatar: null,
      clearImage: false,
      name: "",
      place: "",
      description: "",
    });

  const [ideaModerateObject, setIdeaModerateObject, resetIdeaModerateObject] =
    hook.useStateCustom1({
      moderate: "",
      moderateComment: "",
    });

  const [
    paginationIdeaCommentListObject,
    setPaginationIdeaCommentListObject,
    resetPaginationIdeaCommentListObject,
  ] = hook.useStateCustom1({
    page: 1,
    limit: 5,
  });

  const [isModalConfirmIdeaUpdateVisible, setIsModalConfirmIdeaUpdateVisible] =
    useState(false);

  const [
    isModalConfirmIdeaModerateVisible,
    setIsModalConfirmIdeaModerateVisible,
  ] = useState(false);

  const [
    isModalConfirmIdeaCommentDeleteVisible,
    setIsModalConfirmIdeaCommentDeleteVisible,
  ] = useState(false);
  const [
    modalConfirmIdeaCommentDeleteCallback,
    setModalConfirmIdeaCommentDeleteCallback,
  ] = useState({});

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!ideaReadStore.data) {
      dispatch(slice.idea.ideaReadStore.action({ idea_id: Number(id) }));
    }
  }, [ideaReadStore.data]);

  useEffect(() => {
    if (!ideaCommentReadListStore.data) {
      dispatch(
        slice.ideaComment.ideaCommentReadListStore.action({
          idea_id: Number(id),
        })
      );
    }
  }, [ideaCommentReadListStore.data]);

  useEffect(() => {
    resetIdea();
  }, []);

  useEffect(() => {
    resetIdea();
  }, [id]);

  useEffect(() => {
    if (ideaUpdateStore.data || ideaCommentDeleteStore.data) {
      resetIdea();
    }
  }, [ideaUpdateStore.data, ideaCommentDeleteStore.data]);

  useEffect(() => {
    dispatch({
      type: slice.ideaComment.ideaCommentReadListStore.constant.reset,
    });
  }, [paginationIdeaCommentListObject.page]);

  useEffect(() => {
    setPaginationIdeaCommentListObject({
      ...paginationIdeaCommentListObject,
      page: 1,
    });
    dispatch({
      type: slice.ideaComment.ideaCommentReadListStore.constant.reset,
    });
  }, [paginationIdeaCommentListObject.limit]);

  useEffect(() => {
    if (ideaReadStore.data) {
      setIdeaUpdateObject({
        ...ideaUpdateObject,
        subdivision: ideaReadStore.data["subdivision"],
        sphere: ideaReadStore.data["sphere"],
        category: ideaReadStore.data["category"],
        name: ideaReadStore.data["name"],
        place: ideaReadStore.data["place"],
        description: ideaReadStore.data["description"],
      });
    }
  }, [ideaReadStore.data]);

  useEffect(() => {
    if (userDetailStore.data) {
      if (!util.CheckAccess(userDetailStore, "moderator_idea")) {
        navigate("/idea/public/list");
      }
    }
  }, [userDetailStore.data]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  function resetIdea() {
    resetIdeaUpdateObject();
    resetIdeaModerateObject();
    resetPaginationIdeaCommentListObject();
    dispatch({ type: slice.idea.ideaReadStore.constant.reset });
    dispatch({ type: slice.idea.ideaUpdateStore.constant.reset });
    dispatch({
      type: slice.ideaComment.ideaCommentReadListStore.constant.reset,
    });
    dispatch({ type: slice.ideaComment.ideaCommentDeleteStore.constant.reset });
  }

  function ModerateIdea() {
    dispatch(
      slice.idea.ideaUpdateStore.action({
        idea_id: Number(id),
        form: { ...ideaModerateObject },
      })
    );
  }

  function FormIdeaModerateSubmit(event: FormEvent<HTMLFormElement>) {
    util.EventForm1(event, true, true, () => {
      setIsModalConfirmIdeaModerateVisible(true);
    });
  }

  function UpdateIdea() {
    dispatch(
      slice.idea.ideaUpdateStore.action({
        idea_id: Number(id),
        form: { ...ideaUpdateObject },
      })
    );
  }

  function FormIdeaUpdateSubmit(event: FormEvent<HTMLFormElement>) {
    util.EventForm1(event, true, true, () => {
      setIsModalConfirmIdeaUpdateVisible(true);
    });
  }

  function FormIdeaUpdateReset(event: FormEvent<HTMLFormElement>) {
    util.EventForm1(event, false, true, () => {
      resetIdea();
    });
  }

  function DeleteComment(comment_id = 0) {
    dispatch(
      slice.ideaComment.ideaCommentDeleteStore.action({
        comment_id: Number(comment_id),
      })
    );
  }

  function ButtonDeleteComment(
    event: MouseEvent<HTMLButtonElement>,
    comment_id: number
  ) {
    setModalConfirmIdeaCommentDeleteCallback({
      callback: () => {
        DeleteComment(comment_id);
      },
    });
    setIsModalConfirmIdeaCommentDeleteVisible(true);
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <modal.ModalConfirm1
        isModalVisible={isModalConfirmIdeaModerateVisible}
        setIsModalVisible={setIsModalConfirmIdeaModerateVisible}
        description={"Изменить статус?"}
        callback={ModerateIdea}
      />
      <modal.ModalConfirm1
        isModalVisible={isModalConfirmIdeaUpdateVisible}
        setIsModalVisible={setIsModalConfirmIdeaUpdateVisible}
        description={"Заменить данные?"}
        callback={UpdateIdea}
      />
      <modal.ModalConfirm1
        isModalVisible={isModalConfirmIdeaCommentDeleteVisible}
        setIsModalVisible={setIsModalConfirmIdeaCommentDeleteVisible}
        description={"Удалить выбранный комментарий?"}
        // @ts-ignore
        callback={modalConfirmIdeaCommentDeleteCallback["callback"]}
      />
      <div className="btn-group m-0 p-1 text-start w-100">
        <Link
          to={"/idea/moderate/list"}
          className="btn btn-sm btn-primary m-1 p-2"
        >
          {"<="} назад к списку
        </Link>
      </div>
      <component.Accordion1
        key_target={"accordion1"}
        isCollapse={false}
        title={"Модерация:"}
        text_style="text-danger"
        header_style="bg-danger bg-opacity-10 custom-background-transparent-low"
        body_style="bg-light bg-opacity-10 custom-background-transparent-low"
      >
        {
          <ul className="row-cols-auto row-cols-sm-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center m-0 p-0">
            <form
              className="m-0 p-0"
              onSubmit={(event) => {
                FormIdeaModerateSubmit(event);
              }}
            >
              <div className="card shadow custom-background-transparent-hard m-0 p-0">
                <div className="card-header m-0 p-0">
                  <div className="d-flex justify-content-center input-group text-center">
                    <label className="form-control-sm text-center m-0 p-1">
                      Заключение:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={ideaModerateObject.moderate}
                        required
                        onChange={(event) =>
                          setIdeaModerateObject({
                            ...ideaModerateObject,
                            moderate: event.target.value,
                          })
                        }
                      >
                        <option value="">не выбрано</option>
                        <option value="на модерации">на модерации</option>
                        <option value="на доработку">на доработку</option>
                        <option value="скрыто">скрыто</option>
                        <option value="принято">принято</option>
                      </select>
                    </label>
                    <button
                      className="btn btn-sm btn-danger m-1 p-2 custom-z-index-0"
                      type="submit"
                    >
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      вынести заключение
                    </button>
                  </div>
                </div>
                <div className="card-body m-0 p-0">
                  {ideaModerateObject.moderate === "на доработку" && (
                    <label className="w-75 form-control-sm">
                      Комментарий:
                      <input
                        type="text"
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={ideaModerateObject.moderateComment}
                        required
                        placeholder="вводите комментарий тут..."
                        minLength={1}
                        maxLength={300}
                        onChange={(event) =>
                          setIdeaModerateObject({
                            ...ideaModerateObject,
                            moderateComment: event.target.value.replace(
                              util.RegularExpression.GetRegexType({
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
                      <small className="custom-color-warning-1 m-0 p-0">
                        * только кириллица
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: не более 300 символов
                        </small>
                      </small>
                    </label>
                  )}
                </div>
              </div>
            </form>
          </ul>
        }
      </component.Accordion1>
      <component.StatusStore1
        slice={slice.idea.ideaReadStore}
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
      <component.StatusStore1
        slice={slice.idea.ideaUpdateStore}
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
      {ideaReadStore.data && (
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form
            className="m-0 p-0"
            onSubmit={(event) => {
              FormIdeaUpdateSubmit(event);
            }}
            onReset={(event) => {
              FormIdeaUpdateReset(event);
            }}
          >
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              <div className="card-header bg-success bg-opacity-10 m-0 p-3">
                <h6 className="lead fw-bold m-0 p-0">
                  {ideaReadStore.data["name"]}
                </h6>
                <h6 className="text-danger lead small m-0 p-0">
                  {" [ "}
                  {util.GetSliceString(
                    ideaReadStore.data["moderate_status"],
                    30
                  )}
                  {" : "}
                  {util.GetSliceString(
                    ideaReadStore.data["moderate_comment"],
                    30
                  )}
                  {" ]"}
                </h6>
              </div>
              <div className="card-body m-0 p-0">
                <div className="m-0 p-0">
                  <label className="form-control-sm text-center w-75 m-0 p-1">
                    Название идеи:
                    <input
                      type="text"
                      className="form-control form-control-sm text-center m-0 p-1"
                      placeholder="введите название тут..."
                      minLength={1}
                      maxLength={200}
                      value={ideaUpdateObject.name}
                      required
                      onChange={(event) =>
                        setIdeaUpdateObject({
                          ...ideaUpdateObject,
                          name: event.target.value.replace(
                            util.RegularExpression.GetRegexType({
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
                    <small className="custom-color-warning-1 m-0 p-0">
                      * только кириллица
                      <small className="text-muted m-0 p-0">
                        {" "}
                        * длина: не более 200 символов
                      </small>
                    </small>
                  </label>
                </div>
                <div className="m-0 p-0">
                  <label className="form-control-sm text-center m-0 p-1">
                    Подразделение:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={ideaUpdateObject.subdivision}
                      required
                      onChange={(event) =>
                        setIdeaUpdateObject({
                          ...ideaUpdateObject,
                          subdivision: event.target.value,
                        })
                      }
                    >
                      <option className="m-0 p-0" value="">
                        не указано
                      </option>
                      <option
                        className="m-0 p-0"
                        value="автотранспортное предприятие"
                      >
                        автотранспортное предприятие
                      </option>
                      <option
                        className="m-0 p-0"
                        value="горно-транспортный комплекс"
                      >
                        горно-транспортный комплекс
                      </option>
                      <option
                        className="m-0 p-0"
                        value="обогатительный комплекс"
                      >
                        обогатительный комплекс
                      </option>
                      <option
                        className="m-0 p-0"
                        value="управление предприятия"
                      >
                        управление предприятия
                      </option>
                      <option className="m-0 p-0" value="энергоуправление">
                        энергоуправление
                      </option>
                    </select>
                  </label>
                  <label className="w-50 form-control-sm m-0 p-1">
                    Место, где будет применена идея:
                    <input
                      type="text"
                      className="form-control form-control-sm text-center m-0 p-1"
                      placeholder="введите место тут..."
                      minLength={1}
                      maxLength={100}
                      value={ideaUpdateObject.place}
                      required
                      onChange={(event) =>
                        setIdeaUpdateObject({
                          ...ideaUpdateObject,
                          place: event.target.value.replace(
                            util.RegularExpression.GetRegexType({
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
                    <small className="custom-color-warning-1 m-0 p-0">
                      * только кириллица
                      <small className="text-muted m-0 p-0">
                        {" "}
                        * длина: не более 100 символов
                      </small>
                    </small>
                  </label>
                </div>
                <div className="m-0 p-0">
                  <label className="form-control-sm text-center m-0 p-1">
                    Сфера:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={ideaUpdateObject.sphere}
                      required
                      onChange={(event) =>
                        setIdeaUpdateObject({
                          ...ideaUpdateObject,
                          sphere: event.target.value,
                        })
                      }
                    >
                      <option className="m-0 p-0" value="">
                        не указано
                      </option>
                      <option className="m-0 p-0" value="технологическая">
                        технологическая
                      </option>
                      <option className="m-0 p-0" value="не технологическая">
                        не технологическая
                      </option>
                    </select>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Категория:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={ideaUpdateObject.category}
                      required
                      onChange={(event) =>
                        setIdeaUpdateObject({
                          ...ideaUpdateObject,
                          category: event.target.value,
                        })
                      }
                    >
                      <option className="m-0 p-0" value="">
                        не указано
                      </option>
                      <option className="m-0 p-0" value="индустрия 4.0">
                        индустрия 4.0
                      </option>
                      <option className="m-0 p-0" value="инвестиции">
                        инвестиции
                      </option>
                      <option className="m-0 p-0" value="инновации">
                        инновации
                      </option>
                      <option className="m-0 p-0" value="модернизация">
                        модернизация
                      </option>
                      <option className="m-0 p-0" value="экология">
                        экология
                      </option>
                      <option className="m-0 p-0" value="спорт/культура">
                        спорт/культура
                      </option>
                      <option className="m-0 p-0" value="социальное/персонал">
                        социальное/персонал
                      </option>
                      <option className="m-0 p-0" value="другое">
                        другое
                      </option>
                    </select>
                  </label>
                </div>
                <div className="m-0 p-0">
                  <img
                    src={util.GetStaticFile(ideaReadStore.data["image"])}
                    className="card-img-top img-fluid w-25 m-0 p-1"
                    alt="изображение отсутствует"
                  />
                  <label className="form-control-sm form-switch text-center m-0 p-1">
                    Удалить текущее изображение:
                    <input
                      type="checkbox"
                      className="form-check-input m-0 p-1"
                      id="flexSwitchCheckDefault"
                      defaultChecked={ideaUpdateObject.clearImage}
                      value={ideaUpdateObject.clearImage}
                      onChange={() =>
                        setIdeaUpdateObject({
                          ...ideaUpdateObject,
                          clearImage: !ideaUpdateObject.clearImage,
                        })
                      }
                    />
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Аватарка-заставка для идеи:
                    <input
                      type="file"
                      className="form-control form-control-sm text-center m-0 p-1"
                      accept=".jpg, .png"
                      onChange={(event) =>
                        setIdeaUpdateObject({
                          ...ideaUpdateObject,
                          // @ts-ignore
                          avatar: event.target.files[0],
                        })
                      }
                    />
                    <small className="text-muted m-0 p-0">
                      * не обязательно
                    </small>
                  </label>
                </div>
                <div className="m-0 p-0">
                  <label className="w-100 form-control-sm m-0 p-1">
                    Описание идеи:
                    <textarea
                      className="form-control form-control-sm text-center m-0 p-1"
                      placeholder="введите описание тут..."
                      minLength={1}
                      maxLength={3000}
                      rows={3}
                      value={ideaUpdateObject.description}
                      required
                      onChange={(event) =>
                        setIdeaUpdateObject({
                          ...ideaUpdateObject,
                          description: event.target.value.replace(
                            util.RegularExpression.GetRegexType({
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
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: не более 3000 символов
                    </small>
                  </label>
                </div>
                <div className="m-0 p-0">
                  <Link to={`#`} className="btn btn-sm btn-warning m-0 p-2">
                    Автор: {ideaReadStore.data["author"]["last_name"]}{" "}
                    {ideaReadStore.data["author"]["first_name"]}{" "}
                    {ideaReadStore.data["author"]["position"]}
                  </Link>
                </div>
                <div className="d-flex justify-content-between m-0 p-1">
                  <label className="text-muted border p-1 m-0 p-1">
                    подано:{" "}
                    <p className="m-0 p-0">
                      {util.GetCleanDateTime(
                        ideaReadStore.data["created"],
                        true
                      )}
                    </p>
                  </label>
                  <label className="text-muted border p-1 m-0 p-1">
                    зарегистрировано:{" "}
                    <p className="m-0 p-0">
                      {util.GetCleanDateTime(
                        ideaReadStore.data["updated"],
                        true
                      )}
                    </p>
                  </label>
                </div>
              </div>
              <div className="card-footer m-0 p-0">
                <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                  <button
                    className="btn btn-sm btn-primary m-1 p-2 custom-z-index-0"
                    type="submit"
                  >
                    <i className="fa-solid fa-circle-check m-0 p-1" />
                    заменить
                  </button>
                  <button
                    className="btn btn-sm btn-warning m-1 p-2"
                    type="reset"
                  >
                    <i className="fa-solid fa-pen-nib m-0 p-1" />
                    сбросить
                  </button>
                </ul>
              </div>
              <div className="card-footer m-0 p-0">
                <component.StatusStore1
                  slice={slice.ideaComment.ideaCommentReadListStore}
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
                <component.StatusStore1
                  slice={slice.ideaComment.ideaCommentDeleteStore}
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
                    {!ideaCommentReadListStore.load &&
                    ideaCommentReadListStore.data ? (
                      ideaCommentReadListStore.data.list.length > 0 ? (
                        <ul className="list-group m-0 p-0">
                          <label className="form-control-sm text-center m-0 p-1">
                            Количество комментариев на странице:
                            <select
                              className="form-control form-control-sm text-center m-0 p-1"
                              value={paginationIdeaCommentListObject.limit}
                              onChange={(event) =>
                                setPaginationIdeaCommentListObject({
                                  ...paginationIdeaCommentListObject,
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
                          {!ideaCommentReadListStore.load &&
                            ideaCommentReadListStore.data && (
                              <paginator.Pagination1
                                totalObjects={
                                  ideaCommentReadListStore.data["x-total-count"]
                                }
                                limit={paginationIdeaCommentListObject.limit}
                                page={paginationIdeaCommentListObject.page}
                                // @ts-ignore
                                changePage={(page) =>
                                  setPaginationIdeaCommentListObject({
                                    ...paginationIdeaCommentListObject,
                                    page: page,
                                  })
                                }
                              />
                            )}
                          {!ideaCommentReadListStore.load &&
                            ideaCommentReadListStore.data &&
                            ideaCommentReadListStore.data.list.map(
                              // @ts-ignore
                              (object, index) => (
                                <li
                                  className="list-group-item m-0 p-1"
                                  key={index}
                                >
                                  <div className="d-flex justify-content-between m-0 p-0">
                                    <h6 className="btn btn-sm btn-outline-warning m-0 p-2">
                                      {object["author"]["last_name"]}{" "}
                                      {object["author"]["first_name"]}
                                    </h6>
                                    <span className="text-muted m-0 p-0">
                                      {util.GetCleanDateTime(
                                        object["created"],
                                        true
                                      )}
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger m-1 p-0"
                                        onClick={(event) =>
                                          ButtonDeleteComment(
                                            event,
                                            Number(object.id)
                                          )
                                        }
                                      >
                                        <i className="fa-solid fa-skull-crossbones m-0 p-1" />
                                        удалить комментарий
                                      </button>
                                    </span>
                                  </div>
                                  <div className="d-flex justify-content-center m-0 p-1">
                                    <small className="text-muted m-0 p-1">
                                      {object["comment"]}
                                    </small>
                                  </div>
                                </li>
                              )
                            )}
                          {!ideaCommentReadListStore.load &&
                            ideaCommentReadListStore.data && (
                              <paginator.Pagination1
                                totalObjects={
                                  ideaCommentReadListStore.data["x-total-count"]
                                }
                                limit={paginationIdeaCommentListObject.limit}
                                page={paginationIdeaCommentListObject.page}
                                // @ts-ignore
                                changePage={(page) =>
                                  setPaginationIdeaCommentListObject({
                                    ...paginationIdeaCommentListObject,
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
          </form>
        </ul>
      )}
    </base.Base1>
  );
}
