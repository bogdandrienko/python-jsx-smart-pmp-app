import React, { useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modules } from "../js/constants";
import { userDetailsAction } from "../js/actions";

const HeaderComponent = () => {
  const dispatch = useDispatch();

  const userLoginState = useSelector((state) => state.userLoginState);
  const {
    // load: loadUserLogin,
    data: dataUserLogin,
    // error: errorUserLogin,
    // fail: failUserLogin,
  } = userLoginState;

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    // load: loadUserDetails,
    data: dataUserDetails,
    // error: errorUserDetails,
    // fail: failUserDetails,
  } = userDetailsStore;

  useEffect(() => {
    dispatch(userDetailsAction());
  }, [dispatch]);

  function checkAccess(slug = "") {
    if (dataUserDetails) {
      if (dataUserDetails["group_model"]) {
        return dataUserDetails["group_model"].includes(slug);
      }
      return false;
    }
    return false;
  }

  return (
    <header className="navbar-fixed-top bg-secondary bg-opacity-10 m-0 p-0">
      <Navbar expand="lg">
        <Container>
          <a className="navbar-brand w-25" href="https://km.kz/">
            <img
              src="static/logo.png"
              className="w-25 img-responsive"
              alt="id"
            />
          </a>
          <a className="navbar-brand" href="/">
            Домашняя
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {checkAccess("superuser") && (
                <NavDropdown title="Разработка" id="basic-nav-dropdown">
                  <li>
                    <strong className="dropdown-header text-center">
                      Аккаунты
                    </strong>
                    <LinkContainer to="/users_list">
                      <Nav.Link>Список пользователей</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/todo">
                      <Nav.Link>Todo</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin_change_user_password">
                      <Nav.Link>Смена пароля пользователя</Nav.Link>
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
              )}

              {checkAccess("moderator") && (
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
              )}

              {modules.map(
                (module, module_i) =>
                  checkAccess(module.Access) && (
                    <NavDropdown
                      key={module_i}
                      title={module.Header}
                      id="basic-nav-dropdown"
                    >
                      {module.Sections.map(
                        (section, section_i) =>
                          checkAccess(section.Access) && (
                            <li key={section_i}>
                              <strong className="dropdown-header text-center">
                                {section.Header}
                              </strong>
                              {
                                section.Links.map(
                                  (link, link_i) =>
                                    checkAccess(link.Access) &&
                                    link.ExternalLink && <div>эктернал</div>
                                )
                                //     link.ExternalLink ?
                                //         <a
                                //           className="dropdown-item"
                                //           href="http://localhost:3000/home/"
                                //           target="_blank"
                                //           rel="noreferrer"
                                //         >
                                //           Npm react app
                                //         </a> : <LinkContainer
                                //   key={link_i}
                                //   to={link.Link}
                                //   className={
                                //     link.Type === "active" ? "" : "disabled"
                                //   }
                                // >
                                //   <Nav.Link>{link.Header}</Nav.Link>
                                // </LinkContainer>
                              }
                            </li>
                          )
                      )}
                    </NavDropdown>
                  )
              )}

              {dataUserLogin ? (
                <LinkContainer to="/logout">
                  <Nav.Link>
                    <button className="btn btn-sm btn-danger">
                      Выйти <i className="fa-solid fa-user" />
                    </button>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <button className="btn btn-sm btn-primary">
                      Войти <i className="fa-solid fa-user" />
                    </button>
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
