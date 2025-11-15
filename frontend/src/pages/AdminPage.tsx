import React from "react";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Admin Dashboard
      </h1>

      {/* Overview section */}
      <section className="bg-gray-50 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">
          Platform Overview
        </h2>
        <p>
          The School Uniform Exchange (SUE) platform operates with a transparent
          fee structure to ensure all sellers and buyers know exactly how
          payments are processed. Our mission is to make pre‑loved uniform
          trading simple, fair, and sustainable.
        </p>
      </section>

      {/* Fees and commission */}
      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">
          Platform Fees & Commissions
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>A flat listing fee of <strong>£1.50</strong> applies to all new listings.</li>
          <li>
            A <strong>5% commission</strong> is automatically deducted from the sale price before the seller’s payment is released.
          </li>
          <li>
            The seller receives their balance once the buyer confirms receipt, or automatically after seven days.
          </li>
          <li>
            Commission is refunded only if both buyer and seller mutually cancel a sale; the listing fee is non‑refundable.
          </li>
        </ul>
      </section>

      {/* Payments and Stripe configuration */}
      <section className="bg-gray-50 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">
          Secure Payments (Stripe)
        </h2>
        <p className="mb-3">
          All transactions on SUE are processed securely through Stripe —
          ensuring quick and safe payments for both buyers and sellers.
        </p>
        <p className="mb-3">
          To configure or check your Stripe account connection, log in to the
          Stripe Dashboard with your admin credentials. Make sure your secret
          keys are active and that the redirect URLs match your deployed
          Vercel app domain.
        </p>
        <p>
          Stripe test mode can be used for development purposes with sample card numbers
          like <code>4242 4242 4242 4242</code> for simulated tests.
        </p>
      </section>

      {/* Transaction management guidance */}
      <section className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold text-burgundy mb-3">
          Transaction Flow and Management
        </h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Buyer completes payment via Stripe checkout.</li>
          <li>Seller is notified to dispatch the item within 3 working days.</li>
          <li>Buyer confirms receipt in their messages dashboard.</li>
          <li>Admin authorizes payment release to the seller.</li>
        </ol>
        <p className="mt-3">
          Admins can view transaction summaries, review disputes, and update
          payment statuses directly through the internal dashboard or Stripe
          interface.
        </p>
      </section>

      {/* Footer note */}
      <section className="bg-gray-100 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> This simplified admin panel is optimized for
          Vercel deployment and demonstrates all policy, fee, and payment
          structures without relying on backend or authentication imports.
        </p>
      </section>
    </div>
  );
}
