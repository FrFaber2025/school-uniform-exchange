import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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

        <Alert className="mb-6 border-primary/30 bg-primary/5">
          <Shield className="h-4 w-4" />
          <AlertTitle>Important Information</AlertTitle>
          <AlertDescription>
            Please read this policy carefully before making a purchase. Returns and refunds are handled directly between buyers and sellers.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Buyer-Seller Negotiation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                All returns and refunds must be negotiated directly between the buyer and seller. The School Uniform Exchange platform facilitates the initial transaction but does not mediate disputes or handle returns.
              </p>
              <p className="text-muted-foreground">
                We encourage both parties to communicate clearly and reach a mutually agreeable solution if there are any issues with the item.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Platform Commission Refund
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                If both the buyer and seller agree to cancel the transaction, the School Uniform Exchange will refund its 5% commission to the seller.
              </p>
              <p className="text-muted-foreground">
                To request a commission refund, both parties must contact our support team with confirmation that they have mutually agreed to cancel the transaction.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Administration Fee Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                The £1.50 administration fee is <strong>non-refundable</strong> and will be retained by the platform even in cases of agreed transaction cancellation.
              </p>
              <p className="text-muted-foreground">
                This fee covers the costs of listing processing, payment handling, and platform maintenance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices for Buyers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Carefully review all item photos and descriptions before purchasing</li>
                <li>Check the seller's ratings and reviews</li>
                <li>Ask questions through the messaging system before completing payment</li>
                <li>Inspect items promptly upon receipt</li>
                <li>Contact the seller immediately if there are any issues</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices for Sellers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Provide accurate and detailed item descriptions</li>
                <li>Upload clear, well-lit photos showing the item's condition</li>
                <li>Ensure items match the described condition</li>
                <li>Wash or dry-clean items before listing</li>
                <li>Package items securely for shipping</li>
                <li>Respond promptly to buyer inquiries</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border bg-muted/30 p-4">
                <ul className="space-y-2 text-sm">
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
            </CardContent>
          </Card>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Need Help?</AlertTitle>
            <AlertDescription>
              If you have questions about our returns and refunds policy, please contact our support team. We're here to help facilitate communication between buyers and sellers.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
