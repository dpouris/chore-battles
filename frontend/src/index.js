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
        <Route path="/" element={<Login />} />
        <Route path="home" element={<App home />} />
        <Route path="chore" element={<App chore />} />
        <Route path="history" element={<App history />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Login />} />
      </Routes>
    </Router>
  </NotificationsProvider>,
  document.getElementById("root")
);
