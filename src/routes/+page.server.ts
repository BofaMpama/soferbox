import type { PageServerLoad } from './$types';
import { requestContentful } from '$lib/contentful';
import { getFeaturedImage } from '$lib/server/writings';

export const load: PageServerLoad = async () => {
	const [poemResult, storyResult, blogResult] = await Promise.all([
		requestContentful((client) =>
			client.getEntries({ content_type: 'poem', order: ['-sys.createdAt'], limit: 5 })
		),
		requestContentful((client) =>
			client.getEntries({ content_type: 'story', order: ['-sys.createdAt'], limit: 3 })
		),
		requestContentful((client) =>
			client.getEntries({ content_type: 'blog', order: ['-sys.createdAt'], limit: 3 })
		)
	]);

	const hasContentError = !poemResult.ok || !storyResult.ok || !blogResult.ok;

	return {
		contentError: hasContentError
			? 'Some writing content is temporarily unavailable. Please try again shortly.'
			: null,
		poemLoadFailed: !poemResult.ok,
		storyLoadFailed: !storyResult.ok,
		blogLoadFailed: !blogResult.ok,
		poems: poemResult.ok
			? poemResult.data.items.map((item) => ({
					title: item.fields.title as string,
					slug: item.fields.slug as string
				}))
			: [],
		stories: storyResult.ok
			? storyResult.data.items.map((item) => {
					return {
						title: item.fields.title as string,
						slug: item.fields.slug as string,
						coverImage: getFeaturedImage(
							item.fields.coverImage ?? item.fields.cover,
							item.fields.title as string
						)
					};
				})
			: [],
		blogs: blogResult.ok
			? blogResult.data.items.map((item) => ({
					title: item.fields.title as string,
					slug: item.fields.slug as string,
					excerpt: (item.fields.excerpt as string | undefined) ?? '',
					coverImage: getFeaturedImage(
						item.fields.coverImage ?? item.fields.cover,
						item.fields.title as string
					)
				}))
			: []
	};
};
