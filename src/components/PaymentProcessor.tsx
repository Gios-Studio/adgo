import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Smartphone, Wallet } from "lucide-react";
import { toast } from "sonner";

const PaymentProcessor = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [mobileProvider, setMobileProvider] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (type: string) => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      toast.success(`Payment of $${amount} processed successfully via ${type}!`);
      
      // Reset form
      setAmount("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setPhoneNumber("");
      setMobileProvider("");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Payment Processing</h1>
        <p className="text-muted-foreground">
          Secure payment processing with multiple payment options
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Payment</CardTitle>
          <CardDescription>
            Choose your preferred payment method to fund your advertising campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg"
              />
            </div>

            <Tabs defaultValue="card" className="w-full">
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => handlePayment("Credit Card")} 
                  className="w-full" 
                  disabled={loading || !amount || !cardNumber}
                >
                  {loading ? "Processing..." : "Pay with Card"}
                </Button>
              </TabsContent>

              <TabsContent value="mobile" className="space-y-4">
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
                <Button 
                  onClick={() => handlePayment(`${mobileProvider} Mobile Money`)} 
                  className="w-full"
                  disabled={loading || !amount || !mobileProvider || !phoneNumber}
                >
                  {loading ? "Processing..." : "Pay with Mobile Money"}
                </Button>
              </TabsContent>

              <TabsContent value="wallet" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={() => handlePayment("PayPal")} 
                    variant="outline" 
                    className="h-12"
                    disabled={loading || !amount}
                  >
                    PayPal
                  </Button>
                  <Button 
                    onClick={() => handlePayment("Apple Pay")} 
                    variant="outline" 
                    className="h-12"
                    disabled={loading || !amount}
                  >
                    Apple Pay
                  </Button>
                  <Button 
                    onClick={() => handlePayment("Google Pay")} 
                    variant="outline" 
                    className="h-12"
                    disabled={loading || !amount}
                  >
                    Google Pay
                  </Button>
                  <Button 
                    onClick={() => handlePayment("Cryptocurrency")} 
                    variant="outline" 
                    className="h-12"
                    disabled={loading || !amount}
                  >
                    Crypto
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentProcessor;