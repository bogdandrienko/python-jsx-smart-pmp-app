import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PostItemPage from "../pages/PostItemPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { PostListUnlimitedScrollPage } from "../pages/PostListUnlimitedScrollPage";
import { PostListPaginationPage } from "../pages/PostListPaginationPage";
import TestPage from "../pages/TestPage";
import FormPage from "../pages/FormPage";
import { AboutPage } from "../pages/AboutPage";

import { PostListPage } from "../pages/PostListPage";
import { PostPage } from "../pages/PostPage";
import { PostCreatePage } from "../pages/PostCreatePage";
import { IdeaListPage } from "../pages/IdeaListPage";
import { IdeaPage } from "../pages/IdeaPage";
import { IdeaCreatePage } from "../pages/IdeaCreatePage";

export const publicRoutes = [{ path: "/login", element: <LoginPage /> }];

export const privateRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/test", element: <TestPage /> },
  { path: "/form", element: <FormPage /> },
  { path: "/about", element: <AboutPage /> },

  { path: "/idea/create", element: <IdeaCreatePage /> },
  { path: "/idea/list", element: <IdeaListPage /> },
  { path: "/idea/:id", element: <IdeaPage /> },

  { path: "/posts", element: <PostListPage /> },
  { path: "/posts/:id", element: <PostPage /> },
  { path: "/posts/create", element: <PostCreatePage /> },
  { path: "/posts_pagination", element: <PostListPaginationPage /> },
  { path: "/posts_unlimited", element: <PostListUnlimitedScrollPage /> },
  { path: "/posts_item/:id", element: <PostItemPage /> },
];

function Routers(isAuth = false) {
  return isAuth ? (
    <Routes>
      {privateRoutes.map(({ path, element }, key) => (
        <Route path={path} element={element} key={key} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, element }, key) => (
        <Route path={path} element={element} key={key} />
      ))}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default Routers;
