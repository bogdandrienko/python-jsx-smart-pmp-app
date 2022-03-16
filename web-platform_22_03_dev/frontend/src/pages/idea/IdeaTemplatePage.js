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

export const IdeaTemplatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  return (
    <div>
      <HeaderComponent
        logic={true}
        redirect={true}
        title={"Пример (шаблон) идеи"}
        description={"страница содержит пример (шаблон) идеи в банке идей"}
      />
      <main className="container">
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center">
          <div className="card shadow text-center p-0">
            <div className="card-header bg-warning bg-opacity-10">
              <h6 className="lead fw-bold">
                Веб-платформа управления изменениями
              </h6>
            </div>
            <div className="card-body">
              <div>
                <label className="form-control-sm">
                  Подразделение:
                  <select className="form-control form-control-sm" required>
                    <option value="">управление</option>
                  </select>
                </label>
                <label className="form-control-sm">
                  Сфера:
                  <select className="form-control form-control-sm" required>
                    <option value="">не технологическая</option>
                  </select>
                </label>
                <label className="form-control-sm">
                  Категория:
                  <select className="form-control form-control-sm" required>
                    <option value="">инновации</option>
                  </select>
                </label>
              </div>
              <div></div>
              <div>
                <img
                  src={utils.GetStaticFile(
                    "/media/default/idea/template_idea.jpg"
                  )}
                  className="img-fluid img-thumbnail w-75"
                  alt="изображение отсутствует"
                />
              </div>
              <div>
                <label className="form-control-sm w-50">
                  Место изменения:
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    defaultValue="Глобально(всё предприятие)"
                    readOnly={true}
                    placeholder="введите место изменения тут..."
                    required
                    minLength="1"
                    maxLength="100"
                  />
                </label>
              </div>
              <div>
                <label className="form-control-sm w-100">
                  Описание:
                  <textarea
                    className="form-control form-control-sm"
                    defaultValue="Предлагаю разработать веб-платформу с модульной системой, которая будет включать: расчётные листы, отпуска, рационализаторство и проектную деятельность, чат и многое другое."
                    readOnly={true}
                    required
                    placeholder="введите описание тут..."
                    minLength="1"
                    maxLength="3000"
                    rows="3"
                  />
                </label>
              </div>
              <div>
                <Link
                  to={`#`}
                  className="text-decoration-none btn btn-sm btn-warning"
                >
                  Автор: Андриенко Богдан Техник-программист
                </Link>
              </div>
              <div>
                <label className="text-muted border p-1 m-1">
                  подано: <p className="m-0 p-0">15-02-2021 11:00</p>
                </label>
                <label className="text-muted border p-1 m-1">
                  зарегистрировано: <p className="m-0 p-0">16-02-2021 14:00</p>
                </label>
              </div>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-between p-1">
                <span className="text-success">Рейтинг</span>
                <span>
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star"
                  />
                </span>
                <span className="badge bg-success rounded-pill">
                  10
                  {" \\  "}
                  <small className="text-uppercase">1</small>
                </span>
              </div>
              <div className="d-flex justify-content-between p-1">
                <span className="text-secondary">Комментарии</span>
                <span className="badge bg-secondary rounded-pill">1</span>
              </div>
            </div>
            <ul className="list-group">
              <li className="list-group-item">
                <div className="d-flex justify-content-between p-1">
                  <h6 className="">Андриенко Богдан</h6>
                  <span className="text-muted">17-02-2021 15:00</span>
                </div>
                <div className="d-flex justify-content-center p-1">
                  <small className="text-muted">Это очень полезная идея!</small>
                </div>
              </li>
            </ul>
          </div>
        </ul>
      </main>
      <FooterComponent />
    </div>
  );
};
