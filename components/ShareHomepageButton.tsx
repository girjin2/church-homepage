"use client";

export default function ShareHomepageButton({
  className = "btn hero-secondary",
  label = "홈페이지 공유"
}: {
  className?: string;
  label?: string;
}) {
  async function share() {
    const shareData = {
      title: "서재교회",
      text: "서재교회 홈페이지입니다.",
      url: window.location.origin
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(shareData.url);
      alert("홈페이지 주소를 복사했습니다. 문자, 카카오톡, 메일 등에 붙여넣어 공유해 주세요.");
    } catch (error) {
      if ((error as DOMException)?.name === "AbortError") return;

      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("홈페이지 주소를 복사했습니다.");
      } catch {
        alert(`서재교회 홈페이지 주소: ${shareData.url}`);
      }
    }
  }

  return (
    <button type="button" className={className} onClick={share} aria-label={label}>
      <span aria-hidden="true" style={{marginRight:6}}>↗</span>{label}
    </button>
  );
}
