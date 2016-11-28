import fetch from 'isomorphic-fetch';

const apiUrl = "https://quiz-master-test.herokuapp.com/api/v1/";
let defaultHeaders = {
    'Content-Type': 'application/json'
};

let errorHandlers = [];

const Api = {
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
        let apiEndpoint = apiUrl;
        let headers = Object.assign({}, defaultHeaders, options.headers || {});
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
