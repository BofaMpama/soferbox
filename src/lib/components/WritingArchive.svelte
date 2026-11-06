<script lang="ts">
	import '$lib/css/homepage.css';

	type WritingItem = {
		id: string;
		title: string;
		slug: string;
		publishedDate: string;
		excerpt: string;
		category: string;
		coverImage: { url: string; alt: string } | null;
	};

	let {
		items,
		initialCategory = '',
		showCategoryFilter = false
	}: {
		items: WritingItem[];
		initialCategory?: string;
		showCategoryFilter?: boolean;
	} = $props();

	let searchTerm = $state('');
	let selectedCategory = $state(initialCategory);
	let sortOrder = $state('newest');

	const categoryNames: Record<string, string> = {
		poems: 'Poems',
		stories: 'Short stories',
		blogs: 'Reflections'
	};

	const visibleItems = $derived.by(() => {
		const query = searchTerm.trim().toLocaleLowerCase();
		return items
			.filter((item) => !selectedCategory || item.category === selectedCategory)
			.filter(
				(item) =>
					!query ||
					`${item.title} ${item.excerpt} ${categoryNames[item.category]}`
						.toLocaleLowerCase()
						.includes(query)
			)
			.slice()
			.sort((first, second) => {
				if (sortOrder === 'title') return first.title.localeCompare(second.title);
				const dateOrder = first.publishedDate.localeCompare(second.publishedDate);
				return sortOrder === 'oldest' ? dateOrder : -dateOrder;
			});
	});
</script>

<div class="archive-controls">
	<label>
		<span>Search titles and excerpts</span>
		<input bind:value={searchTerm} type="search" placeholder="Search writings…" />
	</label>
	{#if showCategoryFilter}
		<label>
			<span>Collection</span>
			<select bind:value={selectedCategory}>
				<option value="">All collections</option>
				{#each Object.entries(categoryNames) as [category, name] (category)}
					<option value={category}>{name}</option>
				{/each}
			</select>
		</label>
	{/if}
	<label>
		<span>Sort by</span>
		<select bind:value={sortOrder}>
			<option value="newest">Newest first</option>
			<option value="oldest">Oldest first</option>
			<option value="title">Title</option>
		</select>
	</label>
</div>

<p class="archive-result-count" aria-live="polite">
	{visibleItems.length}
	{visibleItems.length === 1 ? 'piece' : 'pieces'}
</p>

{#if visibleItems.length}
	<div class="writing-grid">
		{#each visibleItems as item (item.id)}
			<a class="writing-card" href={`/writings/${item.category}/${item.slug}`}>
				{#if item.coverImage}
					<img
						class="writing-card-image"
						src={item.coverImage.url}
						alt={item.coverImage.alt}
						loading="lazy"
					/>
				{/if}
				<time datetime={item.publishedDate}>
					{new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(
						new Date(item.publishedDate)
					)}
				</time>
				{#if showCategoryFilter}<span class="writing-card-category"
						>{categoryNames[item.category]}</span
					>{/if}
				<h2>{item.title}</h2>
				{#if item.excerpt}<p>{item.excerpt}</p>{/if}
				<span class="writing-card-link">Read this piece <span aria-hidden="true">↗</span></span>
			</a>
		{/each}
	</div>
{:else}
	<p class="empty-note">
		{searchTerm || selectedCategory
			? 'No writings match those filters. Try another search.'
			: 'Nothing on this shelf just yet. Please check back soon.'}
	</p>
{/if}
