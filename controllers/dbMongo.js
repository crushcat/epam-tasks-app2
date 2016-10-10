'use strict'
let dbM = require('mongodb');
let dbClient = require('mongodb').MongoClient;
let dbPath = 'mongodb://127.0.0.1:27018/epam-task-app2';
let assert = require('assert');

exports.echo = function() {
    console.log('dbMongo.echo');
};

exports.getAll = function() {
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

exports.insert = function(obj){
    return new Promise(function(resolve, reject){
        dbClient.connect(dbPath, (err, db) => {
            if (err) {
                reject(err)
            } else{
                let resIns = '';
                if(obj.hasOwnProperty('_id')){
                     resIns = db.collection('usercollection').update(
                        {_id:obj._id},
                        {
                            name: obj.name,
                            email: obj.email,
                            phone: obj.phone
                        },
                        { upsert: false }
                        );
                }
                else{
                     resIns = db.collection('usercollection').insertOne(obj);
                }
                
                close(db);
                resolve(resIns);
            }
        });
    })
}

exports.delete = function(dId){
    return new Promise(function(resolve, reject){
        dbClient.connect(dbPath, (err, db) => {
            if (err) {
                reject(err)
            } else{
                let resDel = db.collection('usercollection').deleteOne({'_id':new dbM.ObjectID(dId)});
                close(db);
                resolve(resDel);
            }
        });
    })
}

function close (db){
    if(db){
        db.close();
    }
}
