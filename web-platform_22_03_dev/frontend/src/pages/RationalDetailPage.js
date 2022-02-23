import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { rationalDetailAction } from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import LoaderComponent from "../components/LoaderComponent";
import MessageComponent from "../components/MessageComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RationalDetailPage = () => {
  const dispatch = useDispatch();

  const rationalDetailStore = useSelector((state) => state.rationalDetailStore);
  const {
    load: loadRationalDetail,
    data: dataRationalDetail,
    error: errorRationalDetail,
    fail: failRationalDetail,
  } = rationalDetailStore;

  useEffect(() => {
    if (dataRationalDetail) {
    } else {
      const form = {
        id: 1,
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

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Подробности рац. предложения"}
        second={"страница содержит подробности последнего рац. предложения"}
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
                                className="card-img-top img-fluid w-100"
                                alt="id"
                              />
                            ) : (
                              <img
                                src="/static/media/uploads/rational/default_rational.jpg"
                                className="card-img-top img-fluid w-100"
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
                        className="btn btn-sm btn-outline-warning m-1"
                        href="#"
                      >
                        Автор:{" "}
                        {
                          dataRationalDetail["user_model"][
                            "last_name_char_field"
                          ]
                        }{" "}
                        {
                          dataRationalDetail["user_model"][
                            "first_name_char_field"
                          ]
                        }{" "}
                        {
                          dataRationalDetail["user_model"][
                            "patronymic_char_field"
                          ]
                        }
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
      </main>
      <FooterComponent />
    </div>
  );
};

export default RationalDetailPage;
