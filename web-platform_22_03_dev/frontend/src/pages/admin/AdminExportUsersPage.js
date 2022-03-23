///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React from "react";
import { useDispatch, useSelector } from "react-redux";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const AdminExportUsersPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
  const adminExportUsersStore = useSelector(
    (state) => state.adminExportUsersStore
  );
  const {
    load: loadExportUsers,
    data: dataExportUsers,
    // error: errorExportUsers,
    // fail: failExportUsers,
  } = adminExportUsersStore;
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    const form = {
      "Action-type": "EXPORT_USERS",
    };
    dispatch(actions.adminExportUsersAction(form));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
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
        <div className="input-group m-1">
          {!loadExportUsers && (
            <form
              method="POST"
              target="_self"
              encType="multipart/form-data"
              name="EXPORT_USERS"
              autoComplete="on"
              className="w-100"
              onSubmit={handlerSubmit}
            >
              <button className="btn btn-sm btn-primary" type="submit">
                получить
              </button>
            </form>
          )}
        </div>
        <hr />
        <div>
          {dataExportUsers && (
            <div>
              <a
                className="btn btn-sm btn-success m-1"
                href={`/${dataExportUsers["excel"]}`}
              >
                Скачать excel-документ
              </a>
            </div>
          )}
        </div>
      </main>
      <components.FooterComponent />
    </div>
  );
};
