import fetch from 'isomorphic-fetch';

const apiUrl = "http://localhost:3000/api/v1";

let defaultHeaders = {
    'Content-Type': 'application/json'
};

let errorHandlers = [];

const Api = {
    setHeaders: (headers) => {
        Object.keys(headers).forEach((header) => {
            Api.setHeader(header, headers[header]);
        });
    },

    setHeader: (header, value) => {
        defaultHeaders[header] = value;
    },

    setToken: (token) => {
        Api.setHeaders({
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json'
        });
    },

    addErrorHandler: (handler) => {
        if(handler) {
            errorHandlers.push(handler);
        }
    },

    get: (url, headers, params) => {
        return Api.send(url, {
            method: 'get',
            headers,
            params
        });
    },

    post: (url, body, headers) => {
        return Api.send(url, {
            method: 'post',
            headers,
            body
        });
    },

    put: (url, body, params) => {
        let headers = Object.assign({}, defaultHeaders);
        return Api.send(url, {
            method: 'put',
            headers,
            body,
            params
        });
    },

    delete: (url, body, params) => {
        let headers = Object.assign({}, defaultHeaders);
        return Api.send(url, {
            method: 'delete',
            headers: headers,
            body,
            params
        });
    },

    send: (url, options) => {
        let apiEndpoint = '';

        if (url == 'connect'){
            apiEndpoint = apiUrl;
        }
        else if (url == 'reissue'){
            apiEndpoint = apiUrl;
            let token = localStorage.getItem('token');
            if (token) {
                Api.setToken(token);
            }
        }
        else {
            apiEndpoint = apiUrl;
            let token = localStorage.getItem('token');
            if (token) {
                Api.setToken(token);
            }
        }

        let headers = Object.assign({}, defaultHeaders, options.headers || {});

        if (url == 'connect'){
            delete headers.Authorization
        }

        let opt = {
            method: options.method || 'get',
            headers: headers
        };

        let type = options.type || 'json';

        if((type === 'json') &&(options.body)) {
            opt.body = JSON.stringify(options.body);
        }

        if(options.params) {
            url = url + '?' + Object.keys(options.params).map((key) => {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(options.params[key])
                }).join('&');
        }

        return fetch(`${apiEndpoint}/${url}`, opt).then(res => {
            if(!res.ok) {
                for(let handler of errorHandlers) {
                    handler(res);
                }
            }
            return res;
        });
    }
};

export default Api;
