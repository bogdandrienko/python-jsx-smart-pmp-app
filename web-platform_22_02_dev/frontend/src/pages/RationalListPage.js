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

  const submitHandler = (e) => {
    e.preventDefault();
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
          <ul className="row row-cols-1 row-cols-md-3 row-cols-lg-4 nav justify-content-center">
            {!dataBankIdeaList
              ? ""
              : dataBankIdeaList.map((rational, index) => (
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
                              <strong className="btn btn-light">
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
                            <label className="w-100 form-control-sm m-1">
                              Полное описание:
                              <textarea
                                id="full_description_text_field"
                                name="full_description_text_field"
                                required
                                placeholder="Полное описание"
                                value={rational["description_text_field"]}
                                minLength="1"
                                maxLength="5000"
                                rows="3"
                                className="form-control form-control-sm"
                              />
                            </label>
                          </div>
                          <br />
                          <div>
                            <label className="form-control-sm m-1">
                              Word файл-приложение:
                              <a
                                className="btn btn-sm btn-primary m-1"
                                href={getStaticFile(
                                  rational["additional_word_file_field"]
                                )}
                              >
                                Скачать excel-документ
                              </a>
                            </label>
                            <label className="form-control-sm m-1">
                              Pdf файл-приложение:
                              <a
                                className="btn btn-sm btn-danger m-1"
                                href={getStaticFile(
                                  rational["additional_pdf_file_field"]
                                )}
                              >
                                Скачать excel-документ
                              </a>
                            </label>
                            <label className="form-control-sm m-1">
                              Excel файл-приложение:
                              <a
                                className="btn btn-sm btn-success m-1"
                                href={getStaticFile(
                                  rational["additional_excel_file_field"]
                                )}
                              >
                                Скачать excel-документ
                              </a>
                            </label>
                          </div>
                          <div>
                            <label className="w-100 form-control-sm m-1">
                              Участники:
                              <input
                                type="text"
                                id="name_char_field"
                                name="name_char_field"
                                placeholder="участник № 1, пример: Андриенко Богдан Николаевич 931777 70%"
                                minLength="0"
                                maxLength="200"
                                className="form-control form-control-sm"
                              />
                              <input
                                type="text"
                                id="name_char_field"
                                name="name_char_field"
                                placeholder="участник № 2, пример: Андриенко Богдан Николаевич 931777 70%"
                                minLength="0"
                                maxLength="200"
                                className="form-control form-control-sm"
                              />
                              <input
                                type="text"
                                id="name_char_field"
                                name="name_char_field"
                                placeholder="участник № 3, пример: Андриенко Богдан Николаевич 931777 70%"
                                minLength="0"
                                maxLength="200"
                                className="form-control form-control-sm"
                              />
                              <input
                                type="text"
                                id="name_char_field"
                                name="name_char_field"
                                placeholder="участник № 4, пример: Андриенко Богдан Николаевич 931777 70%"
                                minLength="0"
                                maxLength="200"
                                className="form-control form-control-sm"
                              />
                              <input
                                type="text"
                                id="name_char_field"
                                name="name_char_field"
                                placeholder="участник № 5, пример: Андриенко Богдан Николаевич 931777 70%"
                                minLength="0"
                                maxLength="200"
                                className="form-control form-control-sm"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="container-fluid d-flex justify-content-between">
                          <a
                            className="btn btn-sm btn-outline-warning m-1"
                            href="#"
                          >
                            Автор: {rational.user_model.last_name_char_field}{" "}
                            {rational.user_model.first_name_char_field}{" "}
                            {rational.user_model.patronymic_char_field}
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
