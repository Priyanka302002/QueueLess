import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { SplashScreen } from "./components/splash/SplashScreen";
import { RoleSelection } from "./components/auth/RoleSelection";
import { PatientLogin } from "./components/auth/PatientLogin";
import { StaffLogin } from "./components/auth/StaffLogin";
import { DoctorLogin } from "./components/auth/DoctorLogin";
import { Dashboard } from "./components/patient/Dashboard";
import { BookAppointmentNew } from "./components/patient/BookAppointmentNew";
import { PaymentBooking } from "./components/patient/PaymentBooking";
import { ConfirmAppointment } from "./components/patient/ConfirmAppointment";
import { OrderHistory } from "./components/patient/OrderHistory";
import { OrderDetails } from "./components/patient/OrderDetails";
import { HistoryTransaction } from "./components/patient/HistoryTransaction";
import { TransactionDetails } from "./components/patient/TransactionDetails";
import { LiveQueue } from "./components/patient/LiveQueue";
import { StaffDashboard } from "./components/staff/StaffDashboard";
import { AddPatient } from "./components/staff/AddPatient";
import { StaffProfile } from "./components/staff/StaffProfile";
import { StaffHistory } from "./components/staff/StaffHistory";
import { DoctorDashboard } from "./components/doctor/DoctorDashboard";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState("roleSelection");
  const [selectedOrderId, setSelectedOrderId] = useState<number | undefined>();
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | undefined>();
  const [userRole, setUserRole] = useState<string>("");

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigate = (screen: string, id?: number) => {
    setCurrentScreen(screen);
    if (screen === "orderDetails") setSelectedOrderId(id);
    if (screen === "transactionDetails") setSelectedTransactionId(id);
    if (screen === "login" || screen === "roleSelection") {
      setUserRole("");
    }
  };

  const handleRoleSelect = (role: string) => {
    setUserRole(role);
    setCurrentScreen(`${role}Login`);
  };

  const handleLogin = () => {
    if (userRole === "patient") {
      setCurrentScreen("dashboard");
    } else if (userRole === "staff") {
      setCurrentScreen("staffDashboard");
    } else if (userRole === "doctor") {
      setCurrentScreen("doctorDashboard");
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full max-w-[440px] mx-auto bg-background">
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        {currentScreen === "roleSelection" && <RoleSelection onSelectRole={handleRoleSelect} />}
        {currentScreen === "patientLogin" && <PatientLogin onBack={() => setCurrentScreen("roleSelection")} onLogin={handleLogin} />}
        {currentScreen === "staffLogin" && <StaffLogin onBack={() => setCurrentScreen("roleSelection")} onLogin={handleLogin} />}
        {currentScreen === "doctorLogin" && <DoctorLogin onBack={() => setCurrentScreen("roleSelection")} onLogin={handleLogin} />}
        
        {/* Patient Screens */}
        {currentScreen === "dashboard" && <Dashboard onNavigate={handleNavigate} />}
        {currentScreen === "book" && <BookAppointmentNew onNavigate={handleNavigate} />}
        {currentScreen === "payment" && <PaymentBooking onNavigate={handleNavigate} />}
        {currentScreen === "confirm" && <ConfirmAppointment onNavigate={handleNavigate} />}
        {currentScreen === "orderHistory" && <OrderHistory onNavigate={handleNavigate} />}
        {currentScreen === "orderDetails" && <OrderDetails onNavigate={handleNavigate} orderId={selectedOrderId} />}
        {currentScreen === "historyTransaction" && <HistoryTransaction onNavigate={handleNavigate} />}
        {currentScreen === "transactionDetails" && <TransactionDetails onNavigate={handleNavigate} transactionId={selectedTransactionId} />}
        {currentScreen === "liveQueue" && <LiveQueue onNavigate={handleNavigate} />}
        
        {/* Staff Screens */}
        {currentScreen === "staffDashboard" && <StaffDashboard onNavigate={handleNavigate} />}
        {currentScreen === "addPatient" && <AddPatient onNavigate={handleNavigate} />}
        {currentScreen === "staffProfile" && <StaffProfile onNavigate={handleNavigate} />}
        {currentScreen === "staffHistory" && <StaffHistory onNavigate={handleNavigate} />}
        
        {/* Doctor Screens */}
        {currentScreen === "doctorDashboard" && <DoctorDashboard onNavigate={handleNavigate} />}
      </div>
    </ThemeProvider>
  );
}