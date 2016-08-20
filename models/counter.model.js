var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongo_uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/db';

var db = mongoose.createConnection(mongo_uri);

var CounterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

var Counter = db.model('Counter', CounterSchema);

module.exports = Counter;