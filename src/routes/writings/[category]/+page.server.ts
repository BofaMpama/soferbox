import type { PageServerLoad } from './$types';
import { requestContentful } from '$lib/contentful';
import { error } from '@sveltejs/kit';
import { getAllEntries, getExcerpt, getFeaturedImage } from '$lib/server/writings';

export const load: PageServerLoad = async ({ params, url }) => {
	const categoryDetails = new Map([
		['poems', { title: 'Poems', description: 'Read poems from the SoferBox archive.' }],
		['stories', { title: 'Short Stories', description: 'Read short stories from the archive.' }],
		['blogs', { title: 'Reflections', description: 'Personal reflections from the journey.' }]
	]);
	const details = categoryDetails.get(params.category);
	const contentTypes = new Map([
		['poems', 'poem'],
		['stories', 'story'],
		['blogs', 'blog']
	]);
	const contentType = contentTypes.get(params.category);

	if (!contentType) {
		error(404, 'Writing category not found');
	}

	const result = await requestContentful((client) => getAllEntries(client, contentType));

	if (!result.ok) {
		return {
			category: params.category,
			categoryTitle: details?.title ?? params.category,
			categoryDescription: details?.description ?? '',
			canonicalUrl: new URL(url.pathname, url.origin).href,
			items: [],
			contentError: result.error
		};
	}

	return {
		category: params.category,
		categoryTitle: details?.title ?? params.category,
		categoryDescription: details?.description ?? '',
		canonicalUrl: new URL(url.pathname, url.origin).href,
		contentError: null,
		items: result.data.map((item) => ({
			id: item.sys.id,
			category: params.category,
			title: item.fields.title as string,
			slug: item.fields.slug as string,
			publishedDate: item.sys.createdAt,
			excerpt: getExcerpt(item.fields.excerpt),
			coverImage: getFeaturedImage(
				item.fields.coverImage ?? item.fields.cover,
				item.fields.title as string
			)
		}))
	};
};
