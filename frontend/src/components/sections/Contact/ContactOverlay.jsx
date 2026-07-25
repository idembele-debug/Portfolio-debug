import { useState } from 'react';
import { sendMessage } from '../../../services/api/contact';
import { useForm } from 'react-hook-form';

export default function ContactOverlay({ isOpen, onClose }) {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

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
        className="fixed top-4 right-6 md:right-12 bg-transparent border border-[var(--border)] text-[var(--muted)] font-mono text-xs px-3.5 py-1.5 rounded cursor-pointer z-50 hover:text-[var(--text)] hover:border-[var(--text)] transition-all"
      >
        ✕ close
      </button>

      <div className="max-w-[900px] mx-auto px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[72px]">
        {/* Left: SSH Info */}
        <div>
          <div className="text-[var(--green)] text-xs font-mono">✦ SSH — established since 2023</div>
          <h2 className="font-sans text-3xl font-extrabold mt-5 mb-2.5 tracking-[-0.02em]">Let's connect</h2>
          <p className="text-xs text-[var(--muted)] mb-6">
            Whether you have a question, a project idea, or just want to say hi — I'll read every message.
          </p>

          <div className="space-y-1.5">
            {[
              { key: 'email', val: 'i.dembele@hestim.ma' },
              { key: 'linkedin', val: 'ISSA-D-DEMBELE' },
              { key: 'location', val: 'Morocco' },
            ].map((item) => (
              <div key={item.key} className="flex gap-3.5 text-xs">
                <span className="text-[var(--muted)] min-w-[56px]">{item.key}</span>
                <span className="text-[var(--accent)]">
                  <a href={item.key === 'email' ? `mailto:${item.val}` : item.key === 'linkedin' ? `https://linkedin.com/in/${item.val}` : '#'} className="text-[var(--accent)] no-underline">
                    {item.val}
                  </a>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-[var(--bg2)] border border-[var(--border)] rounded-md p-3 text-[11px] leading-[1.9]">
            <span className="text-[var(--green)]">● Available</span> for freelance projects, collaborations, and internship opportunities.
          </div>
        </div>

        {/* Right: Contact Form */}
        <div>
          {sent ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-sans text-xl font-bold mb-2">Message sent!</h3>
              <p className="text-xs text-[var(--muted)]">I'll get back to you as soon as possible.</p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 bg-[var(--accent)] border-none text-black font-mono text-xs font-bold px-5 py-2.5 rounded-md cursor-pointer"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[var(--muted)]">
                  Name <span className="text-[var(--red)]">*</span>
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="bg-[var(--bg2)] border border-[var(--border)] rounded-md px-3 py-2 text-xs text-[var(--text)] font-mono outline-none focus:border-[var(--accent)] transition-colors"
                />
                {errors.name && <span className="text-[10px] text-[var(--red)]">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[var(--muted)]">
                  Email <span className="text-[var(--red)]">*</span>
                </label>
                <input
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                  className="bg-[var(--bg2)] border border-[var(--border)] rounded-md px-3 py-2 text-xs text-[var(--text)] font-mono outline-none focus:border-[var(--accent)] transition-colors"
                />
                {errors.email && <span className="text-[10px] text-[var(--red)]">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[var(--muted)]">Subject</label>
                <input
                  {...register('subject')}
                  className="bg-[var(--bg2)] border border-[var(--border)] rounded-md px-3 py-2 text-xs text-[var(--text)] font-mono outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[var(--muted)]">
                  Message <span className="text-[var(--red)]">*</span>
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={4}
                  className="bg-[var(--bg2)] border border-[var(--border)] rounded-md px-3 py-2 text-xs text-[var(--text)] font-mono outline-none focus:border-[var(--accent)] transition-colors resize-none"
                />
                {errors.message && <span className="text-[10px] text-[var(--red)]">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--accent)] border-none text-black font-mono text-xs font-bold py-2.5 rounded-md cursor-pointer hover:opacity-85 transition-opacity"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}