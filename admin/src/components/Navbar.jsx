import { useState } from "react";
import { FaSearch, FaBell, FaCog, FaMoon, FaSun } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { MdClose, MdApps } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { MdSpaceDashboard } from "react-icons/md";

export default function Navbar({ onToggleSidebar }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="bg-gray-800 text-white shadow-md relative">
      {/* Main Navbar */}
      <nav className="p-4 flex justify-between items-center">
        {/* Left: Sidebar Toggle + Logo + Dark Mode */}
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded hover:bg-gray-700 transition-colors">
            <MdSpaceDashboard className="h-10 w-10" />
          </button>

          <button
            onClick={onToggleSidebar}
            className="p-2 rounded hover:bg-gray-700 md:hidden"
          >
            <HiMenu className="h-5 w-5" />
          </button>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            title="Search"
          >
            <FaSearch className="h-5 w-5" />
          </button>

          {/* Apps Icon */}
          <button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            title="Apps"
          >
            <MdApps className="h-5 w-5" />
          </button>

          {/* Notifications Icon */}
          <button
            className="p-2 rounded hover:bg-gray-700 transition-colors relative"
            title="Notifications"
          >
            <FaBell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Settings Icon */}
          <button
            className="p-2 rounded hover:bg-gray-700 transition-colors"
            title="Settings"
          >
            <FaCog className="h-5 w-5" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded transition-colors">
            <RxAvatar className="h-10 w-10" /> {/* Increased from h-8 w-8 */}
          </div>
        </div>
      </nav>

      {/* Search Bar - Corrected positioning */}
      {showSearch && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 px-4">
          <div className="flex items-center bg-gray-600 rounded-md px-3 py-2 w-full max-w-md mx-auto shadow-lg border border-gray-500">
            <FaSearch className="h-4 w-4 mr-2 text-gray-300" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-600 focus:outline-none text-white placeholder-gray-300 w-full text-sm"
              autoFocus
            />
            <button
              onClick={() => setShowSearch(false)}
              className="ml-2 p-1 rounded hover:bg-gray-500 transition-colors"
            >
              <MdClose className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
