// Constants.js
const prod = {
 url: {
  API_URL: 'http://104.237.5.5:3000',
  PDI_URL: 'http://104.237.5.5:9090',
  DOCSIFY_URL: 'http://104.237.5.5:3199',
  FILESTASH_URL: 'http://104.237.5.5:8334'
 }
};
const dev = {
 url: {
  API_URL: 'http://localhost:3000',
  PDI_URL: 'http://localhost:9090',
  DOCSIFY_URL: 'http://localhost:3199',
  FILESTASH_URL: 'http://localhost:8334'
 }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;