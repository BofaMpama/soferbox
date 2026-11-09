import type { PageServerLoad } from './$types';
import { requestContentful } from '$lib/contentful';
import { getExcerpt, getExcerptLine, getFeaturedImage } from '$lib/server/writings';

export const load: PageServerLoad = async () => {
	const [poemResult, storyResult, reflectionResult] = await Promise.all([
		requestContentful((client) =>
			client.getEntries({ content_type: 'poem', order: ['-sys.createdAt'], limit: 5 })
		),
		requestContentful((client) =>
			client.getEntries({ content_type: 'story', order: ['-sys.createdAt'], limit: 3 })
		),
		requestContentful((client) =>
			client.getEntries({ content_type: 'reflection', order: ['-sys.createdAt'], limit: 3 })
		)
	]);

	const hasContentError = !poemResult.ok || !storyResult.ok || !reflectionResult.ok;

	return {
		contentError: hasContentError
			? 'Some writing content is temporarily unavailable. Please try again shortly.'
			: null,
		poemLoadFailed: !poemResult.ok,
		storyLoadFailed: !storyResult.ok,
		reflectionLoadFailed: !reflectionResult.ok,
		poems: poemResult.ok
			? poemResult.data.items.map((item) => ({
					title: item.fields.title as string,
					slug: item.fields.slug as string,
					excerpt: getExcerptLine(item.fields.body) || getExcerptLine(item.fields.excerpt)
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
		reflections: reflectionResult.ok
			? reflectionResult.data.items.map((item) => ({
					title: item.fields.title as string,
					slug: item.fields.slug as string,
					excerpt: getExcerpt(item.fields.excerpt),
					coverImage: getFeaturedImage(
						item.fields.coverImage ?? item.fields.cover,
						item.fields.title as string
					)
				}))
			: []
	};
};
