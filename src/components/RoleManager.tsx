import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, UserPlus, Shield, Crown, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  organization_id: string | null;
  is_active: boolean;
  profiles?: {
    display_name: string;
    email?: string;
  };
}

const roleIcons = {
  super_admin: Crown,
  org_admin: Shield,
  client: Users,
  viewer: Eye,
};

const roleColors = {
  super_admin: 'bg-purple-500/10 text-purple-700 border-purple-200',
  org_admin: 'bg-blue-500/10 text-blue-700 border-blue-200',
  client: 'bg-green-500/10 text-green-700 border-green-200',
  viewer: 'bg-gray-500/10 text-gray-700 border-gray-200',
};

const RoleManager = () => {
  const { user } = useAuth();
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('client');

  useEffect(() => {
    fetchUserRoles();
  }, [user]);

  const fetchUserRoles = async () => {
    if (!user) return;

    try {
      // For demo purposes, using mock data
      const demoRoles: UserRole[] = [
        {
          id: '1',
          user_id: 'user-1',
          role: 'org_admin',
          organization_id: 'org-1',
          is_active: true,
          profiles: { display_name: 'John Admin' }
        },
        {
          id: '2',
          user_id: 'user-2', 
          role: 'client',
          organization_id: 'org-1',
          is_active: true,
          profiles: { display_name: 'Jane Client' }
        }
      ];
      setUserRoles(demoRoles);
    } catch (error) {
      console.error('Error fetching user roles:', error);
      toast.error('Failed to fetch user roles');
    } finally {
      setLoading(false);
    }
  };

  const assignRole = async () => {
    if (!user || !newUserEmail || !selectedRole) return;

    try {
      // For demo purposes, we'll show the action without actual implementation
      toast.success(`Role "${selectedRole}" would be assigned to ${newUserEmail}`);
      setIsDialogOpen(false);
      setNewUserEmail('');
      setSelectedRole('client');
    } catch (error) {
      console.error('Error assigning role:', error);
      toast.error('Failed to assign role');
    }
  };

  const toggleRoleStatus = async (roleId: string, currentStatus: boolean) => {
    try {
      // For demo purposes, we'll show the action without actual implementation
      toast.success(`Role ${currentStatus ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      console.error('Error updating role status:', error);
      toast.error('Failed to update role status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Role Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary-glow">
              <UserPlus className="w-4 h-4 mr-2" />
              Assign Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Role to User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">User Email</label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Role</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="org_admin">Organization Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={assignRole} className="w-full">
                Assign Role
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {userRoles.map((userRole) => {
          const IconComponent = roleIcons[userRole.role as keyof typeof roleIcons] || Users;
          const roleColor = roleColors[userRole.role as keyof typeof roleColors] || roleColors.viewer;

          return (
            <Card key={userRole.id} className="shadow-elegant border-0 bg-card/95 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {userRole.profiles?.display_name || 'Unknown User'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        User ID: {userRole.user_id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className={roleColor}>
                      {userRole.role.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <Badge variant={userRole.is_active ? 'default' : 'secondary'}>
                      {userRole.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRoleStatus(userRole.id, userRole.is_active)}
                    >
                      {userRole.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {userRoles.length === 0 && (
        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardContent className="p-8 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No roles assigned yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by assigning roles to users in your organization.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Assign First Role
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RoleManager;