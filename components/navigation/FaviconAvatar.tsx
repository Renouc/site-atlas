"use client";

import { useState } from "react";

type FaviconAvatarProps = {
  domain: string;
  initial: string;
  avatarClass: string;
};

export default function FaviconAvatar({
  domain,
  initial,
  avatarClass,
}: FaviconAvatarProps) {
  const [errored, setErrored] = useState(false);

  if (!errored && domain) {
    return (
      <div className="flex h-10 w-10 shrink-0 select-none items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-100 dark:bg-slate-700/80 dark:ring-slate-600/50">
        <img
          src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
          alt=""
          aria-hidden="true"
          width={26}
          height={26}
          className="h-[26px] w-[26px] object-contain"
          onError={() => setErrored(true)}
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
