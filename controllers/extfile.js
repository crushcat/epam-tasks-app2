'use strict';
let fs = require('fs'),
    config = require('../config');

exports.getFile = function(request, response) {
//console.log('rqst:'+request.url);
    let contentType = 'text/html';
    if (!!request.url.match(/.*\.css$/)) {
        contentType = 'text/css';
    }
    else if (!!request.url.match(/.*\.js$/)) {
        contentType = 'application/javascript';
    }
    response.writeHead(200, {'Content-Type': contentType});
    fs.createReadStream(config.directories.project + request.url).pipe(response);
};