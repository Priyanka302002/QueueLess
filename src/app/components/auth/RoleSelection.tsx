import { User, Briefcase, Stethoscope, Shield } from "lucide-react";
import { Card } from "../ui/card";

interface RoleSelectionProps {
  onSelectRole?: (role: string) => void;
}

export function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  const roles = [
    {
      id: "patient",
      name: "Patient",
      icon: User,
      description: "Book appointments & track queue",
      gradient: "from-[#0F4C75] to-[#1BCED8]"
    },
    {
      id: "staff",
      name: "Staff",
      icon: Briefcase,
      description: "Manage hospital operations",
      gradient: "from-[#1BCED8] to-[#0F4C75]"
    },
    {
      id: "doctor",
      name: "Doctor",
      icon: Stethoscope,
      description: "Access patient records & queue",
      gradient: "from-[#2ECC71] to-[#1BCED8]"
    }
  ];

  return (
    <div className="h-screen flex flex-col bg-white px-6 py-8">
      {/* Top Section - Branding */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0F4C75] to-[#1BCED8] rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-[#0F4C75] text-3xl">QueueLess</h1>
        </div>
        <p className="text-[#64748B]">Smart Hospital Queue Management</p>
      </div>

      {/* Role Selection Cards */}
      <div className="flex-1 flex flex-col justify-center space-y-5">
        {roles.map((role) => {
          const Icon = role.icon;
          
          return (
            <button
              key={role.id}
              onClick={() => onSelectRole?.(role.id)}
              className="group"
            >
              <Card className="bg-white border-2 border-[#E2E8F0] rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-[#1BCED8] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${role.gradient} rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 text-left">
                    <p className="text-[#1E293B] text-xl mb-1">{role.name}</p>
                    <p className="text-[#64748B] text-sm">{role.description}</p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="text-[#94A3B8] group-hover:text-[#1BCED8] transition-colors">
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
        <div className="text-center space-y-1">
          <p className="text-[#64748B] text-sm">🔐 Secure hospital access</p>
          <p className="text-[#94A3B8] text-xs">All actions are logged and monitored</p>
        </div>
      </div>
    </div>
  );
}
