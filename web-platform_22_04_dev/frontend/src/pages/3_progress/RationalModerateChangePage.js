// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";

import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const RationalModerateChangePage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const id = useParams().id;
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [firstRefresh, firstRefreshSet] = useState(true);
  //////////////////////////////////////////////////////////
  const [moderate, moderateSet] = useState("");
  const [moderateComment, moderateCommentSet] = useState("");
  //////////////////////////////////////////////////////////
  const [subdivision, subdivisionSet] = useState("");
  const [category, categorySet] = useState("");
  const [clearImage, clearImageSet] = useState(false);
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
  const rationalDetailStore = useSelector((state) => state.rationalDetailStore);
  const {
    // load: loadRationalDetail,
    data: dataRationalDetail,
    // error: errorRationalDetail,
    // fail: failRationalDetail,
  } = rationalDetailStore;
  // TODO reset state //////////////////////////////////////////////////////////////////////////////////////////////////
  const resetState = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    clearImageSet(false);
    dispatch({ type: constants.RATIONAL_DETAIL.reset });
  };
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!dataRationalDetail) {
      const form = {
        "Action-type": "RATIONAL_DETAIL",
        id: id,
      };
      dispatch(
        utils.ActionConstructorUtility(
          form,
          "/api/auth/rational/",
          "POST",
          30000,
          constants.RATIONAL_DETAIL
        )
      );
    } else {
      if (firstRefresh) {
        firstRefreshSet(false);
        resetState();
      } else {
        subdivisionSet(dataRationalDetail["subdivision_char_field"]);
        categorySet(dataRationalDetail["category_char_field"]);
        avatarSet(null);
        nameSet(dataRationalDetail["name_char_field"]);
        placeSet(dataRationalDetail["place_char_field"]);
        descriptionSet(dataRationalDetail["description_text_field"]);
        user1Set(dataRationalDetail["author_1_foreign_key_field"]);
        if (dataRationalDetail["author_1_perc_char_field"]) {
          user1PercSet(
            dataRationalDetail["author_1_perc_char_field"].split("%")[0]
          );
        }
        user2Set(dataRationalDetail["author_2_foreign_key_field"]);
        if (dataRationalDetail["author_2_perc_char_field"]) {
          user2PercSet(
            dataRationalDetail["author_2_perc_char_field"].split("%")[0]
          );
        }
        user3Set(dataRationalDetail["author_3_foreign_key_field"]);
        if (dataRationalDetail["author_3_perc_char_field"]) {
          user3PercSet(
            dataRationalDetail["author_3_perc_char_field"].split("%")[0]
          );
        }
        user4Set(dataRationalDetail["author_4_foreign_key_field"]);
        if (dataRationalDetail["author_4_perc_char_field"]) {
          user4PercSet(
            dataRationalDetail["author_4_perc_char_field"].split("%")[0]
          );
        }
        user5Set(dataRationalDetail["author_5_foreign_key_field"]);
        if (dataRationalDetail["author_5_perc_char_field"]) {
          user5PercSet(
            dataRationalDetail["author_5_perc_char_field"].split("%")[0]
          );
        }
      }
    }
  }, [dataRationalDetail, firstRefreshSet]);
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main className="container">
        <div className="btn-group m-0 p-1 text-start w-100">
          <Link
            to={"/idea_moderate_list"}
            className="btn btn-sm btn-primary m-1 p-2"
          >
            {"<="} назад к списку
          </Link>
        </div>
        <components.AccordionComponent
          key_target={"accordion1"}
          isCollapse={true}
          title={"Модерация:"}
          text_style="text-danger"
          header_style="bg-danger bg-opacity-10 custom-background-transparent-low"
          body_style="bg-light bg-opacity-10 custom-background-transparent-low"
        >
          {
            <ul className="row-cols-auto row-cols-sm-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center m-0 p-0">
              <form className="m-0 p-0">
                <div className="card shadow custom-background-transparent-hard m-0 p-0">
                  <div className="card-header m-0 p-0">
                    <label className="lead m-0 p-1">
                      Выберите заключение по идеи{" "}
                      <p className="fw-bold text-secondary m-0 p-0">
                        заполните комментарий "на доработку", чтобы автор идеи
                        его увидел
                      </p>
                    </label>
                  </div>
                  <div className="card-body m-0 p-0">
                    <label className="form-control-sm text-center m-0 p-1">
                      Заключение:
                      <select
                        required
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={moderate}
                        onChange={(e) => moderateSet(e.target.value)}
                      >
                        <option value="">не выбрано</option>
                        <option value="на модерации">на модерации</option>
                        <option value="на доработку">на доработку</option>
                        <option value="скрыто">скрыто</option>
                        <option value="принято">принято</option>
                      </select>
                      <small className="text-danger">* обязательно</small>
                    </label>
                    {moderate === "на доработку" && (
                      <label className="w-75 form-control-sm">
                        Комментарий:
                        <input
                          type="text"
                          className="form-control form-control-sm text-center m-0 p-1"
                          value={moderateComment}
                          placeholder="вводите комментарий тут..."
                          minLength="1"
                          maxLength="300"
                          onChange={(e) =>
                            moderateCommentSet(
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
                            * только кириллица, цифры и пробел
                          </small>
                          <small className="text-muted m-0 p-0">
                            {" "}
                            * длина: не более 300 символов
                          </small>
                        </small>
                      </label>
                    )}
                  </div>
                  <div className="card-footer m-0 p-0">
                    <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                      <button
                        className="btn btn-sm btn-danger m-1 p-2"
                        type="submit"
                      >
                        <i className="fa-solid fa-circle-check m-0 p-1" />
                        вынести заключение
                      </button>
                    </ul>
                  </div>
                </div>
              </form>
            </ul>
          }
        </components.AccordionComponent>
        <components.StoreStatusComponent
          storeStatus={rationalDetailStore}
          keyStatus={"rationalDetailStore"}
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
        {dataRationalDetail && (
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center m-0 p-1">
            <form className="m-0 p-0">
              <div className="card shadow custom-background-transparent-low m-0 p-0">
                <div className="card-header bg-success bg-opacity-10 m-0 p-3">
                  <h6 className="lead fw-bold m-0 p-0">
                    {dataRationalDetail["name_char_field"]}
                  </h6>
                  <h6 className="text-danger lead small m-0 p-0">
                    {" [ "}
                    {utils.GetSliceString(
                      dataRationalDetail["status_moderate_char_field"],
                      30
                    )}
                    {" : "}
                    {utils.GetSliceString(
                      dataRationalDetail["comment_moderate_char_field"],
                      30
                    )}
                    {" ]"}
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
                      Зарегистрировано за №
                      <strong className="btn btn-light disabled">
                        {`${dataRationalDetail["number_char_field"]}`}
                      </strong>
                    </label>
                  </div>
                  <div className="m-0 p-1">
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
                        <option className="m-0 p-0" value="социальное/персонал">
                          социальное/персонал
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
                    <img
                      src={utils.GetStaticFile(
                        dataRationalDetail["image_field"]
                      )}
                      className="card-img-top img-fluid w-25 m-0 p-1"
                      alt="изображение отсутствует"
                    />
                    <label className="form-control-sm form-switch text-center m-0 p-1">
                      Удалить текущее изображение:
                      <input
                        type="checkbox"
                        className="form-check-input m-0 p-1"
                        id="flexSwitchCheckDefault"
                        defaultChecked={clearImage}
                        onClick={(e) => clearImageSet(!clearImage)}
                      />
                    </label>
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
                  <div className="m-0 p-0">
                    <Link to={`#`} className="btn btn-sm btn-warning m-0 p-2">
                      Автор:{" "}
                      {dataRationalDetail["user_model"]["last_name_char_field"]}{" "}
                      {
                        dataRationalDetail["user_model"][
                          "first_name_char_field"
                        ]
                      }{" "}
                      {dataRationalDetail["user_model"]["position_char_field"]}
                    </Link>
                  </div>
                  <div className="m-0 p-0">
                    {user1 && (
                      <div className="m-0 p-0">
                        <label className="form-control-sm text-center m-0 p-1">
                          участник №1:
                          <select
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user1}
                            required
                            onChange={(e) => user1Set(e.target.value)}
                          >
                            <option value="">
                              {user1["last_name_char_field"]}{" "}
                              {user1["first_name_char_field"]}{" "}
                              {user1["patronymic_char_field"]}{" "}
                              {user1["position_char_field"]}
                            </option>
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
                    )}
                    {user2 && (
                      <div className="m-0 p-0">
                        <label className="form-control-sm text-center m-0 p-1">
                          участник №2:
                          <select
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user2}
                            onChange={(e) => user2Set(e.target.value)}
                          >
                            <option value="">
                              {user2["last_name_char_field"]}{" "}
                              {user2["first_name_char_field"]}{" "}
                              {user2["patronymic_char_field"]}{" "}
                              {user2["position_char_field"]}
                            </option>
                          </select>
                        </label>
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
                      </div>
                    )}
                    {user3 && (
                      <div className="m-0 p-0">
                        <label className="form-control-sm text-center m-0 p-1">
                          участник №3:
                          <select
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user3}
                            onChange={(e) => user3Set(e.target.value)}
                          >
                            <option value="">
                              {user3["last_name_char_field"]}{" "}
                              {user3["first_name_char_field"]}{" "}
                              {user3["patronymic_char_field"]}{" "}
                              {user3["position_char_field"]}
                            </option>
                          </select>
                        </label>
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
                      </div>
                    )}
                    {user4 && (
                      <div className="m-0 p-0">
                        <label className="form-control-sm text-center m-0 p-1">
                          участник №4:
                          <select
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user4}
                            onChange={(e) => user4Set(e.target.value)}
                          >
                            <option value="">
                              {user4["last_name_char_field"]}{" "}
                              {user4["first_name_char_field"]}{" "}
                              {user4["patronymic_char_field"]}{" "}
                              {user4["position_char_field"]}
                            </option>
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
                    )}
                    {user5 && (
                      <div className="m-0 p-0">
                        <label className="form-control-sm text-center m-0 p-1">
                          участник №5:
                          <select
                            className="form-control form-control-sm text-center m-0 p-1"
                            value={user5}
                            onChange={(e) => user5Set(e.target.value)}
                          >
                            <option value="">
                              {user5["last_name_char_field"]}{" "}
                              {user5["first_name_char_field"]}{" "}
                              {user5["patronymic_char_field"]}{" "}
                              {user5["position_char_field"]}
                            </option>
                          </select>
                        </label>
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
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-between m-0 p-1">
                    <label className="text-muted border p-1 m-0 p-1">
                      подано:{" "}
                      <p className="m-0 p-0">
                        {utils.GetCleanDateTime(
                          dataRationalDetail["created_datetime_field"],
                          true
                        )}
                      </p>
                    </label>
                    <label className="text-muted border p-1 m-0 p-1">
                      зарегистрировано:{" "}
                      <p className="m-0 p-0">
                        {utils.GetCleanDateTime(
                          dataRationalDetail["register_datetime_field"],
                          true
                        )}
                      </p>
                    </label>
                  </div>
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
