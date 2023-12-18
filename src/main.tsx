import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CustomersProvider from "./context/CustomersProvider";

ReactDOM.render(
  <CustomersProvider>
    <App />
  </CustomersProvider>,
  document.getElementById("root")
);
