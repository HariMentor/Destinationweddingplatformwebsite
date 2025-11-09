"use client";

import { useState, useEffect, FormEvent } from "react";
import { Lock, ArrowRight, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

const ACCESS_CODE = "wedzway2025";

interface AccessGateProps {
  children: React.ReactNode;
}

export function AccessGate({ children }: AccessGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user was previously authenticated
    const authenticated = localStorage.getItem("wedzway_authenticated") === "true";
    setIsAuthenticated(authenticated);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (accessCode === ACCESS_CODE) {
      setIsAuthenticated(true);
      localStorage.setItem("wedzway_authenticated", "true");
      setError("");
    } else {
      setError("Invalid access code. Please try again.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setAccessCode("");
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-rose-300 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <Card className={`w-full max-w-md p-8 md:p-12 bg-white/95 backdrop-blur-sm shadow-2xl relative z-10 border-2 ${isShaking ? 'animate-shake' : ''}`}>
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#DF6951] to-[#F1A501] mb-6 shadow-lg">
            <Shield className="size-10 text-white" />
          </div>
          <h1 className="text-4xl mb-3" style={{ fontFamily: 'Volkhov, serif' }}>
            Wedzway
          </h1>
          <p className="text-muted-foreground">
            Destination Wedding Platform
          </p>
        </div>

        {/* Divider */}
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#DF6951] to-transparent mx-auto mb-8" />

        {/* Access Form */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="size-5 text-[#DF6951]" />
            <h2 className="text-xl">Protected Content</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            This pitch deck is password protected. Please enter your access code to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="h-12 bg-white border-2 focus:border-[#DF6951] transition-colors"
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-600 mt-2 animate-in fade-in slide-in-from-top-1">
                  {error}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-[#DF6951] to-[#F1A501] hover:from-[#DF6951]/90 hover:to-[#F1A501]/90 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Access Pitch Deck
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </form>
        </div>

        {/* Info */}
        <div className="pt-6 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            Don't have an access code? Contact us at{" "}
            <a href="mailto:hello@wedzway.co" className="text-[#DF6951] hover:underline">
              hello@wedzway.co
            </a>
          </p>
        </div>
      </Card>

      {/* Decorative Circles */}
      <div className="absolute top-10 right-10 w-32 h-32 border-2 border-[#DF6951]/20 rounded-full" />
      <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-[#F1A501]/20 rounded-full" />
      <div className="absolute top-1/3 left-20 w-16 h-16 border-2 border-orange-300/30 rounded-full" />

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}