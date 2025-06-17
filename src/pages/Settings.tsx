import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, User, Bell, Shield, Globe, Palette } from "lucide-react";
import { useAuthContext } from "@/components/auth/AuthProvider";

const Settings = () => {
  const { user, updateProfile } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [firstName, setFirstName] = useState(user?.name.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.name.split(" ")[1] || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Photo</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>

              <Button onClick={() => updateProfile({ name: `${firstName} ${lastName}`, email })}>Save Changes</Button>
            </CardContent>
          </Card>
        );
      case "notifications":
        return (
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive email updates about project progress
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get notified about urgent updates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">SMS Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive text messages for critical alerts
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        );
      case "security":
        return (
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch />
              </div>
              
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        );
      case "language":
        return (
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Language & Region Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="arabic">العربية (Arabic)</SelectItem>
                    <SelectItem value="spanish">Español (Spanish)</SelectItem>
                    <SelectItem value="french">Français (French)</SelectItem>
                    <SelectItem value="german">Deutsch (German)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="region">Region</Label>
                <Select defaultValue="us">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ae">United Arab Emirates</SelectItem>
                    <SelectItem value="sa">Saudi Arabia</SelectItem>
                    <SelectItem value="eg">Egypt</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="timezone">Time Zone</Label>
                <Select defaultValue="utc-5">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-5">UTC-5 (Eastern Time)</SelectItem>
                    <SelectItem value="utc+3">UTC+3 (Arabia Standard Time)</SelectItem>
                    <SelectItem value="utc+2">UTC+2 (Egypt Standard Time)</SelectItem>
                    <SelectItem value="utc+0">UTC+0 (Greenwich Mean Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button>Save Language Settings</Button>
            </CardContent>
          </Card>
        );
      case "appearance":
        return (
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Appearance Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch />
              </div>
              
              <Separator />
              
              <div>
                <Label>Theme Color</Label>
                <div className="flex gap-2 mt-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer border-2 border-white shadow-sm"></div>
                  <div className="w-8 h-8 rounded-full bg-green-500 cursor-pointer border-2 border-white shadow-sm"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer border-2 border-white shadow-sm"></div>
                  <div className="w-8 h-8 rounded-full bg-red-500 cursor-pointer border-2 border-white shadow-sm"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Photo</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>

              <Button onClick={() => updateProfile({ name: `${firstName} ${lastName}`, email })}>Save Changes</Button>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your account preferences and system settings.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Settings Menu */}
              <div className="lg:col-span-1">
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      Settings Menu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      variant={activeSection === "profile" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveSection("profile")}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </Button>
                    <Button 
                      variant={activeSection === "notifications" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveSection("notifications")}
                    >
                      <Bell className="h-4 w-4 mr-3" />
                      Notifications
                    </Button>
                    <Button 
                      variant={activeSection === "security" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveSection("security")}
                    >
                      <Shield className="h-4 w-4 mr-3" />
                      Security
                    </Button>
                    <Button 
                      variant={activeSection === "language" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveSection("language")}
                    >
                      <Globe className="h-4 w-4 mr-3" />
                      Language & Region
                    </Button>
                    <Button 
                      variant={activeSection === "appearance" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveSection("appearance")}
                    >
                      <Palette className="h-4 w-4 mr-3" />
                      Appearance
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Settings Content */}
              <div className="lg:col-span-2 space-y-6">
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
