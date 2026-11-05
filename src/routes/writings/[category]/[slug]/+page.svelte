<script lang="ts">
	import '$lib/css/homepage.css';
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
	{/if}
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
		<h1>{article.title}</h1>
		{#if article.excerpt}<p class="article-excerpt">{article.excerpt}</p>{/if}
		<article class="article-body">
			<!-- Sanitized Contentful rich text is the only HTML rendered here. -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html article.body}
		</article>

		<section class="share-section" aria-label="Share this writing">
			<h2>Pass the words along</h2>
			<a
				href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
				target="_blank"
				rel="noopener noreferrer">Share on X</a
			>
			<a
				href={`https://www.facebook.com/sharer.php?u=${shareUrl}`}
				target="_blank"
				rel="noopener noreferrer">Facebook</a
			>
			<a
				href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
				target="_blank"
				rel="noopener noreferrer">LinkedIn</a
			>
			<a
				href={`https://wa.me/?text=${encodeURIComponent(`${shareMessage}\n${data.canonicalUrl}`)}`}
				target="_blank"
				rel="noopener noreferrer">WhatsApp</a
			>
		</section>

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
