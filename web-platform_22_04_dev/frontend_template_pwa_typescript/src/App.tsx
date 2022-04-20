import React, { useEffect, useState } from "react";
import "./App.css";
import "./css/bootstrap_5.1.3/bootstrap.min.css";
import "./css/font_awesome_6_0_0/css/all.min.css";
import "./css/font_zen/style.css";
import { BrowserRouter } from "react-router-dom";

import AuthContext from "./components/contexts";
import Routers from "./components/routers";

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
    return <h5>Download...</h5>;
  }
  return (
    // @ts-ignore
    <AuthContext.Provider value={{ isAuth, setIsAuth: setIsAuth, isLoading }}>
      <BrowserRouter>
        <Routers {...isAuth} />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
