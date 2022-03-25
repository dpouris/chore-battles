import { useNavigate } from "react-router-dom";
import { useNotifications } from "@mantine/notifications";
import { Button } from "@mantine/core";
import { useEffect } from "react";
import Logo from "./Logo";

const Login = () => {
  const navigate = useNavigate();
  const notifications = useNotifications();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = {
      username: e.target[0].value,
      password: e.target[1].value,
    };

    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/tokens/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      });

      const data = await res.json();

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
    } catch (err) {
      notifications.showNotification({
        title: "Error",
        message: err.message,
        color: "red",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    localStorage.getItem("access") && navigate("/home");
  });

  return (
    <div className="bg-gradient-to-t bg-blue-500 flex flex-col gap-3 items-center justify-center h-screen">
      <div className="flex flex-col items-center ">
        <h1 className="text-blue-600 text-4xl font-bold bg-white p-2 w-screen flex items-center justify-center gap-3">
          Chore Battle
          <Logo size="md" color="blue" />
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col items-center justify-center gap-3 bg-white p-10 shadow-xl w-screen"
      >
        <h1 className="text-black text-3xl">Login</h1>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="Username" className="text-black pl-1">
            Username
          </label>
          <input
            className="p-3 w-[80vw] rounded outline-none shadow-lg shadow-gray-300"
            type="text"
            name="Username"
            id="Username"
            placeholder="Username"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="Password" className="text-black pl-1">
            Password
          </label>
          <input
            className="p-3 w-[80vw] rounded outline-none shadow-lg shadow-gray-300"
            type="Password"
            name="Password"
            id="Password"
            placeholder="Password"
          />
        </div>
        <Button
          variant="outline"
          type="submit"
          className="bg-blue-400 text-white hover:bg-blue-600 shadow-lg"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
