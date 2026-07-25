import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-mono flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold text-[var(--accent)] mb-4">404</h1>
      <p className="text-lg text-[var(--muted)] mb-8">Page not found</p>
      <Link
        to="/"
        className="bg-[var(--accent)] text-black font-bold px-6 py-3 rounded-md no-underline hover:opacity-85 transition-opacity"
      >
        Back to home
      </Link>
    </div>
  );
}