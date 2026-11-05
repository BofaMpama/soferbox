<script lang="ts">
	import '$lib/css/homepage.css';
	import writingsData from '$lib/data/writings.json';
</script>

<svelte:head>
	<title>Writings — SoferBox</title>
	<meta name="description" content="Browse poems, short stories and reflections from SoferBox." />
</svelte:head>

<section class="page-hero">
	<div class="page-hero-copy">
		<p class="section-kicker">The complete collection</p>
		<h1>Writings</h1>
		<p>Choose a shelf and find a thought worth keeping.</p>
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
</main>
