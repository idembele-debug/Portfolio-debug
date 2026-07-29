import { useState, useEffect } from 'react';
import { getProjects } from '../../../services/api/project';
import { useLanguage } from '../../../context/LanguageContext';

const TYPE_STYLES = {
  academic: 'text-[var(--yellow)] border-[var(--yellow)] bg-[var(--yellow)]/5',
  personal: 'text-[var(--accent2)] border-[var(--accent2)] bg-[var(--accent2)]/5',
};

const TYPE_LABELS = {
  fr: { academic: 'Académique', personal: 'Personnel' },
  en: { academic: 'Academic', personal: 'Personal' },
};

const PREVIEW_CLASS = {
  blue: 'preview-blue',
  purple: 'preview-purple',
  green: 'preview-green',
  teal: 'preview-teal',
};

function getTagClass(tag) {
  const key = tag.trim().toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
  const map = {
    python: 'tag-python',
    pandas: 'tag-pandas',
    numpy: 'tag-numpy',
    flask: 'tag-flask',
    tkinter: 'tag-tkinter',
    html: 'tag-html',
    css: 'tag-css',
    javascript: 'tag-javascript',
    react: 'tag-react',
    fastapi: 'tag-fastapi',
    postgresql: 'tag-postgresql',
    'tailwind-css': 'tag-tailwind',
    vite: 'tag-vite',
    'json-api': 'tag-default',
  };
  return map[key] || 'tag-default';
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { t, lang } = useLanguage();

  useEffect(() => {
    let mounted = true;
    getProjects()
      .then(({ data }) => {
        if (mounted) setProjects(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (mounted) setProjects([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const filtered = filter === 'all'
    ? projects
    : projects.filter((p) => p.project_type === filter);

  const typeLabel = (type) => TYPE_LABELS[lang]?.[type] || type;

  return (
    <section id="projects" className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-28">
      <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-8 sm:mb-10 flex items-center gap-3">
        <span className="block w-7 h-px bg-[var(--border)]" />
        <span className="text-[var(--accent)] mr-1">#</span> {t('projects.title')}
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3 mb-10 sm:mb-12 flex-wrap">
        {['all', 'academic', 'personal'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`bg-transparent border text-[var(--muted)] cursor-pointer font-mono text-xs px-4 py-2 rounded-lg transition-all duration-200 ${
              filter === f
                ? 'bg-[var(--accent)] border-[var(--accent)] text-black font-semibold shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                : 'border-[var(--border)] hover:text-[var(--accent)] hover:border-[var(--accent)]'
            }`}
          >
            {f === 'all' ? t('projects.filter.all') : f === 'academic' ? t('projects.filter.academic') : t('projects.filter.personal')}
          </button>
        ))}
        <span className="ml-auto text-[11px] text-[var(--muted)] tracking-wide">
          {filtered.length} {t('projects.count')}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-20 text-[var(--muted)] text-sm">{t('terminal.loading')}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-20 text-[var(--muted)] text-sm">
              {t('terminal.projects.empty')}
            </div>
          ) : (
            filtered.map((project) => {
              const previewClass = PREVIEW_CLASS[project.preview_color] || PREVIEW_CLASS.blue;
              const typeStyle = TYPE_STYLES[project.project_type] || 'text-[var(--muted)] border-[var(--border)]';

              return (
                <article
                  key={project.id}
                  className="group bg-[var(--bg2)] rounded-2xl border border-[var(--border)] overflow-hidden transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-[0_0_40px_rgba(56,189,248,0.08)] hover:-translate-y-0.5 flex flex-col"
                >
                  <div className={`relative h-[168px] sm:h-[190px] overflow-hidden bg-gradient-135 ${previewClass}`}>
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-6">
                      <pre className="font-mono text-[10px] sm:text-[11px] text-white/45 leading-[1.85] whitespace-pre-wrap text-left w-full">
                        {project.preview_code || t('projects.no_preview')}
                      </pre>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[var(--bg2)] to-transparent" />
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col flex-1 gap-3">
                    <span className="text-[10px] text-[var(--muted)] uppercase tracking-[0.08em]">
                      {typeLabel(project.project_type)}
                    </span>

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-sans font-bold text-[15px] sm:text-base text-[var(--text)] leading-snug group-hover:text-[var(--accent)] transition-colors">
                        {project.title}
                      </h3>
                      <span className={`text-[9px] px-2 py-0.5 rounded border uppercase tracking-[0.08em] whitespace-nowrap shrink-0 font-medium ${typeStyle}`}>
                        {project.project_type}
                      </span>
                    </div>

                    <p className="text-[12px] sm:text-[13px] text-[var(--muted)] leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {project.tags && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.tags.split(',').map((tag, i) => (
                          <span
                            key={i}
                            className={`text-[10px] px-2.5 py-1 rounded-md font-medium border ${getTagClass(tag)}`}
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      )}
    </section>
  );
}
