
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { MobileHeader } from "@/components/navigation/MobileHeader";
import { MobileBottomTabs } from "@/components/navigation/MobileBottomTabs";
import MobileSettings from "@/components/mobile/MobileSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Building, Bell, Shield, Save } from "lucide-react";

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen bg-gray-50 dark:bg-gray-900">
        <MobileHeader title="Settings" />
        <div className="p-4">
          <MobileSettings />
        </div>
        <MobileBottomTabs />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Settings
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage your account and application preferences.
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Profile Settings */}
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Profile Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Change Photo</Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Smith" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.smith@buildpro.com" />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </CardContent>
                </Card>

                {/* Company Settings */}
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      Company Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" defaultValue="BuildPro Construction" />
                    </div>
                    
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="est">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">Eastern Time (EST)</SelectItem>
                          <SelectItem value="cst">Central Time (CST)</SelectItem>
                          <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                          <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="cad">CAD (C$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Notification Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Receive email updates about your projects
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Safety Alerts</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Get notified about safety incidents
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Automatic weekly progress reports
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                {/* Security Settings */}
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Add an extra layer of security
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      Download Account Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Settings;
