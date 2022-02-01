import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Title = ({ first = "Заголовок", second = "подзаголовок." }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo == null && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [location.pathname, navigate, userInfo]);

  return (
    <header className="text-center container">
      <h1 className="display-6">{first}</h1>
      <p className="lead text-secondary">{second}</p>
    </header>
  );
};

export default Title;
