import { useCallback, useState } from 'react';
import { AuthModal, type AuthMode } from './components/AuthModal.tsx';
import { DisclaimerBar } from './components/DisclaimerBar.tsx';
import { Download } from './components/Download.tsx';
import { Faq } from './components/Faq.tsx';
import { Features } from './components/Features.tsx';
import { Footer } from './components/Footer.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { PremiumLines } from './components/PremiumLines.tsx';
import { Pricing } from './components/Pricing.tsx';
import { Reviews } from './components/Reviews.tsx';
import { SpeedTest } from './components/SpeedTest.tsx';

export function App() {
  const [user, setUser] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('register');

  const openLogin = useCallback(() => {
    setAuthMode('login');
    setAuthOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setAuthMode('register');
    setAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => setAuthOpen(false), []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-white">
      <Header user={user} onLogin={openLogin} onRegister={openRegister} onLogout={() => setUser(null)} />

      <main>
        <Hero onRegister={openRegister} />
        <PremiumLines />
        <Features />
        <SpeedTest />
        <Pricing />
        <Reviews />
        <Faq />
        <Download onRegister={openRegister} />
      </main>

      <Footer />
      <DisclaimerBar />

      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={closeAuth}
        onModeChange={setAuthMode}
        onAuthed={setUser}
      />
    </div>
  );
}
