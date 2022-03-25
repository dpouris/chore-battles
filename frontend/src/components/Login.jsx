import { useNavigate } from "react-router-dom";
import { useNotifications } from "@mantine/notifications";
import { Button } from "@mantine/core";

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
        navigate("/");
        return;
      }
    } catch (err) {
      notifications.showNotification({
        title: "Error",
        message: err,
        color: "red",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="bg-gradient-to-t bg-blue-500 flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-white text-4xl underline">Login</h1>
      <form
        onSubmit={handleSubmit}
        method="POST"
        className="flex flex-col items-center justify-center gap-3"
      >
        <input
          className="p-2 rounded outline-none shadow-inner shadow-gray-300"
          type="text"
          name="Username"
          id="Username"
          placeholder="Username"
        />
        <input
          className="p-2 rounded outline-none shadow-inner shadow-gray-300"
          type="Password"
          name="Password"
          id="Password"
          placeholder="Password"
        />
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
