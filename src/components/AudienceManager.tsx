import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Users, Plus, Target, Eye, TrendingUp, MapPin, Calendar, Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface Audience {
  id: string;
  name: string;
  description: string;
  size_estimate: number;
  demographics: {
    ageRange: string;
    gender: string;
    income: string;
    education: string;
    location: string[];
  };
  interests: string[];
  behaviors: string[];
  created_at: string;
}

const audienceData: Audience[] = [
  {
    id: '1',
    name: 'Tech Enthusiasts',
    description: 'Early adopters interested in latest technology trends',
    size_estimate: 125000,
    demographics: {
      ageRange: '25-40',
      gender: 'Mixed (60% Male, 40% Female)',
      income: '$50K-$100K',
      education: 'College+',
      location: ['California', 'New York', 'Texas', 'Washington'],
    },
    interests: ['Technology', 'Gadgets', 'Innovation', 'AI', 'Software'],
    behaviors: ['Online shopping', 'Social media active', 'Research before buying'],
    created_at: '2024-01-10',
  },
  {
    id: '2',
    name: 'Fitness Enthusiasts',
    description: 'Health-conscious individuals focused on fitness and wellness',
    size_estimate: 89000,
    demographics: {
      ageRange: '22-45',
      gender: 'Mixed (45% Male, 55% Female)',
      income: '$40K-$80K',
      education: 'High School+',
      location: ['California', 'Florida', 'Colorado', 'Arizona'],
    },
    interests: ['Fitness', 'Nutrition', 'Wellness', 'Sports', 'Health'],
    behaviors: ['Gym membership', 'Health app usage', 'Supplement purchases'],
    created_at: '2024-01-08',
  },
  {
    id: '3',
    name: 'Young Professionals',
    description: 'Career-focused millennials in urban areas',
    size_estimate: 156000,
    demographics: {
      ageRange: '24-35',
      gender: 'Mixed (52% Female, 48% Male)',
      income: '$45K-$90K',
      education: 'College+',
      location: ['New York', 'California', 'Illinois', 'Massachusetts'],
    },
    interests: ['Career development', 'Finance', 'Travel', 'Food', 'Technology'],
    behaviors: ['LinkedIn active', 'Coffee shop visits', 'Online learning'],
    created_at: '2024-01-05',
  },
];

const genderData = [
  { name: 'Female', value: 52, color: 'hsl(var(--primary))' },
  { name: 'Male', value: 48, color: 'hsl(var(--accent))' },
];

const ageData = [
  { ageGroup: '18-24', count: 28000 },
  { ageGroup: '25-34', count: 65000 },
  { ageGroup: '35-44', count: 42000 },
  { ageGroup: '45-54', count: 18000 },
  { ageGroup: '55+', count: 8000 },
];

const AudienceManager = () => {
  const [audiences, setAudiences] = useState<Audience[]>(audienceData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState<Audience | null>(null);
  const [activeTab, setActiveTab] = useState('create');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ageRange: '',
    gender: '',
    income: '',
    education: '',
    locations: [] as string[],
    interests: [] as string[],
    behaviors: [] as string[],
  });

  const createAudience = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter an audience name');
      return;
    }

    // Demo implementation
    toast.success(`Audience "${formData.name}" created successfully`);
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      ageRange: '',
      gender: '',
      income: '',
      education: '',
      locations: [],
      interests: [],
      behaviors: [],
    });
  };

  const analyzeAudience = (audience: Audience) => {
    setSelectedAudience(audience);
    toast.success(`Analyzing "${audience.name}" audience`);
  };

  const addInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Target Audience Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary-glow">
              <Plus className="w-4 h-4 mr-2" />
              Create Audience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Target Audience</DialogTitle>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="create">Basic Info</TabsTrigger>
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
                <TabsTrigger value="interests">Interests & Behaviors</TabsTrigger>
              </TabsList>
              
              <TabsContent value="create" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Audience Name</label>
                  <Input
                    placeholder="Enter audience name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Describe your target audience"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="demographics" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Age Range</label>
                    <Select value={formData.ageRange} onValueChange={(value) => setFormData(prev => ({ ...prev, ageRange: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-24">18-24</SelectItem>
                        <SelectItem value="25-34">25-34</SelectItem>
                        <SelectItem value="35-44">35-44</SelectItem>
                        <SelectItem value="45-54">45-54</SelectItem>
                        <SelectItem value="55+">55+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Gender</label>
                    <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Income Level</label>
                    <Select value={formData.income} onValueChange={(value) => setFormData(prev => ({ ...prev, income: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select income level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-30k">Under $30K</SelectItem>
                        <SelectItem value="30k-50k">$30K-$50K</SelectItem>
                        <SelectItem value="50k-100k">$50K-$100K</SelectItem>
                        <SelectItem value="100k+">$100K+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Education</label>
                    <Select value={formData.education} onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="college">College</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="postgrad">Post Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="interests" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Interests</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Technology', 'Fitness', 'Travel', 'Food', 'Fashion', 'Finance', 'Health', 'Sports', 'Music', 'Gaming'].map((interest) => (
                      <Button
                        key={interest}
                        variant="outline"
                        size="sm"
                        onClick={() => addInterest(interest)}
                        className={formData.interests.includes(interest) ? 'bg-primary text-primary-foreground' : ''}
                      >
                        {interest}
                      </Button>
                    ))}
                  </div>
                  {formData.interests.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="cursor-pointer" onClick={() => removeInterest(interest)}>
                          {interest} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button onClick={createAudience} className="w-full">
                  Create Audience
                </Button>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Audience List */}
      <div className="grid gap-6">
        {audiences.map((audience) => (
          <Card key={audience.id} className="shadow-elegant border-0 bg-card/95 backdrop-blur">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{audience.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{audience.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => analyzeAudience(audience)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Analyze
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Estimated Size</p>
                  <p className="text-lg font-bold">{audience.size_estimate.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-accent/5 rounded-lg">
                  <Calendar className="w-5 h-5 mx-auto mb-1 text-accent" />
                  <p className="text-xs text-muted-foreground">Age Range</p>
                  <p className="text-lg font-bold">{audience.demographics.ageRange}</p>
                </div>
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <MapPin className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Top Locations</p>
                  <p className="text-sm font-bold">{audience.demographics.location.slice(0, 2).join(', ')}</p>
                </div>
                <div className="text-center p-3 bg-accent/5 rounded-lg">
                  <Heart className="w-5 h-5 mx-auto mb-1 text-accent" />
                  <p className="text-xs text-muted-foreground">Interests</p>
                  <p className="text-lg font-bold">{audience.interests.length}</p>
                </div>
              </div>

              {/* Demographics and Interests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Demographics</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Gender:</strong> {audience.demographics.gender}</div>
                    <div><strong>Income:</strong> {audience.demographics.income}</div>
                    <div><strong>Education:</strong> {audience.demographics.education}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {audience.interests.slice(0, 6).map((interest, index) => (
                      <Badge key={index} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                    {audience.interests.length > 6 && (
                      <Badge variant="secondary">
                        +{audience.interests.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {audiences.length === 0 && (
        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardContent className="p-8 text-center">
            <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No audiences created yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first target audience to improve your ad targeting.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Create First Audience
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AudienceManager;