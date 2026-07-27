import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';

const HISTORY_CHAPTERS = [
  { year: '2023', titleKey: 'histoire.chapter.2023', descKey: 'histoire.chapter.2023.desc' },
  { year: '2024', titleKey: 'histoire.chapter.2024', descKey: 'histoire.chapter.2024.desc' },
  { year: '2025', titleKey: 'histoire.chapter.2025', descKey: 'histoire.chapter.2025.desc' },
  { year: '2026', titleKey: 'histoire.chapter.2026', descKey: 'histoire.chapter.2026.desc' },
];

const AVAILABLE_CMDS = [
  ['help', 'terminal.help.desc'],
  ['clear', 'terminal.clear.desc'],
  ['whoami', 'terminal.whoami.desc'],
  ['about', 'terminal.about.desc'],
  ['history', 'terminal.history.desc'],
  ['projects', 'terminal.projects.desc'],
  ['skills', 'terminal.skills.desc'],
  ['contact', 'terminal.contact.desc'],
  ['social', 'terminal.social.desc'],
  ['github', 'terminal.github.desc'],
  ['linkedin', 'terminal.linkedin.desc'],
  ['cv', 'terminal.cv.desc'],
  ['email', 'terminal.email.desc'],
  ['theme', 'terminal.theme.desc'],
  ['language', 'terminal.language.desc'],
  ['time', 'terminal.time.desc'],
  ['date', 'terminal.date.desc'],
  ['experience', 'terminal.experience.desc'],
  ['education', 'terminal.education.desc'],
  ['ls', 'terminal.ls.desc'],
  ['pwd', 'terminal.pwd.desc'],
  ['echo', 'terminal.echo.desc'],
];

function createInitialLines(t) {
  return [
    { type: 'output', html: `<span class="t-comment"># ${t('terminal.welcome')}</span>` },
    { type: 'output', html: `<span class="t-green">✓</span> ${t('terminal.system.ready')}` },
    { type: 'output', html: `<span class="t-yellow">⟳</span> ${t('terminal.loading')}` },
    { type: 'output', html: `<span class="t-accent">⟹</span> ${t('terminal.help.hint')}` },
  ];
}

export default function HeroSection() {
  const [lines, setLines] = useState(() => createInitialLines({ t: (k) => k }));
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const { t, lang, setLang } = useLanguage();
  const { isDark, toggle } = useTheme();
  const tRef = useRef(t);
  const langRef = useRef(lang);
  const isDarkRef = useRef(isDark);

  useEffect(() => { tRef.current = t; }, [t]);
  useEffect(() => { langRef.current = lang; }, [lang]);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    setLines(createInitialLines(t));
  }, [lang, t]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    const handler = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const addOutput = useCallback((html) => {
    setLines((prev) => [...prev, { type: 'output', html }]);
  }, []);

  const exec = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(' ');
    const command = parts[0];
    const args = parts.slice(1).join(' ');
    const curT = tRef.current;
    const curLang = langRef.current;
    const curDark = isDarkRef.current;

    const promptLine = `<span class="t-prompt">issa@portfolio</span>:<span class="t-path">~</span>$ <span class="t-cmd">${cmd}</span>`;
    setLines((prev) => [...prev, { type: 'command', html: promptLine }]);

    const output = (html) => addOutput(html);

    if (command === 'help') {
      output(`<span class="t-accent">${curT('terminal.help.title')}</span>`);
      AVAILABLE_CMDS.forEach(([c, dk]) => {
        const pad = ' '.repeat(Math.max(1, 15 - c.length));
        output(`  <span class="t-accent">${c}</span>${pad}${curT(dk)}`);
      });
    } else if (command === 'clear') {
      setLines([]);
    } else if (command === 'whoami' || command === 'about') {
      output(`<span class="t-white">${curT('terminal.about.text')}</span>`);
    } else if (command === 'history') {
      HISTORY_CHAPTERS.forEach((ch) => {
        output(`<span class="t-accent">▸ ${ch.year}</span> — <span class="t-white">${curT(ch.titleKey)}</span>`);
        output(`  <span class="t-muted">${curT(ch.descKey)}</span>`);
      });
    } else if (command === 'projects') {
      output(`<span class="t-yellow">${curT('terminal.projects.empty')}</span>`);
    } else if (command === 'skills') {
      output(`<span class="t-green">${curT('terminal.skills.list')}</span>`);
    } else if (command === 'contact') {
      output(`<span class="t-white">${curT('terminal.contact.text')}</span>`);
    } else if (command === 'social') {
      output(`<span class="t-white">${curT('terminal.social.text')}</span>`);
    } else if (command === 'github') {
      output(`<span class="t-accent">${curT('terminal.github.text')}</span>`);
      window.open('https://github.com/idembele-debug', '_blank');
    } else if (command === 'linkedin') {
      output(`<span class="t-accent">${curT('terminal.linkedin.text')}</span>`);
      window.open('https://linkedin.com/in/ISSA-D-DEMBELE', '_blank');
    } else if (command === 'cv') {
      output(`<span class="t-yellow">${curT('terminal.cv.text')}</span>`);
    } else if (command === 'email') {
      output(`<span class="t-accent">${curT('terminal.email.text')}</span>`);
    } else if (command === 'theme') {
      toggle();
      output(`<span class="t-green">${curDark ? curT('terminal.theme.light') : curT('terminal.theme.dark')}</span>`);
    } else if (command === 'language') {
      if (args === 'en') {
        setLang('en');
        output(`<span class="t-green">${curT('terminal.language.en')}</span>`);
      } else if (args === 'fr') {
        setLang('fr');
        output(`<span class="t-green">${curT('terminal.language.fr')}</span>`);
      } else {
        output(`<span class="t-yellow">${curT('terminal.language.en')}</span>`);
      }
    } else if (command === 'time') {
      output(`<span class="t-white">${new Date().toLocaleTimeString(curLang === 'fr' ? 'fr-FR' : 'en-US')}</span>`);
    } else if (command === 'date') {
      output(`<span class="t-white">${new Date().toLocaleDateString(curLang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>`);
    } else if (command === 'experience') {
      output(`<span class="t-white">${curT('terminal.experience.text')}</span>`);
    } else if (command === 'education') {
      output(`<span class="t-white">${curT('terminal.education.text')}</span>`);
    } else if (command === 'ls') {
      output(`<span class="t-accent">about/</span>  <span class="t-accent">projects/</span>  <span class="t-accent">skills/</span>  <span class="t-accent">contact/</span>  <span class="t-green">README.md</span>`);
    } else if (command === 'pwd') {
      output(`<span class="t-path">/home/issa/portfolio</span>`);
    } else if (command === 'echo') {
      output(`<span class="t-white">${curT('terminal.echo.text')}${args}</span>`);
    } else {
      output(`<span class="t-red">${curT('terminal.not_found')} ${cmd}</span>`);
    }
  }, [addOutput, toggle, setLang]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      if (!cmd) return;
      exec(cmd);
      setInput('');
    }
  };

  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-start px-4 sm:px-6 md:px-12 pt-28 pb-20 max-w-[1200px] mx-auto w-full">
      <p className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-5">
        <span className="text-[var(--accent)]">// </span>{t('hero.subtitle')}
      </p>
      <h1 className="font-sans text-[clamp(28px,5.5vw,68px)] font-extrabold leading-[1.06] tracking-[-0.03em] max-w-[780px] mb-9">
        {t('hero.title.line1')}<br />
        <span dangerouslySetInnerHTML={{ __html: t('hero.title.line2') }} />
      </h1>
      <div className="text-[11px] text-[var(--muted)] mb-11 flex items-center gap-4 flex-wrap">
        <span>{t('hero.since')}</span>
        <span
          className="bg-[var(--bg3)] border border-[var(--border)] px-2 py-0.5 rounded text-[11px] cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors select-none"
          onClick={focusTerminal}
        >
          {t('hero.press')} <kbd className="font-mono border border-[var(--border)] rounded px-1 mx-0.5">/</kbd> {t('hero.focus')}
        </span>
      </div>

      <div className="w-full max-w-[740px] animate-fadeUp" onClick={focusTerminal}>
        <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-xl overflow-hidden shadow-[0_28px_72px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg3)] border-b border-[var(--border)]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
            <span className="w-3 h-3 rounded-full bg-[#febc2e]"></span>
            <span className="w-3 h-3 rounded-full bg-[#28c840]"></span>
            <span className="flex-1 text-center text-[11px] text-[var(--muted)]">{t('terminal.header')}</span>
          </div>
          <div
            ref={terminalRef}
            className="p-4 sm:p-5 min-h-[220px] max-h-[420px] overflow-y-auto text-[13px] leading-[1.9] font-mono"
          >
            {lines.map((line, i) => (
              <span key={i} className="terminal-line" dangerouslySetInnerHTML={{ __html: line.html }} />
            ))}
            <span className="terminal-line terminal-input-line">
              <span className="t-prompt">issa@portfolio</span>:<span className="t-path">~</span>$
              <input
                ref={inputRef}
                className="terminal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}