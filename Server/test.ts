import http, { RequestOptions } from 'http'
import qs from 'querystring'
import { URL } from 'url';

var isGet = true;
var path = '/value';
var data = {
    name: "n",
    value: "1"
};
var content = qs.stringify(data);

let options: RequestOptions | string | URL;
let req: http.ClientRequest;
if (isGet) {
    options = {
        hostname: '127.0.0.1',
        port: 1234,
        path: path + '?' + content,
        method: 'GET'
    };
    req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });
} else {
    options = {
        host: '127.0.0.1',
        port: 1234,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': content.length
        }
    }
    req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            console.log(res.statusCode, ":", data);   //Ò»¶Îhtml´úÂë
        });
    });
    req.write(content);
}

req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});
req.end();