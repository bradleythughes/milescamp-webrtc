import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "webrtc-adapter";
import { store } from "./store";
import App from "./components/App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
