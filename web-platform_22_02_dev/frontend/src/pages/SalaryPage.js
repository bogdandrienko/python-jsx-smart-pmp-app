import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout, getUserDetails } from "../actions/userActions";

import Header from "../components/Header";
import Title from "../components/Title";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Table from "../components/Table";

const SalaryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [headers, setHeaders] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(false);
  const [finishLoading, setFinishLoading] = useState(false);

  const getSalary = async () => {
    const loader = document.getElementById("div_loader");
    const type = loader.getAttribute("class") === "d-none" ? "" : "d-none";
    loader.setAttribute("class", type);
    setError(false);
    setFinishLoading(false);

    let month_ = document.getElementById("month").value;
    if (month_.length <= 1) {
      month_ = "0" + month_;
    }
    let year_ = document.getElementById("year").value;
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/salary`,
      { Datetime: `${year_}${month_}` },
      config
    );

    const newType = loader.getAttribute("class") === "d-none" ? "" : "d-none";
    loader.setAttribute("class", newType);
    if (data["error"] === "error") {
      setError(true);
    } else {
      const headers = [];
      for (let i in data) {
        if (i !== "global_objects") {
          headers.push([i, data[i]]);
        }
      }
      const tables = [];
      tables.push(["1.Начислено", data["global_objects"]["1.Начислено"]]);
      tables.push(["2.Удержано", data["global_objects"]["2.Удержано"]]);
      tables.push([
        "3.Доходы в натуральной форме",
        data["global_objects"]["3.Доходы в натуральной форме"],
      ]);
      tables.push(["4.Выплачено", data["global_objects"]["4.Выплачено"]]);
      tables.push([
        "5.Налоговые вычеты",
        data["global_objects"]["5.Налоговые вычеты"],
      ]);
      setHeaders(headers);
      setTables(tables);
      setError(false);
    }
    setFinishLoading(true);
  };

  useEffect(() => {
    dispatch(getUserDetails("profile"));
    // getSalary();
  }, [dispatch]);

  function getValue(value) {
    if (typeof value === "number") {
      return value.toFixed(2);
    } else {
      return value;
    }
  }

  // let month = "01";
  // const setMonth = (month_) => {
  //   if (month_.length <= 1) {
  //     month = "0" + month_;
  //   } else {
  //     month = month_;
  //   }
  // };
  //
  // let year = "2022";
  // const setYear = (year_) => {
  //   year = year_;
  // };
  //
  // async function renderTable() {
  //   const config = {
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: `Bearer ${userInfo.token}`,
  //     },
  //   };
  //   const { data } = await axios.get(`/api/salary`, config);
  //   console.log(data);
  //   document.getElementById("salary").innerHTML = JSON.stringify(data);
  // }
  //
  // const data = () => async () => {
  //   const config = {
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: `Bearer ${userInfo.token}`,
  //     },
  //   };
  //   const { data } = await axios.get(`/api/salary`, config);
  //   return data;
  // };

  return (
    <div>
      <Header />
      <Title
        first={"Расчётный лист"}
        second={"страница выгрузки Вашего расчётного листа."}
      />
      <main className="container text-center">
        <div className="container-fluid text-center">
          <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
            <li className="m-1">
              <label className="form-control-lg">
                Выберите месяц выгрузки:
                <select
                  type="select"
                  id="month"
                  name="month"
                  required=""
                  className="form-control form-control-lg"
                >
                  <option value="1">Январь</option>
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
                  <option value="12" defaultValue selected>
                    Декабрь
                  </option>
                </select>
                <small className="text-muted">
                  месяц: выберите месяц из выпадающего списка
                </small>
              </label>
            </li>
            <li className="m-1">
              <label className="form-control-lg">
                Выберите год выгрузки:
                <select
                  type="select"
                  id="year"
                  name="year"
                  required=""
                  className="form-control form-control-lg"
                >
                  <option value="2021" defaultValue selected>
                    2021
                  </option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
                <small className="text-muted">
                  год: выберите год из выпадающего списка
                </small>
              </label>
            </li>
          </ul>
          <div className="m-1">
            <button
              onClick={getSalary}
              className="btn btn-lg btn-outline-primary"
              type="button"
            >
              выгрузить
            </button>
          </div>
        </div>
        <hr />
        <div className="pricing-header px-0 py-0 pt-md-0 pb-md-0 mx-auto text-center">
          <div className="">
            <div id="div_loader" class="d-none">
              <Loader />
            </div>
            {finishLoading && error ? (
              <p className="lead text-danger">
                Произошла ошибка, попробуйте повторить позднее!
              </p>
            ) : (
              ""
            )}
            {finishLoading && !error && tables ? (
              <div>
                <p className="text-muted">
                  Ниже расположены данные, соответствующие выбранному периоду:
                </p>
                <button
                  onClick={window.print}
                  className="btn btn-lg btn-outline-primary"
                >
                  печать или сохранить в pdf
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="container-fluid text-center">
            {finishLoading && !error && headers ? (
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
                      {headers.slice(-2).map((head, index) => (
                        <tr key={index}>
                          <td className="text-start">{head[0]}</td>
                          <td className="text-end table-active fw-bold">
                            {getValue(head[1])}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </li>
              </ul>
            ) : (
              ""
            )}
            <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
              {finishLoading && !error && headers ? (
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
                      {headers.slice(0, 8).map((head, index) => (
                        <tr key={index}>
                          <td className="text-start">{head[0]}</td>
                          <td className="text-end">{getValue(head[1])}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </li>
              ) : (
                ""
              )}
              {finishLoading && !error && headers ? (
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
                      {headers.slice(8, -2).map((head, index) => (
                        <tr key={index}>
                          <td className="text-start">{head[0]}</td>
                          <td className="text-end">{getValue(head[1])}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </li>
              ) : (
                ""
              )}
              {finishLoading && !error && tables
                ? tables.map((tab, index) => <Table key={index} tab={tab} />)
                : ""}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SalaryPage;
