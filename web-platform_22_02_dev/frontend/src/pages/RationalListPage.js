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
  const [premoderate, setPremoderate] = useState("");
  const [postmoderate, setPostmoderate] = useState("");

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
      const form = {
        subdivision: subdivision,
        premoderate: premoderate,
        postmoderate: postmoderate,
      };
      dispatch(rationalListAction(form));
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

  const submitChangeHandler = (e) => {
    e.preventDefault();

    const form = {
      subdivision: subdivision,
      premoderate: premoderate,
      postmoderate: postmoderate,
    };
    dispatch(rationalListAction(form));
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
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
              onChange={(e) => setSubdivision(e.target.value)}
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
          <label className="w-25 form-control-sm m-1">
            Заключение премодерации:
            <select
              id="category_slug_field"
              name="category_slug_field"
              required
              className="form-control form-control-sm"
              value={premoderate}
              onChange={(e) => setPremoderate(e.target.value)}
            >
              <option value="Приостановлено">Приостановлено</option>
              <option value="Принято">Принято</option>
              <option value="Принято с замечаниями">
                Принято с замечаниями
              </option>
              <option value="Отклонено">Отклонено</option>
            </select>
            <small className="text-muted">
              обязательно выбрать одну из категорий
            </small>
          </label>
          <label className="w-25 form-control-sm m-1">
            Заключение постмодерации:
            <select
              id="category_slug_field"
              name="category_slug_field"
              required
              className="form-control form-control-sm"
              value={postmoderate}
              onChange={(e) => setPostmoderate(e.target.value)}
            >
              <option value="Приостановлено">Приостановлено</option>
              <option value="Принято">Принято</option>
              <option value="Принято с замечаниями">
                Принято с замечаниями
              </option>
              <option value="Отклонено">Отклонено</option>
            </select>
            <small className="text-muted">
              обязательно выбрать одну из категорий
            </small>
          </label>
          <label className="form-control-sm m-1">
            <button
              onClick={submitChangeHandler}
              className="btn btn-sm btn-primary"
            >
              Обновить
            </button>
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
                              {rational["number_char_field"]}
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
                          <div>
                            <label className="form-control-sm m-1">
                              {rational["avatar_image_field"] ? (
                                <img
                                  src={getStaticFile(
                                    rational["avatar_image_field"]
                                  )}
                                  className="card-img-top img-fluid w-50"
                                  alt="id"
                                />
                              ) : (
                                <img
                                  src="/static/media/uploads/rational/default_rational.jpg"
                                  className="card-img-top img-fluid w-50"
                                  alt="id"
                                />
                              )}
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="w-100 form-control-sm">
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
                        <div>
                          <label className="w-100 form-control-sm">
                            Краткое описание:
                            <textarea
                              id="short_description_char_field"
                              name="short_description_char_field"
                              required
                              placeholder="Краткое описание"
                              value={rational["short_description_char_field"]}
                              minLength="1"
                              maxLength="200"
                              rows="2"
                              className="form-control form-control-sm"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="container-fluid text-center">
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
