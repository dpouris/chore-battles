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
        <Route path="login" element={<Login />} />
        <Route path="/" element={<App index />} />
        <Route path="add_item" element={<App addItem />} />
        <Route path="history" element={<App history />} />
      </Routes>
    </Router>
  </NotificationsProvider>,
  document.getElementById("root")
);
