import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import walmartLogoBlue from '@/assets/walmart-logo-blue.png';
import walmartLogoWhite from '@/assets/walmart-logo-white.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo credentials
    if (username === 'Arjun_Mehra1' && password === 'Walmart@123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <img src={walmartLogoWhite} alt="Walmart" className="w-8 h-8 mr-2" />
            <div className="text-2xl font-bold text-[#0071dc]">Walmart</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Walmart Logo */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <img src={walmartLogoBlue} alt="Walmart" className="w-16 h-16" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Sign in to your account
            </h1>
            <p className="text-gray-600">
              Enter your username and password to continue
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#0071dc] focus:border-[#0071dc]"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#0071dc] focus:border-[#0071dc]"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#0071dc] hover:bg-[#005bb5] text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              Continue
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h3>
            <p className="text-sm text-blue-700">Username: Arjun_Mehra1</p>
            <p className="text-sm text-blue-700">Password: Walmart@123</p>
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Securing your personal information is our priority.{' '}
              <a href="#" className="text-[#0071dc] hover:underline">
                See our privacy measures.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;