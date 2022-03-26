import { Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import { newFetch } from "../helpers/helpers";
import ChoreItem from "./ChoreItem";

const ChoreSelection = () => {
  const [choreList, setChoreList] = useState([]);

  useEffect(async () => {
    const choreData = await newFetch("chores");
    !choreData.detail && setChoreList(choreData);

    return;
  }, []);

  return (
    <div className="flex flex-col gap-3 p-3 fixed top-[9.5vh] bottom-[9.5vh] w-screen">
      <div>
        <h1 className="text-3xl text-center">🧹</h1>
        <Divider my="md" label="Choose a chore" labelPosition="center" />
      </div>

      <div className="flex flex-col gap-2">
        {choreList ? (
          choreList.map((chore) => {
            return <ChoreItem chore={chore} key={chore.id} />;
          })
        ) : (
          <></>
        )}
      </div>
      <div>
        <h1 className="text-2xl text-center">✅</h1>
        <Divider mx="md" label="Chores todo" labelPosition="center" />
      </div>
      {/* Todo */}
    </div>
  );
};

export default ChoreSelection;
