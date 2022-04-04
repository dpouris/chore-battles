import { useContext, useEffect } from "react";
// Components
import ChoreSelection from "./components/ChoreSelection";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import History from "./components/History";
// Context
import { HistoryProvider } from "./context/HistoryContext";
import { ChoreProvider } from "./context/ChoreContext";
import UserContext from "./context/UserContext";
// Router
import { useNavigate } from "react-router-dom";
import Home from "./components/Home";

const App = ({ home, chore, history }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = localStorage.getItem("lgi");
    !isLogged && navigate("/login");
  }, []);

  return (
    <main className="relative select-none">
      <HistoryProvider>
        <Header>{user.username && <Profile username={user.username} />}</Header>
        {home && <Home />}
        <ChoreProvider>{chore && <ChoreSelection />}</ChoreProvider>
        {history && <History />}
      </HistoryProvider>
      <Navbar />
    </main>
  );
};

export default App;
