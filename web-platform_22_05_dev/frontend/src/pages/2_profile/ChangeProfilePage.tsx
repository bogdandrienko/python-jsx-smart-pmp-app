// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as action from "../../components/action";
import * as component from "../../components/ui/component";
import * as constant from "../../components/constant";
import * as hook from "../../components/hook";
import * as util from "../../components/util";

import * as base from "../../components/ui/base";
import * as modal from "../../components/ui/modal";
import * as slice from "../../components/slice";
import * as message from "../../components/ui/message";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ChangeProfilePage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const userDetailStore = hook.useSelectorCustom2(slice.user.userDetailStore);
  const userPasswordUpdateStore = hook.useSelectorCustom2(
    slice.user.userPasswordUpdateStore
  );

  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const [user, setUser, resetUser] = hook.useStateCustom1({
    secretQuestion: "",
    secretAnswer: "",
    email: "",
    avatar: null,
    password: "",
    isDangerPassword: false,
    password2: "",
  });

  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (userDetailStore.data && userDetailStore.data["user_model"]) {
      setUser({
        ...user,
        secretQuestion: userDetailStore.data["user_model"]["secret_question"],
        secretAnswer: userDetailStore.data["user_model"]["secret_answer"],
        email: userDetailStore.data["user_model"]["email"],
        password: userDetailStore.data["user_model"]["password"],
        password2: userDetailStore.data["user_model"]["password"],
      });
    }
  }, [userDetailStore.data]);

  useEffect(() => {
    if (userPasswordUpdateStore.data) {
      util.Delay(() => {
        dispatch(action.user.logout());
      }, 10);
    }
  }, [userPasswordUpdateStore.data]);

  useEffect(() => {
    if (user.password) {
      setUser({
        ...user,
        isDangerPassword: user.password.match(
          util.RegularExpression.StrongPassword()
        ),
      });
    }
  }, [user.password]);

  // TODO functions ////////////////////////////////////////////////////////////////////////////////////////////////////

  const CreateConfirm = () => {
    dispatch(
      slice.user.userPasswordUpdateStore.action({
        form: { ...user },
      })
    );
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <component.StatusStore1
        slice={slice.user.userDetailStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
      />
      <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
        <form
          className="m-0 p-0"
          onSubmit={(event) => {
            event.preventDefault();
            setIsModalUpdateVisible(true);
          }}
        >
          <modal.ModalConfirm1
            isModalVisible={isModalUpdateVisible}
            setIsModalVisible={setIsModalUpdateVisible}
            description={"Заменить данные?"}
            callback={CreateConfirm}
          />
          <div className="card shadow custom-background-transparent-low m-0 p-0">
            <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
              Внимание, без правильного заполнения обязательных данных Вас будет
              перенаправлять на эту страницу постоянно!
            </div>
            <div className="card-header m-0 p-0">
              <component.StatusStore1
                slice={slice.user.userPasswordUpdateStore}
                consoleLog={constant.DEBUG_CONSTANT}
              />
            </div>
            <div className="card-body m-0 p-0">
              <div className="m-0 p-1">
                <label className="form-control-sm text-center m-0 p-1">
                  <i className="fa-solid fa-question-circle m-0 p-1" />
                  Введите секретный вопрос для восстановления доступа:
                  <input
                    type="text"
                    className="form-control form-control-sm text-center m-0 p-1"
                    placeholder="введите секретный вопрос тут..."
                    required
                    value={user.secretQuestion}
                    onChange={(event) =>
                      setUser({
                        ...user,
                        secretQuestion: event.target.value.replace(
                          util.RegularExpression.GetRegexType({
                            numbers: true,
                            cyrillic: true,
                            space: true,
                          }),
                          ""
                        ),
                      })
                    }
                    minLength={3}
                    maxLength={32}
                  />
                  <small className="custom-color-warning-1 m-0 p-0">
                    * только кириллица
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: от 3 до 32 символов
                    </small>
                  </small>
                </label>
                <label className="form-control-sm text-center m-0 p-1">
                  <i className="fa-solid fa-message m-0 p-1" />
                  Введите ответ на секретный вопрос:
                  <input
                    type="text"
                    className="form-control form-control-sm text-center m-0 p-1"
                    placeholder="введите секретный ответ тут..."
                    required
                    value={user.secretAnswer}
                    onChange={(event) =>
                      setUser({
                        ...user,
                        secretAnswer: event.target.value.replace(
                          util.RegularExpression.GetRegexType({
                            numbers: true,
                            cyrillic: true,
                            space: true,
                          }),
                          ""
                        ),
                      })
                    }
                    minLength={3}
                    maxLength={32}
                  />
                  <small className="custom-color-warning-1 m-0 p-0">
                    * только кириллица
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: от 3 до 32 символов
                    </small>
                  </small>
                </label>
              </div>
              <div className="m-0 p-1">
                <label className="form-control-sm text-center m-0 p-1">
                  <i className="fa-solid fa-envelope m-0 p-1" />
                  Почта для восстановления доступа :
                  <input
                    type="email"
                    className="form-control form-control-sm text-center m-0 p-1"
                    placeholder="введите почту тут..."
                    value={user.email}
                    onChange={(event) =>
                      setUser({
                        ...user,
                        email: event.target.value.replace(
                          util.RegularExpression.GetRegexType({
                            numbers: true,
                            latin: true,
                            lowerSpace: true,
                            email: true,
                          }),
                          ""
                        ),
                      })
                    }
                    minLength={1}
                    maxLength={300}
                    autoComplete="off"
                  />
                  <small className="text-muted m-0 p-0">
                    * не обязательно
                    <small className="custom-color-warning-1 m-0 p-0">
                      {" "}
                      * только латиница
                    </small>
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: не более 300 символов
                    </small>
                  </small>
                </label>
              </div>
              <div className="m-0 p-1">
                {!user.isDangerPassword && (
                  <message.Message.Warning>
                    Пароль слишком простой! Пароль должен содержать цифры,
                    большие и маленькие буквы.
                  </message.Message.Warning>
                )}
                <label className="form-control-sm text-center m-0 p-1">
                  <i className="fa-solid fa-key m-0 p-1" />
                  Введите пароль для входа в аккаунт:
                  <div className="input-group form-control-sm m-0 p-1">
                    <input
                      type="password"
                      className="form-control form-control-sm text-center m-0 p-1"
                      id="password"
                      placeholder="введите новый пароль тут..."
                      required
                      value={user.password}
                      onChange={(event) =>
                        setUser({
                          ...user,
                          password: event.target.value.replace(
                            util.RegularExpression.GetRegexType({
                              numbers: true,
                              latin: true,
                              lowerSpace: true,
                            }),
                            ""
                          ),
                          isDangerPassword: user.password.match(
                            util.RegularExpression.StrongPassword()
                          ),
                        })
                      }
                      minLength={8}
                      maxLength={16}
                      autoComplete="current-password"
                    />
                    <span className="">
                      <i
                        className="fa-solid fa-eye-low-vision btn btn-outline-secondary m-0 p-3"
                        onClick={() =>
                          util.ChangePasswordVisibility(["password"])
                        }
                      />
                    </span>
                  </div>
                  <small className="custom-color-warning-1 m-0 p-0">
                    * только латиница
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: от 8 до 16 символов
                    </small>
                  </small>
                </label>
                <label className="form-control-sm text-center m-0 p-1">
                  <i className="fa-solid fa-key m-0 p-1" />
                  Повторите новый пароль:
                  <div className="input-group form-control-sm m-0 p-1">
                    <input
                      type="password"
                      className="form-control form-control-sm text-center m-0 p-1"
                      id="password2"
                      placeholder="введите новый пароль тут..."
                      required
                      value={user.password2}
                      onChange={(event) =>
                        setUser({
                          ...user,
                          password2: event.target.value.replace(
                            util.RegularExpression.GetRegexType({
                              numbers: true,
                              latin: true,
                              lowerSpace: true,
                            }),
                            ""
                          ),
                        })
                      }
                      minLength={8}
                      maxLength={16}
                      autoComplete="current-password"
                    />
                    <span className="">
                      <i
                        className="fa-solid fa-eye-low-vision btn btn-outline-secondary m-0 p-3"
                        onClick={() =>
                          util.ChangePasswordVisibility(["password2"])
                        }
                      />
                    </span>
                  </div>
                  <small className="custom-color-warning-1 m-0 p-0">
                    * только латиница
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: от 8 до 16 символов
                    </small>
                  </small>
                </label>
                {user.password !== user.password2 && (
                  <message.Message.Danger>
                    Пароли не совпадают!
                  </message.Message.Danger>
                )}
              </div>
            </div>
            <div className="card-footer m-0 p-0">
              <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                <button
                  className="btn btn-sm btn-primary m-1 p-2"
                  type="submit"
                >
                  <i className="fa-solid fa-circle-check m-0 p-1" />
                  сохранить новые данные
                </button>
                <button
                  className="btn btn-sm btn-warning m-1 p-2"
                  type="reset"
                  onClick={() => resetUser()}
                >
                  <i className="fa-solid fa-pen-nib m-0 p-1" />
                  сбросить данные
                </button>
              </ul>
            </div>
          </div>
        </form>
      </ul>
    </base.Base1>
  );
};
