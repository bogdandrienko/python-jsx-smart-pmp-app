import React from "react";
import { NavbarComponent1, NavbarComponent2 } from "./navbars";
import { FooterComponent1, FooterComponent2 } from "./footers";

export const BaseComponent1 = ({ children }) => {
  return (
    <div className="custom_body_1">
      <NavbarComponent1 />
      <div className="custom_main_1">{children}</div>
      <FooterComponent1 />
    </div>
  );
};

export const BaseComponent2 = ({ children }) => {
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
              <a href="#" className="nav-link active" aria-current="page">
                <svg className="bi me-2" width="16" height="16" />
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link text-white">
                <svg className="bi me-2" width="16" height="16" />
                Customers
              </a>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a
              href="#"
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
                <hr className="dropdown-divider" />
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
          <NavbarComponent2 />
          <div className="container">{children}</div>
          <FooterComponent2 />
        </div>
      </main>
    </body>
  );
};
