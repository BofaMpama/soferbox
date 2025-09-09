import type { PageServerLoad } from './$types';
import { client } from '$lib/contentful';
import type { Asset } from 'contentful';

export const load: PageServerLoad = async () => {
  //Fetching a limited number of poems for the homepage
  const response = await client.getEntries({
    content_type: 'poem',
    order: ['-sys.createdAt'],
    limit: 5
  })

   const storyResponse = await client.getEntries({
    content_type: 'story',
    order: ['-sys.createdAt'],
    limit: 3
  })

 
  return {

    poems: response.items.map((item) => ({
      title: item.fields.title as string,
      slug: item.fields.slug as string,
    })),
      stories: storyResponse.items.map((item) => {
          const cover = item.fields.cover as Asset | undefined;

     return{
       title: item.fields.title as string,
      slug: item.fields.slug as string,
      coverImage: cover?.fields?.file?.url ? 'https:' + cover?.fields?.file.url : null
     };
    })
   
  };
  };

 