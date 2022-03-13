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

const RationalTemplatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  return (
    <div>
      <HeaderComponent
        logic={true}
        redirect={true}
        title={"Пример рационализаторского предложения"}
        description={"страница содержит пример рационализаторского предложения"}
      />
      <main className="container-fluid text-center">
        <div className="">
          <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-2 nav justify-content-center">
            <div className="card shadow  ">
              <div className="card-header   bg-opacity-10 bg-primary">
                <h6 className="lead fw-bold">Внедрение солнечных панелей.</h6>
              </div>
              <div className="card-body  ">
                <label className="form-control-sm m-1">
                  Подразделение:
                  <select
                    id="subdivision"
                    name="subdivision"
                    required
                    className="form-control form-control-sm"
                  >
                    <option value="">Энергоуправление</option>
                  </select>
                </label>
                <label className="form-control-sm m-1">
                  Зарегистрировано за №{" "}
                  <strong className="btn btn-light disabled">
                    001-09-03-2022
                  </strong>
                </label>
              </div>

              <div className="card-body  ">
                <label className="form-control-sm m-1">
                  Сфера:
                  <select
                    id="sphere"
                    name="sphere"
                    required
                    className="form-control form-control-sm"
                  >
                    <option value="">Технологическая</option>
                  </select>
                </label>
                <label className="form-control-sm m-1">
                  Категория:
                  <select
                    id="category"
                    name="category"
                    required
                    className="form-control form-control-sm"
                  >
                    <option value="">Инновации</option>
                  </select>
                </label>
              </div>
              <div className="card-body  ">
                <img
                  src="/static/img/modules/3_module_progress/2_section_rational/sectional_rational.png"
                  className={"card-img-top img-fluid w-50"}
                  alt="id"
                />
              </div>
              <div className="card-body  ">
                <label className="w-100 form-control-sm">
                  Место внедрения:
                  <input
                    type="text"
                    id="name_char_field"
                    name="name_char_field"
                    required
                    placeholder="Цех / участок / отдел / лаборатория и т.п."
                    defaultValue="Участок связи"
                    readOnly={true}
                    minLength="1"
                    maxLength="100"
                    className="form-control form-control-sm"
                  />
                </label>
              </div>
              <div className="card-body  ">
                <label className="w-100 form-control-sm m-1">
                  Описание:
                  <textarea
                    required
                    placeholder="Полное описание"
                    defaultValue="Зелёная экономика предлагает современные средства энергообеспечения"
                    readOnly={true}
                    minLength="1"
                    maxLength="5000"
                    rows="3"
                    className="form-control form-control-sm"
                  />
                </label>
              </div>
              <div className="card-body  ">
                <label className="form-control-sm m-1">
                  Word файл-приложение:
                  <a className="btn btn-sm btn-primary m-1" href="">
                    Скачать документ
                  </a>
                </label>
                <label className="form-control-sm m-1">
                  Pdf файл-приложение:
                  <a className="btn btn-sm btn-danger m-1" href="">
                    Скачать документ
                  </a>
                </label>
                <label className="form-control-sm m-1">
                  Excel файл-приложение:
                  <a className="btn btn-sm btn-success m-1" href="">
                    Скачать документ
                  </a>
                </label>
              </div>
              <div className="card-body  ">
                <Link
                  to={`#`}
                  className="text-decoration-none btn btn-sm btn-warning"
                >
                  Автор: Иванов Иван Иванович
                </Link>
              </div>
              <label className="w-100 form-control-sm m-1">
                Участники:
                <input
                  type="text"
                  className="form-control form-control-sm"
                  defaultValue="Иванов Иван Иванович 931778 70%"
                  readOnly={true}
                  placeholder="участник № 1"
                  minLength="0"
                  maxLength="200"
                />
                <input
                  type="text"
                  className="form-control form-control-sm"
                  defaultValue="Иванов Иван Николаевич 931779 30%"
                  readOnly={true}
                  placeholder="участник № 2"
                  minLength="0"
                  maxLength="200"
                />
              </label>
              <div className="card-body  ">
                <label className="text-muted border p-1 m-1">
                  подано: <p className="">09-03-22 11:20</p>
                </label>
                <label className="text-muted border p-1 m-1">
                  зарегистрировано: <p className="">09-03-22 11:55</p>
                </label>
              </div>
            </div>
          </ul>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default RationalTemplatePage;
