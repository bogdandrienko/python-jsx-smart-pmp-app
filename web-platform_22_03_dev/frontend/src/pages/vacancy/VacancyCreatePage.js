import React, { useState } from "react";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import { vacancyList } from "../../js/constants";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const VacancyListPage = () => {
  const dispatch = useDispatch();

  const [qualification, qualificationSet] = useState("");
  const [rank, rankSet] = useState("");
  const [sphere, sphereSet] = useState("");
  const [education, educationSet] = useState("");
  const [experience, experienceSet] = useState("");
  const [schedule, scheduleSet] = useState("");
  const [image, imageSet] = useState(null);
  const [description, descriptionSet] = useState("");

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;

  const submitHandler = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "VACANCY_CREATE",
    };
    // dispatch(rationalCreateAction(form));
  };

  function checkAccess(slug = "") {
    if (dataUserDetails) {
      if (dataUserDetails["group_model"]) {
        return dataUserDetails["group_model"].includes(slug);
      }
      return false;
    }
    return false;
  }
  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Создать вакансию"}
        second={"страница с формой для создания новой свободной вакансии."}
      />
      <main className="container text-center">
        <div className="card-header text-start">
          <Link to={"/vacancy_list"} className="btn btn-md btn-outline-primary">
            {"<="} К общему списку вакансий
          </Link>
        </div>
        <div>
          <div className="container">
            <form
              method="POST"
              target="_self"
              encType="multipart/form-data"
              name="VACANCY_CREATE"
              autoComplete="on"
              className="text-center"
              onSubmit={submitHandler}
            >
              <div className="">
                <div className="">
                  <div className="">
                    <h6 className="lead">Вакансия</h6>
                  </div>
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <label className="w-75 form-control-sm">
                      Квалификация:
                      <input
                        type="text"
                        id="qualification"
                        name="qualification"
                        required
                        placeholder="вводите квалификацию тут..."
                        value={qualification}
                        minLength="1"
                        maxLength="256"
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
                    <label className="w-25 form-control-sm">
                      Разряд:
                      <input
                        type="text"
                        id="rank"
                        name="rank"
                        placeholder="вводите разряд тут..."
                        value={rank}
                        minLength="1"
                        maxLength="128"
                        className="form-control form-control-sm"
                        onChange={(e) => rankSet(e.target.value)}
                      />
                      <small className="text-secondary">* не обязательно</small>
                      <p className="p-0 m-0">
                        <small className="text-muted">
                          длина: не более 128 символов
                        </small>
                      </p>
                    </label>
                  </div>
                  <br />
                  <div className="p-0 m-0">
                    <label className="form-control-sm">
                      Сфера:
                      <select
                        id="sphere"
                        name="sphere"
                        value={sphere}
                        className="form-control form-control-sm"
                        onChange={(e) => sphereSet(e.target.value)}
                      >
                        <option value="Технологическая">Технологическая</option>
                        <option value="Не технологическая">
                          Не технологическая
                        </option>
                      </select>
                      <small className="text-danger">* обязательно</small>
                    </label>
                    <label className="form-control-sm w-25">
                      Образование:
                      <select
                        id="education"
                        name="education"
                        value={education}
                        className="form-control form-control-sm"
                        onChange={(e) => educationSet(e.target.value)}
                      >
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
                    <label className="form-control-sm w-25">
                      Опыт:
                      <select
                        id="experience"
                        name="experience"
                        value={experience}
                        className="form-control form-control-sm"
                        onChange={(e) => experienceSet(e.target.value)}
                      >
                        <option value="">Не имеет значения</option>
                        <option value="от 1 года до 3 лет">
                          от 1 года до 3 лет
                        </option>
                        <option value="от 3 до 6 лет">от 3 до 6 лет</option>
                        <option value="более 6 лет">более 6 лет</option>
                      </select>
                      <small className="text-danger">* обязательно</small>
                    </label>
                    <label className="form-control-sm w-25">
                      График:
                      <select
                        id="schedule"
                        name="schedule"
                        value={schedule}
                        className="form-control form-control-sm"
                        onChange={(e) => scheduleSet(e.target.value)}
                      >
                        <option value="Полный день">Полный день</option>
                        <option value="Сменный">Сменный</option>
                        <option value="Удалённая работа">
                          Удалённая работа
                        </option>
                        <option value="Особое">Особое</option>
                      </select>
                      <small className="text-danger">* обязательно</small>
                    </label>
                    <label className="form-control-sm">
                      Картинка-заставка:
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept=".jpg, .png"
                        className="form-control form-control-sm"
                        onChange={(e) => imageSet(e.target.files[0])}
                      />
                      <small className="text-muted">* не обязательно</small>
                    </label>
                  </div>
                  <br />
                  <div className="p-0 m-0">
                    <label className="w-100 form-control-sm">
                      Описание:
                      <textarea
                        id="short_description_char_field"
                        name="short_description_char_field"
                        required
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default VacancyListPage;
