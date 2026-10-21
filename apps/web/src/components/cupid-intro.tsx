import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Cupid } from '@/components/cupid';
import { useHydrated } from '@/hooks/use-hydrated';

const STORAGE_KEY = 'cupid-intro-seen';

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* ignore */
  }
}

export function CupidIntro() {
  const hydrated = useHydrated();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const isEn = location.pathname.startsWith('/en');
  const isHome = location.pathname === '/' || location.pathname === '/en';
  // Only on the home route, first visit per session, and when motion is allowed.
  const shouldConsider = hydrated && isHome;

  useEffect(() => {
    if (!shouldConsider) return;
    if (prefersReducedMotion()) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      seen = false;
    }
    if (seen) return;
    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
      markSeen();
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [shouldConsider]);

  const dismiss = () => {
    setVisible(false);
    markSeen();
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="cupid-intro"
          className="cupid-intro"
          role="dialog"
          aria-label="The Cupid Bureau"
          aria-modal="false"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeIn' }}
        >
          <Cupid variant="mascot" />
          <div className="cupid-intro-wordmark">
            <span className="brand-the">THE</span>
            <span className="brand-name">CUPID BUREAU</span>
          </div>
          <span className="cupid-intro-tagline">{isEn ? 'LESS CHANCE. MORE INTENTION.' : 'MENOS ACASO. MAIS INTENÇÃO.'}</span>
          <button type="button" className="cupid-intro-skip" onClick={dismiss}>
            {isEn ? 'SKIP' : 'SALTAR'}
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
