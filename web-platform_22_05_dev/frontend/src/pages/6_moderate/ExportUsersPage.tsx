// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as slice from "../../components/slice";
import * as constant from "../../components/constant";
import * as hook from "../../components/hook";

import * as component from "../../components/ui/component";
import * as base from "../../components/ui/base";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ExportUsersPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const adminExportUsersStore = hook.useSelectorCustom2(
    slice.moderator.adminExportUsersStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  const getUsers = () => {
    dispatch(slice.moderator.adminExportUsersStore.action({}));
  };

  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base1>
      <component.StatusStore1
        slice={slice.moderator.adminExportUsersStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
      />
      {!adminExportUsersStore.load && (
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form
            className="m-0 p-0"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              getUsers();
            }}
          >
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
        {adminExportUsersStore.data && (
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              <div className="card-header fw-bold m-0 p-0">
                Скачайте выгруженный файл:
              </div>
              <div className="card-footer m-0 p-0">
                <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                  <a
                    className="btn btn-sm btn-success m-0 p-1"
                    href={`/${adminExportUsersStore.data["excel"]}`}
                  >
                    Скачать excel-документ
                  </a>
                </ul>
              </div>
            </div>
          </ul>
        )}
      </div>
    </base.Base1>
  );
};
