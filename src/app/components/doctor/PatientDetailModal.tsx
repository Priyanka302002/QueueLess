import { X, User, Calendar, FileText, Clock } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface PatientDetailModalProps {
  patient: {
    id: number;
    queueNumber: string;
    patientName: string;
    age: number;
    gender: string;
    visitType: string;
    priority: string;
    checkInTime: string;
    status: string;
    visitReason: string;
    previousVisits: string[];
  };
  onClose: () => void;
}

export function PatientDetailModal({ patient, onClose }: PatientDetailModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-[400px] max-h-[80vh] overflow-hidden"
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1BCED8] to-[#0F4C75] px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-white/80 text-xs">Patient Details</p>
            <p className="text-white text-lg">{patient.queueNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-80px)] px-5 py-4">
          {/* Patient Info */}
          <Card className="bg-[#F8FAFC] border-0 rounded-2xl p-4 mb-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-[#1BCED8]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-[#1BCED8]" />
              </div>
              <div className="flex-1">
                <p className="text-[#1E293B] text-lg mb-1">{patient.patientName}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[#64748B] text-sm">{patient.age} years • {patient.gender}</p>
                  {patient.priority === "urgent" && (
                    <Badge className="bg-[#E74C3C] text-white border-0 text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-[#64748B] text-xs mb-1">Visit Type</p>
                <p className="text-[#1E293B] text-sm capitalize">{patient.visitType}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-[#64748B] text-xs mb-1">Check-in</p>
                <p className="text-[#1E293B] text-sm">{patient.checkInTime}</p>
              </div>
            </div>
          </Card>

          {/* Visit Reason */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-[#1BCED8]" />
              <h4 className="text-[#1E293B]">Visit Reason</h4>
            </div>
            <Card className="bg-white border border-[#E2E8F0] rounded-xl p-4">
              <p className="text-[#64748B] text-sm">{patient.visitReason}</p>
            </Card>
          </div>

          {/* Previous Visits */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#1BCED8]" />
              <h4 className="text-[#1E293B]">Previous Visits</h4>
            </div>
            {patient.previousVisits.length > 0 ? (
              <Card className="bg-white border border-[#E2E8F0] rounded-xl p-4">
                <div className="space-y-2">
                  {patient.previousVisits.map((visit, index) => (
                    <div key={index} className="flex items-center gap-2 py-2 border-b border-[#E2E8F0] last:border-0">
                      <Clock className="w-4 h-4 text-[#64748B]" />
                      <p className="text-[#64748B] text-sm">{visit}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="bg-[#1BCED8]/5 border border-[#1BCED8]/20 rounded-xl p-4 text-center">
                <p className="text-[#64748B] text-sm">No previous visits</p>
                <p className="text-[#1BCED8] text-xs mt-1">First time patient</p>
              </Card>
            )}
          </div>

          {/* Notes Section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-[#1BCED8]" />
              <h4 className="text-[#1E293B]">Clinical Notes</h4>
            </div>
            <textarea
              placeholder="Add notes about this consultation..."
              className="w-full px-4 py-3 border-2 border-[#E2E8F0] rounded-xl text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1BCED8] resize-none"
              rows={4}
            />
          </div>

          {/* Privacy Notice */}
          <Card className="bg-[#F4B400]/5 border border-[#F4B400]/20 rounded-xl p-3">
            <p className="text-[#64748B] text-xs text-center">
              🔒 No payment or sensitive financial data shown
            </p>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
