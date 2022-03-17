import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Spinner,
  Alert,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import ReactPlayer from "react-player";
import axios from "axios";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as utils from "../../js/utils";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HeaderComponent from "../base/HeaderComponent";
import FooterComponent from "../base/FooterComponent";
import StoreStatusComponent from "../base/StoreStatusComponent";
import MessageComponent from "../base/MessageComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import NewsComponent from "../base/NewsComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const TerminalRebootPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  const [ip, ipSet] = useState("");

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

  return (
    <div>
      <HeaderComponent
        logic={true}
        redirect={true}
        title={"Терминалы"}
        description={"страница функционала по терминалам"}
      />
      <main className="container">
        <div className="card m-0 p-0">
          <div className="card-header m-0 p-0 bg-danger bg-opacity-10 lead fw-bold">
            Выберите какой терминал нужно перезагрузить:
          </div>
          <div className="card-body m-0 p-0">
            <ul className="row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
              <form className="m-0 p-0" onSubmit={handlerRestartSubmit}>
                <div className="card-body m-0 p-0">
                  <label className="form-control-sm">
                    Точка:
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
                    <small className="text-danger">* обязательно</small>
                  </label>
                </div>
              </form>
            </ul>
            <div className="container">
              <hr />
              <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center">
                <button
                  className="btn btn-sm btn-outline-danger m-1 p-1"
                  onClick={handlerRestartSubmit}
                >
                  перезагрузить выбранное устройство
                </button>
                <button
                  className="btn btn-sm btn-danger m-1 p-1"
                  onClick={handlerRestartAllSubmit}
                >
                  перезагрузить все устройства
                </button>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};
