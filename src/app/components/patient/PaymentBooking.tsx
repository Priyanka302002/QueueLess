import { ArrowLeft, CreditCard, Smartphone, Wallet, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";

interface PaymentBookingProps {
  onNavigate?: (screen: string) => void;
}

export function PaymentBooking({ onNavigate }: PaymentBookingProps) {
  const [selectedPayment, setSelectedPayment] = useState("upi");

  const appointmentDetails = {
    doctorName: "Dr. Sarah Johnson",
    specialization: "General Physician",
    hospital: "Apollo Hospital, Sector 26, Delhi",
    date: "Mon, Dec 23",
    time: "10:30 AM",
    amount: 500,
    estimatedWaitTime: "12 mins",
    arrivalWindow: "10:40 – 10:55 AM"
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      onNavigate?.("confirm");
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-5 py-4 flex items-center justify-between flex-shrink-0">
        <button 
          onClick={() => onNavigate?.("book")}
          className="p-2 -ml-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1E293B]" />
        </button>
        <h2 className="text-[#1E293B]">Payment</h2>
        <div className="w-9"></div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {/* Appointment Summary */}
        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] mb-4">
          <p className="text-[#64748B] text-sm mb-3">Appointment Details</p>
          <div className="mb-3">
            <p className="text-[#1E293B]">{appointmentDetails.doctorName}</p>
            <p className="text-[#64748B] text-sm">{appointmentDetails.specialization}</p>
          </div>
          <div className="flex items-center gap-2 text-[#64748B] text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{appointmentDetails.hospital}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#E2E8F0]">
            <div>
              <p className="text-[#64748B] text-xs">Date & Time</p>
              <p className="text-[#1E293B] text-sm">{appointmentDetails.date}</p>
              <p className="text-[#1E293B] text-sm">{appointmentDetails.time}</p>
            </div>
            <div className="text-right">
              <p className="text-[#64748B] text-xs">Consultation Fee</p>
              <p className="text-[#0F4C75] text-xl">₹{appointmentDetails.amount}</p>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0] mb-4">
          <p className="text-[#1E293B] mb-3">Select Payment Method</p>
          
          <div className="space-y-3">
            {/* UPI */}
            <button
              onClick={() => setSelectedPayment("upi")}
              className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                selectedPayment === "upi" 
                  ? "border-[#0F4C75] bg-[#0F4C75]/5" 
                  : "border-[#E2E8F0] bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedPayment === "upi" ? "bg-[#0F4C75]/10" : "bg-[#F8FAFC]"
                }`}>
                  <Smartphone className={`w-5 h-5 ${
                    selectedPayment === "upi" ? "text-[#0F4C75]" : "text-[#64748B]"
                  }`} />
                </div>
                <div className="text-left">
                  <p className="text-[#1E293B] text-sm">UPI</p>
                  <p className="text-[#64748B] text-xs">Google Pay, PhonePe, Paytm</p>
                </div>
              </div>
              {selectedPayment === "upi" && (
                <CheckCircle2 className="w-5 h-5 text-[#0F4C75]" />
              )}
            </button>

            {/* Credit/Debit Card */}
            <button
              onClick={() => setSelectedPayment("card")}
              className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                selectedPayment === "card" 
                  ? "border-[#0F4C75] bg-[#0F4C75]/5" 
                  : "border-[#E2E8F0] bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedPayment === "card" ? "bg-[#0F4C75]/10" : "bg-[#F8FAFC]"
                }`}>
                  <CreditCard className={`w-5 h-5 ${
                    selectedPayment === "card" ? "text-[#0F4C75]" : "text-[#64748B]"
                  }`} />
                </div>
                <div className="text-left">
                  <p className="text-[#1E293B] text-sm">Credit/Debit Card</p>
                  <p className="text-[#64748B] text-xs">Visa, Mastercard, Rupay</p>
                </div>
              </div>
              {selectedPayment === "card" && (
                <CheckCircle2 className="w-5 h-5 text-[#0F4C75]" />
              )}
            </button>

            {/* Wallet */}
            <button
              onClick={() => setSelectedPayment("wallet")}
              className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                selectedPayment === "wallet" 
                  ? "border-[#0F4C75] bg-[#0F4C75]/5" 
                  : "border-[#E2E8F0] bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedPayment === "wallet" ? "bg-[#0F4C75]/10" : "bg-[#F8FAFC]"
                }`}>
                  <Wallet className={`w-5 h-5 ${
                    selectedPayment === "wallet" ? "text-[#0F4C75]" : "text-[#64748B]"
                  }`} />
                </div>
                <div className="text-left">
                  <p className="text-[#1E293B] text-sm">Wallet</p>
                  <p className="text-[#64748B] text-xs">Paytm, Amazon Pay</p>
                </div>
              </div>
              {selectedPayment === "wallet" && (
                <CheckCircle2 className="w-5 h-5 text-[#0F4C75]" />
              )}
            </button>
          </div>
        </Card>

        {/* Estimated Wait Time */}
        <Card className="bg-gradient-to-br from-[#1BCED8]/5 to-[#1BCED8]/10 border border-[#1BCED8]/20 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-[#1BCED8]" />
            <p className="text-[#1E293B]">Estimated Wait Time</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3">
            <p className="text-[#64748B] text-xs mb-1">Expected waiting</p>
            <p className="text-[#1BCED8] text-2xl mb-2">{appointmentDetails.estimatedWaitTime}</p>
            <p className="text-[#64748B] text-xs">Arrival window</p>
            <p className="text-[#1E293B]">{appointmentDetails.arrivalWindow}</p>
          </div>
          <p className="text-[#64748B] text-xs mt-3">
            ✨ AI-powered prediction based on real-time queue data
          </p>
        </Card>

        {/* Location */}
        <Card className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-[#0F4C75]" />
            <p className="text-[#1E293B]">Location</p>
          </div>
          <p className="text-[#64748B] text-sm mb-3">{appointmentDetails.hospital}</p>
          <Button 
            variant="outline"
            className="w-full border-[#0F4C75] text-[#0F4C75] hover:bg-[#0F4C75]/5 rounded-xl"
          >
            View on Map
          </Button>
        </Card>
      </div>

      {/* Payment Button - Sticky Bottom */}
      <div className="bg-white border-t border-[#E2E8F0] px-5 py-4 flex-shrink-0">
        <Button 
          onClick={handlePayment}
          className="w-full bg-[#2ECC71] hover:bg-[#2ECC71]/90 text-white rounded-xl py-3 flex items-center justify-center gap-2"
        >
          <span>Pay ₹{appointmentDetails.amount}</span>
        </Button>
        <p className="text-[#64748B] text-xs text-center mt-2">
          🔒 Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
}
