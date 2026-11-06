<script lang="ts">
	import '../app.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import favicon from '$lib/assets/box.png';
	import RetroHeader from './RetroHeader.svelte';
	import Footer from './Footer.svelte';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
	let isNavigating = $state(false);

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
</svelte:head>

{#if isNavigating}
	<div class="navigation-loading" role="status" aria-live="polite">
		<span class="visually-hidden">Loading page</span>
	</div>
{/if}
<RetroHeader />
{@render children()}
<Footer />
