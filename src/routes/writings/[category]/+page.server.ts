import type { PageServerLoad } from './$types';
import { requestContentful } from '$lib/contentful';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const contentTypes = new Map([
		['poems', 'poem'],
		['stories', 'story'],
		['blogs', 'blog']
	]);
	const contentType = contentTypes.get(params.category);

	if (!contentType) {
		error(404, 'Writing category not found');
	}

	const result = await requestContentful((client) =>
		client.getEntries({
			content_type: contentType,
			order: ['-sys.createdAt']
		})
	);

	if (!result.ok) {
		return {
			category: params.category,
			items: [],
			contentError: result.error
		};
	}

	return {
		category: params.category,
		contentError: null,
		items: result.data.items.map((item) => ({
			id: item.sys.id,
			title: item.fields.title as string,
			slug: item.fields.slug as string,
			publishedDate: item.sys.createdAt,
			excerpt: (item.fields.excerpt as string | undefined) ?? ''
		}))
	};
};
