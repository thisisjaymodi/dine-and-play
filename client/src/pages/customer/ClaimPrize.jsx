import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FaTrophy, FaEnvelope, FaUser, FaCircleCheck, FaShieldHalved } from 'react-icons/fa6';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

const ClaimPrize = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    const saved = localStorage.getItem('dine_play_active_coupon');
    if (saved) {
      const coupon = JSON.parse(saved);
      if (Date.now() < coupon.expiry) {
        navigate(`../coupon/${coupon.id}`, { replace: true });
      }
    }
  }, [navigate]);

  const restaurantName = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'the restaurant';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!formData.consent) {
      setError('Please check the consent box to receive your coupon.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      // Store the active coupon in localStorage with a 30-minute expiry
      const expiryTime = Date.now() + 30 * 60 * 1000;
      const couponId = `win-${Math.random().toString(36).substr(2, 9)}`;

      const activeCoupon = {
        id: couponId,
        slug: slug,
        expiry: expiryTime,
        claimedAt: Date.now()
      };

      localStorage.setItem('dine_play_active_coupon', JSON.stringify(activeCoupon));

      navigate(`../coupon/${couponId}`);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto py-4">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner animate-pulse">
          <FaTrophy className="text-4xl" />
        </div>
        <h2 className="text-3xl font-bold text-base-content mb-2">Claim Your Coupon!</h2>
        <p className="text-base-content/60">Enter your details below to receive your digital coupon.</p>
      </div>

      <Card className="shadow-xl" bodyClassName="p-6 gap-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="alert alert-error text-sm py-2 rounded-xl font-bold text-white shadow-md">
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Your Name"
              type="text"
              name="name"
              placeholder="John Doe"
              startIcon={<FaUser />}
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="john@example.com"
              startIcon={<FaEnvelope />}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="bg-base-200/50 p-4 rounded-2xl border border-base-200 transition-colors hover:border-primary/30 group">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="checkbox checkbox-primary mt-1 rounded-md"
              />
              <div className="text-xs leading-relaxed text-base-content/70">
                <span className="font-bold text-base-content group-hover:text-primary transition-colors block mb-1">Stay updated with {restaurantName}!</span>
                I agree to receive personalized special offers, discounts, and latest news from <span className="font-semibold">{restaurantName}</span> via email. I understand I can withdraw my consent at any time.
              </div>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/30"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            <FaCircleCheck className="text-xl mr-2" />
            Get My Coupon
          </Button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-base-content/40 uppercase tracking-widest mt-2">
            <FaShieldHalved />
            <span>Secure & CASL Compliant</span>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ClaimPrize;