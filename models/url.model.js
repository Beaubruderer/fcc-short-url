var mongoose = require('mongoose');
var Counter = require('./counter.model.js');
var Schema = mongoose.Schema;

var mongo_uri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/db';

var db = mongoose.createConnection(mongo_uri);

var UrlSchema = new Schema({
  _id: {type: Number, index: true},
  long_url: String,
  created_at: Date
});

UrlSchema.pre('save', function(next){
    
    var doc = this;
    
    Counter.findByIdAndUpdate(
        { _id: 'url_count' },
        { $inc: { seq: 1 } },
        (err, counter) => {
            
            if (err) throw err;
            
            doc._id = counter.seq;
            doc.created_at = new Date();
            next();
        }
    );
})

var Url = db.model('Url', UrlSchema);

module.exports = Url;