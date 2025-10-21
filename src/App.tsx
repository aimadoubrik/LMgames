import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import GamesDashboard from './components/GamesDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'dashboard'>('landing');

  if (currentPage === 'dashboard') {
    return <GamesDashboard onLogout={() => setCurrentPage('landing')} />;
  }

  if (currentPage === 'login') {
    return (
      <LoginPage
        onBack={() => setCurrentPage('landing')}
        onLogin={() => setCurrentPage('dashboard')}
      />
    );
  }

  return <LandingPage onLoginClick={() => setCurrentPage('login')} />;
}

export default App;
