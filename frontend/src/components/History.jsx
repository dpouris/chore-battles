import { useEffect, useState } from "react";
import { refreshToken } from "../helpers/helpers";
import { Table } from "@mantine/core";

const History = () => {
  const [history, setHistory] = useState();

  const fetchHistory = async () => {
    const refreshTkn = localStorage.getItem("refresh");
    if (refreshTkn) {
      const accessToken = await refreshToken(refreshTkn);
      const res = await fetch("http://localhost:8000/api/v1/history/", {
        headers: { Authorization: "Bearer " + accessToken },
      });
      const data = await res.json();
      console.log(data);
      setHistory(data);
      return;
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="fixed bottom-[12vh] overflow-scroll w-screen top-[4rem]">
      <Table striped highlightOnHover horizontalSpacing="lg">
        <thead className="sticky top-0">
          <tr className=" bg-gray-200 shadow-md">
            <th className="hover:bg-gray-100 cursor-pointer ">ID</th>
            <th className="hover:bg-gray-100 cursor-pointer ">Chore</th>
            <th className="hover:bg-gray-100 cursor-pointer ">Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {history &&
            history.map((chore) => {
              return (
                <tr key={chore.id}>
                  <td>{chore.id}</td>
                  <td>{chore.log_name}</td>
                  <td className="flex gap-2">
                    <span className="text-blue-500 font-normal">
                      {new Date(chore.date_created).toDateString()}
                    </span>
                    /
                    <span className="text-green-500 font-normal">
                      {new Date(chore.date_created).toLocaleTimeString()}
                    </span>
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
