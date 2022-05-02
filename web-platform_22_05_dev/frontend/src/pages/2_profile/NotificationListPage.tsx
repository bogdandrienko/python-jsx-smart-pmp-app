// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as component from "../../components/ui/component";
import * as constant from "../../components/constant";
import * as hook from "../../components/hook";
import * as util from "../../components/util";
import * as slice from "../../components/slice";

import * as base from "../../components/ui/base";
import * as paginator from "../../components/ui/paginator";
import * as modal from "../../components/ui/modal";
import * as message from "../../components/ui/message";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const NotificationListPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const notificationReadListStore = hook.useSelectorCustom2(
    slice.notification.notificationReadListStore
  );
  const notificationUpdateStore = hook.useSelectorCustom2(
    slice.notification.notificationUpdateStore
  );

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const [paginationComment, setPaginationComment, resetPaginationComment] =
    hook.useStateCustom1({ page: 1, limit: 10 });

  const [
    isModalnotificationDeleteVisible,
    setIsModalnotificationDeleteVisible,
  ] = useState(false);
  const [modalnotificationDeleteForm, setModalnotificationDeleteForm] =
    useState({});

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch({
      type: slice.notification.notificationReadListStore.constant.reset,
    });
  }, [paginationComment.page]);

  useEffect(() => {
    if (
      !notificationReadListStore.data ||
      (notificationReadListStore.data["x-total-count"] > 1 &&
        notificationReadListStore.data.list.length === 1)
    ) {
      dispatch(
        slice.notification.notificationReadListStore.action({
          form: {
            ...paginationComment,
          },
        })
      );
    }
  }, [notificationReadListStore.data]);

  useEffect(() => {
    if (notificationUpdateStore.data) {
      setPaginationComment({ ...paginationComment, page: 1 });
      dispatch({
        type: slice.notification.notificationReadListStore.constant.reset,
      });
      dispatch({
        type: slice.notification.notificationUpdateStore.constant.reset,
      });
    }
  }, [notificationUpdateStore.data]);

  useEffect(() => {
    resetPaginationComment();
    setPaginationComment({ ...paginationComment, page: 1 });
    dispatch({
      type: slice.notification.notificationReadListStore.constant.reset,
    });
    dispatch({
      type: slice.notification.notificationUpdateStore.constant.reset,
    });
  }, []);

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  // @ts-ignore
  const Deletenotification = ({ notification_id }) => {
    dispatch(
      slice.notification.notificationUpdateStore.action({
        notification_id: Number(notification_id),
      })
    );
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <modal.ModalConfirm1
        isModalVisible={isModalnotificationDeleteVisible}
        setIsModalVisible={setIsModalnotificationDeleteVisible}
        description={"Удалить выбранное уведомление?"}
        callback={() =>
          // @ts-ignore
          Deletenotification({
            ...modalnotificationDeleteForm,
          })
        }
      />
      <component.StatusStore1
        slice={slice.notification.notificationReadListStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
      />
      <component.StatusStore1
        slice={slice.notification.notificationUpdateStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
      />
      {!notificationReadListStore.load &&
        notificationReadListStore.data &&
        !(
          notificationReadListStore.data["x-total-count"] > 1 &&
          notificationReadListStore.data.list.length === 1
        ) && (
          <paginator.Pagination1
            totalObjects={notificationReadListStore.data["x-total-count"]}
            limit={paginationComment.limit}
            page={paginationComment.page}
            // @ts-ignore
            changePage={(page) =>
              setPaginationComment({
                ...paginationComment,
                page: page,
              })
            }
          />
        )}
      {!notificationReadListStore.load ? (
        notificationReadListStore.data &&
        notificationReadListStore.data.list.length > 0 ? (
          !(
            notificationReadListStore.data["x-total-count"] > 1 &&
            notificationReadListStore.data.list.length === 1
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
                {notificationReadListStore.data.list.map(
                  // @ts-ignore
                  (notification, index = 0) => (
                    <tr
                      key={index}
                      className="text-center bg-light bg-opacity-10 m-0 p-0"
                    >
                      <td className="small m-0 p-0">
                        {util.GetCleanDateTime(notification["created"], true)}
                      </td>
                      <td className="small m-0 p-0">
                        {notification["author"]["last_name"]}{" "}
                        {notification["author"]["first_name"]}
                      </td>
                      <td className="small m-0 p-0">{notification["name"]}</td>
                      <td className="small m-0 p-0">{notification["place"]}</td>
                      <td className="small m-0 p-0">
                        {notification["description"]}
                      </td>
                      <td className="small m-0 p-0">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger m-1 p-1"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setModalnotificationDeleteForm({
                              ...modalnotificationDeleteForm,
                              notification_id: notification.id,
                            });
                            setIsModalnotificationDeleteVisible(true);
                          }}
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
          <message.Message.Secondary>
            Уведомлений нет!
          </message.Message.Secondary>
        )
      ) : (
        ""
      )}
      {!notificationReadListStore.load &&
        notificationReadListStore.data &&
        !(
          notificationReadListStore.data["x-total-count"] > 1 &&
          notificationReadListStore.data.list.length === 1
        ) && (
          <paginator.Pagination1
            totalObjects={notificationReadListStore.data["x-total-count"]}
            limit={paginationComment.limit}
            page={paginationComment.page}
            // @ts-ignore
            changePage={(page) =>
              setPaginationComment({
                ...paginationComment,
                page: page,
              })
            }
          />
        )}
    </base.Base1>
  );
};
