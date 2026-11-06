<script lang="ts">
	import '$lib/css/homepage.css';

	type FeaturedWriting = {
		id: string;
		title: string;
		slug: string;
		category: 'poems' | 'stories' | 'blogs';
		publishedDate: string;
		excerpt: string;
	};

	let { items, hasFeaturedSelection }: { items: FeaturedWriting[]; hasFeaturedSelection: boolean } =
		$props();

	const categoryNames: Record<FeaturedWriting['category'], string> = {
		poems: 'Poem',
		stories: 'Short story',
		blogs: 'Reflection'
	};
</script>

{#if items.length}
	<section class="featured-section" aria-labelledby="featured-writings-heading">
		<div class="section-heading">
			<div>
				<p class="section-kicker">
					{hasFeaturedSelection ? 'Featured from the archive' : 'Fresh from the page'}
				</p>
				<h2 id="featured-writings-heading">
					{hasFeaturedSelection ? 'Writings worth a closer look.' : 'Recent from each shelf.'}
				</h2>
			</div>
			<a class="text-link" href="/writings"
				>Explore all writings <span aria-hidden="true">→</span></a
			>
		</div>
		<div class="featured-grid">
			{#each items as item (item.id)}
				<a class="featured-card" href={`/writings/${item.category}/${item.slug}`}>
					<span class="featured-card-category">{categoryNames[item.category]}</span>
					<time datetime={item.publishedDate}>
						{new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(
							new Date(item.publishedDate)
						)}
					</time>
					<h3>{item.title}</h3>
					{#if item.excerpt}<p>{item.excerpt}</p>{/if}
					<span class="featured-card-link">Read this piece <span aria-hidden="true">→</span></span>
				</a>
			{/each}
		</div>
	</section>
{/if}
