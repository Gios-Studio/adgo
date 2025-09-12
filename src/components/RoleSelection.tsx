import { useState } from "react";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Settings, Users, BarChart3, Shield, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RoleSelectionProps {
  onRoleSelect: (role: 'advertiser' | 'admin') => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const [selectedRole, setSelectedRole] = useState<'advertiser' | 'admin' | null>(null);
 const router = useRouter();
router.push("/dashboard");

  const handleContinue = () => {
    if (!selectedRole) {
      toast({
        title: "Please select a role",
        description: "Choose whether you're an advertiser or admin to continue.",
        variant: "destructive",
      });
      return;
    }
    
    onRoleSelect(selectedRole);
    
    // Navigate based on role
    if (selectedRole === 'advertiser') {
      navigate('/client-dashboard');
    } else {
      navigate('/admin-dashboard');
    }
  };

  const roles = [
    {
      id: 'advertiser' as const,
      title: 'Advertiser',
      description: 'Create and manage your advertising campaigns with precision targeting',
      features: [
        'Campaign Management',
        'Ad Creation & Upload',
        'Performance Analytics',
        'Audience Targeting',
        'Budget Control'
      ],
      icon: BarChart3,
      popular: true
    },
    {
      id: 'admin' as const,
      title: 'Administrator',
      description: 'Oversee platform operations and manage advertiser accounts',
      features: [
        'User Management',
        'Ad Approval Workflow',
        'System Analytics',
        'Platform Configuration',
        'Revenue Oversight'
      ],
      icon: Shield,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Choose Your Role
          </h1>
          <p className="text-muted-foreground text-lg">
            Select your role to access the right tools and features for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                  isSelected
                    ? 'border-primary shadow-lg ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                      }`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{role.title}</CardTitle>
                        {role.popular && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            Most Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      isSelected
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">{role.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Features:</h4>
                    <ul className="space-y-1">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            Continue as {selectedRole ? roles.find(r => r.id === selectedRole)?.title : 'Selected Role'}
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            You can change your role preferences later in account settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;