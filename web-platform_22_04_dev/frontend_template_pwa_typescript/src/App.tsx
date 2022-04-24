import React from "react";
import "./App.css";
import "./css/bootstrap_5.1.3/bootstrap.min.css";
import "./css/font_awesome_6_0_0/css/all.min.css";
import "./css/font_zen/style.css";
import { BrowserRouter } from "react-router-dom";
import { Routers } from "./components/router";

function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}

export default App;
