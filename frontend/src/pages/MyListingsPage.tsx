import { useNavigate } from '@tanstack/react-router';
import { useGetListings } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ListingCard from '../components/ListingCard';
import { PlusCircle } from 'lucide-react';
import { useMemo } from 'react';

export default function MyListingsPage() {
  const navigate = useNavigate();
    const { data: allListings = [], isLoading } = useGetListings();

  const myListings = useMemo(() => {
    if (!identity) return [];
    const principalStr = identity.getPrincipal().toString();
    return allListings.filter((listing) => listing.seller.toString() === principalStr);
  }, [allListings, identity]);

  const activeListings = useMemo(() => myListings.filter((l) => l.isActive), [myListings]);
  const inactiveListings = useMemo(() => myListings.filter((l) => !l.isActive), [myListings]);

  if (!identity) {
    return (
      <div className="container flex min-h-[400px] items-center justify-center py-8">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">Login Required</h2>
          <p className="text-muted-foreground">Please log in to view your listings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Button onClick={() => navigate({ to: '/create-listing' })}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Listing
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : myListings.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <p className="mb-2 text-lg font-medium">No listings yet</p>
          <p className="mb-6 text-muted-foreground">Create your first listing to start selling</p>
          <Button onClick={() => navigate({ to: '/create-listing' })}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Listing
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Active ({activeListings.length})</TabsTrigger>
            <TabsTrigger value="inactive">Inactive ({inactiveListings.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-6">
            {activeListings.length === 0 ? (
              <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
                No active listings
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {activeListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="inactive" className="mt-6">
            {inactiveListings.length === 0 ? (
              <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
                No inactive listings
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {inactiveListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
