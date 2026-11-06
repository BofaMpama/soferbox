<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';

	const repo = env.PUBLIC_GISCUS_REPO;
	const repoId = env.PUBLIC_GISCUS_REPO_ID;
	const category = env.PUBLIC_GISCUS_CATEGORY;
	const categoryId = env.PUBLIC_GISCUS_CATEGORY_ID;
	const isConfigured = Boolean(repo && repoId && category && categoryId);
	let container = $state<HTMLDivElement>();
	let loadError = $state('');

	onMount(() => {
		if (!repo || !repoId || !category || !categoryId) return;
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
		script.setAttribute('data-theme', 'light');
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
	{#if isConfigured}
		<div bind:this={container} class="giscus"></div>
		{#if loadError}<p class="content-notice" role="alert">{loadError}</p>{/if}
	{:else}
		<p class="comments-setup-notice" role="status">
			Comments are not configured yet. Add the Giscus settings to enable the conversation.
		</p>
	{/if}
</section>
