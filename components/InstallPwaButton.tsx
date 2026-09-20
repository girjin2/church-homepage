"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function InstallPwaButton({
  className = "btn hero-secondary",
  label = "앱 설치"
}: {
  className?: string;
  label?: string;
}) {
  const router = useRouter();
  const [installed, setInstalled] = useState(false);
  const [installReady, setInstallReady] = useState(false);

  useEffect(() => {
    const detectInstalled = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
      setInstalled(standalone);
    };

    const detectReady = () => {
      setInstallReady(Boolean((window as any).__seojaePwaInstallPrompt));
    };

    detectInstalled();
    detectReady();

    window.addEventListener("seojae-pwa-install-ready", detectReady);
    window.addEventListener("seojae-pwa-installed", detectInstalled);
    return () => {
      window.removeEventListener("seojae-pwa-install-ready", detectReady);
      window.removeEventListener("seojae-pwa-installed", detectInstalled);
    };
  }, []);

  async function install() {
    if (installed) {
      alert("서재교회 앱이 이미 설치되어 있습니다.");
      return;
    }

    const deferred = (window as any).__seojaePwaInstallPrompt as BeforeInstallPromptEvent | undefined;
    if (deferred) {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "accepted") {
        (window as any).__seojaePwaInstallPrompt = null;
        setInstallReady(false);
      }
      return;
    }

    const ua = navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);

    if (isIos) {
      alert("아이폰·아이패드는 Safari에서 공유 버튼을 누른 뒤 '홈 화면에 추가'를 선택해 주세요.");
      return;
    }

    if (isAndroid) {
      alert("이 브라우저에서는 자동 설치창을 열 수 없습니다. Chrome으로 서재교회 홈페이지를 연 뒤 '앱 설치'를 다시 눌러 주세요.");
      return;
    }

    router.push("/app-download");
  }

  return (
    <button type="button" className={className} onClick={install} aria-label={label}>
      {installed ? "앱 설치됨" : installReady ? label : label}
    </button>
  );
}
