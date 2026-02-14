import React, { useState, useMemo } from 'react';
import {
  FaChartLine,
  FaFileExport,
  FaMagnifyingGlass,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaUser,
  FaTicket,
  FaCircleCheck,
  FaUsers
} from 'react-icons/fa6';

import { mockScans } from '../../data/mockScans';

const Analytics = () => {
  // Mock Scan History Data
  const [scans] = useState(mockScans);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter Logic
  const filteredScans = useMemo(() => {
    return scans.filter(scan => {
      return scan.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (scan.email && scan.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        scan.couponId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scan.redeemedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scan.id.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [scans, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredScans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredScans.slice(startIndex, startIndex + itemsPerPage);

  // Stats Calculation
  const uniqueCustomersCount = useMemo(() => {
    return new Set(scans.map(s => s.email || s.customer)).size;
  }, [scans]);

  // CSV Export Logic
  const handleExportCSV = () => {
    const headers = ["Scan ID", "Customer", "Email", "Coupon ID", "Status", "Redeemed At", "Redeemed By"];
    const rows = filteredScans.map(s => [
      s.id,
      s.customer,
      s.email || "N/A",
      s.couponId,
      s.status,
      s.redeemedAt,
      s.redeemedBy
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `scan_history_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-base-content flex items-center gap-3">
            <FaChartLine className="text-primary" /> Analytics Dashboard
          </h1>
          <p className="text-base-content/60 mt-1 text-sm font-medium">Complete history of all customer reward redemptions across your team.</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="btn btn-primary rounded-2xl px-6 shadow-lg shadow-primary/20"
        >
          <FaFileExport className="mr-2" /> Export CSV
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-base-100 p-4 rounded-[2rem] border border-base-300 shadow-sm mb-6">
        <div className="relative w-full">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by customer, coupon, or staff name..."
            className="input input-bordered w-full pl-12 rounded-2xl h-12 bg-base-200/30"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-300 shadow-sm overflow-hidden min-h-[460px]">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200/40 border-b border-base-300">
                <th className="py-6 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Customer</th>
                <th className="py-6 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Email</th>
                <th className="py-6 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Coupon ID</th>
                <th className="py-6 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Status</th>
                <th className="py-6 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Redeemed At</th>
                <th className="py-6 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Redeemed By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {paginatedData.map((scan) => (
                <tr key={scan.id} className="hover:bg-primary/[0.02] transition-colors group">
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-base-200 flex items-center justify-center text-xs text-base-content/40 font-bold">
                        {scan.customer.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm tracking-tight">{scan.customer}</span>
                        <span className="text-[10px] opacity-40 font-black font-mono tracking-tighter uppercase">{scan.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <span className="text-sm opacity-60 font-medium">{scan.email || "N/A"}</span>
                  </td>
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-2">
                      <FaTicket className="text-secondary text-xs opacity-50" />
                      <span className="text-sm font-bold opacity-70 font-mono tracking-tight">{scan.couponId}</span>
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <div className="badge badge-success badge-outline gap-2 font-bold uppercase text-[9px] px-3 py-3 border-success/30 bg-success/5 text-success">
                      <FaCircleCheck className="text-[10px]" />
                      {scan.status}
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-2 text-sm opacity-60 font-medium whitespace-nowrap">
                      <FaClock className="text-[10px] opacity-40" />
                      {scan.redeemedAt}
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-2 text-sm font-bold text-primary">
                      <FaUser className="text-[10px] opacity-40" />
                      {scan.redeemedBy}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paginatedData.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mx-auto mb-4 opacity-30">
                <FaChartLine className="text-2xl" />
              </div>
              <p className="text-sm opacity-40 italic font-medium">No scan history matches your search.</p>
            </div>
          )}
        </div>

        {/* Shared Pagination Style */}
        {totalPages > 1 && (
          <div className="px-8 py-5 bg-base-200/30 border-t border-base-300 flex items-center justify-between">
            <span className="text-xs font-bold opacity-40 uppercase tracking-widest">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="btn btn-circle btn-sm btn-ghost disabled:opacity-20"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="btn btn-circle btn-sm btn-ghost disabled:opacity-20"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-6 bg-primary/5 border border-primary/10 rounded-[2rem] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl">
            <FaTicket />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-40 font-black">Total Scans</p>
            <p className="text-2xl font-black">{scans.length}</p>
          </div>
        </div>
        <div className="p-6 bg-secondary/5 border border-secondary/10 rounded-[2rem] flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-xl">
            <FaUsers />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-40 font-black">Unique Customers</p>
            <p className="text-2xl font-black">{uniqueCustomersCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;