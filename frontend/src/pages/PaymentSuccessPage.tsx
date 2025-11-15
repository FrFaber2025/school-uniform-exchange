import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useGetTransactionsForUser } from '../hooks/useQueries';
import ReviewSubmissionModal from '../components/ReviewSubmissionModal';
import type { Transaction } from '../backend';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { data: transactions = [] } = useGetTransactionsForUser();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Find the most recent completed transaction
  const recentTransaction = transactions
    .filter(t => t.status === 'completed')
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))[0];

  useEffect(() => {
    // Auto-open review modal after a short delay if there's a recent transaction
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
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Your payment has been processed successfully. The seller's contact details are now available, and you can message them directly.
          </p>
          <div className="space-y-2">
            <button
  onClick={() => navigate({ to: '/messages' })}
  className="border border-gray-300 rounded px-3 py-1 text-sm font-semibold hover:bg-muted"
>
  Back to Browse
</button>
              View Messages
            </Button>
            <button
  onClick={() => navigate({ to: '/browse' })}
  className="border border-gray-300 rounded px-3 py-1 text-sm font-semibold hover:bg-muted"
>
  Continue Shopping
</button>
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
          </div>
        </CardContent>
      </Card>

      {selectedTransaction && (
        <ReviewSubmissionModal
          open={showReviewModal}
          onOpenChange={setShowReviewModal}
          seller={selectedTransaction.seller}
          transactionId={selectedTransaction.id}
          onSuccess={() => {
            setShowReviewModal(false);
          }}
        />
      )}
    </div>
  );
}
