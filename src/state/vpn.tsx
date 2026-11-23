import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { allLines } from '../data/lines.ts';
import { connectLogs } from '../data/content.ts';
import type { Line } from '../data/types.ts';
import { useToast } from './toast.tsx';

export type VpnStatus = 'disconnected' | 'connecting' | 'connected';

interface VpnStore {
  status: VpnStatus;
  server: Line;
  logs: string[];
  elapsed: number;
  down: number;
  up: number;
  selectServer: (id: string) => void;
  connect: (serverId?: string) => void;
  disconnect: () => void;
  toggle: () => void;
}

const VpnContext = createContext<VpnStore | null>(null);

export function useVpn() {
  const ctx = useContext(VpnContext);
  if (!ctx) throw new Error('useVpn must be used within VpnProvider');
  return ctx;
}

const IDLE_LOGS = ['等待连接 ... 仙君正在品仙茶'];
const STEP_DELAY = 260;

export function VpnProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [status, setStatus] = useState<VpnStatus>('disconnected');
  const [server, setServer] = useState<Line>(allLines[0]);
  const [logs, setLogs] = useState<string[]>(IDLE_LOGS);
  const [elapsed, setElapsed] = useState(0);
  const [down, setDown] = useState(0);
  const [up, setUp] = useState(0);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const disconnect = useCallback(() => {
    clearTimers();
    setStatus('disconnected');
    setLogs(['已断开连接。Kill Switch 已启动，流量已全部切断。', ...IDLE_LOGS]);
    setElapsed(0);
    setDown(0);
    setUp(0);
  }, [clearTimers]);

  const connect = useCallback(
    (serverId?: string) => {
      clearTimers();
      const target = serverId ? (allLines.find((line) => line.id === serverId) ?? server) : server;
      setServer(target);
      setStatus('connecting');
      setLogs([`正在连接 ${target.flag} ${target.name} ...`]);
      setElapsed(0);

      connectLogs.forEach((line, index) => {
        const timer = window.setTimeout(
          () => {
            setLogs((prev) => [...prev, line]);
            if (index === connectLogs.length - 1) {
              setStatus('connected');
              toast(`已连接到 ${target.name}`, `当前 IP：${target.ipAfter} · ${target.ipLocation}`, target.flag);
            }
          },
          STEP_DELAY * (index + 1),
        );
        timers.current.push(timer);
      });
    },
    [clearTimers, server, toast],
  );

  const selectServer = useCallback(
    (id: string) => {
      const next = allLines.find((line) => line.id === id);
      if (!next) return;
      setServer(next);
      if (status !== 'disconnected') connect(id);
    },
    [connect, status],
  );

  const toggle = useCallback(() => {
    if (status === 'disconnected') connect();
    else disconnect();
  }, [connect, disconnect, status]);

  // 连接成功后：计时 + 生成实时速率
  useEffect(() => {
    if (status !== 'connected') return;
    const base = server.premium ? 9000 : 800;
    const timer = window.setInterval(() => {
      setElapsed((value) => value + 1);
      setDown(Math.round(base + Math.random() * base * 0.4));
      setUp(Math.round(base * 0.6 + Math.random() * base * 0.3));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [status, server]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const value = useMemo<VpnStore>(
    () => ({ status, server, logs, elapsed, down, up, selectServer, connect, disconnect, toggle }),
    [status, server, logs, elapsed, down, up, selectServer, connect, disconnect, toggle],
  );

  return <VpnContext.Provider value={value}>{children}</VpnContext.Provider>;
}
