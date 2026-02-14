import React from 'react';
import { Link } from 'react-router';
import { FaQrcode, FaCamera, FaCircleInfo, FaClockRotateLeft } from 'react-icons/fa6';

const Scanner = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Coupon Scanner</h1>
          <p className="text-base-content/60 mt-1 text-sm">Scan customer QR codes to redeem rewards.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/recent-scans" className="btn btn-ghost btn-sm rounded-xl">
            <FaClockRotateLeft className="mr-2" /> Recent Scans
          </Link>
          <button className="btn btn-primary btn-sm rounded-xl">
            <FaCircleInfo className="mr-2" /> Help
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-[320px] md:min-h-[400px] relative group">
            <div className="absolute inset-0 bg-neutral/90 flex flex-col items-center justify-center text-neutral-content z-10 transition-opacity group-hover:opacity-100 opacity-95 p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-6 animate-bounce shadow-lg shadow-primary/20">
                <FaCamera className="text-xl text-primary-content" />
              </div>
              <h3 className="font-bold text-xl mb-2">Camera Access Required</h3>
              <p className="text-sm opacity-70 max-w-[240px] leading-relaxed">
                Please allow camera permissions to start scanning customer coupons.
              </p>
              <button className="btn btn-primary mt-8 rounded-2xl px-10 h-12 shadow-lg shadow-primary/30">
                Enable Camera
              </button>
            </div>

            {/* Mock scanning frame - scaled for mobile */}
            <div className="w-48 h-48 md:w-64 md:h-64 border-2 border-primary/30 rounded-3xl relative z-0 opacity-20">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary -mt-1 -ml-1 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary -mt-1 -mr-1 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary -mb-1 -ml-1 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary -mb-1 -mr-1 rounded-br-lg"></div>
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-primary/40 animate-scan"></div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <FaCircleInfo className="text-lg" />
            </div>
            <div>
              <h3 className="font-bold text-base-content">Quick Tip</h3>
              <p className="text-sm text-base-content/70 mt-1">
                Ensure the customer's phone brightness is turned up and the QR code is within the frame. Scanned coupons are automatically logged to your history.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FaQrcode className="text-primary" /> Manually Enter Code
            </h3>
            <div className="form-control">
              <input type="text" placeholder="e.g. WIN-12345" className="input input-bordered w-full h-12 rounded-xl" />
            </div>
            <button className="btn btn-primary w-full mt-4 h-12 rounded-xl">Validate Code</button>
          </div>

          <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm p-6">
            <h3 className="font-bold text-lg mb-4">Redemption Guide</h3>
            <ul className="space-y-4">
              {[
                { step: 1, text: "Verify customer's valid coupon on their device." },
                { step: 2, text: "Scan QR code or enter numeric code manually." },
                { step: 3, text: "Check for 'Validated' status on your screen." },
                { step: 4, text: "Apply discount to the customer's bill." }
              ].map(item => (
                <li key={item.step} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-base-200 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{item.step}</span>
                  <span className="text-xs text-base-content/70 font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-120px); opacity: 0; }
          50% { transform: translateY(120px); opacity: 1; }
        }
        .animate-scan {
          animation: scan 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Scanner;
