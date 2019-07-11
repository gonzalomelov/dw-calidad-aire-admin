import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin';

var pako = require('pako');

/**
 * Maps react-admin queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        switch (type) {
            case GET_LIST: {
                url = `${apiUrl}/status/?xml=Y`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/jobStatus/?id=${params.id}&xml=Y`;
                break;
            case GET_MANY: {
                throw new Error(`Unsupported fetch action type ${type}`);
            }
            case GET_MANY_REFERENCE: {
                throw new Error(`Unsupported fetch action type ${type}`);
            }
            case UPDATE:
            case UPDATE_MANY: {
                throw new Error(`Unsupported fetch action type ${type}`);
            }
            case CREATE: {
                // conteo_vehicular.csv
                // contaminacion.csv
                // datos_meteorologicos.xlsx
                url = `${apiUrl}/runJob/?job=${params.data.name}&TMP_DIR=/data-integration&DB_HOST=db&DB_PASS=superuserpass&DB_PORT=5432&DB_USER=superuser&SFTP_HOST=sftp&SFTP_PASS=93765asdflkjsd4123SS&SFTP_PORT=22&SFTP_USER=admin&CONTAMINACION_PATH=${params.data.contaminacionfilename}&DATOS_METEOROLOGICOS_PATH=${params.data.datosmeteorologicosfilename}&PATH=/data-integration/repository&Year=33&Report_Output_name=output.pdf&Report_Template_name=reporte.prpt&Output_type=pdf`;
                break;
            }
            case DELETE: {
                url = `${apiUrl}/stopJob/?name=${params.data.name}&xml=Y`;
                break;
            }
            case DELETE_MANY: {
                throw new Error(`Unsupported fetch action type ${type}`);
            }
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        const xml = response.xml;
        var parser;
        var xmlDoc;
        var jobstatus;
        var job;
        switch (type) {
            case GET_LIST:
                var jobs = [];
                if (window.DOMParser) {
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(xml, "text/xml");
                }
                var jobstatuslist = xmlDoc.getElementsByTagName("jobstatuslist")[0].children;
                for (var i = 0; i < jobstatuslist.length; i++) {
                    jobstatus = jobstatuslist[i];
                    job = {};
                    job.name = jobstatus.getElementsByTagName("jobname")[0].innerHTML;
                    job.id = jobstatus.getElementsByTagName("id")[0].innerHTML;
                    job.status = jobstatus.getElementsByTagName("status_desc")[0].innerHTML;
                    job.date = jobstatus.getElementsByTagName("log_date")[0].innerHTML;
                    jobs.push(job);
                }
                return {
                    data: jobs,
                    total: jobs.length,
                };
            case GET_ONE:
                if (window.DOMParser) {
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(xml, "text/xml");
                }
                jobstatus = xmlDoc.getElementsByTagName("jobstatus")[0].children;
                job = {};
                job.name = jobstatus[0] ? jobstatus[0].innerHTML : "";
                job.id = jobstatus[1] ? jobstatus[1].innerHTML : "";
                job.status = jobstatus[2] ? jobstatus[2].innerHTML : "";
                var log_date = xmlDoc.getElementsByTagName("log_date");
                if (log_date && log_date[0]) {
                    job.date = log_date[0].innerHTML;
                }
                var log_text = "";
                var log_text_tag = xmlDoc.getElementsByTagName("log_text");
                if (log_text_tag && log_text_tag[0]) {
                  log_text = log_text_tag[0].innerHTML;
                } else {
                  log_text_tag = xmlDoc.getElementsByTagName("logging_string");

                  if (log_text_tag && log_text_tag[0]) {
                    var logging_string = log_text_tag[0].innerHTML;
                  
                    logging_string = logging_string.replace("&lt;![CDATA[", "").replace("]]&gt;", "");

                    // Get some base64 encoded binary data from the server.
                    var b64Data = logging_string;
                    // Decode base64 (convert ascii to binary)
                    var strData = atob(b64Data);
                    // Convert binary string to character-number array
                    var charData = strData.split('').map(function(x){return x.charCodeAt(0);});
                    // Turn number array into byte-array
                    var binData = new Uint8Array(charData);
                    // Pako magic
                    var data = pako.inflate(binData);
                    // Convert gunzipped byteArray back to ascii string:
                    var strData = String.fromCharCode.apply(null, new Uint16Array(data));

                    log_text = strData;
                  }
                }
                job.log_text = log_text.replace(/\n/g, "<br />");
                var ptrn = /.*Insert \/ Update 2\.0 - Finished processing \(I=\d*, O=\d*, R=\d*, W=(\d*),.*/mg;
                var results = ptrn.exec(job.log_text);
                if (results) {
                    job.writtenRows = results[1];
                }
                return {
                    data: job
                };
            case DELETE:
                if (window.DOMParser) {
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(xml, "text/xml");
                }
                jobstatus = xmlDoc.getElementsByTagName("webresult")[0].children;
                job = {};
                job.id = jobstatus[2].innerHTML;
                return {
                    data: job
                };
            case CREATE:
                if (window.DOMParser) {
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(xml, "text/xml");
                }
                jobstatus = xmlDoc.getElementsByTagName("webresult")[0].children;
                job = {};
                job.id = jobstatus[2].innerHTML;
                return {
                    data: job
                };
            default:
                return { data: xml };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return (type, resource, params) => {
        const { url, options } = convertDataRequestToHTTP(
            type,
            resource,
            params
        );
        return httpClient(url, options).then(response => convertHTTPResponse(response, type, resource, params));
    };
};