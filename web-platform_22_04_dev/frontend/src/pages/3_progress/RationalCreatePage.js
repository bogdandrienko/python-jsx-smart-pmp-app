// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";

import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const RationalCreatePage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [subdivision, subdivisionSet] = useState("");
  const [category, categorySet] = useState("");
  const [avatar, avatarSet] = useState(null);
  const [name, nameSet] = useState("");
  const [place, placeSet] = useState("");
  const [description, descriptionSet] = useState("");
  const [additionalWord, additionalWordSet] = useState(null);
  const [additionalPdf, additionalPdfSet] = useState(null);
  const [additionalExcel, additionalExcelSet] = useState(null);
  const [user1, user1Set] = useState("Вы");
  const [user1Perc, user1PercSet] = useState("100");
  const [user2, user2Set] = useState("");
  const [user2Perc, user2PercSet] = useState("");
  const [user3, user3Set] = useState("");
  const [user3Perc, user3PercSet] = useState("");
  const [user4, user4Set] = useState("");
  const [user4Perc, user4PercSet] = useState("");
  const [user5, user5Set] = useState("");
  const [user5Perc, user5PercSet] = useState("");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const UserListStore = useSelector((state) => state.UserListStore);
  const {
    load: loadUserList,
    data: dataUserList,
    error: errorUserList,
    fail: failUserList,
  } = UserListStore;
  //////////////////////////////////////////////////////////
  const rationalCreateStore = useSelector((state) => state.rationalCreateStore);
  const {
    load: loadRationalCreate,
    data: dataRationalCreate,
    // error: errorRationalCreate,
    // fail: failRationalCreate,
  } = rationalCreateStore;
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!dataUserList && !errorUserList && !failUserList) {
      const form = {
        "Action-type": "USER_LIST_ALL",
      };
      dispatch(
        utils.ActionConstructorUtility(
          form,
          "/api/auth/user/",
          "POST",
          30000,
          constants.USER_LIST_ALL
        )
      );
    }
  }, [dataUserList, errorUserList, failUserList]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataRationalCreate) {
      utils.Sleep(2000).then(() => {
        dispatch({
          type: constants.RATIONAL_CREATE.reset,
        });
        handlerCreateReset();
      });
    }
  }, [dataRationalCreate]);
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerCreateSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "RATIONAL_CREATE",
      subdivision: subdivision,
      category: category,
      avatar: avatar,
      name: name,
      place: place,
      description: description,
      additionalWord: additionalWord,
      additionalPdf: additionalPdf,
      additionalExcel: additionalExcel,
      user1: `${user1Perc}%`,
      user2: `${user2} ${user2Perc}%`,
      user3: `${user3} ${user3Perc}%`,
      user4: `${user4} ${user4Perc}%`,
      user5: `${user5} ${user5Perc}%`,
    };
    dispatch(
      utils.ActionConstructorUtility(
        form,
        "/api/auth/rational/",
        "POST",
        30000,
        constants.RATIONAL_CREATE
      )
    );
  };
  //////////////////////////////////////////////////////////
  const handlerCreateReset = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    subdivisionSet("");
    categorySet("");
    avatarSet(null);
    nameSet("");
    placeSet("");
    descriptionSet("");
    additionalWordSet(null);
    additionalPdfSet(null);
    additionalExcelSet(null);
    user1Set("Вы");
    user1PercSet("100");
    user2Set("");
    user2PercSet("");
    user3Set("");
    user3PercSet("");
    user4Set("");
    user4PercSet("");
    user5Set("");
    user5PercSet("");
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={rationalCreateStore}
          key={"rationalCreateStore"}
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
        {!dataRationalCreate && !loadRationalCreate && (
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
            <form className="m-0 p-0" onSubmit={handlerCreateSubmit}>
              <div className="card shadow custom-background-transparent-low m-0 p-0">
                <div className="card-header bg-success bg-opacity-10 m-0 p-3">
                  <h6 className="lead fw-bold m-0 p-0">ЗАЯВЛЕНИЕ</h6>
                  <h6 className="lead m-0 p-0">
                    на рационализаторское предложение
                  </h6>
                </div>
                <div className="card-body m-0 p-0">
                  <div className="d-flex justify-content-between m-0 p-0">
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
                      <small className="text-danger m-0 p-0">
                        * обязательно
                      </small>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Зарегистрировано за №{" "}
                      <strong className="btn btn-light">XXX</strong> от
                      <small className="custom-color-warning-1">
                        {" "}
                        текущей{" "}
                      </small>
                      даты
                      <p>
                        <small className="text-success">
                          * номер будет создан автоматически
                        </small>
                      </p>
                    </label>
                  </div>
                  <div className="m-0 p-0">
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
                  <div className="m-0 p-0">
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
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center w-75 m-0 p-1">
                      Название:
                      <input
                        type="text"
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={name}
                        placeholder="введите название тут..."
                        required
                        minLength="1"
                        maxLength="300"
                        onChange={(e) =>
                          nameSet(
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
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="custom-color-warning-1 m-0 p-0">
                          {" "}
                          * только кириллица, цифры, пробел и знаки препинания
                        </small>
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: не более 300 символов
                        </small>
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-0">
                    <label className="w-50 form-control-sm m-0 p-1">
                      Место внедрения:
                      <input
                        type="text"
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={place}
                        placeholder="введите место внедрения тут..."
                        required
                        minLength="1"
                        maxLength="300"
                        onChange={(e) =>
                          placeSet(
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
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="custom-color-warning-1 m-0 p-0">
                          {" "}
                          * только кириллица, цифры, пробел и знаки препинания
                        </small>
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: не более 300 символов
                        </small>
                      </small>
                    </label>
                  </div>
                  <div className="m-0 p-0">
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
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center m-0 p-1">
                      Word файл-приложение:
                      <input
                        type="file"
                        className="form-control form-control-sm text-center m-0 p-1"
                        accept=".docx, .doc"
                        onChange={(e) => additionalWordSet(e.target.files[0])}
                      />
                      <small className="text-muted">* не обязательно</small>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Pdf файл-приложение:
                      <input
                        type="file"
                        className="form-control form-control-sm text-center m-0 p-1"
                        accept=".pdf"
                        onChange={(e) => additionalPdfSet(e.target.files[0])}
                      />
                      <small className="text-muted">* не обязательно</small>
                    </label>
                    <label className="form-control-sm text-center m-0 p-1">
                      Excel файл-приложение:
                      <input
                        type="file"
                        className="form-control form-control-sm text-center m-0 p-1"
                        accept=".xlsx, .xls"
                        onChange={(e) => additionalExcelSet(e.target.files[0])}
                      />
                      <small className="text-muted">* не обязательно</small>
                    </label>
                  </div>
                  <div className="m-0 p-0">
                    <p className="text-danger m-0 p-0">
                      Я(мы) утверждаю(ем), что являюсь(ся) автором(и) данного
                      предложения. Мне(нам) также известно, что в случае
                      признания предложения коммерческой тайной подразделения,
                      я(мы) обязан не разглашать его сущность.
                    </p>
                  </div>
                  <div className="m-0 p-0">
                    <label className="form-control-sm text-center m-0 p-0">
                      Участники:
                      <p className="m-0 p-0">
                        <small className="fw-bold">
                          (Фамилия Имя Отчество) (Табельный номер) (Вклад в рац.
                          предложение) %
                        </small>
                      </p>
                    </label>
                  </div>
                  <div className="m-0 p-1">
                    <label className="form-control-sm text-center m-0 p-1">
                      <components.StoreStatusComponent
                        storeStatus={UserListStore}
                        key={"UserListStore"}
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
                      {dataUserList && (
                        <div className="m-0 p-0">
                          <div className="m-0 p-0">
                            <label className="form-control-sm text-center m-0 p-1">
                              участник №1:
                              <select
                                className="form-control form-control-sm text-center m-0 p-1"
                                value={user1}
                                required
                                onChange={(e) => user1Set(e.target.value)}
                              >
                                <option value="Вы">Вы</option>
                              </select>
                            </label>
                            <label className="form-control-sm text-center m-0 p-1">
                              % Вклада 1 участника
                              <input
                                type="number"
                                className="form-control form-control-sm text-center m-0 p-1"
                                value={user1Perc}
                                required
                                placeholder="пример: 70%"
                                min="1"
                                max="100"
                                onChange={(e) => user1PercSet(e.target.value)}
                              />
                            </label>
                          </div>
                          <div className="m-0 p-0">
                            <label className="form-control-sm text-center m-0 p-1">
                              участник №2:
                              <select
                                className="form-control form-control-sm text-center m-0 p-1"
                                value={user2}
                                onChange={(e) => user2Set(e.target.value)}
                              >
                                <option value="">Не выбрано</option>
                                {dataUserList.map((user, index) => (
                                  <option key={index} value={user}>
                                    {user}
                                  </option>
                                ))}
                              </select>
                            </label>
                            {user2 && (
                              <label className="form-control-sm text-center m-0 p-1">
                                % Вклада 2 участника
                                <input
                                  type="number"
                                  className="form-control form-control-sm text-center m-0 p-1"
                                  value={user2Perc}
                                  required
                                  placeholder="пример: 70%"
                                  min="1"
                                  max="100"
                                  onChange={(e) => user2PercSet(e.target.value)}
                                />
                              </label>
                            )}
                          </div>
                          <div className="m-0 p-0">
                            <label className="form-control-sm text-center m-0 p-1">
                              участник №3:
                              <select
                                className="form-control form-control-sm text-center m-0 p-1"
                                value={user3}
                                onChange={(e) => user3Set(e.target.value)}
                              >
                                <option value="">Не выбрано</option>
                                {dataUserList.map((user, index) => (
                                  <option key={index} value={user}>
                                    {user}
                                  </option>
                                ))}
                              </select>
                            </label>
                            {user3 && (
                              <label className="form-control-sm text-center m-0 p-1">
                                % Вклада 3 участника
                                <input
                                  type="number"
                                  className="form-control form-control-sm text-center m-0 p-1"
                                  value={user3Perc}
                                  required
                                  placeholder="пример: 70%"
                                  min="0"
                                  max="100"
                                  onChange={(e) => user3PercSet(e.target.value)}
                                />
                              </label>
                            )}
                          </div>
                          <div className="m-0 p-0">
                            <label className="form-control-sm text-center m-0 p-1">
                              участник №4:
                              <select
                                className="form-control form-control-sm text-center m-0 p-1"
                                value={user4}
                                onChange={(e) => user4Set(e.target.value)}
                              >
                                <option value="">Не выбрано</option>
                                {dataUserList.map((user, index) => (
                                  <option key={index} value={user}>
                                    {user}
                                  </option>
                                ))}
                              </select>
                            </label>
                            {user4 && (
                              <label className="form-control-sm text-center m-0 p-1">
                                % Вклада 4 участника
                                <input
                                  type="number"
                                  className="form-control form-control-sm text-center m-0 p-1"
                                  value={user4Perc}
                                  required
                                  placeholder="пример: 70%"
                                  min="0"
                                  max="100"
                                  onChange={(e) => user4PercSet(e.target.value)}
                                />
                              </label>
                            )}
                          </div>
                          <div className="m-0 p-0">
                            <label className="form-control-sm text-center m-0 p-1">
                              участник №5:
                              <select
                                className="form-control form-control-sm text-center m-0 p-1"
                                value={user5}
                                onChange={(e) => user5Set(e.target.value)}
                              >
                                <option value="">Не выбрано</option>
                                {dataUserList.map((user, index) => (
                                  <option key={index} value={user}>
                                    {user}
                                  </option>
                                ))}
                              </select>
                            </label>
                            {user5 && (
                              <label className="form-control-sm text-center m-0 p-1">
                                % Вклада 5 участника
                                <input
                                  type="number"
                                  className="form-control form-control-sm text-center m-0 p-1"
                                  value={user5Perc}
                                  required
                                  placeholder="пример: 70%"
                                  min="0"
                                  max="100"
                                  onChange={(e) => user5PercSet(e.target.value)}
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      )}
                    </label>
                    <div className="m-0 p-0">
                      <small className="text-muted">
                        * общая сумма вклада всех участников не должна превышать
                        100%
                      </small>
                    </div>
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
                      onClick={(e) => handlerCreateReset(e)}
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
      </main>
      <components.FooterComponent />
    </div>
  );
};
