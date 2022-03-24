import React from "react";

const Header = ({ children }) => {
  return (
    <div className="bg-gray-300 shadow-lg flex items-center justify-end gap-3 p-5">
      {children}
    </div>
  );
};

export default Header;
