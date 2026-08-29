# Supabase 아주 쉽게 연결하기

## Supabase가 하는 일
Vercel = 홈페이지를 인터넷에 띄우는 곳
Supabase = 홈페이지의 자료창고 + 관리자 로그인

Supabase를 연결하면 `/admin`에서 로그인한 뒤
- 교회 이름/주소/예배시간 변경
- 설교 등록/삭제
- 교회소식 등록/삭제
- 주보 파일 업로드/삭제
를 할 수 있습니다.

Supabase를 연결하지 않아도 홈페이지는 작동합니다.
그 경우 이 프로젝트에 들어 있는 서재교회 기본 자료가 표시됩니다.

## 연결 순서
1. https://supabase.com 에 가입
2. New Project 생성
3. SQL Editor 열기
4. 이 프로젝트의 `supabase/schema.sql` 전체를 붙여넣고 Run
5. Authentication > Users에서 관리자 사용자 1명 생성
6. Project Settings > API에서
   - Project URL
   - anon / publishable key
   를 확인
7. Vercel > church-homepage > Environment Variables에서 아래 2개를 등록
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
8. Vercel에서 Redeploy
9. 홈페이지주소/admin/login 으로 접속

## 비용
Supabase Free Plan은 $0/월입니다.
교회 홈페이지처럼 글, 설교 링크, 주보를 관리하는 용도는 처음에는 무료 범위로 시작할 수 있습니다.
단 Free 프로젝트는 일정 기간 활동이 없으면 일시 정지될 수 있습니다.
