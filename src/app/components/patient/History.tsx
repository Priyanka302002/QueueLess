import { ArrowLeft, Calendar, Clock, FileText, Download, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface HistoryProps {
  onNavigate: (screen: string) => void;
}

export function History({ onNavigate }: HistoryProps) {
  const appointments = [
    {
      id: 1,
      date: "Dec 20, 2025",
      time: "10:30 AM",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      status: "completed",
      diagnosis: "Regular Checkup",
      prescription: true,
      bill: 1200,
    },
    {
      id: 2,
      date: "Dec 15, 2025",
      time: "02:00 PM",
      doctor: "Dr. Michael Chen",
      department: "Cardiology",
      status: "completed",
      diagnosis: "Follow-up Visit",
      prescription: true,
      bill: 800,
    },
    {
      id: 3,
      date: "Dec 10, 2025",
      time: "11:00 AM",
      doctor: "Dr. Priya Sharma",
      department: "General Medicine",
      status: "no-show",
      diagnosis: null,
      prescription: false,
      bill: 500,
    },
    {
      id: 4,
      date: "Nov 28, 2025",
      time: "09:30 AM",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      status: "completed",
      diagnosis: "Routine Examination",
      prescription: true,
      bill: 1500,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-[#2ECC71]/10 text-[#2ECC71] border-0">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "no-show":
        return (
          <Badge className="bg-[#E74C3C]/10 text-[#E74C3C] border-0">
            <XCircle className="w-3 h-3 mr-1" />
            No-Show
          </Badge>
        );
      default:
        return null;
    }
  };

  const noShowCount = appointments.filter((a) => a.status === "no-show").length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0F4C75] to-[#1BCED8] px-6 pt-8 pb-6 rounded-b-[32px]">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => onNavigate("dashboard")}
            className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white flex-1">Appointment History</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* No-Show Warning */}
        {noShowCount > 0 && (
          <Card className="bg-gradient-to-r from-[#E74C3C]/10 to-[#E74C3C]/5 border-[#E74C3C]/20 p-4 rounded-2xl">
            <div className="flex gap-3">
              <div className="p-2 bg-[#E74C3C]/10 rounded-lg h-fit">
                <AlertCircle className="w-5 h-5 text-[#E74C3C]" />
              </div>
              <div className="flex-1">
                <p className="text-[#1E293B] mb-1">No-Show Warning</p>
                <p className="text-[#64748B] text-sm">
                  You have {noShowCount} no-show{noShowCount > 1 ? "s" : ""} in your history.
                  Multiple no-shows may affect future bookings.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Statistics */}
        <Card className="bg-white border-[#E2E8F0] rounded-2xl p-5 shadow-sm">
          <h3 className="text-[#1E293B] mb-4">Your Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-[#0F4C75] text-2xl mb-1">{appointments.length}</p>
              <p className="text-[#64748B] text-sm">Total Visits</p>
            </div>
            <div className="text-center">
              <p className="text-[#2ECC71] text-2xl mb-1">
                {appointments.filter((a) => a.status === "completed").length}
              </p>
              <p className="text-[#64748B] text-sm">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-[#E74C3C] text-2xl mb-1">{noShowCount}</p>
              <p className="text-[#64748B] text-sm">No-Shows</p>
            </div>
          </div>
        </Card>

        {/* Past Appointments */}
        <div>
          <h3 className="text-[#1E293B] mb-4">Past Appointments</h3>
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="bg-white border-[#E2E8F0] rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[#1E293B] mb-1">{appointment.doctor}</p>
                    <p className="text-[#64748B] text-sm">{appointment.department}</p>
                  </div>
                  {getStatusBadge(appointment.status)}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-[#64748B] text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#64748B] text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.time}</span>
                  </div>
                </div>

                {appointment.status === "completed" && (
                  <>
                    {appointment.diagnosis && (
                      <div className="bg-[#F8FAFC] rounded-xl p-3 mb-3">
                        <p className="text-[#64748B] text-sm mb-1">Diagnosis</p>
                        <p className="text-[#1E293B]">{appointment.diagnosis}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      {appointment.prescription && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-[#1BCED8] text-[#1BCED8] hover:bg-[#1BCED8]/10 rounded-lg"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Prescription
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-[#0F4C75] text-[#0F4C75] hover:bg-[#0F4C75]/10 rounded-lg"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Bill (₹{appointment.bill})
                      </Button>
                    </div>
                  </>
                )}

                {appointment.status === "no-show" && (
                  <div className="bg-[#E74C3C]/5 rounded-xl p-3">
                    <p className="text-[#E74C3C] text-sm">
                      You missed this appointment. Cancellation fee of ₹{appointment.bill} may
                      apply.
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
