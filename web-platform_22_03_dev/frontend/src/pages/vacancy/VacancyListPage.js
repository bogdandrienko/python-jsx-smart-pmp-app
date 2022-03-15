import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Spinner,
  Alert,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import ReactPlayer from "react-player";
import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../base/HeaderComponent";
import FooterComponent from "../base/FooterComponent";
import StoreStatusComponent from "../base/StoreStatusComponent";
import MessageComponent from "../base/MessageComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const VacancyListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const [detailView, detailViewSet] = useState(true);
  const [sphere, sphereSet] = useState("");
  const [education, educationSet] = useState("");
  const [experience, experienceSet] = useState("");
  const [sort, sortSet] = useState("Дате публикации (сначала свежие)");
  const [search, searchSet] = useState("");

  const userDetailsAuthStore = useSelector(
    (state) => state.userDetailsAuthStore
  ); // store.js
  const vacancyListAuthStore = useSelector(
    (state) => state.vacancyListAuthStore
  ); // store.js
  const {
    load: loadVacancyList,
    data: dataVacancyList,
    // error: errorVacancyList,
    // fail: failVacancyList,
  } = vacancyListAuthStore;

  const getData = () => {
    const form = {
      "Action-type": "VACANCY_LIST",
      sphere: sphere,
      education: education,
      experience: experience,
      sort: sort,
      search: search,
    };
    dispatch(actions.vacancyListAction(form));
  };

  useEffect(() => {
    if (dataVacancyList) {
    } else {
      if (!loadVacancyList) {
        getData();
      }
    }
  }, [dataVacancyList]);

  const formHandlerSubmit = async (e) => {
    e.preventDefault();
    getData();
  };

  const formHandlerReset = async (e) => {
    e.preventDefault();
    sphereSet("");
    educationSet("");
    experienceSet("");
    sortSet("Дате публикации (сначала свежие)");
    searchSet("");
    getData();
  };

  return (
    <div>
      <HeaderComponent
        logic={true}
        redirect={false}
        title={"Список вакансий"}
        description={
          "страница доступных вакансий с возможностью поиска и фильтрации"
        }
      />
      <main className="container  ">
        <div className="">
          {StoreStatusComponent(
            userDetailsAuthStore,
            "userDetailsAuthStore",
            false,
            "Данные успешно получены!",
            constants.DEBUG_CONSTANT
          )}
          {StoreStatusComponent(
            vacancyListAuthStore,
            "vacancyListAuthStore",
            false,
            "Данные успешно получены!",
            constants.DEBUG_CONSTANT
          )}
        </div>
        <div className="container-fluid form-control bg-opacity-10 bg-success">
          <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center  ">
            <form autoComplete="on" className="" onSubmit={formHandlerSubmit}>
              <div className="">
                <label className="lead">
                  Выберите нужные настройки фильтрации и сортировки, затем
                  нажмите кнопку{" "}
                  <p className="fw-bold text-primary">"фильтровать вакансии"</p>
                </label>
                <label className="form-control-sm form-switch m-1">
                  Детальное отображение:
                  <input
                    type="checkbox"
                    className="form-check-input m-1"
                    id="flexSwitchCheckDefault"
                    defaultChecked={detailView}
                    onClick={(e) => detailViewSet(!detailView)}
                  />
                </label>
              </div>
              <div className="">
                <label className="form-control-sm m-1">
                  Сфера:
                  <select
                    value={sphere}
                    className="form-control form-control-sm"
                    onChange={(e) => sphereSet(e.target.value)}
                  >
                    <option value="">все варианты</option>
                    <option value="Технологическая">Технологическая</option>
                    <option value="Не технологическая">
                      Не технологическая
                    </option>
                  </select>
                </label>
                <label className="form-control-sm m-1">
                  Образование:
                  <select
                    id="education"
                    name="education"
                    className="form-control form-control-sm"
                    value={education}
                    onChange={(e) => educationSet(e.target.value)}
                  >
                    <option value="">все варианты</option>
                    <option value="Высшее, Средне-специальное">
                      Высшее / Средне-специальное
                    </option>
                    <option value="Высшее">Высшее</option>
                    <option value="Средне-специальное">
                      Средне-специальное
                    </option>
                    <option value="Среднее">Среднее</option>
                  </select>
                </label>
                <label className="form-control-sm m-1">
                  Опыт:
                  <select
                    id="experience"
                    name="experience"
                    className="form-control form-control-sm"
                    value={experience}
                    onChange={(e) => experienceSet(e.target.value)}
                  >
                    <option value="">все варианты</option>
                    <option value="не имеет значения">не имеет значения</option>
                    <option value="от 1 года до 3 лет">
                      от 1 года до 3 лет
                    </option>
                    <option value="от 3 до 6 лет">от 3 до 6 лет</option>
                    <option value="более 6 лет">более 6 лет</option>
                  </select>
                </label>
              </div>
              <div className="">
                <label className="w-75 form-control-sm m-1">
                  Поле поиска по части названия или квалификации:
                  <input
                    type="text"
                    className="form-control"
                    placeholder="вводите часть названия тут..."
                    value={search}
                    onChange={(e) => searchSet(e.target.value)}
                  />
                </label>
                <label className="form-control-sm m-1">
                  Сортировка по:
                  <select
                    id="sort"
                    name="sort"
                    className="form-control form-control-sm"
                    value={sort}
                    onChange={(e) => sortSet(e.target.value)}
                  >
                    <option value="Дате публикации (сначала свежие)">
                      Дате публикации (сначала свежие)
                    </option>
                    <option value="Дате публикации (сначала старые)">
                      Дате публикации (сначала старые)
                    </option>
                    <option value="Названию (С начала алфавита)">
                      Названию (С начала алфавита)
                    </option>
                    <option value="Названию (С конца алфавита)">
                      Названию (С конца алфавита)
                    </option>
                  </select>
                </label>
              </div>
              <div className="btn-group p-1 m-0 text-start w-100">
                <button className="btn btn-sm btn-primary" type="submit">
                  фильтровать вакансии
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  type="button"
                  onClick={formHandlerReset}
                >
                  сбросить фильтры
                </button>
                <Link
                  to={`/resume_create/0`}
                  className="btn btn-sm btn-success"
                >
                  отправить резюме
                </Link>
                {utils.CheckAccess(
                  userDetailsAuthStore,
                  "moderator_vacancies"
                ) && (
                  <Link
                    to={`/vacancy_create`}
                    className="btn btn-sm btn-secondary"
                  >
                    создать новую вакансию
                  </Link>
                )}
              </div>
            </form>
          </ul>
        </div>
        <div className="container-fluid  ">
          {dataVacancyList && dataVacancyList.length > 0 ? (
            !detailView ? (
              <ul className="bg-opacity-10 bg-primary shadow">
                {dataVacancyList.map((vacancy, index) => (
                  <Link
                    key={index}
                    to={`/vacancy_detail/${vacancy.id}`}
                    className="text-decoration-none"
                  >
                    <li className="lead border list-group-item-action">
                      {utils.GetSliceString(vacancy["qualification_field"], 30)}
                    </li>
                  </Link>
                ))}
              </ul>
            ) : (
              <div className="row justify-content-center  ">
                {dataVacancyList.map((vacancy, index) => (
                  <Link
                    key={index}
                    to={`/vacancy_detail/${vacancy.id}`}
                    className="text-decoration-none border shadow text-center   col-md-6"
                  >
                    <div className="card   list-group-item-action">
                      <div className="card-header fw-bold lead bg-opacity-10 bg-primary  ">
                        {utils.GetSliceString(
                          vacancy["qualification_field"],
                          30
                        )}
                      </div>
                      <div className="card-body  ">
                        <div className="row justify-content-center  ">
                          <div className="col-md-6 shadow w-25  ">
                            <img
                              src={utils.GetStaticFile(vacancy["image_field"])}
                              className="img-fluid img-thumbnail"
                              alt="изображение"
                            />
                          </div>
                          <div className="card-body col-md-6  ">
                            <table className="table table-sm table-hover table-borderless table-striped  ">
                              <tbody>
                                {vacancy["datetime_field"] !== "" &&
                                  vacancy["datetime_field"] !== null && (
                                    <tr className="">
                                      <td className="fw-bold text-secondary text-start">
                                        Опубликовано:
                                      </td>
                                      <td className="small text-end">
                                        {utils.GetSliceString(
                                          utils.GetCleanDateTime(
                                            vacancy["datetime_field"],
                                            true
                                          ),
                                          30
                                        )}
                                      </td>
                                    </tr>
                                  )}
                                {vacancy["sphere_field"] !== "" &&
                                  vacancy["sphere_field"] !== null && (
                                    <tr className="">
                                      <td className="fw-bold text-secondary text-start">
                                        Сфера:
                                      </td>
                                      <td className="small text-end">
                                        {utils.GetSliceString(
                                          vacancy["sphere_field"],
                                          30
                                        )}
                                      </td>
                                    </tr>
                                  )}
                                {vacancy["education_field"] !== "" &&
                                  vacancy["education_field"] !== null && (
                                    <tr className="">
                                      <td className="fw-bold text-secondary text-start">
                                        Образование:
                                      </td>
                                      <td className="small text-end">
                                        {utils.GetSliceString(
                                          vacancy["education_field"],
                                          30
                                        )}
                                      </td>
                                    </tr>
                                  )}
                                {vacancy["qualification_field"] !== "" &&
                                  vacancy["qualification_field"] !== null && (
                                    <tr className="">
                                      <td className="fw-bold text-secondary text-start">
                                        Квалификация:
                                      </td>
                                      <td className="small text-end">
                                        {utils.GetSliceString(
                                          vacancy["qualification_field"],
                                          30
                                        )}
                                      </td>
                                    </tr>
                                  )}
                                {vacancy["rank_field"] !== "" &&
                                  vacancy["rank_field"] !== null && (
                                    <tr className="">
                                      <td className="fw-bold text-secondary text-start">
                                        Разряд:
                                      </td>
                                      <td className="small text-end">
                                        {utils.GetSliceString(
                                          vacancy["rank_field"],
                                          30
                                        )}
                                      </td>
                                    </tr>
                                  )}
                                {vacancy["experience_field"] !== "" &&
                                  vacancy["experience_field"] !== null && (
                                    <tr className="">
                                      <td className="fw-bold text-secondary text-start">
                                        Опыт:
                                      </td>
                                      <td className="small text-end">
                                        {utils.GetSliceString(
                                          vacancy["experience_field"],
                                          30
                                        )}
                                      </td>
                                    </tr>
                                  )}
                                {vacancy["schedule_field"] !== "" &&
                                  vacancy["schedule_field"] !== null && (
                                    <tr className="">
                                      <td className="fw-bold text-secondary text-start">
                                        График:
                                      </td>
                                      <td className="small text-end">
                                        {utils.GetSliceString(
                                          vacancy["schedule_field"],
                                          30
                                        )}
                                      </td>
                                    </tr>
                                  )}
                                {vacancy["description_field"] !== "" &&
                                  vacancy["description_field"] !== null && (
                                    <tr className="">
                                      <td className="fw-bold text-secondary text-start">
                                        Описание:
                                      </td>
                                      <td className="small text-end">
                                        {utils.GetSliceString(
                                          vacancy["description_field"],
                                          30
                                        )}
                                      </td>
                                    </tr>
                                  )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          ) : (
            <MessageComponent variant={"danger"}>
              Вакансии не найдены! Попробуйте изменить условия фильтрации или
              очистить строку поиска.
            </MessageComponent>
          )}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};
