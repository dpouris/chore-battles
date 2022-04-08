import UserContext from "../context/UserContext";
import { useContext } from "react";

import { TextInput, Divider, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@mantine/notifications";

const Account = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const notifications = useNotifications();

  return (
    <div className="fixed bottom-[9.5vh] overflow-y-scroll w-screen top-[9.5vh]">
      <div className="p-10 flex flex-col gap-4 items-center justify-center">
        <h1 className="w-screen text-center text-3xl text-blue-400 ">
          Account
        </h1>
        <TextInput
          placeholder="Username"
          label="Username"
          radius="md"
          size="md"
          variant="filled"
          name="username"
          value={user.username}
          disabled
        ></TextInput>
        <TextInput
          placeholder="Email"
          label="Email"
          radius="md"
          size="md"
          variant="filled"
          name="email"
          value={user.email}
          disabled
        ></TextInput>
      </div>
      <Divider className="w-screen mt-5" label="Stats" labelPosition="center" />
      <div className="p-10 flex flex-col gap-4 items-center justify-center">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        placeat eveniet rerum odio, assumenda eligendi eaque accusamus sit aut
        necessitatibus nam tempora animi tempore tenetur at quos quia fuga
        laboriosam. Dolorum earum neque rerum unde facere ipsam delectus, quia
        accusamus possimus, consequuntur quos architecto voluptas illo nostrum
        veniam facilis consectetur?
      </div>
      <Divider
        className="w-screen mt-5"
        label="Settings"
        labelPosition="center"
      />
      <div className="p-10 flex flex-col gap-4 items-center justify-center">
        <Button
          variant="filled"
          className="bg-blue-400"
          onClick={() => navigate("/account/change-password")}
        >
          Change password
        </Button>
      </div>
    </div>
  );
};

export default Account;
