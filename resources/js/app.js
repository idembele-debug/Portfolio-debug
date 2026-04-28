/**
 * Portfolio ISSA D. — app.js
 * All interactive features: terminal, overlays, filters, theme
 */

/* ══════════════════════════════════════
   THEME TOGGLE
   ══════════════════════════════════════ */
let isDark = true;

function toggleTheme() {
    isDark = !isDark;
    document.body.classList.toggle('light', !isDark);
}


/* ══════════════════════════════════════
   LANGUAGE TOGGLE
   ══════════════════════════════════════ */
let isEn = true;

function toggleLang() {
    isEn = !isEn;
    document.getElementById('lang-btn').textContent = isEn ? 'EN' : 'FR';
}


/* ══════════════════════════════════════
   TERMINAL
   ══════════════════════════════════════ */

/** Available commands and their outputs */
const cmds = {
    help: `<span class="t-green">Available commands:</span>
  <span class="t-accent">whoami</span>    → about me
  <span class="t-accent">about</span>     → who I am
  <span class="t-accent">projects</span>  → my work
  <span class="t-accent">skills</span>    → tech stack
  <span class="t-accent">contact</span>   → get in touch
  <span class="t-accent">histoire</span>  → my story
  <span class="t-accent">clear</span>     → clear terminal`,

    whoami:   '__ABOUT__',
    about:    '__ABOUT__',
    contact:  '__CONTACT__',
    histoire: '__HISTOIRE__',
    clear:    '__CLEAR__',

    projects: `<span class="t-yellow">4 projects found.</span> Scrolling to projects...`,

    skills: `<span class="t-green">Languages:</span>  Python · PHP · JavaScript · C · HTML · CSS · React JS
  <span class="t-green">Frameworks:</span> Flask · Pandas · Numpy · Matplotlib · Laravel
  <span class="t-green">Tools:</span>      VS Code · MySQL · Git
  <span class="t-green">Soft:</span>       Communication · Adaptability · Detail-oriented`,
};

/** Terminal state */
let termLines = [
    '<div class="terminal-line"><span class="t-accent" style="font-size:20px;font-weight:700;letter-spacing:3px">ISSA D.#</span></div>',
    '<div class="terminal-line t-comment">Welcome to ISSA D. terminal. Type "help" for commands.</div>',
    '<div class="terminal-line">&nbsp;</div>',
];
let cmdHistory = [];
let histIdx    = -1;
const termOut  = document.getElementById('terminal-output');

/** Render terminal DOM */
function renderTerm(lines) {
    termOut.innerHTML = lines.join('') + `
        <div class="terminal-input-line">
            <span class="t-prompt">issa</span><span style="color:var(--muted)">@</span><span class="t-path">portfolio</span><span style="color:var(--muted)">:~$</span>
            <input class="terminal-input" id="term-input" autocomplete="off" spellcheck="false" placeholder="type 'help'">
        </div>`;
    document.getElementById('term-input').addEventListener('keydown', onTermKey);
}

/** Handle terminal keydown */
function onTermKey(e) {
    const inp = document.getElementById('term-input');

    if (e.key === 'Enter') {
        const cmd = inp.value.trim().toLowerCase();
        if (!cmd) return;

        cmdHistory.unshift(cmd);
        histIdx = -1;

        // Echo the command
        termLines.push(`<div class="terminal-line"><span class="t-prompt">issa</span><span style="color:var(--muted)">@</span><span class="t-path">portfolio</span><span style="color:var(--muted)">:~$</span> <span class="t-cmd">${esc(cmd)}</span></div>`);

        const response = cmds[cmd];

        if (response === '__CLEAR__') {
            termLines = [];

        } else if (response === '__ABOUT__') {
            termLines.push('<div class="terminal-output"><span class="t-green">Opening about me...</span></div>');
            setTimeout(openAbout, 400);

        } else if (response === '__CONTACT__') {
            termLines.push('<div class="terminal-output"><span class="t-green">Opening contact...</span></div>');
            setTimeout(openContact, 400);

        } else if (response === '__HISTOIRE__') {
            termLines.push('<div class="terminal-output"><span class="t-green">Opening my story...</span></div>');
            setTimeout(openHistoire, 400);

        } else if (response) {
            termLines.push(`<div class="terminal-output">${response}</div>`);
            if (cmd === 'projects') {
                setTimeout(() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }), 400);
            }

        } else {
            termLines.push(`<div class="terminal-output"><span class="t-red">command not found: ${esc(cmd)}</span> — try <span class="t-accent">help</span></div>`);
        }

        termLines.push('<div class="terminal-line">&nbsp;</div>');
        renderTerm(termLines);
        document.getElementById('term-input').focus();

    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (histIdx < cmdHistory.length - 1) {
            histIdx++;
            inp.value = cmdHistory[histIdx];
        }

    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (histIdx > 0) {
            histIdx--;
            inp.value = cmdHistory[histIdx];
        } else {
            histIdx   = -1;
            inp.value = '';
        }
    }
}

/** Escape HTML for safe terminal output */
function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Focus terminal and scroll to top */
function focusTerminal() {
    const input = document.getElementById('term-input');
    if (input) input.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Keyboard shortcut: press "/" to focus terminal */
document.addEventListener('keydown', (e) => {
    if (
        e.key === '/' &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA'
    ) {
        e.preventDefault();
        focusTerminal();
    }
});

// Init terminal
renderTerm(termLines);


/* ══════════════════════════════════════
   OVERLAYS
   ══════════════════════════════════════ */

function openAbout() {
    document.getElementById('about-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAbout() {
    document.getElementById('about-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

function openHistoire() {
    closeAbout(); // close about if open
    document.getElementById('histoire-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeHistoire() {
    document.getElementById('histoire-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

function openContact() {
    // Close any open overlay first
    document.querySelectorAll('.overlay').forEach(o => o.classList.remove('active'));
    document.getElementById('contact-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContact() {
    document.getElementById('contact-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

/** Close overlay on Escape key */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.overlay').forEach(o => o.classList.remove('active'));
        document.body.style.overflow = '';
    }
});


/* ══════════════════════════════════════
   CV DOWNLOAD
   (Handled via Laravel route /cv/download)
   ══════════════════════════════════════ */
function downloadCV() {
    window.location.href = '/cv/download';
}


/* ══════════════════════════════════════
   PROJECT FILTERS
   ══════════════════════════════════════ */
function filterProjects(type, btn) {
    // Toggle active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide cards
    let count = 0;
    document.querySelectorAll('.project-card').forEach(card => {
        const show = type === 'all' || card.dataset.type === type;
        card.style.display = show ? '' : 'none';
        if (show) count++;
    });

    document.getElementById('proj-count').textContent =
        count + ' project' + (count > 1 ? 's' : '');
}


/* ══════════════════════════════════════
   CONTACT FORM (JS feedback)
   The form submits to Laravel via POST.
   This handles the visual submit state.
   ══════════════════════════════════════ */
function submitForm(e) {
    // If using Laravel backend, remove e.preventDefault() to allow form submission
    e.preventDefault(); // Remove this line when connecting to real backend

    const btn = e.target.querySelector('.submit-btn');
    btn.textContent      = '✓ Message sent!';
    btn.style.background = 'var(--green)';

    setTimeout(() => {
        btn.textContent      = 'Send message';
        btn.style.background = '';
    }, 3000);

    e.target.reset();
}


/* ══════════════════════════════════════
   SCROLL ANIMATIONS
   ══════════════════════════════════════ */
const scrollObserver = new IntersectionObserver(
    (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.1 }
);

document.querySelectorAll('.fade-in').forEach(el => scrollObserver.observe(el));
