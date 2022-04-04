import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

import { useNotifications } from "@mantine/notifications";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { PasswordStrength } from "./PasswordRegisterField";

import BroomLogo from "../images/cross-broom.png";
import useAxios from "../hooks/useAxios";

const Register = () => {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const { loading, error, data, makeRequest } = useAxios();
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const items = {
      username: e.target[0].value,
      password: e.target[1].value,
    };

    makeRequest("post", "auth/register/", items);
  };
  useEffect(async () => {
    const lgi = localStorage.getItem("lgi");

    if (lgi) {
      navigate("/home");
    }

    if (error) {
      notifications.showNotification({
        title: "Error",
        message: error.response.data.detail,
        color: "red",
        autoClose: 2000,
      });
    }

    if (data && loading) {
      localStorage.setItem("lgi", "t");
      setUser(data);
      navigate("/");
      return;
    }
  }, [error, data, loading]);

  return (
    <div className="bg-gradient-to-t bg-blue-500 flex flex-col gap-3 items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col items-center justify-center gap-3 bg-white p-10 shadow-xl w-screen"
      >
        <img src={BroomLogo} alt="Logo" className="w-20" />
        <h1 className="text-black text-3xl">Register</h1>
        <div className="w-full">
          <TextInput
            placeholder="Username"
            label="Username"
            radius="md"
            size="md"
            // error="Invalid Username"
            variant="filled"
            required
          />
          {/* <label htmlFor="Username" className="text-black pl-1">
            Username
          </label>
          <input
            className="p-3 w-[80vw] rounded outline-none shadow-lg shadow-gray-300"
            type="text"
            name="Username"
            id="Username"
            placeholder="Username"
          /> */}
        </div>
        <div className="w-full">
          {/* <PasswordInput
            placeholder="Password"
            label="Password"
            radius="md"
            size="md"
            required
            // error="Invalid Password"
            variant="filled"
          ></PasswordInput> */}
          <PasswordStrength></PasswordStrength>
          {/* <label htmlFor="Password" className="text-black pl-1">
            Password
          </label>
          <input
            className="p-3 w-[80vw] rounded outline-none shadow-lg shadow-gray-300"
            type="Password"
            name="Password"
            id="Password"
            placeholder="Password"
          /> */}
        </div>
        <Button
          variant="outline"
          type="submit"
          className="bg-blue-400 text-white hover:bg-blue-600 shadow-lg"
        >
          Register
        </Button>
        <Link className="text-blue-400 underline text-left" to="/login">
          Already have an account? Login in.
        </Link>
      </form>
    </div>
  );
};

export default Register;