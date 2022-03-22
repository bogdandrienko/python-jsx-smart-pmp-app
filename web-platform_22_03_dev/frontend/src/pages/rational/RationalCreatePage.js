///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const RationalCreatePage = () => {
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
  const [additionalWord, additionalWordSet] = useState(null);
  const [additionalPdf, additionalPdfSet] = useState(null);
  const [additionalExcel, additionalExcelSet] = useState(null);
  const [user1, user1Set] = useState("");
  const [user1Perc, user1PercSet] = useState("");
  const [user2, user2Set] = useState("");
  const [user2Perc, user2PercSet] = useState("");
  const [user3, user3Set] = useState("");
  const [user3Perc, user3PercSet] = useState("");
  const [user4, user4Set] = useState("");
  const [user4Perc, user4PercSet] = useState("");
  const [user5, user5Set] = useState("");
  const [user5Perc, user5PercSet] = useState("");
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const userListAllStore = useSelector((state) => state.userListAllStore);
  const {
    load: loadUserListAll,
    data: dataUserListAll,
    error: errorUserListAll,
    fail: failUserListAll,
  } = userListAllStore;
  //////////////////////////////////////////////////////////
  const rationalCreateStore = useSelector((state) => state.rationalCreateStore);
  const {
    // load: loadRationalCreate,
    data: dataRationalCreate,
    // error: errorRationalCreate,
    // fail: failRationalCreate,
  } = rationalCreateStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (
      !dataUserListAll &&
      !loadUserListAll &&
      !errorUserListAll &&
      !failUserListAll
    ) {
      const form = {
        "Action-type": "USER_LIST_ALL",
      };
      dispatch(actions.userListAllAction(form));
    }
  }, [
    dispatch,
    dataUserListAll,
    loadUserListAll,
    errorUserListAll,
    failUserListAll,
  ]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataRationalCreate) {
      utils.Sleep(5000).then(() => {
        dispatch({
          type: constants.RATIONAL_CREATE_RESET_CONSTANT,
        });
      });
    }
  }, [dataRationalCreate]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "RATIONAL_CREATE",
      subdivision: subdivision,
      sphere: sphere,
      category: category,
      avatar: avatar,
      name: name,
      place: place,
      description: description,
      additionalWord: additionalWord,
      additionalPdf: additionalPdf,
      additionalExcel: additionalExcel,
      user1: user1 + " " + user1Perc + "%",
      user2: user2 + " " + user2Perc + "%",
      user3: user3 + " " + user3Perc + "%",
      user4: user4 + " " + user4Perc + "%",
      user5: user5 + " " + user5Perc + "%",
    };
    dispatch(actions.rationalCreateAction(form));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={userListAllStore}
          key={"userListAllStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={false}
          loadText={""}
          showData={false}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
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
        {!dataRationalCreate && (
          <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-2 justify-content-center m-0 p-0">
            <form
              autoComplete="on"
              className="card shadow m-0 p-0"
              onSubmit={handlerSubmit}
            >
              <div className="card-header m-0 p-0 bg-success bg-opacity-10">
                <h6 className="lead fw-bold">ЗАЯВЛЕНИЕ</h6>
                <h6 className="lead">на рационализаторское предложение</h6>
              </div>
              <br />
              <div className="">
                <label className="form-control-sm text-center m-0 p-1">
                  Подразделение:
                  <select
                    className="form-control form-control-sm text-center m-0 p-1"
                    value={subdivision}
                    required
                    onChange={(e) => subdivisionSet(e.target.value)}
                  >
                    <option value="">Не указано</option>
                    <option value="Автотранспортное предприятие">
                      Автотранспортное предприятие
                    </option>
                    <option value="Горно-транспортный комплекс">
                      Горно-транспортный комплекс
                    </option>
                    <option value="Обогатительный комплекс">
                      Обогатительный комплекс
                    </option>
                    <option value="Управление">Управление предприятия</option>
                    <option value="Энергоуправление">Энергоуправление</option>
                  </select>
                  <small className="text-danger">* обязательно</small>
                </label>
                <label className="form-control-sm text-center m-0 p-1">
                  Зарегистрировано за №{" "}
                  <strong className="btn btn-light">XXX</strong> от
                  <small className="text-warning"> текущей </small>даты
                  <p>
                    <small className="text-success">
                      * номер будет создан автоматически
                    </small>
                  </p>
                </label>
              </div>
              <div className="">
                <label className="form-control-sm text-center m-0 p-1">
                  Сфера:
                  <select
                    className="form-control form-control-sm text-center m-0 p-1"
                    value={sphere}
                    required
                    onChange={(e) => sphereSet(e.target.value)}
                  >
                    <option value="">Не указано</option>
                    <option value="Технологическая">Технологическая</option>
                    <option value="Не технологическая">
                      Не технологическая
                    </option>
                  </select>
                  <small className="text-danger">* обязательно</small>
                </label>
                <label className="form-control-sm text-center m-0 p-1">
                  Категория:
                  <select
                    className="form-control form-control-sm text-center m-0 p-1"
                    value={category}
                    required
                    onChange={(e) => categorySet(e.target.value)}
                  >
                    <option value="">Не указано</option>
                    <option value="Индустрия 4.0">Индустрия 4.0</option>
                    <option value="Инвестиции">Инвестиции</option>
                    <option value="Инновации">Инновации</option>
                    <option value="Модернизация">Модернизация</option>
                    <option value="Экология">Экология</option>
                  </select>
                  <small className="text-danger">* обязательно</small>
                </label>
                <label className="form-control-sm text-center m-0 p-1">
                  Аватарка-заставка:
                  <input
                    type="file"
                    className="form-control form-control-sm text-center m-0 p-1"
                    accept=".jpg, .png"
                    onChange={(e) => avatarSet(e.target.files[0])}
                  />
                  <small className="text-muted">* не обязательно</small>
                </label>
              </div>
              <div className="">
                <label className="w-75 form-control-sm">
                  Название:
                  <input
                    type="text"
                    className="form-control form-control-sm text-center m-0 p-1"
                    value={name}
                    placeholder="введите название тут..."
                    required
                    minLength="1"
                    maxLength="250"
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
                      * длина: не более 250 символов
                    </small>
                  </small>
                </label>
              </div>
              <div className="">
                <label className="w-50 form-control-sm">
                  Место внедрения:
                  <input
                    type="text"
                    className="form-control form-control-sm text-center m-0 p-1"
                    value={place}
                    required
                    placeholder="введите место тут..."
                    minLength="1"
                    maxLength="500"
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
                      * длина: не более 500 символов
                    </small>
                  </small>
                </label>
              </div>
              <div className="">
                <label className="w-100 form-control-sm">
                  Описание:
                  <textarea
                    className="form-control form-control-sm text-center m-0 p-1"
                    value={description}
                    required
                    placeholder="Полное описание"
                    minLength="1"
                    maxLength="5000"
                    rows="3"
                    onChange={(e) => descriptionSet(e.target.value)}
                  />
                  <small className="text-danger">* обязательно</small>
                  <p className="">
                    <small className="text-muted">
                      длина: не более 5000 символов
                    </small>
                  </p>
                </label>
              </div>
              <div className="">
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
              <br />
              <div className="">
                <p className="text-danger">
                  Я(мы) утверждаю(ем), что являюсь(ся) автором(и) данного
                  предложения. Мне(нам) также известно, что в случае признания
                  предложения коммерческой тайной подразделения, я(мы) обязан не
                  разглашать его сущность.
                </p>
              </div>
              <div className="">
                <label className="form-control-sm text-center m-0 p-1">
                  Участники:
                  <p>
                    <small className="fw-bold">
                      (Фамилия Имя Отчество) (Табельный номер) (Вклад в рац.
                      предложение) %
                    </small>
                  </p>
                </label>
              </div>
              <div className="">
                <label className="form-control-sm text-center m-0 p-1">
                  {dataUserListAll && (
                    <div>
                      <div className="">
                        <label className="form-control-sm text-center m-0 p-1">
                          участник №1:
                          <select
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user1}
                            required
                            onChange={(e) => user1Set(e.target.value)}
                          >
                            <option value="">Не выбрано</option>
                            {dataUserListAll.map((user, index) => (
                              <option key={index} value={user}>
                                {user}
                              </option>
                            ))}
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
                            min="0"
                            max="100"
                            onChange={(e) => user1PercSet(e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="">
                        <label className="form-control-sm text-center m-0 p-1">
                          участник №2:
                          <select
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user2}
                            onChange={(e) => user2Set(e.target.value)}
                          >
                            <option value="">Не выбрано</option>
                            {dataUserListAll.map((user, index) => (
                              <option key={index} value={user}>
                                {user}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="form-control-sm text-center m-0 p-1">
                          % Вклада 2 участника
                          <input
                            type="number"
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user2Perc}
                            placeholder="пример: 70%"
                            min="0"
                            max="100"
                            onChange={(e) => user2PercSet(e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="">
                        <label className="form-control-sm text-center m-0 p-1">
                          участник №3:
                          <select
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user3}
                            onChange={(e) => user3Set(e.target.value)}
                          >
                            <option value="">Не выбрано</option>
                            {dataUserListAll.map((user, index) => (
                              <option key={index} value={user}>
                                {user}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="form-control-sm text-center m-0 p-1">
                          % Вклада 3 участника
                          <input
                            type="number"
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user3Perc}
                            placeholder="пример: 70%"
                            min="0"
                            max="100"
                            onChange={(e) => user3PercSet(e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="">
                        <label className="form-control-sm text-center m-0 p-1">
                          участник №4:
                          <select
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user4}
                            onChange={(e) => user4Set(e.target.value)}
                          >
                            <option value="">Не выбрано</option>
                            {dataUserListAll.map((user, index) => (
                              <option key={index} value={user}>
                                {user}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="form-control-sm text-center m-0 p-1">
                          % Вклада 4 участника
                          <input
                            type="number"
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user4Perc}
                            placeholder="пример: 70%"
                            min="0"
                            max="100"
                            onChange={(e) => user4PercSet(e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="">
                        <label className="form-control-sm text-center m-0 p-1">
                          участник №5:
                          <select
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user5}
                            onChange={(e) => user5Set(e.target.value)}
                          >
                            <option value="">Не выбрано</option>
                            {dataUserListAll.map((user, index) => (
                              <option key={index} value={user}>
                                {user}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="form-control-sm text-center m-0 p-1">
                          % Вклада 5 участника
                          <input
                            type="number"
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user5Perc}
                            placeholder="пример: 70%"
                            min="0"
                            max="100"
                            onChange={(e) => user5PercSet(e.target.value)}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </label>
              </div>
              <div className="">
                <small className="text-muted">
                  * общая сумма вклада всех участников не должна превышать 100%
                </small>
              </div>
              <br />
              <div className="container-fluid text-center">
                <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                  <li className="m-1">
                    <button
                      type="submit"
                      className="btn btn-sm btn-outline-primary"
                    >
                      Отправить
                    </button>
                  </li>
                  <li className="m-1">
                    <button
                      type="reset"
                      className="btn btn-sm btn-outline-warning"
                      onClick={(e) => {
                        subdivisionSet("");
                        sphereSet("");
                        categorySet("");
                        avatarSet("");
                        nameSet("");
                        placeSet("");
                        descriptionSet("");
                        additionalWordSet("");
                        additionalPdfSet("");
                        additionalExcelSet("");
                        user1Set("");
                        user1PercSet("");
                        user2Set("");
                        user2PercSet("");
                        user3Set("");
                        user3PercSet("");
                        user4Set("");
                        user4PercSet("");
                        user5Set("");
                        user5PercSet("");
                      }}
                    >
                      Сбросить все данные
                    </button>
                  </li>
                </ul>
              </div>
            </form>
          </ul>
        )}
      </main>
      <components.FooterComponent />
    </body>
  );
};
