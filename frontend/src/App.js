import { useState, useEffect } from "react";
// React Router
import { useNavigate } from "react-router-dom";
// Components
import ChoreSelection from "./components/ChoreSelection";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import History from "./components/History";
// Helpers
import { fetchUserDetails, refreshToken } from "./helpers/helpers";
// Utils
import jwt_decode from "jwt-decode";

let refreshTkn;
const REFRESH_TIME = 1800000;
setInterval(() => {
  refreshTkn = localStorage.getItem("refresh");
  refreshToken(refreshTkn);
}, REFRESH_TIME);

const App = ({ chore, history }) => {
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  useEffect(async () => {
    const refresh = localStorage.getItem("refresh");
    const access = localStorage.getItem("access");

    !refresh && navigate("/login");

    refreshToken(refresh);

    if (!username) {
      const user_id = jwt_decode(access).user_id;
      const user_details = await fetchUserDetails(user_id, access);
      setUsername(user_details.username);
    }
    return;
  }, []);

  return (
    <main className="relative select-none">
      <Header>{username && <Profile username={username} />}</Header>
      {chore && <ChoreSelection />}
      {history && <History />}
      <Navbar />
    </main>
  );
};

export default App;
