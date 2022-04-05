// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const ChangeProfilePage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [secretQuestion, secretQuestionSet] = useState("");
  const [secretAnswer, secretAnswerSet] = useState("");
  const [email, emailSet] = useState("");
  const [avatar, avatarSet] = useState(null);
  const [password, passwordSet] = useState("");
  const [password2, password2Set] = useState("");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;
  //////////////////////////////////////////////////////////
  const userChangeStore = useSelector((state) => state.userChangeStore);
  const {
    // load: loadUserChange,
    data: dataUserChange,
    // error: errorUserChange,
    // fail: failUserChange,
  } = userChangeStore;
  // TODO useEffect hooks //////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataUserDetails && dataUserDetails["user_model"]) {
      if (dataUserDetails["user_model"]["secret_question_char_field"]) {
        secretQuestionSet(
          dataUserDetails["user_model"]["secret_question_char_field"]
        );
      }
      if (dataUserDetails["user_model"]["secret_answer_char_field"]) {
        secretAnswerSet(
          dataUserDetails["user_model"]["secret_answer_char_field"]
        );
      }
      if (dataUserDetails["user_model"]["email_field"]) {
        emailSet(dataUserDetails["user_model"]["email_field"]);
      }
      if (dataUserDetails["user_model"]["password_slug_field"]) {
        passwordSet("");
        password2Set("");
      }
    } else {
      const form = {
        "Action-type": "USER_DETAIL",
      };
      dispatch(actions.userDetailsAction(form));
      passwordSet("");
      password2Set("");
    }
  }, [dataUserDetails]);
  //////////////////////////////////////////////////////////
  useEffect(() => {
    if (dataUserChange) {
      utils.Sleep(10).then(() => {
        dispatch(actions.userLogoutAction());
        navigate("/login");
      });
    }
  }, [dataUserChange]);
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerChangeSubmit = (e) => {
    e.preventDefault();
    const form = {
      "Action-type": "CHANGE",
      secretQuestion: secretQuestion,
      secretAnswer: secretAnswer,
      email: email,
      avatar: avatar,
      password: password,
      password2: password2,
    };
    dispatch(actions.userChangeAction(form));
  };
  //////////////////////////////////////////////////////////
  const handlerChangeReset = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    secretQuestionSet("");
    secretAnswerSet("");
    emailSet("");
    passwordSet("");
    password2Set("");
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={userDetailsStore}
          key={"userDetailsStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={false}
          loadText={""}
          showData={false}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <form className="m-0 p-0" onSubmit={handlerChangeSubmit}>
            <div className="card shadow custom-background-transparent-low m-0 p-0">
              <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
                Внимание, без правильного заполнения обязательных данных Вас
                будет перенаправлять на эту страницу постоянно!
              </div>
              <div className="card-header m-0 p-0">
                <components.StoreStatusComponent
                  storeStatus={userChangeStore}
                  key={"userChangeStore"}
                  consoleLog={constants.DEBUG_CONSTANT}
                  showLoad={true}
                  loadText={""}
                  showData={true}
                  dataText={"Данные успешно изменены!"}
                  showError={true}
                  errorText={""}
                  showFail={true}
                  failText={""}
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
                      value={secretQuestion}
                      placeholder="введите секретный вопрос тут..."
                      required
                      onChange={(e) =>
                        secretQuestionSet(
                          e.target.value.replace(
                            utils.GetRegexType({
                              numbers: true,
                              cyrillic: true,
                              space: true,
                            }),
                            ""
                          )
                        )
                      }
                      minLength="4"
                      maxLength="32"
                    />
                    <small className="text-danger m-0 p-0">
                      * обязательно
                      <small className="custom-color-warning-1 m-0 p-0">
                        {" "}
                        * только кириллица, цифры и пробел
                      </small>
                      <small className="text-muted m-0 p-0">
                        {" "}
                        * длина: от 4 до 32 символов
                      </small>
                    </small>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    <i className="fa-solid fa-message m-0 p-1" />
                    Введите ответ на секретный вопрос:
                    <input
                      type="text"
                      className="form-control form-control-sm text-center m-0 p-1"
                      value={secretAnswer}
                      placeholder="введите секретный ответ тут..."
                      required
                      onChange={(e) =>
                        secretAnswerSet(
                          e.target.value.replace(
                            utils.GetRegexType({
                              numbers: true,
                              cyrillic: true,
                              space: true,
                            }),
                            ""
                          )
                        )
                      }
                      minLength="4"
                      maxLength="32"
                    />
                    <small className="text-danger m-0 p-0">
                      * обязательно
                      <small className="custom-color-warning-1 m-0 p-0">
                        {" "}
                        * только кириллица, цифры и пробел
                      </small>
                      <small className="text-muted m-0 p-0">
                        {" "}
                        * длина: от 4 до 32 символов
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
                      value={email}
                      placeholder="введите почту тут..."
                      onChange={(e) =>
                        emailSet(
                          e.target.value.replace(
                            utils.GetRegexType({
                              numbers: true,
                              latin: true,
                              lowerSpace: true,
                              email: true,
                            }),
                            ""
                          )
                        )
                      }
                      minLength="1"
                      maxLength="300"
                      autoComplete="off"
                    />
                    <small className="text-muted m-0 p-0">
                      * не обязательно
                      <small className="custom-color-warning-1 m-0 p-0">
                        {" "}
                        * только латиница, цифры, нижний пробел и знаки почты
                      </small>
                      <small className="text-muted m-0 p-0">
                        {" "}
                        * длина: не более 300 символов
                      </small>
                    </small>
                  </label>
                </div>
                <div className="m-0 p-0">
                  {dataUserDetails && dataUserDetails["user_model"] && (
                    <img
                      src={utils.GetStaticFile(
                        dataUserDetails["user_model"]["image_field"]
                      )}
                      className="card-img-top img-fluid w-25 m-0 p-1"
                      alt="изображение отсутствует"
                    />
                  )}
                  <label className="form-control-sm text-center m-0 p-1">
                    Фото профиля:
                    <input
                      type="file"
                      className="form-control form-control-sm text-center m-0 p-1"
                      accept=".jpg, .png"
                      onChange={(e) => avatarSet(e.target.files[0])}
                    />
                    <small className="text-muted m-0 p-0">
                      * не обязательно
                    </small>
                  </label>
                </div>
                <div className="m-0 p-1">
                  <label className="form-control-sm text-center m-0 p-1">
                    <i className="fa-solid fa-key m-0 p-1" />
                    Введите пароль для входа в аккаунт:
                    <div className="input-group form-control-sm m-0 p-1">
                      <input
                        type="password"
                        className="form-control form-control-sm text-center m-0 p-1"
                        id="password"
                        value={password}
                        placeholder="введите новый пароль тут..."
                        required
                        onChange={(e) =>
                          passwordSet(
                            e.target.value.replace(
                              utils.GetRegexType({
                                numbers: true,
                                latin: true,
                                lowerSpace: true,
                              }),
                              ""
                            )
                          )
                        }
                        minLength="8"
                        maxLength="16"
                        autoComplete="current-password"
                      />
                      <span className="">
                        <i
                          className="fa-solid fa-eye-low-vision btn btn-outline-secondary m-0 p-3"
                          onClick={(e) =>
                            utils.ChangePasswordVisibility(["password"])
                          }
                        />
                      </span>
                    </div>
                    <small className="text-danger m-0 p-0">
                      * обязательно
                      <small className="custom-color-warning-1 m-0 p-0">
                        {" "}
                        * только латиница, цифры и нижний пробел
                      </small>
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
                        value={password2}
                        placeholder="введите новый пароль тут..."
                        required
                        onChange={(e) =>
                          password2Set(
                            e.target.value.replace(
                              utils.GetRegexType({
                                numbers: true,
                                latin: true,
                                lowerSpace: true,
                              }),
                              ""
                            )
                          )
                        }
                        minLength="8"
                        maxLength="16"
                        autoComplete="current-password"
                      />
                      <span className="">
                        <i
                          className="fa-solid fa-eye-low-vision btn btn-outline-secondary m-0 p-3"
                          onClick={(e) =>
                            utils.ChangePasswordVisibility(["password2"])
                          }
                        />
                      </span>
                    </div>
                    <small className="text-danger m-0 p-0">
                      * обязательно
                      <small className="custom-color-warning-1 m-0 p-0">
                        {" "}
                        * только латиница, цифры и нижний пробел
                      </small>
                      <small className="text-muted m-0 p-0">
                        {" "}
                        * длина: от 8 до 16 символов
                      </small>
                    </small>
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
                    сохранить новые данные
                  </button>
                  <button
                    className="btn btn-sm btn-warning m-1 p-2"
                    type="reset"
                    onClick={(e) => handlerChangeReset(e)}
                  >
                    <i className="fa-solid fa-pen-nib m-0 p-1" />
                    сбросить данные
                  </button>
                </ul>
              </div>
            </div>
          </form>
        </ul>
      </main>
      <components.FooterComponent />
    </div>
  );
};
