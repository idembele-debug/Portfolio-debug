import { useState, useEffect, useRef } from 'react';

const TERMINAL_LINES = [
  { type: 'output', html: '<span class="t-comment"># ISSA Dembélé — Portfolio Terminal v2.0</span>' },
  { type: 'output', html: '<span class="t-green">✓</span> System ready. Welcome to my interactive portfolio.' },
  { type: 'output', html: '<span class="t-yellow">⟳</span> Loading profile data... <span class="t-green">OK</span>' },
];

const COMMANDS = [
  { cmd: 'cat about.txt', output: 'Engineering Student · AI & Software Development' },
  { cmd: 'uname -a', output: 'ISSA-Dembele 2026 React/Tailwind/FastAPI' },
  { cmd: 'ls skills/', output: 'Python  JavaScript  React  FastAPI  SQL  PHP  C' },
  { cmd: 'curl -X GET /api/status', output: '{"status": "available", "uptime": "100%"}' },
];

export default function HeroSection() {
  const [terminalHtml, setTerminalHtml] = useState('');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    let html = '';
    TERMINAL_LINES.forEach((line) => {
      html += `<span class="terminal-line">${line.html}</span>`;
    });
    history.forEach((h) => {
      html += `<span class="terminal-line"><span class="t-prompt">issa@portfolio</span>:<span class="t-path">~</span>$ <span class="t-cmd">${h.cmd}</span></span>`;
      html += `<span class="terminal-line terminal-output">${h.output}</span>`;
    });
    html += `<span class="terminal-line terminal-input-line">
      <span class="t-prompt">issa@portfolio</span>:<span class="t-path">~</span>$
      <input class="terminal-input" id="term-input" value="${input}" />
    </span>`;
    setTerminalHtml(html);
  }, [history, input]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      if (!cmd) return;
      const found = COMMANDS.find((c) => c.cmd === cmd);
      setHistory((prev) => [...prev, { cmd, output: found ? found.output : `Command not found: ${cmd}` }]);
      setInput('');
    }
  };

  const focusTerminal = () => inputRef.current?.focus();

  return (
    <div className="min-h-screen flex flex-col justify-center items-start px-6 md:px-12 pt-28 pb-20 max-w-[1200px] mx-auto">
      <p className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-5">
        <span className="text-[var(--accent)]">// </span>Engineering Student · AI & Software Development
      </p>
      <h1 className="font-sans text-[clamp(34px,5.5vw,68px)] font-extrabold leading-[1.06] tracking-[-0.03em] max-w-[780px] mb-9">
        From lines of code<br />
        to <em className="not-italic text-[var(--accent)]">real-world impact.</em>
      </h1>
      <div className="text-[11px] text-[var(--muted)] mb-11 flex items-center gap-4">
        <span>since 2023</span>
        <span
          className="bg-[var(--bg3)] border border-[var(--border)] px-2 py-0.5 rounded text-[11px] cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          onClick={focusTerminal}
        >
          press <kbd className="font-mono">/</kbd> to focus terminal
        </span>
      </div>

      <div className="w-full max-w-[740px] animate-fadeUp">
        <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-xl overflow-hidden shadow-[0_28px_72px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg3)] border-b border-[var(--border)]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
            <span className="w-3 h-3 rounded-full bg-[#febc2e]"></span>
            <span className="w-3 h-3 rounded-full bg-[#28c840]"></span>
            <span className="flex-1 text-center text-[11px] text-[var(--muted)]">issa@portfolio:~</span>
          </div>
          <div
            className="p-5 min-h-[220px] text-[13px] leading-[1.9] font-mono"
            dangerouslySetInnerHTML={{ __html: terminalHtml }}
            onClick={focusTerminal}
          />
        </div>
      </div>
    </div>
  );
}