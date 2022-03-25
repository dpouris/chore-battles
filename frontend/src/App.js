import { useState, useEffect } from "react";
// React Router
import { useNavigate } from "react-router-dom";
// Components
import ChoreSelection from "./components/ChoreSelection";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import History from "./components/History";
// Helpers
import { fetchUserDetails, refreshToken } from "./helpers/helpers";
// Utils
import jwt_decode from "jwt-decode";

const App = ({ chore, history }) => {
  const [accessToken, setAccessToken] = useState();
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  const clearState = () => {
    setUsername(null);
    setAccessToken(null);
  };

  useEffect(async () => {
    const refreshTkn = localStorage.getItem("refresh");

    if (!refreshTkn) {
      navigate("/login");
      return;
    }

    const accessTkn = await refreshToken(refreshTkn);
    localStorage.setItem("access", accessTkn);

    if (accessTkn) {
      setAccessToken(accessTkn);
      if (!username) {
        const user_id = jwt_decode(accessTkn).user_id;
        const user_details = await fetchUserDetails(user_id, accessTkn);
        setUsername(user_details.username);
      }
      return;
    }

    setAccessToken(null);
  }, [navigate]);

  return (
    <main className="relative">
      <Header>
        {username && <Profile username={username} />}
        {accessToken && <Logout clearState={clearState} />}
      </Header>
      {chore && <ChoreSelection accessTkn={accessToken} />}
      {history && <History accessToken={accessToken} />}
      <Navbar />
    </main>
  );
};

export default App;
