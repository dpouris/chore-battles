import { Button, Divider, PasswordInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import baseAxios from "../helpers/axios";

const ChanglePassword = () => {
  const [credError, setCredError] = useState(null);
  const { user } = useContext(UserContext);
  const notifications = useNotifications();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const userToAuthenticate = {
      username: user.username,
      password: e.target["prev-password"].value,
    };

    let authenticateResponse;
    let changePswResponse;

    try {
      authenticateResponse = await baseAxios.post(
        "auth/authenticate/",
        userToAuthenticate
      );
    } catch (err) {
      notifications.showNotification({
        title: "Error",
        message: err.response.data.error,
        color: "red",
        autoClose: 3000,
      });
      setCredError(err.response.data.error);
    }

    if (authenticateResponse.data?.success) {
      changePswResponse = await baseAxios.patch(`users/${user.id}/`, {
        type: "password",
        password: e.target["new-password"].value,
      });

      changePswResponse.data?.success
        ? notifications.showNotification({
            title: "Success",
            message: "Password changed successfully",
            color: "green",
            duration: 2000,
          })
        : notifications.showNotification({
            title: "Error",
            message: "Password change failed",
            color: "red",
            duration: 2000,
          });
      navigate("/");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="my-5 text-3xl">Change password</h1>
      <Divider className="w-screen"></Divider>
      <form
        onSubmit={handleSubmit}
        className="h-screen w-screen flex flex-col items-center mt-10 p-4 gap-4"
      >
        <PasswordInput
          placeholder="Previous Password"
          label="Previous Password"
          radius="md"
          size="md"
          variant="filled"
          name="prev-password"
          className="w-full"
          required
          error={credError}
        ></PasswordInput>
        <PasswordInput
          placeholder="New Password"
          label="New Password"
          radius="md"
          size="md"
          variant="filled"
          name="new-password"
          className="w-full"
          required
        ></PasswordInput>
        <Button variant="filled" className="bg-blue-400" type="submit">
          Change
        </Button>
      </form>{" "}
    </div>
  );
};

export default ChanglePassword;
