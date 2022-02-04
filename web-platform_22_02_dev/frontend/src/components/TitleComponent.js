import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const TitleComponent = ({ first = "Заголовок", second = "подзаголовок." }) => {
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
    <div className="text-center m-1">
      <header className="text-center container card">
        <h6 className="lead">{first}</h6>
        <small className="text-muted">{second}</small>
      </header>
    </div>
  );
};

export default TitleComponent;
