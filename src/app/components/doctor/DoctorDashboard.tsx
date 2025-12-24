import { useState } from "react";
import { ArrowLeft, Activity, Clock, Users, User, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

interface DoctorDashboardProps {
  onNavigate?: (screen: string) => void;
}

const patientsInQueue = [
  {
    id: 1,
    queueNumber: "A-07",
    patientName: "Rahul Kumar",
    age: 45,
    gender: "Male",
    visitType: "Follow-up",
    priority: "normal",
    visitReason: "Follow-up checkup for hypertension",
    previousVisits: ["Dec 10, 2024", "Nov 15, 2024", "Oct 22, 2024"],
  },
  {
    id: 2,
    queueNumber: "A-08",
    patientName: "Priya Sharma",
    age: 32,
    gender: "Female",
    visitType: "New",
    priority: "urgent",
    visitReason: "Severe chest pain and breathing difficulty",
    previousVisits: [],
  },
  {
    id: 3,
    queueNumber: "A-09",
    patientName: "Amit Verma",
    age: 58,
    gender: "Male",
    visitType: "Follow-up",
    priority: "normal",
    visitReason: "Diabetes management consultation",
    previousVisits: ["Dec 8, 2024", "Nov 1, 2024"],
  },
];

const completedToday = [
  { id: 101, queueNumber: "A-01", patientName: "Rajesh Patel", timeSpent: "12 mins", status: "Completed" },
  { id: 102, queueNumber: "A-02", patientName: "Anita Singh", timeSpent: "8 mins", status: "Completed" },
  { id: 103, queueNumber: "A-03", patientName: "Vikram Rao", timeSpent: "15 mins", status: "Completed" },
  { id: 104, queueNumber: "A-04", patientName: "Meera Shah", timeSpent: "10 mins", status: "No-Show" },
];

export function DoctorDashboard({ onNavigate }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState<"queue" | "current" | "history" | "profile">("queue");
  const [doctorStatus, setDoctorStatus] = useState<"available" | "busy" | "away">("available");
  const [currentPatient, setCurrentPatient] = useState<typeof patientsInQueue[0] | null>(null);
  const [consultationStartTime, setConsultationStartTime] = useState<number | null>(null);
  const [showPreviousVisits, setShowPreviousVisits] = useState(false);

  const nextPatient = patientsInQueue[0];
  const waitingCount = patientsInQueue.length;
  const todayCount = completedToday.length + waitingCount;
  const avgTime = 12; // minutes

  const handleStartConsultation = () => {
    setCurrentPatient(nextPatient);
    setConsultationStartTime(Date.now());
    setActiveTab("current");
  };

  const handleMarkNoShow = () => {
    // Remove from queue
    alert(`${nextPatient.patientName} marked as No-Show`);
  };

  const handleCompleteConsultation = () => {
    if (consultationStartTime) {
      const timeSpent = Math.round((Date.now() - consultationStartTime) / 1000 / 60);
      alert(`Consultation completed in ${timeSpent} minutes`);
    }
    setCurrentPatient(null);
    setConsultationStartTime(null);
    setActiveTab("queue");
  };

  const getStatusColor = () => {
    switch (doctorStatus) {
      case "available": return "bg-[#10B981] text-white";
      case "busy": return "bg-[#F59E0B] text-white";
      case "away": return "bg-[#94A3B8] text-white";
    }
  };

  const getStatusText = () => {
    switch (doctorStatus) {
      case "available": return "Available";
      case "busy": return "Busy";
      case "away": return "Away";
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white animate-fade-in">
      {/* Simple Header */}
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate?.("roleSelection")}
            className="p-1.5 -ml-1.5 hover:bg-secondary rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </button>
          <div>
            <h2 className="text-foreground font-semibold">Dr. Sarah Johnson</h2>
            <p className="text-muted-foreground text-sm">Cardiologist</p>
          </div>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusColor()}`}>
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          {getStatusText()}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Queue Tab */}
        {activeTab === "queue" && (
          <div className="animate-fade-in-up">
            {/* Quick Stats */}
            <div className="px-6 py-4 flex items-center gap-3">
              <div className="px-4 py-2 bg-secondary border border-border rounded-[10px] flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-sm font-medium text-foreground">{waitingCount} Waiting</span>
              </div>
              <div className="px-4 py-2 bg-secondary border border-border rounded-[10px] flex items-center gap-2">
                <Activity className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-sm font-medium text-foreground">{todayCount} Today</span>
              </div>
              <div className="px-4 py-2 bg-secondary border border-border rounded-[10px] flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <span className="text-sm font-medium text-foreground">Avg {avgTime} min</span>
              </div>
            </div>

            {/* Live Queue Section */}
            <div className="px-6 py-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-foreground font-semibold">Live Queue</h3>
                <span className="text-sm text-muted-foreground">{waitingCount} waiting</span>
              </div>

              {/* Queue List */}
              <div className="space-y-2">
                {patientsInQueue.map((patient, index) => (
                  <div
                    key={patient.id}
                    className={`p-4 rounded-[12px] border transition-all duration-200 ${
                      index === 0
                        ? "bg-primary/5 border-primary/20"
                        : "bg-white border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-foreground">{patient.queueNumber}</span>
                        <div>
                          <p className="font-medium text-foreground">{patient.patientName}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-sm text-muted-foreground">{patient.visitType}</span>
                            {patient.priority === "urgent" && (
                              <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs font-medium rounded-md flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" strokeWidth={1.5} />
                                Urgent
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {index === 0 && (
                        <span className="text-xs font-medium text-primary">● Next</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Current Patient Tab */}
        {activeTab === "current" && currentPatient && (
          <div className="p-6 animate-fade-in-up">
            <div className="mb-6">
              <h2 className="text-foreground font-semibold text-xl mb-1">{currentPatient.patientName}</h2>
              <p className="text-muted-foreground">{currentPatient.visitType} • {currentPatient.queueNumber}</p>
            </div>

            {/* Patient Info */}
            <div className="bg-secondary border border-border rounded-[16px] p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-1">Patient Details</p>
              <p className="text-foreground font-medium">{currentPatient.age}y • {currentPatient.gender}</p>
            </div>

            {/* Visit Reason */}
            <div className="mb-4">
              <p className="text-sm font-medium text-foreground mb-2">Visit Reason</p>
              <p className="text-muted-foreground leading-relaxed">{currentPatient.visitReason}</p>
            </div>

            {/* Previous Visits */}
            {currentPatient.previousVisits.length > 0 && (
              <div className="mb-6">
                <button
                  onClick={() => setShowPreviousVisits(!showPreviousVisits)}
                  className="text-sm font-medium text-primary hover:underline mb-2"
                >
                  {showPreviousVisits ? "Hide" : "Show"} Previous Visits ({currentPatient.previousVisits.length})
                </button>
                {showPreviousVisits && (
                  <div className="bg-secondary border border-border rounded-[12px] p-3 space-y-1 animate-fade-in">
                    {currentPatient.previousVisits.map((visit, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">• {visit}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="p-6 animate-fade-in-up">
            <h3 className="text-foreground font-semibold mb-4">Today's History</h3>
            <div className="space-y-2">
              {completedToday.map((record) => (
                <div
                  key={record.id}
                  className="p-4 bg-white border border-border rounded-[12px] hover:border-primary/30 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{record.patientName}</p>
                      <p className="text-sm text-muted-foreground">{record.queueNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{record.timeSpent}</p>
                      <p className={`text-xs ${
                        record.status === "Completed" ? "text-[#10B981]" : "text-muted-foreground"
                      }`}>
                        {record.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="p-6 animate-fade-in-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-lg">Dr. Sarah Johnson</h3>
                <p className="text-muted-foreground">Cardiologist</p>
              </div>
            </div>

            {/* Status Selector */}
            <div className="mb-4">
              <p className="text-sm font-medium text-foreground mb-2">Status</p>
              <div className="space-y-2">
                {(["available", "busy", "away"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setDoctorStatus(status)}
                    className={`w-full p-3 rounded-[10px] border transition-all duration-200 text-left ${
                      doctorStatus === status
                        ? "bg-primary/5 border-primary"
                        : "bg-white border-border hover:border-primary/30"
                    }`}
                  >
                    <span className="font-medium text-foreground capitalize">{status}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => onNavigate?.("roleSelection")}
              className="w-full bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-[12px] py-3"
            >
              Logout
            </Button>
          </div>
        )}
      </div>

      {/* Fixed Bottom Action Bar (Only on Queue Tab for Next Patient) */}
      {activeTab === "queue" && nextPatient && (
        <div className="border-t border-border bg-white px-6 py-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <Button
              onClick={handleStartConsultation}
              className="flex-1 bg-primary hover:bg-primary-hover text-white rounded-[12px] py-3.5 font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
            >
              ▶ Start Consultation
            </Button>
            <button
              onClick={handleMarkNoShow}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-200"
            >
              Mark No-Show
            </button>
          </div>
        </div>
      )}

      {/* Fixed Bottom Action Bar (Current Patient Tab) */}
      {activeTab === "current" && currentPatient && (
        <div className="border-t border-border bg-white px-6 py-4 animate-fade-in">
          <Button
            onClick={handleCompleteConsultation}
            className="w-full bg-[#10B981] hover:bg-[#059669] text-white rounded-[12px] py-3.5 font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
          >
            Complete Consultation
          </Button>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="border-t border-border bg-white px-6 py-3 flex items-center justify-around">
        <button
          onClick={() => setActiveTab("queue")}
          className={`flex flex-col items-center gap-1 transition-all duration-200 ${
            activeTab === "queue" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Activity className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-medium">Queue</span>
        </button>
        <button
          onClick={() => currentPatient && setActiveTab("current")}
          disabled={!currentPatient}
          className={`flex flex-col items-center gap-1 transition-all duration-200 ${
            activeTab === "current" ? "text-primary" : "text-muted-foreground"
          } ${!currentPatient ? "opacity-40" : ""}`}
        >
          <User className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-medium">Current</span>
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex flex-col items-center gap-1 transition-all duration-200 ${
            activeTab === "history" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Clock className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-medium">History</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1 transition-all duration-200 ${
            activeTab === "profile" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <User className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
}
