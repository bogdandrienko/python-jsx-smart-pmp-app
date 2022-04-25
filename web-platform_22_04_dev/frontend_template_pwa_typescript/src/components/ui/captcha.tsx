// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as action from "../action";
import * as component from "./component";
import * as constant from "../constant";
import * as hook from "../hook";
import * as util from "../util";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Captcha1 = () => {
  const dispatch = useDispatch();

  const captchaCheckStore = hook.useSelectorCustom1(constant.captchaCheckStore);

  useEffect(() => {
    if (captchaCheckStore.data) {
      util.Delay(
        () => dispatch({ type: constant.captchaCheckStore.reset }),
        30000
      );
    }
  }, [captchaCheckStore.data]);

  // @ts-ignore
  function Check(event) {
    event.preventDefault();
    event.stopPropagation();
    dispatch(action.Captcha.CheckAccess());
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="card">
      {!captchaCheckStore.data && (
        <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
          <i className="fa-solid fa-robot m-0 p-1 fw-bold lead" />
          Пройдите проверку на робота!
        </div>
      )}
      {captchaCheckStore.data && (
        <div className="card-header bg-success bg-opacity-10 text-success m-0 p-1">
          <i className={"fa-solid fa-user-check m-0 p-1 fw-bold lead"} />
          Вы успешно прошли проверку!
        </div>
      )}
      <component.StoreComponent1
        stateConstant={constant.captchaCheckStore}
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
      {!captchaCheckStore.load && !captchaCheckStore.data && (
        <div className="card-body m-1 p-3" onClick={(event) => Check(event)}>
          <i className="fa-solid fa-person btn btn-lg btn-outline-danger lead">
            <small className="m-1 p-3">я не робот!</small>
          </i>
        </div>
      )}
    </div>
  );
};
