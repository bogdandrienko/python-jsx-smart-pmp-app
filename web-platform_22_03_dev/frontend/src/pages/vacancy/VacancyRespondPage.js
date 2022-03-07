import React, { useEffect, useState } from "react";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import { vacancyList } from "../../js/constants";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const VacancyListPage = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [vacancy, vacancySet] = useState(null);

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

  useEffect(() => {
    const getVacancy = async () => {
      if (id !== "0") {
        const form = {
          "Action-type": "VACANCY_DETAIL",
          id: id,
        };
        const formData = new FormData();
        Object.entries(form).map(([key, value]) => {
          formData.append(key, value);
        });
        const { data } = await axios({
          url: "/api/any/vacancy/",
          method: "POST",
          timeout: 10000,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        vacancySet(data["response"]);
      }
    };
    getVacancy();
  }, [id]);
  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Откликнуться на вакансию"}
        second={"страница для отклика на вакансию и отправки резюме."}
      />
      <main className="container">
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
              name="RATIONAL_CREATE"
              autoComplete="on"
              className="text-center"
            >
              <div className="p-0 m-0">
                <div className="p-0 m-0">
                  <div className="p-0 m-0">
                    <h6 className="lead">Резюме</h6>
                  </div>
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <label className="w-100 form-control-sm">
                      Вакансия:
                      <input
                        type="text"
                        id="name_char_field"
                        name="name_char_field"
                        required
                        placeholder="вводите название тут..."
                        value={vacancy ? vacancy["qualification_field"] : ""}
                        minLength="1"
                        maxLength="32"
                        className="form-control form-control-sm"
                      />
                      <small className="text-danger">* обязательно</small>
                      <p className="p-0 m-0">
                        <small className="text-muted">
                          длина: не более 32 символов
                        </small>
                      </p>
                    </label>
                  </div>
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <label className="w-25 form-control-sm">
                      Фамилия:
                      <input
                        type="text"
                        id="name_char_field"
                        name="name_char_field"
                        required
                        placeholder="вводите название тут..."
                        minLength="1"
                        maxLength="32"
                        className="form-control form-control-sm"
                      />
                      <small className="text-danger">* обязательно</small>
                      <p className="p-0 m-0">
                        <small className="text-muted">
                          длина: не более 32 символов
                        </small>
                      </p>
                    </label>
                    <label className="w-25 form-control-sm">
                      Имя:
                      <input
                        type="text"
                        id="name_char_field"
                        name="name_char_field"
                        required
                        placeholder="вводите название тут..."
                        minLength="1"
                        maxLength="32"
                        className="form-control form-control-sm"
                      />
                      <small className="text-danger">* обязательно</small>
                      <p className="p-0 m-0">
                        <small className="text-muted">
                          длина: не более 32 символов
                        </small>
                      </p>
                    </label>
                    <label className="w-25 form-control-sm">
                      Отчество:
                      <input
                        type="text"
                        id="name_char_field"
                        name="name_char_field"
                        required
                        placeholder="вводите название тут..."
                        minLength="1"
                        maxLength="32"
                        className="form-control form-control-sm"
                      />
                      <small className="text-muted">* не обязательно</small>
                      <p className="p-0 m-0">
                        <small className="text-muted">
                          длина: не более 32 символов
                        </small>
                      </p>
                    </label>
                  </div>
                  <div className="p-0 m-0">
                    <label className="form-control-sm">
                      Изображение:
                      <input
                        type="file"
                        id="avatar_image_field"
                        name="avatar_image_field"
                        accept=".jpg, .png"
                        className="form-control form-control-sm"
                      />
                      <small className="text-muted">* не обязательно</small>
                    </label>
                    <label className="form-control-sm">
                      Картинка-заставка:
                      <input
                        type="datetime-local"
                        id="avatar_image_field"
                        name="avatar_image_field"
                        accept=".jpg, .png"
                        className="form-control form-control-sm"
                      />
                      <small className="text-muted">* не обязательно</small>
                    </label>
                  </div>
                  <div className="p-0 m-0">
                    <label className="form-control-sm w-25">
                      Образование:
                      <select
                        id="sphere"
                        name="sphere"
                        required
                        className="form-control form-control-sm"
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
                    <label className="form-control-sm w-25">
                      Опыт:
                      <select
                        id="sphere"
                        name="sphere"
                        required
                        className="form-control form-control-sm"
                      >
                        <option value="">Не указано</option>
                        <option value="Нет опыта">Нет опыта</option>
                        <option value="от 1 года до 3 лет">
                          от 1 года до 3 лет
                        </option>
                        <option value="от 3 до 6 лет">от 3 до 6 лет</option>
                        <option value="более 6 лет">более 6 лет</option>
                      </select>
                      <small className="text-danger">* обязательно</small>
                    </label>
                    <label className="form-control-sm w-25">
                      Пол:
                      <select
                        id="sphere"
                        name="sphere"
                        required
                        className="form-control form-control-sm"
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
                    <label className="w-100 form-control-sm">
                      Контактные данные:
                      <textarea
                        id="short_description_char_field"
                        name="short_description_char_field"
                        required
                        placeholder="вводите квалификацию тут..."
                        minLength="5"
                        maxLength="200"
                        rows="2"
                        className="form-control form-control-sm"
                      />
                      <small className="text-danger">* обязательно</small>
                      <p className="p-0 m-0">
                        <small className="text-muted">
                          длина: не более 200 символов
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
