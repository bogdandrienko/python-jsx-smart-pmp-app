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

const BankIdeaListPage = () => {
  const dispatch = useDispatch();

  const raionalListStore = useSelector((state) => state.raionalListStore);
  const {
    load: loadBankIdeaList,
    data: dataBankIdeaList,
    error: errorBankIdeaList,
    fail: failBankIdeaList,
  } = raionalListStore;
  console.log("dataBankIdeaList: ", dataBankIdeaList);

  useEffect(() => {
    if (dataBankIdeaList) {
    } else {
      dispatch(rationalListAction());
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
        first={"Подача рац. предложения"}
        second={
          "страница содержит форму с полями для заполнения и подачи рац. предложения."
        }
      />
      <main className="container text-center">
        {/* <div className="text-center">
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
        </div> */}
        <div className="container-fluid text-center">
          <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
            <div class="container">
              <form
                action="#"
                method="POST"
                target="_self"
                enctype="multipart/form-data"
                name="idea_create"
                autocomplete="on"
                class="text-center"
              >
                <div>
                  <div>
                    <h6 className="lead fw-bold">
                      ЗАЯВЛЕНИЕ
                    </h6>
                    <h6 className="lead">
                      на рационализаторское предложение
                    </h6>
                  </div>
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <label class="form-control-sm m-1">
                      Наименование структурного подразделения:
                      <select
                        type="select"
                        id="category_slug_field"
                        name="category_slug_field"
                        required
                        class="form-control form-control-sm"
                      >
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
                        <option value="Модернизация">Энергоуправление</option>
                      </select>
                      <small class="text-muted">
                        обязательно выбрать одну из категорий
                      </small>
                    </label>
                    <label class="w-100 form-control-sm m-1">
                      Зарегистрировано за №_
                      <input
                        type="text"
                        id="avatar_image_field"
                        name="avatar_image_field"
                        accept=".jpg, .png"
                        class="form-control-sm"
                      />{" "}
                      от <small className="text-danger">текущей</small> даты
                    </label>
                  </div>
                  <div>
                    <label class="w-100 form-control-sm m-1">
                      Название:
                      <input
                        type="text"
                        id="name_char_field"
                        name="name_char_field"
                        required=""
                        placeholder="Название"
                        minlength="1"
                        maxlength="64"
                        class="form-control form-control-sm"
                      />
                      <small class="text-muted">
                        длина: не более 64 символов
                      </small>
                    </label>
                  </div>
                  <br />
                  <div>
                    <label class="form-control-sm m-1">
                      Категория:
                      <select
                        type="select"
                        id="category_slug_field"
                        name="category_slug_field"
                        required
                        class="form-control form-control-sm"
                      >
                        <option value="Инновации">Инновации</option>
                        <option value="Модернизация">Модернизация</option>
                        <option value="Улучшение">Улучшение</option>
                        <option value="Индустрия 4.0">Индустрия 4.0</option>
                      </select>
                      <small class="text-muted">
                        обязательно выбрать одну из категорий
                      </small>
                    </label>
                    <label class="form-control-sm m-1">
                      Аватарка-заставка для идеи:
                      <input
                        type="file"
                        id="avatar_image_field"
                        name="avatar_image_field"
                        accept=".jpg, .png"
                        class="form-control form-control-sm"
                      />
                      <small class="text-muted">
                        только для форматов изображений: .jpg / .png
                      </small>
                    </label>
                  </div>
                  <br />
                  <div>
                    <label class="w-100 form-control-sm m-1">
                      Предполагаемое место внедрения:
                      <input
                        type="text"
                        id="name_char_field"
                        name="name_char_field"
                        required=""
                        placeholder="Подразделение / участок / отдел / лаборатория и т.п."
                        minlength="1"
                        maxlength="64"
                        class="form-control form-control-sm"
                      />
                      <small class="text-muted">
                        длина: не более 64 символов
                      </small>
                    </label>
                  </div>
                  <br />
                  <div>
                    <label class="w-100 form-control-sm m-1">
                      Краткое описание:
                      <textarea
                        type="text"
                        id="short_description_char_field"
                        name="short_description_char_field"
                        required=""
                        placeholder="Краткое описание"
                        minlength="1"
                        maxlength="64"
                        rows="1"
                        class="form-control form-control-sm"
                      ></textarea>
                      <small class="text-muted">
                        длина: не более 64 символов
                      </small>
                    </label>
                    <label class="w-100 form-control-sm m-1">
                      Полное описание:
                      <textarea
                        type="text"
                        id="full_description_text_field"
                        name="full_description_text_field"
                        required=""
                        placeholder="Полное описание"
                        minlength="1"
                        maxlength="2048"
                        rows="3"
                        class="form-control form-control-sm"
                      ></textarea>
                      <small class="text-muted">
                        длина: не более 2048 символов
                      </small>
                    </label>
                  </div>
                  <br />
                  <div>
                    <label class="form-control-sm m-1">
                      Word файл-приложение:
                      <input
                        type="file"
                        id="addiction_file_field"
                        name="addiction_file_field"
                        accept=".docx, .doc"
                        class="form-control form-control-sm"
                      />
                      <small class="text-muted">
                        только для форматов файлов: .docx / .doc
                      </small>
                    </label>
                    <label class="form-control-sm m-1">
                      Pdf файл-приложение:
                      <input
                        type="file"
                        id="addiction_file_field"
                        name="addiction_file_field"
                        accept=".docx, .doc, .pdf"
                        class="form-control form-control-sm"
                      />
                      <small class="text-muted">
                        только для форматов файлов: .pdf
                      </small>
                    </label>
                    <label class="form-control-sm m-1">
                      Excel файл-приложение:
                      <input
                        type="file"
                        id="addiction_file_field"
                        name="addiction_file_field"
                        accept=".xlsx, .xls"
                        class="form-control form-control-sm"
                      />
                      <small class="text-muted">
                        только для форматов файлов: .xlsx / .xls
                      </small>
                    </label>
                  </div>
                  <br />
                  <div>
                    <p className="text-danger">
                      Я(мы) утверждаю(ем), что являюсь(ся) автором(и) данного
                      предложения. Мне(нам) также известно, что в случае
                      признания предложения коммерческой тайной подразделения,
                      я(мы) обязан не разглашать его сущность.
                    </p>
                  </div>
                  <div>
                    <label class="w-100 form-control-sm m-1">
                      Участники:
                      <p>
                        <small class="text-danger">
                          внимание, вводить участников согласно нужного формата:
                        </small>
                      </p>
                      <p>
                        <small class="fw-bold">
                          (Фамилия) (Имя) (Отчество) (Табельный) (% участия);
                        </small>
                      </p>
                      <textarea
                        type="text"
                        id="full_description_text_field"
                        name="full_description_text_field"
                        required=""
                        placeholder="формат ввода: Андриенко Богдан Николаевич 93177 60%; Пышный Виктор Юрьевич 4405 40%;"
                        minlength="1"
                        maxlength="2048"
                        rows="2"
                        class="form-control form-control-sm"
                      ></textarea>
                      <small class="text-muted">
                        длина: не более 2048 символов
                      </small>
                    </label>
                  </div>
                  <div>
                    <p className="text-secondary">
                      *Указывается доля вовлеченности сотрудника в разработку
                      рационализаторского предложения. Если поле оставлено
                      пустым, вознаграждение за подачу рационализаторского
                      предложения распределяется в равных долях.
                    </p>
                    <p className="text-secondary">
                      **Мне известно, что авторами могут быть только лица,
                      внесшие творческий вклад в создание рационализаторского
                      предложения.
                    </p>
                  </div>
                  <br />
                  <div>
                    <label class="w-25 form-control-sm m-1">
                      Заключение:
                      <select
                        type="select"
                        id="category_slug_field"
                        name="category_slug_field"
                        required
                        class="form-control form-control-sm"
                      >
                        <option value="Приостановлено">Приостановлено</option>
                        <option value="Принято">Принято</option>
                        <option value="Принято с замечаниями">Принято с замечаниями</option>
                        <option value="Отклонено">Отклонено</option>
                      </select>
                      <small class="text-muted">
                        обязательно выбрать одну из категорий
                      </small>
                    </label>
                    <label class="w-50 form-control-sm m-1">
                      Должность, название отдела:
                      <input
                        type="text"
                        id="name_char_field"
                        name="name_char_field"
                        required=""
                        placeholder="Ширшов А.А., зам. начальника по развитию ЭУ"
                        minlength="1"
                        maxlength="64"
                        class="form-control form-control-sm"
                      />
                      <small class="text-muted">
                        длина: не более 64 символов
                      </small>
                    </label>
                  </div>
                  <br />
                  <div>
                    <label class="w-25 form-control-sm m-1">
                      Принятое решение:
                      <select
                        type="select"
                        id="category_slug_field"
                        name="category_slug_field"
                        required
                        class="form-control form-control-sm"
                      >
                        <option value="Приостановлено">Приостановлено</option>
                        <option value="Принято">Принято</option>
                        <option value="Принято с замечаниями">Принято с замечаниями</option>
                        <option value="Отклонено">Отклонено</option>
                      </select>
                      <small class="text-muted">
                        обязательно выбрать одну из категорий
                      </small>
                    </label>
                    <label class="w-50 form-control-sm m-1">
                      Должность, название отдела:
                      <input
                        type="text"
                        id="name_char_field"
                        name="name_char_field"
                        required=""
                        placeholder="Ширшов А.А., зам. начальника по развитию ЭУ"
                        minlength="1"
                        maxlength="64"
                        class="form-control form-control-sm"
                      />
                      <small class="text-muted">
                        длина: не более 64 символов
                      </small>
                    </label>
                  </div>
                  <br />
                  <div>
                    <label class="w-100 form-control-sm m-1">
                      Ответственные за внедрение:
                      <p>
                        <small class="text-danger">
                          внимание, вводить участников согласно нужного формата:
                        </small>
                      </p>
                      <p>
                        <small class="fw-bold">
                          (Фамилия) (Имя) (Отчество) (Табельный) (Должность);
                        </small>
                      </p>
                      <textarea
                        type="text"
                        id="full_description_text_field"
                        name="full_description_text_field"
                        required=""
                        placeholder="формат ввода: Андриенко Богдан Николаевич 93177 Техник-программист; Пышный Виктор Юрьевич 4405 Инженер-программист;"
                        minlength="1"
                        maxlength="2048"
                        rows="2"
                        class="form-control form-control-sm"
                      ></textarea>
                      <small class="text-muted">
                        длина: не более 2048 символов
                      </small>
                    </label>
                  </div>
                  <br />
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <label class="form-control-sm m-1">
                      Удостоверение на рац. предложение получено:
                    </label>
                    <label class="w-100 form-control-sm m-1">
                      «<input
                        type="text"
                        id="avatar_image_field"
                        name="avatar_image_field"
                        accept=".jpg, .png"
                        class="w-25 form-control-sm"
                      />»
                      от 15 02 2022 г.
                    </label>
                  </div>
                </div>
                <hr />
                <div class="container-fluid text-center">
                  <ul class="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                    <li class="m-1">
                      <button
                        class="btn btn-sm btn-outline-primary"
                        type="submit"
                      >
                        Отправить
                      </button>
                    </li>
                    <li class="m-1">
                      <button
                        class="btn btn-sm btn-outline-warning"
                        type="reset"
                      >
                        Сбросить
                      </button>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </ul>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default BankIdeaListPage;
