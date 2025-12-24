import { ArrowLeft, Download } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface OrderDetailsProps {
  onNavigate?: (screen: string, orderId?: number) => void;
  orderId?: number;
}

export function OrderDetails({ onNavigate }: OrderDetailsProps) {
  // Sample order data - in real app, this would be fetched based on orderId
  const orderDetails = {
    doctorName: "Dr. Ananya Sharma",
    specialization: "Cardiologist",
    hospitalName: "Apollo Hospital, Sector 26, Delhi",
    date: "12 Dec 2024",
    time: "10:30 AM",
    amount: 500,
    status: "paid",
    paymentMode: "UPI",
    transactionId: "TXN123456789012"
  };

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
          onClick={() => onNavigate?.("orderHistory")}
          className="p-2 -ml-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1E293B]" />
        </button>
        <h2 className="text-[#1E293B]">Order Details</h2>
        <div className="w-9"></div>
      </div>

      {/* Details Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <Card className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E8F0]">
          {/* Doctor Name */}
          <div className="mb-5 pb-5 border-b border-[#E2E8F0]">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-[#1E293B] text-lg mb-1">{orderDetails.doctorName}</p>
                <p className="text-[#64748B] text-sm">{orderDetails.specialization}</p>
              </div>
              <Badge className={getStatusStyles(orderDetails.status)}>
                {getStatusText(orderDetails.status)}
              </Badge>
            </div>
          </div>

          {/* Hospital Name */}
          <div className="mb-4">
            <p className="text-[#64748B] text-sm mb-1">Hospital</p>
            <p className="text-[#1E293B]">{orderDetails.hospitalName}</p>
          </div>

          {/* Visit Date & Time */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-[#64748B] text-sm mb-1">Visit Date</p>
              <p className="text-[#1E293B]">{orderDetails.date}</p>
            </div>
            <div>
              <p className="text-[#64748B] text-sm mb-1">Visit Time</p>
              <p className="text-[#1E293B]">{orderDetails.time}</p>
            </div>
          </div>

          {/* Amount Paid */}
          <div className="mb-4">
            <p className="text-[#64748B] text-sm mb-1">Amount Paid</p>
            <p className="text-[#1E293B] text-xl">₹{orderDetails.amount}</p>
          </div>

          {/* Payment Mode */}
          <div className="mb-4">
            <p className="text-[#64748B] text-sm mb-1">Payment Mode</p>
            <p className="text-[#1E293B]">{orderDetails.paymentMode}</p>
          </div>

          {/* Transaction ID */}
          <div className="mb-6">
            <p className="text-[#64748B] text-sm mb-1">Transaction ID</p>
            <p className="text-[#1E293B] font-mono text-sm">{orderDetails.transactionId}</p>
          </div>

          {/* Download Button */}
          <Button className="w-full bg-[#0F4C75] hover:bg-[#0F4C75]/90 text-white rounded-xl py-3 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download Receipt
          </Button>
        </Card>
      </div>
    </div>
  );
}