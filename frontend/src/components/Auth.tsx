import React, { useState } from 'react';
import { Cloud } from 'lucide-react';

interface AuthProps {
  onSuccess: (token: string, username: string) => void;
  setAlertInfo: (info: { title: string, message: string } | null) => void;
}

export const Auth: React.FC<AuthProps> = ({ onSuccess, setAlertInfo }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await api.login({ username, password });
        onSuccess(response.access_token, username);
      } else {
        await api.register({ username, password });
        setIsLogin(true);
        setPassword('');
        setAlertInfo({ 
          title: 'Success!', 
          message: 'Registration successful. Please log in.' 
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message.includes('unique constraint') ? 'Username already exists.' : message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-[#D5DEEF] text-[#395886] flex items-center justify-center p-4">
      <div className="bg-[#F0F3FA] border border-[#B1C9EF] rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Cloud className="w-12 h-12 text-[#84AAEC]" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 text-[#395886]">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-center text-[#395886] mb-6">
          {isLogin ? 'Sign in to CloudPad' : 'Write freely with CloudPad'}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#395886] mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 bg-white border border-[#B1C9EF] rounded-lg focus:ring-2 focus:ring-[#84AAEC] focus:border-transparent outline-none text-[#395886]"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#395886] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 bg-white border border-[#B1C9EF] rounded-lg focus:ring-2 focus:ring-[#84AAEC] focus:border-transparent outline-none text-[#395886]"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#84AAEC] text-white py-2 rounded-lg font-semibold hover:bg-[#628FCB] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-[#628FCB] hover:text-[#395886] font-medium transition"
            disabled={loading}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};


const API_URL = 'http://localhost:3000/api';
class ApiService {
  async register(data: any): Promise<any> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    return response.json();
  }
  async login(data: any): Promise<any> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    return response.json();
  }
}
const api = new ApiService();

