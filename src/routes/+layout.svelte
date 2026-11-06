<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/box.png';
	import RetroHeader from './RetroHeader.svelte';
	import Footer from './Footer.svelte';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#f2eedf" />
</svelte:head>

<RetroHeader />
{@render children()}
<Footer />
