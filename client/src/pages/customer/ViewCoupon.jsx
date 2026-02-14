import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaQrcode, FaScissors, FaClock, FaCircleCheck } from 'react-icons/fa6';

const ViewCoupon = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();

  const restaurantName = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'the restaurant';

  const [timeLeft, setTimeLeft] = React.useState('');
  const [isExpired, setIsExpired] = React.useState(false);

  React.useEffect(() => {
    const checkExpiry = () => {
      const saved = localStorage.getItem('dine_play_active_coupon');
      if (saved) {
        const couponData = JSON.parse(saved);
        const remaining = couponData.expiry - Date.now();

        if (remaining <= 0) {
          setIsExpired(true);
          setTimeLeft('Expired');
          localStorage.removeItem('dine_play_active_coupon');
        } else {
          const mins = Math.floor(remaining / 60000);
          const secs = Math.floor((remaining % 60000) / 1000);
          setTimeLeft(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
        }
      } else {
        setIsExpired(true);
      }
    };

    checkExpiry();
    const timer = setInterval(checkExpiry, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock coupon data
  const coupon = {
    title: "15% OFF YOUR MEAL",
    code: id || "WIN-5678",
    expiry: isExpired ? "Expired" : `Expires in ${timeLeft}`,
    terms: "Show this screen to your server to redeem. One-time use only."
  };

  return (
    <div className={`max-w-md mx-auto py-4 transition-all duration-700 ${isExpired ? 'grayscale opacity-60' : ''}`}>
      <div className="relative">
        {/* Ticket Top */}
        <div className="bg-primary text-primary-content p-8 rounded-t-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.3em] opacity-80 mb-2">Exclusive Reward</p>
            <h2 className="text-4xl font-black mb-1">{coupon.title}</h2>
            <p className="text-sm font-medium">at {restaurantName}</p>
          </div>
        </div>

        {/* Perforated Line */}
        <div className="bg-base-100 flex items-center px-1">
          <div className="w-6 h-6 rounded-full bg-base-300 -ml-3"></div>
          <div className="flex-1 border-t-2 border-dashed border-base-content/20 mx-1"></div>
          <div className="w-6 h-6 rounded-full bg-base-300 -mr-3"></div>
        </div>

        {/* Ticket Bottom */}
        <div className="bg-base-100 p-8 rounded-b-3xl shadow-xl border border-t-0 border-base-200 text-center">
          <div className="mb-8">
            <div className="w-48 h-48 bg-white border-8 border-base-200 rounded-2xl mx-auto flex items-center justify-center relative group">
              <FaQrcode className="text-9xl text-base-content" />
              <div className="absolute inset-0 bg-base-100/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <FaCircleCheck className="text-success text-4xl mb-2" />
                <span className="text-xs font-bold text-base-content uppercase">Scanner Ready</span>
              </div>
            </div>
            <p className="mt-4 font-mono text-xl font-bold tracking-widest text-base-content/80">{coupon.code}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-error font-bold animate-pulse">
              <FaClock />
              <span>{coupon.expiry}</span>
            </div>

            <div className="p-4 bg-base-200 rounded-2xl text-xs text-base-content/60 leading-relaxed">
              <p className="font-bold text-base-content mb-1 uppercase tracking-wider">How to Redeem</p>
              {coupon.terms}
            </div>
          </div>
        </div>

        {/* Decorative Scissors */}
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-base-content/20 opacity-50 hidden sm:block">
          <FaScissors className="text-2xl" />
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => navigate(`../all-games`)}
          className={`btn btn-wide rounded-2xl shadow-lg transition-all ${isExpired ? 'btn-primary shadow-primary/30 scale-105' : 'btn-outline'}`}
        >
          {isExpired ? 'Play Again to Win' : 'Back to Game Lobby'}
        </button>
      </div>
    </div>
  );
};

export default ViewCoupon;