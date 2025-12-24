import { ArrowLeft, Clock, Users, CheckCircle2, Bell, MapPin, AlertCircle, Activity } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { useState } from "react";

interface LiveQueueProps {
  onNavigate?: (screen: string) => void;
}

export function LiveQueue({ onNavigate }: LiveQueueProps) {
  const [notifyTwoPatients, setNotifyTwoPatients] = useState(true);
  const [notifyMyTurn, setNotifyMyTurn] = useState(true);

  // Sample queue data
  const queueData = {
    currentServing: 5,
    yourQueueNumber: 7,
    patientsAhead: 2,
    estimatedWaitMin: 15,
    estimatedWaitMax: 20,
    isCheckedIn: true,
    leaveInMinutes: 10,
    doctorName: "Dr. Ananya Sharma",
    department: "Cardiology",
    hospital: "Apollo Hospital, Sector 26",
    appointmentTime: "10:30 AM",
    crowdLevel: "low", // low, medium, high
    doctorStatus: "available", // available, running-late, temporarily-away
    delayReason: null, // "Emergency case added" or null
    delayMinutes: 0
  };

  const getCrowdStyles = (level: string) => {
    switch (level) {
      case "low":
        return { bg: "bg-[#2ECC71]/10", text: "text-[#2ECC71]", icon: "🟢", label: "Low crowd" };
      case "medium":
        return { bg: "bg-[#F4B400]/10", text: "text-[#F4B400]", icon: "🟡", label: "Medium" };
      case "high":
        return { bg: "bg-[#E74C3C]/10", text: "text-[#E74C3C]", icon: "🔴", label: "High" };
      default:
        return { bg: "bg-[#2ECC71]/10", text: "text-[#2ECC71]", icon: "🟢", label: "Low crowd" };
    }
  };

  const getDoctorStatusStyles = (status: string) => {
    switch (status) {
      case "available":
        return { bg: "bg-[#2ECC71]/10", text: "text-[#2ECC71]", icon: "🟢", label: "Doctor Available" };
      case "running-late":
        return { bg: "bg-[#F4B400]/10", text: "text-[#F4B400]", icon: "🟡", label: "Doctor Running Late" };
      case "temporarily-away":
        return { bg: "bg-[#E74C3C]/10", text: "text-[#E74C3C]", icon: "🔴", label: "Temporarily Away" };
      default:
        return { bg: "bg-[#2ECC71]/10", text: "text-[#2ECC71]", icon: "🟢", label: "Doctor Available" };
    }
  };

  const crowdStyles = getCrowdStyles(queueData.crowdLevel);
  const doctorStyles = getDoctorStatusStyles(queueData.doctorStatus);

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Top Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-5 py-4 flex items-center justify-between flex-shrink-0">
        <button 
          onClick={() => onNavigate?.("dashboard")}
          className="p-2 -ml-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1E293B]" />
        </button>
        <h2 className="text-[#1E293B]">Live Queue</h2>
        <div className="w-9"></div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Appointment Info */}
        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] mb-4">
          <div className="mb-2">
            <p className="text-[#1E293B]">{queueData.doctorName}</p>
            <p className="text-[#64748B] text-sm">{queueData.department}</p>
          </div>
          <div className="flex items-center gap-2 text-[#64748B] text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{queueData.hospital}</span>
          </div>
          <div className="flex items-center gap-2 text-[#64748B] text-sm">
            <Clock className="w-4 h-4" />
            <span>Scheduled: {queueData.appointmentTime}</span>
          </div>
        </Card>

        {/* 1️⃣ Current Status Indicator */}
        <Card className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E8F0] mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[#64748B] text-sm mb-1">Now Serving</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🟢</span>
                <p className="text-[#1E293B] text-2xl">Queue #{queueData.currentServing}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#64748B] text-sm mb-1">You are</p>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-2xl">🟡</span>
                <p className="text-[#0F4C75] text-2xl">Queue #{queueData.yourQueueNumber}</p>
              </div>
            </div>
          </div>

          {/* 3️⃣ Patients Ahead */}
          <div className="pt-4 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#64748B]" />
              <p className="text-[#1E293B]">{queueData.patientsAhead} patients ahead of you</p>
            </div>
          </div>
        </Card>

        {/* 2️⃣ Real-Time ETA */}
        <Card className="bg-gradient-to-br from-[#1BCED8]/5 to-[#1BCED8]/10 border border-[#1BCED8]/20 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-[#1BCED8]" />
            <p className="text-[#1E293B]">Updated ETA</p>
          </div>
          <p className="text-[#1BCED8] text-3xl mb-2">{queueData.estimatedWaitMin}–{queueData.estimatedWaitMax} mins</p>
          <p className="text-[#64748B] text-xs">
            ✨ Updates automatically based on live progress
          </p>
        </Card>

        {/* 5️⃣ Smart Arrival Countdown */}
        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#1E293B]">Smart Arrival</p>
            <Badge className="bg-[#2ECC71]/10 text-[#2ECC71] border-0">
              QueueLess AI
            </Badge>
          </div>
          <div className="bg-[#0F4C75]/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🚶</span>
              <p className="text-[#0F4C75] text-xl">Leave in {queueData.leaveInMinutes} minutes</p>
            </div>
            <p className="text-[#64748B] text-xs">
              Based on queue speed, traffic & doctor pace
            </p>
          </div>
        </Card>

        {/* 6️⃣ Delay Reason (Conditional) */}
        {queueData.delayReason && (
          <Card className="bg-[#F4B400]/5 border border-[#F4B400]/20 rounded-2xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#F4B400] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#1E293B] mb-1">🧠 {queueData.delayReason}</p>
                <p className="text-[#64748B] text-sm">New ETA: +{queueData.delayMinutes} mins</p>
              </div>
            </div>
          </Card>
        )}

        {/* 4️⃣ Check-In Status */}
        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${queueData.isCheckedIn ? "bg-[#2ECC71]/10" : "bg-[#E2E8F0]"}`}>
                <CheckCircle2 className={`w-5 h-5 ${queueData.isCheckedIn ? "text-[#2ECC71]" : "text-[#64748B]"}`} />
              </div>
              <div>
                <p className="text-[#1E293B]">Check-In Status</p>
                <p className="text-[#64748B] text-sm">
                  {queueData.isCheckedIn 
                    ? "✅ Checked In" 
                    : "Please check in within your arrival window"}
                </p>
              </div>
            </div>
            <div className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
              queueData.isCheckedIn ? "bg-[#2ECC71] justify-end" : "bg-[#E2E8F0] justify-start"
            }`}>
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </Card>

        {/* 7️⃣ Queue Progress Visualization */}
        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] mb-4">
          <p className="text-[#1E293B] mb-4">Queue Progress</p>
          <div className="space-y-3">
            {/* Completed */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#2ECC71] rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[#64748B] text-sm">Completed (Queue #1-4)</p>
              </div>
            </div>

            {/* In Progress */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#1BCED8] rounded-full flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[#1E293B]">In Progress (Queue #{queueData.currentServing})</p>
              </div>
            </div>

            {/* Waiting - Others */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#E2E8F0] rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 bg-[#E2E8F0] rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-[#64748B] text-sm">Waiting (Queue #{queueData.currentServing + 1})</p>
              </div>
            </div>

            {/* You */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#0F4C75] rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 bg-[#0F4C75] rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-[#0F4C75]">You (Queue #{queueData.yourQueueNumber})</p>
              </div>
            </div>
          </div>
        </Card>

        {/* 9️⃣ Crowd Density & 1️⃣1️⃣ Doctor Status */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Crowd Density */}
          <Card className={`${crowdStyles.bg} rounded-2xl p-4 border-0`}>
            <p className="text-[#64748B] text-xs mb-2">Crowd Level</p>
            <div className="flex items-center gap-2">
              <span className="text-xl">{crowdStyles.icon}</span>
              <p className={`${crowdStyles.text} text-sm`}>{crowdStyles.label}</p>
            </div>
          </Card>

          {/* Doctor Status */}
          <Card className={`${doctorStyles.bg} rounded-2xl p-4 border-0`}>
            <p className="text-[#64748B] text-xs mb-2">Doctor Status</p>
            <div className="flex items-center gap-2">
              <span className="text-xl">{doctorStyles.icon}</span>
              <p className={`${doctorStyles.text} text-sm`}>{doctorStyles.label}</p>
            </div>
          </Card>
        </div>

        {/* 8️⃣ Auto-Notify Toggle */}
        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-[#0F4C75]" />
            <p className="text-[#1E293B]">Notify me when</p>
          </div>

          <div className="space-y-3">
            {/* 2 patients remaining */}
            <div className="flex items-center justify-between">
              <p className="text-[#64748B] text-sm">2 patients remaining</p>
              <button
                onClick={() => setNotifyTwoPatients(!notifyTwoPatients)}
                className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                  notifyTwoPatients ? "bg-[#2ECC71] justify-end" : "bg-[#E2E8F0] justify-start"
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </button>
            </div>

            {/* My turn starts */}
            <div className="flex items-center justify-between">
              <p className="text-[#64748B] text-sm">My turn starts</p>
              <button
                onClick={() => setNotifyMyTurn(!notifyMyTurn)}
                className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                  notifyMyTurn ? "bg-[#2ECC71] justify-end" : "bg-[#E2E8F0] justify-start"
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </button>
            </div>
          </div>
        </Card>

        {/* 🔟 Emergency Priority Alert (Conditional) */}
        <Card className="bg-[#E74C3C]/5 border border-[#E74C3C]/20 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚑</span>
            <div>
              <p className="text-[#1E293B] mb-1">Emergency case added</p>
              <p className="text-[#64748B] text-sm">Priority applied • Your queue position unchanged</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
