import { useState } from 'react';
import { useIsStripeConfigured, useSetStripeConfiguration, useIsCallerAdmin } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { CheckCircle, XCircle } from 'lucide-react';

export default function AdminPage() {
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: isConfigured, isLoading: configLoading } = useIsStripeConfigured();
  const setStripeConfig = useSetStripeConfiguration();

  const [secretKey, setSecretKey] = useState('');
  const [countries, setCountries] = useState('GB,US,CA');

  if (adminLoading || configLoading) {
    return (
      <div className="container py-8">
        <div className="h-96 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container flex min-h-[400px] items-center justify-center py-8">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">You do not have permission to access this page</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!secretKey.trim()) {
      toast.error('Please enter a Stripe secret key');
      return;
    }

    const countryList = countries
      .split(',')
      .map((c) => c.trim().toUpperCase())
      .filter((c) => c.length === 2);

    if (countryList.length === 0) {
      toast.error('Please enter at least one valid country code');
      return;
    }

    try {
      await setStripeConfig.mutateAsync({
        secretKey,
        allowedCountries: countryList,
      });
      toast.success('Stripe configuration saved successfully!');
      setSecretKey('');
    } catch (error) {
      toast.error('Failed to save Stripe configuration');
      console.error(error);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Stripe Payment Configuration</CardTitle>
            <CardDescription>Configure payment processing for the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              {isConfigured ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Configured
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="mr-1 h-3 w-3" />
                  Not Configured
                </Badge>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="secretKey">Stripe Secret Key</Label>
                <Input
                  id="secretKey"
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="sk_test_..."
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Your Stripe secret key (starts with sk_test_ or sk_live_)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="countries">Allowed Countries</Label>
                <Input
                  id="countries"
                  value={countries}
                  onChange={(e) => setCountries(e.target.value)}
                  placeholder="GB,US,CA"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated list of 2-letter country codes (e.g., GB,US,CA)
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={setStripeConfig.isPending}>
                {setStripeConfig.isPending ? 'Saving...' : 'Save Configuration'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Information</CardTitle>
            <CardDescription>Key metrics and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Payment Fees</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Listing Fee: £1.50 per listing</li>
                <li>• Commission: 5% on sales</li>
                <li>• Fees deducted after buyer confirms receipt</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Transaction Flow</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>1. Buyer pays through Stripe</li>
                <li>2. Seller confirms dispatch</li>
                <li>3. Buyer confirms receipt</li>
                <li>4. Payment released to seller (minus fees)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Allowed Conditions</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• New or As New</li>
                <li>• Excellent</li>
                <li>• Slightly Worn</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
