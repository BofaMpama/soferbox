import type { PageLoad } from './$types';
import { client } from '$lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Document } from '@contentful/rich-text-types';


export const load: PageLoad = async ({ params }) => {
    const { slug } = params;

    const response = await client.getEntries({
        content_type: 'poem',
        'fields.slug': slug
    });

    if (response.items.length === 0) {
        return {
            status: 404,
            error: new Error('Poem not found')
        };
    }

    const poem = response.items[0];

    //Extracting the rich text field
    const bodyField = poem.fields.body as Document | null;

    //Processing the rich text field into HTML string
    const processedBody = bodyField ? documentToHtmlString(bodyField) : '';

    return{
      poem: {
        id: poem.sys.id,
        title: poem.fields.title,
        body: processedBody,
        slug: poem.fields.slug
      }
    }
}