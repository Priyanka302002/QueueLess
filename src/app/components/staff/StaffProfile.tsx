import { ArrowLeft, User, Briefcase, Clock, Shield, LogOut, Mail, Phone } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface StaffProfileProps {
  onNavigate?: (screen: string) => void;
}

export function StaffProfile({ onNavigate }: StaffProfileProps) {
  const staffData = {
    name: "Anjali Verma",
    role: "Front Desk Receptionist",
    staffId: "STF-2024-157",
    email: "anjali.verma@hospital.com",
    phone: "+91 98765 43210",
    shift: "Shift A (8:00 AM - 4:00 PM)",
    department: "Reception",
    joinDate: "Jan 15, 2023",
    todayStats: {
      patientsHandled: 24,
      patientsOnHold: 3,
      avgWaitTime: "12 mins"
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1BCED8] to-[#0F4C75] px-5 pt-4 pb-8 flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => onNavigate?.("staffDashboard")}
            className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-white">Profile</h2>
          <div className="w-9"></div>
        </div>

        {/* Profile Picture & Name */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
            <User className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-white text-xl mb-1">{staffData.name}</h3>
          <p className="text-white/80 text-sm mb-2">{staffData.role}</p>
          <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
            {staffData.staffId}
          </Badge>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {/* Today's Stats */}
        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] mb-4">
          <p className="text-[#1E293B] mb-3">Today's Performance</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-[#1BCED8] text-2xl">{staffData.todayStats.patientsHandled}</p>
              <p className="text-[#64748B] text-xs">Handled</p>
            </div>
            <div className="text-center">
              <p className="text-[#F4B400] text-2xl">{staffData.todayStats.patientsOnHold}</p>
              <p className="text-[#64748B] text-xs">On Hold</p>
            </div>
            <div className="text-center">
              <p className="text-[#2ECC71] text-xl">{staffData.todayStats.avgWaitTime}</p>
              <p className="text-[#64748B] text-xs">Avg Wait</p>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] mb-4">
          <p className="text-[#1E293B] mb-4">Personal Information</p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1BCED8]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#1BCED8]" />
              </div>
              <div className="flex-1">
                <p className="text-[#64748B] text-xs">Email</p>
                <p className="text-[#1E293B] text-sm">{staffData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2ECC71]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#2ECC71]" />
              </div>
              <div className="flex-1">
                <p className="text-[#64748B] text-xs">Phone</p>
                <p className="text-[#1E293B] text-sm">{staffData.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F4B400]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-[#F4B400]" />
              </div>
              <div className="flex-1">
                <p className="text-[#64748B] text-xs">Department</p>
                <p className="text-[#1E293B] text-sm">{staffData.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0F4C75]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#0F4C75]" />
              </div>
              <div className="flex-1">
                <p className="text-[#64748B] text-xs">Current Shift</p>
                <p className="text-[#1E293B] text-sm">{staffData.shift}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Work Information */}
        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] mb-4">
          <p className="text-[#1E293B] mb-4">Work Information</p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[#64748B] text-sm">Staff ID</p>
              <p className="text-[#1E293B]">{staffData.staffId}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#64748B] text-sm">Join Date</p>
              <p className="text-[#1E293B]">{staffData.joinDate}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#64748B] text-sm">Access Level</p>
              <Badge className="bg-[#2ECC71]/10 text-[#2ECC71] border-0">
                Standard
              </Badge>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="bg-[#0F4C75]/5 border border-[#0F4C75]/10 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#0F4C75] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#1E293B] text-sm mb-1">Security & Privacy</p>
              <p className="text-[#64748B] text-xs">
                All your actions are logged and monitored for security. Patient data is encrypted and HIPAA compliant.
              </p>
            </div>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={() => onNavigate?.("roleSelection")}
          className="w-full py-4 rounded-xl bg-white border-2 border-[#E74C3C] text-[#E74C3C] hover:bg-[#E74C3C] hover:text-white flex items-center justify-center gap-2 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>

        <p className="text-[#64748B] text-xs text-center mt-3">
          Need help? Contact IT Support: support@hospital.com
        </p>
      </div>
    </div>
  );
}
