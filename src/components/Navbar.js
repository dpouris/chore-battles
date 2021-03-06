import NavItem from "./NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faClockRotateLeft,
  faUser,
  faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed overflow-hidden bottom-0 w-screen h-[9.5vh] py-2 px-10 bg-white flex items-center justify-evenly nav-shadow">
      <ul className="flex text-white">
        <NavItem onClick={() => navigate("/home")} itemName="Home" path="home">
          <FontAwesomeIcon icon={faHouseChimney} size="lg" />
        </NavItem>
        <NavItem
          onClick={() => navigate("/chore")}
          itemName="Chores"
          path="chore"
        >
          <FontAwesomeIcon icon={faBroom} size="lg" />
        </NavItem>
        <NavItem
          onClick={() => navigate("/history")}
          itemName="History"
          path="history"
        >
          <FontAwesomeIcon icon={faClockRotateLeft} size="lg" />
        </NavItem>
        <NavItem
          onClick={() => navigate("/account")}
          itemName="Profile"
          path="account"
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
        </NavItem>
      </ul>
    </nav>
  );
};

export default Navbar;
