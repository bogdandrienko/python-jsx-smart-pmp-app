// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const NotificationListPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [firstRefresh, firstRefreshSet] = useState(true);
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const notificationListStore = useSelector(
    (state) => state.notificationListStore
  );
  const {
    // load: loadNotificationList,
    data: dataNotificationList,
    // error: errorNotificationList,
    // fail: failNotificationList,
  } = notificationListStore;
  //////////////////////////////////////////////////////////
  const notificationDeleteStore = useSelector(
    (state) => state.notificationDeleteStore
  );
  const {
    // load: loadNotificationDelete,
    data: dataNotificationDelete,
    // error: errorNotificationDelete,
    // fail: failNotificationDelete,
  } = notificationDeleteStore;
  // TODO reset state //////////////////////////////////////////////////////////////////////////////////////////////////
  const resetState = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    dispatch({ type: constants.NOTIFICATION_LIST_RESET_CONSTANT });
  };
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!dataNotificationList) {
      const form = {
        "Action-type": "NOTIFICATION_LIST",
      };
      dispatch(actions.notificationListAction(form));
    } else {
      if (firstRefresh) {
        firstRefreshSet(false);
        resetState();
      }
    }
  }, [dataNotificationList, firstRefresh]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataNotificationDelete) {
      utils.Sleep(1000).then(() => {
        resetState();
      });
    }
  }, [dataNotificationDelete]);
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerNotificationDeleteSubmit = async ({ id }) => {
    const form = {
      "Action-type": "NOTIFICATION_DELETE",
      id: id,
    };
    let isConfirm = window.confirm("Скрыть это уведомление?");
    if (isConfirm) {
      dispatch(actions.notificationDeleteAction(form));
    }
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={notificationListStore}
          keyStatus={"notificationListStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={false}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        {dataNotificationList && (
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
              {dataNotificationList.map((object, index) => (
                <tr
                  key={index}
                  className="text-center bg-light bg-opacity-10 m-0 p-0"
                >
                  <td className="small m-0 p-0">
                    {utils.GetCleanDateTime(
                      object["created_datetime_field"],
                      true
                    )}
                  </td>
                  <td className="small m-0 p-0">
                    {object["author_foreign_key_field"]["last_name_char_field"]}{" "}
                    {
                      object["author_foreign_key_field"][
                        "first_name_char_field"
                      ]
                    }
                  </td>
                  <td className="small m-0 p-0">{object["name_char_field"]}</td>
                  <td className="small m-0 p-0">
                    {object["place_char_field"]}
                  </td>
                  <td className="small m-0 p-0">
                    {object["description_text_field"]}
                  </td>
                  <td className="small m-0 p-0">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger m-1 p-1"
                      onClick={(e) =>
                        handlerNotificationDeleteSubmit({
                          id: `${object.id}`,
                        })
                      }
                    >
                      скрыть
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <components.FooterComponent />
    </div>
  );
};
