///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const VacancyListPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [detailView, detailViewSet] = useState(true);
  const [sphere, sphereSet] = useState("");
  const [education, educationSet] = useState("");
  const [experience, experienceSet] = useState("");
  const [sort, sortSet] = useState("дате публикации (свежие в начале)");
  const [search, searchSet] = useState("");
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  //////////////////////////////////////////////////////////
  const vacancyListStore = useSelector((state) => state.vacancyListStore);
  const {
    // load: loadVacancyList,
    data: dataVacancyList,
    // error: errorVacancyList,
    // fail: failVacancyList,
  } = vacancyListStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (dataVacancyList) {
    } else {
      getData();
    }
  }, [dataVacancyList]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
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
  //////////////////////////////////////////////////////////
  const handlerSubmit = async (e) => {
    e.preventDefault();
    getData();
  };
  //////////////////////////////////////////////////////////
  const handlerReset = async (e) => {
    e.preventDefault();
    sphereSet("");
    educationSet("");
    experienceSet("");
    sortSet("дате публикации (свежие в начале)");
    searchSet("");
    getData();
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={userDetailsStore}
          keyStatus={"userDetailsStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={false}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        <components.StoreStatusComponent
          storeStatus={vacancyListStore}
          keyStatus={"vacancyListStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={false}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        <div className="container-fluid form-control bg-opacity-10 bg-success">
          <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center  ">
            <form autoComplete="on" className="" onSubmit={handlerSubmit}>
              <div className="">
                <label className="lead">
                  Выберите нужные настройки фильтрации и сортировки, затем
                  нажмите кнопку{" "}
                  <p className="fw-bold text-primary">"фильтровать вакансии"</p>
                </label>
                <label className="form-control-sm form-switch text-center m-0 p-1">
                  Детальное отображение:
                  <input
                    type="checkbox"
                    className="form-check-input m-0 p-1"
                    id="flexSwitchCheckDefault"
                    defaultChecked={detailView}
                    onClick={(e) => detailViewSet(!detailView)}
                  />
                </label>
              </div>
              <div className="">
                <label className="form-control-sm text-center m-0 p-1">
                  Сфера:
                  <select
                    value={sphere}
                    className="form-control form-control-sm text-center m-0 p-1"
                    onChange={(e) => sphereSet(e.target.value)}
                  >
                    <option value="">все варианты</option>
                    <option value="Технологическая">Технологическая</option>
                    <option value="Не технологическая">
                      Не технологическая
                    </option>
                  </select>
                </label>
                <label className="form-control-sm text-center m-0 p-1">
                  Образование:
                  <select
                    id="education"
                    name="education"
                    className="form-control form-control-sm text-center m-0 p-1"
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
                <label className="form-control-sm text-center m-0 p-1">
                  Опыт:
                  <select
                    id="experience"
                    name="experience"
                    className="form-control form-control-sm text-center m-0 p-1"
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
              <div className="m-0 p-1">
                <label className="w-75 form-control-sm m-0 p-1">
                  Поле поиска по части названия или квалификации:
                  <input
                    type="text"
                    className="form-control"
                    placeholder="вводите часть названия тут..."
                    value={search}
                    onChange={(e) => searchSet(e.target.value)}
                  />
                </label>
                <label className="form-control-sm text-center m-0 p-1">
                  Сортировка по:
                  <select
                    id="sort"
                    name="sort"
                    className="form-control form-control-sm text-center m-0 p-1"
                    value={sort}
                    onChange={(e) => sortSet(e.target.value)}
                  >
                    <option value="дате публикации (свежие в начале)">
                      дате публикации (свежие в начале)
                    </option>
                    <option value="дате публикации (свежие в конце)">
                      дате публикации (свежие в конце)
                    </option>
                    <option value="названию (с начала алфавита)">
                      названию (с начала алфавита)
                    </option>
                    <option value="названию (с конца алфавита)">
                      названию (с конца алфавита)
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
                  onClick={handlerReset}
                >
                  сбросить фильтры
                </button>
                <Link
                  to={`/resume_create/0`}
                  className="btn btn-sm btn-success"
                >
                  отправить резюме
                </Link>
                {utils.CheckAccess(userDetailsStore, "moderator_vacancy") && (
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
                      <div className="card-header m-0 p-0 fw-bold lead bg-opacity-10 bg-primary  ">
                        {utils.GetSliceString(
                          vacancy["qualification_field"],
                          30
                        )}
                      </div>
                      <div className="card-body m-0 p-0  ">
                        <div className="row justify-content-center  ">
                          <div className="col-md-6 shadow w-25  ">
                            <img
                              src={utils.GetStaticFile(vacancy["image_field"])}
                              className="img-fluid img-thumbnail"
                              alt="изображение"
                            />
                          </div>
                          <div className="card-body m-0 p-0 col-md-6  ">
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
            <components.MessageComponent variant={"danger"}>
              Вакансии не найдены! Попробуйте изменить условия фильтрации или
              очистить строку поиска.
            </components.MessageComponent>
          )}
        </div>
      </main>
      <components.FooterComponent />
    </div>
  );
};
