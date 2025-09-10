<script src="src/lib/components/components.js" lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/box.png';
	import Header from './Header.svelte';
	import RetroHeader from './RetroHeader.svelte';
	import Footer from './Footer.svelte';
	import BubbleFooter from './bubbleFooter.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>



	<RetroHeader />
	
	<main>
		{@render children()}
	</main>
	<Footer />

