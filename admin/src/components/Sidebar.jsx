import { sidebarItems } from "./sidebarData";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen = false, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 flex flex-col
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:h-full md:flex-shrink-0 z-50`}
      >
        {/* Header */}
        <div className="flex-shrink-0">
          <h2 className="text-xl font-bold mb-6 hidden md:block">
            Admin Dashboard
          </h2>
        </div>

        {/* Navigation - This will take available space */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition ${
                      location.pathname === item.path ? "bg-blue-600" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer - This stays at the bottom */}
        <div className="flex-shrink-0 pt-4 mt-auto border-t border-gray-700">
          <div className="text-sm text-gray-400">
            <p>Admin Panel v1.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
