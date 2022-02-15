import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { modules } from "../js/constants";

const HeaderComponent = () => {
  const userLoginState = useSelector((state) => state.userLoginState);
  const {
    load: loadUserLogin,
    data: dataUserLogin,
    error: errorUserLogin,
    fail: failUserLogin,
  } = userLoginState;
  return (
    <header className="navbar-fixed-top bg-secondary bg-opacity-10 m-0 p-0">
      <Navbar expand="lg">
        <Container>
          <a className="navbar-brand img-thumbnail" href="https://km.kz/">
            <img src="static/logo_small.png" className="w-25" alt="id" />
          </a>
          <a className="navbar-brand" href="/">
          Домашняя
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {dataUserLogin && dataUserLogin.username === "Bogdan" ? (
                <NavDropdown title="Разработка" id="basic-nav-dropdown">
                <li>
                  <strong className="dropdown-header text-center">
                    Рац. предложения
                  </strong>
                  <LinkContainer to="/rational_create">
                    <Nav.Link>Подать рац. предложение</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/rational_list">
                    <Nav.Link>Список предложений</Nav.Link>
                  </LinkContainer>
                </li>
                <li>
                  <strong className="dropdown-header text-center">
                    Аккаунты
                  </strong>
                  <LinkContainer to="/users_list">
                    <Nav.Link>Список пользователей</Nav.Link>
                  </LinkContainer>
                </li>
                  <li>
                    <strong className="dropdown-header text-center">
                      Шаблоны
                    </strong>
                    <LinkContainer to="/examples_forms" className="disabled">
                      <Nav.Link>Формы</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/example" className="disabled">
                      <Nav.Link>Шаблон</Nav.Link>
                    </LinkContainer>
                    <NavDropdown.Divider />
                  </li>
                  <li>
                    <strong className="dropdown-header text-center">
                      Экстра
                    </strong>
                    <LinkContainer to="/geo" className="disabled">
                      <Nav.Link>Геолокация, устройства: список</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/analyse" className="disabled">
                      <Nav.Link>Машинное зрение: запуск анализа</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="#" className="disabled">
                      <Nav.Link>React</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/test">
                      <Nav.Link>Test</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/shop">
                      <Nav.Link>Shop</Nav.Link>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to="/gologram">
                      <Nav.Link>Gologram</Nav.Link>
                    </LinkContainer>
                    <NavDropdown.Divider />
                  </li>
                  <li>
                    <strong className="dropdown-header text-center">Чат</strong>
                    <LinkContainer to="/chat">
                      <Nav.Link>Общий</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/chat_react">
                      <Nav.Link>Личный</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/notes">
                      <Nav.Link>Заметки</Nav.Link>
                    </LinkContainer>
                    <NavDropdown.Divider />
                  </li>
                  <li>
                    <strong className="dropdown-header text-center">
                      ОТиЗ
                    </strong>
                    <LinkContainer to="/passages_select" className="disabled">
                      <Nav.Link>Выгрузка данных</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/passages_update" className="disabled">
                      <Nav.Link>Обновление данных</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/passages_insert" className="disabled">
                      <Nav.Link>Добавление данных</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/passages_delete" className="disabled">
                      <Nav.Link>Удаление данных</Nav.Link>
                    </LinkContainer>
                  </li>
                </NavDropdown>
              ) : (
                ""
              )}

              {dataUserLogin && dataUserLogin.username === "Bogdan" ? (
                <NavDropdown title="Модератор" id="basic-nav-dropdown">
                  <li>
                    <strong className="dropdown-header text-center">
                      Основной функционал:
                    </strong>
                    <a
                      className="dropdown-item"
                      href="http://localhost:8000/admin/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Панель Администрирования
                    </a>
                    <a
                      className="dropdown-item"
                      href="http://localhost:3000/home/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Npm react app
                    </a>
                    <a
                      className="dropdown-item"
                      href="http://localhost:8000/django/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Домашняя Django
                    </a>
                    <a
                      className="dropdown-item"
                      href="http://localhost:8000/api/routes/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Api Django rest_framework
                    </a>
                    <LinkContainer to="/django/logging/" className="disabled">
                      <Nav.Link>
                        Логи Системы{" "}
                        <span className="badge bg-danger rounded-pill">99</span>
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/create_modules" className="disabled">
                      <Nav.Link>Создание действий, групп или модулей</Nav.Link>
                    </LinkContainer>
                    <NavDropdown.Divider />
                  </li>
                  <li>
                    <strong className="dropdown-header text-center">
                      Аккаунты
                    </strong>
                    <LinkContainer
                      to="/account_create_or_change_accounts"
                      className="disabled"
                    >
                      <Nav.Link>Создать/изменить пользователей</Nav.Link>
                    </LinkContainer>
                    <LinkContainer
                      to="/account_generate_passwords"
                      className="disabled"
                    >
                      <Nav.Link>Сгенерировать пароли для аккаунтов</Nav.Link>
                    </LinkContainer>
                    <LinkContainer
                      to="/account_export_accounts"
                      className="disabled"
                    >
                      <Nav.Link>Выгрузить список пользователей</Nav.Link>
                    </LinkContainer>
                    <LinkContainer
                      to="/account_update_accounts_1c"
                      className="disabled"
                    >
                      <Nav.Link>Обновить пользователей из 1С</Nav.Link>
                    </LinkContainer>
                    <LinkContainer
                      to="/account_change_groups"
                      className="disabled"
                    >
                      <Nav.Link>Изменить группы пользователей</Nav.Link>
                    </LinkContainer>
                  </li>
                </NavDropdown>
              ) : (
                ""
              )}

              {modules.map((module, module_i) => (
                <NavDropdown
                  key={module_i}
                  title={module.Header}
                  id="basic-nav-dropdown"
                >
                  {module.Sections.map((section, section_i) => (
                    <li key={section_i}>
                      <strong className="dropdown-header text-center">
                        {section.Header}
                      </strong>
                      {section.Links.map((link, link_i) => (
                        <LinkContainer
                          key={link_i}
                          to={link.Link}
                          className={link.Type === "active" ? "" : "disabled"}
                        >
                          <Nav.Link>{link.Header}</Nav.Link>
                        </LinkContainer>
                      ))}
                    </li>
                  ))}
                </NavDropdown>
              ))}

              {dataUserLogin ? (
                <LinkContainer to="/logout">
                  <Nav.Link>
                    <button className="btn btn-danger">Выйти  <i class="fa-solid fa-user"></i></button>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <button className="btn btn-primary">Войти  <i class="fa-solid fa-user"></i></button>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderComponent;
