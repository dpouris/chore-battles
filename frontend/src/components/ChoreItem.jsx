import { useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useNotifications } from "@mantine/notifications";
import HistoryContext from "../context/HistoryContext";
import baseAxios from "../helpers/axios";

const ChoreItem = ({ chore }) => {
  const choreRef = useRef();
  const notifications = useNotifications();
  const { setUpdate } = useContext(HistoryContext);

  const handleClick = async () => {
    const response = await baseAxios.post("history/", {
      name: choreRef.current.textContent,
    });

    setUpdate((prev) => !prev);

    notifications.showNotification({
      title: "Success",
      message: response.data.log_name + " has been added!🎉",
      color: "green",
      autoClose: 2000,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="p-5 rounded-full shadow-md flex justify-between transition-all cursor-pointer group relative"
    >
      <h1 className="text-black">{chore.name}</h1>
      <p hidden ref={choreRef}>
        {chore.id}
      </p>
      <FontAwesomeIcon
        icon={faCirclePlus}
        size="lg"
        className="group-hover:text-white text-green-500 select-none z-50 group-hover:-translate-x-[32vw] lg:group-hover:-translate-x-[43vw] transition-all"
      />
      <div className="absolute right-1 top-1 rounded-full bottom-1 lg:w-1/2 md:w-[40vw] w-[50vw] scale-0 group-hover:scale-100 bg-green-500 origin-right transition-all shadow-md shadow-green-700"></div>
    </div>
  );
};

export default ChoreItem;
