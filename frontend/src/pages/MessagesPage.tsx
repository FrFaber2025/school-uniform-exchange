import { useState, useMemo, useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import { useGetMessagesForUser, useSendMessage, useGetListings, useGetTransactionsForUser, useUpdateTransactionStatus } from '../hooks/useQueries';
import { Send, Shield, Lock, MessageSquare, Package, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function MessagesPage() {
   const search = useSearch({ from: '/messages' });
  const preselectedListingId = (search as any)?.listingId;
  
  const { data: messages = [], isLoading } = useGetMessagesForUser();
  const { data: listings = [] } = useGetListings();
  const { data: transactions = [] } = useGetTransactionsForUser();
  const sendMessage = useSendMessage();
  const updateTransactionStatus = useUpdateTransactionStatus();

  const [selectedListingId, setSelectedListingId] = useState<string | null>(preselectedListingId || null);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    if (preselectedListingId) {
      setSelectedListingId(preselectedListingId);
    }
  }, [preselectedListingId]);

  const conversationsByListing = useMemo(() => {
    const grouped = new Map<string, Message[]>();
    messages.forEach((msg) => {
      const existing = grouped.get(msg.listingId) || [];
      grouped.set(msg.listingId, [...existing, msg]);
    });
    return grouped;
  }, [messages]);

  const selectedConversation = useMemo(() => {
    if (!selectedListingId) return [];
    return (conversationsByListing.get(selectedListingId) || []).sort(
      (a, b) => Number(a.timestamp) - Number(b.timestamp)
    );
  }, [conversationsByListing, selectedListingId]);

  const selectedListing = useMemo(() => {
    return listings.find((l) => l.id === selectedListingId);
  }, [listings, selectedListingId]);

  const selectedTransaction = useMemo(() => {
    if (!selectedListingId || !identity) return null;
    return transactions.find((t) => 
      t.listingId === selectedListingId && 
      (t.buyer.toString() === identity.getPrincipal().toString() || 
       t.seller.toString() === identity.getPrincipal().toString())
    );
  }, [transactions, selectedListingId, identity]);

  const otherParty = useMemo(() => {
    if (!identity || selectedConversation.length === 0) return null;
    const myPrincipal = identity.getPrincipal().toString();
    const firstMsg = selectedConversation[0];
    return firstMsg.sender.toString() === myPrincipal ? firstMsg.recipient : firstMsg.sender;
  }, [identity, selectedConversation]);

  const isSeller = useMemo(() => {
    if (!identity || !selectedListing) return false;
    return selectedListing.seller.toString() === identity.getPrincipal().toString();
  }, [identity, selectedListing]);

  const isBuyer = useMemo(() => {
    if (!identity || !selectedTransaction) return false;
    return selectedTransaction.buyer.toString() === identity.getPrincipal().toString();
  }, [identity, selectedTransaction]);

  if (!identity) {
    return (
      <div className="container flex min-h-[400px] items-center justify-center py-8">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">Login Required</h2>
          <p className="text-muted-foreground">Please log in to view messages</p>
        </div>
      </div>
    );
  }

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedListingId || !otherParty) {
      toast.error('Please enter a message');
      return;
    }

    const message: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender: identity.getPrincipal(),
      recipient: otherParty,
      listingId: selectedListingId,
      content: messageText,
      timestamp: BigInt(Date.now() * 1000000),
      isRead: false,
    };

    try {
      await sendMessage.mutateAsync(message);
      setMessageText('');
    } catch (error: any) {
      if (error.message?.includes('Messaging is only available after completed payment')) {
        toast.error('Messaging is only available after completing payment through the platform');
      } else {
        toast.error('Failed to send message');
      }
      console.error(error);
    }
  };

  const handleStartConversation = async () => {
    if (!messageText.trim() || !selectedListingId || !selectedListing) {
      toast.error('Please enter a message');
      return;
    }

    const message: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender: identity.getPrincipal(),
      recipient: selectedListing.seller,
      listingId: selectedListingId,
      content: messageText,
      timestamp: BigInt(Date.now() * 1000000),
      isRead: false,
    };

    try {
      await sendMessage.mutateAsync(message);
      setMessageText('');
      toast.success('Message sent!');
    } catch (error: any) {
      if (error.message?.includes('Messaging is only available after completed payment')) {
        toast.error('Messaging is only available after completing payment through the platform');
      } else {
        toast.error('Failed to send message');
      }
      console.error(error);
    }
  };

  const handleSendClick = () => {
    if (selectedConversation.length > 0) {
      handleSendMessage();
    } else {
      handleStartConversation();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const handleConfirmDispatch = async () => {
    if (!selectedTransaction) return;
    
    try {
      await updateTransactionStatus.mutateAsync({
        transactionId: selectedTransaction.id,
        status: TransactionStatus.dispatched,
        completedAt: selectedTransaction.completedAt || null,
        dispatchedAt: BigInt(Date.now() * 1000000),
        receivedAt: null,
        paymentReleasedAt: null,
      });
      toast.success('Item marked as dispatched!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to confirm dispatch');
      console.error(error);
    }
  };

  const handleConfirmReceipt = async () => {
    if (!selectedTransaction) return;
    
    try {
      await updateTransactionStatus.mutateAsync({
        transactionId: selectedTransaction.id,
        status: TransactionStatus.received,
        completedAt: selectedTransaction.completedAt || null,
        dispatchedAt: selectedTransaction.dispatchedAt || null,
        receivedAt: BigInt(Date.now() * 1000000),
        paymentReleasedAt: null,
      });
      toast.success('Receipt confirmed! Payment will be released to the seller.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to confirm receipt');
      console.error(error);
    }
  };

  const getStatusBadge = (status: TransactionStatus) => {
  switch (status) {
    case TransactionStatus.completed:
      return (
        <span className="inline-flex items-center bg-blue-100 text-blue-800 rounded px-2 py-1 text-xs font-semibold">
          <Clock className="mr-1 h-3 w-3" /> Payment Completed
        </span>
      );
    case TransactionStatus.dispatched:
      return (
        <span className="inline-flex items-center bg-purple-100 text-purple-800 rounded px-2 py-1 text-xs font-semibold">
          <Package className="mr-1 h-3 w-3" /> Item Dispatched
        </span>
      );
    case TransactionStatus.received:
      return (
        <span className="inline-flex items-center bg-green-100 text-green-800 rounded px-2 py-1 text-xs font-semibold">
          <CheckCircle className="mr-1 h-3 w-3" /> Item Received
        </span>
      );
    case TransactionStatus.paymentReleased:
      return (
        <span className="inline-flex items-center bg-emerald-100 text-emerald-800 rounded px-2 py-1 text-xs font-semibold">
          <CheckCircle className="mr-1 h-3 w-3" /> Payment Released
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center bg-gray-100 text-gray-800 rounded px-2 py-1 text-xs font-semibold">
          {status}
        </span>
      );
  }
};

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="h-96 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  return (</div>
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Messages</h1>
      </div>

      <div className="mb-6 flex items-start gap-4 rounded-lg border bg-muted/30 p-4">
        <img 
          src="/assets/generated/sue-mascot-new.png" 
          alt="Sue" 
          className="h-14 w-14 flex-shrink-0 rounded-full border-2 border-primary/20 object-cover"
        />
        <div className="flex-1">
          <h3 className="mb-1 font-semibold text-primary">Sue's Secure Messaging</h3>
          <p className="text-sm text-muted-foreground">
            Messaging is available after completing payment through our secure platform. This ensures safe transactions and protects both buyers and sellers!
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
  <div className="lg:col-span-1 border rounded-lg shadow bg-white">
    <div className="border-b px-4 py-2 font-semibold text-lg">Conversations</div>
    <div className="p-0 h-[500px] overflow-y-auto">
      {Array.from(conversationsByListing.keys()).map((listingId) => {
        const listing = listings.find((l) => l.id === listingId);
        const transaction = transactions.find((t) => t.listingId === listingId);

        return (
          <button
            key={listingId}
            onClick={() => setSelectedListingId(listingId)}
            className={`w-full border-b p-4 text-left transition-colors hover:bg-gray-100 ${
              selectedListingId === listingId ? 'bg-gray-100' : ''
            }`}
          >
            <p className="font-medium">{listing?.title || 'Unknown Listing'}</p>
            <p className="text-sm text-gray-500">
              {conversationsByListing.get(listingId)?.length || 0} messages
            </p>
            {transaction && (
              <div className="mt-2">
                {getStatusBadge(transaction.status)}
              </div>
            )}
          </button>
        );
      })}

      {conversationsByListing.size === 0 && (
        <div className="flex h-[500px] flex-col items-center justify-center p-6 text-center text-gray-500">
          <Lock className="mb-3 h-12 w-12 opacity-50" />
          <p className="font-medium">No conversations yet</p>
          <p className="mt-2 text-sm">Complete a purchase to start messaging</p>
        </div>
      )}
    </div>
  </div>
</div>
);
}