import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "../context";
import MyLoader from "./UI/loader/MyLoader";

import { PostListPage } from "../pages/PostListPage";
import PostPage from "../pages/PostPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

export const routes = [{ path: "/login", element: <LoginPage /> }];

export const privateRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <PostListPage /> },
  { path: "/posts", element: <PostListPage /> },
  { path: "/posts/:id", element: <PostPage /> },
];

export const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <MyLoader />;
  }
  return isAuth ? (
    <Routes>
      {privateRoutes.map(({ path, element }, key) => (
        <Route path={path} element={element} key={key} />
      ))}
      <Route path="*" element={<Navigate to="/posts" replace />} />
    </Routes>
  ) : (
    <Routes>
      {routes.map(({ path, element }, key) => (
        <Route path={path} element={element} key={key} />
      ))}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
