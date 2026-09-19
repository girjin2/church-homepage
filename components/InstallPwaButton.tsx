"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function InstallPwaButton({ className = "btn hero-secondary", label = "앱 설치" }: { className?: string; label?: string }) {
  const router = useRouter();
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalled(isStandalone);

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setPromptEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (installed) {
      alert("서재교회 앱이 이미 설치되어 있습니다.");
      return;
    }

    if (promptEvent) {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === "accepted") {
        setPromptEvent(null);
      }
      return;
    }

    const ua = navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua);
    if (isIos) {
      alert("아이폰·아이패드는 Safari의 공유 버튼을 누른 뒤 '홈 화면에 추가'를 선택해 주세요.");
      return;
    }

    router.push("/app-download");
  }

  return (
    <button type="button" className={className} onClick={install}>
      {installed ? "앱 설치됨" : label}
    </button>
  );
}
