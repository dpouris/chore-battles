import { useState, useEffect, useRef } from "react";
import { newFetch } from "../helpers/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";

const ChoreTodo = ({ updateTodo }) => {
  const [incompleteChores, setIncompleteChores] = useState();
  const choreIdRef = useRef();

  const handleCompletion = async (e) => {
    const choreID = e.target.nextSibling.textContent;

    const options = {
      method: "PATCH",
      body: JSON.stringify({ completed: true }),
    };
    const res = await newFetch(`history/${choreID}`, options);
    const updatedChores = incompleteChores.filter((chore) => {
      if (chore.id !== res.id) return chore;
    });
    setIncompleteChores(updatedChores);
  };

  const calcDateDiff = (startDate) => {
    const now = new Date();
    startDate = new Date(startDate);
    const minsPassed = Math.floor(Math.abs(startDate - now) / 1000 / 60);

    if (minsPassed >= 60 * 24)
      return `${Math.floor(minsPassed / 60 / 24)}days ${Math.floor(
        (minsPassed / 60) % 24
      )}h ${minsPassed % 60}m`;
    if (minsPassed >= 60)
      return `${Math.floor(minsPassed / 60)}h ${minsPassed % 60}m`;
    if (minsPassed < 60) return minsPassed + "m";
  };

  useEffect(async () => {
    const data = await newFetch("history");
    const filteredChores = data.filter((chore) => !chore.completed);
    setIncompleteChores(filteredChores);
  }, [updateTodo]);

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 w-full gap-2">
      {incompleteChores &&
        incompleteChores.map((chore) => {
          return (
            <div
              key={chore.id}
              className="flex justify-start items-center px-4 py-1 rounded-lg shadow-inner shadow-gray-300 h-12 w-full lg:w-1/2 hover:bg-blue-400 transition-all hover:text-white hover:font-semibold group gap-2"
            >
              <p className="pointer-events-none group-hover:hidden">
                {chore.log_name}
              </p>
              <button onClick={handleCompletion}>
                <FontAwesomeIcon
                  icon={faCheckToSlot}
                  className="group-hover:block hidden cursor-pointer pointer-events-none"
                />
              </button>
              <p hidden ref={choreIdRef}>
                {chore.id}
              </p>
              <p className="text-blue-500 truncate group-hover:overflow-visible group-hover:text-white pointer-events-none">
                {calcDateDiff(chore.date_created)}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default ChoreTodo;
