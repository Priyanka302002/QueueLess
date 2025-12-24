import { useState } from "react";
import { ArrowLeft, User, Phone, Calendar, Building2, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface AddPatientProps {
  onNavigate?: (screen: string) => void;
}

const departments = [
  { id: 1, name: "Cardiology" },
  { id: 2, name: "Orthopedics" },
  { id: 3, name: "Neurology" },
  { id: 4, name: "Dermatology" },
  { id: 5, name: "Pediatrics" },
  { id: 6, name: "General Medicine" },
  { id: 7, name: "ENT" }
];

const doctors = [
  { id: 1, name: "Dr. Sarah Johnson", department: "Cardiology" },
  { id: 2, name: "Dr. Rajesh Kumar", department: "Orthopedics" },
  { id: 3, name: "Dr. Priya Menon", department: "General Medicine" },
  { id: 4, name: "Dr. Amit Patel", department: "ENT" },
  { id: 5, name: "Dr. Kavita Singh", department: "Pediatrics" }
];

export function AddPatient({ onNavigate }: AddPatientProps) {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("normal");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const availableDoctors = selectedDepartment
    ? doctors.filter(d => d.department === selectedDepartment)
    : doctors;

  const handleSubmit = () => {
    setError("");
    
    // Validation
    if (!patientName.trim()) {
      setError("Please enter patient name");
      return;
    }
    
    if (!age.trim() || parseInt(age) < 1 || parseInt(age) > 120) {
      setError("Please enter a valid age");
      return;
    }
    
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    
    if (!selectedDepartment) {
      setError("Please select a department");
      return;
    }
    
    if (!selectedDoctor) {
      setError("Please select a doctor");
      return;
    }

    setIsLoading(true);
    
    // Simulate adding patient
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        setPatientName("");
        setAge("");
        setPhoneNumber("");
        setSelectedDepartment("");
        setSelectedDoctor("");
        setUrgencyLevel("normal");
      }, 2000);
    }, 1000);
  };

  const isFormValid = () => {
    return patientName.trim() && age.trim() && phoneNumber.trim() && 
           selectedDepartment && selectedDoctor;
  };

  if (success) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#2ECC71]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-[#2ECC71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-[#1E293B] text-2xl mb-2">Patient Added!</h2>
          <p className="text-[#64748B] mb-1">
            {patientName} has been added to the queue
          </p>
          <p className="text-[#1BCED8] text-sm">
            AI is calculating queue position...
          </p>
        </div>
      </div>
    );
  }

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
        <h2 className="text-[#1E293B]">Add Patient</h2>
        <div className="w-9"></div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {/* Info Card */}
        <Card className="bg-[#1BCED8]/5 border border-[#1BCED8]/20 rounded-2xl p-4 mb-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#1BCED8] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#1E293B] text-sm mb-1">Fair Queue System</p>
              <p className="text-[#64748B] text-xs">
                AI will place this patient fairly in the queue. Walk-in patients are treated equally with online bookings.
              </p>
            </div>
          </div>
        </Card>

        {/* Patient Name */}
        <div className="mb-4">
          <label className="text-[#1E293B] mb-2 block">Patient Name *</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <User className="w-5 h-5 text-[#64748B]" />
            </div>
            <input
              type="text"
              value={patientName}
              onChange={(e) => {
                setPatientName(e.target.value);
                setError("");
              }}
              placeholder="Enter full name"
              className="w-full pl-12 pr-4 py-3 border-2 border-[#E2E8F0] rounded-xl text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1BCED8] transition-colors"
            />
          </div>
        </div>

        {/* Age & Phone */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-[#1E293B] mb-2 block">Age *</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Calendar className="w-5 h-5 text-[#64748B]" />
              </div>
              <input
                type="number"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setError("");
                }}
                placeholder="Age"
                min="1"
                max="120"
                className="w-full pl-12 pr-4 py-3 border-2 border-[#E2E8F0] rounded-xl text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1BCED8] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[#1E293B] mb-2 block">Phone *</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Phone className="w-5 h-5 text-[#64748B]" />
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setPhoneNumber(value);
                  setError("");
                }}
                placeholder="Phone"
                maxLength={10}
                className="w-full pl-12 pr-4 py-3 border-2 border-[#E2E8F0] rounded-xl text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1BCED8] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Department */}
        <div className="mb-4">
          <label className="text-[#1E293B] mb-2 block">Department *</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <Building2 className="w-5 h-5 text-[#64748B]" />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedDoctor(""); // Reset doctor when department changes
                setError("");
              }}
              className="w-full pl-12 pr-4 py-3 border-2 border-[#E2E8F0] rounded-xl text-[#1E293B] focus:outline-none focus:border-[#1BCED8] bg-white appearance-none transition-colors"
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctor */}
        <div className="mb-4">
          <label className="text-[#1E293B] mb-2 block">Doctor *</label>
          <select
            value={selectedDoctor}
            onChange={(e) => {
              setSelectedDoctor(e.target.value);
              setError("");
            }}
            disabled={!selectedDepartment}
            className="w-full px-4 py-3 border-2 border-[#E2E8F0] rounded-xl text-[#1E293B] focus:outline-none focus:border-[#1BCED8] bg-white disabled:bg-[#F8FAFC] disabled:text-[#94A3B8] transition-colors"
          >
            <option value="">Select Doctor</option>
            {availableDoctors.map(doctor => (
              <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
            ))}
          </select>
        </div>

        {/* Urgency Level */}
        <div className="mb-5">
          <label className="text-[#1E293B] mb-2 block">Urgency Level (Optional)</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setUrgencyLevel("normal")}
              className={`py-3 rounded-xl text-sm transition-all ${
                urgencyLevel === "normal"
                  ? "bg-[#2ECC71] text-white"
                  : "bg-white border-2 border-[#E2E8F0] text-[#64748B]"
              }`}
            >
              🟢 Normal
            </button>
            <button
              onClick={() => setUrgencyLevel("moderate")}
              className={`py-3 rounded-xl text-sm transition-all ${
                urgencyLevel === "moderate"
                  ? "bg-[#F4B400] text-white"
                  : "bg-white border-2 border-[#E2E8F0] text-[#64748B]"
              }`}
            >
              🟡 Moderate
            </button>
            <button
              onClick={() => setUrgencyLevel("urgent")}
              className={`py-3 rounded-xl text-sm transition-all ${
                urgencyLevel === "urgent"
                  ? "bg-[#E74C3C] text-white"
                  : "bg-white border-2 border-[#E2E8F0] text-[#64748B]"
              }`}
            >
              🔴 Urgent
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-[#E74C3C]/10 border-2 border-[#E74C3C]/20 rounded-xl p-3 mb-4">
            <p className="text-[#E74C3C] text-sm">❌ {error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid() || isLoading}
          className={`w-full py-4 rounded-xl text-white text-lg shadow-lg ${
            !isFormValid() || isLoading
              ? "bg-[#94A3B8] cursor-not-allowed"
              : "bg-gradient-to-r from-[#1BCED8] to-[#0F4C75] hover:shadow-xl active:scale-[0.98]"
          } transition-all`}
        >
          {isLoading ? "Adding Patient..." : "Submit & Add to Queue"}
        </Button>

        <p className="text-[#64748B] text-xs text-center mt-3">
          Patient will receive SMS notification with queue details
        </p>
      </div>
    </div>
  );
}
