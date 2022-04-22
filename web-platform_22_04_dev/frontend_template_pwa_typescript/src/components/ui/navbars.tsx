import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Spinner,
  Alert,
} from "react-bootstrap";
// @ts-ignore
import { LinkContainer } from "react-router-bootstrap";

export const NavbarComponent1 = () => {
  return (
    <div className="m-0 p-0 pb-3">
      <header className="header navbar-fixed-top bg-dark bg-opacity-10 shadow-lg m-0 p-0">
        <Navbar expand="lg" className="m-0 p-0">
          <Container className="">
            <a className="w-25 m-0 p-0" href="https://web.km.kz/">
              <img
                src="/static/img/logo.svg"
                className="w-50 m-0 p-0"
                alt="id"
              />
            </a>
            <a className="btn btn-outline-light navbar-brand m-0 p-2" href="/">
              <i className="fa-solid fa-earth-asia m-0 p-1" />
              Домашняя
            </a>
            <i className="fa-solid fa-bell text-danger m-0 p-2" />
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="btn btn-success text-success bg-warning bg-opacity-50"
            >
              <span className="navbar-toggler-icon text-success" />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav" className="m-0 p-0">
              <Nav className="me-auto m-0 p-0">
                <NavDropdown
                  title={"Head1"}
                  id="basic-nav-dropdown"
                  className="btn custom-background-transparent-low-middle m-1 p-0"
                >
                  <li className="m-0 p-1">
                    <strong className="dropdown-header text-center m-0 p-0">
                      Header1
                    </strong>
                    <LinkContainer to="/" className="custom-hover m-0 p-0">
                      <Nav.Link className="custom-color-warning-1">
                        <span className="badge rounded-pill text-danger m-0 p-1">
                          <i className="fa-solid fa-bell text-danger m-0 p-1" />
                        </span>
                        Link1
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/" className="custom-hover m-0 p-0">
                      <Nav.Link className="custom-color-warning-1">
                        <span className="badge rounded-pill text-danger m-0 p-1">
                          <i className="fa-solid fa-bell text-danger m-0 p-1" />
                        </span>
                        Link2
                      </Nav.Link>
                    </LinkContainer>
                    <NavDropdown.Divider className="m-0 p-0" />
                  </li>
                  <li className="m-0 p-1">
                    <strong className="dropdown-header text-center m-0 p-0">
                      Header2
                    </strong>
                    <LinkContainer to="/" className="custom-hover m-0 p-0">
                      <Nav.Link className="custom-color-warning-1">
                        <span className="badge rounded-pill text-danger m-0 p-1">
                          <i className="fa-solid fa-bell text-danger m-0 p-1" />
                        </span>
                        Link1
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/" className="custom-hover m-0 p-0">
                      <Nav.Link className="custom-color-warning-1">
                        <span className="badge rounded-pill text-danger m-0 p-1">
                          <i className="fa-solid fa-bell text-danger m-0 p-1" />
                        </span>
                        Link2
                      </Nav.Link>
                    </LinkContainer>
                    <NavDropdown.Divider className="m-0 p-0" />
                  </li>
                </NavDropdown>
                <NavDropdown
                  title={"Head2"}
                  id="basic-nav-dropdown"
                  className="btn custom-background-transparent-low-middle m-1 p-0"
                >
                  <li className="m-0 p-1">
                    <strong className="dropdown-header text-center m-0 p-0">
                      Header1
                    </strong>
                    <LinkContainer to="/" className="custom-hover m-0 p-0">
                      <Nav.Link className="custom-color-warning-1">
                        <span className="badge rounded-pill text-danger m-0 p-1">
                          <i className="fa-solid fa-bell text-danger m-0 p-1" />
                        </span>
                        Link1
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/" className="custom-hover m-0 p-0">
                      <Nav.Link className="custom-color-warning-1">
                        <span className="badge rounded-pill text-danger m-0 p-1">
                          <i className="fa-solid fa-bell text-danger m-0 p-1" />
                        </span>
                        Link2
                      </Nav.Link>
                    </LinkContainer>
                    <NavDropdown.Divider className="m-0 p-0" />
                  </li>
                  <li className="m-0 p-1">
                    <strong className="dropdown-header text-center m-0 p-0">
                      Header2
                    </strong>
                    <LinkContainer to="/" className="custom-hover m-0 p-0">
                      <Nav.Link className="custom-color-warning-1">
                        <span className="badge rounded-pill text-danger m-0 p-1">
                          <i className="fa-solid fa-bell text-danger m-0 p-1" />
                        </span>
                        Link1
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/" className="custom-hover m-0 p-0">
                      <Nav.Link className="custom-color-warning-1">
                        <span className="badge rounded-pill text-danger m-0 p-1">
                          <i className="fa-solid fa-bell text-danger m-0 p-1" />
                        </span>
                        Link2
                      </Nav.Link>
                    </LinkContainer>
                    <NavDropdown.Divider className="m-0 p-0" />
                  </li>
                </NavDropdown>
                <NavDropdown
                  title={"Развитие"}
                  id="basic-nav-dropdown"
                  className="btn custom-background-transparent-low-middle m-1 p-0"
                >
                  <li className="m-0 p-1">
                    <strong className="dropdown-header text-center m-0 p-0">
                      Банк идей
                    </strong>
                    <LinkContainer
                      to="/idea/template"
                      className="custom-hover m-0 p-0"
                    >
                      <Nav.Link className="text-secondary">
                        <span className="badge rounded-pill text-secondary m-0 p-1">
                          <i className="fa-solid fa-circle-info m-0 p-1" />
                        </span>
                        Пример (шаблон) идеи
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer
                      to="/idea/create"
                      className="custom-hover m-0 p-0"
                    >
                      <Nav.Link className="text-success">
                        <span className="badge rounded-pill text-success m-0 p-1">
                          <i className="fa-solid fa-circle-plus m-0 p-1" />
                        </span>
                        Подача новой идеи
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer
                      to="/idea/correct"
                      className="custom-hover m-0 p-0"
                    >
                      <Nav.Link className="text-danger">
                        <span className="badge rounded-pill text-danger m-0 p-1">
                          <i className="fa-solid fa-screwdriver-wrench m-0 p-1" />
                        </span>
                        Мои идеи на доработку
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer
                      to="/idea/list"
                      className="custom-hover m-0 p-0"
                    >
                      <Nav.Link className="text-primary">
                        <span className="badge rounded-pill text-primary m-0 p-1">
                          <i className="fa-solid fa-list m-0 p-1" />
                        </span>
                        Список идей
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer
                      to="/idea/top"
                      className="custom-hover m-0 p-0"
                    >
                      <Nav.Link className="custom-color-warning-1">
                        <span className="badge rounded-pill custom-color-warning-1 m-0 p-1">
                          <i className="fa-solid fa-list-ol m-0 p-1" />
                        </span>
                        Лучшие идеи
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer
                      to="/idea/moderate"
                      className="custom-hover m-0 p-0"
                    >
                      <Nav.Link className="text-danger">
                        <span className="badge rounded-pill text-danger m-0 p-1">
                          <i className="fa-solid fa-screwdriver-wrench m-0 p-1" />
                        </span>
                        Модерация идей
                      </Nav.Link>
                    </LinkContainer>
                    <NavDropdown.Divider className="m-0 p-0" />
                  </li>
                  <li className="m-0 p-1">
                    <strong className="dropdown-header text-center m-0 p-0">
                      Header2
                    </strong>
                    <LinkContainer to="/" className="custom-hover m-0 p-0">
                      <Nav.Link className="custom-color-warning-1">
                        <span className="badge rounded-pill text-danger m-0 p-1">
                          <i className="fa-solid fa-bell text-danger m-0 p-1" />
                        </span>
                        Link1
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/" className="custom-hover m-0 p-0">
                      <Nav.Link className="custom-color-warning-1">
                        <span className="badge rounded-pill text-danger m-0 p-1">
                          <i className="fa-solid fa-bell text-danger m-0 p-1" />
                        </span>
                        Link2
                      </Nav.Link>
                    </LinkContainer>
                    <NavDropdown.Divider className="m-0 p-0" />
                  </li>
                </NavDropdown>
                <LinkContainer
                  to="/logout"
                  className="text-center m-0 p-1 mx-1"
                >
                  <Nav.Link className="m-0 p-0">
                    <button className="btn btn-sm btn-danger m-0 p-2">
                      Выйти <i className="fa-solid fa-door-open m-0 p-1" />
                    </button>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login" className="text-center m-0 p-1 mx-1">
                  <Nav.Link className="m-0 p-0">
                    <button className="btn btn-sm btn-primary m-0 p-2">
                      Войти{" "}
                      <i className="fa-solid fa-arrow-right-to-bracket m-0 p-1" />
                    </button>
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="container p-0 pt-1">
          <div className="card shadow custom-background-transparent-middle m-0 p-0">
            <div className="card-header bg-primary bg-opacity-10 m-0 p-1">
              <small className="display-6 fw-normal m-0 p-1">title</small>
            </div>
            <div className="card-body m-0 p-1">
              <p className="lead fw-normal text-muted m-0 p-1">description</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
