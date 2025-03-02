import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { removeUser } from "../utils/userslice";
import { toast } from "react-toastify";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for menu toggle
import logo from "../assets/logo.webp";
import { Base_url } from "../utils/helper";

const Navbar = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(Base_url+"/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      toast.success("Logged Out!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed! Please try again.");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg px-6 py-4 flex justify-between items-center w-full relative">
      {/* Left Side: Logo & Brand Name */}
      <div className="flex items-center space-x-4">
        <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src={logo} alt="Logo" />
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200 transition duration-300">
          DevtNetwork
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="lg:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Right Side (Navbar Items) */}
      <div className={`lg:flex items-center space-x-6 absolute lg:static bg-blue-600 lg:bg-transparent w-full lg:w-auto top-full left-0 lg:flex-row flex-col ${menuOpen ? "block" : "hidden"} p-4 lg:p-0 shadow-lg lg:shadow-none`}>
        {user ? (
          <>
            <p className="text-lg font-semibold text-white">Welcome, {user.firstName}</p>

            {/* Profile Dropdown */}
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                <img
                  src={user.photoUrl || "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg"}
                  alt="User"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm cursor-pointer hover:border-gray-300 transition duration-300"
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-20">
                <li>
                <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300">
              My Feed
            </Link>
                </li>
                  <li>
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/connection" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300">
                      Connections
                    </Link>
                  </li>
                  <li>
                    <Link to="/request" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300">
                      Requests
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition duration-300">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100 hover:text-blue-700 transition duration-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
