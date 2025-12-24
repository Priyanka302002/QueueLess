import { ArrowLeft, Calendar, Clock, ChevronRight, Hash, Timer } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState } from "react";

interface HistoryTransactionProps {
  onNavigate?: (screen: string, transactionId?: number) => void;
}

const visits = [
  {
    id: 1,
    doctorName: "Dr. Ananya Sharma",
    department: "Cardiology",
    hospitalName: "Apollo Hospital",
    date: "12 Dec 2024",
    time: "10:30 AM",
    queueNumber: "A-12",
    waitedTime: "8 mins",
    averageWaitTime: "14 mins",
    consultationFee: 500,
    paymentStatus: "paid",
    paymentMode: "UPI",
    transactionId: "TXN123456789012",
    visitStatus: "completed"
  },
  {
    id: 2,
    doctorName: "Dr. Rajesh Kumar",
    department: "Orthopedics",
    hospitalName: "Fortis Hospital",
    date: "08 Dec 2024",
    time: "02:15 PM",
    queueNumber: "B-08",
    waitedTime: "12 mins",
    averageWaitTime: "18 mins",
    consultationFee: 800,
    paymentStatus: "paid",
    paymentMode: "Card",
    transactionId: "TXN123456789011",
    visitStatus: "completed"
  },
  {
    id: 3,
    doctorName: "Dr. Priya Menon",
    department: "General Medicine",
    hospitalName: "Max Healthcare",
    date: "05 Dec 2024",
    time: "11:00 AM",
    queueNumber: "C-15",
    waitedTime: "15 mins",
    averageWaitTime: "12 mins",
    consultationFee: 350,
    paymentStatus: "pending",
    paymentMode: "Cash",
    transactionId: "",
    visitStatus: "completed"
  },
  {
    id: 4,
    doctorName: "Dr. Sarah Johnson",
    department: "Dermatology",
    hospitalName: "Apollo Hospital",
    date: "03 Dec 2024",
    time: "04:45 PM",
    queueNumber: "D-22",
    waitedTime: "N/A",
    averageWaitTime: "10 mins",
    consultationFee: 600,
    paymentStatus: "paid",
    paymentMode: "UPI",
    transactionId: "TXN123456789010",
    visitStatus: "cancelled"
  },
  {
    id: 5,
    doctorName: "Dr. Amit Patel",
    department: "ENT",
    hospitalName: "Medanta Hospital",
    date: "01 Dec 2024",
    time: "09:30 AM",
    queueNumber: "E-05",
    waitedTime: "N/A",
    averageWaitTime: "8 mins",
    consultationFee: 450,
    paymentStatus: "failed",
    paymentMode: "Card",
    transactionId: "",
    visitStatus: "no-show"
  },
  {
    id: 6,
    doctorName: "Dr. Kavita Singh",
    department: "Pediatrics",
    hospitalName: "Fortis Hospital",
    date: "28 Nov 2024",
    time: "03:00 PM",
    queueNumber: "F-18",
    waitedTime: "6 mins",
    averageWaitTime: "11 mins",
    consultationFee: 400,
    paymentStatus: "paid",
    paymentMode: "Wallet",
    transactionId: "TXN123456789009",
    visitStatus: "completed"
  },
  {
    id: 7,
    doctorName: "Dr. Ramesh Gupta",
    department: "Neurology",
    hospitalName: "Apollo Hospital",
    date: "25 Nov 2024",
    time: "10:00 AM",
    queueNumber: "G-10",
    waitedTime: "10 mins",
    averageWaitTime: "15 mins",
    consultationFee: 1000,
    paymentStatus: "paid",
    paymentMode: "UPI",
    transactionId: "TXN123456789008",
    visitStatus: "completed"
  },
];

export function HistoryTransaction({ onNavigate }: HistoryTransactionProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const getVisitStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#2ECC71]/10 text-[#2ECC71] border-0";
      case "cancelled":
        return "bg-[#E74C3C]/10 text-[#E74C3C] border-0";
      case "no-show":
        return "bg-[#94A3B8]/10 text-[#94A3B8] border-0";
      default:
        return "";
    }
  };

  const getStatusText = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getAIInsight = (waitedTime: string, averageWaitTime: string) => {
    if (waitedTime === "N/A") return null;
    
    const waited = parseInt(waitedTime);
    const average = parseInt(averageWaitTime);
    const diff = average - waited;
    
    if (diff > 0) {
      return `🧠 You waited ${diff} mins less than average today`;
    } else if (diff < 0) {
      return `⏱️ Wait time was ${Math.abs(diff)} mins more than usual`;
    }
    return null;
  };

  const filteredVisits = visits.filter(visit => {
    if (activeFilter === "all") return true;
    return visit.visitStatus === activeFilter;
  });

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
        <h2 className="text-[#1E293B]">My Visits</h2>
        <div className="w-9"></div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-[#E2E8F0] px-5 py-3 flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              activeFilter === "all"
                ? "bg-[#0F4C75] text-white"
                : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("completed")}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              activeFilter === "completed"
                ? "bg-[#0F4C75] text-white"
                : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveFilter("cancelled")}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              activeFilter === "cancelled"
                ? "bg-[#0F4C75] text-white"
                : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]"
            }`}
          >
            Cancelled
          </button>
          <button
            onClick={() => setActiveFilter("no-show")}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              activeFilter === "no-show"
                ? "bg-[#0F4C75] text-white"
                : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]"
            }`}
          >
            No-Show
          </button>
        </div>
      </div>

      {/* Visit List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {filteredVisits.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center h-full px-8">
            <div className="text-6xl mb-4">📅❤️</div>
            <p className="text-[#1E293B] mb-2">No visits yet</p>
            <p className="text-[#64748B] text-sm text-center mb-6">
              Your visit history will appear here
            </p>
            <Button
              onClick={() => onNavigate?.("book")}
              className="bg-[#0F4C75] hover:bg-[#0F4C75]/90 text-white rounded-xl px-6 py-2"
            >
              Book your first appointment
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredVisits.map((visit) => {
              const aiInsight = getAIInsight(visit.waitedTime, visit.averageWaitTime);
              
              return (
                <Card key={visit.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0]">
                  {/* Row 1 - Doctor Info & Status */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-[#1E293B]">{visit.doctorName}</p>
                      <p className="text-[#64748B] text-sm">{visit.department}</p>
                    </div>
                    <Badge className={getVisitStatusStyles(visit.visitStatus)}>
                      {getStatusText(visit.visitStatus)}
                    </Badge>
                  </div>

                  {/* Row 2 - Visit Details (2 columns) */}
                  <div className="grid grid-cols-2 gap-4 mb-3 pb-3 border-b border-[#E2E8F0]">
                    {/* Left Column */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#64748B]" />
                        <span className="text-[#64748B] text-sm">{visit.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#64748B]" />
                        <span className="text-[#64748B] text-sm">{visit.time}</span>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <Hash className="w-4 h-4 text-[#64748B]" />
                        <span className="text-[#64748B] text-sm">{visit.queueNumber}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Timer className="w-4 h-4 text-[#64748B]" />
                        <span className="text-[#64748B] text-sm">{visit.waitedTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Row 3 - AI Insight (Optional) */}
                  {aiInsight && (
                    <div className="bg-[#EEF8F9] rounded-lg p-3 mb-3">
                      <p className="text-[#1E293B] text-sm">{aiInsight}</p>
                    </div>
                  )}

                  {/* Row 4 - Action */}
                  <button 
                    onClick={() => onNavigate?.("transactionDetails", visit.id)}
                    className="text-[#0F4C75] text-sm flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}