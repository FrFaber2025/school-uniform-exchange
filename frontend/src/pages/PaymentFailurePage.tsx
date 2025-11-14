import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

export default function PaymentFailurePage() {
  const navigate = useNavigate();

  return (
    <div className="container flex min-h-[600px] items-center justify-center py-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your payment was not completed. No charges have been made to your account.
          </p>
          <div className="flex flex-col gap-3">
            <button
  onClick={() => navigate({ to: '/browse' })}
  className="border border-gray-300 rounded px-3 py-1 text-sm font-semibold hover:bg-muted"
>
  Back to Browse
</button>
            <button
  onClick={() => window.history.back()}
  className="border border-gray-300 rounded px-3 py-1 text-sm font-semibold hover:bg-muted"
>
  Try Again
</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
