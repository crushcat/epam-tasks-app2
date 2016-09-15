'use strict';
let fs = require('fs'),
    qs = require('querystring'),
    config = require('../config');

let db = require('./dbMongo');

exports.getAction = function(request, response) {
    /*db.queryAll(function(err, data){
        console.log(JSON.stringify(data));
    });*/
    let database = null;
    let resJ = '';
    db.connect()
        .then((db) => {
            database = db;
            return db.collection('usercollection');
        })
        .then((collection) => {
            let qAll = collection.find();
            return qAll;
        })
        .then((qAll) => {
            let resArray = qAll.toArray();
            return resArray;
        })
        .then((resArray) => {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            resJ = JSON.stringify(resArray);
            response.end(resJ);
            database.close();
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postAction = function(request, response, pathname, postData) {
    postData = qs.parse(postData);

    fs.readFile(config.database.path, function(err, data) {
        data = err || !data ? [] : JSON.parse(data.toString('utf8'));
        postData.id = new Date().toISOString().replace(/[^\d]/g, '');
        postData.phone = parseInt(postData.phone, 10);
        data.push(postData);

        fs.writeFile(config.database.path, JSON.stringify(data), function(err) {
            if (err) {
                console.log(err);
                response.writeHead(503, {
                    'Content-Type': 'application/json'
                });
                response.end(JSON.stringify({
                    error: 'Can\'t save data. Please see server\'s console output for details.'
                }));

            } else {
                response.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                response.end(JSON.stringify(postData));
            }
        });
    });
};

exports.deleteAllAction = function(request, response, pathname) {
    let deleteData = qs.parse(request.url.trim().replace(/.*\?/, ''));
    let deleteId = [];

    deleteData.id && (deleteId = deleteData.id.split(','));

    if (deleteId.length) {
        fs.readFile(config.database.path, function(err, data) {
            let deletedItems = [];

            data = err || !data ? [] : JSON.parse(data.toString('utf8'));
            data = data.filter(function(item) {
                let c = deleteId.indexOf(item.id) < 0;

                !c && (deletedItems.push(item));

                return c;
            });

            fs.writeFile(config.database.path, JSON.stringify(data), function(err) {
                if (err) {
                    console.log(err);
                    response.writeHead(503, {
                        'Content-Type': 'application/json'
                    });
                    response.end(JSON.stringify({
                        error: 'Can\'t save data. Please see server\'s console output for details.'
                    }));

                } else {
                    response.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    response.end(JSON.stringify(deletedItems));
                }
            });
        });

    } else {
        fs.exists(config.database.path, function(isExists) {
            response.writeHead(204);
            response.end();

            if (false !== isExists) {
                fs.unlink(config.database.path);
            }
        });
    }

};