import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Listing, Message, ShoppingItem, StripeConfiguration, PriceSuggestion, ItemType, Gender, Transaction, TransactionStatus, Review, TermsAndConditions, TermsAcceptance } from '../backend';
import { ExternalBlob } from '../backend';
import { Principal } from '@icp-sdk/core/principal';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useGetUserProfile(userPrincipal: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: ['userProfile', userPrincipal?.toString()],
    queryFn: async () => {
      if (!actor || !userPrincipal) return null;
      return actor.getUserProfile(userPrincipal);
    },
    enabled: !!actor && !actorFetching && !!userPrincipal,
    retry: false,
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Terms and Conditions - Public access, no authentication required
export function useGetTermsAndConditions() {
  const { actor, isFetching } = useActor();

  return useQuery<TermsAndConditions | null>({
    queryKey: ['termsAndConditions'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        const result = await actor.getTermsAndConditions();
        return result;
      } catch (error) {
        console.error('Error fetching terms and conditions:', error);
        throw error;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    retry: 5, // Retry up to 5 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
}

export function useGetTermsAcceptance() {
  const { actor, isFetching } = useActor();
  
  return useQuery<TermsAcceptance | null>({
    queryKey: ['termsAcceptance'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTermsAcceptance();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useHasAcceptedTermsAndConditions(version: string | null) {
  const { actor, isFetching } = useActor();
  
  return useQuery<boolean>({
    queryKey: ['hasAcceptedTerms', version],
    queryFn: async () => {
      if (!actor || !version) return false;
      return actor.hasAcceptedTermsAndConditions(version);
    },
    enabled: !!actor && !isFetching && !!identity && !!version,
  });
}

export function useAcceptTermsAndConditions() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (version: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.acceptTermsAndConditions(version);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['termsAcceptance'] });
      queryClient.invalidateQueries({ queryKey: ['hasAcceptedTerms'] });
    },
  });
}

export function useGetListings() {
  const { actor, isFetching } = useActor();

  return useQuery<Listing[]>({
    queryKey: ['listings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetListing(listingId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Listing | null>({
    queryKey: ['listing', listingId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getListing(listingId);
    },
    enabled: !!actor && !isFetching && !!listingId,
  });
}

export function useGetSchoolNames() {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['schoolNames'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSchoolNames();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (listing: Listing) => {
      if (!actor) throw new Error('Actor not available');
      await actor.createListing(listing);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['schoolNames'] });
    },
  });
}

export function useUpdateListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (listing: Listing) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateListing(listing);
    },
    onSuccess: (_, listing) => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['listing', listing.id] });
      queryClient.invalidateQueries({ queryKey: ['schoolNames'] });
    },
  });
}

export function useDeleteListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (listingId: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteListing(listingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
}

export function useGetPriceSuggestion(
  retailPrice: number,
  itemType: ItemType | null,
  schoolName: string,
  gender: Gender | null,
  schoolYear: string,
  enabled: boolean = true
) {
  const { actor, isFetching } = useActor();
  return useQuery<PriceSuggestion | null>({
    queryKey: ['priceSuggestion', retailPrice, itemType, schoolName, gender, schoolYear],
    queryFn: async () => {
      if (!actor || !itemType || !gender) return null;
      return actor.getPriceSuggestion(
        BigInt(Math.round(retailPrice * 100)),
        itemType,
        schoolName,
        gender,
        schoolYear
      );
    },
    enabled: !!actor && !isFetching && !!identity && enabled && !!itemType && !!gender && !!schoolName && !!schoolYear && retailPrice > 0,
    retry: false,
  });
}

export function useHasCompletedPaymentForListing(listingId: string) {
  const { actor, isFetching } = useActor();
 
  return useQuery<boolean>({
    queryKey: ['hasCompletedPayment', listingId],
    queryFn: async () => {
      if (!actor) return false;
      return actor.hasCompletedPaymentForListing(listingId);
    },
    enabled: !!actor && !isFetching && !!identity && !!listingId,
  });
}

export function useGetMessagesForUser() {
  const { actor, isFetching } = useActor();
 
  return useQuery<Message[]>({
    queryKey: ['messages'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMessagesForUser();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useGetMessagesForListing(listingId: string) {
  const { actor, isFetching } = useActor();
 
  return useQuery<Message[]>({
    queryKey: ['messages', listingId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMessagesForListing(listingId);
    },
    enabled: !!actor && !isFetching && !!identity && !!listingId,
    retry: false,
  });
}

export function useSendMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: Message) => {
      if (!actor) throw new Error('Actor not available');
      await actor.sendMessage(message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
}

export function useRecordTransaction() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transaction: Transaction) => {
      if (!actor) throw new Error('Actor not available');
      await actor.recordTransaction(transaction);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['hasCompletedPayment'] });
    },
  });
}

export function useUpdateTransactionStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      transactionId, 
      status, 
      completedAt = null,
      dispatchedAt = null,
      receivedAt = null,
      paymentReleasedAt = null
    }: { 
      transactionId: string; 
      status: TransactionStatus; 
      completedAt?: bigint | null;
      dispatchedAt?: bigint | null;
      receivedAt?: bigint | null;
      paymentReleasedAt?: bigint | null;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateTransactionStatus(transactionId, status, completedAt, dispatchedAt, receivedAt, paymentReleasedAt);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transaction'] });
      queryClient.invalidateQueries({ queryKey: ['hasCompletedPayment'] });
    },
  });
}

export function useGetTransaction(transactionId: string) {
  const { actor, isFetching } = useActor();
  
  return useQuery<Transaction | null>({
    queryKey: ['transaction', transactionId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTransaction(transactionId);
    },
    enabled: !!actor && !isFetching && !!identity && !!transactionId,
  });
}

export function useGetTransactionsForUser() {
  const { actor, isFetching } = useActor();
  
  return useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTransactionsForUser();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['stripeConfigured'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetStripeConfiguration() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: StripeConfiguration) => {
      if (!actor) throw new Error('Actor not available');
      await actor.setStripeConfiguration(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stripeConfigured'] });
    },
  });
}

export type CheckoutSession = {
  id: string;
  url: string;
};

export function useCreateCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (items: ShoppingItem[]): Promise<CheckoutSession> => {
      if (!actor) throw new Error('Actor not available');
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/payment-success`;
      const cancelUrl = `${baseUrl}/payment-failure`;
      const result = await actor.createCheckoutSession(items, successUrl, cancelUrl);
      const session = JSON.parse(result) as CheckoutSession;
      return session;
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

// Seller Ratings and Reviews
export function useGetReviewsForSeller(seller: Principal | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Review[]>({
    queryKey: ['reviews', seller?.toString()],
    queryFn: async () => {
      if (!actor || !seller) return [];
      return actor.getReviewsForSeller(seller);
    },
    enabled: !!actor && !isFetching && !!seller,
  });
}

export function useGetAverageRatingForSeller(seller: Principal | null) {
  const { actor, isFetching } = useActor();

  return useQuery<bigint | null>({
    queryKey: ['averageRating', seller?.toString()],
    queryFn: async () => {
      if (!actor || !seller) return null;
      return actor.getAverageRatingForSeller(seller);
    },
    enabled: !!actor && !isFetching && !!seller,
  });
}

export function useGetReviewCountForSeller(seller: Principal | null) {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['reviewCount', seller?.toString()],
    queryFn: async () => {
      if (!actor || !seller) return BigInt(0);
      return actor.getReviewCountForSeller(seller);
    },
    enabled: !!actor && !isFetching && !!seller,
  });
}

export function useGetRecentReviewsForSeller(seller: Principal | null, count: number = 5) {
  const { actor, isFetching } = useActor();

  return useQuery<Review[]>({
    queryKey: ['recentReviews', seller?.toString(), count],
    queryFn: async () => {
      if (!actor || !seller) return [];
      return actor.getRecentReviewsForSeller(seller, BigInt(count));
    },
    enabled: !!actor && !isFetching && !!seller,
  });
}

export function useSubmitReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review: Review) => {
      if (!actor) throw new Error('Actor not available');
      await actor.submitReview(review);
    },
    onSuccess: (_, review) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', review.seller.toString()] });
      queryClient.invalidateQueries({ queryKey: ['averageRating', review.seller.toString()] });
      queryClient.invalidateQueries({ queryKey: ['reviewCount', review.seller.toString()] });
      queryClient.invalidateQueries({ queryKey: ['recentReviews', review.seller.toString()] });
    },
  });
}

export function useCalculateCommissionAndFee(amount: number) {
  const { actor, isFetching } = useActor();

  return useQuery<{
    commission: bigint;
    listingFee: bigint;
    totalDeductions: bigint;
    sellerReceives: bigint;
  } | null>({
    queryKey: ['commissionAndFee', amount],
    queryFn: async () => {
      if (!actor) return null;
      return actor.calculateCommissionAndFee(BigInt(Math.round(amount * 100)));
    },
    enabled: !!actor && !isFetching && amount > 0,
  });
}
