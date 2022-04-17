// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";

import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const VacationPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [dateTime, dateTimeSet] = useState(utils.GetCurrentDate(false));
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const vacationUserStore = useSelector((state) => state.vacationUserStore);
  const {
    load: loadVacationUser,
    data: dataVacationUser,
    // error: errorVacationUser,
    // fail: failVacationUser,
  } = vacationUserStore;
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "USER_VACATION",
      dateTime: `${dateTime.split("-")[0]}${dateTime.split("-")[1]}${
        dateTime.split("-")[2]
      }`,
    };
    dispatch(
      utils.ActionConstructorUtility(
        form,
        "/api/auth/vacation/",
        "POST",
        30000,
        constants.USER_VACATION
      )
    );
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form className="text-center m-0 p-0" onSubmit={handlerSubmit}>
            <div className="card shadow custom-background-transparent-low text-center m-0 p-0">
              <div className="card-header text-center m-0 p-0">
                Выберите дату и нажмите "
                <span className="text-primary text-center">получить</span>"
              </div>
              <div className="card-body text-center m-0 p-1">
                <div className="form-control-sm input-group d-flex justify-content-between text-center m-0 p-0">
                  <label className="form-control-sm text-center w-50 m-0 p-1">
                    <input
                      type="date"
                      className="form-control form-control-sm text-center m-0 p-1"
                      min={utils.GetCurrentDate(false)}
                      max={utils.GetCurrentDate(false, 1)}
                      value={dateTime}
                      required
                      onChange={(e) => dateTimeSet(e.target.value)}
                    />
                  </label>
                  {!loadVacationUser && (
                    <button type="submit" className="btn btn-sm btn-primary">
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      получить
                    </button>
                  )}
                </div>
                <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
                  <i className="fa-solid fa-circle-exclamation m-0 p-1" />
                  Если после ожидания данных нет, попробуйте ещё 1-2 раза или
                  ожидайте пол часа!
                </div>
              </div>
            </div>
          </form>
        </ul>
        <hr />
        <components.StoreStatusComponent
          storeStatus={vacationUserStore}
          keyStatus={"vacationUserStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={false}
          dataText={"Данные успешно получены!"}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        {dataVacationUser && (
          <div className="bg-light bg-opacity-10 custom-background-transparent-low-middle">
            <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center custom-background-transparent-low-middle m-0 p-0">
              <li className="m-0 p-1 my-1">
                <h6 className="lead fw-bold bold text-center m-0 p-0">
                  Данные по отпуску
                </h6>
                <table className="table table-sm table-condensed table-striped table-hover table-responsive table-responsive-sm table-bordered border-secondary small m-0 p-0">
                  <thead className="m-0 p-0">
                    <tr className="m-0 p-0">
                      <th className="text-center w-50 m-0 p-1">Тип</th>
                      <th className="text-center m-0 p-1">Значение</th>
                    </tr>
                  </thead>
                  <tbody className="m-0 p-0">
                    {dataVacationUser["headers"].map((head, index) => (
                      <tr key={index}>
                        <td className="text-start m-0 p-1">{head[0]}</td>
                        <td
                          className={
                            index !== 4
                              ? "text-end m-0 p-1"
                              : head[1] >= 0
                              ? "text-end text-success fw-bold m-0 p-1"
                              : "text-end text-danger fw-bold m-0 p-1"
                          }
                        >
                          {head[1]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </li>
            </ul>
            {dataVacationUser["tables"] &&
              dataVacationUser["tables"].length > 0 && (
                <components.AccordionComponent
                  key_target={"accordion1"}
                  isCollapse={false}
                  title={"Запланированный отпуск :"}
                  text_style="text-primary"
                  header_style="bg-primary bg-opacity-10 custom-background-transparent-low-middle"
                  body_style="bg-light bg-opacity-10 custom-background-transparent-low-middle"
                >
                  <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center bg-light bg-opacity-50 custom-background-transparent-low-middle m-0 p-0">
                    {dataVacationUser["tables"].map((table, index) => (
                      <li
                        key={index}
                        className="bg-light bg-opacity-10 custom-background-transparent-low-middle m-0 p-1 my-1"
                      >
                        <h6 className="lead fw-bold bold text-center">
                          {dataVacationUser["tables"].length > 1
                            ? table[0]
                            : `${table[0]}`.slice(0, 10)}
                        </h6>
                        <table className="table table-sm table-condensed table-striped table-hover table-responsive table-responsive-sm table-bordered border-secondary custom-background-transparent-low-middle small m-0 p-0">
                          <thead className="m-0 p-0">
                            <tr className="m-0 p-0">
                              <th className="text-center w-50 m-0 p-1">Тип</th>
                              <th className="text-center m-0 p-1">Значение</th>
                            </tr>
                          </thead>
                          <tbody className="m-0 p-0">
                            {table.slice(1).map((tab, index) => (
                              <tr key={index} className="m-0 p-0">
                                <td className="text-start m-0 p-1">{tab[0]}</td>
                                <td className="text-end m-0 p-1">{tab[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </li>
                    ))}
                  </ul>
                </components.AccordionComponent>
              )}
          </div>
        )}
      </main>
      <components.FooterComponent />
    </div>
  );
};
