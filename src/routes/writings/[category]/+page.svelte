<script lang="ts">
	import '$lib/css/homepage.css';
	import WritingArchive from '$lib/components/WritingArchive.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.category} — SoferBox</title>
	<meta name="description" content={`Browse ${data.category} from the SoferBox collection.`} />
</svelte:head>

<section class="page-hero">
	<div class="page-hero-copy">
		<p class="section-kicker">SoferBox / Shelf 01</p>
		<h1>{data.category}</h1>
		<p>Words gathered over time, ready when you are.</p>
	</div>
	<div class="collection-art" aria-hidden="true">
		<div class="collection-paper"></div>
		<div class="collection-cover">
			<span class="collection-cover-kicker">SOFERBOX / FIELD NOTES</span>
			<strong>{data.category}</strong>
			<span class="collection-cover-rule"></span>
			<span class="collection-cover-meta">WORDS GATHERED WITH CARE</span>
		</div>
		<span class="collection-seal">OPEN<br />SHELF <b>01</b></span>
		<span class="collection-caption">A living collection</span>
	</div>
</section>

<main class="writing-page">
	{#if data.contentError}
		<p class="content-notice" role="status">{data.contentError}</p>
	{:else}
		<WritingArchive items={data.items} initialCategory={data.category} />
	{/if}
</main>
