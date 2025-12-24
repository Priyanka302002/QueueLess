import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Briefcase, Lock, Mail, Shield, Globe } from "lucide-react";
import { Button } from "../ui/button";
import { translations, languages, type Language } from "../../utils/translations";

interface StaffLoginProps {
  onBack?: () => void;
  onLogin?: () => void;
}

export function StaffLogin({ onBack, onLogin }: StaffLoginProps) {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = () => {
    setError("");
    
    if (!staffId.trim()) {
      setError(t.errorPhoneEmail);
      return;
    }

    if (!password.trim()) {
      setError(t.enterPassword);
      return;
    }

    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLogin?.();
    }, 1000);
  };

  const isFormValid = () => {
    return staffId.trim().length > 0 && password.trim().length > 0;
  };

  return (
    <div className="h-screen flex flex-col bg-[#FAFAFA] px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <button 
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-[#F5F5F5] rounded-xl transition-all duration-200"
        >
          <ArrowLeft className="w-6 h-6 text-[#2E2E2E]" strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#42A5F5] to-[#2E7D32] rounded-2xl flex items-center justify-center shadow-sm">
            <Shield className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-[#2E7D32]">QueueLess</h1>
        </div>
        
        {/* Language Selector */}
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="p-2 hover:bg-[#F5F5F5] rounded-xl transition-all duration-200 hover:scale-105"
            title="Change Language"
          >
            <Globe className="w-6 h-6 text-[#2E2E2E]" strokeWidth={1.5} />
          </button>

          {/* Language Dropdown */}
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-[#E0E0E0] overflow-hidden z-50 animate-fade-in">
              <div className="px-4 py-2 bg-[#F5F5F5] border-b border-[#E0E0E0]">
                <p className="text-[#757575] text-xs">Select Language</p>
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLanguageDropdown(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center justify-between hover:bg-[#F1F8E9] transition-all duration-200 text-left ${
                    language === lang.code ? "bg-[#E3F2FD]" : ""
                  }`}
                >
                  <span className="text-[#2E2E2E]">{lang.nativeName}</span>
                  {language === lang.code && (
                    <span className="text-[#2E7D32]">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-12 h-12 bg-[#E3F2FD] rounded-2xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-[#42A5F5]" strokeWidth={1.5} />
          </div>
          <h2 className="text-[#2E2E2E]">{t.staffLogin}</h2>
        </div>
        <p className="text-[#757575] leading-relaxed">{t.enterStaffID}</p>
      </div>

      {/* Form */}
      <div className="flex-1 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        {/* Staff ID Field */}
        <div className="mb-5">
          <label className="text-[#2E2E2E] mb-2 block">{t.staffID}</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Mail className="w-5 h-5 text-[#757575]" strokeWidth={1.5} />
            </div>
            <input
              type="text"
              value={staffId}
              onChange={(e) => {
                setStaffId(e.target.value);
                setError("");
              }}
              placeholder={t.staffIDPlaceholder}
              className="w-full pl-12 pr-4 py-4 border border-[#E0E0E0] rounded-xl text-[#2E2E2E] placeholder:text-[#BDBDBD] focus:outline-none focus:border-[#42A5F5] focus:ring-2 focus:ring-[#E3F2FD] transition-all duration-200"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="text-[#2E2E2E] mb-2 block">{t.password}</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Lock className="w-5 h-5 text-[#757575]" strokeWidth={1.5} />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder={t.passwordPlaceholder}
              className="w-full pl-12 pr-4 py-4 border border-[#E0E0E0] rounded-xl text-[#2E2E2E] placeholder:text-[#BDBDBD] focus:outline-none focus:border-[#42A5F5] focus:ring-2 focus:ring-[#E3F2FD] transition-all duration-200"
            />
          </div>
          <button className="text-[#42A5F5] text-sm mt-2 hover:underline">
            {t.forgotPassword}
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-[#EF5350]/10 border border-[#EF5350]/30 rounded-xl p-4 mb-6 animate-fade-in">
            <p className="text-[#EF5350]">❌ {error}</p>
          </div>
        )}

        {/* Login Button */}
        <Button
          onClick={handleLogin}
          disabled={!isFormValid() || isLoading}
          className={`w-full py-4 rounded-xl text-white shadow-md transition-all duration-200 ${
            !isFormValid() || isLoading
              ? "bg-[#BDBDBD] cursor-not-allowed"
              : "bg-gradient-to-r from-[#42A5F5] to-[#2E7D32] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {isLoading ? t.pleaseWait : t.login}
        </Button>

        <p className="text-[#757575] text-sm text-center mt-4 leading-relaxed">
          {t.authorizedPersonnel}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-[#E0E0E0] animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <div className="text-center space-y-1">
          <p className="text-[#757575] text-xs">{t.secureConnection}</p>
          <p className="text-[#9E9E9E] text-xs">{t.privacyProtected}</p>
        </div>
      </div>
    </div>
  );
}