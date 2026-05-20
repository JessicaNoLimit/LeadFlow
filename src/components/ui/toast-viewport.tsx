"use client";

import { useEffect, useState } from "react";
import {
  consumePersistedToast,
  subscribeToToasts,
  type Toast,
} from "@/lib/toast";

const toneClassNames = {
  success: "border-[#64866f]/35 bg-[#142219]/96 text-[#d7ebdb]",
  error: "border-[#8f5959]/35 bg-[#241515]/96 text-[#f3d1d1]",
  info: "border-sand/28 bg-[#171513]/96 text-[#efe1c4]",
} as const;

export function ToastViewport() {
  const [toasts, setToasts] = useState<Toast[]>(() => {
    const persistedToast = consumePersistedToast();
    return persistedToast ? [persistedToast] : [];
  });

  useEffect(() => {
    return subscribeToToasts((toast) => {
      setToasts((currentToasts) => [...currentToasts, toast]);
    });
  }, []);

  useEffect(() => {
    if (toasts.length === 0) {
      return;
    }

    const timers = toasts.map((toast) =>
      window.setTimeout(() => {
        setToasts((currentToasts) =>
          currentToasts.filter((currentToast) => currentToast.id !== toast.id),
        );
      }, 3200),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [toasts]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex justify-center px-4">
      <div className="flex w-full max-w-md flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto rounded-2xl border px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 ${toneClassNames[toast.tone]}`}
          >
            <p className="text-sm leading-6">{toast.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
