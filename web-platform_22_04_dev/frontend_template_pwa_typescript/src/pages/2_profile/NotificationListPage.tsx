// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as component from "../../components/ui/component";
import * as constant from "../../components/constant";
import * as hook from "../../components/hook";
import * as util from "../../components/util";

import * as base from "../../components/ui/base";
import * as paginator from "../../components/ui/paginator";
import * as action from "../../components/action";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const NotificationListPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const NotificationReadListStore = hook.useSelectorCustom1(
    constant.NotificationReadListStore
  );
  const NotificationDeleteStore = hook.useSelectorCustom1(
    constant.NotificationDeleteStore
  );

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch({ type: constant.NotificationReadListStore.reset });
  }, [page]);

  useEffect(() => {
    if (
      !NotificationReadListStore.data ||
      (NotificationReadListStore.data["x-total-count"] > 1 &&
        NotificationReadListStore.data.list.length === 1)
    ) {
      dispatch(
        action.Notification.ReadList({ form: { limit: limit, page: page } })
      );
    }
  }, [NotificationReadListStore.data]);

  useEffect(() => {
    if (NotificationDeleteStore.data) {
      setPage(1);
      dispatch({ type: constant.NotificationReadListStore.reset });
      dispatch({ type: constant.NotificationDeleteStore.reset });
    }
  }, [NotificationDeleteStore.data]);

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  // @ts-ignore
  const DeleteNotification = ({ id }) => {
    dispatch(action.Notification.Delete({ notification_id: id }));
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <component.StoreComponent1
        stateConstant={constant.NotificationReadListStore}
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
      <component.StoreComponent1
        stateConstant={constant.NotificationDeleteStore}
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
      {!NotificationReadListStore.load &&
        NotificationReadListStore.data &&
        !(
          NotificationReadListStore.data["x-total-count"] > 1 &&
          NotificationReadListStore.data.list.length === 1
        ) && (
          <paginator.Pagination1
            totalObjects={NotificationReadListStore.data["x-total-count"]}
            limit={limit}
            page={page}
            changePage={setPage}
          />
        )}
      {!NotificationReadListStore.load &&
      NotificationReadListStore.data &&
      NotificationReadListStore.data.list.length > 0 ? (
        !(
          NotificationReadListStore.data["x-total-count"] > 1 &&
          NotificationReadListStore.data.list.length === 1
        ) && (
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
                        onClick={() =>
                          DeleteNotification({ id: notification.id })
                        }
                      >
                        скрыть
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )
      ) : (
        <h1>Уведомления не найдены!</h1>
      )}
    </base.Base1>
  );
};
