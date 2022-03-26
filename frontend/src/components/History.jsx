import { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import { newFetch } from "../helpers/helpers";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(async () => {
    const historyData = await newFetch("history");
    !historyData.detail && setHistory(historyData);

    return;
  }, []);

  return (
    <div className="fixed bottom-[9.5vh] overflow-scroll w-screen top-[9.5vh]">
      <Table striped highlightOnHover horizontalSpacing="lg">
        <thead className="sticky top-0">
          <tr className=" bg-gray-200 shadow-md">
            {/* <th className="hover:bg-gray-100 cursor-pointer ">ID</th> */}
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
                  {/* <td>{chore.id}</td> */}
                  <td>{chore.log_name}</td>
                  <td className="flex gap-2">
                    <span className="text-blue-500 font-normal">
                      {new Date(chore.date_created).toLocaleString()}
                    </span>
                  </td>
                  <td
                    className={`${
                      chore.completed ? "bg-green-400" : "bg-red-400"
                    } font-semibold text-white rounded-xl truncate text-center w-1/4`}
                  >
                    {chore.completed ? "Completed" : "Not completed"}
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
