import type { PageServerLoad } from './$types';
import { client } from '$lib/contentful';

export const load: PageServerLoad = async () => {
  //Fetching a limited number of poems for the homepage
  const response = await client.getEntries({
    content_type: 'poem',
    order: ['-sys.createdAt'],
    limit: 5
  })

  return {
    poems: response.items.map((item) => ({
      title: item.fields.title as string,
      slug: item.fields.slug as string,
    }))
  }
}