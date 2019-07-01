import { fetchUtils, HttpError } from 'react-admin';
import { postgrestClient } from 'react-admin-postgrest-client';

import pdiRestProvider from './pdiRestProvider';

import { config } from './Constants'
var url = config.url.API_URL
var pdiUrl = config.url.PDI_URL
var docsifyUrl = config.url.DOCSIFY_URL
var filestashUrl = config.url.FILESTASH_URL
var user = config.auth.user
var password = config.auth.password

const postgrestHttpClient = (url, options = {}) => {
    if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
}

const postgrestDataProvider = postgrestClient( url, postgrestHttpClient);

const pdiHttpClient = (url, options = {}) => {
    const requestHeaders = new Headers({
        'Accept': 'application/xml',
        'Content-Type': 'application/xml',
        'Authorization': 'Basic ' + btoa(user + ":" + password)
    });
    return fetch(url, { ...options, headers: requestHeaders })
        .then(response =>
            response.text().then(text => ({
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                body: text,
            }))
        )
        .then(({ status, statusText, headers, body }) => {
            let xml = body;
            if (status < 200 || status >= 300) {
                return Promise.reject(
                    new HttpError(
                        (xml && xml.message) || statusText,
                        status,
                        xml
                    )
                );
            }
            return Promise.resolve({ status, headers, body, xml });
        });
}

// Kettle File System Repository admin/admin
const pdiDataProvider = pdiRestProvider(pdiUrl + '/kettle', pdiHttpClient);

const dataProviders = [
  { dataProvider: postgrestDataProvider, resources: ['metodos', 'contaminantes', 'estacionesdelared', 'diasimportantes', 'industrias'] },
  { dataProvider: pdiDataProvider, resources: ['pdijobs'] },
];

export default (type, resource, params) => {
  const dataProviderMapping = dataProviders.find(dp => dp.resources.includes(resource));
  return dataProviderMapping.dataProvider(type, resource, params);
};