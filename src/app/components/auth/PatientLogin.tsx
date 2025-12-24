import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Mail, Smartphone, Shield, Globe } from "lucide-react";
import { Button } from "../ui/button";
import { translations, languages, type Language } from "../../utils/translations";

interface PatientLoginProps {
  onBack?: () => void;
  onLogin?: () => void;
}

export function PatientLogin({ onBack, onLogin }: PatientLoginProps) {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
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

  const handleSendOTP = () => {
    setError("");
    
    if (!phoneOrEmail.trim()) {
      setError(t.errorPhoneEmail);
      return;
    }

    setIsLoading(true);
    
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1000);
  };

  const handleVerifyOTP = () => {
    setError("");
    
    if (!otp.trim() || otp.length < 6) {
      setError(t.errorOTP);
      return;
    }

    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      onLogin?.();
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col bg-background px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <button 
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-secondary rounded-xl transition-all duration-200"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-[20px] flex items-center justify-center shadow-md">
            <Shield className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-primary font-bold">QueueLess</h1>
        </div>
        
        {/* Language Selector */}
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="p-2 hover:bg-secondary rounded-xl transition-all duration-200 hover:scale-105"
            title="Change Language"
          >
            <Globe className="w-6 h-6 text-foreground" strokeWidth={1.5} />
          </button>

          {/* Language Dropdown */}
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-card rounded-[16px] shadow-xl border border-border overflow-hidden z-50 animate-fade-in">
              <div className="px-4 py-2 bg-secondary border-b border-border">
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Select Language</p>
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLanguageDropdown(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center justify-between hover:bg-secondary transition-all duration-200 text-left ${
                    language === lang.code ? "bg-primary/5" : ""
                  }`}
                >
                  <span className="text-foreground font-medium">{lang.nativeName}</span>
                  {language === lang.code && (
                    <span className="text-primary font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h2 className="text-foreground mb-2">{t.patientLogin}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {otpSent ? t.otpSentMessage : t.getStartedMessage}
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        {/* Phone/Email Field */}
        <div className="mb-6">
          <label className="text-foreground mb-2 block font-medium">{t.phoneEmail}</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Mail className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <input
              type="text"
              value={phoneOrEmail}
              onChange={(e) => {
                setPhoneOrEmail(e.target.value);
                setError("");
              }}
              disabled={otpSent}
              placeholder={t.phoneEmailPlaceholder}
              className="w-full pl-12 pr-4 py-4 border border-border rounded-[10px] text-foreground bg-input-background placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-muted disabled:text-muted-foreground transition-all duration-200"
            />
          </div>
          {otpSent && (
            <button
              onClick={() => {
                setOtpSent(false);
                setOtp("");
              }}
              className="text-primary text-sm mt-2 hover:underline font-medium"
            >
              {t.changePhoneEmail}
            </button>
          )}
        </div>

        {/* OTP Field (shown after sending) */}
        {otpSent && (
          <div className="mb-6 animate-fade-in-up">
            <label className="text-foreground mb-2 block font-medium">{t.enterOTP}</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Smartphone className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(value);
                  setError("");
                }}
                placeholder={t.enterOTPPlaceholder}
                maxLength={6}
                className="w-full pl-12 pr-4 py-4 border border-border rounded-[10px] text-foreground bg-input-background placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 tracking-widest transition-all duration-200"
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-muted-foreground text-sm">{t.codeExpires}</p>
              <button className="text-primary text-sm hover:underline font-medium">
                {t.resendOTP}
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-[12px] p-4 mb-6 animate-fade-in">
            <p className="text-destructive font-medium">❌ {error}</p>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={otpSent ? handleVerifyOTP : handleSendOTP}
          disabled={isLoading || !phoneOrEmail.trim()}
          className={`w-full py-4 rounded-[12px] text-white font-medium shadow-md transition-all duration-200 ${
            isLoading || !phoneOrEmail.trim()
              ? "bg-muted-foreground cursor-not-allowed"
              : "bg-primary hover:bg-primary-hover hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {isLoading ? t.pleaseWait : otpSent ? t.verifyLogin : t.sendOTP}
        </Button>

        {!otpSent && (
          <p className="text-muted-foreground text-sm text-center mt-4 leading-relaxed">
            {t.verificationCodeMessage}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-border animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <div className="text-center space-y-1">
          <p className="text-muted-foreground text-xs font-medium">{t.secureConnection}</p>
          <p className="text-muted-foreground/70 text-xs">{t.privacyProtected}</p>
        </div>
      </div>
    </div>
  );
}