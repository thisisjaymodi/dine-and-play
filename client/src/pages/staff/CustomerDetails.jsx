import React, { useState, useMemo } from 'react';
import {
  FaUsers,
  FaFileExport,
  FaMagnifyingGlass,
  FaFilter,
  FaCircleCheck,
  FaCircleXmark,
  FaArrowDownWideShort,
  FaDatabase,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa6';

import { mockCustomers } from '../../data/mockCustomers';

const CustomerDetails = () => {
  // Mock Customer Data
  const [customers] = useState(mockCustomers);

  const [searchTerm, setSearchTerm] = useState("");
  const [showSubscribedOnly, setShowSubscribedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter Logic
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const name = customer.name || "";
      const email = customer.email || "";
      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesToggle = showSubscribedOnly ? customer.status === 'Subscribed' : true;

      return matchesSearch && matchesToggle;
    });
  }, [customers, searchTerm, showSubscribedOnly]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleToggle = (e) => {
    setShowSubscribedOnly(e.target.checked);
    setCurrentPage(1); // Reset to first page on toggle
  };

  // CSV Export Logic
  const handleExportCSV = () => {
    const headers = ["Customer ID", "Name", "Email", "Status"];
    const rows = filteredCustomers.map(c => [
      c.id,
      c.name,
      c.email,
      c.status
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `customer_list_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-base-content flex items-center gap-3">
            <FaUsers className="text-primary" /> Customers
          </h1>
          <p className="text-base-content/60 mt-1 text-sm font-medium">Manage your subscribers and export audience lists for marketing.</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="btn btn-primary rounded-2xl px-6 shadow-lg shadow-primary/20"
        >
          <FaFileExport className="mr-2" /> Export CSV
        </button>
      </div>

      {/* Controls Section */}
      <div className="bg-base-100 p-6 rounded-[2rem] border border-base-300 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="input input-bordered w-full pl-12 rounded-2xl h-12 bg-base-200/30"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center gap-4 bg-base-200/50 p-2 pr-4 rounded-2xl border border-base-300 whitespace-nowrap">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <FaFilter className="text-xs" />
            </div>
            <span className="text-sm font-bold opacity-70">Subscribed Only</span>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-sm"
              checked={showSubscribedOnly}
              onChange={handleToggle}
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-300 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200/40 border-b border-base-300">
                <th className="py-6 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">
                  <div className="flex items-center gap-2">Customer ID</div>
                </th>
                <th className="py-6 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Full Name</th>
                <th className="py-6 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">Email Address</th>
                <th className="py-6 px-8 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {paginatedData.map((customer) => (
                <tr key={customer.id} className="hover:bg-primary/[0.02] transition-colors group">
                  <td className="py-5 px-8">
                    <span className="text-xs font-black opacity-40 font-mono tracking-tighter">{customer.id}</span>
                  </td>
                  <td className="py-5 px-8 font-bold text-sm">{customer.name}</td>
                  <td className="py-5 px-8 text-sm opacity-60 font-medium">{customer.email}</td>
                  <td className="py-5 px-8 text-center">
                    <div className={`badge badge-sm font-bold uppercase text-[9px] px-3 py-3 gap-1.5 ${customer.status === 'Subscribed' ? 'badge-success bg-success/10 text-success border-success/20' : 'badge-ghost bg-base-200 text-base-content/40 border-base-300'}`}>
                      {customer.status === 'Subscribed' ? <FaCircleCheck className="text-[10px]" /> : <FaCircleXmark className="text-[10px]" />}
                      {customer.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paginatedData.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mx-auto mb-4 opacity-30">
                <FaUsers className="text-2xl" />
              </div>
              <p className="text-sm opacity-40 italic font-medium">No results matching your current filters.</p>
              <button
                onClick={() => { setSearchTerm(""); setShowSubscribedOnly(false); setCurrentPage(1); }}
                className="btn btn-ghost btn-xs mt-4 text-primary font-bold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
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

      {/* Footer Insight */}
      <div className="mt-8 flex items-center gap-4 p-5 bg-primary/5 border border-primary/10 rounded-3xl">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
          <FaDatabase className="text-sm" />
        </div>
        <p className="text-xs text-base-content/80 leading-relaxed font-medium italic">
          All customer data is collected with explicit CASL consent. Unsubscribed emails are automatically excluded from primary marketing exports to ensure compliance.
        </p>
      </div>
    </div>
  );
};

export default CustomerDetails;