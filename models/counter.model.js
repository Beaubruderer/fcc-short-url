var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.createConnection('mongodb://localhost:27017/db');

var CounterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

var Counter = db.model('Counter', CounterSchema);

module.exports = Counter;