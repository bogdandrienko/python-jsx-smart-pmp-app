// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constant from "../../components/constant";
import * as util from "../../components/util";
import * as hook from "../../components/hook";
import * as slice from "../../components/slice";

import * as component from "../../components/ui/component";
import * as base from "../../components/ui/base";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SalaryPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const salaryReadStore = hook.useSelectorCustom2(slice.salary.salaryReadStore);

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  // @ts-ignore
  const [dateTime, setDateTime, resetDateTime] = hook.useStateCustom1({
    year: util.GetCurrentYear(0),
    // @ts-ignore
    month:
      // @ts-ignore
      util.GetCurrentDay(false) < 10
        ? // @ts-ignore
          util.GetCurrentMonth(false, -2)
        : // @ts-ignore
          util.GetCurrentMonth(false, -1),
  });

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  const getSalary = () => {
    dispatch(
      slice.salary.salaryReadStore.action({
        form: {
          dateTime: `${dateTime.year}${
            dateTime.month > 9 ? dateTime.month : "0" + dateTime.month
          }`,
        },
      })
    );
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
        <form
          className="m-0 p-0"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            getSalary();
          }}
        >
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
                    required
                    value={dateTime.month}
                    onChange={(event) =>
                      setDateTime({
                        ...dateTime,
                        month: event.target.value,
                      })
                    }
                  >
                    <option className="text-center m-0 p-0" value="1">
                      Январь
                    </option>
                    <option className="text-center m-0 p-0" value="2">
                      Февраль
                    </option>
                    <option className="text-center m-0 p-0" value="3">
                      Март
                    </option>
                    <option className="text-center m-0 p-0" value="4">
                      Апрель
                    </option>
                    <option className="text-center m-0 p-0" value="5">
                      Май
                    </option>
                    <option className="text-center m-0 p-0" value="6">
                      Июнь
                    </option>
                    <option className="text-center m-0 p-0" value="7">
                      Июль
                    </option>
                    <option className="text-center m-0 p-0" value="8">
                      Август
                    </option>
                    <option className="text-center m-0 p-0" value="9">
                      Сентябрь
                    </option>
                    <option className="text-center m-0 p-0" value="10">
                      Октябрь
                    </option>
                    <option className="text-center m-0 p-0" value="11">
                      Ноябрь
                    </option>
                    <option className="text-center m-0 p-0" value="12">
                      Декабрь
                    </option>
                  </select>
                  <select
                    className="form-control form-control-sm text-center m-0 p-0"
                    required
                    value={dateTime.year}
                    onChange={(event) =>
                      setDateTime({
                        ...dateTime,
                        year: event.target.value,
                      })
                    }
                  >
                    <option className="text-center m-0 p-0" value="2021">
                      2021
                    </option>
                    <option className="text-center m-0 p-0" value="2022">
                      2022
                    </option>
                    <option className="text-center m-0 p-0" value="2023">
                      2023
                    </option>
                  </select>
                  {!salaryReadStore.load && (
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary m-1 p-2"
                    >
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      получить
                    </button>
                  )}
                  {!salaryReadStore.load && (
                    <button
                      type="button"
                      className="btn btn-sm btn-warning m-1 p-2"
                      onClick={() => {
                        resetDateTime();
                        dispatch({
                          type: slice.salary.salaryReadStore.constant.reset,
                        });
                      }}
                    >
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      сбросить
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
          </div>
        </form>
      </ul>
      <hr />
      <component.StatusStore1
        slice={slice.salary.salaryReadStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
      />
      {salaryReadStore.data && (
        <div className="bg-light bg-opacity-10 custom-background-transparent-low text-center m-0 p-0">
          <div className="text-center custom-background-transparent-low m-0 p-1">
            <a
              className="btn btn-sm btn-success text-center m-0 p-2"
              href={`/${salaryReadStore.data["excelPath"]}`}
            >
              Скачать excel-документ
            </a>
          </div>
          <div className="bg-light bg-opacity-10 custom-background-transparent-low text-center m-0 p-0">
            <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center custom-background-transparent-low m-0 p-0">
              <li className="m-0 p-0 my-1">
                <h6 className="lead fw-bold bold">
                  Краткая информация
                  <i className="fa-solid fa-credit-card m-0 p-1" />
                </h6>
                <table className="table table-sm table-condensed table-hover table-responsive table-responsive-sm table-bordered border-secondary small m-0 p-0">
                  <thead className="m-0 p-0">
                    <tr className="m-0 p-0">
                      <th className="text-center w-50 m-0 p-1">Тип</th>
                      <th className="text-center m-0 p-1">Значение</th>
                    </tr>
                  </thead>
                  <tbody className="m-0 p-0">
                    {salaryReadStore.data["headers"].slice(-2).map(
                      // @ts-ignore
                      (head, index) => (
                        <tr key={index} className="m-0 p-0">
                          <td className="text-start m-0 p-1">
                            {index === 1
                              ? "Выплата за текущий месяц"
                              : "Выплата за предыдущий месяц"}
                          </td>
                          <td
                            className={
                              index === 1
                                ? "text-end table-active fw-bold text-success m-0 p-1"
                                : "text-end m-0 p-1"
                            }
                          >
                            {head[1]}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </li>
            </ul>
            <component.Accordion1
              key_target={"accordion1"}
              isCollapse={false}
              title={"Подробная информация : "}
              text_style="text-primary"
              header_style="bg-primary bg-opacity-10 custom-background-transparent-low"
              body_style="bg-light bg-opacity-10 custom-background-transparent-low"
            >
              {
                <div className="m-0 p-0">
                  <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center m-0 p-3">
                    <li className="m-0 p-1 my-1">
                      <h6 className="lead fw-bold bold m-0 p-0 mb-1">
                        Вспомогательная информация
                      </h6>
                      <table className="table table-sm table-condensed table-striped table-hover table-responsive table-responsive-sm table-bordered border-secondary small m-0 p-0">
                        <thead className="m-0 p-0">
                          <tr className="m-0 p-0">
                            <th className="text-center w-50 m-0 p-1">Тип</th>
                            <th className="text-center m-0 p-1">Значение</th>
                          </tr>
                        </thead>
                        <tbody className="m-0 p-0">
                          {salaryReadStore.data["headers"].slice(5, -2).map(
                            // @ts-ignore
                            (head, index) => (
                              <tr key={index} className="m-0 p-0">
                                <td className="text-start m-0 p-1">
                                  {head[0]}
                                </td>
                                <td className="text-end m-0 p-1">{head[1]}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </li>
                  </ul>
                  <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center bg-light bg-opacity-50 custom-background-transparent-low m-0 p-0">
                    {salaryReadStore.data["tables"].map(
                      // @ts-ignore
                      (tab, index) => (
                        <component.SalaryTableComponent key={index} tab={tab} />
                      )
                    )}
                    <li className="col-12 col-md-6 col-lg-6 m-0 p-3 my-1">
                      <h6 className="lead fw-bold bold">Основная информация</h6>
                      <table className="table table-sm table-condensed table-hover table-responsive table-responsive-sm table-bordered border-secondary small m-0 p-0">
                        <thead className="m-0 p-0">
                          <tr className="m-0 p-0">
                            <th className="text-center w-50 m-0 p-1">Тип</th>
                            <th className="text-center m-0 p-1">Значение</th>
                          </tr>
                        </thead>
                        <tbody className="m-0 p-0">
                          {salaryReadStore.data["headers"].slice(-2).map(
                            // @ts-ignore
                            (head, index) => (
                              <tr key={index} className="m-0 p-0">
                                <td className="text-start m-0 p-1">
                                  {head[0]}
                                </td>
                                <td
                                  className={
                                    index === 1
                                      ? "text-end table-active fw-bold text-success m-0 p-1"
                                      : "text-end m-0 p-1"
                                  }
                                >
                                  {head[1]}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </li>
                  </ul>
                </div>
              }
            </component.Accordion1>
          </div>
        </div>
      )}
    </base.Base1>
  );
};
