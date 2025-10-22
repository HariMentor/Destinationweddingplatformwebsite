'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner@2.0.3';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password === 'wedzway2025') {
      // Set authentication cookie
      document.cookie = 'wedzway_auth=authenticated; path=/; max-age=86400'; // 24 hours
      toast.success('Access granted! Welcome to Wedzway');
      router.push('/');
      router.refresh();
    } else {
      toast.error('Incorrect access code. Please try again.');
      setIsLoading(false);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center size-16 bg-gradient-to-br from-[#DF6951] to-[#F1A501] rounded-full mb-4">
              <Sparkles className="size-8 text-white" />
            </div>
            <h1 className="text-3xl mb-2" style={{ fontFamily: 'Volkhov, serif' }}>
              Welcome to Wedzway
            </h1>
            <p className="text-muted-foreground">
              Enter your access code to continue
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm mb-2">
                Access Code
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter access code"
                  className="pl-10"
                  autoFocus
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#DF6951] hover:bg-[#c5573d]"
              disabled={isLoading || !password}
            >
              {isLoading ? 'Verifying...' : 'Access Platform'}
            </Button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-center text-muted-foreground">
              This is a password-protected demo. Please contact the Wedzway team for access.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
