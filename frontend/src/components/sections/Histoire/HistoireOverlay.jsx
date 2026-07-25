import { useEffect, useState } from 'react';
import { getChapters } from '../../../services/api/histoire';

export default function HistoireOverlay({ isOpen, onClose }) {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    if (isOpen) {
      loadChapters();
    }
  }, [isOpen]);

  const loadChapters = async () => {
    try {
      const { data } = await getChapters();
      setChapters(data);
    } catch {
      setChapters([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg)] overflow-y-auto animate-fadeIn">
      <button
        onClick={onClose}
        className="fixed top-4 right-6 md:right-12 bg-transparent border border-[var(--border)] text-[var(--muted)] font-mono text-xs px-3.5 py-1.5 rounded cursor-pointer z-50 hover:text-[var(--text)] hover:border-[var(--text)] transition-all"
      >
        ✕ close
      </button>

      <div className="max-w-[820px] mx-auto px-6 md:px-12 py-20">
        <h1 className="font-sans text-4xl font-extrabold tracking-[-0.03em] mb-2">Mon Histoire</h1>
        <p className="text-[13px] text-[var(--muted)] mb-12">The journey so far — from first line of code to building real-world solutions.</p>

        {chapters.length === 0 ? (
          <div className="text-center py-12 text-[var(--muted)] text-sm">
            <p>No chapters yet. Check back soon!</p>
          </div>
        ) : (
          chapters.map((chapter) => (
            <div key={chapter.id} className="mb-10">
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
          More chapters coming soon.
        </div>
      </div>
    </div>
  );
}