import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Header({ onOpenAbout, onOpenContact }) {
  const { isDark, toggle } = useTheme();
  const { t, lang, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLang = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16 h-16 bg-[var(--bg)]/92 backdrop-blur-md border-b border-[var(--border)]">
      <a href="#" className="font-mono font-black text-sm sm:text-base md:text-lg tracking-widest uppercase no-underline text-[var(--text)] whitespace-nowrap">
        <span className="text-[var(--accent)]"></span> Portfolio ISSA D<span className="text-[var(--accent2)]">.</span> <span className="text-[var(--accent)]"></span>
      </a>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8">
        <button onClick={onOpenAbout} className="text-xs tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none font-mono">
          {t('nav.about')}
        </button>
        <a href="#projects" className="text-xs tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition-colors no-underline">
          {t('nav.projects')}
        </a>
        <button onClick={onOpenContact} className="text-xs tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none font-mono">
          {t('nav.contact')}
        </button>
        <div className="flex items-center gap-3 pl-3 border-l border-[var(--border)]">
          <button
            onClick={toggle}
            className="bg-transparent border border-[var(--border)] text-[var(--muted)] cursor-pointer font-mono text-xs px-2.5 py-1 rounded transition-all hover:text-[var(--text)] hover:border-[var(--accent)]"
            aria-label="Toggle theme"
          >
            {isDark ? t('theme.dark') : t('theme.light')}
          </button>
          <button
            onClick={toggleLang}
            className="text-[var(--muted)] font-mono text-xs cursor-pointer bg-transparent border-none hover:text-[var(--accent)] transition-colors"
            aria-label="Toggle language"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
      </nav>

      {/* Mobile menu button */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={toggle}
          className="bg-transparent border border-[var(--border)] text-[var(--muted)] cursor-pointer font-mono text-xs px-2.5 py-1 rounded"
          aria-label="Toggle theme"
        >
          {isDark ? t('theme.dark') : t('theme.light')}
        </button>
        <button
          onClick={toggleLang}
          className="text-[var(--muted)] font-mono text-xs cursor-pointer bg-transparent border border-[var(--border)] px-2 py-1 rounded hover:text-[var(--accent)] transition-colors"
          aria-label="Toggle language"
        >
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-transparent border border-[var(--border)] text-[var(--muted)] cursor-pointer font-mono text-xs px-2 py-1 rounded hover:text-[var(--text)] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[var(--bg)]/98 backdrop-blur-md border-b border-[var(--border)] md:hidden animate-fadeIn">
          <div className="flex flex-col gap-1 p-4">
            <button onClick={() => { onOpenAbout(); setMobileOpen(false); }} className="text-xs tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none font-mono text-left py-2 px-3 rounded hover:bg-[var(--bg2)]">
              {t('nav.about')}
            </button>
            <a href="#projects" onClick={() => setMobileOpen(false)} className="text-xs tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition-colors no-underline py-2 px-3 rounded hover:bg-[var(--bg2)]">
              {t('nav.projects')}
            </a>
            <button onClick={() => { onOpenContact(); setMobileOpen(false); }} className="text-xs tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none font-mono text-left py-2 px-3 rounded hover:bg-[var(--bg2)]">
              {t('nav.contact')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}