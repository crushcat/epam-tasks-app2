'use strict';
let fs = require('fs'),
    qs = require('querystring'),
    config = require('../config');

let db = require('./dbMongo');

exports.getAction = function(request, response) {
    let resJ = '';
    db.getAll()
        .then((resArray) => {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            resJ = JSON.stringify(resArray);
            response.end(resJ);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postAction = function(request, response, pathname, postData) {
    postData = qs.parse(postData);

    db.insert(postData)
        .then((resIns) => {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify(postData));
        })
        .catch((err) => {
            console.log(err);
            response.writeHead(503, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify({
                error: 'Can\'t save data. Please see server\'s console output for details.'
            }));
        });

};

exports.deleteAllAction = function(request, response, pathname) {

    let deleteId = qs.parse(request.url.trim().replace(/.*\?/, '')).id;
console.log('delete: '+ deleteId);
    db.delete(deleteId)
        .then((resDel) => {
            let resJ = '';
            db.getAll()
                .then((resArray) => {
                    response.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    resJ = JSON.stringify(resArray);
                    response.end(resJ);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
            response.writeHead(503, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify({
                error: 'Can\'t save data. Please see server\'s console output for details.'
            }));
        })



};