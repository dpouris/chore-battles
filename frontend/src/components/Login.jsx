import { Link, useNavigate } from "react-router-dom";
import { useNotifications } from "@mantine/notifications";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useEffect } from "react";
import BroomLogo from "../images/cross-broom.png";
import { newFetch } from "../helpers/helpers";

const Login = () => {
  const navigate = useNavigate();
  const notifications = useNotifications();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    const options = { method: "POST", body: JSON.stringify(items) };

    const data = await newFetch("auth/tokens", options);

    if (data.access) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      navigate("/home");
      return;
    }

    notifications.showNotification({
      title: "Error",
      message: data.detail,
      color: "red",
      autoClose: false,
    });
  };

  useEffect(() => {
    localStorage.getItem("refresh") && navigate("/home");
  }, []);

  return (
    <div className="bg-gradient-to-t bg-blue-500 flex flex-col gap-3 items-center justify-center h-screen">
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
          <PasswordInput
            placeholder="Password"
            label="Password"
            radius="md"
            size="md"
            required
            // error="Invalid Password"
            variant="filled"
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
        <Link className="text-blue-400 underline text-left" to="/signup">
          Don't have an account yet? Sign up.
        </Link>
      </form>
    </div>
  );
};

export default Login;
