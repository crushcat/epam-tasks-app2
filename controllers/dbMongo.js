'use strict'
let dbClient = require('mongodb').MongoClient;
let dbPath = 'mongodb://127.0.0.1:27017/epam-task-app2';
let assert = require('assert');

exports.echo = function() {
    console.log('dbMongo.echo');
};

exports.queryAll = function(callback) {
    dbClient.connect(dbPath, function(err, db) {
        let collection = db.collection('usercollection').find().toArray(callback);
        db.close();
    });
};
/*dbClient.connect(dbPath, function(err, db) {
        //assert.equal(null, err);
        console.log("Connected correctly to server.");
        let cursor = db.collection('usercollection').find(function(err, data){
            console.log(JSON.stringify(data));
        });

        var collection = db.collection("usercollection");
            collection.find().toArray(function(err, data){
                console.log(JSON.stringify(data));
            });
        console.log("DB Success");
        db.close();
    });
*/