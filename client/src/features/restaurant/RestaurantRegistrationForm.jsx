import { useState, useEffect, useRef } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import {
    FaStore,
    FaEnvelope,
    FaUpload,
    FaArrowRight,
    FaMapLocationDot,
    FaPhone,
    FaUser,
    FaBuilding,
    FaCity,
    FaGlobe,
    FaMap,
    FaHashtag,
    FaMagnifyingGlass
} from "react-icons/fa6";

const RestaurantRegistrationForm = ({ onSubmitSuccess, onCancel, submitLabel = "Submit Application" }) => {
    const [formData, setFormData] = useState({
        restaurantName: "",
        restaurantPhone: "",
        address1: "",
        address2: "",
        city: "",
        zip: "",
        state: "",
        country: "",
        managerName: "",
        managerEmail: "",
        managerPhone: "",
        logo: null,
        cover: null
    });

    // --- Geoapify Autocomplete Logic ---
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchSuggestions = async (text) => {
        const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
        if (!apiKey || text.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&apiKey=${apiKey}&limit=5`
            );
            const data = await response.json();
            if (data.features) {
                setSuggestions(data.features);
                setShowSuggestions(true);
            }
        } catch (error) {
            console.error("Geoapify Error:", error);
        }
    };

    const handleSelectSuggestion = (feature) => {
        const props = feature.properties;

        setFormData(prev => ({
            ...prev,
            address1: props.address_line1 || "",
            city: props.city || props.town || props.village || "",
            state: props.state || "",
            country: props.country || "",
            zip: props.postcode || ""
        }));

        setShowSuggestions(false);
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, [field]: file });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.logo) {
            alert("Restaurant Logo is required.");
            return;
        }
        // In a real app, logic to send data to server would go here.
        if (onSubmitSuccess) onSubmitSuccess(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Restaurant Info Section */}
            <div>
                <h3 className="text-lg font-black flex items-center gap-2 mb-4 border-b border-base-200 pb-2 text-base-content">
                    <FaStore className="text-primary" /> Restaurant Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <Input
                        label="Restaurant Name"
                        placeholder="e.g. The Burger Joint"
                        startIcon={<FaStore />}
                        value={formData.restaurantName}
                        onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                        required
                    />
                    <Input
                        label="Restaurant Phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        startIcon={<FaPhone />}
                        value={formData.restaurantPhone}
                        onChange={(e) => setFormData({ ...formData, restaurantPhone: e.target.value })}
                        required
                    />

                    {/* Address Section with Geoapify Autocomplete */}
                    <div className="md:col-span-2" ref={dropdownRef}>
                        <Input
                            label="Address Line 1 (Search to Auto-fill)"
                            labelRight={!import.meta.env.VITE_GEOAPIFY_API_KEY && (
                                <span className="text-[9px] font-black text-warning uppercase bg-warning/10 px-2 py-0.5 rounded-full">Autocomplete Disabled</span>
                            )}
                            placeholder="Start typing your restaurant address..."
                            startIcon={<FaMagnifyingGlass />}
                            value={formData.address1}
                            onChange={(e) => {
                                setFormData({ ...formData, address1: e.target.value });
                                fetchSuggestions(e.target.value);
                            }}
                            autoComplete="off"
                            required
                        >
                            {/* Suggestions Dropdown - Nested inside the relative container */}
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="absolute z-[100] w-full mt-1 bg-base-100 border border-base-300 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    {suggestions.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleSelectSuggestion(suggestion)}
                                            className="w-full text-left px-5 py-3 hover:bg-primary/10 transition-colors border-b last:border-0 border-base-200 group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FaMapLocationDot className="text-sm opacity-30 group-hover:text-primary group-hover:opacity-100 transition-all font-bold" />
                                                <div>
                                                    <p className="text-sm font-bold text-base-content">{suggestion.properties.address_line1}</p>
                                                    <p className="text-[10px] opacity-50 font-medium uppercase tracking-wider">{suggestion.properties.address_line2}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </Input>
                    </div>

                    <div className="md:col-span-2">
                        <Input
                            label="Address Line 2 (Optional)"
                            placeholder="Apartment, suite, unit, floor, etc."
                            startIcon={<FaBuilding />}
                            value={formData.address2}
                            onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                        />
                    </div>

                    <Input
                        label="Country"
                        placeholder="Country"
                        startIcon={<FaGlobe />}
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        required
                    />

                    <Input
                        label="Province / State"
                        placeholder="State/Province"
                        startIcon={<FaMap />}
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        required
                    />

                    <Input
                        label="City"
                        placeholder="City"
                        startIcon={<FaCity />}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                    />

                    <Input
                        label="Zip / Postal Code"
                        placeholder="Zip"
                        startIcon={<FaHashtag />}
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        required
                    />
                </div>
            </div>

            {/* Manager Info Section */}
            <div>
                <h3 className="text-lg font-black flex items-center gap-2 mb-4 border-b border-base-200 pb-2 text-base-content">
                    <FaUser className="text-primary" /> Manager Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <Input
                        label="Manager Name"
                        placeholder="Full name"
                        startIcon={<FaUser />}
                        value={formData.managerName}
                        onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                        required
                    />
                    <Input
                        label="Manager Phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        startIcon={<FaPhone />}
                        value={formData.managerPhone}
                        onChange={(e) => setFormData({ ...formData, managerPhone: e.target.value })}
                        required
                    />
                    <div className="md:col-span-2">
                        <Input
                            label="Work Email Address"
                            type="email"
                            placeholder="manager@restaurant.com"
                            startIcon={<FaEnvelope />}
                            value={formData.managerEmail}
                            onChange={(e) => setFormData({ ...formData, managerEmail: e.target.value })}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Branding Section */}
            <div>
                <h3 className="text-lg font-black flex items-center gap-2 mb-4 border-b border-base-200 pb-2 text-base-content">
                    <FaUpload className="text-primary" /> Brand Assets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label pt-0 border-b border-transparent">
                            <span className="text-[10px] font-black uppercase tracking-[0.15em] opacity-50 text-base-content">
                                Upload Logo <span className="text-error ml-1">*</span>
                            </span>
                        </label>
                        <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer relative mt-2 ${formData.logo ? 'border-primary bg-primary/5' : 'border-base-300 hover:bg-base-200/50 hover:border-primary bg-base-200/40 shadow-sm'}`}>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={(e) => handleFileChange(e, 'logo')} accept="image/*" />
                            <div className="flex flex-col items-center gap-2 relative z-10">
                                <FaUpload className={formData.logo ? 'text-primary' : 'opacity-40 text-primary'} />
                                <span className={`text-xs font-bold ${formData.logo ? 'text-primary' : 'opacity-60 text-base-content'}`}>{formData.logo ? formData.logo.name : "Choose Logo"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label pt-0 border-b border-transparent">
                            <span className="text-[10px] font-black uppercase tracking-[0.15em] opacity-50 text-base-content">Cover Image</span>
                        </label>
                        <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer relative mt-2 ${formData.cover ? 'border-primary bg-primary/5' : 'border-base-300 hover:bg-base-200/50 hover:border-primary bg-base-200/40 shadow-sm'}`}>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={(e) => handleFileChange(e, 'cover')} accept="image/*" />
                            <div className="flex flex-col items-center gap-2 relative z-10">
                                <FaUpload className={formData.cover ? 'text-primary' : 'opacity-40 text-primary'} />
                                <span className={`text-xs font-bold ${formData.cover ? 'text-primary' : 'opacity-60 text-base-content'}`}>{formData.cover ? formData.cover.name : "Choose Cover"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-4 flex gap-3">
                {onCancel && (
                    <Button type="button" onClick={onCancel} variant="ghost" className="flex-1 rounded-2xl h-14 font-black">Cancel</Button>
                )}
                <Button
                    type="submit"
                    variant="primary"
                    className="flex-1 h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:scale-[1.01] transition-transform group"
                >
                    {submitLabel} <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

        </form>
    );
};

export default RestaurantRegistrationForm;
