// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const AdminExportUsersPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const adminExportUsersStore = useSelector(
    (state) => state.adminExportUsersStore
  );
  const {
    load: loadExportUsers,
    data: dataExportUsers,
    // error: errorExportUsers,
    // fail: failExportUsers,
  } = adminExportUsersStore;
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "EXPORT_USERS",
    };
    dispatch(actions.adminExportUsersAction(form));
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={adminExportUsersStore}
          key={"adminExportUsersStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={true}
          dataText={"Данные успешно отправлены!"}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        {!loadExportUsers && (
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
            <form className="m-0 p-0" onSubmit={handlerSubmit}>
              <div className="card shadow custom-background-transparent-low m-0 p-0">
                <div className="card-footer m-0 p-0">
                  <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                    <button
                      className="btn btn-sm btn-primary m-1 p-2"
                      type="submit"
                    >
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      получить данные
                    </button>
                  </ul>
                </div>
              </div>
            </form>
          </ul>
        )}
        <div className="m-0 p-0">
          {dataExportUsers && (
            <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
              <form className="m-0 p-0" onSubmit={handlerSubmit}>
                <div className="card shadow custom-background-transparent-low m-0 p-0">
                  <div className="card-header fw-bold m-0 p-0">
                    Скачайте выгруженный файл:
                  </div>
                  <div className="card-footer m-0 p-0">
                    <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                      <a
                        className="btn btn-sm btn-success m-0 p-1"
                        href={`/${dataExportUsers["excel"]}`}
                      >
                        Скачать excel-документ
                      </a>
                    </ul>
                  </div>
                </div>
              </form>
            </ul>
          )}
        </div>
      </main>
      <components.FooterComponent />
    </div>
  );
};
