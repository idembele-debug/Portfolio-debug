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

const TYPE_STYLES = {
  academic: 'text-[var(--yellow)] border-[var(--yellow)]',
  personal: 'text-[var(--accent2)] border-[var(--accent2)]',
  enterprise: 'text-[var(--accent)] border-[var(--accent)]',
  opensource: 'text-[var(--green)] border-[var(--green)]',
  freelance: 'text-[var(--yellow)] border-[var(--yellow)]',
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const { t } = useLanguage();

  const loadProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch {
      setProjects([]);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.project_type === filter);

  return (
    <section id="projects" className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20">
      <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-8 sm:mb-11 flex items-center gap-3">
        <span className="block w-7 h-px bg-[var(--border)]"></span>
        <span className="text-[var(--accent)] mr-1">#</span> {t('projects.title')}
      </div>

      <div className="flex items-center gap-2 mb-7 sm:mb-9 flex-wrap">
        {['all', 'academic', 'personal'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`bg-transparent border border-[var(--border)] text-[var(--muted)] cursor-pointer font-mono text-xs px-3.5 py-1 rounded transition-all ${
              filter === f ? 'bg-[var(--accent)] border-[var(--accent)] text-black font-medium' : 'hover:text-[var(--accent)] hover:border-[var(--accent)]'
            }`}
          >
            {f === 'all' ? t('projects.filter.all') : f === 'academic' ? t('projects.filter.academic') : t('projects.filter.personal')}
          </button>
        ))}
        <span className="ml-auto text-[11px] text-[var(--muted)]">{filtered.length} {t('projects.count')}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[var(--border)] rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 text-[var(--muted)] text-sm">
            {t('terminal.projects.empty')}
          </div>
        ) : (
          filtered.map((project) => (
            <div
              key={project.id}
              className="bg-[var(--bg2)] p-5 sm:p-6 transition-colors cursor-pointer relative overflow-hidden hover:bg-[var(--bg3)] group border-b border-[var(--border)] sm:border-b-0 sm:border-r last:border-b-0 last:border-r-0"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

              <div className={`w-full h-[120px] sm:h-[130px] rounded mb-4 border border-[var(--border)] flex items-center overflow-hidden bg-gradient-135 ${PREVIEW_COLORS[project.preview_color || 'blue'] || 'from-[#0f172a] to-[#1e3a5f]'}`}>
                <pre className="font-mono text-[10px] text-white/35 p-3 leading-[1.7] w-full whitespace-pre-wrap">
                  {project.preview_code || t('projects.no_preview')}
                </pre>
              </div>

              <div className="flex items-start justify-between mb-1.5 gap-2">
                <span className="font-sans font-bold text-sm text-[var(--text)] break-words">{project.title}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded border uppercase tracking-[0.05em] whitespace-nowrap shrink-0 ${TYPE_STYLES[project.project_type] || 'text-[var(--muted)] border-[var(--border)]'}`}>
                  {project.project_type}
                </span>
              </div>

              <p className="text-[11px] text-[var(--muted)] mb-3.5 leading-[1.6]">{project.description}</p>

              {project.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.split(',').map((tag, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-[#1a1f35] text-[#818cf8]">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}