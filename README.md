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

Comments use Giscus, which stores discussions in GitHub Discussions rather than requiring a
separate database. Commenters need a GitHub account. To enable comments:

1. Enable Discussions for the public GitHub repository and install/authorize the Giscus app.
2. Select a Discussions category at [giscus.app](https://giscus.app) and copy its repository and
   category settings.
3. Configure these environment variables for local development and deployment:
   - `PUBLIC_GISCUS_REPO` (for example, `owner/repository`)
   - `PUBLIC_GISCUS_REPO_ID`
   - `PUBLIC_GISCUS_CATEGORY`
   - `PUBLIC_GISCUS_CATEGORY_ID`

Discussions are matched to writing pages by pathname. Until all four settings are present, article
pages show a configuration notice instead of an empty comments panel.

## Validation and production

```sh
pnpm check
pnpm build
pnpm preview
```
