import { ArrowLeft, Bell, Calendar, FileText, ShoppingBag, Home, User, Activity, BellRing } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface DashboardProps {
  onNavigate: (screen: string, orderId?: number) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const greeting = hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Header with Profile */}
      <div className="bg-gradient-to-br from-[#0F4C75] to-[#1BCED8] px-5 pt-4 pb-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => onNavigate("roleSelection")}
            className="p-2 bg-white/20 rounded-lg backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-white">QueueLess</h2>
          <button className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Calendar className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white/80 text-xs">{greeting}</p>
            <p className="text-white text-lg">Rahul Kumar</p>
            <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm text-xs mt-1">
              Blood Group: O+
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content - Fixed Height */}
      <div className="flex-1 px-5 py-5 flex flex-col justify-between overflow-hidden">
        {/* Current Status Card */}
        <Card className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-md mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[#64748B] text-xs mb-1">Today's Appointment</p>
              <p className="text-[#1E293B]">Dr. Sarah Johnson</p>
              <p className="text-[#64748B] text-xs">Cardiologist</p>
            </div>
            <Badge className="bg-[#2ECC71]/10 text-[#2ECC71] border-0">Live</Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#F8FAFC] rounded-lg p-2 text-center">
              <p className="text-[#0F4C75] text-xl">#7</p>
              <p className="text-[#64748B] text-xs">Queue</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-2 text-center">
              <p className="text-[#1BCED8] text-xl">18</p>
              <p className="text-[#64748B] text-xs">Mins</p>
            </div>
            <div className="bg-[#F8FAFC] rounded-lg p-2 text-center">
              <p className="text-[#2ECC71] text-xs mt-1">11:20 AM</p>
              <p className="text-[#64748B] text-xs">Arrive By</p>
            </div>
          </div>
        </Card>

        {/* Three Main Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button 
            onClick={() => onNavigate("book")}
            className="bg-white border border-[#E2E8F0] rounded-xl p-3 hover:shadow-md transition-shadow"
          >
            <div className="p-2 bg-[#0F4C75]/10 rounded-lg w-fit mx-auto mb-2">
              <Calendar className="w-6 h-6 text-[#0F4C75]" />
            </div>
            <p className="text-[#1E293B] text-xs text-center leading-tight">Book Appointment</p>
          </button>

          <button 
            onClick={() => onNavigate("historyTransaction")}
            className="bg-white border border-[#E2E8F0] rounded-xl p-3 hover:shadow-md transition-shadow"
          >
            <div className="p-2 bg-[#1BCED8]/10 rounded-lg w-fit mx-auto mb-2">
              <FileText className="w-6 h-6 text-[#1BCED8]" />
            </div>
            <p className="text-[#1E293B] text-xs text-center leading-tight">History Transaction</p>
          </button>

          <button 
            onClick={() => onNavigate("orderHistory")}
            className="bg-white border border-[#E2E8F0] rounded-xl p-3 hover:shadow-md transition-shadow"
          >
            <div className="p-2 bg-[#2ECC71]/10 rounded-lg w-fit mx-auto mb-2">
              <ShoppingBag className="w-6 h-6 text-[#2ECC71]" />
            </div>
            <p className="text-[#1E293B] text-xs text-center leading-tight">Order History</p>
          </button>
        </div>

        {/* Quick Stats */}
        <Card className="bg-white border border-[#E2E8F0] rounded-xl p-4">
          <p className="text-[#1E293B] text-sm mb-3">Your Activity</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[#0F4C75] text-xl">12</p>
              <p className="text-[#64748B] text-xs">Visits</p>
            </div>
            <div>
              <p className="text-[#2ECC71] text-xl">11</p>
              <p className="text-[#64748B] text-xs">Complete</p>
            </div>
            <div>
              <p className="text-[#F4B400] text-xl">2</p>
              <p className="text-[#64748B] text-xs">Pending</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t border-[#E2E8F0] px-5 py-3 flex-shrink-0 shadow-lg">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="p-2 bg-[#0F4C75]/10 rounded-xl">
              <Home className="w-5 h-5 text-[#0F4C75]" />
            </div>
            <span className="text-xs text-[#0F4C75]">Home</span>
          </button>

          <button 
            onClick={() => onNavigate("liveQueue")}
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <div className="p-2 bg-transparent rounded-xl">
              <Activity className="w-5 h-5 text-[#64748B]" />
            </div>
            <span className="text-xs text-[#64748B]">Live Queue</span>
          </button>

          <button className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="p-2 bg-transparent rounded-xl relative">
              <BellRing className="w-5 h-5 text-[#64748B]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#E74C3C] rounded-full"></span>
            </div>
            <span className="text-xs text-[#64748B]">Alerts</span>
          </button>

          <button className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="p-2 bg-transparent rounded-xl">
              <User className="w-5 h-5 text-[#64748B]" />
            </div>
            <span className="text-xs text-[#64748B]">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}