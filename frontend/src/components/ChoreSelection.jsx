import { Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import { newFetch, refreshToken } from "../helpers/helpers";
import ChoreItem from "./ChoreItem";
import ChoreTodo from "./ChoreTodo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandSparkles, faListCheck } from "@fortawesome/free-solid-svg-icons";

const ChoreSelection = () => {
  const [choreList, setChoreList] = useState([]);
  const [updateTodo, setUpdateTodo] = useState(0);

  useEffect(async () => {
    let choreData = await newFetch("chores");
    !choreData.detail && setChoreList(choreData);

    if (choreData.detail) {
      const refresh = localStorage.getItem("refresh");
      await refreshToken(refresh);
      choreData = await newFetch("chores");
      !choreData.detail && setChoreList(choreData);
    }

    return;
  }, []);

  return (
    <div className="flex flex-col gap-3 p-3 fixed top-[9.5vh] bottom-[9.5vh] w-screen overflow-scroll">
      <div className="text-center">
        <FontAwesomeIcon
          icon={faHandSparkles}
          className="text-green-500 text-2xl"
        />
        <Divider mx="md" label="Choose a chore" labelPosition="center" />
      </div>
      <div className="flex flex-col gap-2">
        {choreList &&
          choreList.map((chore) => {
            return (
              <ChoreItem
                setUpdateTodo={setUpdateTodo}
                chore={chore}
                key={chore.id}
              />
            );
          })}
      </div>
      <div className="text-center">
        <FontAwesomeIcon
          icon={faListCheck}
          className="text-blue-500 text-2xl "
        />
        <Divider mx="md" label="Chores todo" labelPosition="center" />
      </div>
      {/* Todo */}
      <ChoreTodo updateTodo={updateTodo} choreSegments={choreList} />
    </div>
  );
};

export default ChoreSelection;
