import { useNavigate } from '@tanstack/react-router';
import { XCircle } from 'lucide-react';

export default function PaymentFailurePage() {
  const navigate = useNavigate();

  return (
  <div className="container flex min-h-[600px] items-center justify-center py-8">
    <div className="w-full max-w-md border rounded-lg shadow bg-white p-6 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <XCircle className="h-10 w-10 text-red-600" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Payment Cancelled</h2>
      <p className="text-gray-600 mb-6">
        Your payment was not completed. No charges have been made to your account.
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate({ to: '/browse' })}
          className="border border-gray-300 rounded px-3 py-1 text-sm font-semibold hover:bg-gray-100"
        >
          Back to Browse
        </button>
        <button
          onClick={() => window.history.back()}
          className="border border-gray-300 rounded px-3 py-1 text-sm font-semibold hover:bg-gray-100"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
);