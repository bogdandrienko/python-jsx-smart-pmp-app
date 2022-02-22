import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { rationalDetailAction, userDetailsAction } from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import LoaderComponent from "../components/LoaderComponent";
import MessageComponent from "../components/MessageComponent";
// import BankIdeaComponent from "../components/BankIdeaComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RationalDetailPage = () => {
  const dispatch = useDispatch();

  const [preModerateAuthor, setPreModerateAuthor] = useState("");

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
      if (dataUserDetails["user_model"] && preModerateAuthor === "") {
        setPreModerateAuthor(
          `${dataUserDetails["user_model"]["last_name_char_field"]} ${dataUserDetails["user_model"]["first_name_char_field"]} ${dataUserDetails["user_model"]["patronymic_char_field"]} ${dataUserDetails["user_model"]["personnel_number_slug_field"]} ${dataUserDetails["user_model"]["position_char_field"]}`
        );
      }
    } else {
      dispatch(userDetailsAction());
    }
  }, [dispatch, dataUserDetails]);

  const rationalDetailStore = useSelector((state) => state.rationalDetailStore);
  const {
    load: loadRationalDetail,
    data: dataRationalDetail,
    error: errorRationalDetail,
    fail: failRationalDetail,
  } = rationalDetailStore;
  console.log("dataRationalDetail: ", dataRationalDetail);

  useEffect(() => {
    if (dataRationalDetail) {
    } else {
      const form = {
        id: 41,
      };
      dispatch(rationalDetailAction(form));
    }
  }, [dispatch, dataRationalDetail]);

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
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Все идеи"}
        second={"страница содержит все идеи в банке идей."}
      />
      <main className="container-fluid text-center">
        <div className="text-center">
          {loadRationalDetail && <LoaderComponent />}
          {dataRationalDetail && (
            <div className="m-1">
              <MessageComponent variant="success">
                Данные успешно получены!
              </MessageComponent>
            </div>
          )}
          {errorRationalDetail && (
            <div className="m-1">
              <MessageComponent variant="danger">
                {errorRationalDetail}
              </MessageComponent>
            </div>
          )}
          {failRationalDetail && (
            <div className="m-1">
              <MessageComponent variant="warning">
                {failRationalDetail}
              </MessageComponent>
            </div>
          )}
        </div>
        <div className="">
          <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-2 nav justify-content-center">
            {!dataRationalDetail ? (
              ""
            ) : (
              <li className="container-fluid m-1">
                <div className="card shadow">
                  <div>
                    <div className="">
                      <div className="card-header">
                        <h6 className="lead fw-bold">
                          {dataRationalDetail["name_char_field"]}
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
                              {dataRationalDetail["subdivision_char_field"]}
                            </option>
                          </select>
                        </label>
                        <label className="w-100 form-control-sm m-1">
                          Зарегистрировано за №{" "}
                          <strong className="btn btn-light disabled">
                            {dataRationalDetail["number_char_field"]}
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
                              {dataRationalDetail["sphere_char_field"]}
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
                              {dataRationalDetail["category_char_field"]}
                            </option>
                          </select>
                        </label>
                        <div>
                          <label className="form-control-sm m-1">
                            {dataRationalDetail["avatar_image_field"] ? (
                              <img
                                src={getStaticFile(
                                  dataRationalDetail["avatar_image_field"]
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
                        <label className="w-100 form-control-sm m-1">
                          Предполагаемое место внедрения:
                          <input
                            type="text"
                            id="name_char_field"
                            name="name_char_field"
                            required
                            placeholder="Цех / участок / отдел / лаборатория и т.п."
                            value={dataRationalDetail["place_char_field"]}
                            minLength="1"
                            maxLength="100"
                            className="form-control form-control-sm"
                          />
                        </label>
                      </div>
                      <div>
                        <label className="w-100 form-control-sm m-1">
                          Краткое описание:
                          <textarea
                            id="short_description_char_field"
                            name="short_description_char_field"
                            required
                            placeholder="Краткое описание"
                            value={
                              dataRationalDetail["short_description_char_field"]
                            }
                            minLength="1"
                            maxLength="200"
                            rows="2"
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
                            value={dataRationalDetail["description_text_field"]}
                            minLength="1"
                            maxLength="5000"
                            rows="3"
                            className="form-control form-control-sm"
                          />
                        </label>
                      </div>
                      <div>
                        <label className="form-control-sm m-1">
                          Word файл-приложение:
                          <a
                            className="btn btn-sm btn-primary m-1"
                            href={getStaticFile(
                              dataRationalDetail["additional_word_file_field"]
                            )}
                          >
                            Скачать документ
                          </a>
                        </label>
                        <label className="form-control-sm m-1">
                          Pdf файл-приложение:
                          <a
                            className="btn btn-sm btn-danger m-1"
                            href={getStaticFile(
                              dataRationalDetail["additional_pdf_file_field"]
                            )}
                          >
                            Скачать документ
                          </a>
                        </label>
                        <label className="form-control-sm m-1">
                          Excel файл-приложение:
                          <a
                            className="btn btn-sm btn-success m-1"
                            href={getStaticFile(
                              dataRationalDetail["additional_excel_file_field"]
                            )}
                          >
                            Скачать документ
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
                            value={dataRationalDetail["user1_char_field"]}
                            minLength="0"
                            maxLength="200"
                            className="form-control form-control-sm"
                          />
                          <input
                            type="text"
                            id="name_char_field"
                            name="name_char_field"
                            placeholder="участник № 2, пример: Андриенко Богдан Николаевич 931777 70%"
                            value={dataRationalDetail["user2_char_field"]}
                            minLength="0"
                            maxLength="200"
                            className="form-control form-control-sm"
                          />
                          <input
                            type="text"
                            id="name_char_field"
                            name="name_char_field"
                            placeholder="участник № 3, пример: Андриенко Богдан Николаевич 931777 70%"
                            value={dataRationalDetail["user3_char_field"]}
                            minLength="0"
                            maxLength="200"
                            className="form-control form-control-sm"
                          />
                          <input
                            type="text"
                            id="name_char_field"
                            name="name_char_field"
                            placeholder="участник № 4, пример: Андриенко Богдан Николаевич 931777 70%"
                            value={dataRationalDetail["user4_char_field"]}
                            minLength="0"
                            maxLength="200"
                            className="form-control form-control-sm"
                          />
                          <input
                            type="text"
                            id="name_char_field"
                            name="name_char_field"
                            placeholder="участник № 5, пример: Андриенко Богдан Николаевич 931777 70%"
                            value={dataRationalDetail["user5_char_field"]}
                            minLength="0"
                            maxLength="200"
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
                        Автор:{" "}
                        {dataRationalDetail.user_model.last_name_char_field}{" "}
                        {dataRationalDetail.user_model.first_name_char_field}{" "}
                        {dataRationalDetail.user_model.patronymic_char_field}
                      </a>
                    </div>
                    <div className="container-fluid d-flex justify-content-between p-0">
                      <small className="text-muted border">
                        подано:{" "}
                        <p>
                          {getCleanDateTime(
                            dataRationalDetail["created_datetime_field"]
                          )}
                        </p>
                      </small>
                      <small className="text-muted border">
                        зарегистрировано:{" "}
                        <p>
                          {getCleanDateTime(
                            dataRationalDetail["register_datetime_field"]
                          )}
                        </p>
                      </small>
                    </div>
                  </div>
                </div>
              </li>
            )}
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
                  <h4 className="lead fw-bold">Премодерация</h4>
                  <label className="w-50 form-control-sm m-1">
                    ФИО, должность:
                    <input
                      type="text"
                      id="name_char_field"
                      name="name_char_field"
                      required=""
                      placeholder="Ширшов А.А., зам. начальника по развитию ЭУ"
                      value={preModerateAuthor}
                      minLength="1"
                      maxLength="64"
                      className="form-control form-control-sm"
                    />
                    <small className="text-success">
                      * данные будут введены автоматически
                    </small>
                  </label>
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
                  <label className="w-75 form-control-sm m-1">
                    Комментарий к заключению:
                    <input
                      type="text"
                      id="name_char_field"
                      name="name_char_field"
                      required=""
                      placeholder="пример: дополнить описание"
                      minLength="0"
                      maxLength="256"
                      className="form-control form-control-sm"
                    />
                    <small className="text-muted">* не обязательно</small>
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

export default RationalDetailPage;
