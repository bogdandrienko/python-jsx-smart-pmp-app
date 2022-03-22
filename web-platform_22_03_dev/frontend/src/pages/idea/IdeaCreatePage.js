///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const IdeaCreatePage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [subdivision, subdivisionSet] = useState("");
  const [sphere, sphereSet] = useState("");
  const [category, categorySet] = useState("");
  const [avatar, avatarSet] = useState(null);
  const [name, nameSet] = useState("");
  const [place, placeSet] = useState("");
  const [description, descriptionSet] = useState("");
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const ideaCreateStore = useSelector((state) => state.ideaCreateStore);
  const {
    load: loadIdeaCreate,
    data: dataIdeaCreate,
    // error: errorIdeaCreate,
    // fail: failIdeaCreate,
  } = ideaCreateStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO reset state
  const resetState = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    dispatch({
      type: constants.IDEA_CREATE_RESET_CONSTANT,
    });
    dispatch({
      type: constants.IDEA_LIST_RESET_CONSTANT,
    });
    dispatch({
      type: constants.IDEA_DETAIL_RESET_CONSTANT,
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (dataIdeaCreate) {
      utils.Sleep(3000).then(() => {
        resetState();
        handlerCreateReset();
      });
    }
  }, [dataIdeaCreate]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerCreateSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "IDEA_CREATE",
      subdivision: subdivision,
      sphere: sphere,
      category: category,
      avatar: avatar,
      name: name,
      place: place,
      description: description,
    };
    dispatch(actions.ideaCreateAction(form));
  };
  //////////////////////////////////////////////////////////
  const handlerCreateReset = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    subdivisionSet("");
    sphereSet("");
    categorySet("");
    avatarSet(null);
    nameSet("");
    placeSet("");
    descriptionSet("");
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={ideaCreateStore}
          keyStatus={"ideaCreateStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={true}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        {!dataIdeaCreate && !loadIdeaCreate && (
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
            <form className="m-0 p-0" onSubmit={handlerCreateSubmit}>
              <div className="card shadow custom-background-transparent-low m-0 p-0">
                <div className="card-header bg-success bg-opacity-10 m-0 p-3">
                  <h6 className="lead fw-bold m-0 p-0">Идея</h6>
                  <h6 className="lead m-0 p-0">
                    в общий банк идей предприятия
                  </h6>
                </div>
                <div className="card-body m-0 p-0">
                  <div className="m-0 p-1">
                    <label className="form-control-sm text-center m-0 p-1">
                      Подразделение:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={subdivision}
                        required
                        onChange={(e) => subdivisionSet(e.target.value)}
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
                        <option className="m-0 p-0" value="управление">
                          управление предприятия
                        </option>
                        <option className="m-0 p-0" value="энергоуправление">
                          энергоуправление
                        </option>
                      </select>
                      <small className="text-danger m-0 p-0">
                        * обязательно
                      </small>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Сфера:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={sphere}
                        required
                        onChange={(e) => sphereSet(e.target.value)}
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
                      <small className="text-danger m-0 p-0">
                        * обязательно
                      </small>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Категория:
                      <select
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={category}
                        required
                        onChange={(e) => categorySet(e.target.value)}
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
                        <option className="m-0 p-0" value="другое">
                          другое
                        </option>
                      </select>
                      <small className="text-danger m-0 p-0">
                        * обязательно
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-1">
                    <label className="form-control-sm text-center m-0 p-1">
                      Аватарка-заставка:
                      <input
                        type="file"
                        className="form-control form-control-sm text-center m-0 p-1"
                        accept=".jpg, .png"
                        onChange={(e) => avatarSet(e.target.files[0])}
                      />
                      <small className="text-muted m-0 p-0">
                        * не обязательно
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-1">
                    <label className="form-control-sm text-center w-75 m-0 p-1">
                      Название:
                      <input
                        type="text"
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={name}
                        placeholder="введите название тут..."
                        required
                        minLength="1"
                        maxLength="200"
                        onChange={(e) =>
                          nameSet(
                            e.target.value.replace(
                              utils.GetRegexType({
                                numbers: true,
                                cyrillic: true,
                                space: true,
                              }),
                              ""
                            )
                          )
                        }
                      />
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="text-warning m-0 p-0">
                          {" "}
                          * только кириллические буквы и цифры
                        </small>
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: не более 200 символов
                        </small>
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-1">
                    <label className="w-50 form-control-sm m-0 p-1">
                      Место изменения:
                      <input
                        type="text"
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={place}
                        placeholder="введите место изменения тут..."
                        required
                        minLength="1"
                        maxLength="100"
                        onChange={(e) =>
                          placeSet(
                            e.target.value.replace(
                              utils.GetRegexType({
                                numbers: true,
                                cyrillic: true,
                                space: true,
                              }),
                              ""
                            )
                          )
                        }
                      />
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="text-warning m-0 p-0">
                          {" "}
                          * только кириллические буквы и цифры
                        </small>
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: не более 100 символов
                        </small>
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-1">
                    <label className="w-100 form-control-sm m-0 p-1">
                      Описание:
                      <textarea
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={description}
                        required
                        placeholder="введите описание тут..."
                        minLength="1"
                        maxLength="3000"
                        rows="3"
                        onChange={(e) =>
                          descriptionSet(
                            e.target.value.replace(
                              utils.GetRegexType({
                                numbers: true,
                                latin: true,
                                cyrillic: true,
                                space: true,
                                punctuationMarks: true,
                              }),
                              ""
                            )
                          )
                        }
                      />
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: не более 3000 символов
                        </small>
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
                      отправить данные
                    </button>
                    <button
                      className="btn btn-sm btn-warning m-1 p-2"
                      type="reset"
                      onClick={(e) => handlerCreateReset(e)}
                    >
                      сбросить данные
                    </button>
                  </ul>
                </div>
              </div>
            </form>
          </ul>
        )}
      </main>
      <components.FooterComponent />
    </body>
  );
};
