import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { refreshToken } from "../helpers/helpers";
import { useNotifications } from "@mantine/notifications";

const ChoreItem = ({ chore }) => {
  const choreRef = useRef();
  const notifications = useNotifications();

  const handleClick = async () => {
    let accessTkn = localStorage.getItem("access");
    if (!accessTkn) {
      const refreshTkn = localStorage.getItem("refreshTkn");
      accessTkn = await refreshToken(refreshTkn);
    }

    try {
      const res = await fetch("http://localhost:8000/api/v1/history/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessTkn,
        },
        body: JSON.stringify({ name: choreRef.current.textContent }),
      });
      const data = await res.json();

      notifications.showNotification({
        title: "Success",
        message: data.log_name + " has been added!🎉",
        color: "green",
        autoClose: 2000,
      });
    } catch (err) {
      notifications.showNotification({
        title: "Error",
        message: err.message,
        color: "red",
        autoClose: 2000,
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="p-5 rounded shadow-lg flex justify-between transition-all cursor-pointer group relative"
    >
      <h1>{chore.name}</h1>
      <p hidden ref={choreRef}>
        {chore.id}
      </p>
      <FontAwesomeIcon
        icon={faCirclePlus}
        size="lg"
        className="group-hover:text-white select-none text-green-500"
      />
      <div className="absolute -right-0 top-0 rounded bottom-0 w-1/2 z-[-1] scale-x-0 group-hover:scale-x-100 bg-green-500 origin-right transition-all"></div>
    </div>
  );
};

export default ChoreItem;
