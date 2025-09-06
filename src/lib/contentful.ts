import { createClient } from 'contentful';
import { env } from '$env/dynamic/private';



export const client = createClient({
  space: env.CONTENTFUL_SPACE_ID,
  environment: 'master', // defaults to 'master' if not set
  accessToken: env.CONTENTFUL_ACCESS_TOKEN
});

