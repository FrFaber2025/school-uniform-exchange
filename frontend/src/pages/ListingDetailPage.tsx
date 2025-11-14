import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetListing, useDeleteListing, useGetTransactionsForUser, useGetUserProfile, useCreateCheckoutSession, useGetAverageRatingForSeller, useGetReviewCountForSeller, useGetRecentReviewsForSeller, useGetTermsAndConditions, useHasAcceptedTermsAndConditions, useAcceptTermsAndConditions } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MessageSquare, Edit, Trash2, ArrowLeft, ShoppingCart, Shield, Mail, MapPin, Package, CheckCircle, Clock } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import type { Condition, ItemType, Gender, ShoppingItem } from '../backend';
import { TransactionStatus } from '../backend';
import SellerRating from '../components/SellerRating';
import ReviewsList from '../components/ReviewsList';
import TermsAcceptanceCheckbox from '../components/TermsAcceptanceCheckbox';

const conditionLabels: Record<Condition, string> = {
  newOrAsNew: 'New or As New',
  excellent: 'Excellent',
  slightlyWorn: 'Slightly Worn',
};

const conditionColors: Record<Condition, string> = {
  newOrAsNew: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  excellent: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  slightlyWorn: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
};

function getItemTypeLabel(itemType: ItemType): string {
  switch (itemType.__kind__) {
    case 'trousers':
      return 'Trousers';
    case 'jackets':
      return 'Jackets';
    case 'blazers':
      return 'Blazers';
    case 'shirts':
      return 'Shirts';
    case 'skirts':
      return 'Skirts';
    case 'ties':
      return 'Ties';
    case 'sportsShorts':
      return 'Sports Shorts';
    case 'sportsShirts':
      return 'Sports Shirts';
    case 'coat':
      return 'Coat';
    case 'jumper':
      return 'Jumper';
    case 'shoes':
      return 'Shoes';
    case 'other':
      return itemType.other;
    default:
      return 'Unknown';
  }
}

function getGenderLabel(gender: Gender): string {
  return gender === 'boys' ? 'Boys' : 'Girls';
}

export default function ListingDetailPage() {
  const { listingId } = useParams({ from: '/listing/$listingId' });
  const navigate = useNavigate();
  const { data: listing, isLoading } = useGetListing(listingId);
  const { identity } = useInternetIdentity();
  const deleteListing = useDeleteListing();
  const { data: transactions = [] } = useGetTransactionsForUser();
  const { data: sellerProfile } = useGetUserProfile(listing?.seller || null);
  const { data: averageRating } = useGetAverageRatingForSeller(listing?.seller || null);
  const { data: reviewCount = BigInt(0) } = useGetReviewCountForSeller(listing?.seller || null);
  const { data: recentReviews = [] } = useGetRecentReviewsForSeller(listing?.seller || null, 3);
  const { data: terms } = useGetTermsAndConditions();
  const { data: hasAccepted } = useHasAcceptedTermsAndConditions(terms?.version || null);
  const acceptTerms = useAcceptTermsAndConditions();
  const createCheckoutSession = useCreateCheckoutSession();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const isOwner = listing && identity && listing.seller.toString() === identity.getPrincipal().toString();

  const transaction = useMemo(() => {
    if (!identity || !listing) return null;
    return transactions.find((t) => 
      t.listingId === listingId && 
      (t.buyer.toString() === identity.getPrincipal().toString() || 
       t.seller.toString() === identity.getPrincipal().toString())
    );
  }, [transactions, listingId, identity, listing]);

  const hasCompletedPayment = transaction && transaction.status !== TransactionStatus.pending && transaction.status !== TransactionStatus.failed;

  useEffect(() => {
    if (listing?.photos) {
      const urls = listing.photos.map((photo) => photo.getDirectURL());
      setImageUrls(urls);
    }
  }, [listing?.photos]);

  // Set terms accepted if already accepted
  useEffect(() => {
    if (hasAccepted) {
      setTermsAccepted(true);
    }
  }, [hasAccepted]);

  const handleDelete = async () => {
    try {
      await deleteListing.mutateAsync(listingId);
      toast.success('Listing deleted successfully');
      navigate({ to: '/my-listings' });
    } catch (error) {
      toast.error('Failed to delete listing');
      console.error(error);
    }
  };

  const handleBuyNow = async () => {
    if (!listing) return;

    // Check if terms need to be accepted
    if (!hasAccepted && terms) {
      setShowTermsDialog(true);
      return;
    }

    await proceedWithPayment();
  };

  const proceedWithPayment = async () => {
    if (!listing) return;

    setIsProcessingPayment(true);
    try {
      // Accept terms if needed
      if (!hasAccepted && termsAccepted && terms) {
        await acceptTerms.mutateAsync(terms.version);
      }

      const items: ShoppingItem[] = [
        {
          productName: listing.title,
          productDescription: `${listing.schoolNames.join(', ')} - ${getItemTypeLabel(listing.itemType)}`,
          priceInCents: listing.price,
          quantity: BigInt(1),
          currency: 'gbp',
        },
      ];

      const session = await createCheckoutSession.mutateAsync(items);
      window.location.href = session.url;
    } catch (error: any) {
      setIsProcessingPayment(false);
      if (error.message?.includes('Stripe needs to be first configured')) {
        toast.error('Payment system is not yet configured. Please contact the administrator.');
      } else if (error.message?.includes('Terms and Conditions')) {
        toast.error('You must accept the current Terms and Conditions before completing a purchase');
      } else {
        toast.error('Failed to initiate payment. Please try again.');
      }
      console.error(error);
    }
  };

  const handleContactSeller = () => {
    navigate({ to: '/messages', search: { listingId } });
  };

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.completed:
        return <Badge variant="outline" className="bg-blue-100 text-blue-800"><Clock className="mr-1 h-3 w-3" />Payment Completed</Badge>;
      case TransactionStatus.dispatched:
        return <Badge variant="outline" className="bg-purple-100 text-purple-800"><Package className="mr-1 h-3 w-3" />Item Dispatched</Badge>;
      case TransactionStatus.received:
        return <Badge variant="outline" className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />Item Received</Badge>;
      case TransactionStatus.paymentReleased:
        return <Badge variant="outline" className="bg-success-100 text-success-800"><CheckCircle className="mr-1 h-3 w-3" />Payment Released</Badge>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-96 rounded-lg bg-muted" />
          <div className="h-8 w-2/3 rounded bg-muted" />
          <div className="h-4 w-1/2 rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container flex min-h-[400px] items-center justify-center py-8">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">Listing not found</h2>
          <p className="mb-4 text-muted-foreground">This listing may have been removed or doesn't exist</p>
          <Button onClick={() => navigate({ to: '/browse' })}>Browse Listings</Button>
        </div>
      </div>
    );
  }

  const genderLabel = getGenderLabel(listing.gender);
  const schoolsDisplay = listing.schoolNames.join(', ');

  // Build size measurements display
  const sizeInfo: string[] = [];
  if (listing.sizeMeasurements.waistSize !== undefined) {
    sizeInfo.push(`Waist: ${Number(listing.sizeMeasurements.waistSize)}"`);
  }
  if (listing.sizeMeasurements.insideLeg !== undefined) {
    sizeInfo.push(`Inside Leg: ${Number(listing.sizeMeasurements.insideLeg)}"`);
  }
  if (listing.sizeMeasurements.chestSize !== undefined) {
    sizeInfo.push(`Chest: ${Number(listing.sizeMeasurements.chestSize)}"`);
  }
  if (listing.sizeMeasurements.collarSize !== undefined) {
    sizeInfo.push(`Collar: ${Number(listing.sizeMeasurements.collarSize)}"`);
  }
  if (listing.sizeMeasurements.sleeveLength !== undefined) {
    sizeInfo.push(`Sleeve: ${Number(listing.sizeMeasurements.sleeveLength)}"`);
  }
  if (listing.sizeMeasurements.coatJumperSize !== undefined) {
    sizeInfo.push(`Size: ${listing.sizeMeasurements.coatJumperSize}`);
  }
  if (listing.sizeMeasurements.shoeSize !== undefined) {
    sizeInfo.push(`UK Shoe Size: ${Number(listing.sizeMeasurements.shoeSize)}`);
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" onClick={() => navigate({ to: '/browse' })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Browse
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          {imageUrls.length > 0 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {imageUrls.map((url, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                      <img src={url} alt={`${listing.title} - Image ${index + 1}`} className="h-full w-full object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {imageUrls.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          ) : (
            <div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
              <span className="text-muted-foreground">No images available</span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{listing.title}</h1>
            <p className="text-3xl font-bold text-primary">£{Number(listing.price) / 100}</p>
          </div>

          {transaction && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Transaction Status:</span>
              {getStatusBadge(transaction.status)}
            </div>
          )}

          {!isOwner && sellerProfile && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">Seller Information</h3>
                  <SellerRating 
                    rating={averageRating ? Number(averageRating) : 0} 
                    reviewCount={Number(reviewCount)} 
                    size="md"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Sold by {sellerProfile.name}</p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">School{listing.schoolNames.length > 1 ? 's' : ''}:</span> {schoolsDisplay}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{getItemTypeLabel(listing.itemType)}</Badge>
              <Badge variant="outline">{genderLabel}</Badge>
              <Badge variant="outline">{listing.schoolYear}</Badge>
              <Badge className={conditionColors[listing.condition]}>{conditionLabels[listing.condition]}</Badge>
            </div>
            {sizeInfo.length > 0 && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Size:</span> {sizeInfo.join(', ')}
              </div>
            )}
          </div>

          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-2 font-semibold">Description</h3>
              <p className="whitespace-pre-wrap text-muted-foreground">{listing.description}</p>
            </CardContent>
          </Card>

          {!isOwner && !hasCompletedPayment && (
            <Alert className="border-primary/50 bg-primary/5">
              <Shield className="h-4 w-4" />
              <AlertTitle>Secure Platform Payment Required</AlertTitle>
              <AlertDescription>
                All transactions must be completed through our secure payment system. Seller contact details will be available after payment is confirmed.
              </AlertDescription>
            </Alert>
          )}

          {!isOwner && hasCompletedPayment && sellerProfile && (
            <Card className="border-success/50 bg-success/5">
              <CardContent className="pt-6">
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-success">
                  <Shield className="h-5 w-5" />
                  Payment Confirmed - Seller Contact Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">Email:</span> {sellerProfile.email}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">Address:</span> {sellerProfile.address}
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Please arrange delivery directly with the seller. You can also use the messaging system to communicate.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {isOwner ? (
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => navigate({ to: '/create-listing', search: { edit: listingId } })}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Listing
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="flex-1">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Listing?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your listing.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <div className="space-y-3">
              {!hasCompletedPayment ? (
                <>
                  <Button 
                    size="lg" 
                    className="w-full bg-success hover:bg-success/90" 
                    onClick={handleBuyNow}
                    disabled={!identity || isProcessingPayment}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {isProcessingPayment ? 'Processing...' : 'Buy Now - Secure Payment'}
                  </Button>
                  {!identity && (
                    <p className="text-center text-sm text-muted-foreground">Please log in to purchase this item</p>
                  )}
                </>
              ) : (
                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={handleContactSeller}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Message Seller
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {!isOwner && recentReviews.length > 0 && (
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Recent Seller Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewsList reviews={recentReviews} maxReviews={3} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Terms and Conditions Dialog */}
      <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Accept Terms and Conditions</DialogTitle>
            <DialogDescription>
              You must accept the Terms and Conditions before completing your purchase.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <TermsAcceptanceCheckbox
              checked={termsAccepted}
              onCheckedChange={setTermsAccepted}
              context="purchase"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTermsDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                setShowTermsDialog(false);
                await proceedWithPayment();
              }}
              disabled={!termsAccepted || acceptTerms.isPending}
            >
              {acceptTerms.isPending ? 'Processing...' : 'Continue to Payment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
