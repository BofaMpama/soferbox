<script lang="ts">
	import { onMount } from 'svelte';

	const repo = 'BofaMpama/soferbox';
	const repoId = 'R_kgDOPkgaqQ';
	const category = 'Announcements';
	const categoryId = 'DIC_kwDOPkgaqc4DKiP3';
	let container = $state<HTMLDivElement>();
	let loadError = $state('');

	onMount(() => {
		if (!container) {
			loadError = 'Comments could not be loaded. Please try again later.';
			return;
		}

		const script = document.createElement('script');
		script.src = 'https://giscus.app/client.js';
		script.async = true;
		script.crossOrigin = 'anonymous';
		script.setAttribute('data-repo', repo);
		script.setAttribute('data-repo-id', repoId);
		script.setAttribute('data-category', category);
		script.setAttribute('data-category-id', categoryId);
		script.setAttribute('data-mapping', 'pathname');
		script.setAttribute('data-strict', '0');
		script.setAttribute('data-reactions-enabled', '1');
		script.setAttribute('data-emit-metadata', '0');
		script.setAttribute('data-input-position', 'bottom');
		script.setAttribute('data-theme', 'preferred_color_scheme');
		script.setAttribute('data-lang', 'en');
		script.onerror = () => {
			loadError = 'Comments could not be loaded. Please try again later.';
		};
		// Giscus requires a script element configured at runtime for each installation.
		// eslint-disable-next-line svelte/no-dom-manipulating
		container.append(script);
	});
</script>

<section class="comments-section" aria-labelledby="comments-heading">
	<h2 id="comments-heading">Join the conversation</h2>
	<div bind:this={container} class="giscus"></div>
	{#if loadError}<p class="content-notice" role="alert">{loadError}</p>{/if}
</section>
