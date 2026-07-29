import { useEffect, useState, useCallback } from 'react';
import { getProfile } from '../../../services/api/profile';
import { getSkills } from '../../../services/api/skill';
import { getChapters } from '../../../services/api/histoire';
import { useLanguage } from '../../../context/LanguageContext';

const CV_PDF = '/ISSAD.pdf';

const SKILL_CATEGORIES = [
  { key: 'langage_framework', labelKey: 'about.skills.langages' },
  { key: 'outil', labelKey: 'about.skills.outils' },
  { key: 'soft_skill', labelKey: 'about.skills.soft' },
];

function getCurrentStatus(available) {
  if (available) {
    return { key: 'about.status.internship', color: 'text-[var(--green)]' };
  }
  return { key: 'about.status.collaboration', color: 'text-[var(--accent)]' };
}

export default function AboutOverlay({ isOpen, onClose, onOpenContact, onOpenHistoire }) {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [storyExcerpt, setStoryExcerpt] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    let mounted = true;
    Promise.all([getProfile(), getSkills(), getChapters()])
      .then(([profileRes, skillsRes, histoireRes]) => {
        if (!mounted) return;
        setProfile(profileRes.data);
        setSkills(Array.isArray(skillsRes.data) ? skillsRes.data : []);
        const chapters = Array.isArray(histoireRes.data) ? histoireRes.data : [];
        if (chapters.length > 0) {
          const first = chapters.sort((a, b) => a.chapter_order - b.chapter_order)[0];
          setStoryExcerpt(first.content.split('\n\n')[0]?.slice(0, 280) || '');
        }
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, [isOpen]);

  const handleDownloadCV = useCallback(() => {
    const link = document.createElement('a');
    link.href = profile?.resume_url || CV_PDF;
    link.download = 'ISSAD_Dembele_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [profile]);

  const handleContact = useCallback(() => {
    onClose();
    onOpenContact();
  }, [onClose, onOpenContact]);

  const handleOpenStory = useCallback(() => {
    onClose();
    onOpenHistoire();
  }, [onClose, onOpenHistoire]);

  if (!isOpen) return null;

  const status = getCurrentStatus(profile?.available_for_work);
  const bioParagraphs = profile?.bio?.split('\n\n') || [t('about.bio1'), t('about.bio2')];

  const infoCards = [
    { labelKey: 'about.email', value: profile?.email, accent: true },
    { labelKey: 'about.telephone', value: profile?.phone },
    { labelKey: 'about.location', value: profile?.location ? `${profile.location} 🇲🇦` : null },
    { labelKey: 'about.linkedin', value: 'ISSA D DEMBELE', href: profile?.linkedin_url, accent: true },
    { labelKey: 'about.languages', value: t('about.languages.value') },
    { labelKey: 'about.status', value: t(status.key), accent: true, status: true },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg)] overflow-y-auto animate-fadeIn">
      <button
        type="button"
        onClick={onClose}
        className="fixed top-4 right-4 md:top-8 md:right-12 bg-transparent border border-[var(--border)] text-[var(--muted)] font-mono text-xs px-3.5 py-1.5 rounded cursor-pointer z-50 hover:text-[var(--text)] hover:border-[var(--text)] transition-all"
      >
        {t('close')}
      </button>

      <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20 md:py-28 lg:py-32">
        <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-10 sm:mb-14 flex items-center gap-3">
          <span className="block w-7 h-px bg-[var(--border)]" />
          <span className="text-[var(--accent)] mr-1">#</span> {t('about.title')}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,380px)_1fr] gap-10 md:gap-14 lg:gap-16 xl:gap-20 items-start">
          {/* Photo */}
          <div className="lg:sticky lg:top-28">
            <div className="relative group">
              <div className="absolute -top-5 -right-5 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[var(--accent)] opacity-20 pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[var(--accent2)] opacity-15 pointer-events-none" />

              <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg2)] animate-photoReveal">
                <img
                  src={profile?.photo_url || '/issaphoto.JPG'}
                  alt={profile?.full_name || 'ISSA Dembélé'}
                  loading="lazy"
                  className="w-full block aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-5 sm:p-6">
                  <div>
                    <strong className="block font-sans text-lg sm:text-xl font-bold text-white mb-1">
                      {profile?.full_name || 'Issa D. DEMBELE'}
                    </strong>
                    <span className="text-xs text-white/70">{profile?.title || t('about.photo.subtitle')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0 space-y-8 sm:space-y-10">
            <div>
              <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-3">
                <span className="text-[var(--accent)]">// </span>{t('about.heading')}
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.03em] mb-3 leading-tight">
                {profile?.full_name || 'Issa D. DEMBELE'}
              </h2>
              <p className="text-[13px] sm:text-sm text-[var(--muted)] leading-relaxed max-w-prose">
                {profile?.headline || t('about.headline.fallback')}
              </p>
            </div>

            <div className="text-[13px] sm:text-[14px] text-[var(--muted)] leading-[1.85] space-y-4 max-w-prose">
              {bioParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Info grid 3x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {infoCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-[var(--bg2)]/80 border border-[var(--border)] rounded-xl p-4 sm:p-5 min-h-[88px] flex flex-col justify-center"
                >
                  <div className="text-[10px] text-[var(--muted)] uppercase tracking-[0.08em] mb-2">
                    {t(card.labelKey)}
                  </div>
                  {card.href ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-[var(--accent)] no-underline hover:underline font-medium truncate"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <div className={`text-[13px] font-medium truncate ${card.status ? status.color : card.accent ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>
                      {card.value}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Skills by category */}
            {SKILL_CATEGORIES.map(({ key, labelKey }) => {
              const items = skills.filter((s) => s.category === key);
              if (items.length === 0) return null;
              return (
                <div key={key}>
                  <div className="text-[11px] text-[var(--muted)] uppercase tracking-[0.08em] mb-4">
                    <span className="text-[var(--accent)]">▸ </span>{t(labelKey)}
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {items.map((skill) => (
                      <span
                        key={skill.id}
                        className="text-[11px] sm:text-[12px] px-3.5 py-2 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/40 hover:text-[var(--text)] transition-colors"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleDownloadCV}
                className="bg-[var(--accent)] text-black border-none font-mono text-[12px] sm:text-[13px] font-bold px-6 py-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                {t('about.download_cv')}
              </button>
              <button
                type="button"
                onClick={handleContact}
                className="bg-transparent text-[var(--muted)] border border-[var(--border)] font-mono text-[12px] sm:text-[13px] px-6 py-3 rounded-lg cursor-pointer hover:text-[var(--text)] hover:border-[var(--accent)] transition-all w-full sm:w-auto"
              >
                {t('about.contact.btn')}
              </button>
            </div>

            {/* Story encart */}
            <div className="border border-[var(--border)] border-l-[3px] border-l-[var(--accent)] rounded-xl p-5 sm:p-6 bg-[var(--bg2)]/50">
              <div className="text-[10px] text-[var(--accent2)] uppercase tracking-[0.1em] mb-3">
                {t('about.story.label')}
              </div>
              <h3 className="font-sans text-lg sm:text-xl font-bold text-[var(--text)] mb-3">
                {t('about.story.heading')}
              </h3>
              <p className="text-[13px] text-[var(--muted)] leading-relaxed mb-4 max-w-prose">
                {storyExcerpt || t('about.story.excerpt')}
              </p>
              <button
                type="button"
                onClick={handleOpenStory}
                className="text-[13px] text-[var(--accent)] bg-transparent border-none font-mono cursor-pointer hover:underline p-0"
              >
                {t('about.story.link')} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
