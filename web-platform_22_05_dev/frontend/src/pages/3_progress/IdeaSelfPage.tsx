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

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export function IdeaSelfPage(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const ideaReadStore = hook.useSelectorCustom2(slice.idea.ideaReadStore);
  const ideaUpdateStore = hook.useSelectorCustom2(slice.idea.ideaUpdateStore);
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
      moderate: "на модерации",
      moderateComment: "Автор внёс изменения",
    });

  const [isModalConfirmUpdateVisible, setIsModalConfirmUpdateVisible] =
    useState(false);

  const [isModalConfirmHideVisible, setIsModalConfirmHideVisible] =
    useState(false);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!ideaReadStore.data) {
      dispatch(slice.idea.ideaReadStore.action({ idea_id: Number(id) }));
    } else {
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
    resetIdeaUpdateObject();
    dispatch({ type: slice.idea.ideaReadStore.constant.reset });
    dispatch({ type: slice.idea.ideaUpdateStore.constant.reset });
  }, []);

  useEffect(() => {
    resetIdeaUpdateObject();
    dispatch({ type: slice.idea.ideaReadStore.constant.reset });
    dispatch({ type: slice.idea.ideaUpdateStore.constant.reset });
  }, [id]);

  useEffect(() => {
    if (ideaUpdateStore.data) {
      util.Delay(() => {
        if (ideaUpdateStore.data) {
          resetIdeaUpdateObject();
          dispatch({ type: slice.idea.ideaReadStore.constant.reset });
          dispatch({ type: slice.idea.ideaUpdateStore.constant.reset });
          navigate("/idea/self/list");
        }
      }, 1000);
    }
  }, [ideaUpdateStore.data]);

  useEffect(() => {
    if (ideaReadStore.data) {
      if (ideaReadStore.data["moderate_status"] !== "на доработку") {
        navigate("/idea/self/list");
      }
      if (userDetailStore.data) {
        if (ideaReadStore.data["author"]["id"] !== userDetailStore.data["id"]) {
          navigate("/idea/self/list");
        }
      }
    }
  }, [ideaReadStore.data, userDetailStore.data]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  function HideIdea() {
    dispatch(
      slice.idea.ideaUpdateStore.action({
        idea_id: Number(id),
        form: { moderate: "скрыто", moderateComment: "Автор скрыл свою идею" },
      })
    );
  }

  function ChangeIdea() {
    dispatch(
      slice.idea.ideaUpdateStore.action({
        idea_id: Number(id),
        form: { ...ideaUpdateObject },
      })
    );
  }

  function ButtonHideIdea(event: MouseEvent<any>) {
    util.EventMouse1(event, true, true, () => {
      setIsModalConfirmHideVisible(true);
    });
  }

  function FormIdeaUpdateSubmit(event: FormEvent<any>) {
    util.EventForm1(event, true, true, () => {
      setIsModalConfirmUpdateVisible(true);
    });
  }

  function FormIdeaUpdateReset(event: FormEvent<any>) {
    util.EventForm1(event, false, true, () => {
      resetIdeaUpdateObject();
      dispatch({ type: slice.idea.ideaReadStore.constant.reset });
      dispatch({ type: slice.idea.ideaUpdateStore.constant.reset });
    });
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <modal.ModalConfirm1
        isModalVisible={isModalConfirmHideVisible}
        setIsModalVisible={setIsModalConfirmHideVisible}
        description={"Скрыть свою идею?"}
        callback={HideIdea}
      />
      <modal.ModalConfirm1
        isModalVisible={isModalConfirmUpdateVisible}
        setIsModalVisible={setIsModalConfirmUpdateVisible}
        description={"Заменить данные?"}
        callback={ChangeIdea}
      />
      <div className="btn-group m-0 p-1 text-start w-100">
        <Link to={"/idea/self/list"} className="btn btn-sm btn-primary m-1 p-2">
          {"<="} назад к списку
        </Link>
        {ideaReadStore.data && (
          <button
            type="button"
            className="btn btn-sm btn-warning m-1 p-2 custom-z-index-0"
            onClick={(event) => ButtonHideIdea(event)}
          >
            скрыть
          </button>
        )}
      </div>
      <component.StatusStore1
        slice={slice.user.userDetailStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
      />
      <component.StatusStore1
        slice={slice.idea.ideaReadStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
      />
      <component.StatusStore1
        slice={slice.idea.ideaUpdateStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
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
                  {"[ "}
                  {util.GetSliceString(
                    ideaReadStore.data["moderate_comment"],
                    300
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
                      checked={ideaUpdateObject.clearImage}
                      onClick={() =>
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
            </div>
          </form>
        </ul>
      )}
    </base.Base1>
  );
}
