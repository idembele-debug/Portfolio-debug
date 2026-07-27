import { useLanguage } from '../../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <>
      {/* Tech Stack */}
      <div className="border-t border-[var(--border)] px-4 sm:px-6 md:px-12 py-5 flex items-center gap-2 flex-wrap text-[11px] text-[var(--muted)]">
        {['Python', 'PHP', 'JavaScript', 'React JS', 'FastAPI', 'HTML/CSS', 'C Language', 'PostgreSQL', 'Tailwind CSS'].map((tech, i) => (
          <span key={tech} className={i > 0 ? "before:content-['·_'] before:mr-1" : ''}>{tech}</span>
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-4 sm:px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--muted)] gap-3">
        <div>
          <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
        </div>
        <div className="flex gap-2.5">
          <a href="mailto:i.dembele@hestim.ma" title={t('footer.email')}
            className="text-[var(--muted)] no-underline text-[13px] w-7 h-7 flex items-center justify-center border border-[var(--border)] rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
          >
            ✉
          </a>
          <a href="https://github.com/idembele-debug" target="_blank" rel="noopener noreferrer" title="GitHub"
            className="text-[var(--muted)] no-underline text-[13px] w-7 h-7 flex items-center justify-center border border-[var(--border)] rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
          >
            ⎇
          </a>
          <a href="https://linkedin.com/in/ISSA-D-DEMBELE" target="_blank" rel="noopener noreferrer" title={t('footer.linkedin')}
            className="text-[var(--muted)] no-underline text-[13px] w-7 h-7 flex items-center justify-center border border-[var(--border)] rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
          >
            in
          </a>
        </div>
      </footer>
    </>
  );
}