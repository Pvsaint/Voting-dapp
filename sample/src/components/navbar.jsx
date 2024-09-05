import Logo from "../assets/logo1.png";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const navBarItem = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "Create Poll",
      path: "/create",
    },
  ];
  return (
    <>
  
    
      <nav className="w-screen  lg:px-16 md:px-8 px-4 flex flex-wrap items-center justify-between">
        <Link to="/" className="w-20 flex-none">
          <img src={Logo} alt="Brand Logo" className="w-full" />
        </Link>

        <div className="flex flex-wrap  w-full justify-center gap-4">
          {navBarItem.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="w-fit h-fit lg:text-[16px] md:text-[14px] text-[12px] rounded-full border border-gray-100 px-4 py-2"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button className="bg-gray-900 text-gray-50 py-2 px-4 rounded-full my-4 mx-auto text-[14px] lg:text-[16px] md:text-[14px] flex justify-items-end" type="submit">
          Connect Wallet
        </button>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
