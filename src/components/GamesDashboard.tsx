import { LogOut } from 'lucide-react';

interface GamesDashboardProps {
  onLogout: () => void;
}

function GamesDashboard({ onLogout }: GamesDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-12 text-center">
            <div className="mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg flex items-center justify-center text-white text-4xl font-bold">
              H
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
              Welcome, Hanan
            </h1>
            <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              We're glad you're here. Your personalized space is ready with a clean and beautiful experience. Relax, explore, and enjoy your time.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Status</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">Signed in</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Username</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">Hanan</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Next step</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">Get started</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-black transition-colors shadow-md"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamesDashboard;