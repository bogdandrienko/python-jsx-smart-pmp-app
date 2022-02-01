import React from "react";
import ReactDOM from "react-dom";
import App from "./js/App";
import store from "./js/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
