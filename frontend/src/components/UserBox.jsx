import React from "react";
import { Divider } from "@mantine/core";

const UserBox = ({ username, score }) => {
  return (
    <div className="flex flex-col justify-between items-center px-5 w-full py-2 text-lg gap-2">
      <div className="w-full flex">
        <div className="font-bold bg-blue-400 w-1/2 text-left -skew-x-12 pl-2 text-white border-2 border-white shadow-lg shadow-blue-400">
          {username}{" "}
        </div>
        <div className="flex items-center justify-between font-bold bg-green-400 w-1/2 text-right -skew-x-12 pr-2 text-white border-2 border-white shadow-lg shadow-green-400">
          <span className="pl-2">Score: </span>
          {score}
        </div>
      </div>
      {/* <p className="text-gray-400 text-sm">Chores todo</p> */}
      <Divider label="Placeholder Score" labelPosition="center" />
    </div>
  );
};

export default UserBox;
