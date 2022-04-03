// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const ResumeCreatePage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [qualification, qualificationSet] = useState("");
  const [lastName, lastNameSet] = useState("");
  const [firstName, firstNameSet] = useState("");
  const [patronymic, patronymicSet] = useState("");
  const [image, imageSet] = useState(null);
  const [birthDate, birthDateSet] = useState("");
  const [education, educationSet] = useState("");
  const [experience, experienceSet] = useState("");
  const [sex, sexSet] = useState("");
  const [contactData, contactDataSet] = useState("");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const vacancyDetailStore = useSelector((state) => state.vacancyDetailStore);
  const {
    load: loadVacancyDetail,
    data: dataVacancyDetail,
    // error: errorVacancyDetail,
    // fail: failVacancyDetail,
  } = vacancyDetailStore;
  //////////////////////////////////////////////////////////
  const resumeCreateStore = useSelector((state) => state.resumeCreateStore);
  const {
    // load: loadResumeCreate,
    data: dataResumeCreate,
    // error: errorResumeCreate,
    // fail: failResumeCreate,
  } = resumeCreateStore;
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (
      dataVacancyDetail &&
      (dataVacancyDetail.id !== undefined || dataVacancyDetail.id !== id)
    ) {
      dispatch({ type: constants.VACANCY_DETAIL_RESET_CONSTANT });
    } else {
    }
  }, [dataVacancyDetail, id]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataResumeCreate) {
      utils.Sleep(2000).then(() => {
        dispatch({ type: constants.RESUME_CREATE_RESET_CONSTANT });
        dispatch({ type: constants.VACANCY_LIST_RESET_CONSTANT });
        navigate("/vacancy_list");
      });
    }
  }, [dataResumeCreate]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataVacancyDetail) {
      qualificationSet(dataVacancyDetail["qualification_field"]);
    } else {
      const form = {
        "Action-type": "VACANCY_DETAIL",
        id: id,
      };
      dispatch(actions.vacancyDetailAction(form));
    }
  }, [dataVacancyDetail]);
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "RESUME_CREATE",
      qualification: qualification,
      lastName: lastName,
      firstName: firstName,
      patronymic: patronymic,
      image: image,
      birthDate: birthDate,
      education: education,
      experience: experience,
      sex: sex,
      contactData: contactData,
    };
    dispatch(actions.resumeCreateAction(form));
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={vacancyDetailStore}
          key={"vacancyDetailStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={false}
          loadText={""}
          showData={false}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        <components.StoreStatusComponent
          storeStatus={resumeCreateStore}
          key={"resumeCreateStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={true}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        <div className="btn-group p-1 m-0 text-start w-100">
          <Link to={"/vacancy_list"} className="btn btn-sm btn-primary">
            {"<="} назад к списку
          </Link>
        </div>
        {!dataResumeCreate && (
          <div className="container-fluid">
            <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center  ">
              <form autoComplete="on" className="" onSubmit={handlerSubmit}>
                <div className="m-0 p-0">
                  <h6 className="lead">Отправить резюме</h6>
                </div>
                <br />
                <div className="m-0 p-0">
                  <label className="w-50 form-control-sm">
                    Вакансия:
                    <input
                      type="text"
                      required
                      placeholder="вводите вакансия тут..."
                      value={qualification}
                      minLength="1"
                      maxLength="300"
                      className="form-control form-control-sm text-center m-0 p-1"
                      onChange={(e) =>
                        qualificationSet(
                          e.target.value.replace(
                            utils.GetRegexType({
                              numbers: true,
                              cyrillic: true,
                              space: true,
                            }),
                            ""
                          )
                        )
                      }
                    />
                    <small className="text-danger m-0 p-0">
                      * обязательно
                      <small className="custom-color-warning-1 m-0 p-0">
                        {" "}
                        * только кириллица, цифры и пробел
                      </small>
                      <small className="text-muted m-0 p-0">
                        {" "}
                        * длина: не более 300 символов
                      </small>
                    </small>
                  </label>
                </div>
                <div className="m-0 p-0">
                  <label className="form-control-sm text-center m-0 p-1">
                    Фамилия:
                    <input
                      type="text"
                      required
                      placeholder="вводите фамилию тут..."
                      value={lastName}
                      minLength="1"
                      maxLength="300"
                      className="form-control form-control-sm text-center m-0 p-1"
                      onChange={(e) =>
                        lastNameSet(
                          e.target.value.replace(
                            utils.GetRegexType({
                              cyrillic: true,
                            }),
                            ""
                          )
                        )
                      }
                    />
                    <small className="text-danger m-0 p-0">
                      * обязательно
                      <small className="custom-color-warning-1 m-0 p-0">
                        {" "}
                        * только кириллица
                      </small>
                      <small className="text-muted m-0 p-0">
                        {" "}
                        * длина: не более 300 символов
                      </small>
                    </small>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Имя:
                    <input
                      type="text"
                      required
                      placeholder="вводите имя тут..."
                      value={firstName}
                      minLength="1"
                      maxLength="300"
                      className="form-control form-control-sm text-center m-0 p-1"
                      onChange={(e) =>
                        firstNameSet(
                          e.target.value.replace(
                            utils.GetRegexType({
                              cyrillic: true,
                            }),
                            ""
                          )
                        )
                      }
                    />
                    <small className="text-danger m-0 p-0">
                      * обязательно
                      <small className="custom-color-warning-1 m-0 p-0">
                        {" "}
                        * только кириллица
                      </small>
                      <small className="text-muted m-0 p-0">
                        {" "}
                        * длина: не более 300 символов
                      </small>
                    </small>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Отчество:
                    <input
                      type="text"
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={patronymic}
                      placeholder="вводите отчество тут..."
                      minLength="1"
                      maxLength="300"
                      required
                      onChange={(e) =>
                        patronymicSet(
                          e.target.value.replace(
                            utils.GetRegexType({
                              cyrillic: true,
                            }),
                            ""
                          )
                        )
                      }
                    />
                    <small className="text-muted m-0 p-0">
                      * не обязательно
                      <small className="custom-color-warning-1 m-0 p-0">
                        {" "}
                        * только кириллица
                      </small>
                      <small className="text-muted m-0 p-0">
                        {" "}
                        * длина: не более 300 символов
                      </small>
                    </small>
                  </label>
                </div>
                <div className="m-0 p-0">
                  <label className="form-control-sm text-center m-0 p-1">
                    Изображение:
                    <input
                      type="file"
                      className="form-control form-control-sm text-center m-0 p-1"
                      onChange={(e) => imageSet(e.target.files[0])}
                    />
                    <small className="text-muted">* не обязательно</small>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Дата рождения:
                    <input
                      type="datetime-local"
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={birthDate}
                      required
                      onChange={(e) => birthDateSet(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                  </label>
                </div>
                <div className="m-0 p-0">
                  <label className="form-control-sm text-center m-0 p-1">
                    Образование:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={education}
                      required
                      onChange={(e) => educationSet(e.target.value)}
                    >
                      <option value="">Не указано</option>
                      <option value="Высшее, Средне-специальное">
                        Высшее, Средне-специальное
                      </option>
                      <option value="Высшее">Высшее</option>
                      <option value="Средне-специальное">
                        Средне-специальное
                      </option>
                      <option value="Среднее">Среднее</option>
                    </select>
                    <small className="text-danger">* обязательно</small>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Опыт:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={experience}
                      required
                      onChange={(e) => experienceSet(e.target.value)}
                    >
                      <option value="">Не указано</option>
                      <option value="нет опыта">нет опыта</option>
                      <option value="от 1 года до 3 лет">
                        от 1 года до 3 лет
                      </option>
                      <option value="от 3 до 6 лет">от 3 до 6 лет</option>
                      <option value="более 6 лет">более 6 лет</option>
                    </select>
                    <small className="text-danger">* обязательно</small>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Пол:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={sex}
                      required
                      onChange={(e) => sexSet(e.target.value)}
                    >
                      <option value="">Не указано</option>
                      <option value="мужской">мужской</option>
                      <option value="женский">женский</option>
                    </select>
                    <small className="text-danger">* обязательно</small>
                  </label>
                </div>
                <br />
                <div className="m-0 p-0">
                  <label className="w-75 form-control-sm">
                    Контактные данные:
                    <textarea
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={contactData}
                      placeholder="вводите контактные данные тут..."
                      minLength="5"
                      maxLength="3000"
                      rows="2"
                      required
                      onChange={(e) => contactDataSet(e.target.value)}
                    />
                    <small className="text-danger">
                      * обязательно
                      <small className="text-muted">
                        * длина: не более 3000 символов
                      </small>
                    </small>
                  </label>
                </div>
                <br />
                <div className="container-fluid text-center">
                  <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                    <li className="m-0 p-1">
                      <button
                        type="submit"
                        className="btn btn-sm btn-outline-primary"
                      >
                        <i className="fa-solid fa-circle-check m-0 p-1" />
                        отправить
                      </button>
                    </li>
                    <li className="m-0 p-1">
                      <button
                        type="reset"
                        className="btn btn-sm btn-outline-warning"
                      >
                        сбросить все данные
                      </button>
                    </li>
                  </ul>
                </div>
              </form>
            </ul>
          </div>
        )}
      </main>
      <components.FooterComponent />
    </div>
  );
};
