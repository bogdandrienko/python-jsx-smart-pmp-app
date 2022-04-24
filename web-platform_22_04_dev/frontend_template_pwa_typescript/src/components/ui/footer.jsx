"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooterComponent3 = exports.FooterComponent2 = exports.FooterComponent1 = void 0;
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var FooterComponent1 = function () {
    return (<footer className="m-0 p-0 pt-3" style={{ position: "relative", left: 0, bottom: 0, right: 0 }}>
      <div className="bg-dark bg-opacity-10 shadow-lg m-0 p-0">
        <ul className="row row-cols-auto row-cols-md-auto row-cols-lg-auto nav justify-content-center m-0 p-0">
          <li className="m-0 p-1">
            <a className="btn btn-sm btn-outline-secondary text-white" href="#">
              <i className="fa fa-arrow-up">{"  "} вверх</i>
              {"  "}
              <i className="fa fa-arrow-up"> </i>
            </a>
          </li>
          <li className="m-0 p-1">
            <react_bootstrap_1.Navbar className="dropup m-0 p-0">
              <react_bootstrap_1.NavDropdown title={<span className="btn-outline-primary text-white">
                    Наши Ссылки
                    <i className="fa-solid fa-circle-info m-0 p-1"/>
                  </span>} id="basic-nav-dropdown-1" className="btn btn-sm btn-outline-primary m-0 p-0">
                <li>
                  <strong className="dropdown-header">Сайты</strong>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item" href="https://km.kz/">
                    KM KZ
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item" href="https://www.km-open.online/">
                    KM OPEN
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item" href="https://web.cplus.kz/">
                    KM QR
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Соцсети</strong>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item" href="https://www.instagram.com/kostanay_minerals/?igshid=smmei29dpn8h">
                    instagram
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item" href="https://www.facebook.com/kostmineral/">
                    facebook
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item" href="https://t.me/kostanayminerals">
                    telegram
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item" href="https://www.youtube.com/watch?v=GT9q0WWGH44&ab_channel=%D0%9A%D0%BE%D1%81%D1%82%D0%B0%D0%BD%D0%B0%D0%B9%D1%81%D0%BA%D0%B8%D0%B5%D0%9C%D0%B8%D0%BD%D0%B5%D1%80%D0%B0%D0%BB%D1%8B">
                    youtube
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Газета "Хризотил"</strong>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item" href="https://www.instagram.com/gazetakm/">
                    instagram
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item" href="https://chrysotile.kz/">
                    сайт
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Адрес</strong>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item" href="https://www.google.com/maps/place/%D0%9A%D0%BE%D1%81%D1%82%D0%B0%D0%BD%D0%B0%D0%B9%D1%81%D0%BA%D0%B8%D0%B5+%D0%9C%D0%B8%D0%BD%D0%B5%D1%80%D0%B0%D0%BB%D1%8B/@52.1831046,61.1857708,17z/data=!3m1!4b1!4m5!3m4!1s0x43d3248327188171:0x195ab2741ac003fb!8m2!3d52.1831013!4d61.1879595?hl=ru-KG">
                    110700,
                    <br /> Республика Казахстан,
                    <br />
                    Костанайская область,
                    <br />
                    г. Житикара,
                    <br />
                    ул. Ленина, 67
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Тел/факс</strong>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item disabled" href="#">
                    8 (714 35) 2-40-30
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Почта</strong>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item disabled" href="#">
                    info@km.kz
                  </react_bootstrap_1.NavDropdown.Item>
                </li>
              </react_bootstrap_1.NavDropdown>
            </react_bootstrap_1.Navbar>
          </li>
          <li className="m-0 p-1">
            <react_bootstrap_1.Navbar className="dropup text-dark m-0 p-0">
              <react_bootstrap_1.NavDropdown title={<span className="btn-outline-danger text-white">
                    По всем вопросам!
                    <i className="fa-solid fa-truck-medical m-0 p-1"/>
                  </span>} id="basic-nav-dropdown-2" className="btn btn-sm btn-outline-danger m-0 p-0">
                <li>
                  <strong className="dropdown-header">Рабочий номер</strong>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item disabled" href="#">
                    12-28
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Почта, локальная</strong>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item disabled" href="#">
                    Andryenko@km.local
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Divider />
                </li>
                <li>
                  <strong className="dropdown-header">Почта, глобальная</strong>
                  <react_bootstrap_1.NavDropdown.Item className="dropdown-item disabled" href="#">
                    Andryenko@km.kz
                  </react_bootstrap_1.NavDropdown.Item>
                  <react_bootstrap_1.NavDropdown.Divider />
                </li>
              </react_bootstrap_1.NavDropdown>
            </react_bootstrap_1.Navbar>
          </li>
        </ul>
      </div>
    </footer>);
};
exports.FooterComponent1 = FooterComponent1;
var FooterComponent2 = function () {
    return (<div className="custom_footer_1">
      <h6 className="custom_footer_1_brand">
        React SPA with Django DRF backend
      </h6>
      <div className="custom_footer_1_brands">
        <strong className="custom_footer_2_brand">custom create </strong>
        <strong className="custom_footer_2_brand">just for fun</strong>
      </div>
    </div>);
};
exports.FooterComponent2 = FooterComponent2;
var FooterComponent3 = function () {
    return (<footer className="footer mt-auto py-3 bg-light" style={{ position: "absolute", left: "auto", bottom: 0, right: 0 }}>
      <div className="container">
        <span className="text-muted">Place sticky footer content here.</span>
      </div>
    </footer>);
};
exports.FooterComponent3 = FooterComponent3;
