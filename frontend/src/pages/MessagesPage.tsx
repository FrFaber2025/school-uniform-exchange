import { useState, useMemo, useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import { useGetMessagesForUser, useSendMessage, useGetListings, useGetTransactionsForUser, useUpdateTransactionStatus } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
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
        return <Badge variant="outline" className="bg-blue-100 text-blue-800"><Clock className="mr-1 h-3 w-3" />Payment Completed</Badge>;
      case TransactionStatus.dispatched:
        return <Badge variant="outline" className="bg-purple-100 text-purple-800"><Package className="mr-1 h-3 w-3" />Item Dispatched</Badge>;
      case TransactionStatus.received:
        return <Badge variant="outline" className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />Item Received</Badge>;
      case TransactionStatus.paymentReleased:
        return <Badge variant="outline" className="bg-success-100 text-success-800"><CheckCircle className="mr-1 h-3 w-3" />Payment Released</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="h-96 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  return (
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
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {Array.from(conversationsByListing.keys()).map((listingId) => {
                const listing = listings.find((l) => l.id === listingId);
                const transaction = transactions.find((t) => t.listingId === listingId);
                return (
                  <button
                    key={listingId}
                    onClick={() => setSelectedListingId(listingId)}
                    className={`w-full border-b p-4 text-left transition-colors hover:bg-muted ${
                      selectedListingId === listingId ? 'bg-muted' : ''
                    }`}
                  >
                    <p className="font-medium">{listing?.title || 'Unknown Listing'}</p>
                    <p className="text-sm text-muted-foreground">
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
                <div className="flex h-[500px] flex-col items-center justify-center p-6 text-center text-muted-foreground">
                  <Lock className="mb-3 h-12 w-12 opacity-50" />
                  <p className="font-medium">No conversations yet</p>
                  <p className="mt-2 text-sm">Complete a purchase to start messaging</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedListing?.title || 'Select a conversation'}</CardTitle>
              {selectedTransaction && (
                <div>{getStatusBadge(selectedTransaction.status)}</div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedListingId ? (
              <div className="space-y-4">
                {selectedTransaction && selectedTransaction.status === TransactionStatus.completed && isSeller && (
                  <Alert className="border-primary/50 bg-primary/5">
                    <Package className="h-4 w-4" />
                    <AlertTitle>Ready to Dispatch?</AlertTitle>
                    <AlertDescription className="mt-2">
                      <p className="mb-3 text-sm">Once you've sent the item to the buyer, confirm dispatch below. The buyer will then be able to confirm receipt, which will trigger payment release.</p>
                      <Button onClick={handleConfirmDispatch} disabled={updateTransactionStatus.isPending} size="sm">
                        {updateTransactionStatus.isPending ? 'Confirming...' : 'Confirm Item Dispatched'}
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {selectedTransaction && selectedTransaction.status === TransactionStatus.dispatched && isBuyer && (
                  <Alert className="border-success/50 bg-success/5">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Item Dispatched</AlertTitle>
                    <AlertDescription className="mt-2">
                      <p className="mb-3 text-sm">The seller has confirmed dispatch. Once you receive the item, please confirm receipt below. This will release payment to the seller (minus the £1.50 listing fee and 5% commission).</p>
                      <Button onClick={handleConfirmReceipt} disabled={updateTransactionStatus.isPending} size="sm" className="bg-success hover:bg-success/90">
                        {updateTransactionStatus.isPending ? 'Confirming...' : 'Confirm Item Received'}
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {selectedTransaction && selectedTransaction.status === TransactionStatus.received && (
                  <Alert className="border-success/50 bg-success/5">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Transaction Complete</AlertTitle>
                    <AlertDescription>
                      The buyer has confirmed receipt. {isSeller ? 'Payment has been released to you (minus £1.50 listing fee and 5% commission).' : 'Thank you for your purchase!'}
                    </AlertDescription>
                  </Alert>
                )}

                {selectedTransaction && selectedTransaction.status === TransactionStatus.paymentReleased && (
                  <Alert className="border-success/50 bg-success/5">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Payment Released</AlertTitle>
                    <AlertDescription>
                      {isSeller ? 'Payment has been successfully released to you.' : 'Transaction completed successfully.'}
                    </AlertDescription>
                  </Alert>
                )}

                {!selectedTransaction && (
                  <Alert className="border-warning/50 bg-warning/5">
                    <Shield className="h-4 w-4" />
                    <AlertTitle>Payment Required</AlertTitle>
                    <AlertDescription>
                      Messaging is only available after completing payment through our secure platform. This protects both buyers and sellers and ensures commission is collected.
                    </AlertDescription>
                  </Alert>
                )}

                <ScrollArea className="h-[400px] rounded-lg border p-4">
                  {selectedConversation.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                      {selectedTransaction ? (
                        <>
                          <MessageSquare className="mb-3 h-12 w-12 opacity-50" />
                          <p>Start the conversation</p>
                        </>
                      ) : (
                        <>
                          <Lock className="mb-3 h-12 w-12 opacity-50" />
                          <p className="font-medium">Complete payment to unlock messaging</p>
                          <p className="mt-2 text-sm">All transactions must go through our secure platform</p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedConversation.map((msg) => {
                        const isMe = msg.sender.toString() === identity.getPrincipal().toString();
                        return (
                          <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{isMe ? 'You' : 'Them'}</AvatarFallback>
                            </Avatar>
                            <div className={`max-w-[70%] rounded-lg p-3 ${isMe ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                              <p className="text-sm">{msg.content}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>

                <div className="flex gap-2">
                  <Textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={selectedTransaction ? "Type your message..." : "Complete payment to unlock messaging..."}
                    rows={2}
                    onKeyDown={handleKeyDown}
                    disabled={!selectedTransaction}
                  />
                  <Button
                    onClick={handleSendClick}
                    disabled={sendMessage.isPending || !selectedTransaction}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex h-[500px] items-center justify-center text-muted-foreground">
                Select a conversation to view messages
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
