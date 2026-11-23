import { useMemo } from 'react';

interface QrCodeProps {
  seed: string;
}

/** 纯前端的「扫码支付」图案：由 seed 生成稳定的伪随机点阵 + 定位角 */
export function QrCode({ seed }: QrCodeProps) {
  const bits = useMemo(() => {
    let state = 0;
    for (const char of seed) state = (state * 31 + char.charCodeAt(0)) >>> 0;
    const out: boolean[] = [];
    for (let i = 0; i < 441; i++) {
      state = (state * 1103515245 + 12345) >>> 0;
      out.push(((state >>> 16) & 1) === 1);
    }
    return out;
  }, [seed]);

  const isFinder = (row: number, col: number) =>
    (row < 7 && col < 7) || (row < 7 && col > 13) || (row > 13 && col < 7);

  const finderFill = (row: number, col: number) => {
    const r = row > 13 ? row - 14 : row;
    const c = col > 13 ? col - 14 : col;
    const ring = r === 0 || r === 6 || c === 0 || c === 6;
    const center = r >= 2 && r <= 4 && c >= 2 && c <= 4;
    return ring || center;
  };

  return (
    <div className="grid aspect-square w-44 grid-cols-21 gap-px rounded-lg bg-white p-2">
      {bits.map((bit, index) => {
        const row = Math.floor(index / 21);
        const col = index % 21;
        const filled = isFinder(row, col) ? finderFill(row, col) : bit;
        return <div key={index} className={filled ? 'bg-ink' : 'bg-white'} />;
      })}
    </div>
  );
}
