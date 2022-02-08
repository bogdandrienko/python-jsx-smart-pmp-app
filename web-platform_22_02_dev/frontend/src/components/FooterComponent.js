import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";

const FooterComponent = () => {
  return (
    <footer className="container-fluid mt-auto footer page-footer">
      <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center">
        <li className="m-1">
          <a className="btn btn-sm btn-outline-secondary" href="#">
            <i className="fa fa-arrow-up">{"  "} вверх</i>
            {"  "}
            <i className="fa fa-arrow-up"> </i>
          </a>
        </li>
        <li className="m-1">
          <Navbar className="dropup p-0 m-0">
            <NavDropdown
              title={<span className="btn-outline-primary">Наши Ссылки</span>}
              id="basic-nav-dropdown-1"
              className="btn btn-sm btn-outline-primary p-0 m-0"
            >
              <li>
                <strong className="dropdown-header">Сайты</strong>
                <NavDropdown.Item
                  className="dropdown-item"
                  href="https://km.kz/"
                >
                  km.kz
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-item"
                  href="https://www.km-open.online/"
                >
                  km-open
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-item"
                  href="https://web.cplus.kz/"
                >
                  web-cplus
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </li>
              <li>
                <strong className="dropdown-header">Соцсети</strong>
                <NavDropdown.Item
                  className="dropdown-item"
                  href="https://www.instagram.com/kostanay_minerals/?igshid=smmei29dpn8h"
                >
                  instagram
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-item"
                  href="https://www.facebook.com/kostmineral/"
                >
                  facebook
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-item"
                  href="https://t.me/kostanayminerals"
                >
                  telegram
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="dropdown-item"
                  href="https://www.youtube.com/watch?v=GT9q0WWGH44&ab_channel=%D0%9A%D0%BE%D1%81%D1%82%D0%B0%D0%BD%D0%B0%D0%B9%D1%81%D0%BA%D0%B8%D0%B5%D0%9C%D0%B8%D0%BD%D0%B5%D1%80%D0%B0%D0%BB%D1%8B"
                >
                  youtube
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </li>
              <li>
                <strong className="dropdown-header">Адрес</strong>
                <NavDropdown.Item
                  className="dropdown-item"
                  href="https://www.google.com/maps/place/%D0%9A%D0%BE%D1%81%D1%82%D0%B0%D0%BD%D0%B0%D0%B9%D1%81%D0%BA%D0%B8%D0%B5+%D0%9C%D0%B8%D0%BD%D0%B5%D1%80%D0%B0%D0%BB%D1%8B/@52.1831046,61.1857708,17z/data=!3m1!4b1!4m5!3m4!1s0x43d3248327188171:0x195ab2741ac003fb!8m2!3d52.1831013!4d61.1879595?hl=ru-KG"
                >
                  110700,
                  <br /> Республика Казахстан,
                  <br />
                  Костанайская область,
                  <br />
                  г. Житикара,
                  <br />
                  ул. Ленина, 67
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </li>
              <li>
                <strong className="dropdown-header">Тел/факс</strong>
                <NavDropdown.Item className="dropdown-item disabled" href="#">
                  8 (714 35) 2-40-30
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </li>
              <li>
                <strong className="dropdown-header">Почта</strong>
                <NavDropdown.Item className="dropdown-item disabled" href="#">
                  info@km.kz
                </NavDropdown.Item>
              </li>
            </NavDropdown>
          </Navbar>
        </li>
        <li className="m-1">
          <Navbar className="dropup text-dark p-0 m-0">
            <NavDropdown
              title={
                <span className="btn-outline-danger">По всем вопросам!</span>
              }
              id="basic-nav-dropdown-2"
              className="btn btn-sm btn-outline-danger p-0 m-0"
            >
              <li>
                <strong className="dropdown-header">Рабочий номер</strong>
                <NavDropdown.Item className="dropdown-item disabled" href="#">
                  12-28
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </li>
              <li>
                <strong className="dropdown-header">Сотовый номер</strong>
                <NavDropdown.Item className="dropdown-item disabled" href="#">
                  +7 747 261 03 59
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </li>
              <li>
                <strong className="dropdown-header">Telegram / WhatsApp</strong>
                <NavDropdown.Item className="dropdown-item disabled" href="#">
                  +7 747 261 03 59
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </li>
              <li>
                <strong className="dropdown-header">Почта, локальная</strong>
                <NavDropdown.Item className="dropdown-item disabled" href="#">
                  Andryenko@km.local
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </li>
              <li>
                <strong className="dropdown-header">Почта, глобальная</strong>
                <NavDropdown.Item className="dropdown-item disabled" href="#">
                  Andryenko@km.kz
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </li>
              <li>
                <strong className="dropdown-header">Почта, личная</strong>
                <NavDropdown.Item className="dropdown-item disabled" href="#">
                  bogdandrienko@gmail.com
                </NavDropdown.Item>
              </li>
            </NavDropdown>
          </Navbar>
        </li>
      </ul>
    </footer>
  );
};

export default FooterComponent;
