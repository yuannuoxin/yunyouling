import { useEffect, useState } from 'react';
import { cn } from '../lib/cn.ts';
import { useToast } from '../state/toast.tsx';

export type AuthMode = 'login' | 'register';

interface AuthModalProps {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
  onAuthed: (name: string) => void;
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition placeholder:text-white/30 focus:border-brand-gold/60 focus:bg-white/[0.07]';

export function AuthModal({ open, mode, onClose, onModeChange, onAuthed }: AuthModalProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      const nickname = account.split('@')[0] || '道友';
      onAuthed(nickname);
      onClose();
      toast(
        mode === 'login' ? `欢迎回来，${nickname} 道友！` : `注册成功，${nickname} 道友！`,
        mode === 'login'
          ? '仙君已知晓你的到来。（假的，什么都没发生）'
          : '已赠送 7 天仙尊体验，并自动加入天庭。（假的，什么都没发生）',
        '👑',
      );
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="animate-fade-up relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-ink-2 shadow-2xl shadow-black">
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-brand-red/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl" />

        <div className="relative p-7">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red to-brand-gold text-xl shadow-lg shadow-brand-red/30">
                👑
              </div>
              <div>
                <div className="text-lg font-bold">山海经云游令</div>
                <div className="text-xs text-white/50">仙尊级账户系统 · 纯属虚构</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="关闭"
            >
              ✕
            </button>
          </div>

          <div className="mb-6 grid grid-cols-2 rounded-xl bg-white/5 p-1">
            {(['login', 'register'] as const).map((item) => (
              <button
                key={item}
                onClick={() => onModeChange(item)}
                className={cn(
                  'rounded-lg py-2 text-sm font-medium transition',
                  mode === item ? 'bg-brand-red text-white shadow' : 'text-white/60 hover:text-white',
                )}
              >
                {item === 'login' ? '登录' : '注册'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs text-white/60">邮箱 / 手机号 / 仙籍编号（任选其一，我们都知道）</span>
              <input
                required
                type="text"
                value={account}
                onChange={(event) => setAccount(event.target.value)}
                placeholder="comrade@example.cn"
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs text-white/60">密码（建议不要用 123456，本仙一猜就中）</span>
              <input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className={inputClass}
              />
            </label>

            {mode === 'register' && (
              <label className="block">
                <span className="mb-1.5 block text-xs text-white/60">邀请码（选填，填「TRUMP」可领仙税豁免）</span>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(event) => setInviteCode(event.target.value)}
                  placeholder="例如：PENGLAI仙令"
                  className={inputClass}
                />
              </label>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="shimmer-btn animate-shimmer w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg shadow-brand-red/30 transition hover:brightness-110 disabled:opacity-70"
            >
              {submitting ? '正在向天庭汇报...' : mode === 'login' ? '立即登录' : '立即注册 · 送 7 天仙尊体验'}
            </button>
          </form>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-white/40">
            点击即表示您同意《用户协议》《隐私政策》以及《不可描述的附加条款》。
            <br />
            本页面为神话主题网站，不会收集或发送任何数据。
          </p>
        </div>
      </div>
    </div>
  );
}
