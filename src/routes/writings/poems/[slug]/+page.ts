import type { PageLoad } from './$types';
import { client } from '$lib/contentful';

export const load: PageLoad = async ({ params }) => {
    const { slug } = params;

    const poems = await client.getEntries({
        content_type: 'poem',
        'fields.slug': slug,
        limit: 1
    });

    if (!poems.items.length) {
        throw new Error('Poem not found');
    }

    const poem = poems.items[0];

    return{
      poem: {
        id: poem.sys.id,
        title: poem.fields.title,
        body: poem.fields.body,
        slug: poem.fields.slug
      }
    }
}