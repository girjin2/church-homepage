"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      (window as any).__seojaePwaInstallPrompt = event;
      window.dispatchEvent(new Event("seojae-pwa-install-ready"));
    };

    const onInstalled = () => {
      (window as any).__seojaePwaInstallPrompt = null;
      window.dispatchEvent(new Event("seojae-pwa-installed"));
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("PWA service worker registration failed:", error);
      });
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  return null;
}
