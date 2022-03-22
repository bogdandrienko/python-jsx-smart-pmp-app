///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import React from "react";
import { Link } from "react-router-dom";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import * as components from "../../js/components";
import * as utils from "../../js/utils";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const RationalTemplatePage = () => {
  //////////////////////////////////////////////////////////////////////////////////////////////////////TODO return page
  return (
    <body>
      <components.HeaderComponent />
      <main>
        <div className="m-0 p-0">
          <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-2 justify-content-center m-0 p-0">
            <div className="card shadow m-0 p-0">
              <div className="card-header m-0 p-0 bg-warning bg-opacity-10 m-0 p-0">
                <h6 className="lead fw-bold">
                  Веб-платформа управления изменениями
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
                      <option value="">энергоуправление</option>
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
                      <option value="">не технологическая</option>
                    </select>
                  </label>
                  <label className="form-control-sm text-center m-0 p-1">
                    Категория:
                    <select
                      className="form-control form-control-sm text-center m-0 p-1"
                      required
                    >
                      <option value="">инновации</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="card-body m-0 p-0">
                <img
                  src={utils.GetStaticFile(
                    "/media/default/rational/template_rational.jpg"
                  )}
                  className="card-img-top img-fluid w-75"
                  alt="изображение отсутствует"
                />
              </div>
              <div className="card-body m-0 p-0">
                <label className="w-50 form-control-sm">
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
              <div className="card-body m-0 p-0">
                <label className="w-100 form-control-sm">
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
              <div className="card-body m-0 p-0">
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
              <div className="card-body m-0 p-0">
                <Link
                  to={`#`}
                  className="text-decoration-none btn btn-sm btn-warning"
                >
                  Автор: Андриенко Богдан Техник-программист
                </Link>
              </div>
              <div className="card-body m-0 p-0">
                <label className="w-100 form-control-sm m-1">
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
              <div className="card-body m-0 p-0">
                <label className="text-muted border p-1 m-1">
                  подано: <p className="m-0 p-0">15-02-2021 11:00</p>
                </label>
                <label className="text-muted border p-1 m-1">
                  зарегистрировано: <p className="m-0 p-0">16-02-2021 14:00</p>
                </label>
              </div>
              <div className="card p-2">
                <div className="order-md-last">
                  <h6 className="d-flex justify-content-between align-items-center m-0 p-0">
                    <span className="text-success">Рейтинг</span>
                    <span className="badge bg-success rounded-pill">
                      10
                      {"\\  "}
                      <small className="text-uppercase">1</small>
                    </span>
                  </h6>
                  <div>
                    <span>
                      <i
                        style={{
                          color: "#00ff00",
                        }}
                        className="fas fa-star"
                      />
                    </span>
                    <span>
                      <i
                        style={{
                          color: "#00ff00",
                        }}
                        className="fas fa-star"
                      />
                    </span>
                    <span>
                      <i
                        style={{
                          color: "#00ff00",
                        }}
                        className="fas fa-star"
                      />
                    </span>
                    <span>
                      <i
                        style={{
                          color: "#00ff00",
                        }}
                        className="fas fa-star"
                      />
                    </span>
                    <span>
                      <i
                        style={{
                          color: "#00ff00",
                        }}
                        className="fas fa-star"
                      />
                    </span>
                    <span>
                      <i
                        style={{
                          color: "#00ff00",
                        }}
                        className="fas fa-star"
                      />
                    </span>
                    <span>
                      <i
                        style={{
                          color: "#00ff00",
                        }}
                        className="fas fa-star"
                      />
                    </span>
                    <span>
                      <i
                        style={{
                          color: "#00ff00",
                        }}
                        className="fas fa-star"
                      />
                    </span>
                    <span>
                      <i
                        style={{
                          color: "#00ff00",
                        }}
                        className="fas fa-star"
                      />
                    </span>
                    <span>
                      <i
                        style={{
                          color: "#00ff00",
                        }}
                        className="fas fa-star"
                      />
                    </span>
                  </div>
                </div>
                <div className="order-md-last">
                  <h6 className="d-flex justify-content-between align-items-center m-0 p-0">
                    <span className="text-secondary">Комментарии</span>
                    <span className="badge bg-secondary rounded-pill">1</span>
                  </h6>
                </div>
              </div>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">Андриенко Богдан</h6>
                    <small className="text-muted">
                      Это очень полезная идея!
                    </small>
                  </div>
                  <span className="text-muted">17-02-2021 15:00</span>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </main>
      <components.FooterComponent />
    </body>
  );
};
