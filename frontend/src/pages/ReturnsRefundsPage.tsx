import React from "react";

export default function ReturnsRefundsPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Returns & Refunds Policy
      </h1>

      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-burgundy mb-3">Overview</h2>
        <p>
          The School Uniform Exchange (SUE) aims to ensure every buyer and seller has a fair and transparent experience. We encourage open and polite communication to resolve any issues quickly and fairly.
        </p>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-burgundy mb-3">Return Eligibility</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Returns are accepted only if an item arrives damaged or is not as described.</li>
          <li>Buyers must request a return within <strong>3 calendar days</strong> of receiving the item.</li>
          <li>Buyers must send photographic evidence if an item is faulty or misrepresented.</li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-burgundy mb-3">Refunds</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Refunds are issued when sellers receive the returned item in acceptable condition.</li>
          <li>
            The <strong>£1.50 listing fee is non‑refundable</strong> as it covers administrative and platform maintenance costs.
          </li>
          <li>If a sale is cancelled by mutual agreement, the 5% commission will be refunded, but the listing fee remains non‑refundable.</li>
        </ul>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-burgundy mb-3">Postage Responsibility</h2>
        <p>
          Sellers are responsible for sending items promptly and securely. Buyers cover return postage costs unless the item was misrepresented or damaged. We recommend tracked delivery for all returns.
        </p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow mb-12">
        <h2 className="text-xl font-semibold text-burgundy mb-3">Additional Guidance</h2>
        <p>
          Communication between buyer and seller is key. If either party cannot reach an agreement, the SUE support team may step in to review documentation and approve a fair resolution.
        </p>
      </section>

      <div className="text-center">
        <img
          src="/generated/sue-mascot-improved-bg.dim_400x400.png"
          alt="Sue the mascot offering help"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h2 className="text-lg font-bold text-burgundy mb-2">Sue’s Helpful Tip</h2>
        <p className="text-gray-700 max-w-xl mx-auto">
          Keep your receipts and shipping confirmations until everything is resolved. That way, Sue can help ensure every exchange runs smoothly!
        </p>
      </div>
    </div>
  );
}
