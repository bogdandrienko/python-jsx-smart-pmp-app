import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsAction, userLogoutAction } from "../actions/userActions";

const TitleComponent = ({
  first = "Заголовок",
  second = "подзаголовок.",
  logic = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userLoginState = useSelector((state) => state.userLoginState);
  const {
    load: loadUserLogin,
    data: dataUserLogin,
    error: errorUserLogin,
    fail: failUserLogin,
  } = userLoginState;

  const userDetailsStore = useSelector((state) => state.userDetailsStore);
  const {
    load: loadUserDetails,
    data: dataUserDetails,
    error: errorUserDetails,
    fail: failUserDetails,
  } = userDetailsStore;

  useEffect(() => {
    if (logic) {
      dispatch(userDetailsAction());
    }
  }, [dispatch, logic]);

  useEffect(() => {
    if (logic) {
      if (dataUserLogin == null && location.pathname !== "/login") {
        navigate("/login");
      } else {
        if (errorUserDetails !== undefined) {
          dispatch(userLogoutAction());
        } else {
          if (dataUserLogin !== undefined) {
            if (dataUserDetails && dataUserDetails["user_model"]) {
              if (
                dataUserDetails["user_model"]["activity_boolean_field"] ===
                false
              ) {
                dispatch(userLogoutAction());
              }
              if (
                !dataUserDetails["user_model"]["email_field"] ||
                !dataUserDetails["user_model"]["secret_question_char_field"] ||
                !dataUserDetails["user_model"]["secret_answer_char_field"]
              ) {
                navigate("/change_profile");
              }
            }
          }
        }
      }
    }
  }, [
    dataUserLogin,
    location.pathname,
    navigate,
    dispatch,
    logic,
    errorUserDetails,
    dataUserDetails,
  ]);

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
