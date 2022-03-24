import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./components/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";

ReactDOM.render(
  <NotificationsProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  </NotificationsProvider>,
  document.getElementById("root")
);
