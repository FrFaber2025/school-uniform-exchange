
import { AlertCircle, Info, Shield } from 'lucide-react';

export default function ReturnsRefundsPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="mb-3 text-3xl font-bold">Returns and Refunds Policy</h1>
          <p className="text-muted-foreground">
            Understanding our returns and refunds process for School Uniform Exchange (SUE)
          </p>
        </div>

        <div className="mb-6 border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
  <div className="flex items-start gap-2">
    <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
    <div>
      <h3 className="font-semibold text-blue-800">Important Information</h3>
      <p className="text-gray-700">
        Please read this policy carefully before making a purchase. Returns and refunds are handled directly between buyers and sellers.
      </p>
    </div>
  </div>
</div>

        <div className="space-y-6">
          <div className="border rounded-lg shadow bg-white p-6 mb-6">
  <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
    <Info className="h-5 w-5 text-primary" />
    Buyer-Seller Negotiation
  </h3>
  <div className="space-y-3">
    <p className="text-gray-700">
      All returns and refunds must be negotiated directly between the buyer and seller. The School Uniform Exchange platform facilitates the initial transaction but does not mediate disputes or handle returns.
    </p>
    <p className="text-gray-700">
      We encourage both parties to communicate clearly and reach a mutually agreeable solution if there are any issues with the item.
    </p>
  </div>
</div>

          <div className="border rounded-lg shadow bg-white p-6 mb-6">
  <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
    <AlertCircle className="h-5 w-5 text-primary" />
    Platform Commission Refund
  </h3>
  <div className="space-y-3">
    <p className="text-gray-700">
      If both the buyer and seller agree to cancel the transaction, the School Uniform Exchange will refund its 5% commission to the seller.
    </p>
    <p className="text-gray-700">
      To request a commission refund, both parties must contact our support team with confirmation that they have mutually agreed to cancel the transaction.
    </p>
  </div>
</div>

          <div className="border rounded-lg shadow bg-white p-6 mb-6">
  <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
    <AlertCircle className="h-5 w-5 text-red-600" />
    Administration Fee Retention
  </h3>
  <div className="space-y-3">
    <p className="text-gray-700">
      The £1.50 administration fee is <strong>non-refundable</strong> and will be retained by the platform even in cases of agreed transaction cancellation.
    </p>
    <p className="text-gray-700">
      This fee covers the costs of listing processing, payment handling, and platform maintenance.
    </p>
  </div>
</div>

          <div className="border rounded-lg shadow bg-white p-6 mb-6">
  <h3 className="text-lg font-semibold mb-3">Best Practices for Buyers</h3>
  <ul className="list-inside list-disc space-y-2 text-gray-700">
    <li>Carefully review all item photos and descriptions before purchasing</li>
    <li>Check the seller's ratings and reviews</li>
    <li>Ask questions through the messaging system before completing payment</li>
    <li>Inspect items promptly upon receipt</li>
    <li>Contact the seller immediately if there are any issues</li>
  </ul>
</div>

          <div className="border rounded-lg shadow bg-white p-6 mb-6">
  <h3 className="text-lg font-semibold mb-3">Best Practices for Sellers</h3>
  <ul className="list-inside list-disc space-y-2 text-gray-700">
    <li>Provide accurate and detailed item descriptions</li>
    <li>Upload clear, well-lit photos showing the item's condition</li>
    <li>Ensure items match the described condition</li>
    <li>Wash or dry-clean items before listing</li>
    <li>Package items securely for shipping</li>
    <li>Respond promptly to buyer inquiries</li>
  </ul>
</div>

          <div className="border rounded-lg shadow bg-white p-6 mb-6">
  <h3 className="text-lg font-semibold mb-3">Summary</h3>
  <div className="space-y-3">
    <div className="rounded-lg border bg-gray-50 p-4">
      <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex items-start gap-2">
          <span className="font-semibold">•</span>
          <span>Returns and refunds are negotiated between buyer and seller</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-semibold">•</span>
          <span>Platform commission (5%) is refunded if both parties agree to cancel</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-semibold">•</span>
          <span>Administration fee (£1.50) is non-refundable in all cases</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-semibold">•</span>
          <span>Clear communication between parties is essential</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</div>
          <div className="mt-6 border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
  <div className="flex items-start gap-2">
    <Info className="h-4 w-4 text-blue-600 mt-0.5" />
    <div>
      <h3 className="font-semibold text-blue-800">Need Help?</h3>
      <p className="text-gray-700">
        If you have questions about our returns and refunds policy, please contact our support team. 
        We're here to help facilitate communication between buyers and sellers.
      </p>
        </div>
      </div>
    </div>
    );
    }