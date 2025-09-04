import { createClient } from 'contentful';

export const client = createClient({
  space: '9lrp8l7metze',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'B8lxu0t7iqY1TuCa1b2NTOPub9PRzTML06F6aDkYYms'
});

