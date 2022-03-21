///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React from "react";
import { useDispatch, useSelector } from "react-redux";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const SalaryPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const salaryUserStore = useSelector((state) => state.salaryUserStore);
  const {
    load: loadSalaryUser,
    data: dataSalaryUser,
    // error: errorSalaryUser,
    // fail: failSalaryUser,
  } = salaryUserStore;
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerSubmit = async () => {
    let month_ = document.getElementById("month").value;
    if (month_.length <= 1) {
      month_ = "0" + month_;
    }
    let year_ = document.getElementById("year").value;
    const form = {
      "Action-type": "USER_SALARY",
      dateTime: `${year_}${month_}`,
    };
    dispatch(actions.salaryUserAction(form));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
      <components.HeaderComponent />
      <main>
        <div className="">
          <form className="">
            <div className="input-group m-0">
              <select
                id="month"
                className="form-control form-control-sm"
                required
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
                className="form-control form-control-sm"
                required
              >
                <option value="2021">2021</option>
                <option value="2022" defaultValue selected>
                  2022
                </option>
              </select>
              {!loadSalaryUser && (
                <button
                  onClick={handlerSubmit}
                  className="btn btn-sm btn-primary"
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
          <components.StoreStatusComponent
            storeStatus={salaryUserStore}
            key={"salaryUserStore"}
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
          {dataSalaryUser && (
            <div>
              <div>
                <a
                  className="btn btn-sm btn-success m-0"
                  href={`/${dataSalaryUser["excel_path"]}`}
                >
                  Скачать excel-документ
                </a>
              </div>
              <div>
                <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
                  <li className="m-0">
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
                  <li className="m-0">
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
                  <li className="m-0">
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
                    <components.SalaryTableComponent key={index} tab={tab} />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      <components.FooterComponent />
    </body>
  );
};
