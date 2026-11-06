<script lang="ts">
	import '$lib/css/homepage.css';
	import Comments from '$lib/components/Comments.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const article = data.article;
	const shareMessage = `A piece from SoferBox: ${article?.title ?? 'SoferBox'}`;
	const shareText = encodeURIComponent(shareMessage);
	const shareUrl = encodeURIComponent(data.canonicalUrl);
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
		{#if article.coverImage}
			<meta property="og:image" content={article.coverImage.url} />
			<meta property="og:image:alt" content={article.coverImage.alt} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:image" content={article.coverImage.url} />
			<meta name="twitter:image:alt" content={article.coverImage.alt} />
		{/if}
	{/if}
	<meta property="og:url" content={data.canonicalUrl} />
</svelte:head>

<main class={`article-shell article-${data.category}`}>
	<a class="article-back" href={`/writings/${data.category}`}>← Back to {data.categoryTitle}</a>
	{#if data.contentError}
		<p class="content-notice" role="status">{data.contentError}</p>
	{:else if article}
		<div class="article-metadata">
			<span>{data.categoryTitle}</span>
			<time class="article-date" datetime={article.publishedDate}>
				{new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(
					new Date(article.publishedDate)
				)}
			</time>
			{#if article.readingTime}<span class="article-reading-time"
					>{article.readingTime} min read</span
				>{/if}
		</div>
		<h1>{article.title}</h1>
		{#if article.excerpt}<p class="article-excerpt">{article.excerpt}</p>{/if}
		{#if article.coverImage}
			<img
				class="article-feature-image"
				src={article.coverImage.url}
				alt={article.coverImage.alt}
			/>
		{/if}
		<article class={`article-body article-body-${data.category}`}>
			<!-- Sanitized Contentful rich text is the only HTML rendered here. -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html article.body}
		</article>

		{#if data.previousItem || data.nextItem}
			<nav class="article-pagination" aria-label={`More ${data.categoryTitle.toLowerCase()}`}>
				{#if data.previousItem}
					<a href={`/writings/${data.category}/${data.previousItem.slug}`}>
						<span class="article-pagination-label">← Previous in this collection</span>
						<strong>{data.previousItem.title}</strong>
					</a>
				{:else}
					<span></span>
				{/if}
				{#if data.nextItem}
					<a
						class="article-pagination-next"
						href={`/writings/${data.category}/${data.nextItem.slug}`}
					>
						<span class="article-pagination-label">Next in this collection →</span>
						<strong>{data.nextItem.title}</strong>
					</a>
				{/if}
			</nav>
		{/if}

		<section class="share-section" aria-label="Share this writing">
			<h2>Pass the words along</h2>
			<a
				class="share-link"
				href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path
						d="M18.9 1.2h3.7l-8 9.2L24 22.9h-7.4l-5.8-7.6-6.7 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9zm-1.3 19.5h2L6.5 3.2H4.4z"
					/>
				</svg>
				<span>Share on X</span>
			</a>
			<a
				class="share-link"
				href={`https://www.facebook.com/sharer.php?u=${shareUrl}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path
						d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8z"
					/>
				</svg>
				<span>Facebook</span>
			</a>
			<a
				class="share-link"
				href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path
						d="M5.2 8.6a2 2 0 1 0 0-4 2 2 0 0 0 0 4M3.5 10h3.4v10.5H3.5zM9 10h3.2v1.4h.1a3.5 3.5 0 0 1 3.2-1.7c3.4 0 4 2.2 4 5.1v5.7h-3.4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v5.1H9z"
					/>
				</svg>
				<span>LinkedIn</span>
			</a>
			<a
				class="share-link"
				href={`https://wa.me/?text=${encodeURIComponent(`${shareMessage}\n${data.canonicalUrl}`)}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<svg class="share-whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20l1-4.5a8.4 8.4 0 1 1 16-3.8Z" />
					<path
						d="M9 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4 0 .5l-.5.7c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.3.6-.1.8-.5 1.4-1.2 1.7-.6.3-1.4.4-2.2.1-1.2-.4-2.3-1.1-3.3-2-.9-.9-1.7-2-2-3.1-.3-1 0-2 .4-2.7Z"
					/>
				</svg>
				<span>WhatsApp</span>
			</a>
		</section>

		<Comments category={data.category} slug={article.slug} />

		{#if data.relatedItems.length}
			<section class="related-section">
				<h2>More from this shelf</h2>
				<div class="related-list">
					{#each data.relatedItems as item (item.slug)}
						<a href={`/writings/${data.category}/${item.slug}`}>
							<span>{item.title}</span>
							<span aria-hidden="true">↗</span>
						</a>
					{/each}
				</div>
			</section>
		{/if}
	{/if}
</main>
