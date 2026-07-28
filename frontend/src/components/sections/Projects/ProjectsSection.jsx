import { useState, useEffect } from 'react';
import { getProjects } from '../../../services/api/project';
import { useLanguage } from '../../../context/LanguageContext';

const PREVIEW_COLORS = {
  blue: 'from-[#0f172a] to-[#1e3a5f]',
  purple: 'from-[#1e1b4b] to-[#3b0764]',
  green: 'from-[#052e16] to-[#14532d]',
  orange: 'from-[#431407] to-[#7c2d12]',
  teal: 'from-[#042f2e] to-[#134e4a]',
  pink: 'from-[#4a044e] to-[#831843]',
};

const PREVIEW_ICONS = {
  blue: '⚡',
  purple: '🔮',
  green: '🌿',
  orange: '🔥',
  teal: '💠',
  pink: '🌸',
};

const TYPE_STYLES = {
  academic: 'text-[var(--yellow)] border-[var(--yellow)] bg-[var(--yellow)]/5',
  personal: 'text-[var(--accent2)] border-[var(--accent2)] bg-[var(--accent2)]/5',
  enterprise: 'text-[var(--accent)] border-[var(--accent)] bg-[var(--accent)]/5',
  opensource: 'text-[var(--green)] border-[var(--green)] bg-[var(--green)]/5',
  freelance: 'text-[var(--yellow)] border-[var(--yellow)] bg-[var(--yellow)]/5',
};

const FALLBACK_PROJECTS = [
  {
    id: 'portfolio-terminal',
    title: 'projects.portfolio_terminal',
    description: 'projects.portfolio_terminal.desc',
    project_type: 'personal',
    preview_color: 'teal',
    preview_code: 'Portfolio Terminal\n\nReact · Tailwind CSS\nFastAPI · Framer Motion\n\n$ npm run dev\n✓ Build successful\n✓ Deployed',
    tags: 'React,Tailwind CSS,FastAPI,Framer Motion',
  },
  {
    id: 'aidfinder',
    title: 'projects.aidfinder',
    description: 'projects.aidfinder.desc',
    project_type: 'personal',
    preview_color: 'purple',
    preview_code: 'AidFinder\n\nReact · FastAPI · PostgreSQL\nAI Engine · JWT Auth\n\n→ Finding best matches\n→ Personalized results',
    tags: 'React,FastAPI,Python,PostgreSQL,JWT,OpenAI',
  },
  {
    id: 'portfolio-personal',
    title: 'projects.portfolio',
    description: 'projects.portfolio.desc',
    project_type: 'personal',
    preview_color: 'blue',
    preview_code: 'Portfolio Personnel\n\nReact · Tailwind CSS\nFastAPI · Framer Motion\n\n$ npm run dev\n✓ Build successful\n✓ Deployed',
    tags: 'React,Tailwind CSS,FastAPI,Framer Motion',
  },
  {
    id: 'aidfinder-platform',
    title: 'projects.aidfinder_platform',
    description: 'projects.aidfinder_platform.desc',
    project_type: 'personal',
    preview_color: 'green',
    preview_code: 'AidFinder Platform\n\nSmart Platform\nAI Engine · PostgreSQL\nJWT Auth\n\n→ Finding best matches\n→ Personalized results',
    tags: 'React,FastAPI,Python,PostgreSQL,JWT,OpenAI',
  },
  {
    id: 'old-portfolio',
    title: 'projects.old_portfolio',
    description: 'projects.old_portfolio.desc',
    project_type: 'academic',
    preview_color: 'orange',
    preview_code: 'Old Portfolio\n\nHTML · CSS · JavaScript\nStatic Site\n\n→ First portfolio version\n→ Responsive design',
    tags: 'HTML,CSS,JavaScript',
  },
  {
    id: 'ai-assistant',
    title: 'projects.ai_assistant',
    description: 'projects.ai_assistant.desc',
    project_type: 'academic',
    preview_color: 'pink',
    preview_code: 'AI Assistant\n\nPython · NLP · Flask\nMachine Learning\n\n→ Intent classification\n→ Context-aware responses',
    tags: 'Python,NLP,Flask,Machine Learning',
  },
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const { t } = useLanguage();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const { data } = await getProjects();
        if (!mounted) return;
        const apiProjects = Array.isArray(data) ? data : [];
        setProjects([...apiProjects, ...FALLBACK_PROJECTS]);
      } catch {
        if (mounted) setProjects(FALLBACK_PROJECTS);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.project_type === filter);

  const getPreviewIcon = (color) => PREVIEW_ICONS[color] || '●';

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-20 md:py-24">
      <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-8 sm:mb-11 flex items-center gap-3">
        <span className="block w-7 h-px bg-[var(--border)]"></span>
        <span className="text-[var(--accent)] mr-1">#</span> {t('projects.title')}
      </div>

      <div className="flex items-center gap-2 mb-9 sm:mb-11 flex-wrap">
        {['all', 'academic', 'personal'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`bg-transparent border text-[var(--muted)] cursor-pointer font-mono text-xs px-4 py-1.5 rounded-lg transition-all duration-200 ${
              filter === f
                ? 'bg-[var(--accent)] border-[var(--accent)] text-black font-semibold shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                : 'border-[var(--border)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:shadow-[0_0_15px_rgba(56,189,248,0.05)]'
            }`}
          >
            {f === 'all' ? t('projects.filter.all') : f === 'academic' ? t('projects.filter.academic') : t('projects.filter.personal')}
          </button>
        ))}
        <span className="ml-auto text-[11px] text-[var(--muted)] tracking-wide">{filtered.length} {t('projects.count')}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-16 text-[var(--muted)] text-sm">
            {t('terminal.projects.empty')}
          </div>
        ) : (
          filtered.map((project) => {
            const colorKey = project.preview_color || 'blue';
            const gradientClass = PREVIEW_COLORS[colorKey] || PREVIEW_COLORS.blue;
            const typeStyle = TYPE_STYLES[project.project_type] || 'text-[var(--muted)] border-[var(--border)]';

            return (
              <div
                key={project.id}
                className="group relative bg-[var(--bg2)] rounded-2xl border border-[var(--border)] overflow-hidden transition-all duration-500 hover:border-[var(--accent)]/40 hover:shadow-[0_0_40px_rgba(56,189,248,0.08)] hover:-translate-y-1 flex flex-col"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/0 to-[var(--accent2)]/0 group-hover:from-[var(--accent)]/10 group-hover:via-[var(--accent)]/5 group-hover:to-[var(--accent2)]/10 rounded-2xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"></div>

                {/* Preview area - larger and more immersive */}
                <div className="relative h-[180px] sm:h-[200px] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-135 ${gradientClass}`}></div>
                  {/* Grid pattern overlay */}
                  <div className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  ></div>
                  {/* Radial glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-2xl"
                    style={{ background: `radial-gradient(circle, rgba(56,189,248,0.3) 0%, transparent 70%)` }}
                  ></div>

                  {/* Preview icon */}
                  <div className="absolute top-4 left-4 text-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 select-none">
                    {getPreviewIcon(colorKey)}
                  </div>

                  {/* Code preview */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <pre className="font-mono text-[11px] text-white/40 leading-[1.9] tracking-wide whitespace-pre-wrap text-center">
                      {project.preview_code || t('projects.no_preview')}
                    </pre>
                  </div>

                  {/* Bottom gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg2)] to-transparent"></div>
                </div>

                {/* Content area with better padding */}
                <div className="relative z-10 p-5 sm:p-6 flex flex-col flex-1">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-sans font-bold text-sm sm:text-[15px] text-[var(--text)] leading-snug group-hover:text-[var(--accent)] transition-colors duration-300">
                      {project.title?.startsWith('projects.') ? t(project.title) : project.title}
                    </h3>
                    <span className={`text-[9px] px-2 py-0.5 rounded-md border uppercase tracking-[0.08em] whitespace-nowrap shrink-0 font-medium ${typeStyle}`}>
                      {project.project_type}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-4 flex-1">
                    {project.description?.startsWith('projects.') ? t(project.description) : project.description}
                  </p>

                  {/* Tags/badges */}
                  {project.tags && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.split(',').map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2.5 py-1 rounded-md font-medium bg-[var(--bg3)] text-[var(--muted)] border border-[var(--border)] transition-all duration-200 group-hover:border-[var(--accent)]/20 group-hover:text-[var(--accent)]"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}