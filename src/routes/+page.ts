import type {PageLoad} from './$types';
import {client} from '$lib/contentful';

export const load: PageLoad = async () => {
    const poems = await client.getEntries({
        content_type: 'poem',
        order: ['-sys.createdAt'],
        limit: 5
    });

    return {
        poems: poems.items.map((item) => ({
            id: item.sys.id,
            title: item.fields.title,
            body: item.fields.body,
            slug: item.fields.slug
        }))
    };
};