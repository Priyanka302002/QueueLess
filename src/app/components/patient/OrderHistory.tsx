import { ArrowLeft, Calendar, Clock, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface OrderHistoryProps {
  onNavigate?: (screen: string, orderId?: number) => void;
}

const orders = [
  {
    id: 1,
    doctorName: "Dr. Ananya Sharma",
    specialization: "Cardiologist",
    date: "12 Dec 2024",
    time: "10:30 AM",
    amount: 500,
    status: "paid"
  },
  {
    id: 2,
    doctorName: "Dr. Rajesh Kumar",
    specialization: "Orthopedic",
    date: "08 Dec 2024",
    time: "02:15 PM",
    amount: 800,
    status: "paid"
  },
  {
    id: 3,
    doctorName: "Dr. Priya Menon",
    specialization: "General Physician",
    date: "05 Dec 2024",
    time: "11:00 AM",
    amount: 350,
    status: "pending"
  },
  {
    id: 4,
    doctorName: "Dr. Sarah Johnson",
    specialization: "Dermatologist",
    date: "01 Dec 2024",
    time: "04:45 PM",
    amount: 600,
    status: "paid"
  },
  {
    id: 5,
    doctorName: "Dr. Amit Patel",
    specialization: "ENT Specialist",
    date: "28 Nov 2024",
    time: "09:30 AM",
    amount: 450,
    status: "failed"
  },
];

export function OrderHistory({ onNavigate }: OrderHistoryProps) {
  const getStatusStyles = (status: string) => {
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

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#E2E8F0] px-5 py-4 flex items-center justify-between flex-shrink-0">
        <button 
          onClick={() => onNavigate?.("dashboard")}
          className="p-2 -ml-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1E293B]" />
        </button>
        <h2 className="text-[#1E293B]">Order History</h2>
        <div className="w-9"></div>
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {orders.map((order) => (
            <Card key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0]">
              {/* Row 1 - Doctor Info */}
              <div className="mb-2">
                <p className="text-[#1E293B]">{order.doctorName}</p>
                <p className="text-[#64748B] text-sm">{order.specialization}</p>
              </div>

              {/* Row 2 - Visit Date & Time */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#64748B]" />
                  <span className="text-[#64748B] text-sm">{order.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#64748B]" />
                  <span className="text-[#64748B] text-sm">{order.time}</span>
                </div>
              </div>

              {/* Row 3 - Payment Summary */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#E2E8F0]">
                <p className="text-[#1E293B]">₹{order.amount}</p>
                <Badge className={getStatusStyles(order.status)}>
                  {getStatusText(order.status)}
                </Badge>
              </div>

              {/* Row 4 - Action */}
              <button 
                onClick={() => onNavigate?.("orderDetails", order.id)}
                className="text-[#0F4C75] text-sm flex items-center gap-1 hover:gap-2 transition-all"
              >
                View Details
                <ChevronRight className="w-4 h-4" />
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}