import React from 'react';

const Terms = () => {
  const lastUpdated = "February 2024";

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto prose prose-slate">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-base-content mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-base-content/60">
          Last updated: {lastUpdated}
        </p>
      </header>

      <section className="space-y-8 text-base-content/80">
        <div>
          <h2 className="text-2xl font-bold text-base-content mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Dine & Play platform, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-base-content mb-4">2. Description of Service</h2>
          <p>
            Dine & Play provides an interactive gaming and rewards platform for restaurants and their customers. 
            Services include digital puzzles, coupon distribution, and marketing automation tools.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-base-content mb-4">3. User Conduct</h2>
          <p>
            Users agree not to:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Attempt to circumvent any game mechanics or reward systems.</li>
            <li>Use the service for any illegal or unauthorized purpose.</li>
            <li>Interfere with or disrupt the integrity or performance of the service.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-base-content mb-4">4. Rewards and Coupons</h2>
          <p>
            Coupons earned through Dine & Play are subject to the specific terms and conditions of the issuing restaurant. 
            They have no cash value, are non-transferable, and must be presented at the time of purchase. 
            We reserve the right to void coupons if we suspect fraudulent activity.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-base-content mb-4">5. Privacy and Data</h2>
          <p>
            Your use of the service is also governed by our Privacy Policy. By using Dine & Play, 
            you consent to the collection and use of information as outlined in that policy, 
            including compliance with CASL and PIPEDA regulations.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-base-content mb-4">6. Limitation of Liability</h2>
          <p>
            Dine & Play shall not be liable for any indirect, incidental, special, consequential, 
            or punitive damages resulting from your access to or use of, or inability to access or use, the services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-base-content mb-4">7. Modifications to Service</h2>
          <p>
            We reserve the right to modify or discontinue, temporarily or permanently, the service 
            with or without notice at any time.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-base-content mb-4">8. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@dineandplay.com.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Terms;