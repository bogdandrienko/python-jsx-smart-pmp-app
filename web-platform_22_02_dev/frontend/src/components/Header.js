import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="text-center">
      <Navbar expand="lg">
        <Container>
          <a className="navbar-brand" href="/">
            ГЛАВНАЯ
          </a>
          <LinkContainer to="/home">
            <Navbar.Brand>Домашняя</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              {userInfo && userInfo.username === 'Bogdan' ? (
                <NavDropdown title="Разработка" id="basic-nav-dropdown">
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
                    <strong className="dropdown-header text-center">ОТиЗ</strong>
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
                  ) : ('')}

              {userInfo && userInfo.username === 'Bogdan' ? (
                <NavDropdown title="Модератор" id="basic-nav-dropdown">
                  <li>
                    <strong className="dropdown-header text-center">
                      Основной функционал:
                    </strong>
                    <a
                      className="dropdown-item"
                      href="http://localhost:8000/admin"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Панель Администрирования
                    </a>
                    <a
                      className="dropdown-item"
                      href="http://localhost:8000/home"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Домашняя Django
                    </a>
                    <LinkContainer to="/logging" className="disabled">
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
                ) : ('')}

              <NavDropdown title="Профиль" id="basic-nav-dropdown">
                <li>
                  <strong className="dropdown-header text-center">
                    Основной функционал
                  </strong>
                  <LinkContainer to="/home">
                    <Nav.Link>Домашняя страница</Nav.Link>
                  </LinkContainer>
                  <LinkContainer
                    to="/account_notification"
                    className="disabled"
                  >
                    <Nav.Link>
                      Уведомления{" "}
                      <span className="badge bg-warning rounded-pill">99</span>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Достижения</Nav.Link>
                  </LinkContainer>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header text-center">
                    Личный профиль
                  </strong>
                  <LinkContainer to="/profile">
                    <Nav.Link>Профиль</Nav.Link>
                  </LinkContainer>
                  <LinkContainer
                    to="/account_change_profile"
                    className="disabled"
                  >
                    <Nav.Link>Изменить профиль</Nav.Link>
                  </LinkContainer>
                  <LinkContainer
                    to="/account_change_password"
                    className="disabled"
                  >
                    <Nav.Link>Изменить пароль</Nav.Link>
                  </LinkContainer>
                  <LinkContainer
                    to="/account_recover_password"
                    className="disabled"
                  >
                    <Nav.Link>Восстановить пароль</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Войти</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/home" onClick={logoutHandler}>
                    <Nav.Link>Выйти{userInfo ? (` [ ${userInfo.username} ]`) : ('')}</Nav.Link>
                  </LinkContainer>
                </li>
              </NavDropdown>

              <NavDropdown title="Новости" id="basic-nav-dropdown">
                <li>
                  <strong className="dropdown-header text-center">
                    Обучение
                  </strong>
                  <LinkContainer to="/video_study">
                    <Nav.Link>Видео инструкции</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Текстовые инструкции</Nav.Link>
                  </LinkContainer>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header text-center">
                    Новости предприятия
                  </strong>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Просмотр</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Поиск</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Предложить</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Зал славы</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Алтын Канат</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Лучшие работники Комбината</Nav.Link>
                  </LinkContainer>
                </li>
              </NavDropdown>

              <NavDropdown title="Развитие" id="basic-nav-dropdown">
                <li>
                  <strong className="dropdown-header text-center">
                    Банк идей
                  </strong>
                  <LinkContainer to="/idea_create" className="disabled">
                    <Nav.Link>Подать идею</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/idea_list" className="disabled">
                    <Nav.Link>Список идей</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/idea_rating" className="disabled">
                    <Nav.Link>Рейтинги среди идей</Nav.Link>
                  </LinkContainer>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header text-center">
                    Рационализаторство
                  </strong>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Подать рац. предложение</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Список рац. предложений</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Рейтинги среди рац. предложений</Nav.Link>
                  </LinkContainer>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header text-center">
                    Проектная деятельность
                  </strong>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Подать проект</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Список проектов</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Рейтинги среди проектов</Nav.Link>
                  </LinkContainer>
                </li>
              </NavDropdown>

              <NavDropdown title="Бухгалтерия" id="basic-nav-dropdown">
                <li>
                  <strong className="dropdown-header text-center">
                    Сектор расчёта заработной платы
                  </strong>
                  <LinkContainer to="/salary">
                    <Nav.Link>Выгрузка расчётного листа</Nav.Link>
                  </LinkContainer>
                </li>
              </NavDropdown>

              <NavDropdown title="СУП" id="basic-nav-dropdown">
                <li>
                  <strong className="dropdown-header text-center">
                    Отдел кадров
                  </strong>
                  <LinkContainer to="/career" className="disabled">
                    <Nav.Link>Вакансии</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Выгрузка отпусков</Nav.Link>
                  </LinkContainer>
                  <NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header text-center">
                    Отдел охраны труда
                  </strong>
                  <LinkContainer
                    to="/passages_thermometry"
                    className="disabled"
                  >
                    <Nav.Link>Термометрия</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="#" className="disabled">
                    <Nav.Link>Алкометрия</Nav.Link>
                  </LinkContainer>
                </li>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
