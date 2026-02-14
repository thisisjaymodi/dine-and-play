import { useState, useMemo, createContext, useContext } from 'react';
import {
    FaUserPlus,
    FaAddressBook,
    FaEnvelope,
    FaXmark,
    FaPenToSquare,
    FaUserSlash,
    FaChevronLeft,
    FaChevronRight,
    FaMagnifyingGlass,
    FaUserCheck
} from 'react-icons/fa6';

import { mockStaff } from '../../data/mockStaff';

// --- CONTEXT & PROVIDER LOGIC ---
const StaffContext = createContext();

const useStaff = () => {
    const context = useContext(StaffContext);
    if (!context) throw new Error('useStaff must be used within StaffManagement');
    return context;
};

const StaffProvider = ({ children }) => {
    const [staff, setStaff] = useState(mockStaff);

    const addStaff = (newMember) => {
        setStaff(prev => [...prev, {
            ...newMember,
            id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
            status: 'Active'
        }]);
    };

    const updateStaff = (id, updatedData) => {
        setStaff(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
    };

    const toggleStatus = (id) => {
        setStaff(prev => prev.map(s => {
            if (s.id === id) {
                return { ...s, status: s.status === 'Active' ? 'Deactivated' : 'Active' };
            }
            return s;
        }));
    };

    return (
        <StaffContext.Provider value={{ staff, addStaff, updateStaff, toggleStatus }}>
            {children}
        </StaffContext.Provider>
    );
};

// --- STAFF MANAGEMENT UI COMPONENT ---
const StaffManagementContent = () => {
    const { staff, addStaff, updateStaff, toggleStatus } = useStaff();

    const activeStaff = useMemo(() => staff.filter(s => s.status === 'Active'), [staff]);
    const deactivatedStaff = useMemo(() => staff.filter(s => s.status === 'Deactivated'), [staff]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', pin: '' });

    const [activeSearch, setActiveSearch] = useState("");
    const [deactivatedSearch, setDeactivatedSearch] = useState("");

    const [activePage, setActivePage] = useState(1);
    const [deactivatedPage, setDeactivatedPage] = useState(1);
    const itemsPerPage = 5;

    const filteredActive = useMemo(() => {
        return activeStaff.filter(member => {
            return member.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
                member.email.toLowerCase().includes(activeSearch.toLowerCase()) ||
                member.id.toLowerCase().includes(activeSearch.toLowerCase());
        });
    }, [activeStaff, activeSearch]);

    const filteredDeactivated = useMemo(() => {
        return deactivatedStaff.filter(member => {
            return member.name.toLowerCase().includes(deactivatedSearch.toLowerCase()) ||
                member.email.toLowerCase().includes(deactivatedSearch.toLowerCase()) ||
                member.id.toLowerCase().includes(deactivatedSearch.toLowerCase());
        });
    }, [deactivatedStaff, deactivatedSearch]);

    const activeTotalPages = Math.ceil(filteredActive.length / itemsPerPage);
    const activePaginatedData = filteredActive.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    const deactivatedTotalPages = Math.ceil(filteredDeactivated.length / itemsPerPage);
    const deactivatedPaginatedData = filteredDeactivated.slice((deactivatedPage - 1) * itemsPerPage, deactivatedPage * itemsPerPage);

    const openModal = (member = null) => {
        if (member) {
            setEditingStaff(member);
            setFormData({ name: member.name, email: member.email, pin: '' });
        } else {
            setEditingStaff(null);
            setFormData({ name: '', email: '', pin: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingStaff(null);
        setFormData({ name: '', email: '', pin: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingStaff) {
            updateStaff(editingStaff.id, { name: formData.name, email: formData.email });
        } else {
            addStaff({ name: formData.name, email: formData.email });
        }
        closeModal();
    };

    return (
        <div className="max-w-5xl mx-auto space-y-16 pb-20">
            {/* ACTIVE STAFF SECTION */}
            <section>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-base-content flex items-center gap-3">
                            <FaAddressBook className="text-primary" /> Staff Management
                        </h1>
                        <p className="text-base-content/60 mt-1 text-sm font-medium">Manage your active restaurant team and staff credentials.</p>
                    </div>
                    <button onClick={() => openModal()} className="btn btn-primary rounded-2xl px-6 shadow-lg shadow-primary/20">
                        <FaUserPlus className="mr-2" /> Add Staff Member
                    </button>
                </div>

                <div className="bg-base-100 p-4 rounded-[2rem] border border-base-300 shadow-sm mb-6">
                    <div className="relative w-full">
                        <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search active staff..."
                            className="input input-bordered w-full pl-12 rounded-2xl h-12 bg-base-200/30 text-base-content"
                            value={activeSearch}
                            onChange={(e) => { setActiveSearch(e.target.value); setActivePage(1); }}
                        />
                    </div>
                </div>

                <div className="bg-base-100 rounded-[2rem] border border-base-300 shadow-sm overflow-hidden min-h-[400px]">
                    <div className="overflow-x-auto">
                        <table className="table w-full text-base-content">
                            <thead>
                                <tr className="bg-base-200/40 border-b border-base-300">
                                    <th className="py-5 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Employee</th>
                                    <th className="py-5 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Email</th>
                                    <th className="py-5 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200">
                                {activePaginatedData.map((member) => (
                                    <tr key={member.id} className="transition-colors group hover:bg-primary/[0.02]">
                                        <td className="py-5 px-8">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm tracking-tight">{member.name}</span>
                                                <span className="text-[10px] opacity-40 font-black font-mono">{member.id}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-8 text-sm opacity-60 font-medium">
                                            <div className="flex items-center gap-2">
                                                <FaEnvelope className="text-[10px] opacity-40" /> {member.email}
                                            </div>
                                        </td>
                                        <td className="py-5 px-8 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openModal(member)} className="btn btn-ghost btn-sm rounded-xl text-primary font-bold hover:bg-primary/10">
                                                    <FaPenToSquare className="text-xs mr-1" /> Edit
                                                </button>
                                                <button onClick={() => toggleStatus(member.id)} className="btn btn-sm rounded-xl font-bold min-w-[110px] btn-ghost text-error hover:bg-error/10">
                                                    <FaUserSlash className="text-sm mr-1" /> Deactivate
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {activePaginatedData.length === 0 && <div className="py-20 text-center opacity-30 italic font-medium">No active staff members found.</div>}
                    </div>

                    {activeTotalPages > 1 && (
                        <div className="px-8 py-5 bg-base-200/30 border-t border-base-300 flex items-center justify-between">
                            <span className="text-xs font-bold opacity-40 uppercase tracking-widest">Page {activePage} of {activeTotalPages}</span>
                            <div className="flex gap-2">
                                <button disabled={activePage === 1} onClick={() => setActivePage(prev => prev - 1)} className="btn btn-circle btn-sm btn-ghost"><FaChevronLeft className="text-xs" /></button>
                                <button disabled={activePage === activeTotalPages} onClick={() => setActivePage(prev => prev + 1)} className="btn btn-circle btn-sm btn-ghost"><FaChevronRight className="text-xs" /></button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* DEACTIVATED STAFF SECTION */}
            <section>
                <div className="mb-8 border-t border-base-300 pt-16">
                    <h2 className="text-3xl font-bold text-base-content flex items-center gap-3">
                        <FaUserSlash className="text-error" /> Deactivated Staff
                    </h2>
                    <p className="text-base-content/60 mt-1 text-sm font-medium">View and manage staff accounts that have been deactivated.</p>
                </div>

                <div className="bg-base-100 p-4 rounded-[2rem] border border-base-300 shadow-sm mb-6 opacity-80">
                    <div className="relative w-full">
                        <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search deactivated staff..."
                            className="input input-bordered w-full pl-12 rounded-2xl h-12 bg-base-200/30 text-base-content"
                            value={deactivatedSearch}
                            onChange={(e) => { setDeactivatedSearch(e.target.value); setDeactivatedPage(1); }}
                        />
                    </div>
                </div>

                <div className="bg-base-100 rounded-[2rem] border border-base-300 shadow-sm overflow-hidden min-h-[300px]">
                    <div className="overflow-x-auto">
                        <table className="table w-full text-base-content">
                            <thead>
                                <tr className="bg-base-200/40 border-b border-base-300">
                                    <th className="py-5 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Employee</th>
                                    <th className="py-5 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Email</th>
                                    <th className="py-5 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200">
                                {deactivatedPaginatedData.map((member) => (
                                    <tr key={member.id} className="bg-base-200/50 opacity-60 grayscale-[0.5]">
                                        <td className="py-5 px-8">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm tracking-tight flex items-center gap-2">
                                                    {member.name}
                                                    <span className="badge badge-xs badge-ghost uppercase font-black text-[8px] px-2 py-2">Deactivated</span>
                                                </span>
                                                <span className="text-[10px] opacity-40 font-black font-mono">{member.id}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-8 text-sm opacity-60 font-medium">
                                            <div className="flex items-center gap-2"><FaEnvelope className="text-[10px] opacity-40" /> {member.email}</div>
                                        </td>
                                        <td className="py-5 px-8 text-right">
                                            <button onClick={() => toggleStatus(member.id)} className="btn btn-sm rounded-xl font-bold min-w-[110px] btn-ghost text-success hover:bg-success/10">
                                                <FaUserCheck className="text-sm mr-1" /> Activate
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {deactivatedPaginatedData.length === 0 && <div className="py-20 text-center opacity-30 italic font-medium">No deactivated staff found.</div>}
                    </div>
                </div>

                <div className="mt-8 flex items-center gap-4 p-6 bg-error/5 border border-error/10 rounded-[2rem]">
                    <div className="w-12 h-12 rounded-2xl bg-error/10 text-error flex items-center justify-center text-xl">
                        <FaUserSlash />
                    </div>
                    <div>
                        <h4 className="font-bold text-error">Security Note</h4>
                        <p className="text-[11px] text-error/70 leading-relaxed font-medium">Deactivated staff can no longer access the system. Their history is preserved for compliance auditing.</p>
                    </div>
                </div>
            </section>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/40 animate-in fade-in duration-200">
                    <div className="bg-base-100 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-base-300 overflow-hidden transform animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-base-200 flex items-center justify-between bg-base-50/50">
                            <h2 className="text-xl font-black tracking-tight text-base-content">
                                {editingStaff ? 'Edit' : 'Add New'} <span className="text-primary">Staff Member</span>
                            </h2>
                            <button onClick={closeModal} className="btn btn-ghost btn-sm btn-circle text-base-content"><FaXmark className="text-lg" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase opacity-40 tracking-widest pb-1 text-base-content">Full Name</label>
                                <input type="text" required placeholder="John Doe" className="input input-bordered w-full rounded-2xl h-12 bg-base-200/30 text-base-content" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase opacity-40 tracking-widest pb-1 text-base-content">Email Address</label>
                                <input type="email" required placeholder="name@restaurant.com" className="input input-bordered w-full rounded-2xl h-12 bg-base-200/30 text-base-content" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className="form-control">
                                <label className="label text-[10px] font-black uppercase opacity-40 tracking-widest pb-1 text-base-content">{editingStaff ? 'Change PIN (Optional)' : 'Staff PIN'}</label>
                                <input type="password" placeholder="••••" maxLength={6} required={!editingStaff} className="input input-bordered w-full rounded-2xl h-12 bg-base-200/30 text-center tracking-[0.5em] font-black text-base-content" value={formData.pin} onChange={(e) => setFormData({ ...formData, pin: e.target.value })} />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={closeModal} className="btn btn-ghost flex-1 rounded-2xl h-12 font-bold text-base-content">Cancel</button>
                                <button type="submit" className="btn btn-primary flex-1 rounded-2xl h-12 font-bold shadow-lg shadow-primary/20">{editingStaff ? 'Save Changes' : 'Create Account'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- MAIN WRAPPER COMPONENT ---
const StaffManagementPage = () => {
    return (
        <StaffProvider>
            <StaffManagementContent />
        </StaffProvider>
    );
};

export default StaffManagementPage;
