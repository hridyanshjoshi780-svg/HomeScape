import { useEffect, useState, useCallback } from "react";

/**
 * useCompare – localStorage-backed compare list (Feature 2).
 * Stores up to `max` property IDs.
 * Emits a custom "homescape:compare-change" event so multiple
 * components can stay in sync within the same tab.
 */
const STORAGE_KEY = "homescape_compare";
const EVENT_NAME = "homescape:compare-change";
const MAX = 4;

const readStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX) : [];
  } catch {
    return [];
  }
};

const writeStorage = (ids) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  // Notify listeners (same tab)
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: ids }));
};

export default function useCompare() {
  const [ids, setIds] = useState(() => readStorage());

  useEffect(() => {
    const onChange = () => setIds(readStorage());
    window.addEventListener(EVENT_NAME, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT_NAME, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const has = useCallback((id) => ids.includes(String(id)), [ids]);

  const add = useCallback((id) => {
    const sid = String(id);
    const current = readStorage();
    if (current.includes(sid)) return { ok: true, reason: "exists" };
    if (current.length >= MAX)
      return { ok: false, reason: "limit", limit: MAX };
    writeStorage([...current, sid]);
    return { ok: true };
  }, []);

  const remove = useCallback((id) => {
    const sid = String(id);
    writeStorage(readStorage().filter((x) => x !== sid));
  }, []);

  const toggle = useCallback((id) => {
    const sid = String(id);
    const current = readStorage();
    if (current.includes(sid)) {
      writeStorage(current.filter((x) => x !== sid));
      return { ok: true, action: "removed" };
    }
    if (current.length >= MAX)
      return { ok: false, reason: "limit", limit: MAX };
    writeStorage([...current, sid]);
    return { ok: true, action: "added" };
  }, []);

  const clear = useCallback(() => writeStorage([]), []);

  return { ids, count: ids.length, max: MAX, has, add, remove, toggle, clear };
}