// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as component from "../../components/component";
import * as constant from "../../components/constant";
import * as hook from "../../components/hook";
import * as util from "../../components/util";

import * as base from "../../components/ui/base";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const NotificationListPage = () => {
  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const NotificationReadListStore = hook.useSelectorCustom1(
    constant.NotificationReadListStore
  );

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.BaseComponent1>
      <component.StoreComponent
        storeStatus={constant.NotificationReadListStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showLoad={true}
        loadText={""}
        showData={false}
        dataText={""}
        showError={true}
        errorText={""}
        showFail={true}
        failText={""}
      />
      {NotificationReadListStore.data && (
        <table className="table table-sm table-hover table-borderless table-striped border border-1 border-dark shadow custom-background-transparent-middle m-0 p-0">
          <tbody className="text-center m-0 p-0">
            <tr className="border border-1 border-dark text-center bg-primary bg-opacity-10 m-0 p-0">
              <td className="fw-bold small m-0 p-1">дата и время</td>
              <td className="fw-bold small m-0 p-1">автор</td>
              <td className="fw-bold small m-0 p-1">название</td>
              <td className="fw-bold small m-0 p-1">место</td>
              <td className="fw-bold small m-0 p-1">описание</td>
              <td className="small m-0 p-1" />
            </tr>
            {NotificationReadListStore.data.list.map(
              // @ts-ignore
              (notification, index = 0) => (
                <tr
                  key={index}
                  className="text-center bg-light bg-opacity-10 m-0 p-0"
                >
                  <td className="small m-0 p-0">
                    {util.GetCleanDateTime(
                      notification["created_datetime_field"],
                      true
                    )}
                  </td>
                  <td className="small m-0 p-0">
                    {
                      notification["author_foreign_key_field"][
                        "last_name_char_field"
                      ]
                    }{" "}
                    {
                      notification["author_foreign_key_field"][
                        "first_name_char_field"
                      ]
                    }
                  </td>
                  <td className="small m-0 p-0">
                    {notification["name_char_field"]}
                  </td>
                  <td className="small m-0 p-0">
                    {notification["place_char_field"]}
                  </td>
                  <td className="small m-0 p-0">
                    {notification["description_text_field"]}
                  </td>
                  <td className="small m-0 p-0">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger m-1 p-1"
                    >
                      скрыть
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </base.BaseComponent1>
  );
};
