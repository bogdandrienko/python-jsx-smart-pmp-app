import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { salaryUserAction } from "../actions/salaryActions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import LoaderComponent from "../components/LoaderComponent";
import TableComponent from "../components/TableComponent";
import ErrorComponent from "../components/ErrorComponent";

const SalaryPage = () => {
  const dispatch = useDispatch();

  const salaryUser = useSelector((state) => state.salaryUser);
  const {
    salaryUserLoadingReducer,
    salaryUserDataReducer,
    salaryUserErrorReducer,
  } = salaryUser;
  // console.log("salaryUserLoadingReducer: ", salaryUserLoadingReducer);
  // console.log("salaryUserDataReducer: ", salaryUserDataReducer);
  // console.log("salaryUserErrorReducer: ", salaryUserErrorReducer);

  const salaryHundlerSubmit = async () => {
    let month_ = document.getElementById("month").value;
    if (month_.length <= 1) {
      month_ = "0" + month_;
    }
    let year_ = document.getElementById("year").value;
    dispatch(salaryUserAction(`${year_}${month_}`));
  };

  useEffect(() => {}, []);

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
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
          <div className="" id="div_button">
            <button
              onClick={salaryHundlerSubmit}
              className="btn btn-lg btn-outline-primary m-1"
              type="button"
            >
              выгрузить
            </button>
          </div>
        </div>
        <hr />
        <div>
          {salaryUserLoadingReducer === true ? (
            <LoaderComponent />
          ) : salaryUserErrorReducer !== undefined ? (
            <ErrorComponent children={salaryUserErrorReducer} />
          ) : salaryUserDataReducer === undefined ? (
            ""
          ) : (
            <div>
              <div>
                <a
                  className="btn btn-lg btn-outline-success m-1"
                  href={`./${salaryUserDataReducer["excel_path"]}`}
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
                        {salaryUserDataReducer["headers"]
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
                        {salaryUserDataReducer["headers"]
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
                        {salaryUserDataReducer["headers"]
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
                  {salaryUserDataReducer["tables"].map((tab, index) => (
                    <TableComponent key={index} tab={tab} />
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
