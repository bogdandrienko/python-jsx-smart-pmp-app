import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { userLogoutAnyAction } from "../../js/actions";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLogoutAnyAction());
    navigate("/login");
  }, [dispatch, navigate]);

  return <div>.</div>;
};

export default LogoutPage;
