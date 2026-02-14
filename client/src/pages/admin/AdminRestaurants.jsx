import { useState } from "react";
import { FaCircleCheck, FaPowerOff, FaStore, FaUserCheck, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import RestaurantRegistrationForm from "../../features/restaurant/RestaurantRegistrationForm";
import { mockRestaurants } from "../../data/mockRestaurants";

const AdminRestaurants = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [restaurants, setRestaurants] = useState(mockRestaurants);

    const toggleStatus = (id) => {
        setRestaurants(restaurants.map(r =>
            r.id === id ? { ...r, status: r.status === "active" ? "inactive" : "active" } : r
        ));
    };

    const handleAddTenant = (data) => {
        const newTenant = {
            id: Date.now(),
            name: data.restaurantName,
            slug: data.restaurantName.toLowerCase().replace(/\s+/g, '-'),
            status: "active",
            manager: data.managerEmail,
            joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        setRestaurants([newTenant, ...restaurants]);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-base-200 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-base-content tracking-tight">System Admin</h1>
                    <p className="text-sm text-base-content/60 mt-1">Manage global restaurant access and subscriptions.</p>
                </div>
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary rounded-xl shadow-lg shadow-primary/20 font-bold border-0 cursor-pointer"
                >
                    <FaStore className="text-primary-content/80" /> Add New Tenant
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-widest font-bold text-base-content/40">Total Tenants</p>
                        <p className="text-3xl font-black text-base-content mt-1">{restaurants.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-info/10 text-info rounded-xl flex items-center justify-center text-xl">
                        <FaStore />
                    </div>
                </div>
                <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-widest font-bold text-base-content/40">Active Licenses</p>
                        <p className="text-3xl font-black text-success mt-1">{restaurants.filter(r => r.status === 'active').length}</p>
                    </div>
                    <div className="w-12 h-12 bg-success/10 text-success rounded-xl flex items-center justify-center text-xl">
                        <FaCircleCheck />
                    </div>
                </div>
                <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-widest font-bold text-base-content/40">Pending Requests</p>
                        <p className="text-3xl font-black text-warning mt-1">7</p>
                    </div>
                    <div className="w-12 h-12 bg-warning/10 text-warning rounded-xl flex items-center justify-center text-xl">
                        <FaUserCheck />
                    </div>
                </div>
            </div>

            {/* Main Table */}
            <div className="bg-base-100 rounded-3xl border border-base-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-base-200 flex items-center justify-between gap-4">
                    <h3 className="font-bold text-lg text-base-content">All Restaurants</h3>
                    <div className="relative group w-64">
                        <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors" />
                        <input type="text" placeholder="Search tenants..." className="input input-bordered input-sm w-full pl-9 rounded-lg bg-base-200 focus:bg-base-100 transition-all text-xs font-semibold" />
                    </div>
                </div>

                <table className="table w-full">
                    <thead className="bg-base-200/50">
                        <tr>
                            <th className="py-4 px-6 text-xs font-bold text-base-content/40 uppercase tracking-wider">Tenant Name</th>
                            <th className="py-4 px-6 text-xs font-bold text-base-content/40 uppercase tracking-wider">Manager Email</th>
                            <th className="py-4 px-6 text-xs font-bold text-base-content/40 uppercase tracking-wider">Status</th>
                            <th className="py-4 px-6 text-xs font-bold text-base-content/40 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-200">
                        {restaurants.map((r) => (
                            <tr key={r.id} className="hover:bg-base-200 transition-colors group">
                                <td className="py-4 px-6">
                                    <div className="font-bold text-base-content">{r.name}</div>
                                    <div className="text-xs text-base-content/40 font-mono mt-0.5">/r/{r.slug}</div>
                                </td>
                                <td className="py-4 px-6 text-sm text-base-content/70 font-medium">{r.manager}</td>
                                <td className="py-4 px-6">
                                    <div className={`badge badge-sm font-bold border-0 ${r.status === 'active' ? 'badge-success text-white' : 'badge-error text-white'}`}>
                                        {r.status === 'active' ? 'Operational' : 'Suspended'}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => toggleStatus(r.id)}
                                        className={`btn btn-xs rounded-lg px-3 font-bold border-0 transition-all ${r.status === 'active' ? 'btn-error btn-outline bg-error/10' : 'btn-success btn-outline bg-success/10'}`}
                                    >
                                        <FaPowerOff className="mr-1.5 text-[10px]" />
                                        {r.status === 'active' ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ADD TENANT MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-neutral/60 animate-in fade-in duration-300">
                    <div className="bg-base-100 w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-base-200 overflow-hidden transform animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
                        <div className="p-8 border-b border-base-200 flex items-center justify-between bg-base-200/30 flex-shrink-0">
                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-base-content">
                                    Add New <span className="text-primary">Restaurant Tenant</span>
                                </h2>
                                <p className="text-sm text-base-content/60 font-medium">Provision a new account without going through public signup.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="btn btn-ghost btn-circle text-base-content/40 hover:text-error transition-colors">
                                <FaXmark className="text-xl" />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <RestaurantRegistrationForm
                                onSubmitSuccess={handleAddTenant}
                                onCancel={() => setIsModalOpen(false)}
                                submitLabel="Provision Tenant"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default AdminRestaurants;
