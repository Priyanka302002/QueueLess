import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, Edit2, LogOut, Bell, Shield, HelpCircle, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface ProfileProps {
  onNavigate: (screen: string) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const userProfile = {
    name: "Rahul Kumar",
    phone: "+91 98765 43210",
    email: "rahul.kumar@email.com",
    bloodGroup: "O+",
    dateOfBirth: "15 Jan, 1990",
    address: "123 Main Street, Delhi, India",
    emergencyContact: "+91 98765 43211",
  };

  const menuItems = [
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage your alerts",
      color: "#1BCED8",
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      description: "Control your data",
      color: "#2ECC71",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get assistance",
      color: "#F4B400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F4C75] to-[#1BCED8] px-6 pt-8 pb-20 rounded-b-[32px]">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => onNavigate("dashboard")}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white flex-1">My Profile</h1>
        </div>

        {/* Profile Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-white mb-1">{userProfile.name}</h2>
          <Badge className="bg-white/20 text-white border-white/20 backdrop-blur-sm">
            Blood Group: {userProfile.bloodGroup}
          </Badge>
        </div>
      </div>

      <div className="px-6 -mt-12 space-y-4">
        {/* Personal Information Card */}
        <Card className="bg-white border-[#E2E8F0] rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1E293B]">Personal Information</h3>
            <button className="p-2 bg-[#0F4C75]/10 rounded-lg">
              <Edit2 className="w-4 h-4 text-[#0F4C75]" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#0F4C75]/10 rounded-lg">
                <Phone className="w-5 h-5 text-[#0F4C75]" />
              </div>
              <div className="flex-1">
                <p className="text-[#64748B] text-sm mb-1">Phone Number</p>
                <p className="text-[#1E293B]">{userProfile.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#1BCED8]/10 rounded-lg">
                <Mail className="w-5 h-5 text-[#1BCED8]" />
              </div>
              <div className="flex-1">
                <p className="text-[#64748B] text-sm mb-1">Email Address</p>
                <p className="text-[#1E293B]">{userProfile.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#2ECC71]/10 rounded-lg">
                <Calendar className="w-5 h-5 text-[#2ECC71]" />
              </div>
              <div className="flex-1">
                <p className="text-[#64748B] text-sm mb-1">Date of Birth</p>
                <p className="text-[#1E293B]">{userProfile.dateOfBirth}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#F4B400]/10 rounded-lg">
                <MapPin className="w-5 h-5 text-[#F4B400]" />
              </div>
              <div className="flex-1">
                <p className="text-[#64748B] text-sm mb-1">Address</p>
                <p className="text-[#1E293B]">{userProfile.address}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card className="bg-gradient-to-r from-[#E74C3C]/10 to-[#E74C3C]/5 border-[#E74C3C]/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#1E293B]">Emergency Contact</h3>
            <button className="p-2 bg-[#E74C3C]/10 rounded-lg">
              <Edit2 className="w-4 h-4 text-[#E74C3C]" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E74C3C]/10 rounded-lg">
              <Phone className="w-5 h-5 text-[#E74C3C]" />
            </div>
            <div className="flex-1">
              <p className="text-[#64748B] text-sm">Contact Number</p>
              <p className="text-[#1E293B]">{userProfile.emergencyContact}</p>
            </div>
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="bg-white border-[#E2E8F0] rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-[#1E293B] mb-0.5">{item.label}</p>
                  <p className="text-[#64748B] text-sm">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#64748B]" />
              </div>
            </Card>
          ))}
        </div>

        {/* App Information */}
        <Card className="bg-white border-[#E2E8F0] rounded-2xl p-5">
          <div className="text-center space-y-2">
            <div className="text-4xl mb-3">🏥</div>
            <h3 className="text-[#1E293B]">QueueLess</h3>
            <p className="text-[#64748B] text-sm">Version 1.0.0</p>
            <p className="text-[#64748B] text-sm italic">"No waiting. Just care."</p>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full border-[#E74C3C] text-[#E74C3C] hover:bg-[#E74C3C]/10 rounded-xl py-6 flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
