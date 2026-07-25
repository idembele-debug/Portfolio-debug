import { useEffect, useState } from 'react';
import { getProfile } from '../../../services/api/profile';
import { getSkills } from '../../../services/api/skill';

export default function AboutOverlay({ isOpen, onClose }) {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      const [profileRes, skillsRes] = await Promise.all([getProfile(), getSkills()]);
      setProfile(profileRes.data);
      setSkills(skillsRes.data);
    } catch {
      // API not available
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

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-20">
        <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-11 flex items-center gap-3">
          <span className="block w-7 h-px bg-[var(--border)]"></span>
          <span className="text-[var(--accent)] mr-1">#</span> about me
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 items-start">
          {/* Photo */}
          <div className="md:sticky md:top-24">
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-20 h-20 rounded-full border-2 border-[var(--accent)] opacity-25"></div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full border-2 border-[var(--accent2)] opacity-20"></div>
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg2)] animate-photoReveal">
                {profile?.photo_url && (
                  <img src={profile.photo_url} alt={profile.full_name} className="w-full block hover:scale-105 transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent flex items-end p-6">
                  <div className="text-xs text-white/70 leading-relaxed">
                    <strong className="block font-sans text-lg font-bold text-white mb-0.5">{profile?.full_name || 'ISSA Dembélé'}</strong>
                    {profile?.title || 'Engineering Student'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-2">
              <span className="text-[var(--accent)]">// </span>{profile?.headline || 'Profile'}
            </div>
            <h2 className="font-sans text-4xl font-extrabold tracking-[-0.03em] mb-1">{profile?.full_name || 'ISSA Dembélé'}</h2>
            <p className="text-[13px] text-[var(--muted)] mb-8">{profile?.title || 'Engineering Student · AI & Software Development'}</p>

            {profile?.bio && (
              <div className="text-[13px] text-[var(--muted)] leading-[1.9] mb-7">
                {profile.bio.split('\n').map((p, i) => (
                  <p key={i} className="mb-3">{p}</p>
                ))}
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                { label: 'Email', value: profile?.email },
                { label: 'Location', value: profile?.location },
                { label: 'LinkedIn', value: profile?.linkedin_url },
                { label: 'GitHub', value: profile?.github_url },
              ].filter((item) => item.value).map((item) => (
                <div key={item.label} className="bg-[var(--bg2)] border border-[var(--border)] rounded-lg p-3.5">
                  <div className="text-[10px] text-[var(--muted)] uppercase tracking-[0.08em] mb-1">{item.label}</div>
                  <div className="text-[13px] text-[var(--text)]">
                    {item.label === 'Email' || item.label === 'LinkedIn' || item.label === 'GitHub' ? (
                      <a href={item.label === 'Email' ? `mailto:${item.value}` : item.value} className="text-[var(--accent)] no-underline">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-7">
              <div className="text-[11px] text-[var(--muted)] uppercase tracking-[0.08em] mb-3">
                <span className="text-[var(--accent)]">▸ </span>Skills
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-[11px] px-2.5 py-0.5 rounded border border-[var(--border)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all cursor-default"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}