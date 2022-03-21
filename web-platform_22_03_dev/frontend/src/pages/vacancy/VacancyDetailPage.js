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
export const VacancyDetailPage = () => {
  //react hooks variables///////////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const vacancyDetailStore = useSelector((state) => state.vacancyDetailStore);
  const {
    load: loadVacancyDetail,
    data: dataVacancyDetail,
    // error: errorVacancyDetail,
    // fail: failVacancyDetail,
  } = vacancyDetailStore;
  const vacancyDeleteStore = useSelector((state) => state.vacancyDeleteStore);
  const {
    // load: loadVacancyDelete,
    data: dataVacancyDelete,
    // error: errorVacancyDelete,
    // fail: failVacancyDelete,
  } = vacancyDeleteStore;

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
    if (!dataVacancyDetail && !loadVacancyDetail) {
      const form = {
        "Action-type": "VACANCY_DETAIL",
        id: id,
      };
      dispatch(actions.vacancyDetailAction(form));
    }
  }, [dispatch, id, dataVacancyDetail, loadVacancyDetail]);

  useEffect(() => {
    if (dataVacancyDelete) {
      utils.Sleep(2000).then(() => {
        dispatch({ type: constants.VACANCY_LIST_RESET_CONSTANT });
        dispatch({ type: constants.VACANCY_DELETE_RESET_CONSTANT });
        navigate("/vacancy_list");
      });
    }
  }, [dataVacancyDelete]);

  const formHandlerDelete = async (e, id) => {
    e.preventDefault();
    const form = {
      "Action-type": "VACANCY_DELETE",
      id: id,
    };
    dispatch(actions.vacancyDeleteAction(form));
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent
        logic={true}
        redirect={false}
        title={"Описание вакансии"}
        description={"страница подробного описания вакансии"}
      />
      <main className="container  ">
        <div className="">
          {components.StoreStatusComponent(
            userDetailsStore,
            "userDetailsStore",
            false,
            "",
            constants.DEBUG_CONSTANT
          )}
          {components.StoreStatusComponent(
            vacancyDetailStore,
            "vacancyDetailStore",
            false,
            "",
            constants.DEBUG_CONSTANT
          )}
          {components.StoreStatusComponent(
            vacancyDeleteStore,
            "vacancyDeleteStore",
            true,
            "",
            constants.DEBUG_CONSTANT
          )}
        </div>
        <div className="btn-group p-1 m-0 text-start w-100">
          <Link to={"/vacancy_list"} className="btn btn-sm btn-primary">
            {"<="} назад к списку
          </Link>
          {dataVacancyDetail && (
            <Link
              to={`/resume_create/${dataVacancyDetail.id}`}
              className="btn btn-sm btn-success"
            >
              отправить резюме
            </Link>
          )}
          {dataVacancyDetail &&
            utils.CheckAccess(userDetailsStore, "moderator_vacancies") && (
              <Link
                to={`/vacancy_change/${dataVacancyDetail.id}`}
                className="btn btn-sm btn-warning"
              >
                редактировать эту вакансию
              </Link>
            )}
          {dataVacancyDetail &&
            utils.CheckAccess(userDetailsStore, "moderator_vacancies") && (
              <button
                className="btn btn-sm btn-danger"
                onClick={(e) => formHandlerDelete(e, dataVacancyDetail.id)}
              >
                удалить эту вакансию
              </button>
            )}
          {dataVacancyDetail &&
            utils.CheckAccess(userDetailsStore, "moderator_vacancies") && (
              <Link to={`/vacancy_create`} className="btn btn-sm btn-secondary">
                создать новую вакансию
              </Link>
            )}
        </div>
        {dataVacancyDetail && (
          <div className="border shadow text-center  ">
            <div className="card  ">
              <div className="card-header m-0 p-0 fw-bold lead bg-opacity-10 bg-primary  ">
                {dataVacancyDetail["qualification_field"]}
              </div>
              <div className="card-body m-0 p-0  ">
                <div className="row justify-content-center  ">
                  <div className="col-md-6 shadow w-25  ">
                    <img
                      src={utils.GetStaticFile(
                        dataVacancyDetail["image_field"]
                      )}
                      className="img-fluid img-thumbnail"
                      alt="изображение"
                    />
                  </div>
                  <div className="card-body m-0 p-0 col-md-6  ">
                    <table className="table table-sm table-hover table-borderless table-striped  ">
                      <tbody>
                        {dataVacancyDetail["datetime_field"] !== "" &&
                          dataVacancyDetail["datetime_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Опубликовано:
                              </td>
                              <td className="small text-end">
                                {utils.GetCleanDateTime(
                                  dataVacancyDetail["datetime_field"],
                                  true
                                )}
                              </td>
                            </tr>
                          )}
                        {dataVacancyDetail["sphere_field"] !== "" &&
                          dataVacancyDetail["sphere_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Сфера:
                              </td>
                              <td className="small text-end">
                                {dataVacancyDetail["sphere_field"]}
                              </td>
                            </tr>
                          )}
                        {dataVacancyDetail["education_field"] !== "" &&
                          dataVacancyDetail["education_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Образование:
                              </td>
                              <td className="small text-end">
                                {dataVacancyDetail["education_field"]}
                              </td>
                            </tr>
                          )}
                        {dataVacancyDetail["qualification_field"] !== "" &&
                          dataVacancyDetail["qualification_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Квалификация:
                              </td>
                              <td className="small text-end">
                                {dataVacancyDetail["qualification_field"]}
                              </td>
                            </tr>
                          )}
                        {dataVacancyDetail["rank_field"] !== "" &&
                          dataVacancyDetail["rank_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Разряд:
                              </td>
                              <td className="small text-end">
                                {dataVacancyDetail["rank_field"]}
                              </td>
                            </tr>
                          )}
                        {dataVacancyDetail["experience_field"] !== "" &&
                          dataVacancyDetail["experience_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Опыт:
                              </td>
                              <td className="small text-end">
                                {dataVacancyDetail["experience_field"]}
                              </td>
                            </tr>
                          )}
                        {dataVacancyDetail["schedule_field"] !== "" &&
                          dataVacancyDetail["schedule_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                График:
                              </td>
                              <td className="small text-end">
                                {dataVacancyDetail["schedule_field"]}
                              </td>
                            </tr>
                          )}
                        {dataVacancyDetail["description_field"] !== "" &&
                          dataVacancyDetail["description_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Описание:
                              </td>
                              <td className="small text-end">
                                {dataVacancyDetail["description_field"]}
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <components.FooterComponent />
    </div>
  );
};
