import { useEffect, useRef, useState } from "react";

// Persist a state value to localStorage
export function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
}

// Prevent rapid re-clicks within a short window
export function useClickGuard(delayMs = 250) {
  const lockedRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return function shouldBlock() {
    if (lockedRef.current) return true;
    lockedRef.current = true;
    timerRef.current = setTimeout(() => {
      lockedRef.current = false;
    }, delayMs);
    return false;
  };
}

// Simple timer with start/stop/reset and elapsedMs
export function useTimer() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const runningRef = useRef(false);
  const startRef = useRef(0);
  const intervalRef = useRef(null);

  const stop = () => {
    if (!runningRef.current) return;
    runningRef.current = false;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setElapsedMs((prev) => prev + (Date.now() - startRef.current));
  };

  const start = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    startRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startRef.current);
    }, 100);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    runningRef.current = false;
    startRef.current = 0;
    setElapsedMs(0);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return { elapsedMs, start, stop, reset };
}

// Initialize stats object per difficulty
export function createInitialStats() {
  const base = { plays: 0, wins: 0, bestTimeMs: null, totalTimeMs: 0 };
  return { easy: { ...base }, medium: { ...base }, hard: { ...base } };
}

export function recordGame(stats, difficulty, { won, timeMs }) {
  const next = { ...stats, [difficulty]: { ...stats[difficulty] } };
  const d = next[difficulty];
  d.plays += 1;
  if (won) {
    d.wins += 1;
    d.totalTimeMs += timeMs || 0;
    if (timeMs != null && (d.bestTimeMs == null || timeMs < d.bestTimeMs)) {
      d.bestTimeMs = timeMs;
    }
  }
  return next;
}

export function formatMs(ms) {
  if (ms == null) return "-";
  const sec = Math.floor(ms / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
