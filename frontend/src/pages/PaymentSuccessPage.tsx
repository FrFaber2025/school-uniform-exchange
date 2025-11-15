import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { CheckCircle } from 'lucide-react';
import { useGetTransactionsForUser } from '../hooks/useQueries';
import ReviewSubmissionModal from '../components/ReviewSubmissionModal';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { data: transactions = [] } = useGetTransactionsForUser();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Find the most recent completed transaction
  const recentTransaction = transactions
    .filter((t: any) => t.status === 'completed')
    .sort((a: any, b: any) => Number(b.createdAt) - Number(a.createdAt))[0];

  useEffect(() => {
    if (recentTransaction) {
      const timer = setTimeout(() => {
        setSelectedTransaction(recentTransaction);
        setShowReviewModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [recentTransaction]);

  return (
  <div className="container flex min-h-[600px] items-center justify-center py-8">
    <div className="w-full max-w-md border rounded-lg shadow bg-white p-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold">Payment Successful!</h2>
      </div>
      <div className="mt-4 space-y-4 text-center">
        <p className="text-gray-600">
          Your payment has been processed successfully. The seller's contact details are now available, and you can message them directly.
        </p>
        <div className="space-y-2">
          <button
  onClick={() => navigate({ to: '/messages' })}
  className="border border-gray-300 rounded px-3 py-1 text-sm font-semibold hover:bg-muted"
>
  View Messages
</button>
          <button
            onClick={() => navigate({ to: '/browse' })}
            className="border border-gray-300 rounded px-3 py-1 text-sm font-semibold hover:bg-muted"
          >
            Continue Shopping
          </button>
            )
          </div>
        </div>
      </div>

      {selectedTransaction && (
  <ReviewSubmissionModal
    open={showReviewModal}
    onOpenChange={setShowReviewModal}
    seller={selectedTransaction.seller}
    transactionId={selectedTransaction.id}
    onSuccess={() => setShowReviewModal(false)}
  />
)}

{recentTransaction && (
  <button
    onClick={() => {
      setSelectedTransaction(recentTransaction);
      setShowReviewModal(true);
    }}
    className="w-full bg-burgundy text-white font-semibold py-2 px-4 rounded hover:bg-burgundy/90"
  >
    Rate Your Experience
  </button>
)}
<div className="space-y-2">
  <button
    onClick={() => navigate({ to: '/messages' })}
    className="border border-gray-300 rounded px-3 py-1 text-sm font-semibold hover:bg-muted"
  >
    View Messages
  </button>
  <button
    onClick={() => navigate({ to: '/browse' })}
    className="border border-gray-300 rounded px-3 py-1 text-sm font-semibold hover:bg-muted"
  >
    Continue Shopping
  </button>
</div>
  {recentTransaction && (
    <button
      onClick={() => {
        setSelectedTransaction(recentTransaction);
        setShowReviewModal(true);
      }}
      className="w-full bg-burgundy text-white font-semibold py-2 px-4 rounded hover:bg-burgundy/90"
    >
      Rate Your Experience
    </button>
  )}
            )}
          </div>
        </div>
      </div>

      {selectedTransaction && (
        <ReviewSubmissionModal
          open={showReviewModal}
          onOpenChange={setShowReviewModal}
          seller={selectedTransaction.seller}
          transactionId={selectedTransaction.id}
          onSuccess={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
}