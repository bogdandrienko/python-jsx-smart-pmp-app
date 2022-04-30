// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as action from "../../components/action";
import * as constant from "../../components/constant";
import * as hook from "../../components/hook";
import * as util from "../../components/util";

import * as component from "../../components/ui/component";
import * as base from "../../components/ui/base";
import * as modal from "../../components/ui/modal";
import * as paginator from "../../components/ui/paginator";
import * as message from "../../components/ui/message";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export function IdeaModeratePage(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const IdeaReadStore = hook.useSelectorCustom1(constant.IdeaReadStore);
  const IdeaUpdateStore = hook.useSelectorCustom1(constant.IdeaUpdateStore);
  const IdeaCommentReadListStore = hook.useSelectorCustom1(
    constant.IdeaCommentReadListStore
  );
  const IdeaCommentDeleteStore = hook.useSelectorCustom1(
    constant.IdeaCommentDeleteStore
  );

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const id = useParams().id;

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });

  const [idea, setIdea, resetIdea] = hook.useStateCustom1({
    subdivision: "",
    sphere: "",
    category: "",
    avatar: null,
    clearImage: false,
    name: "",
    place: "",
    description: "",
  });

  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

  const [moderate, setModerate, resetModerate] = hook.useStateCustom1({
    moderate: "",
    moderateComment: "",
  });

  const [isModalModerateVisible, setIsModalModerateVisible] = useState(false);

  const [isModalCommentDeleteVisible, setIsModalCommentDeleteVisible] =
    useState(false);
  const [modalCommentDeleteForm, setModalCommentDeleteForm] = useState({});

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!IdeaReadStore.data) {
      dispatch(action.Idea.Read(Number(id)));
    } else {
      setIdea({
        subdivision: IdeaReadStore.data["subdivision_char_field"],
        sphere: IdeaReadStore.data["sphere_char_field"],
        category: IdeaReadStore.data["category_char_field"],
        name: IdeaReadStore.data["name_char_field"],
        place: IdeaReadStore.data["place_char_field"],
        description: IdeaReadStore.data["description_text_field"],
      });
    }
  }, [IdeaReadStore.data]);

  useEffect(() => {
    if (!IdeaCommentReadListStore.data) {
      dispatch(action.IdeaComment.ReadList(Number(id), { ...pagination }));
    }
  }, [IdeaCommentReadListStore.data]);

  useEffect(() => {
    resetState();
  }, []);

  useEffect(() => {
    resetState();
  }, [id]);

  useEffect(() => {
    if (IdeaUpdateStore.data || IdeaCommentDeleteStore.data) {
      resetState();
    }
  }, [IdeaUpdateStore.data, IdeaCommentDeleteStore.data]);

  useEffect(() => {
    dispatch({ type: constant.IdeaCommentReadListStore.reset });
  }, [pagination.page]);

  useEffect(() => {
    setPagination({ ...pagination, page: 1 });
    dispatch({ type: constant.IdeaCommentReadListStore.reset });
  }, [pagination.limit]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  const resetState = () => {
    resetIdea();
    resetModerate();
    dispatch({ type: constant.IdeaReadStore.reset });
    dispatch({ type: constant.IdeaCommentReadListStore.reset });
    dispatch({ type: constant.IdeaUpdateStore.reset });
    dispatch({ type: constant.IdeaCommentDeleteStore.reset });
  };

  const UpdateIdea = () => {
    dispatch(action.Idea.Update(Number(id), { ...idea }));
  };

  const ModerateIdea = () => {
    dispatch(action.Idea.Update(Number(id), { ...moderate }));
  };

  const DeleteComment = ({ comment_id = 0 }) => {
    dispatch(action.IdeaComment.Delete(comment_id));
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
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
                event.preventDefault();
                event.stopPropagation();
                setIsModalModerateVisible(true);
              }}
            >
              <modal.ModalConfirm2
                isModalVisible={isModalModerateVisible}
                setIsModalVisible={setIsModalModerateVisible}
                description={"Изменить статус?"}
                callback={ModerateIdea}
              />
              <div className="card shadow custom-background-transparent-hard m-0 p-0">
                <div className="card-header m-0 p-0">
                  <div className="d-flex justify-content-center input-group text-center">
                    <label className="form-control-sm text-center m-0 p-1">
                      Заключение:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={moderate.moderate}
                        required
                        onChange={(event) =>
                          setModerate({
                            ...moderate,
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
                      className="btn btn-sm btn-danger m-1 p-2"
                      type="submit"
                      style={{ zIndex: 0 }}
                    >
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      вынести заключение
                    </button>
                  </div>
                </div>
                <div className="card-body m-0 p-0">
                  {moderate.moderate === "на доработку" && (
                    <label className="w-75 form-control-sm">
                      Комментарий:
                      <input
                        type="text"
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={moderate.moderateComment}
                        required
                        placeholder="вводите комментарий тут..."
                        minLength={1}
                        maxLength={300}
                        onChange={(event) =>
                          setModerate({
                            ...moderate,
                            moderateComment: event.target.value.replace(
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
      <component.StoreComponent1
        stateConstant={constant.IdeaUpdateStore}
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
      {IdeaReadStore.data && (
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form
            className="m-0 p-0"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setIsModalUpdateVisible(true);
            }}
          >
            <modal.ModalConfirm2
              isModalVisible={isModalUpdateVisible}
              setIsModalVisible={setIsModalUpdateVisible}
              description={"Заменить данные?"}
              callback={UpdateIdea}
            />
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              <div className="card-header bg-success bg-opacity-10 m-0 p-3">
                <h6 className="lead fw-bold m-0 p-0">
                  {IdeaReadStore.data["name_char_field"]}
                </h6>
                <h6 className="text-danger lead small m-0 p-0">
                  {" [ "}
                  {util.GetSliceString(
                    IdeaReadStore.data["status_moderate_char_field"],
                    30
                  )}
                  {" : "}
                  {util.GetSliceString(
                    IdeaReadStore.data["comment_moderate_char_field"],
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
                      value={idea.name}
                      required
                      onChange={(event) =>
                        setIdea({
                          ...idea,
                          name: event.target.value.replace(
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
                      value={idea.subdivision}
                      required
                      onChange={(event) =>
                        setIdea({
                          ...idea,
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
                      value={idea.place}
                      required
                      onChange={(event) =>
                        setIdea({
                          ...idea,
                          place: event.target.value.replace(
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
                      value={idea.sphere}
                      required
                      onChange={(event) =>
                        setIdea({
                          ...idea,
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
                      value={idea.category}
                      required
                      onChange={(event) =>
                        setIdea({
                          ...idea,
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
                    src={util.GetStaticFile(IdeaReadStore.data["image_field"])}
                    className="card-img-top img-fluid w-25 m-0 p-1"
                    alt="изображение отсутствует"
                  />
                  <label className="form-control-sm form-switch text-center m-0 p-1">
                    Удалить текущее изображение:
                    <input
                      type="checkbox"
                      className="form-check-input m-0 p-1"
                      id="flexSwitchCheckDefault"
                      defaultChecked={idea.clearImage}
                      value={idea.clearImage}
                      onChange={() =>
                        setIdea({ ...idea, clearImage: !idea.clearImage })
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
                        setIdea({
                          ...idea,
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
                      value={idea.description}
                      required
                      onChange={(event) =>
                        setIdea({
                          ...idea,
                          description: event.target.value.replace(
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
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: не более 3000 символов
                    </small>
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
                <div className="d-flex justify-content-between m-0 p-1">
                  <label className="text-muted border p-1 m-0 p-1">
                    подано:{" "}
                    <p className="m-0 p-0">
                      {util.GetCleanDateTime(
                        IdeaReadStore.data["created_datetime_field"],
                        true
                      )}
                    </p>
                  </label>
                  <label className="text-muted border p-1 m-0 p-1">
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
              <div className="card-footer m-0 p-0">
                <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                  <button
                    className="btn btn-sm btn-primary m-1 p-2"
                    type="submit"
                    style={{ zIndex: 0 }}
                  >
                    <i className="fa-solid fa-circle-check m-0 p-1" />
                    заменить данные
                  </button>
                  <button
                    className="btn btn-sm btn-warning m-1 p-2"
                    type="reset"
                    onClick={() => resetState()}
                  >
                    <i className="fa-solid fa-pen-nib m-0 p-1" />
                    сбросить данные
                  </button>
                </ul>
              </div>
              <div className="card-footer m-0 p-0">
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
                <component.StoreComponent1
                  stateConstant={constant.IdeaCommentDeleteStore}
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
                    {!IdeaCommentReadListStore.load &&
                    IdeaCommentReadListStore.data ? (
                      IdeaCommentReadListStore.data.list.length > 0 ? (
                        <ul className="list-group m-0 p-0">
                          <label className="form-control-sm text-center m-0 p-1">
                            Количество комментариев на странице:
                            <select
                              className="form-control form-control-sm text-center m-0 p-1"
                              value={pagination.limit}
                              onChange={(event) =>
                                setPagination({
                                  ...pagination,
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
                                  IdeaCommentReadListStore.data["x-total-count"]
                                }
                                limit={pagination.limit}
                                page={pagination.page}
                                // @ts-ignore
                                changePage={(page) =>
                                  setPagination({
                                    ...pagination,
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
                                          setModalCommentDeleteForm({
                                            ...modalCommentDeleteForm,
                                            comment_id: object.id,
                                          });
                                          setIsModalCommentDeleteVisible(true);
                                        }}
                                      >
                                        <i className="fa-solid fa-skull-crossbones m-0 p-1" />
                                        удалить комментарий
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
                                limit={pagination.limit}
                                page={pagination.page}
                                // @ts-ignore
                                changePage={(page) =>
                                  setPagination({
                                    ...pagination,
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
      <modal.ModalConfirm2
        isModalVisible={isModalCommentDeleteVisible}
        setIsModalVisible={setIsModalCommentDeleteVisible}
        description={"Удалить выбранный комментарий?"}
        // @ts-ignore
        callback={() => DeleteComment({ ...modalCommentDeleteForm })}
      />
    </base.Base1>
  );
}
