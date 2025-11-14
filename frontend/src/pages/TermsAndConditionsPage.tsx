import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, AlertCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useGetTermsAndConditions } from '../hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function TermsAndConditionsPage() {
  const navigate = useNavigate();
  const { data: terms, isLoading, isError, error, refetch } = useGetTermsAndConditions();

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-2/3 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              Unable to load Terms and Conditions. {error instanceof Error ? error.message : 'Please try again.'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="ml-4"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!terms) {
    return (
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Terms and Conditions are not currently available.</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="ml-4"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const effectiveDate = new Date(Number(terms.effectiveDate) / 1000000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="container py-8">
      <Button variant="ghost" onClick={() => navigate({ to: '/' })} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-start gap-4 rounded-lg border bg-primary/5 p-6">
          <FileText className="mt-1 h-8 w-8 flex-shrink-0 text-primary" />
          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold text-primary">Terms and Conditions</h1>
            <p className="text-muted-foreground">
              Please read these terms carefully before using the School Uniform Exchange platform.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Version {terms.version} • Effective Date: {effectiveDate}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>School Uniform Exchange (SUE) - Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">
              {terms.content}
            </div>

            <div className="mt-6 rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-sm font-medium">
                Version {terms.version} • Effective from {effectiveDate}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
