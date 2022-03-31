// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const AdminChangeUserActivityPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [captcha, captchaSet] = useState("");
  const [active, activeSet] = useState(false);
  const [username, usernameSet] = useState("");
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const adminChangeUserActivityStore = useSelector(
    (state) => state.adminChangeUserActivityStore
  );
  const {
    load: loadAdminChangeUserActivity,
    data: dataAdminChangeUserActivity,
    // error: errorAdminChangeUserActivity,
    // fail: failAdminChangeUserActivity,
  } = adminChangeUserActivityStore;
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerCheckUserSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    if (captcha !== "") {
      const form = {
        "Action-type": "ACTIVITY_USER",
        username: username,
        active: active,
      };
      dispatch(actions.adminChangeUserActivityAction(form));
    }
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <components.HeaderComponent />
      <main>
        <components.StoreStatusComponent
          storeStatus={adminChangeUserActivityStore}
          key={"adminChangeUserActivityStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={true}
          dataText={""}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        {!loadAdminChangeUserActivity && (
          <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
            <form className="m-0 p-0" onSubmit={handlerCheckUserSubmit}>
              <div className="card shadow custom-background-transparent-low m-0 p-0">
                {!captcha && (
                  <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
                    <i className="fa-solid fa-robot m-0 p-1" />
                    Пройдите проверку на робота!
                  </div>
                )}
                <div className="card-body m-0 p-0">
                  <div className="m-0 p-1">
                    <label className="m-0 p-1">
                      <ReCAPTCHA
                        sitekey="6LchKGceAAAAAPh11VjsCtAd2Z1sQ8_Tr_taExbO"
                        onChange={(e) => captchaSet(e)}
                      />
                    </label>
                  </div>
                  <div className="m-0 p-1">
                    <label className="form-control-sm form-switch text-center m-0 p-1">
                      Активировать пользователя:
                      <input
                        type="checkbox"
                        className="form-check-input m-0 p-1"
                        id="flexSwitchCheckDefault"
                        defaultChecked={active}
                        onClick={(e) => activeSet(!active)}
                      />
                    </label>
                  </div>
                  <div className="m-0 p-1">
                    <label className="form-control-sm text-center w-75 m-0 p-1">
                      Введите ИИН пользователя:
                      <input
                        type="text"
                        className="form-control form-control-sm text-center m-0 p-1"
                        value={username}
                        placeholder="введите ИИН тут..."
                        required
                        minLength="12"
                        maxLength="12"
                        onChange={(e) =>
                          usernameSet(
                            e.target.value.replace(
                              utils.GetRegexType({ numbers: true }),
                              ""
                            )
                          )
                        }
                        autoComplete="current-username"
                      />
                      <small className="text-danger m-0 p-0">
                        * обязательно
                        <small className="custom-color-warning-1 m-0 p-0">
                          {" "}
                          * только цифры
                        </small>
                        <small className="text-muted m-0 p-0">
                          {" "}
                          * длина: 12 символов
                        </small>
                      </small>
                    </label>
                  </div>
                </div>
                <div className="card-footer m-0 p-0">
                  <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                    <button
                      className="btn btn-sm btn-danger m-1 p-2"
                      type="submit"
                    >
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      изменить статус
                    </button>
                  </ul>
                </div>
              </div>
            </form>
          </ul>
        )}
      </main>
      <components.FooterComponent />
    </div>
  );
};
