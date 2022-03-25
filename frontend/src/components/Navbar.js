import NavItem from "./NavItem";
import { HomeIcon, CogIcon } from "@heroicons/react/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed overflow-hidden bottom-0 w-screen h-[12vh] py-2 px-10 bg-slate-600 flex items-center justify-evenly nav-shadow">
      <ul className="flex text-white">
        <NavItem onClick={() => navigate("/")} itemName="Home" home>
          <HomeIcon />
        </NavItem>
        <NavItem onClick={() => navigate("/add_item")} itemName="Chores">
          <FontAwesomeIcon icon={faBroom} size="lg" />
        </NavItem>
        <NavItem onClick={() => navigate("/history")} itemName="History">
          <FontAwesomeIcon icon={faClockRotateLeft} size="lg" />
        </NavItem>
        <NavItem onClick={""} itemName="Settings">
          <CogIcon />
        </NavItem>
      </ul>
    </nav>
  );
};

export default Navbar;
