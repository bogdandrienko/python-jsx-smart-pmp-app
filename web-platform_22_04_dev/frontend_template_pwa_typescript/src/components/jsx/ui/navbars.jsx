import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts";
import { Button1 } from "./buttons";

export const NavbarComponent1 = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const logout = (event) => {
    event.preventDefault();
    setIsAuth(false);
    localStorage.removeItem("auth");
  };
  return (
    <div className="custom_navbar_1">
      <Button1 onClick={logout}>logout</Button1>
      <div className="custom_navbar_1_links">
        <Link to="/" className="custom_navbar_1_link">
          home
        </Link>
      </div>
    </div>
  );
};

export const NavbarComponent2 = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const logout = (event) => {
    event.preventDefault();
    setIsAuth(false);
    localStorage.removeItem("auth");
  };
  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/frontend_template_pwa_typescript/src/pages"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            />
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a
                href="frontend_template_pwa_typescript/src/components/jsx/ui/navbars#"
                className="nav-link px-2 text-secondary"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="frontend_template_pwa_typescript/src/components/jsx/ui/navbars#"
                className="nav-link px-2 text-white"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="frontend_template_pwa_typescript/src/components/jsx/ui/navbars#"
                className="nav-link px-2 text-white"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="frontend_template_pwa_typescript/src/components/jsx/ui/navbars#"
                className="nav-link px-2 text-white"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="frontend_template_pwa_typescript/src/components/jsx/ui/navbars#"
                className="nav-link px-2 text-white"
              >
                About
              </a>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
