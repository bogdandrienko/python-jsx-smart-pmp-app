// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as constant from "../../components/constant";
import * as util from "../../components/util";
import * as hook from "../../components/hook";
import * as slice from "../../components/slice";

import * as component from "../../components/ui/component";
import * as base from "../../components/ui/base";
import * as modal from "../../components/ui/modal";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CreateOrChangeUsersPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const adminCreateUsersStore = hook.useSelectorCustom2(
    slice.moderator.adminCreateUsersStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const [users, setUsers, resetUsers] = hook.useStateCustom1({
    changeUser: "Изменять уже существующего пользователя",
    changeUserPassword: "Оставлять предыдущий пароль пользователя",
    clearUserGroups: "Добавлять новые группы доступа к предыдущим",
    additionalExcel: null,
  });

  const [isModalCreateUsersVisible, setIsModalCreateUsersVisible] =
    useState(false);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (adminCreateUsersStore.data) {
      util.Delay(() => {
        ResetState();
      }, 10000);
    }
  }, [adminCreateUsersStore.data]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  const ResetState = () => {
    dispatch({
      type: slice.moderator.adminCreateUsersStore.constant.reset,
    });
    resetUsers();
  };

  const CreateUsers = () => {
    dispatch(
      slice.moderator.adminCreateUsersStore.action({
        form: {
          ...users,
        },
      })
    );
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <component.StatusStore1
        slice={slice.moderator.adminCreateUsersStore}
        consoleLog={constant.DEBUG_CONSTANT}
      />
      {!adminCreateUsersStore.load && (
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form
            className="m-0 p-0"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setIsModalCreateUsersVisible(true);
            }}
          >
            <modal.ModalConfirm1
              isModalVisible={isModalCreateUsersVisible}
              setIsModalVisible={setIsModalCreateUsersVisible}
              description={"Подтвердите создание пользователей?"}
              callback={() => CreateUsers()}
            />
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              <div className="card-header lead bg-opacity-10 m-0 p-1">
                <div className="d-flex justify-content-between m-0 p-1">
                  <div className="m-0 p-1">
                    Скачать шаблон для заполнения и проверки формата полей
                    <a
                      className="btn btn-sm btn-success m-0 p-1"
                      href="/static/media/default/admin/account/create_users.xlsx"
                    >
                      Скачать excel-документ
                    </a>
                  </div>
                  <div className="m-0 p-1">
                    Скачать шаблон создания всех пользователей (чистый)
                    <a
                      className="btn btn-sm btn-success m-0 p-1"
                      href="/static/media/default/admin/account/create_old_users.xlsx"
                    >
                      Скачать excel-документ
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body m-0 p-0">
                <div className="m-0 p-1">
                  <label className="form-control-sm text-center m-0 p-1">
                    Что делать с уже существующими пользователями:
                    <select
                      id="changeUser"
                      name="changeUser"
                      required
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={users.changeUser}
                      onChange={(event) =>
                        setUsers({
                          ...users,
                          changeUser: event.target.value,
                        })
                      }
                    >
                      <option value="Изменять уже существующего пользователя">
                        Изменять уже существующего пользователя
                      </option>
                      <option value="Не изменять уже существующего пользователя">
                        Не изменять уже существующего пользователя
                      </option>
                    </select>
                    <small className="text-danger">* обязательно</small>
                  </label>
                </div>
                <div className="m-0 p-1">
                  <label className="form-control-sm text-center m-0 p-1">
                    Что делать с паролем уже существующего пользователя:
                    <select
                      id="changeUserPassword"
                      name="changeUserPassword"
                      required
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={users.changeUserPassword}
                      onChange={(event) =>
                        setUsers({
                          ...users,
                          changeUserPassword: event.target.value,
                        })
                      }
                    >
                      <option value="Оставлять предыдущий пароль пользователя">
                        Оставлять предыдущий пароль пользователя
                      </option>
                      <option value="Изменять пароль уже существующего пользователя">
                        Изменять пароль уже существующего пользователя
                      </option>
                    </select>
                    <small className="text-danger">* обязательно</small>
                  </label>
                </div>
                <div className="m-0 p-1">
                  <label className="form-control-sm text-center m-0 p-1">
                    Что делать с группами уже существующего пользователя:
                    <select
                      id="clearUserGroups"
                      name="clearUserGroups"
                      required
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={users.clearUserGroups}
                      onChange={(event) =>
                        setUsers({
                          ...users,
                          clearUserGroups: event.target.value,
                        })
                      }
                    >
                      <option value="Добавлять новые группы доступа к предыдущим">
                        Добавлять новые группы доступа к предыдущим
                      </option>
                      <option value="Очищать все предыдущие группы доступа">
                        Очищать все предыдущие группы доступа
                      </option>
                    </select>
                    <small className="text-danger">* обязательно</small>
                  </label>
                </div>
                <div className="m-0 p-1">
                  <label className="form-control-sm text-center m-0 p-1">
                    Excel файл с пользователями:
                    <input
                      type="file"
                      required
                      accept=".xlsx, .xls"
                      className="form-control form-control-sm text-center m-0 p-1"
                      onChange={(event) =>
                        setUsers({
                          ...users,
                          // @ts-ignore
                          additionalExcel: event.target.files[0],
                        })
                      }
                    />
                    <small className="text-danger">* обязательно</small>
                  </label>
                </div>
              </div>
              <div className="card-footer m-0 p-0">
                <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                  <button
                    className="btn btn-sm btn-primary m-1 p-2"
                    type="submit"
                  >
                    <i className="fa-solid fa-circle-check m-0 p-1" />
                    отправить данные
                  </button>
                  <button
                    className="btn btn-sm btn-warning m-1 p-2"
                    type="reset"
                    onClick={() => ResetState()}
                  >
                    <i className="fa-solid fa-pen-nib m-0 p-1" />
                    сбросить данные
                  </button>
                </ul>
              </div>
            </div>
          </form>
        </ul>
      )}
    </base.Base1>
  );
};
