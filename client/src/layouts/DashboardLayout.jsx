import React, { useState } from 'react';
import { Outlet, NavLink, Link } from "react-router";
import {
  FaBars,
  FaQrcode,
  FaClockRotateLeft,
  FaUser,
  FaLock,
  FaArrowRightFromBracket,
  FaChevronDown,
  FaChartLine,
  FaUsers,
  FaAddressBook,
  FaUserSlash,
  FaHeart
} from 'react-icons/fa6';
import Footer from '../components/Footer';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user] = useState({
    name: "Alex Manager",
    role: "Manager",
    avatar: "A"
  });

  return (
    <div className="flex min-h-screen bg-base-200 overflow-x-hidden relative">
      {/* Mobile Overlay - click outside to close */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] lg:hidden backdrop-blur-sm transition-all"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar / Left Pane */}
      <aside
        onMouseLeave={() => {
          // Only auto-hide on desktop if it was opened via hover/click and user wants that behavior
          if (window.innerWidth >= 1024) setIsSidebarOpen(false);
        }}
        className={`fixed lg:sticky top-0 left-0 z-[70] h-screen bg-base-100 border-r border-base-300 flex flex-col transition-all duration-300 ease-in-out transform shadow-2xl lg:shadow-none ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:invisible'}`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-base-300 flex items-center justify-between min-w-[18rem]">
          <Link to="/scanner" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-content shadow-lg shadow-primary/20 text-sm font-black">
              DP
            </div>
            <span className="text-lg font-bold tracking-tight">Dine <span className="text-primary">&</span> Play</span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-6 min-w-[18rem]">
          <ul className="menu px-4 gap-1">
            <li>
              <NavLink
                to="/scanner"
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${isActive ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-base-200'}`}
              >
                <FaQrcode className="text-lg" />
                <span>Scanner</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/recent-scans"
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${isActive ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-base-200'}`}
              >
                <FaClockRotateLeft className="text-lg" />
                <span>Recent Scans</span>
              </NavLink>
            </li>

            {/* Manager Only Section */}
            {user.role === 'Manager' && (
              <>
                <div className="px-4 py-4 mt-4">
                  <div className="h-px bg-base-300 w-full opacity-50"></div>
                </div>
                <li className="menu-title px-4 pb-2 text-[10px] uppercase tracking-widest opacity-40 font-black">Management</li>
                <li>
                  <NavLink
                    to="/dashboard"
                    end
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${isActive ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-base-200'}`}
                  >
                    <FaChartLine className="text-lg" />
                    <span>Analytics</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/customers"
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${isActive ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-base-200'}`}
                  >
                    <FaUsers className="text-lg" />
                    <span>Customers</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/staff"
                    end
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${isActive ? 'bg-primary/10 text-primary font-bold shadow-sm' : 'hover:bg-base-200'}`}
                  >
                    <FaAddressBook className="text-lg" />
                    <span>Staff Management</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Sidebar Bottom Label */}
        <div className="p-6 border-t border-base-300 bg-base-50/50">
          <div className="flex items-center justify-center gap-2 opacity-20 text-[9px] font-black uppercase tracking-[0.2em]">
            <span>Staff Interface</span>
            <div className="w-1 h-1 rounded-full bg-current"></div>
            <span>v1.0</span>
          </div>
        </div>
      </aside>

      {/* Main Content Hub */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Navbar */}
        <header className="navbar bg-base-100/80 backdrop-blur-md shadow-sm px-4 lg:px-8 z-50 border-b border-base-300 sticky top-0">
          <div className="flex-none">
            <button
              onMouseEnter={() => {
                if (window.innerWidth >= 1024) setIsSidebarOpen(true);
              }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="btn btn-square btn-ghost hover:bg-base-200"
            >
              <FaBars className="text-xl" />
            </button>
          </div>

          <div className="flex-1 px-2">
            <Link to="/scanner" className="text-xl font-bold ml-2 transition-opacity hover:opacity-70 flex items-center gap-2">
              Dine <span className="text-primary">&</span> Play
            </Link>
          </div>

          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost gap-3 px-2 rounded-2xl hover:bg-base-200 transition-all">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-xl w-8 h-8 flex items-center justify-center font-bold shadow-lg shadow-primary/20">
                    <span>{user.avatar}</span>
                  </div>
                </div>
                <FaChevronDown className="text-[10px] opacity-30" />
              </label>
              <ul tabIndex={0} className="dropdown-content z-[100] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-56 mt-4 border border-base-300 transform origin-top transition-all scale-100">
                <li className="menu-title px-4 py-3 text-[10px] uppercase tracking-widest opacity-40 font-black">Staff Account</li>
                <li><Link to="/profile" className="rounded-xl py-3 px-4"><FaUser className="mr-3 opacity-50" /> Profile</Link></li>
                <li><Link to="/update-password" className="rounded-xl py-3 px-4"><FaLock className="mr-3 opacity-50" /> Security Settings</Link></li>
                <div className="divider my-1 opacity-50"></div>
                <li><button className="rounded-xl py-3 px-4 text-error font-bold hover:bg-error/5"><FaArrowRightFromBracket className="mr-3" /> Logout</button></li>
              </ul>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 transition-all duration-300">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>

      <style>{`
        /* Prevent horizontal scroll on body */
        body {
          overflow-x: hidden;
          width: 100%;
        }
        /* Custom scrollbar for sidebar */
        aside ::-webkit-scrollbar {
          width: 4px;
        }
        aside ::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.1);
            border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;