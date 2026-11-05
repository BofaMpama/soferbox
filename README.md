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
`excerpt` and rich-text `body` fields. Stories may also include a `cover` asset.
If Contentful is misconfigured or temporarily unavailable, CMS-backed pages log the error on the
server and show an availability notice instead of returning an internal server error.

## Validation and production

```sh
pnpm check
pnpm build
pnpm preview
```
