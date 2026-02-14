import React, { useState, useMemo } from 'react';
import { FaClockRotateLeft, FaMagnifyingGlass, FaChevronLeft, FaChevronRight, FaCircleInfo } from 'react-icons/fa6';

const RecentScans = () => {
    // Mock current waiter ID - in production this would come from Auth Context
    const currentWaiterId = "EMP-9821";

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Mock data with waiterId attribute
    const allScans = [
        { waiterId: 'EMP-9821', email: 'john.doe@example.com', couponId: 'WIN-12345', date: 'Feb 11, 2024', time: '02:30 PM' },
        { waiterId: 'EMP-9821', email: 'sarah.smith@gmail.com', couponId: 'WIN-67890', date: 'Feb 10, 2024', time: '06:15 PM' },
        { waiterId: 'EMP-4432', email: 'hidden@other.com', couponId: 'WIN-XXXXX', date: 'Feb 10, 2024', time: '11:00 AM' }, // Someone else's scan
        { waiterId: 'EMP-9821', email: 'mike.jones@outlook.com', couponId: 'WIN-45678', date: 'Feb 09, 2024', time: '12:45 PM' },
        { waiterId: 'EMP-9821', email: 'emily.wilson@yahoo.com', couponId: 'WIN-23456', date: 'Feb 08, 2024', time: '08:20 PM' },
        { waiterId: 'EMP-9821', email: 'alex.braun@company.ca', couponId: 'WIN-99001', date: 'Feb 07, 2024', time: '01:10 PM' },
        { waiterId: 'EMP-9821', email: 'lisa.wong@tech.com', couponId: 'WIN-77882', date: 'Feb 07, 2024', time: '09:45 AM' },
        { waiterId: 'EMP-9821', email: 'kevin.lee@service.it', couponId: 'WIN-55443', date: 'Feb 06, 2024', time: '03:55 PM' },
    ];

    // 1. Filter by Waiter ID ONLY
    const myScans = useMemo(() => {
        return allScans.filter(scan => scan.waiterId === currentWaiterId);
    }, [currentWaiterId]);


    // 2. Apply Search
    const filteredData = useMemo(() => {
        return myScans.filter(scan =>
            scan.couponId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scan.date.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [myScans, searchTerm]);

    // 3. Pagination Logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const maskEmail = (email) => {
        const [user, domain] = email.split('@');
        return `${user.charAt(0)}***@${domain}`;
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-base-content flex items-center gap-3">
                        <FaClockRotateLeft className="text-primary" /> My Redemptions
                    </h1>
                    <p className="text-base-content/60 mt-1 text-sm font-medium">
                        Showing scans for Waiter ID: <span className="text-primary font-bold">{currentWaiterId}</span>
                    </p>
                </div>

            </div>

            {/* Control Bar: Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1 group">
                    <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by coupon ID or date (e.g. Feb 11)..."
                        className="input input-bordered w-full h-12 pl-12 rounded-2xl bg-base-100 focus:ring-2 focus:ring-primary/20 transition-all border-base-300"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-base-100 rounded-[2rem] border border-base-300 shadow-sm overflow-hidden min-h-[460px] flex flex-col">
                <div className="overflow-x-auto flex-1">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-base-200/40 border-b border-base-300">
                                <th className="py-5 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Customer</th>
                                <th className="py-5 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Coupon ID</th>
                                <th className="py-5 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black text-center">Status</th>
                                <th className="py-5 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black text-right">Redeemed At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-200">
                            {paginatedData.map((scan, idx) => (
                                <tr key={idx} className="hover:bg-primary/[0.02] transition-colors group">
                                    <td className="py-5 px-8">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">{maskEmail(scan.email)}</span>
                                            <span className="text-[10px] opacity-40 font-black uppercase mt-0.5 tracking-wider">Validated Customer</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <span className="font-mono text-xs bg-base-200 text-base-content/70 px-3 py-1.5 rounded-lg border border-base-300 font-bold group-hover:border-primary/30 transition-colors">
                                            {scan.couponId}
                                        </span>
                                    </td>
                                    <td className="py-5 px-8 text-center">
                                        <div className="inline-flex items-center gap-1.5 bg-success/10 text-success px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full">
                                            <div className="w-1 h-1 rounded-full bg-success animate-pulse"></div>
                                            Success
                                        </div>
                                    </td>
                                    <td className="py-5 px-8 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-bold opacity-70">{scan.date}</span>
                                            <span className="text-[10px] opacity-40">{scan.time}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredData.length === 0 && (
                        <div className="py-32 text-center">
                            <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center mx-auto mb-6 opacity-30">
                                <FaMagnifyingGlass className="text-3xl" />
                            </div>
                            <p className="text-sm opacity-30 font-black uppercase tracking-[0.3em]">No matching records</p>
                        </div>
                    )}
                </div>

                {/* Dynamic Pagination Bar */}
                {filteredData.length > 0 && (
                    <div className="p-6 border-t border-base-300 bg-base-200/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs font-bold opacity-40 uppercase tracking-widest">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} scans
                        </p>

                        <div className="join shadow-sm border border-base-300">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className="join-item btn btn-sm bg-base-100 hover:bg-base-200 border-r border-base-300 disabled:opacity-30"
                            >
                                <FaChevronLeft className="text-[10px]" />
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`join-item btn btn-sm bg-base-100 border-r border-base-300 last:border-0 hover:bg-primary hover:text-white transition-colors ${currentPage === i + 1 ? 'bg-primary text-white border-primary' : ''}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className="join-item btn btn-sm bg-base-100 hover:bg-base-200 disabled:opacity-30"
                            >
                                <FaChevronRight className="text-[10px]" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 flex items-center gap-3 p-5 bg-info/5 border border-info/10 rounded-2xl">
                <div className="w-8 h-8 rounded-full bg-info/10 text-info flex items-center justify-center flex-shrink-0">
                    <FaCircleInfo className="text-xs" />
                </div>
                <p className="text-xs text-info-content/70 italic leading-relaxed">
                    Privacy Filter Active: Customer emails are partially masked. Only scans performed by your employee account are visible here for security audit purposes.
                </p>
            </div>
        </div>
    );
};

export default RecentScans;
