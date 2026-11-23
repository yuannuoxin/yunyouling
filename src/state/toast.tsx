import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { cn } from '../lib/cn.ts';

export interface ToastItem {
  id: number;
  title: string;
  desc?: string;
  icon?: string;
}

type ToastFn = (title: string, desc?: string, icon?: string) => void;

const ToastContext = createContext<{ toast: ToastFn } | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback<ToastFn>((title, desc, icon) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, desc, icon }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3800);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed top-20 right-4 z-[100] flex w-[min(92vw,380px)] flex-col gap-3">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={cn(
              'glass animate-fade-up pointer-events-auto flex items-start gap-3 rounded-2xl border-white/10 bg-ink-3/90 p-4 shadow-2xl shadow-black/50',
            )}
          >
            <div className="text-2xl leading-none">{item.icon ?? '📢'}</div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white">{item.title}</div>
              {item.desc && (
                <div className="mt-0.5 text-xs leading-relaxed text-white/60">{item.desc}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
