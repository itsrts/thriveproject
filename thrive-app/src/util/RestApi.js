
import CONFIG from './config';
import SessionManager from './SessionManager';
let ENV = process.env.NODE_ENV || 'development';
let baseUrl = CONFIG.hostName[ENV];

let cache = {};

function showLoader() {
    document.getElementById('loader').style.visibility = 'unset';
}

function hideLoader() {
    setTimeout(() => {
        document.getElementById('loader').style.visibility = 'hidden';
    }, 1000);
}

const RestApi = {

    get(url, useCache = true) {
        url = baseUrl + url;
        if(useCache && cache[url]) {
            return Promise.resolve(cache[url]);
        }
        showLoader();
        return fetch(url, {credentials: "include"}).then(result => {
            if(result.status === 401) {
                SessionManager.logout();
                window.location.href = "./login";
            }
            hideLoader();
            result = result.json();
            if(useCache) {
                cache[url] = result;
            }
            return result;
        }).catch(error=> {
            hideLoader();
            throw error;
        });
    },

    post(url, data = {}, useCache = false, headers = {"Content-Type": "application/json"}) {
        url = baseUrl + url;
        if(useCache && cache[url]) {
            return Promise.resolve(cache[url]);
        }
        showLoader();
        return fetch(url, {
            method: "POST",
            headers: headers,
            redirect: "follow",
            body: JSON.stringify(data),
            credentials: "include"
        }).then(result => {
            hideLoader();
            result = result.json();
            if(useCache) {
                cache[url] = result;
            }
            return result;
        }).catch(error=> {
            hideLoader();
            throw error;
        });
    }
}

export default RestApi;