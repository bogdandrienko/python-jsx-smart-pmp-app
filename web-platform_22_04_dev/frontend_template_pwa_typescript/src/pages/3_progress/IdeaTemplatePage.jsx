"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaTemplatePage = void 0;
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_bootstrap_1 = require("react-bootstrap");
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
var util = require("../../components/util");
var base = require("../../components/ui/base");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var IdeaTemplatePage = function () {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
    return (<base.BaseComponent1>
      <ul className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 justify-content-center text-center shadow m-0 p-1">
        <div className="card shadow custom-background-transparent-low m-0 p-0">
          <div className="card-header bg-warning bg-opacity-10 m-0 p-3">
            <h6 className="lead fw-bold m-0 p-0">
              Веб платформа управления изменениями
            </h6>
          </div>
          <div className="card-body m-0 p-0">
            <div className="m-0 p-0">
              <label className="form-control-sm text-center m-0 p-1">
                Подразделение:
                <select className="form-control form-control-sm text-center m-0 p-1" required>
                  <option className="m-0 p-0" value="">
                    управление предприятия
                  </option>
                </select>
              </label>
              <label className="form-control-sm text-center m-0 p-1">
                Сфера:
                <select className="form-control form-control-sm text-center m-0 p-1" required>
                  <option className="m-0 p-0" value="">
                    не технологическая
                  </option>
                </select>
              </label>
              <label className="form-control-sm text-center m-0 p-1">
                Категория:
                <select className="form-control form-control-sm text-center m-0 p-1" required>
                  <option className="m-0 p-0" value="">
                    инновации
                  </option>
                </select>
              </label>
            </div>
            <div className="m-0 p-0">
              <img src={util.GetStaticFile("/media/default/idea/template_idea.jpg")} className="img-fluid img-thumbnail w-75 m-1 p-0" alt="изображение отсутствует"/>
            </div>
            <div className="m-0 p-0">
              <label className="form-control-sm text-center w-50 m-0 p-1">
                Место изменения:
                <input type="text" className="form-control form-control-sm text-center m-0 p-1" defaultValue="Всё предприятие" readOnly={true}/>
              </label>
            </div>
            <div className="m-0 p-0">
              <label className="form-control-sm text-center w-100 m-0 p-1">
                Описание:
                <textarea className="form-control form-control-sm text-center m-0 p-1" defaultValue="Предлагаю разработать веб-платформу с модульной системой, которая будет включать: расчётные листы, отпуска, рационализаторство и проектную деятельность, чат и многое другое." readOnly={true} rows={3}/>
              </label>
            </div>
            <div className="m-0 p-0">
              <react_router_dom_1.Link to={"#"} className="btn btn-sm btn-warning m-0 p-2">
                Автор: Андриенко Богдан Техник-программист
              </react_router_dom_1.Link>
            </div>
            <div className="d-flex justify-content-between m-0 p-1">
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
              <react_bootstrap_1.Navbar className="text-center m-0 p-0">
                <react_bootstrap_1.Container className="m-0 p-0">
                  <react_bootstrap_1.Nav className="me-auto dropdown m-0 p-0">
                    <react_bootstrap_1.NavDropdown title="10 /  1" className="btn btn-sm bg-success bg-opacity-50 badge rounded-pill">
                      <ul className="m-0 p-0">
                        <li className="list-group-item bg-success bg-opacity-10">
                          <small className="">Андриенко Богдан : 10</small>
                        </li>
                      </ul>
                    </react_bootstrap_1.NavDropdown>
                  </react_bootstrap_1.Nav>
                </react_bootstrap_1.Container>
              </react_bootstrap_1.Navbar>
              <span className="m-0 p-1">
                <i style={{
            color: "#00ff00",
        }} className="fas fa-star m-0 p-0"/>
                <i style={{
            color: "#00ff00",
        }} className="fas fa-star m-0 p-0"/>
                <i style={{
            color: "#00ff00",
        }} className="fas fa-star m-0 p-0"/>
                <i style={{
            color: "#00ff00",
        }} className="fas fa-star m-0 p-0"/>
                <i style={{
            color: "#00ff00",
        }} className="fas fa-star m-0 p-0"/>
                <i style={{
            color: "#00ff00",
        }} className="fas fa-star m-0 p-0"/>
                <i style={{
            color: "#00ff00",
        }} className="fas fa-star m-0 p-0"/>
                <i style={{
            color: "#00ff00",
        }} className="fas fa-star m-0 p-0"/>
                <i style={{
            color: "#00ff00",
        }} className="fas fa-star m-0 p-0"/>
                <i style={{
            color: "#00ff00",
        }} className="fas fa-star m-0 p-0"/>
              </span>
            </div>
            <div className="d-flex justify-content-between m-0 p-1">
              <span className="text-secondary m-0 p-1">Комментарии</span>
              <span className="badge bg-secondary rounded-pill m-0 p-2">1</span>
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
    </base.BaseComponent1>);
};
exports.IdeaTemplatePage = IdeaTemplatePage;
