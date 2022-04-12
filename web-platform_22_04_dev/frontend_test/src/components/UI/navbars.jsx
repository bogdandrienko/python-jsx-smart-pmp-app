import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts";
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
        <Link to="/about" className="custom_navbar_1_link">
          about
        </Link>
        <Link to="/posts" className="custom_navbar_1_link">
          posts
        </Link>
        <Link to="/test" className="custom_navbar_1_link">
          test
        </Link>
      </div>
    </div>
  );
};
