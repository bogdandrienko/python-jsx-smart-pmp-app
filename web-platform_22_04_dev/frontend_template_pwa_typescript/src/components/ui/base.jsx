"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponent4 = exports.BaseComponent3 = exports.BaseComponent2 = exports.BaseComponent1 = void 0;
var react_1 = require("react");
var footer = require("./footer");
var navbar = require("./navbar");
var footer_1 = require("./footer");
var navbar_1 = require("./navbar");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
// @ts-ignore
var BaseComponent1 = function (_a) {
    var children = _a.children;
    return (<div className="custom_body_1">
      <navbar.NavbarComponent1 />
      <main className="custom_main_1">{children}</main>
      <footer.FooterComponent1 />
    </div>);
};
exports.BaseComponent1 = BaseComponent1;
// @ts-ignore
var BaseComponent2 = function (_a) {
    var children = _a.children;
    return (<body className="d-flex flex-column vh-100 custom_body_1">
      <navbar.NavbarComponent1 />
      <main className="d-flex vh-100 h-100">
        <div className="container">{children}</div>
      </main>
      <footer.FooterComponent1 />
    </body>);
};
exports.BaseComponent2 = BaseComponent2;
// @ts-ignore
var BaseComponent3 = function (_a) {
    var children = _a.children;
    return (<div className="custom_body_1">
      <navbar_1.NavbarComponent2 />
      <div className="custom_main_1">{children}</div>
      <footer_1.FooterComponent2 />
    </div>);
};
exports.BaseComponent3 = BaseComponent3;
// @ts-ignore
var BaseComponent4 = function (_a) {
    var children = _a.children;
    return (<body className="d-flex flex-column vh-100">
      <main className="d-flex vh-100 h-100">
        <h1 className="visually-hidden">Sidebars examples</h1>

        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100" style={{ width: "280px" }}>
          <a href="#" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32"/>
            <span className="fs-4">Sidebar</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="#" className="nav-link active" aria-current="page">
                <svg className="bi me-2" width="16" height="16"/>
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16"/>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16"/>
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16"/>
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16"/>
                Customers
              </a>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
              <strong>mdo</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
              <li>
                <a className="dropdown-item" href="#">
                  New project...
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-100">
          <navbar_1.NavbarComponent3 />
          <div className="container">{children}</div>
          <footer_1.FooterComponent3 />
        </div>
      </main>
    </body>);
};
exports.BaseComponent4 = BaseComponent4;
