import { useState } from 'react';
import { X, Users, Loader2 } from 'lucide-react';

interface Game {
  id: number;
  title: string;
  image: string;
  players: string;
  category: string;
}

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

function GameModal({ game, onClose }: GameModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayWithFriends = () => {
    setIsLoading(true);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden border border-slate-700 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="relative">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/60 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-900 rounded-full transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="px-3 py-1 bg-cyan-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
              {game.category}
            </span>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-3">{game.title}</h2>

          <div className="flex items-center gap-2 text-slate-300 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>{game.players}</span>
          </div>

          <p className="text-slate-400 mb-6 leading-relaxed">
            Join millions of players worldwide in this epic gaming experience.
            Team up with friends, compete in thrilling matches, and climb the leaderboards
            to prove you're the ultimate champion!
          </p>

          <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
            <h3 className="text-white font-semibold mb-2">Game Features:</h3>
            <ul className="text-slate-400 text-sm space-y-1">
              <li>• Multiplayer support up to 100 players</li>
              <li>• Voice chat and team communication</li>
              <li>• Weekly tournaments and rewards</li>
              <li>• Cross-platform compatibility</li>
            </ul>
          </div>

          {!isLoading ? (
            <button
              onClick={handlePlayWithFriends}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 rounded-lg transition-all duration-200 hover:shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-[1.02] flex items-center justify-center gap-3"
            >
              <Users className="w-5 h-5" />
              Play with Friends
            </button>
          ) : (
            <div className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-lg flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-sm">Loading game session...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameModal;
