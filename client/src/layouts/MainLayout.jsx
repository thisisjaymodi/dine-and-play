import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { FaChevronUp } from 'react-icons/fa6';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer';
import CookieConsentBanner from '../components/CookieConsentBanner';

function HashScrollHandler() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const targetId = decodeURIComponent(hash.slice(1));
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    requestAnimationFrame(() => {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [hash, pathname]);

  return null;
}

export default function MainLayout() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Show button if scrolled more than 400px
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHome = () => {
    // Navigate to #home to update URL
    navigate('/#home');

    // If we're already at #home in the URL, the navigate might not trigger HashScrollHandler's effect
    // so we force a manual scroll as well to be sure
    if (hash === '#home') {
      const homeEl = document.getElementById('home');
      if (homeEl) {
        homeEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden relative">
      <HashScrollHandler />

      {/* These stay fixed across all pages */}
      <Navbar />

      <main className="flex-grow w-full">
        {/* The specific page (Home, Terms, etc.) renders RIGHT HERE */}
        <Outlet />
      </main>

      {/* "To top" Button */}
      <button
        onClick={scrollToHome}
        className={`fixed bottom-8 right-8 z-[60] p-4 rounded-2xl bg-primary text-white shadow-2xl shadow-primary/40 transition-all duration-300 hover:scale-110 hover:bg-primary/90 active:scale-95 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
          }`}
        aria-label="Scroll to top"
      >
        <FaChevronUp className="h-5 w-5" />
      </button>

      {/* This also stays fixed */}
      <Footer />
    </div>
  );
}
