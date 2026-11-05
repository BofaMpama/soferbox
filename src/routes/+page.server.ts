import type { PageServerLoad } from './$types';
import { requestContentful } from '$lib/contentful';
import type { Asset } from 'contentful';

export const load: PageServerLoad = async () => {
	const result = await requestContentful(async (client) =>
		Promise.all([
			client.getEntries({ content_type: 'poem', order: ['-sys.createdAt'], limit: 5 }),
			client.getEntries({ content_type: 'story', order: ['-sys.createdAt'], limit: 3 }),
			client.getEntries({ content_type: 'blog', order: ['-sys.createdAt'], limit: 3 })
		])
	);

	if (!result.ok) {
		return { poems: [], stories: [], blogs: [], contentError: result.error };
	}

	const [poemResponse, storyResponse, blogResponse] = result.data;

	return {
		contentError: null,
		poems: poemResponse.items.map((item) => ({
			title: item.fields.title as string,
			slug: item.fields.slug as string
		})),
		stories: storyResponse.items.map((item) => {
			const cover = item.fields.cover as Asset | undefined;
			const imageUrl = cover?.fields?.file?.url;

			return {
				title: item.fields.title as string,
				slug: item.fields.slug as string,
				coverImage: imageUrl ? `https:${imageUrl}` : null
			};
		}),
		blogs: blogResponse.items.map((item) => ({
			title: item.fields.title as string,
			slug: item.fields.slug as string,
			excerpt: (item.fields.excerpt as string | undefined) ?? ''
		}))
	};
};
