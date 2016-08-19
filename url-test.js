var mongoose = require('mongoose');
var Url = require('./models/url.model.js');

var mongo_uri =  process.env.MONGOLAB_URI || 'mongodb://localhost:27017/db';

var db = mongoose.createConnection(mongo_uri);

var testUrl = 'http://www.tiggerandbuddy.com';

var newUrl = Url({
    long_url: testUrl
});

newUrl.save((err, url) => {
    
    if (err) throw err;
    
    console.log(url);
    mongoose.disconnect();
    
})