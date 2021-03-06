import { Link, useNavigate } from "react-router-dom";
import { useNotifications } from "@mantine/notifications";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import BroomLogo from "../images/cross-broom.png";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { refreshToken } from "../helpers/axios";

const Login = () => {
  const navigate = useNavigate();
  const notifications = useNotifications();
  const { loading, error, data, makeRequest } = useAxios();
  const { setUser } = useContext(UserContext);
  const [credError, setCredError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = {
      username: e.target[0].value,
      password: e.target[1].value,
    };

    await makeRequest("post", "auth/login/", items);

    console.log(error);
  };

  useEffect(async () => {
    if (data?.data) {
      setUser(data);
      navigate("/");
      delete data.data;
    }

    const refreshRes = await refreshToken();

    if (!refreshRes.log_out) {
      navigate("/home");
    }

    if (error?.error) {
      notifications.showNotification({
        title: "Error",
        message: error.error,
        color: "red",
        autoClose: 2000,
      });
      setCredError(error.error);
      delete error.error;
    }
  }, [data, error, loading]);

  return (
    <div className="bg-blue-500 flex flex-col gap-3 items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col items-center justify-center gap-3 bg-white p-10 shadow-xl w-screen"
      >
        <img src={BroomLogo} alt="Logo" className="w-20" />
        <h1 className="text-black text-3xl">Login</h1>
        <div className="w-full">
          <TextInput
            placeholder="Username"
            label="Username"
            radius="md"
            size="md"
            variant="filled"
            required
            error={credError}
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
          <PasswordInput
            placeholder="Password"
            label="Password"
            radius="md"
            size="md"
            required
            // error="Invalid Password"
            variant="filled"
            error={credError}
          ></PasswordInput>
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
          Login
        </Button>
        <Link className="text-blue-400 underline text-left" to="/register">
          Don't have an account yet? Sign up.
        </Link>
      </form>
    </div>
  );
};

export default Login;
