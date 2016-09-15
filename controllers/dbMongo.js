'use strict'
let dbClient = require('mongodb').MongoClient;
let dbPath = 'mongodb://127.0.0.1:27017/epam-task-app2';
let assert = require('assert');

exports.echo = function() {
    console.log('dbMongo.echo');
};

exports.connect = function() {
   return new Promise(function(resolve, reject){
        dbClient.connect(dbPath, (err, db) => {
            if (err) {
                reject(err)
            } else{
                let resAll = db.collection('usercollection').find().toArray();
                close(db);
                resolve(resAll);
            }
        });
    })
};

function close (db){
    if(db){
        db.close();
    }
}
