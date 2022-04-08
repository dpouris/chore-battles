import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

import { useNotifications } from "@mantine/notifications";
import { Button, TextInput } from "@mantine/core";
import { PasswordStrength } from "./PasswordRegisterField";

import BroomLogo from "../images/cross-broom.png";
import useAxios from "../hooks/useAxios";

const Register = () => {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const { loading, error, data, makeRequest } = useAxios();
  const { setUser } = useContext(UserContext);
  const [usernameError, setUsernameError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const items = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    makeRequest("post", "auth/register/", items);
  };
  useEffect(async () => {
    if (error?.error) {
      notifications.showNotification({
        title: "Error",
        message: error.error,
        color: "red",
        autoClose: 2000,
      });
      setUsernameError(error.error);
      delete error.error;
    }

    if (data && loading) {
      setUser(data);
      navigate("/");
      return;
    }
  }, [error, data, loading]);

  return (
    <div className="bg-blue-500 flex flex-col gap-3 items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col items-center justify-center gap-3 bg-white p-10 shadow-xl w-screen"
        autoComplete="off"
      >
        <img src={BroomLogo} alt="Logo" className="w-20" />
        <h1 className="text-black text-3xl">Register</h1>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextInput
            placeholder="Username"
            label="Username"
            radius="md"
            size="md"
            className="w-[100%]"
            required
            error={usernameError}
            autoComplete="off"
          />
          <PasswordStrength />
        </div>
        <Button
          variant="outline"
          type="submit"
          className="bg-blue-400 text-white hover:bg-blue-600 shadow-lg"
        >
          Register
        </Button>
        <Link className="text-blue-400 underline text-left" to="/login">
          Already have an account? Login.
        </Link>
      </form>
    </div>
  );
};

export default Register;
