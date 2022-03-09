import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import StoreStatusComponent from "../../components/StoreStatusComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ResumeCreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;

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

  const vacancyDetailStore = useSelector((state) => state.vacancyDetailStore); // store.js
  const {
    load: loadVacancyDetail,
    data: dataVacancyDetail,
    // error: errorVacancyDetail,
    // fail: failVacancyDetail,
  } = vacancyDetailStore;
  const resumeCreateStore = useSelector((state) => state.resumeCreateStore); // store.js
  const {
    // load: loadResumeCreate,
    data: dataResumeCreate,
    // error: errorResumeCreate,
    // fail: failResumeCreate,
  } = resumeCreateStore;

  useEffect(() => {
    if (
      dataVacancyDetail &&
      dataVacancyDetail.id !== undefined &&
      id !== dataVacancyDetail.id
    ) {
      dispatch({ type: constants.VACANCY_DETAIL_RESET_CONSTANT });
    } else {
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (dataResumeCreate) {
      utils.Sleep(2000).then(() => {
        dispatch({ type: constants.RESUME_CREATE_RESET_CONSTANT });
        dispatch({ type: constants.VACANCY_LIST_RESET_CONSTANT });
        navigate("/vacancy_list");
      });
    }
  }, [dataResumeCreate]);
  useEffect(() => {
    if (dataVacancyDetail) {
      qualificationSet(dataVacancyDetail["qualification_field"]);
    } else {
      if (!loadVacancyDetail) {
        const form = {
          "Action-type": "VACANCY_DETAIL",
          id: id,
        };
        dispatch(actions.vacancyDetailAnyAction(form));
      }
    }
  }, [dispatch, id, dataVacancyDetail]);

  const formHandlerSubmit = (e) => {
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
    dispatch(actions.resumeCreateAnyAction(form));
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={false} />
      <TitleComponent
        first={"Откликнуться на вакансию"}
        second={"страница для отклика на вакансию и отправки резюме."}
      />
      <main className="container p-0">
        <div className="m-0 p-0">
          {StoreStatusComponent(
            resumeCreateStore,
            "resumeCreateStore",
            true,
            "",
            constants.DEBUG_CONSTANT
          )}
        </div>
        <div className="btn-group p-1 m-0 text-start w-100">
          <Link to={"/vacancy_list"} className="btn btn-sm btn-primary">
            {"<="} назад к списку
          </Link>
        </div>
        {!dataResumeCreate && (
          <div className="container-fluid">
            <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center p-0 m-0">
              <form autoComplete="on" className="" onSubmit={formHandlerSubmit}>
                <div className="p-0 m-0">
                  <h6 className="lead">Отправить резюме</h6>
                </div>
                <br />
                <div className="p-0 m-0">
                  <label className="w-50 form-control-sm">
                    Вакансия:
                    <input
                      type="text"
                      id="name_char_field"
                      name="name_char_field"
                      required
                      placeholder="вводите вакансия тут..."
                      value={qualification}
                      minLength="1"
                      maxLength="128"
                      className="form-control form-control-sm"
                      onChange={(e) => qualificationSet(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                    <p className="p-0 m-0">
                      <small className="text-muted">
                        длина: не более 128 символов
                      </small>
                    </p>
                  </label>
                </div>
                <div className="p-0 m-0">
                  <label className="form-control-sm">
                    Фамилия:
                    <input
                      type="text"
                      id="name_char_field"
                      name="name_char_field"
                      required
                      placeholder="вводите фамилию тут..."
                      value={lastName}
                      minLength="1"
                      maxLength="64"
                      className="form-control form-control-sm"
                      onChange={(e) => lastNameSet(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                    <p className="p-0 m-0">
                      <small className="text-muted">
                        длина: не более 64 символов
                      </small>
                    </p>
                  </label>
                  <label className="form-control-sm">
                    Имя:
                    <input
                      type="text"
                      id="name_char_field"
                      name="name_char_field"
                      required
                      placeholder="вводите имя тут..."
                      value={firstName}
                      minLength="1"
                      maxLength="64"
                      className="form-control form-control-sm"
                      onChange={(e) => firstNameSet(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                    <p className="p-0 m-0">
                      <small className="text-muted">
                        длина: не более 64 символов
                      </small>
                    </p>
                  </label>
                  <label className="form-control-sm">
                    Отчество:
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={patronymic}
                      placeholder="вводите отчество тут..."
                      minLength="1"
                      maxLength="64"
                      required
                      onChange={(e) => patronymicSet(e.target.value)}
                    />
                    <small className="text-muted">* не обязательно</small>
                    <p className="p-0 m-0">
                      <small className="text-muted">
                        длина: не более 64 символов
                      </small>
                    </p>
                  </label>
                </div>
                <div className="p-0 m-0">
                  <label className="form-control-sm">
                    Изображение:
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      onChange={(e) => imageSet(e.target.files[0])}
                    />
                    <small className="text-muted">* не обязательно</small>
                  </label>
                  <label className="form-control-sm">
                    Дата рождения:
                    <input
                      type="datetime-local"
                      className="form-control form-control-sm"
                      value={birthDate}
                      required
                      onChange={(e) => birthDateSet(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                  </label>
                </div>
                <div className="p-0 m-0">
                  <label className="form-control-sm">
                    Образование:
                    <select
                      className="form-control form-control-sm"
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
                  <label className="form-control-sm">
                    Опыт:
                    <select
                      className="form-control form-control-sm"
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
                  <label className="form-control-sm">
                    Пол:
                    <select
                      className="form-control form-control-sm"
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
                <div className="p-0 m-0">
                  <label className="w-75 form-control-sm">
                    Контактные данные:
                    <textarea
                      className="form-control form-control-sm"
                      value={contactData}
                      placeholder="вводите контактные данные тут..."
                      minLength="5"
                      maxLength="250"
                      rows="2"
                      required
                      onChange={(e) => contactDataSet(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                    <p className="p-0 m-0">
                      <small className="text-muted">
                        длина: не более 250 символов
                      </small>
                    </p>
                  </label>
                </div>

                <br />
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
              </form>
            </ul>
          </div>
        )}
      </main>
      <FooterComponent />
    </div>
  );
};

export default ResumeCreatePage;
