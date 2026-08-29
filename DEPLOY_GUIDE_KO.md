# 무료 배포 순서

## 1. Supabase 프로젝트 만들기
1. https://supabase.com 가입
2. New project 선택
3. 프로젝트 이름과 DB 비밀번호 설정
4. SQL Editor 열기
5. `supabase/schema.sql` 내용을 전체 복사하여 실행

## 2. 관리자 계정 만들기
Supabase Dashboard > Authentication > Users에서 관리자 사용자를 추가합니다.
이 이메일/비밀번호가 `/admin/login` 로그인 정보가 됩니다.

## 3. Supabase 키 확인
Supabase Dashboard > Project Settings 또는 Connect/API 화면에서 다음 두 값을 확인합니다.
- Project URL
- anon/public key

`.env.example`을 `.env.local`로 복사하고 값을 넣습니다.

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
```

주의: service_role 키는 홈페이지에 절대로 넣지 마세요.

## 4. 컴퓨터에서 먼저 확인
터미널에서:
```
npm install
npm run dev
```
브라우저에서 http://localhost:3000 을 엽니다.
관리자는 http://localhost:3000/admin/login 입니다.

## 5. GitHub에 올리기
GitHub에서 새 repository를 만든 뒤 이 프로젝트 파일 전체를 올립니다.
`.env.local`은 올리지 않습니다.

## 6. Vercel 무료 배포
1. https://vercel.com 가입
2. Add New > Project
3. GitHub repository 선택
4. Environment Variables에 Supabase URL과 ANON KEY 두 개 추가
5. Deploy

완료되면 `프로젝트이름.vercel.app` 주소가 생깁니다.

## 7. 교회 이름 변경
배포 후 `/admin/login`으로 들어가 로그인합니다.
'교회 기본정보'의 '교회 이름'을 수정하고 저장하면 화면의 교회 이름이 변경됩니다.

## 중요
현재 V1 관리자 권한은 'Supabase에 로그인 가능한 사용자 = 관리자' 구조입니다. 관리자 계정은 필요한 사람만 생성하세요.
