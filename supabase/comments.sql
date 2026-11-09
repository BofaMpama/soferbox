create table if not exists public.comments (
	id bigint generated always as identity primary key,
	category text not null check (category in ('poems', 'stories', 'reflections')),
	slug text not null check (char_length(slug) between 1 and 200),
	name text not null check (char_length(trim(name)) between 1 and 60),
	body text not null check (char_length(trim(body)) between 1 and 2000),
	status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
	created_at timestamptz not null default now()
);

create index if not exists comments_approved_article_created_idx
	on public.comments (category, slug, created_at desc)
	where status = 'approved';

alter table public.comments enable row level security;

revoke all on public.comments from anon, authenticated;
grant all on public.comments to service_role;
grant usage, select on sequence public.comments_id_seq to service_role;
