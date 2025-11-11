import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import MyTasksSidebar from "./MyTasksSidebar";
import ProjectSidebar from "./ProjectsSidebar";
import WorkspaceDropdown from "./WorkspaceDropdown";
import {
  FolderOpenIcon,
  LayoutDashboardIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  UsersIcon,
} from "lucide-react";
import { useClerk } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboardIcon },
    { name: "Projects", href: "/projects", icon: FolderOpenIcon },
    { name: "Members", href: "/team", icon: UsersIcon },
  ];
  const { openUserProfile } = useClerk();

  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSidebarOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`z-10 bg-[#f4f6f8] dark:bg-zinc-900 min-w-68 flex flex-col h-screen border-r border-gray-200 dark:border-zinc-800 max-sm:absolute transition-all ${
        isSidebarOpen ? "left-0" : "-left-full"
      } `}
    >
      <WorkspaceDropdown />
      <hr className="border-gray-200 dark:border-zinc-800" />
      <div className="flex-1 overflow-y-scroll no-scrollbar flex flex-col justify-between">
        <div>
          <div className="p-4">
            {menuItems.map((item) => (
              <NavLink
                to={item.href}
                key={item.name}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 px-4 text-gray-800 dark:text-zinc-100 cursor-pointer rounded transition-all  ${
                    isActive
                      ? "bg-gray-100 dark:bg-zinc-900 dark:bg-gradient-to-br dark:from-zinc-800 dark:to-zinc-800/50  dark:ring-zinc-800"
                      : "hover:bg-gray-50 dark:hover:bg-zinc-800/60"
                  }`
                }
              >
                <item.icon size={16} />
                <p className="text-sm truncate">{item.name}</p>
              </NavLink>
            ))}
            <button
              onClick={openUserProfile}
              className="flex w-full items-center gap-3 py-2 px-4 text-gray-800 dark:text-zinc-100 cursor-pointer rounded hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-all"
            >
              <SettingsIcon size={16} />
              <p className="text-sm truncate">Settings</p>
            </button>
          </div>
          <MyTasksSidebar setIsSidebarOpen={setIsSidebarOpen} />
          <ProjectSidebar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="size-8 flex items-center justify-center m-4 bg-white dark:bg-zinc-800 shadow rounded-lg transition hover:scale-105 active:scale-95"
          >
            {theme === "light" ? (
              <MoonIcon className="size-4 text-gray-800 dark:text-gray-200" />
            ) : (
              <SunIcon className="size-4 text-yellow-400" />
            )}
          </button>
          <p>{theme === "light" ? "Dark Mode" : "Light Mode"}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
