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
import HeaderComponent from "../base/HeaderComponent";
import FooterComponent from "../base/FooterComponent";
import StoreStatusComponent from "../base/StoreStatusComponent";
import MessageComponent from "../base/MessageComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ResumeDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const userDetailsAuthStore = useSelector(
    (state) => state.userDetailsAuthStore
  ); // store.js
  const resumeDetailAuthStore = useSelector(
    (state) => state.resumeDetailAuthStore
  ); // store.js
  const {
    load: loadResumeDetail,
    data: dataResumeDetail,
    // error: errorResumeDetail,
    // fail: failResumeDetail,
  } = resumeDetailAuthStore;
  const resumeDeleteAuthStore = useSelector(
    (state) => state.resumeDeleteAuthStore
  ); // store.js
  const {
    // load: loadResumeDelete,
    data: dataResumeDelete,
    // error: errorResumeDelete,
    // fail: failResumeDelete,
  } = resumeDeleteAuthStore;

  useEffect(() => {
    if (
      dataResumeDetail &&
      dataResumeDetail.id !== undefined &&
      id !== dataResumeDetail.id
    ) {
      dispatch({ type: constants.RESUME_DETAIL_RESET_CONSTANT });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!dataResumeDetail && !loadResumeDetail) {
      const form = {
        "Action-type": "RESUME_DETAIL",
        id: id,
      };
      dispatch(actions.resumeDetailAction(form));
    }
  }, [dispatch, id, dataResumeDetail, loadResumeDetail]);

  useEffect(() => {
    if (dataResumeDelete) {
      utils.Sleep(2000).then(() => {
        dispatch({ type: constants.RESUME_LIST_RESET_CONSTANT });
        dispatch({ type: constants.RESUME_DELETE_RESET_CONSTANT });
        navigate("/resume_list");
      });
    }
  }, [dataResumeDelete]);

  const formHandlerDelete = async (e, id) => {
    e.preventDefault();
    const form = {
      "Action-type": "RESUME_DELETE",
      id: id,
    };
    dispatch(actions.resumeDeleteAction(form));
  };

  return (
    <div>
      <HeaderComponent
        logic={true}
        redirect={true}
        title={"Описание резюме"}
        description={"страница подробного описания резюме"}
      />
      <main className="container  ">
        <div className="">
          <StoreStatusComponent
            storeStatus={userDetailsAuthStore}
            key={"userDetailsAuthStore"}
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
          <StoreStatusComponent
            storeStatus={resumeDetailAuthStore}
            key={"resumeDetailAuthStore"}
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
          <StoreStatusComponent
            storeStatus={resumeDeleteAuthStore}
            key={"resumeDeleteAuthStore"}
            consoleLog={constants.DEBUG_CONSTANT}
            showLoad={true}
            loadText={""}
            showData={true}
            dataText={"Данные успешно получены!"}
            showError={true}
            errorText={""}
            showFail={true}
            failText={""}
          />
        </div>
        <div className="btn-group p-1 m-0 text-start w-100">
          <Link to={"/resume_list"} className="btn btn-sm btn-primary">
            {"<="} назад к списку
          </Link>
          {dataResumeDetail &&
            utils.CheckAccess(userDetailsAuthStore, "moderator_vacancies") && (
              <button
                className="btn btn-sm btn-danger"
                onClick={(e) => formHandlerDelete(e, dataResumeDetail.id)}
              >
                удалить это резюме
              </button>
            )}
        </div>
        {dataResumeDetail && (
          <div className="border shadow text-center  ">
            <div className="card  ">
              <div className="card-header m-0 p-0 fw-bold lead bg-opacity-10 bg-primary  ">
                {dataResumeDetail["qualification_field"]}
              </div>
              <div className="card-body m-0 p-0  ">
                <div className="row justify-content-center  ">
                  <div className="col-md-6 shadow w-25  ">
                    <img
                      src={utils.GetStaticFile(dataResumeDetail["image_field"])}
                      className="img-fluid img-thumbnail"
                      alt="изображение"
                    />
                  </div>
                  <div className="card-body m-0 p-0 col-md-6  ">
                    <table className="table table-sm table-hover table-borderless table-striped  ">
                      <tbody>
                        {dataResumeDetail["datetime_create_field"] !== "" &&
                          dataResumeDetail["datetime_create_field"] !==
                            null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Опубликовано:
                              </td>
                              <td className="small text-end">
                                {utils.GetSliceString(
                                  utils.GetCleanDateTime(
                                    dataResumeDetail["datetime_create_field"],
                                    true
                                  ),
                                  30
                                )}
                              </td>
                            </tr>
                          )}
                        {dataResumeDetail["last_name_field"] !== "" &&
                          dataResumeDetail["last_name_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Фамилия:
                              </td>
                              <td className="small text-end">
                                {utils.GetSliceString(
                                  dataResumeDetail["last_name_field"],
                                  30
                                )}
                              </td>
                            </tr>
                          )}
                        {dataResumeDetail["first_name_field"] !== "" &&
                          dataResumeDetail["first_name_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Имя:
                              </td>
                              <td className="small text-end">
                                {utils.GetSliceString(
                                  dataResumeDetail["first_name_field"],
                                  30
                                )}
                              </td>
                            </tr>
                          )}
                        {dataResumeDetail["patronymic_field"] !== "" &&
                          dataResumeDetail["patronymic_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Отчество:
                              </td>
                              <td className="small text-end">
                                {utils.GetSliceString(
                                  dataResumeDetail["patronymic_field"],
                                  30
                                )}
                              </td>
                            </tr>
                          )}
                        {dataResumeDetail["datetime_birth_field"] !== "" &&
                          dataResumeDetail["datetime_birth_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Дата рождения:
                              </td>
                              <td className="small text-end">
                                {utils.GetSliceString(
                                  utils.GetCleanDateTime(
                                    dataResumeDetail["datetime_birth_field"],
                                    false
                                  ),
                                  30
                                )}
                              </td>
                            </tr>
                          )}
                        {dataResumeDetail["education_field"] !== "" &&
                          dataResumeDetail["education_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Образование:
                              </td>
                              <td className="small text-end">
                                {utils.GetSliceString(
                                  dataResumeDetail["education_field"],
                                  30
                                )}
                              </td>
                            </tr>
                          )}
                        {dataResumeDetail["qualification_field"] !== "" &&
                          dataResumeDetail["qualification_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Квалификация:
                              </td>
                              <td className="small text-end">
                                {utils.GetSliceString(
                                  dataResumeDetail["qualification_field"],
                                  30
                                )}
                              </td>
                            </tr>
                          )}
                        {dataResumeDetail["experience_field"] !== "" &&
                          dataResumeDetail["experience_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Опыт:
                              </td>
                              <td className="small text-end">
                                {utils.GetSliceString(
                                  dataResumeDetail["experience_field"],
                                  30
                                )}
                              </td>
                            </tr>
                          )}
                        {dataResumeDetail["contact_data_field"] !== "" &&
                          dataResumeDetail["contact_data_field"] !== null && (
                            <tr className="">
                              <td className="fw-bold text-secondary text-start">
                                Контактные данные:
                              </td>
                              <td className="small text-end">
                                {utils.GetSliceString(
                                  dataResumeDetail["contact_data_field"],
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
          </div>
        )}
      </main>
      <FooterComponent />
    </div>
  );
};
