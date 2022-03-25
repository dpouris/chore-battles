import { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";

const History = ({ accessToken }) => {
  const [history, setHistory] = useState();
  const notifications = useNotifications();

  useEffect(async () => {
    if (accessToken && !history) {
      try {
        const res = await fetch("http://localhost:8000/api/v1/history/", {
          headers: { Authorization: "Bearer " + accessToken },
        });
        const data = await res.json();

        setHistory(data);
        return;
      } catch (err) {
        notifications.showNotification({
          title: "Error",
          message: err.message,
          color: "red",
          autoClose: 2000,
        });
      }
    }
  }, [accessToken]);

  return (
    <div className="fixed bottom-[9.5vh] overflow-scroll w-screen top-[4rem]">
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
                      chore.completed ? "bg-green-500" : "bg-red-500"
                    } font-semibold text-white`}
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
