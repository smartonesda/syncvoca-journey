import { ReactNode, useCallback, useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  RotateCcw,
  ShieldAlert,
  X
} from 'lucide-react';
import { createContext, useContext } from 'react';

type FeedbackTone = 'success' | 'warning' | 'danger' | 'info';

interface NotifyOptions {
  title: string;
  message?: string;
  tone?: FeedbackTone;
  durationMs?: number;
}

interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: Extract<FeedbackTone, 'warning' | 'danger' | 'info'>;
}

interface AppFeedbackContextValue {
  notify: (options: NotifyOptions) => void;
  requestConfirm: (options: ConfirmOptions) => Promise<boolean>;
}

interface Notice extends Required<NotifyOptions> {
  id: number;
}

interface ConfirmRequest extends Required<ConfirmOptions> {
  resolve: (value: boolean) => void;
}

const AppFeedbackContext = createContext<AppFeedbackContextValue | null>(null);

const toneStyle: Record<FeedbackTone, {
  icon: typeof CheckCircle2;
  iconClass: string;
  accentClass: string;
  buttonClass: string;
}> = {
  success: {
    icon: CheckCircle2,
    iconClass: 'bg-[#e9f9ee] text-[#12843a]',
    accentClass: 'border-l-[#12843a]',
    buttonClass: 'bg-[#12843a] text-white hover:bg-[#0b5d2a]'
  },
  warning: {
    icon: AlertTriangle,
    iconClass: 'bg-[#fff7d6] text-[#9a6700]',
    accentClass: 'border-l-[#f6c343]',
    buttonClass: 'bg-[#f6c343] text-[#17351f] hover:bg-[#e6b222]'
  },
  danger: {
    icon: ShieldAlert,
    iconClass: 'bg-[#fff1f2] text-[#be123c]',
    accentClass: 'border-l-[#e11d48]',
    buttonClass: 'bg-[#be123c] text-white hover:bg-[#9f1239]'
  },
  info: {
    icon: Info,
    iconClass: 'bg-[#eaf4ff] text-[#1768c8]',
    accentClass: 'border-l-[#1768c8]',
    buttonClass: 'bg-[#1768c8] text-white hover:bg-[#0d4f9e]'
  }
};

export function AppFeedbackProvider({ children }: { children: ReactNode }) {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [confirmRequest, setConfirmRequest] = useState<ConfirmRequest | null>(null);
  const noticeId = useRef(0);

  const dismissNotice = useCallback((id: number) => {
    setNotices((current) => current.filter((notice) => notice.id !== id));
  }, []);

  const notify = useCallback((options: NotifyOptions) => {
    const id = noticeId.current + 1;
    noticeId.current = id;

    const notice: Notice = {
      id,
      title: options.title,
      message: options.message || '',
      tone: options.tone || 'info',
      durationMs: options.durationMs ?? 4200
    };

    setNotices((current) => [...current.slice(-2), notice]);
    window.setTimeout(() => dismissNotice(id), notice.durationMs);
  }, [dismissNotice]);

  const requestConfirm = useCallback((options: ConfirmOptions) => new Promise<boolean>((resolve) => {
    setConfirmRequest({
      title: options.title,
      message: options.message,
      confirmLabel: options.confirmLabel || 'Lanjutkan',
      cancelLabel: options.cancelLabel || 'Batal',
      tone: options.tone || 'warning',
      resolve
    });
  }), []);

  const resolveConfirm = (value: boolean) => {
    if (!confirmRequest) return;
    confirmRequest.resolve(value);
    setConfirmRequest(null);
  };

  return (
    <AppFeedbackContext.Provider value={{ notify, requestConfirm }}>
      {children}

      <div className="pointer-events-none fixed right-3 top-20 z-[80] flex w-[calc(100vw-1.5rem)] max-w-sm flex-col gap-3 sm:right-6">
        {notices.map((notice) => {
          const style = toneStyle[notice.tone];
          const Icon = style.icon;

          return (
            <div
              key={notice.id}
              className={`pointer-events-auto flex gap-3 rounded-2xl border border-[#dbe7dd] border-l-4 ${style.accentClass} bg-white p-4 text-[#17351f] shadow-2xl shadow-emerald-950/10`}
              role={notice.tone === 'danger' || notice.tone === 'warning' ? 'alert' : 'status'}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${style.iconClass}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-black leading-snug">{notice.title}</p>
                {notice.message && (
                  <p className="mt-1 text-xs font-medium leading-relaxed text-[#61746a]">
                    {notice.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismissNotice(notice.id)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#61746a] transition hover:bg-[#eef8f0] hover:text-[#0b5d2a]"
                aria-label="Tutup notifikasi"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>

      {confirmRequest && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#07170d]/55 px-4 py-6 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-[1.4rem] border border-[#dbe7dd] bg-white p-5 text-[#17351f] shadow-2xl shadow-emerald-950/20 sm:p-6"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="syncvoca-confirm-title"
            aria-describedby="syncvoca-confirm-message"
          >
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${toneStyle[confirmRequest.tone].iconClass}`}>
                {confirmRequest.tone === 'danger' ? (
                  <ShieldAlert className="h-6 w-6" />
                ) : confirmRequest.tone === 'info' ? (
                  <Info className="h-6 w-6" />
                ) : (
                  <RotateCcw className="h-6 w-6" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#12843a]">
                  SyncVoca Journey
                </p>
                <h2 id="syncvoca-confirm-title" className="mt-1 font-display text-xl font-black leading-tight">
                  {confirmRequest.title}
                </h2>
                <p id="syncvoca-confirm-message" className="mt-3 text-sm font-medium leading-relaxed text-[#61746a]">
                  {confirmRequest.message}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => resolveConfirm(false)}
                className="rounded-full border border-[#dbe7dd] bg-white px-5 py-3 text-sm font-black text-[#17351f] transition hover:bg-[#eef8f0]"
              >
                {confirmRequest.cancelLabel}
              </button>
              <button
                type="button"
                onClick={() => resolveConfirm(true)}
                className={`rounded-full px-5 py-3 text-sm font-black transition ${toneStyle[confirmRequest.tone].buttonClass}`}
              >
                {confirmRequest.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppFeedbackContext.Provider>
  );
}

export function useAppFeedback() {
  const context = useContext(AppFeedbackContext);
  if (!context) {
    throw new Error('useAppFeedback must be used inside AppFeedbackProvider');
  }
  return context;
}
