// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as util from "../../components/util";

import * as base from "../../components/ui/base";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export function IdeaTemplatePage(): JSX.Element {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <base.Base1>
      <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
        <div className="card shadow custom-background-transparent-low text-center p-0">
          <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
            <h6 className="lead fw-bold m-0 p-0">
              Веб платформа управления изменениями
            </h6>
          </div>
          <div className="card-body m-0 p-0">
            <div className="m-0 p-0">
              <label className="form-control-sm text-center m-0 p-1">
                Подразделение:
                <select
                  className="form-control form-control-sm text-center m-0 p-1"
                  required
                >
                  <option className="m-0 p-0" value="">
                    управление предприятия
                  </option>
                </select>
              </label>
              <label className="form-control-sm text-center m-0 p-1">
                Сфера:
                <select
                  className="form-control form-control-sm text-center m-0 p-1"
                  required
                >
                  <option className="m-0 p-0" value="">
                    не технологическая
                  </option>
                </select>
              </label>
              <label className="form-control-sm text-center m-0 p-1">
                Категория:
                <select
                  className="form-control form-control-sm text-center m-0 p-1"
                  required
                >
                  <option className="m-0 p-0" value="">
                    инновации
                  </option>
                </select>
              </label>
            </div>
            <div className="m-0 p-0">
              <img
                src={util.GetStaticFile(
                  "/media/default/idea/template_idea.jpg"
                )}
                className="img-fluid img-thumbnail w-75 m-1 p-0"
                alt="изображение отсутствует"
              />
            </div>
            <div className="m-0 p-0">
              <label className="form-control-sm text-center w-50 m-0 p-1">
                Место изменения:
                <input
                  type="text"
                  className="form-control form-control-sm text-center m-0 p-1"
                  defaultValue="Всё предприятие"
                  readOnly={true}
                  placeholder="введите место изменения тут..."
                  required
                  minLength={1}
                  maxLength={300}
                />
              </label>
            </div>
            <div className="m-0 p-0">
              <label className="form-control-sm text-center w-100 m-0 p-1">
                Описание:
                <textarea
                  className="form-control form-control-sm text-center m-0 p-1"
                  defaultValue="Предлагаю разработать веб-платформу с модульной системой, которая будет включать: расчётные листы, отпуска, рационализаторство и проектную деятельность, чат и многое другое."
                  readOnly={true}
                  required
                  placeholder="введите описание тут..."
                  minLength={1}
                  maxLength={3000}
                  rows={3}
                />
              </label>
            </div>
            <div className="d-flex justify-content-between m-1 p-0">
              <label className="text-muted border m-0 p-2">
                подано: <p className="m-0">15-02-2021 11:00</p>
              </label>
              <label className="text-muted border m-1 p-2">
                зарегистрировано: <p className="m-0 p-0">16-02-2021 14:00</p>
              </label>
            </div>
          </div>
          <div className="card-footer m-0 p-1">
            <div className="d-flex justify-content-between m-0 p-1">
              <span className={"text-success m-0 p-1"}>Рейтинг</span>
              <Navbar className="text-center m-0 p-0">
                <div className="m-0 p-0">
                  <small>Рейтинг / голоса</small>
                </div>
                <Container className="m-0 p-0">
                  <Nav className="me-auto dropdown m-0 p-0">
                    <NavDropdown
                      title={"10 /  1"}
                      className={
                        "btn btn-sm bg-success bg-opacity-50 badge rounded-pill"
                      }
                    >
                      <ul className="m-0 p-0">
                        <li
                          className={"list-group-item bg-success bg-opacity-10"}
                        >
                          <small className="">Андриенко Богдан : 10</small>
                        </li>
                      </ul>
                    </NavDropdown>
                  </Nav>
                </Container>
              </Navbar>
              <span className="m-0 p-1">
                <div className="m-0 p-0">
                  Нажмите на одну из 10 звезд для оценки идеи:
                </div>
                <i
                  style={{ color: "#00ff00" }}
                  className={"btn fas fa-star m-0 p-0"}
                />
                <i
                  style={{ color: "#00ff00" }}
                  className={"btn fas fa-star m-0 p-0"}
                />
                <i
                  style={{ color: "#00ff00" }}
                  className={"btn fas fa-star m-0 p-0"}
                />
                <i
                  style={{ color: "#00ff00" }}
                  className={"btn fas fa-star m-0 p-0"}
                />
                <i
                  style={{ color: "#00ff00" }}
                  className={"btn fas fa-star m-0 p-0"}
                />
                <i
                  style={{ color: "#00ff00" }}
                  className={"btn fas fa-star m-0 p-0"}
                />
                <i
                  style={{ color: "#00ff00" }}
                  className={"btn fas fa-star m-0 p-0"}
                />
                <i
                  style={{ color: "#00ff00" }}
                  className={"btn fas fa-star m-0 p-0"}
                />
                <i
                  style={{ color: "#00ff00" }}
                  className={"btn fas fa-star m-0 p-0"}
                />
                <i
                  style={{ color: "#00ff00" }}
                  className={"btn fas fa-star m-0 p-0"}
                />
                <div className="m-0 p-0">Ваша оценка</div>
              </span>
            </div>
            <div className="d-flex justify-content-between m-0 p-1">
              <span className="text-secondary m-0 p-1">Комментарии</span>
              <i className="fa-solid fa-comment m-0 p-1">1</i>
            </div>
          </div>
          <div className="card-footer m-0 p-0">
            <div className="card m-0 p-2">
              <div className="order-md-last m-0 p-0">
                <ul className="list-group m-0 p-0">
                  <li className="list-group-item m-0 p-1">
                    <div className="d-flex justify-content-between m-0 p-0">
                      <h6 className="btn btn-sm btn-outline-warning m-0 p-2">
                        Андриенко Богдан
                      </h6>
                      <span className="text-muted m-0 p-0">
                        16-02-2021 15:00
                      </span>
                    </div>
                    <div className="d-flex justify-content-center m-0 p-1">
                      <small className="text-muted m-0 p-1">
                        Отличная идея!
                      </small>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </base.Base1>
  );
}
