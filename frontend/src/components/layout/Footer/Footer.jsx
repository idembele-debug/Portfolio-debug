import { useLanguage } from '../../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <>
      {/* Tech Stack */}
      <div className="border-t border-[var(--border)] px-6 sm:px-8 lg:px-12 xl:px-16 py-6 flex items-center gap-2 flex-wrap text-[11px] text-[var(--muted)]">
        {['Python', 'PHP', 'JavaScript', 'React JS', 'FastAPI', 'HTML/CSS', 'C Language', 'PostgreSQL', 'Tailwind CSS'].map((tech, i) => (
          <span key={tech} className={i > 0 ? "before:content-['·_'] before:mr-1" : ''}>{tech}</span>
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-6 sm:px-8 lg:px-12 xl:px-16 py-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--muted)] gap-4">
        <div className="text-center sm:text-left">
          <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
        </div>
        <div className="flex gap-3">
          <a href="mailto:i.dembele@hestim.ma" title={t('footer.email')}
            className="text-[var(--muted)] no-underline text-[13px] w-8 h-8 flex items-center justify-center border border-[var(--border)] rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
          >
            ✉
          </a>
          <a href="https://github.com/idembele-debug" target="_blank" rel="noopener noreferrer" title="GitHub"
            className="text-[var(--muted)] no-underline text-[13px] w-8 h-8 flex items-center justify-center border border-[var(--border)] rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
          >
            ⎇
          </a>
          <a href="https://www.linkedin.com/in/issa-d-dembele-a46a34356/" target="_blank" rel="noopener noreferrer" title={t('footer.linkedin')}
            className="text-[var(--muted)] no-underline text-[13px] w-8 h-8 flex items-center justify-center border border-[var(--border)] rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
          >
            in
          </a>
        </div>
      </footer>
    </>
  );
}