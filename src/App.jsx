import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import ParticleBackground from './components/ParticleBackground';
import NotificationToast from './components/NotificationToast';
import AppLayout from './components/AppLayout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import LessonPage from './pages/LessonPage';
import BadgesPage from './pages/BadgesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AskAIPage from './pages/AskAIPage';
import PricingPage from './pages/PricingPage';
import ProgressionPage from './pages/ProgressionPage';
import SettingsPage from './pages/SettingsPage';
import ModulesPage from './pages/ModulesPage';

function AppContent() {
  const { notifications } = useUser();

  return (
    <>
      <ParticleBackground />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/lesson/:moduleId/:lessonIndex" element={<LessonPage />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/badges" element={<BadgesPage />} />
          <Route path="/progression" element={<ProgressionPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/ask-ai" element={<AskAIPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
      <NotificationToast notifications={notifications} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
