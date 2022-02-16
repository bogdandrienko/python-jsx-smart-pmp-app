import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
  rationalListAction,
  userChangeProfileAction,
  userDetailsAction,
} from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import MessageComponent from "../components/MessageComponent";
import LoaderComponent from "../components/LoaderComponent";
import FooterComponent from "../components/FooterComponent";
import { useNavigate } from "react-router-dom";
import {
  RATIONAL_LIST_LOADING_CONSTANT,
  RATIONAL_LIST_RESET_CONSTANT,
} from "../js/constants";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const BankIdeaListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

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
      navigate("#");
      sleep(1000).then(() => {
        dispatch({
          type: RATIONAL_LIST_RESET_CONSTANT,
        });
        navigate("/home");
      });
    }
  }, [navigate, dataBankIdeaList]);

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    load: loadUserDetails,
    data: dataUserDetails,
    error: errorUserDetails,
    fail: failUserDetails,
  } = userDetailsStore;
  console.log("dataUserDetails: ", dataUserDetails);

  useEffect(() => {
    if (dataUserDetails) {
    } else {
      dispatch(userDetailsAction());
    }
  }, [dispatch, dataUserDetails]);

  const submitHandler = (e) => {
    // e.preventDefault();
    dispatch(
      rationalListAction("RATIONAL_CREATE", "", {
        category_slug_field: category,
        name: name,
      })
    );
  };

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Подача рац. предложения"}
        second={
          "страница содержит форму с полями для заполнения и подачи рац. предложения."
        }
      />
      <main className="container text-center">
        <div className="text-center">
          {loadBankIdeaList && <LoaderComponent />}
          {dataBankIdeaList && (
            <div className="m-1">
              <MessageComponent variant="success">
                Данные успешно отправлены!
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
        {!dataBankIdeaList && (
          <div className="container-fluid text-center">
            <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
              <div className="container">
                <br />
                <form
                  action="#"
                  method="POST"
                  target="_self"
                  encType="multipart/form-data"
                  name="idea_create"
                  autoComplete="on"
                  className="text-center"
                  onSubmit={submitHandler}
                >
                  <div>
                    <div className="">
                      <div>
                        <h6 className="lead fw-bold">ЗАЯВЛЕНИЕ</h6>
                        <h6 className="lead">
                          на рационализаторское предложение
                        </h6>
                      </div>
                      <div className="d-flex w-100 align-items-center justify-content-between">
                        <label className="form-control-sm m-1">
                          Наименование структурного подразделения:
                          <select
                            id="category_slug_field"
                            name="category_slug_field"
                            required
                            className="form-control form-control-sm"
                          >
                            <option value="">Не выбрано</option>
                            <option value="Индустрия 4.0">Управление</option>
                            <option value="Инновации">
                              Обогатительный комплекс
                            </option>
                            <option value="Улучшение">
                              Горно-транспортный комплекс
                            </option>
                            <option value="Инновации">
                              Автотранспортное предприятие
                            </option>
                            <option value="Модернизация">
                              Энергоуправление
                            </option>
                          </select>
                          <small className="text-danger">* обязательно</small>
                        </label>
                        <label className="w-100 form-control-sm m-1">
                          Зарегистрировано за №{" "}
                          <strong className="btn btn-light">XXX.XXX.XXX</strong>{" "}
                          от
                          <small className="text-danger"> текущей </small>даты
                          <p>
                            <small className="text-success">
                              * номер будет создан автоматически
                            </small>
                          </p>
                        </label>
                      </div>
                      <div>
                        <label className="form-control-sm m-1">
                          Сфера рац. предложения:
                          <select
                            id="category_slug_field"
                            name="category_slug_field"
                            required
                            className="form-control form-control-sm"
                          >
                            <option value="">Не выбрано</option>
                            <option value="Технологическая">
                              Технологическая
                            </option>
                            <option value="Не технологическая">
                              Не технологическая
                            </option>
                          </select>
                          <small className="text-danger">* обязательно</small>
                        </label>
                        <label className="form-control-sm m-1">
                          Категория:
                          <select
                            id="category_slug_field"
                            name="category_slug_field"
                            required
                            className="form-control form-control-sm"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value="">Не выбрано</option>
                            <option value="Инновации">Инновации</option>
                            <option value="Модернизация">Модернизация</option>
                            <option value="Улучшение">Улучшение</option>
                            <option value="Индустрия 4.0">Индустрия 4.0</option>
                          </select>
                          <small className="text-danger">* обязательно</small>
                        </label>
                        <label className="form-control-sm m-1">
                          Аватарка-заставка для идеи:
                          <input
                            type="file"
                            id="avatar_image_field"
                            name="avatar_image_field"
                            accept=".jpg, .png"
                            className="form-control form-control-sm"
                          />
                          <small className="text-muted">* не обязательно</small>
                        </label>
                      </div>
                      <br />
                      <div>
                        <label className="w-100 form-control-sm m-1">
                          Название рац. предложения:
                          <input
                            type="text"
                            id="name_char_field"
                            name="name_char_field"
                            required
                            placeholder="Название"
                            minLength="1"
                            maxLength="100"
                            className="form-control form-control-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <small className="text-danger">* обязательно</small>
                          <p>
                            <small className="text-muted">
                              длина: не более 100 символов
                            </small>
                          </p>
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
                            minLength="1"
                            maxLength="100"
                            className="form-control form-control-sm"
                          />
                          <small className="text-danger">* обязательно</small>
                          <p>
                            <small className="text-muted">
                              длина: не более 100 символов
                            </small>
                          </p>
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
                            minLength="1"
                            maxLength="200"
                            rows="1"
                            className="form-control form-control-sm"
                          />
                          <small className="text-danger">* обязательно</small>
                          <p>
                            <small className="text-muted">
                              длина: не более 200 символов
                            </small>
                          </p>
                        </label>
                        <label className="w-100 form-control-sm m-1">
                          Полное описание:
                          <textarea
                            id="full_description_text_field"
                            name="full_description_text_field"
                            required
                            placeholder="Полное описание"
                            minLength="1"
                            maxLength="5000"
                            rows="3"
                            className="form-control form-control-sm"
                          />
                          <small className="text-danger">* обязательно</small>
                          <p>
                            <small className="text-muted">
                              длина: не более 5000 символов
                            </small>
                          </p>
                        </label>
                      </div>
                      <br />
                      <div>
                        <label className="form-control-sm m-1">
                          Word файл-приложение:
                          <input
                            type="file"
                            id="addiction_file_field"
                            name="addiction_file_field"
                            accept=".docx, .doc"
                            className="form-control form-control-sm"
                          />
                          <small className="text-muted">* не обязательно</small>
                        </label>
                        <label className="form-control-sm m-1">
                          Pdf файл-приложение:
                          <input
                            type="file"
                            id="addiction_file_field"
                            name="addiction_file_field"
                            accept=".pdf"
                            className="form-control form-control-sm"
                          />
                          <small className="text-muted">* не обязательно</small>
                        </label>
                        <label className="form-control-sm m-1">
                          Excel файл-приложение:
                          <input
                            type="file"
                            id="addiction_file_field"
                            name="addiction_file_field"
                            accept=".xlsx, .xls"
                            className="form-control form-control-sm"
                          />
                          <small className="text-muted">* не обязательно</small>
                        </label>
                      </div>
                      <br />
                      <div>
                        <p className="text-danger">
                          Я(мы) утверждаю(ем), что являюсь(ся) автором(и)
                          данного предложения. Мне(нам) также известно, что в
                          случае признания предложения коммерческой тайной
                          подразделения, я(мы) обязан не разглашать его
                          сущность.
                        </p>
                      </div>
                      <div>
                        <label className="w-100 form-control-sm m-1">
                          Участники:
                          <p>
                            <small className="text-danger">
                              внимание, вводить участников согласно нужного
                              формата:
                            </small>
                          </p>
                          <p>
                            <small className="fw-bold">
                              Фамилия Имя Отчество Табельный Вклад в проект %
                            </small>
                          </p>
                          {dataUserDetails && dataUserDetails["user_model"] && (
                            <div>
                              участник № 1, Вы:{" "}
                              {
                                dataUserDetails["user_model"][
                                  "last_name_char_field"
                                ]
                              }{" "}
                              {
                                dataUserDetails["user_model"][
                                  "first_name_char_field"
                                ]
                              }{" "}
                              {
                                dataUserDetails["user_model"][
                                  "patronymic_char_field"
                                ]
                              }{" "}
                              {
                                dataUserDetails["user_model"][
                                  "personnel_number_slug_field"
                                ]
                              }{" "}
                              <input
                                type="text"
                                id="name_char_field"
                                name="name_char_field"
                                required
                                placeholder={`введите Ваш % вклада:`}
                                minLength="1"
                                maxLength="200"
                                className="form-control form-control-sm"
                              />
                            </div>
                          )}
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
                          <small className="text-muted">
                            * общая сумма вклада всех участников не должна не
                            превышать 100%
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
                              Отправить
                            </button>
                          </li>
                          <li className="m-1">
                            <button
                              className="btn btn-sm btn-outline-warning"
                              type="reset"
                            >
                              Сбросить все данные
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
                <br />
              </div>
            </ul>
          </div>
        )}
      </main>
      <FooterComponent />
    </div>
  );
};

export default BankIdeaListPage;
