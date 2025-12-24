import { ArrowLeft, Calendar, ChevronRight, Clock, Sparkles, User } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";

interface BookAppointmentProps {
  onNavigate: (screen: string) => void;
}

export function BookAppointment({ onNavigate }: BookAppointmentProps) {
  const [step, setStep] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const departments = [
    { id: "cardiology", name: "Cardiology", icon: "❤️", available: 3 },
    { id: "neurology", name: "Neurology", icon: "🧠", available: 2 },
    { id: "orthopedics", name: "Orthopedics", icon: "🦴", available: 4 },
    { id: "pediatrics", name: "Pediatrics", icon: "👶", available: 5 },
    { id: "dermatology", name: "Dermatology", icon: "✨", available: 3 },
    { id: "general", name: "General Medicine", icon: "🏥", available: 6 },
  ];

  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialization: "Senior Cardiologist",
      experience: "15 years",
      rating: 4.8,
      available: true,
      nextSlot: "10:30 AM",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialization: "Cardiologist",
      experience: "12 years",
      rating: 4.6,
      available: true,
      nextSlot: "11:00 AM",
    },
    {
      id: "3",
      name: "Dr. Priya Sharma",
      specialization: "Consultant Cardiologist",
      experience: "18 years",
      rating: 4.9,
      available: false,
      nextSlot: "Tomorrow",
    },
  ];

  const timeSlots = [
    { time: "09:00 AM", status: "available" },
    { time: "09:30 AM", status: "available" },
    { time: "10:00 AM", status: "limited" },
    { time: "10:30 AM", status: "available" },
    { time: "11:00 AM", status: "available" },
    { time: "11:30 AM", status: "limited" },
    { time: "12:00 PM", status: "full" },
    { time: "02:00 PM", status: "available" },
    { time: "02:30 PM", status: "available" },
    { time: "03:00 PM", status: "available" },
    { time: "03:30 PM", status: "limited" },
    { time: "04:00 PM", status: "full" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F4C75] to-[#1BCED8] px-6 pt-8 pb-6 rounded-b-[32px]">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => (step === 1 ? onNavigate("dashboard") : setStep(step - 1))}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white flex-1">Book Appointment</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`h-1 flex-1 rounded-full ${
                  s <= step ? "bg-white" : "bg-white/20"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Step 1: Select Department */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-[#1E293B] mb-2">Select Department</h2>
              <p className="text-[#64748B]">Choose the department you want to visit</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {departments.map((dept) => (
                <Card
                  key={dept.id}
                  onClick={() => {
                    setSelectedDepartment(dept.id);
                    setStep(2);
                  }}
                  className="bg-white border-[#E2E8F0] rounded-2xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:border-[#0F4C75] transition-all"
                >
                  <div className="text-4xl mb-3">{dept.icon}</div>
                  <p className="text-[#1E293B] mb-1">{dept.name}</p>
                  <Badge variant="secondary" className="bg-[#2ECC71]/10 text-[#2ECC71] border-0">
                    {dept.available} doctors available
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Doctor */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-[#1E293B] mb-2">Select Doctor</h2>
              <p className="text-[#64748B]">Choose your preferred doctor</p>
            </div>

            <div className="space-y-3">
              {doctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  onClick={() => {
                    if (doctor.available) {
                      setSelectedDoctor(doctor.id);
                      setStep(3);
                    }
                  }}
                  className={`bg-white border-[#E2E8F0] rounded-2xl p-5 shadow-sm ${
                    doctor.available
                      ? "cursor-pointer hover:shadow-md hover:border-[#0F4C75] transition-all"
                      : "opacity-50"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-[#0F4C75]/10 rounded-xl flex items-center justify-center">
                      <User className="w-8 h-8 text-[#0F4C75]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="text-[#1E293B]">{doctor.name}</p>
                          <p className="text-[#64748B] text-sm">{doctor.specialization}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[#F4B400]">⭐</span>
                          <span className="text-[#1E293B]">{doctor.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-[#64748B] text-sm">{doctor.experience} exp.</p>
                        <Badge
                          variant={doctor.available ? "default" : "secondary"}
                          className={
                            doctor.available
                              ? "bg-[#2ECC71]/10 text-[#2ECC71] border-0"
                              : "bg-[#94A3B8]/10 text-[#94A3B8] border-0"
                          }
                        >
                          {doctor.available ? `Next: ${doctor.nextSlot}` : doctor.nextSlot}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select Time Slot */}
        {step === 3 && (
          <div className="space-y-4">
            {/* AI Recommendation */}
            <Card className="bg-gradient-to-r from-[#1BCED8]/10 to-[#1BCED8]/5 border-[#1BCED8]/20 p-4 rounded-2xl">
              <div className="flex gap-3">
                <div className="p-2 bg-[#1BCED8]/10 rounded-lg h-fit">
                  <Sparkles className="w-5 h-5 text-[#1BCED8]" />
                </div>
                <div className="flex-1">
                  <p className="text-[#1E293B] mb-1">AI Recommendation</p>
                  <p className="text-[#64748B] text-sm">
                    Based on today's load, best arrival time is 11:20 - 11:40 AM for minimal
                    waiting
                  </p>
                </div>
              </div>
            </Card>

            <div>
              <h2 className="text-[#1E293B] mb-2">Select Time Slot</h2>
              <p className="text-[#64748B]">Choose your preferred time</p>
            </div>

            {/* Date Selector */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[0, 1, 2, 3, 4].map((day) => {
                const date = new Date();
                date.setDate(date.getDate() + day);
                const isToday = day === 0;

                return (
                  <button
                    key={day}
                    className={`flex-shrink-0 px-6 py-3 rounded-xl border-2 ${
                      isToday
                        ? "bg-[#0F4C75] border-[#0F4C75] text-white"
                        : "bg-white border-[#E2E8F0] text-[#1E293B]"
                    }`}
                  >
                    <p className="text-sm mb-1">
                      {isToday ? "Today" : date.toLocaleDateString("en", { weekday: "short" })}
                    </p>
                    <p className="text-lg">{date.getDate()}</p>
                  </button>
                );
              })}
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((slot) => {
                const getSlotStyle = () => {
                  if (slot.status === "full")
                    return "bg-[#94A3B8]/10 border-[#94A3B8]/30 text-[#94A3B8] cursor-not-allowed";
                  if (slot.status === "limited")
                    return "bg-[#F4B400]/10 border-[#F4B400] text-[#F4B400] hover:bg-[#F4B400]/20 cursor-pointer";
                  return "bg-white border-[#2ECC71] text-[#2ECC71] hover:bg-[#2ECC71]/10 cursor-pointer";
                };

                return (
                  <button
                    key={slot.time}
                    disabled={slot.status === "full"}
                    className={`p-4 rounded-xl border-2 transition-all ${getSlotStyle()}`}
                  >
                    <Clock className="w-5 h-5 mx-auto mb-2" />
                    <p className="text-sm">{slot.time}</p>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <Card className="bg-white border-[#E2E8F0] rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#2ECC71]" />
                  <p className="text-[#64748B] text-sm">Available</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#F4B400]" />
                  <p className="text-[#64748B] text-sm">Limited</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#94A3B8]" />
                  <p className="text-[#64748B] text-sm">Full</p>
                </div>
              </div>
            </Card>

            <Button className="w-full bg-[#0F4C75] hover:bg-[#0F4C75]/90 text-white rounded-xl py-6">
              Confirm Appointment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
