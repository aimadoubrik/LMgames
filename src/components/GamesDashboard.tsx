import { useState } from 'react';
import { Gamepad2, LogOut, Search } from 'lucide-react';
import GameModal from './GameModal';

interface GamesDashboardProps {
  onLogout: () => void;
}

interface Game {
  id: number;
  title: string;
  image: string;
  players: string;
  category: string;
}

function GamesDashboard({ onLogout }: GamesDashboardProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const games: Game[] = [
    {
      id: 1,
      title: 'Battle Royale',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
      players: '1.2M online',
      category: 'Action'
    },
    {
      id: 2,
      title: 'Racing Legends',
      image: 'https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=400',
      players: '850K online',
      category: 'Racing'
    },
    {
      id: 3,
      title: 'Space Odyssey',
      image: 'https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&cs=tinysrgb&w=400',
      players: '620K online',
      category: 'Adventure'
    },
    {
      id: 4,
      title: 'Medieval Wars',
      image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400',
      players: '540K online',
      category: 'Strategy'
    },
    {
      id: 5,
      title: 'Cyber Punk 2088',
      image: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=400',
      players: '980K online',
      category: 'RPG'
    },
    {
      id: 6,
      title: 'Fantasy Quest',
      image: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=400',
      players: '720K online',
      category: 'Adventure'
    },
    {
      id: 7,
      title: 'Soccer Champions',
      image: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=400',
      players: '1.5M online',
      category: 'Sports'
    },
    {
      id: 8,
      title: 'Zombie Survival',
      image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=400',
      players: '450K online',
      category: 'Horror'
    }
  ];

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="px-6 py-4 flex items-center justify-between border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-8 h-8 text-cyan-400" />
          <span className="text-2xl font-bold text-white">GameZone</span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-200 border border-slate-600"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back, Gamer!</h1>
          <p className="text-slate-400">Choose your next adventure</p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60"></div>
                <div className="absolute top-3 right-3 px-3 py-1 bg-cyan-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                  {game.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {game.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {game.players}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No games found matching your search.</p>
          </div>
        )}
      </main>

      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  );
}

export default GamesDashboard;
