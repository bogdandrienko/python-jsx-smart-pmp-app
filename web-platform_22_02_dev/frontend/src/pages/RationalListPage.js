import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { rationalListAction } from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import LoaderComponent from "../components/LoaderComponent";
import MessageComponent from "../components/MessageComponent";
// import BankIdeaComponent from "../components/BankIdeaComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RationalListPage = () => {
  const dispatch = useDispatch();

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
      dispatch(rationalListAction("RATIONAL_LIST"));
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
          <ul className="row row-cols-1 row-cols-md-3 row-cols-lg-4 nav justify-content-center">
            {!dataBankIdeaList
              ? ""
              : dataBankIdeaList.map((rational, index) => (
                  <li key={index} className="m-3">
                    <div className="card shadow">
                      <div className="card-header p-0">
                        <a
                          className="text-decoration-none lead text-dark"
                          href="#"
                        >
                          <strong>{rational["name_char_field"]}</strong>
                        </a>
                      </div>
                      <div className="card-header p-0">
                        <form action="#" method="POST" className="">
                          <label className="form-control-sm">
                            Скрыть идею:
                            <input
                              type="text"
                              id="hidden"
                              name="hidden"
                              required=""
                              placeholder=""
                              value="false"
                              minLength="0"
                              maxLength="64"
                              className="form-control form-control-sm d-none"
                            />
                            <small className="text-muted">
                              ! функционал модератора !
                            </small>
                          </label>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            type="submit"
                          >
                            скрыть
                          </button>
                        </form>
                        <form action="#" method="POST" className="">
                          <label className="form-control-sm">
                            Одобрить идею:
                            <input
                              type="text"
                              id="hidden"
                              name="hidden"
                              required=""
                              placeholder=""
                              value="true"
                              minLength="0"
                              maxLength="64"
                              className="form-control form-control-sm d-none"
                            />
                            <small className="text-muted">
                              ! функционал модератора !
                            </small>
                          </label>
                          <button
                            className="btn btn-sm btn-outline-success"
                            type="submit"
                          >
                            одобрить
                          </button>
                        </form>
                        <div className="form-control-sm">
                          Редактировать идею:
                          <a
                            className="btn btn-sm btn-outline-warning"
                            target="_blank"
                            href="#"
                          >
                            Редактировать
                          </a>
                        </div>
                        <div className="container-fluid d-flex justify-content-between">
                          <a
                            className="btn btn-sm btn-outline-success m-1"
                            href="#"
                          >
                            Автор: {rational.user_model.last_name_char_field}{" "}
                            {rational.user_model.first_name_char_field}{" "}
                            {rational.user_model.patronymic_char_field}
                          </a>
                          <a
                            className="btn btn-sm btn-outline-secondary"
                            href="#"
                          >
                            {rational.category_char_field}
                          </a>
                        </div>
                      </div>
                      <div className="card-header p-0">
                        <div className="container-fluid d-flex justify-content-between">
                          <a
                            className="btn btn-sm btn-outline-success m-1"
                            href="#"
                          >
                            Место: {rational.place_char_field}
                          </a>
                          <a
                            className="btn btn-sm btn-outline-secondary"
                            href="#"
                          >
                            {rational.category_char_field}
                          </a>
                        </div>
                      </div>
                      <div className="card-body p-0">
                        <a
                          className="text-decoration-none lead text-dark"
                          href="#"
                        >
                          <img
                            src={getStaticFile(rational["avatar_image_field"])}
                            className="card-img-top img-fluid w-100"
                            alt="id"
                          />
                        </a>
                      </div>
                      <div className="card-body p-0">
                        <div className="container-fluid">
                          <small className="text-muted">
                            {rational["short_description_char_field"]}
                          </small>
                        </div>
                        <div className="container-fluid btn-group">
                          <a
                            className="btn btn-sm btn-outline-primary m-1"
                            href="#"
                          >
                            Подробнее
                          </a>
                        </div>
                        <div className="container-fluid p-0">
                          <small className="text-muted text-end">
                            подано:{" "}
                            {getCleanDateTime(
                              rational["created_datetime_field"]
                            )}
                            <p className="text-start">
                              зарегистрировано:{" "}
                              {getCleanDateTime(
                                rational["register_datetime_field"]
                              )}
                            </p>
                          </small>
                        </div>
                      </div>
                      <div className="card-body p-0">
                        <div className="text-end">
                          <small># {rational["id"]}</small>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
        <div className="container">
          <br />
          <hr />
          <br />
          <form
            action="#"
            method="POST"
            target="_self"
            encType="multipart/form-data"
            name="idea_create"
            autoComplete="on"
            className="text-center"
          >
            <div>
              <div className="bg-warning bg-opacity-10">
                <div>
                  <label className="w-25 form-control-sm m-1">
                    Заключение:
                    <select
                      id="category_slug_field"
                      name="category_slug_field"
                      required
                      className="form-control form-control-sm"
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
                  <label className="w-50 form-control-sm m-1">
                    Должность, название отдела:
                    <input
                      type="text"
                      id="name_char_field"
                      name="name_char_field"
                      required=""
                      placeholder="Ширшов А.А., зам. начальника по развитию ЭУ"
                      minLength="1"
                      maxLength="64"
                      className="form-control form-control-sm"
                    />
                    <small className="text-muted">
                      длина: не более 64 символов
                    </small>
                  </label>
                </div>
                <div className="container-fluid text-center">
                  <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                    <li className="m-1">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        type="submit"
                      >
                        Подтвердить
                      </button>
                    </li>
                    <li className="m-1">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        type="reset"
                      >
                        Сбросить
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
          <br />
          <hr />
          <br />
          <form
            action="#"
            method="POST"
            target="_self"
            encType="multipart/form-data"
            name="idea_create"
            autoComplete="on"
            className="text-center"
          >
            <div>
              <div className="bg-danger bg-opacity-10">
                <div>
                  <label className="w-25 form-control-sm m-1">
                    Принятое решение:
                    <select
                      id="category_slug_field"
                      name="category_slug_field"
                      required
                      className="form-control form-control-sm"
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
                  <label className="w-50 form-control-sm m-1">
                    Должность, название отдела:
                    <input
                      type="text"
                      id="name_char_field"
                      name="name_char_field"
                      required=""
                      placeholder="Ширшов А.А., зам. начальника по развитию ЭУ"
                      minLength="1"
                      maxLength="64"
                      className="form-control form-control-sm"
                    />
                    <small className="text-muted">
                      длина: не более 64 символов
                    </small>
                  </label>
                </div>
                <div>
                  <label className="w-100 form-control-sm m-1">
                    Ответственные за внедрение:
                    <p>
                      <small className="text-danger">
                        внимание, вводить участников согласно нужного формата:
                      </small>
                    </p>
                    <p>
                      <small className="fw-bold">
                        (Фамилия) (Имя) (Отчество) (Табельный) (Должность);
                      </small>
                    </p>
                    <textarea
                      id="full_description_text_field"
                      name="full_description_text_field"
                      required=""
                      placeholder="формат ввода: Андриенко Богдан Николаевич 93177 Техник-программист; Пышный Виктор Юрьевич 4405 Инженер-программист;"
                      minLength="1"
                      maxLength="2048"
                      rows="2"
                      className="form-control form-control-sm"
                    />
                    <small className="text-muted">
                      длина: не более 2048 символов
                    </small>
                  </label>
                </div>
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <label className="form-control-sm m-1">
                    Удостоверение на рац. предложение получено:
                  </label>
                  <label className="w-100 form-control-sm m-1">
                    «
                    <input
                      type="text"
                      id="avatar_image_field"
                      name="avatar_image_field"
                      accept=".jpg, .png"
                      className="w-25 form-control-sm"
                    />
                    » от 15 02 2022 г.
                  </label>
                </div>
                <div className="container-fluid text-center">
                  <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                    <li className="m-1">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        type="submit"
                      >
                        Подтвердить
                      </button>
                    </li>
                    <li className="m-1">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        type="reset"
                      >
                        Сбросить
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
          <br />
          <hr />
          <br />
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default RationalListPage;
