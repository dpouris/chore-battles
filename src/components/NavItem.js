import { useEffect, useRef } from "react";

const NavItem = ({ itemName, children, onClick, path }) => {
  const navRef = useRef();

  const handleClick = (e) => {
    onClick && onClick();

    try {
      document.querySelector(".open").classList.remove("open");
    } catch (err) {}
    e.target.classList.add("open");
  };

  useEffect(() => {
    if (navRef.current) {
      const urlPath = window.location.pathname.slice(1);
      navRef.current.classList.contains(urlPath) &&
        navRef.current.classList.add("open");
    }
  }, []);

  return (
    <li
      ref={navRef}
      className={`${path} 
         group cursor-pointer flex flex-col items-center justify-center hover:bg-slate-50 w-20 h-20`}
      onClick={handleClick}
    >
      <div className="icon w-7 translate-y-3 group-hover:translate-y-0 transition-[transform] pointer-events-none text-center text-black">
        {children}
      </div>
      <span className="translate-y-20 group-hover:translate-y-0 transition-[transform] pointer-events-none text-black">
        {itemName}
      </span>
    </li>
  );
};

export default NavItem;
