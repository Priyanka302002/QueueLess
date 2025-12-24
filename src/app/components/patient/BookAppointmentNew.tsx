import { ArrowLeft, HelpCircle, MapPin, ChevronDown, User, Clock, Sparkles } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";

interface BookAppointmentNewProps {
  onNavigate?: (screen: string, orderId?: number) => void;
}

export function BookAppointmentNew({ onNavigate }: BookAppointmentNewProps) {
  const [selectedDept, setSelectedDept] = useState("General");
  const [selectedDate, setSelectedDate] = useState("Mon 23");
  const [selectedSlot, setSelectedSlot] = useState("");

  const departments = ["General", "Ortho", "Gynac", "ENT"];
  const dates = ["Mon 23", "Tue 24", "Wed 25", "Thu 26"];
  const slots = [
    { time: "09:00 AM", status: "available" },
    { time: "09:30 AM", status: "available" },
    { time: "10:00 AM", status: "limited" },
    { time: "10:30 AM", status: "available" },
    { time: "11:00 AM", status: "available" },
    { time: "11:30 AM", status: "limited" },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Simple Top App Bar */}
      <div className="bg-white border-b border-[#E2E8F0] px-5 py-4 flex items-center justify-between flex-shrink-0">
        <button 
          onClick={() => onNavigate?.("dashboard")}
          className="p-2 -ml-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#1E293B]" />
        </button>
        <h2 className="text-[#1E293B]">Book Appointment</h2>
        <button className="p-2 -mr-2 hover:bg-[#F8FAFC] rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5 text-[#64748B]" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* PRIMARY CARD: Choose Your Visit */}
        <Card className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E8F0] mb-4">
          <h3 className="text-[#1E293B] mb-4">Choose Your Visit</h3>

          {/* Hospital Selector */}
          <div className="mb-5">
            <label className="text-[#64748B] text-sm mb-2 block">Hospital</label>
            <button className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 flex items-center justify-between hover:border-[#0F4C75] transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <MapPin className="w-4 h-4 text-[#0F4C75]" />
                </div>
                <div className="text-left">
                  <p className="text-[#1E293B] text-sm">Apollo Hospital</p>
                  <p className="text-[#64748B] text-xs">Sector 26, Delhi</p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-[#64748B]" />
            </button>
            <div className="flex items-center gap-1 mt-2">
              <Sparkles className="w-3 h-3 text-[#2ECC71]" />
              <p className="text-[#2ECC71] text-xs">Lower waiting time today</p>
            </div>
          </div>

          {/* Department Selector */}
          <div className="mb-5">
            <label className="text-[#64748B] text-sm mb-2 block">Department</label>
            <div className="grid grid-cols-4 gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`py-2 px-3 rounded-lg text-sm transition-all ${
                    selectedDept === dept
                      ? "bg-[#0F4C75] text-white"
                      : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:border-[#0F4C75]"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Doctor Selector */}
          <div>
            <label className="text-[#64748B] text-sm mb-2 block">Doctor</label>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#0F4C75]/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[#0F4C75]" />
                </div>
                <div className="flex-1">
                  <p className="text-[#1E293B] text-sm">Dr. Sarah Johnson</p>
                  <p className="text-[#64748B] text-xs">General Physician</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#64748B]" />
                    <p className="text-[#64748B] text-xs">~15 min</p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-[#0F4C75] text-[#0F4C75] hover:bg-[#0F4C75]/5 rounded-lg"
              >
                Change Doctor
              </Button>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Sparkles className="w-3 h-3 text-[#1BCED8]" />
              <p className="text-[#64748B] text-xs">Recommended based on queue speed</p>
            </div>
          </div>
        </Card>

        {/* SECONDARY CARD: Date & Slot */}
        <Card className="bg-white rounded-2xl p-5 shadow-sm border border-[#E2E8F0] mb-4">
          <h3 className="text-[#1E293B] mb-4">Date & Slot</h3>

          {/* Date Selector */}
          <div className="mb-5">
            <label className="text-[#64748B] text-sm mb-2 block">Date</label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {dates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedDate === date
                      ? "bg-[#0F4C75] text-white"
                      : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:border-[#0F4C75]"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* Slot Selector */}
          <div>
            <label className="text-[#64748B] text-sm mb-2 block">Time Slot</label>
            <div className="grid grid-cols-2 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`py-2.5 px-3 rounded-lg text-sm transition-all flex items-center justify-between ${
                    selectedSlot === slot.time
                      ? "bg-[#0F4C75] text-white border-2 border-[#0F4C75]"
                      : "bg-[#F8FAFC] text-[#1E293B] border border-[#E2E8F0] hover:border-[#0F4C75]"
                  }`}
                >
                  <span>{slot.time}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedSlot === slot.time
                        ? "bg-white"
                        : slot.status === "available"
                        ? "bg-[#2ECC71]"
                        : "bg-[#F4B400]"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* AI SUMMARY STRIP */}
        <div className="bg-gradient-to-r from-[#1BCED8]/10 to-[#1BCED8]/5 border border-[#1BCED8]/20 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#1BCED8]/10 rounded-lg">
              <Sparkles className="w-4 h-4 text-[#1BCED8]" />
            </div>
            <div className="flex-1">
              <p className="text-[#1E293B] text-sm mb-1">Expected waiting: ~12 minutes</p>
              <p className="text-[#64748B] text-xs">Best arrival time: 10:40–10:55 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRM SECTION - Sticky Bottom */}
      <div className="bg-white border-t border-[#E2E8F0] px-5 py-4 flex-shrink-0">
        <Button 
          onClick={() => onNavigate?.("payment")}
          className="w-full bg-[#0F4C75] hover:bg-[#0F4C75]/90 text-white rounded-xl py-3"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}