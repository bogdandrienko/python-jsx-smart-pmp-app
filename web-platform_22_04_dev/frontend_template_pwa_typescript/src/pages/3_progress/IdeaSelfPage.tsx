// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as action from "../../components/action";
import * as component from "../../components/ui/component";
import * as constant from "../../components/constant";
import * as hook from "../../components/hook";
import * as util from "../../components/util";

import * as base from "../../components/ui/base";
import * as modal from "../../components/ui/modal";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IdeaSelfPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const IdeaReadStore = hook.useSelectorCustom1(constant.IdeaReadStore);
  const IdeaUpdateStore = hook.useSelectorCustom1(constant.IdeaUpdateStore);

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;

  const [idea, setIdea, resetIdea] = hook.useStateCustom1({
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

  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

  const [moderate, setModerate, resetModerate] = hook.useStateCustom1({
    moderate: "скрыто",
    moderateComment: "Автор скрыл свою идею",
  });

  const [isModalHideVisible, setIsModalHideVisible] = useState(false);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!IdeaReadStore.data) {
      dispatch(action.Idea.Read({ idea_id: id }));
    } else {
      setIdea({
        ...idea,
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
    resetState();
  }, []);

  useEffect(() => {
    resetState();
  }, [id]);

  useEffect(() => {
    if (IdeaUpdateStore.data) {
      resetState();
      navigate("/idea/self/list");
    }
  }, [IdeaUpdateStore.data]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  const resetState = () => {
    resetIdea();
    dispatch({ type: constant.IdeaReadStore.reset });
    dispatch({ type: constant.IdeaUpdateStore.reset });
  };

  const ChangeIdea = () => {
    dispatch(action.Idea.Update({ idea_id: id, form: idea }));
  };

  const HideIdea = () => {
    dispatch(
      action.Idea.Update({
        idea_id: id,
        form: { ...moderate },
      })
    );
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <modal.ModalConfirm2
        isModalVisible={isModalHideVisible}
        setIsModalVisible={setIsModalHideVisible}
        description={"Скрыть свою идею?"}
        callback={() => HideIdea()}
      />
      <div className="btn-group m-0 p-1 text-start w-100">
        <Link to={"/idea/self/list"} className="btn btn-sm btn-primary m-1 p-2">
          {"<="} назад к списку
        </Link>
        {IdeaReadStore.data && (
          <button
            type="button"
            className="btn btn-sm btn-warning m-1 p-2"
            onClick={() => setIsModalHideVisible(true)}
            style={{ zIndex: 0 }}
          >
            скрыть
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
              callback={ChangeIdea}
            />
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              <div className="card-header bg-success bg-opacity-10 m-0 p-3">
                <h6 className="lead fw-bold m-0 p-0">
                  {IdeaReadStore.data["name_char_field"]}
                </h6>
                <h6 className="text-danger lead small m-0 p-0">
                  {"[ "}
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
                      checked={idea.clearImage}
                      onClick={() =>
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
            </div>
          </form>
        </ul>
      )}
    </base.Base1>
  );
};