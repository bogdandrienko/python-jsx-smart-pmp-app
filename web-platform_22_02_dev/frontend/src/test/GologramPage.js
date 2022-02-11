import React from "react";
import { Container, Navbar, Nav, NavDropdown, Row, Col } from "react-bootstrap";

const GologramPage = () => {
  return (
    <div>
      <div className="container-fluid bg-success bg-opacity-10">
        <div class="py-5 text-center">
          <img
            class="d-block mx-auto mb-4 w-25 img-fluid"
            src="/static/galo_1.jpeg"
            alt=""
          />
          <h2 className="">Коммерческое предложение</h2>
          <p class="lead">
            Разработка веб-приложения для Отдела Оценки и Развития Персонала.
          </p>
        </div>
        <div class="row g-5">
          <div class="col-md-5 col-lg-4 order-md-last">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-primary">Информация по проекту</span>
              <span class="badge bg-primary rounded-pill">3</span>
            </h4>
            <ul class="list-group mb-3">
              <p className="card">
                <strong className="lead card-header">
                  Основание для разработки проекта:{" "}
                </strong>
                <ul className="text-secondary card-body text-start">
                  <li>
                    Отсутствие гибких и современных инструментов получения
                    информации от управляющих по компетенциям, своевременного их
                    обновления и обратной связи.
                  </li>
                  <li>
                    Сложность сбора статистики для дальнейшей аналитики и
                    планирования.
                  </li>
                </ul>
                <small className="text-secondary card-body text-start"></small>
              </p>

              <p className="card">
                <strong className="lead card-header">
                  Цель и задачи проекта:{" "}
                </strong>
                <ul className="text-secondary card-body text-start">
                  <li>
                    Создание веб-приложения(веб-платформа: Single Page
                    Application), доступного с браузера любого устройства
                    (компьютер, планшет, смартфоны: android/apple).
                  </li>
                  <li>
                    Приложение должно включать в себя разделение функционала на
                    пользователя / модератора, где у первого (пользователя) есть
                    функционал прохождения опросов и тестироваий, у последнего
                    (модератор) есть функционал выгрузки этих данных, получения
                    статистики и аналитики.
                  </li>
                  <li>
                    Функционал необходимо будет наращивать и развивать со
                    временем.
                  </li>
                </ul>
              </p>

              <p className="card">
                <strong className="lead card-header">
                  Ожидаемые результаты проекта:{" "}
                </strong>
                <ul className="text-secondary card-body text-start">
                  <li>
                    Кроссплатформенная веб-платформа, доступная в сети интернет
                    с любого браузера и устройства.
                  </li>
                  <li>
                    Функционал прохождения тестирований, выгрузки и
                    интерактивного взаимодействия с пользователем.
                  </li>
                  <li>
                    Модульная расширяемая структура. Возможность интеграции с
                    другими системами по api.
                  </li>
                </ul>
              </p>
            </ul>

            <form class="card p-2">
              <strong className="text-dark">Whatsapp / Telegram</strong>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="+7 747 261 03 59"
                />
                <button type="submit" class="btn btn-danger">
                  Контакты разработчика
                </button>
              </div>
            </form>
          </div>

          <div class="col-md-7 col-lg-8">
            <div className="border">
              <h4 class="mb-3 display-6">Список технологий</h4>
              <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
                <div class="feature col">
                  <div class="feature-icon bg-primary bg-gradient">
                    <svg class="bi" width="1em" height="1em"></svg>
                  </div>
                  <h2>
                    Аппаратная часть: <strong>(Virtual Mashine)</strong>
                  </h2>
                  <p>VirtualBox + Ubuntu 20.04 + Docker</p>
                  <a
                    href="https://www.google.com/search?q=VirtualBox+%2B+Ubuntu+20.04+%2B+Docker&rlz=1C1GCEU_ruKZ936KZ936&oq=VirtualBox+%2B+Ubuntu+20.04+%2B+Docker&aqs=chrome..69i57.1127j0j9&sourceid=chrome&ie=UTF-8"
                    class="icon-link btn btn-secondary"
                  >
                    Узнать в интернете
                    <svg class="bi" width="1em" height="1em"></svg>
                  </a>
                </div>

                <div class="feature col">
                  <div class="feature-icon bg-warning bg-gradient">
                    <svg class="bi" width="1em" height="1em"></svg>
                  </div>
                  <h2>
                    Серверная часть: <strong>(Backend)</strong>
                  </h2>
                  <p>Nginx + Gunicorn + Django(Python) + Celery + PostgreSQL</p>
                  <a
                    href="https://www.google.com/search?q=Nginx+%2B+Gunicorn+%2B+Django(Python)+%2B+Celery+%2B+PostgreSQL&rlz=1C1GCEU_ruKZ936KZ936&oq=Nginx+%2B+Gunicorn+%2B+Django(Python)+%2B+Celery+%2B+PostgreSQL&aqs=chrome..69i57.639j0j9&sourceid=chrome&ie=UTF-8"
                    class="icon-link btn btn-secondary"
                  >
                    Узнать в интернете
                    <svg class="bi" width="1em" height="1em"></svg>
                  </a>
                </div>

                <div class="feature col">
                  <div class="feature-icon bg-success bg-gradient">
                    <svg class="bi" width="1em" height="1em"></svg>
                  </div>
                  <h2>
                    Клиентская часть: <strong>(Frontend)</strong>
                  </h2>
                  <p>Javascript + React(jsx) + Redis</p>
                  <a
                    href="https://www.google.com/search?q=Javascript+%2B+React%28jsx%29+%2B+Redis&newwindow=1&rlz=1C1GCEU_ruKZ936KZ936&sxsrf=APq-WBs5ocMi2zaJzIuMuHB_0-e4IFXnbw%3A1644567137859&ei=YRoGYt_nM8CWxc8Px4y4mAo&ved=0ahUKEwifnL6Amvf1AhVAS_EDHUcGDqMQ4dUDCA4&uact=5&oq=Javascript+%2B+React%28jsx%29+%2B+Redis&gs_lcp=Cgdnd3Mtd2l6EAMyCAghEBYQHRAeOgcIABBHELADSgQIQRgASgQIRhgAUG9Yb2DvA2gBcAF4AIABjgGIAY4BkgEDMC4xmAEAoAEByAEIwAEB&sclient=gws-wiz"
                    class="icon-link btn btn-secondary"
                  >
                    Узнать в интернете
                    <svg class="bi" width="1em" height="1em"></svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="border">
              <h4 class="mb-3 display-6">Цена и сроки реализации</h4>

              <div class="table-responsive">
                <table class="table table-striped table-sm ">
                  <thead>
                    <tr>
                      <th scope="col">Этапы</th>
                      <th scope="col">Описание</th>
                      <th scope="col">Время (дни)</th>
                      <th scope="col">Стоимость</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1 этап</td>
                      <td className="text-start">
                        Создание и согласования дизайнов всех уникальных страниц
                        для десктопной, планшетной и мобильной версий. Дизайн
                        личный кабинетов пользователей и модераторов.
                      </td>
                      <td>10</td>
                      <td className="text-end">200 000</td>
                    </tr>
                    <tr>
                      <td>2 этап </td>
                      <td>
                        Программирование CMS платформы с нуля согласно
                        техническому заданию.
                      </td>
                      <td>20</td>
                      <td>400 000</td>
                    </tr>
                    <tr>
                      <td>3 этап</td>
                      <td>
                        Модуль личного кабинета, функционал ЛК. Управление БД
                        пользователей.
                      </td>
                      <td>5</td>
                      <td>100 000</td>
                    </tr>
                    <tr>
                      <td>4 этап</td>
                      <td>
                        Матрица ролей пользователей / суперпользователей и
                        настройки полномочий модераторов.
                      </td>
                      <td>5</td>
                      <td>100 000</td>
                    </tr>
                    <tr>
                      <td>5 этап</td>
                      <td>
                        Тестовое развёртывание приложения и финальная отладка.
                      </td>
                      <td>3</td>
                      <td>60 000</td>
                    </tr>
                    <tr>
                      <td>6 этап </td>
                      <td>Финальное развёртывание приложения.</td>
                      <td>5</td>
                      <td>100 000</td>
                    </tr>
                    <tr className="fw-bold">
                      <td>Итого: </td>
                      <td>Завершение проекта.</td>
                      <td>48</td>
                      <td>960 000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <Row className="m-0 p-0">
          <Col className="border border-dark bg-danger col-1 m-0 p-0">col</Col>
          <Col className="border border-dark bg-success col-6 m-0 p-0">
            <a href="https://gifs.alphacoders.com/gifs/view/212508">
              <img
                src="https://giffiles.alphacoders.com/212/212508.gif"
                className="img-fluid"
              />
            </a>
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
            col
            <br />
          </Col>
          <Col className="border border-dark bg-primary col-5 m-0 p-0">col</Col>
        </Row>
        <div class="row">
          <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link active" href="#">
                    <span data-feather="home"></span>
                    Dashboard <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file"></span>
                    Orders
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="shopping-cart"></span>
                    Products
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="users"></span>
                    Customers
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="bar-chart-2"></span>
                    Reports
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="layers"></span>
                    Integrations
                  </a>
                </li>
              </ul>

              <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <a class="d-flex align-items-center text-muted" href="#">
                  <span data-feather="plus-circle"></span>
                </a>
              </h6>
              <ul class="nav flex-column mb-2">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Current month
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Last quarter
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Social engagement
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Year-end sale
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 class="h2">Dashboard</h1>
              <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group mr-2">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                  >
                    Share
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                  >
                    Export
                  </button>
                </div>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary dropdown-toggle"
                >
                  <span data-feather="calendar"></span>
                  This week
                </button>
              </div>
            </div>

            <canvas
              class="my-4 w-100"
              id="myChart"
              width="900"
              height="380"
            ></canvas>

            <h2>Section title</h2>
            <div class="table-responsive">
              <table class="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Header</th>
                    <th>Header</th>
                    <th>Header</th>
                    <th>Header</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1,001</td>
                    <td>Lorem</td>
                    <td>ipsum</td>
                    <td>dolor</td>
                    <td>sit</td>
                  </tr>
                  <tr>
                    <td>1,002</td>
                    <td>amet</td>
                    <td>consectetur</td>
                    <td>adipiscing</td>
                    <td>elit</td>
                  </tr>
                  <tr>
                    <td>1,003</td>
                    <td>Integer</td>
                    <td>nec</td>
                    <td>odio</td>
                    <td>Praesent</td>
                  </tr>
                  <tr>
                    <td>1,003</td>
                    <td>libero</td>
                    <td>Sed</td>
                    <td>cursus</td>
                    <td>ante</td>
                  </tr>
                  <tr>
                    <td>1,004</td>
                    <td>dapibus</td>
                    <td>diam</td>
                    <td>Sed</td>
                    <td>nisi</td>
                  </tr>
                  <tr>
                    <td>1,005</td>
                    <td>Nulla</td>
                    <td>quis</td>
                    <td>sem</td>
                    <td>at</td>
                  </tr>
                  <tr>
                    <td>1,006</td>
                    <td>nibh</td>
                    <td>elementum</td>
                    <td>imperdiet</td>
                    <td>Duis</td>
                  </tr>
                  <tr>
                    <td>1,007</td>
                    <td>sagittis</td>
                    <td>ipsum</td>
                    <td>Praesent</td>
                    <td>mauris</td>
                  </tr>
                  <tr>
                    <td>1,008</td>
                    <td>Fusce</td>
                    <td>nec</td>
                    <td>tellus</td>
                    <td>sed</td>
                  </tr>
                  <tr>
                    <td>1,009</td>
                    <td>augue</td>
                    <td>semper</td>
                    <td>porta</td>
                    <td>Mauris</td>
                  </tr>
                  <tr>
                    <td>1,010</td>
                    <td>massa</td>
                    <td>Vestibulum</td>
                    <td>lacinia</td>
                    <td>arcu</td>
                  </tr>
                  <tr>
                    <td>1,011</td>
                    <td>eget</td>
                    <td>nulla</td>
                    <td>Class</td>
                    <td>aptent</td>
                  </tr>
                  <tr>
                    <td>1,012</td>
                    <td>taciti</td>
                    <td>sociosqu</td>
                    <td>ad</td>
                    <td>litora</td>
                  </tr>
                  <tr>
                    <td>1,013</td>
                    <td>torquent</td>
                    <td>per</td>
                    <td>conubia</td>
                    <td>nostra</td>
                  </tr>
                  <tr>
                    <td>1,014</td>
                    <td>per</td>
                    <td>inceptos</td>
                    <td>himenaeos</td>
                    <td>Curabitur</td>
                  </tr>
                  <tr>
                    <td>1,015</td>
                    <td>sodales</td>
                    <td>ligula</td>
                    <td>in</td>
                    <td>libero</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>

          <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link active" href="#">
                    <span data-feather="home"></span>
                    Dashboard <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file"></span>
                    Orders
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="shopping-cart"></span>
                    Products
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="users"></span>
                    Customers
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="bar-chart-2"></span>
                    Reports
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="layers"></span>
                    Integrations
                  </a>
                </li>
              </ul>

              <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <a class="d-flex align-items-center text-muted" href="#">
                  <span data-feather="plus-circle"></span>
                </a>
              </h6>
              <ul class="nav flex-column mb-2">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Current month
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Last quarter
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Social engagement
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Year-end sale
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div> */}
      </div>
    </div>
  );
};

export default GologramPage;
