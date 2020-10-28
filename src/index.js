import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import appRoute from "./routes";
import { BrowserRouter } from "react-router-dom";
import reducers from "./reducers";

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>{appRoute()}</BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
