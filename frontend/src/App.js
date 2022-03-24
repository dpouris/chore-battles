import { useState, useEffect } from "react";
// React Router
import { Link, useNavigate } from "react-router-dom";
// Components
import ChoreSelection from "./components/ChoreSelection";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
// Mantine UI
import { useNotifications } from "@mantine/notifications";
// Helpers
import { fetchUserDetails, refreshToken } from "./helpers/helpers";
// Utils
import jwt_decode from "jwt-decode";

const App = () => {
  const [chores, setChores] = useState();
  const [accessToken, setAccessToken] = useState();
  const [username, setUsername] = useState();

  const notifications = useNotifications();
  const navigate = useNavigate();

  const fetchChores = async (accessTkn) => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/chores/", {
        headers: {
          Authorization: "Bearer " + accessTkn,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      const chores = data.map((chore) => {
        return {
          label: chore.name,
          value: chore.id,
        };
      });
      setChores(chores);
    } catch (err) {
      notifications.showNotification({
        title: "Error",
        message: err,
        color: "red",
        autoClose: 2000,
      });
    }
  };

  const clearState = () => {
    setUsername(null);
    setAccessToken(null);
  };

  useEffect(async () => {
    const refreshTkn = localStorage.getItem("refresh");

    if (!refreshTkn) {
      navigate("/login");
    }

    if (!refreshTkn) {
      return;
    }

    const accessTkn = await refreshToken(refreshTkn);
    localStorage.setItem("access", accessTkn);

    if (accessTkn) {
      const user_id = jwt_decode(accessTkn).user_id;
      const user_details = await fetchUserDetails(user_id, accessTkn);

      fetchChores(accessTkn);
      setUsername(user_details.username);
      setAccessToken(accessTkn);
      return;
    }

    setAccessToken(null);
  }, []);

  return (
    <>
      <Header>
        {!accessToken && <Link to="/login">Login</Link>}
        {username && <Profile username={username} className="" />}
        {accessToken && <Logout clearState={clearState} />}
      </Header>
      <ChoreSelection chores={chores} accessTkn={accessToken} />
    </>
  );
};

export default App;
