// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as action from "../../components/action";
import * as component from "../../components/ui/component";
import * as constant from "../../components/constant";
import * as hook from "../../components/hook";
import * as util from "../../components/util";

import * as base from "../../components/ui/base";
import * as modal from "../../components/ui/modal";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const IdeaCreatePage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const IdeaCreateStore = hook.useSelectorCustom1(constant.IdeaCreateStore);

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const [idea, setIdea, resetIdea] = hook.useStateCustom1({
    subdivision: "",
    sphere: "",
    category: "",
    avatar: null,
    name: "",
    place: "",
    description: "",
    moderate: "на модерации",
  });

  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (IdeaCreateStore.data) {
      util.Delay(() => {
        dispatch({ type: constant.IdeaCreateStore.reset });
        resetIdea();
      }, 10000);
    }
  }, [IdeaCreateStore.data]);

  useEffect(() => {
    dispatch({ type: constant.IdeaCreateStore.reset });
  }, []);

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  const CreateConfirm = () => {
    dispatch(action.Idea.Create({ form: idea }));
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <component.Accordion1
        key_target={"accordion1"}
        isCollapse={false}
        title={"Регламент подачи:"}
        text_style="custom-color-warning-1"
        header_style="bg-warning bg-opacity-10 custom-background-transparent-low"
        body_style="bg-light bg-opacity-10 custom-background-transparent-low"
      >
        {
          <div className="text-center m-0 p-1">
            <ul className="text-start m-0 p-0">
              <li className="nav m-0 p-1">
                <h6 className="m-0 p-0">
                  Коллеги, будьте "реалистами" при отправке своей идеи:
                </h6>
                <p className="small text-muted m-0 p-1">
                  Она должна быть реализуема, иметь какой-то положительный
                  эффект и как можно более конкретна!
                </p>
              </li>
            </ul>
          </div>
        }
      </component.Accordion1>
      <component.StoreComponent1
        stateConstant={constant.IdeaCreateStore}
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
      {!IdeaCreateStore.data && !IdeaCreateStore.load && (
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form
            className="m-0 p-0"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setIsModalCreateVisible(true);
            }}
          >
            <modal.ModalConfirm2
              isModalVisible={isModalCreateVisible}
              setIsModalVisible={setIsModalCreateVisible}
              description={"Отправить идею на модерацию?"}
              callback={CreateConfirm}
            />
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              <div className="card-header bg-success bg-opacity-10 m-0 p-2">
                <h6 className="lead fw-bold m-0 p-0">Новая идея</h6>
                <h6 className="lead m-0 p-0">в общий банк идей предприятия</h6>
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
              </div>
              <div className="card-footer m-0 p-0">
                <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                  <button
                    className="btn btn-sm btn-primary m-1 p-2"
                    type="submit"
                  >
                    <i className="fa-solid fa-circle-check m-0 p-1" />
                    отправить данные
                  </button>
                  <button
                    className="btn btn-sm btn-warning m-1 p-2"
                    type="reset"
                    onClick={() => resetIdea()}
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
