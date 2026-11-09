import type { PageServerLoad } from './$types';
import { requestContentful } from '$lib/contentful';
import { getAllEntries, getExcerpt, getFeaturedImage } from '$lib/server/writings';

const categories = [
	['poems', 'poem'],
	['stories', 'story'],
	['blogs', 'blog']
] as const;

export const load: PageServerLoad = async () => {
	const results = await Promise.all(
		categories.map(async ([category, contentType]) => ({
			category,
			result: await requestContentful((client) => getAllEntries(client, contentType))
		}))
	);
	const failed = results.find(({ result }) => !result.ok);

	if (failed) {
		return {
			items: [],
			contentError: failed.result.ok ? null : failed.result.error
		};
	}

	return {
		contentError: null,
		items: results.flatMap(({ category, result }) =>
			result.ok
				? result.data.map((item) => ({
						id: item.sys.id,
						category,
						title: item.fields.title as string,
						slug: item.fields.slug as string,
						publishedDate: item.sys.createdAt,
						excerpt: getExcerpt(item.fields.excerpt),
						coverImage: getFeaturedImage(
							item.fields.coverImage ?? item.fields.cover,
							item.fields.title as string
						)
					}))
				: []
		)
	};
};
