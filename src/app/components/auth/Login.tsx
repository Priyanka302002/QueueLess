import { useState } from "react";
import { User, Briefcase, Stethoscope, Lock, Mail, Smartphone, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface LoginProps {
  onLogin?: (role: string) => void;
}

type Role = "patient" | "staff" | "doctor" | null;

export function Login({ onLogin }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [staffId, setStaffId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const roles = [
    {
      id: "patient",
      name: "Patient",
      icon: User,
      color: "#0F4C75"
    },
    {
      id: "staff",
      name: "Staff",
      icon: Briefcase,
      color: "#1BCED8"
    },
    {
      id: "doctor",
      name: "Doctor",
      icon: Stethoscope,
      color: "#2ECC71"
    }
  ];

  const handleLogin = () => {
    setError("");
    
    // Basic validation
    if (!selectedRole) {
      setError("Please select a role");
      return;
    }

    if (!phoneOrEmail.trim()) {
      setError("Please enter your phone or email");
      return;
    }

    if (selectedRole === "patient" && !otp.trim()) {
      setError("Please enter OTP");
      return;
    }

    if (selectedRole === "staff" && (!staffId.trim() || !password.trim())) {
      setError("Please enter Staff ID and password");
      return;
    }

    if (selectedRole === "doctor" && (!doctorId.trim() || !password.trim())) {
      setError("Please enter Doctor ID and password");
      return;
    }

    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLogin?.(selectedRole);
    }, 1500);
  };

  const isFormValid = () => {
    if (!selectedRole || !phoneOrEmail.trim()) return false;
    
    if (selectedRole === "patient") {
      return otp.trim().length > 0;
    }
    
    if (selectedRole === "staff") {
      return staffId.trim().length > 0 && password.trim().length > 0;
    }
    
    if (selectedRole === "doctor") {
      return doctorId.trim().length > 0 && password.trim().length > 0;
    }
    
    return false;
  };

  return (
    <div className="h-screen flex flex-col bg-white px-6 py-8 overflow-hidden">
      {/* Top Section - Branding */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0F4C75] to-[#1BCED8] rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-[#0F4C75] text-2xl">QueueLess</h1>
        </div>
        <p className="text-[#64748B] text-sm">Smart Hospital Queue Management</p>
      </div>

      {/* Role Selection Section */}
      <div className="mb-6">
        <p className="text-[#1E293B] mb-3 text-center">Login As</p>
        <div className="grid grid-cols-3 gap-3">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id as Role);
                  setError("");
                }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-[#0F4C75] bg-[#0F4C75]/5"
                    : "border-[#E2E8F0] bg-white hover:border-[#1BCED8]/30"
                }`}
              >
                <div 
                  className={`p-3 rounded-lg ${isSelected ? "bg-[#0F4C75]" : "bg-[#F8FAFC]"}`}
                  style={!isSelected ? { backgroundColor: `${role.color}15` } : {}}
                >
                  <Icon 
                    className={`w-6 h-6 ${isSelected ? "text-white" : ""}`}
                    style={!isSelected ? { color: role.color } : {}}
                  />
                </div>
                <span className={`text-xs ${isSelected ? "text-[#0F4C75]" : "text-[#64748B]"}`}>
                  {role.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex flex-col">
        {/* Common Field - Phone/Email */}
        <div className="mb-4">
          <label className="text-[#1E293B] text-sm mb-2 block">Phone / Email</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Mail className="w-5 h-5 text-[#64748B]" />
            </div>
            <input
              type="text"
              value={phoneOrEmail}
              onChange={(e) => {
                setPhoneOrEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter phone or email"
              className="w-full pl-11 pr-4 py-3 border border-[#E2E8F0] rounded-xl text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F4C75]"
            />
          </div>
        </div>

        {/* Dynamic Fields Based on Role */}
        {selectedRole === "patient" && (
          <div className="mb-4">
            <label className="text-[#1E293B] text-sm mb-2 block">OTP</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Smartphone className="w-5 h-5 text-[#64748B]" />
              </div>
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setError("");
                }}
                placeholder="Enter OTP"
                maxLength={6}
                className="w-full pl-11 pr-4 py-3 border border-[#E2E8F0] rounded-xl text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F4C75]"
              />
            </div>
            <p className="text-[#64748B] text-xs mt-2">We'll send a one-time code</p>
          </div>
        )}

        {selectedRole === "staff" && (
          <>
            <div className="mb-4">
              <label className="text-[#1E293B] text-sm mb-2 block">Staff ID</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Briefcase className="w-5 h-5 text-[#64748B]" />
                </div>
                <input
                  type="text"
                  value={staffId}
                  onChange={(e) => {
                    setStaffId(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter Staff ID"
                  className="w-full pl-11 pr-4 py-3 border border-[#E2E8F0] rounded-xl text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F4C75]"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-[#1E293B] text-sm mb-2 block">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-[#64748B]" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter password"
                  className="w-full pl-11 pr-4 py-3 border border-[#E2E8F0] rounded-xl text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F4C75]"
                />
              </div>
            </div>
          </>
        )}

        {selectedRole === "doctor" && (
          <>
            <div className="mb-4">
              <label className="text-[#1E293B] text-sm mb-2 block">Doctor ID</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Stethoscope className="w-5 h-5 text-[#64748B]" />
                </div>
                <input
                  type="text"
                  value={doctorId}
                  onChange={(e) => {
                    setDoctorId(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter Doctor ID"
                  className="w-full pl-11 pr-4 py-3 border border-[#E2E8F0] rounded-xl text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F4C75]"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-[#1E293B] text-sm mb-2 block">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-[#64748B]" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter password"
                  className="w-full pl-11 pr-4 py-3 border border-[#E2E8F0] rounded-xl text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F4C75]"
                />
              </div>
            </div>
          </>
        )}

        {/* Login Button */}
        <Button
          onClick={handleLogin}
          disabled={!isFormValid() || isLoading}
          className={`w-full py-3 rounded-xl text-white mb-3 ${
            !isFormValid() || isLoading
              ? "bg-[#94A3B8] cursor-not-allowed"
              : "bg-[#0F4C75] hover:bg-[#0F4C75]/90"
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        {/* Error State */}
        {error && (
          <div className="bg-[#E74C3C]/10 border border-[#E74C3C]/20 rounded-lg p-3 mb-4">
            <p className="text-[#E74C3C] text-sm">❌ {error}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-[#E2E8F0]">
          <div className="text-center space-y-1">
            <p className="text-[#64748B] text-xs">🔐 Secure hospital access</p>
            <p className="text-[#64748B] text-xs">All actions are logged</p>
          </div>
        </div>
      </div>
    </div>
  );
}
