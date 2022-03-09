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
import HeaderComponent from "../../components/HeaderComponent";
import TitleComponent from "../../components/TitleComponent";
import FooterComponent from "../../components/FooterComponent";
import StoreStatusComponent from "../../components/StoreStatusComponent";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const RationalTemplatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  return (
    <div>
      <HeaderComponent logic={true} redirect={true} />
      <TitleComponent
        first={"Шаблон рац. предложения"}
        second={"страница содержит шаблон для рац. предложения"}
      />
      <main className="container-fluid text-center">
        <div className="">
          <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-2 nav justify-content-center">
            <li className="container-fluid m-1">
              <div className="card shadow">
                <div>
                  <div className="">
                    <div className="card-header">
                      <h6 className="lead fw-bold">
                        Внедрение солнечных панелей.
                      </h6>
                    </div>
                    <div className="d-flex w-100 align-items-center justify-content-between">
                      <label className="form-control-sm m-1">
                        Наименование структурного подразделения:
                        <select
                          className="form-control form-control-sm"
                          required
                        >
                          <option value="">Энергоуправление</option>
                        </select>
                      </label>
                      <label className="w-100 form-control-sm m-1">
                        Зарегистрировано за №{" "}
                        <strong className="btn btn-light disabled">
                          001-09-03-2022
                        </strong>
                      </label>
                    </div>
                    <div>
                      <label className="form-control-sm m-1">
                        Сфера рац. предложения:
                        <select
                          className="form-control form-control-sm"
                          required
                        >
                          <option value="">Технологическая</option>
                        </select>
                      </label>
                      <label className="form-control-sm m-1">
                        Категория:
                        <select
                          className="form-control form-control-sm"
                          required
                        >
                          <option value="">Инновации</option>
                        </select>
                      </label>
                      <div>
                        <label className="form-control-sm m-1">
                          <img
                            src="/static/img/modules/3_module_progress/2_section_rational/sectional_rational.png"
                            className="card-img-top img-fluid w-50"
                            alt="id"
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="w-100 form-control-sm m-1">
                        Предполагаемое место внедрения:
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          defaultValue="Участок связи"
                          placeholder="Цех / участок / отдел / лаборатория и т.п."
                          readOnly={true}
                          required
                          minLength="1"
                          maxLength="100"
                        />
                      </label>
                    </div>
                    <div>
                      <label className="w-100 form-control-sm m-1">
                        Краткое описание:
                        <textarea
                          className="form-control form-control-sm"
                          defaultValue="Зелёная экономика предлагает современные средства энергообеспечения"
                          readOnly={true}
                          required
                          placeholder="Краткое описание"
                          minLength="1"
                          maxLength="200"
                          rows="2"
                        />
                      </label>
                      <label className="w-100 form-control-sm m-1">
                        Полное описание:
                        <textarea
                          className="form-control form-control-sm"
                          defaultValue="Зелёная экономика предлагает современные средства энергообеспечения"
                          readOnly={true}
                          required
                          placeholder="Полное описание"
                          minLength="1"
                          maxLength="5000"
                          rows="3"
                        />
                      </label>
                    </div>
                    <div>
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
                    <div>
                      <label className="w-100 form-control-sm m-1">
                        Участники:
                        <input
                          type="text"
                          className="form-control form-control-sm m-1"
                          defaultValue="Иванов Иван Иванович 931778 70%"
                          readOnly={true}
                          minLength="0"
                          maxLength="200"
                        />
                        <input
                          type="text"
                          className="form-control form-control-sm m-1"
                          defaultValue="Иванов Иван Николаевич 931779 30%"
                          readOnly={true}
                          minLength="0"
                          maxLength="200"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="container-fluid text-center">
                    <a className="btn btn-sm btn-warning m-1" href="#">
                      Автор: Иванов Иван Иванович
                    </a>
                  </div>
                  <div className="container-fluid d-flex justify-content-between p-0">
                    <small className="text-muted border">
                      подано: <p>09-03-22 11:20</p>
                    </small>
                    <small className="text-muted border">
                      зарегистрировано: <p>09-03-22 11:55</p>
                    </small>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default RationalTemplatePage;
