import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
  rationalCreateAction,
  rationalListAction,
  userDetailsAction,
} from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import LoaderComponent from "../components/LoaderComponent";
import MessageComponent from "../components/MessageComponent";
// import BankIdeaComponent from "../components/BankIdeaComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RationalListPage = () => {
  const dispatch = useDispatch();

  const [subdivision, setSubdivision] = useState("");

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;
  console.log("dataUserDetails: ", dataUserDetails);

  useEffect(() => {
    if (dataUserDetails) {
    } else {
      dispatch(userDetailsAction());
    }
  }, [dispatch, dataUserDetails]);

  const rationalListStore = useSelector((state) => state.rationalListStore);
  const {
    load: loadBankIdeaList,
    data: dataBankIdeaList,
    error: errorBankIdeaList,
    fail: failBankIdeaList,
  } = rationalListStore;
  console.log("dataBankIdeaList: ", dataBankIdeaList);

  useEffect(() => {
    if (dataBankIdeaList) {
    } else {
      dispatch(rationalListAction("RATIONAL_LIST", subdivision));
    }
  }, [dispatch, dataBankIdeaList]);

  function getStaticFile(str) {
    return `/static${str}`;
  }

  function getCleanDateTime(dateTime) {
    try {
      return `${dateTime.split("T")[0]} ${dateTime
        .split("T")[1]
        .slice(0, -16)}`;
    } catch (error) {
      return "ошибка даты";
    }
  }

  const submitChangeSubdivisionHandler = (e) => {
    e.preventDefault();
    setSubdivision(e.target.value);
    dispatch(rationalListAction("RATIONAL_LIST", subdivision));
  };

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Все идеи"}
        second={"страница содержит все идеи в банке идей."}
      />
      <main className="container-fluid text-center">
        <div className="text-center">
          {loadBankIdeaList && <LoaderComponent />}
          {dataBankIdeaList && (
            <div className="m-1">
              <MessageComponent variant="success">
                Данные успешно получены!
              </MessageComponent>
            </div>
          )}
          {errorBankIdeaList && (
            <div className="m-1">
              <MessageComponent variant="danger">
                {errorBankIdeaList}
              </MessageComponent>
            </div>
          )}
          {failBankIdeaList && (
            <div className="m-1">
              <MessageComponent variant="warning">
                {failBankIdeaList}
              </MessageComponent>
            </div>
          )}
        </div>
        <div className="">
          <label className="form-control-sm m-1">
            Наименование структурного подразделения:
            <select
              id="subdivision"
              name="subdivision"
              required
              className="form-control form-control-sm"
              value={subdivision}
              onChange={submitChangeSubdivisionHandler}
            >
              <option value="">Не выбрано</option>
              <option value="Управление">Управление</option>
              <option value="Обогатительный комплекс">
                Обогатительный комплекс
              </option>
              <option value="Горно-транспортный комплекс">
                Горно-транспортный комплекс
              </option>
              <option value="Автотранспортное предприятие">
                Автотранспортное предприятие
              </option>
              <option value="Энергоуправление">Энергоуправление</option>
            </select>
            <small className="text-danger">* обязательно</small>
          </label>
          <ul className="row row-cols-1 row-cols-md-3 row-cols-lg-4 nav justify-content-center">
            {!dataBankIdeaList ? (
              <div className="text-center text-danger lead">
                Рац. предложения не получены! Попробуйте обновить страницу или
                зайдите позже!
              </div>
            ) : (
              dataBankIdeaList.map((rational, index) => (
                <li key={index} className="container-fluid m-1">
                  <div className="card shadow">
                    <div>
                      <div className="">
                        <div className="card-header">
                          <h6 className="lead fw-bold">
                            {rational["name_char_field"]}
                          </h6>
                        </div>
                        <div className="d-flex w-100 align-items-center justify-content-between">
                          <label className="form-control-sm m-1">
                            Наименование структурного подразделения:
                            <select
                              id="subdivision"
                              name="subdivision"
                              required
                              className="form-control form-control-sm"
                            >
                              <option value="">
                                {rational["subdivision_char_field"]}
                              </option>
                            </select>
                          </label>
                          <label className="w-100 form-control-sm m-1">
                            Зарегистрировано за №{" "}
                            <strong className="btn btn-light disabled">
                              XXX.XXX.XXX
                            </strong>
                          </label>
                        </div>
                        <div>
                          <label className="form-control-sm m-1">
                            Сфера рац. предложения:
                            <select
                              id="sphere"
                              name="sphere"
                              required
                              className="form-control form-control-sm"
                            >
                              <option value="">
                                {rational["sphere_char_field"]}
                              </option>
                            </select>
                          </label>
                          <label className="form-control-sm m-1">
                            Категория:
                            <select
                              id="category"
                              name="category"
                              required
                              className="form-control form-control-sm"
                            >
                              <option value="">
                                {rational["category_char_field"]}
                              </option>
                            </select>
                          </label>
                          <label className="form-control-sm m-1">
                            <img
                              src={getStaticFile(
                                rational["avatar_image_field"]
                              )}
                              className="card-img-top img-fluid w-50"
                              alt="id"
                            />
                          </label>
                        </div>
                        <br />
                        <div>
                          <label className="w-100 form-control-sm m-1">
                            Предполагаемое место внедрения:
                            <input
                              type="text"
                              id="name_char_field"
                              name="name_char_field"
                              required
                              placeholder="Цех / участок / отдел / лаборатория и т.п."
                              value={rational["place_char_field"]}
                              minLength="1"
                              maxLength="100"
                              className="form-control form-control-sm"
                            />
                          </label>
                        </div>
                        <br />
                        <div>
                          <label className="w-100 form-control-sm m-1">
                            Краткое описание:
                            <textarea
                              id="short_description_char_field"
                              name="short_description_char_field"
                              required
                              placeholder="Краткое описание"
                              value={rational["short_description_char_field"]}
                              minLength="1"
                              maxLength="200"
                              rows="1"
                              className="form-control form-control-sm"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="container-fluid d-flex justify-content-between">
                        <a
                          className="btn btn-sm btn-warning m-1 disabled"
                          href="#"
                        >
                          Автор: {rational.user_model.last_name_char_field}{" "}
                          {rational.user_model.first_name_char_field}{" "}
                          {rational.user_model.patronymic_char_field}{" "}
                          {rational.user_model.position_char_field}
                        </a>
                      </div>
                      <div className="container-fluid d-flex justify-content-between p-0">
                        <small className="text-muted border">
                          подано:{" "}
                          <p>
                            {getCleanDateTime(
                              rational["created_datetime_field"]
                            )}
                          </p>
                        </small>
                        <small className="text-muted border">
                          зарегистрировано:{" "}
                          <p>
                            {getCleanDateTime(
                              rational["register_datetime_field"]
                            )}
                          </p>
                        </small>
                      </div>
                    </div>
                    <div className="card-header">
                      <a className="btn btn-sm btn-primary m-1 w-100" href="#">
                        Подробнее
                      </a>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default RationalListPage;
