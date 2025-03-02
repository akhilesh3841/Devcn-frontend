import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { removeUser } from "../utils/userslice";
import { toast } from "react-toastify";
import logo from "../assets/logo.webp";

const Navbar = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });

      dispatch(removeUser());
      toast.success("Logged Out!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed! Please try again.");
    }
  };

  return (
    <div className="navbar bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg px-8 py-4 flex justify-between items-center">
      {/* Left Side: Logo and Brand Name */}
      <div className="flex items-center space-x-4">
        <img
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          src={logo}
          alt="Logo"
        />
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-gray-200 transition duration-300"
        >
          DevtNetwork
        </Link>
      </div>

      {/* Right Side: User Profile or Login Button */}
      {user ? (
        <div className="flex items-center space-x-6">
          <p className="text-lg font-semibold text-white">Welcome, {user.firstName}</p>
          {user.photoUrl && (
            <div className="relative group">
              <img
                src={user.photoUrl}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm cursor-pointer hover:border-gray-300 transition duration-300"
              />
              {/* Dropdown Menu */}
              <ul className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connection"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300"
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/request"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300"
                  >
                    Requests
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        // Show Login button if user is not logged in
        <Link
          to="/login"
          className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100 hover:text-blue-700 transition duration-300"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
