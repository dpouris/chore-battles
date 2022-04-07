import { Button } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { blackListToken } from "../helpers/helpers";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshTkn = localStorage.getItem("refresh");
    blackListToken(refreshTkn);

    localStorage.removeItem("refresh");
    localStorage.removeItem("access");

    navigate("/login");
    return;
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
