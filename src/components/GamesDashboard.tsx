import { useState, useEffect, useRef } from 'react';
import { Gamepad2, LogOut, Search, Grid3x3, List, Star, TrendingUp, Clock, Users, Play, Filter, Loader2, UserPlus } from 'lucide-react';

interface GamesDashboardProps {
  onLogout: () => void;
}

interface Game {
  id: number;
  title: string;
  image: string;
  players: string;
  category: string;
  rating: number;
  trending: boolean;
}

function GamesDashboard({ onLogout }: GamesDashboardProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingGame, setLoadingGame] = useState<Game | null>(null);
  const [isPlayingWithFriend, setIsPlayingWithFriend] = useState(false);
  const [showFriendsDropdown, setShowFriendsDropdown] = useState(false);
  const friendsDropdownRef = useRef<HTMLDivElement>(null);

  const games: Game[] = [
    {
      id: 1,
      title: 'Battle Royale',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600',
      players: '1.2M',
      category: 'Action',
      rating: 4.8,
      trending: true
    },
    {
      id: 2,
      title: 'Racing Legends',
      image: 'https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=600',
      players: '850K',
      category: 'Racing',
      rating: 4.6,
      trending: false
    },
    {
      id: 3,
      title: 'Space Odyssey',
      image: 'https://images.pexels.com/photos/2562992/pexels-photo-2562992.png?auto=compress&cs=tinysrgb&w=600',
      players: '620K',
      category: 'Adventure',
      rating: 4.9,
      trending: true
    },
    {
      id: 4,
      title: 'Medieval Wars',
      image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=600',
      players: '540K',
      category: 'Strategy',
      rating: 4.7,
      trending: false
    },
    {
      id: 5,
      title: 'Cyber Punk 2088',
      image: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=600',
      players: '980K',
      category: 'RPG',
      rating: 4.9,
      trending: true
    },
    {
      id: 6,
      title: 'Fantasy Quest',
      image: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=600',
      players: '720K',
      category: 'Adventure',
      rating: 4.5,
      trending: false
    },
    {
      id: 7,
      title: 'Soccer Champions',
      image: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=600',
      players: '1.5M',
      category: 'Sports',
      rating: 4.8,
      trending: true
    },
    {
      id: 8,
      title: 'Zombie Survival',
      image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=600',
      players: '450K',
      category: 'Horror',
      rating: 4.4,
      trending: false
    }
  ];

  const categories = ['All', 'Action', 'Racing', 'Adventure', 'Strategy', 'RPG', 'Sports', 'Horror'];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const trendingGames = games.filter(game => game.trending).slice(0, 3);

  const handlePlayNow = (game: Game) => {
    setLoadingGame(game);
    setIsLoading(true);
    
    // Simulate loading time (you can replace this with actual game loading logic)
    setTimeout(() => {
      setIsLoading(false);
      setLoadingGame(null);
      // Here you would typically navigate to the game or start the game
      console.log(`Starting game: ${game.title}`);
    }, 3000);
  };

  const handlePlayWithFriend = () => {
    setIsPlayingWithFriend(true);
    
    // Simulate loading time for friend invitation
    setTimeout(() => {
      setIsPlayingWithFriend(false);
      console.log('Invited aimadoubrik to play!');
    }, 2000);
  };

  const toggleFriendsDropdown = () => {
    setShowFriendsDropdown(!showFriendsDropdown);
  };


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (friendsDropdownRef.current && !friendsDropdownRef.current.contains(event.target as Node)) {
        setShowFriendsDropdown(false);
      }
    };

    if (showFriendsDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFriendsDropdown]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                LMgames
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* Online Friends Badge */}
              <div className="relative" ref={friendsDropdownRef}>
                <button 
                  onClick={toggleFriendsDropdown}
                  className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
                    showFriendsDropdown ? 'ring-2 ring-green-300 ring-opacity-50' : ''
                  }`}
                >
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">Online Friends</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">1</span>
                </button>
                
                {/* Friends Dropdown */}
                {showFriendsDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-600" />
                        Online Friends (1)
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Your friends who are currently online</p>
                    </div>
                    
                    <div className="p-3">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                              A
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full shadow-sm">
                              <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">aimadoubrik</p>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              Playing Battle Royale
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Online Now</p>
                          </div>
                        </div>
                        <button
                          onClick={handlePlayWithFriend}
                          disabled={isPlayingWithFriend}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                        >
                          {isPlayingWithFriend ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Inviting...</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Play</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-3 border-t border-gray-100 bg-gray-50">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300">
                        <UserPlus className="w-4 h-4" />
                        <span className="text-sm font-medium">Find More Friends</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">Ready to play? Choose your next adventure</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">2M+</span>
            </div>
            <p className="text-sm text-gray-600">Active Players</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-pink-600" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">{games.length}</span>
            </div>
            <p className="text-sm text-gray-600">Games Available</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">24/7</span>
            </div>
            <p className="text-sm text-gray-600">Online Support</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">Top 10</span>
            </div>
            <p className="text-sm text-gray-600">Global Ranking</p>
          </div>
        </div>

        {/* Trending Games Carousel */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            Trending Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trendingGames.map((game, index) => (
              <div
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold text-white">
                    #{index + 1} Trending
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{game.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white text-sm">
                        <Users className="w-4 h-4" />
                        <span>{game.players} playing</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white text-sm font-semibold">{game.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search games by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all"
              >
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Games Grid/List */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            All Games ({filteredGames.length})
          </h2>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-200"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900">
                    {game.category}
                  </div>
                  {game.trending && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Hot
                    </div>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayNow(game);
                    }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl">
                      <Play className="w-6 h-6 text-purple-600 ml-1" />
                    </div>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {game.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      {game.players} online
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">{game.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-64 h-48 sm:h-auto overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {game.trending && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Hot
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {game.title}
                        </h3>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-semibold text-gray-700">
                          {game.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{game.players} online</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900">{game.rating}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayNow(game);
                      }}
                      className="self-start px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Play Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredGames.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
            <Gamepad2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium mb-2">No games found</p>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedGame(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img
                src={selectedGame.image}
                alt={selectedGame.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <button
                onClick={() => setSelectedGame(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all"
              >
                <span className="text-gray-900 text-xl">×</span>
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{selectedGame.title}</h2>
                <div className="flex items-center gap-4 text-white">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                    {selectedGame.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{selectedGame.players} playing</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{selectedGame.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Experience the ultimate gaming adventure with {selectedGame.title}. Join millions of players worldwide and compete for glory in this {selectedGame.category.toLowerCase()} masterpiece.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button 
                  onClick={() => handlePlayNow(selectedGame)}
                  className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Play Now
                </button>
                <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-all duration-300">
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Modal */}
      {isLoading && loadingGame && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
            <div className="relative h-48 overflow-hidden">
              <img
                src={loadingGame.image}
                alt={loadingGame.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-2xl font-bold text-white mb-1">{loadingGame.title}</h2>
                <p className="text-white/80 text-sm">{loadingGame.category}</p>
              </div>
            </div>
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Searching friends...</h3>
                <p className="text-gray-600">Preparing your gaming experience</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Initializing game engine</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Loading assets</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Connecting to servers</span>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Finalizing setup</span>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Almost ready...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GamesDashboard;