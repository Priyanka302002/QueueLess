import { Home, Calendar, History, User } from "lucide-react";

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "book", label: "Book", icon: Calendar },
    { id: "history", label: "History", icon: History },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-6 py-4 rounded-t-[24px] shadow-lg z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeScreen === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 min-w-[60px] transition-all"
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  isActive ? "bg-[#0F4C75]" : "bg-transparent"
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${isActive ? "text-white" : "text-[#64748B]"}`}
                />
              </div>
              <span
                className={`text-xs ${
                  isActive ? "text-[#0F4C75]" : "text-[#64748B]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
