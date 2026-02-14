import React, { useState } from 'react';
import {
    FaCircleCheck,
    FaXmark,
    FaEnvelope,
    FaGlobe,
    FaClock,
    FaPhone,
    FaUser,
    FaCity,
    FaPenToSquare,
    FaEye,
    FaStore,
    FaMapLocationDot,
    FaUpload
} from 'react-icons/fa6';

import { mockRequests } from '../../data/mockRequests';

const AdminRequests = () => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(null);

    // Mock data based on the new signup fields
    const [requests, setRequests] = useState(mockRequests);

    const handleOpenReview = (req) => {
        setSelectedRequest(req);
        setEditData({ ...req });
        setIsEditing(false);
    };

    const handleSaveEdit = () => {
        setRequests(requests.map(r => r.id === editData.id ? editData : r));
        setSelectedRequest(editData);
        setIsEditing(false);
    };

    const handleAction = (id, action) => {
        // In a real app, this would be an API call
        setRequests(requests.filter(r => r.id !== id));
        setSelectedRequest(null);
        alert(`Request ${action === 'approve' ? 'Approved' : 'Rejected'} successfully.`);
    };

    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-base-content tracking-tight">Partnership Requests</h1>
                <p className="text-sm text-base-content/60 mt-1">Review, edit, and approve new restaurant applications.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((req) => (
                    <div key={req.id} className="bg-base-100 rounded-[2rem] border border-base-200 shadow-sm p-6 hover:shadow-xl transition-all group relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 left-0 w-2 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>

                        <div className="flex justify-between items-start mb-6">
                            <img src={req.logo} alt={req.restaurantName} className="w-14 h-14 rounded-2xl object-cover bg-base-200 shadow-inner" />
                            <span className="text-[10px] font-black text-base-content/40 uppercase tracking-widest flex items-center gap-1.5 bg-base-200 px-3 py-1.5 rounded-full">
                                <FaClock className="text-primary" /> {req.date}
                            </span>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-xl font-black text-base-content leading-tight mb-2">{req.restaurantName}</h3>
                            <div className="space-y-2 mb-6">
                                <p className="text-sm text-base-content/60 font-bold flex items-center gap-2">
                                    <FaCity className="text-primary/40" /> {req.city}, {req.state}
                                </p>
                                <p className="text-sm text-base-content/60 font-medium flex items-center gap-2">
                                    <FaGlobe className="text-primary/40" /> {req.country}
                                </p>
                            </div>

                            <div className="bg-base-200/50 rounded-2xl p-4 mb-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-base-100 flex items-center justify-center shadow-sm">
                                        <FaUser className="text-primary text-xs" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest leading-none mb-1">Manager</p>
                                        <p className="text-sm font-bold text-base-content">{req.managerName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-base-100 flex items-center justify-center shadow-sm">
                                        <FaEnvelope className="text-primary text-xs" />
                                    </div>
                                    <p className="text-xs font-bold text-primary truncate flex-1">{req.managerEmail}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => handleOpenReview(req)}
                            className="btn btn-primary w-full h-12 rounded-xl font-black text-sm shadow-lg shadow-primary/20 group-hover:scale-[1.02] transition-transform mb-3"
                        >
                            <FaEye /> Review Full Details
                        </button>
                    </div>
                ))}

                {requests.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCircleCheck className="text-3xl text-base-content/30" />
                        </div>
                        <p className="text-xl font-black text-base-content">No Pending Requests</p>
                        <p className="text-sm text-base-content/60">Wait for new restaurants to apply to the platform.</p>
                    </div>
                )}
            </div>

            {/* Detailed Review & Edit Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-base-100 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col scale-in-center">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-base-200 flex justify-between items-center bg-base-200/30">
                            <div className="flex items-center gap-4">
                                <img src={editData.logo} alt="Logo" className="w-16 h-16 rounded-2xl object-cover bg-base-100 shadow-md border-2 border-base-100" />
                                <div>
                                    <h2 className="text-2xl font-black text-base-content tracking-tight">
                                        {isEditing ? `Edit ${selectedRequest.restaurantName}` : `Review application: ${selectedRequest.restaurantName}`}
                                    </h2>
                                    <p className="text-sm font-bold text-base-content/60 uppercase tracking-widest">{isEditing ? 'Make corrections before approval' : 'Finalizing partnership'}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="btn btn-ghost btn-circle hover:bg-base-200 transition-colors"
                            >
                                <FaXmark className="text-base-content/40 text-lg" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                {/* Restaurant Info Column */}
                                <div className="space-y-6">
                                    <h4 className="flex items-center gap-2 font-black text-primary uppercase tracking-[0.2em] text-[10px] mb-4">
                                        <FaStore /> Restaurant Identity
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label pt-0"><span className="label-text font-black text-[10px] uppercase opacity-40">Restaurant Name</span></label>
                                            <input
                                                disabled={!isEditing}
                                                className={`input input-bordered h-12 rounded-xl font-bold ${isEditing ? 'bg-base-100' : 'bg-transparent border-none shadow-none text-base-content/70 px-0'}`}
                                                value={editData.restaurantName}
                                                onChange={(e) => setEditData({ ...editData, restaurantName: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label pt-0"><span className="label-text font-black text-[10px] uppercase opacity-40">Restaurant Phone</span></label>
                                            <input
                                                disabled={!isEditing}
                                                className={`input input-bordered h-12 rounded-xl font-bold ${isEditing ? 'bg-base-100' : 'bg-transparent border-none shadow-none text-base-content/70 px-0'}`}
                                                value={editData.restaurantPhone}
                                                onChange={(e) => setEditData({ ...editData, restaurantPhone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <h4 className="flex items-center gap-2 font-black text-primary uppercase tracking-[0.2em] text-[10px] mt-8 mb-4">
                                        <FaMapLocationDot /> Detailed Address
                                    </h4>

                                    <div className="space-y-4">
                                        <div className="form-control">
                                            <label className="label pt-0"><span className="label-text font-black text-[10px] uppercase opacity-40">Address Line 1</span></label>
                                            <input
                                                disabled={!isEditing}
                                                className={`input input-bordered h-12 rounded-xl font-bold ${isEditing ? 'bg-base-100' : 'bg-transparent border-none shadow-none text-base-content/70 px-0'}`}
                                                value={editData.address1}
                                                onChange={(e) => setEditData({ ...editData, address1: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label pt-0"><span className="label-text font-black text-[10px] uppercase opacity-40">Address Line 2 (Optional)</span></label>
                                            <input
                                                disabled={!isEditing}
                                                className={`input input-bordered h-12 rounded-xl font-bold ${isEditing ? 'bg-base-100' : 'bg-transparent border-none shadow-none text-base-content/70 px-0'}`}
                                                value={editData.address2}
                                                onChange={(e) => setEditData({ ...editData, address2: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="form-control">
                                                <label className="label pt-0"><span className="label-text font-black text-[10px] uppercase opacity-40">City</span></label>
                                                <input
                                                    disabled={!isEditing}
                                                    className={`input input-bordered h-12 rounded-xl font-bold ${isEditing ? 'bg-base-100' : 'bg-transparent border-none shadow-none text-base-content/70 px-0'}`}
                                                    value={editData.city}
                                                    onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label pt-0"><span className="label-text font-black text-[10px] uppercase opacity-40">Zip Code</span></label>
                                                <input
                                                    disabled={!isEditing}
                                                    className={`input input-bordered h-12 rounded-xl font-bold ${isEditing ? 'bg-base-100' : 'bg-transparent border-none shadow-none text-base-content/70 px-0'}`}
                                                    value={editData.zip}
                                                    onChange={(e) => setEditData({ ...editData, zip: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="form-control">
                                                <label className="label pt-0"><span className="label-text font-black text-[10px] uppercase opacity-40">Province / State</span></label>
                                                <input
                                                    disabled={!isEditing}
                                                    className={`input input-bordered h-12 rounded-xl font-bold ${isEditing ? 'bg-base-100' : 'bg-transparent border-none shadow-none text-base-content/70 px-0'}`}
                                                    value={editData.state}
                                                    onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                                                />
                                            </div>
                                            <div className="form-control">
                                                <label className="label pt-0"><span className="label-text font-black text-[10px] uppercase opacity-40">Country</span></label>
                                                <input
                                                    disabled={!isEditing}
                                                    className={`input input-bordered h-12 rounded-xl font-bold ${isEditing ? 'bg-base-100' : 'bg-transparent border-none shadow-none text-base-content/70 px-0'}`}
                                                    value={editData.country}
                                                    onChange={(e) => setEditData({ ...editData, country: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Manager & Branding Column */}
                                <div className="space-y-6">
                                    <h4 className="flex items-center gap-2 font-black text-primary uppercase tracking-[0.2em] text-[10px] mb-4">
                                        <FaUser /> Manager Contact Details
                                    </h4>

                                    <div className="space-y-4 bg-base-200/50 rounded-3xl p-6 border border-base-200">
                                        <div className="form-control">
                                            <label className="label pt-0"><span className="label-text font-black text-[10px] uppercase opacity-40">Full Name</span></label>
                                            <div className="relative">
                                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 text-xs" />
                                                <input
                                                    disabled={!isEditing}
                                                    className={`input input-bordered h-12 pl-10 w-full rounded-xl font-bold ${isEditing ? 'bg-base-100 shadow-sm' : 'bg-transparent border-none shadow-none px-0 pl-10'}`}
                                                    value={editData.managerName}
                                                    onChange={(e) => setEditData({ ...editData, managerName: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-control">
                                            <label className="label pt-0"><span className="label-text font-black text-[10px] uppercase opacity-40">Work Email</span></label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 text-xs" />
                                                <input
                                                    disabled={!isEditing}
                                                    className={`input input-bordered h-12 pl-10 w-full rounded-xl font-bold ${isEditing ? 'bg-base-100 shadow-sm' : 'bg-transparent border-none shadow-none px-0 pl-10'}`}
                                                    value={editData.managerEmail}
                                                    onChange={(e) => setEditData({ ...editData, managerEmail: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-control">
                                            <label className="label pt-0"><span className="label-text font-black text-[10px] uppercase opacity-40">Personal Phone</span></label>
                                            <div className="relative">
                                                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 text-xs" />
                                                <input
                                                    disabled={!isEditing}
                                                    className={`input input-bordered h-12 pl-10 w-full rounded-xl font-bold ${isEditing ? 'bg-base-100 shadow-sm' : 'bg-transparent border-none shadow-none px-0 pl-10'}`}
                                                    value={editData.managerPhone}
                                                    onChange={(e) => setEditData({ ...editData, managerPhone: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <h4 className="flex items-center gap-2 font-black text-primary uppercase tracking-[0.2em] text-[10px] mt-8 mb-4">
                                        <FaUpload /> Brand Asset Verification
                                    </h4>

                                    <div className="relative group/cover">
                                        <img src={editData.cover} alt="Cover" className="w-full h-40 rounded-3xl object-cover shadow-inner" />
                                        <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">Cover Preview</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 bg-base-200/50 border-t border-base-200 flex flex-col md:flex-row gap-4 justify-between">
                            <div className="flex gap-3">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="btn h-12 rounded-2xl bg-base-100 border border-base-300 text-base-content hover:bg-base-200 font-black text-sm px-6"
                                    >
                                        <FaPenToSquare /> Allow Editing
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSaveEdit}
                                        className="btn btn-primary h-12 rounded-2xl font-black text-sm px-8 shadow-xl shadow-primary/20"
                                    >
                                        <FaCircleCheck /> Save Corrections
                                    </button>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleAction(selectedRequest.id, 'reject')}
                                    className="btn btn-error btn-outline h-12 rounded-2xl font-black text-sm px-8 bg-base-100"
                                >
                                    <FaXmark /> Reject Application
                                </button>
                                <button
                                    onClick={() => handleAction(selectedRequest.id, 'approve')}
                                    className="btn btn-success h-12 rounded-2xl text-white font-black text-sm px-10 shadow-xl shadow-success/20 hover:scale-[1.02] transition-transform"
                                >
                                    <FaCircleCheck /> Approve Partnership
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default AdminRequests;
