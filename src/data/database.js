import { createClient } from 'contentful';

const database = createClient({
  space: 'XXX',
  accessToken: 'XXX'
});

export default database;
