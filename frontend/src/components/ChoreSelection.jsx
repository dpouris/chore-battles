import { Button, Group, MultiSelect } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import React, { useState } from "react";

const ChoreSelection = ({ chores, accessTkn }) => {
  const notifications = useNotifications();
  const [selectedChores, setSelectedChores] = useState([]);

  const handleSubmit = () => {
    if (selectedChores.length > 0) {
      selectedChores.forEach(async (choreId) => {
        const res = await fetch("http://localhost:8000/api/v1/history/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessTkn,
          },
          body: JSON.stringify({ name: choreId }),
        });
        const data = await res.json();
        console.log(data);
      });

      notifications.showNotification({
        title: "Success",
        message: "Your chores have been updated!🎉",
        color: "green",
        autoClose: 2000,
      });
      return;
    }
    notifications.showNotification({
      title: "Error",
      message: "You can't submit no chores! 🤥",
      color: "red",
      autoClose: 2000,
    });
  };

  return (
    <>
      <MultiSelect
        className="m-10 border-2 rounded p-5"
        label="Chores:"
        placeholder="Pick a chore"
        data={chores ? chores : []}
        onChange={(e) => setSelectedChores(e)}
      />
      <Group position="center">
        <Button variant="outline" onClick={handleSubmit}>
          Submit Chores
        </Button>
      </Group>
    </>
  );
};

export default ChoreSelection;
