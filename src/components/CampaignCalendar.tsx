import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, CalendarDays, Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";

const CampaignCalendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [campaignName, setCampaignName] = useState("");
  const [budget, setBudget] = useState("");

  const handleScheduleCampaign = () => {
    if (!startDate || !endDate || !campaignName) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success(`Campaign "${campaignName}" scheduled from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
    
    // Reset form
    setCampaignName("");
    setBudget("");
    setStartDate(new Date());
    setEndDate(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Calendar className="h-8 w-8 text-primary" />
          Campaign Calendar
        </h1>
        <p className="text-muted-foreground">
          Schedule and manage your advertising campaigns with precise timing
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Schedule New Campaign
            </CardTitle>
            <CardDescription>
              Set the timing and duration for your advertising campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input
                id="campaignName"
                placeholder="Enter campaign name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="budget">Budget (USD)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="Enter campaign budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <div className="mt-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholderText="Select start date"
                    dateFormat="MMM dd, yyyy"
                  />
                </div>
              </div>

              <div>
                <Label>End Date</Label>
                <div className="mt-2">
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => setEndDate(date)}
                    minDate={startDate || undefined}
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholderText="Select end date"
                    dateFormat="MMM dd, yyyy"
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleScheduleCampaign} className="w-full">
              <Clock className="mr-2 h-4 w-4" />
              Schedule Campaign
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Timeline</CardTitle>
            <CardDescription>
              Visual representation of your scheduled campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Holiday Sale Campaign</h4>
                  <span className="text-sm text-muted-foreground">Active</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Dec 1, 2024 - Dec 31, 2024
                </div>
                <div className="mt-2 bg-primary/20 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-3/4"></div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">New Year Launch</h4>
                  <span className="text-sm text-muted-foreground">Scheduled</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Jan 1, 2025 - Jan 15, 2025
                </div>
                <div className="mt-2 bg-accent/20 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full w-1/4"></div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Valentine&apos;s Day Promo</h4>
                  <span className="text-sm text-muted-foreground">Planned</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Feb 10, 2025 - Feb 16, 2025
                </div>
                <div className="mt-2 bg-muted rounded-full h-2">
                  <div className="bg-muted-foreground h-2 rounded-full w-0"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignCalendar;