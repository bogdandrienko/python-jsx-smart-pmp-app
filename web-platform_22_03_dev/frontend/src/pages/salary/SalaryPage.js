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
import SalaryTableComponent from "../../components/SalaryTableComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SalaryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const salaryUserStore = useSelector((state) => state.salaryUserStore); // store.js
  const {
    load: loadSalaryUser,
    data: dataSalaryUser,
    // error: errorSalaryUser,
    // fail: failSalaryUser,
  } = salaryUserStore;

  useEffect(() => {}, [dispatch]);

  const formHandlerSubmit = async () => {
    let month_ = document.getElementById("month").value;
    if (month_.length <= 1) {
      month_ = "0" + month_;
    }
    let year_ = document.getElementById("year").value;
    const form = {
      "Action-type": "USER_SALARY",
      dateTime: `${year_}${month_}`,
    };
    dispatch(actions.salaryUserAuthAction(form));
  };

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Расчётный лист"}
        second={"страница выгрузки Вашего расчётного листа."}
      />
      <main className="container p-0">
        <div className="m-0 p-0">
          {StoreStatusComponent(
            salaryUserStore,
            "salaryUserStore",
            true,
            "Данные успешно получены!",
            constants.DEBUG_CONSTANT
          )}
        </div>
        <div className="">
          <form className="">
            <div className="input-group m-1">
              <select
                id="month"
                name="month"
                required=""
                className="form-control form-control-md"
              >
                <option value="1" defaultValue selected>
                  Январь
                </option>
                <option value="2">Февраль</option>
                <option value="3">Март</option>
                <option value="4">Апрель</option>
                <option value="5">Май</option>
                <option value="6">Июнь</option>
                <option value="7">Июль</option>
                <option value="8">Август</option>
                <option value="9">Сентябрь</option>
                <option value="10">Октябрь</option>
                <option value="11">Ноябрь</option>
                <option value="12">Декабрь</option>
              </select>
              <select
                id="year"
                name="year"
                required=""
                className="form-control form-control-md"
              >
                <option value="2021">2021</option>
                <option value="2022" defaultValue selected>
                  2022
                </option>
              </select>
              {!loadSalaryUser && (
                <button
                  onClick={formHandlerSubmit}
                  className="btn btn-md btn-primary"
                  type="button"
                >
                  получить
                </button>
              )}
            </div>
          </form>
        </div>
        <hr />
        <div>
          {dataSalaryUser && (
            <div>
              <div>
                <a
                  className="btn btn-md btn-success m-1"
                  href={`/${dataSalaryUser["excel_path"]}`}
                >
                  Скачать excel-документ
                </a>
              </div>
              <div>
                <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                  <li className="m-1">
                    <h6 className="lead fw-bold bold">Основная информация</h6>
                    <table className="table table-sm table-condensed table-hover table-responsive table-responsive-sm table-bordered border-secondary small">
                      <thead>
                        <tr>
                          <th className="text-center">Тип</th>
                          <th className="text-center">Значение</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataSalaryUser["headers"]
                          .slice(-2)
                          .map((head, index) => (
                            <tr key={index}>
                              <td className="text-start">{head[0]}</td>
                              <td className="text-end table-active fw-bold">
                                {head[1]}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </li>
                </ul>
                <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                  <li className="m-1">
                    <h6 className="lead fw-bold bold">
                      Вспомогательная информация
                    </h6>
                    <table className="table table-sm table-condensed table-hover table-responsive table-responsive-sm table-bordered border-secondary small">
                      <thead>
                        <tr>
                          <th className="text-center">Тип</th>
                          <th className="text-center">Значение</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataSalaryUser["headers"]
                          .slice(0, 8)
                          .map((head, index) => (
                            <tr key={index}>
                              <td className="text-start">{head[0]}</td>
                              <td className="text-end">{head[1]}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </li>
                  <li className="m-1">
                    <h6 className="lead fw-bold bold">
                      Вспомогательная информация
                    </h6>
                    <table className="table table-sm table-condensed table-hover table-responsive table-responsive-sm table-bordered border-secondary small">
                      <thead>
                        <tr>
                          <th className="text-center">Тип</th>
                          <th className="text-center">Значение</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataSalaryUser["headers"]
                          .slice(8, -2)
                          .map((head, index) => (
                            <tr key={index}>
                              <td className="text-start">{head[0]}</td>
                              <td className="text-end">{head[1]}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </li>
                  {dataSalaryUser["tables"].map((tab, index) => (
                    <SalaryTableComponent key={index} tab={tab} />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default SalaryPage;
