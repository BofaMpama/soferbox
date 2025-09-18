import type { PageServerLoad } from './$types';
import { client } from '$lib/contentful';

export const load: PageServerLoad = async ({ params }) => {
    const { category } = params;

    //Checking to ensure the URL is a valid content type
    const validContentTypes = ['poems', 'stories', 'blogs'];
    if (!validContentTypes.includes(category)){
        return {
            status: 404,
            error: new Error('Category not found')
        };
    }

    //Fetching entries based on the category from Contentful
    const response = await client.getEntries({
        content_type: category.slice(0, -1),
        order: ['-sys.createdAt'],
    });

    

    return{
        //To get each content item's title and slug for listing
        items: response.items.map((item) => ({
            id: item.sys.id as string,
            title: item.fields.title as string,
            slug: item.fields.slug as string,
            publishedDate: item.sys.createdAt as string,
            excerpt: item.fields.excerpt as string
        }))
    };

};