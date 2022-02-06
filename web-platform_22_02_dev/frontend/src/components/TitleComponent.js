import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsAction, userLogoutAction } from "../actions/userActions";

const TitleComponent = ({ first = "Заголовок", second = "подзаголовок." }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  useEffect(() => {
    dispatch(userDetailsAction());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo == null && location.pathname !== "/login") {
      navigate("/login");
    } else {
      if (error !== undefined) {
        dispatch(userLogoutAction());
      } else if (userInfo !== undefined) {
        if (user && user["user_model"]) {
          // console.log("user_model: ", user["user_model"]);
          if (user["user_model"]["activity_boolean_field"] === false) {
            dispatch(userLogoutAction());
          }
          if (
            user["user_model"]["email_field"] == null ||
            user["user_model"]["secret_question_char_field"] == null ||
            user["user_model"]["secret_answer_char_field"] == null
          ) {
            navigate("/change_profile");
          }
        }
      }
    }
  }, [userInfo, location.pathname, navigate, error, dispatch, user]);

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
