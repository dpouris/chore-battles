import React from "react";

const Header = ({ children }) => {
  return (
    <div className="bg-white-400 shadow-lg flex items-center justify-end gap-3 p-5 sticky top-0 h-16">
      {children}
    </div>
  );
};

export default Header;
