import { useState } from 'react';

export function DisclaimerBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-gold/30 bg-ink-2/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 text-xs text-white/70 sm:px-6 lg:px-8">
        <span className="text-base">⚠️</span>
        <p className="flex-1 leading-relaxed">
          <span className="font-semibold text-brand-gold">免责声明：</span>
          本站为纯属虚构的<span className="font-semibold text-white">神话演绎 / 神话故事页面</span>
          ，不提供任何 云游令 或神话故事内容，不收取任何费用。所有人物、赞助、评价、数据均为虚构，如有雷同纯属搞笑。
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-md px-2 py-1 text-white/50 transition hover:bg-white/10 hover:text-white"
          aria-label="关闭声明"
        >
          知道了 ✕
        </button>
      </div>
    </div>
  );
}
