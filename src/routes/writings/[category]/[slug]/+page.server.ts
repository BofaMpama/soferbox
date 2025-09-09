import type {PageServerLoad} from './$types';
import {client} from '$lib/contentful';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import type {Document} from '@contentful/rich-text-types';

export const load: PageServerLoad = async ({params}) => {
    const {slug} = params;

    //to fetch the current poem
    const response = await client.getEntries({
        content_type: 'poem',
        'fields.slug': slug,
        limit: 1
    });

    if (response.items.length === 0) {
        return{
            status: 404,
            error: new Error('Poem not found')
        };
    }

    const poemItem = response.items[0];
    const bodyField = poemItem.fields.body as Document | null;

    const processedBody = bodyField ? documentToHtmlString(bodyField) : '';

    // Fetching additional poems excluding the current one
    const morePoemsResponse = await client.getEntries({
        content_type: 'poem',
        order: ['-sys.createdAt'],
        'fields.slug[ne]': slug,
        limit: 5
    })
    return {
        poem: {
            title: poemItem.fields.title as string,
            body: processedBody,
            slug: poemItem.fields.slug as string,
            publishedDate: poemItem.sys.createdAt as string,
            excerpt: poemItem.fields.excerpt as string
        },
        extraPoems: morePoemsResponse.items.map((item) => ({
            title: item.fields.title as string,
            slug: item.fields.slug as string,
            publishedDate: item.sys.createdAt as string
        }))
    };
    
}

