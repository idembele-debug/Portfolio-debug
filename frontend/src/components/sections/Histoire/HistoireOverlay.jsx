import { useEffect, useState } from 'react';
import { getChapters } from '../../../services/api/histoire';
import { useLanguage } from '../../../context/LanguageContext';

const FALLBACK_CHAPTERS = [
  { year: '2023', titleKey: 'histoire.chapter.2023', descKey: 'histoire.chapter.2023.desc' },
  { year: '2024', titleKey: 'histoire.chapter.2024', descKey: 'histoire.chapter.2024.desc' },
  { year: '2025', titleKey: 'histoire.chapter.2025', descKey: 'histoire.chapter.2025.desc' },
  { year: '2026', titleKey: 'histoire.chapter.2026', descKey: 'histoire.chapter.2026.desc' },
];

export default function HistoireOverlay({ isOpen, onClose }) {
  const [chapters, setChapters] = useState([]);
  const { t } = useLanguage();

  const loadChapters = async () => {
    try {
      const { data } = await getChapters();
      setChapters(data);
    } catch {
      setChapters([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadChapters();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const hasChapters = chapters.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg)] overflow-y-auto animate-fadeIn">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 md:right-12 bg-transparent border border-[var(--border)] text-[var(--muted)] font-mono text-xs px-3.5 py-1.5 rounded cursor-pointer z-50 hover:text-[var(--text)] hover:border-[var(--text)] transition-all"
      >
        {t('close')}
      </button>

      <div className="max-w-[820px] mx-auto px-4 sm:px-6 md:px-12 py-20">
        <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-11 flex items-center gap-3">
          <span className="block w-7 h-px bg-[var(--border)]"></span>
          <span className="text-[var(--accent)] mr-1">#</span> {t('histoire.title')}
        </div>

        <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] mb-2">{t('histoire.title')}</h1>
        <p className="text-[13px] text-[var(--muted)] mb-12">{t('histoire.subtitle')}</p>

        {!hasChapters ? (
          <div className="space-y-8">
            {FALLBACK_CHAPTERS.map((ch, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-[var(--border)]">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--bg)] border-2 border-[var(--accent)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>
                </div>
                <div className="text-[11px] text-[var(--accent)] font-bold mb-1">{ch.year}</div>
                <h3 className="font-sans text-lg font-bold text-[var(--text)] mb-2">{t(ch.titleKey)}</h3>
                <p className="text-[13px] text-[var(--muted)] leading-relaxed">{t(ch.descKey)}</p>
              </div>
            ))}
          </div>
        ) : (
          chapters.map((chapter) => (
            <div key={chapter.id} className="relative pl-8 border-l-2 border-[var(--border)] mb-10">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--bg)] border-2 border-[var(--accent)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>
              </div>
              <h2 className="font-sans text-xl font-bold text-[var(--accent)] mb-3.5 tracking-[-0.01em]">
                {chapter.title}
              </h2>
              <div className="text-sm text-[var(--muted)] leading-8">
                {chapter.content.split('\n').map((p, i) => (
                  <p key={i} className="mb-3">{p}</p>
                ))}
              </div>
            </div>
          ))
        )}

        <div className="text-[11px] text-[var(--border)] text-center mt-10 pt-5 border-t border-[var(--border)]">
          {t('histoire.coming')}
        </div>
      </div>
    </div>
  );
}