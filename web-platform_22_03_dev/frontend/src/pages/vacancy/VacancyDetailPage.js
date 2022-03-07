import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import * as utils from "../../js/utils";
import { vacancyDeleteAction } from "../../js/actions";
import StoreStatusComponent from "../../components/StoreStatusComponent";
import * as constants from "../../js/constants";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const VacancyListPage = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [vacancy, vacancySet] = useState(null);

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;

  const vacancyDeleteStore = useSelector((state) => state.vacancyDeleteStore); // store.js
  const {
    // load: loadVacancyDelete,
    data: dataVacancyDelete,
    // error: errorVacancyDelete,
    // fail: failVacancyDelete,
  } = vacancyDeleteStore;

  const formHandlerDelete = async (e, id) => {
    e.preventDefault();
    const form = {
      "Action-type": "VACANCY_DELETE",
      id: id,
    };
    dispatch(vacancyDeleteAction(form));
    navigate("/vacancy_list");
    utils.Sleep(3000).then(() => {
      dispatch({ type: constants.VACANCY_DELETE_RESET_CONSTANT });
    });
  };

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
        first={"Описание вакансии"}
        second={"страница подробного описания вакансии."}
      />
      <main className="container">
        <div className="m-0 p-0">
          {StoreStatusComponent(
            vacancyDeleteStore,
            "vacancyDeleteStore",
            true,
            "",
            true
          )}
        </div>
        <div className="card-header text-start">
          <div className="card-body d-flex align-items-center justify-content-between p-0">
            <div className="btn-group">
              <Link
                to={"/vacancy_list"}
                className="btn btn-md btn-outline-primary"
              >
                {"<="} К общему списку вакансий
              </Link>
            </div>
          </div>
        </div>
        {vacancy && (
          <div className="border shadow text-center p-0 m-0">
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
                            onClick={(e) => formHandlerDelete(e, vacancy.id)}
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
        )}
      </main>
      <FooterComponent />
    </div>
  );
};

export default VacancyListPage;
