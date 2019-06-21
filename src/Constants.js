// Constants.js
const prod = {
 url: {
  API_URL: 'http://104.237.5.5:3000'
 }
};
const dev = {
 url: {
  API_URL: 'http://localhost:3000'
 }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;