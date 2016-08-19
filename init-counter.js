var mongoose = require('mongoose');
var Counter = require('./models/counter.model');

var db = 'mongodb://localhost:27017/db';

mongoose.connect(db);

var initCounter = new Counter();

initCounter._id = 'url_count';
initCounter.seq = 1000;


initCounter.save((err, result) => {
    
    if (err) throw err;
    
    console.log(result);
    mongoose.disconnect();

})
