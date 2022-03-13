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

const Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  return (
    <div className="m-0 p-0">
      <HeaderComponent
        logic={true}
        redirect={true}
        title={"Подробности идеи"}
        description={
          "страница содержит подробную информацию об идеи в банке идей"
        }
      />
      <main className="container p-0">
        <div className="card shadow">
          <div className="card-header bg-opacity-10 bg-primary m-0 p-0">
            <h6 className="lead fw-bold">Название</h6>
          </div>
          <div className="card-body m-0 p-0">
            <label className="form-control-sm">
              Подразделение:
              <select className="form-control form-control-sm" required>
                <option value="">Управление</option>
              </select>
            </label>
            <label className="form-control-sm">
              Сфера:
              <select className="form-control form-control-sm" required>
                <option value="">Технологическая</option>
              </select>
            </label>
            <label className="form-control-sm">
              Категория:
              <select className="form-control form-control-sm" required>
                <option value="">Инновации</option>
              </select>
            </label>
          </div>
          <div className="card-body m-0 p-0">
            <img
              src={utils.GetStaticFile("")}
              className="card-img-top img-fluid w-75"
              alt="изображение отсутствует"
            />
          </div>
          <div className="card-body m-0 p-0">
            <label className="w-50 form-control-sm">
              Место внедрения:
              <input
                type="text"
                className="form-control form-control-sm"
                defaultValue=""
                readOnly={true}
                placeholder="введите место внедрения тут..."
                required
                minLength="1"
                maxLength="100"
              />
            </label>
          </div>
          <div className="card-body m-0 p-0">
            <label className="w-100 form-control-sm">
              Описание:
              <textarea
                className="form-control form-control-sm"
                defaultValue=""
                readOnly={true}
                required
                placeholder="введите описание тут..."
                minLength="1"
                maxLength="3000"
                rows="3"
              />
            </label>
          </div>
          <div className="card-body m-0 p-0">
            <Link
              to={`#`}
              className="text-decoration-none btn btn-sm btn-warning"
            >
              Автор: Андриенко Богдан Техник-программист
            </Link>
          </div>
          <div className="card-body m-0 p-0">
            <label className="text-muted border p-1 m-1">
              подано: <p className="m-0 p-0">13-03-2022 23:38</p>
            </label>
            <label className="text-muted border p-1 m-1">
              зарегистрировано: <p className="m-0 p-0">13-03-2022 23:45</p>
            </label>
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default Page;
