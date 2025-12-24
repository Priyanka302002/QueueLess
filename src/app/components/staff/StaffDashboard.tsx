import { UserPlus, Users, Clock, Activity, User, LogOut, FileText, ChevronDown, Shield } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useState, useEffect, useRef } from "react";

interface StaffDashboardProps {
  onNavigate?: (screen: string) => void;
}

const patientsData = [
  {
    id: 1,
    name: "Rahul Kumar",
    queueNumber: "A-07",
    doctorName: "Dr. Sarah Johnson",
    department: "Cardiology",
    status: "waiting",
    appointmentTime: "10:30 AM",
    phoneNumber: "+91 98765 43210"
  },
  {
    id: 2,
    name: "Priya Sharma",
    queueNumber: "A-08",
    doctorName: "Dr. Sarah Johnson",
    department: "Cardiology",
    status: "waiting",
    appointmentTime: "11:00 AM",
    phoneNumber: "+91 98765 43211"
  },
  {
    id: 3,
    name: "Amit Patel",
    queueNumber: "B-05",
    doctorName: "Dr. Rajesh Kumar",
    department: "Orthopedics",
    status: "hold",
    appointmentTime: "10:45 AM",
    phoneNumber: "+91 98765 43212"
  },
  {
    id: 4,
    name: "Sneha Gupta",
    queueNumber: "A-09",
    doctorName: "Dr. Sarah Johnson",
    department: "Cardiology",
    status: "waiting",
    appointmentTime: "11:30 AM",
    phoneNumber: "+91 98765 43213"
  }
];

const doctors = [
  { id: 1, name: "All Doctors", value: "all" },
  { id: 2, name: "Dr. Sarah Johnson", value: "dr-sarah" },
  { id: 3, name: "Dr. Rajesh Kumar", value: "dr-rajesh" },
  { id: 4, name: "Dr. Priya Menon", value: "dr-priya" }
];

export function StaffDashboard({ onNavigate }: StaffDashboardProps) {
  const [isCounterActive, setIsCounterActive] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState("all");
  const [patients, setPatients] = useState(patientsData);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const lastScrollY = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const currentScrollY = scrollContainer.scrollTop;
      
      if (currentScrollY < 10) {
        setShowNavbar(true);
      } else if (currentScrollY < lastScrollY.current) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNavbar(false);
        setShowDropdown(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusChange = (patientId: number, newStatus: string) => {
    setPatients(patients.map(patient => 
      patient.id === patientId ? { ...patient, status: newStatus } : patient
    ));
  };

  const filteredPatients = selectedDoctor === "all" 
    ? patients 
    : patients.filter(p => p.doctorName === doctors.find(d => d.value === selectedDoctor)?.name);

  const activePatients = filteredPatients.filter(p => p.status === "waiting").length;
  const onHoldPatients = filteredPatients.filter(p => p.status === "hold").length;

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Smart Top Navigation */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ maxWidth: '440px', margin: '0 auto' }}
      >
        <div className={`bg-white border-b border-[#E2E8F0] ${showNavbar && lastScrollY.current > 0 ? 'shadow-lg' : ''}`}>
          <div className="px-5 py-3">
            <div className="flex items-center justify-between">
              {/* Left: Hospital Logo + Title */}
              <div className="flex items-center gap-2 flex-1">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1BCED8] to-[#0F4C75] rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-[#1E293B]">Staff Dashboard</h2>
                  <p className="text-[#64748B] text-xs">Anjali Verma</p>
                </div>
              </div>

              {/* Center: Counter Toggle */}
              <div className="flex items-center gap-2 mx-3">
                <button
                  onClick={() => setIsCounterActive(!isCounterActive)}
                  className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors shadow-sm ${
                    isCounterActive ? "bg-[#2ECC71] justify-end" : "bg-[#E2E8F0] justify-start"
                  }`}
                  title={isCounterActive ? "Counter Active" : "Counter Closed"}
                >
                  <div className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                    <Activity className={`w-3 h-3 ${isCounterActive ? "text-[#2ECC71]" : "text-[#64748B]"}`} />
                  </div>
                </button>
              </div>

              {/* Right: Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors flex items-center gap-1"
                >
                  <div className="w-8 h-8 bg-[#1BCED8]/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-[#1BCED8]" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-[#E2E8F0] overflow-hidden z-50">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        onNavigate?.("staffProfile");
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F8FAFC] transition-colors text-left"
                    >
                      <User className="w-4 h-4 text-[#1BCED8]" />
                      <span className="text-[#1E293B] text-sm">Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        onNavigate?.("staffHistory");
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F8FAFC] transition-colors text-left border-t border-[#E2E8F0]"
                    >
                      <FileText className="w-4 h-4 text-[#64748B]" />
                      <span className="text-[#1E293B] text-sm">History</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        onNavigate?.("roleSelection");
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#FEE] transition-colors text-left border-t border-[#E2E8F0]"
                    >
                      <LogOut className="w-4 h-4 text-[#E74C3C]" />
                      <span className="text-[#E74C3C] text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[68px] flex-shrink-0"></div>

      {/* Scrollable Content */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto"
      >
        {/* Add Patient Button */}
        <div className="px-5 py-4 bg-white border-b border-[#E2E8F0] sticky top-0 z-10">
          <Button
            onClick={() => onNavigate?.("addPatient")}
            disabled={!isCounterActive}
            className={`w-full py-3 rounded-xl text-white flex items-center justify-center gap-2 ${
              isCounterActive 
                ? "bg-gradient-to-r from-[#1BCED8] to-[#0F4C75] hover:shadow-lg" 
                : "bg-[#94A3B8] cursor-not-allowed"
            }`}
          >
            <UserPlus className="w-5 h-5" />
            Add Patient
          </Button>
          {!isCounterActive && (
            <p className="text-[#E74C3C] text-xs text-center mt-2">
              ⚠️ Counter is closed. Turn ON to accept patients.
            </p>
          )}
        </div>

        {/* Stats Cards */}
        <div className="px-5 py-4 grid grid-cols-3 gap-3 bg-[#F8FAFC]">
          <Card className="bg-white border border-[#E2E8F0] rounded-xl p-3 text-center">
            <p className="text-[#0F4C75] text-2xl">{filteredPatients.length}</p>
            <p className="text-[#64748B] text-xs">Total Queue</p>
          </Card>
          <Card className="bg-[#2ECC71]/10 border-0 rounded-xl p-3 text-center">
            <p className="text-[#2ECC71] text-2xl">{activePatients}</p>
            <p className="text-[#64748B] text-xs">Waiting</p>
          </Card>
          <Card className="bg-[#F4B400]/10 border-0 rounded-xl p-3 text-center">
            <p className="text-[#F4B400] text-2xl">{onHoldPatients}</p>
            <p className="text-[#64748B] text-xs">On Hold</p>
          </Card>
        </div>

        {/* Doctor Filter */}
        <div className="px-5 py-3 bg-[#F8FAFC]">
          <label className="text-[#1E293B] text-sm mb-2 block">Filter by Doctor</label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full px-4 py-3 border-2 border-[#E2E8F0] rounded-xl text-[#1E293B] focus:outline-none focus:border-[#1BCED8] bg-white"
          >
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.value}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        {/* Patient List */}
        <div className="px-5 py-4 pb-20">
          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E2E8F0]">
                {/* Patient Info */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[#1E293B]">{patient.name}</p>
                      <Badge className={`${
                        patient.status === "waiting" 
                          ? "bg-[#2ECC71]/10 text-[#2ECC71]" 
                          : "bg-[#F4B400]/10 text-[#F4B400]"
                      } border-0 text-xs`}>
                        {patient.status === "waiting" ? "Waiting" : "On Hold"}
                      </Badge>
                    </div>
                    <p className="text-[#64748B] text-sm">{patient.department}</p>
                    <p className="text-[#64748B] text-xs">{patient.phoneNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#0F4C75] text-xl">{patient.queueNumber}</p>
                    <p className="text-[#64748B] text-xs">Queue No.</p>
                  </div>
                </div>

                {/* Doctor & Time */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#E2E8F0]">
                  <Clock className="w-4 h-4 text-[#64748B]" />
                  <p className="text-[#64748B] text-sm">{patient.appointmentTime}</p>
                  <span className="text-[#E2E8F0]">•</span>
                  <p className="text-[#64748B] text-sm">{patient.doctorName}</p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleStatusChange(patient.id, "waiting")}
                    className={`py-2 rounded-xl text-sm transition-all ${
                      patient.status === "waiting"
                        ? "bg-[#2ECC71] text-white"
                        : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:border-[#2ECC71]"
                    }`}
                  >
                    ✓ Wait
                  </button>
                  <button
                    onClick={() => handleStatusChange(patient.id, "hold")}
                    className={`py-2 rounded-xl text-sm transition-all ${
                      patient.status === "hold"
                        ? "bg-[#F4B400] text-white"
                        : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:border-[#F4B400]"
                    }`}
                  >
                    ⏸ Hold
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t border-[#E2E8F0] px-5 py-3 flex-shrink-0 shadow-lg">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="p-2 bg-[#1BCED8]/10 rounded-xl">
              <Users className="w-5 h-5 text-[#1BCED8]" />
            </div>
            <span className="text-xs text-[#1BCED8]">Queue</span>
          </button>

          <button 
            onClick={() => onNavigate?.("staffHistory")}
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <div className="p-2 bg-transparent rounded-xl">
              <FileText className="w-5 h-5 text-[#64748B]" />
            </div>
            <span className="text-xs text-[#64748B]">History</span>
          </button>

          <button 
            onClick={() => onNavigate?.("staffProfile")}
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <div className="p-2 bg-transparent rounded-xl">
              <User className="w-5 h-5 text-[#64748B]" />
            </div>
            <span className="text-xs text-[#64748B]">Profile</span>
          </button>

          <button 
            onClick={() => onNavigate?.("roleSelection")}
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <div className="p-2 bg-transparent rounded-xl">
              <LogOut className="w-5 h-5 text-[#64748B]" />
            </div>
            <span className="text-xs text-[#64748B]">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
