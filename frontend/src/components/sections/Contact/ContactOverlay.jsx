import { useState, useEffect } from 'react';
import { sendMessage } from '../../../services/api/contact';
import { getProfile } from '../../../services/api/profile';
import { useForm } from 'react-hook-form';
import { useLanguage } from '../../../context/LanguageContext';

export default function ContactOverlay({ isOpen, onClose }) {
  const [sent, setSent] = useState(false);
  const [profile, setProfile] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    getProfile()
      .then(({ data }) => setProfile(data))
      .catch(() => {});
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      await sendMessage(data);
      setSent(true);
      reset();
    } catch {
      // silent
    }
  };

  if (!isOpen) return null;

  const email = profile?.email || 'i.dembele@hestim.ma';
  const phone = profile?.phone || '+212-690-611-402';
  const location = profile?.location || 'Casablanca, Maroc';
  const linkedinUrl = profile?.linkedin_url || 'https://www.linkedin.com/in/issa-d-dembele-a46a34356/';

  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg)] overflow-y-auto animate-fadeIn">
      <button
        type="button"
        onClick={onClose}
        className="fixed top-4 right-4 md:top-8 md:right-12 lg:right-16 bg-transparent border border-[var(--border)] text-[var(--muted)] font-mono text-xs px-3.5 py-1.5 rounded cursor-pointer z-50 hover:text-[var(--text)] hover:border-[var(--text)] transition-all"
      >
        {t('close')}
      </button>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-20 md:py-28 lg:py-32">
        <div className="text-[11px] text-[var(--muted)] tracking-[0.1em] uppercase mb-12 sm:mb-14 md:mb-16 flex items-center gap-3">
          <span className="block w-7 h-px bg-[var(--border)]" />
          <span className="text-[var(--accent)] mr-1">#</span> {t('contact.title')}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 md:gap-14 lg:gap-16 xl:gap-20 items-start">
          {/* Left column */}
          <div className="space-y-12 sm:space-y-14 lg:space-y-16">
            <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-[var(--text)] italic leading-relaxed max-w-md">
              {t('contact.intro')}
            </p>

            <div className="space-y-6 sm:space-y-7">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8">
                <span className="text-[11px] text-[var(--muted)] uppercase tracking-wider w-20 shrink-0">tel</span>
                <span className="text-[13px] sm:text-[14px] text-[var(--text)]">{phone}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8">
                <span className="text-[11px] text-[var(--muted)] uppercase tracking-wider w-20 shrink-0">location</span>
                <span className="text-[13px] sm:text-[14px] text-[var(--text)]">{location}</span>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl lg:text-[2.5rem] font-extrabold tracking-[-0.02em] leading-tight">
              {t('contact.heading')}
            </h2>

            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8">
                <span className="text-[11px] text-[var(--muted)] uppercase tracking-wider w-20 shrink-0">email</span>
                <a href={`mailto:${email}`} className="text-[13px] sm:text-[14px] text-[var(--accent)] no-underline hover:underline">
                  {email}
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8">
                <span className="text-[11px] text-[var(--muted)] uppercase tracking-wider w-20 shrink-0">linkedin</span>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[13px] sm:text-[14px] text-[var(--accent)] no-underline hover:underline">
                  ISSA D DEMBELE
                </a>
              </div>
            </div>

            {sent ? (
              <div className="text-center py-14 sm:py-16 animate-fadeIn">
                <div className="text-4xl sm:text-5xl mb-5 sm:mb-6 text-[var(--green)]">✓</div>
                <h3 className="font-sans text-lg sm:text-xl font-bold mb-2 sm:mb-3">{t('contact.form.sent.title')}</h3>
                <p className="text-sm text-[var(--muted)] mb-6 sm:mb-8">{t('contact.form.sent.text')}</p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="bg-[var(--accent)] border-none text-black font-mono text-[11px] sm:text-xs font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-md cursor-pointer hover:opacity-85 transition-opacity"
                >
                  {t('contact.form.sent.again')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6 lg:space-y-7">
                <div className="flex flex-col gap-2 sm:gap-2.5">
                  <label className="text-[11px] text-[var(--muted)]">
                    {t('contact.form.name')} <span className="text-[var(--red)]">*</span>
                  </label>
                  <input
                    {...register('name', { required: t('contact.form.name.required') })}
                    className="bg-[var(--bg2)] border border-[var(--border)] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm text-[var(--text)] font-mono outline-none focus:border-[var(--accent)] transition-colors w-full"
                    placeholder={t('contact.form.name.placeholder')}
                  />
                  {errors.name && <span className="text-[10px] text-[var(--red)]">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-2 sm:gap-2.5">
                  <label className="text-[11px] text-[var(--muted)]">
                    {t('contact.form.email')} <span className="text-[var(--red)]">*</span>
                  </label>
                  <input
                    {...register('email', {
                      required: t('contact.form.email.required'),
                      pattern: { value: /^\S+@\S+$/i, message: t('contact.form.email.invalid') },
                    })}
                    className="bg-[var(--bg2)] border border-[var(--border)] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm text-[var(--text)] font-mono outline-none focus:border-[var(--accent)] transition-colors w-full"
                    placeholder={t('contact.form.email.placeholder')}
                  />
                  {errors.email && <span className="text-[10px] text-[var(--red)]">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col gap-2 sm:gap-2.5">
                  <label className="text-[11px] text-[var(--muted)]">
                    {t('contact.form.message')} <span className="text-[var(--red)]">*</span>
                  </label>
                  <textarea
                    {...register('message', { required: t('contact.form.message.required') })}
                    rows={5}
                    className="bg-[var(--bg2)] border border-[var(--border)] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-sm text-[var(--text)] font-mono outline-none focus:border-[var(--accent)] transition-colors resize-none w-full"
                    placeholder={t('contact.form.message.placeholder')}
                  />
                  {errors.message && <span className="text-[10px] text-[var(--red)]">{errors.message.message}</span>}
                </div>

                <input type="hidden" {...register('subject')} value="" />

                <button
                  type="submit"
                  className="w-full bg-[var(--accent)] border-none text-black font-mono text-[12px] sm:text-sm font-bold py-3 sm:py-3.5 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
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
