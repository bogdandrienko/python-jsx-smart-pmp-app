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
import { vacancyDetailAction } from "../../js/actions";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ResumeDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;

  const userDetailsStore = useSelector((state) => state.userDetailsStore); // store.js
  const resumeDetailStore = useSelector((state) => state.resumeDetailStore); // store.js
  const {
    load: loadResumeDetail,
    data: dataResumeDetail,
    // error: errorResumeDetail,
    // fail: failResumeDetail,
  } = resumeDetailStore;
  const resumeDeleteStore = useSelector((state) => state.resumeDeleteStore); // store.js
  const {
    // load: loadResumeDelete,
    data: dataResumeDelete,
    // error: errorResumeDelete,
    // fail: failResumeDelete,
  } = resumeDeleteStore;

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
    if (dataResumeDetail) {
    } else {
      if (!loadResumeDetail) {
        const form = {
          "Action-type": "RESUME_DETAIL",
          id: id,
        };
        dispatch(actions.resumeDetailAction(form));
      }
    }
  }, [dispatch, id, dataResumeDetail]);

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
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Описание резюме"}
        second={"страница подробного описания резюме."}
      />
      <main className="container p-0">
        <div className="p-0 m-0">
          {StoreStatusComponent(
            resumeDetailStore,
            "resumeDetailStore",
            false,
            "",
            constants.DEBUG_CONSTANT
          )}
          {StoreStatusComponent(
            resumeDeleteStore,
            "resumeDeleteStore",
            true,
            "",
            constants.DEBUG_CONSTANT
          )}
        </div>
        <div className="btn-group p-1 m-0 text-start w-100">
          <Link to={"/resume_list"} className="btn btn-sm btn-primary">
            {"<="} назад к списку
          </Link>
          {dataResumeDetail &&
            utils.CheckAccess(userDetailsStore, "moderator_vacancies") && (
              <button
                className="btn btn-sm btn-danger"
                onClick={(e) => formHandlerDelete(e, dataResumeDetail.id)}
              >
                удалить это резюме
              </button>
            )}
        </div>
        {dataResumeDetail && (
          <div className="border shadow text-center p-0 m-0">
            <div className="card p-0 m-0">
              <div className="card-header fw-bold lead bg-opacity-10 bg-primary p-0 m-0">
                {dataResumeDetail["qualification_field"]}
              </div>
              <div className="card-body p-0 m-0">
                <div className="row justify-content-center p-0 m-0">
                  <div className="col-md-6 shadow w-25 p-0 m-0">
                    <img
                      src={utils.GetStaticFile(dataResumeDetail["image_field"])}
                      className="img-fluid img-thumbnail"
                      alt="изображение"
                    />
                  </div>
                  <div className="card-body col-md-6 p-0 m-0">
                    <table className="table table-sm table-hover table-borderless table-striped p-0 m-0">
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

export default ResumeDetailPage;
