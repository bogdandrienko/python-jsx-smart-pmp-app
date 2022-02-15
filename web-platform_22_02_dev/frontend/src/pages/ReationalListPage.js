import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const ReationalListPage = () => {
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
        .slice(0, -14)}`;
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
      <main className="container text-center">
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
        <div className="container-fluid text-center">
          <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
            {/* {!dataBankIdeaList
              ? ""
              : dataBankIdeaList.map((data, index) => (
                  <BankIdeaComponent key={index} data={data} />
                ))} */}
            {!dataBankIdeaList
              ? ""
              : dataBankIdeaList.map((rational, index) => (
                  <li key={index} className="m-1">
                    <div className="card shadow-sm">
                      <div className="card-header">
                        <a
                          className="text-decoration-none lead text-dark"
                          href="#"
                        >
                          <strong>{rational["name_char_field"]}</strong>
                        </a>
                      </div>
                      <div className="card-header">
                        <form action="#" method="POST" className="m-1">
                          <label className="form-control-lg">
                            Скрыть идею:
                            <input
                              type="text"
                              id="hidden"
                              name="hidden"
                              required=""
                              placeholder=""
                              value="false"
                              minlength="0"
                              maxlength="64"
                              className="form-control form-control-lg d-none"
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
                        <form action="#" method="POST" className="m-1">
                          <label className="form-control-lg">
                            Одобрить идею:
                            <input
                              type="text"
                              id="hidden"
                              name="hidden"
                              required=""
                              placeholder=""
                              value="true"
                              minlength="0"
                              maxlength="64"
                              className="form-control form-control-lg d-none"
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
                        <div className="form-control-lg m-1">
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
                      <div className="card-body">
                        <div className="container-fluid m-1">
                          <a href="#">
                            <img
                              src={getStaticFile(
                                rational["avatar_image_field"]
                              )}
                              className="card-img-top img-fluid"
                              alt="id"
                            />
                          </a>
                        </div>
                        <div className="container-fluid m-1">
                          <small className="text-muted">
                            {rational["short_description_char_field"]}
                          </small>
                        </div>
                        <div className="container-fluid d-flex justify-content-between m-1">
                          <small className="text-muted">
                            подано:{" "}
                            {getCleanDateTime(
                              rational["created_datetime_field"]
                            )}
                          </small>
                          <small className="text-muted">
                            зарегистрировано:{" "}
                            {getCleanDateTime(
                              rational["register_datetime_field"]
                            )}
                          </small>
                        </div>
                        <div className="container-fluid btn-group">
                          <a
                            className="btn btn-sm btn-outline-primary m-1"
                            href="#"
                          >
                            Подробнее
                          </a>
                          <form className="m-1" action="#" method="POST">
                            <input
                              type="text"
                              id="type_slug_field"
                              name="type_slug_field"
                              required=""
                              placeholder=""
                              value="notifications"
                              className="form-control form-control-lg d-none"
                            />
                            <input
                              type="text"
                              id="name_char_field"
                              name="name_char_field"
                              required=""
                              placeholder=""
                              value="Жалоба на статью в банке идей"
                              className="form-control form-control-lg d-none"
                            />
                            <input
                              type="text"
                              id="text_field"
                              name="text_field"
                              required=""
                              placeholder=""
                              value="[ Пользователь: {{ request.user }} ] | [ id статьи: {{ idea.id }} ] | [ Автор статьи: {{ idea.author_foreign_key_field }} ] | [ Идея в банке идей: {{ idea.name_char_field }} ]"
                              className="form-control form-control-lg d-none"
                            />
                            <button
                              className="btn btn-sm btn-outline-danger"
                              type="submit"
                            >
                              Пожаловаться на идею
                            </button>
                          </form>
                        </div>
                      </div>
                      <div className="card-header">
                        <ul className="container-fluid col-auto col-md-auto col-lg-auto justify-content-center">
                          <li className="m-1">
                            <a href="#">
                              <div className="btn btn-sm btn-outline-danger">
                                Рейтинг\<sup>оценок</sup>: 1
                                <sup className="text-dark">1</sup>
                              </div>
                              <div className="btn btn-sm btn-outline-success">
                                Рейтинг\<sup>оценок</sup>: 1
                                <sup className="text-dark">2</sup>
                              </div>
                            </a>
                          </li>
                          <li className="m-1">
                            <a href="#" className="text-decoration-none">
                              <small className="text-success">
                                Вам понравилось
                              </small>
                              <small className="text-danger">
                                Вам не понравилось
                              </small>
                              <small className="text-secondary">
                                Вы не оценили
                              </small>
                            </a>
                          </li>
                          <li className="m-1">
                            <a href="#">
                              <div className="btn btn-sm btn-outline-secondary">
                                Комментариев: {rational.get_total_comment_value}
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <div className="text-end">
                          <a
                            className="text-decoration-none lead text-dark"
                            href="#"
                          >
                            <small># 1</small>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default ReationalListPage;
