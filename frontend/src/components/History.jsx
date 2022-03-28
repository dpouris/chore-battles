import { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import { newFetch, refreshToken } from "../helpers/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const History = () => {
  const [history, setHistory] = useState([]);

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

  return (
    <div className="fixed bottom-[9.5vh] overflow-scroll w-screen top-[9.5vh]">
      <Table striped highlightOnHover horizontalSpacing="lg">
        <thead className="sticky top-0">
          <tr className=" bg-gray-200 shadow-md">
            <th className="hover:bg-gray-100 cursor-pointer ">Chore</th>
            <th className="hover:bg-gray-100 cursor-pointer ">Date/Time</th>
            <th className="hover:bg-gray-100 cursor-pointer ">Completed</th>
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
