import React from "react";
import BroomLogo from "../cross-broom.png";

const Header = ({ children }) => {
  return (
    <div className="bg-white-400 shadow-lg flex items-center justify-between p-5 sticky top-0 h-16">
      <img src={BroomLogo} alt="Logo" className="w-12" />
      <div className="flex items-center justify-center gap-3">{children}</div>
    </div>
  );
};

export default Header;
