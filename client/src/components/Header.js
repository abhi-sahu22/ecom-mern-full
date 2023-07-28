import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { FaUserCircle } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(userData.email);
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
  // console.log(adminEmail);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleMenuDisplay = () => {
    if (showMenu === true) {
      setShowMenu(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Loggedout successfully");
    navigate("/");
  };
  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header
      className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white"
      onClick={handleMenuDisplay}
    >
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        {/* logo */}
        <Link to={""} className="flex gap-x-2 items-center">
          <div className="h-14">
            <img src={logo} className="h-full rounded-md " alt="Logo"/>
          </div>
          <p className="font-semibold  font-arial">GroceryHub</p>
        </Link>
        {/* navbar */}
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"products"}>Products</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <Link to={"cart"} className="text-2xl text-slate-600 relative">
            <BsCartFill />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 flex items-center justify-center rounded-full m-0 p-0 text-sm text-center">
            {cartItemNumber.length}
            </div>
          </Link>
          <div className="text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="w-full h-full" alt="user"/>
              ) : (
                <FaUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white shadow drop-shadow-md py-2 px-2 flex flex-col rounded">
                {userData.email === adminEmail && (
                  <Link
                    to={"newproduct"}
                    className="white-space-nowrap cursor-pointer text-sm"
                  >
                    New Product
                  </Link>
                )}
                {userData.image ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-red-500 text-sm rounded"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer text-sm"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
            
          </div>
          {/* <nav className="text-base md:text-lg flex flex-col md:hidden">
              <Link to={""} className="px-2 py-14">
                Home
              </Link>
              <Link to={"menu/648740d43bc29f1865a8b2cb"} className="px-2 py-14">
                Menu
              </Link>
              <Link to={"about"} className="px-2 py-14">
                About
              </Link>
              <Link to={"contact"} className="px-2 py-14">
                Contact
              </Link>
            </nav> */}
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
