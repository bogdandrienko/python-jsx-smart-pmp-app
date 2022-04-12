import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context";
import MyButton from "../button/MyButton";

const Footer = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const logout = (event) => {
    event.preventDefault();
    setIsAuth(false);
    localStorage.removeItem("auth");
  };
  return (
    <div className="navbar_1">
      <MyButton onClick={logout}>logout</MyButton>
      <div className="navbar_1__links m-1 p-1">
        <Link to="/login" style={{ margin: 2, padding: 2 }}>
          login
        </Link>
        <Link to="/about" style={{ margin: 2, padding: 2 }}>
          about
        </Link>
        <Link to="/posts" style={{ margin: 2, padding: 2 }}>
          posts
        </Link>
      </div>
    </div>
  );
};

export default Footer;
