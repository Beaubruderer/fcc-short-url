var mongo = require('mongodb');
var client = mongo.MongoClient;


var mongo_uri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/db';

client.connect(mongo_uri, (err, db) => {
    
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