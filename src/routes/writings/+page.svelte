<script lang="ts">
	import '$lib/css/homepage.css';
	import writingsData from '$lib/data/writings.json';
	import WritingArchive from '$lib/components/WritingArchive.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Writings — SoferBox</title>
	<meta name="description" content="Browse poems, short stories and reflections from SoferBox." />
</svelte:head>

<section class="page-hero">
	<div class="page-hero-copy">
		<p class="section-kicker">SoferBox / Complete archive</p>
		<h1>Writings</h1>
		<p>Choose a shelf and find a thought worth keeping.</p>
	</div>
	<div class="collection-art" aria-hidden="true">
		<div class="collection-paper"></div>
		<div class="collection-cover">
			<span class="collection-cover-kicker">SOFERBOX / ARCHIVE</span>
			<strong>Words<br />worth<br /><em>keeping.</em></strong>
			<span class="collection-cover-rule"></span>
			<span class="collection-cover-meta">POEMS · STORIES · REFLECTIONS</span>
		</div>
		<span class="collection-seal">OPEN<br />EDITION <b>01</b></span>
		<span class="collection-caption">A home for the written word</span>
	</div>
</section>

<main class="writing-page">
	<div class="archive-grid">
		{#each writingsData as info, index (info.title)}
			<a class="archive-card" href={info.link}>
				<span class="archive-number">0{index + 1} / COLLECTION</span>
				<div>
					<h2>{info.title}</h2>
					<p>{info.description}</p>
				</div>
				<span class="archive-arrow" aria-hidden="true">↗</span>
			</a>
		{/each}
	</div>
	<section class="complete-archive" aria-labelledby="complete-archive-heading">
		<div class="section-heading">
			<div>
				<p class="section-kicker">Find something to keep</p>
				<h2 id="complete-archive-heading">Search the complete archive.</h2>
			</div>
		</div>
		{#if data.contentError}
			<p class="content-notice" role="status">{data.contentError}</p>
		{:else}
			<WritingArchive items={data.items} showCategoryFilter />
		{/if}
	</section>
</main>
