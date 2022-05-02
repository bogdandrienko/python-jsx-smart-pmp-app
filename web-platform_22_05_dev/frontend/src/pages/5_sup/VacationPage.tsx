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

export const VacationPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const VacationReadStore = hook.useSelectorCustom2(
    slice.vacation.vacationReadStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  // @ts-ignore
  const [dateTime, setDateTime, resetDateTime] = hook.useStateCustom1({
    dateTime: util.GetCurrentDate(false),
  });

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  const getVacation = () => {
    dispatch(
      slice.vacation.vacationReadStore.action({
        form: {
          dateTime: `${dateTime.dateTime.split("-")[0]}${
            dateTime.dateTime.split("-")[1]
          }${dateTime.dateTime.split("-")[2]}`,
        },
      })
    );
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
        <form
          className="text-center m-0 p-0"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            getVacation();
          }}
        >
          <div className="card shadow custom-background-transparent-low text-center m-0 p-0">
            <div className="card-header text-center m-0 p-0">
              Выберите дату и нажмите "
              <span className="text-primary text-center">получить</span>"
            </div>
            <div className="card-body text-center m-0 p-1">
              <div className="form-control-sm input-group text-center m-0 p-0">
                <input
                  type="date"
                  className="form-control form-control-sm text-center m-0 p-1"
                  // @ts-ignore
                  min={util.GetCurrentDate(false)}
                  // @ts-ignore
                  max={util.GetCurrentDate(false, 1)}
                  required
                  value={dateTime.dateTime}
                  onChange={(event) =>
                    setDateTime({
                      dateTime: event.target.value,
                    })
                  }
                />
                {!VacationReadStore.load && (
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary m-1 p-2"
                  >
                    <i className="fa-solid fa-circle-check m-0 p-1" />
                    получить
                  </button>
                )}
                {!VacationReadStore.load && (
                  <button
                    type="button"
                    className="btn btn-sm btn-warning m-1 p-2"
                    onClick={() => {
                      resetDateTime();
                      dispatch({
                        type: slice.vacation.vacationReadStore.constant.reset,
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
        </form>
      </ul>
      <hr />
      <component.StatusStore1
        slice={slice.vacation.vacationReadStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
      />
      {VacationReadStore.data && (
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
                  {VacationReadStore.data["headers"].map(
                    // @ts-ignore
                    (head, index) => (
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
                    )
                  )}
                </tbody>
              </table>
            </li>
          </ul>
          {VacationReadStore.data["tables"] &&
            VacationReadStore.data["tables"].length > 0 && (
              <component.Accordion1
                key_target={"accordion1"}
                isCollapse={false}
                title={"Запланированный отпуск :"}
                text_style="text-primary"
                header_style="bg-primary bg-opacity-10 custom-background-transparent-low-middle"
                body_style="bg-light bg-opacity-10 custom-background-transparent-low-middle"
              >
                <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center bg-light bg-opacity-50 custom-background-transparent-low-middle m-0 p-0">
                  {VacationReadStore.data["tables"].map(
                    // @ts-ignore
                    (table, index) => (
                      <li
                        key={index}
                        className="bg-light bg-opacity-10 custom-background-transparent-low-middle m-0 p-1 my-1"
                      >
                        <h6 className="lead fw-bold bold text-center">
                          {VacationReadStore.data["tables"].length > 1
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
                            {table.slice(1).map(
                              // @ts-ignore
                              (tab, index) => (
                                <tr key={index} className="m-0 p-0">
                                  <td className="text-start m-0 p-1">
                                    {tab[0]}
                                  </td>
                                  <td className="text-end m-0 p-1">{tab[1]}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </li>
                    )
                  )}
                </ul>
              </component.Accordion1>
            )}
        </div>
      )}
    </base.Base1>
  );
};
