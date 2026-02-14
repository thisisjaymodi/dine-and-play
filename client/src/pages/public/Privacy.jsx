import React from 'react';

const Privacy = () => {
  const lastUpdated = "February 2024";

  return (
    <div className="max-w-4xl mx-auto p-6 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-base-content/60 mb-4">
        Last updated: {lastUpdated}
      </p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
        <p>We collect information you provide directly to us when you create an account, make a reservation, or communicate with us. This may include your name, email address, and phone number.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, process your reservations, and send you technical notices and support messages.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Data Security</h2>
        <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.</p>
      </section>
    </div>
  );
};

export default Privacy;
