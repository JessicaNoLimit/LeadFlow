export type ToastTone = "success" | "error" | "info";

export type Toast = {
  id: string;
  message: string;
  tone: ToastTone;
};

const TOAST_EVENT = "leadflow:toast";
const PENDING_TOAST_KEY = "leadflow-pending-toast";

function createToast(message: string, tone: ToastTone): Toast {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    message,
    tone,
  };
}

export function showToast(message: string, tone: ToastTone = "info") {
  if (typeof window === "undefined") {
    return;
  }

  const toast = createToast(message, tone);
  window.dispatchEvent(new CustomEvent<Toast>(TOAST_EVENT, { detail: toast }));
}

export function persistToast(message: string, tone: ToastTone = "info") {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    PENDING_TOAST_KEY,
    JSON.stringify(createToast(message, tone)),
  );
}

export function consumePersistedToast() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawToast = window.sessionStorage.getItem(PENDING_TOAST_KEY);

  if (!rawToast) {
    return null;
  }

  window.sessionStorage.removeItem(PENDING_TOAST_KEY);

  try {
    return JSON.parse(rawToast) as Toast;
  } catch {
    return null;
  }
}

export function subscribeToToasts(callback: (toast: Toast) => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<Toast>;
    callback(customEvent.detail);
  };

  window.addEventListener(TOAST_EVENT, handler);

  return () => {
    window.removeEventListener(TOAST_EVENT, handler);
  };
}
