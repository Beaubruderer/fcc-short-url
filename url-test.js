var mongoose = require('mongoose');
var Url = require('./models/url.model.js');

var db = mongoose.createConnection('mongodb://localhost:27017/db');

var testUrl = 'http://www.gracedecastro.com';

var newUrl = Url({
    long_url: testUrl
});

newUrl.save((err, url) => {
    
    if (err) throw err;
    
    console.log(url);
    mongoose.disconnect();
    
})