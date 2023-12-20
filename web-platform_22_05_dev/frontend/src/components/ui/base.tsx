// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as footer from "./footer";
import * as navbar from "./navbar";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
export const Base1 = ({ children }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="custom_body_1">
      <navbar.NavbarComponent1 />
      <main className="custom_main_1">{children}</main>
      <footer.Footer1 />
    </div>
  );
};

// @ts-ignore
export const Base2 = ({ children }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <body className="d-flex flex-column vh-100 custom_body_1">
      <navbar.NavbarComponent1 />
      <main className="d-flex vh-100 h-100">
        <div className="container">{children}</div>
      </main>
      <footer.Footer1 />
    </body>
  );
};

// @ts-ignore
export const Base3 = ({ children }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="custom_body_1">
      <navbar.NavbarComponent2 />
      <div className="custom_main_1">{children}</div>
      <footer.FooterComponent2 />
    </div>
  );
};

// @ts-ignore
export const Base4 = ({ children }) => {
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <body className="d-flex flex-column vh-100">
      <main className="d-flex vh-100 h-100">
        <h1 className="visually-hidden">Sidebars examples</h1>

        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100"
          style={{ width: "280px" }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <svg className="bi me-2" width="40" height="32" />
            <span className="fs-4">Sidebar</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="/" className="nav-link active" aria-current="page">
                <svg className="bi me-2" width="16" height="16" />
                Home
              </a>
            </li>
            <li>
              <a href="/" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Orders
              </a>
            </li>
            <li>
              <a href="/" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Products
              </a>
            </li>
            <li>
              <a href="/" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Customers
              </a>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a
              href="/"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>mdo</strong>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <a className="dropdown-item" href="/">
                  New project...
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-100">
          <navbar.NavbarComponent3 />
          <div className="container">{children}</div>
          <footer.FooterComponent3 />
        </div>
      </main>
    </body>
  );
};