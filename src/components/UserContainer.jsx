import React from "react";

const UserContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-center flex-col gap-4 mt-5 px-5 rounded ">
      {children}
    </div>
  );
};

export default UserContainer;
