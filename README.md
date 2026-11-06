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

The Contentful space should contain `poem`, `story` and `blog` content types with `title`, `slug`,
`excerpt` and rich-text `body` fields. Stories and blogs can include an optional `cover` asset for
their featured image; the image description is used as its alternative text.
If Contentful is misconfigured or temporarily unavailable, CMS-backed pages log the error on the
server and show an availability notice instead of returning an internal server error.

## Comments

Comments use Giscus, which stores discussions in the public `BofaMpama/soferbox` GitHub Discussions
repository rather than requiring a separate database. Commenters need a GitHub account. The
repository must have Discussions enabled and the Giscus app authorized to access it. The public
repository and Announcements category IDs are configured in `src/lib/components/Comments.svelte`;
no deployment environment variables are needed. Discussions are matched to writing pages by
pathname.

## Validation and production

```sh
pnpm check
pnpm build
pnpm preview
```
