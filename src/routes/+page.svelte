<script lang="ts">
	import '$lib/css/homepage.css';
	import writingsData from '$lib/data/writings.json';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>SoferBox — a home for words worth keeping</title>
	<meta
		name="description"
		content="Poems, short stories and reflections by Bofa Mpama — gathered in one little corner of the internet."
	/>
</svelte:head>

<main>
	<section class="hero">
		<div class="hero-copy">
			<p class="eyebrow">A writer's little corner of the internet</p>
			<h1>In this place <span>my words are kept.</span></h1>
			<p class="hero-description">
				A virtual box for the poems, stories and reflections I’ve been inspired to write and share.
			</p>
			<a class="button-link" href="/writings/poems">
				Open the box <span aria-hidden="true">↗</span>
			</a>
		</div>
		<div class="hero-art" aria-hidden="true">
			<div class="archive-sheet archive-sheet-back"></div>
			<div class="archive-sheet archive-cover">
				<span class="archive-cover-kicker">SOFERBOX / ARCHIVE</span>
				<span class="archive-cover-title">Words<br />worth<br /><em>keeping.</em></span>
				<span class="archive-cover-rule"></span>
				<span class="archive-cover-meta">POEMS · STORIES · REFLECTIONS</span>
			</div>
			<span class="archive-stamp">OPEN<br />EDITION <b>01</b></span>
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
				<a class="archive-card" href={info.link}>
					<span class="archive-number">0{index + 1} / COLLECTION</span>
					<div>
						<h3>{info.title}</h3>
						<p>{info.description}</p>
					</div>
					<span class="archive-arrow" aria-hidden="true">↗</span>
				</a>
			{/each}
		</div>
	</section>

	<section class="recent-section">
		<div class="section-heading">
			<div>
				<p class="section-kicker">Fresh from the page</p>
				<h2>Recent poems.</h2>
			</div>
			<a class="text-link" href="/writings/poems">All poems <span aria-hidden="true">→</span></a>
		</div>
		{#if data.poems.length}
			<div class="poem-list">
				{#each data.poems as poem (poem.slug)}
					<a class="poem-row" href={`/writings/poems/${poem.slug}`}>
						<h3>{poem.title}</h3>
						<span aria-hidden="true">↗</span>
					</a>
				{/each}
			</div>
		{:else if !data.poemLoadFailed}
			<p class="empty-note">New poems are on their way. Check back soon.</p>
		{/if}
	</section>
</main>

<section class="stories-section">
	<div class="section-heading">
		<p class="section-kicker">Fiction, with a pulse</p>
		<h2>Short stories I’ve been writing…</h2>
		<a class="text-link" href="/writings/stories"
			>See every story <span aria-hidden="true">→</span></a
		>
	</div>
	{#if data.stories.length}
		<div class="story-list">
			{#each data.stories as story (story.slug)}
				<a class="story-card" href={`/writings/stories/${story.slug}`}>
					{#if story.coverImage}
						<img src={story.coverImage} alt="" loading="lazy" />
					{:else if !data.storyLoadFailed}
						<span class="story-placeholder" aria-hidden="true">
							<span class="story-placeholder-label">SOFERBOX / FICTION</span>
							<span class="story-placeholder-glyph">“</span>
							<span class="story-placeholder-rule"></span>
						</span>
					{/if}
					<h3>{story.title}</h3>
				</a>
			{/each}
		</div>
	{:else if !data.storyLoadFailed}
		<p class="empty-note">The next story is still taking shape.</p>
	{/if}
</section>

<section class="blog-section">
	<div class="section-heading">
		<div>
			<p class="section-kicker">Notes from the journey</p>
			<h2>From the blog.</h2>
		</div>
		<a class="text-link" href="/writings/blogs">All reflections <span aria-hidden="true">→</span></a
		>
	</div>
	{#if data.blogs.length}
		<div class="blog-grid">
			{#each data.blogs as blog (blog.slug)}
				<a class="blog-card" href={`/writings/blogs/${blog.slug}`}>
					<h3>{blog.title}</h3>
					{#if blog.excerpt}<p>{blog.excerpt}</p>{/if}
					<span>Read the story →</span>
				</a>
			{/each}
		</div>
	{:else if !data.blogLoadFailed}
		<p class="empty-note">A new reflection will be here soon.</p>
	{/if}
</section>
