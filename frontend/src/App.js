import { useContext } from "react";
// Components
import ChoreSelection from "./components/ChoreSelection";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import History from "./components/History";
// Context
import { HistoryProvider } from "./HistoryContext";
import { ChoreProvider } from "./ChoreContext";
import UserContext from "./UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = ({ chore, history }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = localStorage.getItem("lgi");
    !isLogged && navigate("/login");
  }, []);

  return (
    <main className="relative select-none">
      <Header>{user.username && <Profile username={user.username} />}</Header>
      <HistoryProvider>
        <ChoreProvider>{chore && <ChoreSelection />}</ChoreProvider>
        {history && <History />}
      </HistoryProvider>
      <Navbar />
    </main>
  );
};

export default App;
