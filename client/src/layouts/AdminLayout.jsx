import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { FaListUl, FaChartPie, FaRightFromBracket, FaServer } from "react-icons/fa6";

const AdminLayout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isActive = (path) => location.pathname.startsWith(path);

    const navItems = [
        { name: "System Dashboard", path: "/admin/dashboard", icon: <FaChartPie /> },
        { name: "Pending Requests", path: "/admin/requests", icon: <FaListUl /> },
    ];

    return (
        <div className="min-h-screen bg-base-200 flex font-sans text-base-content">
            {/* Sidebar - Distinct Dark Theme for System Admin */}
            <aside className={`w-72 bg-neutral text-neutral-content flex flex-col fixed inset-y-0 left-0 z-50 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
                <div className="p-8 border-b border-neutral-content/10">
                    <h1 className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <FaServer className="text-primary" /> System Admin
                    </h1>
                    <p className="text-xs text-neutral-content/60 mt-2 uppercase tracking-widest font-bold">Dine & Play SaaS Control</p>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${isActive(item.path) ? "bg-primary text-primary-content shadow-lg shadow-primary/20" : "text-neutral-content/60 hover:bg-neutral-focus hover:text-neutral-content"}`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-neutral-content/10">
                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-error hover:bg-error/10 transition-colors font-bold text-sm">
                        <FaRightFromBracket />
                        Sign Out
                    </button>
                    <div className="mt-4 flex items-center gap-3 px-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-black text-xs">SA</div>
                        <div>
                            <p className="text-xs font-bold text-neutral-content">System Admin</p>
                            <p className="text-[10px] text-neutral-content/50">Super User</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 min-h-screen flex flex-col">
                {/* Mobile Header */}
                <header className="lg:hidden bg-base-100 border-b border-base-200 p-4 flex items-center justify-between sticky top-0 z-40">
                    <h1 className="font-bold text-base-content">Admin Panel</h1>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="btn btn-ghost btn-sm">
                        Menu
                    </button>
                </header>

                <div className="p-8 max-w-7xl w-full mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
