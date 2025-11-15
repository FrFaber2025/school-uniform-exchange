
import React from "react";
import { Link } from "@tanstack/react-router";

export default function PostagePackingPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Postage & Packing Policy
      </h1>

      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-burgundy mb-3">Seller Responsibilities</h2>
        <p>
          Sellers must package all school uniform items securely and dispatch them within 
          <strong> 3 working days</strong> of payment. Each parcel should be clearly labelled 
          with the buyer’s name and address as provided in the order.
        </p>
        <p className="mt-2">
          The School Uniform Exchange (SUE) is not responsible for lost or damaged parcels in transit. 
          We strongly recommend using a tracked delivery method such as Royal Mail 1st/2nd Class Signed For 
          or a courier service offering delivery confirmation.
        </p>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-burgundy mb-3">Postage Costs</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Postage costs should be factored into your listed price or clearly stated in your item description.</li>
          <li>Buyers are responsible for paying the agreed postage fee as included in the total checkout amount.</li>
          <li>Refunds for postage are not available unless items were misrepresented or damaged in transit.</li>
        </ul>
      </section>

      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold text-burgundy mb-3">Recommended Packaging</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use waterproof mailing bags or sturdy envelopes for protection against rain.</li>
          <li>Ensure tags, name labels, or markings are removed or clearly indicated in the listing photos.</li>
          <li>Avoid excessive packaging to keep postage costs low and reduce environmental impact.</li>
        </ul>
      </section>

      <section className="bg-gray-50 p-6 rounded-lg shadow mb-12">
        <h2 className="text-xl font-semibold text-burgundy mb-3">Buyer Information</h2>
        <p>
          Buyers are encouraged to confirm receipt of items promptly through the SUE messaging system. 
          Once the buyer confirms, payment will be released to the seller. 
          If there are issues with delivery, buyers should contact the seller politely and provide proof where possible.
        </p>
      </section>

      <div className="text-center">
        <img
          src="/generated/sue-mascot-improved-bg.dim_400x400.png"
          alt="Sue the mascot with delivery tip"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h2 className="text-lg font-bold text-burgundy mb-3">Sue’s Delivery Tip</h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-6">
          Sue says: “Keep proof of postage for every parcel — it protects both you and your buyer if things go astray!”
        </p>

        <div className="flex justify-center flex-wrap gap-4">
          <Link
            to="/seller-tips"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Seller Tips
          </Link>
          <Link
            to="/"
            className="bg-burgundy text-white px-6 py-2 rounded hover:bg-burgundy-dark transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
