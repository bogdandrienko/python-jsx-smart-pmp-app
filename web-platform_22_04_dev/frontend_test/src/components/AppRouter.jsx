import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, routes } from "../router/routes";
import AuthContext from "../context";
import MyLoader from "./UI/loader/MyLoader";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <MyLoader />;
  }
  return isAuth ? (
    <Routes>
      {privateRoutes.map(({ path, element }, key) => (
        <Route exact path={path} element={element} key={key} />
      ))}
      <Route path="*" element={<Navigate to="/posts" replace />} />
    </Routes>
  ) : (
    <Routes>
      {routes.map(({ path, element }, key) => (
        <Route exact path={path} element={element} key={key} />
      ))}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
