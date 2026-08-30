# 메인 문구 잘림 수정 패치

변경 파일: `app/globals.css` 하나만

수정 내용:
- 한글 단어 중간 줄바꿈 방지 (`word-break: keep-all`)
- 제목 영역 600px → 700px 확대
- 제목 줄간격 및 자간 조정
- 설명 문장도 단어 중간 줄바꿈 방지
- 고정 높이/overflow로 글자가 잘리지 않도록 overflow visible 명시

다른 기능, Supabase, 사진 업로드, 헤더 로고, PWA는 변경하지 않음.
