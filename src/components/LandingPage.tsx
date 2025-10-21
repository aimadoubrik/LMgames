import { Gamepad2, Zap, Trophy, Users } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
}

function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="px-6 py-4 flex items-center justify-between border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-8 h-8 text-cyan-400" />
          <span className="text-2xl font-bold text-white">GameZone</span>
        </div>
        <button
          onClick={onLoginClick}
          className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/50"
        >
          Login
        </button>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Level Up Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Gaming Experience
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of gamers worldwide. Compete, connect, and conquer in the ultimate gaming platform.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={onLoginClick}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-200 hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105"
            >
              Get Started
            </button>
            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-all duration-200 border border-slate-600">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
            <p className="text-slate-300 leading-relaxed">
              Experience seamless gameplay with our optimized servers. Zero lag, maximum fun.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Compete & Win</h3>
            <p className="text-slate-300 leading-relaxed">
              Join tournaments, climb leaderboards, and earn exclusive rewards for your skills.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Global Community</h3>
            <p className="text-slate-300 leading-relaxed">
              Connect with millions of players. Form teams, make friends, dominate together.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join our community today and start your journey to becoming a gaming legend.
          </p>
          <button
            onClick={onLoginClick}
            className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-200 hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-105"
          >
            Login Now
          </button>
        </div>
      </main>

      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm py-8 mt-20">
        <div className="container mx-auto px-6 text-center text-slate-400">
          <p>© 2024 GameZone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
