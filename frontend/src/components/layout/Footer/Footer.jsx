import { useEffect, useState } from 'react';
import { getSkills } from '../../../services/api/skill';
import { useLanguage } from '../../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    getSkills('stack')
      .then(({ data }) => {
        const items = Array.isArray(data) ? data : [];
        setStacks(items.sort((a, b) => a.order - b.order));
      })
      .catch(() => setStacks([]));
  }, []);

  const renderStack = (items) =>
    items.map((tech, i) => (
      <span key={`${tech.id}-${i}`} className="flex items-center gap-2 shrink-0">
        {i > 0 && <span className="text-[var(--border)]">·</span>}
        <span>{tech.name}</span>
      </span>
    ));

  return (
    <>
      {stacks.length > 0 && (
        <div className="border-t border-[var(--border)] overflow-hidden py-5 sm:py-6">
          <div className="relative">
            <div className="marquee-track">
              <div className="marquee-group text-[11px] text-[var(--muted)]">
                {renderStack(stacks)}
              </div>
              <div className="marquee-group text-[11px] text-[var(--muted)]" aria-hidden="true">
                {renderStack(stacks)}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-[var(--border)] px-5 sm:px-8 lg:px-12 xl:px-16 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--muted)] gap-4">
        <div className="text-center sm:text-left">
          <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
        </div>
        <div className="flex gap-3">
          <a
            href="mailto:i.dembele@hestim.ma"
            title={t('footer.email')}
            className="text-[var(--muted)] no-underline text-[13px] w-8 h-8 flex items-center justify-center border border-[var(--border)] rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
          >
            ✉
          </a>
          <a
            href="https://github.com/idembele-debug"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="text-[var(--muted)] no-underline text-[13px] w-8 h-8 flex items-center justify-center border border-[var(--border)] rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
          >
            gh
          </a>
          <a
            href="https://www.linkedin.com/in/issa-d-dembele-a46a34356/"
            target="_blank"
            rel="noopener noreferrer"
            title={t('footer.linkedin')}
            className="text-[var(--muted)] no-underline text-[13px] w-8 h-8 flex items-center justify-center border border-[var(--border)] rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
          >
            in
          </a>
        </div>
      </footer>
    </>
  );
}
