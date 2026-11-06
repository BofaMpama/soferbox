import type { PageServerLoad } from './$types';
import { requestContentful } from '$lib/contentful';
import { getExcerpt } from '$lib/server/writings';

export const load: PageServerLoad = async () => {
	const [
		poemResult,
		storyResult,
		blogResult,
		featuredPoemResult,
		featuredStoryResult,
		featuredBlogResult
	] = await Promise.all([
		requestContentful((client) =>
			client.getEntries({ content_type: 'poem', order: ['-sys.createdAt'], limit: 5 })
		),
		requestContentful((client) =>
			client.getEntries({ content_type: 'story', order: ['-sys.createdAt'], limit: 3 })
		),
		requestContentful((client) =>
			client.getEntries({ content_type: 'blog', order: ['-sys.createdAt'], limit: 3 })
		),
		requestContentful((client) =>
			client.getEntries({
				content_type: 'poem',
				'fields.featured': true,
				order: ['-sys.createdAt'],
				limit: 3
			})
		),
		requestContentful((client) =>
			client.getEntries({
				content_type: 'story',
				'fields.featured': true,
				order: ['-sys.createdAt'],
				limit: 3
			})
		),
		requestContentful((client) =>
			client.getEntries({
				content_type: 'blog',
				'fields.featured': true,
				order: ['-sys.createdAt'],
				limit: 3
			})
		)
	]);

	const hasContentError = !poemResult.ok || !storyResult.ok || !blogResult.ok;
	const contentCount =
		(poemResult.ok ? poemResult.data.total : 0) +
		(storyResult.ok ? storyResult.data.total : 0) +
		(blogResult.ok ? blogResult.data.total : 0);
	const latestEntries = [
		...(poemResult.ok
			? poemResult.data.items.map((item) => ({
					title: item.fields.title as string,
					slug: item.fields.slug as string,
					category: 'poems' as const,
					publishedDate: item.sys.createdAt,
					excerpt: getExcerpt(item.fields.excerpt)
				}))
			: []),
		...(storyResult.ok
			? storyResult.data.items.map((item) => ({
					title: item.fields.title as string,
					slug: item.fields.slug as string,
					category: 'stories' as const,
					publishedDate: item.sys.createdAt,
					excerpt: getExcerpt(item.fields.excerpt)
				}))
			: []),
		...(blogResult.ok
			? blogResult.data.items.map((item) => ({
					title: item.fields.title as string,
					slug: item.fields.slug as string,
					category: 'blogs' as const,
					publishedDate: item.sys.createdAt,
					excerpt: getExcerpt(item.fields.excerpt)
				}))
			: [])
	].sort((first, second) => second.publishedDate.localeCompare(first.publishedDate));
	const featuredItems = [
		...(featuredPoemResult.ok
			? featuredPoemResult.data.items.map((item) => ({
					id: item.sys.id,
					title: item.fields.title as string,
					slug: item.fields.slug as string,
					category: 'poems' as const,
					publishedDate: item.sys.createdAt,
					excerpt: getExcerpt(item.fields.excerpt)
				}))
			: []),
		...(featuredStoryResult.ok
			? featuredStoryResult.data.items.map((item) => ({
					id: item.sys.id,
					title: item.fields.title as string,
					slug: item.fields.slug as string,
					category: 'stories' as const,
					publishedDate: item.sys.createdAt,
					excerpt: getExcerpt(item.fields.excerpt)
				}))
			: []),
		...(featuredBlogResult.ok
			? featuredBlogResult.data.items.map((item) => ({
					id: item.sys.id,
					title: item.fields.title as string,
					slug: item.fields.slug as string,
					category: 'blogs' as const,
					publishedDate: item.sys.createdAt,
					excerpt: getExcerpt(item.fields.excerpt)
				}))
			: [])
	].sort((first, second) => second.publishedDate.localeCompare(first.publishedDate));
	const displayedFeaturedItems = (
		featuredItems.length
			? featuredItems
			: ['poems', 'stories', 'blogs']
					.map((category) => latestEntries.find((item) => item.category === category))
					.filter((item) => item !== undefined)
					.map((item) => ({ ...item, id: `${item.category}-${item.slug}` }))
	).slice(0, 6);
	const latest = latestEntries[0];
	const latestExcerpt =
		latest?.excerpt
			.split('\n')
			.map((line) => line.trim())
			.find(Boolean) ?? '';
	const latestPiece = latest
		? {
				title: latest.title,
				slug: latest.slug,
				category: latest.category,
				excerpt:
					latestExcerpt.length > 120 ? `${latestExcerpt.slice(0, 117).trimEnd()}…` : latestExcerpt,
				relativeDate: getRelativeDate(latest.publishedDate)
			}
		: null;

	return {
		contentError: hasContentError
			? 'Some writing content is temporarily unavailable. Please try again shortly.'
			: null,
		contentCount: hasContentError ? null : contentCount,
		featuredItems: displayedFeaturedItems,
		hasFeaturedSelection: featuredItems.length > 0,
		latestPiece
	};
};

function getRelativeDate(date: string): string {
	const days = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000));
	if (days === 0) return 'today';
	if (days === 1) return 'yesterday';
	if (days < 30) return `${days} days ago`;
	if (days >= 365) {
		const years = Math.floor(days / 365);
		return years === 1 ? '1 year ago' : `${years} years ago`;
	}
	const months = Math.floor(days / 30);
	return months === 1 ? '1 month ago' : `${months} months ago`;
}
