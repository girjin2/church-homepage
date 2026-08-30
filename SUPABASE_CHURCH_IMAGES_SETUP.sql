-- 서재교회 홈페이지 예배 소식 사진용 Storage 설정
-- Supabase > SQL Editor에서 이 파일 전체를 한 번 실행하세요.
-- 다른 버킷/테이블은 변경하지 않습니다.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  '교회 이미지',
  '교회 이미지',
  true,
  5242880,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "public church image read" on storage.objects;
drop policy if exists "auth church image insert" on storage.objects;
drop policy if exists "auth church image update" on storage.objects;
drop policy if exists "auth church image delete" on storage.objects;

create policy "public church image read"
on storage.objects for select
using (bucket_id = '교회 이미지');

create policy "auth church image insert"
on storage.objects for insert to authenticated
with check (bucket_id = '교회 이미지');

create policy "auth church image update"
on storage.objects for update to authenticated
using (bucket_id = '교회 이미지')
with check (bucket_id = '교회 이미지');

create policy "auth church image delete"
on storage.objects for delete to authenticated
using (bucket_id = '교회 이미지');
