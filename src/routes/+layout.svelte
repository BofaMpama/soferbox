<script lang="ts">
	import '../app.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import favicon from '$lib/assets/SB-FAVICON.png';
	import RetroHeader from './RetroHeader.svelte';
	import Footer from './Footer.svelte';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
	let isNavigating = $state(false);
	let shareImageUrl = $derived(new URL('/SoferBox-OG.jpg', page.url).href);
	let hasArticleShareImage = $derived(
		/^\/writings\/(?:poems|stories|reflections)\/[^/]+\/?$/.test(page.url.pathname)
	);

	beforeNavigate(() => {
		isNavigating = true;
	});

	afterNavigate(() => {
		isNavigating = false;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#f2eedf" />
	<meta name="twitter:card" content="summary_large_image" />
	{#if !hasArticleShareImage}
		<meta property="og:image" content={shareImageUrl} />
		<meta property="og:image:secure_url" content={shareImageUrl} />
		<meta property="og:image:type" content="image/jpeg" />
		<meta property="og:image:width" content="1734" />
		<meta property="og:image:height" content="907" />
		<meta property="og:image:alt" content="SoferBox" />
		<meta name="twitter:image" content={shareImageUrl} />
		<meta name="twitter:image:alt" content="SoferBox" />
	{/if}
</svelte:head>

{#if isNavigating}
	<div class="navigation-loading" role="status" aria-live="polite">
		<span class="navigation-loading-label">Opening page…</span>
	</div>
{/if}
<RetroHeader />
{@render children()}
<Footer />
