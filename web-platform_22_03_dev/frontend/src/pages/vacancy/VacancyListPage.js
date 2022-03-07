import React, { useEffect, useState } from "react";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import { useDispatch, useSelector } from "react-redux";
import { vacancyDeleteAction, vacancyListAction } from "../../js/actions";
import * as utils from "../../js/utils";
import LoaderComponent from "../../components/LoaderComponent";
import MessageComponent from "../../components/MessageComponent";
import StoreStatusComponent from "../../components/StoreStatusComponent";
import { Link, useNavigate } from "react-router-dom";
import { Sleep } from "../../js/utils";
import * as constants from "../../js/constants";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const VacancyListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [detailView, setDetailView] = useState(true);
  const [sphere, sphereSet] = useState("");
  const [education, educationSet] = useState("");
  const [experience, experienceSet] = useState("");
  const [sort, sortSet] = useState("Дате публикации (сначала свежие)");
  const [search, searchSet] = useState("");

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;

  const vacancyListStore = useSelector((state) => state.vacancyListStore); // store.js
  const {
    // load: loadVacancyList,
    data: dataVacancyList,
    // error: errorVacancyList,
    // fail: failVacancyList,
  } = vacancyListStore;
  // console.log("dataVacancyList: ", dataVacancyList);

  const vacancyDeleteStore = useSelector((state) => state.vacancyDeleteStore); // store.js
  const {
    // load: loadVacancyDelete,
    data: dataVacancyDelete,
    // error: errorVacancyDelete,
    // fail: failVacancyDelete,
  } = vacancyDeleteStore;
  // console.log("dataVacancyDelete: ", dataVacancyDelete);

  const getData = () => {
    const form = {
      "Action-type": "VACANCY_LIST",
      sphere: sphere,
      education: education,
      experience: experience,
      sort: sort,
      search: search,
    };
    dispatch(vacancyListAction(form));
  };

  useEffect(() => {
    if (dataVacancyList) {
    } else {
      getData();
    }
  }, [dispatch, dataVacancyList]);

  useEffect(() => {
    if (dataVacancyDelete) {
      utils.Sleep(3000).then(() => {
        dispatch({ type: constants.VACANCY_DELETE_RESET_CONSTANT });
      });
    }
  }, [dataVacancyDelete]);

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

  const formHandlerDelete = async (e, id) => {
    e.preventDefault();
    const form = {
      "Action-type": "VACANCY_DELETE",
      id: id,
    };
    dispatch(vacancyDeleteAction(form));
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Список вакансий"}
        second={
          "страница доступных вакансий с возможностью поиска и фильтрации."
        }
      />
      <main className="container p-0">
        <div className="m-0 p-0">
          {StoreStatusComponent(
            vacancyListStore,
            "vacancyListStore",
            true,
            "Данные успешно получены!",
            true
          )}
          {StoreStatusComponent(
            vacancyDeleteStore,
            "vacancyDeleteStore",
            true,
            "",
            true
          )}
        </div>
        <div className="form-control p-3 bg-opacity-10 bg-success">
          <form className="" onSubmit={formHandlerSubmit}>
            <div className="d-flex w-100 align-items-center justify-content-between">
              <div className="lead">
                Выберите нужные настройки фильтрации и сортировки, затем нажмите
                кнопку "Фильтровать"
              </div>
              <div className="form-check form-switch">
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  <input
                    type="checkbox"
                    className="form-check-input m-1"
                    id="flexSwitchCheckDefault"
                    checked={detailView}
                    onClick={(e) => setDetailView(!detailView)}
                  />
                  Детальное отображение
                </label>
              </div>
            </div>
            <div className="">
              <div className="d-flex w-100 align-items-center justify-content-between">
                <label className="form-control-sm">
                  Сфера:
                  <select
                    id="sphere"
                    name="sphere"
                    className="form-control form-control-sm"
                    value={sphere}
                    onChange={(e) => sphereSet(e.target.value)}
                  >
                    <option value="">Все варианты</option>
                    <option value="Технологическая">Технологическая</option>
                    <option value="Не технологическая">
                      Не технологическая
                    </option>
                  </select>
                </label>
                <label className="form-control-sm w-25">
                  Образование:
                  <select
                    id="education"
                    name="education"
                    className="form-control form-control-sm"
                    value={education}
                    onChange={(e) => educationSet(e.target.value)}
                  >
                    <option value="">Все варианты</option>
                    <option value="Высшее, Средне-специальное">
                      Высшее, Средне-специальное
                    </option>
                    <option value="Высшее">Высшее</option>
                    <option value="Средне-специальное">
                      Средне-специальное
                    </option>
                    <option value="Среднее">Среднее</option>
                  </select>
                </label>
                <label className="form-control-sm w-25">
                  Опыт:
                  <select
                    id="experience"
                    name="experience"
                    className="form-control form-control-sm"
                    value={experience}
                    onChange={(e) => experienceSet(e.target.value)}
                  >
                    <option value="">Все варианты</option>
                    <option value="от 1 года до 3 лет">
                      от 1 года до 3 лет
                    </option>
                    <option value="от 3 до 6 лет">от 3 до 6 лет</option>
                    <option value="более 6 лет">более 6 лет</option>
                  </select>
                </label>
                <label className="form-control-sm">
                  Сортировка вакансий по:
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
                    <option value="Названию вакансии (С начала алфавита)">
                      Названию вакансии (С начала алфавита)
                    </option>
                    <option value="Названию вакансии (С конца алфавита)">
                      Названию вакансии (С конца алфавита)
                    </option>
                  </select>
                </label>
              </div>
              <div>
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <input
                    type="text"
                    className="form-control m-1 w-75"
                    placeholder="введите сюда часть названия или квалификации..."
                    value={search}
                    onChange={(e) => searchSet(e.target.value)}
                  />
                  <button className="btn btn-md btn-success m-1">
                    Фильтровать
                  </button>
                  <button
                    className="btn btn-md btn-warning m-1"
                    type="button"
                    onClick={formHandlerReset}
                  >
                    Сбросить
                  </button>
                  {utils.CheckAccess(
                    dataUserDetails,
                    "moderator_vacancies"
                  ) && (
                    <Link to={`/vacancy_create`} className="">
                      <button
                        className="btn btn-md btn-primary m-1"
                        type="button"
                      >
                        Создать
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="container-fluid">
          {dataVacancyList && dataVacancyList.length > 0 ? (
            !detailView ? (
              <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1">
                {dataVacancyList.map((vacancy, module_i) => (
                  <div
                    key={module_i}
                    className="border shadow text-center p-0 m-0"
                  >
                    <div className="list-group-item-action lh-tight p-0 m-0">
                      <div className="card p-0 m-0">
                        <div className="card-header fw-bold lead bg-opacity-10 bg-primary p-0 m-0">
                          <div className="card-body d-flex w-100 align-items-center justify-content-between p-0 m-0">
                            <div className="w-75 p-0 m-0">
                              <Link
                                to={`/vacancy_detail/${vacancy.id}`}
                                className="text-decoration-none text-dark"
                              >
                                {vacancy["qualification_field"].slice(0, 36)}...
                              </Link>
                            </div>
                            <div className="card-body d-flex align-items-center justify-content-between p-0">
                              <div className="btn-group">
                                <Link
                                  to={`/vacancy_respond/${vacancy.id}`}
                                  className=""
                                >
                                  <button
                                    className="btn btn-md btn-outline-success m-1"
                                    type="button"
                                  >
                                    Откликнуться
                                  </button>
                                </Link>
                                {utils.CheckAccess(
                                  dataUserDetails,
                                  "moderator_vacancies"
                                ) && (
                                  <Link
                                    to={`/vacancy_change/${vacancy.id}`}
                                    className=""
                                  >
                                    <button
                                      className="btn btn-md btn-outline-warning m-1"
                                      type="button"
                                    >
                                      Редактировать
                                    </button>
                                  </Link>
                                )}
                                {utils.CheckAccess(
                                  dataUserDetails,
                                  "moderator_vacancies"
                                ) && (
                                  <button
                                    className="btn btn-md btn-outline-danger m-1"
                                    onClick={(e) =>
                                      formHandlerDelete(e, vacancy.id)
                                    }
                                  >
                                    Удалить
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-2">
                {dataVacancyList.map((vacancy, module_i) => (
                  <div
                    key={module_i}
                    className="border shadow text-center p-0 m-0"
                  >
                    <div className="list-group-item-action lh-tight p-0 m-0">
                      <div className="card p-0 m-0">
                        <div className="card-header fw-bold lead bg-opacity-10 bg-primary p-0 m-0">
                          <Link
                            to={`/vacancy_detail/${vacancy.id}`}
                            className="text-decoration-none text-dark"
                          >
                            {vacancy["qualification_field"].slice(0, 36)}...
                          </Link>
                        </div>
                        <div className="d-flex w-100 align-items-center justify-content-between p-0 m-0">
                          <div className="w-25 shadow p-0 m-1">
                            <img
                              src={utils.GetStaticFile(vacancy["image_field"])}
                              className="img-fluid w-50 p-0 m-0"
                              alt="изображение"
                            />
                          </div>
                          <div className="w-75 bg-light bg-opacity-10">
                            {vacancy["datetime_field"] !== "" &&
                              vacancy["datetime_field"] !== null && (
                                <div className="card-body p-1">
                                  <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="fw-bold text-secondary">
                                      Опубликовано:
                                    </strong>
                                    <text className="small">
                                      {utils.GetCleanDateTime(
                                        vacancy["datetime_field"],
                                        true
                                      )}
                                    </text>
                                  </div>
                                </div>
                              )}
                            {vacancy["sphere_field"] !== "" && (
                              <div className="card-body p-1">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                  <strong className="fw-bold text-secondary">
                                    Сфера:
                                  </strong>
                                  <text className="small">
                                    {vacancy["sphere_field"]}
                                  </text>
                                </div>
                              </div>
                            )}
                            {vacancy["education_field"] !== "" && (
                              <div className="card-body p-1">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                  <strong className="fw-bold text-secondary">
                                    Образование:
                                  </strong>
                                  <text className="small">
                                    {vacancy["education_field"]}
                                  </text>
                                </div>
                              </div>
                            )}
                            {vacancy["qualification_field"] !== "" && (
                              <div className="card-body p-1">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                  <strong className="fw-bold text-secondary">
                                    Квалификация:
                                  </strong>
                                  <text className="small">
                                    {vacancy["qualification_field"]}
                                  </text>
                                </div>
                              </div>
                            )}
                            {vacancy["rank_field"] !== "" &&
                              vacancy["rank_field"] !== null && (
                                <div className="card-body p-1">
                                  <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="fw-bold text-secondary">
                                      Разряд:
                                    </strong>
                                    <text className="small">
                                      {vacancy["rank_field"]}
                                    </text>
                                  </div>
                                </div>
                              )}
                            {vacancy["experience_field"] !== "" && (
                              <div className="card-body p-1">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                  <strong className="fw-bold text-secondary">
                                    Опыт:
                                  </strong>
                                  <text className="small">
                                    {vacancy["experience_field"]}
                                  </text>
                                </div>
                              </div>
                            )}
                            {vacancy["schedule_field"] !== "" && (
                              <div className="card-body p-1">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                  <strong className="fw-bold text-secondary">
                                    График:
                                  </strong>
                                  <text className="small">
                                    {vacancy["schedule_field"]}
                                  </text>
                                </div>
                              </div>
                            )}
                            {vacancy["description_field"] !== "" && (
                              <div className="card-body p-1">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                  <strong className="fw-bold text-secondary">
                                    Описание:
                                  </strong>
                                  <text className="small">
                                    {vacancy["description_field"]}
                                  </text>
                                </div>
                              </div>
                            )}
                            <div className="card-body d-flex align-items-center justify-content-between p-0">
                              <div className="btn-group">
                                <Link
                                  to={`/vacancy_respond/${vacancy.id}`}
                                  className="m-1"
                                >
                                  <button
                                    className="btn btn-md btn-outline-success"
                                    type="button"
                                  >
                                    Откликнуться
                                  </button>
                                </Link>
                                {utils.CheckAccess(
                                  dataUserDetails,
                                  "moderator_vacancies"
                                ) && (
                                  <Link
                                    to={`/vacancy_change/${vacancy.id}`}
                                    className="m-1"
                                  >
                                    <button
                                      className="btn btn-md btn-outline-warning"
                                      type="button"
                                    >
                                      Редактировать
                                    </button>
                                  </Link>
                                )}
                                {utils.CheckAccess(
                                  dataUserDetails,
                                  "moderator_vacancies"
                                ) && (
                                  <button
                                    className="btn btn-md btn-outline-danger m-1"
                                    onClick={(e) =>
                                      formHandlerDelete(e, vacancy.id)
                                    }
                                  >
                                    Удалить
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="lead text-danger">
              Вакансии не найдены! Попробуйте изменить условия фильтрации или
              очистить строку поиска.
            </div>
          )}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default VacancyListPage;
