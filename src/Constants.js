// Constants.js
const prod = {
 url: {
  API_URL: 'https://postgrest.bieccamvd.com',
  PDI_URL: 'https://carte.bieccamvd.com/pentaho',
  DOCSIFY_URL: 'https://docs.bieccamvd.com',
  FILESTASH_URL: 'https://files.bieccamvd.com'
 },
 auth: {
  user: 'admin',
  password: 'password',
 }
};
const dev = {
 url: {
  API_URL: 'http://localhost:3000',
  PDI_URL: 'http://localhost:9030',
  DOCSIFY_URL: 'http://localhost:3199',
  FILESTASH_URL: 'http://localhost:8334'
 },
 auth: {
  user: 'admin',
  password: 'password',
 }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;