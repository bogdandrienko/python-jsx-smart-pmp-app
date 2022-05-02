// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, MouseEvent } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as component from "./component";
import * as constant from "../constant";
import * as hook from "../hook";
import * as util from "../util";

import * as slice from "../slice";
import * as action from "../action";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const Captcha1 = () => {
  const dispatch = useDispatch();

  const captchaCheck = hook.useSelectorCustom2(slice.captcha.captchaCheckStore);

  useEffect(() => {
    if (captchaCheck.data) {
      util.Delay(
        () =>
          dispatch({ type: slice.captcha.captchaCheckStore.constant.reset }),
        30000
      );
    }
  }, [captchaCheck.data]);

  function Check(event: MouseEvent<HTMLDivElement>) {
    util.EventMouse1(event, true, true, () => {
      // dispatch(slice.captcha.captchaCheckStore.action({}));
      dispatch(
        slice.captcha.captchaCheckStore.action({
          id: 12,
          form: { search: "1234" },
        })
      );
      // dispatch(action.captcha.captchaCheckStore(1, { name: "00000000" }));
    });
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="card">
      {!captchaCheck.data && (
        <div className="card-header bg-danger bg-opacity-10 text-danger m-0 p-1">
          <i className="fa-solid fa-robot m-0 p-1 fw-bold lead" />
          Пройдите проверку на робота!
        </div>
      )}
      {captchaCheck.data && (
        <div className="card-header bg-success bg-opacity-10 text-success m-0 p-1">
          <i className={"fa-solid fa-user-check m-0 p-1 fw-bold lead"} />
          Вы успешно прошли проверку!
        </div>
      )}
      <component.StatusStore1
        slice={slice.captcha.captchaCheckStore}
        consoleLog={constant.DEBUG_CONSTANT}
        showData={false}
      />
      {!captchaCheck.load && !captchaCheck.data && (
        <div className="card-body m-1 p-3" onClick={(event) => Check(event)}>
          <i className="fa-solid fa-person btn btn-lg btn-outline-danger lead">
            <small className="m-1 p-3">я не робот!</small>
          </i>
        </div>
      )}
    </div>
  );
};
