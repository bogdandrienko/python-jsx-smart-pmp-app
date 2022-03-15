import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { userLogoutAction } from "../../js/actions";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = useParams().id;

  useEffect(() => {
    dispatch(userLogoutAction());
    navigate("/login");
  }, [dispatch, navigate]);

  return <div>.</div>;
};
