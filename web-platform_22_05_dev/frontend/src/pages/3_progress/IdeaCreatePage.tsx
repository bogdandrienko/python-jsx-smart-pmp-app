// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constant from "../../components/constant";
import * as hook from "../../components/hook";
import * as util from "../../components/util";
import * as slice from "../../components/slice";

import * as component from "../../components/ui/component";
import * as base from "../../components/ui/base";
import * as modal from "../../components/ui/modal";
import * as message from "../../components/ui/message";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export function IdeaCreatePage(): JSX.Element {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const ideaCreateStore = hook.useSelectorCustom2(slice.idea.ideaCreateStore);

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const [ideaCreateObject, setIdeaCreateObject, resetIdeaCreateObject] =
    hook.useStateCustom1({
      subdivision: "",
      sphere: "",
      category: "",
      avatar: null,
      dangerAvatar: false,
      name: "",
      place: "",
      description: "",
      moderate: "на модерации",
    });

  const [
    isModalConfirmCreateCreateVisible,
    setIsModalConfirmCreateCreateVisible,
  ] = useState(false);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (ideaCreateStore.data) {
      util.Delay(() => {
        if (ideaCreateStore.data) {
          resetIdeaCreateObject();
          dispatch({ type: slice.idea.ideaCreateStore.constant.reset });
        }
      }, 10000);
    }
  }, [ideaCreateStore.data]);

  useEffect(() => {
    resetIdeaCreateObject();
    dispatch({ type: slice.idea.ideaCreateStore.constant.reset });
  }, []);

  useEffect(() => {
    if (ideaCreateObject.avatar) {
      setIdeaCreateObject({
        ...ideaCreateObject,
        dangerAvatar: ideaCreateObject.avatar.size > 5 * 1000000,
      });
    }
  }, [ideaCreateObject.avatar]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  function CreateIdea() {
    dispatch(
      slice.idea.ideaCreateStore.action({ form: { ...ideaCreateObject } })
    );
  }

  function FormCreateSubmit(event: FormEvent<HTMLFormElement>) {
    util.EventForm1(event, true, true, () => {
      setIsModalConfirmCreateCreateVisible(true);
    });
  }

  function FormCreateReset(event: FormEvent<HTMLFormElement>) {
    util.EventForm1(event, false, true, () => {
      resetIdeaCreateObject();
      dispatch({ type: slice.idea.ideaCreateStore.constant.reset });
    });
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <modal.ModalConfirm1
        isModalVisible={isModalConfirmCreateCreateVisible}
        setIsModalVisible={setIsModalConfirmCreateCreateVisible}
        description={"Отправить идею на модерацию?"}
        callback={CreateIdea}
      />
      {ideaCreateObject.dangerAvatar && (
        <message.Message.Danger>
          Размер изображения превышает максимальный (5 мб) ! Найдите другое,
          сделайте скрин с экрана или сожмите изображение.
        </message.Message.Danger>
      )}
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
      <component.StatusStore1
        slice={slice.idea.ideaCreateStore}
        consoleLog={constant.DEBUG_CONSTANT}
      />
      {!ideaCreateStore.data && !ideaCreateStore.load && (
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form
            className="m-0 p-0"
            onSubmit={(event) => {
              FormCreateSubmit(event);
            }}
            onReset={(event) => {
              FormCreateReset(event);
            }}
          >
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
                      required
                      value={ideaCreateObject.name}
                      onChange={(event) =>
                        setIdeaCreateObject({
                          ...ideaCreateObject,
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
                      required
                      value={ideaCreateObject.subdivision}
                      onChange={(event) =>
                        setIdeaCreateObject({
                          ...ideaCreateObject,
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
                      value={ideaCreateObject.place}
                      required
                      onChange={(event) =>
                        setIdeaCreateObject({
                          ...ideaCreateObject,
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
                      value={ideaCreateObject.sphere}
                      required
                      onChange={(event) =>
                        setIdeaCreateObject({
                          ...ideaCreateObject,
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
                      value={ideaCreateObject.category}
                      required
                      onChange={(event) =>
                        setIdeaCreateObject({
                          ...ideaCreateObject,
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
                        setIdeaCreateObject({
                          ...ideaCreateObject,
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
                      value={ideaCreateObject.description}
                      required
                      onChange={(event) =>
                        setIdeaCreateObject({
                          ...ideaCreateObject,
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
              </div>
              <div className="card-footer m-0 p-0">
                <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                  <button
                    className={
                      ideaCreateObject.dangerAvatar
                        ? "btn btn-sm btn-primary m-1 p-2 disabled"
                        : "btn btn-sm btn-primary m-1 p-2"
                    }
                    type="submit"
                  >
                    <i className="fa-solid fa-circle-check m-0 p-1" />
                    отправить данные
                  </button>
                  <button
                    className="btn btn-sm btn-warning m-1 p-2"
                    type="reset"
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
}
