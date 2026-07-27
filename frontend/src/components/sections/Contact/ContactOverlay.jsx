import { useState } from 'react';
import { sendMessage } from '../../../services/api/contact';
import { useForm } from 'react-hook-form';
import { useLanguage } from '../../../context/LanguageContext';

export default function ContactOverlay({ isOpen, onClose }) {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { t } = useLanguage();

  const onSubmit = async (data) => {
    try {
      await sendMessage(data);
      setSent(true);
      reset();
    } catch {
      // Handle error
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg)] overflow-y-auto animate-fadeIn">
      <button
        onClick={onClose}
        className="fixed top-4 right-4 md:right-12 bg-transparent border border-[var(--border)] text-[var(--muted)] font-mono text-xs px-3.5 py-1.5 rounded cursor-pointer z-50 hover:text-[var(--text)] hover:border-[var(--text)] transition-all"
      >
        {t('close')}
      </button>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-12 py-20">
        {/* Section header */}
        <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-11 flex items-center gap-3">
          <span className="block w-7 h-px bg-[var(--border)]"></span>
          <span className="text-[var(--accent)] mr-1">#</span> {t('contact.title')}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[72px] items-start">
          {/* Left: Info */}
          <div>
            <div className="text-[var(--green)] text-xs font-mono animate-fadeIn">{t('contact.ssh')}</div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold mt-5 mb-2.5 tracking-[-0.02em]">{t('contact.heading')}</h2>
            <p className="text-[13px] text-[var(--muted)] mb-6 leading-relaxed">
              {t('contact.subtitle')}
            </p>

            {/* Contact info cards */}
            <div className="space-y-2.5 mb-6">
              <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-lg p-3.5 flex items-center gap-3 hover:border-[var(--accent)] transition-colors">
                <span className="text-lg">✉</span>
                <div>
                  <div className="text-[10px] text-[var(--muted)] uppercase tracking-[0.08em]">{t('contact.email')}</div>
                  <a href="mailto:i.dembele@hestim.ma" className="text-[13px] text-[var(--accent)] no-underline hover:underline">
                    i.dembele@hestim.ma
                  </a>
                </div>
              </div>
              <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-lg p-3.5 flex items-center gap-3 hover:border-[var(--accent)] transition-colors">
                <span className="text-lg">📍</span>
                <div>
                  <div className="text-[10px] text-[var(--muted)] uppercase tracking-[0.08em]">{t('contact.location')}</div>
                  <div className="text-[13px] text-[var(--text)]">Morocco</div>
                </div>
              </div>
              <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-lg p-3.5 flex items-center gap-3 hover:border-[var(--accent)] transition-colors">
                <span className="text-lg">🔗</span>
                <div>
                  <div className="text-[10px] text-[var(--muted)] uppercase tracking-[0.08em]">{t('contact.social.linkedin')}</div>
                  <a href="https://linkedin.com/in/ISSA-D-DEMBELE" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[var(--accent)] no-underline hover:underline">
                    /in/ISSA-D-DEMBELE
                  </a>
                </div>
              </div>
              <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-lg p-3.5 flex items-center gap-3 hover:border-[var(--accent)] transition-colors">
                <span className="text-lg">💻</span>
                <div>
                  <div className="text-[10px] text-[var(--muted)] uppercase tracking-[0.08em]">{t('contact.social.github')}</div>
                  <a href="https://github.com/idembele-debug" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[var(--accent)] no-underline hover:underline">
                    /idembele-debug
                  </a>
                </div>
              </div>
            </div>

            {/* Availability status */}
            <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-md p-3.5 text-xs leading-relaxed animate-fadeIn">
              <span className="text-[var(--green)]">● {t('contact.available')}</span>
              <span className="text-[var(--muted)]">{t('contact.available.text')}</span>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              <a href="https://github.com/idembele-debug"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center text-[11px] gap-1.5 text-[var(--muted)] no-underline bg-[var(--bg2)] border border-[var(--border)] px-3 py-2 rounded-md hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
              >
                <span>⎇</span> GitHub
              </a>
              <a href="https://linkedin.com/in/ISSA-D-DEMBELE"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center text-[11px] gap-1.5 text-[var(--muted)] no-underline bg-[var(--bg2)] border border-[var(--border)] px-3 py-2 rounded-md hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
              >
                <span>in</span> LinkedIn
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {sent ? (
              <div className="text-center py-12 animate-fadeIn">
                <div className="text-5xl mb-5 text-[var(--green)]">✓</div>
                <h3 className="font-sans text-xl font-bold mb-2">{t('contact.form.sent.title')}</h3>
                <p className="text-xs text-[var(--muted)] mb-6">{t('contact.form.sent.text')}</p>
                <button
                  onClick={() => setSent(false)}
                  className="bg-[var(--accent)] border-none text-black font-mono text-xs font-bold px-5 py-2.5 rounded-md cursor-pointer hover:opacity-85 transition-opacity"
                >
                  {t('contact.form.sent.again')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[var(--muted)]">
                    {t('contact.form.name')} <span className="text-[var(--red)]">*</span>
                  </label>
                  <input
                    {...register('name', { required: t('contact.form.name.required') })}
                    className="bg-[var(--bg2)] border border-[var(--border)] rounded-md px-3 py-2 text-xs text-[var(--text)] font-mono outline-none focus:border-[var(--accent)] transition-colors w-full"
                    placeholder={t('contact.form.name')}
                  />
                  {errors.name && <span className="text-[10px] text-[var(--red)]">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[var(--muted)]">
                    {t('contact.form.email')} <span className="text-[var(--red)]">*</span>
                  </label>
                  <input
                    {...register('email', {
                      required: t('contact.form.email.required'),
                      pattern: { value: /^\S+@\S+$/i, message: t('contact.form.email.invalid') }
                    })}
                    className="bg-[var(--bg2)] border border-[var(--border)] rounded-md px-3 py-2 text-xs text-[var(--text)] font-mono outline-none focus:border-[var(--accent)] transition-colors w-full"
                    placeholder={`email@example.com`}
                  />
                  {errors.email && <span className="text-[10px] text-[var(--red)]">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[var(--muted)]">{t('contact.form.subject')}</label>
                  <input
                    {...register('subject')}
                    className="bg-[var(--bg2)] border border-[var(--border)] rounded-md px-3 py-2 text-xs text-[var(--text)] font-mono outline-none focus:border-[var(--accent)] transition-colors w-full"
                    placeholder={t('contact.form.subject')}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[var(--muted)]">
                    {t('contact.form.message')} <span className="text-[var(--red)]">*</span>
                  </label>
                  <textarea
                    {...register('message', { required: t('contact.form.message.required') })}
                    rows={4}
                    className="bg-[var(--bg2)] border border-[var(--border)] rounded-md px-3 py-2 text-xs text-[var(--text)] font-mono outline-none focus:border-[var(--accent)] transition-colors resize-none w-full"
                    placeholder={t('contact.form.message')}
                  />
                  {errors.message && <span className="text-[10px] text-[var(--red)]">{errors.message.message}</span>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--accent)] border-none text-black font-mono text-xs font-bold py-2.5 rounded-md cursor-pointer hover:opacity-85 transition-opacity"
                >
                  {t('contact.form.send')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}