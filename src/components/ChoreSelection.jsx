import { Divider } from "@mantine/core";
import { useContext, useState } from "react";
import ChoreItem from "./ChoreItem";
import ChoreTodo from "./ChoreTodo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandSparkles, faListCheck } from "@fortawesome/free-solid-svg-icons";
import ChoreContext from "../context/ChoreContext";

const ChoreSelection = () => {
  const [updateTodo, setUpdateTodo] = useState(0);
  const { choreList } = useContext(ChoreContext);

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

      <ChoreTodo choreSegments={choreList} />
    </div>
  );
};

export default ChoreSelection;
