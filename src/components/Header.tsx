import { useEffect, useState } from 'react';
import { navLinks } from '../data/site.ts';
import { cn } from '../lib/cn.ts';

interface HeaderProps {
  user: string | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

export function Header({ user, onLogin, onRegister, onLogout }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-white/5 bg-ink/80 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red via-brand-crimson to-brand-gold text-xl shadow-lg shadow-brand-red/30 transition group-hover:scale-105">
            <span className="drop-shadow">👑</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-gold opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-gold" />
            </span>
          </div>
          <div className="leading-tight">
            <div className="text-lg font-black tracking-wide">
              太上老君<span className="text-gradient-gold">云游令</span>
            </div>
            <div className="hidden text-[10px] tracking-[0.2em] text-white/40 sm:block">LA · SINCE 2026</div>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1.5 text-sm">
                <span>👑</span>
                <span className="font-medium text-brand-gold">{user} 道友</span>
              </div>
              <button
                onClick={onLogout}
                className="rounded-lg px-3 py-2 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                退出
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onLogin}
                className="rounded-lg px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
              >
                登录
              </button>
              <button
                onClick={onRegister}
                className="rounded-lg bg-brand-red px-4 py-2 text-sm font-bold text-white shadow-lg shadow-brand-red/30 transition hover:bg-brand-crimson hover:shadow-brand-red/50"
              >
                免费试用 7 天
              </button>
            </>
          )}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/5 lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="菜单"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/5 bg-ink/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-white/80 transition hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2 border-t border-white/5 pt-3">
              {user ? (
                <button
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                  className="flex-1 rounded-lg border border-white/10 py-2.5 text-sm"
                >
                  退出（{user} 道友）
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onLogin();
                      setMenuOpen(false);
                    }}
                    className="flex-1 rounded-lg border border-white/10 py-2.5 text-sm"
                  >
                    登录
                  </button>
                  <button
                    onClick={() => {
                      onRegister();
                      setMenuOpen(false);
                    }}
                    className="flex-1 rounded-lg bg-brand-red py-2.5 text-sm font-bold"
                  >
                    免费试用
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
