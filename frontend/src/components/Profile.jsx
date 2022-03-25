import React from "react";
import Blockies from "react-blockies";

const Profile = ({ username, className }) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-3">
        <Blockies
          seed={username}
          size={12}
          scale={3}
          // color="#dfe"
          // bgColor="#ffe"
          // spotColor="#abc"
          className="rounded-full"
        />
        <h2 className="font-light">Hello, {username}!</h2>
      </div>
    </div>
  );
};

export default Profile;
