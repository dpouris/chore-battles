import React from "react";
import { useNavigate } from "react-router-dom";
import BroomLogo from "../images/cross-broom.png";

const Header = ({ children }) => {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-lg flex items-center justify-between p-5 sticky top-0 h-[9.5vh] z-50">
      <img
        src={BroomLogo}
        alt="Logo"
        className="w-12 cursor-pointer"
        onClick={() => {
          navigate("/home");
          window.location.reload();
        }}
      />
      <div className="flex items-center justify-center gap-3">{children}</div>
    </header>
  );
};

export default Header;
