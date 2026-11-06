<script lang="ts">
	import '$lib/css/homepage.css';
	import writingsData from '$lib/data/writings.json';
	import FeaturedWritings from '$lib/components/FeaturedWritings.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>SoferBox — a home for words worth keeping</title>
	<meta
		name="description"
		content="Poems, short stories and reflections, kept here as I write them."
	/>
	<meta property="og:title" content="SoferBox — a home for words worth keeping" />
	<meta
		property="og:description"
		content="Poems, short stories and reflections, kept here as I write them."
	/>
	<link rel="canonical" href="https://soferbox.vercel.app/" />
</svelte:head>

<main>
	{#if data.contentError}
		<p class="content-notice content-notice-global" role="status">{data.contentError}</p>
	{/if}
	<section class="hero">
		<div class="hero-copy">
			<p class="hero-definition">
				<span class="hero-definition-heading">
					<span class="hero-pronunciation">/soˈfɛr/</span>
					<span class="hero-part-of-speech">NOUN</span>
				</span>
				<span class="hero-definition-text">a scribe or writer; one who records by hand</span>
			</p>
			<h1>In this place <span>my words are kept.</span></h1>
			<p class="hero-description">
				Poems, short stories and reflections, kept here as I write them.
			</p>
			<p class="hero-byline">by Bofa</p>
			<div class="hero-actions">
				<a class="button-link" href="/writings" data-sveltekit-preload-data="tap">
					Explore the writings <span aria-hidden="true">→</span>
				</a>
				<a class="hero-secondary-link" href="/about">About Bofa</a>
			</div>
			{#if data.latestPiece}
				<p class="hero-latest">
					New: <a href={`/writings/${data.latestPiece.category}/${data.latestPiece.slug}`}
						>{data.latestPiece.title}</a
					>, {data.latestPiece.relativeDate}
				</p>
			{/if}
		</div>
		<div class="hero-art" aria-hidden="true">
			<div class="archive-sheet archive-sheet-back"></div>
			<div class="archive-sheet archive-cover">
				<span class="archive-cover-kicker">SOFERBOX / ARCHIVE</span>
				<span class="archive-cover-title">Words worth<br /> <em>keeping.</em></span>
				{#if data.latestPiece}
					<div class="archive-cover-latest">
						<span class="archive-cover-latest-label">NEW IN THE BOX</span>
						<span class="archive-cover-latest-title">{data.latestPiece.title}</span>
						{#if data.latestPiece.excerpt}
							<span class="archive-cover-excerpt">{data.latestPiece.excerpt}</span>
						{/if}
					</div>
				{/if}
				<span class="archive-cover-rule"></span>
				<span class="archive-cover-meta">POEMS · STORIES · REFLECTIONS</span>
			</div>
			<span class="archive-stamp">
				<span>EDITION 01</span>
				{#if data.contentCount !== null}
					<b>{data.contentCount} {data.contentCount === 1 ? 'PIECE' : 'PIECES'}</b>
				{/if}
			</span>
			<span class="archive-caption">Collected with care / Est. 2020</span>
		</div>
	</section>

	<section class="intro-band">
		<div>
			<p class="section-kicker">A note from the author</p>
			<h2>Faith has a way of <span>finding its voice.</span></h2>
		</div>
		<div class="intro-copy">
			<p>
				My name’s Bofa. I’m a Christian whose faith struggles to remain silent. This is the digital
				scroll where I give expression to the thoughts, beliefs, convictions and ideas that dwell
				within me.
			</p>
			<a class="text-link" href="/about">A little more about me <span aria-hidden="true">→</span></a
			>
		</div>
	</section>

	<section class="archive-section">
		<div class="section-heading">
			<div>
				<p class="section-kicker">Browse the collection</p>
				<h2>Three ways into the box.</h2>
			</div>
			<a class="text-link" href="/writings"
				>Explore all writings <span aria-hidden="true">→</span></a
			>
		</div>
		<div class="archive-grid">
			{#each writingsData as info, index (info.title)}
				<a class="archive-card" href={info.link} data-sveltekit-preload-data="tap">
					<span class="archive-number">0{index + 1} / COLLECTION</span>
					<div>
						<h3>{info.title}</h3>
						<p>{info.description}</p>
					</div>
					<span class="archive-action">Browse {info.title} <span aria-hidden="true">→</span></span>
				</a>
			{/each}
		</div>
	</section>

	<FeaturedWritings items={data.featuredItems} hasFeaturedSelection={data.hasFeaturedSelection} />
</main>
