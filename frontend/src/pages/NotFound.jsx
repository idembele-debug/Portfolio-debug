import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-mono flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold text-[var(--accent)] mb-4">{t('notfound.title')}</h1>
      <p className="text-lg text-[var(--muted)] mb-4">{t('notfound.subtitle')}</p>
      <p className="text-sm text-[var(--muted)] mb-8">{t('notfound.text')}</p>
      <Link
        to="/"
        className="bg-[var(--accent)] text-black font-bold px-6 py-3 rounded-md no-underline hover:opacity-85 transition-opacity"
      >
        {t('notfound.back')}
      </Link>
    </div>
  );
}