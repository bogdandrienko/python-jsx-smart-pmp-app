import React, { useEffect, useState } from "react";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import "./App.css";
import "./css/bootstrap_5.1.3/bootstrap.min.css";
import "./css/font_awesome_6_0_0/css/all.min.css";
import "./css/font_zen/style.css";
// TODO default exported pages /////////////////////////////////////////////////////////////////////////////////////////
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { PostListPage } from "./pages/PostListPage";
import { AboutPage } from "./pages/AboutPage";

import AuthContext from "./components/contexts";
import { Loader1 } from "./components/UI/loaders";
import TestPage from "./pages/TestPage";

export const publicRoutes = [{ path: "/login", element: <LoginPage /> }];

export const privateRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/test", element: <TestPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/posts", element: <PostListPage /> },
  { path: "/posts/:id", element: <PostPage /> },
];

// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setIsLoading(false);
  });
  if (isLoading) {
    return <Loader1 />;
  }
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth: setIsAuth, isLoading }}>
      <BrowserRouter>
        {isAuth ? (
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
        )}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
