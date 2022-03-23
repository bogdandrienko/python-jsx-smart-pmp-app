///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React from "react";
import { Link } from "react-router-dom";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as utils from "../../js/utils";
import { Container, Nav, Navbar } from "react-bootstrap";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const RationalTemplatePage = () => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <div>
      <components.HeaderComponent />
      <main>
        <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
          <div className="card shadow custom-background-transparent-low m-0 p-0">
            <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
              <h6 className="lead fw-bold m-0 p-0">
                Тренажёр виртуальной реальности
              </h6>
            </div>
            <div className="card-body m-0 p-0">
              <div className="d-flex justify-content-between m-0 p-1">
                <label className="form-control-sm text-center m-0 p-1">
                  Подразделение:
                  <select
                    className="form-control form-control-sm text-center m-0 p-1"
                    required
                  >
                    <option className="m-0 p-0" value="">
                      энергоуправление
                    </option>
                  </select>
                </label>
                <label className="form-control-sm text-center m-0 p-1">
                  Зарегистрировано за №{" "}
                  <strong className="btn btn-light disabled">
                    000-01-03-2020
                  </strong>
                </label>
              </div>
              <div className="m-0 p-0">
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
                  src={utils.GetStaticFile(
                    "/media/default/rational/template_rational.jpg"
                  )}
                  className="img-fluid img-thumbnail w-75 m-1 p-0"
                  alt="изображение отсутствует"
                />
              </div>
              <div className="m-0 p-0">
                <label className="form-control-sm text-center w-50 m-0 p-1">
                  Место внедрения:
                  <input
                    type="text"
                    className="form-control form-control-sm text-center m-0 p-1"
                    defaultValue="Учебный центр АО 'Костанайские Минералы'"
                    readOnly={true}
                    placeholder="введите место внедрения тут..."
                    required
                    minLength="1"
                    maxLength="100"
                  />
                </label>
              </div>
              <div className="m-0 p-0">
                <label className="form-control-sm text-center w-100 m-0 p-1">
                  Описание:
                  <textarea
                    className="form-control form-control-sm text-center m-0 p-1"
                    defaultValue="Предлагаю разработать симулятор виртуальной реальности для обучения персонала особо опасным действиям в условиях, приближенных к реальности."
                    readOnly={true}
                    required
                    placeholder="введите описание тут..."
                    minLength="1"
                    maxLength="3000"
                    rows="3"
                  />
                </label>
              </div>
              <div className="m-0 p-0">
                <label className="form-control-sm text-center m-0 p-1">
                  Word файл-приложение:
                  <a className="btn btn-sm btn-primary m-1" href="">
                    Скачать документ
                  </a>
                </label>
                <label className="form-control-sm text-center m-0 p-1">
                  Pdf файл-приложение:
                  <a className="btn btn-sm btn-danger m-1" href="">
                    Скачать документ
                  </a>
                </label>
                <label className="form-control-sm text-center m-0 p-1">
                  Excel файл-приложение:
                  <a className="btn btn-sm btn-success m-1" href="">
                    Скачать документ
                  </a>
                </label>
              </div>
              <div className="m-0 p-0">
                <Link to={`#`} className="btn btn-sm btn-warning m-0 p-2">
                  Автор: Андриенко Богдан Техник-программист
                </Link>
              </div>
              <div className="m-0 p-0">
                <label className="w-100 form-control-sm m-0 p-1">
                  Участники:
                  <input
                    type="text"
                    className="form-control form-control-sm text-center m-0 p-1"
                    defaultValue="Иванов Иван Иванович 931778 70%"
                    readOnly={true}
                    placeholder="участник № 1"
                    minLength="0"
                    maxLength="200"
                  />
                  <input
                    type="text"
                    className="form-control form-control-sm text-center m-0 p-1"
                    defaultValue="Иванов Иван Николаевич 931779 30%"
                    readOnly={true}
                    placeholder="участник № 2"
                    minLength="0"
                    maxLength="200"
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
                <span className="text-success m-0 p-1">Рейтинг</span>
                <Navbar className="text-center m-0 p-0">
                  <Container className="m-0 p-0">
                    <Nav className="me-auto m-0 p-0">
                      <p className="btn btn-sm bg-success bg-opacity-50 badge rounded-pill m-0 p-2">
                        10
                        <small className="align-text-top m-0 p-0">
                          {" \\ 1"}
                        </small>
                      </p>
                    </Nav>
                  </Container>
                </Navbar>
                <span className="m-0 p-1">
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star m-0 p-0"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star m-0 p-0"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star m-0 p-0"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star m-0 p-0"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star m-0 p-0"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star m-0 p-0"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star m-0 p-0"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star m-0 p-0"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star m-0 p-0"
                  />
                  <i
                    style={{
                      color: "#00ff00",
                    }}
                    className="fas fa-star m-0 p-0"
                  />
                </span>
              </div>
              <div className="d-flex justify-content-between m-0 p-1">
                <span className="text-secondary m-0 p-1">Комментарии</span>
                <span className="badge bg-secondary rounded-pill m-0 p-2">
                  1
                </span>
              </div>
            </div>
            <div className="card-footer m-0 p-0">
              <ul className="list-group m-0 p-0">
                <li className="list-group-item m-0 p-1">
                  <div className="d-flex justify-content-between m-0 p-1">
                    <h6 className="m-0 p-0">Андриенко Богдан</h6>
                    <span className="text-muted m-0 p-0">17-02-2021 15:00</span>
                  </div>
                  <div className="d-flex justify-content-center m-0 p-1">
                    <small className="text-muted m-0 p-1">
                      Это очень полезная идея!
                    </small>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </ul>
      </main>
      <components.FooterComponent />
    </div>
  );
};
