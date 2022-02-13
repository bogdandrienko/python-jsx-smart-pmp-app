import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { salaryUserAction } from "../js/actions";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";
import FooterComponent from "../components/FooterComponent";
import LoaderComponent from "../components/LoaderComponent";
import TableComponent from "../components/TableComponent";
import MessageComponent from "../components/MessageComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const SalaryPage = () => {
  const dispatch = useDispatch();

  const salaryUserStore = useSelector((state) => state.salaryUserStore);
  const {
    load: loadSalaryUser,
    data: dataSalaryUser,
    error: errorSalaryUser,
    fail: failSalaryUser,
  } = salaryUserStore;

  useEffect(() => {}, [dispatch]);

  const salaryHundlerSubmit = async () => {
    let month_ = document.getElementById("month").value;
    if (month_.length <= 1) {
      month_ = "0" + month_;
    }
    let year_ = document.getElementById("year").value;
    dispatch(salaryUserAction(`${year_}${month_}`));
  };

  return (
    <div>
      <HeaderComponent />
      <TitleComponent
        first={"Расчётный лист"}
        second={"страница выгрузки Вашего расчётного листа."}
        logic={true}
      />
      <main className="container text-center">
        <div className="">
          <form className="">
            <div className="input-group m-1">
              <select
                type="select"
                id="month"
                name="month"
                required=""
                className="form-control form-control-lg"
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
                type="select"
                id="year"
                name="year"
                required=""
                className="form-control form-control-lg"
              >
                <option value="2021">2021</option>
                <option value="2022" defaultValue selected>
                  2022
                </option>
                <option value="2023">2023</option>
              </select>
              {!loadSalaryUser && (
                <button
                  onClick={salaryHundlerSubmit}
                  className="btn btn-lg btn-outline-primary"
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
          <div className="text-center">
            {loadSalaryUser && <LoaderComponent />}
            {dataSalaryUser && (
              <div className="m-1">
                <MessageComponent variant="success">
                  Данные успешно получены!
                </MessageComponent>
              </div>
            )}
            {errorSalaryUser && (
              <div className="m-1">
                <MessageComponent variant="danger">
                  {errorSalaryUser}
                </MessageComponent>
              </div>
            )}
            {failSalaryUser && (
              <div className="m-1">
                <MessageComponent variant="warning">
                  {failSalaryUser}
                </MessageComponent>
              </div>
            )}
          </div>
          {dataSalaryUser && (
            <div>
              <div>
                <a
                  className="btn btn-lg btn-outline-success m-1"
                  href={`./${dataSalaryUser["excel_path"]}`}
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
