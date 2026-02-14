import { useState } from "react";
import { Link } from "react-router";
import Button from "../../ui/Button";
import { FaCircleCheck } from "react-icons/fa6";
import RestaurantRegistrationForm from "../../features/restaurant/RestaurantRegistrationForm";

const RestaurantSignup = () => {
    const [step, setStep] = useState(1);
    const [submittedData, setSubmittedData] = useState(null);

    const handleSuccess = (data) => {
        setSubmittedData(data);
        setStep(2);
    };

    if (step === 2) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
                <div className="max-w-xl w-full text-center">
                    <div className="w-24 h-24 bg-success text-success-content rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-success/20">
                        <FaCircleCheck className="text-5xl" />
                    </div>
                    <h1 className="text-4xl font-black mb-4 text-base-content">Application Received!</h1>
                    <p className="text-lg opacity-70 mb-8 max-w-md mx-auto text-base-content">
                        Thank you for applying to join Dine & Play. Our team has received your request for <span className="font-bold text-base-content">{submittedData?.restaurantName}</span>.
                    </p>
                    <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm text-left mb-8">
                        <h3 className="font-bold mb-2 uppercase tracking-widest text-xs opacity-50 text-base-content">Next Steps</h3>
                        <ul className="list-disc list-inside space-y-2 text-sm opacity-80 text-base-content">
                            <li>System Administrators will review your brand assets.</li>
                            <li>You will receive an approval email at <strong>{submittedData?.managerEmail}</strong> within 24 hours.</li>
                            <li>Once approved, you can log in to set up your campaigns.</li>
                        </ul>
                    </div>
                    <Button to="/auth/login" variant="outline" className="rounded-xl px-12 h-12">
                        Return to Login
                    </Button>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4 font-sans text-base-content/90">
            <div className="text-center mb-10 mt-10">
                <h1 className="text-4xl font-black tracking-tighter text-base-content">
                    Partner with <span className="text-primary">Dine & Play</span>
                </h1>
                <p className="text-sm font-bold opacity-40 uppercase tracking-[0.2em] mt-3 font-sans text-base-content">Restaurant Registration</p>
            </div>

            <div className="card bg-base-100 shadow-2xl border border-base-300 w-full max-w-2xl overflow-hidden rounded-[2.5rem]">
                <div className="card-body p-8 md:p-12">
                    <RestaurantRegistrationForm onSubmitSuccess={handleSuccess} />
                </div>
            </div>

            <div className="mt-8 text-center space-y-4 pb-10">
                <p className="opacity-40 text-xs max-w-md mx-auto text-base-content">
                    By submitting this form, you agree to our Terms of Service. Your application is subject to manual review by the Dine & Play administration team.
                </p>
                <div className="h-px bg-base-300 w-12 mx-auto opacity-20"></div>
                <p className="text-sm font-medium text-base-content/60 uppercase tracking-wide text-xs">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="link link-primary font-black ml-1">
                        Go to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RestaurantSignup;
