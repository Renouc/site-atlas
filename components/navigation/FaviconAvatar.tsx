"use client";

import { useEffect, useRef, useState } from "react";

type FaviconAvatarProps = {
  domain: string;
  initial: string;
  avatarClass: string;
};

/** 超过此时间仍未加载完成，直接降级为字母头像 */
const LOAD_TIMEOUT_MS = 3000;

export default function FaviconAvatar({
  domain,
  initial,
  avatarClass,
}: FaviconAvatarProps) {
  const [errored, setErrored] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!domain || errored) return;

    timerRef.current = setTimeout(() => setErrored(true), LOAD_TIMEOUT_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [domain, errored]);

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  if (!errored && domain) {
    return (
      <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-100 dark:bg-slate-700/80 dark:ring-slate-600/50">
        <img
          src={`/api/favicon?domain=${domain}`}
          alt=""
          aria-hidden="true"
          width={26}
          height={26}
          className="h-[26px] w-[26px] object-contain"
          onLoad={clearTimer}
          onError={() => { clearTimer(); setErrored(true); }}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-xl text-sm font-bold ${avatarClass}`}
    >
      {initial}
    </div>
  );
}
