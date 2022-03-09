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
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import StoreStatusComponent from "../../components/StoreStatusComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const VacancyChangePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const [qualification, qualificationSet] = useState("");
  const [rank, rankSet] = useState("");
  const [image, imageSet] = useState(null);
  const [currentImage, currentImageSet] = useState("");
  const [clearImage, clearImageSet] = useState(false);
  const [sphere, sphereSet] = useState("");
  const [education, educationSet] = useState("");
  const [experience, experienceSet] = useState("");
  const [schedule, scheduleSet] = useState("");
  const [description, descriptionSet] = useState("");

  const vacancyDetailStore = useSelector((state) => state.vacancyDetailStore); // store.js
  const {
    load: loadVacancyDetail,
    data: dataVacancyDetail,
    // error: errorVacancyDetail,
    // fail: failVacancyDetail,
  } = vacancyDetailStore;
  const vacancyDeleteStore = useSelector((state) => state.vacancyDeleteStore); // store.js
  const {
    // load: loadVacancyDelete,
    data: dataVacancyDelete,
    // error: errorVacancyDelete,
    // fail: failVacancyDelete,
  } = vacancyDeleteStore;
  const vacancyChangeStore = useSelector((state) => state.vacancyChangeStore); // store.js
  const {
    // load: loadVacancyCreate,
    data: dataVacancyChange,
    // error: errorVacancyCreate,
    // fail: failVacancyCreate,
  } = vacancyChangeStore;

  useEffect(() => {
    if (dataVacancyChange) {
      utils.Sleep(2000).then(() => {
        dispatch({ type: constants.VACANCY_CHANGE_RESET_CONSTANT });
        dispatch({ type: constants.VACANCY_LIST_RESET_CONSTANT });
        navigate("/vacancy_list");
      });
    }
  }, [dataVacancyChange]);

  useEffect(() => {
    if (
      dataVacancyDetail &&
      dataVacancyDetail.id !== undefined &&
      id !== dataVacancyDetail.id
    ) {
      dispatch({ type: constants.VACANCY_DETAIL_RESET_CONSTANT });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (dataVacancyDetail) {
      qualificationSet(dataVacancyDetail["qualification_field"]);
      rankSet(dataVacancyDetail["rank_field"]);
      sphereSet(dataVacancyDetail["sphere_field"]);
      educationSet(dataVacancyDetail["education_field"]);
      experienceSet(dataVacancyDetail["experience_field"]);
      scheduleSet(dataVacancyDetail["schedule_field"]);
      currentImageSet(dataVacancyDetail["image_field"]);
      clearImageSet(false);
      descriptionSet(dataVacancyDetail["description_field"]);
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
      "Action-type": "VACANCY_CHANGE",
      id: id,
      qualification: qualification,
      rank: rank,
      sphere: sphere,
      education: education,
      experience: experience,
      schedule: schedule,
      image: image,
      clearImage: clearImage,
      description: description,
    };
    dispatch(actions.vacancyChangeAuthAction(form));
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Изменить вакансию"}
        second={"страница с формой для изменения вакансии."}
      />
      <main className="container text-center">
        <div className="btn-group p-1 m-0 text-start w-100">
          <Link to={"/vacancy_list"} className="btn btn-sm btn-primary">
            {"<="} назад к списку
          </Link>
        </div>
        <div className="p-0 m-0">
          {StoreStatusComponent(
            vacancyDetailStore,
            "vacancyDetailStore",
            false,
            "",
            constants.DEBUG_CONSTANT
          )}
          {StoreStatusComponent(
            vacancyChangeStore,
            "vacancyChangeStore",
            true,
            "",
            constants.DEBUG_CONSTANT
          )}
          {StoreStatusComponent(
            vacancyDeleteStore,
            "vacancyDeleteStore",
            true,
            "",
            constants.DEBUG_CONSTANT
          )}
        </div>
        <div className="container-fluid">
          <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center p-0 m-0">
            <form autoComplete="on" className="" onSubmit={formHandlerSubmit}>
              <div className="p-0 m-0">
                <h6 className="lead">Редактировать вакансию</h6>
              </div>
              <div className="p-0 m-0">
                <label className="w-50 form-control-md m-1">
                  Квалификация:
                  <input
                    type="text"
                    value={qualification}
                    required
                    minLength="1"
                    maxLength="256"
                    placeholder="вводите квалификацию тут..."
                    className="form-control form-control-sm"
                    onChange={(e) => qualificationSet(e.target.value)}
                  />
                  <small className="text-danger">* обязательно</small>
                  <p className="p-0 m-0">
                    <small className="text-muted">
                      длина: не более 256 символов
                    </small>
                  </p>
                </label>
                <label className="form-control-md m-1">
                  Разряд:
                  <input
                    type="text"
                    placeholder="вводите разряд тут..."
                    value={rank}
                    minLength="1"
                    maxLength="32"
                    className="form-control form-control-sm"
                    onChange={(e) => rankSet(e.target.value)}
                  />
                  <small className="text-secondary">* не обязательно</small>
                  <p className="p-0 m-0">
                    <small className="text-muted">
                      длина: не более 32 символов
                    </small>
                  </p>
                </label>
              </div>
              <br />
              <div className="p-0 m-0">
                <label className="form-control-md m-1">
                  Текущее изображение:
                  <img
                    src={utils.GetStaticFile(currentImage)}
                    className="img-fluid w-25"
                    alt="изображение"
                  />
                  <small className="text-muted">* не обязательно</small>
                </label>
                <label className="form-control-md form-switch m-1">
                  Удалить текущее изображение:
                  <input
                    type="checkbox"
                    className="form-check-input m-1"
                    id="flexSwitchCheckDefault"
                    defaultChecked={clearImage}
                    onClick={(e) => clearImageSet(!clearImage)}
                  />
                </label>
              </div>
              <div className="p-0 m-0">
                <label className="form-control-md m-1">
                  Изображение:
                  <input
                    type="file"
                    accept=".jpg, .png"
                    className="form-control form-control-sm"
                    onChange={(e) => imageSet(e.target.files[0])}
                  />
                  <small className="text-muted">* не обязательно</small>
                </label>
                <label className="form-control-md m-1">
                  Сфера:
                  <select
                    value={sphere}
                    required
                    className="form-control form-control-sm"
                    onChange={(e) => sphereSet(e.target.value)}
                  >
                    <option value="">не выбрано</option>
                    <option value="Технологическая">Технологическая</option>
                    <option value="Не технологическая">
                      Не технологическая
                    </option>
                  </select>
                  <small className="text-danger">* обязательно</small>
                </label>
              </div>
              <br />
              <div className="p-0 m-0">
                <label className="form-control-md m-1">
                  Образование:
                  <select
                    value={education}
                    required
                    className="form-control form-control-sm"
                    onChange={(e) => educationSet(e.target.value)}
                  >
                    <option value="">не выбрано</option>
                    <option value="Высшее, Средне-специальное">
                      Высшее / Средне-специальное
                    </option>
                    <option value="Высшее">Высшее</option>
                    <option value="Средне-специальное">
                      Средне-специальное
                    </option>
                    <option value="Среднее">Среднее</option>
                  </select>
                  <small className="text-danger">* обязательно</small>
                </label>
                <label className="form-control-md m-1">
                  Опыт:
                  <select
                    value={experience}
                    required
                    className="form-control form-control-sm"
                    onChange={(e) => experienceSet(e.target.value)}
                  >
                    <option value="">не выбрано</option>
                    <option value="не имеет значения">не имеет значения</option>
                    <option value="от 1 года до 3 лет">
                      от 1 года до 3 лет
                    </option>
                    <option value="от 3 до 6 лет">от 3 до 6 лет</option>
                    <option value="более 6 лет">более 6 лет</option>
                  </select>
                  <small className="text-danger">* обязательно</small>
                </label>
                <label className="form-control-md m-1">
                  График:
                  <select
                    value={schedule}
                    required
                    className="form-control form-control-sm"
                    onChange={(e) => scheduleSet(e.target.value)}
                  >
                    <option value="">не выбрано</option>
                    <option value="Полный день(5/2)">Полный день</option>
                    <option value="Сменный">Сменный</option>
                    <option value="Удалённая работа">Удалённая работа</option>
                    <option value="Особый">Особый</option>
                  </select>
                  <small className="text-danger">* обязательно</small>
                </label>
              </div>
              <br />
              <div className="p-0 m-0">
                <label className="w-75 form-control-md m-1">
                  Описание:
                  <textarea
                    id="short_description_char_field"
                    name="short_description_char_field"
                    placeholder="вводите описание тут..."
                    value={description}
                    minLength="1"
                    maxLength="512"
                    rows="2"
                    className="form-control form-control-sm"
                    onChange={(e) => descriptionSet(e.target.value)}
                  />
                  <small className="text-secondary">* не обязательно</small>
                  <p className="p-0 m-0">
                    <small className="text-muted">
                      длина: не более 512 символов
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
      </main>
      <FooterComponent />
    </div>
  );
};

export default VacancyChangePage;
