// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const VacationPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [month, monthSet] = useState("3");
  const [year, yearSet] = useState("2022");
  const [dateTime, dateTimeSet] = useState("2021-03-30");
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
    console.log("dateTime: ", dateTime);
    const form = {
      "Action-type": "USER_VACATION",
      dateTime: dateTime,
    };
    dispatch(actions.vacationUserAction(form));
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
                Выберите день, на который нужно сформировать данные и нажмите "
                <span className="text-primary">сформировать</span>"
              </div>
              <div className="card-body m-0 p-0">
                <div className="form-control-sm input-group d-flex justify-content-between text-center m-0 p-0">
                  <label className="form-control-sm text-center w-75 m-0 p-1">
                    Дата формирования:
                    <input
                      type="date"
                      className="form-control form-control-sm text-center m-0 p-1"
                      min="2021-01-01"
                      max="2023-01-01"
                      value={dateTime}
                      required
                      onChange={(e) => dateTimeSet(e.target.value)}
                    />
                    <small className="text-danger">* обязательно</small>
                  </label>
                  {!loadVacationUser && (
                    <button type="submit" className="btn btn-sm btn-primary">
                      сформировать
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </ul>
        <hr />
        <components.StoreStatusComponent
          storeStatus={vacationUserStore}
          key={"vacationUserStore"}
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
        {dataVacationUser && (
          <div className="bg-light custom-background-transparent-low text-center m-0 p-1">
            <div className="text-center m-0 p-1">{dataVacationUser}</div>
          </div>
        )}
      </main>
      <components.FooterComponent />
    </div>
  );
};
