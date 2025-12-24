import { ArrowLeft, Calendar, User, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { useState } from "react";

interface StaffHistoryProps {
  onNavigate?: (screen: string) => void;
}

const historyData = [
  {
    id: 1,
    action: "Added Patient",
    patientName: "Rahul Kumar",
    department: "Cardiology",
    doctor: "Dr. Sarah Johnson",
    timestamp: "10:30 AM",
    date: "Today",
    status: "completed",
    queueNumber: "A-07"
  },
  {
    id: 2,
    action: "Patient Hold",
    patientName: "Priya Sharma",
    department: "Orthopedics",
    doctor: "Dr. Rajesh Kumar",
    timestamp: "10:15 AM",
    date: "Today",
    status: "hold",
    queueNumber: "B-05",
    reason: "Payment pending"
  },
  {
    id: 3,
    action: "Added Patient",
    patientName: "Amit Patel",
    department: "Neurology",
    doctor: "Dr. Kavita Singh",
    timestamp: "09:45 AM",
    date: "Today",
    status: "completed",
    queueNumber: "C-12"
  },
  {
    id: 4,
    action: "Patient Wait",
    patientName: "Sneha Gupta",
    department: "Cardiology",
    doctor: "Dr. Sarah Johnson",
    timestamp: "09:30 AM",
    date: "Today",
    status: "waiting",
    queueNumber: "A-06"
  },
  {
    id: 5,
    action: "Added Patient",
    patientName: "Rohan Verma",
    department: "ENT",
    doctor: "Dr. Amit Patel",
    timestamp: "04:45 PM",
    date: "Yesterday",
    status: "completed",
    queueNumber: "D-18"
  },
  {
    id: 6,
    action: "Patient Hold",
    patientName: "Anita Desai",
    department: "Dermatology",
    doctor: "Dr. Priya Menon",
    timestamp: "03:20 PM",
    date: "Yesterday",
    status: "hold",
    queueNumber: "E-22",
    reason: "Emergency case priority"
  }
];

export function StaffHistory({ onNavigate }: StaffHistoryProps) {
  const [filter, setFilter] = useState("all");

  const filteredHistory = filter === "all" 
    ? historyData 
    : historyData.filter(item => item.date.toLowerCase() === filter);

  const getActionIcon = (action: string) => {
    if (action.includes("Added")) return "➕";
    if (action.includes("Hold")) return "⏸";
    if (action.includes("Wait")) return "⏱";
    return "📝";
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return { bg: "bg-[#2ECC71]/10", text: "text-[#2ECC71]", label: "Completed" };
      case "hold":
        return { bg: "bg-[#F4B400]/10", text: "text-[#F4B400]", label: "On Hold" };
      case "waiting":
        return { bg: "bg-[#1BCED8]/10", text: "text-[#1BCED8]", label: "Waiting" };
      default:
        return { bg: "bg-[#64748B]/10", text: "text-[#64748B]", label: "Unknown" };
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-5 py-4 flex items-center justify-between flex-shrink-0">
        <button 
          onClick={() => onNavigate?.("staffDashboard")}
          className="p-2 -ml-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1E293B]" />
        </button>
        <h2 className="text-[#1E293B]">Activity History</h2>
        <div className="w-9"></div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-[#E2E8F0] px-5 py-3 flex-shrink-0">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === "all"
                ? "bg-[#1BCED8] text-white"
                : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("today")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === "today"
                ? "bg-[#1BCED8] text-white"
                : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter("yesterday")}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === "yesterday"
                ? "bg-[#1BCED8] text-white"
                : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]"
            }`}
          >
            Yesterday
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-5 py-3 grid grid-cols-3 gap-3 flex-shrink-0 bg-white border-b border-[#E2E8F0]">
        <div className="text-center">
          <p className="text-[#1BCED8] text-xl">{historyData.length}</p>
          <p className="text-[#64748B] text-xs">Total Actions</p>
        </div>
        <div className="text-center">
          <p className="text-[#2ECC71] text-xl">{historyData.filter(h => h.action.includes("Added")).length}</p>
          <p className="text-[#64748B] text-xs">Added</p>
        </div>
        <div className="text-center">
          <p className="text-[#F4B400] text-xl">{historyData.filter(h => h.status === "hold").length}</p>
          <p className="text-[#64748B] text-xs">On Hold</p>
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-[#1E293B] mb-2">No activity found</p>
            <p className="text-[#64748B] text-sm">Your actions will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((item) => {
              const statusStyles = getStatusStyles(item.status);
              
              return (
                <Card key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0]">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getActionIcon(item.action)}</span>
                      <div>
                        <p className="text-[#1E293B]">{item.action}</p>
                        <p className="text-[#64748B] text-xs">{item.date} • {item.timestamp}</p>
                      </div>
                    </div>
                    <Badge className={`${statusStyles.bg} ${statusStyles.text} border-0`}>
                      {statusStyles.label}
                    </Badge>
                  </div>

                  {/* Patient Details */}
                  <div className="bg-[#F8FAFC] rounded-xl p-3 mb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#64748B]" />
                        <span className="text-[#1E293B]">{item.patientName}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#0F4C75]">{item.queueNumber}</span>
                      </div>
                      <div className="col-span-2 text-[#64748B] text-xs">
                        {item.department} • {item.doctor}
                      </div>
                    </div>
                  </div>

                  {/* Reason (if hold) */}
                  {item.reason && (
                    <div className="flex items-start gap-2 bg-[#F4B400]/5 rounded-lg p-2">
                      <AlertCircle className="w-4 h-4 text-[#F4B400] flex-shrink-0 mt-0.5" />
                      <p className="text-[#64748B] text-xs">{item.reason}</p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
