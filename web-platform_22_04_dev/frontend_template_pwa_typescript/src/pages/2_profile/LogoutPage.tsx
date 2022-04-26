// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as action from "../../components/action";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export const LogoutPage = () => {
  // TODO hooks ////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dispatch = useDispatch();

  // TODO useEffect ////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(action.User.Logout());
  }, []);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

  return <div>.</div>;
};
