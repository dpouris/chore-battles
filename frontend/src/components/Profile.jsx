import { faP } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mantine/core";
import React from "react";
import Blockies from "react-blockies";
import ProfileMenu from "./ProfileMenu";

const Profile = ({ username, className }) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-3">
        <h2 className="font-light text-lg">Hello, {username}!</h2>
        <Tooltip label="Points" withArrow>
          <div className="px-2 py-1 rounded-lg shadow-blue-500 shadow-inner text-blue-900 bg-blue-50">
            438{" "}
            <FontAwesomeIcon icon={faP} size="sm" className="text-blue-400" />
          </div>
        </Tooltip>
        <ProfileMenu
          control={
            <button>
              <Blockies
                seed={username}
                size={12}
                scale={3}
                // color="#dfe"
                // bgColor="#ffe"
                // spotColor="#abc"
                className="rounded-full select-none"
              />
            </button>
          }
        />
      </div>
    </div>
  );
};

export default Profile;
