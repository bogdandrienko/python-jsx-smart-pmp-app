///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const VacancyCreatePage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [qualification, qualificationSet] = useState("");
  const [rank, rankSet] = useState("");
  const [image, imageSet] = useState(null);
  const [sphere, sphereSet] = useState("");
  const [education, educationSet] = useState("");
  const [experience, experienceSet] = useState("");
  const [schedule, scheduleSet] = useState("");
  const [description, descriptionSet] = useState("");
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const vacancyCreateStore = useSelector((state) => state.vacancyCreateStore);
  const {
    // load: loadVacancyCreate,
    data: dataVacancyCreate,
    // error: errorVacancyCreate,
    // fail: failVacancyCreate,
  } = vacancyCreateStore;
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
  useEffect(() => {
    if (dataVacancyCreate) {
      utils.Sleep(2000).then(() => {
        dispatch({ type: constants.VACANCY_CREATE_RESET_CONSTANT });
        dispatch({ type: constants.VACANCY_LIST_RESET_CONSTANT });
        navigate("/vacancy_list");
      });
    }
  }, [dataVacancyCreate]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "VACANCY_CREATE",
      qualification: qualification,
      rank: rank,
      sphere: sphere,
      education: education,
      experience: experience,
      schedule: schedule,
      image: image,
      description: description,
    };
    dispatch(actions.vacancyCreateAction(form));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={vacancyCreateStore}
          keyStatus={"vacancyCreateStore"}
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
        {!dataVacancyCreate && (
          <div className="container-fluid">
            <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center  ">
              <form autoComplete="on" className="" onSubmit={handlerSubmit}>
                <div className="">
                  <h6 className="lead">Свободная вакансия</h6>
                </div>
                <div className="">
                  <label className="w-50 form-control-sm m-0 p-1">
                    Квалификация:
                    <input
                      type="text"
                      value={qualification}
                      required
                      minLength="1"
                      maxLength="256"
                      placeholder="вводите квалификацию тут..."
                      className="form-control form-control-sm text-center m-0 p-1"
                      onChange={(e) => qualificationSet(e.target.value)}
                    />
                    <small className="text-danger">
                      * обязательно
                      <small className="text-muted">
                        длина: не более 256 символов
                      </small>
                    </small>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Разряд:
                    <input
                      type="text"
                      placeholder="вводите разряд тут..."
                      value={rank}
                      minLength="1"
                      maxLength="32"
                      className="form-control form-control-sm text-center m-0 p-1"
                      onChange={(e) => rankSet(e.target.value)}
                    />
                    <small className="text-secondary">* не обязательно</small>
                    <p className="">
                      <small className="text-muted">
                        длина: не более 32 символов
                      </small>
                    </p>
                  </label>
                </div>
                <br />
                <div className="">
                  <label className="form-control-sm text-center m-0 p-1">
                    Изображение:
                    <input
                      type="file"
                      accept=".jpg, .png"
                      className="form-control form-control-sm text-center m-0 p-1"
                      onChange={(e) => imageSet(e.target.files[0])}
                    />
                    <small className="text-muted">* не обязательно</small>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Сфера:
                    <select
                      value={sphere}
                      required
                      className="form-control form-control-sm text-center m-0 p-1"
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
                <div className="">
                  <label className="form-control-sm text-center m-0 p-1">
                    Образование:
                    <select
                      value={education}
                      required
                      className="form-control form-control-sm text-center m-0 p-1"
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
                  <label className="form-control-sm text-center m-0 p-1">
                    Опыт:
                    <select
                      value={experience}
                      required
                      className="form-control form-control-sm text-center m-0 p-1"
                      onChange={(e) => experienceSet(e.target.value)}
                    >
                      <option value="">не выбрано</option>
                      <option value="не имеет значения">
                        не имеет значения
                      </option>
                      <option value="от 1 года до 3 лет">
                        от 1 года до 3 лет
                      </option>
                      <option value="от 3 до 6 лет">от 3 до 6 лет</option>
                      <option value="более 6 лет">более 6 лет</option>
                    </select>
                    <small className="text-danger">* обязательно</small>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    График:
                    <select
                      value={schedule}
                      required
                      className="form-control form-control-sm text-center m-0 p-1"
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
                <div className="">
                  <label className="w-75 form-control-sm m-0 p-1">
                    Описание:
                    <textarea
                      id="short_description_char_field"
                      name="short_description_char_field"
                      placeholder="вводите описание тут..."
                      value={description}
                      minLength="1"
                      maxLength="512"
                      rows="2"
                      className="form-control form-control-sm text-center m-0 p-1"
                      onChange={(e) => descriptionSet(e.target.value)}
                    />
                    <small className="text-secondary">* не обязательно</small>
                    <p className="">
                      <small className="text-muted">
                        длина: не более 512 символов
                      </small>
                    </p>
                  </label>
                </div>
                <br />
                <div className="container-fluid text-center">
                  <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                    <li className="m-0 p-1">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        type="submit"
                      >
                        Отправить
                      </button>
                    </li>
                    <li className="m-0 p-1">
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
      <components.FooterComponent />
    </div>
  );
};
