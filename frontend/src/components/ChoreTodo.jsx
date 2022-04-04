import { useState, useEffect, useRef, useContext } from "react";
import { SegmentedControl } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
import HistoryContext from "../context/HistoryContext";
import baseAxios from "../helpers/axios";
import { useNotifications } from "@mantine/notifications";

const ChoreTodo = ({ choreSegments }) => {
  const [allIncompleteChores, setAllIncompleteChores] = useState();
  const [segmentOptions, setSegmentOptions] = useState();
  const [selectedChores, setSelectedChores] = useState();
  const { history, setPoints, setUpdate } = useContext(HistoryContext);
  const notifications = useNotifications();

  const choreIdRef = useRef();

  const handleCompletion = async (e) => {
    const choreID = e.target.nextSibling.textContent;

    const response = await baseAxios.patch(`history/${choreID}/`, {
      completed: true,
    });

    const updatedChores = selectedChores.filter((chore) => {
      if (chore.id !== response.data.id) return chore;
      setPoints((prev) => prev + chore.points);
    });
    setAllIncompleteChores(updatedChores);
    setSelectedChores(updatedChores);
    setUpdate((prev) => !prev);

    notifications.showNotification({
      title: `+${response.data.points} POINTS`,
      message: `${response.data.log_name} has been completed!🎉`,
      color: "green",
      autoClose: 2000,
    });
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
    return minsPassed + "m";
  };

  const handleSegmentChange = (e) => {
    if (e === "all") {
      setSelectedChores(allIncompleteChores);
      return;
    }
    const segmentOptions = allIncompleteChores.filter((chore) => {
      if (chore.name === e) return chore;
    });

    setSelectedChores(segmentOptions);
  };

  useEffect(async () => {
    const filteredChores = history.filter((chore) => !chore.completed);
    setAllIncompleteChores(filteredChores);
    setSelectedChores(filteredChores);
  }, [history]);

  useEffect(() => {
    let formattedChoreSegments;
    if (choreSegments.length > 0 && !segmentOptions) {
      formattedChoreSegments = choreSegments.map((chore) => {
        return { label: chore.name, value: chore.id };
      });
      setSegmentOptions([
        { label: "All", value: "all" },
        ...formattedChoreSegments,
      ]);
    }
  }, [choreSegments]);

  return (
    <div className=" flex flex-col items-center gap-4 ">
      {segmentOptions && (
        <SegmentedControl
          data={segmentOptions}
          onChange={handleSegmentChange}
          size="md"
          radius="0.5rem"
          className="w-full
          overflow-scroll"
        />
      )}
      <div className="flex flex-col items-center justify-center w-full gap-3">
        {selectedChores?.length > 0 ? (
          selectedChores.map((chore) => {
            return (
              <div
                key={chore.id}
                className="flex justify-between items-center px-4 py-1 rounded-lg shadow-inner shadow-gray-300 h-12 w-full lg:w-1/2 hover:bg-blue-400 hover:shadow-md transition-all hover:text-white hover:font-semibold group gap-2"
              >
                <p className="pointer-events-none group-hover:hidden">
                  {chore.log_name}
                </p>
                <p className="pointer-events-none group-hover:block hidden">
                  {chore.points} P
                </p>
                <p className="text-blue-500 truncate group-hover:overflow-visible group-hover:text-white pointer-events-none">
                  {calcDateDiff(chore.date_created)}
                </p>
                <button
                  onClick={handleCompletion}
                  className="hidden group-hover:block"
                >
                  <FontAwesomeIcon
                    icon={faCheckToSlot}
                    className="group-hover:block hidden cursor-pointer pointer-events-none"
                  />
                </button>
                <p hidden ref={choreIdRef}>
                  {chore.id}
                </p>
              </div>
            );
          })
        ) : (
          <h2>No chores todo. 🧼</h2>
        )}
      </div>
    </div>
  );
};

export default ChoreTodo;
