<script lang="ts">
	import '$lib/css/homepage.css';
	import Comments from '$lib/components/Comments.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const article = data.article;
	let shareStatus = $state('');

	function copyLinkWithFallback(): boolean {
		const input = document.createElement('textarea');
		input.value = data.canonicalUrl;
		input.setAttribute('readonly', '');
		input.style.position = 'fixed';
		input.style.opacity = '0';
		document.body.appendChild(input);
		input.select();
		try {
			return document.execCommand('copy');
		} finally {
			input.remove();
		}
	}

	async function copyLink(): Promise<boolean> {
		try {
			await navigator.clipboard.writeText(data.canonicalUrl);
		} catch (error) {
			try {
				if (!copyLinkWithFallback()) throw error;
			} catch (fallbackError) {
				console.error('Failed to copy the writing link:', error, fallbackError);
				shareStatus = 'Could not copy the link. Copy the page URL from your browser instead.';
				return false;
			}
		}

		shareStatus = 'Link copied to clipboard.';
		return true;
	}

	async function sharePiece() {
		if (!navigator.share) {
			if (await copyLink()) {
				shareStatus = 'Sharing is unavailable here, so the link was copied instead.';
			}
			return;
		}
	const pieceTitle = article?.title ?? 'SoferBox';
try {
	await navigator.share({
		text: `${pieceTitle}\n${data.canonicalUrl}`
	});
	shareStatus = '';
} catch (error) {
	if (error instanceof Error && error.name === 'AbortError') return;
	console.error('Failed to open the native share options:', error);
	shareStatus = 'Unable to open sharing options. You can copy the link instead.';
}
}

	const fallbackShareImageUrl = new URL('/SoferBox-OG.jpg', data.canonicalUrl).href;
	const articleShareImageUrl = article?.coverImage?.url ?? fallbackShareImageUrl;
</script>

<svelte:head>
	<title>{article ? `${article.title} — SoferBox` : 'Writing unavailable — SoferBox'}</title>
	{#if article}
		<meta name="description" content={article.excerpt || article.title} />
		<meta property="og:title" content={`${article.title} — SoferBox`} />
		<meta property="og:description" content={article.excerpt || article.title} />
		<meta name="twitter:title" content={`${article.title} — SoferBox`} />
		<meta name="twitter:description" content={article.excerpt || article.title} />
		<meta property="og:type" content="article" />
	{/if}
	<meta property="og:image" content={articleShareImageUrl} />
	<meta property="og:image:secure_url" content={articleShareImageUrl} />
	<meta property="og:image:alt" content={article?.coverImage?.alt ?? 'SoferBox'} />
	<meta name="twitter:image" content={articleShareImageUrl} />
	<meta name="twitter:image:alt" content={article?.coverImage?.alt ?? 'SoferBox'} />
	<meta property="og:url" content={data.canonicalUrl} />
</svelte:head>

<main class="article-shell">
	<a class="article-back" href={`/writings/${data.category}`}>← Back to {data.category}</a>
	{#if data.contentError}
		<p class="content-notice" role="status">{data.contentError}</p>
	{:else if article}
		<time class="article-date" datetime={article.publishedDate}>
			{new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date(article.publishedDate))}
		</time>
		<span class="article-reading-time">{article.readingTime} min read</span>
		<h1>{article.title}</h1>
		{#if article.excerpt}<p class="article-excerpt">{article.excerpt}</p>{/if}
		{#if article.coverImage}
			<img
				class="article-feature-image"
				src={article.coverImage.url}
				alt={article.coverImage.alt}
			/>
		{/if}
		<article class="article-body">
			<!-- Sanitized Contentful rich text is the only HTML rendered here. -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html article.body}
		</article>

		<section class="share-section" aria-label="Share this writing">
			<h2>Share this piece</h2>
			<button class="share-link" type="button" onclick={sharePiece}>
				<svg class="share-icon" viewBox="0 0 24 24" aria-hidden="true">
					<circle cx="18" cy="5" r="3" />
					<circle cx="6" cy="12" r="3" />
					<circle cx="18" cy="19" r="3" />
					<path d="m8.7 10.6 6.6-4.2m-6.6 7 6.6 4.2" />
				</svg>
				<span>Share this piece</span>
			</button>
			<button class="share-link" type="button" onclick={copyLink}>
				<svg class="copy-icon" viewBox="0 0 24 24" aria-hidden="true">
					<rect x="8" y="8" width="12" height="13" rx="1.5" />
					<path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
				</svg>
				<span>Copy link</span>
			</button>
			{#if shareStatus}<p class="share-status" role="status">{shareStatus}</p>{/if}
		</section>

		<Comments category={data.category} slug={article.slug} />

		{#if data.relatedItems.length}
			<section class="related-section">
				<h2>More from this shelf</h2>
				<div class="related-list">
					{#each data.relatedItems as item (item.slug)}
						<a href={`/writings/${data.category}/${item.slug}`}>
							<div class="related-copy">
								<strong>{item.title}</strong>
								{#if item.excerpt}<span>{item.excerpt}</span>{/if}
							</div>
							<span aria-hidden="true">↗</span>
						</a>
					{/each}
				</div>
			</section>
		{/if}
	{/if}
</main>
