import React from "react";

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Terms and Conditions
      </h1>

      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">Effective Date</h2>
        <p>Version 1.0 — Effective from June 10, 2024 (UK)</p>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">1. Introduction</h2>
        <p>
          Welcome to the School Uniform Exchange (SUE). By using this platform, you agree to the following terms of service. 
          Please read these carefully before buying or selling items. SUE provides an online marketplace connecting UK families 
          to buy and sell second‑hand school uniforms safely.
        </p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">2. Listings and Sales</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Only school uniforms and related accessories may be listed.</li>
          <li>All listings must include accurate details and at least one clear photo.</li>
          <li>Sellers must dispatch sold items within three business days of payment.</li>
          <li>Listings that are inaccurate, misleading, or inappropriate may be removed by SUE moderators.</li>
        </ul>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">3. Fees and Commission</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Each listing includes a £1.50 non‑refundable listing fee.</li>
          <li>A 5% commission is deducted from each completed transaction.</li>
          <li>Payments are processed securely through Stripe, with sellers receiving funds once the buyer confirms receipt.</li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">4. Returns and Refunds</h2>
        <p>
          Buyers may request a return within three calendar days of delivery if the item is materially different from the listing description or is defective. 
          Refunds are processed once the seller confirms receipt of the returned item. The £1.50 listing fee is non‑refundable.
        </p>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">5. User Conduct</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Treat other users with respect in all communications and transactions.</li>
          <li>Abusive, fraudulent, or inappropriate behaviour will result in suspension or removal from the platform.</li>
          <li>Always be honest about item conditions and pricing.</li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">6. Dispute Resolution</h2>
        <p>
          In the unlikely event of a dispute, users should first attempt to resolve it directly through respectful messaging. 
          If this fails, the SUE support team will review the issue and make a fair determination based on provided evidence.
        </p>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg shadow mb-12">
        <h2 className="text-xl font-semibold text-burgundy mb-3">7. Governing Law</h2>
        <p>
          These Terms and Conditions are governed by the laws of the United Kingdom. Any disputes shall be resolved in UK courts under applicable law.
        </p>
      </section>

      <div className="text-center">
        <img
          src="/generated/sue-mascot-improved-bg.dim_400x400.png"
          alt="Sue the mascot smiling"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h2 className="text-lg font-bold text-burgundy mb-2">Sue’s Important Reminder</h2>
        <p className="text-gray-700 max-w-xl mx-auto">
          Using SUE means you’ve read and agreed to these Terms and Conditions. 
          They help keep our uniform exchange safe, simple, and fair for everyone!
        </p>
      </div>
    </div>
  );
}
