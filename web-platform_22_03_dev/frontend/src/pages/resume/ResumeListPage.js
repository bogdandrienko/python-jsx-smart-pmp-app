///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
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
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////components

//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const ResumeListPage = () => {
  //react hooks variables///////////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [detailView, detailViewSet] = useState(true);
  const [education, educationSet] = useState("");
  const [experience, experienceSet] = useState("");
  const [sex, sexSet] = useState("");
  const [sort, sortSet] = useState("дате публикации (свежие в начале)");
  const [searchQualification, searchQualificationSet] = useState("");
  const [searchLastName, searchLastNameSet] = useState("");

  const resumeListStore = useSelector((state) => state.resumeListStore);
  const {
    load: loadResumeList,
    data: dataResumeList,
    // error: errorResumeList,
    // fail: failResumeList,
  } = resumeListStore;

  const getData = () => {
    const form = {
      "Action-type": "RESUME_LIST",
      education: education,
      experience: experience,
      sex: sex,
      sort: sort,
      searchQualification: searchQualification,
      searchLastName: searchLastName,
    };
    dispatch(actions.resumeListAction(form));
  };

  useEffect(() => {
    if (dataResumeList) {
    } else {
      if (!loadResumeList) {
        getData();
      }
    }
  }, [dataResumeList, loadResumeList]);

  const formHandlerSubmit = async (e) => {
    e.preventDefault();
    getData();
  };

  const formHandlerReset = async (e) => {
    e.preventDefault();
    educationSet("");
    experienceSet("");
    sexSet("");
    sortSet("дате публикации (свежие в начале)");
    searchQualificationSet("");
    searchLastNameSet("");
    getData();
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent
        logic={true}
        redirect={true}
        title={"Список резюме"}
        description={
          "страница доступных резюме с возможностью поиска и фильтрации"
        }
      />
      <main className="container  ">
        <div className="">
          <components.StoreStatusComponent
            storeStatus={resumeListStore}
            key={"resumeListStore"}
            consoleLog={constants.DEBUG_CONSTANT}
            showLoad={false}
            loadText={""}
            showData={false}
            dataText={"Данные успешно получены!"}
            showError={true}
            errorText={""}
            showFail={true}
            failText={""}
          />
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
                    <option value="нет опыта">нет опыта</option>
                    <option value="от 1 года до 3 лет">
                      от 1 года до 3 лет
                    </option>
                    <option value="от 3 до 6 лет">от 3 до 6 лет</option>
                    <option value="более 6 лет">более 6 лет</option>
                  </select>
                </label>
                <label className="form-control-sm m-1">
                  Пол:
                  <select
                    value={sex}
                    className="form-control form-control-sm"
                    onChange={(e) => sexSet(e.target.value)}
                  >
                    <option value="">все варианты</option>
                    <option value="мужской">мужской</option>
                    <option value="женский">женский</option>
                  </select>
                </label>
              </div>
              <div className="">
                <label className="w-75 form-control-sm m-1">
                  Поле поиска по части вакансии или квалификации:
                  <input
                    type="text"
                    className="form-control"
                    placeholder="вводите часть вакансии или квалификации тут..."
                    value={searchQualification}
                    onChange={(e) => searchQualificationSet(e.target.value)}
                  />
                </label>
                <label className="w-75 form-control-sm m-1">
                  Поле поиска по части фамилии:
                  <input
                    type="text"
                    className="form-control"
                    placeholder="вводите часть фамилии тут..."
                    value={searchLastName}
                    onChange={(e) => searchLastNameSet(e.target.value)}
                  />
                </label>
                <label className="form-control-sm m-1">
                  Сортировка вакансий по:
                  <select
                    id="sort"
                    name="sort"
                    className="form-control form-control-sm"
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
                  onClick={formHandlerReset}
                >
                  сбросить фильтры
                </button>
              </div>
            </form>
          </ul>
        </div>
        <div className="container-fluid  ">
          {!dataResumeList || dataResumeList.length < 1 ? (
            <components.MessageComponent variant={"danger"}>
              Вакансии не найдены! Попробуйте изменить условия фильтрации или
              очистить строку поиска.
            </components.MessageComponent>
          ) : !detailView ? (
            <ul className="bg-opacity-10 bg-primary shadow">
              {dataResumeList.map((resume, index) => (
                <Link
                  key={index}
                  to={`/resume_detail/${resume.id}`}
                  className="text-decoration-none"
                >
                  <li className="lead border list-group-item-action">
                    {utils.GetSliceString(resume["qualification_field"], 30)}{" "}
                    {utils.GetSliceString(resume["last_name_field"], 30)}{" "}
                    {utils.GetSliceString(resume["first_name_field"], 30)}
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="row justify-content-center  ">
              {dataResumeList.map((resume, index) => (
                <Link
                  key={index}
                  to={`/resume_detail/${resume.id}`}
                  className="text-decoration-none border shadow text-center   col-md-6"
                >
                  <div className="card   list-group-item-action">
                    <div className="card-header m-0 p-0 fw-bold lead bg-opacity-10 bg-primary  ">
                      {utils.GetSliceString(resume["qualification_field"], 30)}
                    </div>
                    <div className="card-body m-0 p-0  ">
                      <div className="row justify-content-center  ">
                        <div className="col-md-6 shadow w-25  ">
                          <img
                            src={utils.GetStaticFile(resume["image_field"])}
                            className="img-fluid img-thumbnail"
                            alt="изображение"
                          />
                        </div>
                        <div className="card-body m-0 p-0 col-md-6  ">
                          <table className="table table-sm table-hover table-borderless table-striped  ">
                            <tbody>
                              {resume["datetime_create_field"] !== "" &&
                                resume["datetime_create_field"] !== null && (
                                  <tr className="">
                                    <td className="fw-bold text-secondary text-start">
                                      Опубликовано:
                                    </td>
                                    <td className="small text-end">
                                      {utils.GetSliceString(
                                        utils.GetCleanDateTime(
                                          resume["datetime_create_field"],
                                          true
                                        ),
                                        30
                                      )}
                                    </td>
                                  </tr>
                                )}
                              {resume["last_name_field"] !== "" &&
                                resume["last_name_field"] !== null && (
                                  <tr className="">
                                    <td className="fw-bold text-secondary text-start">
                                      Фамилия:
                                    </td>
                                    <td className="small text-end">
                                      {utils.GetSliceString(
                                        resume["last_name_field"],
                                        30
                                      )}
                                    </td>
                                  </tr>
                                )}
                              {resume["first_name_field"] !== "" &&
                                resume["first_name_field"] !== null && (
                                  <tr className="">
                                    <td className="fw-bold text-secondary text-start">
                                      Имя:
                                    </td>
                                    <td className="small text-end">
                                      {utils.GetSliceString(
                                        resume["first_name_field"],
                                        30
                                      )}
                                    </td>
                                  </tr>
                                )}
                              {resume["patronymic_field"] !== "" &&
                                resume["patronymic_field"] !== null && (
                                  <tr className="">
                                    <td className="fw-bold text-secondary text-start">
                                      Отчество:
                                    </td>
                                    <td className="small text-end">
                                      {utils.GetSliceString(
                                        resume["patronymic_field"],
                                        30
                                      )}
                                    </td>
                                  </tr>
                                )}
                              {resume["datetime_birth_field"] !== "" &&
                                resume["datetime_birth_field"] !== null && (
                                  <tr className="">
                                    <td className="fw-bold text-secondary text-start">
                                      Дата рождения:
                                    </td>
                                    <td className="small text-end">
                                      {utils.GetSliceString(
                                        utils.GetCleanDateTime(
                                          resume["datetime_birth_field"],
                                          false
                                        ),
                                        30
                                      )}
                                    </td>
                                  </tr>
                                )}
                              {resume["education_field"] !== "" &&
                                resume["education_field"] !== null && (
                                  <tr className="">
                                    <td className="fw-bold text-secondary text-start">
                                      Образование:
                                    </td>
                                    <td className="small text-end">
                                      {utils.GetSliceString(
                                        resume["education_field"],
                                        30
                                      )}
                                    </td>
                                  </tr>
                                )}
                              {resume["qualification_field"] !== "" &&
                                resume["qualification_field"] !== null && (
                                  <tr className="">
                                    <td className="fw-bold text-secondary text-start">
                                      Квалификация:
                                    </td>
                                    <td className="small text-end">
                                      {utils.GetSliceString(
                                        resume["qualification_field"],
                                        30
                                      )}
                                    </td>
                                  </tr>
                                )}
                              {resume["experience_field"] !== "" &&
                                resume["experience_field"] !== null && (
                                  <tr className="">
                                    <td className="fw-bold text-secondary text-start">
                                      Опыт:
                                    </td>
                                    <td className="small text-end">
                                      {utils.GetSliceString(
                                        resume["experience_field"],
                                        30
                                      )}
                                    </td>
                                  </tr>
                                )}
                              {resume["contact_data_field"] !== "" &&
                                resume["contact_data_field"] !== null && (
                                  <tr className="">
                                    <td className="fw-bold text-secondary text-start">
                                      Контактные данные:
                                    </td>
                                    <td className="small text-end">
                                      {utils.GetSliceString(
                                        resume["contact_data_field"],
                                        30
                                      )}
                                      {}
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
          )}
        </div>
      </main>
      <components.FooterComponent />
    </div>
  );
};
