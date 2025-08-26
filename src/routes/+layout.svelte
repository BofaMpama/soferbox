<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from './Header.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>



	<Header />
	
	<main>
		{@render children()}
	</main>

