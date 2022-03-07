import React, { useState } from "react";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import { vacancyList } from "../../js/constants";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const VacancyListPage = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const [subdivision, setSubdivision] = useState("");
  const [sphere, setSphere] = useState("");
  const [category, setCategory] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [additionalWord, setAdditionalWord] = useState("");
  const [additionalPdf, setAdditionalPdf] = useState("");
  const [additionalExcel, setAdditionalExcel] = useState(null);
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [user3, setUser3] = useState("");
  const [user4, setUser4] = useState("");
  const [user5, setUser5] = useState("");
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
        first={"Изменить вакансию"}
        second={"страница с формой для изменения вакансии."}
      />
      <main className="container text-center">
        <div className="card-header">
          <Link to={"/vacancy_list"} className="btn btn-md btn-outline-primary">
            К общему списку вакансий
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
                        id="name_char_field"
                        name="name_char_field"
                        required
                        placeholder="вводите квалификацию тут..."
                        value={id}
                        minLength="1"
                        maxLength="256"
                        className="form-control form-control-sm"
                        onChange={(e) => setName(e.target.value)}
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
                        id="name_char_field"
                        name="name_char_field"
                        required
                        placeholder="вводите разряд тут..."
                        value={name}
                        minLength="1"
                        maxLength="128"
                        className="form-control form-control-sm"
                        onChange={(e) => setName(e.target.value)}
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
                        className="form-control form-control-sm"
                      >
                        <option value="Технологическая">Технологическая</option>
                        <option value="Не технологическая">
                          Не технологическая
                        </option>
                      </select>
                      <small className="text-secondary">* не обязательно</small>
                    </label>
                    <label className="form-control-sm w-25">
                      Образование:
                      <select
                        id="sphere"
                        name="sphere"
                        className="form-control form-control-sm"
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
                      <small className="text-secondary">* не обязательно</small>
                    </label>
                    <label className="form-control-sm w-25">
                      Опыт:
                      <select
                        id="sphere"
                        name="sphere"
                        className="form-control form-control-sm"
                      >
                        <option value="Не имеет значения">
                          Не имеет значения
                        </option>
                        <option value="от 1 года до 3 лет">
                          от 1 года до 3 лет
                        </option>
                        <option value="более 3 лет">более 3 лет</option>
                      </select>
                      <small className="text-secondary">* не обязательно</small>
                    </label>
                    <label className="form-control-sm">
                      Картинка-заставка:
                      <input
                        type="file"
                        id="avatar_image_field"
                        name="avatar_image_field"
                        accept=".jpg, .png"
                        className="form-control form-control-sm"
                        onChange={(e) => setAvatar(e.target.files[0])}
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
                        value={shortDescription}
                        minLength="1"
                        maxLength="512"
                        rows="2"
                        className="form-control form-control-sm"
                        onChange={(e) => setShortDescription(e.target.value)}
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
