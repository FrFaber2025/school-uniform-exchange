import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, Package, AlertTriangle, Truck, Shield } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function PostagePackingPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-8">
      <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-start gap-4 rounded-lg border bg-primary/5 p-6">
          <Package className="mt-1 h-8 w-8 flex-shrink-0 text-primary" />
          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold text-primary">Postage and Packing Policy</h1>
            <p className="text-muted-foreground">
              Important information about delivery responsibilities and arrangements for School Uniform Exchange transactions.
            </p>
          </div>
        </div>

        <Alert className="mb-6 border-destructive/50 bg-destructive/5">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-destructive">Important Notice</AlertTitle>
          <AlertDescription>
            Sellers are fully responsible for arranging and paying for delivery. The platform is not responsible for delivery issues, lost items, or postage refunds.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-6 w-6 text-primary" />
                Seller Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="mb-2 font-semibold text-primary">1. Arranging Delivery</h4>
                  <p className="text-sm text-muted-foreground">
                    Sellers are fully responsible for arranging delivery of sold items to buyers. This includes selecting a delivery service, packaging items securely, and ensuring items are dispatched promptly after payment confirmation.
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="mb-2 font-semibold text-primary">2. Paying for Delivery</h4>
                  <p className="text-sm text-muted-foreground">
                    All delivery costs must be paid by the seller. Sellers should include estimated delivery charges in their item's asking price. Do not request additional payment from buyers for postage after the sale is completed.
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="mb-2 font-semibold text-primary">3. Pricing Guidance</h4>
                  <p className="text-sm text-muted-foreground">
                    When setting your item price, factor in the cost of postage and packing materials. Consider the weight and size of the item and research delivery costs before listing. This ensures you receive fair value while keeping prices competitive for buyers.
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="mb-2 font-semibold text-primary">4. Recommended Delivery Methods</h4>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    <li>Royal Mail 2nd Class for standard items</li>
                    <li>Royal Mail 1st Class for urgent deliveries</li>
                    <li>Tracked services for valuable items (blazers, multiple items)</li>
                    <li>Consider insurance for high-value items</li>
                  </ul>
                </div>

                <div className="rounded-lg border bg-muted/30 p-4">
                  <h4 className="mb-2 font-semibold text-primary">5. Dispatch Confirmation</h4>
                  <p className="text-sm text-muted-foreground">
                    After dispatching an item, confirm dispatch through the platform's messaging system. Provide tracking information to the buyer when available. This helps build trust and allows buyers to track their purchase.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Platform Limitations and Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-muted">
                <AlertDescription className="text-sm">
                  <strong>Platform Non-Involvement:</strong> The School Uniform Exchange platform is not responsible for delivery arrangements between buyers and sellers. We provide a marketplace for connecting users but do not handle physical goods or delivery logistics.
                </AlertDescription>
              </Alert>

              <Alert className="border-muted">
                <AlertDescription className="text-sm">
                  <strong>No Delivery Guarantees:</strong> SUE does not guarantee delivery times, item condition upon arrival, or successful delivery. Sellers and buyers must work together to resolve any delivery issues.
                </AlertDescription>
              </Alert>

              <Alert className="border-muted">
                <AlertDescription className="text-sm">
                  <strong>Lost or Damaged Items:</strong> The platform will not refund postage costs or provide indemnification to buyers for items lost or damaged during delivery. Sellers are advised to use tracked and insured delivery services for valuable items.
                </AlertDescription>
              </Alert>

              <Alert className="border-muted">
                <AlertDescription className="text-sm">
                  <strong>Delivery Disputes:</strong> Any disputes regarding delivery, including lost items, damaged items, or delivery delays, must be resolved directly between the buyer and seller. The platform does not mediate delivery disputes.
                </AlertDescription>
              </Alert>

              <Alert className="border-muted">
                <AlertDescription className="text-sm">
                  <strong>No Postage Refunds:</strong> The platform does not refund postage costs under any circumstances. If a transaction is cancelled by mutual agreement, only the platform's 5% commission may be refunded; the £1.50 administration fee and any postage costs are non-refundable.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Buyer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <strong>Understanding Delivery Costs:</strong> When purchasing items, be aware that delivery costs are included in the asking price. Sellers have factored postage into their pricing.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Communication:</strong> After payment, you can message the seller directly to discuss delivery arrangements and expected delivery times.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Receipt Confirmation:</strong> Once you receive your item, please confirm receipt through the platform. This triggers payment release to the seller.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Issues with Delivery:</strong> If items are lost or damaged during delivery, contact the seller immediately to resolve the issue. The platform cannot provide refunds for delivery problems.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <img 
                  src="/assets/generated/sue-mascot-new.png" 
                  alt="Sue" 
                  className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
                />
                <div>
                  <h4 className="mb-2 font-semibold text-primary">Sue's Delivery Tips</h4>
                  <p className="text-sm text-muted-foreground">
                    For more detailed guidance on packaging and shipping your items, visit the Seller Tips & Guides section. I'll show you how to package items professionally and choose the best delivery methods!
                  </p>
                  <Button 
                    variant="link" 
                    className="mt-2 h-auto p-0 text-primary"
                    onClick={() => navigate({ to: '/seller-tips' })}
                  >
                    View Seller Tips & Guides →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
