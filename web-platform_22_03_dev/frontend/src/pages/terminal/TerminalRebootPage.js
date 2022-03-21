///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React, { useState } from "react";
import { useDispatch } from "react-redux";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const TerminalRebootPage = () => {
  ////////////////////////////////////////////////////////////////////////////////////////////TODO react hooks variables
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO custom variables
  const [ip, ipSet] = useState("");
  /////////////////////////////////////////////////////////////////////////////////////////////////////////TODO handlers
  const handlerRestartSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    let ips = [];
    ips.push(ip);
    const form = {
      "Action-type": "TERMINAL_REBOOT",
      ips: ips,
    };
    let isConfirm = window.confirm(
      "Вы хотите перезагрузить выбранный терминал?"
    );
    if (isConfirm) {
      dispatch(actions.terminalRebootAction(form));
    }
  };
  //////////////////////////////////////////////////////////
  const handlerRestartAllSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    let ips = [];
    constants.terminals.forEach(function (object, index, array) {
      ips.push(object.Ip);
    });
    const form = {
      "Action-type": "TERMINAL_REBOOT",
      ips: ips,
    };
    let isConfirm = window.confirm("Вы хотите перезагрузить ВСЕ терминалы?");
    if (isConfirm) {
      dispatch(actions.terminalRebootAction(form));
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
      <components.HeaderComponent />
      <main>
        <div className="card m-0 p-0">
          <div className="card-header m-0 p-1 bg-danger bg-opacity-10 lead fw-bold">
            Выберите какой терминал нужно перезагрузить:
          </div>
          <div className="card-body m-0 p-0">
            <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center m-0 p-0">
              <form className="m-0 p-0" onSubmit={handlerRestartSubmit}>
                <div className="card-body m-0 p-0">
                  <label className="form-control-sm">
                    Точка:
                    <div className="input-group">
                      <select
                        className="form-control form-control-sm"
                        value={ip}
                        required
                        onChange={(e) => ipSet(e.target.value)}
                      >
                        <option value="">не указано</option>
                        {constants.terminals.map((object, index) => (
                          <option value={object.Ip}>{object.Header}</option>
                        ))}
                      </select>
                      <button
                        className="btn btn-sm btn-outline-danger m-1 p-1"
                        type="submit"
                      >
                        перезагрузить выбранное устройство
                      </button>
                      <button
                        className="btn btn-sm btn-danger m-1 p-1"
                        onClick={handlerRestartAllSubmit}
                      >
                        перезагрузить все устройства
                      </button>
                    </div>
                    <small className="text-danger">* обязательно</small>
                  </label>
                </div>
              </form>
            </ul>
          </div>
        </div>
      </main>
      <components.FooterComponent />
    </body>
  );
};
