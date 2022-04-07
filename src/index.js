import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./components/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";
import { UserProvider } from "./context/UserContext";
import Register from "./components/Register";
import ChanglePassword from "./components/ChanglePassword";

ReactDOM.render(
  <NotificationsProvider>
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={<App home />} />
          <Route path="chore" element={<App chore />} />
          <Route path="history" element={<App history />} />
          <Route path="account" element={<App account />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="account/change-password" element={<ChanglePassword />} />
        </Routes>
      </UserProvider>
    </Router>
  </NotificationsProvider>,
  document.getElementById("root")
);
