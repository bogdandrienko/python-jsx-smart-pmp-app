// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as utils from "../../js/utils";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const TerminalRebootPage = () => {
  // TODO react hooks variables ////////////////////////////////////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  const [ip, ipSet] = useState("");
  const terminals = [
    {
      Header: "Управление, вход",
      Name: "1_in_upravlenie",
      Ip: "192.168.1.207",
    },
    {
      Header: "Управление, выход",
      Name: "1_out_upravlenie",
      Ip: "192.168.1.208",
    },
    {
      Header: "АТП, вход",
      Name: "2_in_atp",
      Ip: "192.168.8.220",
    },
    {
      Header: "АТП, выход",
      Name: "2_out_atp",
      Ip: "192.168.8.221",
    },
    {
      Header: "ОК, вход 1",
      Name: "3_1_in_ok",
      Ip: "192.168.15.131",
    },
    {
      Header: "ОК, выход 1",
      Name: "3_1_out_ok",
      Ip: "192.168.15.132",
    },
    {
      Header: "ОК, вход 2",
      Name: "3_2_in_ok",
      Ip: "192.168.15.133",
    },
    {
      Header: "ОК, выход 2",
      Name: "3_2_out_ok",
      Ip: "192.168.15.134",
    },
    {
      Header: "ОК, вход 3",
      Name: "3_3_in_ok",
      Ip: "192.168.15.135",
    },
    {
      Header: "ОК, выход 3",
      Name: "3_3_out_ok",
      Ip: "192.168.15.136",
    },
    {
      Header: "АБК ОК, вход",
      Name: "4_in_abk_ok",
      Ip: "192.168.2.6",
    },
    {
      Header: "АБК ОК, выход",
      Name: "4_out_abk_ok",
      Ip: "192.168.2.7",
    },
    {
      Header: "ДСК",
      Name: "5_dsk",
      Ip: "192.168.23.251",
    },
    {
      Header: "Связь",
      Name: "6_svyaz",
      Ip: "192.168.16.253",
    },
    {
      Header: "Рудоуправление, вход",
      Name: "7_in_rudoupravlenie",
      Ip: "192.168.5.202",
    },
    {
      Header: "Рудоуправление, выход",
      Name: "7_out_rudoupravlenie",
      Ip: "192.168.5.203",
    },
    {
      Header: "ПЖДТ, вход",
      Name: "8_in_pzhdt",
      Ip: "192.168.12.207",
    },
    {
      Header: "ПЖДТ, выход",
      Name: "8_out_pzhdt",
      Ip: "192.168.12.208",
    },
    {
      Header: "Ст. Северная",
      Name: "9_severnaya",
      Ip: "192.168.19.253",
    },
  ];
  // TODO react store variables ////////////////////////////////////////////////////////////////////////////////////////
  const terminalRebootStore = useSelector((state) => state.terminalRebootStore);
  const {
    //   // load: loadTerminalReboot,
    data: dataTerminalReboot,
    //   // error: errorTerminalReboot,
    //   // fail: failTerminalReboot,
  } = terminalRebootStore;
  // TODO handlers /////////////////////////////////////////////////////////////////////////////////////////////////////
  const handlerRestartSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    let isConfirm = window.confirm(
      "Вы хотите перезагрузить выбранный терминал?"
    );
    if (isConfirm) {
      let ips = [];
      ips.push(ip);
      const form = {
        "Action-type": "TERMINAL_REBOOT",
        ips: ips,
      };
      dispatch(
        utils.ActionConstructorUtility(
          form,
          "/api/auth/admin/terminal_reboot/",
          "POST",
          30000,
          constants.TERMINAL_REBOOT
        )
      );
    }
  };
  //////////////////////////////////////////////////////////
  const handlerRestartAllSubmit = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {}
    let isConfirm = window.confirm("Вы хотите перезагрузить ВСЕ терминалы?");
    if (isConfirm) {
      let ips = [];
      terminals.forEach(function (object, index, array) {
        ips.push(object.Ip);
      });
      const form = {
        "Action-type": "TERMINAL_REBOOT",
        ips: ips,
      };
      dispatch(
        utils.ActionConstructorUtility(
          form,
          "/api/auth/admin/terminal_reboot/",
          "POST",
          30000,
          constants.TERMINAL_REBOOT
        )
      );
    }
  };
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <components.MessageComponent variant={"danger"}>
          Внимание! ВСЕ Ваши действия записываются в логи!
        </components.MessageComponent>
        <components.StoreStatusComponent
          storeStatus={terminalRebootStore}
          keyStatus={"terminalRebootStore"}
          consoleLog={constants.DEBUG_CONSTANT}
          showLoad={true}
          loadText={""}
          showData={true}
          dataText={"Успешно перезагружен(-ы)!"}
          showError={true}
          errorText={""}
          showFail={true}
          failText={""}
        />
        {dataTerminalReboot && (
          <ol className="bg-light bg-opacity-75">
            {dataTerminalReboot.map((term) => (
              <li key={term} className="">
                {term[0]}:{" "}
                {term[1].split("<statusString>")[1].split("</statusString>")[0]}
              </li>
            ))}
          </ol>
        )}
        <div className="card m-0 p-0">
          <div className="card-header m-0 p-1 bg-danger bg-opacity-10 lead fw-bold text-center">
            Выберите какой терминал нужно перезагрузить:
          </div>
          <div className="card-body m-0 p-0">
            <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center m-0 p-0">
              <form className="m-0 p-0" onSubmit={handlerRestartSubmit}>
                <div className="card-body m-0 p-0">
                  <label className="form-control-sm text-center m-0 p-1">
                    Точка:
                    <div className="input-group">
                      <select
                        className="form-control form-control-sm text-center m-0 p-2"
                        value={ip}
                        required
                        onChange={(e) => ipSet(e.target.value)}
                      >
                        <option value="">не указано</option>
                        {terminals.map((terminal, index) => (
                          <option key={terminal.Ip} value={terminal.Ip}>
                            {terminal.Header}
                          </option>
                        ))}
                      </select>
                      <button
                        className="btn btn-sm btn-outline-danger m-1 p-2"
                        type="submit"
                      >
                        <i className="fa-solid fa-circle-check m-0 p-1" />
                        перезагрузить выбранное устройство
                      </button>
                      <button
                        className="btn btn-sm btn-danger m-1 p-2"
                        onClick={handlerRestartAllSubmit}
                      >
                        <i className="fa-solid fa-circle-check m-0 p-1" />
                        перезагрузить все устройства
                      </button>
                    </div>
                  </label>
                </div>
              </form>
            </ul>
          </div>
        </div>
      </main>
      <components.FooterComponent />
    </div>
  );
};
