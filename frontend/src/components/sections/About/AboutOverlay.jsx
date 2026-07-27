import { useEffect, useState } from 'react';
import { getProfile } from '../../../services/api/profile';
import { getSkills } from '../../../services/api/skill';
import { useLanguage } from '../../../context/LanguageContext';

// Photo is in backup-assets/images/issaphoto.JPG
// We'll reference it from the public folder once copied, or use a direct path
const PROFILE_PHOTO = '/issaphoto.JPG'; // Will need to be copied to public/

const PASIONS = [
  'about.passion1',
  'about.passion2',
  'about.passion3',
  'about.passion4',
  'about.passion5',
];

const GOALS = [
  'about.goal1',
  'about.goal2',
  'about.goal3',
];

export default function AboutOverlay({ isOpen, onClose }) {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const { t } = useLanguage();

  const loadData = async () => {
    try {
      const [profileRes, skillsRes] = await Promise.all([getProfile(), getSkills()]);
      setProfile(profileRes.data);
      setSkills(skillsRes.data);
    } catch {
      // API not available
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg)] overflow-y-auto animate-fadeIn">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 md:right-12 bg-transparent border border-[var(--border)] text-[var(--muted)] font-mono text-xs px-3.5 py-1.5 rounded cursor-pointer z-50 hover:text-[var(--text)] hover:border-[var(--text)] transition-all"
      >
        {t('close')}
      </button>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-12 py-20">
        <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-11 flex items-center gap-3">
          <span className="block w-7 h-px bg-[var(--border)]"></span>
          <span className="text-[var(--accent)] mr-1">#</span> {t('about.title')}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 md:gap-16 lg:gap-20 items-start">
          {/* Photo Column */}
          <div className="md:sticky md:top-24">
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[var(--accent)] opacity-25"></div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[var(--accent2)] opacity-20"></div>
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg2)] animate-photoReveal">
                <img
                  src={PROFILE_PHOTO}
                  alt="ISSA Dembélé"
                  className="w-full block hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.querySelector('.fallback').style.display = 'flex';
                  }}
                />
                <div className="fallback" style={{ display: 'none' }}>
                  <div className="h-64 sm:h-80 flex items-center justify-center bg-gradient-to-br from-[var(--bg3)] to-[var(--bg2)] text-[var(--muted)] text-sm">
                    📸 Photo
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent flex items-end p-4 sm:p-6">
                  <div className="text-xs text-white/70 leading-relaxed">
                    <strong className="block font-sans text-lg sm:text-xl font-bold text-white mb-0.5">{profile?.full_name || 'ISSA Dembélé'}</strong>
                    {profile?.title || t('hero.subtitle')}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick info card */}
            <div className="mt-6 bg-[var(--bg2)] border border-[var(--border)] rounded-xl p-4 text-xs text-[var(--muted)] leading-loose">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse"></span>
                <span className="text-[var(--text)] font-medium">{t('contact.available')}</span>
              </div>
              <div className="space-y-1">
                <div><span className="text-[var(--accent)]">{t('about.email')}:</span> i.dembele@hestim.ma</div>
                <div><span className="text-[var(--accent)]">{t('about.location')}:</span> Morocco</div>
                <div><span className="text-[var(--accent)]">{t('about.linkedin')}:</span> /in/ISSA-D-DEMBELE</div>
                <div><span className="text-[var(--accent)]">{t('about.github')}:</span> /idembele-debug</div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div>
            <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-2">
              <span className="text-[var(--accent)]">// </span>{t('about.heading')}
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] mb-1">{profile?.full_name || 'ISSA Dembélé'}</h2>
            <p className="text-[13px] text-[var(--muted)] mb-8">{profile?.title || t('hero.subtitle')}</p>

            {/* Bio section */}
            <div className="text-[13px] text-[var(--muted)] leading-[1.9] mb-8 space-y-3">
              <p>{t('about.bio1')}</p>
              <p>{t('about.bio2')}</p>
              <p>{t('about.bio3')}</p>
            </div>

            {/* Goals */}
            <div className="mb-8">
              <div className="text-[11px] text-[var(--muted)] uppercase tracking-[0.08em] mb-3">
                <span className="text-[var(--accent)]">▸ </span>{t('about.goals')}
              </div>
              <div className="space-y-2">
                {GOALS.map((goalKey, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[13px] text-[var(--muted)]">
                    <span className="text-[var(--accent)] mt-0.5">→</span>
                    <span>{t(goalKey)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Passions & Interests */}
            <div className="mb-8">
              <div className="text-[11px] text-[var(--muted)] uppercase tracking-[0.08em] mb-3">
                <span className="text-[var(--accent)]">▸ </span>{t('about.passions')}
              </div>
              <div className="flex flex-wrap gap-2">
                {PASIONS.map((pKey, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-[var(--bg3)] border border-[var(--border)] text-[var(--text)]"
                  >
                    {t(pKey)}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <div className="text-[11px] text-[var(--muted)] uppercase tracking-[0.08em] mb-3">
                <span className="text-[var(--accent)]">▸ </span>{t('about.skills')}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.length > 0 ? skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-[11px] px-2.5 py-0.5 rounded border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all cursor-default"
                  >
                    {skill.name}
                  </span>
                )) : (
                  <>
                    {['Python', 'JavaScript', 'React', 'FastAPI', 'SQL', 'PHP', 'C', 'Tailwind CSS', 'TypeScript'].map((s) => (
                      <span key={s} className="text-[11px] px-2.5 py-0.5 rounded border border-[var(--border)] text-[var(--muted)]">
                        {s}
                      </span>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Story timeline preview */}
            <div className="mb-6">
              <div className="text-[11px] text-[var(--muted)] uppercase tracking-[0.08em] mb-4">
                <span className="text-[var(--accent)]">▸ </span>{t('about.story')}
              </div>
              <div className="relative pl-6 border-l-2 border-[var(--border)] space-y-5">
                {[
                  { year: '2026', textKey: 'histoire.chapter.2026.desc' },
                  { year: '2025', textKey: 'histoire.chapter.2025.desc' },
                  { year: '2024', textKey: 'histoire.chapter.2024.desc' },
                  { year: '2023', textKey: 'histoire.chapter.2023.desc' },
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[26px] top-0.5 w-2 h-2 rounded-full bg-[var(--accent)]"></div>
                    <div className="text-[11px] text-[var(--accent)] font-bold mb-0.5">{item.year}</div>
                    <div className="text-[12px] text-[var(--muted)]">{t(item.textKey)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}