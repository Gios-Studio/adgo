/**
 * AdGo Platform - Advanced Advertising Technology Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build: 20251015_073830
 * Generated: 2025-10-15 04:38:35 UTC
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Shield, 
  CheckCircle, 
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  ArrowLeft,
  Receipt
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/router";

interface PaymentHistory {
  id: string;
  amount: number;
  method: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  campaign?: string;
}

interface BudgetAllocation {
  totalBudget: number;
  allocated: number;
  remaining: number;
  campaigns: Array<{
    name: string;
    allocated: number;
    spent: number;
  }>;
}

const PaymentProcessor = () => {
  const router = useRouter();
  
  // Payment form state
  const [amount, setAmount] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [mobileProvider, setMobileProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Data state
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [budgetData, setBudgetData] = useState<BudgetAllocation | null>(null);
  const [activeTab, setActiveTab] = useState("payment");

  // Load initial data
  useEffect(() => {
    loadPaymentHistory();
    loadBudgetData();
  }, []);

  const loadPaymentHistory = () => {
    // Mock payment history data
    const mockHistory: PaymentHistory[] = [
      {
        id: "1",
        amount: 250,
        method: "Credit Card",
        date: "2024-01-15T10:30:00Z",
        status: "completed",
        campaign: "Summer Collection 2024"
      },
      {
        id: "2", 
        amount: 500,
        method: "PayPal",
        date: "2024-01-10T14:22:00Z",
        status: "completed",
        campaign: "Black Friday Campaign"
      },
      {
        id: "3",
        amount: 150,
        method: "M-Pesa",
        date: "2024-01-08T09:15:00Z",
        status: "pending",
        campaign: "New Year Promotion"
      }
    ];
    setPaymentHistory(mockHistory);
  };

  const loadBudgetData = () => {
    // Mock budget allocation data
    const mockBudget: BudgetAllocation = {
      totalBudget: 5000,
      allocated: 3200,
      remaining: 1800,
      campaigns: [
        { name: "Summer Collection 2024", allocated: 1200, spent: 850 },
        { name: "Black Friday Campaign", allocated: 1500, spent: 1250 },
        { name: "New Year Promotion", allocated: 500, spent: 200 }
      ]
    };
    setBudgetData(mockBudget);
  };

  const handlePayment = async (type: string) => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    
    try {
      // In a real implementation, this would integrate with Stripe or other payment providers
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add to payment history
      const newPayment: PaymentHistory = {
        id: Date.now().toString(),
        amount: parseFloat(amount),
        method: type,
        date: new Date().toISOString(),
        status: "completed",
        campaign: campaignId || "General Budget"
      };
      
      setPaymentHistory(prev => [newPayment, ...prev]);
      
      // Update budget data
      if (budgetData) {
        setBudgetData({
          ...budgetData,
          totalBudget: budgetData.totalBudget + parseFloat(amount),
          remaining: budgetData.remaining + parseFloat(amount)
        });
      }
      
      toast.success(`Payment of $${amount} processed successfully via ${type}!`);
      
      // Reset form
      setAmount("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setCardName("");
      setPhoneNumber("");
      setMobileProvider("");
      setCampaignId("");
      
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-moss-50 to-moss-100">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/client-dashboard')}
              className="text-moss-700 hover:text-moss-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-moss-900">Payment Center</h1>
              <p className="text-moss-600">
                Secure payment processing and budget management
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm text-green-600 font-medium">
              256-bit SSL Encryption
            </span>
          </div>
        </div>

        {/* Budget Overview */}
        {budgetData && (
          <Card className="border-moss-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-moss-900 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Budget Overview
                  </CardTitle>
                  <CardDescription>Current advertising budget allocation</CardDescription>
                </div>
                <Badge variant="outline" className="text-moss-700 border-moss-300">
                  {Math.round((budgetData.allocated / budgetData.totalBudget) * 100)}% Allocated
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-moss-600">Total Budget</span>
                    <span className="font-semibold text-moss-900">${budgetData.totalBudget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-moss-600">Allocated</span>
                    <span className="font-semibold text-blue-600">${budgetData.allocated.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-moss-600">Remaining</span>
                    <span className="font-semibold text-green-600">${budgetData.remaining.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(budgetData.allocated / budgetData.totalBudget) * 100} 
                    className="mt-3"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-moss-900 mb-3">Active Campaigns</h4>
                  <div className="space-y-2">
                    {budgetData.campaigns.map((campaign, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-moss-50 rounded-md">
                        <span className="text-sm text-moss-800">{campaign.name}</span>
                        <div className="flex items-center space-x-3 text-xs">
                          <span className="text-moss-600">
                            ${campaign.spent} / ${campaign.allocated}
                          </span>
                          <div className="w-16 h-1 bg-moss-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-moss-500 transition-all duration-300"
                              style={{ width: `${(campaign.spent / campaign.allocated) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="payment" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Add Funds</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <Receipt className="h-4 w-4" />
              <span>Payment History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payment">
            <Card className="border-moss-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-moss-900">Add Funds to Your Account</CardTitle>
                <CardDescription>
                  Choose your preferred payment method to fund your advertising campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount">Amount (USD)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-lg"
                        min="1"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <Label htmlFor="campaign">Allocate to Campaign (Optional)</Label>
                      <Select value={campaignId} onValueChange={setCampaignId}>
                        <SelectTrigger>
                          <SelectValue placeholder="General budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">General Budget</SelectItem>
                          <SelectItem value="summer2024">Summer Collection 2024</SelectItem>
                          <SelectItem value="blackfriday">Black Friday Campaign</SelectItem>
                          <SelectItem value="newyear">New Year Promotion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card" className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Card</span>
                      </TabsTrigger>
                      <TabsTrigger value="mobile" className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4" />
                        <span>Mobile Money</span>
                      </TabsTrigger>
                      <TabsTrigger value="wallet" className="flex items-center space-x-2">
                        <Wallet className="h-4 w-4" />
                        <span>Digital Wallet</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            maxLength={19}
                          />
                        </div>
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            maxLength={4}
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={() => handlePayment("Credit Card")} 
                        className="w-full bg-moss-600 hover:bg-moss-700" 
                        disabled={loading || !amount || !cardNumber || !cardName}
                      >
                        {loading ? "Processing Payment..." : `Pay $${amount || "0"} with Card`}
                      </Button>
                    </TabsContent>

                    <TabsContent value="mobile" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="provider">Mobile Money Provider</Label>
                          <Select value={mobileProvider} onValueChange={setMobileProvider}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mpesa">M-Pesa (Safaricom)</SelectItem>
                              <SelectItem value="tigo">Tigo Pesa</SelectItem>
                              <SelectItem value="airtel">Airtel Money</SelectItem>
                              <SelectItem value="vodacom">Vodacom M-Pesa</SelectItem>
                              <SelectItem value="halopesa">HaloPesa</SelectItem>
                              <SelectItem value="ecocash">EcoCash</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="phoneNumber">Phone Number</Label>
                          <Input
                            id="phoneNumber"
                            placeholder="+255 XXX XXX XXX"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      <Button 
                        onClick={() => handlePayment(`${mobileProvider} Mobile Money`)} 
                        className="w-full bg-moss-600 hover:bg-moss-700"
                        disabled={loading || !amount || !mobileProvider || !phoneNumber}
                      >
                        {loading ? "Processing Payment..." : `Pay $${amount || "0"} with Mobile Money`}
                      </Button>
                    </TabsContent>

                    <TabsContent value="wallet" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button 
                          onClick={() => handlePayment("PayPal")} 
                          variant="outline" 
                          className="h-16 border-moss-200 hover:bg-moss-50"
                          disabled={loading || !amount}
                        >
                          <div className="text-center">
                            <Wallet className="h-6 w-6 mx-auto mb-1" />
                            <span>PayPal</span>
                          </div>
                        </Button>
                        <Button 
                          onClick={() => handlePayment("Apple Pay")} 
                          variant="outline" 
                          className="h-16 border-moss-200 hover:bg-moss-50"
                          disabled={loading || !amount}
                        >
                          <div className="text-center">
                            <Smartphone className="h-6 w-6 mx-auto mb-1" />
                            <span>Apple Pay</span>
                          </div>
                        </Button>
                        <Button 
                          onClick={() => handlePayment("Google Pay")} 
                          variant="outline" 
                          className="h-16 border-moss-200 hover:bg-moss-50"
                          disabled={loading || !amount}
                        >
                          <div className="text-center">
                            <CreditCard className="h-6 w-6 mx-auto mb-1" />
                            <span>Google Pay</span>
                          </div>
                        </Button>
                        <Button 
                          onClick={() => handlePayment("Cryptocurrency")} 
                          variant="outline" 
                          className="h-16 border-moss-200 hover:bg-moss-50"
                          disabled={loading || !amount}
                        >
                          <div className="text-center">
                            <TrendingUp className="h-6 w-6 mx-auto mb-1" />
                            <span>Crypto</span>
                          </div>
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="border-moss-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-moss-900">Payment History</CardTitle>
                <CardDescription>
                  Track all your payment transactions and budget allocations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {paymentHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <Receipt className="h-12 w-12 text-moss-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-moss-900 mb-2">No payments yet</h3>
                    <p className="text-moss-600">Your payment history will appear here once you make your first transaction.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentHistory.map((payment, index) => (
                      <div key={payment.id}>
                        <div className="flex items-center justify-between p-4 border border-moss-200 rounded-lg bg-moss-50/50">
                          <div className="flex items-center space-x-4">
                            {getStatusIcon(payment.status)}
                            <div>
                              <div className="font-medium text-moss-900">
                                ${payment.amount.toLocaleString()}
                              </div>
                              <div className="text-sm text-moss-600">
                                {payment.method} • {formatDate(payment.date)}
                              </div>
                              {payment.campaign && (
                                <div className="text-xs text-moss-500 mt-1">
                                  Campaign: {payment.campaign}
                                </div>
                              )}
                            </div>
                          </div>
                          <Badge 
                            variant={payment.status === 'completed' ? 'default' : 
                                   payment.status === 'pending' ? 'secondary' : 'destructive'}
                            className={
                              payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }
                          >
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </Badge>
                        </div>
                        {index < paymentHistory.length - 1 && <Separator className="bg-moss-200" />}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentProcessor;