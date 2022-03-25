import { useRef } from "react";

const NavItem = ({ itemName, children, home, onClick }) => {
  const btnRef = useRef();

  const handleClick = (e) => {
    if (onClick) onClick();

    try {
      document.querySelector(".open").classList.remove("open");
    } catch (e) {}
    e.target.classList.add("open");
  };

  return (
    <li
      ref={btnRef}
      className={`${
        home ? "home open" : ""
      } group cursor-pointer flex flex-col items-center justify-center hover:bg-slate-700 rounded-lg w-20 h-20`}
      onClick={handleClick}
    >
      <div className="w-7 translate-y-3 group-hover:translate-y-0 transition-[transform] pointer-events-none text-center">
        {children}
      </div>
      <span className="translate-y-20 group-hover:translate-y-0 transition-[transform] pointer-events-none">
        {itemName}
      </span>
    </li>
  );
};

export default NavItem;
