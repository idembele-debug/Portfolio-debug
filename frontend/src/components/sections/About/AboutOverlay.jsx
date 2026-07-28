import { useEffect, useState, useCallback } from 'react';
import { getProfile } from '../../../services/api/profile';
import { getSkills } from '../../../services/api/skill';
import { useLanguage } from '../../../context/LanguageContext';

const PROFILE_PHOTO = '/issaphoto.JPG';
const CV_PDF = '/ISSAD.pdf';

const INFO_CARDS = [
  { labelKey: 'about.email', value: 'i.dembele@hestim.ma', icon: '✉', href: null },
  { labelKey: 'about.telephone', value: '+212 690611402', icon: '📞', href: null },
  { labelKey: 'about.location', value: 'Casablanca, Maroc', icon: '📍', href: null },
  { labelKey: 'about.linkedin', value: 'ISSA D DEMBELE', icon: '🔗', href: 'https://www.linkedin.com/in/issa-d-dembele-a46a34356/' },
  { labelKey: 'about.languages', value: 'Français · Anglais · Bambara', icon: '🌍', href: null },
];

const SKILLS_LIST = [
  'Python', 'JavaScript', 'React', 'FastAPI', 'SQL', 'PHP', 'C',
  'Tailwind CSS', 'TypeScript', 'Node.js', 'Git', 'Docker', 'Linux'
];

function getCurrentStatus() {
  const month = new Date().getMonth() + 1;
  if (month >= 6 && month <= 9) {
    return { type: 'internship', emoji: '🟢', key: 'about.status.internship' };
  }
  return { type: 'collaboration', emoji: '🔵', key: 'about.status.collaboration' };
}

export default function AboutOverlay({ isOpen, onClose, onOpenContact }) {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const { t } = useLanguage();
  const status = getCurrentStatus();

  useEffect(() => {
    if (!isOpen) return;

    let mounted = true;
    const loadData = async () => {
      try {
        const [profileRes, skillsRes] = await Promise.all([getProfile(), getSkills()]);
        if (mounted) {
          setProfile(profileRes.data);
          setSkills(skillsRes.data);
        }
      } catch {
        // API not available
      }
    };
    loadData();
    return () => { mounted = false; };
  }, [isOpen]);

  const handleDownloadCV = useCallback(() => {
    const link = document.createElement('a');
    link.href = CV_PDF;
    link.download = 'ISSAD_Dembele_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleContact = useCallback(() => {
    onClose();
    onOpenContact();
  }, [onClose, onOpenContact]);

  const handleOpenStory = useCallback(() => {
    onClose();
    // Small delay to allow overlay close animation, then scroll to histoire
    setTimeout(() => {
      const histoireSection = document.getElementById('histoire');
      if (histoireSection) {
        histoireSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg)] overflow-y-auto animate-fadeIn">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 md:top-8 md:right-12 bg-transparent border border-[var(--border)] text-[var(--muted)] font-mono text-xs px-3.5 py-1.5 rounded cursor-pointer z-50 hover:text-[var(--text)] hover:border-[var(--text)] transition-all"
      >
        {t('close')}
      </button>

      {/* ===== MAIN CONTAINER ===== */}
      <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20 md:py-28">
        {/* Section header */}
        <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-12 flex items-center gap-3 animate-fadeUp">
          <span className="block w-7 h-px bg-[var(--border)]"></span>
          <span className="text-[var(--accent)] mr-1">#</span> {t('about.title')}
        </div>

        {/* ===== TWO-COLUMN LAYOUT ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.6fr] gap-10 md:gap-14 lg:gap-16 xl:gap-20 items-start">
          {/* ===== LEFT COLUMN: PHOTO ===== */}
          <div className="lg:sticky lg:top-28 lg:pl-4 xl:pl-8">
            <div className="relative group">
              {/* Decorative circles */}
              <div className="absolute -top-5 -right-5 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[var(--accent)] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[var(--accent2)] opacity-15 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>

              {/* Photo container with glass effect */}
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg2)] animate-photoReveal group-hover:shadow-[0_0_40px_rgba(56,189,248,0.15)] transition-shadow duration-500">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.08) 0%, transparent 70%)'
                  }}
                ></div>

                <img
                  src={PROFILE_PHOTO}
                  alt="ISSA Dembélé — Photo de profil"
                  loading="lazy"
                  className="w-full block transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:rotate-[1deg]"
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

                {/* Gradient overlay + name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-5 sm:p-6">
                  <div className="text-xs text-white/70 leading-relaxed">
                    <strong className="block font-sans text-lg sm:text-xl font-bold text-white mb-1">
                      {profile?.full_name || 'ISSA Dembélé'}
                    </strong>
                    {profile?.title || t('hero.subtitle')}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick info card — plain text, no link styling except LinkedIn */}
            <div className="mt-8 bg-[var(--bg2)]/80 backdrop-blur-sm border border-[var(--border)] rounded-xl p-5 text-xs text-[var(--muted)] leading-loose transition-all duration-300 hover:border-[var(--accent)]/30 hover:shadow-[0_0_20px_rgba(56,189,248,0.06)]">
              <div className="flex items-center gap-2.5 mb-4">
                <span className={`w-2.5 h-2.5 rounded-full ${status.type === 'internship' ? 'bg-[var(--green)]' : 'bg-[var(--accent)]'} animate-pulse`}></span>
                <span className="text-[var(--text)] font-medium text-sm">
                  {status.emoji} {t(status.key)}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--accent)] w-16 shrink-0 text-[11px] uppercase tracking-wider">{t('about.email')}:</span>
                  <span className="text-[13px] text-[var(--text)]">i.dembele@hestim.ma</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--accent)] w-16 shrink-0 text-[11px] uppercase tracking-wider">{t('about.location')}:</span>
                  <span className="text-[13px] text-[var(--text)]">Casablanca, Maroc</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--accent)] w-16 shrink-0 text-[11px] uppercase tracking-wider">{t('about.linkedin')}:</span>
                  <a
                    href="https://www.linkedin.com/in/issa-d-dembele-a46a34356/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors"
                  >
                    ISSA D DEMBELE
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--accent)] w-16 shrink-0 text-[11px] uppercase tracking-wider">{t('about.github')}:</span>
                  <span className="text-[13px] text-[var(--text)]">idembele-debug</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN: CONTENT ===== */}
          <div className="min-w-0">
            {/* Heading */}
            <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-3 animate-fadeUp">
              <span className="text-[var(--accent)]">// </span>{t('about.heading')}
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] mb-2 animate-fadeUp" style={{ animationDelay: '0.05s' }}>
              {profile?.full_name || 'ISSA Dembélé'}
            </h2>
            <p className="text-[13px] text-[var(--muted)] mb-10 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
              {profile?.title || t('hero.subtitle')}
            </p>

            {/* Bio section */}
            <div className="text-[13px] sm:text-[14px] text-[var(--muted)] leading-[1.85] sm:leading-[1.9] tracking-[0.01em] mb-10 space-y-4 animate-fadeUp max-w-prose" style={{ animationDelay: '0.15s' }}>
              <p>{t('about.bio1')}</p>
              <p>{t('about.bio2')}</p>
              <p>{t('about.bio3')}</p>
            </div>

            {/* Info Cards Grid — plain text, no link styling except LinkedIn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-10 animate-fadeUp" style={{ animationDelay: '0.2s' }}>
              {INFO_CARDS.map((card, i) => (
                <div
                  key={i}
                  className="group/card bg-[var(--bg2)]/60 backdrop-blur-sm border border-[var(--border)] rounded-xl p-4 sm:p-5 transition-all duration-300 hover:border-[var(--accent)]/40 hover:bg-[var(--bg2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.05)] flex flex-col justify-center min-h-[80px] sm:min-h-[90px]"
                >
                  <div className="text-[10px] text-[var(--muted)] uppercase tracking-[0.08em] mb-2 flex items-center gap-1.5">
                    <span className="text-[var(--accent)]">{card.icon}</span>
                    {t(card.labelKey)}
                  </div>
                  {card.href ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] sm:text-[14px] text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors block truncate font-medium"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <div className="text-[13px] sm:text-[14px] text-[var(--text)] font-medium">{card.value}</div>
                  )}
                </div>
              ))}

              {/* Status card */}
              <div className="group/card bg-[var(--bg2)]/60 backdrop-blur-sm border border-[var(--border)] rounded-xl p-4 sm:p-5 transition-all duration-300 hover:border-[var(--accent)]/40 hover:bg-[var(--bg2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.05)] flex flex-col justify-center min-h-[80px] sm:min-h-[90px]">
                <div className="text-[10px] text-[var(--muted)] uppercase tracking-[0.08em] mb-2 flex items-center gap-1.5">
                  <span className="text-[var(--accent)]">📌</span>
                  {t('about.status')}
                </div>
                <div className="flex items-center gap-2.5 text-[13px] sm:text-[14px]">
                  <span className={`w-2.5 h-2.5 rounded-full ${status.type === 'internship' ? 'bg-[var(--green)]' : 'bg-[var(--accent)]'} animate-pulse`}></span>
                  <span className="text-[var(--text)] font-medium">{t(status.key)}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-10 animate-fadeUp" style={{ animationDelay: '0.25s' }}>
              <div className="text-[11px] text-[var(--muted)] uppercase tracking-[0.08em] mb-4">
                <span className="text-[var(--accent)]">▸ </span>{t('about.skills')}
              </div>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {(skills.length > 0 ? skills : SKILLS_LIST.map((s) => ({ name: s }))).map((skill, i) => (
                  <span
                    key={skill.id || i}
                    className="group/tag relative text-[11px] sm:text-[12px] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-[var(--border)] text-[var(--muted)] transition-all duration-300 cursor-default overflow-hidden hover:border-[var(--accent)]/50 hover:text-[var(--text)] hover:shadow-[0_0_15px_rgba(56,189,248,0.08)]"
                  >
                    <span className="absolute inset-0 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(56,189,248,0.12) 0%, transparent 70%)'
                      }}
                    ></span>
                    <span className="relative z-10 group-hover/tag:text-[var(--accent)] transition-colors duration-300">
                      {skill.name}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons — 3 actions: Download CV, Read Story, Contact */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-10 animate-fadeUp" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={handleDownloadCV}
                className="group/btn relative overflow-hidden bg-[var(--accent)] text-[#000] border-none font-mono text-[12px] sm:text-[13px] font-bold px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:opacity-90 hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] active:scale-[0.97] w-full sm:w-auto text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>📄</span>
                  {t('about.download_cv')}
                </span>
              </button>

              <button
                onClick={handleOpenStory}
                className="group/btn bg-transparent text-[var(--muted)] border border-[var(--border)] font-mono text-[12px] sm:text-[13px] px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:text-[var(--text)] hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(56,189,248,0.06)] active:scale-[0.97] w-full sm:w-auto text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>📖</span>
                  {t('about.story.btn')}
                </span>
              </button>

              <button
                onClick={handleContact}
                className="group/btn bg-transparent text-[var(--muted)] border border-[var(--border)] font-mono text-[12px] sm:text-[13px] px-6 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:text-[var(--text)] hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(56,189,248,0.06)] active:scale-[0.97] w-full sm:w-auto text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>✉</span>
                  {t('about.contact.btn')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}