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
import * as message from "../../components/ui/message";
import * as modal from "../../components/ui/modal";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const terminals = [
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

export const TerminalRebootPage = () => {
  // TODO store ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const terminalRebootStore = hook.useSelectorCustom2(
    slice.moderator.terminalRebootStore
  );

  // TODO hook /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  const [terminal, setTerminal, resetTerminal] = hook.useStateCustom1({
    ip: "",
  });

  const [isModalRebootOneVisible, setIsModalRebootOneVisible] = useState(false);
  const [isModalRebootAllVisible, setIsModalRebootAllVisible] = useState(false);

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (terminalRebootStore.data) {
      util.Delay(() => {
        dispatch({
          type: slice.moderator.terminalRebootStore.constant.reset,
        });
        resetTerminal();
      }, 10000);
    }
  }, [terminalRebootStore.data]);

  // TODO function /////////////////////////////////////////////////////////////////////////////////////////////////////

  const RebootOne = () => {
    dispatch(
      slice.moderator.terminalRebootStore.action({
        form: {
          ips: terminal.ip,
        },
      })
    );
  };

  const RebootAll = () => {
    // @ts-ignore
    let ips = [];
    terminals.forEach(function (object, index, array) {
      ips.push(object.Ip);
    });
    dispatch(
      slice.moderator.terminalRebootStore.action({
        form: {
          // @ts-ignore
          ips: ips,
        },
      })
    );
  };

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <message.Message.Danger>
        Все Ваши действия записываются в логи!
      </message.Message.Danger>
      <component.StatusStore1
        slice={slice.moderator.terminalRebootStore}
        consoleLog={constant.DEBUG_CONSTANT}
        dataText={"Успешно перезагружено(-ы)!"}
      />
      {terminalRebootStore.data && (
        <ol className="bg-light bg-opacity-75">
          {terminalRebootStore.data.map(
            // @ts-ignore
            (term) => (
              <li key={term} className="text-start">
                {term[0]}: {term[1]}
              </li>
            )
          )}
        </ol>
      )}
      <div className="card m-0 p-0">
        <div className="card-header m-0 p-1 bg-danger bg-opacity-10 lead fw-bold text-center">
          Выберите какой терминал нужно перезагрузить:
        </div>
        <div className="card-body m-0 p-0">
          <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center text-center m-0 p-0">
            <form
              className="m-0 p-0"
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setIsModalRebootOneVisible(true);
              }}
            >
              <div className="card-body m-0 p-0">
                <label className="form-control-sm text-center m-0 p-1">
                  Точка:
                  <div className="input-group">
                    <select
                      className="form-control form-control-sm text-center m-0 p-2"
                      required
                      value={terminal.ip}
                      onChange={(event) =>
                        setTerminal({
                          ...terminal,
                          ip: event.target.value,
                        })
                      }
                    >
                      <option value="">не указано</option>
                      {terminals.map((terminal, index) => (
                        <option key={terminal.Ip} value={terminal.Ip}>
                          {terminal.Header}
                        </option>
                      ))}
                    </select>
                    <modal.ModalConfirm1
                      isModalVisible={isModalRebootOneVisible}
                      setIsModalVisible={setIsModalRebootOneVisible}
                      description={"Перезагрузить выбранный терминал?"}
                      callback={() => RebootOne()}
                    />
                    <button
                      className="btn btn-sm btn-outline-danger m-1 p-2 custom-z-index-0"
                      type="submit"
                    >
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      перезагрузить выбранный
                    </button>
                    <modal.ModalConfirm1
                      isModalVisible={isModalRebootAllVisible}
                      setIsModalVisible={setIsModalRebootAllVisible}
                      description={"Перезагрузить ВСЕ терминалы?"}
                      callback={() => RebootAll()}
                    />
                    <button
                      className="btn btn-sm btn-danger w-100 m-1 p-2 custom-z-index-0"
                      type="button"
                      onClick={() => setIsModalRebootAllVisible(true)}
                    >
                      <i className="fa-solid fa-circle-check m-0 p-1" />
                      перезагрузить все
                    </button>
                  </div>
                </label>
              </div>
            </form>
          </ul>
        </div>
      </div>
    </base.Base1>
  );
};
