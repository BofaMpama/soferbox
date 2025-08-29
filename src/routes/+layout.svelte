<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from './Header.svelte';
	import RetroHeader from './RetroHeader.svelte';
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

