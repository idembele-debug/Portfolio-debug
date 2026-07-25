import { useTheme } from '../../context/ThemeContext';

export default function Header({ onOpenAbout, onOpenContact, onOpenHistoire }) {
  const { isDark, toggle } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-14 bg-[var(--bg)]/92 backdrop-blur-md border-b border-[var(--border)]">
      <a href="#" className="font-mono font-black text-base md:text-lg tracking-widest uppercase no-underline text-[var(--text)]">
        <span className="text-[var(--accent)] text-xl">[</span> Portfolio ISSA D<span className="text-[var(--accent2)]">.</span> <span className="text-[var(--accent)] text-xl">]</span>
      </a>

      <nav className="hidden md:flex items-center gap-7">
        <button onClick={onOpenAbout} className="text-xs tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none font-mono">
          About me
        </button>
        <a href="#projects" className="text-xs tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition-colors no-underline">
          Projects
        </a>
        <button onClick={onOpenContact} className="text-xs tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none font-mono">
          Contact
        </button>
        <button onClick={onOpenHistoire} className="text-xs tracking-wider text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer bg-transparent border-none font-mono">
          Histoire
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="bg-transparent border border-[var(--border)] text-[var(--muted)] cursor-pointer font-mono text-xs px-2.5 py-1 rounded transition-all hover:text-[var(--text)] hover:border-[var(--accent)]"
          >
            {isDark ? '☀' : '◐'}
          </button>
          <span className="text-[var(--border)] text-xs">|</span>
          <span className="text-[var(--muted)] font-mono text-xs">EN</span>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className="flex md:hidden items-center gap-3">
        <button
          onClick={toggle}
          className="bg-transparent border border-[var(--border)] text-[var(--muted)] cursor-pointer font-mono text-xs px-2.5 py-1 rounded"
        >
          {isDark ? '☀' : '◐'}
        </button>
      </div>
    </header>
  );
}