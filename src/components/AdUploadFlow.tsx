import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { 
  Upload, 
  X, 
  Play, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Calendar as CalendarIcon,
  MapPin, 
  Users, 
  Target,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Globe,
  TrendingUp,
  Eye,
  MousePointer
} from 'lucide-react';

interface UploadedFile {
  file: File;
  preview: string;
  type: 'image' | 'video';
}

interface CampaignFormData {
  name: string;
  description: string;
  targetCities: string[];
  demographics: {
    ageMin: number;
    ageMax: number;
    gender: string[];
    interests: string[];
  };
  budget: {
    type: 'daily' | 'total';
    amount: number;
  };
  schedule: {
    startDate: Date | null;
    endDate: Date | null;
    timezone: string;
  };
  adContent: {
    headline: string;
    description: string;
    callToAction: string;
  };
}

const AdUploadFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    description: '',
    targetCities: [],
    demographics: {
      ageMin: 18,
      ageMax: 65,
      gender: [],
      interests: []
    },
    budget: {
      type: 'daily',
      amount: 50
    },
    schedule: {
      startDate: null,
      endDate: null,
      timezone: 'America/New_York'
    },
    adContent: {
      headline: '',
      description: '',
      callToAction: 'Learn More'
    }
  });

  const { toast } = useToast();
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' as const : 'image' as const
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
    'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Boston'
  ];

  const interests = [
    'Technology', 'Fashion', 'Travel', 'Food & Dining', 'Sports',
    'Health & Fitness', 'Entertainment', 'Business', 'Education',
    'Home & Garden', 'Automotive', 'Finance', 'Art & Culture'
  ];

  const callToActions = [
    'Learn More', 'Shop Now', 'Sign Up', 'Get Started', 'Download',
    'Book Now', 'Contact Us', 'Try Free', 'Subscribe', 'Get Quote'
  ];

  const steps = [
    { number: 1, title: 'Upload Creative', description: 'Add your images or videos' },
    { number: 2, title: 'Campaign Setup', description: 'Define your campaign goals' },
    { number: 3, title: 'Targeting', description: 'Choose your audience' },
    { number: 4, title: 'Budget & Schedule', description: 'Set budget and timing' },
    { number: 5, title: 'Review & Launch', description: 'Confirm and submit' }
  ];

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "🎉 Campaign Created Successfully!",
      description: "Your campaign has been submitted for review and will go live soon.",
    });
    
    // Navigate back to dashboard after a short delay
    setTimeout(() => {
      router.push('/client-dashboard');
    }, 2000);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
            currentStep >= step.number 
              ? 'bg-primary border-primary text-primary-foreground' 
              : 'border-border text-muted-foreground'
          }`}>
            {currentStep > step.number ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <span className="text-sm font-semibold">{step.number}</span>
            )}
          </div>
          
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
              currentStep > step.number ? 'bg-primary' : 'bg-border'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="p-6 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 p-2 rounded-lg bg-muted">
          <Upload size={24} className="text-cosmic-accent" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Upload Your Creative Assets</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Upload high-quality images or videos for your campaign
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Drag and Drop Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? 'border-cosmic-accent bg-cosmic-accent/5' 
              : 'border-border hover:border-cosmic-accent/50 hover:bg-cosmic-accent/5'
          }`}
        >
          <input {...getInputProps()} />
          
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-cosmic-accent" />
              </div>
            
              {isDragActive ? (
                <p className="text-lg font-medium text-cosmic-accent">Drop your files here...</p>
              ) : (
                <div>
                  <p className="text-lg font-medium mb-2 text-foreground">
                    Drag & drop your files here, or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports: JPG, PNG, GIF, MP4, MOV (max 50MB)
                  </p>
                </div>
              )}
          </div>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {/* Uploaded Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Uploaded Files</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    {file.type === 'image' ? (
                      <img 
                        src={file.preview} 
                        alt={file.file.name}
                        className="w-full h-full object-cover"
                      />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Video className="h-8 w-8 text-cosmic-accent" />
                        </div>
                      )}
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  
                  <p className="text-xs text-center mt-2 truncate">
                    {file.file.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button 
            onClick={nextStep}
            disabled={uploadedFiles.length === 0}
            className="bg-cosmic-accent hover:bg-cosmic-accent/90 text-white"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="p-6 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 p-2 rounded-lg bg-muted">
          <Target size={24} className="text-cosmic-accent" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Campaign Setup</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Define your campaign goals and messaging
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="campaign-name">Campaign Name *</Label>
              <Input
                id="campaign-name"
                placeholder="Enter campaign name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="campaign-desc">Campaign Description</Label>
              <Textarea
                id="campaign-desc"
                placeholder="Describe your campaign objectives..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="mt-1 h-24"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="headline">Ad Headline *</Label>
              <Input
                id="headline"
                placeholder="Compelling headline for your ad"
                value={formData.adContent.headline}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  adContent: { ...prev.adContent, headline: e.target.value }
                }))}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="ad-desc">Ad Description</Label>
              <Textarea
                id="ad-desc"
                placeholder="Engaging description for your ad..."
                value={formData.adContent.description}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  adContent: { ...prev.adContent, description: e.target.value }
                }))}
                className="mt-1 h-24"
              />
            </div>
            
            <div>
              <Label>Call-to-Action Button</Label>
              <Select 
                value={formData.adContent.callToAction}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  adContent: { ...prev.adContent, callToAction: value }
                }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg">
                  {callToActions.map(cta => (
                    <SelectItem key={cta} value={cta}>{cta}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button 
            onClick={nextStep}
            disabled={!formData.name || !formData.adContent.headline}
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Audience Targeting
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Define who should see your ads for maximum impact
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Geographic Targeting */}
        <div>
          <Label className="text-lg font-semibold text-primary mb-3 block">
            <MapPin className="inline h-5 w-5 mr-2" />
            Geographic Targeting
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cities.map(city => (
              <div key={city} className="flex items-center space-x-2">
                <Checkbox
                  id={city}
                  checked={formData.targetCities.includes(city)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData(prev => ({ 
                        ...prev, 
                        targetCities: [...prev.targetCities, city]
                      }));
                    } else {
                      setFormData(prev => ({ 
                        ...prev, 
                        targetCities: prev.targetCities.filter(c => c !== city)
                      }));
                    }
                  }}
                />
                <Label htmlFor={city} className="text-sm cursor-pointer">{city}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Demographics */}
        <div>
          <Label className="text-lg font-semibold text-primary mb-3 block">
            <Users className="inline h-5 w-5 mr-2" />
            Demographics
          </Label>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Age Range</Label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Min"
                    min="13"
                    max="100"
                    value={formData.demographics.ageMin}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      demographics: { ...prev.demographics, ageMin: parseInt(e.target.value) || 18 }
                    }))}
                  />
                </div>
                <span className="text-muted-foreground">to</span>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Max"
                    min="13"
                    max="100"
                    value={formData.demographics.ageMax}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      demographics: { ...prev.demographics, ageMax: parseInt(e.target.value) || 65 }
                    }))}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Gender</Label>
              <div className="flex space-x-4">
                {['All', 'Male', 'Female', 'Non-binary'].map(gender => (
                  <div key={gender} className="flex items-center space-x-2">
                    <Checkbox
                      id={gender}
                      checked={formData.demographics.gender.includes(gender)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData(prev => ({ 
                            ...prev, 
                            demographics: { 
                              ...prev.demographics, 
                              gender: [...prev.demographics.gender, gender]
                            }
                          }));
                        } else {
                          setFormData(prev => ({ 
                            ...prev, 
                            demographics: { 
                              ...prev.demographics, 
                              gender: prev.demographics.gender.filter(g => g !== gender)
                            }
                          }));
                        }
                      }}
                    />
                    <Label htmlFor={gender} className="text-sm cursor-pointer">{gender}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Interests */}
        <div>
          <Label className="text-lg font-semibold text-primary mb-3 block">
            <Target className="inline h-5 w-5 mr-2" />
            Interests & Behaviors
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {interests.map(interest => (
              <div key={interest} className="flex items-center space-x-2">
                <Checkbox
                  id={interest}
                  checked={formData.demographics.interests.includes(interest)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData(prev => ({ 
                        ...prev, 
                        demographics: { 
                          ...prev.demographics, 
                          interests: [...prev.demographics.interests, interest]
                        }
                      }));
                    } else {
                      setFormData(prev => ({ 
                        ...prev, 
                        demographics: { 
                          ...prev.demographics, 
                          interests: prev.demographics.interests.filter(i => i !== interest)
                        }
                      }));
                    }
                  }}
                />
                <Label htmlFor={interest} className="text-sm cursor-pointer">{interest}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button 
            onClick={nextStep}
            disabled={formData.targetCities.length === 0}
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Budget & Schedule
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Set your budget and campaign timing for optimal results
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Budget Section */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-primary mb-3 block">
              <DollarSign className="inline h-5 w-5 mr-2" />
              Budget Settings
            </Label>
            
            <RadioGroup 
              value={formData.budget.type} 
              onValueChange={(value: 'daily' | 'total') => 
                setFormData(prev => ({ ...prev, budget: { ...prev.budget, type: value } }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily">Daily Budget</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="total" id="total" />
                <Label htmlFor="total">Total Campaign Budget</Label>
              </div>
            </RadioGroup>
            
            <div>
              <Label htmlFor="budget-amount">
                {formData.budget.type === 'daily' ? 'Daily' : 'Total'} Budget Amount ($)
              </Label>
              <Input
                id="budget-amount"
                type="number"
                min="1"
                placeholder="50"
                value={formData.budget.amount}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  budget: { ...prev.budget, amount: parseInt(e.target.value) || 50 }
                }))}
                className="mt-1"
              />
            </div>
            
            <div className="p-4 bg-primary/5 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Estimated Reach</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Impressions:</span>
                  <span className="font-semibold">{(formData.budget.amount * 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Clicks:</span>
                  <span className="font-semibold">{Math.round(formData.budget.amount * 7)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated CPC:</span>
                  <span className="font-semibold">$0.32</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Schedule Section */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-primary mb-3 block">
              <Clock className="inline h-5 w-5 mr-2" />
              Campaign Schedule
            </Label>
            
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.schedule.startDate ? (
                      format(formData.schedule.startDate, "PPP")
                    ) : (
                      <span>Pick start date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border shadow-lg">
                  <Calendar
                    mode="single"
                    selected={formData.schedule.startDate || undefined}
                    onSelect={(date) => setFormData(prev => ({ 
                      ...prev, 
                      schedule: { ...prev.schedule, startDate: date || null }
                    }))}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.schedule.endDate ? (
                      format(formData.schedule.endDate, "PPP")
                    ) : (
                      <span>Pick end date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border shadow-lg">
                  <Calendar
                    mode="single"
                    selected={formData.schedule.endDate || undefined}
                    onSelect={(date) => setFormData(prev => ({ 
                      ...prev, 
                      schedule: { ...prev.schedule, endDate: date || null }
                    }))}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>Timezone</Label>
              <Select 
                value={formData.schedule.timezone}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  schedule: { ...prev.schedule, timezone: value }
                }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg">
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button 
            onClick={nextStep}
            disabled={!formData.schedule.startDate || formData.budget.amount < 1}
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep5 = () => (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Review & Launch Campaign
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Review your campaign details before submitting for approval
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Campaign Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-primary mb-2">Campaign Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Creative Assets:</span>
                  <span className="font-medium">{uploadedFiles.length} file(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Headline:</span>
                  <span className="font-medium">{formData.adContent.headline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CTA:</span>
                  <span className="font-medium">{formData.adContent.callToAction}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-primary mb-2">Targeting</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Cities: </span>
                  <span className="font-medium">{formData.targetCities.slice(0, 3).join(', ')}</span>
                  {formData.targetCities.length > 3 && (
                    <span className="text-muted-foreground"> +{formData.targetCities.length - 3} more</span>
                  )}
                </div>
                <div>
                  <span className="text-muted-foreground">Age: </span>
                  <span className="font-medium">{formData.demographics.ageMin}-{formData.demographics.ageMax}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Gender: </span>
                  <span className="font-medium">
                    {formData.demographics.gender.length > 0 ? formData.demographics.gender.join(', ') : 'All'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Interests: </span>
                  <span className="font-medium">
                    {formData.demographics.interests.slice(0, 2).join(', ')}
                    {formData.demographics.interests.length > 2 && (
                      <span className="text-muted-foreground"> +{formData.demographics.interests.length - 2} more</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-primary mb-2">Budget & Schedule</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget Type:</span>
                  <span className="font-medium capitalize">{formData.budget.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">${formData.budget.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-medium">
                    {formData.schedule.startDate ? format(formData.schedule.startDate, "MMM dd, yyyy") : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">End Date:</span>
                  <span className="font-medium">
                    {formData.schedule.endDate ? format(formData.schedule.endDate, "MMM dd, yyyy") : 'Not set'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Performance Prediction */}
            <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg">
              <h4 className="font-semibold text-primary mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Performance Prediction
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1 text-primary" />
                    <span>Expected Impressions:</span>
                  </div>
                  <span className="font-semibold text-primary">
                    {(formData.budget.amount * 100).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MousePointer className="h-3 w-3 mr-1 text-accent" />
                    <span>Expected Clicks:</span>
                  </div>
                  <span className="font-semibold text-accent">
                    {Math.round(formData.budget.amount * 7)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1 text-primary" />
                    <span>Predicted CTR:</span>
                  </div>
                  <span className="font-semibold text-primary">7.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Launch Campaign
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/2832d142-026e-456c-88e4-dbacf37c22e7.png" 
                alt="AdGo Logo" 
                className="h-8 w-auto mr-3"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AdGo
              </span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => router.push('/client-dashboard')}
              className="border-primary/20 hover:bg-primary/5"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Campaign</h1>
          <p className="text-muted-foreground">
            Follow the steps below to create and launch your advertising campaign
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Current Step Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-primary">
            {steps[currentStep - 1].title}
          </h2>
          <p className="text-muted-foreground">
            {steps[currentStep - 1].description}
          </p>
        </div>

        {/* Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </div>
    </div>
  );
};

export default AdUploadFlow;