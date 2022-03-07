import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { userLogoutAction } from "../../js/actions";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLogoutAction());
    navigate("/login");
  }, [dispatch, navigate]);

  return <div>.</div>;
};

export default LogoutPage;
