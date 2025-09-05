import type { PageLoad } from './$types';
import { client } from '$lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Document } from '@contentful/rich-text-types';

export const load: PageLoad = async () => {
    const poems = await client.getEntries({
        content_type: 'poem',
        order: ['-sys.createdAt'],
        limit: 5
    });

    return {
        poems: poems.items.map((item) => {
            const bodyField = item.fields.body as Document | null;

            return {
                id: item.sys.id,
                title: item.fields.title as string,
                body: bodyField ? documentToHtmlString(bodyField) : '', // ✅ fallback for null
                slug: item.fields.slug as string
            };
        })
    };
};
