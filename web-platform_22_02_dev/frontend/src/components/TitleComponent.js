import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsAction, userLogoutAction } from "../js/actions";

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
    <div>
      <header className="pb-3 m-1">
        <div className="container d-flex flex-wrap justify-content-center shadow">
          <div className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
            <span className="fw-normal fs-4 text-start">
              <p className="display-6 fw-normal text-start">{first}</p>
              <small className="lead fw-normal text-start">{second}</small>
            </span>
          </div>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0">
            <input
              type="search"
              className="form-control"
              placeholder="Поиск..."
              aria-label="Search"
            />
          </form>
        </div>
      </header>
    </div>
  );
};

export default TitleComponent;
