import React, { useEffect, useState } from "react";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import { BrowserRouter } from "react-router-dom";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import "./App.css";
import "./css/bootstrap_5.1.3/bootstrap.min.css";
import "./css/font_awesome_6_0_0/css/all.min.css";
import "./css/font_zen/style.css";
// TODO default exported pages /////////////////////////////////////////////////////////////////////////////////////////
import { AppRouter } from "./components/AppRouter";
import AuthContext from "./context";
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
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth: setIsAuth, isLoading }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
