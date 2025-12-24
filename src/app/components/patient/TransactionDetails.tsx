import { ArrowLeft, Download } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface TransactionDetailsProps {
  onNavigate?: (screen: string, transactionId?: number) => void;
  transactionId?: number;
}

// Sample appointments data - in real app, this would be fetched from API
const appointments = [
  {
    id: 1,
    doctorName: "Dr. Ananya Sharma",
    department: "Cardiology",
    hospitalName: "Apollo Hospital, Sector 26, Delhi",
    date: "12 Dec 2024",
    time: "10:30 AM",
    consultationFee: 500,
    paymentStatus: "paid",
    paymentMode: "UPI",
    transactionId: "TXN123456789012",
    visitStatus: "completed",
    queueWaitTime: "8 mins"
  },
  {
    id: 2,
    doctorName: "Dr. Rajesh Kumar",
    department: "Orthopedics",
    hospitalName: "Fortis Hospital, Noida",
    date: "08 Dec 2024",
    time: "02:15 PM",
    consultationFee: 800,
    paymentStatus: "paid",
    paymentMode: "Card",
    transactionId: "TXN123456789011",
    visitStatus: "completed",
    queueWaitTime: "12 mins"
  },
  {
    id: 3,
    doctorName: "Dr. Priya Menon",
    department: "General Medicine",
    hospitalName: "Max Healthcare, Saket",
    date: "05 Dec 2024",
    time: "11:00 AM",
    consultationFee: 350,
    paymentStatus: "pending",
    paymentMode: "Cash",
    transactionId: "",
    visitStatus: "completed",
    queueWaitTime: "15 mins"
  },
  {
    id: 4,
    doctorName: "Dr. Sarah Johnson",
    department: "Dermatology",
    hospitalName: "Apollo Hospital, Sector 26, Delhi",
    date: "03 Dec 2024",
    time: "04:45 PM",
    consultationFee: 600,
    paymentStatus: "paid",
    paymentMode: "UPI",
    transactionId: "TXN123456789010",
    visitStatus: "cancelled",
    queueWaitTime: "N/A"
  },
  {
    id: 5,
    doctorName: "Dr. Amit Patel",
    department: "ENT",
    hospitalName: "Medanta Hospital, Gurugram",
    date: "01 Dec 2024",
    time: "09:30 AM",
    consultationFee: 450,
    paymentStatus: "failed",
    paymentMode: "Card",
    transactionId: "",
    visitStatus: "no-show",
    queueWaitTime: "N/A"
  },
  {
    id: 6,
    doctorName: "Dr. Kavita Singh",
    department: "Pediatrics",
    hospitalName: "Fortis Hospital, Noida",
    date: "28 Nov 2024",
    time: "03:00 PM",
    consultationFee: 400,
    paymentStatus: "paid",
    paymentMode: "Wallet",
    transactionId: "TXN123456789009",
    visitStatus: "completed",
    queueWaitTime: "6 mins"
  },
  {
    id: 7,
    doctorName: "Dr. Ramesh Gupta",
    department: "Neurology",
    hospitalName: "Apollo Hospital, Sector 26, Delhi",
    date: "25 Nov 2024",
    time: "10:00 AM",
    consultationFee: 1000,
    paymentStatus: "paid",
    paymentMode: "UPI",
    transactionId: "TXN123456789008",
    visitStatus: "completed",
    queueWaitTime: "10 mins"
  },
];

export function TransactionDetails({ onNavigate, transactionId }: TransactionDetailsProps) {
  // Find appointment by ID, default to first one if not found
  const appointment = appointments.find(apt => apt.id === transactionId) || appointments[0];

  const getPaymentStatusStyles = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-[#2ECC71]/10 text-[#2ECC71] border-0";
      case "pending":
        return "bg-[#F4B400]/10 text-[#F4B400] border-0";
      case "failed":
        return "bg-[#E74C3C]/10 text-[#E74C3C] border-0";
      default:
        return "";
    }
  };

  const getVisitStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#0F4C75]/10 text-[#0F4C75] border-0";
      case "cancelled":
        return "bg-[#94A3B8]/10 text-[#94A3B8] border-0";
      case "no-show":
        return "bg-[#E74C3C]/10 text-[#E74C3C] border-0";
      default:
        return "";
    }
  };

  const getStatusText = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#E2E8F0] px-5 py-4 flex items-center justify-between flex-shrink-0">
        <button 
          onClick={() => onNavigate?.("historyTransaction")}
          className="p-2 -ml-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1E293B]" />
        </button>
        <h2 className="text-[#1E293B]">Transaction Details</h2>
        <div className="w-9"></div>
      </div>

      {/* Details Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <Card className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E8F0]">
          {/* Status Badges */}
          <div className="flex gap-2 mb-5 pb-5 border-b border-[#E2E8F0]">
            <Badge className={getVisitStatusStyles(appointment.visitStatus)}>
              {getStatusText(appointment.visitStatus)}
            </Badge>
            <Badge className={getPaymentStatusStyles(appointment.paymentStatus)}>
              {getStatusText(appointment.paymentStatus)}
            </Badge>
          </div>

          {/* Visit Details Section */}
          <div className="mb-5">
            <h3 className="text-[#1E293B] mb-3">Visit Details</h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#64748B] text-sm mb-1">Visit Date</p>
                  <p className="text-[#1E293B]">{appointment.date}</p>
                </div>
                <div>
                  <p className="text-[#64748B] text-sm mb-1">Visit Time</p>
                  <p className="text-[#1E293B]">{appointment.time}</p>
                </div>
              </div>

              <div>
                <p className="text-[#64748B] text-sm mb-1">Hospital Name</p>
                <p className="text-[#1E293B]">{appointment.hospitalName}</p>
              </div>

              <div>
                <p className="text-[#64748B] text-sm mb-1">Department</p>
                <p className="text-[#1E293B]">{appointment.department}</p>
              </div>

              <div>
                <p className="text-[#64748B] text-sm mb-1">Doctor Name</p>
                <p className="text-[#1E293B]">{appointment.doctorName}</p>
              </div>
            </div>
          </div>

          {/* Payment Information Section */}
          <div className="mb-6 pt-5 border-t border-[#E2E8F0]">
            <h3 className="text-[#1E293B] mb-3">Payment Information</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-[#64748B] text-sm mb-1">Amount Paid</p>
                <p className="text-[#1E293B] text-xl">₹{appointment.consultationFee}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#64748B] text-sm mb-1">Payment Status</p>
                  <Badge className={getPaymentStatusStyles(appointment.paymentStatus)}>
                    {getStatusText(appointment.paymentStatus)}
                  </Badge>
                </div>
                <div>
                  <p className="text-[#64748B] text-sm mb-1">Payment Mode</p>
                  <p className="text-[#1E293B]">{appointment.paymentMode}</p>
                </div>
              </div>

              {appointment.paymentStatus === "paid" && (
                <div>
                  <p className="text-[#64748B] text-sm mb-1">Transaction ID</p>
                  <p className="text-[#1E293B] font-mono text-sm">{appointment.transactionId}</p>
                </div>
              )}
            </div>
          </div>

          {/* Download Button */}
          {appointment.paymentStatus === "paid" && (
            <Button className="w-full bg-[#0F4C75] hover:bg-[#0F4C75]/90 text-white rounded-xl py-3 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Receipt
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}