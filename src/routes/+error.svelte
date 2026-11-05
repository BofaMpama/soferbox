<script lang="ts">
	import { page } from '$app/state';
	import '$lib/css/homepage.css';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} — SoferBox</title>
</svelte:head>

<main class="error-page">
	<p class="section-kicker">A small detour</p>
	<p class="error-code">{page.status}</p>
	<h1>{page.status === 404 ? 'This page wandered off.' : 'The box is having a moment.'}</h1>
	<p>
		{page.status === 404
			? 'That page may have moved, or it may never have made it into the box.'
			: 'Something unexpected happened. Please try again in a little while.'}
	</p>
	<div class="error-links">
		<a href="/">Back to the beginning <span aria-hidden="true">↗</span></a>
		<a href="/writings">Browse the writings <span aria-hidden="true">↗</span></a>
	</div>
</main>

<style>
	.error-page {
		min-height: 65vh;
		padding: clamp(4rem, 12vw, 10rem) clamp(1.25rem, 12vw, 12rem);
		background: var(--blue);
	}

	.error-code {
		margin: 0;
		color: var(--red);
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(4rem, 12vw, 8rem);
		letter-spacing: -0.08em;
		line-height: 1;
	}

	h1 {
		max-width: 760px;
		margin: 0.5rem 0 1rem;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(2.5rem, 7vw, 5.5rem);
		font-weight: 500;
		letter-spacing: -0.07em;
		line-height: 1;
	}

	.error-page > p:not(.section-kicker, .error-code) {
		max-width: 480px;
	}

	.error-links {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 1.5rem;
		margin-top: 2rem;
	}

	.error-links a {
		font-weight: 700;
		text-underline-offset: 4px;
	}
</style>
