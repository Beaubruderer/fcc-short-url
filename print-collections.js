var mongo = require('mongodb');
var client = mongo.MongoClient;
var url = 'mongodb://localhost:27017/db';

client.connect(url, (err, db) => {
    
    if (err) throw err;

    db.listCollections().toArray((err, collections) => {
    
        if(err) throw err;
        console.log(collections);
    
  });
  
    db.collection('counters').find().each((err, doc) => {
    if (err) throw err;
    console.log(doc);    
  })
  
    db.collection('urls').find().each((err, doc) => {
    if (err) throw err;
    console.log(doc);    
  })
  db.close();
});