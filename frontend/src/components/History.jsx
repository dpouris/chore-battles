import { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import { newFetch, refreshToken } from "../helpers/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";

const History = () => {
  const [history, setHistory] = useState([]);
  const [update, setUpdate] = useState(false);

  const [orderName, setOrderName] = useState(null);
  const [orderDate, setOrderDate] = useState(null);
  const [orderCompleted, setOrderCompleted] = useState(null);

  useEffect(async () => {
    let historyData = await newFetch("history");
    !historyData.detail && setHistory(historyData);

    if (historyData.detail) {
      const refresh = localStorage.getItem("refresh");
      await refreshToken(refresh);
      historyData = await newFetch("history");
      !historyData.detail && setHistory(historyData);
    }

    return;
  }, []);

  const handleSortBy = (e, by) => {
    let sortBy = [];
    if (e.target.classList.contains("desc")) {
      e.target.classList.remove("desc");
      e.target.classList.add("asc");
      sortBy = history.sort((a, b) => (a[by] > b[by] ? 1 : -1));
    } else if (e.target.classList.contains("asc")) {
      e.target.classList.remove("asc");
      e.target.classList.add("desc");
      sortBy = history.sort((a, b) => (a[by] < b[by] ? 1 : -1));
    } else {
      e.target.classList.add("desc");
      sortBy = history.sort((a, b) => (a[by] < b[by] ? 1 : -1));
    }

    if (e.target.classList.contains("name")) {
      setOrderName(!orderName);
      setOrderDate(null);
      setOrderCompleted(null);
    }
    if (e.target.classList.contains("date")) {
      setOrderDate(!orderDate);
      setOrderName(null);
      setOrderCompleted(null);
    }
    if (e.target.classList.contains("completed")) {
      setOrderCompleted(!orderCompleted);
      setOrderName(null);
      setOrderDate(null);
    }

    setUpdate(!update);
    setHistory(sortBy);
  };

  return (
    <div className="fixed bottom-[9.5vh] overflow-scroll w-screen top-[9.5vh]">
      <Table striped highlightOnHover horizontalSpacing="lg">
        <thead className="sticky top-0">
          <tr className=" bg-gray-200 shadow-md">
            <th
              onClick={(e) => handleSortBy(e, "name")}
              className="hover:bg-gray-100 cursor-pointer name"
            >
              Chore{" "}
              <FontAwesomeIcon
                icon={
                  orderName !== null
                    ? orderName === true
                      ? faSortDown
                      : faSortUp
                    : faSort
                }
              />
            </th>
            <th
              onClick={(e) => handleSortBy(e, "date_created")}
              className="hover:bg-gray-100 cursor-pointer date"
            >
              Date/Time{" "}
              <FontAwesomeIcon
                icon={
                  orderDate !== null
                    ? orderDate === true
                      ? faSortDown
                      : faSortUp
                    : faSort
                }
              />
            </th>
            <th
              onClick={(e) => handleSortBy(e, "completed")}
              className="hover:bg-gray-100 cursor-pointer completed"
            >
              Completed{" "}
              <FontAwesomeIcon
                icon={
                  orderCompleted !== null
                    ? orderCompleted === true
                      ? faSortDown
                      : faSortUp
                    : faSort
                }
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {history &&
            history.map((chore) => {
              return (
                <tr key={chore.id}>
                  <td>{chore.log_name}</td>
                  <td className="flex gap-2">
                    <span className="text-blue-500 font-normal">
                      {new Date(chore.date_created).toLocaleString()}
                    </span>
                  </td>
                  <td className="text-center">
                    {chore.completed ? (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-xl text-green-400"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="text-xl text-red-400"
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default History;
