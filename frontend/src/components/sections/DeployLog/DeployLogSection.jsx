import { useEffect, useState } from 'react';
import { getDeployLogs } from '../../../services/api/deployLog';

const BADGE_CLASSES = {
  ok: 'bg-[#052e16] text-[var(--green)]',
  warn: 'bg-[#1c1400] text-[var(--yellow)]',
  err: 'bg-[#1f0707] text-[var(--red)]',
  info: 'bg-[#0c1a2a] text-[var(--accent)]',
};

export default function DeployLogSection() {
  const [logs, setLogs] = useState([]);

  const loadLogs = async () => {
    try {
      const { data } = await getDeployLogs();
      setLogs(data);
    } catch {
      setLogs([]);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-20">
      <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg3)] border-b border-[var(--border)] text-[11px] text-[var(--muted)]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
          <span className="w-3 h-3 rounded-full bg-[#febc2e]"></span>
          <span className="w-3 h-3 rounded-full bg-[#28c840]"></span>
          <span className="ml-2">$ tail -f study.log</span>
        </div>
        <div className="p-3 sm:p-4 text-[11px] leading-[2.1] overflow-x-auto">
          {logs.length === 0 ? (
            <div className="flex gap-3">
              <span className="text-[var(--muted)] min-w-[65px] shrink-0">--:--:--</span>
              <span className="min-w-[46px] text-center px-1.5 rounded text-[9px] font-bold bg-[#0c1a2a] text-[var(--accent)] shrink-0">[INFO]</span>
              <span className="text-[var(--text)]">No logs yet. They will appear here once the system is running.</span>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex gap-3 flex-wrap sm:flex-nowrap">
                <span className="text-[var(--muted)] min-w-[65px] shrink-0">{log.time}</span>
                <span className={`min-w-[46px] text-center px-1.5 rounded text-[9px] font-bold shrink-0 ${BADGE_CLASSES[log.badge_type] || 'bg-[#0c1a2a] text-[var(--accent)]'}`}>
                  [{log.badge_type.toUpperCase()}]
                </span>
                <span className="text-[var(--text)] break-words">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}