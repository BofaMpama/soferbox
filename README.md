# SoferBox

SoferBox is a personal writing archive for poems, short stories and reflections. It is built with
SvelteKit and uses Contentful for published writing.

## Local development

Install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

Set the following server-side environment variables for local runtime and deployment so
content-backed pages can load:

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`

The Contentful space should contain `poem`, `story` and `blog` content types with `title`, `slug`
and rich-text `body` fields. Add an optional multi-line text or rich-text `excerpt` field when you
want an author-written preview; the site never generates an excerpt from the writing itself.
To curate homepage features, add an optional Boolean `featured` field to each content type and
enable it on the entries you want to feature. Until any entries are marked, the homepage shows the
latest item from each available collection. Stories and blogs can include an optional `coverImage`
or `cover` asset field for their featured image; the image description is used as its alternative
text.
If Contentful is misconfigured or temporarily unavailable, CMS-backed pages log the error on the
server and show an availability notice instead of returning an internal server error. Temporary
network failures, rate limits and Contentful server errors are retried once before showing that
notice.

## Comments

Comments use a private Supabase table; readers can submit a display name and comment without
creating an account or providing an email address. New comments stay pending until approved in the
Supabase dashboard. To configure comments:

1. Create a Supabase project and run [`supabase/comments.sql`](./supabase/comments.sql) in its SQL
   Editor.
2. Set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` in the local environment and deployment
   environment. Use the Supabase project's Secret key; keep it server-side and never give it a
   `PUBLIC_` prefix.
3. In the Supabase table editor, change a comment's `status` from `pending` to `approved` to publish
   it, or to `rejected` to discard it.

The API validates comment lengths, checks same-origin submissions, and includes a hidden honeypot
field. Only approved comments are returned publicly; the database has row-level security enabled
and grants table access only to the server-side service role.

## Validation and production

```sh
pnpm check
pnpm build
pnpm preview
```
