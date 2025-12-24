import { Check, MapPin, Calendar, Clock, Sparkles, Bell, Home } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface ConfirmAppointmentProps {
  onNavigate?: (screen: string, orderId?: number) => void;
}

export function ConfirmAppointment({ onNavigate }: ConfirmAppointmentProps) {
  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-8">
        {/* Success Icon - Centered */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-[#2ECC71]/10 rounded-full flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-[#2ECC71]/20 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-[#2ECC71] stroke-[3]" />
            </div>
          </div>
          <h2 className="text-[#1E293B] mb-1">Appointment Confirmed ✅</h2>
          <p className="text-[#64748B] text-sm text-center">Your visit has been successfully scheduled</p>
        </div>

        {/* APPOINTMENT SUMMARY CARD */}
        <Card className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E8F0] mb-4">
          <h3 className="text-[#1E293B] mb-4">Appointment Summary</h3>

          {/* Doctor & Hospital */}
          <div className="pb-4 border-b border-[#E2E8F0] mb-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-[#0F4C75]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-10 h-10 bg-[#0F4C75]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#0F4C75]">👨‍⚕️</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[#1E293B]">Dr. Sarah Johnson</p>
                <p className="text-[#64748B] text-sm">General Physician</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#64748B] text-sm">
              <MapPin className="w-4 h-4" />
              <span>Apollo Hospital, Sector 26, Delhi</span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="pb-4 border-b border-[#E2E8F0] mb-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F8FAFC] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-[#64748B]" />
                  <p className="text-[#64748B] text-xs">Date</p>
                </div>
                <p className="text-[#1E293B]">Mon, Dec 23</p>
              </div>
              <div className="bg-[#F8FAFC] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-[#64748B]" />
                  <p className="text-[#64748B] text-xs">Time Slot</p>
                </div>
                <p className="text-[#1E293B]">10:30 AM</p>
              </div>
            </div>
          </div>

          {/* QueueLess AI Info */}
          <div className="bg-gradient-to-br from-[#1BCED8]/5 to-[#1BCED8]/10 rounded-xl p-4">
            <div className="flex items-start gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#1BCED8] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#1E293B] text-sm mb-1">Expected waiting: 12 minutes</p>
                <p className="text-[#1E293B] text-sm">Arrival window: 10:40 – 10:55 AM</p>
              </div>
            </div>
            <p className="text-[#64748B] text-xs mt-2">
              Arrival within this window helps reduce waiting
            </p>
          </div>
        </Card>

        {/* AI ASSURANCE STRIP */}
        <div className="bg-gradient-to-r from-[#1BCED8]/10 to-[#1BCED8]/5 border border-[#1BCED8]/20 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#1BCED8]/10 rounded-lg flex-shrink-0">
              <Sparkles className="w-4 h-4 text-[#1BCED8]" />
            </div>
            <p className="text-[#1E293B] text-sm">
              QueueLess will monitor the queue and notify you if timings change.
            </p>
          </div>
        </div>

        {/* NOTIFICATION CONFIRMATION */}
        <Card className="bg-white rounded-xl p-4 shadow-sm border border-[#E2E8F0]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#2ECC71]/10 rounded-lg">
                <Bell className="w-5 h-5 text-[#2ECC71]" />
              </div>
              <div>
                <p className="text-[#1E293B] text-sm">Notifications enabled</p>
                <p className="text-[#64748B] text-xs">You'll be notified when it's time to leave</p>
              </div>
            </div>
            <div className="w-10 h-6 bg-[#2ECC71] rounded-full flex items-center justify-end px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons - Sticky Bottom */}
      <div className="bg-white border-t border-[#E2E8F0] px-5 py-4 flex-shrink-0">
        <Button 
          onClick={() => onNavigate?.("dashboard")}
          className="w-full bg-[#0F4C75] hover:bg-[#0F4C75]/90 text-white rounded-xl py-3 mb-3"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
        <Button 
          variant="outline"
          className="w-full border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] rounded-xl py-3"
        >
          Add to Calendar
        </Button>
      </div>
    </div>
  );
}