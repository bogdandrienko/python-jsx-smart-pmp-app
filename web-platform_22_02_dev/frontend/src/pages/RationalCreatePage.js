import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { rationalListAction, userChangeProfileAction } from "../js/actions";
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
                  onSubmit={submitHandler}
                >
                  <div>
                    <div className="bg-success bg-opacity-10">
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
                          <small className="text-muted">
                            обязательно выбрать одну из категорий
                          </small>
                        </label>
                        <label className="w-100 form-control-sm m-1">
                          Зарегистрировано за №{" "}
                          <strong className="btn btn-light">XXX.XXX.XXX</strong>{" "}
                          от
                          <small className="text-danger"> текущей </small>даты
                          <p>
                            <small className="text-muted">
                              номер будет создан автоматически при отправке
                              предложения
                            </small>
                          </p>
                        </label>
                      </div>
                      <div>
                        <label className="w-100 form-control-sm m-1">
                          Название рац. предложения:
                          <input
                            type="text"
                            id="name_char_field"
                            name="name_char_field"
                            required=""
                            placeholder="Название"
                            minLength="1"
                            maxLength="64"
                            className="form-control form-control-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <small className="text-muted">
                            длина: не более 64 символов
                          </small>
                        </label>
                      </div>
                      <br />
                      <div>
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
                          <small className="text-muted">
                            обязательно выбрать одну из категорий
                          </small>
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
                          <small className="text-muted">
                            только для форматов изображений: .jpg / .png
                          </small>
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
                            required=""
                            placeholder="Цех / участок / отдел / лаборатория и т.п."
                            minLength="1"
                            maxLength="64"
                            className="form-control form-control-sm"
                          />
                          <small className="text-muted">
                            длина: не более 64 символов
                          </small>
                        </label>
                      </div>
                      <br />
                      <div>
                        <label className="w-100 form-control-sm m-1">
                          Краткое описание:
                          <textarea
                            id="short_description_char_field"
                            name="short_description_char_field"
                            required=""
                            placeholder="Краткое описание"
                            minLength="1"
                            maxLength="64"
                            rows="1"
                            className="form-control form-control-sm"
                          />
                          <small className="text-muted">
                            длина: не более 64 символов
                          </small>
                        </label>
                        <label className="w-100 form-control-sm m-1">
                          Полное описание:
                          <textarea
                            id="full_description_text_field"
                            name="full_description_text_field"
                            required=""
                            placeholder="Полное описание"
                            minLength="1"
                            maxLength="2048"
                            rows="3"
                            className="form-control form-control-sm"
                          />
                          <small className="text-muted">
                            длина: не более 2048 символов
                          </small>
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
                          <small className="text-muted">
                            только для форматов файлов: .docx / .doc
                          </small>
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
                          <small className="text-muted">
                            только для форматов файлов: .pdf
                          </small>
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
                          <small className="text-muted">
                            только для форматов файлов: .xlsx / .xls
                          </small>
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
                              (Фамилия) (Имя) (Отчество) (Табельный) (%
                              участия);
                            </small>
                          </p>
                          <textarea
                            id="full_description_text_field"
                            name="full_description_text_field"
                            required=""
                            placeholder="формат ввода: Андриенко Богдан Николаевич 93177 60%; Пышный Виктор Юрьевич 4405 40%;"
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
                  onSubmit={submitHandler}
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
                            <option value="Приостановлено">
                              Приостановлено
                            </option>
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
                  onSubmit={submitHandler}
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
                            <option value="Приостановлено">
                              Приостановлено
                            </option>
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
                              внимание, вводить участников согласно нужного
                              формата:
                            </small>
                          </p>
                          <p>
                            <small className="fw-bold">
                              (Фамилия) (Имя) (Отчество) (Табельный)
                              (Должность);
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
            </ul>
          </div>
        )}
      </main>
      <FooterComponent />
    </div>
  );
};

export default BankIdeaListPage;
