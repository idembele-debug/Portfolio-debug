import { useEffect, useState } from 'react';
import { getChapters } from '../../../services/api/histoire';
import { useLanguage } from '../../../context/LanguageContext';

export default function HistoireOverlay({ isOpen, onClose }) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    getChapters()
      .then(({ data }) => setChapters(Array.isArray(data) ? data : []))
      .catch(() => setChapters([]))
      .finally(() => setLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id="histoire" className="fixed inset-0 z-50 bg-[var(--bg)] overflow-y-auto animate-fadeIn">
      <button
        type="button"
        onClick={onClose}
        className="fixed top-4 right-4 md:top-8 md:right-12 bg-transparent border border-[var(--border)] text-[var(--muted)] font-mono text-xs px-3.5 py-1.5 rounded cursor-pointer z-50 hover:text-[var(--text)] hover:border-[var(--text)] transition-all"
      >
        {t('close')}
      </button>

      <div className="max-w-[820px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-20 md:py-28 lg:py-32">
        <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-10 sm:mb-12 md:mb-14 flex items-center gap-3">
          <span className="block w-7 h-px bg-[var(--border)]" />
          <span className="text-[var(--accent)] mr-1">#</span> {t('histoire.title')}
        </div>

        <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] mb-3 sm:mb-4">{t('histoire.title')}</h1>
        <p className="text-[12px] sm:text-[13px] lg:text-sm text-[var(--muted)] mb-12 sm:mb-14 lg:mb-16 leading-relaxed">{t('histoire.subtitle')}</p>

        {loading ? (
          <p className="text-[var(--muted)] text-sm">{t('terminal.loading')}</p>
        ) : chapters.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">{t('histoire.empty')}</p>
        ) : (
          <div className="space-y-10 sm:space-y-12 lg:space-y-14">
            {chapters.map((chapter) => (
              <article key={chapter.id} className="relative pl-6 sm:pl-8 lg:pl-10 border-l-2 border-[var(--border)]">
                <div className="absolute -left-[7px] sm:-left-[9px] top-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[var(--bg)] border-2 border-[var(--accent)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                </div>
                <h2 className="font-sans text-base sm:text-lg lg:text-xl font-bold text-[var(--accent)] mb-4 sm:mb-5 tracking-[-0.01em]">
                  {chapter.title}
                </h2>
                <div className="text-[12px] sm:text-[13px] lg:text-sm text-[var(--muted)] leading-[1.8] sm:leading-[1.85] space-y-3 sm:space-y-4">
                  {chapter.content.split('\n\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
