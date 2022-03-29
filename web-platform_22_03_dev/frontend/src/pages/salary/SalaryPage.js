// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const SalaryPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [month, monthSet] = useState("3");
  const [year, yearSet] = useState("2022");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const salaryUserStore = useSelector((state) => state.salaryUserStore);
  const {
    load: loadSalaryUser,
    data: dataSalaryUser,
    // error: errorSalaryUser,
    // fail: failSalaryUser,
  } = salaryUserStore;
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "USER_SALARY",
      dateTime: `${year}${month > 9 ? month : "0" + month}`,
    };
    dispatch(actions.salaryUserAction(form));
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <components.HeaderComponent />
      <main>
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form className="m-0 p-0" onSubmit={handlerSubmit}>
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              <div className="card-header m-0 p-0">
                Выберите месяц и год, а затем нажмите "
                <span className="text-primary">получить</span>"
              </div>
              <div className="card-body m-0 p-0">
                <div className="m-0 p-1">
                  <div className="form-control-sm input-group text-center m-0 p-0">
                    <select
                      className="form-control form-control-sm text-center m-0 p-0"
                      value={month}
                      required
                      onChange={(e) => monthSet(e.target.value)}
                    >
                      <option className="m-0 p-0" value="1">
                        Январь
                      </option>
                      <option className="m-0 p-0" value="2">
                        Февраль
                      </option>
                      <option className="m-0 p-0" value="3">
                        Март
                      </option>
                      <option className="m-0 p-0" value="4">
                        Апрель
                      </option>
                      <option className="m-0 p-0" value="5">
                        Май
                      </option>
                      <option className="m-0 p-0" value="6">
                        Июнь
                      </option>
                      <option className="m-0 p-0" value="7">
                        Июль
                      </option>
                      <option className="m-0 p-0" value="8">
                        Август
                      </option>
                      <option className="m-0 p-0" value="9">
                        Сентябрь
                      </option>
                      <option className="m-0 p-0" value="10">
                        Октябрь
                      </option>
                      <option className="m-0 p-0" value="11">
                        Ноябрь
                      </option>
                      <option className="m-0 p-0" value="12">
                        Декабрь
                      </option>
                    </select>
                    <select
                      className="form-control form-control-sm text-center m-0 p-0"
                      value={year}
                      required
                      onChange={(e) => yearSet(e.target.value)}
                    >
                      <option className="m-0 p-0" value="2021">
                        2021
                      </option>
                      <option className="m-0 p-0" value="2022">
                        2022
                      </option>
                    </select>
                    {!loadSalaryUser && (
                      <button type="submit" className="btn btn-sm btn-primary">
                        получить
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ul>
        <hr />
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
          <div className="bg-light custom-background-transparent-low text-center m-0 p-1">
            <div className="text-center m-0 p-1">
              <a
                className="btn btn-sm btn-success text-center m-0 p-1"
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
              <components.AccordionComponent
                key_target={"accordion1"}
                isCollapse={true}
                title={"Вспомогательная информация:"}
                text_style="text-warning"
                header_style="bg-warning bg-opacity-10 custom-background-transparent-low"
                body_style="bg-light bg-opacity-10 custom-background-transparent-low"
              >
                {
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
                }
              </components.AccordionComponent>
            </div>
          </div>
        )}
      </main>
      <components.FooterComponent />
    </div>
  );
};
