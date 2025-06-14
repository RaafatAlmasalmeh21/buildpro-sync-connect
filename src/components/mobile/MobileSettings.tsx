
import { MobileCard, MobileCardHeader, MobileCardTitle, MobileCardContent } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Building, Bell, Shield, LogOut, ChevronRight } from "lucide-react";

const MobileSettings = () => {
  return (
    <div className="space-mobile-md pb-20">
      {/* Profile Section */}
      <MobileCard className="touch-manipulation">
        <MobileCardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-mobile-lg font-semibold text-gray-900 dark:text-white">
                John Smith
              </h3>
              <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                john.smith@buildpro.com
              </p>
              <p className="text-mobile-sm text-gray-500 dark:text-gray-500">
                Project Manager
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Account Settings */}
      <MobileCard className="touch-manipulation">
        <MobileCardHeader>
          <MobileCardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Account Settings
          </MobileCardTitle>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between min-h-[44px]">
              <span className="text-mobile-base text-gray-900 dark:text-white">Profile Information</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between min-h-[44px]">
              <span className="text-mobile-base text-gray-900 dark:text-white">Change Password</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between min-h-[44px]">
              <span className="text-mobile-base text-gray-900 dark:text-white">Two-Factor Authentication</span>
              <Switch />
            </div>
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Company Settings */}
      <MobileCard className="touch-manipulation">
        <MobileCardHeader>
          <MobileCardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Company Settings
          </MobileCardTitle>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between min-h-[44px]">
              <span className="text-mobile-base text-gray-900 dark:text-white">Company Profile</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between min-h-[44px]">
              <span className="text-mobile-base text-gray-900 dark:text-white">Team Management</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between min-h-[44px]">
              <span className="text-mobile-base text-gray-900 dark:text-white">Billing & Subscription</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Notifications */}
      <MobileCard className="touch-manipulation">
        <MobileCardHeader>
          <MobileCardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </MobileCardTitle>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between min-h-[44px]">
              <span className="text-mobile-base text-gray-900 dark:text-white">Push Notifications</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between min-h-[44px]">
              <span className="text-mobile-base text-gray-900 dark:text-white">Email Notifications</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between min-h-[44px]">
              <span className="text-mobile-base text-gray-900 dark:text-white">Safety Alerts</span>
              <Switch defaultChecked />
            </div>
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Privacy & Security */}
      <MobileCard className="touch-manipulation">
        <MobileCardHeader>
          <MobileCardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Privacy & Security
          </MobileCardTitle>
        </MobileCardHeader>
        <MobileCardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between min-h-[44px]">
              <span className="text-mobile-base text-gray-900 dark:text-white">Privacy Policy</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between min-h-[44px]">
              <span className="text-mobile-base text-gray-900 dark:text-white">Terms of Service</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between min-h-[44px]">
              <span className="text-mobile-base text-gray-900 dark:text-white">Data Export</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </MobileCardContent>
      </MobileCard>

      {/* Sign Out */}
      <Button 
        variant="destructive" 
        className="w-full min-h-[48px] text-mobile-base"
      >
        <LogOut className="h-5 w-5 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};

export default MobileSettings;
