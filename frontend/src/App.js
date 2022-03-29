import { useContext } from "react";
// Components
import ChoreSelection from "./components/ChoreSelection";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import History from "./components/History";
// Helpers
import { refreshToken } from "./helpers/helpers";
// Context
import { HistoryProvider } from "./HistoryContext";
import { ChoreProvider } from "./ChoreContext";
import UserContext from "./UserContext";

let refreshTkn;
const REFRESH_TIME = 1800000;
setInterval(() => {
  refreshTkn = localStorage.getItem("refresh");
  refreshToken(refreshTkn);
}, REFRESH_TIME);

const App = ({ chore, history }) => {
  const { user } = useContext(UserContext);

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
