import { useState } from 'react';
import { supabase } from '../config/supabase';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('Invalid email or password');
        return;
      }

      onLogin();
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7EED2] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl text-[#362C28] mb-2">Admin Access</h1>
          <p className="text-sm text-[#362C28] opacity-70">
            Enter your password to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-wider mb-2 text-[#362C28]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#362C28] bg-white text-sm focus:outline-none focus:border-[#5A3710] transition-colors"
              placeholder="admin@chalice.studio"
              autoFocus
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs uppercase tracking-wider mb-2 text-[#362C28]">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#362C28] bg-white text-sm focus:outline-none focus:border-[#5A3710] transition-colors"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-[#A92424] bg-opacity-10 border border-[#A92424]">
              <p className="text-xs text-[#A92424]">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-[#362C28] text-[#F7EED2] text-xs uppercase tracking-widest hover:bg-[#5A3710] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Access Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-xs text-[#362C28] opacity-70 hover:opacity-100 transition-opacity"
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
