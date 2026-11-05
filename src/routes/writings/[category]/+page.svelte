<script lang="ts">
	import '$lib/css/homepage.css';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.category} — SoferBox</title>
	<meta name="description" content={`Browse ${data.category} from the SoferBox collection.`} />
</svelte:head>

<section class="page-hero">
	<div class="page-hero-copy">
		<p class="section-kicker">The SoferBox collection</p>
		<h1>{data.category}</h1>
		<p>Words gathered over time, ready when you are.</p>
	</div>
</section>

<main class="writing-page">
	{#if data.contentError}
		<p class="content-notice" role="status">{data.contentError}</p>
	{:else if data.items.length}
		<div class="writing-grid">
			{#each data.items as item (item.id)}
				<a class="writing-card" href={`/writings/${data.category}/${item.slug}`}>
					<time datetime={item.publishedDate}>
						{new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(
							new Date(item.publishedDate)
						)}
					</time>
					<h2>{item.title}</h2>
					{#if item.excerpt}<p>{item.excerpt}</p>{/if}
					<span>Read this piece <span aria-hidden="true">↗</span></span>
				</a>
			{/each}
		</div>
	{:else}
		<p class="empty-note">Nothing on this shelf just yet. Please check back soon.</p>
	{/if}
</main>
