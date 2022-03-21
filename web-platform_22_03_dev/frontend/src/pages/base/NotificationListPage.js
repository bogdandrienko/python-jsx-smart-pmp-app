///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const NotificationListPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [firstRefresh, firstRefreshSet] = useState(true);
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react store variables
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO reset state
  const resetState = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    dispatch({ type: constants.NOTIFICATION_LIST_RESET_CONSTANT });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////TODO useEffect hooks
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
  }, [dataNotificationList, dispatch, firstRefresh]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataNotificationDelete) {
      utils.Sleep(50).then(() => {
        resetState();
      });
    }
  }, [dataNotificationDelete]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
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
          <table className="table table-sm table-hover table-borderless table-striped custom-background-transparent-low border shadow m-0 p-0">
            <tbody>
              <tr className="border bg-primary bg-opacity-10">
                <td className="fw-bold small">дата и время</td>
                <td className="fw-bold small">название</td>
                <td className="fw-bold small">место</td>
                <td className="fw-bold small">описание</td>
                <td className="fw-bold small" />
              </tr>
              {dataNotificationList.map((object, index) => (
                <tr key={index} className="">
                  <td className="">
                    {utils.GetCleanDateTime(
                      object["created_datetime_field"],
                      true
                    )}
                  </td>
                  <td className="">{object["name_char_field"]}</td>
                  <td className="">{object["place_char_field"]}</td>
                  <td className="">{object["description_text_field"]}</td>
                  <td className="">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger m-1 p-2"
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
    </body>
  );
};
